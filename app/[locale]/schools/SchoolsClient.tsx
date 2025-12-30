"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, BookOpen, Check, GraduationCap, Heart, Leaf, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { type Locale, getLocalePath } from "@/lib/i18n";

interface SchoolsClientProps {
  locale: Locale;
  translations: Record<string, string>;
}

export function SchoolsClient({ locale, translations }: SchoolsClientProps) {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  const benefits = [
    { icon: BookOpen, title: t('schools.benefits.1.title'), description: t('schools.benefits.1.description') },
    { icon: Leaf, title: t('schools.benefits.2.title'), description: t('schools.benefits.2.description') },
    { icon: GraduationCap, title: t('schools.benefits.3.title'), description: t('schools.benefits.3.description') },
    { icon: Heart, title: t('schools.benefits.4.title'), description: t('schools.benefits.4.description') },
  ];

  const programs = [
    {
      icon: BookOpen,
      title: t('schools.programs.1.title'),
      description: t('schools.programs.1.description'),
      features: [
        t('schools.programs.1.feature1'),
        t('schools.programs.1.feature2'),
        t('schools.programs.1.feature3'),
        t('schools.programs.1.feature4'),
      ],
    },
    {
      icon: Users,
      title: t('schools.programs.2.title'),
      description: t('schools.programs.2.description'),
      features: [
        t('schools.programs.2.feature1'),
        t('schools.programs.2.feature2'),
        t('schools.programs.2.feature3'),
        t('schools.programs.2.feature4'),
      ],
    },
    {
      icon: MapPin,
      title: t('schools.programs.3.title'),
      description: t('schools.programs.3.description'),
      features: [
        t('schools.programs.3.feature1'),
        t('schools.programs.3.feature2'),
        t('schools.programs.3.feature3'),
        t('schools.programs.3.feature4'),
      ],
    },
  ];

  const process = [
    { step: "1", title: t('schools.process.1.title'), description: t('schools.process.1.description') },
    { step: "2", title: t('schools.process.2.title'), description: t('schools.process.2.description') },
    { step: "3", title: t('schools.process.3.title'), description: t('schools.process.3.description') },
    { step: "4", title: t('schools.process.4.title'), description: t('schools.process.4.description') },
    { step: "5", title: t('schools.process.5.title'), description: t('schools.process.5.description') },
  ];

  const subjects = [
    t('schools.curriculum.biology'),
    t('schools.curriculum.environmental'),
    t('schools.curriculum.math'),
    t('schools.curriculum.nutrition'),
    t('schools.curriculum.geography'),
    t('schools.curriculum.chemistry'),
    t('schools.curriculum.social'),
    t('schools.curriculum.art'),
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-6">{t('schools.label')}</p>
              <h1 className="heading-display mb-8">
                {t('schools.title')} <span className="text-primary">{t('schools.titleHighlight')}</span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                {t('schools.subtitle')}
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
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5969186f-511a-4d62-a903-bedd8e8e7f85/Enfant+fille+6.jpg"
                alt="School Urban Farm"
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

      {/* Benefits Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('schools.benefits.label')}</p>
          <h2 className="heading-section mb-12">
            {t('schools.benefits.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card-minimal p-6">
                <benefit.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Programs Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('schools.programs.label')}</p>
          <h2 className="heading-section mb-12">
            {t('schools.programs.title')}
          </h2>
          <div className="space-y-12">
            {programs.map((program, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-8 items-start">
                <div className="card-minimal bg-card p-6">
                  <program.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-3">{program.title}</h3>
                  <p className="text-muted-foreground">{program.description}</p>
                </div>
                <div className="p-6">
                  <h4 className="font-medium mb-4">{t('schools.programs.includes')}</h4>
                  <ul className="space-y-3">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Process Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mb-12">
            <p className="label mb-4">{t('schools.process.label')}</p>
            <h2 className="heading-section mb-6">
              {t('schools.process.title')}
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

      {/* Suitability Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">{t('schools.suitability.label')}</p>
              <h2 className="heading-section mb-6">
                {t('schools.suitability.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {t('schools.suitability.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>Space:</strong> {t('schools.suitability.space')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>Sunlight:</strong> {t('schools.suitability.sunlight')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>Water:</strong> {t('schools.suitability.water')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>Indoor option:</strong> {t('schools.suitability.indoor')}</span>
                </li>
              </ul>
            </div>
            <div className="card-minimal p-8">
              <h3 className="text-xl font-medium mb-4">{t('schools.suitability.cta.title')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('schools.suitability.cta.description')}
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

      {/* Curriculum Integration */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="label mb-4">{t('schools.curriculum.label')}</p>
            <h2 className="heading-section mb-6">
              {t('schools.curriculum.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('schools.curriculum.description')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((subject, index) => (
              <div key={index} className="card-minimal bg-card p-4 text-center">
                <span className="text-sm font-medium">{subject}</span>
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
            {t('schools.cta.title')}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t('schools.cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              {t('common.bookDemo')}
            </button>
            <Link
              href={localePath("/educational-activities")}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              {t('common.viewActivities')}
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
