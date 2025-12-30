import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SEO } from "../components/SEO";
import { useLocale } from "../lib/locale-context";
import { getPageSEO, queryKeys } from "../lib/strapi";

export function PrivacyPolicy() {
  const { t, localePath, locale } = useLocale();

  const { data: seo } = useQuery({
    queryKey: queryKeys.pageSEO('privacy-policy', locale),
    queryFn: () => getPageSEO('privacy-policy', locale),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <SEO
        title={seo?.metaTitle || t('privacy.title')}
        description={seo?.metaDescription || t('privacy.intro')}
        canonical={seo?.canonical}
        ogImage={seo?.ogImage}
        twitterImage={seo?.twitterImage}
        keywords={seo?.keywords?.split(',').map(k => k.trim())}
        noIndex={seo?.noIndex ?? true}
        noFollow={seo?.noFollow}
      />

      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <p className="label mb-6">{t('privacy.label')}</p>
          <h1 className="heading-display mb-8">{t('privacy.title')}</h1>

          <div className="prose prose-lg text-muted-foreground space-y-6">
            <p className="text-lg">
              {t('common.lastUpdated')} {new Date().toLocaleDateString(locale === 'fr' ? 'fr-CA' : locale === 'de' ? 'de-DE' : locale === 'nl' ? 'nl-NL' : locale === 'it' ? 'it-IT' : locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <p>
              {t('privacy.intro')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('privacy.section.collect')}
            </h2>
            <p>
              {t('privacy.collect.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('privacy.collect.item1')}</li>
              <li>{t('privacy.collect.item2')}</li>
              <li>{t('privacy.collect.item3')}</li>
              <li>{t('privacy.collect.item4')}</li>
              <li>{t('privacy.collect.item5')}</li>
            </ul>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('privacy.section.use')}
            </h2>
            <p>
              {t('privacy.use.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('privacy.use.item1')}</li>
              <li>{t('privacy.use.item2')}</li>
              <li>{t('privacy.use.item3')}</li>
              <li>{t('privacy.use.item4')}</li>
              <li>{t('privacy.use.item5')}</li>
            </ul>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('privacy.section.sharing')}
            </h2>
            <p>
              {t('privacy.sharing.description')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('privacy.section.security')}
            </h2>
            <p>
              {t('privacy.security.description')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('privacy.section.rights')}
            </h2>
            <p>
              {t('privacy.rights.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('privacy.rights.item1')}</li>
              <li>{t('privacy.rights.item2')}</li>
              <li>{t('privacy.rights.item3')}</li>
              <li>{t('privacy.rights.item4')}</li>
              <li>{t('privacy.rights.item5')}</li>
            </ul>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('privacy.section.cookies')}
            </h2>
            <p>
              {t('privacy.cookies.description')}{" "}
              <Link to={localePath("/cookies")} className="text-primary hover:underline">
                {t('footer.cookiePolicy')}
              </Link>
              .
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('privacy.section.changes')}
            </h2>
            <p>
              {t('privacy.changes.description')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('privacy.section.contact')}
            </h2>
            <p>
              {t('privacy.contact.description')}{" "}
              <a href="mailto:info@microhabitat.com" className="text-primary hover:underline">
                info@microhabitat.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
