import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocale } from '../lib/locale-context';

const BASE_URL = 'https://www.microhabitat.com';
const SITE_NAME = 'Microhabitat';

// Supported locales for hreflang
const LOCALES = ['en', 'fr', 'de', 'nl', 'it', 'es'] as const;

const LOCALE_TO_HREFLANG: Record<string, string> = {
  en: 'en',
  fr: 'fr',
  de: 'de',
  nl: 'nl',
  it: 'it',
  es: 'es',
};

/**
 * Organization Schema - Used site-wide
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: 'MicroHabitat',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${BASE_URL}/og-image.png`,
  description: "The world's largest urban farming network. Transform underutilized urban spaces into thriving urban farms.",
  foundingDate: '2016',
  founders: [
    { '@type': 'Person', name: 'Orlane' },
    { '@type': 'Person', name: 'Alexandre' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Montreal',
    addressRegion: 'QC',
    addressCountry: 'CA',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+1-514-555-0123',
      contactType: 'customer service',
      availableLanguage: ['English', 'French'],
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/microhabitat',
    'https://www.instagram.com/microhabitat',
    'https://twitter.com/microhabitat',
  ],
  areaServed: [
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'France' },
    { '@type': 'Country', name: 'Germany' },
    { '@type': 'Country', name: 'Netherlands' },
    { '@type': 'Country', name: 'Italy' },
    { '@type': 'Country', name: 'Spain' },
    { '@type': 'Country', name: 'United Kingdom' },
  ],
  knowsAbout: [
    'Urban Farming',
    'Urban Agriculture',
    'Rooftop Farming',
    'Vertical Farming',
    'Sustainable Agriculture',
    'Green Building Certification',
    'ESG',
    'Corporate Sustainability',
  ],
};

/**
 * WebSite Schema with SearchAction
 */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: SITE_NAME,
  description: "The world's largest urban farming network",
  publisher: { '@id': `${BASE_URL}/#organization` },
  inLanguage: ['en', 'fr', 'de', 'nl', 'it', 'es'],
};

/**
 * LocalBusiness Schema for each office location
 */
export const localBusinessSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#montreal-office`,
    name: 'Microhabitat - Montreal (Headquarters)',
    image: `${BASE_URL}/og-image.png`,
    url: BASE_URL,
    telephone: '+1-514-555-0123',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Urban Farm Street',
      addressLocality: 'Montreal',
      addressRegion: 'QC',
      postalCode: 'H2X 1Y2',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.5017,
      longitude: -73.5673,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    parentOrganization: { '@id': `${BASE_URL}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#toronto-office`,
    name: 'Microhabitat - Toronto',
    url: BASE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    parentOrganization: { '@id': `${BASE_URL}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#newyork-office`,
    name: 'Microhabitat - New York',
    url: BASE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New York',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    parentOrganization: { '@id': `${BASE_URL}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#paris-office`,
    name: 'Microhabitat - Paris',
    url: BASE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
    parentOrganization: { '@id': `${BASE_URL}/#organization` },
  },
];

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url.startsWith('http') ? article.url : `${BASE_URL}${article.url}`,
    image: article.image || `${BASE_URL}/og-image.png`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
    publisher: { '@id': `${BASE_URL}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url.startsWith('http') ? article.url : `${BASE_URL}${article.url}`,
    },
  };
}

/**
 * Generate Service schema
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url.startsWith('http') ? service.url : `${BASE_URL}${service.url}`,
    image: service.image || `${BASE_URL}/og-image.png`,
    provider: { '@id': `${BASE_URL}/#organization` },
    areaServed: {
      '@type': 'Country',
      name: 'Canada',
    },
  };
}

interface StructuredDataProps {
  /** JSON-LD schema object or array of objects */
  schema: object | object[];
}

/**
 * Component to inject JSON-LD structured data into the page
 */
export function StructuredData({ schema }: StructuredDataProps) {
  useEffect(() => {
    const schemas = Array.isArray(schema) ? schema : [schema];
    const scriptIds: string[] = [];

    schemas.forEach((s, index) => {
      const id = `structured-data-${index}-${Date.now()}`;
      scriptIds.push(id);

      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
    });

    return () => {
      scriptIds.forEach((id) => {
        const script = document.getElementById(id);
        if (script) {
          script.remove();
        }
      });
    };
  }, [schema]);

  return null;
}

interface HreflangTagsProps {
  /** Current path without locale prefix (e.g., '/about') */
  path: string;
}

/**
 * Component to add hreflang tags for all supported languages
 */
export function HreflangTags({ path }: HreflangTagsProps) {
  const { locale } = useLocale();

  useEffect(() => {
    // Remove existing hreflang tags
    document.querySelectorAll('link[hreflang]').forEach((el) => el.remove());

    // Add hreflang for each locale
    LOCALES.forEach((loc) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = LOCALE_TO_HREFLANG[loc];

      // Build URL: English has no prefix, others have /{locale} prefix
      const url = loc === 'en'
        ? `${BASE_URL}${path}`
        : `${BASE_URL}/${loc}${path}`;

      link.href = url;
      document.head.appendChild(link);
    });

    // Add x-default (pointing to English version)
    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.hreflang = 'x-default';
    xDefault.href = `${BASE_URL}${path}`;
    document.head.appendChild(xDefault);

    return () => {
      document.querySelectorAll('link[hreflang]').forEach((el) => el.remove());
    };
  }, [path, locale]);

  return null;
}

/**
 * Component for global SEO elements (Organization, WebSite schemas + performance hints)
 * Add this once in App.tsx or layout
 */
export function GlobalSEO() {
  const location = useLocation();

  useEffect(() => {
    // Add preconnect hints for external resources
    const preconnects = [
      'https://images.squarespace-cdn.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ];

    const existingPreconnects = new Set(
      Array.from(document.querySelectorAll('link[rel="preconnect"]')).map(
        (el) => el.getAttribute('href')
      )
    );

    preconnects.forEach((url) => {
      if (!existingPreconnects.has(url)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });

    // Add DNS prefetch as fallback
    preconnects.forEach((url) => {
      const existingPrefetch = document.querySelector(
        `link[rel="dns-prefetch"][href="${url}"]`
      );
      if (!existingPrefetch) {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = url;
        document.head.appendChild(link);
      }
    });
  }, []);

  // Determine current path for hreflang (strip locale prefix)
  const pathWithoutLocale = location.pathname.replace(/^\/(fr|de|nl|it|es)/, '') || '/';

  return (
    <>
      <StructuredData schema={[organizationSchema, websiteSchema]} />
      <HreflangTags path={pathWithoutLocale} />
    </>
  );
}

/**
 * Breadcrumb component with structured data
 */
interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const allItems = [{ name: 'Home', href: '/' }, ...items];

  return (
    <>
      <StructuredData
        schema={generateBreadcrumbSchema(
          allItems.map((item) => ({ name: item.name, url: item.href }))
        )}
      />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              {index === allItems.length - 1 ? (
                <span className="text-foreground">{item.name}</span>
              ) : (
                <a
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
