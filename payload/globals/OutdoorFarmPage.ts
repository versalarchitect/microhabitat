import type { GlobalConfig } from 'payload';
import { seoFields } from '../fields/seo';

export const OutdoorFarmPage: GlobalConfig = {
  slug: 'outdoor-farm-page',
  label: 'Outdoor Farm Page',
  admin: {
    description: 'Outdoor farm page content and SEO',
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
    // Services section
    {
      name: 'servicesLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'servicesTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'services',
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
    // Gallery section
    {
      name: 'galleryLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'galleryTitle',
      type: 'text',
      localized: true,
    },
    // Packages section
    {
      name: 'packagesLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'packagesTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'packages',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    // Requirements section
    {
      name: 'requirementsLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'requirementsTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'requirementsDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'requirements',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'requirementsCardTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'requirementsCardDescription',
      type: 'textarea',
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
    {
      name: 'ctaViewFaq',
      type: 'text',
      localized: true,
    },
    ...seoFields,
  ],
};
