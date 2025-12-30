"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Tag, User, Share2, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { type Locale, getLocalePath } from "@/lib/i18n";
import { type BlogPost, blogPosts } from "@/lib/blog-data";

interface BlogArticleClientProps {
  locale: Locale;
  translations: Record<string, string>;
  post: BlogPost;
}

// Map locale to date locale string
const dateLocaleMap: Record<Locale, string> = {
  en: 'en-US',
  fr: 'fr-CA',
  de: 'de-DE',
  nl: 'nl-NL',
  it: 'it-IT',
  es: 'es-ES',
};

export function BlogArticleClient({ locale, translations, post }: BlogArticleClientProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  // Set share URL after mount to avoid hydration mismatch
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  // Find previous and next posts
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) =>
      p.slug !== post.slug &&
      p.categories.some((cat) => post.categories.includes(cat))
    )
    .slice(0, 3);

  return (
    <>
      {/* Hero Section with Image */}
      <section className="relative pt-24 pb-0">
        {/* Back to Blog */}
        <div className="max-w-4xl mx-auto px-6 md:px-8 mb-8">
          <Link
            href={localePath("/blog")}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('blog.title')}
          </Link>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map((cat, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
              >
                <Tag className="w-3 h-3" />
                {cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <span className="inline-flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString(dateLocaleMap[locale], {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Article Content */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          {/* Article Body */}
          <div className="blog-content">
            {/* Lead paragraph - excerpt */}
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Render CMS content with proper HTML */}
            {post.content && (
              <div
                className="prose-blog"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
          </div>

          {/* Share Section */}
          <div className="border-t border-border pt-8 mt-12">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <span className="text-sm font-medium flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share this article
              </span>
              <div className="flex gap-3">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-border rounded-md hover:bg-muted transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-border rounded-md hover:bg-muted transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Previous / Next Navigation */}
      <section className="section bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {prevPost ? (
              <Link
                href={localePath(`/blog/${prevPost.slug}`)}
                className="group p-6 border border-border rounded-lg bg-background hover:border-primary transition-colors"
              >
                <span className="text-xs text-muted-foreground mb-2 block">Previous Article</span>
                <span className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextPost && (
              <Link
                href={localePath(`/blog/${nextPost.slug}`)}
                className="group p-6 border border-border rounded-lg bg-background hover:border-primary transition-colors text-right"
              >
                <span className="text-xs text-muted-foreground mb-2 block">Next Article</span>
                <span className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <>
          <div className="divider" />
          <section className="section">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <h2 className="heading-section mb-12 text-center">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <Link
                    key={index}
                    href={localePath(`/blog/${relatedPost.slug}`)}
                    className="group"
                  >
                    <article className="card-hover overflow-hidden h-full flex flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {relatedPost.categories.slice(0, 2).map((cat, catIndex) => (
                            <span
                              key={catIndex}
                              className="text-xs text-primary"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            {t('blog.cta.title')}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t('blog.cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowDemoModal(true)}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              {t('common.bookDemo')}
            </button>
            <Link
              href={localePath("/contact")}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
      </section>

      <BookDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </>
  );
}
