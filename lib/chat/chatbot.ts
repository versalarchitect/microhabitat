import { crawlWebsite, isCached, type CrawlProgress } from './website-crawler';

// Models
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let qaModel: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let embedder: any = null;
let isLoading = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let loadPromise: Promise<any> | null = null;

// Knowledge chunks with their embeddings
interface KnowledgeChunk {
  content: string;
  embedding: number[] | null;
}

let knowledgeChunks: KnowledgeChunk[] = [];
let knowledgeBaseContent: string = '';

// Progress callback for crawling status
export type LoadingProgressCallback = (stage: 'models' | 'crawling' | 'ready', progress?: CrawlProgress) => void;

// Split knowledge base into semantic chunks
function splitIntoChunks(text: string): string[] {
  // Split by section headers (=== Page Name === or ================)
  // The crawler uses "=== Page Name ===" format
  const sections = text.split(/\n={3,}\s*[^=\n]*\s*={3,}\n|={10,}/);
  const chunks: string[] = [];

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed || trimmed.length < 50) continue;

    // If section is too long, split further by markdown headers or double newlines
    if (trimmed.length > 1500) {
      // First try to split by markdown headers (## Heading)
      const subSections = trimmed.split(/\n##\s+/);

      for (const subSection of subSections) {
        const subTrimmed = subSection.trim();
        if (!subTrimmed || subTrimmed.length < 30) continue;

        if (subTrimmed.length > 1200) {
          // Still too long, split by double newlines
          const paragraphs = subTrimmed.split(/\n\n+/);
          let currentChunk = '';

          for (const para of paragraphs) {
            if (currentChunk.length + para.length > 1200) {
              if (currentChunk.trim()) {
                chunks.push(currentChunk.trim());
              }
              currentChunk = para;
            } else {
              currentChunk += '\n\n' + para;
            }
          }
          if (currentChunk.trim()) {
            chunks.push(currentChunk.trim());
          }
        } else {
          chunks.push(subTrimmed);
        }
      }
    } else {
      chunks.push(trimmed);
    }
  }

  return chunks;
}

// Compute cosine similarity between two vectors
function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Get embedding for text
async function getEmbedding(text: string): Promise<number[]> {
  const output = await embedder(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

export async function loadModel(onProgress?: LoadingProgressCallback) {
  if (qaModel && embedder && knowledgeChunks.length > 0) {
    onProgress?.('ready');
    return { qaModel, embedder };
  }

  if (loadPromise) {
    return loadPromise;
  }

  isLoading = true;

  loadPromise = (async () => {
    try {
      // Notify that we're loading models
      onProgress?.('models');

      const { pipeline } = await import('@huggingface/transformers');

      // Load models and crawl website in parallel
      // If content is cached, crawling is instant
      onProgress?.('crawling', { current: 0, total: 13, status: isCached() ? 'Using cached content' : 'Starting crawl...' });

      const [qaModelLoaded, embedderLoaded, websiteContent] = await Promise.all([
        // Question-answering model
        pipeline(
          'question-answering',
          'Xenova/distilbert-base-cased-distilled-squad',
        ),
        // Embedding model for semantic search
        pipeline(
          'feature-extraction',
          'Xenova/all-MiniLM-L6-v2',
        ),
        // Crawl website for knowledge base
        crawlWebsite((progress) => {
          onProgress?.('crawling', progress);
        }),
      ]);

      qaModel = qaModelLoaded;
      embedder = embedderLoaded;
      knowledgeBaseContent = websiteContent;

      // Initialize knowledge chunks from crawled content
      const textChunks = splitIntoChunks(knowledgeBaseContent);
      knowledgeChunks = textChunks.map(content => ({
        content,
        embedding: null,
      }));

      console.log(`Initialized ${knowledgeChunks.length} knowledge chunks from crawled website`);

      // Pre-compute embeddings for all chunks (in background)
      computeChunkEmbeddings();

      onProgress?.('ready');
      return { qaModel, embedder };
    } catch (error) {
      loadPromise = null;
      throw error;
    } finally {
      isLoading = false;
    }
  })();

  return loadPromise;
}

// Compute embeddings for all chunks (runs in background)
async function computeChunkEmbeddings() {
  for (let i = 0; i < knowledgeChunks.length; i++) {
    if (!knowledgeChunks[i].embedding) {
      try {
        knowledgeChunks[i].embedding = await getEmbedding(knowledgeChunks[i].content);
      } catch (e) {
        console.error('Error computing embedding for chunk', i, e);
      }
    }
  }
}

// Find the most relevant chunks using semantic similarity
async function findRelevantChunks(question: string, topK: number = 3): Promise<string[]> {
  const questionEmbedding = await getEmbedding(question);

  // Score each chunk
  const scored = knowledgeChunks
    .filter(chunk => chunk.embedding !== null)
    .map(chunk => ({
      content: chunk.content,
      score: cosineSimilarity(questionEmbedding, chunk.embedding!),
    }))
    .sort((a, b) => b.score - a.score);

  // Return top K chunks
  return scored.slice(0, topK).map(s => s.content);
}

// Fallback keyword-based search if embeddings aren't ready
function keywordSearch(question: string): string[] {
  const q = question.toLowerCase();
  const scored = knowledgeChunks.map(chunk => {
    const content = chunk.content.toLowerCase();
    const words = q.split(/\s+/).filter(w => w.length > 3);
    let score = 0;
    for (const word of words) {
      if (content.includes(word)) {
        score += word.length;
      }
    }
    return { content: chunk.content, score };
  }).sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map(s => s.content);
}

export interface ChatResponse {
  answer: string;
  confidence: number;
}

interface QAResult {
  answer: string;
  score: number;
}

export async function askQuestion(question: string): Promise<ChatResponse> {
  await loadModel();

  // Find most relevant chunks using semantic search
  let relevantChunks: string[];

  // Check if embeddings are ready
  const hasEmbeddings = knowledgeChunks.some(c => c.embedding !== null);

  if (hasEmbeddings && embedder) {
    relevantChunks = await findRelevantChunks(question, 3);
  } else {
    // Fallback to keyword search while embeddings are being computed
    relevantChunks = keywordSearch(question);
  }

  // Combine relevant chunks into context (up to ~1500 chars to stay within model limits)
  let context = '';
  for (const chunk of relevantChunks) {
    if (context.length + chunk.length < 2000) {
      context += '\n\n' + chunk;
    }
  }

  if (!context.trim()) {
    return {
      answer: "I'm still loading my knowledge base. Please try again in a moment, or contact us at info@microhabitat.com for immediate assistance.",
      confidence: 0,
    };
  }

  // Run QA model on the combined context
  const result = await qaModel(question, context) as QAResult;

  // Handle low confidence
  if (result.score < 0.01) {
    // Try with broader context
    const allContext = relevantChunks.join('\n\n').slice(0, 3000);
    const retryResult = await qaModel(question, allContext) as QAResult;

    if (retryResult.score < 0.01) {
      return {
        answer: "I couldn't find a specific answer to that question in my knowledge base. Please contact us at info@microhabitat.com or book a demo at www.microhabitat.com for personalized assistance. You can also try rephrasing your question.",
        confidence: retryResult.score,
      };
    }

    return processAnswer(retryResult);
  }

  return processAnswer(result);
}

function processAnswer(result: QAResult): ChatResponse {
  let answer = result.answer.trim();

  // Clean up common issues
  answer = answer.replace(/^[-•]\s*/, ''); // Remove leading bullets
  answer = answer.replace(/\n[-•]/g, '\n•'); // Normalize bullets

  // If answer is very short, add context
  if (answer.length < 50 && result.score < 0.5) {
    answer += ". For more details, visit www.microhabitat.com or email info@microhabitat.com.";
  }

  // Capitalize first letter
  answer = answer.charAt(0).toUpperCase() + answer.slice(1);

  return {
    answer,
    confidence: result.score,
  };
}

export function isModelLoaded(): boolean {
  return qaModel !== null && embedder !== null;
}

export function isModelLoading(): boolean {
  return isLoading;
}

// Re-export cache utilities for convenience
export { clearCache as clearKnowledgeCache, isCached as isKnowledgeCached, getCacheAge as getKnowledgeCacheAge } from './website-crawler';

// Reset chatbot state (useful for testing or forcing refresh)
export function resetChatbot(): void {
  qaModel = null;
  embedder = null;
  loadPromise = null;
  knowledgeChunks = [];
  knowledgeBaseContent = '';
}
