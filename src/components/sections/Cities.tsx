import { useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "../../lib/utils";
import type { City } from "../../lib/strapi";

interface CitiesProps {
  cities: City[];
}

export function Cities({ cities }: CitiesProps) {
  const [activeRegion, setActiveRegion] = useState<"all" | "north-america" | "europe">("all");

  const filteredCities =
    activeRegion === "all"
      ? cities
      : cities.filter((city) => city.region === activeRegion);

  const northAmericaCities = cities.filter((c) => c.region === "north-america");
  const europeCities = cities.filter((c) => c.region === "europe");

  return (
    <>
      <div className="divider" />

      <section id="cities" className="section scroll-mt-nav">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          {/* Section header */}
          <div className="mb-12">
            <p className="label mb-4">Our Network</p>
            <h2 className="heading-section text-foreground">
              Growing in{" "}
              <span className="text-primary">{cities.length}+ cities</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              From Montreal to Zurich, we're building the world's largest urban
              farming network.
            </p>
          </div>

          {/* Region filter */}
          <div className="flex gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveRegion("all")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activeRegion === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              )}
            >
              All ({cities.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveRegion("north-america")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activeRegion === "north-america"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              )}
            >
              North America ({northAmericaCities.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveRegion("europe")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activeRegion === "europe"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              )}
            >
              Europe ({europeCities.length})
            </button>
          </div>

          {/* Cities grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredCities.map((city) => (
              <div
                key={`${city.name}-${city.country}`}
                className="group p-4 border border-border rounded-md bg-card hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {city.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {city.country}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground">
              Don't see your city?{" "}
              <a
                href="#contact"
                className="font-medium text-foreground hover:underline decoration-2 underline-offset-4"
              >
                Let's talk about expansion →
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
