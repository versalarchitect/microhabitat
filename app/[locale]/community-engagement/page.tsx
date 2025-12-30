import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getPageSEO } from '@/lib/strapi';
import { PageStructuredData, ServiceJsonLd } from '@/components/JsonLd';
import { CommunityEngagementClient } from './CommunityEngagementClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('community-engagement', locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const canonicalUrl = locale === 'en' ? `${siteUrl}/community-engagement` : `${siteUrl}/${locale}/community-engagement`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: seo.canonical || canonicalUrl,
      languages: {
        'en': `${siteUrl}/community-engagement`,
        'fr': `${siteUrl}/fr/engagement-communautaire`,
        'de': `${siteUrl}/de/gemeinschaftsengagement`,
        'nl': `${siteUrl}/nl/gemeenschapsbetrokkenheid`,
        'it': `${siteUrl}/it/coinvolgimento-comunitario`,
        'es': `${siteUrl}/es/participacion-comunitaria`,
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

export default async function CommunityEngagementPage({ params }: PageProps) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const pageUrl = locale === 'en' ? '/community-engagement' : `/${locale}/community-engagement`;

  return (
    <>
      <PageStructuredData
        page={{
          url: pageUrl,
          name: 'Community Engagement | Microhabitat',
          description: 'Community programs and food bank partnerships for sustainable urban food access.',
          locale: locale,
        }}
        breadcrumbs={[
          { name: 'Home', url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
          { name: 'Services', url: locale === 'en' ? `${siteUrl}/#services` : `${siteUrl}/${locale}/#services` },
          { name: 'Community Engagement' },
        ]}
      />
      <ServiceJsonLd
        service={{
          name: 'Community Engagement Programs',
          description: 'Partner with food banks and community organizations to increase fresh food access in underserved areas.',
          url: pageUrl,
          serviceType: 'Community Programs',
          features: [
            'Food bank partnerships',
            'Community garden programs',
            'Volunteer opportunities',
            'Fresh food distribution',
            'Nutrition education',
            'Neighborhood greening initiatives',
          ],
        }}
      />
      <CommunityEngagementClient locale={locale as Locale} translations={translations} />
    </>
  );
}
