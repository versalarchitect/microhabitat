import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../components/ui/button";

interface IndoorFarmProps {
  onBookDemo: () => void;
}

export function IndoorFarm({ onBookDemo }: IndoorFarmProps) {
  const features = [
    {
      title: "Year-Round Growing",
      description: "Produce fresh herbs, greens, and microgreens 365 days a year—regardless of season or outdoor climate. Perfect for harsh winters or spaces without natural sunlight.",
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/8b9c5a50-7c66-4ff7-a790-c540bcc78a91/indoor-farm-unit.jpg",
    },
    {
      title: "Turnkey Installation",
      description: "No plumbing, no special hookups, no mess. Our self-contained units fit into any interior space—lobbies, cafeterias, common areas—and require only standard electrical access.",
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c4b9e4e9-eeb4-4408-bd49-492033a12fec/educational-activities.jpg",
    },
    {
      title: "Professional Maintenance",
      description: "Our urban farmers handle everything: planting, care, harvesting, and delivery. You get fresh produce without lifting a finger.",
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
    },
  ];

  const packageFeatures = [
    "Turnkey Installation – Fits easily into any space, no plumbing or special hookups required.",
    "Weekly Professional Maintenance – Year-round care by our expert urban farmers.",
    "2 Educational Activities – Engaging workshops tailored to your team or tenants.",
    "Fresh Harvest Distribution – Regular delivery of herbs, greens, and microgreens.",
    "Marketing Support – Showcase your sustainability commitment with branded materials.",
    "Green Certification Support – Documentation for LEED, WELL, Fitwel, and other programs.",
  ];

  const certifications = [
    "LEED",
    "WELL",
    "Fitwel",
    "BOMA BEST",
    "GRESB",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-6">Services</p>
              <h1 className="heading-display mb-8">
                Indoor <span className="text-primary">Farms</span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                Bring urban agriculture indoors with our year-round growing solutions.
                Perfect for lobbies, cafeterias, and any interior space seeking a living,
                productive centerpiece.
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
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/8b9c5a50-7c66-4ff7-a790-c540bcc78a91/indoor-farm-unit.jpg"
                alt="Indoor Farm Unit"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Features Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4">What We Offer</p>
          <h2 className="heading-section mb-12">
            Comprehensive indoor farming services
          </h2>
          <div className="space-y-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <h3 className="text-2xl font-medium mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                </div>
                <div className={`aspect-video rounded-md overflow-hidden ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Package Section */}
      <section className="section bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">What's Included</p>
              <h2 className="heading-section mb-6">
                The Indoor Farm Package
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Everything you need for a thriving indoor growing operation,
                managed entirely by our expert team.
              </p>
              <ul className="space-y-4">
                {packageFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-minimal bg-card p-8">
              <h3 className="text-xl font-medium mb-4">Ready to get started?</h3>
              <p className="text-muted-foreground mb-6">
                Our team will help you design the perfect indoor farm for your space,
                whether it's a compact herb garden or a full-scale growing installation.
              </p>
              <Button onClick={onBookDemo} className="w-full mb-4">
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Free consultation • No commitment
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Certifications Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="label mb-4">Green Building Support</p>
            <h2 className="heading-section mb-6">
              We can help contribute to the following certifications
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Our indoor farms support your sustainability goals and can contribute
              credits toward major green building certification programs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert, index) => (
                <span
                  key={index}
                  className="px-6 py-3 border border-border rounded-md font-mono text-sm"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Gallery Section */}
      <section className="section bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4 text-center">Our Work</p>
          <h2 className="heading-section mb-12 text-center">
            Indoor farms in action
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/8b9c5a50-7c66-4ff7-a790-c540bcc78a91/indoor-farm-unit.jpg"
              alt="Indoor Farm 1"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c4b9e4e9-eeb4-4408-bd49-492033a12fec/educational-activities.jpg"
              alt="Indoor Farm 2"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg"
              alt="Indoor Farm 3"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg"
              alt="Indoor Farm 4"
              className="w-full aspect-square object-cover rounded-md"
            />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Bring the farm indoors
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Year-round growing, zero hassle. Let's design your indoor farm.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              Book a Demo
            </button>
            <Link
              to="/outdoor-farm"
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              View Outdoor Farms
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
