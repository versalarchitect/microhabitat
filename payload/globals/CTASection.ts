import type { GlobalConfig } from 'payload';

export const CTASection: GlobalConfig = {
  slug: 'cta-section',
  label: 'CTA Section',
  admin: {
    description: 'Call-to-action section content (bottom of homepage)',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'headingHighlight',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'ctaPrimary',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Primary button text',
      },
    },
    {
      name: 'ctaSecondary',
      type: 'text',
      localized: true,
      admin: {
        description: 'Secondary button/link text',
      },
    },
    {
      name: 'ctaSecondaryEmail',
      type: 'email',
      admin: {
        description: 'Email for secondary CTA',
      },
    },
    {
      name: 'trustIndicators',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'indicator',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Trust badges/indicators (e.g., "100+ Happy Clients")',
      },
    },
  ],
};
