import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

interface PartnershipsProps {
  onBookDemo: () => void;
}

export function Partnerships({ onBookDemo }: PartnershipsProps) {
  const partners = [
    { name: "BNP Paribas", category: "Financial Services" },
    { name: "GWL Realty Advisors", category: "Real Estate" },
    { name: "Ivanhoé Cambridge", category: "Real Estate" },
    { name: "Cadillac Fairview", category: "Real Estate" },
    { name: "Oxford Properties", category: "Real Estate" },
    { name: "Allied REIT", category: "Real Estate" },
    { name: "Brookfield", category: "Real Estate" },
    { name: "Dream Office", category: "Real Estate" },
    { name: "Choice Properties", category: "Real Estate" },
    { name: "RioCan", category: "Real Estate" },
    { name: "SmartCentres", category: "Real Estate" },
    { name: "Cominar", category: "Real Estate" },
  ];

  const partnerTypes = [
    {
      title: "Commercial Real Estate",
      description: "Partner with us to add unique amenities to your portfolio, achieve green certifications, and differentiate your properties in a competitive market.",
      link: "/commercial-real-estate",
    },
    {
      title: "Corporations",
      description: "Enhance your workplace with sustainable urban farming programs that engage employees, support CSR goals, and create healthier work environments.",
      link: "/corporations",
    },
    {
      title: "Schools & Institutions",
      description: "Bring hands-on environmental education to students with urban farming programs that integrate with curriculum and teach sustainability.",
      link: "/schools",
    },
    {
      title: "Food Banks & NGOs",
      description: "Join our Urban Solidarity Farms program to receive fresh produce donations and support food security in your community.",
      link: "/community-engagement",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-6">Partnerships</p>
          <h1 className="heading-display mb-8">
            Our Partners shaping a <span className="text-primary">sustainable future</span>
          </h1>
          <p className="text-body max-w-3xl mb-10">
            We work with leading organizations across North America and Europe to bring
            urban farming to communities everywhere. Together, we're transforming cities
            and building a more sustainable food system.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={onBookDemo}>
              Become a Partner
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Current Partners */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Our Partners</p>
          <h2 className="heading-section mb-12">
            Industry leaders growing with us
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="card-minimal p-6 text-center">
                <h3 className="font-medium mb-1">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">{partner.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Partnership Types */}
      <section className="section bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Partnership Opportunities</p>
          <h2 className="heading-section mb-12">
            Ways to partner with us
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {partnerTypes.map((type, index) => (
              <div key={index} className="card-minimal bg-card p-8">
                <h3 className="text-xl font-medium mb-4">{type.title}</h3>
                <p className="text-muted-foreground mb-6">{type.description}</p>
                <Link
                  to={type.link}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Impact Together */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="label mb-4">Our Collective Impact</p>
            <h2 className="heading-section mb-8">
              Together, we've achieved
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div>
                <p className="text-4xl font-medium text-primary mb-2">250+</p>
                <p className="text-sm text-muted-foreground">Urban Farms</p>
              </div>
              <div>
                <p className="text-4xl font-medium text-primary mb-2">35+</p>
                <p className="text-sm text-muted-foreground">Food Banks Served</p>
              </div>
              <div>
                <p className="text-4xl font-medium text-primary mb-2">40k</p>
                <p className="text-sm text-muted-foreground">Portions Donated</p>
              </div>
              <div>
                <p className="text-4xl font-medium text-primary mb-2">20</p>
                <p className="text-sm text-muted-foreground">Cities Worldwide</p>
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              Our partnerships enable us to grow more food, reach more communities,
              and create lasting change in cities around the world.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Ready to join the movement?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Partner with MicroHabitat and help shape a more sustainable future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              Become a Partner
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
