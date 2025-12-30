/**
 * SEO Utilities for Microhabitat
 *
 * This module provides utilities for SEO optimization including:
 * - Meta tag length validation and truncation
 * - Structured data helpers
 * - URL utilities
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';

// SEO Constants
export const SEO_LIMITS = {
  TITLE_MAX: 60,
  TITLE_MIN: 30,
  DESCRIPTION_MAX: 160,
  DESCRIPTION_MIN: 70,
  KEYWORDS_MAX: 10,
} as const;

/**
 * Truncate a string to a maximum length, adding ellipsis if needed
 * Tries to break at word boundaries
 */
export function truncateText(text: string, maxLength: number, ellipsis = '...'): string {
  if (!text || text.length <= maxLength) {
    return text;
  }

  const truncateAt = maxLength - ellipsis.length;
  const truncated = text.slice(0, truncateAt);

  // Try to break at a word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > truncateAt * 0.7) {
    return truncated.slice(0, lastSpace) + ellipsis;
  }

  return truncated + ellipsis;
}

/**
 * Validate and optionally fix a meta title
 * Returns the title truncated to max length if needed
 */
export function validateMetaTitle(title: string): {
  value: string;
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  let value = title.trim();

  if (value.length < SEO_LIMITS.TITLE_MIN) {
    warnings.push(`Title is too short (${value.length}/${SEO_LIMITS.TITLE_MIN} chars minimum)`);
  }

  if (value.length > SEO_LIMITS.TITLE_MAX) {
    warnings.push(`Title truncated from ${value.length} to ${SEO_LIMITS.TITLE_MAX} chars`);
    value = truncateText(value, SEO_LIMITS.TITLE_MAX);
  }

  return {
    value,
    isValid: warnings.length === 0,
    warnings,
  };
}

/**
 * Validate and optionally fix a meta description
 * Returns the description truncated to max length if needed
 */
export function validateMetaDescription(description: string): {
  value: string;
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  let value = description.trim();

  if (value.length < SEO_LIMITS.DESCRIPTION_MIN) {
    warnings.push(`Description is too short (${value.length}/${SEO_LIMITS.DESCRIPTION_MIN} chars minimum)`);
  }

  if (value.length > SEO_LIMITS.DESCRIPTION_MAX) {
    warnings.push(`Description truncated from ${value.length} to ${SEO_LIMITS.DESCRIPTION_MAX} chars`);
    value = truncateText(value, SEO_LIMITS.DESCRIPTION_MAX);
  }

  return {
    value,
    isValid: warnings.length === 0,
    warnings,
  };
}

/**
 * Process and validate SEO data from CMS
 * Ensures all values are within SEO best practice limits
 */
export function processSEOData(seo: {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogImage?: string;
  twitterImage?: string;
  canonical?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}): {
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  ogImage?: string;
  twitterImage?: string;
  canonical?: string;
  noIndex: boolean;
  noFollow: boolean;
} {
  const titleResult = validateMetaTitle(seo.metaTitle || '');
  const descResult = validateMetaDescription(seo.metaDescription || '');

  // Process keywords - limit to max count and trim whitespace
  let keywords: string[] | undefined;
  if (seo.keywords) {
    keywords = seo.keywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0)
      .slice(0, SEO_LIMITS.KEYWORDS_MAX);
  }

  return {
    metaTitle: titleResult.value,
    metaDescription: descResult.value,
    keywords,
    ogImage: seo.ogImage,
    twitterImage: seo.twitterImage,
    canonical: seo.canonical,
    noIndex: seo.noIndex ?? false,
    noFollow: seo.noFollow ?? false,
  };
}

/**
 * Generate canonical URL for a page
 */
export function generateCanonicalUrl(
  path: string,
  locale: string = 'en'
): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  if (locale === 'en') {
    return `${BASE_URL}${cleanPath}`;
  }

  return `${BASE_URL}/${locale}${cleanPath}`;
}

/**
 * Generate OG image URL
 * Supports dynamic OG image generation via API route
 */
export function generateOGImageUrl(
  title: string,
  options?: {
    subtitle?: string;
    type?: 'page' | 'city' | 'blog';
    locale?: string;
  }
): string {
  const params = new URLSearchParams({
    title: truncateText(title, 50),
  });

  if (options?.subtitle) {
    params.set('subtitle', truncateText(options.subtitle, 80));
  }
  if (options?.type) {
    params.set('type', options.type);
  }
  if (options?.locale) {
    params.set('locale', options.locale);
  }

  return `${BASE_URL}/api/og?${params.toString()}`;
}

/**
 * Build breadcrumb items for structured data
 */
export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function buildBreadcrumbs(
  items: Array<{ name: string; path?: string }>,
  locale: string = 'en'
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: locale === 'en' ? BASE_URL : `${BASE_URL}/${locale}` },
  ];

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    breadcrumbs.push({
      name: item.name,
      // Don't include URL for last item (current page)
      url: isLast ? undefined : item.path
        ? (locale === 'en' ? `${BASE_URL}${item.path}` : `${BASE_URL}/${locale}${item.path}`)
        : undefined,
    });
  });

  return breadcrumbs;
}

/**
 * Get current date in ISO format for dateModified
 */
export function getCurrentISODate(): string {
  return new Date().toISOString();
}

/**
 * Format date for structured data
 */
export function formatDateForSchema(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString();
}
