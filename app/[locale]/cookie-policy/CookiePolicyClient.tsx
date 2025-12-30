"use client";

import { type Locale } from "@/lib/i18n";

interface CookiePolicyClientProps {
  locale: Locale;
  translations: Record<string, string>;
}

export function CookiePolicyClient({ translations }: CookiePolicyClientProps) {
  const t = (key: string) => translations[key] || key;

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <p className="label mb-6">{t('cookies.label')}</p>
          <h1 className="heading-display mb-8">{t('cookies.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('cookies.intro')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* What Are Cookies */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('cookies.section.what')}</h2>
          <p className="text-muted-foreground">{t('cookies.what.description')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* How We Use Cookies */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('cookies.section.use')}</h2>
          <p className="text-muted-foreground mb-6">{t('cookies.use.description')}</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">{t('cookies.use.essential.title')}</h3>
              <p className="text-muted-foreground">{t('cookies.use.essential.description')}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">{t('cookies.use.analytics.title')}</h3>
              <p className="text-muted-foreground">{t('cookies.use.analytics.description')}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">{t('cookies.use.functional.title')}</h3>
              <p className="text-muted-foreground">{t('cookies.use.functional.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Third-Party Cookies */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('cookies.section.thirdParty')}</h2>
          <p className="text-muted-foreground">{t('cookies.thirdParty.description')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* Managing Cookies */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('cookies.section.managing')}</h2>
          <p className="text-muted-foreground mb-4">{t('cookies.managing.description1')}</p>
          <p className="text-muted-foreground mb-4">{t('cookies.managing.description2')}</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google Chrome
              </a>
            </li>
            <li>
              <a href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Safari
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Microsoft Edge
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="divider" />

      {/* Changes to This Policy */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('cookies.section.changes')}</h2>
          <p className="text-muted-foreground">{t('cookies.changes.description')}</p>
        </div>
      </section>

      <div className="divider" />

      {/* Contact Us */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-medium mb-6">{t('cookies.section.contact')}</h2>
          <p className="text-muted-foreground">
            {t('cookies.contact.description')}{' '}
            <a href="mailto:info@microhabitat.com" className="text-primary hover:underline">
              info@microhabitat.com
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}
