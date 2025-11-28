import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Users, Building2, Heart } from "lucide-react";
import { Button } from "../components/ui/button";

interface AboutProps {
  onBookDemo: () => void;
}

export function About({ onBookDemo }: AboutProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-6">About Us</p>
          <h1 className="heading-display mb-8">
            About <span className="text-primary">Microhabitat</span>
          </h1>
          <p className="text-body max-w-3xl">
            Join us in cultivating healthier, more sustainable urban environments—one rooftop at a time.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* Mission Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-4">Our Mission</p>
              <h2 className="heading-section mb-6">
                Transforming cities through urban agriculture
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                MicroHabitat was founded to address urban food insecurity by transforming
                underutilized city spaces into productive ecological gardens, promoting
                sustainability and community connection to food sources.
              </p>
              <p className="text-muted-foreground text-lg">
                We believe urban farming should nourish more than just buildings—it should
                nourish communities. As part of our program, we work with local food banks
                and community organizations to ensure fresh produce reaches those who need it most.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card-minimal p-6">
                <Leaf className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-medium mb-2">Sustainable</h3>
                <p className="text-sm text-muted-foreground">
                  100% organic practices, no chemicals or pesticides
                </p>
              </div>
              <div className="card-minimal p-6">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-medium mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Building connections through shared growing experiences
                </p>
              </div>
              <div className="card-minimal p-6">
                <Building2 className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-medium mb-2">Urban</h3>
                <p className="text-sm text-muted-foreground">
                  Transforming rooftops and terraces into productive farms
                </p>
              </div>
              <div className="card-minimal p-6">
                <Heart className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-medium mb-2">Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Supporting food banks and fighting food insecurity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Impact Stats */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <p className="label mb-4">Our Impact</p>
          <h2 className="heading-section mb-12">
            Growing impact across North America and Europe
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">250+</p>
              <p className="text-sm text-muted-foreground">Urban Farms</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">35+</p>
              <p className="text-sm text-muted-foreground">Food Banks</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">40k</p>
              <p className="text-sm text-muted-foreground">Portions Donated</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">13k</p>
              <p className="text-sm text-muted-foreground">Funded Meals</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-medium text-primary mb-2">59.4k</p>
              <p className="text-sm text-muted-foreground">Lbs Harvested</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Story Section */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl">
            <p className="label mb-4">Our Story</p>
            <h2 className="heading-section mb-6">
              From Montreal to the world
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Established in Montreal in 2016, MicroHabitat has grown to become the largest
              network of urban farms in North America, now operating across multiple cities
              in Canada, the USA, and Europe.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              What started as a vision to transform unused urban spaces into productive gardens
              has become a movement. Today, we partner with commercial real estate companies,
              corporations, and schools to bring urban farming to communities everywhere.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={onBookDemo}>
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link to="/cities" className="btn-outline">
                Explore Our Cities
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Urban Solidarity Farms */}
      <section className="section bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="label mb-4">Urban Solidarity Farms</p>
            <h2 className="heading-section mb-6">
              Fighting Hunger, One Pot at a Time
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Every Microhabitat pot sold supports Team No Kid Hungry and The Breakfast Club
              of Canada. For each individual pot we set up, we donate 1 to 3 meals to help
              ensure children across North America have access to nutritious food.
            </p>
            <p className="text-muted-foreground text-lg">
              Our Urban Solidarity Farms program runs from July to October, allowing our
              partners to dedicate their harvest to support local food banks and help fight
              food insecurity in their communities.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
