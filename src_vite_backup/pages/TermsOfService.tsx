import { useQuery } from "@tanstack/react-query";
import { SEO } from "../components/SEO";
import { useLocale } from "../lib/locale-context";
import { getPageSEO, queryKeys } from "../lib/strapi";

export function TermsOfService() {
  const { t, locale } = useLocale();

  const { data: seo } = useQuery({
    queryKey: queryKeys.pageSEO('terms-of-service', locale),
    queryFn: () => getPageSEO('terms-of-service', locale),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <SEO
        title={seo?.metaTitle || t('terms.title')}
        description={seo?.metaDescription || t('terms.intro')}
        canonical={seo?.canonical}
        ogImage={seo?.ogImage}
        twitterImage={seo?.twitterImage}
        keywords={seo?.keywords?.split(',').map(k => k.trim())}
        noIndex={seo?.noIndex ?? true}
        noFollow={seo?.noFollow}
      />

      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <p className="label mb-6">{t('terms.label')}</p>
          <h1 className="heading-display mb-8">{t('terms.title')}</h1>

          <div className="prose prose-lg text-muted-foreground space-y-6">
            <p className="text-lg">
              {t('common.lastUpdated')} {new Date().toLocaleDateString(locale === 'en' ? 'en-US' : locale, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <p>
              {t('terms.intro')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('terms.section.acceptance')}
            </h2>
            <p>
              {t('terms.acceptance.description')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('terms.section.use')}
            </h2>
            <p>
              {t('terms.use.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('terms.use.item1')}</li>
              <li>{t('terms.use.item2')}</li>
              <li>{t('terms.use.item3')}</li>
              <li>{t('terms.use.item4')}</li>
              <li>{t('terms.use.item5')}</li>
            </ul>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('terms.section.ip')}
            </h2>
            <p>
              {t('terms.ip.description')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('terms.section.availability')}
            </h2>
            <p>
              {t('terms.availability.description')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('terms.section.liability')}
            </h2>
            <p>
              {t('terms.liability.description')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('terms.section.indemnification')}
            </h2>
            <p>
              {t('terms.indemnification.description')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('terms.section.governing')}
            </h2>
            <p>
              {t('terms.governing.description')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('terms.section.changes')}
            </h2>
            <p>
              {t('terms.changes.description')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('terms.section.contact')}
            </h2>
            <p>
              {t('terms.contact.description')}{" "}
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
