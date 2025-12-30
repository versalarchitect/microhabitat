// i18n utilities for Next.js App Router
import { translations, slugs, getCanonicalSlug, getLocalizedSlug } from './translations/index';

export type Locale = 'en' | 'fr' | 'de' | 'nl' | 'it' | 'es';
export const locales: Locale[] = ['en', 'fr', 'de', 'nl', 'it', 'es'];
export const defaultLocale: Locale = 'en';

// Re-export slug utilities
export { getCanonicalSlug, getLocalizedSlug, slugs };

// Get translations for a locale
export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en;
}

// Translation function factory
export function createTranslator(locale: Locale) {
  const t = translations[locale] || translations.en;
  return (key: string): string => t[key] || key;
}

// Build locale-aware path
export function getLocalePath(path: string, locale: Locale): string {
  if (path === '/') {
    return locale === 'en' ? '/' : `/${locale}`;
  }

  // Extract the slug from the path (e.g., '/about' -> 'about')
  const pathParts = path.split('/').filter(Boolean);
  const translatedParts = pathParts.map(part => getLocalizedSlug(part, locale));
  const translatedPath = '/' + translatedParts.join('/');

  if (locale === 'en') {
    return translatedPath;
  }
  return `/${locale}${translatedPath}`;
}

// Get alternate links for SEO (hreflang)
export function getAlternateLinks(path: string, currentLocale: Locale) {
  const canonicalPath = path.split('/').filter(Boolean).map(part => getCanonicalSlug(part, currentLocale)).join('/');

  return locales.map(locale => ({
    hrefLang: locale === 'en' ? 'x-default' : locale,
    href: getLocalePath(`/${canonicalPath}`, locale),
  }));
}

// Locale display names
export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  nl: 'Nederlands',
  it: 'Italiano',
  es: 'Español',
};

// OpenGraph locale codes
export const ogLocales: Record<Locale, string> = {
  en: 'en_CA',
  fr: 'fr_CA',
  de: 'de_DE',
  nl: 'nl_NL',
  it: 'it_IT',
  es: 'es_ES',
};
