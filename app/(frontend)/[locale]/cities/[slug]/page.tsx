import type { Metadata } from "next";
import {
  type Locale,
  locales,
  ogLocales,
  getTranslations,
} from "@/lib/i18n";
import { getCitySEO, getCityBySlug } from "@/lib/cms";
import { PageStructuredData, CityLocalBusinessJsonLd } from "@/components/JsonLd";
import { CityDetailClient, type CityData } from "./CityDetailClient";
import {
  ALL_CITY_SLUGS,
  getCityFallback,
} from "@/lib/data/city-fallback-data";

// ============================================
// TYPES
// ============================================

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// ============================================
// STATIC GENERATION
// ============================================

/**
 * Generate static params for all city/locale combinations
 * Uses fallback data as source of truth for available cities
 */
export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const slug of ALL_CITY_SLUGS) {
      params.push({ locale, slug });
    }
  }

  return params;
}

// ============================================
// DATA FETCHING
// ============================================

/**
 * Fetch city data from CMS with fallback support
 * Returns normalized CityData or null if not found
 */
async function getCityData(
  slug: string,
  locale: Locale
): Promise<CityData | null> {
  try {
    // Attempt to fetch from CMS
    const cmsCity = await getCityBySlug(slug, locale);

    if (cmsCity) {
      // Normalize CMS data to component interface
      return {
        name: cmsCity.name,
        country: cmsCity.country,
        region: cmsCity.region,
        regionName: cmsCity.regionName || "",
        slug: cmsCity.slug || slug,
        description: cmsCity.description || "",
        highlights: cmsCity.highlights || [],
        image: cmsCity.image,
      };
    }
  } catch (error) {
    console.warn(`[CityDetail] CMS fetch failed for ${slug}:`, error);
  }

  // Fall back to static data
  const fallback = getCityFallback(slug);
  return fallback;
}

/**
 * Format city name from slug for display
 */
function formatCityName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// ============================================
// METADATA
// ============================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;

  const [citySeo, cityData] = await Promise.all([
    getCitySEO(slug, typedLocale),
    getCityData(slug, typedLocale),
  ]);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.microhabitat.com";
  const canonicalUrl =
    locale === "en"
      ? `${siteUrl}/cities/${slug}`
      : `${siteUrl}/${locale}/cities/${slug}`;

  const cityName = cityData?.name || formatCityName(slug);
  const title =
    citySeo?.metaTitle || `Urban Farming in ${cityName} | Microhabitat`;
  const description =
    citySeo?.metaDescription ||
    cityData?.description ||
    `Discover MicroHabitat's urban farming solutions in ${cityName}. Rooftop farms, community gardens, and sustainable agriculture programs.`;

  return {
    title,
    description,
    keywords: citySeo?.keywords?.split(",").map((k) => k.trim()),
    alternates: {
      canonical: citySeo?.canonical || canonicalUrl,
      languages: {
        en: `${siteUrl}/cities/${slug}`,
        fr: `${siteUrl}/fr/villes/${slug}`,
        de: `${siteUrl}/de/staedte/${slug}`,
        nl: `${siteUrl}/nl/steden/${slug}`,
        it: `${siteUrl}/it/citta/${slug}`,
        es: `${siteUrl}/es/ciudades/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Microhabitat",
      locale: ogLocales[typedLocale] || "en_CA",
      type: "website",
      images: citySeo?.ogImage
        ? [{ url: citySeo.ogImage, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: citySeo?.twitterImage ? [citySeo.twitterImage] : undefined,
    },
    robots: {
      index: !citySeo?.noIndex,
      follow: !citySeo?.noFollow,
    },
  };
}

// ============================================
// PAGE COMPONENT
// ============================================

export default async function CityDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;

  // Parallel data fetching
  const [translations, cityData] = await Promise.all([
    Promise.resolve(getTranslations(typedLocale)),
    getCityData(slug, typedLocale),
  ]);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.microhabitat.com";
  const pageUrl =
    locale === "en" ? `/cities/${slug}` : `/${locale}/cities/${slug}`;

  const cityName = cityData?.name || formatCityName(slug);
  const cityDescription =
    cityData?.description ||
    `Microhabitat urban farming services in ${cityName}. We transform rooftops and outdoor spaces into thriving urban farms.`;

  return (
    <>
      <PageStructuredData
        page={{
          url: pageUrl,
          name: `Urban Farming in ${cityName} | Microhabitat`,
          description: cityDescription,
          locale: locale,
        }}
        breadcrumbs={[
          {
            name: "Home",
            url: locale === "en" ? siteUrl : `${siteUrl}/${locale}`,
          },
          {
            name: "Cities",
            url:
              locale === "en" ? `${siteUrl}/cities` : `${siteUrl}/${locale}/cities`,
          },
          { name: cityName },
        ]}
      />
      <CityLocalBusinessJsonLd
        city={{
          slug,
          name: cityName,
          description: cityDescription,
          locale,
        }}
      />
      <CityDetailClient
        locale={typedLocale}
        city={cityData}
        translations={translations}
      />
    </>
  );
}
