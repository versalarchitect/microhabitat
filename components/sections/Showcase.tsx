"use client";

import { BentoGrid } from "@/components/ui/bento-grid";
import type { ShowcaseSectionContent } from "@/lib/cms";

interface ShowcaseProps {
  sectionContent: ShowcaseSectionContent;
}

export function Showcase({ sectionContent }: ShowcaseProps) {
  return (
    <section className="section scroll-mt-nav">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="mb-10 md:mb-12">
          <p className="label mb-4">{sectionContent.label}</p>
          <h2 className="heading-section text-foreground max-w-3xl">
            {sectionContent.heading}{" "}
            {sectionContent.headingHighlight && (
              <span className="text-primary">{sectionContent.headingHighlight}</span>
            )}
          </h2>
        </div>

        {/* Bento Grid */}
        <BentoGrid
          items={sectionContent.images}
          layout="showcase"
        />
      </div>
    </section>
  );
}
