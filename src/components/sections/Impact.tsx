import { memo } from "react";
import type { Stat } from "../../lib/strapi";
import { useCountUpAnimation } from "../../lib/hooks";

interface ImpactProps {
  stats: Stat[];
}

const ImpactCard = memo(function ImpactCard({ stat }: { stat: Stat }) {
  const { count, ref } = useCountUpAnimation(stat.value, { duration: 2500 });

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
  const impactImages = [
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  ];

  return (
    <>
      <div className="divider" />

      <section id="impact" className="section scroll-mt-nav">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Section header with image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="label mb-4">Our Impact</p>
              <h2 className="heading-section text-foreground">
                Making a real{" "}
                <span className="text-primary">difference</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our urban farms create measurable impact through food production,
                community engagement, and environmental benefits.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {impactImages.map((img, idx) => (
                <div key={idx} className="aspect-[3/4] rounded-md overflow-hidden">
                  <img
                    src={img}
                    alt="Urban farming impact"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
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
