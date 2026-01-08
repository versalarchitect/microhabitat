/**
 * Seed remaining content (cities, FAQ, globals)
 * Uses delays between operations to avoid Neon connection timeouts
 */

import { getPayload } from 'payload';
import config from '../payload.config';
import type { Locale } from '../lib/strapi';

import {
  getHeroContent,
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

// Add delay between operations
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Comprehensive cities data
const citiesData = [
  { name: 'Montreal', country: 'Canada', region: 'north-america' as const, slug: 'montreal' },
  { name: 'Toronto', country: 'Canada', region: 'north-america' as const, slug: 'toronto' },
  { name: 'Vancouver', country: 'Canada', region: 'north-america' as const, slug: 'vancouver' },
  { name: 'Calgary', country: 'Canada', region: 'north-america' as const, slug: 'calgary' },
  { name: 'Edmonton', country: 'Canada', region: 'north-america' as const, slug: 'edmonton' },
  { name: 'Victoria', country: 'Canada', region: 'north-america' as const, slug: 'victoria' },
  { name: 'New York', country: 'United States', region: 'north-america' as const, slug: 'new-york' },
  { name: 'Chicago', country: 'United States', region: 'north-america' as const, slug: 'chicago' },
  { name: 'Dallas', country: 'United States', region: 'north-america' as const, slug: 'dallas' },
  { name: 'Los Angeles', country: 'United States', region: 'north-america' as const, slug: 'los-angeles' },
  { name: 'San Francisco', country: 'United States', region: 'north-america' as const, slug: 'san-francisco' },
  { name: 'Washington DC', country: 'United States', region: 'north-america' as const, slug: 'washington-dc' },
  { name: 'Denver', country: 'United States', region: 'north-america' as const, slug: 'denver' },
  { name: 'Columbus', country: 'United States', region: 'north-america' as const, slug: 'columbus' },
  { name: 'Seattle', country: 'United States', region: 'north-america' as const, slug: 'seattle' },
  { name: 'Amsterdam', country: 'Netherlands', region: 'europe' as const, slug: 'amsterdam' },
  { name: 'Berlin', country: 'Germany', region: 'europe' as const, slug: 'berlin' },
  { name: 'London', country: 'United Kingdom', region: 'europe' as const, slug: 'london' },
  { name: 'Paris', country: 'France', region: 'europe' as const, slug: 'paris' },
  { name: 'Zurich', country: 'Switzerland', region: 'europe' as const, slug: 'zurich' },
];

// FAQ data
const faqData = {
  'General Urban Farming Queries': [
    { question: 'Why would someone integrate urban farming?', answer: 'Integrating urban farming brings social and environmental advantages including fresh produce access, educational opportunities, community engagement, biodiversity support, and green building certifications.' },
    { question: 'What is the first step to define if my building can welcome a program?', answer: 'Conduct a free site evaluation with our team during a virtual meeting to evaluate space, sunlight exposure, water access, and structural integrity.' },
    { question: 'How do I know if my building is suitable?', answer: 'Requirements include at least 200 sq ft of space, minimum 6 hours of sunlight daily, accessible water sources, and safe roof access if applicable.' },
    { question: 'Can I get green building certification points?', answer: 'Yes! Our programs support LEED, BOMA, BOMA BEST, GRESB, Fitwel, and WELL certifications.' },
    { question: 'Do you offer indoor solutions?', answer: 'Yes, MicroHabitat offers indoor units with year-long growth through our turn-key solution.' },
  ],
  'About Us': [
    { question: 'Why was MicroHabitat created?', answer: 'To address urban food insecurity by transforming underutilized city spaces into productive ecological gardens.' },
    { question: 'What is the history of MicroHabitat?', answer: 'Established in Montreal in 2016, now the largest urban farms network in North America.' },
    { question: 'Where is MicroHabitat implemented?', answer: 'Across North America and Europe on rooftops, terraces, and ground spaces in over 20 major cities.' },
    { question: 'Is MicroHabitat a franchise?', answer: 'No, we are a single company with full-time employees across multiple regions.' },
  ],
  'Technical': [
    { question: 'Does installation modify my building?', answer: 'No permanent changes. Our grow pots require no drilling or digging.' },
    { question: 'How much space do I need?', answer: 'Minimum 200 sq ft for outdoor farms. Indoor solutions work with smaller spaces.' },
    { question: 'Is it safe on roofs?', answer: 'Our ultra-light grow pots typically don\'t compromise roof load capacity.' },
    { question: 'What insurance do you offer?', answer: 'Liability coverage of 5 million dollars for commercial, automobile and excess liability.' },
  ],
  'Products and Services': [
    { question: 'How does the program work?', answer: 'Turn-key programs include installation, irrigation, planting, maintenance, harvesting, educational activities, and marketing tools.' },
    { question: 'What is included?', answer: 'Installation, irrigation system, seasonal planting, weekly maintenance, harvesting, educational activities, marketing tools, and corporate gifts.' },
    { question: 'What happens with the produce?', answer: 'Options include internal distribution or donation to local food banks through our Urban Solidarity Farms program.' },
  ],
  'Engagement': [
    { question: 'How do you engage occupants?', answer: 'Minimum two educational activities covering ecological farming, seed saving, composting, and sustainability.' },
    { question: 'What types of activities?', answer: 'Interactive kiosks, guided garden visits, and educational workshops customized to your needs.' },
    { question: 'Do you offer online activities?', answer: 'Yes, virtual workshops on farming, maintenance, winterization, seed saving, and pollinator support.' },
  ],
  'Getting Started': [
    { question: 'How do I get started?', answer: 'Book a demo through our website for a free consultation to discuss your goals and assess your property.' },
    { question: 'What is the installation timeline?', answer: 'Installation typically occurs within 4-6 weeks after signing, coordinated with your schedule.' },
  ],
  'Safety': [
    { question: 'Do occupants need access?', answer: 'Access is not required but may be desired for engagement or green building certification credits.' },
    { question: 'How do you ensure roof safety?', answer: 'Minimum safety clearance per local guidelines with gardens contained away from roof edges.' },
  ],
};

function truncate(str: string | undefined, maxLength: number): string {
  if (!str) return '';
  return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
}

function getSeoData(seo: { metaTitle?: string; metaDescription?: string; keywords?: string }) {
  return {
    metaTitle: truncate(seo.metaTitle, 60),
    metaDescription: truncate(seo.metaDescription, 160),
    keywords: seo.keywords || '',
  };
}

async function seed() {
  console.log('Starting remaining content seed...\n');
  const payload = await getPayload({ config });

  // Check if cities already exist
  const { docs: existingCities } = await payload.find({ collection: 'cities', limit: 1 });

  if (existingCities.length === 0) {
    console.log('Seeding cities...');
    for (let i = 0; i < citiesData.length; i++) {
      const city = citiesData[i];
      try {
        await payload.create({
          collection: 'cities',
          locale: 'en',
          data: {
            name: city.name,
            country: city.country,
            region: city.region,
            slug: city.slug,
            order: i,
          },
        });
        console.log(`  Created city: ${city.name}`);
        await delay(200); // Small delay between creates
      } catch (e) {
        console.error(`  Error creating ${city.name}:`, e);
      }
    }
    console.log('Cities seeded\n');
  } else {
    console.log('Cities already exist, skipping\n');
  }

  await delay(1000);

  // Check if FAQ items already exist
  const { docs: existingFAQ } = await payload.find({ collection: 'faq-items', limit: 1 });

  if (existingFAQ.length === 0) {
    console.log('Seeding FAQ items...');
    let orderIndex = 0;
    for (const [category, faqs] of Object.entries(faqData)) {
      for (const faq of faqs) {
        try {
          await payload.create({
            collection: 'faq-items',
            locale: 'en',
            data: {
              question: faq.question,
              answer: faq.answer,
              category: category as any,
              order: orderIndex,
            },
          });
          orderIndex++;
          await delay(150);
        } catch (e) {
          console.error(`  Error creating FAQ:`, e);
        }
      }
      console.log(`  Created ${category} FAQs`);
    }
    console.log(`FAQ items seeded (${orderIndex} items)\n`);
  } else {
    console.log('FAQ items already exist, skipping\n');
  }

  await delay(1000);

  // Seed globals
  console.log('Seeding Hero global...');
  for (const locale of locales) {
    try {
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
          seo: { ...getSeoData(seo), noIndex: seo.noIndex, noFollow: seo.noFollow },
        },
      });
      await delay(200);
    } catch (e) {
      console.error(`  Error seeding Hero for ${locale}:`, e);
    }
  }
  console.log('Hero seeded\n');

  await delay(500);

  console.log('Seeding section globals...');

  // Impact Section
  for (const locale of locales) {
    try {
      const section = await getImpactSection(locale);
      await payload.updateGlobal({
        slug: 'impact-section',
        locale,
        data: { label: section.label, heading: section.heading, headingHighlight: section.headingHighlight, description: section.description },
      });
      await delay(100);
    } catch (e) { console.error(`Impact section error:`, e); }
  }

  // Services Section
  for (const locale of locales) {
    try {
      const section = await getServicesSection(locale);
      await payload.updateGlobal({
        slug: 'services-section',
        locale,
        data: { label: section.label, heading: section.heading, headingHighlight: section.headingHighlight, description: section.description, ctaText: section.ctaText, ctaButtonText: section.ctaButtonText },
      });
      await delay(100);
    } catch (e) { console.error(`Services section error:`, e); }
  }

  // Partners Section
  for (const locale of locales) {
    try {
      const section = await getPartnersSection(locale);
      await payload.updateGlobal({
        slug: 'partners-section',
        locale,
        data: { label: section.label, heading: section.heading },
      });
      await delay(100);
    } catch (e) { console.error(`Partners section error:`, e); }
  }

  // Testimonials Section
  for (const locale of locales) {
    try {
      const section = await getTestimonialsSection(locale);
      await payload.updateGlobal({
        slug: 'testimonials-section',
        locale,
        data: { label: section.label, heading: section.heading, description: section.description },
      });
      await delay(100);
    } catch (e) { console.error(`Testimonials section error:`, e); }
  }

  // Cities Section
  for (const locale of locales) {
    try {
      const section = await getCitiesSection(locale);
      await payload.updateGlobal({
        slug: 'cities-section',
        locale,
        data: { label: section.label, heading: section.heading, description: section.description, ctaText: section.ctaText, ctaButtonText: section.ctaButtonText },
      });
      await delay(100);
    } catch (e) { console.error(`Cities section error:`, e); }
  }

  // FAQ Section
  for (const locale of locales) {
    try {
      const section = await getFAQSection(locale);
      const seo = await getPageSEO('faq', locale);
      await payload.updateGlobal({
        slug: 'faq-section',
        locale,
        data: { label: section.label, heading: section.heading, description: section.description, ctaText: section.ctaText, ctaButtonText: section.ctaButtonText, seo: getSeoData(seo) },
      });
      await delay(100);
    } catch (e) { console.error(`FAQ section error:`, e); }
  }

  // CTA Section
  for (const locale of locales) {
    try {
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
      await delay(100);
    } catch (e) { console.error(`CTA section error:`, e); }
  }

  console.log('Section globals seeded\n');

  await delay(500);

  console.log('Seeding page content globals...');

  // About Page
  for (const locale of locales) {
    try {
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
      await delay(150);
    } catch (e) { console.error(`About page error:`, e); }
  }

  // Outdoor Farm Page
  for (const locale of locales) {
    try {
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
          packages: content.packages.map((p) => ({ name: p.name, features: p.features.map((f) => ({ feature: f })) })),
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
      await delay(150);
    } catch (e) { console.error(`Outdoor farm page error:`, e); }
  }

  // Indoor Farm Page
  for (const locale of locales) {
    try {
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
      await delay(150);
    } catch (e) { console.error(`Indoor farm page error:`, e); }
  }

  // Careers Page
  for (const locale of locales) {
    try {
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
      await delay(150);
    } catch (e) { console.error(`Careers page error:`, e); }
  }

  // Contact Page
  for (const locale of locales) {
    try {
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
      await delay(150);
    } catch (e) { console.error(`Contact page error:`, e); }
  }

  console.log('Page content globals seeded\n');

  console.log('='.repeat(50));
  console.log('Seed completed!');
  console.log('='.repeat(50));

  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
