import type { CollectionConfig } from 'payload';

export const Cities: CollectionConfig = {
  slug: 'cities',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'country', 'region', 'order'],
    description: 'Cities where MicroHabitat operates',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'City name',
      },
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Country name',
      },
    },
    {
      name: 'region',
      type: 'select',
      required: true,
      options: [
        { label: 'North America', value: 'north-america' },
        { label: 'Europe', value: 'europe' },
      ],
      admin: {
        description: 'Geographic region for filtering',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "montreal", "new-york")',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'City image (recommended: 640x480px)',
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
