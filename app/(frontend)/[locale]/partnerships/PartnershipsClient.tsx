"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { type Locale, getLocalePath } from "@/lib/i18n";

interface PartnershipsClientProps {
  locale: Locale;
  translations: Record<string, string>;
}

export function PartnershipsClient({ locale, translations }: PartnershipsClientProps) {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  const partners = [
    { name: "BNP Paribas", category: t('partnerships.category.financialServices') },
    { name: "GWL Realty Advisors", category: t('partnerships.category.realEstate') },
    { name: "Ivanhoé Cambridge", category: t('partnerships.category.realEstate') },
    { name: "Cadillac Fairview", category: t('partnerships.category.realEstate') },
    { name: "Oxford Properties", category: t('partnerships.category.realEstate') },
    { name: "Allied REIT", category: t('partnerships.category.realEstate') },
    { name: "Brookfield", category: t('partnerships.category.realEstate') },
    { name: "Dream Office", category: t('partnerships.category.realEstate') },
    { name: "Choice Properties", category: t('partnerships.category.realEstate') },
    { name: "RioCan", category: t('partnerships.category.realEstate') },
    { name: "SmartCentres", category: t('partnerships.category.realEstate') },
    { name: "Cominar", category: t('partnerships.category.realEstate') },
  ];

  const partnerTypes = [
    { title: t('partnerships.types.1.title'), description: t('partnerships.types.1.description'), link: "/commercial-real-estate" },
    { title: t('partnerships.types.2.title'), description: t('partnerships.types.2.description'), link: "/corporations" },
    { title: t('partnerships.types.3.title'), description: t('partnerships.types.3.description'), link: "/schools" },
    { title: t('partnerships.types.4.title'), description: t('partnerships.types.4.description'), link: "/community-engagement" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-6">{t('partnerships.label')}</p>
              <h1 className="heading-display mb-8">
                {t('partnerships.title').split('sustainable').map((part, index, arr) =>
                  index < arr.length - 1 ? (
                    <span key={index}>
                      {part}<span className="text-primary">sustainable</span>
                    </span>
                  ) : (
                    <span key={index}>{part}</span>
                  )
                )}
              </h1>
              <p className="text-body max-w-3xl mb-10">
                {t('partnerships.description')}
              </p>
            </div>
            <div className="aspect-video rounded-md overflow-hidden relative">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg"
                alt="Partnership Urban Farm"
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

      {/* Partners Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('partnerships.partners.label')}</p>
          <h2 className="heading-section mb-8">
            {t('partnerships.partners.title')}
          </h2>
          <p className="text-body max-w-3xl mb-8">
            {t('partnerships.partners.description')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setIsBookDemoOpen(true)}>
              {t('partnerships.becomePartner')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link href={localePath("/contact")} className="btn-outline">
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Current Partners */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('partnerships.current.label')}</p>
          <h2 className="heading-section mb-12">
            {t('partnerships.current.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="card-minimal p-6 text-center">
                <h3 className="font-medium mb-1">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">{partner.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Partnership Types */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('partnerships.types.label')}</p>
          <h2 className="heading-section mb-12">
            {t('partnerships.types.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {partnerTypes.map((type, index) => (
              <div key={index} className="card-minimal bg-card p-8">
                <h3 className="text-xl font-medium mb-4">{type.title}</h3>
                <p className="text-muted-foreground mb-6">{type.description}</p>
                <Link
                  href={localePath(type.link)}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  {t('common.learnMore')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Impact Together */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="label mb-4">{t('partnerships.impact.label')}</p>
            <h2 className="heading-section mb-8">
              {t('partnerships.impact.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div>
                <p className="text-4xl font-medium text-primary mb-2">250+</p>
                <p className="text-sm text-muted-foreground">{t('partnerships.impact.farms')}</p>
              </div>
              <div>
                <p className="text-4xl font-medium text-primary mb-2">35+</p>
                <p className="text-sm text-muted-foreground">{t('partnerships.impact.foodBanks')}</p>
              </div>
              <div>
                <p className="text-4xl font-medium text-primary mb-2">40k</p>
                <p className="text-sm text-muted-foreground">{t('partnerships.impact.portions')}</p>
              </div>
              <div>
                <p className="text-4xl font-medium text-primary mb-2">20</p>
                <p className="text-sm text-muted-foreground">{t('partnerships.impact.cities')}</p>
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              {t('partnerships.impact.description')}
            </p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            {t('partnerships.cta.title')}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t('partnerships.cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              {t('partnerships.becomePartner')}
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
