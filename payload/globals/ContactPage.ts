import type { GlobalConfig } from 'payload';
import { seoFields } from '../fields/seo';

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  admin: {
    description: 'Contact page content and SEO',
  },
  fields: [
    // Hero section
    {
      name: 'heroLabel',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'heroTitleHighlight',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'introText',
      type: 'textarea',
      localized: true,
    },
    // Offices
    {
      name: 'offices',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'type',
          type: 'text',
          localized: true,
          admin: {
            description: 'e.g., "Headquarters", "Regional Office"',
          },
        },
        {
          name: 'address',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    // Form section
    {
      name: 'formTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'formSubtitle',
      type: 'textarea',
      localized: true,
    },
    // Quick links
    {
      name: 'quickLinks',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'URL, email, or phone number',
          },
        },
      ],
    },
    ...seoFields,
  ],
};
