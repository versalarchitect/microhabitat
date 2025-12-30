import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getPageSEO, getOutdoorFarmPageContent } from '@/lib/strapi';
import { PageStructuredData, ServiceJsonLd } from '@/components/JsonLd';
import { OutdoorFarmClient } from './OutdoorFarmClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('outdoor-farm', locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const canonicalUrl = locale === 'en' ? `${siteUrl}/outdoor-farm` : `${siteUrl}/${locale}/outdoor-farm`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: seo.canonical || canonicalUrl,
      languages: {
        'en': `${siteUrl}/outdoor-farm`,
        'fr': `${siteUrl}/fr/ferme-exterieure`,
        'de': `${siteUrl}/de/aussenfarm`,
        'nl': `${siteUrl}/nl/buitenboerderij`,
        'it': `${siteUrl}/it/fattoria-esterna`,
        'es': `${siteUrl}/es/granja-exterior`,
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

export default async function OutdoorFarmPage({ params }: PageProps) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const content = await getOutdoorFarmPageContent(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const pageUrl = locale === 'en' ? '/outdoor-farm' : `/${locale}/outdoor-farm`;

  return (
    <>
      <PageStructuredData
        page={{
          url: pageUrl,
          name: 'Outdoor Farm | Microhabitat',
          description: 'Transform rooftops and outdoor spaces into productive urban farms with our turnkey solutions.',
          locale: locale,
        }}
        breadcrumbs={[
          { name: 'Home', url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
          { name: 'Services', url: locale === 'en' ? `${siteUrl}/#services` : `${siteUrl}/${locale}/#services` },
          { name: 'Outdoor Farm' },
        ]}
      />
      <ServiceJsonLd
        service={{
          name: 'Outdoor Urban Farming',
          description: 'Professional rooftop and outdoor urban farming solutions including installation, maintenance, and harvesting services.',
          url: pageUrl,
          serviceType: 'Urban Agriculture',
          features: [
            'Rooftop farm installation',
            'Ecological irrigation systems',
            'Weekly maintenance visits',
            'Seasonal planting',
            'Harvesting and delivery',
            'Educational workshops',
          ],
        }}
      />
      <OutdoorFarmClient locale={locale as Locale} translations={translations} content={content} />
    </>
  );
}
