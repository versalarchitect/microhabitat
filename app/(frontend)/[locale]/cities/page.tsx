import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getPageSEO, getCities } from '@/lib/cms';
import { PageStructuredData } from '@/components/JsonLd';
import { CitiesClient } from './CitiesClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('cities', locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const canonicalUrl = locale === 'en' ? `${siteUrl}/cities` : `${siteUrl}/${locale}/cities`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: seo.canonical || canonicalUrl,
      languages: {
        'en': `${siteUrl}/cities`,
        'fr': `${siteUrl}/fr/villes`,
        'de': `${siteUrl}/de/staedte`,
        'nl': `${siteUrl}/nl/steden`,
        'it': `${siteUrl}/it/citta`,
        'es': `${siteUrl}/es/ciudades`,
      },
    },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: canonicalUrl,
      siteName: 'Microhabitat',
      locale: ogLocales[locale as Locale] || 'en_CA',
      type: 'website',
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: seo.twitterImage ? [seo.twitterImage] : undefined,
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
  };
}

export default async function CitiesPage({ params }: PageProps) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const pageUrl = locale === 'en' ? '/cities' : `/${locale}/cities`;

  // Fetch cities from CMS
  const cities = await getCities(locale as Locale);

  return (
    <>
      <PageStructuredData
        page={{
          url: pageUrl,
          name: 'Our Cities | Microhabitat',
          description: 'Explore Microhabitat urban farming locations across North America and Europe.',
          locale: locale,
        }}
        breadcrumbs={[
          { name: 'Home', url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
          { name: 'Cities' },
        ]}
      />
      <CitiesClient locale={locale as Locale} translations={translations} cities={cities} />
    </>
  );
}
