import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getPageSEO } from '@/lib/strapi';
import { PageStructuredData, ServiceJsonLd } from '@/components/JsonLd';
import { ROICalculatorClient } from './ROICalculatorClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('roi-calculator', locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const canonicalUrl = locale === 'en' ? `${siteUrl}/roi-calculator` : `${siteUrl}/${locale}/roi-calculator`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: seo.canonical || canonicalUrl,
      languages: {
        'en': `${siteUrl}/roi-calculator`,
        'fr': `${siteUrl}/fr/calculateur-roi`,
        'de': `${siteUrl}/de/roi-rechner`,
        'nl': `${siteUrl}/nl/roi-calculator`,
        'it': `${siteUrl}/it/calcolatore-roi`,
        'es': `${siteUrl}/es/calculadora-roi`,
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

export default async function ROICalculatorPage({ params }: PageProps) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const pageUrl = locale === 'en' ? '/roi-calculator' : `/${locale}/roi-calculator`;

  return (
    <>
      <PageStructuredData
        page={{
          url: pageUrl,
          name: 'ROI Calculator | Microhabitat',
          description: 'Calculate the return on investment for urban farming on your commercial properties.',
          locale: locale,
        }}
        breadcrumbs={[
          { name: 'Home', url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
          { name: 'Tools', url: locale === 'en' ? `${siteUrl}/#services` : `${siteUrl}/${locale}/#services` },
          { name: 'ROI Calculator' },
        ]}
      />
      <ServiceJsonLd
        service={{
          name: 'Urban Farming ROI Calculator',
          description: 'Interactive tool for real estate portfolio managers to calculate potential returns from urban farming installations.',
          url: pageUrl,
          serviceType: 'Financial Calculator',
          features: [
            'Detailed ROI projections',
            '5-year financial forecast',
            'ESG impact metrics',
            'Property value analysis',
            'Tenant retention benefits',
            'Energy savings calculations',
          ],
        }}
      />
      <ROICalculatorClient locale={locale as Locale} translations={translations} />
    </>
  );
}
