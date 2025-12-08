import { useState, useMemo } from "react";
import type { City } from "../../lib/strapi";
import { FilterButtonGroup, type FilterOption } from "../ui/filter-button-group";
import { CityCard, CityGrid } from "../ui/city-card";

interface CitiesProps {
  cities: City[];
}

export function Cities({ cities }: CitiesProps) {
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
