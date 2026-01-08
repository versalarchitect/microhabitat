import type { GlobalConfig } from 'payload';

export const TestimonialsSection: GlobalConfig = {
  slug: 'testimonials-section',
  label: 'Testimonials Section',
  admin: {
    description: 'Testimonials section header content',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Section label (e.g., "Testimonials")',
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
  ],
};
