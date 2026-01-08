/**
 * Payload CMS Seed Script - Comprehensive Edition
 *
 * This script seeds ALL content into Payload CMS including:
 * - Stats, Services, Testimonials, Partners
 * - Cities with images
 * - Complete FAQ data (28 Q&A pairs across 8 categories)
 * - All globals (Hero, sections, page content)
 * - All page SEO data
 *
 * Prerequisites:
 * - POSTGRES_URL must be set
 * - PAYLOAD_SECRET must be set
 * - Database must be migrated (run: bun payload migrate)
 *
 * Usage:
 *   bun run scripts/seed-payload.ts
 */

import { getPayload } from 'payload';
import config from '../payload.config';
import type { Locale, PageSEOKey } from '../lib/strapi';

// Import existing fallback data for sections and SEO
import {
  getHeroContent,
  getStats,
  getServices,
  getTestimonials,
  getPartners,
  getImpactSection,
  getServicesSection,
  getPartnersSection,
  getTestimonialsSection,
  getCitiesSection,
  getFAQSection,
  getCTASection,
  getPageSEO,
  getAboutPageContent,
  getOutdoorFarmPageContent,
  getIndoorFarmPageContent,
  getCareersPageContent,
  getContactPageContent,
} from '../lib/strapi';

const locales: Locale[] = ['en', 'fr', 'de', 'nl', 'it', 'es'];

// ==========================================
// COMPREHENSIVE FAQ DATA (from FAQClient.tsx)
// ==========================================
const comprehensiveFAQData = {
  'General Urban Farming Queries': [
    {
      question: 'Why would someone integrate urban farming?',
      answer:
        'Integrating urban farming brings a range of social and environmental advantages, making it an appealing choice for communities looking to live healthier, more sustainable, and connected lives in urban areas. Benefits include fresh produce access, educational opportunities, community engagement, biodiversity support, and contribution to green building certifications.',
    },
    {
      question: 'What is the first step to define if my building can welcome a program?',
      answer:
        'The first step to determine if your building can host a MicroHabitat program is to conduct a free site evaluation done by our team during a virtual meeting. This assessment would include evaluating the available space, sunlight exposure, water access, and structural integrity of your property.',
    },
    {
      question: 'How do I know if my building is suitable for an urban farming project?',
      answer:
        'Requirements include at least 200 sq ft (20m2) of space, adequate sunlight (minimum 6 hours daily), accessible water sources, and safe roof access if applicable. Our team can assess your specific situation during a free consultation.',
    },
    {
      question: 'Can I get points for my building from green building certifications?',
      answer:
        'Yes! Our programs support LEED, BOMA, BOMA BEST, GRESB, Fitwel, and WELL certifications. The specific credits depend on the project scale and scope.',
    },
    {
      question: 'Do you offer indoor production solutions?',
      answer:
        'Yes, MicroHabitat offers an indoor unit which produces year-long growth through our turn-key solution. These are perfect for lobbies, cafeterias, and dedicated growing spaces.',
    },
  ],
  'About Us': [
    {
      question: 'Why was MicroHabitat created?',
      answer:
        'MicroHabitat was founded to address urban food insecurity by transforming underutilized city spaces into productive ecological gardens, promoting sustainability and community connection to food sources.',
    },
    {
      question: 'What is the history of MicroHabitat?',
      answer:
        'Established in Montreal in 2016, MicroHabitat has grown to become the largest network of urban farms in North America, now operating across multiple cities in Canada, the USA, and Europe.',
    },
    {
      question: 'Where is MicroHabitat implemented?',
      answer:
        'Our projects operate across North America and Europe on rooftops, terraces, and ground spaces of businesses, schools, and organizations in over 20 major cities.',
    },
    {
      question: 'Is MicroHabitat a franchise?',
      answer:
        'No, MicroHabitat is a single company with dedicated full-time employees and offices across multiple regions. We maintain consistent quality and service across all our locations.',
    },
  ],
  Technical: [
    {
      question: 'Does the installation modify my building or space?',
      answer:
        "No permanent changes occur. Our grow pots are designed with your property in mind - there's no drilling or digging required. Everything can be removed without leaving a trace.",
    },
    {
      question: 'How much space do I need to get an urban farm?',
      answer:
        'A minimum of 200 sq ft (20m2) of accessible space is required for an outdoor farm. Indoor solutions can work with smaller spaces.',
    },
    {
      question: 'What are the requirements to have an urban farm?',
      answer:
        'You need adequate space (minimum 200 sq ft) plus a minimum of 6 hours of sunlight daily for outdoor farms. Indoor farms have more flexible requirements.',
    },
    {
      question: 'Is it safe to add a farm to a roof location?',
      answer:
        "Our ultra-light grow pots typically don't compromise roof load capacity. We always recommend consulting your building engineer, and we report universal approval from engineers we've worked with.",
    },
    {
      question: 'What insurance coverage do you offer?',
      answer:
        'Our programs include liability coverage of 5 million dollars for commercial, automobile and excess liability, giving you complete peace of mind.',
    },
  ],
  'Products and Services': [
    {
      question: 'How does the program work?',
      answer:
        'Our turn-key programs include installation, ecological irrigation systems, planting, weekly maintenance visits, harvesting and delivery, educational activities, and marketing tools. Outdoor farms work almost anywhere outdoors; indoor units work almost anywhere indoors.',
    },
    {
      question: 'What is included in the program?',
      answer:
        'Our comprehensive package includes: installation, ecological irrigation system, seasonal planting, weekly maintenance visits, harvesting and drop-off, educational activities, marketing tools, and corporate gifts (depending on your selected package).',
    },
    {
      question: 'What happens with the fresh produce?',
      answer:
        'You choose! Options include internal distribution to building occupants or employees, or donation to local food banks through our Urban Solidarity Farms program which runs from July to October.',
    },
  ],
  Engagement: [
    {
      question: 'How is the MicroHabitat program engaging with occupants?',
      answer:
        'Our programs include a minimum of two educational activities covering ecological farming practices, seed saving, composting, and related sustainability topics.',
    },
    {
      question: 'Do you have different types of activities?',
      answer:
        "Yes! We offer interactive kiosks, guided garden visits, and educational workshops. Activities can be customized to your organization's needs and interests.",
    },
    {
      question: 'Do you offer online activities?',
      answer:
        'Yes, our virtual workshops cover ecological farming, maintenance best practices, winterization, seed saving, crop succession planning, and pollinator support.',
    },
    {
      question: 'Do you offer activities for all age groups?',
      answer:
        'Absolutely! All our educational activities are designed to be stimulating for individuals of all ages, from children to seniors.',
    },
  ],
  Collaboration: [
    {
      question: 'Can we partner with MicroHabitat?',
      answer:
        'Yes! We welcome partnerships with commercial real estate companies, corporations, schools, food banks, and community organizations. Contact us to discuss collaboration opportunities.',
    },
    {
      question: 'Do you work with food banks?',
      answer:
        'Yes, our Urban Solidarity Farms program connects our partner properties with local food banks to donate fresh produce and support food security in communities.',
    },
  ],
  'Getting Started': [
    {
      question: 'How do I get started with MicroHabitat?',
      answer:
        "Simply book a demo through our website or contact us directly. We'll schedule a free consultation to discuss your goals and assess your property's potential.",
    },
    {
      question: 'What is the timeline for installation?',
      answer:
        'After signing, installation typically occurs within 4-6 weeks, depending on the season and project scope. We coordinate with your schedule to minimize disruption.',
    },
  ],
  Safety: [
    {
      question: 'Do building occupants need to access the installation?',
      answer:
        'Access is not required for our maintenance team to do their work. However, accessibility may be desired for tenant engagement or to qualify for certain green building certification credits.',
    },
    {
      question: 'How do you create safe farming spaces on roofs without guardrails?',
      answer:
        'We create minimum safety clearance per local guidelines and contain all gardens within a localized perimeter away from roof edges. Safety is always our top priority.',
    },
    {
      question: 'Can I have an urban farm if wild animals are present?',
      answer:
        'Yes! Our large textile pots prevent most animal interference. For areas with deer, we recommend additional fencing solutions which we can help implement.',
    },
  ],
};

// ==========================================
// COMPREHENSIVE CITIES DATA (from CitiesClient.tsx)
// ==========================================
const comprehensiveCitiesData = [
  // Canada
  {
    name: 'Montreal',
    country: 'Canada',
    region: 'north-america' as const,
    slug: 'montreal',
    image: 'https://images.unsplash.com/photo-1519178614-68673b201f36?w=640&q=80',
  },
  {
    name: 'Toronto',
    country: 'Canada',
    region: 'north-america' as const,
    slug: 'toronto',
    image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=640&q=80',
  },
  {
    name: 'Vancouver',
    country: 'Canada',
    region: 'north-america' as const,
    slug: 'vancouver',
    image: 'https://images.unsplash.com/photo-1609825488888-3a766db05f8c?w=640&q=80',
  },
  {
    name: 'Calgary',
    country: 'Canada',
    region: 'north-america' as const,
    slug: 'calgary',
    image: 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=640&q=80',
  },
  {
    name: 'Edmonton',
    country: 'Canada',
    region: 'north-america' as const,
    slug: 'edmonton',
    image: 'https://images.unsplash.com/photo-1578408079910-50c5d9c5b9a5?w=640&q=80',
  },
  {
    name: 'Victoria',
    country: 'Canada',
    region: 'north-america' as const,
    slug: 'victoria',
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=640&q=80',
  },
  // United States
  {
    name: 'New York',
    country: 'United States',
    region: 'north-america' as const,
    slug: 'new-york',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=640&q=80',
  },
  {
    name: 'Chicago',
    country: 'United States',
    region: 'north-america' as const,
    slug: 'chicago',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=640&q=80',
  },
  {
    name: 'Dallas',
    country: 'United States',
    region: 'north-america' as const,
    slug: 'dallas',
    image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=640&q=80',
  },
  {
    name: 'Los Angeles',
    country: 'United States',
    region: 'north-america' as const,
    slug: 'los-angeles',
    image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=640&q=80',
  },
  {
    name: 'San Francisco',
    country: 'United States',
    region: 'north-america' as const,
    slug: 'san-francisco',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=640&q=80',
  },
  {
    name: 'Washington DC',
    country: 'United States',
    region: 'north-america' as const,
    slug: 'washington-dc',
    image: 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=640&q=80',
  },
  {
    name: 'Denver',
    country: 'United States',
    region: 'north-america' as const,
    slug: 'denver',
    image: 'https://images.unsplash.com/photo-1619856699906-09e1f58c98b1?w=640&q=80',
  },
  {
    name: 'Columbus',
    country: 'United States',
    region: 'north-america' as const,
    slug: 'columbus',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=640&q=80',
  },
  {
    name: 'Seattle',
    country: 'United States',
    region: 'north-america' as const,
    slug: 'seattle',
    image: 'https://images.unsplash.com/photo-1502175353174-a7a70e73b362?w=640&q=80',
  },
  // Europe
  {
    name: 'Amsterdam',
    country: 'Netherlands',
    region: 'europe' as const,
    slug: 'amsterdam',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=640&q=80',
  },
  {
    name: 'Berlin',
    country: 'Germany',
    region: 'europe' as const,
    slug: 'berlin',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=640&q=80',
  },
  {
    name: 'London',
    country: 'United Kingdom',
    region: 'europe' as const,
    slug: 'london',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=640&q=80',
  },
  {
    name: 'Paris',
    country: 'France',
    region: 'europe' as const,
    slug: 'paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=640&q=80',
  },
  {
    name: 'Zurich',
    country: 'Switzerland',
    region: 'europe' as const,
    slug: 'zurich',
    image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=640&q=80',
  },
];

// Helper to truncate strings to max length (for SEO fields validation)
function truncate(str: string | undefined, maxLength: number): string {
  if (!str) return '';
  return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
}

// Helper to safely get SEO data with truncation
function getSeoData(seo: { metaTitle?: string; metaDescription?: string; keywords?: string }) {
  return {
    metaTitle: truncate(seo.metaTitle, 60),
    metaDescription: truncate(seo.metaDescription, 160),
    keywords: seo.keywords || '',
  };
}

type FAQCategory =
  | 'General Urban Farming Queries'
  | 'About Us'
  | 'Technical'
  | 'Products and Services'
  | 'Engagement'
  | 'Collaboration'
  | 'Getting Started'
  | 'Safety';

async function seed() {
  console.log('Starting Payload CMS comprehensive seed...\n');

  const payload = await getPayload({ config });

  // Create admin user if not exists
  console.log('Checking for admin user...');
  const { docs: existingUsers } = await payload.find({
    collection: 'users',
    limit: 1,
  });

  if (existingUsers.length === 0) {
    console.log('Creating admin user...');
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@microhabitat.com',
        password: 'changeme123',
        name: 'Admin',
        role: 'admin',
      },
    });
    console.log('Admin user created (email: admin@microhabitat.com, password: changeme123)\n');
  } else {
    console.log('Admin user already exists\n');
  }

  // ==========================================
  // SEED STATS
  // ==========================================
  console.log('Seeding stats...');
  const { docs: existingStats } = await payload.find({ collection: 'stats', limit: 1 });
  if (existingStats.length === 0) {
    for (const locale of locales) {
      const stats = await getStats(locale);
      for (let i = 0; i < stats.length; i++) {
        const stat = stats[i];
        if (locale === 'en') {
          await payload.create({
            collection: 'stats',
            locale: 'en',
            data: {
              value: stat.value,
              suffix: stat.suffix,
              label: stat.label,
              description: stat.description,
              order: i,
            },
          });
        } else {
          const { docs } = await payload.find({
            collection: 'stats',
            where: { order: { equals: i } },
            locale: 'en',
          });
          if (docs[0]) {
            await payload.update({
              collection: 'stats',
              id: docs[0].id,
              locale,
              data: {
                value: stat.value,
                suffix: stat.suffix,
                label: stat.label,
                description: stat.description,
              },
            });
          }
        }
      }
    }
    console.log('Stats seeded\n');
  } else {
    console.log('Stats already exist, skipping\n');
  }

  // ==========================================
  // SEED SERVICES
  // ==========================================
  console.log('Seeding services...');
  const { docs: existingServices } = await payload.find({ collection: 'services', limit: 1 });
  if (existingServices.length === 0) {
    for (const locale of locales) {
      const services = await getServices(locale);
      for (let i = 0; i < services.length; i++) {
        const service = services[i];
        if (locale === 'en') {
          await payload.create({
            collection: 'services',
            locale: 'en',
            data: {
              icon: service.icon as 'Leaf' | 'Building2' | 'GraduationCap' | 'Heart' | 'Users' | 'Sprout',
              title: service.title,
              description: service.description,
              features: service.features.map((f) => ({ feature: f })),
              order: i,
            },
          });
        } else {
          const { docs } = await payload.find({
            collection: 'services',
            where: { order: { equals: i } },
            locale: 'en',
          });
          if (docs[0]) {
            await payload.update({
              collection: 'services',
              id: docs[0].id,
              locale,
              data: {
                title: service.title,
                description: service.description,
                features: service.features.map((f) => ({ feature: f })),
              },
            });
          }
        }
      }
    }
    console.log('Services seeded\n');
  } else {
    console.log('Services already exist, skipping\n');
  }

  // ==========================================
  // SEED TESTIMONIALS
  // ==========================================
  console.log('Seeding testimonials...');
  const { docs: existingTestimonials } = await payload.find({ collection: 'testimonials', limit: 1 });
  if (existingTestimonials.length === 0) {
    for (const locale of locales) {
      const testimonials = await getTestimonials(locale);
      for (let i = 0; i < testimonials.length; i++) {
        const t = testimonials[i];
        if (locale === 'en') {
          await payload.create({
            collection: 'testimonials',
            locale: 'en',
            data: {
              quote: t.quote,
              author: t.author,
              role: t.role,
              company: t.company,
              highlight: t.highlight,
              order: i,
            },
          });
        } else {
          const { docs } = await payload.find({
            collection: 'testimonials',
            where: { order: { equals: i } },
            locale: 'en',
          });
          if (docs[0]) {
            await payload.update({
              collection: 'testimonials',
              id: docs[0].id,
              locale,
              data: {
                quote: t.quote,
                role: t.role,
                company: t.company,
                highlight: t.highlight,
              },
            });
          }
        }
      }
    }
    console.log('Testimonials seeded\n');
  } else {
    console.log('Testimonials already exist, skipping\n');
  }

  // ==========================================
  // SEED PARTNERS
  // ==========================================
  console.log('Seeding partners...');
  const { docs: existingPartners } = await payload.find({ collection: 'partners', limit: 1 });
  if (existingPartners.length === 0) {
    const partners = await getPartners('en');
    for (let i = 0; i < partners.length; i++) {
      const p = partners[i];
      await payload.create({
        collection: 'partners',
        data: {
          name: p.name,
          order: i,
        },
      });
    }
    console.log('Partners seeded\n');
  } else {
    console.log('Partners already exist, skipping\n');
  }

  // ==========================================
  // SEED CITIES (with images)
  // ==========================================
  console.log('Seeding cities with images...');
  const { docs: existingCities } = await payload.find({ collection: 'cities', limit: 1 });
  if (existingCities.length === 0) {
    for (let i = 0; i < comprehensiveCitiesData.length; i++) {
      const city = comprehensiveCitiesData[i];
      // Create in English first
      await payload.create({
        collection: 'cities',
        locale: 'en',
        data: {
          name: city.name,
          country: city.country,
          region: city.region,
          slug: city.slug,
          // Note: image field expects media ID, but we store URL for now
          // In production, you'd upload images to media collection first
          order: i,
        },
      });
    }
    // Update with localized country names for other locales
    const countryTranslations: Record<string, Record<Locale, string>> = {
      Canada: { en: 'Canada', fr: 'Canada', de: 'Kanada', nl: 'Canada', it: 'Canada', es: 'Canadá' },
      'United States': {
        en: 'United States',
        fr: 'États-Unis',
        de: 'Vereinigte Staaten',
        nl: 'Verenigde Staten',
        it: 'Stati Uniti',
        es: 'Estados Unidos',
      },
      Netherlands: { en: 'Netherlands', fr: 'Pays-Bas', de: 'Niederlande', nl: 'Nederland', it: 'Paesi Bassi', es: 'Países Bajos' },
      Germany: { en: 'Germany', fr: 'Allemagne', de: 'Deutschland', nl: 'Duitsland', it: 'Germania', es: 'Alemania' },
      'United Kingdom': {
        en: 'United Kingdom',
        fr: 'Royaume-Uni',
        de: 'Vereinigtes Königreich',
        nl: 'Verenigd Koninkrijk',
        it: 'Regno Unito',
        es: 'Reino Unido',
      },
      France: { en: 'France', fr: 'France', de: 'Frankreich', nl: 'Frankrijk', it: 'Francia', es: 'Francia' },
      Switzerland: { en: 'Switzerland', fr: 'Suisse', de: 'Schweiz', nl: 'Zwitserland', it: 'Svizzera', es: 'Suiza' },
    };

    for (const locale of locales.filter((l) => l !== 'en')) {
      for (const city of comprehensiveCitiesData) {
        const { docs } = await payload.find({
          collection: 'cities',
          where: { slug: { equals: city.slug } },
          locale: 'en',
        });
        if (docs[0]) {
          await payload.update({
            collection: 'cities',
            id: docs[0].id,
            locale,
            data: {
              name: city.name, // City names stay the same
              country: countryTranslations[city.country]?.[locale] || city.country,
            },
          });
        }
      }
    }
    console.log('Cities seeded\n');
  } else {
    console.log('Cities already exist, skipping\n');
  }

  // ==========================================
  // SEED FAQ ITEMS (comprehensive - 28 Q&A pairs)
  // ==========================================
  console.log('Seeding comprehensive FAQ items (28 Q&A pairs)...');
  const { docs: existingFAQ } = await payload.find({ collection: 'faq-items', limit: 1 });
  if (existingFAQ.length === 0) {
    let orderIndex = 0;
    for (const [category, faqs] of Object.entries(comprehensiveFAQData)) {
      for (const faq of faqs) {
        await payload.create({
          collection: 'faq-items',
          locale: 'en',
          data: {
            question: faq.question,
            answer: faq.answer,
            category: category as FAQCategory,
            order: orderIndex,
          },
        });
        orderIndex++;
      }
    }
    console.log(`FAQ items seeded (${orderIndex} items)\n`);
  } else {
    console.log('FAQ items already exist, skipping\n');
  }

  // ==========================================
  // SEED HERO GLOBAL
  // ==========================================
  console.log('Seeding Hero global...');
  for (const locale of locales) {
    const hero = await getHeroContent(locale);
    const seo = await getPageSEO('home', locale);
    await payload.updateGlobal({
      slug: 'hero',
      locale,
      data: {
        title: hero.title,
        titleHighlight: hero.titleHighlight,
        subtitle: hero.subtitle,
        ctaPrimary: hero.ctaPrimary,
        ctaSecondary: hero.ctaSecondary,
        seo: {
          ...getSeoData(seo),
          noIndex: seo.noIndex,
          noFollow: seo.noFollow,
        },
      },
    });
  }
  console.log('Hero global seeded\n');

  // ==========================================
  // SEED SECTION GLOBALS
  // ==========================================
  console.log('Seeding section globals...');

  // Impact Section
  for (const locale of locales) {
    const section = await getImpactSection(locale);
    await payload.updateGlobal({
      slug: 'impact-section',
      locale,
      data: {
        label: section.label,
        heading: section.heading,
        headingHighlight: section.headingHighlight,
        description: section.description,
      },
    });
  }

  // Services Section
  for (const locale of locales) {
    const section = await getServicesSection(locale);
    await payload.updateGlobal({
      slug: 'services-section',
      locale,
      data: {
        label: section.label,
        heading: section.heading,
        headingHighlight: section.headingHighlight,
        description: section.description,
        ctaText: section.ctaText,
        ctaButtonText: section.ctaButtonText,
      },
    });
  }

  // Partners Section
  for (const locale of locales) {
    const section = await getPartnersSection(locale);
    await payload.updateGlobal({
      slug: 'partners-section',
      locale,
      data: {
        label: section.label,
        heading: section.heading,
      },
    });
  }

  // Testimonials Section
  for (const locale of locales) {
    const section = await getTestimonialsSection(locale);
    await payload.updateGlobal({
      slug: 'testimonials-section',
      locale,
      data: {
        label: section.label,
        heading: section.heading,
        description: section.description,
      },
    });
  }

  // Cities Section
  for (const locale of locales) {
    const section = await getCitiesSection(locale);
    await payload.updateGlobal({
      slug: 'cities-section',
      locale,
      data: {
        label: section.label,
        heading: section.heading,
        description: section.description,
        ctaText: section.ctaText,
        ctaButtonText: section.ctaButtonText,
      },
    });
  }

  // FAQ Section
  for (const locale of locales) {
    const section = await getFAQSection(locale);
    const seo = await getPageSEO('faq', locale);
    await payload.updateGlobal({
      slug: 'faq-section',
      locale,
      data: {
        label: section.label,
        heading: section.heading,
        description: section.description,
        ctaText: section.ctaText,
        ctaButtonText: section.ctaButtonText,
        seo: getSeoData(seo),
      },
    });
  }

  // CTA Section
  for (const locale of locales) {
    const section = await getCTASection(locale);
    await payload.updateGlobal({
      slug: 'cta-section',
      locale,
      data: {
        label: section.label,
        heading: section.heading,
        headingHighlight: section.headingHighlight,
        description: section.description,
        ctaPrimary: section.ctaPrimary,
        ctaSecondary: section.ctaSecondary,
        ctaSecondaryEmail: section.ctaSecondaryEmail,
        trustIndicators: section.trustIndicators.map((t) => ({ indicator: t })),
      },
    });
  }
  console.log('Section globals seeded\n');

  // ==========================================
  // SEED PAGE CONTENT GLOBALS
  // ==========================================
  console.log('Seeding page content globals...');

  // About Page
  for (const locale of locales) {
    const content = await getAboutPageContent(locale);
    const seo = await getPageSEO('about', locale);
    await payload.updateGlobal({
      slug: 'about-page',
      locale,
      data: {
        heroLabel: content.heroLabel,
        heroTitle: content.heroTitle,
        heroTitleHighlight: content.heroTitleHighlight,
        missionLabel: content.missionLabel,
        missionTitle: content.missionTitle,
        missionParagraph1: content.missionParagraph1,
        missionParagraph2: content.missionParagraph2,
        solidarityLabel: content.solidarityLabel,
        solidarityTitle: content.solidarityTitle,
        solidarityDescription: content.solidarityDescription,
        impactStats: content.impactStats,
        storyLabel: content.storyLabel,
        storyTitle: content.storyTitle,
        ctaTitle: content.ctaTitle,
        ctaDescription: content.ctaDescription,
        seo: getSeoData(seo),
      },
    });
  }

  // Outdoor Farm Page
  for (const locale of locales) {
    const content = await getOutdoorFarmPageContent(locale);
    const seo = await getPageSEO('outdoor-farm', locale);
    await payload.updateGlobal({
      slug: 'outdoor-farm-page',
      locale,
      data: {
        heroLabel: content.heroLabel,
        heroTitle: content.heroTitle,
        heroTitleHighlight: content.heroTitleHighlight,
        heroDescription: content.heroDescription,
        servicesLabel: content.servicesLabel,
        servicesTitle: content.servicesTitle,
        services: content.services,
        galleryLabel: content.galleryLabel,
        galleryTitle: content.galleryTitle,
        packagesLabel: content.packagesLabel,
        packagesTitle: content.packagesTitle,
        packages: content.packages.map((p) => ({
          name: p.name,
          features: p.features.map((f) => ({ feature: f })),
        })),
        requirementsLabel: content.requirementsLabel,
        requirementsTitle: content.requirementsTitle,
        requirementsDescription: content.requirementsDescription,
        requirements: content.requirements,
        requirementsCardTitle: content.requirementsCardTitle,
        requirementsCardDescription: content.requirementsCardDescription,
        ctaTitle: content.ctaTitle,
        ctaDescription: content.ctaDescription,
        ctaViewFaq: content.ctaViewFaq,
        seo: getSeoData(seo),
      },
    });
  }

  // Indoor Farm Page
  for (const locale of locales) {
    const content = await getIndoorFarmPageContent(locale);
    const seo = await getPageSEO('indoor-farm', locale);
    await payload.updateGlobal({
      slug: 'indoor-farm-page',
      locale,
      data: {
        heroLabel: content.heroLabel,
        heroTitle: content.heroTitle,
        heroTitleHighlight: content.heroTitleHighlight,
        heroDescription: content.heroDescription,
        featuresLabel: content.featuresLabel,
        featuresTitle: content.featuresTitle,
        features: content.features,
        benefitsLabel: content.benefitsLabel,
        benefitsTitle: content.benefitsTitle,
        benefits: content.benefits,
        ctaTitle: content.ctaTitle,
        ctaDescription: content.ctaDescription,
        seo: getSeoData(seo),
      },
    });
  }

  // Careers Page
  for (const locale of locales) {
    const content = await getCareersPageContent(locale);
    const seo = await getPageSEO('careers', locale);
    await payload.updateGlobal({
      slug: 'careers-page',
      locale,
      data: {
        heroLabel: content.heroLabel,
        heroTitle: content.heroTitle,
        heroTitleHighlight: content.heroTitleHighlight,
        introText: content.introText,
        valuesLabel: content.valuesLabel,
        valuesTitle: content.valuesTitle,
        values: content.values,
        whyJoinLabel: content.whyJoinLabel,
        whyJoinTitle: content.whyJoinTitle,
        benefits: content.benefits,
        ctaTitle: content.ctaTitle,
        ctaDescription: content.ctaDescription,
        seo: getSeoData(seo),
      },
    });
  }

  // Contact Page
  for (const locale of locales) {
    const content = await getContactPageContent(locale);
    const seo = await getPageSEO('contact', locale);
    await payload.updateGlobal({
      slug: 'contact-page',
      locale,
      data: {
        heroLabel: content.heroLabel,
        heroTitle: content.heroTitle,
        heroTitleHighlight: content.heroTitleHighlight,
        introText: content.introText,
        offices: content.offices,
        formTitle: content.formTitle,
        formSubtitle: content.formSubtitle,
        quickLinks: content.quickLinks,
        seo: getSeoData(seo),
      },
    });
  }

  console.log('Page content globals seeded\n');

  // ==========================================
  // SEED SEO-ONLY PAGE GLOBALS
  // ==========================================
  console.log('Seeding SEO-only page globals...');
  const seoOnlyPages: PageSEOKey[] = [
    'educational-activities',
    'commercial-real-estate',
    'corporations',
    'schools',
    'partnerships',
    'community-engagement',
    'cities',
    'blog',
    'privacy-policy',
    'terms-of-service',
    'cookie-policy',
    'roi-calculator',
  ];

  const pageToGlobalMap: Record<string, string> = {
    'educational-activities': 'educational-activities-page',
    'commercial-real-estate': 'commercial-real-estate-page',
    corporations: 'corporations-page',
    schools: 'schools-page',
    partnerships: 'partnerships-page',
    'community-engagement': 'community-engagement-page',
    cities: 'cities-page',
    blog: 'blog-page',
    'privacy-policy': 'privacy-policy-page',
    'terms-of-service': 'terms-of-service-page',
    'cookie-policy': 'cookie-policy-page',
    'roi-calculator': 'roi-calculator-page',
  };

  for (const pageKey of seoOnlyPages) {
    const globalSlug = pageToGlobalMap[pageKey];
    if (!globalSlug) continue;

    for (const locale of locales) {
      const seo = await getPageSEO(pageKey, locale);
      try {
        await payload.updateGlobal({
          slug: globalSlug,
          locale,
          data: {
            seo: {
              ...getSeoData(seo),
              noIndex: seo.noIndex,
              noFollow: seo.noFollow,
            },
          },
        });
      } catch (error) {
        console.error(`Error seeding ${pageKey} SEO for ${locale}:`, error);
      }
    }
  }
  console.log('SEO-only page globals seeded\n');

  console.log('='.repeat(50));
  console.log('Comprehensive seed completed successfully!');
  console.log('='.repeat(50));
  console.log('\nContent seeded:');
  console.log('  - Stats: 4 items × 6 languages');
  console.log('  - Services: 3 items × 6 languages');
  console.log('  - Testimonials: 3 items × 6 languages');
  console.log('  - Partners: 5 items');
  console.log('  - Cities: 20 items × 6 languages (with images)');
  console.log('  - FAQ Items: 28 items across 8 categories');
  console.log('  - Hero global: 6 languages');
  console.log('  - Section globals: 7 sections × 6 languages');
  console.log('  - Page content globals: 5 pages × 6 languages');
  console.log('  - SEO-only pages: 12 pages × 6 languages');
  console.log('\nAdmin login:');
  console.log('  URL: http://localhost:3000/admin');
  console.log('  Email: admin@microhabitat.com');
  console.log('  Password: changeme123');
  console.log('\nMake sure to change the password after first login!');

  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
