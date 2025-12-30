import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { SEO } from "../components/SEO";
import { getPageSEO, queryKeys } from "../lib/strapi";
import { useLocale } from "../lib/locale-context";

interface BlogProps {
  onBookDemo: () => void;
}

const blogPosts = [
  {
    title: "MicroHabitat: Where Properties Flourish, Communities Thrive, and Sustainability Grows",
    excerpt: "Discover how urban farming is transforming commercial properties across North America and Europe.",
    category: "Sustainability",
    date: "2024-11-15",
    slug: "microhabitat-where-properties-flourish-communities-thrive-and-sustainability-grows",
  },
  {
    title: "How to Convince Your Boss to Get an Urban Farm",
    excerpt: "A practical guide to making the case for urban farming at your workplace.",
    category: "Brand",
    date: "2024-10-28",
    slug: "how-to-convince-your-boss-to-get-an-urban-farm",
  },
  {
    title: "How LEED Credits Work",
    excerpt: "Understanding how urban farming contributes to LEED certification points.",
    category: "LEED",
    date: "2024-10-15",
    slug: "how-leed-credits-work",
  },
  {
    title: "Nourishing Gardens at Montreal's Eaton Centre",
    excerpt: "A case study of our partnership with one of Montreal's busiest shopping destinations.",
    category: "Client Highlight",
    date: "2024-09-22",
    slug: "nourishing-gardens-at-montreals-eaton-centre",
  },
  {
    title: "The Importance of 5-a-Day",
    excerpt: "Why eating five servings of fruits and vegetables daily matters for health.",
    category: "Gardening",
    date: "2024-09-10",
    slug: "importance-of-5-a-day",
  },
  {
    title: "5 Vegetables You've Probably Never Heard Of",
    excerpt: "Explore unusual vegetables that thrive in urban farms and add variety to your diet.",
    category: "Farming",
    date: "2024-08-28",
    slug: "5-vegetables-youve-probably-never-heard-of",
  },
  {
    title: "Benefits of Biophilic Design in the Office",
    excerpt: "How bringing nature into workspaces improves employee wellbeing and productivity.",
    category: "WELL",
    date: "2024-08-15",
    slug: "benefits-biophilic-design-office",
  },
  {
    title: "Urban Farming Basics",
    excerpt: "A beginner's guide to understanding urban agriculture and how it works.",
    category: "Farming",
    date: "2024-08-01",
    slug: "basics-urban-farming",
  },
  {
    title: "How Urban Farming Amenities Are Shaping the Future of Urban Developments",
    excerpt: "The growing trend of incorporating urban farms into new construction projects.",
    category: "Innovation",
    date: "2024-07-20",
    slug: "how-urban-farming-amenities-are-shaping-the-future-of-urban-developments",
  },
  {
    title: "Understanding ESG and Sustainable Investing",
    excerpt: "How urban farming fits into environmental, social, and governance criteria.",
    category: "ESG",
    date: "2024-07-05",
    slug: "understanding-esg-and-sustainable-investing",
  },
  {
    title: "Urban Farming Supporting UN's Sustainable Development Goals",
    excerpt: "How our programs contribute to global sustainability targets.",
    category: "United Nations",
    date: "2024-06-22",
    slug: "urban-farming-supporting-uns-sustainable-development-goals",
  },
  {
    title: "7 Benefits of Urban Agriculture",
    excerpt: "A comprehensive look at why urban farming matters for cities and communities.",
    category: "Sustainability",
    date: "2024-06-10",
    slug: "7-benefits-of-urban-agriculture",
  },
];

const categoryKeys = [
  "sustainability",
  "csr",
  "esg",
  "brand",
  "leed",
  "well",
  "fitwel",
  "breeam",
  "boma",
  "farming",
  "gardening",
  "innovation",
  "clientHighlight",
  "caseStudy",
];

export function Blog({ onBookDemo }: BlogProps) {
  const { t, localePath, locale } = useLocale();

  const { data: seo } = useQuery({
    queryKey: queryKeys.pageSEO('blog', locale),
    queryFn: () => getPageSEO('blog', locale),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <SEO
        title={seo?.metaTitle || 'Blog | MicroHabitat'}
        description={seo?.metaDescription || 'Explore insights on urban farming, sustainability, green building certifications, and the future of urban agriculture.'}
        canonical={seo?.canonical}
        ogImage={seo?.ogImage}
        twitterImage={seo?.twitterImage}
        keywords={seo?.keywords?.split(',').map(k => k.trim())}
        noIndex={seo?.noIndex}
        noFollow={seo?.noFollow}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-6">{t('blog.label')}</p>
          <h1 className="heading-display mb-8">
            <span className="text-primary">{t('blog.title')}</span>
          </h1>
          <p className="text-body max-w-3xl mb-10">
            {t('blog.description')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={onBookDemo}>
              {t('common.bookDemo')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to={localePath("/contact")} className="btn-outline">
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Categories */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap gap-2">
            {categoryKeys.map((categoryKey, index) => (
              <button
                key={index}
                className="px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
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
            {blogPosts.map((post, index) => (
              <article key={index} className="card-hover p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-flex items-center gap-1 text-xs text-primary">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString(locale === 'fr' ? 'fr-CA' : locale === 'de' ? 'de-DE' : locale === 'es' ? 'es-ES' : locale === 'it' ? 'it-IT' : locale === 'nl' ? 'nl-NL' : 'en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h2 className="text-xl font-medium mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="text-primary inline-flex items-center text-sm font-medium">
                  {t('blog.readMore')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </article>
            ))}
          </div>
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
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              {t('common.bookDemo')}
            </button>
            <Link
              to={localePath("/contact")}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
