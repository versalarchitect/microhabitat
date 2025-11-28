import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Button } from "../components/ui/button";

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

const categories = [
  "Sustainability",
  "CSR",
  "ESG",
  "Brand",
  "LEED",
  "WELL",
  "Fitwel",
  "BREEAM",
  "BOMA",
  "Farming",
  "Gardening",
  "Innovation",
  "Client Highlight",
  "Case Study",
];

export function Blog({ onBookDemo }: BlogProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-6">Resources</p>
          <h1 className="heading-display mb-8">
            <span className="text-primary">Blog</span>
          </h1>
          <p className="text-body max-w-3xl mb-10">
            Insights, guides, and stories about urban farming, sustainability,
            and building healthier communities.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={onBookDemo}>
              Book a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Categories */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Blog Posts Grid */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
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
                    {new Date(post.date).toLocaleDateString('en-US', {
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
                  Read More
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
          <p className="label mb-4">Stay Updated</p>
          <h2 className="heading-section mb-6">
            Subscribe to our newsletter
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Get the latest insights on urban farming, sustainability, and green
            building delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Ready to start growing?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Transform your property with urban farming.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              Book a Demo
            </button>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
