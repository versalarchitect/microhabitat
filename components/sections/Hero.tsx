"use client";

import { ArrowRight } from "lucide-react";
import type { HeroContent } from "@/lib/cms";
import { useSmoothScroll } from "@/lib/hooks";

interface HeroProps {
  content: HeroContent;
  onBookDemo: () => void;
}

export function Hero({ content, onBookDemo }: HeroProps) {
  const { handleAnchorClick } = useSmoothScroll({ yOffset: -80 });

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen pt-28 md:pt-32 flex flex-col justify-center pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
          {/* Label */}
          <p className="label mb-6 animate-fade-up">
            North America &middot; Europe
          </p>

          {/* Main headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-[0.95] mb-6 md:mb-8 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="block text-foreground">{content.title}</span>
            <span className="block text-primary">{content.titleHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8 md:mb-10 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {content.subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-start gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <button type="button" onClick={onBookDemo} className="btn-outline group">
              {content.ctaPrimary}
              <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#services"
              onClick={handleAnchorClick}
              className="text-foreground font-medium hover:underline decoration-2 underline-offset-8 py-3"
            >
              {content.ctaSecondary}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
