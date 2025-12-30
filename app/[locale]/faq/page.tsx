import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getPageSEO } from '@/lib/strapi';
import { FAQJsonLd, PageStructuredData } from '@/components/JsonLd';
import { FAQClient } from './FAQClient';

// FAQ data for structured data (same as FAQClient)
const faqData = [
  { question: "Why would someone integrate urban farming?", answer: "Integrating urban farming brings a range of social and environmental advantages, making it an appealing choice for communities looking to live healthier, more sustainable, and connected lives in urban areas." },
  { question: "What is the first step to define if my building can welcome a program?", answer: "The first step is to conduct a free site evaluation done by our team during a virtual meeting, evaluating available space, sunlight exposure, water access, and structural integrity." },
  { question: "How do I know if my building is suitable for an urban farming project?", answer: "Requirements include at least 200 sq ft of space, adequate sunlight (minimum 6 hours daily), accessible water sources, and safe roof access if applicable." },
  { question: "Can I get points for my building from green building certifications?", answer: "Yes! Our programs support LEED, BOMA, BOMA BEST, GRESB, Fitwel, and WELL certifications." },
  { question: "Do you offer indoor production solutions?", answer: "Yes, MicroHabitat offers an indoor unit which produces year-long growth through our turn-key solution." },
  { question: "Why was MicroHabitat created?", answer: "MicroHabitat was founded to address urban food insecurity by transforming underutilized city spaces into productive ecological gardens." },
  { question: "What is the history of MicroHabitat?", answer: "Established in Montreal in 2016, MicroHabitat has grown to become the largest network of urban farms in North America." },
  { question: "Where is MicroHabitat implemented?", answer: "Our projects operate across North America and Europe on rooftops, terraces, and ground spaces in over 20 major cities." },
  { question: "How does the program work?", answer: "Our turn-key programs include installation, ecological irrigation systems, planting, weekly maintenance visits, harvesting and delivery, educational activities, and marketing tools." },
  { question: "What is included in the program?", answer: "Our comprehensive package includes installation, ecological irrigation system, seasonal planting, weekly maintenance visits, harvesting and drop-off, educational activities, and marketing tools." },
  { question: "How do I get started with MicroHabitat?", answer: "Simply book a demo through our website or contact us directly. We'll schedule a free consultation to discuss your goals and assess your property's potential." },
];

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
      <FAQClient locale={locale as Locale} translations={translations} />
    </>
  );
}
