import { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Locale, locales, getTranslations } from "@/lib/i18n";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-data";
import { BlogArticleClient } from "./BlogArticleClient";

interface BlogArticlePageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];

  for (const locale of locales) {
    for (const post of blogPosts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Microhabitat",
    };
  }

  return {
    title: `${post.title} | Microhabitat`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const translations = await getTranslations(locale);

  return <BlogArticleClient locale={locale} translations={translations} post={post} />;
}
