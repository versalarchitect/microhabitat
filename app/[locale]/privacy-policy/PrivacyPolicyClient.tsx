"use client";

import Link from "next/link";
import { type Locale, getLocalePath } from "@/lib/i18n";

interface PrivacyPolicyClientProps {
  locale: Locale;
  translations: Record<string, string>;
}

export function PrivacyPolicyClient({ locale, translations }: PrivacyPolicyClientProps) {
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <p className="label mb-6">{t('privacy.label')}</p>
          <h1 className="heading-display mb-8">{t('privacy.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('privacy.intro')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* Information We Collect */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('privacy.section.collect')}</h2>
          <p className="text-muted-foreground mb-4">{t('privacy.collect.description')}</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>{t('privacy.collect.item1')}</li>
            <li>{t('privacy.collect.item2')}</li>
            <li>{t('privacy.collect.item3')}</li>
            <li>{t('privacy.collect.item4')}</li>
            <li>{t('privacy.collect.item5')}</li>
          </ul>
        </div>
      </section>

      <div className="divider" />

      {/* How We Use Your Information */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('privacy.section.use')}</h2>
          <p className="text-muted-foreground mb-4">{t('privacy.use.description')}</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>{t('privacy.use.item1')}</li>
            <li>{t('privacy.use.item2')}</li>
            <li>{t('privacy.use.item3')}</li>
            <li>{t('privacy.use.item4')}</li>
            <li>{t('privacy.use.item5')}</li>
          </ul>
        </div>
      </section>

      <div className="divider" />

      {/* Information Sharing */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('privacy.section.sharing')}</h2>
          <p className="text-muted-foreground">{t('privacy.sharing.description')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* Data Security */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('privacy.section.security')}</h2>
          <p className="text-muted-foreground">{t('privacy.security.description')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* Your Rights */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('privacy.section.rights')}</h2>
          <p className="text-muted-foreground mb-4">{t('privacy.rights.description')}</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>{t('privacy.rights.item1')}</li>
            <li>{t('privacy.rights.item2')}</li>
            <li>{t('privacy.rights.item3')}</li>
            <li>{t('privacy.rights.item4')}</li>
            <li>{t('privacy.rights.item5')}</li>
          </ul>
        </div>
      </section>

      <div className="divider" />

      {/* Cookies */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('privacy.section.cookies')}</h2>
          <p className="text-muted-foreground">
            {t('privacy.cookies.description')}{' '}
            <Link href={localePath("/cookie-policy")} className="text-primary hover:underline">
              {t('footer.cookiePolicy')}
            </Link>.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* Changes to This Policy */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('privacy.section.changes')}</h2>
          <p className="text-muted-foreground">{t('privacy.changes.description')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* Contact Us */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('privacy.section.contact')}</h2>
          <p className="text-muted-foreground">
            {t('privacy.contact.description')}{' '}
            <a href="mailto:info@microhabitat.com" className="text-primary hover:underline">
              info@microhabitat.com
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}
