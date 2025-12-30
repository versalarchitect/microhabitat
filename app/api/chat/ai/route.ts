import { NextRequest, NextResponse } from 'next/server';
import { findCuratedResponse, isGreeting, GREETING_RESPONSE, FALLBACK_RESPONSE } from '@/lib/chat/responses';
import { classifyIntent, getSearchPlan, KNOWLEDGE_AREAS } from '@/lib/chat/smart-retrieval';

// Language detection patterns - must match multiple distinctive words
const LANGUAGE_PATTERNS: Record<string, { patterns: RegExp[]; greeting: string; fallback: string }> = {
  fr: {
    patterns: [
      /\b(bonjour|salut|bonsoir)\b/i,
      /\b(qu'est-ce|pourquoi|comment)\b.*\b(vous|que|est)\b/i,
      /\b(merci|s'il vous plaît|oui|non)\b/i,
      /\b(je suis|nous sommes|vous êtes)\b/i,
    ],
    greeting: `Bonjour! Je suis l'assistant MicroHabitat. Je peux vous aider à découvrir nos services d'agriculture urbaine.\n\nVoici quelques questions que vous pouvez me poser:\n• Qu'est-ce que MicroHabitat?\n• Quels services offrez-vous?\n• Dans quelles villes opérez-vous?\n\nOu cliquez sur "Contacter un représentant" pour discuter avec notre équipe en français!`,
    fallback: `Je ne suis pas sûr d'avoir une réponse spécifique à cette question. Pour une assistance personnalisée en français, cliquez sur "Contacter un représentant" ou envoyez-nous un courriel à info@microhabitat.com.`,
  },
  de: {
    patterns: [
      /\b(guten tag|guten morgen|hallo)\b/i,
      /\b(wie|was|warum|wann|wo)\b.*\b(ist|sind|können)\b/i,
      /\b(danke|bitte|ja|nein)\b.*\b(sehr|schön)\b/i,
      /\b(ich bin|wir sind|sie sind)\b/i,
    ],
    greeting: `Hallo! Ich bin der MicroHabitat-Assistent. Ich kann Ihnen helfen, mehr über unsere Urban-Farming-Dienste zu erfahren.\n\nFragen Sie mich gerne:\n• Was ist MicroHabitat?\n• Welche Dienste bieten Sie an?\n• In welchen Städten sind Sie tätig?\n\nKlicken Sie auf "Vertreter kontaktieren" um auf Deutsch mit unserem Team zu sprechen!`,
    fallback: `Ich bin mir nicht sicher, ob ich eine spezifische Antwort auf diese Frage habe. Für persönliche Unterstützung auf Deutsch klicken Sie bitte auf "Vertreter kontaktieren" oder senden Sie uns eine E-Mail an info@microhabitat.com.`,
  },
  es: {
    patterns: [
      /\b(hola|buenos días|buenas tardes)\b/i,
      /\b(qué|cómo|cuándo|dónde|por qué)\b.*\b(es|son|pueden)\b/i,
      /\b(gracias|por favor|sí|no)\b/i,
      /\b(servicios|ofrecen|tienen)\b/i,
    ],
    greeting: `¡Hola! Soy el asistente de MicroHabitat. Puedo ayudarte a conocer nuestros servicios de agricultura urbana.\n\nPuedes preguntarme:\n• ¿Qué es MicroHabitat?\n• ¿Qué servicios ofrecen?\n• ¿En qué ciudades operan?\n\n¡Haz clic en "Contactar representante" para hablar con nuestro equipo en español!`,
    fallback: `No estoy seguro de tener una respuesta específica a esa pregunta. Para asistencia personalizada en español, haz clic en "Contactar representante" o envíanos un correo a info@microhabitat.com.`,
  },
  nl: {
    patterns: [
      /\b(hallo|goedemorgen|goedemiddag)\b/i,
      /\b(hoe|wat|waarom|wanneer|waar)\b.*\b(is|zijn|kunnen)\b/i,
      /\b(dank u|alstublieft|ja|nee)\b/i,
    ],
    greeting: `Hallo! Ik ben de MicroHabitat-assistent. Ik kan u helpen meer te weten te komen over onze stedelijke landbouwdiensten.\n\nU kunt me vragen:\n• Wat is MicroHabitat?\n• Welke diensten biedt u aan?\n• In welke steden bent u actief?\n\nKlik op "Neem contact op" om in het Nederlands met ons team te praten!`,
    fallback: `Ik weet niet zeker of ik een specifiek antwoord op die vraag heb. Voor persoonlijke ondersteuning in het Nederlands, klik op "Neem contact op" of stuur ons een e-mail naar info@microhabitat.com.`,
  },
  it: {
    patterns: [
      /\b(ciao|buongiorno|buonasera|salve)\b/i,
      /\b(come|cosa|quando|dove|perché)\b.*\b(è|sono|potete)\b/i,
      /\b(grazie|per favore|sì|no)\b/i,
    ],
    greeting: `Ciao! Sono l'assistente MicroHabitat. Posso aiutarti a scoprire i nostri servizi di agricoltura urbana.\n\nPuoi chiedermi:\n• Cos'è MicroHabitat?\n• Quali servizi offrite?\n• In quali città operate?\n\nClicca su "Contatta un rappresentante" per parlare con il nostro team in italiano!`,
    fallback: `Non sono sicuro di avere una risposta specifica a questa domanda. Per assistenza personalizzata in italiano, clicca su "Contatta un rappresentante" o inviaci un'email a info@microhabitat.com.`,
  },
};

// Detect language from message
function detectLanguage(message: string): string {
  const m = message.toLowerCase();

  for (const [lang, config] of Object.entries(LANGUAGE_PATTERNS)) {
    for (const pattern of config.patterns) {
      if (pattern.test(m)) {
        return lang;
      }
    }
  }

  return 'en';
}

// Structured knowledge base - organized by topic for smart retrieval
const KNOWLEDGE_BASE: Record<string, { title: string; content: string; keywords: string[] }[]> = {
  '/': [
    {
      title: 'MicroHabitat Overview',
      content: `MicroHabitat is the world's largest network of urban farms, founded in 2016 in Montreal by childhood friends Orlane and Alexandre. We transform underutilized urban spaces—rooftops, terraces, lobbies, and courtyards—into productive ecological farms.\n\nOur mission is to reconnect communities with nature and fresh, local food through regenerative agriculture. We operate across North America (Montreal, Toronto, Vancouver, New York, Chicago) and Europe (Paris, Amsterdam, Brussels), managing over 500 urban farms that produce fresh vegetables, herbs, and edible flowers year-round.`,
      keywords: ['microhabitat', 'about', 'founded', 'mission', 'who', 'company'],
    },
    {
      title: 'Impact & Statistics',
      content: `MicroHabitat has achieved significant environmental and social impact:\n\n• **500+ urban farms** installed across North America and Europe\n• **50,000+ kg** of produce harvested annually\n• **2 million+ kg** of CO2 offset through our green spaces\n• **20+ cities** with active MicroHabitat partnerships\n\nOur farms reduce urban heat island effect by up to 5°C, support pollinators and urban biodiversity, and provide fresh food within steps of where people live and work.`,
      keywords: ['impact', 'statistics', 'numbers', 'farms', 'produce', 'co2'],
    },
  ],
  '/outdoor-farm': [
    {
      title: 'Outdoor Urban Farming Services',
      content: `Our outdoor urban farming services transform rooftops, terraces, courtyards, and other outdoor spaces into productive gardens.\n\n**What's included:**\n• Custom farm design based on your space and goals\n• Professional installation of raised beds, planters, and irrigation\n• Regular maintenance visits by our expert farmers\n• Seasonal planting and crop rotation\n• Harvesting at peak freshness\n• Fresh produce delivery\n\nWe use organic growing methods without synthetic pesticides or fertilizers.`,
      keywords: ['outdoor', 'rooftop', 'terrace', 'garden', 'services', 'installation'],
    },
    {
      title: 'What We Grow Outdoors',
      content: `Our outdoor farms grow a diverse range of produce:\n\n**Vegetables:**\n• Leafy greens (lettuce, kale, spinach, arugula)\n• Tomatoes (cherry, heirloom varieties)\n• Peppers (bell, hot varieties)\n• Cucumbers and zucchini\n• Beans and peas\n• Root vegetables (carrots, radishes, beets)\n\n**Herbs:**\n• Basil, mint, cilantro, parsley\n• Rosemary, thyme, oregano\n• Specialty herbs on request\n\n**Edible Flowers:**\n• Nasturtiums, pansies, marigolds\n• Borage, calendula, lavender\n\nAll produce is grown organically and harvested at peak freshness.`,
      keywords: ['grow', 'vegetables', 'herbs', 'produce', 'harvest', 'tomato', 'lettuce', 'plants'],
    },
  ],
  '/indoor-farm': [
    {
      title: 'Indoor Vertical Farming',
      content: `Our indoor farming solutions bring year-round growing to lobbies, atriums, and common areas using vertical farming technology.\n\n**Benefits:**\n• Year-round production regardless of weather\n• Low-maintenance, automated systems\n• Beautiful biophilic design elements\n• 95% less water than traditional farming\n• No pesticides needed in controlled environment\n\n**Perfect for:**\n• Corporate offices\n• Residential lobbies\n• Schools and universities\n• Healthcare facilities\n• Hotels and hospitality`,
      keywords: ['indoor', 'vertical', 'lobby', 'year-round', 'technology', 'hydroponic'],
    },
  ],
  '/corporations': [
    {
      title: 'Corporate Urban Farming & ESG Benefits',
      content: `Urban farming delivers powerful ESG (Environmental, Social, Governance) benefits for corporations:\n\n**Environmental (E):**\n• Measurable environmental impact for ESG reporting\n• Carbon offset and CO2 capture\n• Biodiversity support and pollinator habitats\n• Reduced urban heat island effect\n\n**Social (S):**\n• Employee wellness and mental health improvements\n• Fresh produce access for staff\n• Team-building and community events\n• Support for local food banks\n\n**Governance (G):**\n• Demonstrate sustainability leadership\n• Meet stakeholder ESG expectations\n• Support UN Sustainable Development Goals\n• Future-proof real estate investments\n\nOur corporate programs include rooftop farms, indoor installations, workshops, and produce sharing programs. We provide ESG metrics and reporting support.`,
      keywords: ['corporate', 'corporation', 'esg', 'employee', 'workplace', 'sustainability', 'business', 'environmental', 'social', 'governance', 'goals'],
    },
  ],
  '/commercial-real-estate': [
    {
      title: 'Real Estate Solutions',
      content: `For commercial real estate owners and property managers, urban farms deliver:\n\n**Increased Property Value:**\n• 10-20% increase in property values\n• Premium positioning in competitive markets\n• Unique amenity that attracts tenants\n\n**Green Building Certifications:**\n• **LEED**: Up to 8+ points (Sustainable Sites, Water, Innovation)\n• **WELL**: Nourishment, Mind, and Community credits\n• **BOMA BEST**: Environmental and innovation points\n• **Fitwel**: Healthy food access credits\n\nWe provide full documentation support for certification applications.`,
      keywords: ['real estate', 'property', 'building', 'leed', 'well', 'boma', 'certification', 'value'],
    },
  ],
  '/schools': [
    {
      title: 'School Programs',
      content: `Our school programs bring urban agriculture into educational settings:\n\n**What students learn:**\n• Plant biology and growing cycles\n• Nutrition and healthy eating\n• Environmental sustainability\n• Food systems and local food\n\n**Program components:**\n• Curriculum-aligned lessons\n• Garden installation and maintenance\n• Hands-on planting and harvesting\n• Farm-to-cafeteria initiatives\n• Seasonal celebrations\n\nWe work with elementary schools, high schools, and universities across North America and Europe.`,
      keywords: ['school', 'education', 'student', 'learn', 'children', 'university'],
    },
  ],
  '/educational-activities': [
    {
      title: 'Educational Programs & Workshops',
      content: `MicroHabitat offers comprehensive educational programming:\n\n**Workshop Types:**\n• Hands-on growing workshops\n• Corporate team-building activities\n• Sustainability seminars\n• Seasonal planting events\n• Harvest celebrations\n\n**Available for:**\n• Corporate teams\n• School groups\n• Community organizations\n• Residential buildings\n\nAll workshops are led by our expert urban farmers and can be customized to your group's interests and skill level.`,
      keywords: ['workshop', 'education', 'learn', 'team-building', 'activities', 'training'],
    },
  ],
  '/cities': [
    {
      title: 'Our Locations',
      content: `MicroHabitat operates across North America and Europe:\n\n**North America:**\n• Montreal (Headquarters)\n• Toronto\n• Vancouver\n• New York\n• Chicago\n• Boston\n• Philadelphia\n• Washington DC\n\n**Europe:**\n• Paris (European HQ)\n• Amsterdam\n• Brussels\n• London\n\nWe're constantly expanding to new cities. If you're in a city not listed, contact us—we may already be planning expansion or can discuss possibilities.`,
      keywords: ['city', 'cities', 'location', 'montreal', 'toronto', 'paris', 'new york', 'where', 'operate'],
    },
  ],
  '/contact': [
    {
      title: 'Contact Information',
      content: `**Email:** info@microhabitat.com\n**Website:** www.microhabitat.com\n\n**Office Locations:**\n\n**Montreal (HQ)**\n5333 Casgrain Ave, Suite 102\nMontreal, QC H2T 1X3\n\n**Toronto**\n180 John Street, Suite 402\nToronto, ON M5T 1X5\n\n**New York**\n1123 Broadway, Suite 1012\nNew York, NY 10010\n\n**Paris**\n25 Rue du Petit Musc\n75004 Paris, France\n\n**Book a Demo:** Visit www.microhabitat.com and click "Book a Demo" to schedule a free consultation.`,
      keywords: ['contact', 'email', 'phone', 'address', 'office', 'reach', 'book', 'demo'],
    },
  ],
  '/roi-calculator': [
    {
      title: 'Pricing & Investment',
      content: `MicroHabitat pricing varies based on project scope:\n\n**Factors that affect pricing:**\n• Space size (square footage)\n• Indoor vs. outdoor installation\n• Design complexity\n• Maintenance frequency\n• Educational programming needs\n\n**What's included in all packages:**\n• Custom design and consultation\n• All materials, soil, and plants\n• Professional installation\n• Regular maintenance visits\n• Harvesting and produce delivery\n• Seasonal replanting\n\n**ROI typically includes:**\n• Property value increase (10-20%)\n• Tenant attraction and retention\n• Certification credits\n• Brand and marketing value\n\nFor a custom quote, book a free consultation at www.microhabitat.com.`,
      keywords: ['cost', 'price', 'pricing', 'roi', 'investment', 'budget', 'afford'],
    },
  ],
  '/faq': [
    {
      title: 'Maintenance & Care',
      content: `**MicroHabitat provides full-service maintenance—you don't need to do anything!**\n\n**Our farmers handle:**\n• Regular watering and irrigation\n• Soil health and organic fertilization\n• Pest management (organic methods)\n• Seasonal planting and rotation\n• Harvesting at peak freshness\n• Pruning and plant care\n• Equipment maintenance\n• Winter preparation (outdoor farms)\n\n**Visit frequency:**\nWeekly or bi-weekly depending on season and package.\n\n**Optional involvement:**\nIf you want to participate, we offer workshops and hands-on sessions!`,
      keywords: ['maintain', 'maintenance', 'care', 'water', 'visit', 'who', 'upkeep'],
    },
  ],
  '/careers': [
    {
      title: 'Careers at MicroHabitat',
      content: `Join our team of urban farmers, designers, and sustainability professionals!\n\n**Open positions often include:**\n• Urban Farmers\n• Farm Managers\n• Sales & Partnerships\n• Operations & Logistics\n• Design Specialists\n\n**What we offer:**\n• Competitive compensation\n• Meaningful, impactful work\n• Growth opportunities\n• Great team culture\n\nCheck www.microhabitat.com/careers for current openings or send your resume to careers@microhabitat.com.`,
      keywords: ['career', 'job', 'work', 'hiring', 'position', 'join', 'team'],
    },
  ],
  '/partnerships': [
    {
      title: 'Partnership Opportunities',
      content: `MicroHabitat partners with organizations aligned with our mission:\n\n**Partnership types:**\n• Food bank partnerships (produce donations)\n• Corporate sustainability partnerships\n• Academic research collaborations\n• Technology and innovation partnerships\n• Municipal and government partnerships\n\nIf you're interested in partnering with MicroHabitat, contact us at info@microhabitat.com or partnerships@microhabitat.com.`,
      keywords: ['partner', 'partnership', 'collaborate', 'together'],
    },
  ],
};

// Smart retrieval: find relevant content based on intent and keywords
function smartRetrieve(question: string): { content: string; reasoning: string[]; sources: string[] } {
  const reasoning: string[] = [];
  const q = question.toLowerCase();

  // Extract significant keywords from question
  const questionWords = q.split(/\s+/).filter(w => w.length > 2);
  const specialKeywords = ['esg', 'leed', 'well', 'boma', 'roi', 'cost', 'price', 'career', 'job', 'hire'];
  const matchedSpecial = specialKeywords.filter(kw => q.includes(kw));

  // Step 1: Classify intent
  const intents = classifyIntent(question);
  reasoning.push(`Analyzing question: "${question}"`);
  reasoning.push(`Identified topics: ${intents.map(i => KNOWLEDGE_AREAS[i].name).join(', ')}`);

  // Step 2: Get search plan
  const plan = getSearchPlan(question);
  const sources: string[] = [];
  interface ScoredContent { content: string; score: number; title: string; page: string }
  const scoredContent: ScoredContent[] = [];

  // Step 3: Search through planned pages
  for (const step of plan) {
    reasoning.push(step.reason);

    for (const page of step.pages) {
      const pageContent = KNOWLEDGE_BASE[page];
      if (!pageContent) continue;

      // Search sections in this page
      for (const section of pageContent) {
        // Score by keyword matches
        let score = section.keywords.filter(kw => q.includes(kw)).length * 3;

        // Bonus for special keywords
        score += matchedSpecial.filter(kw =>
          section.keywords.includes(kw) ||
          section.title.toLowerCase().includes(kw) ||
          section.content.toLowerCase().includes(kw)
        ).length * 5;

        // Score for question words in content
        score += questionWords.filter(w => section.content.toLowerCase().includes(w)).length;

        if (score > 0 || q.includes(section.title.toLowerCase())) {
          scoredContent.push({
            content: `**${section.title}**\n${section.content}`,
            score,
            title: section.title,
            page,
          });
          reasoning.push(`  → Found: "${section.title}" (score: ${score})`);
        }
      }
    }
  }

  // Step 4: If nothing found, do a broader keyword search
  if (scoredContent.length === 0) {
    reasoning.push('No direct matches found, performing broad keyword search...');

    for (const [page, sections] of Object.entries(KNOWLEDGE_BASE)) {
      for (const section of sections) {
        let score = questionWords.filter(word =>
          section.content.toLowerCase().includes(word) ||
          section.keywords.some(kw => kw.includes(word))
        ).length;

        // Bonus for special keywords
        score += matchedSpecial.filter(kw =>
          section.keywords.includes(kw) ||
          section.title.toLowerCase().includes(kw) ||
          section.content.toLowerCase().includes(kw)
        ).length * 5;

        if (score >= 2) {
          scoredContent.push({
            content: `**${section.title}**\n${section.content}`,
            score,
            title: section.title,
            page,
          });
          reasoning.push(`  → Broad match: "${section.title}" (score: ${score})`);
        }
      }
    }
  }

  // Sort by score and take top results
  scoredContent.sort((a, b) => b.score - a.score);
  const topContent = scoredContent.slice(0, 3);

  return {
    content: topContent.map(c => c.content).join('\n\n---\n\n'),
    reasoning,
    sources: [...new Set(topContent.map(c => c.page))],
  };
}

// Extract the best answer from content
function extractAnswer(question: string, content: string): string {
  // Simple extraction: return the content with a helpful intro
  if (!content) {
    return FALLBACK_RESPONSE;
  }

  // For simple questions, try to find the most relevant paragraph
  const q = question.toLowerCase();
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 20);

  // Score paragraphs by relevance
  const words = q.split(/\s+/).filter(w => w.length > 3);
  const scored = paragraphs.map(p => ({
    text: p,
    score: words.filter(w => p.toLowerCase().includes(w)).length,
  })).sort((a, b) => b.score - a.score);

  // Return top 2-3 paragraphs
  const topParagraphs = scored.slice(0, 3).map(s => s.text);

  if (topParagraphs.length === 0) {
    return content.slice(0, 1500);
  }

  let answer = topParagraphs.join('\n\n');

  // Add helpful closing if answer is short
  if (answer.length < 300) {
    answer += '\n\nFor more details or personalized assistance, please contact us at info@microhabitat.com or book a demo at www.microhabitat.com.';
  }

  return answer;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Detect language
    const detectedLang = detectLanguage(message);
    const langConfig = LANGUAGE_PATTERNS[detectedLang];

    // Check for greetings first (with language-specific response)
    if (isGreeting(message)) {
      const greetingResponse = langConfig?.greeting || GREETING_RESPONSE;
      return NextResponse.json({
        success: true,
        response: greetingResponse,
        source: 'greeting',
        detectedLanguage: detectedLang,
        reasoning: [`Detected greeting in ${detectedLang}`],
      });
    }

    // For non-English messages, suggest contacting a representative
    if (detectedLang !== 'en' && langConfig) {
      return NextResponse.json({
        success: true,
        response: langConfig.fallback,
        source: 'language-redirect',
        detectedLanguage: detectedLang,
        suggestedRoute: `/${detectedLang}`,
        reasoning: [`Detected ${detectedLang} language, suggesting localized support`],
      });
    }

    // Check for curated responses (high-quality pre-written answers)
    const curatedResponse = findCuratedResponse(message);
    if (curatedResponse) {
      return NextResponse.json({
        success: true,
        response: curatedResponse,
        source: 'curated',
        detectedLanguage: detectedLang,
        reasoning: ['Matched curated response for common question'],
      });
    }

    // Smart retrieval: find relevant content using intent classification
    const retrieval = smartRetrieve(message);

    if (!retrieval.content) {
      return NextResponse.json({
        success: true,
        response: FALLBACK_RESPONSE,
        source: 'fallback',
        detectedLanguage: detectedLang,
        reasoning: retrieval.reasoning,
      });
    }

    // Extract the best answer from retrieved content
    const answer = extractAnswer(message, retrieval.content);

    return NextResponse.json({
      success: true,
      response: answer,
      source: 'smart-retrieval',
      detectedLanguage: detectedLang,
      reasoning: retrieval.reasoning,
      sources: retrieval.sources,
    });
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
