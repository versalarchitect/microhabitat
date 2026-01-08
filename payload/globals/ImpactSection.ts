import type { GlobalConfig } from 'payload';

export const ImpactSection: GlobalConfig = {
  slug: 'impact-section',
  label: 'Impact Section',
  admin: {
    description: 'Impact/statistics section content',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Section label (e.g., "Our Impact")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Section heading (first part)',
      },
    },
    {
      name: 'headingHighlight',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Highlighted part of heading',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      admin: {
        description: 'Gallery images for the impact section',
      },
    },
  ],
};
