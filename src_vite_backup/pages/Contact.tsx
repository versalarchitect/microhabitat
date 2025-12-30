import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { SEO } from "../components/SEO";
import { getPageSEO, queryKeys } from "../lib/strapi";
import { useLocale } from "../lib/locale-context";

interface ContactProps {
  onBookDemo: () => void;
}

export function Contact({ onBookDemo }: ContactProps) {
  const { t, localePath, locale } = useLocale();

  const { data: seo } = useQuery({
    queryKey: queryKeys.pageSEO('contact', locale),
    queryFn: () => getPageSEO('contact', locale),
    staleTime: 5 * 60 * 1000,
  });

  const offices = [
    {
      city: "Montreal",
      type: "Headquarters",
      country: "Canada",
      address: "1234 Urban Farm Street",
      region: "QC H2X 1Y2",
    },
    {
      city: "NYC",
      type: "US Office",
      country: "USA",
      address: "555 Green Avenue",
      region: "NY 10001",
    },
    {
      city: "Toronto",
      type: "Regional Office",
      country: "Canada",
      address: "789 Garden Boulevard",
      region: "ON M5V 3L9",
    },
  ];

  return (
    <>
      <SEO
        title={seo?.metaTitle || 'Contact Us | MicroHabitat'}
        description={seo?.metaDescription || 'Get in touch with MicroHabitat. Reach out to discuss urban farming solutions for your property or organization.'}
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
              <p className="label mb-6">{t('contact.label')}</p>
              <h1 className="heading-display mb-8">
                {t('contact.title')} <span className="text-primary">{t('contact.titleHighlight')}</span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                {t('contact.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={onBookDemo}>
                  {t('common.bookDemo')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <a
                  href="mailto:info@microhabitat.com"
                  className="btn-outline"
                >
                  {t('contact.emailUs')}
                </a>
              </div>
            </div>
            <div className="aspect-video rounded-md overflow-hidden">
              <img
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg"
                alt={t('contact.imageAlt')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Contact Methods */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="card-minimal p-8 text-center">
              <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">{t('contact.methods.email')}</h3>
              <a
                href="mailto:info@microhabitat.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                info@microhabitat.com
              </a>
            </div>
            <div className="card-minimal p-8 text-center">
              <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">{t('contact.methods.phone')}</h3>
              <a
                href="tel:+15141234567"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                +1 (514) 123-4567
              </a>
            </div>
            <div className="card-minimal p-8 text-center">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">{t('contact.methods.locations')}</h3>
              <p className="text-muted-foreground">
                {t('contact.methods.locationsDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Offices Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{t('contact.offices.label')}</p>
          <h2 className="heading-section mb-12">
            {t('contact.offices.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="card-minimal bg-card p-8">
                <h3 className="text-2xl font-medium mb-1">{office.city}</h3>
                <p className="text-primary text-sm mb-4">{office.type}</p>
                <div className="space-y-2 text-muted-foreground">
                  <p>{office.address}</p>
                  <p>{office.city}, {office.region}</p>
                  <p>{office.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Contact Form Placeholder */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <p className="label mb-4">{t('contact.form.label')}</p>
            <h2 className="heading-section mb-6">
              {t('contact.form.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('contact.form.description')}
            </p>
          </div>
          <div className="card-minimal p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    {t('form.firstName')}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    {t('form.lastName')}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  {t('form.company')}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label htmlFor="interest" className="block text-sm font-medium mb-2">
                  {t('contact.form.interest.label')}
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">{t('form.selectOption')}</option>
                  <option value="outdoor-farm">{t('form.outdoorFarm')}</option>
                  <option value="indoor-farm">{t('form.indoorFarm')}</option>
                  <option value="educational">{t('form.educational')}</option>
                  <option value="partnership">{t('contact.form.interest.partnership')}</option>
                  <option value="other">{t('contact.form.interest.other')}</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder={t('form.tellUsAboutProject')}
                />
              </div>
              <Button type="submit" className="w-full">
                {t('contact.form.sendMessage')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Quick Links */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-medium mb-4">{t('contact.quickLinks.ready.title')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('contact.quickLinks.ready.description')}
              </p>
              <Button onClick={onBookDemo} variant="outline">
                {t('common.bookDemo')}
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-4">{t('contact.quickLinks.questions.title')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('contact.quickLinks.questions.description')}
              </p>
              <Link to={localePath("/faq")} className="btn-outline inline-block">
                {t('contact.quickLinks.questions.viewFaq')}
              </Link>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-4">{t('contact.quickLinks.explore.title')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('contact.quickLinks.explore.description')}
              </p>
              <Link to={localePath("/cities")} className="btn-outline inline-block">
                {t('contact.quickLinks.explore.viewCities')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
