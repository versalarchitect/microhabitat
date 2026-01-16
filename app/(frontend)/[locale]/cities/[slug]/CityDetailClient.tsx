"use client";

/**
 * CityDetailClient - Pure presentational component for city detail pages
 *
 * Receives all data via props from server component.
 * No hardcoded content - all content flows from CMS with fallback support.
 */

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Leaf, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { type Locale, getLocalePath } from "@/lib/i18n";

// ============================================
// TYPES
// ============================================

export interface CityData {
  name: string;
  country: string;
  region: "north-america" | "europe";
  regionName: string;
  slug: string;
  description: string;
  highlights: string[];
  image?: string;
}

interface CityDetailClientProps {
  locale: Locale;
  city: CityData | null;
  translations: Record<string, string>;
}

// ============================================
// COMPONENTS
// ============================================

function CityNotFound({
  locale,
  translations,
}: {
  locale: Locale;
  translations: Record<string, string>;
}) {
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  return (
    <section className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <h1 className="heading-display mb-8">{t("cityDetail.notFound.title")}</h1>
        <p className="text-muted-foreground mb-8">
          {t("cityDetail.notFound.description")}
        </p>
        <Link href={localePath("/cities")} className="btn-outline">
          {t("cityDetail.viewAllCities")}
        </Link>
      </div>
    </section>
  );
}

function HeroSection({
  city,
  locale,
  translations,
  onBookDemo,
}: {
  city: CityData;
  locale: Locale;
  translations: Record<string, string>;
  onBookDemo: () => void;
}) {
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  return (
    <section className="pt-32 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-primary" />
          <p className="label">
            {city.regionName}, {city.country}
          </p>
        </div>
        <h1 className="heading-display mb-8">
          {t("cityDetail.hero.title")}{" "}
          <span className="text-primary">{city.name}</span>
        </h1>
        <p className="text-body max-w-3xl mb-10">{city.description}</p>
        <div className="flex flex-wrap gap-4">
          <Button onClick={onBookDemo}>
            {t("common.getStarted")} {city.name}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Link href={localePath("/contact")} className="btn-outline">
            {t("common.contactUs")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function HighlightsSection({
  city,
  translations,
}: {
  city: CityData;
  translations: Record<string, string>;
}) {
  const t = (key: string) => translations[key] || key;

  return (
    <section className="section">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <p className="label mb-4">
          {city.name} {t("cityDetail.highlights.label")}
        </p>
        <h2 className="heading-section mb-12">
          {t("cityDetail.highlights.title")} {city.name}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {city.highlights.map((highlight, index) => (
            <div
              key={index}
              className="card-minimal p-6 flex items-start gap-4"
            >
              <Leaf className="w-6 h-6 text-primary shrink-0 mt-1" />
              <span className="text-lg">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection({
  city,
  locale,
  translations,
}: {
  city: CityData;
  locale: Locale;
  translations: Record<string, string>;
}) {
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  const services = [
    {
      href: "/outdoor-farm",
      titleKey: "cityDetail.services.outdoorFarms.title",
      descKey: "cityDetail.services.outdoorFarms.description",
    },
    {
      href: "/indoor-farm",
      titleKey: "cityDetail.services.indoorFarms.title",
      descKey: "cityDetail.services.indoorFarms.description",
    },
    {
      href: "/educational-activities",
      titleKey: "cityDetail.services.educationalActivities.title",
      descKey: "cityDetail.services.educationalActivities.description",
    },
  ];

  return (
    <section className="section bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <p className="label mb-4">{t("cityDetail.services.label")}</p>
        <h2 className="heading-section mb-12">
          {t("cityDetail.services.title")} {city.name}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.href}
              href={localePath(service.href)}
              className="card-minimal bg-card p-6 group"
            >
              <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                {t(service.titleKey)}
              </h3>
              <p className="text-muted-foreground mb-4">{t(service.descKey)}</p>
              <span className="text-primary inline-flex items-center font-medium">
                {t("common.learnMore")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSection({
  locale,
  translations,
}: {
  locale: Locale;
  translations: Record<string, string>;
}) {
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  const audiences = [
    {
      href: "/commercial-real-estate",
      titleKey: "cityDetail.serve.commercialRealEstate.title",
      descKey: "cityDetail.serve.commercialRealEstate.description",
    },
    {
      href: "/corporations",
      titleKey: "cityDetail.serve.corporations.title",
      descKey: "cityDetail.serve.corporations.description",
    },
    {
      href: "/schools",
      titleKey: "cityDetail.serve.schools.title",
      descKey: "cityDetail.serve.schools.description",
    },
  ];

  return (
    <section className="section">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <p className="label mb-4">{t("cityDetail.serve.label")}</p>
        <h2 className="heading-section mb-12">{t("cityDetail.serve.title")}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((audience) => (
            <Link
              key={audience.href}
              href={localePath(audience.href)}
              className="card-hover p-6 group"
            >
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">
                {t(audience.titleKey)}
              </h3>
              <p className="text-muted-foreground">{t(audience.descKey)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({
  city,
  locale,
  translations,
  onBookDemo,
}: {
  city: CityData;
  locale: Locale;
  translations: Record<string, string>;
  onBookDemo: () => void;
}) {
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  return (
    <section className="section bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-medium mb-6">
          {t("cityDetail.cta.title")} {city.name}?
        </h2>
        <p className="text-lg opacity-90 mb-8">
          {t("cityDetail.cta.description")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={onBookDemo}
            className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
          >
            {t("common.bookDemo")}
          </button>
          <Link
            href={localePath("/cities")}
            className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
          >
            {t("cityDetail.viewAllCities")}
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function CityDetailClient({
  locale,
  city,
  translations,
}: CityDetailClientProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  if (!city) {
    return <CityNotFound locale={locale} translations={translations} />;
  }

  return (
    <>
      <HeroSection
        city={city}
        locale={locale}
        translations={translations}
        onBookDemo={() => setShowDemoModal(true)}
      />

      <div className="divider" />

      <HighlightsSection city={city} translations={translations} />

      <div className="divider" />

      <ServicesSection city={city} locale={locale} translations={translations} />

      <div className="divider" />

      <AudienceSection locale={locale} translations={translations} />

      <div className="divider" />

      <CTASection
        city={city}
        locale={locale}
        translations={translations}
        onBookDemo={() => setShowDemoModal(true)}
      />

      <BookDemoModal
        open={showDemoModal}
        onOpenChange={setShowDemoModal}
        locale={locale}
      />
    </>
  );
}
