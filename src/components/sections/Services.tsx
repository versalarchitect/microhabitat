import { Leaf, Building2, GraduationCap, Heart, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import type { Service, ServicesSectionContent } from "../../lib/strapi";
import { useIntersectionVisibility } from "../../lib/hooks";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Leaf,
  Building2,
  GraduationCap,
  Heart,
};

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const { ref, isVisible } = useIntersectionVisibility<HTMLDivElement>({
    threshold: 0.1,
  });

  const Icon = iconMap[service.icon] || Leaf;

  return (
    <div
      ref={ref}
      className={cn("group", isVisible && "animate-fade-up")}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "both",
      }}
    >
      {/* Card - border only, no shadows */}
      <div className="h-full border border-border rounded-md bg-card overflow-hidden hover:border-foreground/20 transition-colors">
        {/* Image */}
        {service.image && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="p-6">
          {/* Icon */}
          <div className="mb-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border bg-card">
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-medium text-foreground">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground mb-4">
            {service.description}
          </p>

          {/* Features list */}
          <ul className="space-y-2">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface ServicesProps {
  services: Service[];
  sectionContent: ServicesSectionContent;
  onBookDemo: () => void;
}

export function Services({ services, sectionContent, onBookDemo }: ServicesProps) {
  return (
    <>
      <div className="divider" />

      <section id="services" className="section scroll-mt-nav">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Section header */}
          <div className="mb-16">
            <p className="label mb-4">{sectionContent.label}</p>
            <h2 className="heading-section text-foreground">
              {sectionContent.heading}{" "}
              <span className="text-primary">{sectionContent.headingHighlight}</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              {sectionContent.description}
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground">
              {sectionContent.ctaText}{" "}
              <button
                type="button"
                onClick={onBookDemo}
                className="font-medium text-foreground hover:underline decoration-2 underline-offset-4 cursor-pointer"
              >
                {sectionContent.ctaButtonText} →
              </button>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
