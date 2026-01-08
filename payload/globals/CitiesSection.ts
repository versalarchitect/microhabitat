import type { GlobalConfig } from 'payload';

export const CitiesSection: GlobalConfig = {
  slug: 'cities-section',
  label: 'Cities Section',
  admin: {
    description: 'Cities section header content',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Section label (e.g., "Our Locations")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'ctaText',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaButtonText',
      type: 'text',
      localized: true,
    },
  ],
};
