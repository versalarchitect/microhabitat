/**
 * Payload CMS Seed Script
 *
 * This script migrates content from the hardcoded fallback data in lib/strapi.ts
 * to Payload CMS.
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

// Import strapi functions to get fallback data
import {
  getHeroContent,
  getStats,
  getServices,
  getTestimonials,
  getPartners,
  getCities,
  getFAQ,
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
  type Locale,
  type PageSEOKey,
} from '../lib/strapi';

const locales: Locale[] = ['en', 'fr', 'de', 'nl', 'it', 'es'];

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

async function seed() {
  console.log('Starting Payload CMS seed...\n');

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

  // Seed Stats
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
          // Update existing doc with locale
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

  // Seed Services
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

  // Seed Testimonials
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

  // Seed Partners
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

  // Seed Cities
  console.log('Seeding cities...');
  const { docs: existingCities } = await payload.find({ collection: 'cities', limit: 1 });
  if (existingCities.length === 0) {
    for (const locale of locales) {
      const cities = await getCities(locale);
      for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        const slug = city.name.toLowerCase().replace(/\s+/g, '-');
        if (locale === 'en') {
          await payload.create({
            collection: 'cities',
            locale: 'en',
            data: {
              name: city.name,
              country: city.country,
              region: city.region,
              slug,
              order: i,
            },
          });
        } else {
          const { docs } = await payload.find({
            collection: 'cities',
            where: { slug: { equals: slug } },
            locale: 'en',
          });
          if (docs[0]) {
            await payload.update({
              collection: 'cities',
              id: docs[0].id,
              locale,
              data: {
                name: city.name,
                country: city.country,
              },
            });
          }
        }
      }
    }
    console.log('Cities seeded\n');
  } else {
    console.log('Cities already exist, skipping\n');
  }

  // Seed FAQ Items
  console.log('Seeding FAQ items...');
  const { docs: existingFAQ } = await payload.find({ collection: 'faq-items', limit: 1 });
  if (existingFAQ.length === 0) {
    for (const locale of locales) {
      const faqs = await getFAQ(locale);
      for (let i = 0; i < faqs.length; i++) {
        const faq = faqs[i];
        if (locale === 'en') {
          await payload.create({
            collection: 'faq-items',
            locale: 'en',
            data: {
              question: faq.question,
              answer: faq.answer,
              category: faq.category as 'General' | 'About' | 'Technical' | 'Products' | 'Engagement' | 'Safety' | 'Sustainability',
              order: i,
            },
          });
        } else {
          const { docs } = await payload.find({
            collection: 'faq-items',
            where: { order: { equals: i } },
            locale: 'en',
          });
          if (docs[0]) {
            await payload.update({
              collection: 'faq-items',
              id: docs[0].id,
              locale,
              data: {
                question: faq.question,
                answer: faq.answer,
                category: faq.category as 'General' | 'About' | 'Technical' | 'Products' | 'Engagement' | 'Safety' | 'Sustainability',
              },
            });
          }
        }
      }
    }
    console.log('FAQ items seeded\n');
  } else {
    console.log('FAQ items already exist, skipping\n');
  }

  // Seed Hero Global
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

  // Seed Section Globals
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

  // Seed Page Content Globals
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

  // Seed SEO-only page globals
  console.log('Seeding SEO-only page globals...');
  const seoOnlyPages: PageSEOKey[] = [
    // Note: 'indoor-farm' is now seeded with full content above
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
    'corporations': 'corporations-page',
    'schools': 'schools-page',
    'partnerships': 'partnerships-page',
    'community-engagement': 'community-engagement-page',
    'cities': 'cities-page',
    'blog': 'blog-page',
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
  console.log('Seed completed successfully!');
  console.log('='.repeat(50));
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
