"use client";

import { useState } from 'react';
import type {
  HeroContent,
  Stat,
  Service,
  Testimonial,
  Partner,
  City,
  FAQItem,
  ImpactSectionContent,
  ServicesSectionContent,
  PartnersSectionContent,
  TestimonialsSectionContent,
  CitiesSectionContent,
  FAQSectionContent,
  CTASectionContent,
  ShowcaseSectionContent,
} from '@/lib/cms';
import type { Locale } from '@/lib/i18n';
import { Hero } from '@/components/sections/Hero';
import { Showcase } from '@/components/sections/Showcase';
import { Impact } from '@/components/sections/Impact';
import { Services } from '@/components/sections/Services';
import { Partners } from '@/components/sections/Partners';
import { Testimonials } from '@/components/sections/Testimonials';
import { Cities } from '@/components/sections/Cities';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';
import { BookDemoModal } from '@/components/BookDemoModal';

interface HomeClientProps {
  locale: Locale;
  hero: HeroContent;
  stats: Stat[];
  services: Service[];
  testimonials: Testimonial[];
  partners: Partner[];
  cities: City[];
  faq: FAQItem[];
  impactSection: ImpactSectionContent;
  servicesSection: ServicesSectionContent;
  partnersSection: PartnersSectionContent;
  testimonialsSection: TestimonialsSectionContent;
  citiesSection: CitiesSectionContent;
  faqSection: FAQSectionContent;
  ctaSection: CTASectionContent;
  showcaseSection: ShowcaseSectionContent;
}

export function HomeClient({
  locale,
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
}: HomeClientProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <Hero
        content={hero}
        onBookDemo={() => setShowDemoModal(true)}
      />

      {/* Showcase Section - Bento Grid */}
      <div className="divider" />
      <Showcase sectionContent={showcaseSection} />

      {/* Impact Section */}
      <div className="divider" />
      <Impact
        sectionContent={impactSection}
        stats={stats}
      />

      {/* Services Section */}
      <div className="divider" />
      <Services
        services={services}
        sectionContent={servicesSection}
        onBookDemo={() => setShowDemoModal(true)}
      />

      {/* Partners Section */}
      <div className="divider" />
      <Partners
        partners={partners}
        sectionContent={partnersSection}
      />

      {/* Testimonials Section */}
      <div className="divider" />
      <Testimonials
        testimonials={testimonials}
        sectionContent={testimonialsSection}
      />

      {/* Cities Section */}
      <div className="divider" />
      <Cities
        cities={cities}
        sectionContent={citiesSection}
        locale={locale}
      />

      {/* FAQ Section */}
      <div className="divider" />
      <FAQ
        faq={faq}
        sectionContent={faqSection}
        onBookDemo={() => setShowDemoModal(true)}
      />

      {/* CTA Section */}
      <div className="divider" />
      <CTA
        sectionContent={ctaSection}
        onBookDemo={() => setShowDemoModal(true)}
      />

      {/* Book Demo Modal */}
      <BookDemoModal
        open={showDemoModal}
        onOpenChange={setShowDemoModal}
        locale={locale}
      />
    </>
  );
}
