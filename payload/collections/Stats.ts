import type { CollectionConfig } from 'payload';

export const Stats: CollectionConfig = {
  slug: 'stats',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'value', 'suffix', 'order'],
    description: 'Impact statistics displayed on the homepage',
  },
  fields: [
    {
      name: 'value',
      type: 'number',
      required: true,
      localized: true,
      admin: {
        description: 'The numeric value (e.g., 2500)',
      },
    },
    {
      name: 'suffix',
      type: 'text',
      localized: true,
      admin: {
        description: 'Text after the number (e.g., "+", "M", "%")',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Short label (e.g., "Beehives Installed")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Longer description for tooltip or detail view',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Display order (lower numbers appear first)',
      },
    },
  ],
};
