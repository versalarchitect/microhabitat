import type { CollectionConfig } from 'payload';

export const FAQItems: CollectionConfig = {
  slug: 'faq-items',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
    description: 'Frequently asked questions',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'General Urban Farming Queries', value: 'General Urban Farming Queries' },
        { label: 'About Us', value: 'About Us' },
        { label: 'Technical', value: 'Technical' },
        { label: 'Products and Services', value: 'Products and Services' },
        { label: 'Engagement', value: 'Engagement' },
        { label: 'Collaboration', value: 'Collaboration' },
        { label: 'Getting Started', value: 'Getting Started' },
        { label: 'Safety', value: 'Safety' },
      ],
      localized: true,
      admin: {
        description: 'FAQ category for grouping',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Display order within category (lower numbers appear first)',
      },
    },
  ],
};
