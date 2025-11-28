import { Link } from "react-router-dom";
import { ArrowRight, Heart, Leaf, MapPin, Sparkles, Users } from "lucide-react";

interface CareersProps {
  onBookDemo?: () => void;
}

export function Careers(_props: CareersProps) {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability First",
      description: "We're committed to regenerative practices that heal the planet while feeding communities.",
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Everything we do is designed to bring people together around fresh, local food.",
    },
    {
      icon: Heart,
      title: "Impact Driven",
      description: "We measure success by the positive change we create in cities around the world.",
    },
    {
      icon: Sparkles,
      title: "Innovation Minded",
      description: "We're constantly finding new ways to make urban farming accessible and impactful.",
    },
  ];

  const locations = [
    { city: "Montreal", country: "Canada", type: "Headquarters" },
    { city: "Toronto", country: "Canada", type: "Regional Office" },
    { city: "New York", country: "USA", type: "Regional Office" },
    { city: "Paris", country: "France", type: "European Office" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-6">Careers</p>
          <h1 className="heading-display mb-8">
            Grow your career with <span className="text-primary">MicroHabitat</span>
          </h1>
          <p className="text-body max-w-3xl mb-10">
            Join our team of urban farmers, sustainability experts, and community builders.
            We're on a mission to transform cities one rooftop at a time.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:careers@microhabitat.com"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-primary hover:bg-primary/90 transition-colors"
            >
              View Open Positions
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <Link to="/about" className="btn-outline">
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Values Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Our Values</p>
          <h2 className="heading-section mb-12">
            What drives us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-minimal p-6">
                <value.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Why Join Section */}
      <section className="section bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">Why Join Us</p>
              <h2 className="heading-section mb-6">
                More than a job
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                At MicroHabitat, you'll be part of a team that's making a real difference.
                Every day, our work contributes to healthier cities, stronger communities,
                and a more sustainable food system.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Work outdoors with plants and nature</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Make a tangible impact on food security</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Join a diverse, passionate team</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Grow your skills and career</span>
                </li>
              </ul>
            </div>
            <div className="card-minimal p-8">
              <h3 className="text-xl font-medium mb-4">Current Openings</h3>
              <p className="text-muted-foreground mb-6">
                We're always looking for passionate people to join our team. Check our
                current openings or send us your resume to be considered for future roles.
              </p>
              <a
                href="mailto:careers@microhabitat.com"
                className="inline-flex items-center w-full justify-center px-6 py-3 bg-primary text-primary-foreground font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-primary hover:bg-primary/90 transition-colors"
              >
                Send Your Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Locations Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Our Locations</p>
          <h2 className="heading-section mb-12">
            Where we work
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location, index) => (
              <div key={index} className="card-minimal p-6">
                <MapPin className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-1">{location.city}</h3>
                <p className="text-muted-foreground mb-2">{location.country}</p>
                <p className="text-sm text-primary">{location.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Ready to make a difference?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join our growing team and help us transform urban spaces into thriving farms.
          </p>
          <a
            href="mailto:careers@microhabitat.com"
            className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}
