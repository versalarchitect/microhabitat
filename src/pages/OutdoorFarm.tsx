import { Link } from "react-router-dom";
import { ArrowRight, Check, Leaf, Sun, TreePine, Users, Wrench } from "lucide-react";
import { Button } from "../components/ui/button";

interface OutdoorFarmProps {
  onBookDemo: () => void;
}

export function OutdoorFarm({ onBookDemo }: OutdoorFarmProps) {
  const benefits = [
    {
      icon: Sun,
      title: "Maximize Unused Space",
      description: "Convert rooftops and open areas into high-impact green amenities that support sustainability goals and add measurable value to your asset.",
    },
    {
      icon: Leaf,
      title: "Grow Fresh, Local Produce",
      description: "From heirloom vegetables to edible flowers, our urban farms produce seasonal harvests to share with tenants, engage employees, or support local food banks.",
    },
    {
      icon: TreePine,
      title: "Boost Biodiversity & Air Quality",
      description: "Our regenerative farms attract pollinators and boost biodiversity—contributing to BOMA BEST, LEED, WELL, and Fitwel certification efforts.",
    },
    {
      icon: Wrench,
      title: "Fully Managed, Turnkey Service",
      description: "We take care of everything—from initial setup to weekly care and harvesting. No prior experience or in-house resources needed.",
    },
    {
      icon: Users,
      title: "Engage Communities & Tenants",
      description: "From planting workshops to harvest days, we offer engaging activities that bring tenants, employees, families, and neighbors into the heart of the farm.",
    },
  ];

  const packages = [
    {
      name: "30 pots",
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
      name: "50 pots",
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

  const process = [
    {
      step: "1",
      title: "Book a Demo",
      description: "Schedule a free consultation to discuss your property and goals.",
    },
    {
      step: "2",
      title: "Free Site Assessment",
      description: "Our team evaluates your space for sunlight, access, and suitability.",
    },
    {
      step: "3",
      title: "Custom Proposal",
      description: "Receive a tailored plan with design, timeline, and investment options.",
    },
    {
      step: "4",
      title: "Installation",
      description: "Our team handles complete setup—no permanent modifications required.",
    },
    {
      step: "5",
      title: "Ongoing Care",
      description: "We manage everything from planting to harvesting, season after season.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
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
      </section>

      <div className="divider" />

      {/* Why Choose Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Benefits</p>
          <h2 className="heading-section mb-12">
            Why Choose Outdoor Urban Farms?
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

      {/* Packages Section */}
      <section className="section bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
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

      {/* Process Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mb-12">
            <p className="label mb-4">The Process</p>
            <h2 className="heading-section mb-6">
              From concept to harvest
            </h2>
            <p className="text-muted-foreground text-lg">
              Our turnkey approach means you can enjoy a thriving urban farm without
              any of the complexity.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-medium text-primary/20 mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Suitability Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
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
