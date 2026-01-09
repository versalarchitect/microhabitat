import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import sharp from 'sharp';

// Collections
import { Media } from './payload/collections/Media';
import { Users } from './payload/collections/Users';
import { Stats } from './payload/collections/Stats';
import { Services } from './payload/collections/Services';
import { Testimonials } from './payload/collections/Testimonials';
import { Partners } from './payload/collections/Partners';
import { Cities } from './payload/collections/Cities';
import { FAQItems } from './payload/collections/FAQItems';
import { BlogPosts } from './payload/collections/BlogPosts';

// Globals
import { Hero } from './payload/globals/Hero';
import { ImpactSection } from './payload/globals/ImpactSection';
import { ServicesSection } from './payload/globals/ServicesSection';
import { PartnersSection } from './payload/globals/PartnersSection';
import { TestimonialsSection } from './payload/globals/TestimonialsSection';
import { CitiesSection } from './payload/globals/CitiesSection';
import { FAQSection } from './payload/globals/FAQSection';
import { CTASection } from './payload/globals/CTASection';
import { AboutPage } from './payload/globals/AboutPage';
import { OutdoorFarmPage } from './payload/globals/OutdoorFarmPage';
import { IndoorFarmPage } from './payload/globals/IndoorFarmPage';
import { CareersPage } from './payload/globals/CareersPage';
import { ContactPage } from './payload/globals/ContactPage';
import {
  EducationalActivitiesPage,
  CommunityEngagementPage,
  CommercialRealEstatePage,
  CorporationsPage,
  SchoolsPage,
  PartnershipsPage,
  CitiesPage,
  BlogPage,
  PrivacyPolicyPage,
  TermsOfServicePage,
  CookiePolicyPage,
  ROICalculatorPage,
} from './payload/globals/GenericPage';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' - Microhabitat CMS',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.png',
        },
      ],
    },
    components: {
      graphics: {
        Logo: '/payload/components/Logo#Logo',
        Icon: '/payload/components/Icon#Icon',
      },
    },
  },

  editor: lexicalEditor(),

  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),

  collections: [
    Users,
    Media,
    Stats,
    Services,
    Testimonials,
    Partners,
    Cities,
    FAQItems,
    BlogPosts,
  ],

  globals: [
    // Homepage sections
    Hero,
    ImpactSection,
    ServicesSection,
    PartnersSection,
    TestimonialsSection,
    CitiesSection,
    FAQSection,
    CTASection,
    // Page content
    AboutPage,
    OutdoorFarmPage,
    IndoorFarmPage,
    CareersPage,
    ContactPage,
    // SEO-only pages
    EducationalActivitiesPage,
    CommunityEngagementPage,
    CommercialRealEstatePage,
    CorporationsPage,
    SchoolsPage,
    PartnershipsPage,
    CitiesPage,
    BlogPage,
    PrivacyPolicyPage,
    TermsOfServicePage,
    CookiePolicyPage,
    ROICalculatorPage,
  ],

  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Français', code: 'fr' },
      { label: 'Deutsch', code: 'de' },
      { label: 'Nederlands', code: 'nl' },
      { label: 'Italiano', code: 'it' },
      { label: 'Español', code: 'es' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-in-production',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  sharp,

  plugins: [
    // Only enable Vercel Blob storage if token is provided
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
});
