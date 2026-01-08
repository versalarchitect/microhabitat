import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getPageSEO } from '@/lib/cms';
import { PageStructuredData, ServiceJsonLd } from '@/components/JsonLd';
import { EducationalActivitiesClient } from './EducationalActivitiesClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('educational-activities', locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const canonicalUrl = locale === 'en' ? `${siteUrl}/educational-activities` : `${siteUrl}/${locale}/educational-activities`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: seo.canonical || canonicalUrl,
      languages: {
        'en': `${siteUrl}/educational-activities`,
        'fr': `${siteUrl}/fr/activites-educatives`,
        'de': `${siteUrl}/de/bildungsaktivitaten`,
        'nl': `${siteUrl}/nl/educatieve-activiteiten`,
        'it': `${siteUrl}/it/attivita-educative`,
        'es': `${siteUrl}/es/actividades-educativas`,
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

export default async function EducationalActivitiesPage({ params }: PageProps) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const pageUrl = locale === 'en' ? '/educational-activities' : `/${locale}/educational-activities`;

  return (
    <>
      <PageStructuredData
        page={{
          url: pageUrl,
          name: 'Educational Activities | Microhabitat',
          description: 'Hands-on urban farming workshops and educational programs for all ages.',
          locale: locale,
        }}
        breadcrumbs={[
          { name: 'Home', url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
          { name: 'Services', url: locale === 'en' ? `${siteUrl}/#services` : `${siteUrl}/${locale}/#services` },
          { name: 'Educational Activities' },
        ]}
      />
      <ServiceJsonLd
        service={{
          name: 'Educational Farming Programs',
          description: 'Engaging workshops and educational activities about sustainable urban agriculture for schools, corporations, and communities.',
          url: pageUrl,
          serviceType: 'Educational Services',
          features: [
            'Hands-on farming workshops',
            'School field trips',
            'Corporate team building',
            'Seasonal planting activities',
            'Harvest celebrations',
            'Sustainability education',
          ],
        }}
      />
      <EducationalActivitiesClient locale={locale as Locale} translations={translations} />
    </>
  );
}
