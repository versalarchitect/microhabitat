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
        { label: 'General', value: 'General' },
        { label: 'About', value: 'About' },
        { label: 'Technical', value: 'Technical' },
        { label: 'Products', value: 'Products' },
        { label: 'Engagement', value: 'Engagement' },
        { label: 'Safety', value: 'Safety' },
        { label: 'Sustainability', value: 'Sustainability' },
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
