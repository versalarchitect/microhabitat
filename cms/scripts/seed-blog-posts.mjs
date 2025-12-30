/**
 * Intelligent Blog Post Seeder
 *
 * This script:
 * 1. Fetches full blog content from microhabitat.com
 * 2. Uses Ollama (llama3.1:8b) to analyze and format content with proper HTML structure
 * 3. Seeds the Strapi CMS with well-formatted blog posts
 *
 * Usage: node cms/scripts/seed-blog-posts.mjs
 *
 * Prerequisites:
 * - Strapi running on localhost:1337
 * - Ollama running on localhost:11434 with llama3.1:8b model
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const LIVE_SITE = 'https://www.microhabitat.com';

const locales = ['en', 'fr', 'de', 'nl', 'it', 'es'];

// Blog posts data from our local file
const blogPostsPath = join(__dirname, '../../lib/blog-data.ts');
let blogPosts = [];

// Parse blog-data.ts to extract posts
function parseBlogData() {
  const content = readFileSync(blogPostsPath, 'utf-8');

  // Extract the blogPosts array using regex
  const postsMatch = content.match(/export const blogPosts: BlogPost\[\] = \[([\s\S]*?)\];/);
  if (!postsMatch) {
    throw new Error('Could not parse blog-data.ts');
  }

  // Parse each post object
  const postsStr = postsMatch[1];
  const posts = [];

  // Match individual post objects
  const postRegex = /\{\s*title:\s*"([^"]+)",\s*excerpt:\s*"([^"]+)",\s*categories:\s*\[([^\]]*)\],\s*author:\s*"([^"]+)",\s*date:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*image:\s*"([^"]+)",?\s*\}/g;

  let match;
  while ((match = postRegex.exec(postsStr)) !== null) {
    posts.push({
      title: match[1],
      excerpt: match[2],
      categories: match[3].split(',').map(c => c.trim().replace(/"/g, '')).filter(Boolean),
      author: match[4],
      date: match[5],
      slug: match[6],
      image: match[7],
    });
  }

  return posts;
}

// Fetch raw HTML content from a blog post URL
async function fetchBlogContent(slug) {
  const url = `${LIVE_SITE}/blog/${slug}`;
  console.log(`  📥 Fetching: ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
    });

    if (!response.ok) {
      console.log(`  ⚠️  Could not fetch ${slug} (${response.status})`);
      return null;
    }

    const html = await response.text();

    // Extract the main content area from Squarespace HTML
    // Look for the blog-item-content or article body
    const contentMatch = html.match(/<div[^>]*class="[^"]*blog-item-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/article>/i) ||
                        html.match(/<div[^>]*class="[^"]*sqs-block-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi) ||
                        html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);

    if (contentMatch) {
      // Clean up HTML - remove scripts, styles, and excessive whitespace
      let content = Array.isArray(contentMatch) ? contentMatch.join('\n') : contentMatch[1];
      content = content
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<[^>]+class="[^"]*newsletter[^"]*"[^>]*>[\s\S]*?<\/[^>]+>/gi, '')
        .trim();

      return content;
    }

    return null;
  } catch (error) {
    console.log(`  ❌ Error fetching ${slug}:`, error.message);
    return null;
  }
}

// Use Ollama to format and structure the content
async function formatWithOllama(rawContent, title, excerpt) {
  console.log(`  🤖 Processing with Ollama...`);

  const prompt = `You are a content formatter for a professional urban farming blog. Your task is to take raw HTML content and output clean, well-structured HTML for a blog article.

REQUIREMENTS:
1. Output ONLY valid HTML - no markdown, no explanations
2. Use semantic HTML: <h2> for section headings, <h3> for sub-headings
3. Wrap paragraphs in <p> tags - CRITICAL for proper spacing
4. Keep lists as <ul>/<ol> with <li> items
5. Preserve any important quotes or statistics
6. Remove any navigation, buttons, or promotional content
7. Remove any references to newsletters or CTAs
8. Keep the content focused on the article topic
9. If the raw content is mostly empty or navigation, generate 3-4 relevant paragraphs about the topic based on the title and excerpt

TITLE: ${title}
EXCERPT: ${excerpt}

RAW CONTENT:
${rawContent ? rawContent.substring(0, 4000) : 'No content available'}

OUTPUT (clean HTML only):`;

  try {
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.1:8b',
        prompt,
        stream: false,
        options: {
          temperature: 0.3,
          num_predict: 2000,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const result = await response.json();
    let formattedContent = result.response.trim();

    // Clean up any markdown or code blocks that might have slipped in
    formattedContent = formattedContent
      .replace(/^```html?\n?/i, '')
      .replace(/\n?```$/i, '')
      .replace(/^\s*html\s*\n/i, '')
      .trim();

    // Ensure content starts with a tag
    if (!formattedContent.startsWith('<')) {
      formattedContent = `<p>${formattedContent}</p>`;
    }

    return formattedContent;
  } catch (error) {
    console.log(`  ⚠️  Ollama error:`, error.message);
    // Fallback: Create basic content from excerpt
    return `<p>${excerpt}</p>

<h2>About This Article</h2>

<p>This article explores ${title.toLowerCase()}. At MicroHabitat, we're committed to transforming urban spaces into productive, sustainable environments that benefit communities and businesses alike.</p>

<p>Urban farming is revolutionizing how we think about food production in cities. By transforming underutilized spaces into productive green areas, we can create more sustainable, resilient communities while providing fresh, local produce to urban residents.</p>

<p>Through our programs, properties achieve green building certifications, improve tenant satisfaction, and contribute to local food security initiatives.</p>`;
  }
}

// Validate and enhance HTML formatting
function validateHtmlFormatting(html) {
  // Ensure paragraphs have proper spacing (add margin classes or just ensure structure)
  let validated = html;

  // Fix any orphaned text (text not in tags)
  validated = validated.replace(/^([^<]+)$/gm, (match) => {
    if (match.trim()) {
      return `<p>${match.trim()}</p>`;
    }
    return match;
  });

  // Ensure headings are properly wrapped
  validated = validated.replace(/<h2>([^<]*)<\/h2>\s*([^<])/g, '<h2>$1</h2>\n\n<p>$2');
  validated = validated.replace(/<h3>([^<]*)<\/h3>\s*([^<])/g, '<h3>$1</h3>\n\n<p>$2');

  // Add line breaks between major elements for readability
  validated = validated
    .replace(/<\/p>\s*<p>/g, '</p>\n\n<p>')
    .replace(/<\/p>\s*<h/g, '</p>\n\n<h')
    .replace(/<\/h2>\s*<p>/g, '</h2>\n\n<p>')
    .replace(/<\/h3>\s*<p>/g, '</h3>\n\n<p>')
    .replace(/<\/ul>\s*<p>/g, '</ul>\n\n<p>')
    .replace(/<\/ol>\s*<p>/g, '</ol>\n\n<p>');

  return validated;
}

// Create or update a blog post in Strapi
async function seedBlogPost(post, formattedContent, locale = 'en') {
  const endpoint = `${STRAPI_URL}/api/blog-posts`;

  const data = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: formattedContent,
    author: post.author,
    publishedDate: post.date,
    categories: post.categories,
    seo: {
      metaTitle: post.title.substring(0, 60),
      metaDescription: post.excerpt.substring(0, 160),
    },
  };

  try {
    // First, check if post exists
    const checkUrl = `${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${post.slug}&locale=${locale}`;
    const checkResponse = await fetch(checkUrl);
    const existing = await checkResponse.json();

    let response;
    if (existing.data && existing.data.length > 0) {
      // Update existing
      const id = existing.data[0].id;
      response = await fetch(`${endpoint}/${id}?locale=${locale}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
    } else {
      // Create new
      response = await fetch(`${endpoint}?locale=${locale}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
    }

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${error.substring(0, 200)}`);
    }

    return true;
  } catch (error) {
    console.log(`  ❌ Failed to seed "${post.title}":`, error.message);
    return false;
  }
}

// Process a single blog post through the full pipeline
async function processBlogPost(post, index, total) {
  console.log(`\n📝 [${index + 1}/${total}] ${post.title}`);

  // Step 1: Fetch raw content from live site
  const rawContent = await fetchBlogContent(post.slug);

  // Step 2: Format with Ollama
  const formattedContent = await formatWithOllama(rawContent, post.title, post.excerpt);

  // Step 3: Validate HTML structure
  const validatedContent = validateHtmlFormatting(formattedContent);

  // Step 4: Seed to Strapi (English first)
  const success = await seedBlogPost(post, validatedContent, 'en');

  if (success) {
    console.log(`  ✅ Seeded successfully`);
  }

  return { post, content: validatedContent, success };
}

// Main execution
async function main() {
  console.log('🌱 Intelligent Blog Post Seeder');
  console.log('================================\n');

  // Check Ollama availability
  console.log('🔍 Checking Ollama...');
  try {
    const ollamaCheck = await fetch(`${OLLAMA_URL}/api/tags`);
    if (!ollamaCheck.ok) throw new Error('Ollama not responding');
    console.log('✅ Ollama is running\n');
  } catch (error) {
    console.error('❌ Ollama is not available. Please start Ollama first.');
    console.error('   Run: ollama serve');
    process.exit(1);
  }

  // Check Strapi availability
  console.log('🔍 Checking Strapi...');
  try {
    const strapiCheck = await fetch(`${STRAPI_URL}/api/blog-posts`);
    if (strapiCheck.status === 404) {
      console.log('⚠️  Blog posts API not found. Please restart Strapi to register the new content type.');
      console.log('   Run: cd cms && npm run develop');
      process.exit(1);
    }
    console.log('✅ Strapi is running\n');
  } catch (error) {
    console.error('❌ Strapi is not available. Please start Strapi first.');
    console.error('   Run: cd cms && npm run develop');
    process.exit(1);
  }

  // Parse blog posts
  console.log('📖 Parsing blog-data.ts...');
  try {
    blogPosts = parseBlogData();
    console.log(`✅ Found ${blogPosts.length} blog posts\n`);
  } catch (error) {
    console.error('❌ Failed to parse blog-data.ts:', error.message);
    process.exit(1);
  }

  // Process all posts
  console.log('🚀 Starting blog post processing...');
  console.log('   This will fetch, format, and seed each post.\n');

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < blogPosts.length; i++) {
    const result = await processBlogPost(blogPosts[i], i, blogPosts.length);
    results.push(result);

    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Summary
  console.log('\n================================');
  console.log('📊 Seeding Complete!');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log('================================\n');

  if (failCount > 0) {
    console.log('Failed posts:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.post.title}`);
    });
  }
}

main().catch(console.error);
