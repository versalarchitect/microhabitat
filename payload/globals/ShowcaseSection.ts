import type { GlobalConfig } from 'payload';

export const ShowcaseSection: GlobalConfig = {
  slug: 'showcase-section',
  label: 'Showcase Section',
  admin: {
    description: 'Image showcase / bento grid section on the homepage',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Our Work',
      admin: {
        description: 'Section label (displayed above heading)',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Transforming urban spaces into',
      admin: {
        description: 'Main heading text',
      },
    },
    {
      name: 'headingHighlight',
      type: 'text',
      localized: true,
      defaultValue: 'thriving ecosystems',
      admin: {
        description: 'Highlighted part of heading (displayed in accent color)',
      },
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 4,
      maxRows: 6,
      admin: {
        description: 'Showcase images (4-6 images for bento grid layout)',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          admin: {
            description: 'Alt text for accessibility',
          },
        },
      ],
    },
  ],
};
