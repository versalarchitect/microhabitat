import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getPageSEO } from '@/lib/cms';
import { CookiePolicyClient } from './CookiePolicyClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('cookie-policy', locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const canonicalUrl = locale === 'en' ? `${siteUrl}/cookie-policy` : `${siteUrl}/${locale}/cookie-policy`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: seo.canonical || canonicalUrl,
      languages: {
        'en': `${siteUrl}/cookie-policy`,
        'fr': `${siteUrl}/fr/politique-cookies`,
        'de': `${siteUrl}/de/cookie-richtlinie`,
        'nl': `${siteUrl}/nl/cookiebeleid`,
        'it': `${siteUrl}/it/politica-cookie`,
        'es': `${siteUrl}/es/politica-cookies`,
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
      index: false,
      follow: false,
    },
  };
}

export default async function CookiePolicyPage({ params }: PageProps) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);

  return <CookiePolicyClient locale={locale as Locale} translations={translations} />;
}
