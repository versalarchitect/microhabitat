"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { type Locale, getLocalePath } from "@/lib/i18n";
import { BlogPost, categoryKeys } from "@/lib/blog-data";

interface BlogClientProps {
  locale: Locale;
  translations: Record<string, string>;
  posts: BlogPost[];
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

const POSTS_PER_PAGE = 12;

export function BlogClient({ locale, translations, posts }: BlogClientProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  // Filter posts by selected category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((post) => {
      return post.categories.some((cat) => {
        const categoryKey = cat.toLowerCase().replace(/\s+/g, '');
        return categoryKey === selectedCategory.toLowerCase();
      });
    });
  }, [posts, selectedCategory]);

  // Get visible posts for pagination
  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const hasMorePosts = filteredPosts.length > visiblePosts;

  // Reset pagination when category changes
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setVisiblePosts(POSTS_PER_PAGE);
  };

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + POSTS_PER_PAGE);
  };

  return (
    <>
      {/* Hero Section - Visual Style */}
      <section className="relative pt-24 pb-32 md:pb-40 bg-muted/30 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 text-center">
          <h1 className="heading-display mb-6">
            <span className="text-primary">{t('blog.title')}</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto text-muted-foreground">
            {t('blog.description')}
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* Categories */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-2 text-sm font-medium border border-border rounded-md transition-colors ${
                selectedCategory === null
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'hover:bg-muted'
              }`}
            >
              {t('blog.categories.all')}
            </button>
            {categoryKeys.map((categoryKey) => (
              <button
                key={categoryKey}
                onClick={() => handleCategoryChange(categoryKey)}
                className={`px-4 py-2 text-sm font-medium border border-border rounded-md transition-colors ${
                  selectedCategory === categoryKey
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'hover:bg-muted'
                }`}
              >
                {t(`blog.categories.${categoryKey}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Blog Posts Grid */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map((post, index) => (
              <Link
                key={index}
                href={localePath(`/blog/${post.slug}`)}
                className="group"
              >
                <article className="card-hover overflow-hidden h-full flex flex-col">
                  {/* Thumbnail Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.slice(0, 3).map((cat, catIndex) => (
                        <span
                          key={catIndex}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                        >
                          <Tag className="w-3 h-3" />
                          {cat}
                        </span>
                      ))}
                      {post.categories.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{post.categories.length - 3}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-medium mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    {/* Author and Date */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>{post.author}</span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString(dateLocaleMap[locale], {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <span className="text-primary inline-flex items-center text-sm font-medium group-hover:gap-2 transition-all">
                      {t('blog.readMore')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Load More / Older Posts Button */}
          {hasMorePosts && (
            <div className="text-center mt-12">
              <button
                onClick={loadMorePosts}
                className="btn-outline"
              >
                {t('blog.olderPosts')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('blog.noPosts')}</p>
            </div>
          )}
        </div>
      </section>

      <div className="divider" />

      {/* Newsletter CTA */}
      <section className="section bg-muted/30">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <p className="label mb-4">{t('blog.newsletter.label')}</p>
          <h2 className="heading-section mb-6">
            {t('blog.newsletter.title')}
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            {t('blog.newsletter.description')}
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('blog.newsletter.emailPlaceholder')}
              className="flex-1 px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button type="submit">
              {t('blog.newsletter.subscribe')}
            </Button>
          </form>
        </div>
      </section>

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
