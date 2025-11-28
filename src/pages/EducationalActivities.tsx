import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, MapPin, Monitor, Users } from "lucide-react";
import { Button } from "../components/ui/button";

interface EducationalActivitiesProps {
  onBookDemo: () => void;
}

export function EducationalActivities({ onBookDemo }: EducationalActivitiesProps) {
  const activities = [
    {
      icon: MapPin,
      title: "Garden Visits",
      subtitle: "Immersive Farm Tours",
      description: "Take the experience home. Complete your tour with a MicroHabitat tote bag filled with seed packets—your first step toward growing change in your own space.",
      features: [
        "Guided tours of working urban farms",
        "Hands-on harvesting experiences",
        "Take-home seed packets and tote bag",
        "Perfect for team outings and client events",
      ],
    },
    {
      icon: Monitor,
      title: "Kiosks",
      subtitle: "Interactive Display Stations",
      description: "Inspire collective action. Spark curiosity and motivate change as guests discover how they can take part in the movement toward greener, more resilient cities.",
      features: [
        "Self-guided educational stations",
        "Interactive displays about urban farming",
        "Seasonal produce tastings",
        "Perfect for lobbies and common areas",
      ],
    },
    {
      icon: BookOpen,
      title: "Workshops",
      subtitle: "Transformative Learning Sessions",
      description: "Discover transformative workshops that bridge your community with urban agriculture. In just one hour, our interactive sessions foster meaningful connections with sustainable food practices.",
      features: [
        "Available in-person or virtually",
        "Topics: composting, seed saving, ecological farming",
        "Customizable to your organization's needs",
        "All age groups welcome",
      ],
    },
  ];

  const workshopTopics = [
    "Introduction to Urban Farming",
    "Composting 101",
    "Seed Saving Techniques",
    "Seasonal Planting Guide",
    "Pollinator Gardens",
    "Container Gardening",
    "Herb Growing Basics",
    "Sustainable Eating",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-6">Services</p>
          <h1 className="heading-display mb-8">
            Educational <span className="text-primary">Team Building</span> Activities
          </h1>
          <p className="text-body max-w-3xl mb-10">
            Engage your community with hands-on learning experiences that connect people
            to sustainable urban agriculture. From guided farm tours to interactive workshops,
            we bring the joy of growing to everyone.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={onBookDemo}>
              Book an Activity
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Activities Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="space-y-16">
            {activities.map((activity, index) => (
              <div key={index}>
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <activity.icon className="w-8 h-8 text-primary" />
                      <p className="label">{activity.subtitle}</p>
                    </div>
                    <h2 className="heading-section mb-6">{activity.title}</h2>
                    <p className="text-muted-foreground text-lg mb-8">
                      {activity.description}
                    </p>
                    <Button onClick={onBookDemo}>
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="card-minimal p-6">
                    <h3 className="font-medium mb-4">What's Included</h3>
                    <ul className="space-y-3">
                      {activity.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {index < activities.length - 1 && <div className="divider mt-16" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Workshop Topics */}
      <section className="section bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="label mb-4">Workshop Topics</p>
            <h2 className="heading-section mb-6">
              Learn something new
            </h2>
            <p className="text-muted-foreground text-lg">
              Our workshops cover a range of topics tailored to different interests and
              experience levels. All sessions are designed to be engaging for all ages.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {workshopTopics.map((topic, index) => (
              <div key={index} className="card-minimal bg-card p-4 text-center">
                <span className="text-sm font-medium">{topic}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-4">
              Don't see what you're looking for? We create custom workshops too.
            </p>
            <Button onClick={onBookDemo} variant="outline">
              Request Custom Workshop
            </Button>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* For Organizations */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4">For Organizations</p>
          <h2 className="heading-section mb-12">
            Activities for every setting
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-minimal p-6">
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">Corporate Teams</h3>
              <p className="text-muted-foreground">
                Build team cohesion with engaging activities that get people
                out of the office and into the garden. Perfect for team building
                days and sustainability initiatives.
              </p>
            </div>
            <div className="card-minimal p-6">
              <BookOpen className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">Schools</h3>
              <p className="text-muted-foreground">
                Support curriculum goals with hands-on learning that covers
                biology, environmental science, nutrition, and more. Activities
                designed for all grade levels.
              </p>
            </div>
            <div className="card-minimal p-6">
              <MapPin className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-3">Building Tenants</h3>
              <p className="text-muted-foreground">
                Create community among building occupants with shared experiences
                around growing and harvesting. A unique amenity that sets your
                property apart.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Stats */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">1,000+</p>
              <p className="text-muted-foreground">Activities per season</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">All Ages</p>
              <p className="text-muted-foreground">Programs for everyone</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">Virtual</p>
              <p className="text-muted-foreground">& In-person options</p>
            </div>
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
            Let's plan educational activities that inspire and connect.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              Book an Activity
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
