import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getCitySEO } from '@/lib/strapi';
import { PageStructuredData, CityLocalBusinessJsonLd } from '@/components/JsonLd';
import { CityDetailClient } from './CityDetailClient';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const citySlugs = [
  'montreal',
  'toronto',
  'vancouver',
  'calgary',
  'edmonton',
  'victoria',
  'new-york',
  'chicago',
  'dallas',
  'los-angeles',
  'san-francisco',
  'washington-dc',
  'denver',
  'columbus',
  'seattle',
  'amsterdam',
  'berlin',
  'london',
  'paris',
  'zurich',
];

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const slug of citySlugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const citySeo = await getCitySEO(slug, locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const canonicalUrl = locale === 'en' ? `${siteUrl}/cities/${slug}` : `${siteUrl}/${locale}/cities/${slug}`;

  // Fallback city name from slug
  const cityName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const title = citySeo?.metaTitle || `Urban Farming in ${cityName} | Microhabitat`;
  const description = citySeo?.metaDescription || `Discover MicroHabitat's urban farming solutions in ${cityName}. Rooftop farms, community gardens, and sustainable agriculture programs.`;

  return {
    title,
    description,
    keywords: citySeo?.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: citySeo?.canonical || canonicalUrl,
      languages: {
        'en': `${siteUrl}/cities/${slug}`,
        'fr': `${siteUrl}/fr/villes/${slug}`,
        'de': `${siteUrl}/de/staedte/${slug}`,
        'nl': `${siteUrl}/nl/steden/${slug}`,
        'it': `${siteUrl}/it/citta/${slug}`,
        'es': `${siteUrl}/es/ciudades/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Microhabitat',
      locale: ogLocales[locale as Locale] || 'en_CA',
      type: 'website',
      images: citySeo?.ogImage ? [{ url: citySeo.ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: citySeo?.twitterImage ? [citySeo.twitterImage] : undefined,
    },
    robots: {
      index: !citySeo?.noIndex,
      follow: !citySeo?.noFollow,
    },
  };
}

export default async function CityDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const translations = getTranslations(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const pageUrl = locale === 'en' ? `/cities/${slug}` : `/${locale}/cities/${slug}`;

  // Format city name from slug
  const cityName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <>
      <PageStructuredData
        page={{
          url: pageUrl,
          name: `Urban Farming in ${cityName} | Microhabitat`,
          description: `Discover Microhabitat's urban farming solutions in ${cityName}. Rooftop farms, community gardens, and sustainable agriculture programs.`,
          locale: locale,
        }}
        breadcrumbs={[
          { name: 'Home', url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
          { name: 'Cities', url: locale === 'en' ? `${siteUrl}/cities` : `${siteUrl}/${locale}/cities` },
          { name: cityName },
        ]}
      />
      <CityLocalBusinessJsonLd
        city={{
          slug,
          name: cityName,
          description: `Microhabitat urban farming services in ${cityName}. We transform rooftops and outdoor spaces into thriving urban farms.`,
          locale,
        }}
      />
      <CityDetailClient locale={locale as Locale} slug={slug} translations={translations} />
    </>
  );
}
