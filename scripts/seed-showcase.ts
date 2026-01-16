#!/usr/bin/env tsx
import { getPayload } from 'payload';
import config from '../payload.config';
import fs from 'fs';
import path from 'path';

const SHOWCASE_IMAGES = [
  { filename: 'urban-rooftop-farm.webp', alt: 'Urban rooftop farm with lush vegetables' },
  { filename: 'team-photo.webp', alt: 'MicroHabitat team members working together' },
  { filename: 'fresh-produce.webp', alt: 'Fresh locally grown produce' },
  { filename: 'community-engagement.webp', alt: 'Community engagement activity on Toronto rooftop' },
  { filename: 'toronto-rooftop.webp', alt: 'Rooftop urban farm in Toronto' },
  { filename: 'educational-activities.webp', alt: 'Educational urban farming activities' },
];

async function main() {
  console.log('Connecting to Payload...');
  const payload = await getPayload({ config });
  console.log('Connected!');

  const showcaseDir = path.join(process.cwd(), 'public', 'images', 'showcase');
  const uploadedImages: Array<{ id: number; alt: string }> = [];

  for (const image of SHOWCASE_IMAGES) {
    const imagePath = path.join(showcaseDir, image.filename);
    if (!fs.existsSync(imagePath)) {
      console.log(`Skipping ${image.filename} - not found`);
      continue;
    }

    // Check if exists
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: image.filename } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      console.log(`Image exists: ${image.filename}`);
      uploadedImages.push({ id: existing.docs[0].id as number, alt: image.alt });
      continue;
    }

    const fileBuffer = fs.readFileSync(imagePath);
    const fileStats = fs.statSync(imagePath);

    const uploaded = await payload.create({
      collection: 'media',
      data: { alt: image.alt },
      file: {
        data: fileBuffer,
        mimetype: 'image/webp',
        name: image.filename,
        size: fileStats.size,
      },
    });

    console.log(`Uploaded: ${image.filename}`);
    uploadedImages.push({ id: uploaded.id as number, alt: image.alt });
  }

  if (uploadedImages.length > 0) {
    await payload.updateGlobal({
      slug: 'showcase-section',
      data: {
        label: 'Our Work',
        heading: 'Transforming urban spaces into',
        headingHighlight: 'thriving ecosystems',
        images: uploadedImages.map((img) => ({ image: img.id, alt: img.alt })),
      },
    });
    console.log('Showcase section updated with ' + uploadedImages.length + ' images!');
  }

  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
