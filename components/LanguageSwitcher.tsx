"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Locale, locales, getCanonicalSlug, getLocalizedSlug } from '@/lib/i18n';

const languages: { code: Locale; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'nl', label: 'NL', name: 'Nederlands' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'es', label: 'ES', name: 'Español' },
];

interface LanguageSwitcherProps {
  locale: Locale;
  className?: string;
  popUp?: boolean;
}

export function LanguageSwitcher({ locale, className, popUp = false }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const switchLocale = (newLocale: Locale) => {
    // Get current path without locale prefix
    let pathWithoutLocale = pathname;
    for (const loc of locales) {
      if (pathname.startsWith(`/${loc}/`)) {
        pathWithoutLocale = pathname.substring(loc.length + 1);
        break;
      } else if (pathname === `/${loc}`) {
        pathWithoutLocale = '/';
        break;
      }
    }

    // Convert current localized slugs to canonical, then to new locale's slugs
    const pathParts = pathWithoutLocale.split('/').filter(Boolean);
    const canonicalParts = pathParts.map(part => getCanonicalSlug(part, locale));
    const newLocaleParts = canonicalParts.map(part => getLocalizedSlug(part, newLocale));

    let newPath: string;
    if (newLocale === 'en') {
      newPath = '/' + newLocaleParts.join('/') || '/';
    } else {
      newPath = `/${newLocale}${newLocaleParts.length > 0 ? '/' + newLocaleParts.join('/') : ''}`;
    }

    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4" />
        <span>{currentLanguage.label}</span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown menu */}
          <div
            className={cn(
              "absolute right-0 z-50 min-w-[180px] bg-card border border-border rounded-md shadow-lg py-1",
              popUp ? "bottom-full mb-2" : "top-full mt-2"
            )}
            role="listbox"
            aria-label="Select language"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={locale === lang.code}
                onClick={() => switchLocale(lang.code)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors",
                  locale === lang.code
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <span className="flex items-center gap-3">
                  <span className="font-medium w-6">{lang.label}</span>
                  <span>{lang.name}</span>
                </span>
                {locale === lang.code && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
