import { useState } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLocale, type Locale } from '../lib/locale-context';
import { cn } from '../lib/utils';

const languages: { code: Locale; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'nl', label: 'NL', name: 'Nederlands' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'es', label: 'ES', name: 'Español' },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

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
            className="absolute right-0 top-full mt-2 z-50 min-w-[180px] bg-card border border-border rounded-md shadow-lg py-1"
            role="listbox"
            aria-label="Select language"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={locale === lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
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
