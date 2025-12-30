// Curated responses for common questions about MicroHabitat
// These provide high-quality, conversational answers

export interface CuratedResponse {
  patterns: string[]; // Keywords/phrases that trigger this response
  response: string;
}

export const CURATED_RESPONSES: CuratedResponse[] = [
  {
    patterns: ['what is microhabitat', 'who is microhabitat', 'tell me about microhabitat', 'what does microhabitat do'],
    response: `MicroHabitat is the world's largest network of urban farms, founded in 2016 in Montreal by childhood friends Orlane and Alexandre. We transform underutilized urban spaces—rooftops, terraces, lobbies, and courtyards—into productive ecological farms.

Our mission is to reconnect communities with nature and fresh, local food through regenerative agriculture. We operate across North America (Montreal, Toronto, Vancouver, New York, Chicago) and Europe (Paris, Amsterdam, Brussels), managing over 500 urban farms that produce fresh vegetables, herbs, and edible flowers year-round.

We work with commercial real estate, corporations, schools, and communities to create sustainable green spaces that improve wellbeing, support ESG goals, and deliver measurable environmental impact.`,
  },
  {
    patterns: ['what services', 'services do you offer', 'what do you provide', 'offerings'],
    response: `MicroHabitat offers three main services:

**1. Outdoor Urban Farms**
We design and maintain rooftop gardens, terrace farms, and courtyard green spaces. These farms produce fresh vegetables, herbs, and edible flowers while creating beautiful amenity spaces for building occupants.

**2. Indoor Farms**
Our vertical farming solutions bring year-round growing to indoor spaces like lobbies, atriums, and common areas. These low-maintenance systems provide fresh produce and biophilic benefits regardless of weather or season.

**3. Educational Programs**
We offer workshops, team-building activities, and ongoing educational programming. From seed-to-harvest experiences to sustainability seminars, we help communities connect with urban agriculture.

All services include full design, installation, maintenance, and harvesting—we handle everything so you can enjoy the benefits.`,
  },
  {
    patterns: ['how do i get started', 'get started', 'start working with', 'begin', 'next steps'],
    response: `Getting started with MicroHabitat is simple:

**1. Book a Discovery Call**
Schedule a free consultation where we'll discuss your space, goals, and vision. We'll assess your location's potential for urban farming.

**2. Custom Design**
Our team creates a tailored proposal including farm design, expected yields, and pricing. We consider your building type, available space, sunlight, and objectives.

**3. Installation**
Once approved, we handle everything—soil, planters, irrigation systems, and initial planting. Installation typically takes 1-3 days depending on project size.

**4. Ongoing Care**
Our farmers visit regularly to maintain the farm, harvest produce, and ensure everything thrives. You receive fresh produce deliveries and can participate in optional workshops.

Ready to start? Book a demo at www.microhabitat.com or email us at info@microhabitat.com.`,
  },
  {
    patterns: ['benefits', 'advantages', 'why urban farm', 'why should', 'value', 'roi'],
    response: `Urban farms from MicroHabitat deliver multiple benefits:

**Environmental Impact**
• Reduce urban heat island effect by up to 5°C
• Capture carbon and improve air quality
• Support pollinators and urban biodiversity
• Divert organic waste through composting

**Building Value**
• Increase property values by 10-20%
• Earn LEED, WELL, and BOMA BEST certification credits
• Reduce energy costs through natural insulation
• Attract and retain tenants with unique amenities

**Community Wellbeing**
• Fresh, hyperlocal produce within steps of where people live and work
• Reduced stress and improved mental health through biophilic design
• Team-building and educational programming
• Connection to nature in urban environments

**ESG & Sustainability**
• Measurable sustainability metrics for reporting
• Demonstrable commitment to corporate responsibility
• Support for UN Sustainable Development Goals
• Enhanced brand reputation`,
  },
  {
    patterns: ['where do you operate', 'locations', 'cities', 'which cities', 'where are you', 'coverage'],
    response: `MicroHabitat operates across North America and Europe:

**North America**
• Montreal (Headquarters) - Our home since 2016
• Toronto - Major presence in Canada's largest city
• Vancouver - Serving the Pacific Northwest
• New York - Our US hub
• Chicago - Midwest operations
• Boston, Philadelphia, Washington DC

**Europe**
• Paris - European headquarters
• Amsterdam - Benelux operations
• Brussels - Growing presence
• London - UK market

We're constantly expanding to new cities. If you're in a city not listed, contact us—we may already be planning expansion there or can discuss possibilities.

Find your nearest location at www.microhabitat.com/cities`,
  },
  {
    patterns: ['cost', 'price', 'pricing', 'how much', 'expensive', 'affordable'],
    response: `MicroHabitat pricing varies based on project scope, but we design solutions for various budgets:

**Factors that affect pricing:**
• Size of the space (square footage)
• Indoor vs. outdoor installation
• Complexity of design
• Level of ongoing maintenance needed
• Educational programming requirements

**What's included:**
• Custom design and consultation
• All materials, soil, and plants
• Professional installation
• Regular maintenance visits
• Harvesting and produce delivery
• Seasonal replanting

We offer flexible arrangements from one-time installations to full-service annual contracts. Many clients find the ROI compelling—property value increases, tenant attraction, and certification credits often offset the investment.

For a custom quote, book a free consultation at www.microhabitat.com or email info@microhabitat.com.`,
  },
  {
    patterns: ['certification', 'leed', 'well', 'boma', 'green building'],
    response: `MicroHabitat farms help buildings earn points toward major green building certifications:

**LEED (Leadership in Energy & Environmental Design)**
• Sustainable Sites credits
• Water Efficiency credits
• Innovation credits
• Up to 8+ points possible

**WELL Building Standard**
• Nourishment concept credits
• Mind concept credits
• Community concept credits

**BOMA BEST**
• Environmental performance points
• Tenant engagement credits
• Innovation recognition

**Fitwel**
• Access to healthy food
• Outdoor spaces
• Community engagement

We provide documentation and support for certification applications. Our team understands the requirements and can help maximize the credits your project earns.

Learn more about certifications at www.microhabitat.com/certifications`,
  },
  {
    patterns: ['contact', 'email', 'phone', 'reach', 'talk to someone', 'human', 'representative'],
    response: `You can reach the MicroHabitat team several ways:

**Email:** info@microhabitat.com
**Website:** www.microhabitat.com

**Office Locations:**

Montreal (HQ)
5333 Casgrain Ave, Suite 102
Montreal, QC H2T 1X3

Toronto
180 John Street, Suite 402
Toronto, ON M5T 1X5

New York
1123 Broadway, Suite 1012
New York, NY 10010

Paris
25 Rue du Petit Musc
75004 Paris, France

**Book a Demo**
Schedule a free consultation directly at www.microhabitat.com - click "Book a Demo" to find a time that works for you.

You can also click "Contact a Representative" below to start a live chat with our team!`,
  },
  {
    patterns: ['maintenance', 'who maintains', 'take care', 'upkeep'],
    response: `MicroHabitat provides full-service maintenance—you don't need to lift a finger:

**What we handle:**
• Regular watering and irrigation management
• Soil health and fertilization
• Pest management (organic methods only)
• Seasonal planting and crop rotation
• Harvesting at peak freshness
• Pruning and plant care
• Equipment maintenance
• Winter preparation (for outdoor farms)

**Visit frequency:**
Depending on your package, our farmers visit weekly or bi-weekly. During peak growing season, we may visit more frequently to ensure optimal harvests.

**Your involvement:**
You can be as hands-on or hands-off as you like. Many clients enjoy participating in occasional workshops or harvests, while others prefer to simply receive fresh produce deliveries.

**Emergency support:**
If issues arise between visits, our team responds quickly to protect your investment.`,
  },
  {
    patterns: ['produce', 'vegetables', 'what do you grow', 'harvest', 'crops', 'food'],
    response: `MicroHabitat farms grow a diverse range of fresh produce:

**Vegetables**
• Leafy greens (lettuce, kale, spinach, arugula)
• Tomatoes (cherry, heirloom varieties)
• Peppers (bell, hot varieties)
• Cucumbers and zucchini
• Beans and peas
• Root vegetables (carrots, radishes, beets)

**Herbs**
• Basil, mint, cilantro, parsley
• Rosemary, thyme, oregano
• Chives, dill, sage
• Specialty herbs on request

**Edible Flowers**
• Nasturtiums, pansies, marigolds
• Borage, calendula, lavender

**What we grow depends on:**
• Your location and climate
• Available sunlight
• Indoor vs. outdoor setting
• Your preferences and requests
• Season (though indoor farms produce year-round)

All produce is grown organically without synthetic pesticides or fertilizers. Harvests are delivered fresh, often within hours of picking.`,
  },
];

// Find a curated response that matches the question
export function findCuratedResponse(question: string): string | null {
  const q = question.toLowerCase().trim();

  for (const curated of CURATED_RESPONSES) {
    for (const pattern of curated.patterns) {
      if (q.includes(pattern.toLowerCase())) {
        return curated.response;
      }
    }
  }

  return null;
}

// General greeting responses
export function isGreeting(message: string): boolean {
  const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'bonjour', 'salut'];
  const m = message.toLowerCase().trim();
  return greetings.some(g => m === g || m.startsWith(g + ' ') || m.startsWith(g + '!') || m.startsWith(g + ','));
}

export const GREETING_RESPONSE = `Hello! I'm the MicroHabitat assistant. I can help you learn about our urban farming services, locations, pricing, and more.

Here are some things you can ask me:
• What is MicroHabitat?
• What services do you offer?
• How do I get started?
• What are the benefits of urban farming?
• Where do you operate?

Or click "Contact a Representative" below to chat with our team directly!`;

// Fallback response when we can't find a good answer
export const FALLBACK_RESPONSE = `I'm not sure I have a specific answer to that question. Here are some ways I can help:

• Ask about our services (outdoor farms, indoor farms, educational programs)
• Learn about our locations and coverage
• Understand the benefits and ROI of urban farming
• Get information about green building certifications

For personalized assistance, click "Contact a Representative" below to chat with our team, or email us at info@microhabitat.com.`;
