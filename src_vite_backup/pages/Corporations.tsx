import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Building2, Check, Leaf, MapPin, Monitor, Sparkles, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { SEO } from "../components/SEO";
import { useLocale } from "../lib/locale-context";
import { getPageSEO, queryKeys } from "../lib/strapi";

interface CorporationsProps {
  onBookDemo: () => void;
}

export function Corporations({ onBookDemo }: CorporationsProps) {
  const { t, localePath, locale } = useLocale();

  const { data: seo } = useQuery({
    queryKey: queryKeys.pageSEO('corporations', locale),
    queryFn: () => getPageSEO('corporations', locale),
    staleTime: 5 * 60 * 1000,
  });

  const benefits = [
    {
      icon: Leaf,
      title: t('corporations.benefit.1.title'),
      description: t('corporations.benefit.1.description'),
    },
    {
      icon: Sparkles,
      title: t('corporations.benefit.2.title'),
      description: t('corporations.benefit.2.description'),
    },
    {
      icon: Users,
      title: t('corporations.benefit.3.title'),
      description: t('corporations.benefit.3.description'),
    },
    {
      icon: Building2,
      title: t('corporations.benefit.4.title'),
      description: t('corporations.benefit.4.description'),
    },
  ];

  const activities = [
    {
      icon: Monitor,
      title: t('corporations.activities.1.title'),
      description: t('corporations.activities.1.description'),
    },
    {
      icon: MapPin,
      title: t('corporations.activities.2.title'),
      description: t('corporations.activities.2.description'),
    },
    {
      icon: Building2,
      title: t('corporations.activities.3.title'),
      description: t('corporations.activities.3.description'),
    },
  ];

  const process = [
    { step: "1", title: t('corporations.process.1.title'), description: t('corporations.process.1.description') },
    { step: "2", title: t('corporations.process.2.title'), description: t('corporations.process.2.description') },
    { step: "3", title: t('corporations.process.3.title'), description: t('corporations.process.3.description') },
    { step: "4", title: t('corporations.process.4.title'), description: t('corporations.process.4.description') },
    { step: "5", title: t('corporations.process.5.title'), description: t('corporations.process.5.description') },
  ];

  return (
    <>
      <SEO
        title={seo?.metaTitle || 'Corporate Urban Farms | MicroHabitat'}
        description={seo?.metaDescription || 'Transform your workplace with urban farming. Boost employee wellness, engagement, and sustainability initiatives with our corporate programs.'}
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
              <p className="label mb-6">{t('corporations.label')}</p>
              <h1 className="heading-display mb-8">
                {t('corporations.title')} <span className="text-primary">{t('corporations.titleHighlight')}</span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                {t('corporations.description')}
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
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/cdab09dc-3167-4f11-ac84-618b1d4d4102/Cadillac+Fairview_220+Yonge+St+Toronto-4201_MicroHabitat+2024.jpg"
                alt="Corporate Urban Farm"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Transform Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <p className="label mb-4">{t('corporations.transform.label')}</p>
              <h2 className="heading-section mb-6">
                {t('corporations.transform.title')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('corporations.transform.description')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-md overflow-hidden">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg"
                  alt="Team at urban farm"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-md overflow-hidden mt-6">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg"
                  alt="Fresh produce harvest"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
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

      {/* Activities Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('corporations.activities.label')}</p>
          <h2 className="heading-section mb-12">
            {t('corporations.activities.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div key={index} className="card-minimal bg-card p-6">
                <activity.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-3">{activity.title}</h3>
                <p className="text-muted-foreground">{activity.description}</p>
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
            <p className="label mb-4">{t('corporations.process.label')}</p>
            <h2 className="heading-section mb-6">
              {t('corporations.process.title')}
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
              <p className="label mb-4">{t('corporations.suitability.label')}</p>
              <h2 className="heading-section mb-6">
                {t('corporations.suitability.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {t('corporations.suitability.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('corporations.suitability.outdoor')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('corporations.suitability.indoor')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('corporations.suitability.sunlight')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('corporations.suitability.water')}</span>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="aspect-video rounded-md overflow-hidden">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/d7453f90-694b-48ed-af1f-5c16b806db70/Rhapsody_425+Wellington+St+W-0438_MicroHabitat+2024+%281%29.jpg"
                  alt="Corporate rooftop farm"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="card-minimal p-8">
                <h3 className="text-xl font-medium mb-4">{t('corporations.suitability.card.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('corporations.suitability.card.description')}
                </p>
                <Button onClick={onBookDemo} className="w-full">
                  {t('common.getFreeAssessment')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Benefits List */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="label mb-4">{t('corporations.benefits.employees.label')}</p>
              <h3 className="text-2xl font-medium mb-6">{t('corporations.benefits.employees.title')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('corporations.benefits.employees.item1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('corporations.benefits.employees.item2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('corporations.benefits.employees.item3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('corporations.benefits.employees.item4')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('corporations.benefits.employees.item5')}</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="label mb-4">{t('corporations.benefits.business.label')}</p>
              <h3 className="text-2xl font-medium mb-6">{t('corporations.benefits.business.title')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('corporations.benefits.business.item1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('corporations.benefits.business.item2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('corporations.benefits.business.item3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('corporations.benefits.business.item4')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('corporations.benefits.business.item5')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            {t('corporations.cta.title')}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t('corporations.cta.description')}
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
              {t('corporations.cta.viewPartners')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
