import { useParams, Link } from "react-router-dom";
import { ArrowRight, Leaf, MapPin, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { SEO } from "../components/SEO";

interface CityDetailProps {
  onBookDemo: () => void;
}

// City data
const cityData: Record<string, {
  name: string;
  country: string;
  region: string;
  description: string;
  highlights: string[];
}> = {
  "montreal": {
    name: "Montreal",
    country: "Canada",
    region: "Quebec",
    description: "Join Montreal's thriving urban agriculture movement. As our headquarters city, Montreal is home to our largest network of rooftop farms, serving commercial properties, corporations, and schools across the island.",
    highlights: [
      "50+ urban farms across the city",
      "Home to MicroHabitat headquarters",
      "Partnerships with major real estate companies",
      "Strong food bank donation program",
    ],
  },
  "toronto": {
    name: "Toronto",
    country: "Canada",
    region: "Ontario",
    description: "Toronto's urban farming scene is growing rapidly. We're proud to serve properties across the GTA, bringing fresh produce and community engagement to one of North America's largest cities.",
    highlights: [
      "30+ urban farms in the GTA",
      "Corporate and commercial partnerships",
      "Year-round indoor farming options",
      "Educational programs for schools",
    ],
  },
  "vancouver": {
    name: "Vancouver",
    country: "Canada",
    region: "British Columbia",
    description: "Vancouver's mild climate makes it ideal for urban farming. Our West Coast team brings year-round growing opportunities to properties across Metro Vancouver.",
    highlights: [
      "Extended growing season",
      "Rooftop and ground-level farms",
      "Strong sustainability focus",
      "Indigenous partnership programs",
    ],
  },
  "calgary": {
    name: "Calgary",
    country: "Canada",
    region: "Alberta",
    description: "Calgary's urban farming community is growing. We're bringing sustainable agriculture to Alberta's largest city with programs tailored to the prairie climate.",
    highlights: [
      "Climate-adapted growing programs",
      "Indoor farming solutions",
      "Corporate engagement focus",
      "Growing network of partners",
    ],
  },
  "edmonton": {
    name: "Edmonton",
    country: "Canada",
    region: "Alberta",
    description: "Edmonton is embracing urban agriculture. Our programs are designed to thrive in northern climates while engaging communities year-round.",
    highlights: [
      "Northern climate expertise",
      "Indoor growing solutions",
      "School and community programs",
      "Food security initiatives",
    ],
  },
  "victoria": {
    name: "Victoria",
    country: "Canada",
    region: "British Columbia",
    description: "Victoria's temperate climate is perfect for urban farming. We're growing food and community connections across Vancouver Island.",
    highlights: [
      "Mild year-round climate",
      "Strong local food movement",
      "Community-focused programs",
      "Biodiversity initiatives",
    ],
  },
  "new-york": {
    name: "New York City",
    country: "USA",
    region: "New York",
    description: "NYC is home to some of our most innovative urban farms. From Brooklyn rooftops to Manhattan terraces, we're transforming the concrete jungle into a greener, more sustainable city.",
    highlights: [
      "Rooftop farms across all boroughs",
      "Major commercial partnerships",
      "Green building certification support",
      "Food bank donation programs",
    ],
  },
  "chicago": {
    name: "Chicago",
    country: "USA",
    region: "Illinois",
    description: "Chicago's urban farming scene is thriving. We're bringing sustainable agriculture to the Windy City with programs designed for the Midwest climate.",
    highlights: [
      "Growing network of farms",
      "Corporate partnerships",
      "School engagement programs",
      "Community food initiatives",
    ],
  },
  "dallas": {
    name: "Dallas",
    country: "USA",
    region: "Texas",
    description: "Dallas-Fort Worth is embracing urban agriculture. Our Texas team is bringing sustainable growing solutions to one of America's fastest-growing metros.",
    highlights: [
      "Heat-adapted growing programs",
      "Corporate campus farms",
      "Year-round growing potential",
      "Expanding partner network",
    ],
  },
  "los-angeles": {
    name: "Los Angeles",
    country: "USA",
    region: "California",
    description: "LA's climate is ideal for urban farming. We're serving properties across Southern California with year-round growing programs and community engagement.",
    highlights: [
      "Year-round growing season",
      "Diverse crop options",
      "Water-efficient systems",
      "Entertainment industry partnerships",
    ],
  },
  "san-francisco": {
    name: "San Francisco",
    country: "USA",
    region: "California",
    description: "The Bay Area is a leader in sustainability, and urban farming is no exception. Our SF team serves properties across the region with innovative growing solutions.",
    highlights: [
      "Tech campus partnerships",
      "Sustainability leadership",
      "Strong local food culture",
      "LEED certification support",
    ],
  },
  "washington-dc": {
    name: "Washington D.C.",
    country: "USA",
    region: "District of Columbia",
    description: "The nation's capital is going green with urban farming. We're serving government buildings, corporate offices, and schools across the DC metro area.",
    highlights: [
      "Government building programs",
      "Corporate campus farms",
      "Educational partnerships",
      "Sustainability initiatives",
    ],
  },
  "denver": {
    name: "Denver",
    country: "USA",
    region: "Colorado",
    description: "Denver's mile-high altitude doesn't stop us from growing. Our Colorado team brings urban farming expertise to the Rocky Mountain region.",
    highlights: [
      "High-altitude growing expertise",
      "Strong outdoor culture",
      "Corporate wellness programs",
      "Community engagement focus",
    ],
  },
  "columbus": {
    name: "Columbus",
    country: "USA",
    region: "Ohio",
    description: "Columbus is embracing urban agriculture with open arms. We're growing food and community connections across Ohio's capital city.",
    highlights: [
      "Growing partner network",
      "University partnerships",
      "Corporate programs",
      "Food security initiatives",
    ],
  },
  "seattle": {
    name: "Seattle",
    country: "USA",
    region: "Washington",
    description: "Seattle's tech-forward culture extends to urban farming. We're serving the Pacific Northwest with sustainable growing programs year-round.",
    highlights: [
      "Tech company partnerships",
      "Sustainability focus",
      "Rain-friendly growing systems",
      "Strong local food culture",
    ],
  },
  "amsterdam": {
    name: "Amsterdam",
    country: "Netherlands",
    region: "North Holland",
    description: "Amsterdam leads the way in European urban farming. Our Dutch team brings sustainable agriculture to one of the world's most innovative cities.",
    highlights: [
      "European headquarters",
      "Sustainability leadership",
      "Corporate partnerships",
      "Urban innovation hub",
    ],
  },
  "berlin": {
    name: "Berlin",
    country: "Germany",
    region: "Brandenburg",
    description: "Berlin's creative spirit extends to urban farming. We're growing food and community connections across Germany's capital.",
    highlights: [
      "Strong sustainability culture",
      "Corporate engagement",
      "Community programs",
      "Growing network",
    ],
  },
  "london": {
    name: "London",
    country: "UK",
    region: "England",
    description: "London is embracing rooftop farming like never before. Our UK team serves properties across the capital with sustainable urban agriculture programs.",
    highlights: [
      "Major commercial partnerships",
      "BREEAM certification support",
      "Corporate programs",
      "Food bank donations",
    ],
  },
  "paris": {
    name: "Paris",
    country: "France",
    region: "Île-de-France",
    description: "Paris is becoming a leader in urban agriculture. We're bringing fresh produce and community engagement to the City of Light.",
    highlights: [
      "Rooftop farm programs",
      "Gastronomic partnerships",
      "Corporate engagement",
      "Sustainability initiatives",
    ],
  },
  "zurich": {
    name: "Zurich",
    country: "Switzerland",
    region: "Canton of Zurich",
    description: "Zurich's commitment to sustainability aligns perfectly with urban farming. Our Swiss team brings fresh produce to one of Europe's most livable cities.",
    highlights: [
      "Corporate campus farms",
      "High sustainability standards",
      "Financial sector partnerships",
      "Community programs",
    ],
  },
};

export function CityDetail({ onBookDemo }: CityDetailProps) {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = citySlug ? cityData[citySlug] : null;

  if (!city) {
    return (
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <h1 className="heading-display mb-8">City Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find information about this city.
          </p>
          <Link to="/cities" className="btn-outline">
            View All Cities
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO
        title={`Urban Farming in ${city.name} | MicroHabitat`}
        description={`${city.description} Discover MicroHabitat's urban farming solutions in ${city.name}, ${city.region}.`}
        canonical={`/cities/${citySlug}`}
        ogImage="/og-images/cities-og.jpg"
        keywords={[
          `urban farming ${city.name}`,
          `rooftop farming ${city.name}`,
          `urban agriculture ${city.name}`,
          city.name,
          city.region,
        ]}
      />
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <p className="label">{city.region}, {city.country}</p>
          </div>
          <h1 className="heading-display mb-8">
            Urban Farming in <span className="text-primary">{city.name}</span>
          </h1>
          <p className="text-body max-w-3xl mb-10">
            {city.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={onBookDemo}>
              Get Started in {city.name}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Highlights Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">{city.name} Highlights</p>
          <h2 className="heading-section mb-12">
            What we offer in {city.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {city.highlights.map((highlight, index) => (
              <div key={index} className="card-minimal p-6 flex items-start gap-4">
                <Leaf className="w-6 h-6 text-primary shrink-0 mt-1" />
                <span className="text-lg">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Services Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Our Services</p>
          <h2 className="heading-section mb-12">
            Available in {city.name}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/outdoor-farm" className="card-minimal bg-card p-6 group">
              <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                Outdoor Farms
              </h3>
              <p className="text-muted-foreground mb-4">
                Transform rooftops and terraces into productive urban farms.
              </p>
              <span className="text-primary inline-flex items-center font-medium">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
            <Link to="/indoor-farm" className="card-minimal bg-card p-6 group">
              <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                Indoor Farms
              </h3>
              <p className="text-muted-foreground mb-4">
                Year-round growing solutions for interior spaces.
              </p>
              <span className="text-primary inline-flex items-center font-medium">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
            <Link to="/educational-activities" className="card-minimal bg-card p-6 group">
              <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                Educational Activities
              </h3>
              <p className="text-muted-foreground mb-4">
                Workshops, tours, and team building experiences.
              </p>
              <span className="text-primary inline-flex items-center font-medium">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* For Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Who We Serve</p>
          <h2 className="heading-section mb-12">
            Programs for every organization
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/commercial-real-estate" className="card-hover p-6 group">
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">Commercial Real Estate</h3>
              <p className="text-muted-foreground">
                Add unique amenities to your properties and achieve green certifications.
              </p>
            </Link>
            <Link to="/corporations" className="card-hover p-6 group">
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">Corporations</h3>
              <p className="text-muted-foreground">
                Engage employees and support CSR goals with workplace urban farming.
              </p>
            </Link>
            <Link to="/schools" className="card-hover p-6 group">
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">Schools</h3>
              <p className="text-muted-foreground">
                Bring hands-on environmental education to students of all ages.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Ready to grow in {city.name}?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Let's transform your property with urban farming.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              Book a Demo
            </button>
            <Link
              to="/cities"
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              View All Cities
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
