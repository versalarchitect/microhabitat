import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Locale, getLocalePath } from "@/lib/i18n";

export interface CityCardProps {
  name: string;
  country?: string;
  slug?: string;
  image?: string;
  variant?: "simple" | "image";
  className?: string;
  locale?: Locale;
}

export function CityCard({
  name,
  country,
  slug,
  image,
  variant = "simple",
  className,
  locale = "en",
}: CityCardProps) {
  const content =
    variant === "image" && image ? (
      <>
        <div className="aspect-[4/3] overflow-hidden relative">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
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
      <Link href={getLocalePath(`/cities/${slug}`, locale)} className={cn(baseClassName, className)}>
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
