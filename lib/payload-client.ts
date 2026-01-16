// Payload CMS Client - Replaces Strapi integration
// This file provides the same API as lib/strapi.ts but fetches from Payload CMS

import { getPayload } from 'payload';
import { unstable_cache } from 'next/cache';
import configPromise from '@payload-config';
import type {
  Locale,
  HeroContent,
  Stat,
  Service,
  Testimonial,
  Partner,
  City,
  FAQItem,
  NavLink,
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

// Import fallback data for graceful degradation
import { blogPosts as fallbackBlogPosts, getBlogPostBySlug as getFallbackBlogPost } from './blog-data';
import { getAllCitiesFallback } from './data/city-fallback-data';
import {
  getStats as getStrapiStats,
  getServices as getStrapiServices,
  getTestimonials as getStrapiTestimonials,
  getPartners as getStrapiPartners,
  getFAQ as getStrapiFAQ,
  getHeroContent as getStrapiHero,
} from './strapi';

// Re-export types and constants
export { locales, defaultLocale } from './strapi';
export type { Locale, PageSEOKey };

// Cache configuration
const CACHE_REVALIDATE_SECONDS = 300; // 5 minutes - revalidate cached data
const CACHE_TAGS = {
  hero: 'payload-hero',
  stats: 'payload-stats',
  services: 'payload-services',
  testimonials: 'payload-testimonials',
  partners: 'payload-partners',
  cities: 'payload-cities',
  faq: 'payload-faq',
  sections: 'payload-sections',
  pages: 'payload-pages',
  blog: 'payload-blog',
  seo: 'payload-seo',
};

// Cache the payload instance
let cachedPayload: Awaited<ReturnType<typeof getPayload>> | null = null;

async function getPayloadClient() {
  if (!cachedPayload) {
    cachedPayload = await getPayload({ config: configPromise });
  }
  return cachedPayload;
}

// Helper to get image URL from Payload media
function getImageUrl(
  media: { url?: string | null } | string | number | null | undefined
): string | undefined {
  if (!media) return undefined;
  if (typeof media === 'string') return media;
  if (typeof media === 'number') return undefined; // Media ID not populated
  return media.url ?? undefined;
}

// ==========================================
// COLLECTION FETCHERS
// ==========================================

// Internal uncached fetcher for hero content
async function _fetchHeroContent(locale: Locale): Promise<HeroContent> {
  const payload = await getPayloadClient();
  const hero = await payload.findGlobal({
    slug: 'hero',
    locale,
  });

  return {
    title: hero.title || '',
    titleHighlight: hero.titleHighlight || '',
    subtitle: hero.subtitle || '',
    ctaPrimary: hero.ctaPrimary || '',
    ctaSecondary: hero.ctaSecondary || '',
    image: getImageUrl(hero.image),
  };
}

export async function getHeroContent(locale: Locale = 'en'): Promise<HeroContent> {
  try {
    const cachedFetch = unstable_cache(
      () => _fetchHeroContent(locale),
      [`hero-${locale}`],
      { revalidate: CACHE_REVALIDATE_SECONDS, tags: [CACHE_TAGS.hero] }
    );
    const hero = await cachedFetch();
    // If hero title is empty, use fallback
    if (!hero.title) {
      return getStrapiHero(locale);
    }
    return hero;
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return getStrapiHero(locale);
  }
}

// Internal uncached fetchers for collections
async function _fetchStats(locale: Locale): Promise<Stat[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'stats',
    locale,
    sort: 'order',
    limit: 100,
  });

  return docs.map((doc) => ({
    value: doc.value || 0,
    suffix: doc.suffix || '',
    label: doc.label || '',
    description: doc.description || '',
  }));
}

async function _fetchServices(locale: Locale): Promise<Service[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'services',
    locale,
    sort: 'order',
    limit: 100,
  });

  return docs.map((doc) => ({
    icon: doc.icon || 'Leaf',
    title: doc.title || '',
    description: doc.description || '',
    features: (doc.features as { feature: string }[] | undefined)?.map((f) => f.feature) || [],
    image: getImageUrl(doc.image),
  }));
}

async function _fetchTestimonials(locale: Locale): Promise<Testimonial[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'testimonials',
    locale,
    sort: 'order',
    limit: 100,
  });

  return docs.map((doc) => ({
    quote: doc.quote || '',
    author: doc.author || '',
    role: doc.role || '',
    company: doc.company || '',
    highlight: doc.highlight ?? undefined,
    image: getImageUrl(doc.image),
    companyLogo: getImageUrl(doc.companyLogo),
  }));
}

async function _fetchPartners(locale: Locale): Promise<Partner[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'partners',
    locale,
    sort: 'order',
    limit: 100,
  });

  return docs.map((doc) => ({
    name: doc.name || '',
    logo: getImageUrl(doc.logo),
  }));
}

async function _fetchCities(locale: Locale): Promise<City[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'cities',
    locale,
    sort: 'order',
    limit: 100,
  });

  return docs.map((doc) => ({
    name: doc.name || '',
    country: doc.country || '',
    region: (doc.region as 'north-america' | 'europe') || 'north-america',
    regionName: (doc as { regionName?: string }).regionName || '',
    slug: doc.slug || '',
    image: getImageUrl(doc.image),
    description: (doc as { description?: string }).description || '',
    highlights: ((doc as { highlights?: Array<{ text: string }> }).highlights || []).map(h => h.text),
  }));
}

async function _fetchCityBySlug(slug: string, locale: Locale): Promise<City | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'cities',
    locale,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  });

  if (!docs.length) return null;

  const doc = docs[0];
  return {
    name: doc.name || '',
    country: doc.country || '',
    region: (doc.region as 'north-america' | 'europe') || 'north-america',
    regionName: (doc as { regionName?: string }).regionName || '',
    slug: doc.slug || '',
    image: getImageUrl(doc.image),
    description: (doc as { description?: string }).description || '',
    highlights: ((doc as { highlights?: Array<{ text: string }> }).highlights || []).map(h => h.text),
  };
}

async function _fetchFAQ(locale: Locale): Promise<FAQItem[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'faq-items',
    locale,
    sort: 'order',
    limit: 100,
  });

  return docs.map((doc) => ({
    question: doc.question || '',
    answer: doc.answer || '',
    category: doc.category || 'General',
  }));
}

// Cached collection fetchers with fallback to strapi data
export async function getStats(locale: Locale = 'en'): Promise<Stat[]> {
  try {
    const cachedFetch = unstable_cache(
      () => _fetchStats(locale),
      [`stats-${locale}`],
      { revalidate: CACHE_REVALIDATE_SECONDS, tags: [CACHE_TAGS.stats] }
    );
    const stats = await cachedFetch();
    return stats.length > 0 ? stats : getStrapiStats(locale);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return getStrapiStats(locale);
  }
}

export async function getServices(locale: Locale = 'en'): Promise<Service[]> {
  try {
    const cachedFetch = unstable_cache(
      () => _fetchServices(locale),
      [`services-${locale}`],
      { revalidate: CACHE_REVALIDATE_SECONDS, tags: [CACHE_TAGS.services] }
    );
    const services = await cachedFetch();
    return services.length > 0 ? services : getStrapiServices(locale);
  } catch (error) {
    console.error('Error fetching services:', error);
    return getStrapiServices(locale);
  }
}

export async function getTestimonials(locale: Locale = 'en'): Promise<Testimonial[]> {
  try {
    const cachedFetch = unstable_cache(
      () => _fetchTestimonials(locale),
      [`testimonials-${locale}`],
      { revalidate: CACHE_REVALIDATE_SECONDS, tags: [CACHE_TAGS.testimonials] }
    );
    const testimonials = await cachedFetch();
    return testimonials.length > 0 ? testimonials : getStrapiTestimonials(locale);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return getStrapiTestimonials(locale);
  }
}

export async function getPartners(locale: Locale = 'en'): Promise<Partner[]> {
  try {
    const cachedFetch = unstable_cache(
      () => _fetchPartners(locale),
      [`partners-${locale}`],
      { revalidate: CACHE_REVALIDATE_SECONDS, tags: [CACHE_TAGS.partners] }
    );
    const partners = await cachedFetch();
    return partners.length > 0 ? partners : getStrapiPartners(locale);
  } catch (error) {
    console.error('Error fetching partners:', error);
    return getStrapiPartners(locale);
  }
}

export async function getCities(locale: Locale = 'en'): Promise<City[]> {
  try {
    const cachedFetch = unstable_cache(
      () => _fetchCities(locale),
      [`cities-${locale}`],
      { revalidate: CACHE_REVALIDATE_SECONDS, tags: [CACHE_TAGS.cities] }
    );
    const cities = await cachedFetch();
    // If CMS returns cities, use them; otherwise return fallback
    return cities.length > 0 ? cities : getAllCitiesFallback();
  } catch (error) {
    console.error('Error fetching cities, using fallback:', error);
    return getAllCitiesFallback();
  }
}

export async function getFAQ(locale: Locale = 'en'): Promise<FAQItem[]> {
  try {
    const cachedFetch = unstable_cache(
      () => _fetchFAQ(locale),
      [`faq-${locale}`],
      { revalidate: CACHE_REVALIDATE_SECONDS, tags: [CACHE_TAGS.faq] }
    );
    const faq = await cachedFetch();
    return faq.length > 0 ? faq : getStrapiFAQ(locale);
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    return getStrapiFAQ(locale);
  }
}

// ==========================================
// SECTION CONTENT FETCHERS
// ==========================================

export async function getImpactSection(locale: Locale = 'en'): Promise<ImpactSectionContent> {
  try {
    const payload = await getPayloadClient();
    const section = await payload.findGlobal({
      slug: 'impact-section',
      locale,
    });

    return {
      label: section.label || '',
      heading: section.heading || '',
      headingHighlight: section.headingHighlight || '',
      description: section.description || '',
      images: (section.images as { image: { url?: string } }[] | undefined)?.map(
        (img) => getImageUrl(img.image) || ''
      ),
    };
  } catch (error) {
    console.error('Error fetching impact section:', error);
    return {
      label: 'Our Impact',
      heading: 'Creating',
      headingHighlight: 'Sustainable Cities',
      description: 'We transform urban spaces into thriving ecosystems.',
    };
  }
}

export async function getServicesSection(locale: Locale = 'en'): Promise<ServicesSectionContent> {
  try {
    const payload = await getPayloadClient();
    const section = await payload.findGlobal({
      slug: 'services-section',
      locale,
    });

    return {
      label: section.label || '',
      heading: section.heading || '',
      headingHighlight: section.headingHighlight || '',
      description: section.description || '',
      ctaText: section.ctaText || '',
      ctaButtonText: section.ctaButtonText || '',
    };
  } catch (error) {
    console.error('Error fetching services section:', error);
    return {
      label: 'Our Services',
      heading: 'What We',
      headingHighlight: 'Offer',
      description: 'Comprehensive urban farming solutions.',
      ctaText: 'Ready to transform your space?',
      ctaButtonText: 'Get Started',
    };
  }
}

export async function getPartnersSection(locale: Locale = 'en'): Promise<PartnersSectionContent> {
  try {
    const payload = await getPayloadClient();
    const section = await payload.findGlobal({
      slug: 'partners-section',
      locale,
    });

    return {
      label: section.label || '',
      heading: section.heading || '',
    };
  } catch (error) {
    console.error('Error fetching partners section:', error);
    return {
      label: 'Our Partners',
      heading: 'Trusted by Industry Leaders',
    };
  }
}

export async function getTestimonialsSection(
  locale: Locale = 'en'
): Promise<TestimonialsSectionContent> {
  try {
    const payload = await getPayloadClient();
    const section = await payload.findGlobal({
      slug: 'testimonials-section',
      locale,
    });

    return {
      label: section.label || '',
      heading: section.heading || '',
      description: section.description || '',
    };
  } catch (error) {
    console.error('Error fetching testimonials section:', error);
    return {
      label: 'Testimonials',
      heading: 'What Our Clients Say',
      description: '',
    };
  }
}

export async function getCitiesSection(locale: Locale = 'en'): Promise<CitiesSectionContent> {
  try {
    const payload = await getPayloadClient();
    const section = await payload.findGlobal({
      slug: 'cities-section',
      locale,
    });

    return {
      label: section.label || '',
      heading: section.heading || '',
      description: section.description || '',
      ctaText: section.ctaText || '',
      ctaButtonText: section.ctaButtonText || '',
    };
  } catch (error) {
    console.error('Error fetching cities section:', error);
    return {
      label: 'Our Locations',
      heading: 'Where We Operate',
      description: '',
      ctaText: '',
      ctaButtonText: 'View All Cities',
    };
  }
}

export async function getFAQSection(locale: Locale = 'en'): Promise<FAQSectionContent> {
  try {
    const payload = await getPayloadClient();
    const section = await payload.findGlobal({
      slug: 'faq-section',
      locale,
    });

    return {
      label: section.label || '',
      heading: section.heading || '',
      description: section.description || '',
      ctaText: section.ctaText || '',
      ctaButtonText: section.ctaButtonText || '',
    };
  } catch (error) {
    console.error('Error fetching FAQ section:', error);
    return {
      label: 'FAQ',
      heading: 'Frequently Asked Questions',
      description: '',
      ctaText: '',
      ctaButtonText: 'Contact Us',
    };
  }
}

export async function getCTASection(locale: Locale = 'en'): Promise<CTASectionContent> {
  try {
    const payload = await getPayloadClient();
    const section = await payload.findGlobal({
      slug: 'cta-section',
      locale,
    });

    return {
      label: section.label || '',
      heading: section.heading || '',
      headingHighlight: section.headingHighlight || '',
      description: section.description || '',
      ctaPrimary: section.ctaPrimary || '',
      ctaSecondary: section.ctaSecondary || '',
      ctaSecondaryEmail: section.ctaSecondaryEmail || '',
      trustIndicators:
        (section.trustIndicators as { indicator: string }[] | undefined)?.map(
          (t) => t.indicator
        ) || [],
    };
  } catch (error) {
    console.error('Error fetching CTA section:', error);
    return {
      label: 'Get Started',
      heading: 'Ready to',
      headingHighlight: 'Transform Your Space?',
      description: 'Contact us today to learn more.',
      ctaPrimary: 'Book a Demo',
      ctaSecondary: 'Email Us',
      ctaSecondaryEmail: 'info@microhabitat.com',
      trustIndicators: [],
    };
  }
}

// Local fallback showcase data
const fallbackShowcaseImages = [
  { src: '/images/showcase/urban-rooftop-farm.webp', alt: 'Urban rooftop farm with lush vegetables' },
  { src: '/images/showcase/team-photo.webp', alt: 'MicroHabitat team members working together' },
  { src: '/images/showcase/fresh-produce.webp', alt: 'Fresh locally grown produce' },
  { src: '/images/showcase/community-engagement.webp', alt: 'Community engagement activity on Toronto rooftop' },
  { src: '/images/showcase/toronto-rooftop.webp', alt: 'Rooftop urban farm in Toronto' },
  { src: '/images/showcase/educational-activities.webp', alt: 'Educational urban farming activities' },
];

const fallbackShowcaseContent: Record<Locale, { label: string; heading: string; headingHighlight: string }> = {
  en: { label: 'Our Work', heading: 'Transforming urban spaces into', headingHighlight: 'thriving ecosystems' },
  fr: { label: 'Nos réalisations', heading: 'Transformer les espaces urbains en', headingHighlight: 'écosystèmes florissants' },
  de: { label: 'Unsere Arbeit', heading: 'Städtische Räume in', headingHighlight: 'blühende Ökosysteme verwandeln' },
  nl: { label: 'Ons werk', heading: 'Stedelijke ruimtes transformeren naar', headingHighlight: 'bloeiende ecosystemen' },
  it: { label: 'Il nostro lavoro', heading: 'Trasformare gli spazi urbani in', headingHighlight: 'ecosistemi fiorenti' },
  es: { label: 'Nuestro trabajo', heading: 'Transformando espacios urbanos en', headingHighlight: 'ecosistemas prósperos' },
};

export async function getShowcaseSection(locale: Locale = 'en'): Promise<ShowcaseSectionContent> {
  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({
      slug: 'showcase-section',
      locale,
    });

    // Check if we have valid data with images
    const images = data?.images as Array<{ image?: { url?: string } | number; alt?: string }> | undefined;
    if (!images || images.length === 0) {
      throw new Error('No showcase images found');
    }

    // Transform the Payload data to match the expected format
    const transformedImages = images
      .map((item) => {
        const imageUrl = typeof item.image === 'object' && item.image?.url ? item.image.url : null;
        return {
          src: imageUrl || '',
          alt: item.alt || 'Showcase image',
        };
      })
      .filter((img) => img.src);

    if (transformedImages.length === 0) {
      throw new Error('No valid showcase images');
    }

    return {
      label: (data.label as string) || fallbackShowcaseContent[locale].label,
      heading: (data.heading as string) || fallbackShowcaseContent[locale].heading,
      headingHighlight: (data.headingHighlight as string) || fallbackShowcaseContent[locale].headingHighlight,
      images: transformedImages,
    };
  } catch {
    // Return local fallback data when Payload global doesn't exist or has no data
    const content = fallbackShowcaseContent[locale] || fallbackShowcaseContent.en;
    return {
      ...content,
      images: fallbackShowcaseImages,
    };
  }
}

// ==========================================
// SEO FETCHERS
// ==========================================

const globalSEOMap: Record<PageSEOKey, string> = {
  home: 'hero',
  about: 'about-page',
  'outdoor-farm': 'outdoor-farm-page',
  'indoor-farm': 'indoor-farm-page',
  'educational-activities': 'educational-activities-page',
  'commercial-real-estate': 'commercial-real-estate-page',
  corporations: 'corporations-page',
  schools: 'schools-page',
  careers: 'careers-page',
  partnerships: 'partnerships-page',
  'community-engagement': 'community-engagement-page',
  contact: 'contact-page',
  faq: 'faq-section',
  blog: 'blog-page',
  cities: 'cities-page',
  'privacy-policy': 'privacy-policy-page',
  'terms-of-service': 'terms-of-service-page',
  'cookie-policy': 'cookie-policy-page',
  'roi-calculator': 'roi-calculator-page',
};

export async function getPageSEO(
  pageKey: PageSEOKey,
  locale: Locale = 'en'
): Promise<SEOData> {
  try {
    const payload = await getPayloadClient();
    const globalSlug = globalSEOMap[pageKey];

    if (!globalSlug) {
      return getDefaultSEO(pageKey);
    }

    const global = await payload.findGlobal({
      slug: globalSlug as 'hero' | 'about-page' | 'outdoor-farm-page' | 'indoor-farm-page' | 'educational-activities-page' | 'community-engagement-page' | 'commercial-real-estate-page' | 'corporations-page' | 'schools-page' | 'partnerships-page' | 'careers-page' | 'contact-page' | 'cities-page' | 'faq-section' | 'blog-page' | 'privacy-policy-page' | 'terms-of-service-page' | 'cookie-policy-page' | 'roi-calculator-page',
      locale,
    });

    const seo = (global as { seo?: Record<string, unknown> }).seo;

    if (!seo) {
      return getDefaultSEO(pageKey);
    }

    return {
      metaTitle: (seo.metaTitle as string) || getDefaultSEO(pageKey).metaTitle,
      metaDescription: (seo.metaDescription as string) || getDefaultSEO(pageKey).metaDescription,
      keywords: seo.keywords as string | undefined,
      ogImage: getImageUrl(seo.ogImage as { url?: string } | undefined),
      canonical: seo.canonical as string | undefined,
      noIndex: seo.noIndex as boolean | undefined,
      noFollow: seo.noFollow as boolean | undefined,
    };
  } catch (error) {
    console.error(`Error fetching SEO for ${pageKey}:`, error);
    return getDefaultSEO(pageKey);
  }
}

function getDefaultSEO(pageKey: PageSEOKey): SEOData {
  const defaults: Record<PageSEOKey, SEOData> = {
    home: {
      metaTitle: 'Microhabitat | Urban Farming Solutions',
      metaDescription:
        'Transform your urban spaces into thriving ecosystems with Microhabitat.',
    },
    about: {
      metaTitle: 'About Us | Microhabitat',
      metaDescription: 'Learn about our mission to reconnect communities with nature.',
    },
    'outdoor-farm': {
      metaTitle: 'Outdoor Farms | Microhabitat',
      metaDescription: 'Rooftop and outdoor urban farming solutions.',
    },
    'indoor-farm': {
      metaTitle: 'Indoor Farms | Microhabitat',
      metaDescription: 'Indoor and vertical farming solutions.',
    },
    'educational-activities': {
      metaTitle: 'Educational Activities | Microhabitat',
      metaDescription: 'Learn about urban farming through our educational programs.',
    },
    'commercial-real-estate': {
      metaTitle: 'Commercial Real Estate | Microhabitat',
      metaDescription: 'Urban farming solutions for commercial properties.',
    },
    corporations: {
      metaTitle: 'Corporations | Microhabitat',
      metaDescription: 'Corporate sustainability programs.',
    },
    schools: {
      metaTitle: 'Schools | Microhabitat',
      metaDescription: 'Educational partnerships for schools.',
    },
    careers: {
      metaTitle: 'Careers | Microhabitat',
      metaDescription: 'Join our team and help transform urban spaces.',
    },
    partnerships: {
      metaTitle: 'Partnerships | Microhabitat',
      metaDescription: 'Partner with us to create sustainable communities.',
    },
    'community-engagement': {
      metaTitle: 'Community Engagement | Microhabitat',
      metaDescription: 'Community programs and food bank partnerships.',
    },
    contact: {
      metaTitle: 'Contact Us | Microhabitat',
      metaDescription: 'Get in touch with our team.',
    },
    faq: {
      metaTitle: 'FAQ | Microhabitat',
      metaDescription: 'Frequently asked questions about urban farming.',
    },
    blog: {
      metaTitle: 'Blog | Microhabitat',
      metaDescription: 'News and insights about urban farming.',
    },
    cities: {
      metaTitle: 'Our Locations | Microhabitat',
      metaDescription: 'Find Microhabitat in your city.',
    },
    'privacy-policy': {
      metaTitle: 'Privacy Policy | Microhabitat',
      metaDescription: 'Our privacy policy.',
      noIndex: true,
    },
    'terms-of-service': {
      metaTitle: 'Terms of Service | Microhabitat',
      metaDescription: 'Our terms of service.',
      noIndex: true,
    },
    'cookie-policy': {
      metaTitle: 'Cookie Policy | Microhabitat',
      metaDescription: 'Our cookie policy.',
      noIndex: true,
    },
    'roi-calculator': {
      metaTitle: 'ROI Calculator | Microhabitat',
      metaDescription: 'Calculate your urban farming ROI.',
    },
  };

  return defaults[pageKey] || defaults.home;
}

export async function getCitySEO(
  _citySlug: string,
  _locale: Locale = 'en'
): Promise<SEOData | null> {
  // Cities don't have individual SEO in Payload - return null to use defaults
  return null;
}

export async function getCityBySlug(
  slug: string,
  locale: Locale = 'en'
): Promise<City | null> {
  try {
    const cachedFetch = unstable_cache(
      () => _fetchCityBySlug(slug, locale),
      [`city-${slug}-${locale}`],
      { revalidate: CACHE_REVALIDATE_SECONDS, tags: [CACHE_TAGS.cities] }
    );
    return await cachedFetch();
  } catch (error) {
    console.error('Error fetching city:', error);
    return null;
  }
}

// ==========================================
// BLOG FETCHERS
// ==========================================

export async function getBlogPost(
  slug: string,
  locale: Locale = 'en'
): Promise<BlogPostFromCMS | null> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'blog-posts',
      locale,
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    });

    if (!docs.length) return null;

    const doc = docs[0];
    return {
      id: typeof doc.id === 'string' ? parseInt(doc.id, 10) : doc.id,
      title: doc.title || '',
      slug: doc.slug || '',
      excerpt: doc.excerpt || '',
      content:
        typeof doc.content === 'string'
          ? doc.content
          : JSON.stringify(doc.content),
      author: doc.author || '',
      publishedDate:
        typeof doc.publishedDate === 'string'
          ? doc.publishedDate
          : new Date().toISOString(),
      categories: (doc.categories as string[]) || [],
      featuredImage: getImageUrl(doc.featuredImage),
      seo: {
        metaTitle: (doc.seo as Record<string, unknown>)?.metaTitle as string || doc.title || '',
        metaDescription: (doc.seo as Record<string, unknown>)?.metaDescription as string || doc.excerpt || '',
        keywords: (doc.seo as Record<string, unknown>)?.keywords as string | undefined,
        ogImage: getImageUrl((doc.seo as Record<string, unknown>)?.ogImage as { url?: string } | undefined),
      },
    };
  } catch (error) {
    console.error('Error fetching blog post from CMS, trying fallback:', error);
    // Try fallback data
    const fallbackPost = getFallbackBlogPost(slug);
    if (fallbackPost) {
      return {
        id: 0,
        title: fallbackPost.title,
        slug: fallbackPost.slug,
        excerpt: fallbackPost.excerpt,
        content: fallbackPost.content || '',
        author: fallbackPost.author,
        publishedDate: fallbackPost.date,
        categories: fallbackPost.categories,
        featuredImage: fallbackPost.image,
        seo: {
          metaTitle: fallbackPost.title,
          metaDescription: fallbackPost.excerpt,
        },
      };
    }
    return null;
  }
}

export async function getBlogPosts(
  locale: Locale = 'en',
  options?: {
    page?: number;
    pageSize?: number;
    category?: string;
  }
): Promise<{ posts: BlogPostFromCMS[]; total: number; pageCount: number }> {
  try {
    const payload = await getPayloadClient();
    const { page = 1, pageSize = 10, category } = options || {};

    const where = category
      ? {
          categories: { contains: category },
        }
      : undefined;

    const { docs, totalDocs, totalPages } = await payload.find({
      collection: 'blog-posts',
      locale,
      where,
      sort: '-publishedDate',
      page,
      limit: pageSize,
    });

    const posts: BlogPostFromCMS[] = docs.map((doc) => ({
      id: typeof doc.id === 'string' ? parseInt(doc.id, 10) : doc.id,
      title: doc.title || '',
      slug: doc.slug || '',
      excerpt: doc.excerpt || '',
      content:
        typeof doc.content === 'string'
          ? doc.content
          : JSON.stringify(doc.content),
      author: doc.author || '',
      publishedDate:
        typeof doc.publishedDate === 'string'
          ? doc.publishedDate
          : new Date().toISOString(),
      categories: (doc.categories as string[]) || [],
      featuredImage: getImageUrl(doc.featuredImage),
      seo: {
        metaTitle: (doc.seo as Record<string, unknown>)?.metaTitle as string || doc.title || '',
        metaDescription: (doc.seo as Record<string, unknown>)?.metaDescription as string || doc.excerpt || '',
      },
    }));

    return {
      posts,
      total: totalDocs,
      pageCount: totalPages,
    };
  } catch (error) {
    console.error('Error fetching blog posts from CMS, using fallback:', error);
    // Return fallback data transformed to match CMS format
    const fallbackPosts: BlogPostFromCMS[] = fallbackBlogPosts.map((post, idx) => ({
      id: idx + 1,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content || '',
      author: post.author,
      publishedDate: post.date,
      categories: post.categories,
      featuredImage: post.image,
      seo: {
        metaTitle: post.title,
        metaDescription: post.excerpt,
      },
    }));
    return {
      posts: fallbackPosts.slice(0, options?.pageSize || 10),
      total: fallbackPosts.length,
      pageCount: Math.ceil(fallbackPosts.length / (options?.pageSize || 10)),
    };
  }
}

export async function getBlogPostSlugs(locale: Locale = 'en'): Promise<string[]> {
  try {
    const payload = await getPayloadClient();
    // Only fetch slug field to minimize data transfer (fixes N+1 query issue)
    const { docs } = await payload.find({
      collection: 'blog-posts',
      locale,
      limit: 1000,
      select: {
        slug: true,
      },
    });

    const slugs = docs.map((doc) => doc.slug || '').filter(Boolean);
    // If CMS has posts, return those; otherwise return fallback slugs
    return slugs.length > 0 ? slugs : fallbackBlogPosts.map(p => p.slug);
  } catch (error) {
    console.error('Error fetching blog post slugs, using fallback:', error);
    return fallbackBlogPosts.map(p => p.slug);
  }
}

// ==========================================
// PAGE CONTENT FETCHERS
// ==========================================

export async function getAboutPageContent(
  locale: Locale = 'en'
): Promise<AboutPageContent> {
  try {
    const payload = await getPayloadClient();
    const page = await payload.findGlobal({
      slug: 'about-page',
      locale,
    });

    return {
      heroLabel: page.heroLabel || '',
      heroTitle: page.heroTitle || '',
      heroTitleHighlight: page.heroTitleHighlight || '',
      missionLabel: page.missionLabel || '',
      missionTitle: page.missionTitle || '',
      missionParagraph1: page.missionParagraph1 || '',
      missionParagraph2: page.missionParagraph2 || '',
      solidarityLabel: page.solidarityLabel || '',
      solidarityTitle: page.solidarityTitle || '',
      solidarityDescription: page.solidarityDescription || '',
      impactStats:
        (page.impactStats as { value: string; label: string }[] | undefined) || [],
      storyLabel: page.storyLabel || '',
      storyTitle: page.storyTitle || '',
      storyContent:
        typeof page.storyContent === 'string'
          ? page.storyContent
          : JSON.stringify(page.storyContent || ''),
      ctaTitle: page.ctaTitle || '',
      ctaDescription: page.ctaDescription || '',
    };
  } catch (error) {
    console.error('Error fetching about page content:', error);
    // Return minimal default content
    return {
      heroLabel: 'About Us',
      heroTitle: 'Our',
      heroTitleHighlight: 'Mission',
      missionLabel: 'Our Mission',
      missionTitle: 'Reconnecting Communities with Nature',
      missionParagraph1: '',
      missionParagraph2: '',
      solidarityLabel: '',
      solidarityTitle: '',
      solidarityDescription: '',
      impactStats: [],
      storyLabel: '',
      storyTitle: '',
      storyContent: '',
      ctaTitle: '',
      ctaDescription: '',
    };
  }
}

export async function getOutdoorFarmPageContent(
  locale: Locale = 'en'
): Promise<OutdoorFarmPageContent> {
  try {
    const payload = await getPayloadClient();
    const page = await payload.findGlobal({
      slug: 'outdoor-farm-page',
      locale,
    });

    return {
      heroLabel: page.heroLabel || '',
      heroTitle: page.heroTitle || '',
      heroTitleHighlight: page.heroTitleHighlight || '',
      heroDescription: page.heroDescription || '',
      servicesLabel: page.servicesLabel || '',
      servicesTitle: page.servicesTitle || '',
      services:
        (page.services as { title: string; description: string }[] | undefined) || [],
      galleryLabel: page.galleryLabel || '',
      galleryTitle: page.galleryTitle || '',
      packagesLabel: page.packagesLabel || '',
      packagesTitle: page.packagesTitle || '',
      packages:
        (page.packages as { name: string; features: { feature: string }[] }[] | undefined)?.map(
          (p) => ({
            name: p.name,
            features: p.features?.map((f) => f.feature) || [],
          })
        ) || [],
      requirementsLabel: page.requirementsLabel || '',
      requirementsTitle: page.requirementsTitle || '',
      requirementsDescription: page.requirementsDescription || '',
      requirements:
        (page.requirements as { label: string; description: string }[] | undefined) || [],
      requirementsCardTitle: page.requirementsCardTitle || '',
      requirementsCardDescription: page.requirementsCardDescription || '',
      ctaTitle: page.ctaTitle || '',
      ctaDescription: page.ctaDescription || '',
      ctaViewFaq: page.ctaViewFaq || '',
    };
  } catch (error) {
    console.error('Error fetching outdoor farm page content:', error);
    return {
      heroLabel: '',
      heroTitle: '',
      heroTitleHighlight: '',
      heroDescription: '',
      servicesLabel: '',
      servicesTitle: '',
      services: [],
      galleryLabel: '',
      galleryTitle: '',
      packagesLabel: '',
      packagesTitle: '',
      packages: [],
      requirementsLabel: '',
      requirementsTitle: '',
      requirementsDescription: '',
      requirements: [],
      requirementsCardTitle: '',
      requirementsCardDescription: '',
      ctaTitle: '',
      ctaDescription: '',
      ctaViewFaq: '',
    };
  }
}

export async function getCareersPageContent(
  locale: Locale = 'en'
): Promise<CareersPageContent> {
  try {
    const payload = await getPayloadClient();
    const page = await payload.findGlobal({
      slug: 'careers-page',
      locale,
    });

    return {
      heroLabel: page.heroLabel || '',
      heroTitle: page.heroTitle || '',
      heroTitleHighlight: page.heroTitleHighlight || '',
      introText: page.introText || '',
      valuesLabel: page.valuesLabel || '',
      valuesTitle: page.valuesTitle || '',
      values: (page.values as { title: string; description: string }[] | undefined) || [],
      whyJoinLabel: page.whyJoinLabel || '',
      whyJoinTitle: page.whyJoinTitle || '',
      benefits: (page.benefits as { title: string; description: string }[] | undefined) || [],
      ctaTitle: page.ctaTitle || '',
      ctaDescription: page.ctaDescription || '',
    };
  } catch (error) {
    console.error('Error fetching careers page content:', error);
    return {
      heroLabel: '',
      heroTitle: '',
      heroTitleHighlight: '',
      introText: '',
      valuesLabel: '',
      valuesTitle: '',
      values: [],
      whyJoinLabel: '',
      whyJoinTitle: '',
      benefits: [],
      ctaTitle: '',
      ctaDescription: '',
    };
  }
}

export async function getContactPageContent(
  locale: Locale = 'en'
): Promise<ContactPageContent> {
  try {
    const payload = await getPayloadClient();
    const page = await payload.findGlobal({
      slug: 'contact-page',
      locale,
    });

    return {
      heroLabel: page.heroLabel || '',
      heroTitle: page.heroTitle || '',
      heroTitleHighlight: page.heroTitleHighlight || '',
      introText: page.introText || '',
      offices:
        (page.offices as {
          name: string;
          type: string;
          address: string;
          city: string;
          country: string;
        }[] | undefined) || [],
      formTitle: page.formTitle || '',
      formSubtitle: page.formSubtitle || '',
      quickLinks:
        (page.quickLinks as { label: string; value: string }[] | undefined) || [],
    };
  } catch (error) {
    console.error('Error fetching contact page content:', error);
    return {
      heroLabel: '',
      heroTitle: '',
      heroTitleHighlight: '',
      introText: '',
      offices: [],
      formTitle: '',
      formSubtitle: '',
      quickLinks: [],
    };
  }
}

export async function getIndoorFarmPageContent(
  locale: Locale = 'en'
): Promise<IndoorFarmPageContent> {
  try {
    const payload = await getPayloadClient();
    const page = await payload.findGlobal({
      slug: 'indoor-farm-page',
      locale,
    });

    return {
      heroLabel: page.heroLabel || '',
      heroTitle: page.heroTitle || '',
      heroTitleHighlight: page.heroTitleHighlight || '',
      heroDescription: page.heroDescription || '',
      featuresLabel: page.featuresLabel || '',
      featuresTitle: page.featuresTitle || '',
      features:
        (page.features as { title: string; description: string }[] | undefined)?.map((f) => ({
          title: f.title || '',
          description: f.description || '',
        })) || [],
      benefitsLabel: page.benefitsLabel || '',
      benefitsTitle: page.benefitsTitle || '',
      benefits:
        (page.benefits as { title: string; description: string }[] | undefined)?.map((b) => ({
          title: b.title || '',
          description: b.description || '',
        })) || [],
      ctaTitle: page.ctaTitle || '',
      ctaDescription: page.ctaDescription || '',
    };
  } catch (error) {
    console.error('Error fetching indoor farm page content:', error);
    return {
      heroLabel: '',
      heroTitle: '',
      heroTitleHighlight: '',
      heroDescription: '',
      featuresLabel: '',
      featuresTitle: '',
      features: [],
      benefitsLabel: '',
      benefitsTitle: '',
      benefits: [],
      ctaTitle: '',
      ctaDescription: '',
    };
  }
}

// ==========================================
// NAVIGATION (Static - defined inline to avoid circular imports)
// ==========================================

const navLinksData: Record<Locale, NavLink[]> = {
  en: [
    { href: '#services', label: 'Services', id: 'services' },
    { href: '#impact', label: 'Impact', id: 'impact' },
    { href: '#testimonials', label: 'Testimonials', id: 'testimonials' },
    { href: '#cities', label: 'Cities', id: 'cities' },
    { href: '#faq', label: 'FAQ', id: 'faq' },
  ],
  fr: [
    { href: '#services', label: 'Services', id: 'services' },
    { href: '#impact', label: 'Impact', id: 'impact' },
    { href: '#testimonials', label: 'Temoignages', id: 'testimonials' },
    { href: '#cities', label: 'Villes', id: 'cities' },
    { href: '#faq', label: 'FAQ', id: 'faq' },
  ],
  de: [
    { href: '#services', label: 'Dienstleistungen', id: 'services' },
    { href: '#impact', label: 'Wirkung', id: 'impact' },
    { href: '#testimonials', label: 'Referenzen', id: 'testimonials' },
    { href: '#cities', label: 'Stadte', id: 'cities' },
    { href: '#faq', label: 'FAQ', id: 'faq' },
  ],
  nl: [
    { href: '#services', label: 'Diensten', id: 'services' },
    { href: '#impact', label: 'Impact', id: 'impact' },
    { href: '#testimonials', label: 'Getuigenissen', id: 'testimonials' },
    { href: '#cities', label: 'Steden', id: 'cities' },
    { href: '#faq', label: 'FAQ', id: 'faq' },
  ],
  it: [
    { href: '#services', label: 'Servizi', id: 'services' },
    { href: '#impact', label: 'Impatto', id: 'impact' },
    { href: '#testimonials', label: 'Testimonianze', id: 'testimonials' },
    { href: '#cities', label: 'Citta', id: 'cities' },
    { href: '#faq', label: 'FAQ', id: 'faq' },
  ],
  es: [
    { href: '#services', label: 'Servicios', id: 'services' },
    { href: '#impact', label: 'Impacto', id: 'impact' },
    { href: '#testimonials', label: 'Testimonios', id: 'testimonials' },
    { href: '#cities', label: 'Ciudades', id: 'cities' },
    { href: '#faq', label: 'FAQ', id: 'faq' },
  ],
};

const footerSectionsData: Record<Locale, FooterSection[]> = {
  en: [
    {
      title: 'Services',
      links: [
        { label: 'Outdoor Farms', href: '/outdoor-farm' },
        { label: 'Indoor Farms', href: '/indoor-farm' },
        { label: 'Educational Activities', href: '/educational-activities' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Cookie Policy', href: '/cookie-policy' },
      ],
    },
  ],
  fr: [
    {
      title: 'Services',
      links: [
        { label: 'Fermes Exterieures', href: '/fr/ferme-exterieure' },
        { label: 'Fermes Interieures', href: '/fr/ferme-interieure' },
        { label: 'Activites Educatives', href: '/fr/activites-educatives' },
      ],
    },
    {
      title: 'Entreprise',
      links: [
        { label: 'A Propos', href: '/fr/a-propos' },
        { label: 'Carrieres', href: '/fr/carrieres' },
        { label: 'Contact', href: '/fr/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Politique de Confidentialite', href: '/fr/politique-de-confidentialite' },
        { label: 'Conditions de Service', href: '/fr/conditions-de-service' },
        { label: 'Politique des Cookies', href: '/fr/politique-des-cookies' },
      ],
    },
  ],
  de: [
    {
      title: 'Dienstleistungen',
      links: [
        { label: 'Aussenfarmen', href: '/de/aussenfarm' },
        { label: 'Innenfarmen', href: '/de/innenfarm' },
        { label: 'Bildungsaktivitaten', href: '/de/bildungsaktivitaten' },
      ],
    },
    {
      title: 'Unternehmen',
      links: [
        { label: 'Uber Uns', href: '/de/ueber-uns' },
        { label: 'Karriere', href: '/de/karriere' },
        { label: 'Kontakt', href: '/de/kontakt' },
      ],
    },
    {
      title: 'Rechtliches',
      links: [
        { label: 'Datenschutz', href: '/de/datenschutz' },
        { label: 'AGB', href: '/de/agb' },
        { label: 'Cookie-Richtlinie', href: '/de/cookie-richtlinie' },
      ],
    },
  ],
  nl: [
    {
      title: 'Diensten',
      links: [
        { label: 'Buitenboerderijen', href: '/nl/buitenboerderij' },
        { label: 'Binnenboerderijen', href: '/nl/binnenboerderij' },
        { label: 'Educatieve Activiteiten', href: '/nl/educatieve-activiteiten' },
      ],
    },
    {
      title: 'Bedrijf',
      links: [
        { label: 'Over Ons', href: '/nl/over-ons' },
        { label: 'Vacatures', href: '/nl/vacatures' },
        { label: 'Contact', href: '/nl/contact' },
      ],
    },
    {
      title: 'Juridisch',
      links: [
        { label: 'Privacybeleid', href: '/nl/privacybeleid' },
        { label: 'Servicevoorwaarden', href: '/nl/servicevoorwaarden' },
        { label: 'Cookiebeleid', href: '/nl/cookiebeleid' },
      ],
    },
  ],
  it: [
    {
      title: 'Servizi',
      links: [
        { label: 'Fattorie Esterne', href: '/it/fattoria-esterna' },
        { label: 'Fattorie Interne', href: '/it/fattoria-interna' },
        { label: 'Attivita Educative', href: '/it/attivita-educative' },
      ],
    },
    {
      title: 'Azienda',
      links: [
        { label: 'Chi Siamo', href: '/it/chi-siamo' },
        { label: 'Carriere', href: '/it/carriere' },
        { label: 'Contatti', href: '/it/contatti' },
      ],
    },
    {
      title: 'Legale',
      links: [
        { label: 'Privacy Policy', href: '/it/privacy-policy' },
        { label: 'Termini di Servizio', href: '/it/termini-di-servizio' },
        { label: 'Cookie Policy', href: '/it/cookie-policy' },
      ],
    },
  ],
  es: [
    {
      title: 'Servicios',
      links: [
        { label: 'Granjas Exteriores', href: '/es/granja-exterior' },
        { label: 'Granjas Interiores', href: '/es/granja-interior' },
        { label: 'Actividades Educativas', href: '/es/actividades-educativas' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre Nosotros', href: '/es/sobre-nosotros' },
        { label: 'Carreras', href: '/es/carreras' },
        { label: 'Contacto', href: '/es/contacto' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Politica de Privacidad', href: '/es/politica-de-privacidad' },
        { label: 'Terminos de Servicio', href: '/es/terminos-de-servicio' },
        { label: 'Politica de Cookies', href: '/es/politica-de-cookies' },
      ],
    },
  ],
};

export async function getNavLinks(locale: Locale = 'en'): Promise<NavLink[]> {
  return navLinksData[locale] || navLinksData.en;
}

export async function getFooterSections(locale: Locale = 'en'): Promise<FooterSection[]> {
  return footerSectionsData[locale] || footerSectionsData.en;
}

// ==========================================
// AGGREGATED CONTENT
// ==========================================

export async function getAllContent(locale: Locale = 'en'): Promise<SiteContent> {
  const [
    hero,
    stats,
    services,
    testimonials,
    partners,
    cities,
    navLinks,
    footerSections,
    faq,
    impactSection,
    servicesSection,
    partnersSection,
    testimonialsSection,
    citiesSection,
    faqSection,
    ctaSection,
  ] = await Promise.all([
    getHeroContent(locale),
    getStats(locale),
    getServices(locale),
    getTestimonials(locale),
    getPartners(locale),
    getCities(locale),
    getNavLinks(locale),
    getFooterSections(locale),
    getFAQ(locale),
    getImpactSection(locale),
    getServicesSection(locale),
    getPartnersSection(locale),
    getTestimonialsSection(locale),
    getCitiesSection(locale),
    getFAQSection(locale),
    getCTASection(locale),
  ]);

  return {
    hero,
    stats,
    services,
    testimonials,
    partners,
    cities,
    navLinks,
    footerSections,
    faq,
    impactSection,
    servicesSection,
    partnersSection,
    testimonialsSection,
    citiesSection,
    faqSection,
    ctaSection,
  };
}
