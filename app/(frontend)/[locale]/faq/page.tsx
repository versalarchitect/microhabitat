import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getPageSEO, getFAQ } from '@/lib/cms';
import { FAQJsonLd, PageStructuredData } from '@/components/JsonLd';
import { FAQClient } from './FAQClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('faq', locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const canonicalUrl = locale === 'en' ? `${siteUrl}/faq` : `${siteUrl}/${locale}/faq`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: seo.canonical || canonicalUrl,
      languages: {
        'en': `${siteUrl}/faq`,
        'fr': `${siteUrl}/fr/faq`,
        'de': `${siteUrl}/de/faq`,
        'nl': `${siteUrl}/nl/faq`,
        'it': `${siteUrl}/it/faq`,
        'es': `${siteUrl}/es/faq`,
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

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const pageUrl = locale === 'en' ? '/faq' : `/${locale}/faq`;

  // Fetch FAQ data from CMS
  const faqItems = await getFAQ(locale as Locale);

  // Transform FAQ items for structured data
  const faqData = faqItems.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  return (
    <>
      <PageStructuredData
        page={{
          url: pageUrl,
          name: 'Frequently Asked Questions | Microhabitat',
          description: 'Find answers to common questions about urban farming, our services, and getting started.',
          locale: locale,
        }}
        breadcrumbs={[
          { name: 'Home', url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
          { name: 'FAQ' },
        ]}
      />
      <FAQJsonLd faqs={faqData} />
      <FAQClient locale={locale as Locale} translations={translations} faqItems={faqItems} />
    </>
  );
}
