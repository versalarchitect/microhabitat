"use client";

import { useState, useMemo } from "react";
import type { City, CitiesSectionContent } from "@/lib/strapi";
import type { Locale } from "@/lib/i18n";
import { FilterButtonGroup, type FilterOption } from "@/components/ui/filter-button-group";
import { CityCard, CityGrid } from "@/components/ui/city-card";

interface CitiesProps {
  cities: City[];
  sectionContent: CitiesSectionContent;
  locale?: Locale;
}

export function Cities({ cities, sectionContent }: CitiesProps) {
  const [activeRegion, setActiveRegion] = useState("all");

  const filteredCities =
    activeRegion === "all"
      ? cities
      : cities.filter((city) => city.region === activeRegion);

  const northAmericaCities = cities.filter((c) => c.region === "north-america");
  const europeCities = cities.filter((c) => c.region === "europe");

  const filterOptions: FilterOption[] = useMemo(
    () => [
      { label: "All", value: "all", count: cities.length },
      { label: "North America", value: "north-america", count: northAmericaCities.length },
      { label: "Europe", value: "europe", count: europeCities.length },
    ],
    [cities.length, northAmericaCities.length, europeCities.length]
  );

  return (
    <>
      <div className="divider" />

      <section id="cities" className="section scroll-mt-nav">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Section header */}
          <div className="mb-12">
            <p className="label mb-4">{sectionContent.label}</p>
            <h2 className="heading-section text-foreground">
              {sectionContent.heading}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              {sectionContent.description}
            </p>
          </div>

          {/* Region filter */}
          <FilterButtonGroup
            options={filterOptions}
            activeValue={activeRegion}
            onChange={setActiveRegion}
            className="mb-8"
          />

          {/* Cities grid */}
          <CityGrid variant="simple">
            {filteredCities.map((city) => (
              <CityCard
                key={`${city.name}-${city.country}`}
                name={city.name}
                country={city.country}
                variant="simple"
              />
            ))}
          </CityGrid>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground">
              {sectionContent.ctaText}{" "}
              <a
                href="#contact"
                className="font-medium text-foreground hover:underline decoration-2 underline-offset-4"
              >
                {sectionContent.ctaButtonText} →
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
