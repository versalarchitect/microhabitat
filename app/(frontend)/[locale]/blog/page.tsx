import type { Metadata } from 'next';
import { type Locale, locales, ogLocales, getTranslations } from '@/lib/i18n';
import { getPageSEO, getBlogPosts } from '@/lib/cms';
import { blogPosts as fallbackBlogPosts } from '@/lib/blog-data';
import { PageStructuredData } from '@/components/JsonLd';
import { BlogClient } from './BlogClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('blog', locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const canonicalUrl = locale === 'en' ? `${siteUrl}/blog` : `${siteUrl}/${locale}/blog`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(',').map(k => k.trim()),
    alternates: {
      canonical: seo.canonical || canonicalUrl,
      languages: {
        'en': `${siteUrl}/blog`,
        'fr': `${siteUrl}/fr/blog`,
        'de': `${siteUrl}/de/blog`,
        'nl': `${siteUrl}/nl/blog`,
        'it': `${siteUrl}/it/blog`,
        'es': `${siteUrl}/es/blog`,
      },
    },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: canonicalUrl,
      siteName: 'Microhabitat',
      locale: ogLocales[locale as Locale] || 'en_CA',
      type: 'website',
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: seo.twitterImage ? [seo.twitterImage] : undefined,
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const translations = getTranslations(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.microhabitat.com';
  const pageUrl = locale === 'en' ? '/blog' : `/${locale}/blog`;

  // Fetch blog posts from CMS
  const { posts: cmsPosts } = await getBlogPosts(locale as Locale, { pageSize: 100 });

  // Transform CMS posts to match BlogPost interface, or use fallback
  const posts = cmsPosts.length > 0
    ? cmsPosts.map(post => ({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        categories: post.categories,
        author: post.author,
        date: post.publishedDate,
        slug: post.slug,
        image: post.featuredImage || '/images/blog/default.jpg',
      }))
    : fallbackBlogPosts;

  return (
    <>
      <PageStructuredData
        page={{
          url: pageUrl,
          name: 'Blog | Microhabitat',
          description: 'Latest news, insights, and stories from the urban farming world.',
          locale: locale,
        }}
        breadcrumbs={[
          { name: 'Home', url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
          { name: 'Blog' },
        ]}
      />
      <BlogClient locale={locale as Locale} translations={translations} posts={posts} />
    </>
  );
}
