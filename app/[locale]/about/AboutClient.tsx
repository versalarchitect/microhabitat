"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { type Locale, getLocalePath } from "@/lib/i18n";
import { type AboutPageContent } from "@/lib/strapi";

interface AboutClientProps {
  locale: Locale;
  translations: Record<string, string>;
  content: AboutPageContent;
}

const foodBankLogos = [
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/dfe44973-799d-41d8-9c22-28639b0088f8/Untitled+design+%285%29.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ae303b6d-36de-4974-b285-4796c26790a2/images.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/403a58a3-4ce7-4659-be00-a9a2890dad9a/logo-light-en.png",
];

const partnerLogos = [
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c50394f0-3628-44d7-8227-bdbd8d0b29a0/28.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/bae6de3a-7fc4-4ec4-9e72-2f5ad1ec6a12/29.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/d501c125-e1a3-4f8b-ace2-b36ccabe817c/30.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/2c34728d-d9ec-4bda-bd43-c509e4416383/31.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/fde76d17-fc05-4b53-b1bb-901529f35d9c/32.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5b983302-e79a-4068-9bc5-a14a8af407db/33.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/b9eacff5-fb6f-4275-ad53-e1dd5b391ba0/35.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/0497feb3-16e1-4a27-ac0b-d073af5fe933/36.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/d3e1f860-4503-4016-b4f0-0549b8a4a6b2/37.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/961490c2-bae4-4c02-8cef-da7bb794965b/39.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/fc839744-7613-45e7-95d3-653beb8b0191/40.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/e9134f6e-719a-4ba8-810f-bcf83a510447/42.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/a6357b45-a9fd-468f-be65-e910b8a75d0a/44.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/d368fb97-6bb2-44d1-ba15-a1e89f94ccca/45.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/2619249a-45fd-41a1-9ddd-87d24e2a0ded/47.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/6df713fa-1380-401e-89b1-d58fb49fdc5b/48.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/b0964c85-fac1-4001-8352-e30399fd9aab/50.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/dc5b78b6-8a77-4c61-9fc0-d6fc81c52ea1/51.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/3aad9cd5-c809-4036-b701-c4455fa34033/52.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/7d5e8886-ea61-46a2-9074-b9893154c253/53.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/0ee89578-bc75-4e3b-b7ea-c070ac803944/54.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/537d0b34-0a35-46ae-b6d3-fbef6efea1b1/55.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/3236f0bc-1fd7-4ef1-a7d6-0ebbbbe7aeda/56.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/8f745e96-3d9f-4311-9d4c-a4e63ce96169/57.png",
];

export function AboutClient({ locale, translations, content }: AboutClientProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

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
            </div>
            <div className="aspect-video rounded-md overflow-hidden relative">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg"
                alt={t('about.imageAlt.team')}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Mission Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">{content.missionLabel}</p>
              <h2 className="heading-section mb-6">{content.missionTitle}</h2>
              <p className="text-muted-foreground text-lg mb-6">{content.missionParagraph1}</p>
              <p className="text-muted-foreground text-lg">{content.missionParagraph2}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full h-48">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg"
                  alt="Urban Farm"
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative w-full h-48">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/cdab09dc-3167-4f11-ac84-618b1d4d4102/Cadillac+Fairview_220+Yonge+St+Toronto-4201_MicroHabitat+2024.jpg"
                  alt="Rooftop Garden"
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative w-full h-48">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/35f2e2b7-a43d-4f90-9a34-01348d159a00/Cadillac+Fairview_220+Yonge+St+Toronto-3889_MicroHabitat+2024+%281%29.jpg"
                  alt="Fresh Harvest"
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative w-full h-48">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/d7453f90-694b-48ed-af1f-5c16b806db70/Rhapsody_425+Wellington+St+W-0438_MicroHabitat+2024+%281%29.jpg"
                  alt="Community Garden"
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Urban Solidarity Farms */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">{content.solidarityLabel}</p>
              <h2 className="heading-section mb-6">{content.solidarityTitle}</h2>
              <p className="text-muted-foreground text-lg mb-6">{content.solidarityDescription}</p>
              <h3 className="text-xl font-medium mb-4">{t('about.solidarity.subtitle')}</h3>
              <p className="text-muted-foreground text-lg">{t('about.solidarity.p2')}</p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {foodBankLogos.map((logo, index) => (
                  <div key={index} className="bg-white p-4 rounded-md flex items-center justify-center relative h-24">
                    <Image src={logo} alt="Food Bank Partner" fill className="object-contain p-2" sizes="120px" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative w-full h-40">
                  <Image
                    src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/4a74347c-67e8-46ca-8063-9663438bd4dd/8.7.24-West+Hills-66.jpg"
                    alt="Community Engagement"
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative w-full h-40">
                  <Image
                    src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5969186f-511a-4d62-a903-bedd8e8e7f85/Enfant+fille+6.jpg"
                    alt="Kids Learning"
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Impact Stats */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('about.impact.label')}</p>
          <h2 className="heading-section mb-12">{t('about.impact.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">250+</p>
              <p className="text-sm text-muted-foreground">{t('about.impact.urbanFarms')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">35+</p>
              <p className="text-sm text-muted-foreground">{t('about.impact.foodBanks')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">40k</p>
              <p className="text-sm text-muted-foreground">{t('about.impact.portionsDonated')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">13k</p>
              <p className="text-sm text-muted-foreground">{t('about.impact.fundedMeals')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">59.4k</p>
              <p className="text-sm text-muted-foreground">{t('about.impact.lbsHarvested')}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Foodbanks Supported */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4 text-center">{t('about.foodbanks.label')}</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="bg-white p-3 rounded-md flex items-center justify-center relative h-16">
                <Image src={logo} alt={`Partner ${index + 1}`} fill className="object-contain p-1" sizes="80px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Story Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">{content.storyLabel}</p>
              <h2 className="heading-section mb-6">{content.storyTitle}</h2>
              <p className="text-muted-foreground text-lg mb-6">{content.storyContent}</p>
              <p className="text-muted-foreground text-lg mb-8">{t('about.story.p2')}</p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => setShowDemoModal(true)}>
                  {t('common.bookDemo')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href={localePath("/cities")} className="btn-outline">
                  {t('common.exploreOurCities')}
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full aspect-square">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/b574834b-5ecb-414f-af9d-8b82f0a66eb3/alex.png"
                  alt="Alexandre - Co-Founder"
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative w-full aspect-square">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/7a18b0a1-3770-47fe-b7f2-9efb4432ad77/portrait-orlane+avec+plantes+spe%CC%81cialement+trouve%CC%81+.png"
                  alt="Orlane - Co-Founder"
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">{content.ctaTitle}</h2>
          <p className="text-lg opacity-90 mb-8">{content.ctaDescription}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowDemoModal(true)}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              {t('common.bookDemo')}
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

      <BookDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} locale={locale} />
    </>
  );
}
