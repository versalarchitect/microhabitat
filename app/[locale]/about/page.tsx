import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getPageSEO, getAboutPageContent } from '@/lib/strapi';
import { PageStructuredData } from '@/components/JsonLd';
import { AboutClient } from './AboutClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('about', locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const canonicalUrl = locale === 'en' ? `${siteUrl}/about` : `${siteUrl}/${locale}/about`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: seo.canonical || canonicalUrl,
      languages: {
        'en': `${siteUrl}/about`,
        'fr': `${siteUrl}/fr/a-propos`,
        'de': `${siteUrl}/de/ueber-uns`,
        'nl': `${siteUrl}/nl/over-ons`,
        'it': `${siteUrl}/it/chi-siamo`,
        'es': `${siteUrl}/es/sobre-nosotros`,
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

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const content = await getAboutPageContent(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const pageUrl = locale === 'en' ? '/about' : `/${locale}/about`;

  return (
    <>
      <PageStructuredData
        page={{
          url: pageUrl,
          name: 'About Microhabitat',
          description: "Learn about Microhabitat's mission to transform urban spaces into thriving farms.",
          locale: locale,
        }}
        breadcrumbs={[
          { name: 'Home', url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
          { name: 'About' },
        ]}
      />
      <AboutClient locale={locale as Locale} translations={translations} content={content} />
    </>
  );
}
