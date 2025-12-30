import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PageHeroButton {
  text: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline";
}

export interface PageHeroProps {
  label: string;
  title: React.ReactNode;
  description: string;
  buttons?: PageHeroButton[];
  image: {
    src: string;
    alt: string;
  };
}

export function PageHero({
  label,
  title,
  description,
  buttons = [],
  image,
}: PageHeroProps) {
  return (
    <section className="pt-32 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="label mb-6">{label}</p>
            <h1 className="heading-display mb-8">{title}</h1>
            <p className="text-body max-w-3xl mb-10">{description}</p>
            <div className="flex flex-wrap gap-4">
              {buttons.map((btn, idx) =>
                btn.variant === "outline" ? (
                  btn.href ? (
                    <Link key={idx} href={btn.href} className="btn-outline">
                      {btn.text}
                    </Link>
                  ) : (
                    <button
                      key={idx}
                      onClick={btn.onClick}
                      className="btn-outline"
                    >
                      {btn.text}
                    </button>
                  )
                ) : (
                  <Button key={idx} onClick={btn.onClick}>
                    {btn.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )
              )}
            </div>
          </div>
          <div className="aspect-video rounded-md overflow-hidden relative">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
