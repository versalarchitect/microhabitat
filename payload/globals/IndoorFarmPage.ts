import type { GlobalConfig } from 'payload';
import { seoFields } from '../fields/seo';

export const IndoorFarmPage: GlobalConfig = {
  slug: 'indoor-farm-page',
  label: 'Indoor Farm Page',
  admin: {
    description: 'Indoor farm page content and SEO',
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
    {
      name: 'heroDescription',
      type: 'textarea',
      required: true,
      localized: true,
    },
    // Features section
    {
      name: 'featuresLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'featuresTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'features',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    // Benefits section
    {
      name: 'benefitsLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'benefitsTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'benefits',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
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
