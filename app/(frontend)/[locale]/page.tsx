import type { Metadata } from 'next';
import { type Locale, locales, ogLocales } from '@/lib/i18n';
import {
  getPageSEO,
  getHeroContent,
  getStats,
  getServices,
  getTestimonials,
  getPartners,
  getCities,
  getFAQ,
  getImpactSection,
  getServicesSection,
  getPartnersSection,
  getTestimonialsSection,
  getCitiesSection,
  getFAQSection,
  getCTASection,
  getShowcaseSection,
} from '@/lib/cms';
import { HomeClient } from './HomeClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Generate metadata server-side for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('home', locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';

  const canonicalUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: seo.canonical || canonicalUrl,
      languages: {
        'en': siteUrl,
        'fr': `${siteUrl}/fr`,
        'de': `${siteUrl}/de`,
        'nl': `${siteUrl}/nl`,
        'it': `${siteUrl}/it`,
        'es': `${siteUrl}/es`,
        'x-default': siteUrl,
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

// Server Component - fetches all data server-side
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  // Fetch all data in parallel on the server
  const [
    hero,
    stats,
    services,
    testimonials,
    partners,
    cities,
    faq,
    impactSection,
    servicesSection,
    partnersSection,
    testimonialsSection,
    citiesSection,
    faqSection,
    ctaSection,
    showcaseSection,
  ] = await Promise.all([
    getHeroContent(typedLocale),
    getStats(typedLocale),
    getServices(typedLocale),
    getTestimonials(typedLocale),
    getPartners(typedLocale),
    getCities(typedLocale),
    getFAQ(typedLocale),
    getImpactSection(typedLocale),
    getServicesSection(typedLocale),
    getPartnersSection(typedLocale),
    getTestimonialsSection(typedLocale),
    getCitiesSection(typedLocale),
    getFAQSection(typedLocale),
    getCTASection(typedLocale),
    getShowcaseSection(typedLocale),
  ]);

  return (
    <HomeClient
      locale={typedLocale}
      hero={hero}
      stats={stats}
      services={services}
      testimonials={testimonials}
      partners={partners}
      cities={cities}
      faq={faq}
      impactSection={impactSection}
      servicesSection={servicesSection}
      partnersSection={partnersSection}
      testimonialsSection={testimonialsSection}
      citiesSection={citiesSection}
      faqSection={faqSection}
      ctaSection={ctaSection}
      showcaseSection={showcaseSection}
    />
  );
}
