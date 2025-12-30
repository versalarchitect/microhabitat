import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Award, Building2, Check, Leaf, MapPin, Monitor, Sparkles, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { SEO } from "../components/SEO";
import { useLocale } from "../lib/locale-context";
import { getPageSEO, queryKeys } from "../lib/strapi";

interface CommercialRealEstateProps {
  onBookDemo: () => void;
}

export function CommercialRealEstate({ onBookDemo }: CommercialRealEstateProps) {
  const { t, localePath, locale } = useLocale();

  const { data: seo } = useQuery({
    queryKey: queryKeys.pageSEO('commercial-real-estate', locale),
    queryFn: () => getPageSEO('commercial-real-estate', locale),
    staleTime: 5 * 60 * 1000,
  });

  const services = [
    {
      icon: Leaf,
      title: t('commercial.services.1.title'),
      description: t('commercial.services.1.description'),
    },
    {
      icon: Sparkles,
      title: t('commercial.services.2.title'),
      description: t('commercial.services.2.description'),
    },
    {
      icon: Monitor,
      title: t('commercial.services.3.title'),
      description: t('commercial.services.3.description'),
    },
    {
      icon: MapPin,
      title: t('commercial.services.4.title'),
      description: t('commercial.services.4.description'),
    },
    {
      icon: Building2,
      title: t('commercial.services.5.title'),
      description: t('commercial.services.5.description'),
    },
    {
      icon: Users,
      title: t('commercial.services.6.title'),
      description: t('commercial.services.6.description'),
    },
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

  return (
    <>
      <SEO
        title={seo?.metaTitle || 'Commercial Real Estate | MicroHabitat'}
        description={seo?.metaDescription || 'Urban farming solutions for commercial real estate. Enhance tenant experience, achieve sustainability certifications, and differentiate your property.'}
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
              <p className="label mb-6">{t('commercial.label')}</p>
              <h1 className="heading-display mb-8">
                {t('commercial.title')} <span className="text-primary">{t('commercial.titleHighlight')}</span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                {t('commercial.description')}
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
                alt="Commercial Real Estate Urban Farm"
                className="w-full h-full object-cover"
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
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('commercial.partner.benefit1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('commercial.partner.benefit2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('commercial.partner.benefit3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('commercial.partner.benefit4')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('commercial.partner.benefit5')}</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-md overflow-hidden">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg"
                  alt="Rooftop urban farm"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[3/4] rounded-md overflow-hidden mt-8">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/cdab09dc-3167-4f11-ac84-618b1d4d4102/Cadillac+Fairview_220+Yonge+St+Toronto-4201_MicroHabitat+2024.jpg"
                  alt="Corporate garden space"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
              <Button onClick={onBookDemo}>
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
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('commercial.suitability.item1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('commercial.suitability.item2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('commercial.suitability.item3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('commercial.suitability.item4')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('commercial.suitability.item5')}</span>
                </li>
              </ul>
            </div>
            <div className="card-minimal bg-card p-8">
              <h3 className="text-xl font-medium mb-4">{t('commercial.suitability.card.title')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('commercial.suitability.card.description')}
              </p>
              <Button onClick={onBookDemo} className="w-full">
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
            <div className="aspect-square rounded-md overflow-hidden">
              <img
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/35f2e2b7-a43d-4f90-9a34-01348d159a00/Cadillac+Fairview_220+Yonge+St+Toronto-3889_MicroHabitat+2024+%281%29.jpg"
                alt="Aerial view of rooftop farm"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-md overflow-hidden">
              <img
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg"
                alt="Urban farm produce"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-md overflow-hidden">
              <img
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg"
                alt="Fresh harvest"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-md overflow-hidden">
              <img
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/a65c6b17-af7b-42f6-8e01-a57cb1ce82b7/IMG_8908.jpg"
                alt="Community engagement"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
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
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              {t('common.bookDemo')}
            </button>
            <Link
              to={localePath("/partnerships")}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              {t('commercial.cta.viewPartners')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
