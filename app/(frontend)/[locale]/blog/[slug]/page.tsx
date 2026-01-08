import { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Locale, locales, getTranslations } from "@/lib/i18n";
import { getBlogPost, getBlogPostSlugs, BlogPostFromCMS } from "@/lib/cms";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-data";
import { BlogArticleClient } from "./BlogArticleClient";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

interface BlogArticlePageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';

// OG locale mapping
const ogLocales: Record<Locale, string> = {
  en: 'en_CA',
  fr: 'fr_CA',
  de: 'de_DE',
  nl: 'nl_NL',
  it: 'it_IT',
  es: 'es_ES',
};

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];

  // Try to get slugs from CMS for each locale
  for (const locale of locales) {
    const cmsSlugs = await getBlogPostSlugs(locale);

    if (cmsSlugs.length > 0) {
      // Use CMS slugs
      for (const slug of cmsSlugs) {
        params.push({ locale, slug });
      }
    } else {
      // Fallback to hardcoded data if CMS unavailable
      for (const post of blogPosts) {
        params.push({ locale, slug: post.slug });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  // Try CMS first
  const cmsPost = await getBlogPost(slug, locale);

  // Fall back to hardcoded data
  const fallbackPost = getBlogPostBySlug(slug);

  if (!cmsPost && !fallbackPost) {
    return {
      title: "Article Not Found | Microhabitat",
    };
  }

  // Use CMS data if available, otherwise fallback
  const seo = cmsPost?.seo;
  const post = cmsPost || fallbackPost;

  const articleUrl = locale === 'en'
    ? `${siteUrl}/blog/${slug}`
    : `${siteUrl}/${locale}/blog/${slug}`;

  // Build hreflang alternates for all locales
  const alternateLanguages: Record<string, string> = {};
  for (const loc of locales) {
    alternateLanguages[loc] = loc === 'en'
      ? `${siteUrl}/blog/${slug}`
      : `${siteUrl}/${loc}/blog/${slug}`;
  }

  // Premium SEO from CMS with intelligent fallbacks
  const metaTitle = seo?.metaTitle || `${post!.title} | Microhabitat`;
  const metaDescription = seo?.metaDescription || post!.excerpt;
  const keywords = seo?.keywords?.split(',').map(k => k.trim());
  const ogImage = seo?.ogImage || (cmsPost?.featuredImage) || (fallbackPost?.image);
  const twitterImage = seo?.twitterImage || ogImage;
  const canonical = seo?.canonical || articleUrl;
  const publishedDate = cmsPost?.publishedDate || fallbackPost?.date;
  const author = cmsPost?.author || fallbackPost?.author || 'Microhabitat';
  const dateModified = cmsPost?.dateModified;

  return {
    // Core metadata
    title: metaTitle,
    description: metaDescription,
    keywords,

    // Canonical and hreflang
    alternates: {
      canonical,
      languages: alternateLanguages,
    },

    // Open Graph - Article type for rich social sharing
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: articleUrl,
      siteName: 'Microhabitat',
      locale: ogLocales[locale] || 'en_CA',
      type: 'article',
      publishedTime: publishedDate,
      modifiedTime: dateModified,
      authors: [author],
      section: cmsPost?.categories?.[0] || fallbackPost?.categories?.[0],
      tags: cmsPost?.categories || fallbackPost?.categories,
      images: ogImage ? [{
        url: ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`,
        width: 1200,
        height: 630,
        alt: metaTitle,
      }] : undefined,
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: twitterImage ? [twitterImage.startsWith('http') ? twitterImage : `${siteUrl}${twitterImage}`] : undefined,
      creator: '@microhabitat',
      site: '@microhabitat',
    },

    // Robots directive from CMS
    robots: {
      index: !(seo?.noIndex),
      follow: !(seo?.noFollow),
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },

    // Additional metadata
    authors: [{ name: author }],
    creator: 'Microhabitat',
    publisher: 'Microhabitat',
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { locale, slug } = await params;

  // Try CMS first
  const cmsPost = await getBlogPost(slug, locale);

  // Fall back to hardcoded data
  const fallbackPost = getBlogPostBySlug(slug);

  if (!cmsPost && !fallbackPost) {
    notFound();
  }

  const translations = await getTranslations(locale);

  // Build article URL
  const articleUrl = locale === 'en'
    ? `${siteUrl}/blog/${slug}`
    : `${siteUrl}/${locale}/blog/${slug}`;

  // Normalize post data for client component
  const post = cmsPost ? {
    title: cmsPost.title,
    excerpt: cmsPost.excerpt,
    content: cmsPost.content,
    categories: cmsPost.categories,
    author: cmsPost.author,
    date: cmsPost.publishedDate,
    slug: cmsPost.slug,
    image: cmsPost.featuredImage || '/images/blog/default.jpg',
  } : fallbackPost!;

  // Article structured data for rich snippets
  const articleData = {
    title: cmsPost?.seo?.metaTitle || post.title,
    description: cmsPost?.seo?.metaDescription || post.excerpt,
    url: articleUrl,
    image: post.image,
    datePublished: post.date,
    dateModified: cmsPost?.dateModified || post.date,
  };

  // Breadcrumb data
  const blogTitle = (translations as Record<string, string>)['blog.title'] || 'Blog';
  const breadcrumbItems = [
    { name: 'Home', url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
    { name: blogTitle, url: locale === 'en' ? `${siteUrl}/blog` : `${siteUrl}/${locale}/blog` },
    { name: post.title },
  ];

  return (
    <>
      {/* Article JSON-LD for rich snippets in search results */}
      <ArticleJsonLd article={articleData} />

      {/* Breadcrumb JSON-LD for navigation in search results */}
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <BlogArticleClient locale={locale} translations={translations} post={post} />
    </>
  );
}
