import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";

interface CitiesPageProps {
  onBookDemo: () => void;
}

export function CitiesPage({ onBookDemo }: CitiesPageProps) {
  const regions = [
    {
      name: "Canada",
      cities: [
        { name: "Montreal", slug: "montreal" },
        { name: "Toronto", slug: "toronto" },
        { name: "Vancouver", slug: "vancouver" },
        { name: "Calgary", slug: "calgary" },
        { name: "Edmonton", slug: "edmonton" },
        { name: "Victoria", slug: "victoria" },
      ],
    },
    {
      name: "United States",
      cities: [
        { name: "NYC", slug: "new-york" },
        { name: "Chicago", slug: "chicago" },
        { name: "Dallas", slug: "dallas" },
        { name: "Los Angeles", slug: "los-angeles" },
        { name: "San Francisco", slug: "san-francisco" },
        { name: "Washington DC", slug: "washington-dc" },
        { name: "Denver", slug: "denver" },
        { name: "Columbus", slug: "columbus" },
        { name: "Seattle", slug: "seattle" },
      ],
    },
    {
      name: "Europe",
      cities: [
        { name: "Amsterdam", slug: "amsterdam" },
        { name: "Berlin", slug: "berlin" },
        { name: "London", slug: "london" },
        { name: "Paris", slug: "paris" },
        { name: "Zurich", slug: "zurich" },
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
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
      </section>

      <div className="divider" />

      {/* Cities Grid */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          {regions.map((region, index) => (
            <div key={index} className={index > 0 ? "mt-16" : ""}>
              <p className="label mb-4">{region.name}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {region.cities.map((city, cityIndex) => (
                  <Link
                    key={cityIndex}
                    to={`/cities/${city.slug}`}
                    className="card-hover p-4 text-center group"
                  >
                    <MapPin className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{city.name}</span>
                  </Link>
                ))}
              </div>
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
        <div className="max-w-6xl mx-auto px-6 md:px-8">
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
