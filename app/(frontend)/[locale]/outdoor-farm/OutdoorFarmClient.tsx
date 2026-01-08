"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { type Locale, getLocalePath } from "@/lib/i18n";
import { type OutdoorFarmPageContent } from "@/lib/cms";

interface OutdoorFarmClientProps {
  locale: Locale;
  translations: Record<string, string>;
  content: OutdoorFarmPageContent;
}

export function OutdoorFarmClient({ locale, translations, content }: OutdoorFarmClientProps) {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  // Images for services (from CMS services array or fallback)
  const serviceImages = [
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/cdab09dc-3167-4f11-ac84-618b1d4d4102/Cadillac+Fairview_220+Yonge+St+Toronto-4201_MicroHabitat+2024.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/35f2e2b7-a43d-4f90-9a34-01348d159a00/Cadillac+Fairview_220+Yonge+St+Toronto-3889_MicroHabitat+2024+%281%29.jpg",
  ];

  const galleryImages = [
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/cdab09dc-3167-4f11-ac84-618b1d4d4102/Cadillac+Fairview_220+Yonge+St+Toronto-4201_MicroHabitat+2024.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/35f2e2b7-a43d-4f90-9a34-01348d159a00/Cadillac+Fairview_220+Yonge+St+Toronto-3889_MicroHabitat+2024+%281%29.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/d7453f90-694b-48ed-af1f-5c16b806db70/Rhapsody_425+Wellington+St+W-0438_MicroHabitat+2024+%281%29.jpg",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-6">{content.heroLabel}</p>
              <h1 className="heading-display mb-8">
                {content.heroTitle}
              </h1>
              <p className="text-body max-w-3xl mb-10">
                {content.heroDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => setIsBookDemoOpen(true)}>
                  {t('common.bookDemo')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href={localePath("/contact")} className="btn-outline">
                  {t('common.contactUs')}
                </Link>
              </div>
            </div>
            <div className="aspect-video rounded-md overflow-hidden relative">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/d7453f90-694b-48ed-af1f-5c16b806db70/Rhapsody_425+Wellington+St+W-0438_MicroHabitat+2024+%281%29.jpg"
                alt={content.heroTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* What We Offer Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{content.servicesLabel}</p>
          <h2 className="heading-section mb-12">
            {content.servicesTitle}
          </h2>
          <div className="space-y-16">
            {content.services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
                  <p className="text-muted-foreground text-lg">{service.description}</p>
                </div>
                <div className={`aspect-video rounded-md overflow-hidden relative ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <Image
                    src={serviceImages[index] || serviceImages[0]}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Gallery Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4 text-center">{content.galleryLabel}</p>
          <h2 className="heading-section mb-12 text-center">
            {content.galleryTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((src, index) => (
              <div key={index} className="aspect-square rounded-md overflow-hidden relative">
                <Image
                  src={src}
                  alt={`Rooftop Farm ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Packages Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{content.packagesLabel}</p>
          <h2 className="heading-section mb-12">
            {content.packagesTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.packages.map((pkg, index) => (
              <div key={index} className="card-minimal bg-card p-8">
                <h3 className="text-2xl font-medium mb-6">{pkg.name}</h3>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button onClick={() => setIsBookDemoOpen(true)} className="w-full">
                  {t('common.getStarted')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Requirements Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">{content.requirementsLabel}</p>
              <h2 className="heading-section mb-6">
                {content.requirementsTitle}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {content.requirementsDescription}
              </p>
              <ul className="space-y-4">
                {content.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <span><strong>{req.label}:</strong> {req.description}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-minimal p-8">
              <h3 className="text-xl font-medium mb-4">{content.requirementsCardTitle}</h3>
              <p className="text-muted-foreground mb-6">
                {content.requirementsCardDescription}
              </p>
              <Button onClick={() => setIsBookDemoOpen(true)} className="w-full">
                {t('common.getFreeAssessment')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            {content.ctaTitle}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {content.ctaDescription}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              {t('common.bookDemo')}
            </button>
            <Link
              href={localePath("/faq")}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              {content.ctaViewFaq}
            </Link>
          </div>
        </div>
      </section>

      <BookDemoModal
        open={isBookDemoOpen}
        onOpenChange={setIsBookDemoOpen}
        locale={locale}
      />
    </>
  );
}
