import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Supported locales
export const locales = ['en', 'fr', 'de', 'nl', 'it', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// Localized slug mappings (English slug → localized slug per locale)
const slugs: Record<Locale, Record<string, string>> = {
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
    'roi-calculator': 'roi-calculator',
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
    'roi-calculator': 'calculateur-roi',
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
    'roi-calculator': 'roi-rechner',
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
    'roi-calculator': 'roi-calculator',
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
    'roi-calculator': 'calcolatore-roi',
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
    'roi-calculator': 'calculadora-roi',
  },
};

// Get canonical (English) slug from localized slug
function getCanonicalSlug(localizedSlug: string, locale: Locale): string {
  const localeSlugMap = slugs[locale];
  for (const [canonical, localized] of Object.entries(localeSlugMap)) {
    if (localized === localizedSlug) {
      return canonical;
    }
  }
  return localizedSlug;
}

// Check if the pathname starts with a locale
function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  return null;
}

// Get preferred locale from Accept-Language header
function getPreferredLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = 'q=1'] = lang.trim().split(';');
      return {
        code: code.split('-')[0].toLowerCase(),
        quality: parseFloat(q.replace('q=', '')) || 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  // Find first matching locale
  for (const { code } of languages) {
    if (locales.includes(code as Locale)) {
      return code as Locale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') || // Files with extensions (images, etc.)
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  const pathnameLocale = getLocaleFromPathname(pathname);

  // If URL has a locale prefix, handle localized slug rewriting
  if (pathnameLocale) {
    const segments = pathname.split('/').filter(Boolean);
    // segments[0] is locale, segments[1] is the page slug
    if (segments.length > 1) {
      const localizedSlug = segments[1];
      const canonicalSlug = getCanonicalSlug(localizedSlug, pathnameLocale);

      // If the slug was localized, rewrite to canonical path
      if (canonicalSlug !== localizedSlug) {
        const remainingPath = segments.slice(2).join('/');
        const canonicalPath = `/${pathnameLocale}/${canonicalSlug}${remainingPath ? '/' + remainingPath : ''}`;
        const newUrl = new URL(canonicalPath, request.url);
        return NextResponse.rewrite(newUrl);
      }
    }
    return NextResponse.next();
  }

  // For English (default locale), don't redirect - just rewrite internally
  // This keeps URLs clean: /about instead of /en/about
  const locale = defaultLocale; // Always use default for non-prefixed URLs

  // Rewrite the request to include the locale internally
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.rewrite(newUrl);
}

export const config = {
  // Match all paths except static files
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
};
