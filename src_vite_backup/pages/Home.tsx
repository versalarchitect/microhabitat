import { useQuery } from "@tanstack/react-query";
import { Hero } from "../components/sections/Hero";
import { Services } from "../components/sections/Services";
import { Impact } from "../components/sections/Impact";
import { Partners } from "../components/sections/Partners";
import { Testimonials } from "../components/sections/Testimonials";
import { Cities } from "../components/sections/Cities";
import { FAQ } from "../components/sections/FAQ";
import { CTA } from "../components/sections/CTA";
import { SEO } from "../components/SEO";
import { getPageSEO, queryKeys } from "../lib/strapi";
import type { SiteContent } from "../lib/strapi";
import { useLocale } from "../lib/locale-context";

interface HomeProps {
  content: SiteContent;
  onBookDemo: () => void;
}

export function Home({ content, onBookDemo }: HomeProps) {
  const { locale } = useLocale();

  const { data: seo } = useQuery({
    queryKey: queryKeys.pageSEO('home', locale),
    queryFn: () => getPageSEO('home', locale),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <SEO
        title={seo?.metaTitle || 'Discover Urban Farming Today'}
        description={seo?.metaDescription || "The world's largest urban farming network."}
        canonical={seo?.canonical}
        ogImage={seo?.ogImage}
        twitterImage={seo?.twitterImage}
        keywords={seo?.keywords?.split(',').map(k => k.trim())}
        noIndex={seo?.noIndex}
        noFollow={seo?.noFollow}
      />

      {/* Hero Section */}
      <Hero
        content={content.hero}
        stats={content.stats}
        onBookDemo={onBookDemo}
      />

      {/* Services Section */}
      <Services
        services={content.services}
        sectionContent={content.servicesSection}
        onBookDemo={onBookDemo}
      />

      {/* Impact Section */}
      <Impact
        stats={content.stats}
        sectionContent={content.impactSection}
      />

      {/* Partners Section */}
      <Partners
        partners={content.partners}
        sectionContent={content.partnersSection}
      />

      {/* Testimonials Section */}
      <Testimonials
        testimonials={content.testimonials}
        sectionContent={content.testimonialsSection}
      />

      {/* Cities Section */}
      <Cities
        cities={content.cities}
        sectionContent={content.citiesSection}
      />

      {/* FAQ Section */}
      <FAQ
        faq={content.faq}
        sectionContent={content.faqSection}
        onBookDemo={onBookDemo}
      />

      {/* CTA Section */}
      <CTA
        sectionContent={content.ctaSection}
        onBookDemo={onBookDemo}
      />
    </>
  );
}
