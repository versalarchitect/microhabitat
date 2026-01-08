import type { GlobalConfig } from 'payload';
import { seoFields } from '../fields/seo';

export const FAQSection: GlobalConfig = {
  slug: 'faq-section',
  label: 'FAQ Section',
  admin: {
    description: 'FAQ section header content and FAQ page SEO',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Section label (e.g., "FAQ")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'ctaText',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaButtonText',
      type: 'text',
      localized: true,
    },
    ...seoFields,
  ],
};
