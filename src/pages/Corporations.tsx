import { Link } from "react-router-dom";
import { ArrowRight, Building2, Check, Leaf, MapPin, Monitor, Sparkles, Users } from "lucide-react";
import { Button } from "../components/ui/button";

interface CorporationsProps {
  onBookDemo: () => void;
}

export function Corporations({ onBookDemo }: CorporationsProps) {
  const benefits = [
    {
      icon: Leaf,
      title: "Tailored Urban Farming Installations",
      description: "We design and install indoor and outdoor urban farming areas, utilizing lightweight, non-intrusive technology that's easily implemented on any ground or rooftop space.",
    },
    {
      icon: Sparkles,
      title: "Expert Maintenance and Follow-Up",
      description: "Our local expert urban farmers provide regular maintenance and weekly follow-ups, ensuring your urban farm thrives and produces a varied bounty of vegetables, herbs, and edible flowers.",
    },
    {
      icon: Users,
      title: "Engaging Workshops and Programs",
      description: "Foster team bonding and environmental awareness through hands-on urban farming workshops, guided garden tours, and interactive learning sessions.",
    },
    {
      icon: Building2,
      title: "CSR and ESG Support",
      description: "Demonstrate your commitment to sustainability with measurable environmental impact and support for green building certifications.",
    },
  ];

  const activities = [
    {
      icon: Monitor,
      title: "Virtual Urban Farming Workshops",
      description: "Engage remote teams with interactive online sessions covering sustainable farming practices, composting basics, and urban agriculture education.",
    },
    {
      icon: MapPin,
      title: "Corporate Garden Visits",
      description: "Bring your team to experience urban farming firsthand. Perfect for team building events, client entertainment, and employee engagement activities.",
    },
    {
      icon: Building2,
      title: "Urban Farming Kiosks",
      description: "Install engaging educational stations in your office that showcase your sustainability initiatives and inspire daily action from employees.",
    },
  ];

  const process = [
    { step: "1", title: "Book a Demo", description: "Discuss your sustainability goals and workspace possibilities." },
    { step: "2", title: "Free Site Assessment", description: "We evaluate your space for optimal farm placement." },
    { step: "3", title: "Custom Proposal", description: "Receive a tailored plan with timeline and investment." },
    { step: "4", title: "Installation", description: "Professional setup with no permanent modifications." },
    { step: "5", title: "Ongoing Service", description: "Weekly care, harvesting, and activities year-round." },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-6">For Corporations</p>
          <h1 className="heading-display mb-8">
            Urban Farming for <span className="text-primary">Corporations</span>
          </h1>
          <p className="text-body max-w-3xl mb-10">
            Transform your corporate environment with sustainable urban agriculture.
            Engage employees, support CSR goals, and create a workplace that reflects
            your commitment to a healthier planet.
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

      {/* Transform Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mb-12">
            <p className="label mb-4">Why Urban Farming?</p>
            <h2 className="heading-section mb-6">
              Transform Your Business with Urban Agriculture
            </h2>
            <p className="text-muted-foreground text-lg">
              Urban farming creates a living, breathing amenity that engages employees,
              supports sustainability goals, and differentiates your workplace in a
              competitive talent market.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
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

      {/* Activities Section */}
      <section className="section bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Engagement Activities</p>
          <h2 className="heading-section mb-12">
            Enhance Your Corporate Environment
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div key={index} className="card-minimal bg-card p-6">
                <activity.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-3">{activity.title}</h3>
                <p className="text-muted-foreground">{activity.description}</p>
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
              How it works
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
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">Requirements</p>
              <h2 className="heading-section mb-6">
                Is Your Property Suitable?
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Most corporate spaces can host an urban farm. Here's what we look for:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>Outdoor:</strong> Rooftop, terrace, or ground-level space with 200+ sq ft</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>Indoor:</strong> Lobby, cafeteria, or common area with adequate lighting</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>Sunlight:</strong> At least 6 hours daily for outdoor farms</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>Water:</strong> Access to a water source nearby</span>
                </li>
              </ul>
            </div>
            <div className="card-minimal p-8">
              <h3 className="text-xl font-medium mb-4">Not sure if your space qualifies?</h3>
              <p className="text-muted-foreground mb-6">
                Book a free site assessment with our team. We'll evaluate your property
                and provide recommendations tailored to your space and goals.
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

      {/* Benefits List */}
      <section className="section bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="label mb-4">For Employees</p>
              <h3 className="text-2xl font-medium mb-6">Employee Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Access to fresh, locally-grown produce</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Stress reduction through biophilic design</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Team building through shared activities</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Connection to nature in urban environment</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Educational workshops and activities</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="label mb-4">For Your Business</p>
              <h3 className="text-2xl font-medium mb-6">Corporate Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Tangible CSR and ESG initiatives</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Green building certification support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Enhanced employer brand and recruitment</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Community engagement opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Food bank donation programs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Ready to grow your sustainability story?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join leading corporations already transforming their workplaces with MicroHabitat.
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
