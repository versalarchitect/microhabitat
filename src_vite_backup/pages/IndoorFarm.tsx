import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { SEO } from "../components/SEO";
import { useLocale } from "../lib/locale-context";
import { getPageSEO, queryKeys } from "../lib/strapi";

interface IndoorFarmProps {
  onBookDemo: () => void;
}

export function IndoorFarm({ onBookDemo }: IndoorFarmProps) {
  const { t, localePath, locale } = useLocale();

  const { data: seo } = useQuery({
    queryKey: queryKeys.pageSEO('indoor-farm', locale),
    queryFn: () => getPageSEO('indoor-farm', locale),
    staleTime: 5 * 60 * 1000,
  });

  const features = [
    {
      title: t('indoor.features.1.title'),
      description: t('indoor.features.1.description'),
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/4a74347c-67e8-46ca-8063-9663438bd4dd/8.7.24-West+Hills-66.jpg",
    },
    {
      title: t('indoor.features.2.title'),
      description: t('indoor.features.2.description'),
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c4b9e4e9-eeb4-4408-bd49-492033a12fec/educational-activities.jpg",
    },
    {
      title: t('indoor.features.3.title'),
      description: t('indoor.features.3.description'),
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
    },
  ];

  const packageFeatures = [
    t('indoor.package.feature1'),
    t('indoor.package.feature2'),
    t('indoor.package.feature3'),
    t('indoor.package.feature4'),
    t('indoor.package.feature5'),
    t('indoor.package.feature6'),
  ];

  const certifications = [
    "LEED",
    "WELL",
    "Fitwel",
    "BOMA BEST",
    "GRESB",
  ];

  return (
    <>
      <SEO
        title={seo?.metaTitle || 'Indoor Urban Farms | MicroHabitat'}
        description={seo?.metaDescription || 'Year-round indoor farming solutions for lobbies, atriums, and interior spaces. Fresh produce and biophilic design for your building.'}
        canonical={seo?.canonical}
        ogImage={seo?.ogImage}
        twitterImage={seo?.twitterImage}
        keywords={seo?.keywords?.split(',').map(k => k.trim())}
        noIndex={seo?.noIndex}
        noFollow={seo?.noFollow}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-6">{t('indoor.label')}</p>
              <h1 className="heading-display mb-8">
                {t('indoor.title').split(' ')[0]} <span className="text-primary">{t('indoor.title').split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                {t('indoor.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={onBookDemo}>
                  {t('common.bookDemo')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link to={localePath("/contact")} className="btn-outline">
                  {t('common.contactUs')}
                </Link>
              </div>
            </div>
            <div className="aspect-video rounded-md overflow-hidden">
              <img
                src="/indoor-farm.webp"
                alt={t('indoor.imageAlt')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Features Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('indoor.features.label')}</p>
          <h2 className="heading-section mb-12">
            {t('indoor.features.title')}
          </h2>
          <div className="space-y-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <h3 className="text-2xl font-medium mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                </div>
                <div className={`aspect-video rounded-md overflow-hidden ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Package Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">{t('indoor.package.label')}</p>
              <h2 className="heading-section mb-6">
                {t('indoor.package.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t('indoor.package.description')}
              </p>
              <ul className="space-y-4">
                {packageFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-minimal bg-card p-8">
              <h3 className="text-xl font-medium mb-4">{t('indoor.package.card.title')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('indoor.package.card.description')}
              </p>
              <Button onClick={onBookDemo} className="w-full mb-4">
                {t('common.bookDemo')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                {t('indoor.package.card.footnote')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Certifications Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="label mb-4">{t('indoor.certifications.label')}</p>
            <h2 className="heading-section mb-6">
              {t('indoor.certifications.title')}
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              {t('indoor.certifications.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert, index) => (
                <span
                  key={index}
                  className="px-6 py-3 border border-border rounded-md font-mono text-sm"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Gallery Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4 text-center">{t('indoor.gallery.label')}</p>
          <h2 className="heading-section mb-12 text-center">
            {t('indoor.gallery.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="/indoor-farm.webp"
              alt="Indoor Farm 1"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg"
              alt="Indoor Farm 2"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg"
              alt="Indoor Farm 3"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg"
              alt="Indoor Farm 4"
              className="w-full aspect-square object-cover rounded-md"
            />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            {t('indoor.cta.title')}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t('indoor.cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              {t('common.bookDemo')}
            </button>
            <Link
              to={localePath("/outdoor-farm")}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              {t('indoor.cta.viewOutdoor')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
