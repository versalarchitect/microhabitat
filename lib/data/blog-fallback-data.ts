/**
 * Blog Fallback Data - Types and Utilities
 *
 * This module provides type definitions and helper functions for blog posts.
 * The actual blog post data is in lib/blog-data.ts (to be removed after CMS migration).
 *
 * @see payload/collections/BlogPosts.ts for CMS schema
 */

// ============================================
// TYPES
// ============================================

export interface BlogPost {
  title: string;
  excerpt: string;
  content?: string;
  categories: string[];
  author: string;
  date: string;
  slug: string;
  image: string;
}

export interface BlogPostFromCMS {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  dateModified?: string;
  categories: string[];
  featuredImage?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    ogImage?: string;
    twitterImage?: string;
    canonical?: string;
    noIndex?: boolean;
    noFollow?: boolean;
  };
}

// ============================================
// CATEGORY DEFINITIONS
// ============================================

/**
 * All available blog categories for filtering
 * Keys are used for URL params and translation lookups
 */
export const BLOG_CATEGORIES = {
  esg: 'ESG',
  csr: 'CSR',
  sustainability: 'Sustainability',
  greenBuildings: 'Green Buildings',
  urbanFarming: 'Urban Farming',
  news: 'News',
  caseStudies: 'Case Studies',
  education: 'Education',
} as const;

export type BlogCategoryKey = keyof typeof BLOG_CATEGORIES;
export type BlogCategoryValue = (typeof BLOG_CATEGORIES)[BlogCategoryKey];

/**
 * Category keys for UI iteration
 */
export const categoryKeys: string[] = [
  'esg',
  'csr',
  'sustainability',
  'greenBuildings',
  'urbanFarming',
  'news',
  'caseStudies',
  'education',
  // Legacy keys for backwards compatibility
  'innovation',
  'farming',
  'gardening',
  'brand',
  'certification',
  'greenCertifications',
  'clientHighlight',
  'caseStudy',
  'unitedNations',
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Normalize CMS blog post to frontend BlogPost interface
 */
export function normalizeCMSPost(post: BlogPostFromCMS): BlogPost {
  return {
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    categories: post.categories,
    author: post.author,
    date: post.publishedDate,
    slug: post.slug,
    image: post.featuredImage || '/images/blog/default.jpg',
  };
}

/**
 * Map legacy category names to CMS category values
 */
export function mapLegacyCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    'ESG': 'ESG',
    'CSR': 'CSR',
    'Sustainability': 'Sustainability',
    'Green Certifications': 'Green Buildings',
    'BREEAM': 'Green Buildings',
    'LEED': 'Green Buildings',
    'Farming': 'Urban Farming',
    'Innovation': 'Urban Farming',
    'Gardening': 'Urban Farming',
    'Brand': 'News',
    'Certification': 'Green Buildings',
    'Client Highlight': 'Case Studies',
    'Case Study': 'Case Studies',
  };
  return categoryMap[category] || category;
}

/**
 * Get all unique slugs from posts array
 */
export function getAllBlogSlugs(posts: BlogPost[]): string[] {
  return posts.map(post => post.slug);
}

/**
 * Find post by slug
 */
export function findPostBySlug(posts: BlogPost[], slug: string): BlogPost | undefined {
  return posts.find(post => post.slug === slug);
}
