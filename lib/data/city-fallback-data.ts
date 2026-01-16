/**
 * City Fallback Data
 *
 * This data serves as a fallback when CMS is unavailable.
 * Structure mirrors CMS City collection exactly for type safety.
 *
 * @see payload/collections/Cities.ts for CMS schema
 */

import type { City } from '../strapi';

export interface CityDetailData extends City {
  name: string;
  country: string;
  region: 'north-america' | 'europe';
  regionName: string;
  slug: string;
  description: string;
  highlights: string[];
  image?: string;
}

/**
 * Complete city data for all MicroHabitat locations.
 * Organized by region for maintainability.
 */
export const CITY_FALLBACK_DATA: Record<string, CityDetailData> = {
  // ============================================
  // CANADA
  // ============================================
  'montreal': {
    name: 'Montreal',
    country: 'Canada',
    region: 'north-america',
    regionName: 'Quebec',
    slug: 'montreal',
    description: "Join Montreal's thriving urban agriculture movement. As our headquarters city, Montreal is home to our largest network of rooftop farms, serving commercial properties, corporations, and schools across the island.",
    highlights: [
      '50+ urban farms across the city',
      'Home to MicroHabitat headquarters',
      'Partnerships with major real estate companies',
      'Strong food bank donation program',
    ],
  },
  'toronto': {
    name: 'Toronto',
    country: 'Canada',
    region: 'north-america',
    regionName: 'Ontario',
    slug: 'toronto',
    description: "Toronto's urban farming scene is growing rapidly. We're proud to serve properties across the GTA, bringing fresh produce and community engagement to one of North America's largest cities.",
    highlights: [
      '30+ urban farms in the GTA',
      'Corporate and commercial partnerships',
      'Year-round indoor farming options',
      'Educational programs for schools',
    ],
  },
  'vancouver': {
    name: 'Vancouver',
    country: 'Canada',
    region: 'north-america',
    regionName: 'British Columbia',
    slug: 'vancouver',
    description: "Vancouver's mild climate makes it ideal for urban farming. Our West Coast team brings year-round growing opportunities to properties across Metro Vancouver.",
    highlights: [
      'Extended growing season',
      'Rooftop and ground-level farms',
      'Strong sustainability focus',
      'Indigenous partnership programs',
    ],
  },
  'calgary': {
    name: 'Calgary',
    country: 'Canada',
    region: 'north-america',
    regionName: 'Alberta',
    slug: 'calgary',
    description: "Calgary's urban farming community is growing. We're bringing sustainable agriculture to Alberta's largest city with programs tailored to the prairie climate.",
    highlights: [
      'Climate-adapted growing programs',
      'Indoor farming solutions',
      'Corporate engagement focus',
      'Growing network of partners',
    ],
  },
  'edmonton': {
    name: 'Edmonton',
    country: 'Canada',
    region: 'north-america',
    regionName: 'Alberta',
    slug: 'edmonton',
    description: 'Edmonton is embracing urban agriculture. Our programs are designed to thrive in northern climates while engaging communities year-round.',
    highlights: [
      'Northern climate expertise',
      'Indoor growing solutions',
      'School and community programs',
      'Food security initiatives',
    ],
  },
  'victoria': {
    name: 'Victoria',
    country: 'Canada',
    region: 'north-america',
    regionName: 'British Columbia',
    slug: 'victoria',
    description: "Victoria's temperate climate is perfect for urban farming. We're growing food and community connections across Vancouver Island.",
    highlights: [
      'Mild year-round climate',
      'Strong local food movement',
      'Community-focused programs',
      'Biodiversity initiatives',
    ],
  },

  // ============================================
  // UNITED STATES
  // ============================================
  'new-york': {
    name: 'New York City',
    country: 'USA',
    region: 'north-america',
    regionName: 'New York',
    slug: 'new-york',
    description: "NYC is home to some of our most innovative urban farms. From Brooklyn rooftops to Manhattan terraces, we're transforming the concrete jungle into a greener, more sustainable city.",
    highlights: [
      'Rooftop farms across all boroughs',
      'Major commercial partnerships',
      'Green building certification support',
      'Food bank donation programs',
    ],
  },
  'chicago': {
    name: 'Chicago',
    country: 'USA',
    region: 'north-america',
    regionName: 'Illinois',
    slug: 'chicago',
    description: "Chicago's urban farming scene is thriving. We're bringing sustainable agriculture to the Windy City with programs designed for the Midwest climate.",
    highlights: [
      'Growing network of farms',
      'Corporate partnerships',
      'School engagement programs',
      'Community food initiatives',
    ],
  },
  'dallas': {
    name: 'Dallas',
    country: 'USA',
    region: 'north-america',
    regionName: 'Texas',
    slug: 'dallas',
    description: "Dallas-Fort Worth is embracing urban agriculture. Our Texas team is bringing sustainable growing solutions to one of America's fastest-growing metros.",
    highlights: [
      'Heat-adapted growing programs',
      'Corporate campus farms',
      'Year-round growing potential',
      'Expanding partner network',
    ],
  },
  'los-angeles': {
    name: 'Los Angeles',
    country: 'USA',
    region: 'north-america',
    regionName: 'California',
    slug: 'los-angeles',
    description: "LA's climate is ideal for urban farming. We're serving properties across Southern California with year-round growing programs and community engagement.",
    highlights: [
      'Year-round growing season',
      'Diverse crop options',
      'Water-efficient systems',
      'Entertainment industry partnerships',
    ],
  },
  'san-francisco': {
    name: 'San Francisco',
    country: 'USA',
    region: 'north-america',
    regionName: 'California',
    slug: 'san-francisco',
    description: 'The Bay Area is a leader in sustainability, and urban farming is no exception. Our SF team serves properties across the region with innovative growing solutions.',
    highlights: [
      'Tech campus partnerships',
      'Sustainability leadership',
      'Strong local food culture',
      'LEED certification support',
    ],
  },
  'washington-dc': {
    name: 'Washington D.C.',
    country: 'USA',
    region: 'north-america',
    regionName: 'District of Columbia',
    slug: 'washington-dc',
    description: "The nation's capital is going green with urban farming. We're serving government buildings, corporate offices, and schools across the DC metro area.",
    highlights: [
      'Government building programs',
      'Corporate campus farms',
      'Educational partnerships',
      'Sustainability initiatives',
    ],
  },
  'denver': {
    name: 'Denver',
    country: 'USA',
    region: 'north-america',
    regionName: 'Colorado',
    slug: 'denver',
    description: "Denver's mile-high altitude doesn't stop us from growing. Our Colorado team brings urban farming expertise to the Rocky Mountain region.",
    highlights: [
      'High-altitude growing expertise',
      'Strong outdoor culture',
      'Corporate wellness programs',
      'Community engagement focus',
    ],
  },
  'columbus': {
    name: 'Columbus',
    country: 'USA',
    region: 'north-america',
    regionName: 'Ohio',
    slug: 'columbus',
    description: "Columbus is embracing urban agriculture with open arms. We're growing food and community connections across Ohio's capital city.",
    highlights: [
      'Growing partner network',
      'University partnerships',
      'Corporate programs',
      'Food security initiatives',
    ],
  },
  'seattle': {
    name: 'Seattle',
    country: 'USA',
    region: 'north-america',
    regionName: 'Washington',
    slug: 'seattle',
    description: "Seattle's tech-forward culture extends to urban farming. We're serving the Pacific Northwest with sustainable growing programs year-round.",
    highlights: [
      'Tech company partnerships',
      'Sustainability focus',
      'Rain-friendly growing systems',
      'Strong local food culture',
    ],
  },

  // ============================================
  // EUROPE
  // ============================================
  'amsterdam': {
    name: 'Amsterdam',
    country: 'Netherlands',
    region: 'europe',
    regionName: 'North Holland',
    slug: 'amsterdam',
    description: "Amsterdam leads the way in European urban farming. Our Dutch team brings sustainable agriculture to one of the world's most innovative cities.",
    highlights: [
      'European headquarters',
      'Sustainability leadership',
      'Corporate partnerships',
      'Urban innovation hub',
    ],
  },
  'berlin': {
    name: 'Berlin',
    country: 'Germany',
    region: 'europe',
    regionName: 'Brandenburg',
    slug: 'berlin',
    description: "Berlin's creative spirit extends to urban farming. We're growing food and community connections across Germany's capital.",
    highlights: [
      'Strong sustainability culture',
      'Corporate engagement',
      'Community programs',
      'Growing network',
    ],
  },
  'london': {
    name: 'London',
    country: 'UK',
    region: 'europe',
    regionName: 'England',
    slug: 'london',
    description: 'London is embracing rooftop farming like never before. Our UK team serves properties across the capital with sustainable urban agriculture programs.',
    highlights: [
      'Major commercial partnerships',
      'BREEAM certification support',
      'Corporate programs',
      'Food bank donations',
    ],
  },
  'paris': {
    name: 'Paris',
    country: 'France',
    region: 'europe',
    regionName: 'Ile-de-France',
    slug: 'paris',
    description: 'Paris is becoming a leader in urban agriculture. We\'re bringing fresh produce and community engagement to the City of Light.',
    highlights: [
      'Rooftop farm programs',
      'Gastronomic partnerships',
      'Corporate engagement',
      'Sustainability initiatives',
    ],
  },
  'zurich': {
    name: 'Zurich',
    country: 'Switzerland',
    region: 'europe',
    regionName: 'Canton of Zurich',
    slug: 'zurich',
    description: "Zurich's commitment to sustainability aligns perfectly with urban farming. Our Swiss team brings fresh produce to one of Europe's most livable cities.",
    highlights: [
      'Corporate campus farms',
      'High sustainability standards',
      'Financial sector partnerships',
      'Community programs',
    ],
  },
};

/**
 * Get all city slugs for static generation
 */
export const ALL_CITY_SLUGS = Object.keys(CITY_FALLBACK_DATA);

/**
 * Get city by slug with type safety
 */
export function getCityFallback(slug: string): CityDetailData | null {
  return CITY_FALLBACK_DATA[slug] || null;
}

/**
 * Get all cities as array (for listing pages)
 */
export function getAllCitiesFallback(): CityDetailData[] {
  return Object.values(CITY_FALLBACK_DATA);
}
