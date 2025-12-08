import { useEffect } from 'react';

/**
 * OG image sizes for all major social media platforms
 * Recommended: Use 'universal' (1200x630) as og:image and twitter:image
 * Platform-specific images are available for maximum optimization
 */
export const OG_IMAGE_SIZES = {
  universal: { width: 1200, height: 630 },
  twitter: { width: 1200, height: 675 },
  twitterSmall: { width: 800, height: 418 },
  linkedin: { width: 1200, height: 627 },
  facebook: { width: 1200, height: 630 },
  whatsapp: { width: 1200, height: 630 },
  slack: { width: 1200, height: 630 },
  discord: { width: 1200, height: 630 },
  pinterest: { width: 1000, height: 1500 },
} as const;

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  /** Path to the OG image (relative to public folder, e.g., /og-images/home-og.jpg) */
  ogImage?: string;
  /** Path to Twitter-specific image if different from ogImage */
  twitterImage?: string;
  /** Type of content - defaults to 'website' */
  ogType?: 'website' | 'article' | 'profile';
  /** Article publish date (ISO 8601 format) */
  articlePublishedTime?: string;
  /** Article author */
  articleAuthor?: string;
  /** Twitter card type - defaults to 'summary_large_image' */
  twitterCard?: 'summary' | 'summary_large_image';
  /** Additional keywords for meta tags */
  keywords?: readonly string[];
  /** Disable indexing for this page */
  noIndex?: boolean;
}

const BASE_URL = 'https://www.microhabitat.com';
const SITE_NAME = 'Microhabitat';
const DEFAULT_OG_IMAGE = '/og-image.png';
const TWITTER_HANDLE = '@microhabitat';

/**
 * SEO Component for managing Open Graph and meta tags
 *
 * This component manages all SEO-related meta tags including:
 * - Standard meta tags (title, description, keywords)
 * - Open Graph tags (Facebook, LinkedIn, WhatsApp, Slack, Discord)
 * - Twitter Card tags
 * - Canonical URLs
 * - Article metadata (for blog posts)
 *
 * Usage:
 * ```tsx
 * <SEO
 *   title="About Us"
 *   description="Learn about MicroHabitat's mission to transform cities through urban agriculture."
 *   ogImage="/og-images/about-og.jpg"
 * />
 * ```
 */
export function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  twitterImage,
  ogType = 'website',
  articlePublishedTime,
  articleAuthor,
  twitterCard = 'summary_large_image',
  keywords = [],
  noIndex = false,
}: SEOProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;
  const twitterImageUrl = twitterImage
    ? twitterImage.startsWith('http')
      ? twitterImage
      : `${BASE_URL}${twitterImage}`
    : ogImageUrl;

  // Default keywords for urban farming
  const defaultKeywords = [
    'urban farming',
    'urban agriculture',
    'rooftop farming',
    'sustainable agriculture',
    'green buildings',
    'ESG',
    'corporate sustainability',
    'food security',
    'MicroHabitat',
  ];

  const allKeywords = [...new Set([...defaultKeywords, ...keywords])];

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to set or update a meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Helper to set or update a link tag
    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);

      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }

      element.setAttribute('href', href);
    };

    // Standard meta tags
    setMeta('description', description);
    setMeta('keywords', allKeywords.join(', '));

    // Robots meta tag
    if (noIndex) {
      setMeta('robots', 'noindex, nofollow');
    } else {
      setMeta('robots', 'index, follow');
    }

    // Canonical URL
    if (canonicalUrl) {
      setLink('canonical', canonicalUrl);
    }

    // Open Graph tags (Facebook, LinkedIn, WhatsApp, Slack, Discord)
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:image', ogImageUrl, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:image:alt', `${title} - ${SITE_NAME}`, true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:locale', 'en_CA', true);

    if (canonicalUrl) {
      setMeta('og:url', canonicalUrl, true);
    }

    // Article-specific Open Graph tags
    if (ogType === 'article') {
      if (articlePublishedTime) {
        setMeta('article:published_time', articlePublishedTime, true);
      }
      if (articleAuthor) {
        setMeta('article:author', articleAuthor, true);
      }
    }

    // Twitter Card tags
    setMeta('twitter:card', twitterCard);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', twitterImageUrl);
    setMeta('twitter:image:alt', `${title} - ${SITE_NAME}`);
    setMeta('twitter:site', TWITTER_HANDLE);
    setMeta('twitter:creator', TWITTER_HANDLE);

    // Cleanup function - remove meta tags when component unmounts
    return () => {
      // We don't remove meta tags on unmount as they should persist
      // during navigation within the SPA
    };
  }, [
    fullTitle,
    description,
    canonicalUrl,
    ogImageUrl,
    twitterImageUrl,
    ogType,
    articlePublishedTime,
    articleAuthor,
    twitterCard,
    noIndex,
    allKeywords,
    title,
  ]);

  // This component doesn't render anything visible
  return null;
}

/**
 * Pre-configured SEO data for all pages
 * Use these with the SEO component for consistency
 */
export const PAGE_SEO = {
  home: {
    title: 'Discover Urban Farming Today',
    description:
      "The world's largest urban farming network. Transform underutilized urban spaces into thriving urban farms that deliver bottom-line results.",
    ogImage: '/og-image.png',
    keywords: ['urban farming', 'urban agriculture', 'turnkey urban farming', 'property amenities', 'tenant engagement'],
  },
  about: {
    title: 'About | Discover Urban Farming Today',
    description:
      "Learn about Microhabitat's mission to transform urban spaces into thriving farms. Discover our story, impact, and the team behind the world's largest urban farming network.",
    ogImage: '/og-image.png',
    keywords: ['urban farming company', 'Montreal', 'sustainable food', 'urban agriculture mission'],
  },
  outdoorFarm: {
    title: 'Outdoor Urban Farming',
    description:
      "Transform outdoor spaces with Microhabitat's urban farming solutions. Expert design, installation, and maintenance for rooftops, patios, and outdoor areas.",
    ogImage: '/og-image.png',
    keywords: ['rooftop farming', 'terrace garden', 'outdoor urban farm', 'rooftop garden'],
  },
  indoorFarm: {
    title: 'Indoor Farming',
    description:
      'An ultra-local farm-to-table experience featuring freshly harvested herbs and lettuces grown right on-site. Vertical hydroponic farming solutions for any space.',
    ogImage: '/og-image.png',
    keywords: ['indoor farming', 'vertical farming', 'hydroponic farming', 'year-round growing'],
  },
  educationalActivities: {
    title: 'Educational Activities | Engage in Sustainable Learning',
    description:
      "Experience urban farming with Microhabitat's educational programs. Garden visits, interactive workshops, and take-home grow kits for schools, teams, and communities.",
    ogImage: '/og-image.png',
    keywords: ['educational activities', 'sustainable learning', 'team building', 'workshops', 'garden visits'],
  },
  commercialRealEstate: {
    title: 'Commercial Real Estate | Discover Commercial Spaces Today',
    description:
      "Urban farming solutions for commercial real estate. Enhance property value, tenant engagement, and green building certifications with Microhabitat's expert services.",
    ogImage: '/og-image.png',
    keywords: ['commercial real estate', 'LEED certification', 'BOMA BEST', 'WELL certification', 'Fitwel', 'property amenities', 'ESG'],
  },
  corporations: {
    title: 'Corporations | Discover Green Spaces Today',
    description:
      'Transform your business with urban agriculture. Custom farming zones, expert maintenance, employee engagement programs, and sustainability initiatives for corporations.',
    ogImage: '/og-image.png',
    keywords: ['corporate sustainability', 'CSR', 'employee engagement', 'workplace wellness', 'corporate urban farming'],
  },
  schools: {
    title: 'Schools | Explore Educational Opportunities Today',
    description:
      'Agricultural practices that reinforce STEM, health, and environmental lessons. A hands-on approach to teaching sustainability and ecological stewardship.',
    ogImage: '/og-image.png',
    keywords: ['school garden', 'environmental education', 'STEM learning', 'sustainability education'],
  },
  careers: {
    title: 'Careers | Explore Careers & Grow Your Future',
    description:
      'Join Microhabitat and grow your career in urban agriculture. Explore exciting opportunities in sustainable farming, community engagement, and urban development.',
    ogImage: '/og-image.png',
    keywords: ['urban farming jobs', 'sustainability careers', 'green jobs', 'agriculture careers'],
  },
  partnerships: {
    title: 'Partnerships | Build Sustainable Collaborations Today',
    description:
      'Partner with Microhabitat to shape a sustainable future. Join leading organizations in supporting food security, community engagement, and urban agriculture initiatives.',
    ogImage: '/og-image.png',
    keywords: ['partner', 'collaboration', 'sustainable partnership', 'food security'],
  },
  communityEngagement: {
    title: 'Community Engagement | Enhance Community Connections Today',
    description:
      'Discover how Microhabitat cultivates community through urban farming. Hands-on workshops, inclusive programming, educational activities, and food bank partnerships.',
    ogImage: '/og-image.png',
    keywords: ['community garden', 'food bank', 'social impact', 'community engagement', 'inclusive programming'],
  },
  cities: {
    title: 'MicroHabitat Cities | Growing Internationally',
    description:
      "Explore Microhabitat's urban farming network across 20+ cities in North America and Europe. Find urban farms in Montreal, Toronto, New York, Chicago, London, Paris, and more.",
    ogImage: '/og-image.png',
    keywords: ['urban farming locations', 'cities', 'North America', 'Europe', 'international'],
  },
  contact: {
    title: 'Contact | Get in Touch Today',
    description:
      'Contact Microhabitat to start your urban farming journey. Offices in Montreal, Toronto, and New York. Available Monday-Friday, 9am-5pm.',
    ogImage: '/og-image.png',
    keywords: ['contact', 'book demo', 'urban farming consultation', 'Montreal', 'Toronto', 'New York'],
  },
  faq: {
    title: 'FAQ | Explore Urban Farming Opportunities',
    description:
      "Find answers to frequently asked questions about Microhabitat's urban farming services. Learn about requirements, process, products, and how to get started.",
    ogImage: '/og-image.png',
    keywords: ['FAQ', 'urban farming questions', 'requirements', 'frequently asked questions'],
  },
  blog: {
    title: 'Blog | Explore Urban Farming Tips',
    description:
      "Explore Microhabitat's blog for urban farming tips, sustainability insights, and industry news. Learn about CSR, ESG, green certifications, and more.",
    ogImage: '/og-image.png',
    keywords: ['urban farming blog', 'sustainability news', 'green building', 'CSR', 'ESG'],
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    description: "Microhabitat's privacy policy explains how we collect, use, and protect your personal information.",
    ogImage: '/og-image.png',
    noIndex: true,
  },
} as const;

export type PageKey = keyof typeof PAGE_SEO;
