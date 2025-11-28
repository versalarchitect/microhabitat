import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Heart, Leaf, Users } from "lucide-react";
import { Button } from "../components/ui/button";

interface CommunityEngagementProps {
  onBookDemo: () => void;
}

export function CommunityEngagement({ onBookDemo }: CommunityEngagementProps) {
  const pillars = [
    {
      icon: Users,
      title: "Hands-On Experiences",
      description: "From planting workshops to harvest days, we offer engaging activities that bring tenants, employees, families, and neighbors into the heart of the farm.",
    },
    {
      icon: Heart,
      title: "Inclusive Programming",
      description: "Our farms serve as platforms for diverse community initiatives—including gardening with special needs groups, school programs, and multi-generational events that break social isolation.",
    },
    {
      icon: BookOpen,
      title: "Urban Agriculture Education",
      description: "Each season, we host over 1,000 activities that teach sustainable farming, biodiversity, nutrition, and climate resilience—all tailored to different age groups and learning styles.",
    },
    {
      icon: Leaf,
      title: "Local Food Donation",
      description: "Our farms grow more than produce—they grow impact. Dedicate your harvest to support local food banks and help fight food insecurity in your community.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-6">Community</p>
          <h1 className="heading-display mb-8">
            Community <span className="text-primary">Engagement</span>
          </h1>
          <p className="text-body max-w-3xl mb-10">
            At MicroHabitat, we believe urban farming should nourish more than just buildings—it
            should nourish communities. Our programs bring people together around fresh food,
            sustainable practices, and shared experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={onBookDemo}>
              Start a Program
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Pillars Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Our Approach</p>
          <h2 className="heading-section mb-12">
            Building community through urban farming
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="card-minimal p-8">
                <pillar.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-medium mb-4">{pillar.title}</h3>
                <p className="text-muted-foreground">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Urban Solidarity Farms */}
      <section className="section bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">Urban Solidarity Farms</p>
              <h2 className="heading-section mb-6">
                Fighting Hunger, One Pot at a Time
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Every Microhabitat pot sold supports Team No Kid Hungry and The Breakfast Club
                of Canada. For each individual pot we set up, we donate 1 to 3 meals to help
                ensure children across North America have access to nutritious food.
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Our Urban Solidarity Farms program runs from July to October, allowing partners
                to dedicate their harvest to support local food banks and help fight food
                insecurity in their communities.
              </p>
              <Button onClick={onBookDemo}>
                Join the Program
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-6">
              <div className="card-minimal p-6">
                <p className="text-4xl font-medium text-primary mb-2">35+</p>
                <p className="text-muted-foreground">Food banks supported</p>
              </div>
              <div className="card-minimal p-6">
                <p className="text-4xl font-medium text-primary mb-2">40k</p>
                <p className="text-muted-foreground">Portions of food donated</p>
              </div>
              <div className="card-minimal p-6">
                <p className="text-4xl font-medium text-primary mb-2">13k</p>
                <p className="text-muted-foreground">Meals funded through programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Activities Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Community Activities</p>
          <h2 className="heading-section mb-12">
            1,000+ activities each season
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-4">Planting Workshops</h3>
              <p className="text-muted-foreground">
                Hands-on sessions where community members learn to plant, care for,
                and grow their own vegetables and herbs.
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-4">Harvest Days</h3>
              <p className="text-muted-foreground">
                Celebrate the season's bounty with community harvest events that bring
                people together to collect and share fresh produce.
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-4">Farm Tours</h3>
              <p className="text-muted-foreground">
                Guided tours of working urban farms that educate visitors about
                sustainable agriculture and food systems.
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-4">School Programs</h3>
              <p className="text-muted-foreground">
                Educational activities designed for students of all ages, connecting
                classroom learning to real-world growing.
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-4">Corporate Events</h3>
              <p className="text-muted-foreground">
                Team building activities that bring colleagues together around
                sustainable food and shared experiences.
              </p>
            </div>
            <div className="card-minimal p-6">
              <h3 className="text-xl font-medium mb-4">Special Needs Programs</h3>
              <p className="text-muted-foreground">
                Inclusive gardening activities designed to engage people of all
                abilities in the joy of growing food.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* For Food Banks */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl">
            <p className="label mb-4">For Food Banks & NGOs</p>
            <h2 className="heading-section mb-6">
              Partner with us to fight food insecurity
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              We work with food banks and community organizations across North America
              to donate fresh, locally-grown produce. Our Urban Solidarity Farms program
              connects our partner properties with food banks in their communities.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              If your organization serves community members facing food insecurity, we'd
              love to explore how we can work together to bring fresh produce to those
              who need it most.
            </p>
            <Link to="/contact" className="btn-outline">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Ready to engage your community?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Let's create meaningful connections through urban farming.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              Start a Program
            </button>
            <Link
              to="/about"
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
