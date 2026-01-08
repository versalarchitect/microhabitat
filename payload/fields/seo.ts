import type { Field } from 'payload';

export const seoFields: Field[] = [
  {
    name: 'seo',
    type: 'group',
    label: 'SEO',
    fields: [
      {
        name: 'metaTitle',
        type: 'text',
        localized: true,
        maxLength: 60,
        admin: {
          description: 'Max 60 characters for optimal display in search results',
        },
      },
      {
        name: 'metaDescription',
        type: 'textarea',
        localized: true,
        maxLength: 160,
        admin: {
          description: 'Max 160 characters for optimal display in search results',
        },
      },
      {
        name: 'keywords',
        type: 'text',
        localized: true,
        admin: {
          description: 'Comma-separated keywords',
        },
      },
      {
        name: 'ogImage',
        type: 'upload',
        relationTo: 'media',
        admin: {
          description: 'Open Graph image for social sharing (1200x630px recommended)',
        },
      },
      {
        name: 'canonical',
        type: 'text',
        admin: {
          description: 'Canonical URL (leave blank to use default)',
        },
      },
      {
        name: 'noIndex',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          description: 'Prevent search engines from indexing this page',
        },
      },
      {
        name: 'noFollow',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          description: 'Prevent search engines from following links on this page',
        },
      },
    ],
  },
];
