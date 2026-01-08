import type { CollectionConfig } from 'payload';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'company', 'order'],
    description: 'Client testimonials displayed on the homepage',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'The testimonial text',
      },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the person giving the testimonial',
      },
    },
    {
      name: 'role',
      type: 'text',
      localized: true,
      admin: {
        description: 'Job title or role',
      },
    },
    {
      name: 'company',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Company or organization name',
      },
    },
    {
      name: 'highlight',
      type: 'text',
      localized: true,
      admin: {
        description: 'Key phrase to highlight (optional)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Photo of the person',
      },
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Company logo',
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
