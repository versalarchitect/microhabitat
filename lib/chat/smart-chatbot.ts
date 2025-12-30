// Smart Chatbot with Multi-Step Retrieval
// Uses Transformers.js with intelligent search strategy

import { classifyIntent, getPagesToSearch, getSearchPlan, KNOWLEDGE_AREAS, type KnowledgeAreaKey } from './smart-retrieval';

// Models
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let qaModel: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let embedder: any = null;
let isLoading = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let loadPromise: Promise<any> | null = null;

// Knowledge organized by page/section
interface KnowledgeSection {
  page: string;
  title: string;
  content: string;
  embedding: number[] | null;
}

let knowledgeSections: KnowledgeSection[] = [];

// Compute cosine similarity
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Get embedding for text
async function getEmbedding(text: string): Promise<number[]> {
  const output = await embedder(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

// Initialize knowledge base from structured content
function initializeKnowledge() {
  // Structured knowledge organized by page
  const structuredKnowledge: Omit<KnowledgeSection, 'embedding'>[] = [
    // Home page
    {
      page: '/',
      title: 'MicroHabitat Overview',
      content: `MicroHabitat is the world's largest network of urban farms, founded in 2016 in Montreal by childhood friends Orlane and Alexandre. We transform underutilized urban spaces—rooftops, terraces, lobbies, and courtyards—into productive ecological farms. Our mission is to reconnect communities with nature and fresh, local food through regenerative agriculture. We operate across North America and Europe, managing over 500 urban farms that produce fresh vegetables, herbs, and edible flowers year-round.`,
    },
    {
      page: '/',
      title: 'Impact Statistics',
      content: `MicroHabitat has achieved significant environmental and social impact: over 500 urban farms installed, 50,000+ kg of produce harvested annually, 2 million+ kg of CO2 offset, and partnerships across 20+ cities. Our farms reduce urban heat island effect by up to 5°C, support pollinators and biodiversity, and provide fresh food within steps of where people live and work.`,
    },
    // About page
    {
      page: '/about',
      title: 'Our Story',
      content: `MicroHabitat was founded in 2016 by Orlane and Alexandre, two childhood friends from Montreal who shared a passion for sustainable food systems and urban innovation. What started as a single rooftop garden has grown into the world's largest network of urban farms. Our mission is to reconnect communities with nature through regenerative agriculture, transforming underused urban spaces into productive, beautiful farms.`,
    },
    {
      page: '/about',
      title: 'Our Values',
      content: `We believe in sustainability, community, and innovation. We use organic growing methods without synthetic pesticides or fertilizers. We partner with local food banks and community organizations. We continuously innovate our farming techniques to maximize yield while minimizing environmental impact.`,
    },
    // Outdoor Farm
    {
      page: '/outdoor-farm',
      title: 'Outdoor Urban Farming Services',
      content: `Our outdoor urban farming services transform rooftops, terraces, courtyards, and other outdoor spaces into productive gardens. We design custom farm layouts based on your space, sunlight exposure, and goals. Services include full design and consultation, professional installation of raised beds, planters, and irrigation systems, regular maintenance visits by our farmers, seasonal planting and crop rotation, harvesting at peak freshness, and produce delivery. We grow a variety of vegetables (tomatoes, peppers, lettuce, kale, herbs), and edible flowers using organic methods.`,
    },
    {
      page: '/outdoor-farm',
      title: 'What We Grow Outdoors',
      content: `Our outdoor farms grow: leafy greens (lettuce, kale, spinach, arugula), tomatoes (cherry, heirloom varieties), peppers (bell peppers, hot varieties), cucumbers and zucchini, beans and peas, root vegetables (carrots, radishes, beets), herbs (basil, mint, cilantro, parsley, rosemary, thyme), and edible flowers (nasturtiums, pansies, marigolds). All produce is grown organically without synthetic pesticides.`,
    },
    // Indoor Farm
    {
      page: '/indoor-farm',
      title: 'Indoor Vertical Farming',
      content: `Our indoor farming solutions bring year-round growing to indoor spaces like lobbies, atriums, and common areas. Using vertical farming technology and controlled environment agriculture, we can grow fresh produce regardless of weather or season. Indoor farms are low-maintenance, aesthetically beautiful, and provide biophilic benefits for building occupants. They're perfect for corporate offices, residential lobbies, schools, and healthcare facilities.`,
    },
    {
      page: '/indoor-farm',
      title: 'Indoor Growing Technology',
      content: `Our indoor farms use hydroponics and aeroponics systems that minimize water usage (up to 95% less than traditional farming) while maximizing crop yields. LED grow lights provide optimal light spectrum for plant growth. Automated irrigation and climate control ensure consistent, high-quality produce. We specialize in leafy greens, herbs, and microgreens for indoor environments.`,
    },
    // Educational Activities
    {
      page: '/educational-activities',
      title: 'Educational Programs',
      content: `MicroHabitat offers comprehensive educational programs including hands-on workshops where participants learn to grow their own food, corporate team-building activities centered around planting and harvesting, school programs teaching children about sustainable agriculture and nutrition, community events and seasonal celebrations, and sustainability seminars for property managers and corporate leaders.`,
    },
    // Corporations
    {
      page: '/corporations',
      title: 'Corporate Urban Farming',
      content: `For corporations, urban farming delivers ESG benefits, employee wellness improvements, and brand differentiation. Our corporate programs include rooftop and terrace farms at office buildings, indoor farms in lobbies and common areas, team-building workshops and harvest events, produce sharing programs for employees, and sustainability reporting and metrics. Urban farms help companies meet sustainability commitments while creating engaging spaces for employees.`,
    },
    {
      page: '/corporations',
      title: 'Corporate ESG Benefits',
      content: `Urban farms support corporate ESG (Environmental, Social, Governance) goals: Environmental - reduce carbon footprint, support biodiversity, decrease urban heat island effect. Social - improve employee wellness, provide fresh food access, support community food banks. Governance - demonstrate sustainability leadership, meet stakeholder expectations, future-proof real estate assets.`,
    },
    // Schools
    {
      page: '/schools',
      title: 'School Programs',
      content: `Our school programs bring urban agriculture into educational settings. Students learn about plant biology, nutrition, sustainability, and food systems through hands-on experience. Programs include curriculum-aligned lessons, garden installation and maintenance, harvest celebrations, and farm-to-cafeteria initiatives. We work with elementary schools, high schools, and universities across North America and Europe.`,
    },
    // Commercial Real Estate
    {
      page: '/commercial-real-estate',
      title: 'Real Estate Solutions',
      content: `For commercial real estate owners and property managers, urban farms increase property values by 10-20%, attract and retain tenants with unique amenities, earn green building certification credits (LEED, WELL, BOMA BEST), and differentiate properties in competitive markets. We handle everything from design to ongoing maintenance, making it easy to add green amenities to any building.`,
    },
    {
      page: '/commercial-real-estate',
      title: 'Green Building Certifications',
      content: `MicroHabitat farms help buildings earn certification credits: LEED (Leadership in Energy & Environmental Design) - Sustainable Sites, Water Efficiency, and Innovation credits, potentially 8+ points. WELL Building Standard - Nourishment, Mind, and Community credits. BOMA BEST - Environmental performance and innovation points. Fitwel - Access to healthy food and outdoor spaces credits. We provide documentation support for certification applications.`,
    },
    // Cities / Locations
    {
      page: '/cities',
      title: 'Our Locations',
      content: `MicroHabitat operates across North America and Europe: North America - Montreal (Headquarters), Toronto, Vancouver, New York, Chicago, Boston, Philadelphia, Washington DC. Europe - Paris (European HQ), Amsterdam, Brussels, London. We're constantly expanding to new cities. If you're in a city not listed, contact us to discuss possibilities.`,
    },
    // Contact
    {
      page: '/contact',
      title: 'Contact Information',
      content: `Reach MicroHabitat: Email info@microhabitat.com. Montreal Office (HQ): 5333 Casgrain Ave, Suite 102, Montreal, QC H2T 1X3. Toronto Office: 180 John Street, Suite 402, Toronto, ON M5T 1X5. New York Office: 1123 Broadway, Suite 1012, New York, NY 10010. Paris Office: 25 Rue du Petit Musc, 75004 Paris, France. Book a demo at www.microhabitat.com to schedule a free consultation.`,
    },
    // Pricing / ROI
    {
      page: '/roi-calculator',
      title: 'Pricing and Investment',
      content: `MicroHabitat pricing varies based on project scope: factors include space size (square footage), indoor vs outdoor installation, design complexity, maintenance frequency, and educational programming. All packages include design consultation, materials and plants, professional installation, regular maintenance, harvesting and delivery. We offer flexible arrangements from one-time installations to full-service annual contracts. ROI typically includes increased property values, tenant attraction, certification credits, and brand value. Contact us for a custom quote.`,
    },
    // FAQ
    {
      page: '/faq',
      title: 'Frequently Asked Questions',
      content: `Common questions: How much does it cost? Pricing varies by project size and scope; contact us for a quote. Who maintains the farm? Our professional farmers handle all maintenance, watering, planting, and harvesting. What do you grow? We grow vegetables, herbs, and edible flowers using organic methods. How often do you visit? Typically weekly or bi-weekly depending on the season and package. Can I participate? Yes! We offer workshops and optional hands-on involvement for clients who want to learn.`,
    },
    // Maintenance
    {
      page: '/faq',
      title: 'Maintenance and Care',
      content: `MicroHabitat provides full-service maintenance so you don't have to do anything. Our farmers handle: regular watering and irrigation management, soil health and organic fertilization, pest management using organic methods only, seasonal planting and crop rotation, harvesting at peak freshness, pruning and plant care, equipment maintenance, and winter preparation for outdoor farms. Visit frequency is typically weekly or bi-weekly. We also offer optional workshops if you want to participate in the growing process.`,
    },
    // Careers
    {
      page: '/careers',
      title: 'Careers at MicroHabitat',
      content: `Join our team of urban farmers, designers, and sustainability professionals. We're always looking for passionate people who believe in sustainable food systems. Positions include urban farmers, farm managers, sales and partnerships, operations and logistics, and design specialists. We offer competitive compensation, meaningful work, and the chance to make a real environmental impact. Check www.microhabitat.com/careers for current openings.`,
    },
    // Partnerships
    {
      page: '/partnerships',
      title: 'Partnership Opportunities',
      content: `MicroHabitat partners with organizations aligned with our mission. Partnership types include food bank partnerships for produce donations, corporate sustainability partnerships, academic research collaborations, technology and innovation partnerships, and municipal and government partnerships. If you're interested in partnering with MicroHabitat, contact us at info@microhabitat.com.`,
    },
    // Community
    {
      page: '/community-engagement',
      title: 'Community Programs',
      content: `We believe urban farms should benefit entire communities. Our community programs include produce donations to local food banks, free workshops for community members, partnerships with community gardens and urban agriculture initiatives, employment opportunities for local residents, and educational events open to the public.`,
    },
  ];

  knowledgeSections = structuredKnowledge.map(section => ({
    ...section,
    embedding: null,
  }));
}

// Compute embeddings for all sections (background task)
async function computeEmbeddings() {
  console.log('[SmartChatbot] Computing embeddings for knowledge sections...');
  for (let i = 0; i < knowledgeSections.length; i++) {
    if (!knowledgeSections[i].embedding) {
      try {
        knowledgeSections[i].embedding = await getEmbedding(
          knowledgeSections[i].title + ' ' + knowledgeSections[i].content
        );
      } catch (e) {
        console.error(`Error computing embedding for section ${i}:`, e);
      }
    }
  }
  console.log('[SmartChatbot] Embeddings computed for all sections');
}

// Load models
export async function loadModels(): Promise<void> {
  if (qaModel && embedder) return;
  if (loadPromise) {
    await loadPromise;
    return;
  }

  isLoading = true;
  loadPromise = (async () => {
    try {
      console.log('[SmartChatbot] Loading Transformers.js models...');
      const { pipeline } = await import('@huggingface/transformers');

      // Load models in parallel
      const [qa, embed] = await Promise.all([
        pipeline('question-answering', 'Xenova/distilbert-base-cased-distilled-squad'),
        pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2'),
      ]);

      qaModel = qa;
      embedder = embed;

      // Initialize and compute embeddings
      initializeKnowledge();
      computeEmbeddings(); // Non-blocking

      console.log('[SmartChatbot] Models loaded successfully');
    } finally {
      isLoading = false;
    }
  })();

  await loadPromise;
}

// Search sections by page
function searchByPage(pages: string[]): KnowledgeSection[] {
  return knowledgeSections.filter(section =>
    pages.some(page => section.page === page || section.page.startsWith(page))
  );
}

// Semantic search within sections
async function semanticSearch(
  question: string,
  sections: KnowledgeSection[],
  topK: number = 3
): Promise<KnowledgeSection[]> {
  // If embeddings aren't ready, fall back to keyword search
  const sectionsWithEmbeddings = sections.filter(s => s.embedding !== null);

  if (sectionsWithEmbeddings.length === 0) {
    // Keyword fallback
    const q = question.toLowerCase();
    return sections
      .map(s => ({
        section: s,
        score: q.split(/\s+/).filter(w => w.length > 3)
          .reduce((acc, word) => acc + (s.content.toLowerCase().includes(word) ? 1 : 0), 0)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map(r => r.section);
  }

  const questionEmbedding = await getEmbedding(question);

  return sectionsWithEmbeddings
    .map(section => ({
      section,
      score: cosineSimilarity(questionEmbedding, section.embedding!),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(r => r.section);
}

// Multi-step retrieval
interface RetrievalResult {
  sections: KnowledgeSection[];
  searchSteps: string[];
  confidence: number;
}

async function multiStepRetrieval(question: string): Promise<RetrievalResult> {
  const searchSteps: string[] = [];
  const plan = getSearchPlan(question);

  let bestSections: KnowledgeSection[] = [];
  let confidence = 0;

  for (const step of plan) {
    searchSteps.push(step.reason);

    // Get sections from these pages
    const pageSections = searchByPage(step.pages);

    if (pageSections.length === 0) {
      searchSteps.push(`  → No content found for ${step.pages.join(', ')}`);
      continue;
    }

    // Semantic search within these sections
    const results = await semanticSearch(question, pageSections, 2);

    if (results.length > 0) {
      bestSections = [...bestSections, ...results];
      searchSteps.push(`  → Found ${results.length} relevant sections: ${results.map(r => r.title).join(', ')}`);

      // Calculate confidence based on relevance
      confidence = Math.min(0.9, confidence + 0.3);

      // If we have enough content with good confidence, stop
      if (bestSections.length >= 3 && confidence >= 0.6) {
        break;
      }
    }
  }

  // Deduplicate sections
  const uniqueSections = bestSections.filter((section, index, self) =>
    index === self.findIndex(s => s.title === section.title)
  ).slice(0, 4);

  return {
    sections: uniqueSections,
    searchSteps,
    confidence: uniqueSections.length > 0 ? confidence : 0.1,
  };
}

// Generate answer from context
interface QAResult {
  answer: string;
  score: number;
}

async function generateAnswer(question: string, context: string): Promise<QAResult> {
  const result = await qaModel(question, context) as QAResult;
  return result;
}

// Main chat function
export interface ChatResponse {
  answer: string;
  confidence: number;
  reasoning: string[];
  sources: string[];
}

export async function chat(question: string): Promise<ChatResponse> {
  await loadModels();

  const reasoning: string[] = [];
  reasoning.push(`Analyzing question: "${question}"`);

  // Classify intent
  const intents = classifyIntent(question);
  reasoning.push(`Identified topics: ${intents.map(i => KNOWLEDGE_AREAS[i].name).join(', ')}`);

  // Multi-step retrieval
  const retrieval = await multiStepRetrieval(question);
  reasoning.push(...retrieval.searchSteps);

  if (retrieval.sections.length === 0) {
    return {
      answer: "I couldn't find specific information about that on our website. For personalized assistance, please contact us at info@microhabitat.com or book a demo at www.microhabitat.com.",
      confidence: 0.1,
      reasoning,
      sources: [],
    };
  }

  // Build context from retrieved sections
  const context = retrieval.sections
    .map(s => `${s.title}: ${s.content}`)
    .join('\n\n');

  reasoning.push(`Built context from ${retrieval.sections.length} sections`);

  // Generate answer
  const qaResult = await generateAnswer(question, context);
  reasoning.push(`Generated answer with confidence: ${(qaResult.score * 100).toFixed(1)}%`);

  // Process the answer
  let answer = qaResult.answer.trim();

  // If QA model gave a low-quality answer, use the context directly
  if (qaResult.score < 0.1 || answer.length < 20) {
    // Use the most relevant section content as the answer
    const topSection = retrieval.sections[0];
    answer = topSection.content;
    reasoning.push('Using full section content due to low QA confidence');
  }

  // Clean up and format
  answer = answer.charAt(0).toUpperCase() + answer.slice(1);
  if (!answer.endsWith('.') && !answer.endsWith('!') && !answer.endsWith('?')) {
    answer += '.';
  }

  // Add a helpful suffix for low confidence
  if (qaResult.score < 0.3) {
    answer += '\n\nFor more specific information, please contact us at info@microhabitat.com or book a demo at www.microhabitat.com.';
  }

  return {
    answer,
    confidence: Math.max(qaResult.score, retrieval.confidence),
    reasoning,
    sources: retrieval.sections.map(s => s.page),
  };
}

export function isModelLoaded(): boolean {
  return qaModel !== null && embedder !== null;
}

export function isModelLoading(): boolean {
  return isLoading;
}
