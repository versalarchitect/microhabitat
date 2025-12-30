"use client";

import Link from "next/link";
import { type Locale, getLocalePath } from "@/lib/i18n";

interface TermsOfServiceClientProps {
  locale: Locale;
  translations: Record<string, string>;
}

export function TermsOfServiceClient({ locale, translations }: TermsOfServiceClientProps) {
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <p className="label mb-6">{t('terms.label')}</p>
          <h1 className="heading-display mb-8">{t('terms.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('terms.intro')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* Acceptance of Terms */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('terms.section.acceptance')}</h2>
          <p className="text-muted-foreground">
            {t('terms.acceptance.description')}{' '}
            <Link href={localePath("/privacy-policy")} className="text-primary hover:underline">
              {t('footer.privacyPolicy')}
            </Link>.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* Use of Services */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('terms.section.use')}</h2>
          <p className="text-muted-foreground mb-4">{t('terms.use.description')}</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>{t('terms.use.item1')}</li>
            <li>{t('terms.use.item2')}</li>
            <li>{t('terms.use.item3')}</li>
            <li>{t('terms.use.item4')}</li>
            <li>{t('terms.use.item5')}</li>
          </ul>
        </div>
      </section>

      <div className="divider" />

      {/* Intellectual Property */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('terms.section.ip')}</h2>
          <p className="text-muted-foreground">{t('terms.ip.description')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* Service Availability */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('terms.section.availability')}</h2>
          <p className="text-muted-foreground">{t('terms.availability.description')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* Limitation of Liability */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('terms.section.liability')}</h2>
          <p className="text-muted-foreground">{t('terms.liability.description')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* Indemnification */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('terms.section.indemnification')}</h2>
          <p className="text-muted-foreground">{t('terms.indemnification.description')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* Governing Law */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('terms.section.governing')}</h2>
          <p className="text-muted-foreground">{t('terms.governing.description')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* Changes to Terms */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('terms.section.changes')}</h2>
          <p className="text-muted-foreground">{t('terms.changes.description')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* Contact Us */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('terms.section.contact')}</h2>
          <p className="text-muted-foreground">
            {t('terms.contact.description')}{' '}
            <a href="mailto:info@microhabitat.com" className="text-primary hover:underline">
              info@microhabitat.com
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}
