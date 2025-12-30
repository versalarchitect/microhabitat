import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';

// All supported locales
const locales = ['en', 'fr', 'de', 'nl', 'it', 'es'] as const;

// Localized slugs for each page
const localizedSlugs: Record<string, Record<string, string>> = {
  about: { en: 'about', fr: 'a-propos', de: 'ueber-uns', nl: 'over-ons', it: 'chi-siamo', es: 'sobre-nosotros' },
  cities: { en: 'cities', fr: 'villes', de: 'staedte', nl: 'steden', it: 'citta', es: 'ciudades' },
  careers: { en: 'careers', fr: 'carrieres', de: 'karriere', nl: 'carriere', it: 'carriera', es: 'carreras' },
  partnerships: { en: 'partnerships', fr: 'partenariats', de: 'partnerschaften', nl: 'partnerschappen', it: 'partnership', es: 'asociaciones' },
  'community-engagement': { en: 'community-engagement', fr: 'engagement-communautaire', de: 'gemeinschaftliches-engagement', nl: 'gemeenschapsbetrokkenheid', it: 'impegno-comunitario', es: 'compromiso-comunitario' },
  'outdoor-farm': { en: 'outdoor-farm', fr: 'ferme-exterieure', de: 'aussenfarm', nl: 'buitenboerderij', it: 'fattoria-esterna', es: 'granja-exterior' },
  'indoor-farm': { en: 'indoor-farm', fr: 'ferme-interieure', de: 'innenfarm', nl: 'binnenboerderij', it: 'fattoria-interna', es: 'granja-interior' },
  'educational-activities': { en: 'educational-activities', fr: 'activites-educatives', de: 'bildungsaktivitaeten', nl: 'educatieve-activiteiten', it: 'attivita-educative', es: 'actividades-educativas' },
  'commercial-real-estate': { en: 'commercial-real-estate', fr: 'immobilier-commercial', de: 'gewerbeimmobilien', nl: 'commercieel-vastgoed', it: 'immobiliare-commerciale', es: 'bienes-raices-comerciales' },
  corporations: { en: 'corporations', fr: 'entreprises', de: 'unternehmen', nl: 'bedrijven', it: 'aziende', es: 'corporaciones' },
  schools: { en: 'schools', fr: 'ecoles', de: 'schulen', nl: 'scholen', it: 'scuole', es: 'escuelas' },
  contact: { en: 'contact', fr: 'contact', de: 'kontakt', nl: 'contact', it: 'contatto', es: 'contacto' },
  faq: { en: 'faq', fr: 'faq', de: 'faq', nl: 'faq', it: 'faq', es: 'faq' },
  blog: { en: 'blog', fr: 'blog', de: 'blog', nl: 'blog', it: 'blog', es: 'blog' },
  'roi-calculator': { en: 'roi-calculator', fr: 'calculateur-roi', de: 'roi-rechner', nl: 'roi-calculator', it: 'calcolatore-roi', es: 'calculadora-roi' },
};

// Pages configuration with priority and change frequency
const pages: Array<{
  key: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}> = [
  { key: 'home', priority: 1.0, changeFrequency: 'weekly' },
  { key: 'about', priority: 0.9, changeFrequency: 'monthly' },
  { key: 'outdoor-farm', priority: 0.9, changeFrequency: 'monthly' },
  { key: 'indoor-farm', priority: 0.9, changeFrequency: 'monthly' },
  { key: 'educational-activities', priority: 0.8, changeFrequency: 'monthly' },
  { key: 'commercial-real-estate', priority: 0.9, changeFrequency: 'monthly' },
  { key: 'corporations', priority: 0.9, changeFrequency: 'monthly' },
  { key: 'schools', priority: 0.8, changeFrequency: 'monthly' },
  { key: 'careers', priority: 0.7, changeFrequency: 'weekly' },
  { key: 'partnerships', priority: 0.7, changeFrequency: 'monthly' },
  { key: 'community-engagement', priority: 0.7, changeFrequency: 'monthly' },
  { key: 'cities', priority: 0.8, changeFrequency: 'weekly' },
  { key: 'contact', priority: 0.6, changeFrequency: 'monthly' },
  { key: 'faq', priority: 0.6, changeFrequency: 'monthly' },
  { key: 'blog', priority: 0.7, changeFrequency: 'daily' },
  { key: 'roi-calculator', priority: 0.8, changeFrequency: 'monthly' },
];

// City slugs
const cities = [
  'montreal', 'toronto', 'vancouver', 'calgary', 'ottawa', 'edmonton',
  'new-york', 'chicago', 'boston', 'san-francisco', 'los-angeles',
  'london', 'paris', 'berlin', 'amsterdam', 'brussels', 'zurich',
  'madrid', 'barcelona', 'rome',
];

function getUrl(pageKey: string, locale: string): string {
  if (pageKey === 'home') {
    return locale === 'en' ? BASE_URL : `${BASE_URL}/${locale}`;
  }
  const slug = localizedSlugs[pageKey]?.[locale] || pageKey;
  return locale === 'en' ? `${BASE_URL}/${slug}` : `${BASE_URL}/${locale}/${slug}`;
}

function getAlternates(pageKey: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[locale] = getUrl(pageKey, locale);
  }
  return alternates;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  // Add all pages for all locales
  for (const page of pages) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: getUrl(page.key, locale),
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: getAlternates(page.key),
        },
      });
    }
  }

  // Add city detail pages
  for (const city of cities) {
    for (const locale of locales) {
      const citiesSlug = localizedSlugs.cities[locale];
      const url = locale === 'en'
        ? `${BASE_URL}/cities/${city}`
        : `${BASE_URL}/${locale}/${citiesSlug}/${city}`;

      const cityAlternates: Record<string, string> = {};
      for (const altLocale of locales) {
        const altCitiesSlug = localizedSlugs.cities[altLocale];
        cityAlternates[altLocale] = altLocale === 'en'
          ? `${BASE_URL}/cities/${city}`
          : `${BASE_URL}/${altLocale}/${altCitiesSlug}/${city}`;
      }

      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: cityAlternates,
        },
      });
    }
  }

  return sitemapEntries;
}
