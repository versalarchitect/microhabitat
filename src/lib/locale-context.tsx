import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations, getLocalizedSlug, getCanonicalSlug, type Locale } from './translations/index';

export type { Locale };
export { getCanonicalSlug, getLocalizedSlug };

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  localePath: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Supported non-English locales
  const supportedLocales = ['fr', 'de', 'nl', 'it', 'es'];

  // Extract locale from URL path
  const locale = useMemo<Locale>(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const firstPart = pathParts[0];
    if (supportedLocales.includes(firstPart)) {
      return firstPart as Locale;
    }
    return 'en';
  }, [location.pathname]);

  // Navigate to a new locale with translated slugs
  const setLocale = (newLocale: Locale) => {
    const pathParts = location.pathname.split('/').filter(Boolean);

    // Remove existing locale prefix if present
    if (supportedLocales.includes(pathParts[0]) || pathParts[0] === 'en') {
      pathParts.shift();
    }

    // Convert current localized slugs to canonical (English) slugs first
    const canonicalParts = pathParts.map(part => getCanonicalSlug(part, locale));

    // Then convert canonical slugs to the new locale's slugs
    const translatedParts = canonicalParts.map(part => getLocalizedSlug(part, newLocale));

    // Build new path - English is default (no prefix), others have prefix
    let newPath: string;
    if (newLocale === 'en') {
      newPath = '/' + translatedParts.join('/');
    } else {
      newPath = `/${newLocale}/` + translatedParts.join('/');
    }

    // Ensure path ends correctly
    if (newPath !== '/' && newPath.endsWith('/')) {
      newPath = newPath.slice(0, -1);
    }
    if (newPath === '') {
      newPath = '/';
    }

    navigate(newPath);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[locale][key] || key;
  };

  // Helper to build locale-aware paths with translated slugs
  const localePath = (path: string): string => {
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
  };

  const value = useMemo(
    () => ({ locale, setLocale, t, localePath }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

// Export for use in strapi.ts
export function getLocaleFromPath(pathname: string): Locale {
  const pathParts = pathname.split('/').filter(Boolean);
  const firstPart = pathParts[0];
  const supportedLocales = ['fr', 'de', 'nl', 'it', 'es'];
  if (supportedLocales.includes(firstPart)) {
    return firstPart as Locale;
  }
  return 'en';
}
