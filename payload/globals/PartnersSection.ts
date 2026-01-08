import type { GlobalConfig } from 'payload';

export const PartnersSection: GlobalConfig = {
  slug: 'partners-section',
  label: 'Partners Section',
  admin: {
    description: 'Partners section header content',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Section label (e.g., "Our Partners")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
};
