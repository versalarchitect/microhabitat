/**
 * JSON-LD Structured Data Components for Next.js
 *
 * These components inject schema.org structured data for better SEO.
 * Use them in page.tsx files alongside generateMetadata.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';

// Type definitions for structured data
interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  '@id': string;
  name: string;
  alternateName?: string;
  url: string;
  logo: {
    '@type': 'ImageObject';
    url: string;
    width: number;
    height: number;
  };
  image?: string;
  description?: string;
  foundingDate?: string;
  founders?: Array<{ '@type': 'Person'; name: string }>;
  address?: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion?: string;
    addressCountry: string;
  };
  contactPoint?: Array<{
    '@type': 'ContactPoint';
    telephone?: string;
    contactType: string;
    availableLanguage?: string[];
  }>;
  sameAs?: string[];
  areaServed?: Array<{ '@type': 'Country'; name: string }>;
  knowsAbout?: string[];
}

interface WebSiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  '@id': string;
  url: string;
  name: string;
  description?: string;
  publisher: { '@id': string };
  inLanguage?: string[];
  potentialAction?: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  '@id': string;
  name: string;
  image?: string;
  url: string;
  telephone?: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: {
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
  parentOrganization?: { '@id': string };
}

interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  publisher: { '@id': string };
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  description: string;
  url: string;
  image?: string;
  provider: { '@id': string };
  areaServed?: Array<{
    '@type': 'Country';
    name: string;
  }>;
  serviceType?: string;
  hasOfferCatalog?: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: Array<{
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service';
        name: string;
      };
    }>;
  };
}

interface WebPageSchema {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  '@id': string;
  url: string;
  name: string;
  description?: string;
  isPartOf: { '@id': string };
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: { '@id': string };
  inLanguage?: string;
  potentialAction?: {
    '@type': 'ReadAction';
    target: string[];
  };
}

interface CityLocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  '@id': string;
  name: string;
  description: string;
  url: string;
  image?: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion?: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  areaServed?: {
    '@type': 'City';
    name: string;
  };
  parentOrganization: { '@id': string };
  priceRange?: string;
  openingHoursSpecification?: {
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
}

// Reusable data
export const organizationData: OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Microhabitat',
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
      contactType: 'customer service',
      availableLanguage: ['English', 'French', 'German', 'Dutch', 'Italian', 'Spanish'],
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

export const websiteData: WebSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'Microhabitat',
  description: "The world's largest urban farming network",
  publisher: { '@id': `${BASE_URL}/#organization` },
  inLanguage: ['en', 'fr', 'de', 'nl', 'it', 'es'],
};

export const localBusinessData: LocalBusinessSchema[] = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#montreal-office`,
    name: 'Microhabitat - Montreal (Headquarters)',
    image: `${BASE_URL}/og-image.png`,
    url: BASE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montreal',
      addressRegion: 'QC',
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
 * Generic JSON-LD script component
 */
export function JsonLd<T extends object>({ data }: { data: T | T[] }) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

/**
 * Organization + WebSite schemas (use in root layout)
 */
export function OrganizationJsonLd() {
  return <JsonLd data={[organizationData, websiteData, ...localBusinessData]} />;
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && index < items.length - 1 ? { item: item.url } : {}),
    })),
  };
}

/**
 * Breadcrumb JSON-LD component
 */
export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url?: string }> }) {
  return <JsonLd data={generateBreadcrumbSchema(items)} />;
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQSchema {
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
 * FAQ JSON-LD component
 */
export function FAQJsonLd({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  return <JsonLd data={generateFAQSchema(faqs)} />;
}

/**
 * Generate Article schema
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}): ArticleSchema {
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
      name: 'Microhabitat',
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
 * Article JSON-LD component
 */
export function ArticleJsonLd({ article }: {
  article: {
    title: string;
    description: string;
    url: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
  };
}) {
  return <JsonLd data={generateArticleSchema(article)} />;
}

/**
 * Generate Service schema with enhanced options
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
  serviceType?: string;
  features?: string[];
}): ServiceSchema {
  const schema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url.startsWith('http') ? service.url : `${BASE_URL}${service.url}`,
    image: service.image || `${BASE_URL}/og-image.png`,
    provider: { '@id': `${BASE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Netherlands' },
    ],
    serviceType: service.serviceType,
  };

  // Add offer catalog if features are provided
  if (service.features && service.features.length > 0) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${service.name} Features`,
      itemListElement: service.features.map(feature => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature,
        },
      })),
    };
  }

  return schema;
}

/**
 * Service JSON-LD component
 */
export function ServiceJsonLd({ service }: {
  service: {
    name: string;
    description: string;
    url: string;
    image?: string;
    serviceType?: string;
    features?: string[];
  };
}) {
  return <JsonLd data={generateServiceSchema(service)} />;
}

/**
 * Generate WebPage schema with dateModified
 */
export function generateWebPageSchema(page: {
  url: string;
  name: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  locale?: string;
}): WebPageSchema {
  const fullUrl = page.url.startsWith('http') ? page.url : `${BASE_URL}${page.url}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${fullUrl}#webpage`,
    url: fullUrl,
    name: page.name,
    description: page.description,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    datePublished: page.datePublished || '2016-01-01',
    dateModified: page.dateModified || new Date().toISOString().split('T')[0],
    inLanguage: page.locale || 'en',
    potentialAction: {
      '@type': 'ReadAction',
      target: [fullUrl],
    },
  };
}

/**
 * WebPage JSON-LD component
 */
export function WebPageJsonLd({ page }: {
  page: {
    url: string;
    name: string;
    description?: string;
    datePublished?: string;
    dateModified?: string;
    locale?: string;
  };
}) {
  return <JsonLd data={generateWebPageSchema(page)} />;
}

/**
 * City-specific geo coordinates
 */
const cityGeoData: Record<string, { lat: number; lng: number; region?: string; country: string }> = {
  'montreal': { lat: 45.5017, lng: -73.5673, region: 'QC', country: 'CA' },
  'toronto': { lat: 43.6532, lng: -79.3832, region: 'ON', country: 'CA' },
  'vancouver': { lat: 49.2827, lng: -123.1207, region: 'BC', country: 'CA' },
  'calgary': { lat: 51.0447, lng: -114.0719, region: 'AB', country: 'CA' },
  'edmonton': { lat: 53.5461, lng: -113.4938, region: 'AB', country: 'CA' },
  'victoria': { lat: 48.4284, lng: -123.3656, region: 'BC', country: 'CA' },
  'new-york': { lat: 40.7128, lng: -74.0060, region: 'NY', country: 'US' },
  'chicago': { lat: 41.8781, lng: -87.6298, region: 'IL', country: 'US' },
  'dallas': { lat: 32.7767, lng: -96.7970, region: 'TX', country: 'US' },
  'los-angeles': { lat: 34.0522, lng: -118.2437, region: 'CA', country: 'US' },
  'san-francisco': { lat: 37.7749, lng: -122.4194, region: 'CA', country: 'US' },
  'washington-dc': { lat: 38.9072, lng: -77.0369, region: 'DC', country: 'US' },
  'denver': { lat: 39.7392, lng: -104.9903, region: 'CO', country: 'US' },
  'columbus': { lat: 39.9612, lng: -82.9988, region: 'OH', country: 'US' },
  'seattle': { lat: 47.6062, lng: -122.3321, region: 'WA', country: 'US' },
  'amsterdam': { lat: 52.3676, lng: 4.9041, country: 'NL' },
  'berlin': { lat: 52.5200, lng: 13.4050, country: 'DE' },
  'london': { lat: 51.5074, lng: -0.1278, country: 'GB' },
  'paris': { lat: 48.8566, lng: 2.3522, country: 'FR' },
  'zurich': { lat: 47.3769, lng: 8.5417, country: 'CH' },
};

/**
 * Generate City LocalBusiness schema
 */
export function generateCityLocalBusinessSchema(city: {
  slug: string;
  name: string;
  description: string;
  locale?: string;
}): CityLocalBusinessSchema {
  const geoData = cityGeoData[city.slug];
  const url = city.locale && city.locale !== 'en'
    ? `${BASE_URL}/${city.locale}/cities/${city.slug}`
    : `${BASE_URL}/cities/${city.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}#localbusiness`,
    name: `Microhabitat - ${city.name}`,
    description: city.description,
    url: url,
    image: `${BASE_URL}/og-image.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: geoData?.region,
      addressCountry: geoData?.country || 'CA',
    },
    geo: geoData ? {
      '@type': 'GeoCoordinates',
      latitude: geoData.lat,
      longitude: geoData.lng,
    } : undefined,
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
    parentOrganization: { '@id': `${BASE_URL}/#organization` },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  };
}

/**
 * City LocalBusiness JSON-LD component
 */
export function CityLocalBusinessJsonLd({ city }: {
  city: {
    slug: string;
    name: string;
    description: string;
    locale?: string;
  };
}) {
  return <JsonLd data={generateCityLocalBusinessSchema(city)} />;
}

/**
 * Combined page structured data (WebPage + Breadcrumbs)
 */
export function PageStructuredData({
  page,
  breadcrumbs,
}: {
  page: {
    url: string;
    name: string;
    description?: string;
    dateModified?: string;
    locale?: string;
  };
  breadcrumbs: Array<{ name: string; url?: string }>;
}) {
  return (
    <>
      <WebPageJsonLd page={page} />
      <BreadcrumbJsonLd items={breadcrumbs} />
    </>
  );
}
