import type { GlobalConfig } from 'payload';

export const ServicesSection: GlobalConfig = {
  slug: 'services-section',
  label: 'Services Section',
  admin: {
    description: 'Services section header content',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Section label (e.g., "Our Services")',
      },
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
      name: 'ctaText',
      type: 'text',
      localized: true,
      admin: {
        description: 'Call-to-action text',
      },
    },
    {
      name: 'ctaButtonText',
      type: 'text',
      localized: true,
      admin: {
        description: 'Button text',
      },
    },
  ],
};
