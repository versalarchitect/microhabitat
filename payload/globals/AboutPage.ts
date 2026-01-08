import type { GlobalConfig } from 'payload';
import { seoFields } from '../fields/seo';

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  admin: {
    description: 'About page content and SEO',
  },
  fields: [
    // Hero section
    {
      name: 'heroLabel',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'heroTitleHighlight',
      type: 'text',
      required: true,
      localized: true,
    },
    // Mission section
    {
      name: 'missionLabel',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'missionTitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'missionParagraph1',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'missionParagraph2',
      type: 'textarea',
      localized: true,
    },
    // Solidarity section
    {
      name: 'solidarityLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'solidarityTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'solidarityDescription',
      type: 'textarea',
      localized: true,
    },
    // Impact stats
    {
      name: 'impactStats',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    // Story section
    {
      name: 'storyLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'storyTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'storyContent',
      type: 'richText',
      localized: true,
    },
    // CTA section
    {
      name: 'ctaTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaDescription',
      type: 'textarea',
      localized: true,
    },
    ...seoFields,
  ],
};
