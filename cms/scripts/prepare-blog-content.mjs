#!/usr/bin/env node
/**
 * Blog Content Preparation Script
 *
 * This script:
 * 1. Fetches full blog content from microhabitat.com
 * 2. Uses Ollama (llama3.1:8b) to analyze and format content with proper HTML structure
 * 3. Saves formatted content to a JSON file for Strapi bootstrap
 *
 * Usage: node cms/scripts/prepare-blog-content.mjs
 *
 * Prerequisites:
 * - Ollama running on localhost:11434 with llama3.1:8b model
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const LIVE_SITE = 'https://www.microhabitat.com';

// Blog posts from our local data
function parseBlogData() {
  const content = readFileSync(join(__dirname, '../../lib/blog-data.ts'), 'utf-8');
  const posts = [];

  // Match individual post objects - handle escaped quotes and special chars
  const postRegex = /\{\s*title:\s*"((?:[^"\\]|\\.)*)"\s*,\s*excerpt:\s*"((?:[^"\\]|\\.)*)"\s*,\s*categories:\s*\[([^\]]*)\]\s*,\s*author:\s*"([^"]*)"\s*,\s*date:\s*"([^"]*)"\s*,\s*slug:\s*"([^"]*)"\s*,\s*image:\s*"([^"]*)"\s*,?\s*\}/g;

  let match;
  while ((match = postRegex.exec(content)) !== null) {
    posts.push({
      title: match[1].replace(/\\"/g, '"').replace(/\\'/g, "'"),
      excerpt: match[2].replace(/\\"/g, '"').replace(/\\'/g, "'"),
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
  console.log(`  📥 Fetching: ${slug}`);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();

    // Extract text content from HTML - look for paragraphs and headings
    const textParts = [];

    // Extract paragraphs
    const pMatches = html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    for (const m of pMatches) {
      const text = m[1].replace(/<[^>]+>/g, '').trim();
      if (text.length > 50 && !text.includes('Subscribe') && !text.includes('newsletter')) {
        textParts.push(text);
      }
    }

    // Extract headings
    const hMatches = html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi);
    for (const m of hMatches) {
      const text = m[1].replace(/<[^>]+>/g, '').trim();
      if (text.length > 5) {
        textParts.push(`## ${text}`);
      }
    }

    return textParts.slice(0, 15).join('\n\n');
  } catch (error) {
    return null;
  }
}

// Use Ollama to format and structure the content
async function formatWithOllama(rawContent, title, excerpt) {
  console.log(`  🤖 Formatting with Ollama...`);

  const prompt = `You are formatting content for a professional urban farming blog. Create clean, well-structured HTML.

CRITICAL REQUIREMENTS:
1. Output ONLY valid HTML - no markdown, no code blocks, no explanations
2. Use <h2> for main section headings, <h3> for sub-headings
3. Wrap ALL text in <p> tags - this is critical for proper paragraph spacing
4. Use <ul>/<ol> with <li> for lists
5. Keep content professional and informative
6. Each paragraph should be substantial (2-4 sentences)
7. Include 4-6 paragraphs total with 1-2 headings
8. Content should relate to: ${title}

ARTICLE TOPIC: ${title}
SUMMARY: ${excerpt}

${rawContent ? `EXTRACTED CONTENT:\n${rawContent.substring(0, 2000)}` : 'Generate relevant content about this topic.'}

OUTPUT (valid HTML paragraphs and headings only, no markdown, no code blocks):`;

  try {
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.1:8b',
        prompt,
        stream: false,
        options: {
          temperature: 0.4,
          num_predict: 1500,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const result = await response.json();
    let content = result.response.trim();

    // Clean up any markdown artifacts
    content = content
      .replace(/^```html?\n?/gmi, '')
      .replace(/\n?```$/gmi, '')
      .replace(/^html\s*\n/gmi, '')
      .replace(/^\*\*/gm, '')
      .replace(/\*\*$/gm, '')
      .trim();

    // If content doesn't start with HTML tag, wrap it
    if (!content.startsWith('<')) {
      content = `<p>${content.split('\n\n')[0]}</p>`;
    }

    return content;
  } catch (error) {
    console.log(`  ⚠️  Ollama error, using fallback`);
    return generateFallbackContent(title, excerpt);
  }
}

// Generate fallback content when Ollama fails
function generateFallbackContent(title, excerpt) {
  return `<p>${excerpt}</p>

<h2>Understanding the Topic</h2>

<p>This article explores ${title.toLowerCase()}. At MicroHabitat, we're committed to transforming urban spaces into productive, sustainable environments that benefit communities and businesses alike.</p>

<p>Urban farming is revolutionizing how we think about food production in cities. By transforming underutilized spaces into productive green areas, we create more sustainable, resilient communities while providing fresh, local produce to urban residents.</p>

<h2>Key Benefits</h2>

<p>Properties implementing urban farming programs see increased tenant satisfaction, improved air quality, and enhanced biodiversity. For businesses, urban farms contribute to sustainability goals and support green building certifications like LEED, WELL, and BREEAM.</p>

<p>Through our programs, communities connect with the food they eat through educational workshops, harvest events, and volunteer opportunities. This creates meaningful engagement that benefits everyone involved.</p>`;
}

// Ensure HTML is properly formatted
function validateHtml(html) {
  let validated = html;

  // Remove any remaining markdown
  validated = validated.replace(/#{1,6}\s+/g, '');
  validated = validated.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  validated = validated.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Ensure paragraphs have line breaks for readability in CMS
  validated = validated
    .replace(/<\/p>\s*<p>/g, '</p>\n\n<p>')
    .replace(/<\/p>\s*<h/g, '</p>\n\n<h')
    .replace(/<\/h([23])>\s*<p>/g, '</h$1>\n\n<p>')
    .replace(/<\/h([23])>\s*<h/g, '</h$1>\n\n<h');

  return validated.trim();
}

// Main execution
async function main() {
  console.log('🌱 Blog Content Preparation');
  console.log('============================\n');

  // Check Ollama
  console.log('🔍 Checking Ollama...');
  try {
    const check = await fetch(`${OLLAMA_URL}/api/tags`);
    if (!check.ok) throw new Error('Not responding');
    const models = await check.json();
    const hasLlama = models.models?.some(m => m.name.includes('llama3.1'));
    if (!hasLlama) {
      console.log('⚠️  llama3.1:8b not found, will use fallback content');
    } else {
      console.log('✅ Ollama ready with llama3.1:8b\n');
    }
  } catch (error) {
    console.log('⚠️  Ollama not available, will use fallback content\n');
  }

  // Parse blog posts
  console.log('📖 Parsing blog-data.ts...');
  const posts = parseBlogData();
  console.log(`✅ Found ${posts.length} posts\n`);

  // Process all posts
  console.log('🚀 Processing blog posts...\n');
  const processedPosts = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log(`[${i + 1}/${posts.length}] ${post.title.substring(0, 50)}...`);

    // Fetch raw content
    const rawContent = await fetchBlogContent(post.slug);

    // Format with Ollama
    const formattedContent = await formatWithOllama(rawContent, post.title, post.excerpt);

    // Validate HTML
    const validatedContent = validateHtml(formattedContent);

    processedPosts.push({
      ...post,
      content: validatedContent,
    });

    console.log(`  ✅ Done\n`);

    // Small delay
    await new Promise(r => setTimeout(r, 300));
  }

  // Save to JSON
  const outputPath = join(__dirname, '../data/blog-posts.json');
  writeFileSync(outputPath, JSON.stringify(processedPosts, null, 2));

  console.log('============================');
  console.log(`✅ Saved ${processedPosts.length} posts to:`);
  console.log(`   ${outputPath}`);
  console.log('\nNow restart Strapi with FORCE_SEED=true to seed the database.');
}

main().catch(console.error);
