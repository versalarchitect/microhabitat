import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown, ChevronRight, X } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { cn } from "../../lib/utils";
import { useLocale, getCanonicalSlug } from "../../lib/locale-context";
import { LanguageSwitcher } from "../LanguageSwitcher";

interface NavChild {
  labelKey: string;
  href: string;
}

interface NavItem {
  labelKey: string;
  href?: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  {
    labelKey: "nav.company",
    children: [
      { labelKey: "nav.about", href: "/about" },
      { labelKey: "nav.cities", href: "/cities" },
      { labelKey: "nav.careers", href: "/careers" },
      { labelKey: "nav.partnerships", href: "/partnerships" },
      { labelKey: "nav.communityEngagement", href: "/community-engagement" },
    ],
  },
  {
    labelKey: "nav.services",
    children: [
      { labelKey: "nav.outdoorFarm", href: "/outdoor-farm" },
      { labelKey: "nav.indoorFarm", href: "/indoor-farm" },
      { labelKey: "nav.educationalActivities", href: "/educational-activities" },
    ],
  },
  {
    labelKey: "nav.resources",
    children: [
      { labelKey: "nav.contact", href: "/contact" },
      { labelKey: "nav.faq", href: "/faq" },
      { labelKey: "nav.blog", href: "/blog" },
    ],
  },
  {
    labelKey: "nav.clients",
    children: [
      { labelKey: "nav.commercialRealEstate", href: "/commercial-real-estate" },
      { labelKey: "nav.corporations", href: "/corporations" },
      { labelKey: "nav.schools", href: "/schools" },
    ],
  },
];

interface NavbarProps {
  onBookDemo?: () => void;
}

export function Navbar({ onBookDemo }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);
  const location = useLocation();
  const { locale, t, localePath } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setMobileOpenSection(null);
  }, [location.pathname]);

  const isActiveLink = (href: string) => {
    // Strip locale prefix and get current path
    const pathWithoutLocale = location.pathname.replace(/^\/(fr|de|nl|it|es)/, '') || '/';
    // Convert localized slug back to canonical for comparison
    const pathParts = pathWithoutLocale.split('/').filter(Boolean);
    const canonicalPath = '/' + pathParts.map(part => getCanonicalSlug(part, locale)).join('/');
    // Compare against the canonical href
    return canonicalPath === href || href === '/' && pathWithoutLocale === '/';
  };

  const isActiveDropdown = (item: NavItem) => {
    if (!item.children) return false;
    return item.children.some((child) => isActiveLink(child.href));
  };

  return (
    <nav
      className={cn(
        "fixed left-0 w-full top-0 z-[60] transition-all duration-200",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-background border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={localePath('/')} className="flex-shrink-0 flex items-center py-2 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center p-1.5">
                  <img
                    src="/logo.png"
                    alt="MicroHabitat"
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
                <span className="text-xl font-medium tracking-tight">
                  MicroHabitat
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:ml-10 lg:flex lg:items-center lg:space-x-1">
            {navItems.map((item) => (
              <div
                key={item.labelKey}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.labelKey)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActiveDropdown(item)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t(item.labelKey)}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      openDropdown === item.labelKey && "rotate-180"
                    )}
                  />
                </button>

                {/* Dropdown */}
                {item.children && openDropdown === item.labelKey && (
                  <div className="absolute top-full left-0 pt-2 min-w-[220px]">
                    <div className="bg-card border border-border rounded-md shadow-lg py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={localePath(child.href)}
                          className={cn(
                            "block px-4 py-2.5 text-sm transition-colors",
                            isActiveLink(child.href)
                              ? "text-primary bg-primary/5"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          {t(child.labelKey)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* MyUrbanFarm link */}
            <a
              href="https://myurbanfarm.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              MyUrbanFarm
            </a>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-4">
              <LanguageSwitcher />
              <Button onClick={onBookDemo} className="font-medium">
                {t('nav.bookDemo')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile menu */}
            <div className="lg:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  >
                    <span className="sr-only">Open menu</span>
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[85vw] max-w-sm p-0 bg-background border-r border-border"
                >
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="px-6 pt-8 pb-6 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center p-1.5">
                          <img
                            src="/logo.png"
                            alt="MicroHabitat"
                            className="w-full h-full object-contain brightness-0 invert"
                          />
                        </div>
                        <div>
                          <h2 className="text-lg font-medium tracking-tight">
                            MicroHabitat
                          </h2>
                          <p className="label mt-0.5">{t('nav.urbanFarming')}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 rounded-lg hover:bg-muted/50"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="divider" />

                    {/* Navigation */}
                    <nav className="flex-1 px-6 py-6 overflow-y-auto">
                      <div className="space-y-1">
                        {navItems.map((item) => (
                          <div key={item.labelKey}>
                            <button
                              type="button"
                              onClick={() =>
                                setMobileOpenSection(
                                  mobileOpenSection === item.labelKey
                                    ? null
                                    : item.labelKey
                                )
                              }
                              className={cn(
                                "w-full flex items-center justify-between py-3 text-lg font-medium transition-colors",
                                isActiveDropdown(item)
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              )}
                            >
                              {t(item.labelKey)}
                              <ChevronDown
                                className={cn(
                                  "h-5 w-5 transition-transform duration-200",
                                  mobileOpenSection === item.labelKey && "rotate-180"
                                )}
                              />
                            </button>
                            {item.children && mobileOpenSection === item.labelKey && (
                              <div className="pl-4 pb-3 space-y-1">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    to={localePath(child.href)}
                                    className={cn(
                                      "block py-2 text-base transition-colors",
                                      isActiveLink(child.href)
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                    )}
                                  >
                                    {t(child.labelKey)}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}

                        <a
                          href="https://myurbanfarm.ai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                          MyUrbanFarm
                        </a>
                      </div>
                    </nav>

                    <div className="divider" />

                    {/* Footer with Language Switcher */}
                    <div className="px-6 py-6 space-y-4">
                      <div className="flex justify-center">
                        <LanguageSwitcher />
                      </div>
                      <Button onClick={onBookDemo} className="w-full">
                        {t('nav.bookDemo')}
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
