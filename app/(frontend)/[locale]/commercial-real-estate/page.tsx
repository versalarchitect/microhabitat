import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getPageSEO } from '@/lib/cms';
import { PageStructuredData, ServiceJsonLd } from '@/components/JsonLd';
import { CommercialRealEstateClient } from './CommercialRealEstateClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('commercial-real-estate', locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const canonicalUrl = locale === 'en' ? `${siteUrl}/commercial-real-estate` : `${siteUrl}/${locale}/commercial-real-estate`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: seo.canonical || canonicalUrl,
      languages: {
        'en': `${siteUrl}/commercial-real-estate`,
        'fr': `${siteUrl}/fr/immobilier-commercial`,
        'de': `${siteUrl}/de/gewerbeimmobilien`,
        'nl': `${siteUrl}/nl/commercieel-vastgoed`,
        'it': `${siteUrl}/it/immobiliare-commerciale`,
        'es': `${siteUrl}/es/bienes-raices-comerciales`,
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

export default async function CommercialRealEstatePage({ params }: PageProps) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const pageUrl = locale === 'en' ? '/commercial-real-estate' : `/${locale}/commercial-real-estate`;

  return (
    <>
      <PageStructuredData
        page={{
          url: pageUrl,
          name: 'Commercial Real Estate | Microhabitat',
          description: 'Urban farming solutions for commercial real estate properties and property managers.',
          locale: locale,
        }}
        breadcrumbs={[
          { name: 'Home', url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
          { name: 'Clients', url: locale === 'en' ? `${siteUrl}/#services` : `${siteUrl}/${locale}/#services` },
          { name: 'Commercial Real Estate' },
        ]}
      />
      <ServiceJsonLd
        service={{
          name: 'Commercial Real Estate Urban Farming',
          description: 'Increase property value and tenant satisfaction with professional rooftop and outdoor farming installations.',
          url: pageUrl,
          serviceType: 'Property Enhancement',
          features: [
            'LEED certification support',
            'BOMA BEST compliance',
            'Tenant engagement programs',
            'Property value enhancement',
            'Green roof installation',
            'Rooftop amenity spaces',
          ],
        }}
      />
      <CommercialRealEstateClient locale={locale as Locale} translations={translations} />
    </>
  );
}
