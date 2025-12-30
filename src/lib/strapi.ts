// Strapi CMS Client with Fallback Data and i18n Support
// Configure VITE_STRAPI_URL in .env to connect to your Strapi instance

import { getLocaleFromPath, type Locale } from './locale-context';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "";
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN || "";

// Helper to extract image URL from Strapi media response
interface StrapiMedia {
  url: string;
  formats?: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

function getImageUrl(media: StrapiMedia | null | undefined, preferredSize: 'large' | 'medium' | 'small' | 'thumbnail' | 'original' = 'large'): string | undefined {
  if (!media) return undefined;

  const baseUrl = STRAPI_URL || '';

  // Try preferred size, fall back to original
  if (preferredSize !== 'original' && media.formats?.[preferredSize]?.url) {
    const url = media.formats[preferredSize]!.url;
    return url.startsWith('http') ? url : `${baseUrl}${url}`;
  }

  // Fall back to original
  if (media.url) {
    return media.url.startsWith('http') ? media.url : `${baseUrl}${media.url}`;
  }

  return undefined;
}

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

// Get current locale from URL path
function getCurrentLocale(): Locale {
  if (typeof window !== 'undefined') {
    return getLocaleFromPath(window.location.pathname);
  }
  return 'en';
}

async function fetchFromStrapi<T>(
  endpoint: string,
  fallbacks: Record<Locale, T>,
  locale?: Locale
): Promise<T> {
  const currentLocale = locale || getCurrentLocale();
  const fallback = fallbacks[currentLocale] || fallbacks.en;

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

    // Add locale parameter to the endpoint
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${STRAPI_URL}/api/${endpoint}${separator}locale=${currentLocale}`;

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: StrapiResponse<T> = await response.json();
    // Return fallback if data is null, undefined, or empty array
    if (result.data === null || result.data === undefined) {
      console.warn(`No data from Strapi (${endpoint}), using fallback`);
      return fallback;
    }
    if (Array.isArray(result.data) && result.data.length === 0) {
      console.warn(`Empty array from Strapi (${endpoint}), using fallback`);
      return fallback;
    }
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
  image?: string;
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
  image?: string;
  companyLogo?: string;
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

// SEO data from CMS
export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  ogImage?: string;
  twitterImage?: string;
  canonical?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

// Page keys for SEO fetching
export type PageSEOKey =
  | 'home' | 'about' | 'outdoor-farm' | 'indoor-farm' | 'educational-activities'
  | 'commercial-real-estate' | 'corporations' | 'schools' | 'careers' | 'partnerships'
  | 'community-engagement' | 'contact' | 'faq' | 'blog' | 'cities'
  | 'privacy-policy' | 'terms-of-service' | 'cookie-policy';

// Section content types (for section headers, CTAs, etc.)
export interface ImpactSectionContent {
  label: string;
  heading: string;
  headingHighlight: string;
  description: string;
  images?: string[];
}

export interface ServicesSectionContent {
  label: string;
  heading: string;
  headingHighlight: string;
  description: string;
  ctaText: string;
  ctaButtonText: string;
}

export interface PartnersSectionContent {
  label: string;
  heading: string;
}

export interface TestimonialsSectionContent {
  label: string;
  heading: string;
  description: string;
}

export interface CitiesSectionContent {
  label: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaButtonText: string;
}

export interface FAQSectionContent {
  label: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaButtonText: string;
}

export interface CTASectionContent {
  label: string;
  heading: string;
  headingHighlight: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaSecondaryEmail: string;
  trustIndicators: string[];
}

// ============================================================
// FALLBACK DATA - Matches microhabitat.com content exactly
// ============================================================

const fallbackHeroEn: HeroContent = {
  title: "The world's largest",
  titleHighlight: "urban farming network",
  subtitle:
    "We transform underutilized urban spaces into revenue-generating, impact-creating ecosystems that deliver bottom-line results.",
  ctaPrimary: "Book a Demo",
  ctaSecondary: "Learn More",
  image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
};

const fallbackHeroFr: HeroContent = {
  title: "Le plus grand réseau",
  titleHighlight: "d'agriculture urbaine au monde",
  subtitle:
    "Nous transformons les espaces urbains sous-utilisés en écosystèmes générateurs de revenus et d'impact qui offrent des résultats concrets.",
  ctaPrimary: "Réserver une démo",
  ctaSecondary: "En savoir plus",
  image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
};

const fallbackHeroDe: HeroContent = {
  title: "Das weltweit größte",
  titleHighlight: "Urban-Farming-Netzwerk",
  subtitle:
    "Wir verwandeln ungenutzte städtische Flächen in umsatzgenerierende, wirkungsvolle Ökosysteme, die konkrete Ergebnisse liefern.",
  ctaPrimary: "Demo buchen",
  ctaSecondary: "Mehr erfahren",
  image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
};

const fallbackHeroNl: HeroContent = {
  title: "Het grootste",
  titleHighlight: "stedelijke landbouwnetwerk ter wereld",
  subtitle:
    "Wij transformeren onderbenutte stedelijke ruimtes in omzet-genererende, impactvolle ecosystemen die concrete resultaten leveren.",
  ctaPrimary: "Demo boeken",
  ctaSecondary: "Meer informatie",
  image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
};

const fallbackHeroIt: HeroContent = {
  title: "La più grande rete",
  titleHighlight: "di agricoltura urbana al mondo",
  subtitle:
    "Trasformiamo spazi urbani sottoutilizzati in ecosistemi generatori di reddito e impatto che offrono risultati concreti.",
  ctaPrimary: "Prenota una demo",
  ctaSecondary: "Scopri di più",
  image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
};

const fallbackHeroEs: HeroContent = {
  title: "La red de agricultura urbana",
  titleHighlight: "más grande del mundo",
  subtitle:
    "Transformamos espacios urbanos subutilizados en ecosistemas generadores de ingresos e impacto que ofrecen resultados concretos.",
  ctaPrimary: "Reservar una demo",
  ctaSecondary: "Más información",
  image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
};

const fallbackStatsEn: Stat[] = [
  { value: 250, suffix: "+", label: "Urban Farms", description: "Active farms across North America and Europe" },
  { value: 35, suffix: "+", label: "Food Banks", description: "Local food banks partnered for donations" },
  { value: 40000, suffix: "", label: "Portions Donated", description: "Portions of food donated to communities" },
  { value: 13000, suffix: "", label: "Funded Meals", description: "Meals funded through our programs" },
  { value: 59400, suffix: "", label: "Lbs Harvested", description: "Pounds of produce harvested for clients" },
];

const fallbackStatsFr: Stat[] = [
  { value: 250, suffix: "+", label: "Fermes urbaines", description: "Fermes actives en Amérique du Nord et en Europe" },
  { value: 35, suffix: "+", label: "Banques alimentaires", description: "Banques alimentaires locales partenaires pour les dons" },
  { value: 40000, suffix: "", label: "Portions données", description: "Portions de nourriture données aux communautés" },
  { value: 13000, suffix: "", label: "Repas financés", description: "Repas financés par nos programmes" },
  { value: 59400, suffix: "", label: "Lbs récoltées", description: "Livres de produits récoltés pour les clients" },
];

const fallbackStatsDe: Stat[] = [
  { value: 250, suffix: "+", label: "Stadtfarmen", description: "Aktive Farmen in Nordamerika und Europa" },
  { value: 35, suffix: "+", label: "Tafeln", description: "Lokale Tafeln als Spendenpartner" },
  { value: 40000, suffix: "", label: "Gespendete Portionen", description: "Portionen für Gemeinschaften gespendet" },
  { value: 13000, suffix: "", label: "Finanzierte Mahlzeiten", description: "Durch unsere Programme finanzierte Mahlzeiten" },
  { value: 59400, suffix: "", label: "Lbs geerntet", description: "Pfund Produkte für Kunden geerntet" },
];

const fallbackStatsNl: Stat[] = [
  { value: 250, suffix: "+", label: "Stadsboerderijen", description: "Actieve boerderijen in Noord-Amerika en Europa" },
  { value: 35, suffix: "+", label: "Voedselbanken", description: "Lokale voedselbanken als donatiepartners" },
  { value: 40000, suffix: "", label: "Gedoneerde porties", description: "Porties voedsel gedoneerd aan gemeenschappen" },
  { value: 13000, suffix: "", label: "Gefinancierde maaltijden", description: "Maaltijden gefinancierd via onze programma's" },
  { value: 59400, suffix: "", label: "Lbs geoogst", description: "Pond producten geoogst voor klanten" },
];

const fallbackStatsIt: Stat[] = [
  { value: 250, suffix: "+", label: "Fattorie urbane", description: "Fattorie attive in Nord America ed Europa" },
  { value: 35, suffix: "+", label: "Banchi alimentari", description: "Banchi alimentari locali partner per le donazioni" },
  { value: 40000, suffix: "", label: "Porzioni donate", description: "Porzioni di cibo donate alle comunità" },
  { value: 13000, suffix: "", label: "Pasti finanziati", description: "Pasti finanziati attraverso i nostri programmi" },
  { value: 59400, suffix: "", label: "Lbs raccolte", description: "Libbre di prodotti raccolti per i clienti" },
];

const fallbackStatsEs: Stat[] = [
  { value: 250, suffix: "+", label: "Granjas urbanas", description: "Granjas activas en Norteamérica y Europa" },
  { value: 35, suffix: "+", label: "Bancos de alimentos", description: "Bancos de alimentos locales asociados para donaciones" },
  { value: 40000, suffix: "", label: "Porciones donadas", description: "Porciones de comida donadas a comunidades" },
  { value: 13000, suffix: "", label: "Comidas financiadas", description: "Comidas financiadas a través de nuestros programas" },
  { value: 59400, suffix: "", label: "Lbs cosechadas", description: "Libras de productos cosechados para clientes" },
];

const fallbackServicesEn: Service[] = [
  {
    icon: "Leaf",
    title: "Garden Care & Harvest",
    description: "Our team expertly ensures your urban garden remains a vibrant and productive centerpiece of your property. Our professional team provides all-encompassing garden care, from plant health, harvesting and full production management.",
    features: ["Weekly maintenance visits", "Professional cultivation", "Harvest management", "Full production oversight"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
  },
  {
    icon: "GraduationCap",
    title: "Educational Activities",
    description: "Enhance your property's appeal with our dynamic educational offerings. Our workshops are available both in-person and virtually, providing flexible learning opportunities about sustainable urban agriculture.",
    features: ["In-person workshops", "Virtual sessions", "Farm tours", "Interactive kiosks"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c4b9e4e9-eeb4-4408-bd49-492033a12fec/educational-activities.jpg",
  },
  {
    icon: "Heart",
    title: "Local Harvest Distribution",
    description: "Enhance your property's community spirit by distributing fresh, ecologically grown produce directly to your occupants or donating it to local charities.",
    features: ["Fresh produce distribution", "Food bank donations", "Community engagement", "Urban Solidarity Farms program"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  },
];

const fallbackServicesFr: Service[] = [
  {
    icon: "Leaf",
    title: "Entretien du jardin et récolte",
    description: "Notre équipe veille avec expertise à ce que votre jardin urbain reste un élément central vibrant et productif de votre propriété. Notre équipe professionnelle assure un entretien complet du jardin.",
    features: ["Visites d'entretien hebdomadaires", "Culture professionnelle", "Gestion des récoltes", "Supervision complète de la production"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
  },
  {
    icon: "GraduationCap",
    title: "Activités éducatives",
    description: "Rehaussez l'attrait de votre propriété grâce à nos offres éducatives dynamiques. Nos ateliers sont disponibles en personne et virtuellement, offrant des opportunités d'apprentissage flexibles sur l'agriculture urbaine durable.",
    features: ["Ateliers en personne", "Sessions virtuelles", "Visites de fermes", "Kiosques interactifs"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c4b9e4e9-eeb4-4408-bd49-492033a12fec/educational-activities.jpg",
  },
  {
    icon: "Heart",
    title: "Distribution des récoltes locales",
    description: "Renforcez l'esprit communautaire de votre propriété en distribuant des produits frais cultivés écologiquement directement à vos occupants ou en les donnant à des organismes de bienfaisance locaux.",
    features: ["Distribution de produits frais", "Dons aux banques alimentaires", "Engagement communautaire", "Programme Fermes de solidarité urbaine"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  },
];

const fallbackServicesDe: Service[] = [
  {
    icon: "Leaf",
    title: "Gartenpflege & Ernte",
    description: "Unser Team sorgt fachkundig dafür, dass Ihr Stadtgarten ein lebendiges und produktives Herzstück Ihrer Immobilie bleibt. Unser professionelles Team bietet umfassende Gartenpflege.",
    features: ["Wöchentliche Wartungsbesuche", "Professioneller Anbau", "Erntemanagement", "Vollständige Produktionsüberwachung"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
  },
  {
    icon: "GraduationCap",
    title: "Bildungsaktivitäten",
    description: "Steigern Sie die Attraktivität Ihrer Immobilie mit unseren dynamischen Bildungsangeboten. Unsere Workshops sind persönlich und virtuell verfügbar und bieten flexible Lernmöglichkeiten zur nachhaltigen Stadtlandwirtschaft.",
    features: ["Persönliche Workshops", "Virtuelle Sitzungen", "Farmführungen", "Interaktive Kioske"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c4b9e4e9-eeb4-4408-bd49-492033a12fec/educational-activities.jpg",
  },
  {
    icon: "Heart",
    title: "Lokale Ernteverteilung",
    description: "Stärken Sie den Gemeinschaftsgeist Ihrer Immobilie, indem Sie frische, ökologisch angebaute Produkte direkt an Ihre Bewohner verteilen oder an lokale Wohltätigkeitsorganisationen spenden.",
    features: ["Frischproduktverteilung", "Spenden an Tafeln", "Gemeinschaftsengagement", "Programm Urbane Solidaritätsfarmen"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  },
];

const fallbackServicesNl: Service[] = [
  {
    icon: "Leaf",
    title: "Tuinonderhoud & Oogst",
    description: "Ons team zorgt er vakkundig voor dat uw stadstuin een levendig en productief middelpunt van uw eigendom blijft. Ons professionele team biedt allesomvattende tuinzorg.",
    features: ["Wekelijkse onderhoudsbezoeken", "Professionele teelt", "Oogstbeheer", "Volledige productietoezicht"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
  },
  {
    icon: "GraduationCap",
    title: "Educatieve Activiteiten",
    description: "Verhoog de aantrekkelijkheid van uw eigendom met onze dynamische educatieve aanbiedingen. Onze workshops zijn zowel persoonlijk als virtueel beschikbaar en bieden flexibele leermogelijkheden over duurzame stadslandbouw.",
    features: ["Persoonlijke workshops", "Virtuele sessies", "Boerderijrondleidingen", "Interactieve kiosken"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c4b9e4e9-eeb4-4408-bd49-492033a12fec/educational-activities.jpg",
  },
  {
    icon: "Heart",
    title: "Lokale Oogstdistributie",
    description: "Versterk de gemeenschapsgeest van uw eigendom door verse, ecologisch geteelde producten direct aan uw bewoners te distribueren of te doneren aan lokale goede doelen.",
    features: ["Verse productdistributie", "Donaties aan voedselbanken", "Gemeenschapsbetrokkenheid", "Programma Stedelijke Solidariteitsboerderijen"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  },
];

const fallbackServicesIt: Service[] = [
  {
    icon: "Leaf",
    title: "Cura del giardino e raccolto",
    description: "Il nostro team assicura con competenza che il vostro orto urbano rimanga un punto focale vibrante e produttivo della vostra proprietà. Il nostro team professionale fornisce una cura completa del giardino.",
    features: ["Visite settimanali di manutenzione", "Coltivazione professionale", "Gestione del raccolto", "Supervisione completa della produzione"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
  },
  {
    icon: "GraduationCap",
    title: "Attività educative",
    description: "Aumentate l'attrattiva della vostra proprietà con le nostre offerte educative dinamiche. I nostri workshop sono disponibili sia di persona che virtualmente, offrendo opportunità di apprendimento flessibili sull'agricoltura urbana sostenibile.",
    features: ["Workshop di persona", "Sessioni virtuali", "Tour della fattoria", "Chioschi interattivi"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c4b9e4e9-eeb4-4408-bd49-492033a12fec/educational-activities.jpg",
  },
  {
    icon: "Heart",
    title: "Distribuzione del raccolto locale",
    description: "Rafforzate lo spirito comunitario della vostra proprietà distribuendo prodotti freschi coltivati ecologicamente direttamente ai vostri occupanti o donandoli a enti di beneficenza locali.",
    features: ["Distribuzione prodotti freschi", "Donazioni ai banchi alimentari", "Coinvolgimento della comunità", "Programma Fattorie di Solidarietà Urbana"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  },
];

const fallbackServicesEs: Service[] = [
  {
    icon: "Leaf",
    title: "Cuidado del jardín y cosecha",
    description: "Nuestro equipo asegura expertamente que su huerto urbano siga siendo un punto focal vibrante y productivo de su propiedad. Nuestro equipo profesional proporciona cuidado integral del jardín.",
    features: ["Visitas de mantenimiento semanales", "Cultivo profesional", "Gestión de cosecha", "Supervisión completa de producción"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
  },
  {
    icon: "GraduationCap",
    title: "Actividades educativas",
    description: "Mejore el atractivo de su propiedad con nuestras ofertas educativas dinámicas. Nuestros talleres están disponibles tanto en persona como virtualmente, proporcionando oportunidades de aprendizaje flexibles sobre agricultura urbana sostenible.",
    features: ["Talleres presenciales", "Sesiones virtuales", "Tours de granja", "Quioscos interactivos"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c4b9e4e9-eeb4-4408-bd49-492033a12fec/educational-activities.jpg",
  },
  {
    icon: "Heart",
    title: "Distribución de cosecha local",
    description: "Fortalezca el espíritu comunitario de su propiedad distribuyendo productos frescos cultivados ecológicamente directamente a sus ocupantes o donándolos a organizaciones benéficas locales.",
    features: ["Distribución de productos frescos", "Donaciones a bancos de alimentos", "Participación comunitaria", "Programa Granjas de Solidaridad Urbana"],
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  },
];

const fallbackTestimonialsEn: Testimonial[] = [
  {
    quote: "Transforming our patio into an urban farm with MicroHabitat was a welcome change for our organization. Since 2021, over 2,850 pounds of vegetables, edible flowers and herbs have been harvested and donated to local food banks.",
    author: "Cécile G.",
    role: "",
    company: "BNP Paribas in Canada",
    highlight: "2,850 lbs donated since 2021",
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    companyLogo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/7cc8afae-d8c7-4c12-9b02-ef36319b3c75/BNP-Paribas-Logo-768x432.png",
  },
  {
    quote: "Partnering with MicroHabitat has been the highlight of my career. Our rooftop garden has brought new life to our property and re-ignited our tenant engagement initiatives following the Pandemic.",
    author: "Vanessa S.",
    role: "Tenant Services Coordinator",
    company: "GWL Realty Advisors Inc.",
    highlight: "Revitalized tenant engagement",
    companyLogo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/52266300-fb02-4529-a42e-ffdc33cfdd11/gwl-logo.png",
  },
];

const fallbackTestimonialsFr: Testimonial[] = [
  {
    quote: "Transformer notre terrasse en ferme urbaine avec MicroHabitat a été un changement bienvenu pour notre organisation. Depuis 2021, plus de 2 850 livres de légumes, fleurs comestibles et herbes ont été récoltées et données aux banques alimentaires locales.",
    author: "Cécile G.",
    role: "",
    company: "BNP Paribas au Canada",
    highlight: "2 850 lbs données depuis 2021",
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    companyLogo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/7cc8afae-d8c7-4c12-9b02-ef36319b3c75/BNP-Paribas-Logo-768x432.png",
  },
  {
    quote: "Le partenariat avec MicroHabitat a été le point culminant de ma carrière. Notre jardin sur le toit a apporté une nouvelle vie à notre propriété et a relancé nos initiatives d'engagement des locataires suite à la pandémie.",
    author: "Vanessa S.",
    role: "Coordonnatrice des services aux locataires",
    company: "GWL Realty Advisors Inc.",
    highlight: "Engagement des locataires revitalisé",
    companyLogo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/52266300-fb02-4529-a42e-ffdc33cfdd11/gwl-logo.png",
  },
];

const fallbackTestimonialsDe: Testimonial[] = [
  {
    quote: "Die Umwandlung unserer Terrasse in eine Stadtfarm mit MicroHabitat war eine willkommene Veränderung für unsere Organisation. Seit 2021 wurden über 1.290 kg Gemüse, essbare Blumen und Kräuter geerntet und an lokale Tafeln gespendet.",
    author: "Cécile G.",
    role: "",
    company: "BNP Paribas in Kanada",
    highlight: "1.290 kg seit 2021 gespendet",
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    companyLogo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/7cc8afae-d8c7-4c12-9b02-ef36319b3c75/BNP-Paribas-Logo-768x432.png",
  },
  {
    quote: "Die Partnerschaft mit MicroHabitat war der Höhepunkt meiner Karriere. Unser Dachgarten hat unserem Gebäude neues Leben eingehaucht und unsere Mieterengagement-Initiativen nach der Pandemie wiederbelebt.",
    author: "Vanessa S.",
    role: "Mieterservice-Koordinatorin",
    company: "GWL Realty Advisors Inc.",
    highlight: "Mieterengagement wiederbelebt",
    companyLogo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/52266300-fb02-4529-a42e-ffdc33cfdd11/gwl-logo.png",
  },
];

const fallbackTestimonialsNl: Testimonial[] = [
  {
    quote: "Het transformeren van ons terras in een stadsboerderij met MicroHabitat was een welkome verandering voor onze organisatie. Sinds 2021 is meer dan 1.290 kg groenten, eetbare bloemen en kruiden geoogst en gedoneerd aan lokale voedselbanken.",
    author: "Cécile G.",
    role: "",
    company: "BNP Paribas in Canada",
    highlight: "1.290 kg gedoneerd sinds 2021",
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    companyLogo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/7cc8afae-d8c7-4c12-9b02-ef36319b3c75/BNP-Paribas-Logo-768x432.png",
  },
  {
    quote: "De samenwerking met MicroHabitat was het hoogtepunt van mijn carrière. Onze dakmoestuin heeft nieuw leven gebracht in ons gebouw en onze huurdersbetrokkenheid initiatieven na de pandemie nieuw leven ingeblazen.",
    author: "Vanessa S.",
    role: "Huurders Services Coördinator",
    company: "GWL Realty Advisors Inc.",
    highlight: "Huurdersbetrokkenheid hersteld",
    companyLogo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/52266300-fb02-4529-a42e-ffdc33cfdd11/gwl-logo.png",
  },
];

const fallbackTestimonialsIt: Testimonial[] = [
  {
    quote: "Trasformare il nostro terrazzo in una fattoria urbana con MicroHabitat è stato un cambiamento gradito per la nostra organizzazione. Dal 2021, oltre 1.290 kg di verdure, fiori commestibili ed erbe sono stati raccolti e donati ai banchi alimentari locali.",
    author: "Cécile G.",
    role: "",
    company: "BNP Paribas in Canada",
    highlight: "1.290 kg donati dal 2021",
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    companyLogo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/7cc8afae-d8c7-4c12-9b02-ef36319b3c75/BNP-Paribas-Logo-768x432.png",
  },
  {
    quote: "La partnership con MicroHabitat è stata il punto culminante della mia carriera. Il nostro orto sul tetto ha portato nuova vita alla nostra proprietà e ha rilanciato le nostre iniziative di coinvolgimento degli inquilini dopo la pandemia.",
    author: "Vanessa S.",
    role: "Coordinatrice Servizi Inquilini",
    company: "GWL Realty Advisors Inc.",
    highlight: "Coinvolgimento inquilini rivitalizzato",
    companyLogo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/52266300-fb02-4529-a42e-ffdc33cfdd11/gwl-logo.png",
  },
];

const fallbackTestimonialsEs: Testimonial[] = [
  {
    quote: "Transformar nuestro patio en una granja urbana con MicroHabitat fue un cambio bienvenido para nuestra organización. Desde 2021, más de 1.290 kg de verduras, flores comestibles y hierbas han sido cosechadas y donadas a bancos de alimentos locales.",
    author: "Cécile G.",
    role: "",
    company: "BNP Paribas en Canadá",
    highlight: "1.290 kg donados desde 2021",
    image: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    companyLogo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/7cc8afae-d8c7-4c12-9b02-ef36319b3c75/BNP-Paribas-Logo-768x432.png",
  },
  {
    quote: "La asociación con MicroHabitat ha sido el punto culminante de mi carrera. Nuestro huerto en la azotea ha dado nueva vida a nuestra propiedad y ha reactivado nuestras iniciativas de participación de inquilinos después de la pandemia.",
    author: "Vanessa S.",
    role: "Coordinadora de Servicios a Inquilinos",
    company: "GWL Realty Advisors Inc.",
    highlight: "Participación de inquilinos revitalizada",
    companyLogo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/52266300-fb02-4529-a42e-ffdc33cfdd11/gwl-logo.png",
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

const fallbackCitiesEn: City[] = [
  { name: "Montreal", country: "Canada", region: "north-america" },
  { name: "Toronto", country: "Canada", region: "north-america" },
  { name: "Vancouver", country: "Canada", region: "north-america" },
  { name: "Calgary", country: "Canada", region: "north-america" },
  { name: "Edmonton", country: "Canada", region: "north-america" },
  { name: "Victoria", country: "Canada", region: "north-america" },
  { name: "New York City", country: "USA", region: "north-america" },
  { name: "Chicago", country: "USA", region: "north-america" },
  { name: "Dallas", country: "USA", region: "north-america" },
  { name: "Los Angeles", country: "USA", region: "north-america" },
  { name: "San Francisco", country: "USA", region: "north-america" },
  { name: "Washington DC", country: "USA", region: "north-america" },
  { name: "Denver", country: "USA", region: "north-america" },
  { name: "Columbus", country: "USA", region: "north-america" },
  { name: "Seattle", country: "USA", region: "north-america" },
  { name: "Amsterdam", country: "Netherlands", region: "europe" },
  { name: "Berlin", country: "Germany", region: "europe" },
  { name: "London", country: "UK", region: "europe" },
  { name: "Paris", country: "France", region: "europe" },
  { name: "Zurich", country: "Switzerland", region: "europe" },
];

const fallbackCitiesFr: City[] = [
  { name: "Montréal", country: "Canada", region: "north-america" },
  { name: "Toronto", country: "Canada", region: "north-america" },
  { name: "Vancouver", country: "Canada", region: "north-america" },
  { name: "Calgary", country: "Canada", region: "north-america" },
  { name: "Edmonton", country: "Canada", region: "north-america" },
  { name: "Victoria", country: "Canada", region: "north-america" },
  { name: "New York", country: "États-Unis", region: "north-america" },
  { name: "Chicago", country: "États-Unis", region: "north-america" },
  { name: "Dallas", country: "États-Unis", region: "north-america" },
  { name: "Los Angeles", country: "États-Unis", region: "north-america" },
  { name: "San Francisco", country: "États-Unis", region: "north-america" },
  { name: "Washington DC", country: "États-Unis", region: "north-america" },
  { name: "Denver", country: "États-Unis", region: "north-america" },
  { name: "Columbus", country: "États-Unis", region: "north-america" },
  { name: "Seattle", country: "États-Unis", region: "north-america" },
  { name: "Amsterdam", country: "Pays-Bas", region: "europe" },
  { name: "Berlin", country: "Allemagne", region: "europe" },
  { name: "Londres", country: "Royaume-Uni", region: "europe" },
  { name: "Paris", country: "France", region: "europe" },
  { name: "Zurich", country: "Suisse", region: "europe" },
];

const fallbackCitiesDe: City[] = [
  { name: "Montreal", country: "Kanada", region: "north-america" },
  { name: "Toronto", country: "Kanada", region: "north-america" },
  { name: "Vancouver", country: "Kanada", region: "north-america" },
  { name: "Calgary", country: "Kanada", region: "north-america" },
  { name: "Edmonton", country: "Kanada", region: "north-america" },
  { name: "Victoria", country: "Kanada", region: "north-america" },
  { name: "New York City", country: "USA", region: "north-america" },
  { name: "Chicago", country: "USA", region: "north-america" },
  { name: "Dallas", country: "USA", region: "north-america" },
  { name: "Los Angeles", country: "USA", region: "north-america" },
  { name: "San Francisco", country: "USA", region: "north-america" },
  { name: "Washington DC", country: "USA", region: "north-america" },
  { name: "Denver", country: "USA", region: "north-america" },
  { name: "Columbus", country: "USA", region: "north-america" },
  { name: "Seattle", country: "USA", region: "north-america" },
  { name: "Amsterdam", country: "Niederlande", region: "europe" },
  { name: "Berlin", country: "Deutschland", region: "europe" },
  { name: "London", country: "Großbritannien", region: "europe" },
  { name: "Paris", country: "Frankreich", region: "europe" },
  { name: "Zürich", country: "Schweiz", region: "europe" },
];

const fallbackCitiesNl: City[] = [
  { name: "Montreal", country: "Canada", region: "north-america" },
  { name: "Toronto", country: "Canada", region: "north-america" },
  { name: "Vancouver", country: "Canada", region: "north-america" },
  { name: "Calgary", country: "Canada", region: "north-america" },
  { name: "Edmonton", country: "Canada", region: "north-america" },
  { name: "Victoria", country: "Canada", region: "north-america" },
  { name: "New York City", country: "VS", region: "north-america" },
  { name: "Chicago", country: "VS", region: "north-america" },
  { name: "Dallas", country: "VS", region: "north-america" },
  { name: "Los Angeles", country: "VS", region: "north-america" },
  { name: "San Francisco", country: "VS", region: "north-america" },
  { name: "Washington DC", country: "VS", region: "north-america" },
  { name: "Denver", country: "VS", region: "north-america" },
  { name: "Columbus", country: "VS", region: "north-america" },
  { name: "Seattle", country: "VS", region: "north-america" },
  { name: "Amsterdam", country: "Nederland", region: "europe" },
  { name: "Berlijn", country: "Duitsland", region: "europe" },
  { name: "Londen", country: "VK", region: "europe" },
  { name: "Parijs", country: "Frankrijk", region: "europe" },
  { name: "Zürich", country: "Zwitserland", region: "europe" },
];

const fallbackCitiesIt: City[] = [
  { name: "Montreal", country: "Canada", region: "north-america" },
  { name: "Toronto", country: "Canada", region: "north-america" },
  { name: "Vancouver", country: "Canada", region: "north-america" },
  { name: "Calgary", country: "Canada", region: "north-america" },
  { name: "Edmonton", country: "Canada", region: "north-america" },
  { name: "Victoria", country: "Canada", region: "north-america" },
  { name: "New York", country: "USA", region: "north-america" },
  { name: "Chicago", country: "USA", region: "north-america" },
  { name: "Dallas", country: "USA", region: "north-america" },
  { name: "Los Angeles", country: "USA", region: "north-america" },
  { name: "San Francisco", country: "USA", region: "north-america" },
  { name: "Washington DC", country: "USA", region: "north-america" },
  { name: "Denver", country: "USA", region: "north-america" },
  { name: "Columbus", country: "USA", region: "north-america" },
  { name: "Seattle", country: "USA", region: "north-america" },
  { name: "Amsterdam", country: "Paesi Bassi", region: "europe" },
  { name: "Berlino", country: "Germania", region: "europe" },
  { name: "Londra", country: "Regno Unito", region: "europe" },
  { name: "Parigi", country: "Francia", region: "europe" },
  { name: "Zurigo", country: "Svizzera", region: "europe" },
];

const fallbackCitiesEs: City[] = [
  { name: "Montreal", country: "Canadá", region: "north-america" },
  { name: "Toronto", country: "Canadá", region: "north-america" },
  { name: "Vancouver", country: "Canadá", region: "north-america" },
  { name: "Calgary", country: "Canadá", region: "north-america" },
  { name: "Edmonton", country: "Canadá", region: "north-america" },
  { name: "Victoria", country: "Canadá", region: "north-america" },
  { name: "Nueva York", country: "EE.UU.", region: "north-america" },
  { name: "Chicago", country: "EE.UU.", region: "north-america" },
  { name: "Dallas", country: "EE.UU.", region: "north-america" },
  { name: "Los Ángeles", country: "EE.UU.", region: "north-america" },
  { name: "San Francisco", country: "EE.UU.", region: "north-america" },
  { name: "Washington DC", country: "EE.UU.", region: "north-america" },
  { name: "Denver", country: "EE.UU.", region: "north-america" },
  { name: "Columbus", country: "EE.UU.", region: "north-america" },
  { name: "Seattle", country: "EE.UU.", region: "north-america" },
  { name: "Ámsterdam", country: "Países Bajos", region: "europe" },
  { name: "Berlín", country: "Alemania", region: "europe" },
  { name: "Londres", country: "Reino Unido", region: "europe" },
  { name: "París", country: "Francia", region: "europe" },
  { name: "Zúrich", country: "Suiza", region: "europe" },
];

const fallbackNavLinksEn: NavLink[] = [
  { href: "#services", label: "Services", id: "services" },
  { href: "#impact", label: "Impact", id: "impact" },
  { href: "#testimonials", label: "Testimonials", id: "testimonials" },
  { href: "#cities", label: "Cities", id: "cities" },
  { href: "#faq", label: "FAQ", id: "faq" },
];

const fallbackNavLinksFr: NavLink[] = [
  { href: "#services", label: "Services", id: "services" },
  { href: "#impact", label: "Impact", id: "impact" },
  { href: "#testimonials", label: "Témoignages", id: "testimonials" },
  { href: "#cities", label: "Villes", id: "cities" },
  { href: "#faq", label: "FAQ", id: "faq" },
];

const fallbackNavLinksDe: NavLink[] = [
  { href: "#services", label: "Dienstleistungen", id: "services" },
  { href: "#impact", label: "Wirkung", id: "impact" },
  { href: "#testimonials", label: "Referenzen", id: "testimonials" },
  { href: "#cities", label: "Städte", id: "cities" },
  { href: "#faq", label: "FAQ", id: "faq" },
];

const fallbackNavLinksNl: NavLink[] = [
  { href: "#services", label: "Diensten", id: "services" },
  { href: "#impact", label: "Impact", id: "impact" },
  { href: "#testimonials", label: "Getuigenissen", id: "testimonials" },
  { href: "#cities", label: "Steden", id: "cities" },
  { href: "#faq", label: "FAQ", id: "faq" },
];

const fallbackNavLinksIt: NavLink[] = [
  { href: "#services", label: "Servizi", id: "services" },
  { href: "#impact", label: "Impatto", id: "impact" },
  { href: "#testimonials", label: "Testimonianze", id: "testimonials" },
  { href: "#cities", label: "Città", id: "cities" },
  { href: "#faq", label: "FAQ", id: "faq" },
];

const fallbackNavLinksEs: NavLink[] = [
  { href: "#services", label: "Servicios", id: "services" },
  { href: "#impact", label: "Impacto", id: "impact" },
  { href: "#testimonials", label: "Testimonios", id: "testimonials" },
  { href: "#cities", label: "Ciudades", id: "cities" },
  { href: "#faq", label: "FAQ", id: "faq" },
];

const fallbackFooterSectionsEn: FooterSection[] = [
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

const fallbackFooterSectionsFr: FooterSection[] = [
  {
    title: "Services",
    links: [
      { label: "Ferme extérieure", href: "/services/outdoor" },
      { label: "Ferme intérieure", href: "/services/indoor" },
      { label: "Activités éducatives", href: "/services/educational" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/about" },
      { label: "Villes", href: "/cities" },
      { label: "Carrières", href: "/careers" },
      { label: "Partenariats", href: "/partnerships" },
      { label: "Engagement communautaire", href: "/community" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Blogue", href: "/blog" },
      { label: "MyUrbanFarm", href: "https://myurbanfarm.ai" },
    ],
  },
];

const fallbackFooterSectionsDe: FooterSection[] = [
  {
    title: "Dienstleistungen",
    links: [
      { label: "Outdoor-Farm", href: "/services/outdoor" },
      { label: "Indoor-Farm", href: "/services/indoor" },
      { label: "Bildungsaktivitäten", href: "/services/educational" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über uns", href: "/about" },
      { label: "Städte", href: "/cities" },
      { label: "Karriere", href: "/careers" },
      { label: "Partnerschaften", href: "/partnerships" },
      { label: "Gemeinschaftsengagement", href: "/community" },
    ],
  },
  {
    title: "Ressourcen",
    links: [
      { label: "Kontakt", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "MyUrbanFarm", href: "https://myurbanfarm.ai" },
    ],
  },
];

const fallbackFooterSectionsNl: FooterSection[] = [
  {
    title: "Diensten",
    links: [
      { label: "Buitenboerderij", href: "/services/outdoor" },
      { label: "Binnenboerderij", href: "/services/indoor" },
      { label: "Educatieve activiteiten", href: "/services/educational" },
    ],
  },
  {
    title: "Bedrijf",
    links: [
      { label: "Over ons", href: "/about" },
      { label: "Steden", href: "/cities" },
      { label: "Carrières", href: "/careers" },
      { label: "Partnerschappen", href: "/partnerships" },
      { label: "Gemeenschapsbetrokkenheid", href: "/community" },
    ],
  },
  {
    title: "Hulpmiddelen",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "MyUrbanFarm", href: "https://myurbanfarm.ai" },
    ],
  },
];

const fallbackFooterSectionsIt: FooterSection[] = [
  {
    title: "Servizi",
    links: [
      { label: "Fattoria esterna", href: "/services/outdoor" },
      { label: "Fattoria interna", href: "/services/indoor" },
      { label: "Attività educative", href: "/services/educational" },
    ],
  },
  {
    title: "Azienda",
    links: [
      { label: "Chi siamo", href: "/about" },
      { label: "Città", href: "/cities" },
      { label: "Carriere", href: "/careers" },
      { label: "Partnership", href: "/partnerships" },
      { label: "Impegno comunitario", href: "/community" },
    ],
  },
  {
    title: "Risorse",
    links: [
      { label: "Contatto", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "MyUrbanFarm", href: "https://myurbanfarm.ai" },
    ],
  },
];

const fallbackFooterSectionsEs: FooterSection[] = [
  {
    title: "Servicios",
    links: [
      { label: "Granja exterior", href: "/services/outdoor" },
      { label: "Granja interior", href: "/services/indoor" },
      { label: "Actividades educativas", href: "/services/educational" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nosotros", href: "/about" },
      { label: "Ciudades", href: "/cities" },
      { label: "Empleo", href: "/careers" },
      { label: "Colaboraciones", href: "/partnerships" },
      { label: "Participación comunitaria", href: "/community" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Contacto", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "MyUrbanFarm", href: "https://myurbanfarm.ai" },
    ],
  },
];

// FAQ data matching microhabitat.com/faq
const fallbackFAQEn: FAQItem[] = [
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

const fallbackFAQFr: FAQItem[] = [
  { question: "Pourquoi intégrer l'agriculture urbaine?", answer: "L'agriculture urbaine offre des avantages sociaux et environnementaux pour les communautés qui recherchent des modes de vie plus sains et durables. Elle fournit des produits frais, des opportunités éducatives, un engagement communautaire et soutient les certifications de bâtiments verts.", category: "Général" },
  { question: "Quelle est la première étape pour déterminer si mon bâtiment peut accueillir un programme?", answer: "Effectuez une évaluation gratuite du site avec MicroHabitat lors d'une réunion virtuelle. Notre évaluation comprend l'analyse de l'espace disponible, l'exposition au soleil, l'accès à l'eau et l'intégrité structurelle de votre propriété.", category: "Général" },
  { question: "Comment savoir si mon bâtiment convient à un projet d'agriculture urbaine?", answer: "Les exigences comprennent au moins 200 pi² (20m²) d'espace, un ensoleillement adéquat (minimum 6 heures par jour), des sources d'eau accessibles et un accès sécuritaire au toit si applicable. Notre équipe peut évaluer votre situation spécifique lors d'une consultation.", category: "Général" },
  { question: "Puis-je obtenir des points pour mon bâtiment grâce aux certifications de bâtiments verts?", answer: "Oui! Nos programmes soutiennent les certifications LEED, BOMA, BOMA BEST, GRESB, Fitwel et WELL. Les crédits spécifiques dépendent de l'échelle et de la portée du projet.", category: "Général" },
  { question: "Offrez-vous des solutions de production intérieure?", answer: "Oui, MicroHabitat offre une unité intérieure qui produit une croissance toute l'année grâce à notre solution clé en main. Celles-ci sont parfaites pour les halls d'entrée, cafétérias et espaces de culture dédiés.", category: "Général" },
  { question: "Pourquoi MicroHabitat a-t-il été créé?", answer: "MicroHabitat a été fondé pour lutter contre l'insécurité alimentaire urbaine en transformant les espaces urbains sous-utilisés en jardins écologiques productifs, favorisant la durabilité et le lien communautaire avec les sources alimentaires.", category: "À propos" },
  { question: "Quelle est l'histoire de MicroHabitat?", answer: "Établi à Montréal en 2016, MicroHabitat est devenu le plus grand réseau de fermes urbaines en Amérique du Nord, opérant maintenant dans plusieurs villes au Canada, aux États-Unis et en Europe.", category: "À propos" },
  { question: "Où MicroHabitat est-il implanté?", answer: "Nos projets opèrent à travers l'Amérique du Nord et l'Europe sur les toits, terrasses et espaces au sol d'entreprises, écoles et organisations dans plus de 20 grandes villes.", category: "À propos" },
  { question: "MicroHabitat est-il une franchise?", answer: "Non, MicroHabitat est une entreprise unique avec des employés à temps plein dévoués et des bureaux dans plusieurs régions. Nous maintenons une qualité et un service constants dans tous nos emplacements.", category: "À propos" },
  { question: "L'installation modifie-t-elle mon bâtiment ou mon espace?", answer: "Aucun changement permanent ne se produit. Nos pots de culture sont conçus en tenant compte de votre propriété — aucun perçage ni creusage n'est requis. Tout peut être retiré sans laisser de trace.", category: "Technique" },
  { question: "De combien d'espace ai-je besoin pour une ferme urbaine?", answer: "Un minimum de 200 pi² (20m²) d'espace accessible est requis pour une ferme extérieure. Les solutions intérieures peuvent fonctionner avec des espaces plus petits.", category: "Technique" },
  { question: "Quelles sont les exigences pour avoir une ferme urbaine?", answer: "Vous avez besoin d'un espace adéquat (minimum 200 pi²) plus un minimum de 6 heures d'ensoleillement quotidien pour les fermes extérieures. Les fermes intérieures ont des exigences plus flexibles.", category: "Technique" },
  { question: "Est-il sécuritaire d'ajouter une ferme sur un toit?", answer: "Nos pots de culture ultra-légers ne compromettent généralement pas la capacité de charge du toit. Nous recommandons toujours de consulter l'ingénieur de votre bâtiment, et nous rapportons une approbation universelle des ingénieurs avec lesquels nous avons travaillé.", category: "Technique" },
  { question: "Quelle couverture d'assurance offrez-vous?", answer: "Nos programmes incluent une couverture de responsabilité de 5 millions de dollars pour la responsabilité commerciale, automobile et excédentaire, vous offrant une tranquillité d'esprit complète.", category: "Technique" },
  { question: "Comment fonctionne le programme?", answer: "Nos programmes clé en main comprennent l'installation, les systèmes d'irrigation écologiques, la plantation, les visites d'entretien hebdomadaires, la récolte et la livraison, les activités éducatives et les outils marketing. Les fermes extérieures fonctionnent presque partout à l'extérieur; les unités intérieures fonctionnent presque partout à l'intérieur.", category: "Produits" },
  { question: "Qu'est-ce qui est inclus dans le programme?", answer: "Notre forfait complet comprend: installation, système d'irrigation écologique, plantation saisonnière, visites d'entretien hebdomadaires, récolte et livraison, activités éducatives, outils marketing et cadeaux corporatifs (selon le forfait sélectionné).", category: "Produits" },
  { question: "Qu'advient-il des produits frais?", answer: "C'est vous qui choisissez! Les options incluent la distribution interne aux occupants du bâtiment ou aux employés, ou le don aux banques alimentaires locales via notre programme Fermes de solidarité urbaine qui se déroule de juillet à octobre.", category: "Produits" },
  { question: "Comment le programme MicroHabitat engage-t-il les occupants?", answer: "Nos programmes comprennent un minimum de deux activités éducatives couvrant les pratiques agricoles écologiques, la conservation des semences, le compostage et les sujets de durabilité connexes.", category: "Engagement" },
  { question: "Avez-vous différents types d'activités?", answer: "Oui! Nous offrons des kiosques interactifs, des visites guidées du jardin et des ateliers éducatifs. Les activités peuvent être personnalisées selon les besoins et intérêts de votre organisation.", category: "Engagement" },
  { question: "Offrez-vous des activités en ligne?", answer: "Oui, nos ateliers virtuels couvrent l'agriculture écologique, les meilleures pratiques d'entretien, l'hivernage, la conservation des semences, la planification de la succession des cultures et le soutien aux pollinisateurs.", category: "Engagement" },
  { question: "Offrez-vous des activités pour tous les groupes d'âge?", answer: "Absolument! Toutes nos activités éducatives sont conçues pour être stimulantes pour les individus de tous âges, des enfants aux aînés.", category: "Engagement" },
  { question: "Les occupants du bâtiment doivent-ils avoir accès à l'installation?", answer: "L'accès n'est pas requis pour que notre équipe d'entretien effectue son travail. Cependant, l'accessibilité peut être souhaitée pour l'engagement des locataires ou pour se qualifier pour certains crédits de certification de bâtiments verts.", category: "Sécurité" },
  { question: "Comment créez-vous des espaces agricoles sécuritaires sur les toits sans garde-corps?", answer: "Nous créons un dégagement de sécurité minimum selon les directives locales et contenons tous les jardins dans un périmètre localisé éloigné des bords du toit. La sécurité est toujours notre priorité absolue.", category: "Sécurité" },
  { question: "Puis-je avoir une ferme urbaine si des animaux sauvages sont présents?", answer: "Oui! Nos grands pots en textile préviennent la plupart des interférences animales. Pour les zones avec des cerfs, nous recommandons des solutions de clôture supplémentaires que nous pouvons aider à mettre en place.", category: "Sécurité" },
  { question: "Utilisez-vous des produits chimiques, pesticides ou engrais?", answer: "Non, tous nos jardins sont créés sans l'utilisation de produits chimiques, pesticides ou engrais synthétiques. Nous utilisons uniquement des pratiques durables et biologiques pour cultiver des produits sains.", category: "Durabilité" },
  { question: "Ai-je besoin d'un permis agricole pour distribuer mes produits?", answer: "Non, tous les produits de votre ferme vous appartiennent et peuvent être distribués librement aux occupants ou donnés aux banques alimentaires sans aucune exigence de permis spécial.", category: "Durabilité" },
  { question: "Ai-je besoin d'un espace vert pour obtenir un programme?", answer: "Non! Nos solutions fonctionnent sur n'importe quelle surface avec un éclairage adéquat — béton, gravier ou espace vert existant. Nous apportons la verdure chez vous.", category: "Durabilité" },
];

// Section content fallbacks
const fallbackImpactSectionEn: ImpactSectionContent = {
  label: "Our Impact",
  heading: "Making a real",
  headingHighlight: "difference",
  description: "Our urban farms create measurable impact through food production, community engagement, and environmental benefits.",
  images: [
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  ],
};

const fallbackImpactSectionFr: ImpactSectionContent = {
  label: "Notre impact",
  heading: "Faire une vraie",
  headingHighlight: "différence",
  description: "Nos fermes urbaines créent un impact mesurable grâce à la production alimentaire, à l'engagement communautaire et aux avantages environnementaux.",
  images: [
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  ],
};

const fallbackImpactSectionDe: ImpactSectionContent = {
  label: "Unsere Wirkung",
  heading: "Einen echten",
  headingHighlight: "Unterschied machen",
  description: "Unsere Stadtfarmen schaffen messbaren Impact durch Lebensmittelproduktion, Gemeinschaftsengagement und Umweltvorteile.",
  images: [
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  ],
};

const fallbackImpactSectionNl: ImpactSectionContent = {
  label: "Onze Impact",
  heading: "Een echt",
  headingHighlight: "verschil maken",
  description: "Onze stadsboerderijen creëren meetbare impact door voedselproductie, gemeenschapsbetrokkenheid en milieuvoordelen.",
  images: [
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  ],
};

const fallbackImpactSectionIt: ImpactSectionContent = {
  label: "Il Nostro Impatto",
  heading: "Fare una vera",
  headingHighlight: "differenza",
  description: "Le nostre fattorie urbane creano un impatto misurabile attraverso la produzione alimentare, il coinvolgimento della comunità e i benefici ambientali.",
  images: [
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  ],
};

const fallbackImpactSectionEs: ImpactSectionContent = {
  label: "Nuestro Impacto",
  heading: "Haciendo una verdadera",
  headingHighlight: "diferencia",
  description: "Nuestras granjas urbanas crean un impacto medible a través de la producción de alimentos, la participación comunitaria y los beneficios ambientales.",
  images: [
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg",
    "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  ],
};

const fallbackServicesSectionEn: ServicesSectionContent = {
  label: "Our Services",
  heading: "Everything you need for",
  headingHighlight: "urban farming",
  description: "From installation to maintenance, we provide comprehensive urban farming solutions tailored to your space and goals.",
  ctaText: "Ready to transform your space?",
  ctaButtonText: "Book a demo",
};

const fallbackServicesSectionFr: ServicesSectionContent = {
  label: "Nos services",
  heading: "Tout ce dont vous avez besoin pour",
  headingHighlight: "l'agriculture urbaine",
  description: "De l'installation à l'entretien, nous fournissons des solutions d'agriculture urbaine complètes adaptées à votre espace et vos objectifs.",
  ctaText: "Prêt à transformer votre espace?",
  ctaButtonText: "Réserver une démo",
};

const fallbackServicesSectionDe: ServicesSectionContent = {
  label: "Unsere Dienstleistungen",
  heading: "Alles, was Sie brauchen für",
  headingHighlight: "Urban Farming",
  description: "Von der Installation bis zur Wartung bieten wir umfassende Urban-Farming-Lösungen, die auf Ihren Raum und Ihre Ziele zugeschnitten sind.",
  ctaText: "Bereit, Ihren Raum zu verwandeln?",
  ctaButtonText: "Demo buchen",
};

const fallbackServicesSectionNl: ServicesSectionContent = {
  label: "Onze Diensten",
  heading: "Alles wat u nodig heeft voor",
  headingHighlight: "stadslandbouw",
  description: "Van installatie tot onderhoud, wij bieden uitgebreide stadslandbouwoplossingen op maat van uw ruimte en doelen.",
  ctaText: "Klaar om uw ruimte te transformeren?",
  ctaButtonText: "Demo boeken",
};

const fallbackServicesSectionIt: ServicesSectionContent = {
  label: "I Nostri Servizi",
  heading: "Tutto ciò di cui hai bisogno per",
  headingHighlight: "l'agricoltura urbana",
  description: "Dall'installazione alla manutenzione, forniamo soluzioni complete di agricoltura urbana su misura per il vostro spazio e i vostri obiettivi.",
  ctaText: "Pronti a trasformare il vostro spazio?",
  ctaButtonText: "Prenota una demo",
};

const fallbackServicesSectionEs: ServicesSectionContent = {
  label: "Nuestros Servicios",
  heading: "Todo lo que necesita para",
  headingHighlight: "la agricultura urbana",
  description: "Desde la instalación hasta el mantenimiento, proporcionamos soluciones integrales de agricultura urbana adaptadas a su espacio y objetivos.",
  ctaText: "¿Listo para transformar su espacio?",
  ctaButtonText: "Reservar una demo",
};

const fallbackPartnersSectionEn: PartnersSectionContent = {
  label: "Trusted By",
  heading: "Leading organizations across North America",
};

const fallbackPartnersSectionFr: PartnersSectionContent = {
  label: "Ils nous font confiance",
  heading: "Des organisations leaders à travers l'Amérique du Nord",
};

const fallbackPartnersSectionDe: PartnersSectionContent = {
  label: "Vertraut von",
  heading: "Führende Organisationen in Nordamerika",
};

const fallbackPartnersSectionNl: PartnersSectionContent = {
  label: "Vertrouwd door",
  heading: "Toonaangevende organisaties in Noord-Amerika",
};

const fallbackPartnersSectionIt: PartnersSectionContent = {
  label: "Ci hanno scelto",
  heading: "Organizzazioni leader in Nord America",
};

const fallbackPartnersSectionEs: PartnersSectionContent = {
  label: "Confían en nosotros",
  heading: "Organizaciones líderes en Norteamérica",
};

const fallbackTestimonialsSectionEn: TestimonialsSectionContent = {
  label: "Testimonials",
  heading: "What our clients say",
  description: "See how urban farming has transformed properties and communities across North America.",
};

const fallbackTestimonialsSectionFr: TestimonialsSectionContent = {
  label: "Témoignages",
  heading: "Ce que disent nos clients",
  description: "Découvrez comment l'agriculture urbaine a transformé les propriétés et les communautés à travers l'Amérique du Nord.",
};

const fallbackTestimonialsSectionDe: TestimonialsSectionContent = {
  label: "Referenzen",
  heading: "Was unsere Kunden sagen",
  description: "Sehen Sie, wie Urban Farming Immobilien und Gemeinschaften in Nordamerika verändert hat.",
};

const fallbackTestimonialsSectionNl: TestimonialsSectionContent = {
  label: "Getuigenissen",
  heading: "Wat onze klanten zeggen",
  description: "Ontdek hoe stadslandbouw eigendommen en gemeenschappen in Noord-Amerika heeft getransformeerd.",
};

const fallbackTestimonialsSectionIt: TestimonialsSectionContent = {
  label: "Testimonianze",
  heading: "Cosa dicono i nostri clienti",
  description: "Scopri come l'agricoltura urbana ha trasformato proprietà e comunità in Nord America.",
};

const fallbackTestimonialsSectionEs: TestimonialsSectionContent = {
  label: "Testimonios",
  heading: "Lo que dicen nuestros clientes",
  description: "Vea cómo la agricultura urbana ha transformado propiedades y comunidades en Norteamérica.",
};

const fallbackCitiesSectionEn: CitiesSectionContent = {
  label: "Our Network",
  heading: "Growing in cities worldwide",
  description: "From Montreal to Zurich, we're bringing urban farming to communities across North America and Europe.",
  ctaText: "Don't see your city?",
  ctaButtonText: "Let's talk about expansion",
};

const fallbackCitiesSectionFr: CitiesSectionContent = {
  label: "Notre réseau",
  heading: "En croissance dans les villes du monde entier",
  description: "De Montréal à Zurich, nous apportons l'agriculture urbaine aux communautés à travers l'Amérique du Nord et l'Europe.",
  ctaText: "Vous ne voyez pas votre ville?",
  ctaButtonText: "Parlons d'expansion",
};

const fallbackCitiesSectionDe: CitiesSectionContent = {
  label: "Unser Netzwerk",
  heading: "Wachstum in Städten weltweit",
  description: "Von Montreal bis Zürich bringen wir Urban Farming in Gemeinschaften in Nordamerika und Europa.",
  ctaText: "Ihre Stadt nicht dabei?",
  ctaButtonText: "Lassen Sie uns über Expansion sprechen",
};

const fallbackCitiesSectionNl: CitiesSectionContent = {
  label: "Ons Netwerk",
  heading: "Groeiend in steden wereldwijd",
  description: "Van Montreal tot Zürich brengen we stadslandbouw naar gemeenschappen in Noord-Amerika en Europa.",
  ctaText: "Ziet u uw stad niet?",
  ctaButtonText: "Laten we over uitbreiding praten",
};

const fallbackCitiesSectionIt: CitiesSectionContent = {
  label: "La Nostra Rete",
  heading: "In crescita nelle città di tutto il mondo",
  description: "Da Montreal a Zurigo, portiamo l'agricoltura urbana alle comunità in Nord America e in Europa.",
  ctaText: "Non vedi la tua città?",
  ctaButtonText: "Parliamo di espansione",
};

const fallbackCitiesSectionEs: CitiesSectionContent = {
  label: "Nuestra Red",
  heading: "Creciendo en ciudades de todo el mundo",
  description: "Desde Montreal hasta Zúrich, llevamos la agricultura urbana a comunidades de Norteamérica y Europa.",
  ctaText: "¿No ve su ciudad?",
  ctaButtonText: "Hablemos de expansión",
};

const fallbackFAQSectionEn: FAQSectionContent = {
  label: "FAQ",
  heading: "Frequently asked questions",
  description: "Everything you need to know about urban farming with MicroHabitat.",
  ctaText: "Still have questions?",
  ctaButtonText: "Contact us",
};

const fallbackFAQSectionFr: FAQSectionContent = {
  label: "FAQ",
  heading: "Questions fréquemment posées",
  description: "Tout ce que vous devez savoir sur l'agriculture urbaine avec MicroHabitat.",
  ctaText: "Vous avez encore des questions?",
  ctaButtonText: "Contactez-nous",
};

const fallbackFAQSectionDe: FAQSectionContent = {
  label: "FAQ",
  heading: "Häufig gestellte Fragen",
  description: "Alles, was Sie über Urban Farming mit MicroHabitat wissen müssen.",
  ctaText: "Haben Sie noch Fragen?",
  ctaButtonText: "Kontaktieren Sie uns",
};

const fallbackFAQSectionNl: FAQSectionContent = {
  label: "FAQ",
  heading: "Veelgestelde vragen",
  description: "Alles wat u moet weten over stadslandbouw met MicroHabitat.",
  ctaText: "Heeft u nog vragen?",
  ctaButtonText: "Neem contact met ons op",
};

const fallbackFAQSectionIt: FAQSectionContent = {
  label: "FAQ",
  heading: "Domande frequenti",
  description: "Tutto quello che devi sapere sull'agricoltura urbana con MicroHabitat.",
  ctaText: "Hai ancora domande?",
  ctaButtonText: "Contattaci",
};

const fallbackFAQSectionEs: FAQSectionContent = {
  label: "FAQ",
  heading: "Preguntas frecuentes",
  description: "Todo lo que necesita saber sobre la agricultura urbana con MicroHabitat.",
  ctaText: "¿Aún tiene preguntas?",
  ctaButtonText: "Contáctenos",
};

const fallbackCTASectionEn: CTASectionContent = {
  label: "Get Started",
  heading: "Ready to transform your",
  headingHighlight: "urban space?",
  description: "Join the world's largest urban farming network and create lasting impact for your community.",
  ctaPrimary: "Book a Demo",
  ctaSecondary: "Contact Sales",
  ctaSecondaryEmail: "sales@microhabitat.com",
  trustIndicators: ["No commitment required", "Customized proposals", "Expert consultation"],
};

const fallbackCTASectionFr: CTASectionContent = {
  label: "Commencer",
  heading: "Prêt à transformer votre",
  headingHighlight: "espace urbain?",
  description: "Rejoignez le plus grand réseau d'agriculture urbaine au monde et créez un impact durable pour votre communauté.",
  ctaPrimary: "Réserver une démo",
  ctaSecondary: "Contacter les ventes",
  ctaSecondaryEmail: "sales@microhabitat.com",
  trustIndicators: ["Aucun engagement requis", "Propositions personnalisées", "Consultation d'experts"],
};

const fallbackCTASectionDe: CTASectionContent = {
  label: "Loslegen",
  heading: "Bereit, Ihren",
  headingHighlight: "städtischen Raum zu verwandeln?",
  description: "Treten Sie dem weltweit größten Urban-Farming-Netzwerk bei und schaffen Sie nachhaltigen Impact für Ihre Gemeinschaft.",
  ctaPrimary: "Demo buchen",
  ctaSecondary: "Vertrieb kontaktieren",
  ctaSecondaryEmail: "sales@microhabitat.com",
  trustIndicators: ["Keine Verpflichtung erforderlich", "Maßgeschneiderte Angebote", "Expertenberatung"],
};

const fallbackCTASectionNl: CTASectionContent = {
  label: "Aan de slag",
  heading: "Klaar om uw",
  headingHighlight: "stedelijke ruimte te transformeren?",
  description: "Sluit u aan bij het grootste stadslandbouwnetwerk ter wereld en creëer blijvende impact voor uw gemeenschap.",
  ctaPrimary: "Demo boeken",
  ctaSecondary: "Verkoop contacteren",
  ctaSecondaryEmail: "sales@microhabitat.com",
  trustIndicators: ["Geen verplichting vereist", "Aangepaste voorstellen", "Deskundige consultatie"],
};

const fallbackCTASectionIt: CTASectionContent = {
  label: "Inizia ora",
  heading: "Pronti a trasformare il vostro",
  headingHighlight: "spazio urbano?",
  description: "Unisciti alla più grande rete di agricoltura urbana al mondo e crea un impatto duraturo per la tua comunità.",
  ctaPrimary: "Prenota una demo",
  ctaSecondary: "Contatta le vendite",
  ctaSecondaryEmail: "sales@microhabitat.com",
  trustIndicators: ["Nessun impegno richiesto", "Proposte personalizzate", "Consulenza esperta"],
};

const fallbackCTASectionEs: CTASectionContent = {
  label: "Comenzar",
  heading: "¿Listo para transformar su",
  headingHighlight: "espacio urbano?",
  description: "Únase a la red de agricultura urbana más grande del mundo y cree un impacto duradero para su comunidad.",
  ctaPrimary: "Reservar una demo",
  ctaSecondary: "Contactar ventas",
  ctaSecondaryEmail: "sales@microhabitat.com",
  trustIndicators: ["Sin compromiso requerido", "Propuestas personalizadas", "Consulta experta"],
};

// ============================================================
// FALLBACK SEO DATA - For all pages in all locales
// ============================================================

const fallbackPageSEOEn: Record<PageSEOKey, SEOData> = {
  'home': {
    metaTitle: 'Discover Urban Farming Today',
    metaDescription: "The world's largest urban farming network. Transform underutilized urban spaces into thriving urban farms that deliver bottom-line results.",
    keywords: 'urban farming, urban agriculture, turnkey urban farming, property amenities, tenant engagement',
    canonical: '/',
  },
  'about': {
    metaTitle: 'About | Microhabitat',
    metaDescription: "Learn about Microhabitat's mission to transform urban spaces into thriving farms. Discover our story, impact, and the team behind the world's largest urban farming network.",
    keywords: 'urban farming company, Montreal, sustainable food, urban agriculture mission',
    canonical: '/about',
  },
  'outdoor-farm': {
    metaTitle: 'Outdoor Urban Farming | Microhabitat',
    metaDescription: "Transform outdoor spaces with Microhabitat's urban farming solutions. Expert design, installation, and maintenance for rooftops, patios, and outdoor areas.",
    keywords: 'rooftop farming, terrace garden, outdoor urban farm, rooftop garden',
    canonical: '/outdoor-farm',
  },
  'indoor-farm': {
    metaTitle: 'Indoor Farming | Microhabitat',
    metaDescription: 'An ultra-local farm-to-table experience featuring freshly harvested herbs and lettuces grown right on-site. Vertical hydroponic farming solutions for any space.',
    keywords: 'indoor farming, vertical farming, hydroponic farming, year-round growing',
    canonical: '/indoor-farm',
  },
  'educational-activities': {
    metaTitle: 'Educational Activities | Microhabitat',
    metaDescription: "Experience urban farming with Microhabitat's educational programs. Garden visits, interactive workshops, and take-home grow kits for schools, teams, and communities.",
    keywords: 'educational activities, sustainable learning, team building, workshops, garden visits',
    canonical: '/educational-activities',
  },
  'commercial-real-estate': {
    metaTitle: 'Commercial Real Estate | Microhabitat',
    metaDescription: "Urban farming solutions for commercial real estate. Enhance property value, tenant engagement, and green building certifications with Microhabitat's expert services.",
    keywords: 'commercial real estate, LEED certification, BOMA BEST, WELL certification, Fitwel, property amenities, ESG',
    canonical: '/commercial-real-estate',
  },
  'corporations': {
    metaTitle: 'Corporations | Microhabitat',
    metaDescription: 'Transform your business with urban agriculture. Custom farming zones, expert maintenance, employee engagement programs, and sustainability initiatives for corporations.',
    keywords: 'corporate sustainability, CSR, employee engagement, workplace wellness, corporate urban farming',
    canonical: '/corporations',
  },
  'schools': {
    metaTitle: 'Schools | Microhabitat',
    metaDescription: 'Agricultural practices that reinforce STEM, health, and environmental lessons. A hands-on approach to teaching sustainability and ecological stewardship.',
    keywords: 'school garden, environmental education, STEM learning, sustainability education',
    canonical: '/schools',
  },
  'careers': {
    metaTitle: 'Careers | Microhabitat',
    metaDescription: 'Join Microhabitat and grow your career in urban agriculture. Explore exciting opportunities in sustainable farming, community engagement, and urban development.',
    keywords: 'urban farming jobs, sustainability careers, green jobs, agriculture careers',
    canonical: '/careers',
  },
  'partnerships': {
    metaTitle: 'Partnerships | Microhabitat',
    metaDescription: 'Partner with Microhabitat to shape a sustainable future. Join leading organizations in supporting food security, community engagement, and urban agriculture initiatives.',
    keywords: 'partner, collaboration, sustainable partnership, food security',
    canonical: '/partnerships',
  },
  'community-engagement': {
    metaTitle: 'Community Engagement | Microhabitat',
    metaDescription: 'Discover how Microhabitat cultivates community through urban farming. Hands-on workshops, inclusive programming, educational activities, and food bank partnerships.',
    keywords: 'community garden, food bank, social impact, community engagement, inclusive programming',
    canonical: '/community-engagement',
  },
  'contact': {
    metaTitle: 'Contact | Microhabitat',
    metaDescription: 'Contact Microhabitat to start your urban farming journey. Offices in Montreal, Toronto, and New York. Available Monday-Friday, 9am-5pm.',
    keywords: 'contact, book demo, urban farming consultation, Montreal, Toronto, New York',
    canonical: '/contact',
  },
  'faq': {
    metaTitle: 'FAQ | Microhabitat',
    metaDescription: "Find answers to frequently asked questions about Microhabitat's urban farming services. Learn about requirements, process, products, and how to get started.",
    keywords: 'FAQ, urban farming questions, requirements, frequently asked questions',
    canonical: '/faq',
  },
  'blog': {
    metaTitle: 'Blog | Microhabitat',
    metaDescription: "Explore Microhabitat's blog for urban farming tips, sustainability insights, and industry news. Learn about CSR, ESG, green certifications, and more.",
    keywords: 'urban farming blog, sustainability news, green building, CSR, ESG',
    canonical: '/blog',
  },
  'cities': {
    metaTitle: 'Our Cities | Microhabitat',
    metaDescription: "Explore Microhabitat's urban farming network across 20+ cities in North America and Europe. Find urban farms in Montreal, Toronto, New York, Chicago, London, Paris, and more.",
    keywords: 'urban farming locations, cities, North America, Europe, international',
    canonical: '/cities',
  },
  'privacy-policy': {
    metaTitle: 'Privacy Policy | Microhabitat',
    metaDescription: "Microhabitat's privacy policy explains how we collect, use, and protect your personal information.",
    canonical: '/privacy-policy',
    noIndex: true,
  },
  'terms-of-service': {
    metaTitle: 'Terms of Service | Microhabitat',
    metaDescription: "Read Microhabitat's terms of service for using our website and services.",
    canonical: '/terms-of-service',
    noIndex: true,
  },
  'cookie-policy': {
    metaTitle: 'Cookie Policy | Microhabitat',
    metaDescription: "Learn about how Microhabitat uses cookies and similar technologies on our website.",
    canonical: '/cookie-policy',
    noIndex: true,
  },
};

const fallbackPageSEOFr: Record<PageSEOKey, SEOData> = {
  'home': {
    metaTitle: "Découvrez l'agriculture urbaine",
    metaDescription: "Le plus grand réseau d'agriculture urbaine au monde. Transformez les espaces urbains sous-utilisés en fermes urbaines florissantes.",
    keywords: 'agriculture urbaine, ferme urbaine, aménagement vert, engagement locataires',
    canonical: '/fr',
  },
  'about': {
    metaTitle: 'À propos | Microhabitat',
    metaDescription: "Découvrez la mission de Microhabitat pour transformer les espaces urbains en fermes florissantes. Notre histoire, notre impact et l'équipe derrière le plus grand réseau d'agriculture urbaine.",
    keywords: 'entreprise agriculture urbaine, Montréal, alimentation durable, mission agriculture urbaine',
    canonical: '/fr/a-propos',
  },
  'outdoor-farm': {
    metaTitle: 'Ferme extérieure | Microhabitat',
    metaDescription: "Transformez les espaces extérieurs avec les solutions d'agriculture urbaine de Microhabitat. Conception, installation et entretien pour toits, terrasses et espaces extérieurs.",
    keywords: 'agriculture sur toit, jardin terrasse, ferme urbaine extérieure, jardin sur toit',
    canonical: '/fr/ferme-exterieure',
  },
  'indoor-farm': {
    metaTitle: 'Ferme intérieure | Microhabitat',
    metaDescription: "Une expérience ultra-locale de la ferme à la table avec des herbes et laitues fraîchement récoltées sur place. Solutions d'agriculture verticale hydroponique.",
    keywords: 'agriculture intérieure, agriculture verticale, culture hydroponique, culture toute année',
    canonical: '/fr/ferme-interieure',
  },
  'educational-activities': {
    metaTitle: 'Activités éducatives | Microhabitat',
    metaDescription: "Vivez l'agriculture urbaine avec les programmes éducatifs de Microhabitat. Visites de jardins, ateliers interactifs et kits de culture à emporter.",
    keywords: 'activités éducatives, apprentissage durable, team building, ateliers, visites de jardins',
    canonical: '/fr/activites-educatives',
  },
  'commercial-real-estate': {
    metaTitle: 'Immobilier commercial | Microhabitat',
    metaDescription: "Solutions d'agriculture urbaine pour l'immobilier commercial. Augmentez la valeur immobilière, l'engagement des locataires et les certifications vertes.",
    keywords: 'immobilier commercial, certification LEED, BOMA BEST, certification WELL, Fitwel, ESG',
    canonical: '/fr/immobilier-commercial',
  },
  'corporations': {
    metaTitle: 'Entreprises | Microhabitat',
    metaDescription: "Transformez votre entreprise avec l'agriculture urbaine. Zones de culture personnalisées, entretien expert, programmes d'engagement des employés.",
    keywords: 'durabilité entreprise, RSE, engagement employés, bien-être au travail',
    canonical: '/fr/entreprises',
  },
  'schools': {
    metaTitle: 'Écoles | Microhabitat',
    metaDescription: "Pratiques agricoles qui renforcent les leçons STEM, santé et environnement. Une approche pratique de l'enseignement de la durabilité.",
    keywords: 'jardin scolaire, éducation environnementale, apprentissage STEM, éducation durabilité',
    canonical: '/fr/ecoles',
  },
  'careers': {
    metaTitle: 'Carrières | Microhabitat',
    metaDescription: "Rejoignez Microhabitat et développez votre carrière dans l'agriculture urbaine. Opportunités en agriculture durable et engagement communautaire.",
    keywords: 'emplois agriculture urbaine, carrières durabilité, emplois verts, carrières agriculture',
    canonical: '/fr/carrieres',
  },
  'partnerships': {
    metaTitle: 'Partenariats | Microhabitat',
    metaDescription: "Devenez partenaire de Microhabitat pour façonner un avenir durable. Rejoignez les organisations leaders en sécurité alimentaire et agriculture urbaine.",
    keywords: 'partenaire, collaboration, partenariat durable, sécurité alimentaire',
    canonical: '/fr/partenariats',
  },
  'community-engagement': {
    metaTitle: 'Engagement communautaire | Microhabitat',
    metaDescription: "Découvrez comment Microhabitat cultive la communauté par l'agriculture urbaine. Ateliers pratiques, programmation inclusive et partenariats avec banques alimentaires.",
    keywords: 'jardin communautaire, banque alimentaire, impact social, engagement communautaire',
    canonical: '/fr/engagement-communautaire',
  },
  'contact': {
    metaTitle: 'Contact | Microhabitat',
    metaDescription: "Contactez Microhabitat pour démarrer votre projet d'agriculture urbaine. Bureaux à Montréal, Toronto et New York.",
    keywords: 'contact, réserver démo, consultation agriculture urbaine, Montréal, Toronto, New York',
    canonical: '/fr/contact',
  },
  'faq': {
    metaTitle: 'FAQ | Microhabitat',
    metaDescription: "Trouvez les réponses aux questions fréquentes sur les services d'agriculture urbaine de Microhabitat. Exigences, processus, produits et comment commencer.",
    keywords: 'FAQ, questions agriculture urbaine, exigences, questions fréquentes',
    canonical: '/fr/faq',
  },
  'blog': {
    metaTitle: 'Blogue | Microhabitat',
    metaDescription: "Explorez le blogue de Microhabitat pour des conseils d'agriculture urbaine, insights durabilité et actualités. RSE, ESG, certifications vertes et plus.",
    keywords: 'blogue agriculture urbaine, actualités durabilité, bâtiment vert, RSE, ESG',
    canonical: '/fr/blogue',
  },
  'cities': {
    metaTitle: 'Nos villes | Microhabitat',
    metaDescription: "Explorez le réseau d'agriculture urbaine de Microhabitat dans plus de 20 villes en Amérique du Nord et Europe. Montréal, Toronto, New York, Chicago, Londres, Paris.",
    keywords: 'emplacements agriculture urbaine, villes, Amérique du Nord, Europe, international',
    canonical: '/fr/villes',
  },
  'privacy-policy': {
    metaTitle: 'Politique de confidentialité | Microhabitat',
    metaDescription: "La politique de confidentialité de Microhabitat explique comment nous collectons, utilisons et protégeons vos informations personnelles.",
    canonical: '/fr/politique-confidentialite',
    noIndex: true,
  },
  'terms-of-service': {
    metaTitle: "Conditions d'utilisation | Microhabitat",
    metaDescription: "Lisez les conditions d'utilisation de Microhabitat pour l'utilisation de notre site web et services.",
    canonical: '/fr/conditions-utilisation',
    noIndex: true,
  },
  'cookie-policy': {
    metaTitle: 'Politique des cookies | Microhabitat',
    metaDescription: "Découvrez comment Microhabitat utilise les cookies et technologies similaires sur notre site web.",
    canonical: '/fr/politique-cookies',
    noIndex: true,
  },
};

const fallbackPageSEODe: Record<PageSEOKey, SEOData> = {
  'home': {
    metaTitle: 'Entdecken Sie Urban Farming',
    metaDescription: 'Das weltweit größte Urban-Farming-Netzwerk. Verwandeln Sie ungenutzte städtische Flächen in blühende urbane Farmen.',
    keywords: 'Urban Farming, Stadtlandwirtschaft, schlüsselfertige Stadtfarmen, Immobilienausstattung',
    canonical: '/de',
  },
  'about': {
    metaTitle: 'Über uns | Microhabitat',
    metaDescription: 'Erfahren Sie mehr über Microhabitats Mission, städtische Räume in blühende Farmen zu verwandeln. Unsere Geschichte, Wirkung und das Team.',
    keywords: 'Urban-Farming-Unternehmen, Montreal, nachhaltige Ernährung, Urban-Farming-Mission',
    canonical: '/de/ueber-uns',
  },
  'outdoor-farm': {
    metaTitle: 'Outdoor-Farm | Microhabitat',
    metaDescription: 'Verwandeln Sie Außenbereiche mit Microhabitats Urban-Farming-Lösungen. Expertendesign, Installation und Wartung für Dächer und Terrassen.',
    keywords: 'Dachfarming, Terrassengarten, Outdoor-Stadtfarm, Dachgarten',
    canonical: '/de/outdoor-farm',
  },
  'indoor-farm': {
    metaTitle: 'Indoor-Farm | Microhabitat',
    metaDescription: 'Ein ultra-lokales Farm-to-Table-Erlebnis mit frisch geernteten Kräutern und Salaten vor Ort. Vertikale hydroponische Farmlösungen.',
    keywords: 'Indoor-Farming, vertikale Landwirtschaft, Hydroponik, ganzjähriger Anbau',
    canonical: '/de/indoor-farm',
  },
  'educational-activities': {
    metaTitle: 'Bildungsaktivitäten | Microhabitat',
    metaDescription: 'Erleben Sie Urban Farming mit Microhabitats Bildungsprogrammen. Gartenbesuche, interaktive Workshops und Anbau-Kits zum Mitnehmen.',
    keywords: 'Bildungsaktivitäten, nachhaltiges Lernen, Teambuilding, Workshops, Gartenbesuche',
    canonical: '/de/bildungsaktivitaeten',
  },
  'commercial-real-estate': {
    metaTitle: 'Gewerbeimmobilien | Microhabitat',
    metaDescription: 'Urban-Farming-Lösungen für Gewerbeimmobilien. Steigern Sie Immobilienwert, Mieterbindung und grüne Gebäudezertifizierungen.',
    keywords: 'Gewerbeimmobilien, LEED-Zertifizierung, BOMA BEST, WELL-Zertifizierung, ESG',
    canonical: '/de/gewerbeimmobilien',
  },
  'corporations': {
    metaTitle: 'Unternehmen | Microhabitat',
    metaDescription: 'Transformieren Sie Ihr Unternehmen mit urbaner Landwirtschaft. Maßgeschneiderte Anbauflächen, professionelle Wartung, Mitarbeiterengagement.',
    keywords: 'Unternehmensnachhaltigkeit, CSR, Mitarbeiterengagement, Arbeitsplatzwellness',
    canonical: '/de/unternehmen',
  },
  'schools': {
    metaTitle: 'Schulen | Microhabitat',
    metaDescription: 'Landwirtschaftliche Praktiken, die MINT-, Gesundheits- und Umweltunterricht verstärken. Ein praktischer Ansatz für Nachhaltigkeitserziehung.',
    keywords: 'Schulgarten, Umweltbildung, MINT-Lernen, Nachhaltigkeitserziehung',
    canonical: '/de/schulen',
  },
  'careers': {
    metaTitle: 'Karriere | Microhabitat',
    metaDescription: 'Werden Sie Teil von Microhabitat und entwickeln Sie Ihre Karriere in der urbanen Landwirtschaft. Möglichkeiten in nachhaltiger Landwirtschaft.',
    keywords: 'Urban-Farming-Jobs, Nachhaltigkeitskarrieren, grüne Jobs, Landwirtschaftskarrieren',
    canonical: '/de/karriere',
  },
  'partnerships': {
    metaTitle: 'Partnerschaften | Microhabitat',
    metaDescription: 'Werden Sie Partner von Microhabitat für eine nachhaltige Zukunft. Schließen Sie sich führenden Organisationen für Ernährungssicherheit an.',
    keywords: 'Partner, Zusammenarbeit, nachhaltige Partnerschaft, Ernährungssicherheit',
    canonical: '/de/partnerschaften',
  },
  'community-engagement': {
    metaTitle: 'Gemeinschaftliches Engagement | Microhabitat',
    metaDescription: 'Entdecken Sie, wie Microhabitat Gemeinschaft durch Urban Farming kultiviert. Praktische Workshops, inklusive Programmierung, Tafelpartnerschaften.',
    keywords: 'Gemeinschaftsgarten, Tafel, soziale Wirkung, gemeinschaftliches Engagement',
    canonical: '/de/gemeinschaftliches-engagement',
  },
  'contact': {
    metaTitle: 'Kontakt | Microhabitat',
    metaDescription: 'Kontaktieren Sie Microhabitat für Ihre Urban-Farming-Reise. Büros in Montreal, Toronto und New York.',
    keywords: 'Kontakt, Demo buchen, Urban-Farming-Beratung, Montreal, Toronto, New York',
    canonical: '/de/kontakt',
  },
  'faq': {
    metaTitle: 'FAQ | Microhabitat',
    metaDescription: 'Finden Sie Antworten auf häufig gestellte Fragen zu Microhabitats Urban-Farming-Services. Anforderungen, Prozess, Produkte.',
    keywords: 'FAQ, Urban-Farming-Fragen, Anforderungen, häufig gestellte Fragen',
    canonical: '/de/faq',
  },
  'blog': {
    metaTitle: 'Blog | Microhabitat',
    metaDescription: 'Entdecken Sie Microhabitats Blog für Urban-Farming-Tipps, Nachhaltigkeitseinblicke und Branchennews. CSR, ESG, grüne Zertifizierungen.',
    keywords: 'Urban-Farming-Blog, Nachhaltigkeitsnews, grünes Bauen, CSR, ESG',
    canonical: '/de/blog',
  },
  'cities': {
    metaTitle: 'Unsere Städte | Microhabitat',
    metaDescription: 'Entdecken Sie Microhabitats Urban-Farming-Netzwerk in über 20 Städten in Nordamerika und Europa. Montreal, Toronto, New York, London, Paris.',
    keywords: 'Urban-Farming-Standorte, Städte, Nordamerika, Europa, international',
    canonical: '/de/staedte',
  },
  'privacy-policy': {
    metaTitle: 'Datenschutzerklärung | Microhabitat',
    metaDescription: 'Microhabitats Datenschutzerklärung erklärt, wie wir Ihre persönlichen Daten erheben, verwenden und schützen.',
    canonical: '/de/datenschutz',
    noIndex: true,
  },
  'terms-of-service': {
    metaTitle: 'Nutzungsbedingungen | Microhabitat',
    metaDescription: 'Lesen Sie Microhabitats Nutzungsbedingungen für die Nutzung unserer Website und Dienste.',
    canonical: '/de/nutzungsbedingungen',
    noIndex: true,
  },
  'cookie-policy': {
    metaTitle: 'Cookie-Richtlinie | Microhabitat',
    metaDescription: 'Erfahren Sie, wie Microhabitat Cookies und ähnliche Technologien auf unserer Website verwendet.',
    canonical: '/de/cookie-richtlinie',
    noIndex: true,
  },
};

const fallbackPageSEONl: Record<PageSEOKey, SEOData> = {
  'home': {
    metaTitle: 'Ontdek Stadslandbouw',
    metaDescription: "Het grootste stadslandbouwnetwerk ter wereld. Transformeer onderbenutte stedelijke ruimtes in bloeiende stadsboerderijen.",
    keywords: 'stadslandbouw, stedelijke landbouw, kant-en-klare stadsboerderijen, vastgoedvoorzieningen',
    canonical: '/nl',
  },
  'about': {
    metaTitle: 'Over ons | Microhabitat',
    metaDescription: 'Leer over Microhabitats missie om stedelijke ruimtes te transformeren in bloeiende boerderijen. Ons verhaal, impact en team.',
    keywords: 'stadslandbouwbedrijf, Montreal, duurzaam voedsel, stadslandbouwmissie',
    canonical: '/nl/over-ons',
  },
  'outdoor-farm': {
    metaTitle: 'Outdoor-boerderij | Microhabitat',
    metaDescription: 'Transformeer buitenruimtes met Microhabitats stadslandbouwoplossingen. Expertontwerp, installatie en onderhoud voor daken en terrassen.',
    keywords: 'dakboerderij, terrastuin, outdoor stadsboerderij, daktuin',
    canonical: '/nl/outdoor-boerderij',
  },
  'indoor-farm': {
    metaTitle: 'Indoor-boerderij | Microhabitat',
    metaDescription: 'Een ultra-lokale farm-to-table ervaring met vers geoogste kruiden en sla ter plaatse. Verticale hydroponische boerderijoplossingen.',
    keywords: 'indoor farming, verticale landbouw, hydrocultuur, jaarrond telen',
    canonical: '/nl/indoor-boerderij',
  },
  'educational-activities': {
    metaTitle: 'Educatieve activiteiten | Microhabitat',
    metaDescription: "Ervaar stadslandbouw met Microhabitats educatieve programma's. Tuinbezoeken, interactieve workshops en kweeksets om mee te nemen.",
    keywords: 'educatieve activiteiten, duurzaam leren, teambuilding, workshops, tuinbezoeken',
    canonical: '/nl/educatieve-activiteiten',
  },
  'commercial-real-estate': {
    metaTitle: 'Commercieel vastgoed | Microhabitat',
    metaDescription: 'Stadslandbouwoplossingen voor commercieel vastgoed. Verhoog vastgoedwaarde, huurdersbetrokkenheid en groene gebouwcertificeringen.',
    keywords: 'commercieel vastgoed, LEED-certificering, BOMA BEST, WELL-certificering, ESG',
    canonical: '/nl/commercieel-vastgoed',
  },
  'corporations': {
    metaTitle: 'Bedrijven | Microhabitat',
    metaDescription: 'Transformeer uw bedrijf met stedelijke landbouw. Aangepaste kweekzones, professioneel onderhoud, medewerkersbetrokkenheid.',
    keywords: 'bedrijfsduurzaamheid, MVO, medewerkersbetrokkenheid, werkplekwelzijn',
    canonical: '/nl/bedrijven',
  },
  'schools': {
    metaTitle: 'Scholen | Microhabitat',
    metaDescription: 'Landbouwpraktijken die STEM-, gezondheids- en milieulessen versterken. Een praktische benadering van duurzaamheidseducatie.',
    keywords: 'schooltuin, milieu-educatie, STEM-leren, duurzaamheidseducatie',
    canonical: '/nl/scholen',
  },
  'careers': {
    metaTitle: 'Carrière | Microhabitat',
    metaDescription: 'Word lid van Microhabitat en ontwikkel je carrière in stadslandbouw. Mogelijkheden in duurzame landbouw en gemeenschapsbetrokkenheid.',
    keywords: 'stadslandbouwbanen, duurzaamheidscarrières, groene banen, landbouwcarrières',
    canonical: '/nl/carriere',
  },
  'partnerships': {
    metaTitle: 'Partnerschappen | Microhabitat',
    metaDescription: 'Word partner van Microhabitat voor een duurzame toekomst. Sluit u aan bij toonaangevende organisaties voor voedselzekerheid.',
    keywords: 'partner, samenwerking, duurzaam partnerschap, voedselzekerheid',
    canonical: '/nl/partnerschappen',
  },
  'community-engagement': {
    metaTitle: 'Community-betrokkenheid | Microhabitat',
    metaDescription: 'Ontdek hoe Microhabitat gemeenschap cultiveert door stadslandbouw. Praktische workshops, inclusieve programmering, voedselbankpartnerschappen.',
    keywords: 'gemeenschapstuin, voedselbank, sociale impact, gemeenschapsbetrokkenheid',
    canonical: '/nl/community-betrokkenheid',
  },
  'contact': {
    metaTitle: 'Contact | Microhabitat',
    metaDescription: 'Neem contact op met Microhabitat voor uw stadslandbouwreis. Kantoren in Montreal, Toronto en New York.',
    keywords: 'contact, demo boeken, stadslandbouwconsultatie, Montreal, Toronto, New York',
    canonical: '/nl/contact',
  },
  'faq': {
    metaTitle: 'FAQ | Microhabitat',
    metaDescription: 'Vind antwoorden op veelgestelde vragen over Microhabitats stadslandbouwdiensten. Vereisten, proces, producten.',
    keywords: 'FAQ, stadslandbouwvragen, vereisten, veelgestelde vragen',
    canonical: '/nl/faq',
  },
  'blog': {
    metaTitle: 'Blog | Microhabitat',
    metaDescription: 'Ontdek Microhabitats blog voor stadslandbouwtips, duurzaamheidsinzichten en branchenieuws. MVO, ESG, groene certificeringen.',
    keywords: 'stadslandbouwblog, duurzaamheidsnieuws, groen bouwen, MVO, ESG',
    canonical: '/nl/blog',
  },
  'cities': {
    metaTitle: 'Onze steden | Microhabitat',
    metaDescription: 'Ontdek Microhabitats stadslandbouwnetwerk in meer dan 20 steden in Noord-Amerika en Europa. Montreal, Toronto, New York, Londen, Parijs.',
    keywords: 'stadslandbouwlocaties, steden, Noord-Amerika, Europa, internationaal',
    canonical: '/nl/steden',
  },
  'privacy-policy': {
    metaTitle: 'Privacybeleid | Microhabitat',
    metaDescription: 'Microhabitats privacybeleid legt uit hoe we uw persoonlijke gegevens verzamelen, gebruiken en beschermen.',
    canonical: '/nl/privacybeleid',
    noIndex: true,
  },
  'terms-of-service': {
    metaTitle: 'Algemene voorwaarden | Microhabitat',
    metaDescription: 'Lees Microhabitats algemene voorwaarden voor het gebruik van onze website en diensten.',
    canonical: '/nl/algemene-voorwaarden',
    noIndex: true,
  },
  'cookie-policy': {
    metaTitle: 'Cookiebeleid | Microhabitat',
    metaDescription: 'Leer hoe Microhabitat cookies en soortgelijke technologieën op onze website gebruikt.',
    canonical: '/nl/cookiebeleid',
    noIndex: true,
  },
};

const fallbackPageSEOIt: Record<PageSEOKey, SEOData> = {
  'home': {
    metaTitle: "Scopri l'Agricoltura Urbana",
    metaDescription: "La più grande rete di agricoltura urbana al mondo. Trasforma spazi urbani sottoutilizzati in fattorie urbane fiorenti.",
    keywords: 'agricoltura urbana, fattoria urbana, soluzioni chiavi in mano, servizi immobiliari',
    canonical: '/it',
  },
  'about': {
    metaTitle: 'Chi siamo | Microhabitat',
    metaDescription: "Scopri la missione di Microhabitat per trasformare gli spazi urbani in fattorie fiorenti. La nostra storia, impatto e team.",
    keywords: 'azienda agricoltura urbana, Montreal, cibo sostenibile, missione agricoltura urbana',
    canonical: '/it/chi-siamo',
  },
  'outdoor-farm': {
    metaTitle: 'Fattoria esterna | Microhabitat',
    metaDescription: "Trasforma gli spazi esterni con le soluzioni di agricoltura urbana di Microhabitat. Design esperto, installazione e manutenzione per tetti e terrazze.",
    keywords: 'agricoltura su tetto, giardino terrazza, fattoria urbana esterna, giardino su tetto',
    canonical: '/it/fattoria-esterna',
  },
  'indoor-farm': {
    metaTitle: 'Fattoria interna | Microhabitat',
    metaDescription: "Un'esperienza ultra-locale dalla fattoria alla tavola con erbe e lattughe appena raccolte in loco. Soluzioni di agricoltura verticale idroponica.",
    keywords: 'agricoltura indoor, agricoltura verticale, coltivazione idroponica, coltivazione tutto anno',
    canonical: '/it/fattoria-interna',
  },
  'educational-activities': {
    metaTitle: 'Attività educative | Microhabitat',
    metaDescription: "Vivi l'agricoltura urbana con i programmi educativi di Microhabitat. Visite ai giardini, workshop interattivi e kit di coltivazione da portare a casa.",
    keywords: 'attività educative, apprendimento sostenibile, team building, workshop, visite ai giardini',
    canonical: '/it/attivita-educative',
  },
  'commercial-real-estate': {
    metaTitle: 'Immobiliare commerciale | Microhabitat',
    metaDescription: "Soluzioni di agricoltura urbana per l'immobiliare commerciale. Aumenta il valore immobiliare, coinvolgimento inquilini e certificazioni verdi.",
    keywords: 'immobiliare commerciale, certificazione LEED, BOMA BEST, certificazione WELL, ESG',
    canonical: '/it/immobiliare-commerciale',
  },
  'corporations': {
    metaTitle: 'Aziende | Microhabitat',
    metaDescription: "Trasforma la tua azienda con l'agricoltura urbana. Zone di coltivazione personalizzate, manutenzione esperta, programmi di coinvolgimento dipendenti.",
    keywords: 'sostenibilità aziendale, CSR, coinvolgimento dipendenti, benessere sul lavoro',
    canonical: '/it/aziende',
  },
  'schools': {
    metaTitle: 'Scuole | Microhabitat',
    metaDescription: "Pratiche agricole che rafforzano lezioni STEM, salute e ambiente. Un approccio pratico all'insegnamento della sostenibilità.",
    keywords: 'orto scolastico, educazione ambientale, apprendimento STEM, educazione sostenibilità',
    canonical: '/it/scuole',
  },
  'careers': {
    metaTitle: 'Carriere | Microhabitat',
    metaDescription: "Unisciti a Microhabitat e sviluppa la tua carriera nell'agricoltura urbana. Opportunità in agricoltura sostenibile e coinvolgimento comunitario.",
    keywords: 'lavori agricoltura urbana, carriere sostenibilità, lavori verdi, carriere agricoltura',
    canonical: '/it/carriere',
  },
  'partnerships': {
    metaTitle: 'Partnership | Microhabitat',
    metaDescription: 'Diventa partner di Microhabitat per un futuro sostenibile. Unisciti alle organizzazioni leader per la sicurezza alimentare.',
    keywords: 'partner, collaborazione, partnership sostenibile, sicurezza alimentare',
    canonical: '/it/partnership',
  },
  'community-engagement': {
    metaTitle: 'Impegno comunitario | Microhabitat',
    metaDescription: "Scopri come Microhabitat coltiva la comunità attraverso l'agricoltura urbana. Workshop pratici, programmazione inclusiva, partnership con banchi alimentari.",
    keywords: 'orto comunitario, banco alimentare, impatto sociale, impegno comunitario',
    canonical: '/it/impegno-comunitario',
  },
  'contact': {
    metaTitle: 'Contatto | Microhabitat',
    metaDescription: 'Contatta Microhabitat per il tuo progetto di agricoltura urbana. Uffici a Montreal, Toronto e New York.',
    keywords: 'contatto, prenota demo, consulenza agricoltura urbana, Montreal, Toronto, New York',
    canonical: '/it/contatto',
  },
  'faq': {
    metaTitle: 'FAQ | Microhabitat',
    metaDescription: 'Trova risposte alle domande frequenti sui servizi di agricoltura urbana di Microhabitat. Requisiti, processo, prodotti.',
    keywords: 'FAQ, domande agricoltura urbana, requisiti, domande frequenti',
    canonical: '/it/faq',
  },
  'blog': {
    metaTitle: 'Blog | Microhabitat',
    metaDescription: "Esplora il blog di Microhabitat per consigli sull'agricoltura urbana, approfondimenti sulla sostenibilità e notizie del settore. CSR, ESG, certificazioni verdi.",
    keywords: 'blog agricoltura urbana, notizie sostenibilità, edilizia verde, CSR, ESG',
    canonical: '/it/blog',
  },
  'cities': {
    metaTitle: 'Le nostre città | Microhabitat',
    metaDescription: "Esplora la rete di agricoltura urbana di Microhabitat in oltre 20 città in Nord America ed Europa. Montreal, Toronto, New York, Londra, Parigi.",
    keywords: 'sedi agricoltura urbana, città, Nord America, Europa, internazionale',
    canonical: '/it/citta',
  },
  'privacy-policy': {
    metaTitle: 'Informativa sulla privacy | Microhabitat',
    metaDescription: "L'informativa sulla privacy di Microhabitat spiega come raccogliamo, utilizziamo e proteggiamo le tue informazioni personali.",
    canonical: '/it/informativa-privacy',
    noIndex: true,
  },
  'terms-of-service': {
    metaTitle: 'Termini di servizio | Microhabitat',
    metaDescription: "Leggi i termini di servizio di Microhabitat per l'utilizzo del nostro sito web e servizi.",
    canonical: '/it/termini-servizio',
    noIndex: true,
  },
  'cookie-policy': {
    metaTitle: 'Politica sui cookie | Microhabitat',
    metaDescription: 'Scopri come Microhabitat utilizza i cookie e tecnologie simili sul nostro sito web.',
    canonical: '/it/politica-cookie',
    noIndex: true,
  },
};

const fallbackPageSEOEs: Record<PageSEOKey, SEOData> = {
  'home': {
    metaTitle: 'Descubre la Agricultura Urbana',
    metaDescription: 'La red de agricultura urbana más grande del mundo. Transforma espacios urbanos subutilizados en granjas urbanas prósperas.',
    keywords: 'agricultura urbana, granja urbana, soluciones llave en mano, servicios inmobiliarios',
    canonical: '/es',
  },
  'about': {
    metaTitle: 'Sobre nosotros | Microhabitat',
    metaDescription: 'Conoce la misión de Microhabitat para transformar espacios urbanos en granjas prósperas. Nuestra historia, impacto y equipo.',
    keywords: 'empresa agricultura urbana, Montreal, comida sostenible, misión agricultura urbana',
    canonical: '/es/sobre-nosotros',
  },
  'outdoor-farm': {
    metaTitle: 'Granja exterior | Microhabitat',
    metaDescription: 'Transforma espacios exteriores con las soluciones de agricultura urbana de Microhabitat. Diseño experto, instalación y mantenimiento para techos y terrazas.',
    keywords: 'agricultura en azotea, jardín terraza, granja urbana exterior, jardín en azotea',
    canonical: '/es/granja-exterior',
  },
  'indoor-farm': {
    metaTitle: 'Granja interior | Microhabitat',
    metaDescription: 'Una experiencia ultra-local de la granja a la mesa con hierbas y lechugas recién cosechadas in situ. Soluciones de agricultura vertical hidropónica.',
    keywords: 'agricultura interior, agricultura vertical, cultivo hidropónico, cultivo todo el año',
    canonical: '/es/granja-interior',
  },
  'educational-activities': {
    metaTitle: 'Actividades educativas | Microhabitat',
    metaDescription: 'Vive la agricultura urbana con los programas educativos de Microhabitat. Visitas a jardines, talleres interactivos y kits de cultivo para llevar.',
    keywords: 'actividades educativas, aprendizaje sostenible, team building, talleres, visitas a jardines',
    canonical: '/es/actividades-educativas',
  },
  'commercial-real-estate': {
    metaTitle: 'Inmobiliaria comercial | Microhabitat',
    metaDescription: 'Soluciones de agricultura urbana para inmobiliaria comercial. Aumenta el valor inmobiliario, compromiso de inquilinos y certificaciones verdes.',
    keywords: 'inmobiliaria comercial, certificación LEED, BOMA BEST, certificación WELL, ESG',
    canonical: '/es/inmobiliaria-comercial',
  },
  'corporations': {
    metaTitle: 'Empresas | Microhabitat',
    metaDescription: 'Transforma tu empresa con agricultura urbana. Zonas de cultivo personalizadas, mantenimiento experto, programas de compromiso de empleados.',
    keywords: 'sostenibilidad empresarial, RSC, compromiso empleados, bienestar laboral',
    canonical: '/es/empresas',
  },
  'schools': {
    metaTitle: 'Escuelas | Microhabitat',
    metaDescription: 'Prácticas agrícolas que refuerzan lecciones STEM, salud y medio ambiente. Un enfoque práctico para enseñar sostenibilidad.',
    keywords: 'huerto escolar, educación ambiental, aprendizaje STEM, educación sostenibilidad',
    canonical: '/es/escuelas',
  },
  'careers': {
    metaTitle: 'Carreras | Microhabitat',
    metaDescription: 'Únete a Microhabitat y desarrolla tu carrera en agricultura urbana. Oportunidades en agricultura sostenible y compromiso comunitario.',
    keywords: 'empleos agricultura urbana, carreras sostenibilidad, empleos verdes, carreras agricultura',
    canonical: '/es/carreras',
  },
  'partnerships': {
    metaTitle: 'Colaboraciones | Microhabitat',
    metaDescription: 'Conviértete en socio de Microhabitat para un futuro sostenible. Únete a organizaciones líderes en seguridad alimentaria.',
    keywords: 'socio, colaboración, asociación sostenible, seguridad alimentaria',
    canonical: '/es/colaboraciones',
  },
  'community-engagement': {
    metaTitle: 'Participación comunitaria | Microhabitat',
    metaDescription: 'Descubre cómo Microhabitat cultiva comunidad a través de la agricultura urbana. Talleres prácticos, programación inclusiva, alianzas con bancos de alimentos.',
    keywords: 'huerto comunitario, banco de alimentos, impacto social, participación comunitaria',
    canonical: '/es/participacion-comunitaria',
  },
  'contact': {
    metaTitle: 'Contacto | Microhabitat',
    metaDescription: 'Contacta a Microhabitat para tu proyecto de agricultura urbana. Oficinas en Montreal, Toronto y Nueva York.',
    keywords: 'contacto, reservar demo, consulta agricultura urbana, Montreal, Toronto, Nueva York',
    canonical: '/es/contacto',
  },
  'faq': {
    metaTitle: 'FAQ | Microhabitat',
    metaDescription: 'Encuentra respuestas a preguntas frecuentes sobre los servicios de agricultura urbana de Microhabitat. Requisitos, proceso, productos.',
    keywords: 'FAQ, preguntas agricultura urbana, requisitos, preguntas frecuentes',
    canonical: '/es/faq',
  },
  'blog': {
    metaTitle: 'Blog | Microhabitat',
    metaDescription: 'Explora el blog de Microhabitat para consejos de agricultura urbana, perspectivas de sostenibilidad y noticias del sector. RSC, ESG, certificaciones verdes.',
    keywords: 'blog agricultura urbana, noticias sostenibilidad, construcción verde, RSC, ESG',
    canonical: '/es/blog',
  },
  'cities': {
    metaTitle: 'Nuestras ciudades | Microhabitat',
    metaDescription: 'Explora la red de agricultura urbana de Microhabitat en más de 20 ciudades en Norteamérica y Europa. Montreal, Toronto, Nueva York, Londres, París.',
    keywords: 'ubicaciones agricultura urbana, ciudades, Norteamérica, Europa, internacional',
    canonical: '/es/ciudades',
  },
  'privacy-policy': {
    metaTitle: 'Política de privacidad | Microhabitat',
    metaDescription: 'La política de privacidad de Microhabitat explica cómo recopilamos, usamos y protegemos tu información personal.',
    canonical: '/es/politica-privacidad',
    noIndex: true,
  },
  'terms-of-service': {
    metaTitle: 'Términos de servicio | Microhabitat',
    metaDescription: 'Lee los términos de servicio de Microhabitat para el uso de nuestro sitio web y servicios.',
    canonical: '/es/terminos-servicio',
    noIndex: true,
  },
  'cookie-policy': {
    metaTitle: 'Política de cookies | Microhabitat',
    metaDescription: 'Aprende cómo Microhabitat usa cookies y tecnologías similares en nuestro sitio web.',
    canonical: '/es/politica-cookies',
    noIndex: true,
  },
};

const fallbackPageSEO: Record<Locale, Record<PageSEOKey, SEOData>> = {
  en: fallbackPageSEOEn,
  fr: fallbackPageSEOFr,
  de: fallbackPageSEODe,
  nl: fallbackPageSEONl,
  it: fallbackPageSEOIt,
  es: fallbackPageSEOEs,
};

// API Functions with locale support
export async function getHeroContent(locale?: Locale): Promise<HeroContent> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await fetchFromStrapi<any>(
    "hero?populate=image",
    { en: fallbackHeroEn, fr: fallbackHeroFr, de: fallbackHeroDe, nl: fallbackHeroNl, it: fallbackHeroIt, es: fallbackHeroEs },
    locale
  );

  // Transform Strapi media to URL
  if (data.image && typeof data.image === 'object' && 'url' in data.image) {
    return {
      ...data,
      image: getImageUrl(data.image as StrapiMedia, 'large'),
    };
  }
  return data as HeroContent;
}

export async function getStats(locale?: Locale): Promise<Stat[]> {
  return fetchFromStrapi("stats?populate=*&sort=order:asc", { en: fallbackStatsEn, fr: fallbackStatsFr, de: fallbackStatsDe, nl: fallbackStatsNl, it: fallbackStatsIt, es: fallbackStatsEs }, locale);
}

export async function getServices(locale?: Locale): Promise<Service[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await fetchFromStrapi<any[]>(
    "services?populate=image&sort=order:asc",
    { en: fallbackServicesEn, fr: fallbackServicesFr, de: fallbackServicesDe, nl: fallbackServicesNl, it: fallbackServicesIt, es: fallbackServicesEs },
    locale
  );

  // Transform Strapi media to URLs
  return data.map((service) => ({
    ...service,
    image: service.image && typeof service.image === 'object' && 'url' in service.image
      ? getImageUrl(service.image as StrapiMedia, 'large')
      : service.image,
  })) as Service[];
}

export async function getTestimonials(locale?: Locale): Promise<Testimonial[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await fetchFromStrapi<any[]>(
    "testimonials?populate[image][fields][0]=url&populate[image][fields][1]=formats&populate[companyLogo][fields][0]=url&populate[companyLogo][fields][1]=formats&sort=order:asc",
    { en: fallbackTestimonialsEn, fr: fallbackTestimonialsFr, de: fallbackTestimonialsDe, nl: fallbackTestimonialsNl, it: fallbackTestimonialsIt, es: fallbackTestimonialsEs },
    locale
  );

  // Transform Strapi media to URLs
  return data.map((testimonial) => ({
    ...testimonial,
    image: testimonial.image && typeof testimonial.image === 'object' && 'url' in testimonial.image
      ? getImageUrl(testimonial.image as StrapiMedia, 'large')
      : testimonial.image,
    companyLogo: testimonial.companyLogo && typeof testimonial.companyLogo === 'object' && 'url' in testimonial.companyLogo
      ? getImageUrl(testimonial.companyLogo as StrapiMedia, 'medium')
      : testimonial.companyLogo,
  })) as Testimonial[];
}

export async function getPartners(locale?: Locale): Promise<Partner[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await fetchFromStrapi<any[]>(
    "partners?populate=logo&sort=order:asc",
    { en: fallbackPartners, fr: fallbackPartners, de: fallbackPartners, nl: fallbackPartners, it: fallbackPartners, es: fallbackPartners },
    locale
  );

  // Transform Strapi media to URLs
  return data.map((partner) => ({
    ...partner,
    logo: partner.logo && typeof partner.logo === 'object' && 'url' in partner.logo
      ? getImageUrl(partner.logo as StrapiMedia, 'medium')
      : partner.logo,
  })) as Partner[];
}

export async function getCities(locale?: Locale): Promise<City[]> {
  return fetchFromStrapi("cities?populate=*", { en: fallbackCitiesEn, fr: fallbackCitiesFr, de: fallbackCitiesDe, nl: fallbackCitiesNl, it: fallbackCitiesIt, es: fallbackCitiesEs }, locale);
}

export async function getNavLinks(locale?: Locale): Promise<NavLink[]> {
  return fetchFromStrapi("nav-links?populate=*&sort=order:asc", { en: fallbackNavLinksEn, fr: fallbackNavLinksFr, de: fallbackNavLinksDe, nl: fallbackNavLinksNl, it: fallbackNavLinksIt, es: fallbackNavLinksEs }, locale);
}

export async function getFooterSections(locale?: Locale): Promise<FooterSection[]> {
  return fetchFromStrapi("footer-sections?populate=*&sort=order:asc", { en: fallbackFooterSectionsEn, fr: fallbackFooterSectionsFr, de: fallbackFooterSectionsDe, nl: fallbackFooterSectionsNl, it: fallbackFooterSectionsIt, es: fallbackFooterSectionsEs }, locale);
}

export async function getFAQ(locale?: Locale): Promise<FAQItem[]> {
  return fetchFromStrapi("faqs?populate=*&sort=order:asc", { en: fallbackFAQEn, fr: fallbackFAQFr, de: fallbackFAQEn, nl: fallbackFAQEn, it: fallbackFAQEn, es: fallbackFAQEn }, locale);
}

// Section content fetchers
export async function getImpactSection(locale?: Locale): Promise<ImpactSectionContent> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await fetchFromStrapi<any>(
    "impact-section?populate=images",
    { en: fallbackImpactSectionEn, fr: fallbackImpactSectionFr, de: fallbackImpactSectionDe, nl: fallbackImpactSectionNl, it: fallbackImpactSectionIt, es: fallbackImpactSectionEs },
    locale
  );

  // Transform Strapi media to URLs
  if (data.images && Array.isArray(data.images) && data.images.length > 0 && typeof data.images[0] === 'object') {
    return {
      ...data,
      images: data.images.map((img: StrapiMedia) => getImageUrl(img, 'large')).filter((url: string | undefined): url is string => !!url),
    };
  }
  return data as ImpactSectionContent;
}

export async function getServicesSection(locale?: Locale): Promise<ServicesSectionContent> {
  return fetchFromStrapi("services-section?populate=*", { en: fallbackServicesSectionEn, fr: fallbackServicesSectionFr, de: fallbackServicesSectionDe, nl: fallbackServicesSectionNl, it: fallbackServicesSectionIt, es: fallbackServicesSectionEs }, locale);
}

export async function getPartnersSection(locale?: Locale): Promise<PartnersSectionContent> {
  return fetchFromStrapi("partners-section?populate=*", { en: fallbackPartnersSectionEn, fr: fallbackPartnersSectionFr, de: fallbackPartnersSectionDe, nl: fallbackPartnersSectionNl, it: fallbackPartnersSectionIt, es: fallbackPartnersSectionEs }, locale);
}

export async function getTestimonialsSection(locale?: Locale): Promise<TestimonialsSectionContent> {
  return fetchFromStrapi("testimonials-section?populate=*", { en: fallbackTestimonialsSectionEn, fr: fallbackTestimonialsSectionFr, de: fallbackTestimonialsSectionDe, nl: fallbackTestimonialsSectionNl, it: fallbackTestimonialsSectionIt, es: fallbackTestimonialsSectionEs }, locale);
}

export async function getCitiesSection(locale?: Locale): Promise<CitiesSectionContent> {
  return fetchFromStrapi("cities-section?populate=*", { en: fallbackCitiesSectionEn, fr: fallbackCitiesSectionFr, de: fallbackCitiesSectionDe, nl: fallbackCitiesSectionNl, it: fallbackCitiesSectionIt, es: fallbackCitiesSectionEs }, locale);
}

export async function getFAQSection(locale?: Locale): Promise<FAQSectionContent> {
  return fetchFromStrapi("faq-section?populate=*", { en: fallbackFAQSectionEn, fr: fallbackFAQSectionFr, de: fallbackFAQSectionDe, nl: fallbackFAQSectionNl, it: fallbackFAQSectionIt, es: fallbackFAQSectionEs }, locale);
}

export async function getCTASection(locale?: Locale): Promise<CTASectionContent> {
  return fetchFromStrapi("cta-section?populate=*", { en: fallbackCTASectionEn, fr: fallbackCTASectionFr, de: fallbackCTASectionDe, nl: fallbackCTASectionNl, it: fallbackCTASectionIt, es: fallbackCTASectionEs }, locale);
}

// SEO fetching functions
export async function getPageSEO(pageKey: PageSEOKey, locale?: Locale): Promise<SEOData> {
  const currentLocale = locale || getCurrentLocale();
  const fallback = fallbackPageSEO[currentLocale]?.[pageKey] || fallbackPageSEO.en[pageKey];

  // Map page key to Strapi endpoint
  // Home page SEO comes from hero, other pages from their dedicated page types
  const endpointMap: Record<PageSEOKey, string> = {
    'home': 'hero?populate=seo.ogImage,seo.twitterImage',
    'about': 'about-page?populate=seo.ogImage,seo.twitterImage',
    'outdoor-farm': 'outdoor-farm-page?populate=seo.ogImage,seo.twitterImage',
    'indoor-farm': 'indoor-farm-page?populate=seo.ogImage,seo.twitterImage',
    'educational-activities': 'educational-activities-page?populate=seo.ogImage,seo.twitterImage',
    'commercial-real-estate': 'commercial-real-estate-page?populate=seo.ogImage,seo.twitterImage',
    'corporations': 'corporations-page?populate=seo.ogImage,seo.twitterImage',
    'schools': 'schools-page?populate=seo.ogImage,seo.twitterImage',
    'careers': 'careers-page?populate=seo.ogImage,seo.twitterImage',
    'partnerships': 'partnerships-page?populate=seo.ogImage,seo.twitterImage',
    'community-engagement': 'community-engagement-page?populate=seo.ogImage,seo.twitterImage',
    'contact': 'contact-page?populate=seo.ogImage,seo.twitterImage',
    'faq': 'faq-page?populate=seo.ogImage,seo.twitterImage',
    'blog': 'blog-page?populate=seo.ogImage,seo.twitterImage',
    'cities': 'cities-page?populate=seo.ogImage,seo.twitterImage',
    'privacy-policy': 'privacy-policy-page?populate=seo.ogImage,seo.twitterImage',
    'terms-of-service': 'terms-of-service-page?populate=seo.ogImage,seo.twitterImage',
    'cookie-policy': 'cookie-policy-page?populate=seo.ogImage,seo.twitterImage',
  };

  const endpoint = endpointMap[pageKey];
  if (!endpoint) {
    return fallback;
  }

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

    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${STRAPI_URL}/api/${endpoint}${separator}locale=${currentLocale}`;

    const response = await fetch(url, { headers });

    if (!response.ok) {
      console.warn(`SEO fetch failed for ${pageKey}, using fallback`);
      return fallback;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: { data: any } = await response.json();

    if (!result.data?.seo) {
      console.warn(`No SEO data for ${pageKey}, using fallback`);
      return fallback;
    }

    const seo = result.data.seo;
    return {
      metaTitle: seo.metaTitle || fallback.metaTitle,
      metaDescription: seo.metaDescription || fallback.metaDescription,
      keywords: seo.keywords || fallback.keywords,
      ogImage: getImageUrl(seo.ogImage as StrapiMedia) || fallback.ogImage,
      twitterImage: getImageUrl(seo.twitterImage as StrapiMedia) || fallback.twitterImage,
      canonical: seo.canonical || fallback.canonical,
      noIndex: seo.noIndex ?? fallback.noIndex,
      noFollow: seo.noFollow ?? fallback.noFollow,
    };
  } catch (error) {
    console.error(`Error fetching SEO for ${pageKey}:`, error);
    return fallback;
  }
}

// Get city SEO (for dynamic city detail pages)
export async function getCitySEO(citySlug: string, locale?: Locale): Promise<SEOData | null> {
  const currentLocale = locale || getCurrentLocale();

  if (!STRAPI_URL) {
    return null;
  }

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (STRAPI_TOKEN) {
      headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
    }

    const url = `${STRAPI_URL}/api/cities?filters[slug][$eq]=${citySlug}&populate=seo.ogImage,seo.twitterImage&locale=${currentLocale}`;

    const response = await fetch(url, { headers });

    if (!response.ok) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: { data: any[] } = await response.json();

    if (!result.data?.[0]?.seo) {
      return null;
    }

    const seo = result.data[0].seo;
    return {
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      keywords: seo.keywords,
      ogImage: getImageUrl(seo.ogImage as StrapiMedia),
      twitterImage: getImageUrl(seo.twitterImage as StrapiMedia),
      canonical: seo.canonical,
      noIndex: seo.noIndex,
      noFollow: seo.noFollow,
    };
  } catch (error) {
    console.error(`Error fetching city SEO for ${citySlug}:`, error);
    return null;
  }
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
  // Section content
  impactSection: ImpactSectionContent;
  servicesSection: ServicesSectionContent;
  partnersSection: PartnersSectionContent;
  testimonialsSection: TestimonialsSectionContent;
  citiesSection: CitiesSectionContent;
  faqSection: FAQSectionContent;
  ctaSection: CTASectionContent;
}

export async function getAllContent(locale?: Locale): Promise<SiteContent> {
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
    impactSection,
    servicesSection,
    partnersSection,
    testimonialsSection,
    citiesSection,
    faqSection,
    ctaSection,
  ] = await Promise.all([
    getHeroContent(locale),
    getStats(locale),
    getServices(locale),
    getTestimonials(locale),
    getPartners(locale),
    getCities(locale),
    getNavLinks(locale),
    getFooterSections(locale),
    getFAQ(locale),
    getImpactSection(locale),
    getServicesSection(locale),
    getPartnersSection(locale),
    getTestimonialsSection(locale),
    getCitiesSection(locale),
    getFAQSection(locale),
    getCTASection(locale),
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
    impactSection,
    servicesSection,
    partnersSection,
    testimonialsSection,
    citiesSection,
    faqSection,
    ctaSection,
  };
}

// Hooks for React Query - include locale in keys for proper caching
export const queryKeys = {
  hero: (locale: Locale) => ["hero", locale],
  stats: (locale: Locale) => ["stats", locale],
  services: (locale: Locale) => ["services", locale],
  testimonials: (locale: Locale) => ["testimonials", locale],
  partners: (locale: Locale) => ["partners", locale],
  cities: (locale: Locale) => ["cities", locale],
  navLinks: (locale: Locale) => ["navLinks", locale],
  footerSections: (locale: Locale) => ["footerSections", locale],
  faq: (locale: Locale) => ["faq", locale],
  allContent: (locale: Locale) => ["allContent", locale],
  // Section content
  impactSection: (locale: Locale) => ["impactSection", locale],
  servicesSection: (locale: Locale) => ["servicesSection", locale],
  partnersSection: (locale: Locale) => ["partnersSection", locale],
  testimonialsSection: (locale: Locale) => ["testimonialsSection", locale],
  citiesSection: (locale: Locale) => ["citiesSection", locale],
  faqSection: (locale: Locale) => ["faqSection", locale],
  ctaSection: (locale: Locale) => ["ctaSection", locale],
  // SEO
  pageSEO: (pageKey: PageSEOKey, locale: Locale) => ["pageSEO", pageKey, locale],
  citySEO: (citySlug: string, locale: Locale) => ["citySEO", citySlug, locale],
};

// Re-export Locale type
export type { Locale };
