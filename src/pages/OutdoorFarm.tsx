import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { SEO, PAGE_SEO } from "../components/SEO";

interface OutdoorFarmProps {
  onBookDemo: () => void;
}

export function OutdoorFarm({ onBookDemo }: OutdoorFarmProps) {
  const services = [
    {
      title: "Turnkey Urban Farm Installations",
      description: "We provide all materials, labor, and expertise to set up your outdoor farm—no prior experience or in-house resources needed. All pots are easily removable with no permanent modification to your property.",
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
    },
    {
      title: "Weekly Garden Care & Harvesting",
      description: "Our team handles everything from planting and weeding to pest management and harvesting. We visit weekly to ensure your garden stays healthy and productive all season long.",
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/cdab09dc-3167-4f11-ac84-618b1d4d4102/Cadillac+Fairview_220+Yonge+St+Toronto-4201_MicroHabitat+2024.jpg",
    },
    {
      title: "Ecological Growing Practices",
      description: "We grow using regenerative, organic methods—no synthetic chemicals, pesticides, or fertilizers. Our approach promotes biodiversity, supports pollinators, and contributes to BOMA BEST, LEED, WELL, and Fitwel certification efforts.",
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/35f2e2b7-a43d-4f90-9a34-01348d159a00/Cadillac+Fairview_220+Yonge+St+Toronto-3889_MicroHabitat+2024+%281%29.jpg",
    },
  ];

  const packages = [
    {
      name: "30 Pots",
      features: [
        "30 fabric grow pots",
        "Ecological irrigation system",
        "Seasonal planting",
        "Weekly maintenance visits",
        "Harvesting and delivery",
        "2 educational activities",
        "Marketing toolkit",
      ],
    },
    {
      name: "50 Pots",
      features: [
        "50 fabric grow pots",
        "Ecological irrigation system",
        "Seasonal planting",
        "Weekly maintenance visits",
        "Harvesting and delivery",
        "3 educational activities",
        "Marketing toolkit",
        "Corporate gift options",
      ],
    },
    {
      name: "Custom",
      features: [
        "Custom pot configuration",
        "Ecological irrigation system",
        "Seasonal planting",
        "Weekly maintenance visits",
        "Harvesting and delivery",
        "Unlimited activities",
        "Full marketing support",
        "Corporate gift options",
        "Dedicated account manager",
      ],
    },
  ];

  return (
    <>
      <SEO {...PAGE_SEO.outdoorFarm} canonical="/outdoor-farm" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-6">Services</p>
              <h1 className="heading-display mb-8">
                Outdoor <span className="text-primary">Farms</span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                Transform your rooftops, terraces, and outdoor spaces into productive urban farms
                that generate impact, engage communities, and support sustainability goals.
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
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/d7453f90-694b-48ed-af1f-5c16b806db70/Rhapsody_425+Wellington+St+W-0438_MicroHabitat+2024+%281%29.jpg"
                alt="Outdoor Urban Farm"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* What We Offer Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">What We Offer</p>
          <h2 className="heading-section mb-12">
            Comprehensive outdoor farming services
          </h2>
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
                  <p className="text-muted-foreground text-lg">{service.description}</p>
                </div>
                <div className={`aspect-video rounded-md overflow-hidden ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Gallery Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4 text-center">Our Work</p>
          <h2 className="heading-section mb-12 text-center">
            Outdoor farms in action
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg"
              alt="Rooftop Farm 1"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/cdab09dc-3167-4f11-ac84-618b1d4d4102/Cadillac+Fairview_220+Yonge+St+Toronto-4201_MicroHabitat+2024.jpg"
              alt="Rooftop Farm 2"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/35f2e2b7-a43d-4f90-9a34-01348d159a00/Cadillac+Fairview_220+Yonge+St+Toronto-3889_MicroHabitat+2024+%281%29.jpg"
              alt="Fresh Produce"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/d7453f90-694b-48ed-af1f-5c16b806db70/Rhapsody_425+Wellington+St+W-0438_MicroHabitat+2024+%281%29.jpg"
              alt="Urban Garden"
              className="w-full aspect-square object-cover rounded-md"
            />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Packages Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Packages</p>
          <h2 className="heading-section mb-12">
            Choose your farm size
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className="card-minimal bg-card p-8">
                <h3 className="text-2xl font-medium mb-6">{pkg.name}</h3>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button onClick={onBookDemo} className="w-full">
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Requirements Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">Requirements</p>
              <h2 className="heading-section mb-6">
                Is Your Property Suitable?
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Most outdoor spaces can host an urban farm. Here's what we look for:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>Space:</strong> Minimum 200 sq ft (20m²) of accessible area</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>Sunlight:</strong> At least 6 hours of direct sunlight daily</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>Water:</strong> Access to a water source nearby</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>Access:</strong> Safe access for our maintenance team</span>
                </li>
              </ul>
            </div>
            <div className="card-minimal p-8">
              <h3 className="text-xl font-medium mb-4">Not sure if your space qualifies?</h3>
              <p className="text-muted-foreground mb-6">
                Book a free site assessment with our team. We'll evaluate your property
                and provide recommendations tailored to your space.
              </p>
              <Button onClick={onBookDemo} className="w-full">
                Get Free Assessment
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
            Ready to transform your outdoor space?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join 250+ properties already growing with MicroHabitat.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              Book a Demo
            </button>
            <Link
              to="/faq"
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
