import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { SEO, PAGE_SEO } from "../components/SEO";

interface EducationalActivitiesProps {
  onBookDemo: () => void;
}

export function EducationalActivities({ onBookDemo }: EducationalActivitiesProps) {
  const activities = [
    {
      title: "Garden Visits",
      subtitle: "Immersive Farm Tours",
      description: "Take the experience home. Complete your tour with a MicroHabitat tote bag filled with seed packets—your first step toward growing change in your own space.",
      features: [
        "Guided tours of working urban farms",
        "Hands-on harvesting experiences",
        "Take-home seed packets and tote bag",
        "Perfect for team outings and client events",
      ],
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/4a74347c-67e8-46ca-8063-9663438bd4dd/8.7.24-West+Hills-66.jpg",
    },
    {
      title: "Kiosks",
      subtitle: "Interactive Display Stations",
      description: "Inspire collective action. Spark curiosity and motivate change as guests discover how they can take part in the movement toward greener, more resilient cities.",
      features: [
        "Self-guided educational stations",
        "Interactive displays about urban farming",
        "Seasonal produce tastings",
        "Perfect for lobbies and common areas",
      ],
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c4b9e4e9-eeb4-4408-bd49-492033a12fec/educational-activities.jpg",
    },
    {
      title: "Workshops",
      subtitle: "Transformative Learning Sessions",
      description: "Discover transformative workshops that bridge your community with urban agriculture. In just one hour, our interactive sessions foster meaningful connections with sustainable food practices.",
      features: [
        "Available in-person or virtually",
        "Topics: composting, seed saving, ecological farming",
        "Customizable to your organization's needs",
        "All age groups welcome",
      ],
      image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5969186f-511a-4d62-a903-bedd8e8e7f85/Enfant+fille+6.jpg",
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
      <SEO {...PAGE_SEO.educationalActivities} canonical="/educational-activities" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
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
            <div className="aspect-video rounded-md overflow-hidden">
              <img
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/4a74347c-67e8-46ca-8063-9663438bd4dd/8.7.24-West+Hills-66.jpg"
                alt="Educational Activity"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Activities Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="space-y-20">
            {activities.map((activity, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <p className="label mb-4">{activity.subtitle}</p>
                  <h2 className="heading-section mb-6">{activity.title}</h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    {activity.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {activity.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={onBookDemo}>
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className={`aspect-video rounded-md overflow-hidden ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Workshop Topics */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
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

      {/* Gallery Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4 text-center">Our Activities</p>
          <h2 className="heading-section mb-12 text-center">
            Engaging communities through learning
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/4a74347c-67e8-46ca-8063-9663438bd4dd/8.7.24-West+Hills-66.jpg"
              alt="Educational Activity 1"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c4b9e4e9-eeb4-4408-bd49-492033a12fec/educational-activities.jpg"
              alt="Educational Activity 2"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5969186f-511a-4d62-a903-bedd8e8e7f85/Enfant+fille+6.jpg"
              alt="Educational Activity 3"
              className="w-full aspect-square object-cover rounded-md"
            />
            <img
              src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg"
              alt="Educational Activity 4"
              className="w-full aspect-square object-cover rounded-md"
            />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Stats */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
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
