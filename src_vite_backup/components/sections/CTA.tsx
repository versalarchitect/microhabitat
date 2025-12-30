import { ArrowRight } from "lucide-react";
import type { CTASectionContent } from "../../lib/strapi";

interface CTAProps {
  sectionContent: CTASectionContent;
  onBookDemo: () => void;
}

export function CTA({ sectionContent, onBookDemo }: CTAProps) {
  return (
    <>
      <div className="divider" />

      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          {/* Label */}
          <p className="label mb-6">{sectionContent.label}</p>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
            {sectionContent.heading}{" "}
            <span className="text-primary">{sectionContent.headingHighlight}</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {sectionContent.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button type="button" onClick={onBookDemo} className="btn-primary group">
              {sectionContent.ctaPrimary}
              <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={`mailto:${sectionContent.ctaSecondaryEmail}`}
              className="text-foreground font-medium hover:underline decoration-2 underline-offset-8 py-3"
            >
              {sectionContent.ctaSecondary}
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              {sectionContent.trustIndicators?.map((indicator, index) => (
                <span key={index}>✓ {indicator}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
