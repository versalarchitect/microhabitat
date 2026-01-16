#!/usr/bin/env tsx
/**
 * CMS Data Seed Script
 *
 * Migrates hardcoded content to Payload CMS:
 * - Cities with descriptions and highlights
 * - Blog posts with full content
 *
 * Usage:
 *   npx tsx scripts/seed-cms-data.ts
 *   npx tsx scripts/seed-cms-data.ts --cities-only
 *   npx tsx scripts/seed-cms-data.ts --blog-only
 *   npx tsx scripts/seed-cms-data.ts --dry-run
 *
 * Prerequisites:
 *   - Database connection configured (POSTGRES_URL)
 *   - PAYLOAD_SECRET environment variable set
 */

import { getPayload } from 'payload';
import config from '../payload.config';

// ============================================
// CLI ARGUMENTS
// ============================================

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const CITIES_ONLY = args.includes('--cities-only');
const BLOG_ONLY = args.includes('--blog-only');

// ============================================
// LOGGING
// ============================================

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
};

const log = {
  info: (msg: string) => console.log(`${colors.cyan}[INFO]${colors.reset} ${msg}`),
  success: (msg: string) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${msg}`),
  warn: (msg: string) => console.log(`${colors.yellow}[WARN]${colors.reset} ${msg}`),
  error: (msg: string) => console.error(`${colors.red}[ERROR]${colors.reset} ${msg}`),
  dry: (msg: string) => console.log(`${colors.dim}[DRY-RUN]${colors.reset} ${msg}`),
  divider: () => console.log(`${colors.dim}${'─'.repeat(60)}${colors.reset}`),
};

// ============================================
// CITY DATA
// ============================================

interface CityData {
  name: string;
  country: string;
  region: 'north-america' | 'europe';
  regionName: string;
  slug: string;
  description: string;
  highlights: string[];
}

const CITIES: CityData[] = [
  // Canada
  {
    name: 'Montreal',
    country: 'Canada',
    region: 'north-america',
    regionName: 'Quebec',
    slug: 'montreal',
    description: "Join Montreal's thriving urban agriculture movement. As our headquarters city, Montreal is home to our largest network of rooftop farms, serving commercial properties, corporations, and schools across the island.",
    highlights: ['50+ urban farms across the city', 'Home to MicroHabitat headquarters', 'Partnerships with major real estate companies', 'Strong food bank donation program'],
  },
  {
    name: 'Toronto',
    country: 'Canada',
    region: 'north-america',
    regionName: 'Ontario',
    slug: 'toronto',
    description: "Toronto's urban farming scene is growing rapidly. We're proud to serve properties across the GTA, bringing fresh produce and community engagement to one of North America's largest cities.",
    highlights: ['30+ urban farms in the GTA', 'Corporate and commercial partnerships', 'Year-round indoor farming options', 'Educational programs for schools'],
  },
  {
    name: 'Vancouver',
    country: 'Canada',
    region: 'north-america',
    regionName: 'British Columbia',
    slug: 'vancouver',
    description: "Vancouver's mild climate makes it ideal for urban farming. Our West Coast team brings year-round growing opportunities to properties across Metro Vancouver.",
    highlights: ['Extended growing season', 'Rooftop and ground-level farms', 'Strong sustainability focus', 'Indigenous partnership programs'],
  },
  {
    name: 'Calgary',
    country: 'Canada',
    region: 'north-america',
    regionName: 'Alberta',
    slug: 'calgary',
    description: "Calgary's urban farming community is growing. We're bringing sustainable agriculture to Alberta's largest city with programs tailored to the prairie climate.",
    highlights: ['Climate-adapted growing programs', 'Indoor farming solutions', 'Corporate engagement focus', 'Growing network of partners'],
  },
  {
    name: 'Edmonton',
    country: 'Canada',
    region: 'north-america',
    regionName: 'Alberta',
    slug: 'edmonton',
    description: 'Edmonton is embracing urban agriculture. Our programs are designed to thrive in northern climates while engaging communities year-round.',
    highlights: ['Northern climate expertise', 'Indoor growing solutions', 'School and community programs', 'Food security initiatives'],
  },
  {
    name: 'Victoria',
    country: 'Canada',
    region: 'north-america',
    regionName: 'British Columbia',
    slug: 'victoria',
    description: "Victoria's temperate climate is perfect for urban farming. We're growing food and community connections across Vancouver Island.",
    highlights: ['Mild year-round climate', 'Strong local food movement', 'Community-focused programs', 'Biodiversity initiatives'],
  },
  // USA
  {
    name: 'New York City',
    country: 'USA',
    region: 'north-america',
    regionName: 'New York',
    slug: 'new-york',
    description: "NYC is home to some of our most innovative urban farms. From Brooklyn rooftops to Manhattan terraces, we're transforming the concrete jungle into a greener, more sustainable city.",
    highlights: ['Rooftop farms across all boroughs', 'Major commercial partnerships', 'Green building certification support', 'Food bank donation programs'],
  },
  {
    name: 'Chicago',
    country: 'USA',
    region: 'north-america',
    regionName: 'Illinois',
    slug: 'chicago',
    description: "Chicago's urban farming scene is thriving. We're bringing sustainable agriculture to the Windy City with programs designed for the Midwest climate.",
    highlights: ['Growing network of farms', 'Corporate partnerships', 'School engagement programs', 'Community food initiatives'],
  },
  {
    name: 'Dallas',
    country: 'USA',
    region: 'north-america',
    regionName: 'Texas',
    slug: 'dallas',
    description: "Dallas-Fort Worth is embracing urban agriculture. Our Texas team is bringing sustainable growing solutions to one of America's fastest-growing metros.",
    highlights: ['Heat-adapted growing programs', 'Corporate campus farms', 'Year-round growing potential', 'Expanding partner network'],
  },
  {
    name: 'Los Angeles',
    country: 'USA',
    region: 'north-america',
    regionName: 'California',
    slug: 'los-angeles',
    description: "LA's climate is ideal for urban farming. We're serving properties across Southern California with year-round growing programs and community engagement.",
    highlights: ['Year-round growing season', 'Diverse crop options', 'Water-efficient systems', 'Entertainment industry partnerships'],
  },
  {
    name: 'San Francisco',
    country: 'USA',
    region: 'north-america',
    regionName: 'California',
    slug: 'san-francisco',
    description: 'The Bay Area is a leader in sustainability, and urban farming is no exception. Our SF team serves properties across the region with innovative growing solutions.',
    highlights: ['Tech campus partnerships', 'Sustainability leadership', 'Strong local food culture', 'LEED certification support'],
  },
  {
    name: 'Washington D.C.',
    country: 'USA',
    region: 'north-america',
    regionName: 'District of Columbia',
    slug: 'washington-dc',
    description: "The nation's capital is going green with urban farming. We're serving government buildings, corporate offices, and schools across the DC metro area.",
    highlights: ['Government building programs', 'Corporate campus farms', 'Educational partnerships', 'Sustainability initiatives'],
  },
  {
    name: 'Denver',
    country: 'USA',
    region: 'north-america',
    regionName: 'Colorado',
    slug: 'denver',
    description: "Denver's mile-high altitude doesn't stop us from growing. Our Colorado team brings urban farming expertise to the Rocky Mountain region.",
    highlights: ['High-altitude growing expertise', 'Strong outdoor culture', 'Corporate wellness programs', 'Community engagement focus'],
  },
  {
    name: 'Columbus',
    country: 'USA',
    region: 'north-america',
    regionName: 'Ohio',
    slug: 'columbus',
    description: "Columbus is embracing urban agriculture with open arms. We're growing food and community connections across Ohio's capital city.",
    highlights: ['Growing partner network', 'University partnerships', 'Corporate programs', 'Food security initiatives'],
  },
  {
    name: 'Seattle',
    country: 'USA',
    region: 'north-america',
    regionName: 'Washington',
    slug: 'seattle',
    description: "Seattle's tech-forward culture extends to urban farming. We're serving the Pacific Northwest with sustainable growing programs year-round.",
    highlights: ['Tech company partnerships', 'Sustainability focus', 'Rain-friendly growing systems', 'Strong local food culture'],
  },
  // Europe
  {
    name: 'Amsterdam',
    country: 'Netherlands',
    region: 'europe',
    regionName: 'North Holland',
    slug: 'amsterdam',
    description: "Amsterdam leads the way in European urban farming. Our Dutch team brings sustainable agriculture to one of the world's most innovative cities.",
    highlights: ['European headquarters', 'Sustainability leadership', 'Corporate partnerships', 'Urban innovation hub'],
  },
  {
    name: 'Berlin',
    country: 'Germany',
    region: 'europe',
    regionName: 'Brandenburg',
    slug: 'berlin',
    description: "Berlin's creative spirit extends to urban farming. We're growing food and community connections across Germany's capital.",
    highlights: ['Strong sustainability culture', 'Corporate engagement', 'Community programs', 'Growing network'],
  },
  {
    name: 'London',
    country: 'UK',
    region: 'europe',
    regionName: 'England',
    slug: 'london',
    description: 'London is embracing rooftop farming like never before. Our UK team serves properties across the capital with sustainable urban agriculture programs.',
    highlights: ['Major commercial partnerships', 'BREEAM certification support', 'Corporate programs', 'Food bank donations'],
  },
  {
    name: 'Paris',
    country: 'France',
    region: 'europe',
    regionName: 'Ile-de-France',
    slug: 'paris',
    description: "Paris is becoming a leader in urban agriculture. We're bringing fresh produce and community engagement to the City of Light.",
    highlights: ['Rooftop farm programs', 'Gastronomic partnerships', 'Corporate engagement', 'Sustainability initiatives'],
  },
  {
    name: 'Zurich',
    country: 'Switzerland',
    region: 'europe',
    regionName: 'Canton of Zurich',
    slug: 'zurich',
    description: "Zurich's commitment to sustainability aligns perfectly with urban farming. Our Swiss team brings fresh produce to one of Europe's most livable cities.",
    highlights: ['Corporate campus farms', 'High sustainability standards', 'Financial sector partnerships', 'Community programs'],
  },
];

// ============================================
// LEXICAL CONTENT CONVERSION
// ============================================

/**
 * Convert HTML content to Lexical editor format
 * This creates a simple text representation - full HTML parsing would require a dedicated library
 */
function htmlToLexical(html: string): object {
  // Strip HTML tags for plain text content
  const plainText = html
    .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '\n\n$1\n\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '• $1\n')
    .replace(/<ul[^>]*>|<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>|<\/ol>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '$2 ($1)')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Split into paragraphs
  const paragraphs = plainText.split(/\n\n+/).filter(Boolean);

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            format: 0,
            mode: 'normal',
            style: '',
            detail: 0,
            text: text.trim(),
            version: 1,
          },
        ],
        direction: 'ltr',
      })),
      direction: 'ltr',
    },
  };
}

// ============================================
// CITY SEEDING
// ============================================

async function seedCities(payload: Awaited<ReturnType<typeof getPayload>>) {
  log.info('Starting city data migration...');
  log.divider();

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const city of CITIES) {
    try {
      // Check if city exists
      const existing = await payload.find({
        collection: 'cities',
        where: { slug: { equals: city.slug } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        const existingCity = existing.docs[0];
        const hasDescription = !!(existingCity as { description?: string }).description;
        const hasHighlights = ((existingCity as { highlights?: unknown[] }).highlights || []).length > 0;

        if (!hasDescription || !hasHighlights) {
          if (DRY_RUN) {
            log.dry(`Would update: ${city.name}`);
          } else {
            await payload.update({
              collection: 'cities',
              id: existingCity.id,
              data: {
                regionName: city.regionName,
                description: city.description,
                highlights: city.highlights.map((text) => ({ text })),
              },
            });
            log.success(`Updated: ${city.name}`);
          }
          updated++;
        } else {
          log.info(`Skipped: ${city.name} (already complete)`);
          skipped++;
        }
      } else {
        if (DRY_RUN) {
          log.dry(`Would create: ${city.name}`);
        } else {
          await payload.create({
            collection: 'cities',
            data: {
              name: city.name,
              country: city.country,
              region: city.region,
              regionName: city.regionName,
              slug: city.slug,
              description: city.description,
              highlights: city.highlights.map((text) => ({ text })),
              order: CITIES.indexOf(city),
            },
          });
          log.success(`Created: ${city.name}`);
        }
        created++;
      }
    } catch (error) {
      log.error(`Failed: ${city.name} - ${error}`);
    }
  }

  log.divider();
  log.info(`Cities: ${created} created, ${updated} updated, ${skipped} skipped`);
}

// ============================================
// BLOG POST SEEDING
// ============================================

async function seedBlogPosts(payload: Awaited<ReturnType<typeof getPayload>>) {
  log.info('Starting blog post migration...');
  log.divider();

  // Dynamic import to avoid bundling large data
  const { blogPosts } = await import('../lib/blog-data');

  let created = 0;
  let skipped = 0;
  let failed = 0;

  // Category mapping from legacy to CMS values
  const categoryMap: Record<string, string> = {
    ESG: 'ESG',
    CSR: 'CSR',
    Sustainability: 'Sustainability',
    'Green Certifications': 'Green Buildings',
    BREEAM: 'Green Buildings',
    LEED: 'Green Buildings',
    WELL: 'Green Buildings',
    Fitwel: 'Green Buildings',
    BOMA: 'Green Buildings',
    'B Corp': 'Green Buildings',
    Farming: 'Urban Farming',
    Innovation: 'Urban Farming',
    Gardening: 'Urban Farming',
    Brand: 'News',
    News: 'News',
    Certification: 'Green Buildings',
    'Client Highlight': 'Case Studies',
    'Case Study': 'Case Studies',
    'United Nations': 'News',
  };

  const validCategories = ['CSR', 'ESG', 'Green Buildings', 'Urban Farming', 'Sustainability', 'News', 'Case Studies', 'Education'];

  for (const post of blogPosts) {
    try {
      // Check if post exists
      const existing = await payload.find({
        collection: 'blog-posts',
        where: { slug: { equals: post.slug } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        log.info(`Skipped: "${post.title.substring(0, 40)}..." (exists)`);
        skipped++;
        continue;
      }

      // Map and filter categories
      const mappedCategories = post.categories
        .map((cat) => categoryMap[cat] || cat)
        .filter((cat) => validCategories.includes(cat))
        .filter((cat, idx, arr) => arr.indexOf(cat) === idx);

      // Use at least one category
      if (mappedCategories.length === 0) {
        mappedCategories.push('News');
      }

      if (DRY_RUN) {
        log.dry(`Would create: "${post.title.substring(0, 40)}..."`);
        created++;
        continue;
      }

      // Convert HTML content to Lexical format
      const lexicalContent = post.content ? htmlToLexical(post.content) : undefined;

      await payload.create({
        collection: 'blog-posts',
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: lexicalContent,
          author: post.author,
          publishedDate: post.date,
          categories: mappedCategories as (
            | 'CSR'
            | 'ESG'
            | 'Green Buildings'
            | 'Urban Farming'
            | 'Sustainability'
            | 'News'
            | 'Case Studies'
            | 'Education'
          )[],
          _status: 'published',
        },
      });

      log.success(`Created: "${post.title.substring(0, 40)}..."`);
      created++;
    } catch (error) {
      log.error(`Failed: "${post.title.substring(0, 40)}..." - ${error}`);
      failed++;
    }
  }

  log.divider();
  log.info(`Blog posts: ${created} created, ${skipped} skipped, ${failed} failed`);
}

// ============================================
// MAIN
// ============================================

async function main() {
  console.log('\n');
  log.info('═'.repeat(60));
  log.info('       CMS DATA SEED SCRIPT');
  log.info('═'.repeat(60));
  console.log('\n');

  if (DRY_RUN) {
    log.warn('DRY RUN MODE - No changes will be made\n');
  }

  try {
    log.info('Connecting to database...');
    const payload = await getPayload({ config });
    log.success('Connected!\n');

    if (!BLOG_ONLY) {
      await seedCities(payload);
      console.log('\n');
    }

    if (!CITIES_ONLY) {
      await seedBlogPosts(payload);
      console.log('\n');
    }

    log.info('═'.repeat(60));
    log.success('Seed script completed successfully!');
    log.info('═'.repeat(60));

    if (DRY_RUN) {
      console.log('\n');
      log.info('Run without --dry-run to apply changes');
    }
  } catch (error) {
    log.error(`Seed script failed: ${error}`);
    process.exit(1);
  }

  process.exit(0);
}

main();
