import type { GlobalConfig } from 'payload';
import { seoFields } from '../fields/seo';

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Home Page Hero',
  admin: {
    description: 'Hero section content for the homepage',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Main headline (first part)',
      },
    },
    {
      name: 'titleHighlight',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Highlighted part of the headline (displayed in accent color)',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Supporting text below the headline',
      },
    },
    {
      name: 'ctaPrimary',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Primary call-to-action button text',
      },
    },
    {
      name: 'ctaSecondary',
      type: 'text',
      localized: true,
      admin: {
        description: 'Secondary call-to-action button text',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero background or featured image',
      },
    },
    ...seoFields,
  ],
};
