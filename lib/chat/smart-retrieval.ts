// Smart Retrieval System for MicroHabitat Chatbot
// Uses intent classification + multi-step search to find answers

// Knowledge areas mapped to website sections
export const KNOWLEDGE_AREAS = {
  company: {
    name: 'Company Information',
    keywords: ['microhabitat', 'who', 'founded', 'mission', 'about', 'history', 'team', 'founders', 'orlane', 'alexandre'],
    pages: ['/about', '/'],
    fallbackAreas: ['services', 'contact'],
  },
  services: {
    name: 'Services',
    keywords: ['services', 'offer', 'provide', 'outdoor', 'indoor', 'farm', 'vertical', 'rooftop', 'garden'],
    pages: ['/outdoor-farm', '/indoor-farm', '/'],
    fallbackAreas: ['company', 'pricing'],
  },
  education: {
    name: 'Educational Programs',
    keywords: ['education', 'workshop', 'learn', 'training', 'program', 'activities', 'school', 'teaching'],
    pages: ['/educational-activities', '/schools', '/community-engagement'],
    fallbackAreas: ['services', 'clients'],
  },
  clients: {
    name: 'Client Types',
    keywords: ['client', 'corporation', 'corporate', 'school', 'real estate', 'property', 'building', 'commercial'],
    pages: ['/corporations', '/schools', '/commercial-real-estate'],
    fallbackAreas: ['services', 'benefits'],
  },
  locations: {
    name: 'Locations & Cities',
    keywords: ['where', 'location', 'city', 'cities', 'montreal', 'toronto', 'paris', 'new york', 'operate', 'coverage'],
    pages: ['/cities', '/contact'],
    fallbackAreas: ['company', 'contact'],
  },
  pricing: {
    name: 'Pricing & Cost',
    keywords: ['cost', 'price', 'pricing', 'expensive', 'afford', 'budget', 'investment', 'roi', 'return'],
    pages: ['/roi-calculator', '/contact'],
    fallbackAreas: ['services', 'benefits'],
  },
  benefits: {
    name: 'Benefits & Impact',
    keywords: ['benefit', 'advantage', 'impact', 'why', 'value', 'esg', 'sustainable', 'environment', 'green'],
    pages: ['/', '/about', '/commercial-real-estate'],
    fallbackAreas: ['certifications', 'services'],
  },
  certifications: {
    name: 'Certifications',
    keywords: ['certification', 'leed', 'well', 'boma', 'certified', 'green building', 'credits', 'points'],
    pages: ['/commercial-real-estate', '/corporations'],
    fallbackAreas: ['benefits', 'services'],
  },
  contact: {
    name: 'Contact Information',
    keywords: ['contact', 'email', 'phone', 'reach', 'talk', 'address', 'office', 'book', 'demo', 'meeting'],
    pages: ['/contact', '/'],
    fallbackAreas: ['locations', 'company'],
  },
  careers: {
    name: 'Careers & Jobs',
    keywords: ['career', 'job', 'work', 'hiring', 'position', 'employment', 'join', 'team'],
    pages: ['/careers'],
    fallbackAreas: ['company', 'contact'],
  },
  partnerships: {
    name: 'Partnerships',
    keywords: ['partner', 'partnership', 'collaborate', 'collaboration', 'together'],
    pages: ['/partnerships'],
    fallbackAreas: ['company', 'contact'],
  },
  faq: {
    name: 'FAQ',
    keywords: ['faq', 'question', 'common', 'frequently'],
    pages: ['/faq'],
    fallbackAreas: ['company', 'services'],
  },
  produce: {
    name: 'Produce & Growing',
    keywords: ['grow', 'vegetable', 'herb', 'produce', 'harvest', 'plant', 'crop', 'food', 'tomato', 'lettuce'],
    pages: ['/outdoor-farm', '/indoor-farm', '/'],
    fallbackAreas: ['services', 'benefits'],
  },
  maintenance: {
    name: 'Maintenance',
    keywords: ['maintain', 'maintenance', 'care', 'upkeep', 'water', 'visit'],
    pages: ['/outdoor-farm', '/indoor-farm', '/faq'],
    fallbackAreas: ['services', 'pricing'],
  },
} as const;

export type KnowledgeAreaKey = keyof typeof KNOWLEDGE_AREAS;

// Classify the intent of a question
export function classifyIntent(question: string): KnowledgeAreaKey[] {
  const q = question.toLowerCase();
  const scores: { area: KnowledgeAreaKey; score: number }[] = [];

  for (const [areaKey, area] of Object.entries(KNOWLEDGE_AREAS)) {
    let score = 0;
    for (const keyword of area.keywords) {
      if (q.includes(keyword)) {
        // Longer keywords get higher scores (more specific)
        score += keyword.length;
      }
    }
    if (score > 0) {
      scores.push({ area: areaKey as KnowledgeAreaKey, score });
    }
  }

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  // Return top areas (primary + fallbacks)
  if (scores.length === 0) {
    // Default to general areas
    return ['company', 'services', 'faq'];
  }

  const primaryArea = scores[0].area;
  const fallbacks = [...KNOWLEDGE_AREAS[primaryArea].fallbackAreas] as KnowledgeAreaKey[];

  // Return primary area + its fallbacks, deduplicated
  const result: KnowledgeAreaKey[] = [primaryArea];
  for (const fallback of fallbacks) {
    if (!result.includes(fallback)) {
      result.push(fallback);
    }
  }

  return result;
}

// Get the pages to search for a given intent
export function getPagesToSearch(intents: KnowledgeAreaKey[]): string[] {
  const pages = new Set<string>();

  for (const intent of intents) {
    const area = KNOWLEDGE_AREAS[intent];
    for (const page of area.pages) {
      pages.add(page);
    }
  }

  return Array.from(pages);
}

// Search reasoning - explains where we're looking
export interface SearchStep {
  area: string;
  pages: string[];
  reason: string;
}

export function getSearchPlan(question: string): SearchStep[] {
  const intents = classifyIntent(question);
  const steps: SearchStep[] = [];

  for (let i = 0; i < intents.length && i < 3; i++) {
    const intent = intents[i];
    const area = KNOWLEDGE_AREAS[intent];

    steps.push({
      area: area.name,
      pages: [...area.pages],
      reason: i === 0
        ? `Primary search: Question seems related to ${area.name.toLowerCase()}`
        : `Fallback ${i}: Also checking ${area.name.toLowerCase()} for additional context`,
    });
  }

  return steps;
}
