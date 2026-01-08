"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Leaf, MapPin, Sparkles, Users } from "lucide-react";
import { type Locale, getLocalePath } from "@/lib/i18n";
import { type CareersPageContent } from "@/lib/cms";
import { JobListings } from "@/components/jobs/JobListings";
import type { JobsData } from "@/lib/jobs";

// Icon mapping for values
const iconMap = [Leaf, Users, Heart, Sparkles];

interface CareersClientProps {
  locale: Locale;
  translations: Record<string, string>;
  content: CareersPageContent;
  jobsData: JobsData;
}

export function CareersClient({ locale, translations, content, jobsData }: CareersClientProps) {
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  const locations = [
    { city: "Montreal", country: "Canada", type: t('careers.locations.headquarters') },
    { city: "Toronto", country: "Canada", type: t('careers.locations.regionalOffice') },
    { city: "New York", country: "USA", type: t('careers.locations.usOffice') },
    { city: "Paris", country: "France", type: t('careers.locations.europeanOffice') },
  ];

  // Icons for benefits
  const benefitIcons = [Leaf, Heart, Users, Sparkles];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-6">{content.heroLabel}</p>
              <h1 className="heading-display mb-8">
                {content.heroTitle} <span className="text-primary">{content.heroTitleHighlight}</span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                {content.introText}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#positions"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-primary hover:bg-primary/90 transition-colors"
                >
                  {t('careers.viewPositions')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <Link href={localePath("/about")} className="btn-outline">
                  {t('careers.learnAboutUs')}
                </Link>
              </div>
            </div>
            <div className="aspect-video rounded-md overflow-hidden relative">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg"
                alt="MicroHabitat Team"
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

      {/* Values Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{content.valuesLabel}</p>
          <h2 className="heading-section mb-12">
            {content.valuesTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.values.map((value, index) => {
              const Icon = iconMap[index] || iconMap[0];
              return (
                <div key={index} className="card-minimal p-6">
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Why Join Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">{content.whyJoinLabel}</p>
              <h2 className="heading-section mb-6">
                {content.whyJoinTitle}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {t('careers.whyJoin.description')}
              </p>
              <ul className="space-y-4">
                {content.benefits.map((benefit, index) => {
                  const Icon = benefitIcons[index] || benefitIcons[0];
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-primary shrink-0 mt-1" />
                      <span><strong>{benefit.title}:</strong> {benefit.description}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="card-minimal p-8">
              <h3 className="text-xl font-medium mb-4">{t('careers.openings.title')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('careers.openings.description')}
              </p>
              <a
                href="mailto:careers@microhabitat.com"
                className="inline-flex items-center w-full justify-center px-6 py-3 bg-primary text-primary-foreground font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-primary hover:bg-primary/90 transition-colors"
              >
                {t('careers.openings.sendResume')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Job Listings Section */}
      <section id="positions" className="section scroll-mt-nav">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('jobs.sectionLabel')}</p>
          <h2 className="heading-section mb-12">
            {t('jobs.sectionTitle')}
          </h2>
          <JobListings translations={translations} jobsData={jobsData} />
        </div>
      </section>

      <div className="divider" />

      {/* Locations Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('careers.locations.label')}</p>
          <h2 className="heading-section mb-12">
            {t('careers.locations.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location, index) => (
              <div key={index} className="card-minimal p-6">
                <MapPin className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-1">{location.city}</h3>
                <p className="text-muted-foreground mb-2">{location.country}</p>
                <p className="text-sm text-primary">{location.type}</p>
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
            {content.ctaTitle}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {content.ctaDescription}
          </p>
          <a
            href="mailto:careers@microhabitat.com"
            className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors"
          >
            {t('careers.cta.getInTouch')}
          </a>
        </div>
      </section>
    </>
  );
}
