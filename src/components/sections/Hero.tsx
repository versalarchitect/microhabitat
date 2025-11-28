import { useEffect, useRef, useState, memo, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import type { HeroContent, Stat } from "../../lib/strapi";

// Animated counter hook
function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return { count, ref };
}

// Stat item component
const StatItem = memo(function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <div ref={ref} className="text-center">
      <span className="block text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">
        {count}
        {suffix}
      </span>
      <span className="block text-xs sm:text-sm text-muted-foreground mt-1">
        {label}
      </span>
    </div>
  );
});

interface HeroProps {
  content: HeroContent;
  stats: Stat[];
  onBookDemo: () => void;
}

export function Hero({ content, stats, onBookDemo }: HeroProps) {
  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const section = document.getElementById("services");
      if (section) {
        const yOffset = -80;
        const y =
          section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen pt-28 md:pt-32 flex flex-col justify-center pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 w-full">
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
              onClick={scrollToSection}
              className="text-foreground font-medium hover:underline decoration-2 underline-offset-8 py-3"
            >
              {content.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* Stats Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div
            className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            {stats.map((stat) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
