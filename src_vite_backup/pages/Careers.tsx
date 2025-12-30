import { Link } from "react-router-dom";
import { ArrowRight, Heart, Leaf, MapPin, Sparkles, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { SEO } from "../components/SEO";
import { getPageSEO, queryKeys } from "../lib/strapi";
import { useLocale } from "../lib/locale-context";

interface CareersProps {
  onBookDemo?: () => void;
}

export function Careers(_props: CareersProps) {
  const { t, localePath, locale } = useLocale();

  const { data: seo } = useQuery({
    queryKey: queryKeys.pageSEO('careers', locale),
    queryFn: () => getPageSEO('careers', locale),
    staleTime: 5 * 60 * 1000,
  });

  const values = [
    {
      icon: Leaf,
      title: t('careers.values.1.title'),
      description: t('careers.values.1.description'),
    },
    {
      icon: Users,
      title: t('careers.values.2.title'),
      description: t('careers.values.2.description'),
    },
    {
      icon: Heart,
      title: t('careers.values.3.title'),
      description: t('careers.values.3.description'),
    },
    {
      icon: Sparkles,
      title: t('careers.values.4.title'),
      description: t('careers.values.4.description'),
    },
  ];

  const locations = [
    { city: "Montreal", country: "Canada", type: t('careers.locations.headquarters') },
    { city: "Toronto", country: "Canada", type: t('careers.locations.regionalOffice') },
    { city: "New York", country: "USA", type: t('careers.locations.usOffice') },
    { city: "Paris", country: "France", type: t('careers.locations.europeanOffice') },
  ];

  return (
    <>
      <SEO
        title={seo?.metaTitle || 'Careers | Microhabitat'}
        description={seo?.metaDescription || 'Join Microhabitat and grow your career in urban agriculture.'}
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
              <p className="label mb-6">{t('careers.label')}</p>
              <h1 className="heading-display mb-8">
                {t('careers.title').includes('MicroHabitat') ? (
                  <>
                    {t('careers.title').split('MicroHabitat')[0]}
                    <span className="text-primary">MicroHabitat</span>
                    {t('careers.title').split('MicroHabitat')[1]}
                  </>
                ) : (
                  t('careers.title')
                )}
              </h1>
              <p className="text-body max-w-3xl mb-10">
                {t('careers.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:careers@microhabitat.com"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-primary hover:bg-primary/90 transition-colors"
                >
                  {t('careers.viewPositions')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <Link to={localePath("/about")} className="btn-outline">
                  {t('careers.learnAboutUs')}
                </Link>
              </div>
            </div>
            <div className="aspect-video rounded-md overflow-hidden">
              <img
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg"
                alt="MicroHabitat Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Values Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('careers.values.label')}</p>
          <h2 className="heading-section mb-12">
            {t('careers.values.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-minimal p-6">
                <value.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Why Join Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">{t('careers.whyJoin.label')}</p>
              <h2 className="heading-section mb-6">
                {t('careers.whyJoin.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {t('careers.whyJoin.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('careers.whyJoin.benefit1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('careers.whyJoin.benefit2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('careers.whyJoin.benefit3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{t('careers.whyJoin.benefit4')}</span>
                </li>
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
            {t('careers.cta.title')}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t('careers.cta.description')}
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
