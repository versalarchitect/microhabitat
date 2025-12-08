import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { cn } from "../../lib/utils";

export interface CityCardProps {
  name: string;
  country?: string;
  slug?: string;
  image?: string;
  variant?: "simple" | "image";
  className?: string;
}

export function CityCard({
  name,
  country,
  slug,
  image,
  variant = "simple",
  className,
}: CityCardProps) {
  const content =
    variant === "image" && image ? (
      <>
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-4 flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span className="font-medium">{name}</span>
        </div>
      </>
    ) : (
      <div className="flex items-start gap-2">
        <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium text-foreground text-sm">{name}</p>
          {country && (
            <p className="text-xs text-muted-foreground">{country}</p>
          )}
        </div>
      </div>
    );

  const baseClassName =
    variant === "image"
      ? "card-hover overflow-hidden text-center group"
      : "group p-4 border border-border rounded-md bg-card hover:border-foreground/20 transition-colors";

  if (slug) {
    return (
      <Link to={`/cities/${slug}`} className={cn(baseClassName, className)}>
        {content}
      </Link>
    );
  }

  return <div className={cn(baseClassName, className)}>{content}</div>;
}

export interface CityGridProps {
  children: React.ReactNode;
  variant?: "simple" | "image";
  className?: string;
}

export function CityGrid({ children, variant = "simple", className }: CityGridProps) {
  const gridClassName =
    variant === "image"
      ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4";

  return <div className={cn(gridClassName, className)}>{children}</div>;
}
