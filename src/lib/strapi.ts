// Strapi CMS Client with Fallback Data
// Configure VITE_STRAPI_URL in .env to connect to your Strapi instance

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "";
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN || "";

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function fetchFromStrapi<T>(
  endpoint: string,
  fallback: T
): Promise<T> {
  if (!STRAPI_URL) {
    return fallback;
  }

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (STRAPI_TOKEN) {
      headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
    }

    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: StrapiResponse<T> = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching from Strapi (${endpoint}):`, error);
    return fallback;
  }
}

// Types
export interface HeroContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  image?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  highlight?: string;
}

export interface Partner {
  name: string;
  logo?: string;
}

export interface City {
  name: string;
  country: string;
  region: "north-america" | "europe";
}

export interface NavLink {
  href: string;
  label: string;
  id: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

// ============================================================
// FALLBACK DATA - Matches microhabitat.com content exactly
// ============================================================

const fallbackHero: HeroContent = {
  title: "The world's largest",
  titleHighlight: "urban farming network",
  subtitle:
    "We transform underutilized urban spaces into revenue-generating, impact-creating ecosystems that deliver bottom-line results.",
  ctaPrimary: "Book a Demo",
  ctaSecondary: "Learn More",
};

const fallbackStats: Stat[] = [
  { value: 250, suffix: "+", label: "Urban Farms", description: "Active farms across North America and Europe" },
  { value: 35, suffix: "+", label: "Food Banks", description: "Local food banks partnered for donations" },
  { value: 40000, suffix: "", label: "Portions Donated", description: "Portions of food donated to communities" },
  { value: 13000, suffix: "", label: "Funded Meals", description: "Meals funded through our programs" },
  { value: 59400, suffix: "", label: "Lbs Harvested", description: "Pounds of produce harvested for clients" },
];

const fallbackServices: Service[] = [
  {
    icon: "Leaf",
    title: "Installation & Maintenance",
    description:
      "Our team expertly ensures your urban garden remains a vibrant and productive centerpiece of your property. Our professional team provides all-encompassing garden care, from plant health, harvesting and full production management.",
    features: [
      "Rooftop gardens",
      "Terrace farms",
      "Ground-level gardens",
      "Weekly maintenance visits",
    ],
  },
  {
    icon: "GraduationCap",
    title: "Educational Activities",
    description:
      "Enhance your property's appeal with our dynamic educational offerings. Our workshops are available both in-person and virtually, providing flexible learning opportunities about sustainable urban agriculture. Complement these with in-person farm tours or kiosks that allow tenants and employees to experience urban farming firsthand!",
    features: [
      "In-person workshops",
      "Virtual sessions",
      "Farm tours",
      "Interactive kiosks",
    ],
  },
  {
    icon: "Heart",
    title: "Local Harvest Distribution",
    description:
      "Enhance your property's community spirit by distributing fresh, ecologically grown produce directly to your occupants or donating it to local charities. Our urban gardens not only provide a scenic, green space but also a source of nutrition and goodwill.",
    features: [
      "Fresh produce distribution",
      "Food bank donations",
      "Community engagement",
      "Urban Solidarity Farms program",
    ],
  },
];

const fallbackTestimonials: Testimonial[] = [
  {
    quote:
      "Transforming our patio into an urban farm with MicroHabitat was a welcome change for our organization. Since 2021, over 2,850 pounds of vegetables, edible flowers and herbs have been harvested and donated to local food banks. Working with MicroHabitat is a rewarding experience, as their expertise and passion for urban agriculture enable us to create collaborative initiatives that transform our workspaces into true oases of greenery and sustainability.",
    author: "Cécile G.",
    role: "",
    company: "BNP Paribas in Canada",
    highlight: "2,850 lbs donated since 2021",
  },
  {
    quote:
      "Partnering with MicroHabitat has been the highlight of my career thus far as the Tenant Services Coordinator for North York Centre. Our rooftop garden has brought new life to our property and re-ignited our tenant engagement initiatives following the Pandemic. It is fulfilling to know our annual harvests support local food banks within our community and we could not be more grateful to the MicroHabitat team in facilitating this reality. I am excited for what the future holds in our journey together.",
    author: "Vanessa S.",
    role: "Tenant Services Coordinator",
    company: "GWL Realty Advisors Inc.",
    highlight: "Revitalized tenant engagement",
  },
];

const fallbackPartners: Partner[] = [
  { name: "Partner 1", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/14388830-877d-49a6-a118-59248c8cd138/75.png" },
  { name: "Partner 2", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/31940f06-5b07-4eaa-a95f-1cfd624111f9/76.png" },
  { name: "Partner 3", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/1f61d8c8-316c-4d8d-b2bb-28bff2147b93/77.png" },
  { name: "Partner 4", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/4711e554-ab23-4dd8-8b6d-df130f9e8392/78.png" },
  { name: "Partner 5", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/a60b66d6-254b-482e-a849-ba10dbe2dc81/79.png" },
  { name: "Partner 6", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c66c9275-7ec9-4e3e-9991-f70b0cb3f161/80.png" },
  { name: "Partner 7", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/060044a6-3d98-470d-86d5-d097cf5272ae/81.png" },
  { name: "Partner 8", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/8dc2bda2-02d6-4806-91e0-162eac3ab2d8/82.png" },
  { name: "Partner 9", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/0c4d446b-b179-4dfa-9fc0-20eb39b8f272/83.png" },
  { name: "Partner 10", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/e2c49e2a-9727-4c29-a681-597ae571ea00/84.png" },
  { name: "Partner 11", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/34a75b7a-bab4-443d-a01b-d53939ee07dd/85.png" },
  { name: "Partner 12", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c562fae7-6131-44f7-97a1-3ce4b7f7918d/86.png" },
  { name: "Partner 13", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/9532f9be-5f37-403a-be25-29bf6fa8e8e7/87.png" },
  { name: "Partner 14", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/64371915-b369-4a74-973c-dd8f5cc1af14/88.png" },
  { name: "Partner 15", logo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c2554e99-1be0-476e-97e8-2407afcb963c/89.png" },
];

const fallbackCities: City[] = [
  // Canada
  { name: "Montreal", country: "Canada", region: "north-america" },
  { name: "Toronto", country: "Canada", region: "north-america" },
  { name: "Vancouver", country: "Canada", region: "north-america" },
  { name: "Calgary", country: "Canada", region: "north-america" },
  { name: "Edmonton", country: "Canada", region: "north-america" },
  { name: "Victoria", country: "Canada", region: "north-america" },
  // USA
  { name: "New York City", country: "USA", region: "north-america" },
  { name: "Chicago", country: "USA", region: "north-america" },
  { name: "Dallas", country: "USA", region: "north-america" },
  { name: "Los Angeles", country: "USA", region: "north-america" },
  { name: "San Francisco", country: "USA", region: "north-america" },
  { name: "Washington DC", country: "USA", region: "north-america" },
  { name: "Denver", country: "USA", region: "north-america" },
  { name: "Columbus", country: "USA", region: "north-america" },
  { name: "Seattle", country: "USA", region: "north-america" },
  // Europe
  { name: "Amsterdam", country: "Netherlands", region: "europe" },
  { name: "Berlin", country: "Germany", region: "europe" },
  { name: "London", country: "UK", region: "europe" },
  { name: "Paris", country: "France", region: "europe" },
  { name: "Zurich", country: "Switzerland", region: "europe" },
];

const fallbackNavLinks: NavLink[] = [
  { href: "#services", label: "Services", id: "services" },
  { href: "#impact", label: "Impact", id: "impact" },
  { href: "#testimonials", label: "Testimonials", id: "testimonials" },
  { href: "#cities", label: "Cities", id: "cities" },
  { href: "#faq", label: "FAQ", id: "faq" },
];

const fallbackFooterSections: FooterSection[] = [
  {
    title: "Services",
    links: [
      { label: "Outdoor Farm", href: "/services/outdoor" },
      { label: "Indoor Farm", href: "/services/indoor" },
      { label: "Educational Activities", href: "/services/educational" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Cities", href: "/cities" },
      { label: "Careers", href: "/careers" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Community Engagement", href: "/community" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "MyUrbanFarm", href: "https://myurbanfarm.ai" },
    ],
  },
];

// FAQ data matching microhabitat.com/faq
export const fallbackFAQ: FAQItem[] = [
  // General
  {
    question: "Why would someone integrate urban farming?",
    answer:
      "Urban farming offers social and environmental benefits for communities seeking healthier, more sustainable lives. It provides fresh produce, educational opportunities, community engagement, and supports green building certifications.",
    category: "General",
  },
  {
    question: "What is the first step to define if my building can welcome a program?",
    answer:
      "Conduct a free site evaluation with MicroHabitat during a virtual meeting. Our assessment includes evaluating available space, sunlight exposure, water access, and structural integrity of your property.",
    category: "General",
  },
  {
    question: "How do I know if my building is suitable for an urban farming project?",
    answer:
      "Requirements include at least 200 sq ft (20m²) of space, adequate sunlight (minimum 6 hours daily), accessible water sources, and safe roof access if applicable. Our team can assess your specific situation during a consultation.",
    category: "General",
  },
  {
    question: "Can I get points for my building from green building certifications?",
    answer:
      "Yes! Our programs support LEED, BOMA, BOMA BEST, GRESB, Fitwel, and WELL certifications. The specific credits depend on the project scale and scope.",
    category: "General",
  },
  {
    question: "Do you offer indoor production solutions?",
    answer:
      "Yes, MicroHabitat offers an indoor unit which produces year-long growth through our turn-key solution. These are perfect for lobbies, cafeterias, and dedicated growing spaces.",
    category: "General",
  },
  // About
  {
    question: "Why was MicroHabitat created?",
    answer:
      "MicroHabitat was founded to address urban food insecurity by transforming underutilized city spaces into productive ecological gardens, promoting sustainability and community connection to food sources.",
    category: "About",
  },
  {
    question: "What is the history of MicroHabitat?",
    answer:
      "Established in Montreal in 2016, MicroHabitat has grown to become the largest network of urban farms in North America, now operating across multiple cities in Canada, the USA, and Europe.",
    category: "About",
  },
  {
    question: "Where is MicroHabitat implemented?",
    answer:
      "Our projects operate across North America and Europe on rooftops, terraces, and ground spaces of businesses, schools, and organizations in over 20 major cities.",
    category: "About",
  },
  {
    question: "Is MicroHabitat a franchise?",
    answer:
      "No, MicroHabitat is a single company with dedicated full-time employees and offices across multiple regions. We maintain consistent quality and service across all our locations.",
    category: "About",
  },
  // Technical
  {
    question: "Does the installation modify my building or space?",
    answer:
      "No permanent changes occur. Our grow pots are designed with your property in mind—there's no drilling or digging required. Everything can be removed without leaving a trace.",
    category: "Technical",
  },
  {
    question: "How much space do I need to get an urban farm?",
    answer:
      "A minimum of 200 sq ft (20m²) of accessible space is required for an outdoor farm. Indoor solutions can work with smaller spaces.",
    category: "Technical",
  },
  {
    question: "What are the requirements to have an urban farm?",
    answer:
      "You need adequate space (minimum 200 sq ft) plus a minimum of 6 hours of sunlight daily for outdoor farms. Indoor farms have more flexible requirements.",
    category: "Technical",
  },
  {
    question: "Is it safe to add a farm to a roof location?",
    answer:
      "Our ultra-light grow pots typically don't compromise roof load capacity. We always recommend consulting your building engineer, and we report universal approval from engineers we've worked with.",
    category: "Technical",
  },
  {
    question: "What insurance coverage do you offer?",
    answer:
      "Our programs include liability coverage of 5 million dollars for commercial, automobile and excess liability, giving you complete peace of mind.",
    category: "Technical",
  },
  // Products & Services
  {
    question: "How does the program work?",
    answer:
      "Our turn-key programs include installation, ecological irrigation systems, planting, weekly maintenance visits, harvesting and delivery, educational activities, and marketing tools. Outdoor farms work almost anywhere outdoors; indoor units work almost anywhere indoors.",
    category: "Products",
  },
  {
    question: "What is included in the program?",
    answer:
      "Our comprehensive package includes: installation, ecological irrigation system, seasonal planting, weekly maintenance visits, harvesting and drop-off, educational activities, marketing tools, and corporate gifts (depending on your selected package).",
    category: "Products",
  },
  {
    question: "What happens with the fresh produce?",
    answer:
      "You choose! Options include internal distribution to building occupants or employees, or donation to local food banks through our Urban Solidarity Farms program which runs from July to October.",
    category: "Products",
  },
  // Engagement
  {
    question: "How is the MicroHabitat program engaging with occupants?",
    answer:
      "Our programs include a minimum of two educational activities covering ecological farming practices, seed saving, composting, and related sustainability topics.",
    category: "Engagement",
  },
  {
    question: "Do you have different types of activities?",
    answer:
      "Yes! We offer interactive kiosks, guided garden visits, and educational workshops. Activities can be customized to your organization's needs and interests.",
    category: "Engagement",
  },
  {
    question: "Do you offer online activities?",
    answer:
      "Yes, our virtual workshops cover ecological farming, maintenance best practices, winterization, seed saving, crop succession planning, and pollinator support.",
    category: "Engagement",
  },
  {
    question: "Do you offer activities for all age groups?",
    answer:
      "Absolutely! All our educational activities are designed to be stimulating for individuals of all ages, from children to seniors.",
    category: "Engagement",
  },
  // Safety
  {
    question: "Do building occupants need to access the installation?",
    answer:
      "Access is not required for our maintenance team to do their work. However, accessibility may be desired for tenant engagement or to qualify for certain green building certification credits.",
    category: "Safety",
  },
  {
    question: "How do you create safe farming spaces on roofs without guardrails?",
    answer:
      "We create minimum safety clearance per local guidelines and contain all gardens within a localized perimeter away from roof edges. Safety is always our top priority.",
    category: "Safety",
  },
  {
    question: "Can I have an urban farm if wild animals are present?",
    answer:
      "Yes! Our large textile pots prevent most animal interference. For areas with deer, we recommend additional fencing solutions which we can help implement.",
    category: "Safety",
  },
  // Sustainability
  {
    question: "Do you use chemicals, pesticides, or fertilizers?",
    answer:
      "No, all our gardens are created without the use of chemicals, pesticides, or synthetic fertilizers. We use only sustainable, organic practices to grow healthy produce.",
    category: "Sustainability",
  },
  {
    question: "Do I need a farming license to distribute my produce?",
    answer:
      "No, all produce from your farm belongs to you and can be distributed freely to occupants or donated to food banks without any special licensing requirements.",
    category: "Sustainability",
  },
  {
    question: "Do I need a green space to get a program?",
    answer:
      "No! Our solutions work on any surface with adequate lighting—concrete, gravel, or existing green space. We bring the greenery to you.",
    category: "Sustainability",
  },
];

// API Functions
export async function getHeroContent(): Promise<HeroContent> {
  return fetchFromStrapi("hero?populate=*", fallbackHero);
}

export async function getStats(): Promise<Stat[]> {
  return fetchFromStrapi("stats?populate=*", fallbackStats);
}

export async function getServices(): Promise<Service[]> {
  return fetchFromStrapi("services?populate=*", fallbackServices);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchFromStrapi("testimonials?populate=*", fallbackTestimonials);
}

export async function getPartners(): Promise<Partner[]> {
  return fetchFromStrapi("partners?populate=*", fallbackPartners);
}

export async function getCities(): Promise<City[]> {
  return fetchFromStrapi("cities?populate=*", fallbackCities);
}

export async function getNavLinks(): Promise<NavLink[]> {
  return fetchFromStrapi("navigation?populate=*", fallbackNavLinks);
}

export async function getFooterSections(): Promise<FooterSection[]> {
  return fetchFromStrapi("footer?populate=*", fallbackFooterSections);
}

export async function getFAQ(): Promise<FAQItem[]> {
  return fetchFromStrapi("faq?populate=*", fallbackFAQ);
}

// Export all content at once
export interface SiteContent {
  hero: HeroContent;
  stats: Stat[];
  services: Service[];
  testimonials: Testimonial[];
  partners: Partner[];
  cities: City[];
  navLinks: NavLink[];
  footerSections: FooterSection[];
  faq: FAQItem[];
}

export async function getAllContent(): Promise<SiteContent> {
  const [
    hero,
    stats,
    services,
    testimonials,
    partners,
    cities,
    navLinks,
    footerSections,
    faq,
  ] = await Promise.all([
    getHeroContent(),
    getStats(),
    getServices(),
    getTestimonials(),
    getPartners(),
    getCities(),
    getNavLinks(),
    getFooterSections(),
    getFAQ(),
  ]);

  return {
    hero,
    stats,
    services,
    testimonials,
    partners,
    cities,
    navLinks,
    footerSections,
    faq,
  };
}

// Hooks for React Query
export const queryKeys = {
  hero: ["hero"],
  stats: ["stats"],
  services: ["services"],
  testimonials: ["testimonials"],
  partners: ["partners"],
  cities: ["cities"],
  navLinks: ["navLinks"],
  footerSections: ["footerSections"],
  faq: ["faq"],
  allContent: ["allContent"],
};
