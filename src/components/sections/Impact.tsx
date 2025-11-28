import { useEffect, useRef, useState, memo } from "react";
import type { Stat } from "../../lib/strapi";

// Counter animation hook
function useCountUp(end: number, duration = 2500) {
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

interface ImpactProps {
  stats: Stat[];
}

const ImpactCard = memo(function ImpactCard({ stat }: { stat: Stat }) {
  const { count, ref } = useCountUp(stat.value, 2500);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <div ref={ref} className="text-center p-6 border border-border rounded-md bg-card">
      <span className="block text-3xl md:text-4xl lg:text-5xl font-medium text-primary mb-2">
        {formatNumber(count)}
        {stat.suffix}
      </span>
      <span className="block text-lg font-medium text-foreground mb-1">
        {stat.label}
      </span>
      <span className="block text-sm text-muted-foreground">
        {stat.description}
      </span>
    </div>
  );
});

export function Impact({ stats }: ImpactProps) {
  return (
    <>
      <div className="divider" />

      <section id="impact" className="section scroll-mt-nav">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          {/* Section header */}
          <div className="mb-16">
            <p className="label mb-4">Our Impact</p>
            <h2 className="heading-section text-foreground">
              Making a real{" "}
              <span className="text-primary">difference</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Our urban farms create measurable impact through food production,
              community engagement, and environmental benefits.
            </p>
          </div>

          {/* Impact grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.slice(0, 3).map((stat) => (
              <ImpactCard key={stat.label} stat={stat} />
            ))}
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto lg:max-w-none lg:grid-cols-2">
            {stats.slice(3).map((stat) => (
              <ImpactCard key={stat.label} stat={stat} />
            ))}
          </div>

          {/* Marquee banner */}
          <div className="mt-16 overflow-hidden border-y border-border py-4">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...stats, ...stats].map((stat, index) => (
                <span
                  key={`${stat.label}-${index}`}
                  className="mx-8 text-sm text-muted-foreground"
                >
                  <span className="font-medium text-foreground">
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </span>{" "}
                  {stat.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
