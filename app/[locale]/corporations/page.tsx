import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getPageSEO } from '@/lib/strapi';
import { PageStructuredData, ServiceJsonLd } from '@/components/JsonLd';
import { CorporationsClient } from './CorporationsClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('corporations', locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const canonicalUrl = locale === 'en' ? `${siteUrl}/corporations` : `${siteUrl}/${locale}/corporations`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: seo.canonical || canonicalUrl,
      languages: {
        'en': `${siteUrl}/corporations`,
        'fr': `${siteUrl}/fr/entreprises`,
        'de': `${siteUrl}/de/unternehmen`,
        'nl': `${siteUrl}/nl/bedrijven`,
        'it': `${siteUrl}/it/aziende`,
        'es': `${siteUrl}/es/corporaciones`,
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

export default async function CorporationsPage({ params }: PageProps) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const pageUrl = locale === 'en' ? '/corporations' : `/${locale}/corporations`;

  return (
    <>
      <PageStructuredData
        page={{
          url: pageUrl,
          name: 'Corporate Urban Farming | Microhabitat',
          description: 'ESG and sustainability solutions for corporations through urban farming programs.',
          locale: locale,
        }}
        breadcrumbs={[
          { name: 'Home', url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
          { name: 'Clients', url: locale === 'en' ? `${siteUrl}/#services` : `${siteUrl}/${locale}/#services` },
          { name: 'Corporations' },
        ]}
      />
      <ServiceJsonLd
        service={{
          name: 'Corporate Sustainability Programs',
          description: 'Transform your corporate spaces with urban farming solutions that boost ESG scores and employee engagement.',
          url: pageUrl,
          serviceType: 'Corporate Sustainability',
          features: [
            'ESG score improvement',
            'Green building certification support',
            'Employee wellness programs',
            'Corporate team building activities',
            'Sustainability reporting',
            'Carbon footprint reduction',
          ],
        }}
      />
      <CorporationsClient locale={locale as Locale} translations={translations} />
    </>
  );
}
