"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { type Locale, getLocalePath } from "@/lib/i18n";

interface EducationalActivitiesClientProps {
  locale: Locale;
  translations: Record<string, string>;
}

export function EducationalActivitiesClient({ locale, translations }: EducationalActivitiesClientProps) {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  const activities = [
    {
      title: t('educational.gardenVisits.title'),
      subtitle: t('educational.gardenVisits.subtitle'),
      description: t('educational.gardenVisits.description'),
      features: [
        t('educational.gardenVisits.feature1'),
        t('educational.gardenVisits.feature2'),
        t('educational.gardenVisits.feature3'),
        t('educational.gardenVisits.feature4'),
      ],
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/4a74347c-67e8-46ca-8063-9663438bd4dd/8.7.24-West+Hills-66.jpg",
    },
    {
      title: t('educational.kiosks.title'),
      subtitle: t('educational.kiosks.subtitle'),
      description: t('educational.kiosks.description'),
      features: [
        t('educational.kiosks.feature1'),
        t('educational.kiosks.feature2'),
        t('educational.kiosks.feature3'),
        t('educational.kiosks.feature4'),
      ],
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c4b9e4e9-eeb4-4408-bd49-492033a12fec/educational-activities.jpg",
    },
    {
      title: t('educational.workshops.title'),
      subtitle: t('educational.workshops.subtitle'),
      description: t('educational.workshops.description'),
      features: [
        t('educational.workshops.feature1'),
        t('educational.workshops.feature2'),
        t('educational.workshops.feature3'),
        t('educational.workshops.feature4'),
      ],
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5969186f-511a-4d62-a903-bedd8e8e7f85/Enfant+fille+6.jpg",
    },
  ];

  const workshopTopics = [
    t('educational.topics.intro'),
    t('educational.topics.composting'),
    t('educational.topics.seedSaving'),
    t('educational.topics.seasonalPlanting'),
    t('educational.topics.pollinatorGardens'),
    t('educational.topics.containerGardening'),
    t('educational.topics.herbGrowing'),
    t('educational.topics.sustainableEating'),
  ];

  const galleryImages = [
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
    "/indoor-farm.webp",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-6">{t('educational.label')}</p>
              <h1 className="heading-display mb-8">
                {t('educational.title')} <span className="text-primary">{t('educational.titleHighlight')}</span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                {t('educational.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => setIsBookDemoOpen(true)}>
                  {t('educational.bookActivity')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href={localePath("/contact")} className="btn-outline">
                  {t('common.contactUs')}
                </Link>
              </div>
            </div>
            <div className="aspect-video rounded-md overflow-hidden relative">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg"
                alt="Educational Activity"
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

      {/* Activities Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="space-y-20">
            {activities.map((activity, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <p className="label mb-4">{activity.subtitle}</p>
                  <h2 className="heading-section mb-6">{activity.title}</h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    {activity.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {activity.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => setIsBookDemoOpen(true)}>
                    {t('common.bookDemo')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className={`aspect-video rounded-md overflow-hidden relative ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <Image
                    src={activity.image}
                    alt={activity.title}
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

      {/* Workshop Topics */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="label mb-4">{t('educational.topics.label')}</p>
            <h2 className="heading-section mb-6">
              {t('educational.topics.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('educational.topics.description')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {workshopTopics.map((topic, index) => (
              <div key={index} className="card-minimal bg-card p-4 text-center">
                <span className="text-sm font-medium">{topic}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-4">
              {t('educational.topics.custom')}
            </p>
            <Button onClick={() => setIsBookDemoOpen(true)} variant="outline">
              {t('educational.topics.requestCustom')}
            </Button>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Gallery Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4 text-center">{t('educational.gallery.label')}</p>
          <h2 className="heading-section mb-12 text-center">
            {t('educational.gallery.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((src, index) => (
              <div key={index} className="aspect-square rounded-md overflow-hidden relative">
                <Image
                  src={src}
                  alt={`Educational Activity ${index + 1}`}
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

      {/* Stats */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">{t('educational.stats.activitiesCount')}</p>
              <p className="text-muted-foreground">{t('educational.stats.activitiesLabel')}</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">{t('educational.stats.allAges')}</p>
              <p className="text-muted-foreground">{t('educational.stats.allAgesLabel')}</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">{t('educational.stats.virtual')}</p>
              <p className="text-muted-foreground">{t('educational.stats.virtualLabel')}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            {t('educational.cta.title')}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t('educational.cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              {t('educational.bookActivity')}
            </button>
            <Link
              href={localePath("/contact")}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              {t('common.contactUs')}
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
