import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import type { Testimonial } from "../../lib/strapi";

function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: Testimonial;
  isActive: boolean;
}) {
  return (
    <div
      className={cn(
        "h-full transition-opacity duration-300",
        isActive ? "opacity-100" : "opacity-50"
      )}
    >
      {/* Card - border only, no glass morphism */}
      <div className="relative h-full border border-border rounded-md bg-card max-w-4xl mx-auto overflow-hidden">
        <div className={cn(
          "grid h-full",
          testimonial.image ? "md:grid-cols-2" : "grid-cols-1"
        )}>
          {/* Image side */}
          {testimonial.image && (
            <div className="aspect-video md:aspect-auto md:h-full">
              <img
                src={testimonial.image}
                alt={`${testimonial.company} urban farm`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content side */}
          <div className="flex flex-col h-full p-8 md:p-10">
            {/* Highlight badge */}
            {testimonial.highlight && (
              <div className="mb-6">
                <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary">
                  {testimonial.highlight}
                </span>
              </div>
            )}

            {/* Quote */}
            <blockquote className="flex-grow">
              <p className="text-foreground text-base md:text-lg leading-relaxed">
                "{testimonial.quote}"
              </p>
            </blockquote>

            {/* Author */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-medium text-lg">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role && `${testimonial.role}, `}
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                {testimonial.companyLogo && (
                  <img
                    src={testimonial.companyLogo}
                    alt={testimonial.company}
                    className="h-8 w-auto object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <>
      <div className="divider" />

      <section id="testimonials" className="section scroll-mt-nav">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Section header */}
          <div className="mb-12 lg:mb-16">
            <p className="label mb-3">Testimonials</p>
            <h2 className="heading-section mb-4">
              What our clients{" "}
              <span className="text-primary">say</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              See how urban farming has transformed spaces and communities for
              our partners.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {/* Left button - Desktop */}
            <button
              type="button"
              className={cn(
                "hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-16",
                "w-12 h-12 items-center justify-center rounded-full",
                "border border-border bg-card",
                "transition-colors duration-200 hover:bg-muted",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>

            {/* Right button - Desktop */}
            <button
              type="button"
              className={cn(
                "hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-16",
                "w-12 h-12 items-center justify-center rounded-full",
                "border border-border bg-card",
                "transition-colors duration-200 hover:bg-muted",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>

            {/* Carousel container */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex touch-pan-y">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={`${testimonial.author}-${index}`}
                    className="flex-[0_0_100%] min-w-0 relative"
                  >
                    <div className="px-2 py-4">
                      <TestimonialCard
                        testimonial={testimonial}
                        isActive={index === selectedIndex}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation controls */}
            <div className="mt-8 space-y-4">
              {/* Dots */}
              <div className="flex items-center justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-200",
                      selectedIndex === index
                        ? "w-6 bg-foreground"
                        : "w-1.5 bg-border hover:bg-muted-foreground"
                    )}
                    onClick={() => emblaApi?.scrollTo(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Mobile navigation */}
              <div className="flex items-center justify-center gap-4 lg:hidden">
                <button
                  type="button"
                  className={cn(
                    "p-3 rounded-full border border-border bg-card",
                    "transition-colors duration-200 hover:bg-muted",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                >
                  <ArrowLeft className="h-4 w-4 text-foreground" />
                </button>

                <span className="text-sm text-muted-foreground font-mono">
                  {selectedIndex + 1} / {testimonials.length}
                </span>

                <button
                  type="button"
                  className={cn(
                    "p-3 rounded-full border border-border bg-card",
                    "transition-colors duration-200 hover:bg-muted",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                >
                  <ArrowRight className="h-4 w-4 text-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
