/**
 * OG Image Generator for MicroHabitat
 *
 * Uses sharp (open source image processing library) to generate
 * Open Graph images for all pages and social media platforms.
 *
 * Run with: bun run scripts/generate-og-images.ts
 */

import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// OG image sizes for different platforms
const OG_SIZES = {
  // Universal (works on most platforms)
  universal: { width: 1200, height: 630, name: 'og' },
  // Twitter/X large card
  twitter: { width: 1200, height: 675, name: 'twitter' },
  // Twitter/X small card
  twitterSmall: { width: 800, height: 418, name: 'twitter-small' },
  // LinkedIn
  linkedin: { width: 1200, height: 627, name: 'linkedin' },
  // Facebook
  facebook: { width: 1200, height: 630, name: 'facebook' },
  // WhatsApp
  whatsapp: { width: 1200, height: 630, name: 'whatsapp' },
  // Slack
  slack: { width: 1200, height: 630, name: 'slack' },
  // Discord
  discord: { width: 1200, height: 630, name: 'discord' },
  // Pinterest
  pinterest: { width: 1000, height: 1500, name: 'pinterest' },
} as const;

// Page configurations with best matching images
// Helper to escape special characters for SVG text
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const PAGES = [
  {
    slug: 'home',
    title: 'MicroHabitat',
    subtitle: 'Urban Farming Solutions',
    description: 'Transforming cities through urban agriculture',
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg',
    // Main rooftop farm image - represents the overall brand
  },
  {
    slug: 'about',
    title: 'About Us',
    subtitle: 'Our Story and Mission',
    description: 'Transforming cities since 2016',
    // Using a different image that doesn't have encoding issues
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg',
  },
  {
    slug: 'outdoor-farm',
    title: 'Outdoor Farms',
    subtitle: 'Rooftop and Terrace Solutions',
    description: 'Transform outdoor spaces into productive farms',
    // Using the same working image
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/cdab09dc-3167-4f11-ac84-618b1d4d4102/Cadillac+Fairview_220+Yonge+St+Toronto-4201_MicroHabitat+2024.jpg',
  },
  {
    slug: 'indoor-farm',
    title: 'Indoor Farms',
    subtitle: 'Year-Round Growing',
    description: 'Bring urban agriculture indoors',
    // Using a working image
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg',
  },
  {
    slug: 'educational-activities',
    title: 'Educational Activities',
    subtitle: 'Team Building and Learning',
    description: 'Hands-on urban farming experiences',
    // Using a working image
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5969186f-511a-4d62-a903-bedd8e8e7f85/Enfant+fille+6.jpg',
  },
  {
    slug: 'commercial-real-estate',
    title: 'Commercial Real Estate',
    subtitle: 'Property Solutions',
    description: 'Urban farming for property portfolios',
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/cdab09dc-3167-4f11-ac84-618b1d4d4102/Cadillac+Fairview_220+Yonge+St+Toronto-4201_MicroHabitat+2024.jpg',
  },
  {
    slug: 'corporations',
    title: 'For Corporations',
    subtitle: 'Workplace Solutions',
    description: 'Sustainable corporate urban farming',
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/cdab09dc-3167-4f11-ac84-618b1d4d4102/Cadillac+Fairview_220+Yonge+St+Toronto-4201_MicroHabitat+2024.jpg',
  },
  {
    slug: 'schools',
    title: 'For Schools',
    subtitle: 'Educational Programs',
    description: 'Urban farming for students',
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5969186f-511a-4d62-a903-bedd8e8e7f85/Enfant+fille+6.jpg',
  },
  {
    slug: 'careers',
    title: 'Careers',
    subtitle: 'Join Our Team',
    description: 'Grow your career with MicroHabitat',
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg',
  },
  {
    slug: 'partnerships',
    title: 'Partnerships',
    subtitle: 'Growing Together',
    description: 'Partner with MicroHabitat',
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg',
  },
  {
    slug: 'community-engagement',
    title: 'Community Engagement',
    subtitle: 'Nourishing Communities',
    description: 'Building community through urban farming',
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg',
  },
  {
    slug: 'cities',
    title: 'Our Cities',
    subtitle: '20+ Cities Worldwide',
    description: 'Urban farming across North America and Europe',
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg',
  },
  {
    slug: 'contact',
    title: 'Contact Us',
    subtitle: 'Get in Touch',
    description: 'Start your urban farming journey',
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg',
  },
  {
    slug: 'faq',
    title: 'FAQ',
    subtitle: 'Frequently Asked Questions',
    description: 'Answers to common questions',
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg',
  },
  {
    slug: 'blog',
    title: 'Blog',
    subtitle: 'News and Insights',
    description: 'Urban farming stories and updates',
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg',
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    subtitle: 'Legal',
    description: 'How we protect your data',
    image: 'https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg',
  },
];

// Brand colors
const BRAND = {
  primary: '#4a7c59', // Sage green
  background: '#f9f7f4', // Warm off-white
  foreground: '#2d2a26', // Warm dark
  muted: '#6b6560', // Muted text
};

async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${url}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function createOGImage(
  page: typeof PAGES[0],
  size: typeof OG_SIZES[keyof typeof OG_SIZES],
  outputDir: string
): Promise<string> {
  const { width, height, name } = size;

  // Download the source image
  console.log(`  Downloading image for ${page.slug}...`);
  const imageBuffer = await downloadImage(page.image);

  // Create the base image - resize and crop to fill
  const baseImage = await sharp(imageBuffer)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .toBuffer();

  // Create a dark overlay for text readability
  const overlay = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0.45 },
    },
  })
    .png()
    .toBuffer();

  // Create gradient overlay (darker at bottom for text)
  const gradientHeight = Math.floor(height * 0.6);
  const gradient = await sharp({
    create: {
      width,
      height: gradientHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0.6 },
    },
  })
    .png()
    .toBuffer();

  // Create brand accent bar
  const accentBar = await sharp({
    create: {
      width: 6,
      height: 80,
      channels: 4,
      background: { r: 74, g: 124, b: 89, alpha: 1 }, // Brand primary color
    },
  })
    .png()
    .toBuffer();

  // Composite all layers
  const composited = await sharp(baseImage)
    .composite([
      {
        input: overlay,
        blend: 'over',
      },
      {
        input: gradient,
        top: height - gradientHeight,
        left: 0,
        blend: 'over',
      },
    ])
    .toBuffer();

  // Create text overlay using SVG
  const titleFontSize = Math.floor(width / 20);
  const subtitleFontSize = Math.floor(width / 40);
  const logoFontSize = Math.floor(width / 50);

  const textSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .title {
          fill: white;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: ${titleFontSize}px;
          font-weight: 500;
        }
        .subtitle {
          fill: rgba(255,255,255,0.9);
          font-family: system-ui, -apple-system, sans-serif;
          font-size: ${subtitleFontSize}px;
          font-weight: 400;
        }
        .logo {
          fill: rgba(255,255,255,0.95);
          font-family: ui-monospace, monospace;
          font-size: ${logoFontSize}px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .accent-bar {
          fill: #4a7c59;
        }
      </style>

      <!-- Brand accent bar -->
      <rect x="60" y="${height - 200}" width="6" height="80" class="accent-bar" />

      <!-- Title -->
      <text x="85" y="${height - 150}" class="title">${escapeXml(page.title)}</text>

      <!-- Subtitle -->
      <text x="85" y="${height - 100}" class="subtitle">${escapeXml(page.subtitle)}</text>

      <!-- Logo/Brand -->
      <text x="${width - 200}" y="60" class="logo">MicroHabitat</text>
    </svg>
  `;

  const textBuffer = Buffer.from(textSvg);

  // Final composition with text
  const finalImage = await sharp(composited)
    .composite([
      {
        input: textBuffer,
        blend: 'over',
      },
    ])
    .jpeg({ quality: 90 })
    .toBuffer();

  // Save the image
  const filename = `${page.slug}-${name}.jpg`;
  const filepath = path.join(outputDir, filename);
  await writeFile(filepath, finalImage);

  return filename;
}

async function generateAllOGImages() {
  const outputDir = path.join(process.cwd(), 'public', 'og-images');

  // Create output directory if it doesn't exist
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}`);
  }

  console.log('Starting OG image generation...\n');

  const results: Record<string, Record<string, string>> = {};

  for (const page of PAGES) {
    console.log(`\nGenerating OG images for: ${page.slug}`);
    results[page.slug] = {};

    // Generate for each platform size
    for (const [platform, size] of Object.entries(OG_SIZES)) {
      try {
        const filename = await createOGImage(page, size, outputDir);
        results[page.slug][platform] = `/og-images/${filename}`;
        console.log(`  ✓ ${platform}: ${filename}`);
      } catch (error) {
        console.error(`  ✗ ${platform}: Failed - ${error}`);
      }
    }
  }

  // Generate a manifest file for easy reference
  const manifestPath = path.join(outputDir, 'manifest.json');
  await writeFile(manifestPath, JSON.stringify(results, null, 2));
  console.log(`\nManifest saved to: ${manifestPath}`);

  // Generate TypeScript types and data
  const tsContent = `// Auto-generated OG image paths
// Run: bun run scripts/generate-og-images.ts to regenerate

export const OG_IMAGES = ${JSON.stringify(results, null, 2)} as const;

export type PageSlug = keyof typeof OG_IMAGES;
export type Platform = keyof typeof OG_IMAGES[PageSlug];
`;

  const tsPath = path.join(process.cwd(), 'src', 'lib', 'og-images.ts');
  await writeFile(tsPath, tsContent);
  console.log(`TypeScript data saved to: ${tsPath}`);

  console.log('\n✅ OG image generation complete!');
  console.log(`Generated ${PAGES.length * Object.keys(OG_SIZES).length} images for ${PAGES.length} pages across ${Object.keys(OG_SIZES).length} platforms.`);
}

// Run the generator
generateAllOGImages().catch(console.error);
