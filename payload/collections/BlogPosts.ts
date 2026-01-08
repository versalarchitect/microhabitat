import type { CollectionConfig } from 'payload';
import { seoFields } from '../fields/seo';

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedDate', '_status'],
    description: 'Blog articles and news',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Short summary for listing pages (max 200 chars)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      admin: {
        description: 'Author name',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MMMM d, yyyy',
        },
      },
    },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'CSR', value: 'CSR' },
        { label: 'ESG', value: 'ESG' },
        { label: 'Green Buildings', value: 'Green Buildings' },
        { label: 'Urban Farming', value: 'Urban Farming' },
        { label: 'Sustainability', value: 'Sustainability' },
        { label: 'News', value: 'News' },
        { label: 'Case Studies', value: 'Case Studies' },
        { label: 'Education', value: 'Education' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Featured image for the article',
      },
    },
    ...seoFields,
  ],
};
