/**
 * Seed Script: Populate CMS content
 *
 * Usage: node scripts/seed-content.mjs
 *
 * Make sure Strapi is running on localhost:1337
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';

const locales = ['en', 'fr', 'de', 'nl', 'it', 'es'];

async function updateContent(endpoint, locale, data) {
  const url = `${STRAPI_URL}/api/${endpoint}?locale=${locale}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ Failed ${endpoint} (${locale}):`, error.substring(0, 100));
      return false;
    }

    console.log(`✓ ${endpoint} (${locale})`);
    return true;
  } catch (error) {
    console.error(`❌ Error ${endpoint} (${locale}):`, error.message);
    return false;
  }
}

// Content data for all locales
const content = {
  'about-page': {
    en: {
      heroLabel: 'About Us',
      heroTitle: 'About',
      heroTitleHighlight: 'Microhabitat',
      missionLabel: 'Our Mission',
      missionTitle: 'Transforming cities through urban agriculture',
      missionParagraph1: 'Microhabitat transforms underused urban spaces into productive ecological farms, reconnecting communities with nature and fresh, local food. Through regenerative agriculture and innovative design, we help businesses and cities meet sustainability goals, improve well-being, and build climate resilience.',
      missionParagraph2: 'Join us in cultivating healthier, more sustainable urban environments—one rooftop at a time.',
      solidarityLabel: 'Urban Solidarity Farms',
      solidarityTitle: 'Nourishing communities',
      solidarityParagraph1: 'At Microhabitat, we believe urban farming should nourish more than just buildings—it should nourish communities. As part of our program, clients have the option to donate the fresh produce grown on their sites to local food banks and community kitchens.',
      solidaritySubtitle: 'Fighting Hunger, One Pot at a Time',
      solidarityParagraph2: 'Every Microhabitat pot sold supports Team No Kid Hungry and The Breakfast Club of Canada. For each individual pot we set up, we donate 1 to 3 meals to help ensure children across North America have access to nutritious food—because growing healthy communities starts with feeding them.',
      impactLabel: 'Our Impact',
      impactTitle: 'Growing impact across North America and Europe',
      foodbanksLabel: 'Foodbanks Supported',
      storyLabel: 'Our Story',
      storyTitle: 'From Montreal to the world',
      storyParagraph1: 'The Microhabitat team has been fostering change since 2016. It started when two childhood friends from Montreal, Orlane and Alexandre, decided to start a venture to change the cities around the globe by reducing food insecurity with urban agriculture.',
      storyParagraph2: 'The team now operates the largest network of urban farms in the world, across multiple locations in North America and Europe.',
      ctaTitle: 'Ready to grow with us?',
      ctaDescription: 'Join 250+ properties already transforming their spaces with MicroHabitat.',
      impactStats: [
        { value: '250+', label: 'Urban Farms' },
        { value: '35+', label: 'Food Banks' },
        { value: '40k', label: 'Portions Donated' },
        { value: '13k', label: 'Funded Meals' },
        { value: '59.4k', label: 'Lbs Harvested' },
      ],
    },
    fr: {
      heroLabel: 'À propos',
      heroTitle: 'À propos de',
      heroTitleHighlight: 'Microhabitat',
      missionLabel: 'Notre Mission',
      missionTitle: 'Transformer les villes grâce à l\'agriculture urbaine',
      missionParagraph1: 'Microhabitat transforme les espaces urbains sous-utilisés en fermes écologiques productives, reconnectant les communautés avec la nature et les aliments frais et locaux.',
      missionParagraph2: 'Rejoignez-nous pour cultiver des environnements urbains plus sains et durables.',
      solidarityLabel: 'Fermes Urbaines Solidaires',
      solidarityTitle: 'Nourrir les communautés',
      solidarityParagraph1: 'Chez Microhabitat, nous croyons que l\'agriculture urbaine devrait nourrir plus que des bâtiments—elle devrait nourrir des communautés.',
      solidaritySubtitle: 'Combattre la faim, un pot à la fois',
      solidarityParagraph2: 'Chaque pot Microhabitat vendu soutient Team No Kid Hungry et le Club des petits déjeuners du Canada.',
      impactLabel: 'Notre Impact',
      impactTitle: 'Un impact croissant en Amérique du Nord et en Europe',
      foodbanksLabel: 'Banques alimentaires soutenues',
      storyLabel: 'Notre Histoire',
      storyTitle: 'De Montréal au monde',
      storyParagraph1: 'L\'équipe Microhabitat favorise le changement depuis 2016.',
      storyParagraph2: 'L\'équipe exploite maintenant le plus grand réseau de fermes urbaines au monde.',
      ctaTitle: 'Prêt à grandir avec nous?',
      ctaDescription: 'Rejoignez plus de 250 propriétés qui transforment déjà leurs espaces.',
      impactStats: [
        { value: '250+', label: 'Fermes Urbaines' },
        { value: '35+', label: 'Banques Alimentaires' },
        { value: '40k', label: 'Portions Données' },
        { value: '13k', label: 'Repas Financés' },
        { value: '59.4k', label: 'Lbs Récoltées' },
      ],
    },
  },
  'outdoor-farm-page': {
    en: {
      heroLabel: 'Services',
      heroTitle: 'Outdoor Farms',
      heroDescription: 'Transform your rooftops, terraces, and outdoor spaces into productive urban farms that generate impact, engage communities, and support sustainability goals.',
      servicesLabel: 'What We Offer',
      servicesTitle: 'Comprehensive outdoor farming services',
      services: [
        { title: 'Turnkey Urban Farm Installations', description: 'We provide all materials, labor, and expertise to set up your outdoor farm—no prior experience or in-house resources needed.' },
        { title: 'Weekly Garden Care & Harvesting', description: 'Our team handles everything from planting and weeding to pest management and harvesting.' },
        { title: 'Ecological Growing Practices', description: 'We grow using regenerative, organic methods—no synthetic chemicals, pesticides, or fertilizers.' },
      ],
      galleryLabel: 'Our Work',
      galleryTitle: 'Outdoor farms in action',
      packagesLabel: 'Packages',
      packagesTitle: 'Choose your farm size',
      packages: [
        { name: '30 Pots', features: ['30 fabric grow pots', 'Ecological irrigation system', 'Seasonal planting', 'Weekly maintenance visits', 'Harvesting and delivery', '2 educational activities', 'Marketing toolkit'] },
        { name: '50 Pots', features: ['50 fabric grow pots', 'Ecological irrigation system', 'Seasonal planting', 'Weekly maintenance visits', 'Harvesting and delivery', '3 educational activities', 'Marketing toolkit', 'Corporate gift options'] },
        { name: 'Custom', features: ['Custom pot configuration', 'Ecological irrigation system', 'Seasonal planting', 'Weekly maintenance visits', 'Harvesting and delivery', 'Unlimited activities', 'Full marketing support', 'Corporate gift options', 'Dedicated account manager'] },
      ],
      requirementsLabel: 'Requirements',
      requirementsTitle: 'Is Your Property Suitable?',
      requirementsDescription: 'Most outdoor spaces can host an urban farm. Here\'s what we look for:',
      requirements: [
        { title: 'Space', description: 'Minimum 200 sq ft (20m²) of accessible area' },
        { title: 'Sunlight', description: 'At least 6 hours of direct sunlight daily' },
        { title: 'Water', description: 'Access to a water source nearby' },
        { title: 'Access', description: 'Safe access for our maintenance team' },
      ],
      requirementsCardTitle: 'Not sure if your space qualifies?',
      requirementsCardDescription: 'Book a free site assessment with our team.',
      ctaTitle: 'Ready to transform your outdoor space?',
      ctaDescription: 'Join 250+ properties already growing with MicroHabitat.',
    },
    fr: {
      heroLabel: 'Services',
      heroTitle: 'Fermes Extérieures',
      heroDescription: 'Transformez vos toits, terrasses et espaces extérieurs en fermes urbaines productives.',
      servicesLabel: 'Ce que nous offrons',
      servicesTitle: 'Services complets d\'agriculture extérieure',
      services: [
        { title: 'Installations clés en main', description: 'Nous fournissons tout le matériel, la main-d\'œuvre et l\'expertise.' },
        { title: 'Entretien et récolte hebdomadaires', description: 'Notre équipe s\'occupe de tout.' },
        { title: 'Pratiques écologiques', description: 'Nous cultivons en utilisant des méthodes régénératives et biologiques.' },
      ],
      galleryLabel: 'Notre Travail',
      galleryTitle: 'Fermes extérieures en action',
      packagesLabel: 'Forfaits',
      packagesTitle: 'Choisissez la taille de votre ferme',
      packages: [
        { name: '30 Pots', features: ['30 pots de culture en tissu', 'Système d\'irrigation écologique', 'Plantation saisonnière', 'Visites d\'entretien hebdomadaires'] },
        { name: '50 Pots', features: ['50 pots de culture en tissu', 'Système d\'irrigation écologique', 'Plantation saisonnière', 'Visites d\'entretien hebdomadaires'] },
        { name: 'Sur mesure', features: ['Configuration personnalisée', 'Système d\'irrigation écologique', 'Plantation saisonnière'] },
      ],
      requirementsLabel: 'Exigences',
      requirementsTitle: 'Votre propriété est-elle adaptée?',
      requirementsDescription: 'La plupart des espaces extérieurs peuvent accueillir une ferme urbaine.',
      requirements: [
        { title: 'Espace', description: 'Minimum 200 pi² (20m²) d\'espace accessible' },
        { title: 'Ensoleillement', description: 'Au moins 6 heures de soleil direct par jour' },
        { title: 'Eau', description: 'Accès à une source d\'eau à proximité' },
        { title: 'Accès', description: 'Accès sécuritaire pour notre équipe' },
      ],
      requirementsCardTitle: 'Pas sûr si votre espace est qualifié?',
      requirementsCardDescription: 'Réservez une évaluation gratuite.',
      ctaTitle: 'Prêt à transformer votre espace extérieur?',
      ctaDescription: 'Rejoignez plus de 250 propriétés.',
    },
  },
  'careers-page': {
    en: {
      heroLabel: 'Careers',
      heroTitle: 'Grow your career with MicroHabitat',
      heroDescription: 'Join our team of urban farmers, sustainability experts, and community builders.',
      valuesLabel: 'Our Values',
      valuesTitle: 'What drives us',
      values: [
        { title: 'Sustainability First', description: 'We\'re committed to regenerative practices that heal the planet.' },
        { title: 'Community Focused', description: 'Everything we do brings people together around fresh, local food.' },
        { title: 'Impact Driven', description: 'We measure success by the positive change we create.' },
        { title: 'Innovation Minded', description: 'We\'re constantly finding new ways to make urban farming accessible.' },
      ],
      whyJoinLabel: 'Why Join Us',
      whyJoinTitle: 'More than a job',
      whyJoinDescription: 'At MicroHabitat, you\'ll be part of a team making a real difference.',
      whyJoinBenefits: ['Work outdoors with plants and nature', 'Make a tangible impact on food security', 'Join a diverse, passionate team', 'Grow your skills and career'],
      openingsTitle: 'Current Openings',
      openingsDescription: 'We\'re always looking for passionate people to join our team.',
      locationsLabel: 'Our Locations',
      locationsTitle: 'Where we work',
      offices: [
        { name: 'Montreal', type: 'Headquarters', city: 'Montreal', country: 'Canada' },
        { name: 'Toronto', type: 'Regional Office', city: 'Toronto', country: 'Canada' },
        { name: 'New York', type: 'US Office', city: 'New York', country: 'USA' },
        { name: 'Paris', type: 'European Office', city: 'Paris', country: 'France' },
      ],
      ctaTitle: 'Ready to make a difference?',
      ctaDescription: 'Join our growing team and help us transform urban spaces.',
    },
    fr: {
      heroLabel: 'Carrières',
      heroTitle: 'Développez votre carrière avec MicroHabitat',
      heroDescription: 'Rejoignez notre équipe d\'agriculteurs urbains et d\'experts en durabilité.',
      valuesLabel: 'Nos Valeurs',
      valuesTitle: 'Ce qui nous motive',
      values: [
        { title: 'Durabilité avant tout', description: 'Nous sommes engagés dans des pratiques régénératives.' },
        { title: 'Axé sur la communauté', description: 'Tout ce que nous faisons rassemble les gens.' },
        { title: 'Orienté impact', description: 'Nous mesurons le succès par le changement positif.' },
        { title: 'Esprit d\'innovation', description: 'Nous trouvons constamment de nouvelles façons.' },
      ],
      whyJoinLabel: 'Pourquoi nous rejoindre',
      whyJoinTitle: 'Plus qu\'un emploi',
      whyJoinDescription: 'Chez MicroHabitat, vous ferez partie d\'une équipe qui fait la différence.',
      whyJoinBenefits: ['Travaillez en plein air avec les plantes', 'Ayez un impact tangible', 'Rejoignez une équipe passionnée', 'Développez vos compétences'],
      openingsTitle: 'Postes ouverts',
      openingsDescription: 'Nous recherchons toujours des personnes passionnées.',
      locationsLabel: 'Nos emplacements',
      locationsTitle: 'Où nous travaillons',
      offices: [
        { name: 'Montréal', type: 'Siège social', city: 'Montréal', country: 'Canada' },
        { name: 'Toronto', type: 'Bureau régional', city: 'Toronto', country: 'Canada' },
        { name: 'New York', type: 'Bureau américain', city: 'New York', country: 'États-Unis' },
        { name: 'Paris', type: 'Bureau européen', city: 'Paris', country: 'France' },
      ],
      ctaTitle: 'Prêt à faire la différence?',
      ctaDescription: 'Rejoignez notre équipe en croissance.',
    },
  },
  'contact-page': {
    en: {
      heroLabel: 'Contact',
      heroTitle: 'Contact',
      heroTitleHighlight: 'Us',
      heroDescription: 'Have questions about urban farming? We\'d love to hear from you.',
      email: 'info@microhabitat.com',
      phone: '+1 (514) 123-4567',
      locationsDescription: '20+ cities worldwide',
      officesLabel: 'Our Offices',
      officesTitle: 'Our Headquarters',
      offices: [
        { name: 'Montreal', type: 'Headquarters', address: '123 Urban Farm St', city: 'Montreal', country: 'Canada' },
        { name: 'New York', type: 'US Office', address: '456 Green St', city: 'New York', country: 'USA' },
        { name: 'Toronto', type: 'Regional Office', address: '789 Rooftop Ave', city: 'Toronto', country: 'Canada' },
      ],
      formLabel: 'Get in Touch',
      formTitle: 'Send us a message',
      formDescription: 'Fill out the form below and we\'ll get back to you.',
      quickLinksReadyTitle: 'Ready to get started?',
      quickLinksReadyDescription: 'Book a free demo to learn how urban farming can transform your property.',
      quickLinksQuestionsTitle: 'Have questions?',
      quickLinksQuestionsDescription: 'Check our FAQ for answers.',
      quickLinksExploreTitle: 'Explore our cities',
      quickLinksExploreDescription: 'See where MicroHabitat is growing.',
    },
    fr: {
      heroLabel: 'Contact',
      heroTitle: 'Contactez',
      heroTitleHighlight: 'Nous',
      heroDescription: 'Des questions sur l\'agriculture urbaine? Nous aimerions vous entendre.',
      email: 'info@microhabitat.com',
      phone: '+1 (514) 123-4567',
      locationsDescription: '20+ villes dans le monde',
      officesLabel: 'Nos Bureaux',
      officesTitle: 'Notre Siège Social',
      offices: [
        { name: 'Montréal', type: 'Siège social', address: '123 rue Ferme Urbaine', city: 'Montréal', country: 'Canada' },
        { name: 'New York', type: 'Bureau américain', address: '456 rue Verte', city: 'New York', country: 'États-Unis' },
        { name: 'Toronto', type: 'Bureau régional', address: '789 ave du Toit', city: 'Toronto', country: 'Canada' },
      ],
      formLabel: 'Nous Contacter',
      formTitle: 'Envoyez-nous un message',
      formDescription: 'Remplissez le formulaire et nous vous répondrons.',
      quickLinksReadyTitle: 'Prêt à commencer?',
      quickLinksReadyDescription: 'Réservez une démo gratuite.',
      quickLinksQuestionsTitle: 'Des questions?',
      quickLinksQuestionsDescription: 'Consultez notre FAQ.',
      quickLinksExploreTitle: 'Explorez nos villes',
      quickLinksExploreDescription: 'Voyez où MicroHabitat se développe.',
    },
  },
};

async function seedAll() {
  console.log('🌱 Seeding CMS content...\n');

  for (const [endpoint, localeData] of Object.entries(content)) {
    for (const locale of locales) {
      const data = localeData[locale] || localeData['en'];
      if (data) {
        await updateContent(endpoint, locale, data);
      }
    }
  }

  console.log('\n✅ Seeding complete!');
  console.log('\nNote: Only EN and FR content provided. Other locales use EN fallback.');
  console.log('Add translations to the content object for DE, NL, IT, ES as needed.');
}

seedAll().catch(console.error);
