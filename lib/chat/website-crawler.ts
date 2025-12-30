/**
 * Website Crawler for Chatbot Knowledge Base
 *
 * Crawls microhabitat.com to build a knowledge base for the AI chatbot.
 * Content is cached in localStorage for faster subsequent loads.
 */

// Pages to crawl (most important content pages)
const PAGES_TO_CRAWL = [
  '/',                        // Home - overview, services, impact
  '/about',                   // About - mission, founders, values
  '/outdoor-farm',            // Outdoor farming services
  '/indoor-farm',             // Indoor/vertical farming
  '/educational-activities',  // Workshops, learning programs
  '/community-engagement',    // Community programs, food banks
  '/corporations',            // Corporate solutions
  '/schools',                 // School partnerships
  '/commercial-real-estate',  // Property manager solutions
  '/careers',                 // Job opportunities
  '/partnerships',            // Partnership info
  '/contact',                 // Contact info
  '/faq',                     // FAQ - common questions
];

const BASE_URL = typeof window !== 'undefined'
  ? window.location.origin
  : 'https://www.microhabitat.com';

const CACHE_KEY = 'microhabitat_knowledge_cache';
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

interface CachedContent {
  timestamp: number;
  content: string;
  pages: string[];
}

export interface CrawlProgress {
  current: number;
  total: number;
  status: string;
}

export type ProgressCallback = (progress: CrawlProgress) => void;

/**
 * Extract text content from HTML
 */
function extractTextFromHTML(html: string, url: string): string {
  // Create a temporary DOM parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Remove script, style, nav, footer, and other non-content elements
  const elementsToRemove = doc.querySelectorAll(
    'script, style, nav, footer, header, aside, .navbar, .footer, ' +
    '[role="navigation"], [role="banner"], [aria-hidden="true"], ' +
    '.cookie-banner, .chat-widget, #chat-panel'
  );
  elementsToRemove.forEach(el => el.remove());

  // Get the main content
  const mainContent = doc.querySelector('main') || doc.body;

  // Extract text from specific content areas
  const contentParts: string[] = [];

  // Get page title
  const title = doc.querySelector('h1')?.textContent?.trim();
  if (title) {
    contentParts.push(`# ${title}`);
  }

  // Get section headings and their content
  const sections = mainContent.querySelectorAll('section, article, [class*="section"]');

  if (sections.length > 0) {
    sections.forEach(section => {
      const heading = section.querySelector('h1, h2, h3')?.textContent?.trim();
      const paragraphs = section.querySelectorAll('p, li');

      if (heading) {
        contentParts.push(`\n## ${heading}`);
      }

      paragraphs.forEach(p => {
        const text = p.textContent?.trim();
        if (text && text.length > 20) {
          contentParts.push(text);
        }
      });
    });
  } else {
    // Fallback: get all paragraphs and list items
    const allContent = mainContent.querySelectorAll('p, li, h2, h3');
    allContent.forEach(el => {
      const text = el.textContent?.trim();
      if (text && text.length > 20) {
        if (el.tagName === 'H2' || el.tagName === 'H3') {
          contentParts.push(`\n## ${text}`);
        } else {
          contentParts.push(text);
        }
      }
    });
  }

  // Add page URL as context
  const pageName = url === '/' ? 'Home' : url.replace(/^\//, '').replace(/-/g, ' ');
  const pageHeader = `\n=== ${pageName.charAt(0).toUpperCase() + pageName.slice(1)} Page ===\n`;

  return pageHeader + contentParts.join('\n');
}

/**
 * Fetch a single page and extract its content
 */
async function fetchPageContent(path: string): Promise<string> {
  try {
    const url = `${BASE_URL}${path}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'text/html',
      },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch ${path}: ${response.status}`);
      return '';
    }

    const html = await response.text();
    return extractTextFromHTML(html, path);
  } catch (error) {
    console.warn(`Error fetching ${path}:`, error);
    return '';
  }
}

/**
 * Get cached content if valid
 */
function getCachedContent(): CachedContent | null {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const parsed: CachedContent = JSON.parse(cached);
    const age = Date.now() - parsed.timestamp;

    if (age < CACHE_DURATION) {
      return parsed;
    }
  } catch (e) {
    console.warn('Error reading cache:', e);
  }

  return null;
}

/**
 * Save content to cache
 */
function saveToCache(content: string, pages: string[]): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheData: CachedContent = {
      timestamp: Date.now(),
      content,
      pages,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (e) {
    console.warn('Error saving to cache:', e);
  }
}

/**
 * Crawl the website and build knowledge base
 */
export async function crawlWebsite(onProgress?: ProgressCallback): Promise<string> {
  // Check cache first
  const cached = getCachedContent();
  if (cached) {
    console.log('Using cached website content');
    onProgress?.({ current: PAGES_TO_CRAWL.length, total: PAGES_TO_CRAWL.length, status: 'Using cached content' });
    return cached.content;
  }

  console.log('Crawling website for knowledge base...');
  const contentParts: string[] = [];

  // Add intro header
  contentParts.push(`
=== MicroHabitat Knowledge Base ===
Crawled from www.microhabitat.com
Last updated: ${new Date().toISOString()}
  `.trim());

  // Crawl each page
  for (let i = 0; i < PAGES_TO_CRAWL.length; i++) {
    const path = PAGES_TO_CRAWL[i];
    onProgress?.({
      current: i + 1,
      total: PAGES_TO_CRAWL.length,
      status: `Crawling ${path}...`
    });

    const content = await fetchPageContent(path);
    if (content) {
      contentParts.push(content);
    }

    // Small delay to avoid overwhelming the server
    if (i < PAGES_TO_CRAWL.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  const fullContent = contentParts.join('\n\n');

  // Save to cache
  saveToCache(fullContent, PAGES_TO_CRAWL);

  onProgress?.({
    current: PAGES_TO_CRAWL.length,
    total: PAGES_TO_CRAWL.length,
    status: 'Complete'
  });

  console.log(`Crawled ${PAGES_TO_CRAWL.length} pages, ${fullContent.length} characters`);
  return fullContent;
}

/**
 * Clear the content cache (useful for testing or forcing refresh)
 */
export function clearCache(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CACHE_KEY);
  console.log('Knowledge cache cleared');
}

/**
 * Check if content is cached
 */
export function isCached(): boolean {
  return getCachedContent() !== null;
}

/**
 * Get cache age in minutes
 */
export function getCacheAge(): number | null {
  const cached = getCachedContent();
  if (!cached) return null;
  return Math.round((Date.now() - cached.timestamp) / 1000 / 60);
}
