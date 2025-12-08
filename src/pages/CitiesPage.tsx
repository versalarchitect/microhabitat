import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { SEO, PAGE_SEO } from "../components/SEO";
import { CityCard, CityGrid } from "../components/ui/city-card";

interface CitiesPageProps {
  onBookDemo: () => void;
}

export function CitiesPage({ onBookDemo }: CitiesPageProps) {
  const regions = [
    {
      name: "Canada",
      cities: [
        { name: "Montreal", slug: "montreal", image: "https://images.unsplash.com/photo-1519178614-68673b201f36?w=640&q=80" },
        { name: "Toronto", slug: "toronto", image: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=640&q=80" },
        { name: "Vancouver", slug: "vancouver", image: "https://images.unsplash.com/photo-1559511260-66a68e8c3c58?w=640&q=80" },
        { name: "Calgary", slug: "calgary", image: "https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=640&q=80" },
        { name: "Edmonton", slug: "edmonton", image: "https://images.unsplash.com/photo-1581534573614-36e847f61a6b?w=640&q=80" },
        { name: "Victoria", slug: "victoria", image: "https://images.unsplash.com/photo-1583953509007-44a1c9e90511?w=640&q=80" },
      ],
    },
    {
      name: "United States",
      cities: [
        { name: "NYC", slug: "new-york", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=640&q=80" },
        { name: "Chicago", slug: "chicago", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=640&q=80" },
        { name: "Dallas", slug: "dallas", image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=640&q=80" },
        { name: "Los Angeles", slug: "los-angeles", image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=640&q=80" },
        { name: "San Francisco", slug: "san-francisco", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=640&q=80" },
        { name: "Washington DC", slug: "washington-dc", image: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=640&q=80" },
        { name: "Denver", slug: "denver", image: "https://images.unsplash.com/photo-1619856699906-09e1f58c98b1?w=640&q=80" },
        { name: "Columbus", slug: "columbus", image: "https://images.unsplash.com/photo-1564286366871-b0a0edd6dcf7?w=640&q=80" },
        { name: "Seattle", slug: "seattle", image: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?w=640&q=80" },
      ],
    },
    {
      name: "Europe",
      cities: [
        { name: "Amsterdam", slug: "amsterdam", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=640&q=80" },
        { name: "Berlin", slug: "berlin", image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=640&q=80" },
        { name: "London", slug: "london", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=640&q=80" },
        { name: "Paris", slug: "paris", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=640&q=80" },
        { name: "Zurich", slug: "zurich", image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=640&q=80" },
      ],
    },
  ];

  return (
    <>
      <SEO {...PAGE_SEO.cities} canonical="/cities" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-6">Our Network</p>
              <h1 className="heading-display mb-8">
                Explore our <span className="text-primary">cities</span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                MicroHabitat operates in 20+ cities across North America and Europe.
                Find urban farming near you or bring MicroHabitat to your city.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={onBookDemo}>
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link to="/contact" className="btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="aspect-video rounded-md overflow-hidden">
              <img
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg"
                alt="Urban Farming Cities"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Cities Grid */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {regions.map((region, index) => (
            <div key={index} className={index > 0 ? "mt-16" : ""}>
              <p className="label mb-4">{region.name}</p>
              <CityGrid variant="image">
                {region.cities.map((city, cityIndex) => (
                  <CityCard
                    key={cityIndex}
                    name={city.name}
                    slug={city.slug}
                    image={city.image}
                    variant="image"
                  />
                ))}
              </CityGrid>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Land Acknowledgement */}
      <section className="section bg-muted/30">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <p className="label mb-4">Land Acknowledgement</p>
          <h2 className="heading-section mb-6">
            We acknowledge the land
          </h2>
          <p className="text-muted-foreground text-lg">
            MicroHabitat operates on the traditional territories of Indigenous peoples
            across North America and Europe. We are committed to reconciliation and
            to building respectful relationships with Indigenous communities in all
            the places where we work.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* Map Section Placeholder */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">Global Network</p>
              <h2 className="heading-section mb-6">
                Growing across continents
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                From our headquarters in Montreal, we've expanded to serve communities
                across Canada, the United States, and Europe. Each city has its own
                team of local urban farmers dedicated to growing fresh food and
                engaging communities.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-medium text-primary">6</p>
                  <p className="text-sm text-muted-foreground">Canadian Cities</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-medium text-primary">9</p>
                  <p className="text-sm text-muted-foreground">US Cities</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-medium text-primary">5</p>
                  <p className="text-sm text-muted-foreground">European Cities</p>
                </div>
              </div>
            </div>
            <div className="card-minimal p-8">
              <h3 className="text-xl font-medium mb-4">Don't see your city?</h3>
              <p className="text-muted-foreground mb-6">
                We're always expanding! If you're interested in bringing MicroHabitat
                to your city, let's talk about how we can work together.
              </p>
              <Button onClick={onBookDemo} className="w-full">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Ready to grow with us?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join 250+ properties already transforming their spaces with MicroHabitat.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              Book a Demo
            </button>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
