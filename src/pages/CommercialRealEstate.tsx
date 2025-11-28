import { Link } from "react-router-dom";
import { ArrowRight, Award, Building2, Check, Leaf, MapPin, Monitor, Sparkles, Users } from "lucide-react";
import { Button } from "../components/ui/button";

interface CommercialRealEstateProps {
  onBookDemo: () => void;
}

export function CommercialRealEstate({ onBookDemo }: CommercialRealEstateProps) {
  const services = [
    {
      icon: Leaf,
      title: "Tailored Urban Farming Installations",
      description: "We design and install outdoor and indoor urban farming areas, utilizing lightweight, non-intrusive technology that's easily implemented on any ground or rooftop space, suitable for both commercial buildings and residential properties.",
    },
    {
      icon: Sparkles,
      title: "Ongoing Maintenance & Expert Care",
      description: "Our team of urban farmers provides weekly maintenance visits, ensuring your farm thrives throughout the season with professional care, harvesting, and produce delivery.",
    },
    {
      icon: Monitor,
      title: "Virtual Urban Farming Workshops",
      description: "Engage tenants and employees with interactive online workshops covering sustainable farming practices, composting, and urban agriculture education.",
    },
    {
      icon: MapPin,
      title: "Personalized Garden Tours",
      description: "Offer immersive guided tours of your urban farm, creating memorable experiences for tenants, visitors, and stakeholders that showcase your sustainability commitment.",
    },
    {
      icon: Building2,
      title: "Innovative Display Kiosks",
      description: "Install engaging kiosks in common areas that educate visitors about urban farming and your property's environmental initiatives.",
    },
    {
      icon: Users,
      title: "Portfolio-Wide Urban Farming Rollout",
      description: "Scale your sustainability program across multiple properties with coordinated implementation, consistent branding, and centralized reporting.",
    },
  ];

  const certifications = [
    { name: "LEED", description: "Leadership in Energy and Environmental Design" },
    { name: "BOMA BEST", description: "Building Environmental Standards" },
    { name: "WELL", description: "Health and Wellness Building Standard" },
    { name: "Fitwel", description: "Healthy Building Certification" },
    { name: "GRESB", description: "ESG Benchmark for Real Estate" },
  ];

  const process = [
    { step: "1", title: "Book a Demo", description: "Schedule a consultation to discuss your portfolio and sustainability goals." },
    { step: "2", title: "Free Site Assessment", description: "Our team evaluates your properties for optimal farm placement and design." },
    { step: "3", title: "Custom Proposal", description: "Receive a tailored program with timeline, investment, and expected returns." },
    { step: "4", title: "Installation", description: "Professional setup with no permanent modifications to your building." },
    { step: "5", title: "Ongoing Service", description: "Weekly maintenance, harvesting, activities, and reporting year after year." },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-6">For Commercial Real Estate</p>
          <h1 className="heading-display mb-8">
            Urban Farming for <span className="text-primary">Commercial Real Estate</span>
          </h1>
          <p className="text-body max-w-3xl mb-10">
            Transform your properties into sustainable, community-focused assets. Our turnkey
            urban farming solutions help you achieve green certifications, engage tenants,
            and differentiate your portfolio.
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

      {/* Partner Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl">
            <p className="label mb-4">Your Partner in Green Real Estate</p>
            <h2 className="heading-section mb-6">
              A turnkey amenity that delivers measurable returns
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              MicroHabitat's approach to urban agriculture is designed to be comprehensive,
              simple, and engaging. Here's what partnering with us means for your portfolio:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Differentiate properties in a competitive market</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Achieve green building certification credits</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Enhance tenant satisfaction and retention</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Support ESG reporting requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Zero operational burden—we handle everything</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Services Section */}
      <section className="section bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4">What We Offer</p>
          <h2 className="heading-section mb-12">
            Our Comprehensive Service Offerings
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card-minimal bg-card p-6">
                <service.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Certifications Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">Certification Support</p>
              <h2 className="heading-section mb-6">
                Green Building Certifications
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Our urban farming programs are designed to support your green building
                certification efforts. We provide documentation and support for multiple
                certification systems.
              </p>
              <Button onClick={onBookDemo}>
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="card-minimal p-4 flex items-center gap-4">
                  <Award className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
      <section className="section bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">Property Requirements</p>
              <h2 className="heading-section mb-6">
                Is Your Property Suitable?
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Most commercial properties can host an urban farm. We work with:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Office buildings with rooftops or terraces</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Shopping centers with outdoor areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Mixed-use developments</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Industrial properties with unused space</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Any property with 200+ sq ft and good sunlight</span>
                </li>
              </ul>
            </div>
            <div className="card-minimal bg-card p-8">
              <h3 className="text-xl font-medium mb-4">Get a Free Assessment</h3>
              <p className="text-muted-foreground mb-6">
                Our team will evaluate your property and provide recommendations
                tailored to your space and sustainability goals.
              </p>
              <Button onClick={onBookDemo} className="w-full">
                Schedule Assessment
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
            Transform your portfolio with urban farming
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join industry leaders already growing with MicroHabitat.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              Book a Demo
            </button>
            <Link
              to="/partnerships"
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              View Partners
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
