import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Heart, Leaf, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { SEO } from "../components/SEO";
import { getPageSEO, queryKeys } from "../lib/strapi";
import { useLocale } from "../lib/locale-context";

interface CommunityEngagementProps {
  onBookDemo: () => void;
}

export function CommunityEngagement({ onBookDemo }: CommunityEngagementProps) {
  const { t, localePath, locale } = useLocale();

  const { data: seo } = useQuery({
    queryKey: queryKeys.pageSEO('community-engagement', locale),
    queryFn: () => getPageSEO('community-engagement', locale),
    staleTime: 5 * 60 * 1000,
  });

  const pillars = [
    {
      icon: Users,
      title: t('community.pillars.1.title'),
      description: t('community.pillars.1.description'),
    },
    {
      icon: Heart,
      title: t('community.pillars.2.title'),
      description: t('community.pillars.2.description'),
    },
    {
      icon: BookOpen,
      title: t('community.pillars.3.title'),
      description: t('community.pillars.3.description'),
    },
    {
      icon: Leaf,
      title: t('community.pillars.4.title'),
      description: t('community.pillars.4.description'),
    },
  ];

  return (
    <>
      <SEO
        title={seo?.metaTitle || 'Community Engagement | MicroHabitat'}
        description={seo?.metaDescription || 'Building stronger communities through urban farming. Discover our community engagement programs and Urban Solidarity Farms initiative.'}
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
              <p className="label mb-6">{t('community.label')}</p>
              <h1 className="heading-display mb-8">
                {t('community.title')} <span className="text-primary">{t('community.titleHighlight')}</span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                {t('community.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={onBookDemo}>
                  {t('community.startProgram')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link to={localePath("/contact")} className="btn-outline">
                  {t('common.contactUs')}
                </Link>
              </div>
            </div>
            <div className="aspect-video rounded-md overflow-hidden">
              <img
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg"
                alt={t('community.imageAlt')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Pillars Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('community.approach.label')}</p>
          <h2 className="heading-section mb-12">
            {t('community.approach.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="card-minimal p-8">
                <pillar.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-medium mb-4">{pillar.title}</h3>
                <p className="text-muted-foreground">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Urban Solidarity Farms */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">{t('community.solidarity.label')}</p>
              <h2 className="heading-section mb-6">
                {t('community.solidarity.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {t('community.solidarity.p1')}
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                {t('community.solidarity.p2')}
              </p>
              <Button onClick={onBookDemo}>
                {t('community.solidarity.joinProgram')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-6">
              <div className="card-minimal p-6">
                <p className="text-4xl font-medium text-primary mb-2">{t('community.solidarity.stat1.value')}</p>
                <p className="text-muted-foreground">{t('community.solidarity.stat1.label')}</p>
              </div>
              <div className="card-minimal p-6">
                <p className="text-4xl font-medium text-primary mb-2">{t('community.solidarity.stat2.value')}</p>
                <p className="text-muted-foreground">{t('community.solidarity.stat2.label')}</p>
              </div>
              <div className="card-minimal p-6">
                <p className="text-4xl font-medium text-primary mb-2">{t('community.solidarity.stat3.value')}</p>
                <p className="text-muted-foreground">{t('community.solidarity.stat3.label')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Activities Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('community.activities.label')}</p>
          <h2 className="heading-section mb-12">
            {t('community.activities.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-4">{t('community.activities.1.title')}</h3>
              <p className="text-muted-foreground">
                {t('community.activities.1.description')}
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-4">{t('community.activities.2.title')}</h3>
              <p className="text-muted-foreground">
                {t('community.activities.2.description')}
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-4">{t('community.activities.3.title')}</h3>
              <p className="text-muted-foreground">
                {t('community.activities.3.description')}
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-4">{t('community.activities.4.title')}</h3>
              <p className="text-muted-foreground">
                {t('community.activities.4.description')}
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-4">{t('community.activities.5.title')}</h3>
              <p className="text-muted-foreground">
                {t('community.activities.5.description')}
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-4">{t('community.activities.6.title')}</h3>
              <p className="text-muted-foreground">
                {t('community.activities.6.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* For Food Banks */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl">
            <p className="label mb-4">{t('community.foodBanks.label')}</p>
            <h2 className="heading-section mb-6">
              {t('community.foodBanks.title')}
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              {t('community.foodBanks.p1')}
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              {t('community.foodBanks.p2')}
            </p>
            <Link to={localePath("/contact")} className="btn-outline">
              {t('community.foodBanks.getInTouch')}
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            {t('community.cta.title')}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t('community.cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              {t('community.startProgram')}
            </button>
            <Link
              to={localePath("/about")}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              {t('community.cta.learnAbout')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
