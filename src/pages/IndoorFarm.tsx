import { Link } from "react-router-dom";
import { ArrowRight, Check, Droplets, Leaf, Lightbulb, Settings, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";

interface IndoorFarmProps {
  onBookDemo: () => void;
}

export function IndoorFarm({ onBookDemo }: IndoorFarmProps) {
  const benefits = [
    {
      icon: Sparkles,
      title: "Activate Your Interior Spaces",
      description: "Transform lobbies, cafeterias, and common areas into vibrant growing spaces that captivate visitors and engage occupants year-round.",
    },
    {
      icon: Leaf,
      title: "Grow Year-Round, Anywhere",
      description: "Our indoor units produce fresh herbs, greens, and microgreens regardless of season or weather—perfect for climates with harsh winters.",
    },
    {
      icon: Lightbulb,
      title: "Boost Health & Engagement",
      description: "Biophilic design elements improve air quality, reduce stress, and create memorable experiences for tenants and employees.",
    },
    {
      icon: Settings,
      title: "Hands-Off for You, Turnkey from Us",
      description: "No plumbing, no special hookups required. Our team handles installation, maintenance, and harvesting—you just enjoy the results.",
    },
    {
      icon: Droplets,
      title: "Engage Communities",
      description: "Create opportunities for workshops, tastings, and educational activities that bring people together around fresh food.",
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
      </section>

      <div className="divider" />

      {/* Benefits Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Benefits</p>
          <h2 className="heading-section mb-12">
            Why Choose Indoor Urban Farms?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card-minimal p-6">
                <benefit.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
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

      {/* Use Cases Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Perfect For</p>
          <h2 className="heading-section mb-12">
            Where indoor farms thrive
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-3">Office Buildings</h3>
              <p className="text-muted-foreground">
                Create a living amenity in your lobby or common areas that engages
                tenants and showcases sustainability commitment.
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-3">Corporate Cafeterias</h3>
              <p className="text-muted-foreground">
                Grow fresh herbs and greens steps away from where they're served,
                creating a farm-to-table experience for employees.
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-3">Schools & Universities</h3>
              <p className="text-muted-foreground">
                Integrate living classrooms that teach biology, nutrition, and
                sustainability through hands-on growing experiences.
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-3">Hospitals & Healthcare</h3>
              <p className="text-muted-foreground">
                Support patient wellness with biophilic design and fresh produce
                grown on-site for therapeutic kitchens.
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-3">Hotels & Hospitality</h3>
              <p className="text-muted-foreground">
                Differentiate your property with a visible commitment to
                sustainability and locally-grown ingredients.
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-3">Residential Buildings</h3>
              <p className="text-muted-foreground">
                Offer residents a unique amenity with communal growing spaces
                and regular educational programming.
              </p>
            </div>
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
