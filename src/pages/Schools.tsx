import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Check, GraduationCap, Heart, Leaf, MapPin, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { SEO, PAGE_SEO } from "../components/SEO";

interface SchoolsProps {
  onBookDemo: () => void;
}

export function Schools({ onBookDemo }: SchoolsProps) {
  const benefits = [
    {
      icon: BookOpen,
      title: "Enhanced Learning Outcomes",
      description: "Agricultural practices that reinforce STEM, health, and environmental lessons through hands-on experiential learning.",
    },
    {
      icon: Leaf,
      title: "Environmental Awareness",
      description: "A hands-on approach to teaching sustainability and ecological stewardship that connects students to nature.",
    },
    {
      icon: GraduationCap,
      title: "Grow Fresh, Local Produce",
      description: "From heirloom vegetables to edible flowers, our farms yield seasonal harvests that can be shared with students, staff, or donated to local food banks.",
    },
    {
      icon: Heart,
      title: "Community Engagement",
      description: "Opportunities for students to give back through local food initiatives and collaborative growing efforts.",
    },
  ];

  const programs = [
    {
      icon: BookOpen,
      title: "Workshops for All Ages",
      description: "Interactive sessions designed for different grade levels, covering topics from basic plant biology to advanced sustainability concepts.",
      features: [
        "Age-appropriate curriculum integration",
        "Hands-on planting and harvesting",
        "Science and math connections",
        "Available in-person or virtually",
      ],
    },
    {
      icon: Users,
      title: "Green Committee Workshop Program",
      description: "Empower student leadership with a dedicated program that builds environmental stewardship and project management skills.",
      features: [
        "Student-led garden management",
        "Leadership skill development",
        "Community service opportunities",
        "Year-long engagement program",
      ],
    },
    {
      icon: MapPin,
      title: "Educational Garden Visits",
      description: "Bring students to working urban farms for immersive field trip experiences that bring classroom learning to life.",
      features: [
        "Guided farm tours",
        "Hands-on harvesting activities",
        "Take-home seed packets",
        "Connections to curriculum",
      ],
    },
  ];

  const process = [
    { step: "1", title: "Book a Demo", description: "Discuss your school's educational goals and available space." },
    { step: "2", title: "Free Site Assessment", description: "We evaluate your grounds for optimal garden placement." },
    { step: "3", title: "Custom Proposal", description: "Receive a program tailored to your curriculum and budget." },
    { step: "4", title: "Installation", description: "Professional setup timed around your academic calendar." },
    { step: "5", title: "Ongoing Support", description: "Weekly care, educational activities, and teacher resources." },
  ];

  return (
    <>
      <SEO {...PAGE_SEO.schools} canonical="/schools" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-6">For Schools</p>
              <h1 className="heading-display mb-8">
                Urban Farming for <span className="text-primary">Schools</span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                Transform your school grounds into living classrooms. Our urban farming
                programs enhance learning outcomes, teach environmental stewardship, and
                connect students to where their food comes from.
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
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5969186f-511a-4d62-a903-bedd8e8e7f85/Enfant+fille+6.jpg"
                alt="School Urban Farm"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Benefits Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Why Urban Farming for Schools?</p>
          <h2 className="heading-section mb-12">
            Growing minds, growing food
          </h2>
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

      {/* Programs Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Educational Programs</p>
          <h2 className="heading-section mb-12">
            Our Comprehensive Service Offerings
          </h2>
          <div className="space-y-12">
            {programs.map((program, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-8 items-start">
                <div className="card-minimal bg-card p-6">
                  <program.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-3">{program.title}</h3>
                  <p className="text-muted-foreground">{program.description}</p>
                </div>
                <div className="p-6">
                  <h4 className="font-medium mb-4">Program Includes:</h4>
                  <ul className="space-y-3">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Process Section */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mb-12">
            <p className="label mb-4">The Process</p>
            <h2 className="heading-section mb-6">
              From concept to classroom
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
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">Requirements</p>
              <h2 className="heading-section mb-6">
                Is Your School Suitable?
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Most schools can host an urban farm. Here's what we look for:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span><strong>Space:</strong> Schoolyard, rooftop, or courtyard with 200+ sq ft</span>
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
                  <span><strong>Indoor option:</strong> Cafeterias and common areas also work</span>
                </li>
              </ul>
            </div>
            <div className="card-minimal p-8">
              <h3 className="text-xl font-medium mb-4">Not sure if your school qualifies?</h3>
              <p className="text-muted-foreground mb-6">
                Book a free site assessment with our team. We'll evaluate your space
                and provide recommendations tailored to your educational goals.
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

      {/* Curriculum Integration */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="label mb-4">Curriculum Integration</p>
            <h2 className="heading-section mb-6">
              Connecting to classroom learning
            </h2>
            <p className="text-muted-foreground text-lg">
              Our programs are designed to complement and enhance existing curriculum
              across multiple subject areas.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Biology & Life Sciences",
              "Environmental Science",
              "Mathematics",
              "Nutrition & Health",
              "Geography",
              "Chemistry",
              "Social Studies",
              "Art & Design",
            ].map((subject, index) => (
              <div key={index} className="card-minimal bg-card p-4 text-center">
                <span className="text-sm font-medium">{subject}</span>
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
            Ready to transform learning at your school?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join schools across North America and Europe already growing with MicroHabitat.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              Book a Demo
            </button>
            <Link
              to="/educational-activities"
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              View Activities
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
