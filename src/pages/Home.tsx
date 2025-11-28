import { Hero } from "../components/sections/Hero";
import { Services } from "../components/sections/Services";
import { Impact } from "../components/sections/Impact";
import { Partners } from "../components/sections/Partners";
import { Testimonials } from "../components/sections/Testimonials";
import { Cities } from "../components/sections/Cities";
import { FAQ } from "../components/sections/FAQ";
import { CTA } from "../components/sections/CTA";
import type { SiteContent } from "../lib/strapi";

interface HomeProps {
  content: SiteContent;
  onBookDemo: () => void;
}

export function Home({ content, onBookDemo }: HomeProps) {
  return (
    <>
      {/* Hero Section */}
      <Hero
        content={content.hero}
        stats={content.stats}
        onBookDemo={onBookDemo}
      />

      {/* Services Section */}
      <Services services={content.services} onBookDemo={onBookDemo} />

      {/* Impact Section */}
      <Impact stats={content.stats} />

      {/* Partners Section */}
      <Partners partners={content.partners} />

      {/* Testimonials Section */}
      <Testimonials testimonials={content.testimonials} />

      {/* Cities Section */}
      <Cities cities={content.cities} />

      {/* FAQ Section */}
      <FAQ faq={content.faq} onBookDemo={onBookDemo} />

      {/* CTA Section */}
      <CTA onBookDemo={onBookDemo} />
    </>
  );
}
