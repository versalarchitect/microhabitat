import type { GlobalConfig } from 'payload';
import { seoFields } from '../fields/seo';

export const CareersPage: GlobalConfig = {
  slug: 'careers-page',
  label: 'Careers Page',
  admin: {
    description: 'Careers page content and SEO',
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
      name: 'introText',
      type: 'textarea',
      localized: true,
    },
    // Values section
    {
      name: 'valuesLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'valuesTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'values',
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
    // Why Join section
    {
      name: 'whyJoinLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'whyJoinTitle',
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
