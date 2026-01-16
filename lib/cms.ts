// CMS Abstraction Layer
// Conditionally uses Payload CMS when configured, otherwise falls back to Strapi data

// Re-export types from strapi.ts (source of truth for types)
export type {
  Locale,
  HeroContent,
  Stat,
  Service,
  Testimonial,
  Partner,
  City,
  FAQItem,
  NavLink,
  FooterLink,
  FooterSection,
  ImpactSectionContent,
  ServicesSectionContent,
  PartnersSectionContent,
  TestimonialsSectionContent,
  CitiesSectionContent,
  FAQSectionContent,
  CTASectionContent,
  ShowcaseSectionContent,
  SEOData,
  PageSEOKey,
  SiteContent,
  AboutPageContent,
  OutdoorFarmPageContent,
  IndoorFarmPageContent,
  CareersPageContent,
  ContactPageContent,
  BlogPostFromCMS,
} from './strapi';

export { locales, defaultLocale } from './strapi';

// Re-export data source types for dev mode badge
export type { DataSource, DataSourceStatus } from './payload-client';

// Check if Payload is configured
const isPayloadConfigured = Boolean(process.env.POSTGRES_URL && process.env.PAYLOAD_SECRET);

// Dynamically import the appropriate CMS client
async function getCMSClient() {
  if (isPayloadConfigured) {
    return import('./payload-client');
  }
  return import('./strapi');
}

// Re-export all functions with dynamic switching
export async function getHeroContent(locale?: Parameters<typeof import('./strapi').getHeroContent>[0]) {
  const cms = await getCMSClient();
  return cms.getHeroContent(locale);
}

export async function getStats(locale?: Parameters<typeof import('./strapi').getStats>[0]) {
  const cms = await getCMSClient();
  return cms.getStats(locale);
}

export async function getServices(locale?: Parameters<typeof import('./strapi').getServices>[0]) {
  const cms = await getCMSClient();
  return cms.getServices(locale);
}

export async function getTestimonials(locale?: Parameters<typeof import('./strapi').getTestimonials>[0]) {
  const cms = await getCMSClient();
  return cms.getTestimonials(locale);
}

export async function getPartners(locale?: Parameters<typeof import('./strapi').getPartners>[0]) {
  const cms = await getCMSClient();
  return cms.getPartners(locale);
}

export async function getCities(locale?: Parameters<typeof import('./strapi').getCities>[0]) {
  const cms = await getCMSClient();
  return cms.getCities(locale);
}

export async function getNavLinks(locale?: Parameters<typeof import('./strapi').getNavLinks>[0]) {
  const cms = await getCMSClient();
  return cms.getNavLinks(locale);
}

export async function getFooterSections(locale?: Parameters<typeof import('./strapi').getFooterSections>[0]) {
  const cms = await getCMSClient();
  return cms.getFooterSections(locale);
}

export async function getFAQ(locale?: Parameters<typeof import('./strapi').getFAQ>[0]) {
  const cms = await getCMSClient();
  return cms.getFAQ(locale);
}

export async function getImpactSection(locale?: Parameters<typeof import('./strapi').getImpactSection>[0]) {
  const cms = await getCMSClient();
  return cms.getImpactSection(locale);
}

export async function getServicesSection(locale?: Parameters<typeof import('./strapi').getServicesSection>[0]) {
  const cms = await getCMSClient();
  return cms.getServicesSection(locale);
}

export async function getPartnersSection(locale?: Parameters<typeof import('./strapi').getPartnersSection>[0]) {
  const cms = await getCMSClient();
  return cms.getPartnersSection(locale);
}

export async function getTestimonialsSection(locale?: Parameters<typeof import('./strapi').getTestimonialsSection>[0]) {
  const cms = await getCMSClient();
  return cms.getTestimonialsSection(locale);
}

export async function getCitiesSection(locale?: Parameters<typeof import('./strapi').getCitiesSection>[0]) {
  const cms = await getCMSClient();
  return cms.getCitiesSection(locale);
}

export async function getFAQSection(locale?: Parameters<typeof import('./strapi').getFAQSection>[0]) {
  const cms = await getCMSClient();
  return cms.getFAQSection(locale);
}

export async function getCTASection(locale?: Parameters<typeof import('./strapi').getCTASection>[0]) {
  const cms = await getCMSClient();
  return cms.getCTASection(locale);
}

export async function getShowcaseSection(locale?: Parameters<typeof import('./strapi').getShowcaseSection>[0]) {
  const cms = await getCMSClient();
  return cms.getShowcaseSection(locale);
}

export async function getPageSEO(
  pageKey: Parameters<typeof import('./strapi').getPageSEO>[0],
  locale?: Parameters<typeof import('./strapi').getPageSEO>[1]
) {
  const cms = await getCMSClient();
  return cms.getPageSEO(pageKey, locale);
}

export async function getCitySEO(
  citySlug: Parameters<typeof import('./strapi').getCitySEO>[0],
  locale?: Parameters<typeof import('./strapi').getCitySEO>[1]
) {
  const cms = await getCMSClient();
  return cms.getCitySEO(citySlug, locale);
}

export async function getCityBySlug(
  slug: string,
  locale?: Parameters<typeof import('./strapi').getCities>[0]
) {
  const cms = await getCMSClient();
  if ('getCityBySlug' in cms) {
    return (cms as { getCityBySlug: (slug: string, locale?: string) => Promise<import('./strapi').City | null> }).getCityBySlug(slug, locale);
  }
  // Fallback for Strapi - filter from all cities
  const cities = await cms.getCities(locale);
  return cities.find(c => c.slug === slug) || null;
}

export async function getBlogPost(
  slug: Parameters<typeof import('./strapi').getBlogPost>[0],
  locale?: Parameters<typeof import('./strapi').getBlogPost>[1]
) {
  const cms = await getCMSClient();
  return cms.getBlogPost(slug, locale);
}

export async function getBlogPosts(
  locale?: Parameters<typeof import('./strapi').getBlogPosts>[0],
  options?: Parameters<typeof import('./strapi').getBlogPosts>[1]
) {
  const cms = await getCMSClient();
  return cms.getBlogPosts(locale, options);
}

export async function getBlogPostSlugs(locale?: Parameters<typeof import('./strapi').getBlogPostSlugs>[0]) {
  const cms = await getCMSClient();
  return cms.getBlogPostSlugs(locale);
}

export async function getAllContent(locale?: Parameters<typeof import('./strapi').getAllContent>[0]) {
  const cms = await getCMSClient();
  return cms.getAllContent(locale);
}

export async function getAboutPageContent(locale?: Parameters<typeof import('./strapi').getAboutPageContent>[0]) {
  const cms = await getCMSClient();
  return cms.getAboutPageContent(locale);
}

export async function getOutdoorFarmPageContent(locale?: Parameters<typeof import('./strapi').getOutdoorFarmPageContent>[0]) {
  const cms = await getCMSClient();
  return cms.getOutdoorFarmPageContent(locale);
}

export async function getCareersPageContent(locale?: Parameters<typeof import('./strapi').getCareersPageContent>[0]) {
  const cms = await getCMSClient();
  return cms.getCareersPageContent(locale);
}

export async function getContactPageContent(locale?: Parameters<typeof import('./strapi').getContactPageContent>[0]) {
  const cms = await getCMSClient();
  return cms.getContactPageContent(locale);
}

export async function getIndoorFarmPageContent(locale?: Parameters<typeof import('./strapi').getIndoorFarmPageContent>[0]) {
  const cms = await getCMSClient();
  return cms.getIndoorFarmPageContent(locale);
}

// Dev mode: Get data source status for debugging badge
export async function getHomepageDataWithSources(locale?: Parameters<typeof import('./strapi').getHeroContent>[0]) {
  if (isPayloadConfigured) {
    const payloadClient = await import('./payload-client');
    return payloadClient.getHomepageDataWithSources(locale);
  }
  // If using Strapi, all data is from "CMS" (Strapi fallback)
  return {
    hero: 'fallback' as const,
    stats: 'fallback' as const,
    services: 'fallback' as const,
    testimonials: 'fallback' as const,
    partners: 'fallback' as const,
    cities: 'fallback' as const,
    faq: 'fallback' as const,
    showcase: 'fallback' as const,
  };
}
