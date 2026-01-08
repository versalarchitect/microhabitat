"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Award, Building2, Calculator, Check, Leaf, MapPin, Monitor, Quote, Sparkles, TrendingUp, Users, Zap, Home, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { type Locale, getLocalePath } from "@/lib/i18n";

interface CommercialRealEstateClientProps {
  locale: Locale;
  translations: Record<string, string>;
}

export function CommercialRealEstateClient({ locale, translations }: CommercialRealEstateClientProps) {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  const services = [
    { icon: Leaf, title: t('commercial.services.1.title'), description: t('commercial.services.1.description') },
    { icon: Sparkles, title: t('commercial.services.2.title'), description: t('commercial.services.2.description') },
    { icon: Monitor, title: t('commercial.services.3.title'), description: t('commercial.services.3.description') },
    { icon: MapPin, title: t('commercial.services.4.title'), description: t('commercial.services.4.description') },
    { icon: Building2, title: t('commercial.services.5.title'), description: t('commercial.services.5.description') },
    { icon: Users, title: t('commercial.services.6.title'), description: t('commercial.services.6.description') },
  ];

  const certifications = [
    { name: t('commercial.certifications.leed'), description: t('commercial.certifications.leedDesc') },
    { name: t('commercial.certifications.boma'), description: t('commercial.certifications.bomaDesc') },
    { name: t('commercial.certifications.well'), description: t('commercial.certifications.wellDesc') },
    { name: t('commercial.certifications.fitwel'), description: t('commercial.certifications.fitwelDesc') },
    { name: t('commercial.certifications.gresb'), description: t('commercial.certifications.gresbDesc') },
  ];

  const process = [
    { step: "1", title: t('commercial.process.1.title'), description: t('commercial.process.1.description') },
    { step: "2", title: t('commercial.process.2.title'), description: t('commercial.process.2.description') },
    { step: "3", title: t('commercial.process.3.title'), description: t('commercial.process.3.description') },
    { step: "4", title: t('commercial.process.4.title'), description: t('commercial.process.4.description') },
    { step: "5", title: t('commercial.process.5.title'), description: t('commercial.process.5.description') },
  ];

  const galleryImages = [
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/35f2e2b7-a43d-4f90-9a34-01348d159a00/Cadillac+Fairview_220+Yonge+St+Toronto-3889_MicroHabitat+2024+%281%29.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/a65c6b17-af7b-42f6-8e01-a57cb1ce82b7/IMG_8908.jpg",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-6">{t('commercial.label')}</p>
              <h1 className="heading-display mb-8">
                {t('commercial.title')} <span className="text-primary">{t('commercial.titleHighlight')}</span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                {t('commercial.description')}
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
                alt="Commercial Real Estate Urban Farm"
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

      {/* Partner Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">{t('commercial.partner.label')}</p>
              <h2 className="heading-section mb-6">
                {t('commercial.partner.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {t('commercial.partner.description')}
              </p>
              <ul className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <span>{t(`commercial.partner.benefit${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-md overflow-hidden relative">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg"
                  alt="Rooftop urban farm"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="aspect-[3/4] rounded-md overflow-hidden relative mt-8">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/cdab09dc-3167-4f11-ac84-618b1d4d4102/Cadillac+Fairview_220+Yonge+St+Toronto-4201_MicroHabitat+2024.jpg"
                  alt="Corporate garden space"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Services Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('commercial.services.label')}</p>
          <h2 className="heading-section mb-12">
            {t('commercial.services.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card-minimal bg-card p-6">
                <service.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Certifications Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">{t('commercial.certifications.label')}</p>
              <h2 className="heading-section mb-6">
                {t('commercial.certifications.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {t('commercial.certifications.description')}
              </p>
              <Button onClick={() => setIsBookDemoOpen(true)}>
                {t('common.learnMore')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="card-minimal p-4 flex items-center gap-4">
                  <Award className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Process Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mb-12">
            <p className="label mb-4">{t('commercial.process.label')}</p>
            <h2 className="heading-section mb-6">
              {t('commercial.process.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-medium text-primary/20 mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* 6 Measurable Benefits Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('commercial.benefits.label')}</p>
          <h2 className="heading-section mb-12">
            {t('commercial.benefits.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Retention */}
            <div className="bg-card border border-border rounded-md p-6">
              <Users className="w-8 h-8 text-primary mb-4" />
              <p className="text-3xl font-semibold text-primary mb-2">
                {t('commercial.benefits.retention.value')}
              </p>
              <h3 className="text-lg font-medium mb-2">
                {t('commercial.benefits.retention.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('commercial.benefits.retention.description')}
              </p>
            </div>
            {/* Rent Premium */}
            <div className="bg-card border border-border rounded-md p-6">
              <TrendingUp className="w-8 h-8 text-primary mb-4" />
              <p className="text-3xl font-semibold text-primary mb-2">
                {t('commercial.benefits.rentPremium.value')}
              </p>
              <h3 className="text-lg font-medium mb-2">
                {t('commercial.benefits.rentPremium.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('commercial.benefits.rentPremium.description')}
              </p>
            </div>
            {/* Energy Savings */}
            <div className="bg-card border border-border rounded-md p-6">
              <Zap className="w-8 h-8 text-primary mb-4" />
              <p className="text-3xl font-semibold text-primary mb-2">
                {t('commercial.benefits.energy.value')}
              </p>
              <h3 className="text-lg font-medium mb-2">
                {t('commercial.benefits.energy.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('commercial.benefits.energy.description')}
              </p>
            </div>
            {/* Property Value */}
            <div className="bg-card border border-border rounded-md p-6">
              <Home className="w-8 h-8 text-primary mb-4" />
              <p className="text-3xl font-semibold text-primary mb-2">
                {t('commercial.benefits.propertyValue.value')}
              </p>
              <h3 className="text-lg font-medium mb-2">
                {t('commercial.benefits.propertyValue.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('commercial.benefits.propertyValue.description')}
              </p>
            </div>
            {/* Payback Period */}
            <div className="bg-card border border-border rounded-md p-6">
              <Clock className="w-8 h-8 text-primary mb-4" />
              <p className="text-3xl font-semibold text-primary mb-2">
                {t('commercial.benefits.payback.value')} <span className="text-lg font-normal">years</span>
              </p>
              <h3 className="text-lg font-medium mb-2">
                {t('commercial.benefits.payback.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('commercial.benefits.payback.description')}
              </p>
            </div>
            {/* ESG Compliance */}
            <div className="bg-card border border-border rounded-md p-6">
              <Target className="w-8 h-8 text-primary mb-4" />
              <p className="text-3xl font-semibold text-primary mb-2">
                {t('commercial.benefits.esg.value')}
              </p>
              <h3 className="text-lg font-medium mb-2">
                {t('commercial.benefits.esg.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('commercial.benefits.esg.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Testimonial Section */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <p className="label mb-6">{t('commercial.testimonial.label')}</p>
          <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
          <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-6 leading-relaxed">
            &ldquo;{t('commercial.testimonial.quote')}&rdquo;
          </blockquote>
          <p className="text-muted-foreground">
            — {t('commercial.testimonial.attribution')}
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* ROI Calculator CTA Section */}
      <section className="section bg-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">{t('commercial.roiCta.label')}</p>
              <h2 className="heading-section mb-6">
                {t('commercial.roiCta.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t('commercial.roiCta.description')}
              </p>
              <Link href={localePath("/roi-calculator")}>
                <Button size="lg">
                  <Calculator className="w-5 h-5 mr-2" />
                  {t('commercial.roiCta.button')}
                </Button>
              </Link>
            </div>
            <div className="bg-card border border-border rounded-md p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-semibold text-primary">$29K-70K</p>
                  <p className="text-sm text-muted-foreground mt-1">Annual benefits per property</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-semibold text-primary">2-3</p>
                  <p className="text-sm text-muted-foreground mt-1">Year payback period</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-semibold text-primary">15-20%</p>
                  <p className="text-sm text-muted-foreground mt-1">Turnover reduction</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-semibold text-primary">5-8%</p>
                  <p className="text-sm text-muted-foreground mt-1">Property value increase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Suitability Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">{t('commercial.suitability.label')}</p>
              <h2 className="heading-section mb-6">
                {t('commercial.suitability.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {t('commercial.suitability.description')}
              </p>
              <ul className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <span>{t(`commercial.suitability.item${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-minimal bg-card p-8">
              <h3 className="text-xl font-medium mb-4">{t('commercial.suitability.card.title')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('commercial.suitability.card.description')}
              </p>
              <Button onClick={() => setIsBookDemoOpen(true)} className="w-full">
                {t('commercial.suitability.scheduleAssessment')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Gallery Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('commercial.gallery.label')}</p>
          <h2 className="heading-section mb-12">
            {t('commercial.gallery.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((src, index) => (
              <div key={index} className="aspect-square rounded-md overflow-hidden relative">
                <Image
                  src={src}
                  alt={`Commercial project ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            {t('commercial.cta.title')}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t('commercial.cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              {t('common.bookDemo')}
            </button>
            <Link
              href={localePath("/partnerships")}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              {t('commercial.cta.viewPartners')}
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
