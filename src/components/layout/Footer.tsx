import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, ExternalLink } from "lucide-react";

const footerSections = [
  {
    title: "Services",
    links: [
      { label: "Outdoor Farm", href: "/outdoor-farm" },
      { label: "Indoor Farm", href: "/indoor-farm" },
      { label: "Educational Activities", href: "/educational-activities" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Cities", href: "/cities" },
      { label: "Careers", href: "/careers" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Community", href: "/community-engagement" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "MyUrbanFarm", href: "https://myurbanfarm.ai", external: true },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  M
                </span>
              </div>
              <span className="text-xl font-medium tracking-tight">
                MicroHabitat
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              The world's largest urban farming network. Transforming urban
              spaces into sustainable ecosystems.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/microhabitat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-md hover:bg-muted transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-muted-foreground" />
              </a>
              <a
                href="https://instagram.com/microhabitat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-md hover:bg-muted transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-muted-foreground" />
              </a>
              <a
                href="https://facebook.com/microhabitat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-md hover:bg-muted transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-medium text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-medium text-foreground mb-1">Stay Connected</h3>
              <p className="text-sm text-muted-foreground">
                Subscribe to our newsletter for updates and urban farming tips.
              </p>
            </div>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full md:w-64"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} MicroHabitat. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
