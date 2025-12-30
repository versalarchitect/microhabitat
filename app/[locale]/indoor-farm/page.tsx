import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getPageSEO } from '@/lib/strapi';
import { PageStructuredData, ServiceJsonLd } from '@/components/JsonLd';
import { IndoorFarmClient } from './IndoorFarmClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('indoor-farm', locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const canonicalUrl = locale === 'en' ? `${siteUrl}/indoor-farm` : `${siteUrl}/${locale}/indoor-farm`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: seo.canonical || canonicalUrl,
      languages: {
        'en': `${siteUrl}/indoor-farm`,
        'fr': `${siteUrl}/fr/ferme-interieure`,
        'de': `${siteUrl}/de/innenfarm`,
        'nl': `${siteUrl}/nl/binnenboerderij`,
        'it': `${siteUrl}/it/fattoria-interna`,
        'es': `${siteUrl}/es/granja-interior`,
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

export default async function IndoorFarmPage({ params }: PageProps) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const pageUrl = locale === 'en' ? '/indoor-farm' : `/${locale}/indoor-farm`;

  return (
    <>
      <PageStructuredData
        page={{
          url: pageUrl,
          name: 'Indoor Farm | Microhabitat',
          description: 'Year-round indoor vertical farming solutions for sustainable food production.',
          locale: locale,
        }}
        breadcrumbs={[
          { name: 'Home', url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
          { name: 'Services', url: locale === 'en' ? `${siteUrl}/#services` : `${siteUrl}/${locale}/#services` },
          { name: 'Indoor Farm' },
        ]}
      />
      <ServiceJsonLd
        service={{
          name: 'Indoor Vertical Farming',
          description: 'Year-round indoor farming solutions with controlled environment agriculture for consistent produce quality.',
          url: pageUrl,
          serviceType: 'Vertical Farming',
          features: [
            'Controlled environment agriculture',
            'Year-round production',
            'LED grow lighting systems',
            'Hydroponic growing systems',
            'Climate control',
            'Automated monitoring',
          ],
        }}
      />
      <IndoorFarmClient locale={locale as Locale} translations={translations} />
    </>
  );
}
