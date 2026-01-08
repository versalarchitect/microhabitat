import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getPageSEO } from '@/lib/cms';
import { PageStructuredData, ServiceJsonLd } from '@/components/JsonLd';
import { SchoolsClient } from './SchoolsClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('schools', locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const canonicalUrl = locale === 'en' ? `${siteUrl}/schools` : `${siteUrl}/${locale}/schools`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: seo.canonical || canonicalUrl,
      languages: {
        'en': `${siteUrl}/schools`,
        'fr': `${siteUrl}/fr/ecoles`,
        'de': `${siteUrl}/de/schulen`,
        'nl': `${siteUrl}/nl/scholen`,
        'it': `${siteUrl}/it/scuole`,
        'es': `${siteUrl}/es/escuelas`,
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

export default async function SchoolsPage({ params }: PageProps) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const pageUrl = locale === 'en' ? '/schools' : `/${locale}/schools`;

  return (
    <>
      <PageStructuredData
        page={{
          url: pageUrl,
          name: 'Schools Urban Farming | Microhabitat',
          description: 'Educational urban farming programs designed for schools and educational institutions.',
          locale: locale,
        }}
        breadcrumbs={[
          { name: 'Home', url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
          { name: 'Clients', url: locale === 'en' ? `${siteUrl}/#services` : `${siteUrl}/${locale}/#services` },
          { name: 'Schools' },
        ]}
      />
      <ServiceJsonLd
        service={{
          name: 'School Farming Programs',
          description: 'Hands-on educational farming programs that integrate with school curricula and promote environmental awareness.',
          url: pageUrl,
          serviceType: 'Educational Services',
          features: [
            'Curriculum integration',
            'Hands-on learning experiences',
            'STEM education support',
            'Environmental science programs',
            'Student-led gardening',
            'Farm-to-cafeteria programs',
          ],
        }}
      />
      <SchoolsClient locale={locale as Locale} translations={translations} />
    </>
  );
}
