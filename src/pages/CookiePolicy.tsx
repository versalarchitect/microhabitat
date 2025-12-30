import { useQuery } from "@tanstack/react-query";
import { SEO } from "../components/SEO";
import { useLocale } from "../lib/locale-context";
import { getPageSEO, queryKeys } from "../lib/strapi";

export function CookiePolicy() {
  const { t, locale } = useLocale();

  const { data: seo } = useQuery({
    queryKey: queryKeys.pageSEO('cookie-policy', locale),
    queryFn: () => getPageSEO('cookie-policy', locale),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <SEO
        title={seo?.metaTitle || t('cookies.title')}
        description={seo?.metaDescription || t('cookies.intro')}
        canonical={seo?.canonical}
        ogImage={seo?.ogImage}
        twitterImage={seo?.twitterImage}
        keywords={seo?.keywords?.split(',').map(k => k.trim())}
        noIndex={seo?.noIndex ?? true}
        noFollow={seo?.noFollow}
      />

      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <p className="label mb-6">{t('cookies.label')}</p>
          <h1 className="heading-display mb-8">{t('cookies.title')}</h1>

          <div className="prose prose-lg text-muted-foreground space-y-6">
            <p className="text-lg">
              {t('common.lastUpdated')} {new Date().toLocaleDateString(locale === 'en' ? 'en-US' : locale, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <p>
              {t('cookies.intro')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('cookies.section.what')}
            </h2>
            <p>
              {t('cookies.what.description')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('cookies.section.use')}
            </h2>
            <p>
              {t('cookies.use.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>{t('cookies.use.essential.title')}</strong> {t('cookies.use.essential.description')}
              </li>
              <li>
                <strong>{t('cookies.use.analytics.title')}</strong> {t('cookies.use.analytics.description')}
              </li>
              <li>
                <strong>{t('cookies.use.functional.title')}</strong> {t('cookies.use.functional.description')}
              </li>
            </ul>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('cookies.section.thirdParty')}
            </h2>
            <p>
              {t('cookies.thirdParty.description')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('cookies.section.managing')}
            </h2>
            <p>
              {t('cookies.managing.description1')}
            </p>
            <p>
              {t('cookies.managing.description2')}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('cookies.section.changes')}
            </h2>
            <p>
              {t('cookies.changes.description')}
            </p>

            <h2 className="text-2xl font-medium text-foreground mt-8 mb-4">
              {t('cookies.section.contact')}
            </h2>
            <p>
              {t('cookies.contact.description')}{" "}
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
