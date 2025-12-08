import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "../components/ui/button";
import { SEO, PAGE_SEO } from "../components/SEO";

interface ContactProps {
  onBookDemo: () => void;
}

export function Contact({ onBookDemo }: ContactProps) {
  const offices = [
    {
      city: "Montreal",
      type: "Headquarters",
      country: "Canada",
      address: "1234 Urban Farm Street",
      region: "QC H2X 1Y2",
    },
    {
      city: "NYC",
      type: "US Office",
      country: "USA",
      address: "555 Green Avenue",
      region: "NY 10001",
    },
    {
      city: "Toronto",
      type: "Regional Office",
      country: "Canada",
      address: "789 Garden Boulevard",
      region: "ON M5V 3L9",
    },
  ];

  return (
    <>
      <SEO {...PAGE_SEO.contact} canonical="/contact" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-6">Contact</p>
              <h1 className="heading-display mb-8">
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                Have questions about urban farming? Want to learn how MicroHabitat can
                transform your property? We'd love to hear from you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={onBookDemo}>
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <a
                  href="mailto:info@microhabitat.com"
                  className="btn-outline"
                >
                  Email Us
                </a>
              </div>
            </div>
            <div className="aspect-video rounded-md overflow-hidden">
              <img
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg"
                alt="Contact MicroHabitat"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Contact Methods */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="card-minimal p-8 text-center">
              <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Email</h3>
              <a
                href="mailto:info@microhabitat.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                info@microhabitat.com
              </a>
            </div>
            <div className="card-minimal p-8 text-center">
              <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Phone</h3>
              <a
                href="tel:+15141234567"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                +1 (514) 123-4567
              </a>
            </div>
            <div className="card-minimal p-8 text-center">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Locations</h3>
              <p className="text-muted-foreground">
                20+ cities worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Offices Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Our Offices</p>
          <h2 className="heading-section mb-12">
            Our Headquarters
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="card-minimal bg-card p-8">
                <h3 className="text-2xl font-medium mb-1">{office.city}</h3>
                <p className="text-primary text-sm mb-4">{office.type}</p>
                <div className="space-y-2 text-muted-foreground">
                  <p>{office.address}</p>
                  <p>{office.city}, {office.region}</p>
                  <p>{office.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Contact Form Placeholder */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <p className="label mb-4">Get in Touch</p>
            <h2 className="heading-section mb-6">
              Send us a message
            </h2>
            <p className="text-muted-foreground text-lg">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
          <div className="card-minimal p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label htmlFor="interest" className="block text-sm font-medium mb-2">
                  I'm interested in
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select an option</option>
                  <option value="outdoor-farm">Outdoor Farm</option>
                  <option value="indoor-farm">Indoor Farm</option>
                  <option value="educational">Educational Activities</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Quick Links */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-medium mb-4">Ready to get started?</h3>
              <p className="text-muted-foreground mb-4">
                Book a free demo to learn how urban farming can transform your property.
              </p>
              <Button onClick={onBookDemo} variant="outline">
                Book a Demo
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-4">Have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Check our FAQ for answers to common questions about our programs.
              </p>
              <Link to="/faq" className="btn-outline inline-block">
                View FAQ
              </Link>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-4">Explore our cities</h3>
              <p className="text-muted-foreground mb-4">
                See where MicroHabitat is growing across North America and Europe.
              </p>
              <Link to="/cities" className="btn-outline inline-block">
                View Cities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
