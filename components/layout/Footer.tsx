"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram, Facebook, ExternalLink } from "lucide-react";
import { type Locale, getLocalePath, getTranslations } from "@/lib/i18n";

interface FooterLink {
  labelKey: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  titleKey: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    titleKey: "nav.services",
    links: [
      { labelKey: "nav.outdoorFarm", href: "/outdoor-farm" },
      { labelKey: "nav.indoorFarm", href: "/indoor-farm" },
      { labelKey: "nav.educationalActivities", href: "/educational-activities" },
    ],
  },
  {
    titleKey: "nav.company",
    links: [
      { labelKey: "nav.about", href: "/about" },
      { labelKey: "nav.cities", href: "/cities" },
      { labelKey: "nav.careers", href: "/careers" },
      { labelKey: "nav.partnerships", href: "/partnerships" },
      { labelKey: "nav.communityEngagement", href: "/community-engagement" },
    ],
  },
  {
    titleKey: "nav.resources",
    links: [
      { labelKey: "nav.contact", href: "/contact" },
      { labelKey: "nav.faq", href: "/faq" },
      { labelKey: "nav.blog", href: "/blog" },
      { labelKey: "footer.myUrbanFarm", href: "https://myurbanfarm.ai", external: true },
    ],
  },
];

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const translations = getTranslations(locale);
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href={localePath('/')} className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="MicroHabitat"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              {t('footer.brandDescription')}
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
            <div key={section.titleKey}>
              <h3 className="font-medium text-foreground mb-4">
                {t(section.titleKey)}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.labelKey}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                      >
                        {t(link.labelKey)}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        href={localePath(link.href)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {t(link.labelKey)}
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
              <h3 className="font-medium text-foreground mb-1">{t('footer.stayConnected')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('footer.subscribeDescription')}
              </p>
            </div>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="px-4 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full md:w-64"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} MicroHabitat. {t('footer.allRightsReserved')}
            </p>
            <div className="flex gap-6">
              <Link
                href={localePath("/privacy-policy")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('footer.privacyPolicy')}
              </Link>
              <Link
                href={localePath("/terms-of-service")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('footer.termsOfService')}
              </Link>
              <Link
                href={localePath("/cookie-policy")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('footer.cookiePolicy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
