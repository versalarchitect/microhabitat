// Translations index - combines all locale files
import { en } from './en';
import { fr } from './fr';
import { de } from './de';
import { nl } from './nl';
import { it } from './it';
import { es } from './es';

export type Locale = 'en' | 'fr' | 'de' | 'nl' | 'it' | 'es';

export const translations: Record<Locale, Record<string, string>> = {
  en,
  fr,
  de,
  nl,
  it,
  es,
};

// ============================================================
// LOCALIZED URL SLUGS
// ============================================================
// Maps English slugs to localized versions for SEO-friendly URLs
export const slugs: Record<Locale, Record<string, string>> = {
  en: {
    'about': 'about',
    'cities': 'cities',
    'careers': 'careers',
    'partnerships': 'partnerships',
    'community-engagement': 'community-engagement',
    'outdoor-farm': 'outdoor-farm',
    'indoor-farm': 'indoor-farm',
    'educational-activities': 'educational-activities',
    'contact': 'contact',
    'faq': 'faq',
    'blog': 'blog',
    'commercial-real-estate': 'commercial-real-estate',
    'corporations': 'corporations',
    'schools': 'schools',
    'privacy-policy': 'privacy-policy',
    'terms-of-service': 'terms-of-service',
    'cookie-policy': 'cookie-policy',
  },
  fr: {
    'about': 'a-propos',
    'cities': 'villes',
    'careers': 'carrieres',
    'partnerships': 'partenariats',
    'community-engagement': 'engagement-communautaire',
    'outdoor-farm': 'ferme-exterieure',
    'indoor-farm': 'ferme-interieure',
    'educational-activities': 'activites-educatives',
    'contact': 'contact',
    'faq': 'faq',
    'blog': 'blogue',
    'commercial-real-estate': 'immobilier-commercial',
    'corporations': 'entreprises',
    'schools': 'ecoles',
    'privacy-policy': 'politique-confidentialite',
    'terms-of-service': 'conditions-utilisation',
    'cookie-policy': 'politique-cookies',
  },
  de: {
    'about': 'ueber-uns',
    'cities': 'staedte',
    'careers': 'karriere',
    'partnerships': 'partnerschaften',
    'community-engagement': 'gemeinschaftliches-engagement',
    'outdoor-farm': 'outdoor-farm',
    'indoor-farm': 'indoor-farm',
    'educational-activities': 'bildungsaktivitaeten',
    'contact': 'kontakt',
    'faq': 'faq',
    'blog': 'blog',
    'commercial-real-estate': 'gewerbeimmobilien',
    'corporations': 'unternehmen',
    'schools': 'schulen',
    'privacy-policy': 'datenschutz',
    'terms-of-service': 'nutzungsbedingungen',
    'cookie-policy': 'cookie-richtlinie',
  },
  nl: {
    'about': 'over-ons',
    'cities': 'steden',
    'careers': 'carriere',
    'partnerships': 'partnerschappen',
    'community-engagement': 'community-betrokkenheid',
    'outdoor-farm': 'outdoor-boerderij',
    'indoor-farm': 'indoor-boerderij',
    'educational-activities': 'educatieve-activiteiten',
    'contact': 'contact',
    'faq': 'faq',
    'blog': 'blog',
    'commercial-real-estate': 'commercieel-vastgoed',
    'corporations': 'bedrijven',
    'schools': 'scholen',
    'privacy-policy': 'privacybeleid',
    'terms-of-service': 'algemene-voorwaarden',
    'cookie-policy': 'cookiebeleid',
  },
  it: {
    'about': 'chi-siamo',
    'cities': 'citta',
    'careers': 'carriere',
    'partnerships': 'partnership',
    'community-engagement': 'impegno-comunitario',
    'outdoor-farm': 'fattoria-esterna',
    'indoor-farm': 'fattoria-interna',
    'educational-activities': 'attivita-educative',
    'contact': 'contatto',
    'faq': 'faq',
    'blog': 'blog',
    'commercial-real-estate': 'immobiliare-commerciale',
    'corporations': 'aziende',
    'schools': 'scuole',
    'privacy-policy': 'informativa-privacy',
    'terms-of-service': 'termini-servizio',
    'cookie-policy': 'politica-cookie',
  },
  es: {
    'about': 'sobre-nosotros',
    'cities': 'ciudades',
    'careers': 'carreras',
    'partnerships': 'colaboraciones',
    'community-engagement': 'participacion-comunitaria',
    'outdoor-farm': 'granja-exterior',
    'indoor-farm': 'granja-interior',
    'educational-activities': 'actividades-educativas',
    'contact': 'contacto',
    'faq': 'faq',
    'blog': 'blog',
    'commercial-real-estate': 'inmobiliaria-comercial',
    'corporations': 'empresas',
    'schools': 'escuelas',
    'privacy-policy': 'politica-privacidad',
    'terms-of-service': 'terminos-servicio',
    'cookie-policy': 'politica-cookies',
  },
};

// Reverse mapping: localized slug → English slug
export function getCanonicalSlug(localizedSlug: string, locale: Locale): string {
  const localeSlugMap = slugs[locale];
  for (const [canonical, localized] of Object.entries(localeSlugMap)) {
    if (localized === localizedSlug) {
      return canonical;
    }
  }
  return localizedSlug;
}

// Get localized slug from canonical English slug
export function getLocalizedSlug(canonicalSlug: string, locale: Locale): string {
  return slugs[locale][canonicalSlug] || canonicalSlug;
}
