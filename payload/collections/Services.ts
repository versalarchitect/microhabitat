import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'order'],
    description: 'Service offerings displayed on the homepage',
  },
  fields: [
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Leaf', value: 'Leaf' },
        { label: 'Building', value: 'Building2' },
        { label: 'Graduation Cap', value: 'GraduationCap' },
        { label: 'Heart', value: 'Heart' },
        { label: 'Users', value: 'Users' },
        { label: 'Sprout', value: 'Sprout' },
      ],
      admin: {
        description: 'Lucide icon name',
      },
    },
    {
      name: 'title',
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
      name: 'features',
      type: 'array',
      localized: true,
      admin: {
        description: 'List of features/benefits for this service',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
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
