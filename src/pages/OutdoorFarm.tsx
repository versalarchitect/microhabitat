import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { SEO } from "../components/SEO";
import { useLocale } from "../lib/locale-context";
import { getPageSEO, queryKeys } from "../lib/strapi";

interface OutdoorFarmProps {
  onBookDemo: () => void;
}

export function OutdoorFarm({ onBookDemo }: OutdoorFarmProps) {
  const { t, localePath, locale } = useLocale();

  const { data: seo } = useQuery({
    queryKey: queryKeys.pageSEO('outdoor-farm', locale),
    queryFn: () => getPageSEO('outdoor-farm', locale),
    staleTime: 5 * 60 * 1000,
  });

  const services = [
    {
      title: t('outdoor.services.1.title'),
      description: t('outdoor.services.1.description'),
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
    },
    {
      title: t('outdoor.services.2.title'),
      description: t('outdoor.services.2.description'),
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/cdab09dc-3167-4f11-ac84-618b1d4d4102/Cadillac+Fairview_220+Yonge+St+Toronto-4201_MicroHabitat+2024.jpg",
    },
    {
      title: t('outdoor.services.3.title'),
      description: t('outdoor.services.3.description'),
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/35f2e2b7-a43d-4f90-9a34-01348d159a00/Cadillac+Fairview_220+Yonge+St+Toronto-3889_MicroHabitat+2024+%281%29.jpg",
    },
  ];

  const packages = [
    {
      name: t('outdoor.packages.30pots'),
      features: [
        t('outdoor.packages.feature.pots30'),
        t('outdoor.packages.feature.irrigation'),
        t('outdoor.packages.feature.planting'),
        t('outdoor.packages.feature.maintenance'),
        t('outdoor.packages.feature.harvesting'),
        t('outdoor.packages.feature.activities2'),
        t('outdoor.packages.feature.marketing'),
      ],
    },
    {
      name: t('outdoor.packages.50pots'),
      features: [
        t('outdoor.packages.feature.pots50'),
        t('outdoor.packages.feature.irrigation'),
        t('outdoor.packages.feature.planting'),
        t('outdoor.packages.feature.maintenance'),
        t('outdoor.packages.feature.harvesting'),
        t('outdoor.packages.feature.activities3'),
        t('outdoor.packages.feature.marketing'),
        t('outdoor.packages.feature.gifts'),
      ],
    },
    {
      name: t('outdoor.packages.custom'),
      features: [
        t('outdoor.packages.feature.potsCustom'),
        t('outdoor.packages.feature.irrigation'),
        t('outdoor.packages.feature.planting'),
        t('outdoor.packages.feature.maintenance'),
        t('outdoor.packages.feature.harvesting'),
        t('outdoor.packages.feature.activitiesUnlimited'),
        t('outdoor.packages.feature.marketingFull'),
        t('outdoor.packages.feature.gifts'),
        t('outdoor.packages.feature.accountManager'),
      ],
    },
  ];

  return (
    <>
      <SEO
        title={seo?.metaTitle || 'Outdoor Urban Farms | MicroHabitat'}
        description={seo?.metaDescription || 'Transform your rooftop or outdoor space into a productive urban farm. Full-service design, installation, and maintenance for commercial and residential properties.'}
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
              <p className="label mb-6">{t('outdoor.label')}</p>
              <h1 className="heading-display mb-8">
                {t('outdoor.title')}
              </h1>
              <p className="text-body max-w-3xl mb-10">
                {t('outdoor.description')}
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
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/d7453f90-694b-48ed-af1f-5c16b806db70/Rhapsody_425+Wellington+St+W-0438_MicroHabitat+2024+%281%29.jpg"
                alt={t('outdoor.imageAlt')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* What We Offer Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('outdoor.services.label')}</p>
          <h2 className="heading-section mb-12">
            {t('outdoor.services.title')}
          </h2>
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
                  <p className="text-muted-foreground text-lg">{service.description}</p>
                </div>
                <div className={`aspect-video rounded-md overflow-hidden ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
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
          <p className="label mb-4 text-center">{t('outdoor.gallery.label')}</p>
          <h2 className="heading-section mb-12 text-center">
            {t('outdoor.gallery.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg"
              alt="Rooftop Farm 1"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/cdab09dc-3167-4f11-ac84-618b1d4d4102/Cadillac+Fairview_220+Yonge+St+Toronto-4201_MicroHabitat+2024.jpg"
              alt="Rooftop Farm 2"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/35f2e2b7-a43d-4f90-9a34-01348d159a00/Cadillac+Fairview_220+Yonge+St+Toronto-3889_MicroHabitat+2024+%281%29.jpg"
              alt="Fresh Produce"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/d7453f90-694b-48ed-af1f-5c16b806db70/Rhapsody_425+Wellington+St+W-0438_MicroHabitat+2024+%281%29.jpg"
              alt="Urban Garden"
              className="w-full aspect-square object-cover rounded-md"
            />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Packages Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('outdoor.packages.label')}</p>
          <h2 className="heading-section mb-12">
            {t('outdoor.packages.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
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
                <Button onClick={onBookDemo} className="w-full">
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
              <p className="label mb-4">{t('outdoor.requirements.label')}</p>
              <h2 className="heading-section mb-6">
                {t('outdoor.requirements.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {t('outdoor.requirements.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>{t('outdoor.requirements.space.label')}:</strong> {t('outdoor.requirements.space.description')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>{t('outdoor.requirements.sunlight.label')}:</strong> {t('outdoor.requirements.sunlight.description')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>{t('outdoor.requirements.water.label')}:</strong> {t('outdoor.requirements.water.description')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>{t('outdoor.requirements.access.label')}:</strong> {t('outdoor.requirements.access.description')}</span>
                </li>
              </ul>
            </div>
            <div className="card-minimal p-8">
              <h3 className="text-xl font-medium mb-4">{t('outdoor.requirements.card.title')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('outdoor.requirements.card.description')}
              </p>
              <Button onClick={onBookDemo} className="w-full">
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
            {t('outdoor.cta.title')}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t('outdoor.cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              {t('common.bookDemo')}
            </button>
            <Link
              to={localePath("/faq")}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              {t('outdoor.cta.viewFaq')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
