/**
 * Seed French (fr) and Dutch (nl) translations for all CMS content
 * Run with: bun run scripts/seed-translations.ts
 */

import { getPayload } from 'payload';
import config from '../payload.config';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ===========================================
// TRANSLATIONS DATA
// ===========================================

// Stats translations
const statsTranslations = {
  en: [
    { label: 'Urban Farms', description: 'Active urban farming installations across our network' },
    { label: 'Cities', description: 'Cities where MicroHabitat operates' },
    { label: 'Pounds Harvested', description: 'Total produce harvested annually' },
    { label: 'Pounds Donated', description: 'Food donated to local food banks' },
  ],
  fr: [
    { label: 'Fermes Urbaines', description: 'Installations actives de fermes urbaines dans notre réseau' },
    { label: 'Villes', description: 'Villes où MicroHabitat opère' },
    { label: 'Livres Récoltées', description: 'Production totale récoltée annuellement' },
    { label: 'Livres Données', description: 'Nourriture donnée aux banques alimentaires locales' },
  ],
  nl: [
    { label: 'Stadsboerderijen', description: 'Actieve stadslandbouw-installaties in ons netwerk' },
    { label: 'Steden', description: 'Steden waar MicroHabitat actief is' },
    { label: 'Pond Geoogst', description: 'Totale jaarlijkse oogst' },
    { label: 'Pond Gedoneerd', description: 'Voedsel gedoneerd aan lokale voedselbanken' },
  ],
};

// Services translations
const servicesTranslations = {
  en: [
    {
      title: 'Outdoor Farms',
      description: 'Transform rooftops, terraces, and ground-level spaces into thriving ecological gardens.',
      features: ['Rooftop installations', 'Terrace gardens', 'Ground-level farms', 'Seasonal produce'],
    },
    {
      title: 'Indoor Farms',
      description: 'Year-round growing solutions with our innovative indoor vertical farming systems.',
      features: ['Vertical systems', 'LED growing', 'Climate controlled', 'Year-round harvest'],
    },
    {
      title: 'Educational Activities',
      description: 'Engage your community with hands-on workshops and educational programming.',
      features: ['Workshops', 'School programs', 'Team building', 'Sustainability training'],
    },
  ],
  fr: [
    {
      title: 'Fermes Extérieures',
      description: 'Transformez les toits, terrasses et espaces au sol en jardins écologiques florissants.',
      features: ['Installations sur toit', 'Jardins en terrasse', 'Fermes au sol', 'Produits saisonniers'],
    },
    {
      title: 'Fermes Intérieures',
      description: 'Solutions de culture toute l\'année avec nos systèmes innovants de culture verticale.',
      features: ['Systèmes verticaux', 'Culture LED', 'Climat contrôlé', 'Récolte toute l\'année'],
    },
    {
      title: 'Activités Éducatives',
      description: 'Engagez votre communauté avec des ateliers pratiques et des programmes éducatifs.',
      features: ['Ateliers', 'Programmes scolaires', 'Team building', 'Formation durabilité'],
    },
  ],
  nl: [
    {
      title: 'Buitenboerderijen',
      description: 'Transformeer daken, terrassen en grondruimtes in bloeiende ecologische tuinen.',
      features: ['Dakinstallaties', 'Terrrastuinen', 'Grondtuinen', 'Seizoensproducten'],
    },
    {
      title: 'Binnenboerderijen',
      description: 'Jaarrond groeioplossingen met onze innovatieve verticale landbouwsystemen.',
      features: ['Verticale systemen', 'LED-kweek', 'Klimaatgestuurd', 'Jaarrond oogst'],
    },
    {
      title: 'Educatieve Activiteiten',
      description: 'Betrek uw gemeenschap met praktische workshops en educatieve programma\'s.',
      features: ['Workshops', 'Schoolprogramma\'s', 'Teambuilding', 'Duurzaamheidstraining'],
    },
  ],
};

// Testimonials translations
const testimonialsTranslations = {
  en: [
    { quote: 'MicroHabitat transformed our rooftop into a thriving urban oasis. Our employees love the fresh produce and the educational workshops.', author: 'Sarah Chen', role: 'Sustainability Director', company: 'TechCorp Inc.' },
    { quote: 'The impact on our building\'s LEED certification was immediate. MicroHabitat\'s team made the entire process seamless.', author: 'Michael Roberts', role: 'Property Manager', company: 'Urban Realty Group' },
    { quote: 'Our students are learning about sustainability firsthand. The educational program has been transformative for our curriculum.', author: 'Dr. Emily Watson', role: 'Principal', company: 'Greenview Academy' },
    { quote: 'Working with MicroHabitat helped us achieve our ESG goals while creating a beautiful space for our community.', author: 'James Park', role: 'CEO', company: 'Sustainable Ventures' },
    { quote: 'The quality of produce and the professionalism of the team exceeded all our expectations.', author: 'Lisa Thompson', role: 'Food Services Director', company: 'Metro Hospital' },
    { quote: 'MicroHabitat\'s urban farm has become the heart of our community engagement initiatives.', author: 'David Martinez', role: 'Community Manager', company: 'Riverside Commons' },
    { quote: 'An incredible partnership that delivers real environmental impact and tangible business value.', author: 'Jennifer Lee', role: 'VP Sustainability', company: 'Global Finance Corp' },
    { quote: 'The fresh herbs and vegetables from our rooftop farm have elevated our restaurant\'s menu significantly.', author: 'Chef Antoine Dubois', role: 'Executive Chef', company: 'Le Jardin Restaurant' },
  ],
  fr: [
    { quote: 'MicroHabitat a transformé notre toit en une oasis urbaine florissante. Nos employés adorent les produits frais et les ateliers éducatifs.', author: 'Sarah Chen', role: 'Directrice Développement Durable', company: 'TechCorp Inc.' },
    { quote: 'L\'impact sur la certification LEED de notre bâtiment a été immédiat. L\'équipe MicroHabitat a rendu le processus fluide.', author: 'Michael Roberts', role: 'Gestionnaire Immobilier', company: 'Urban Realty Group' },
    { quote: 'Nos étudiants apprennent la durabilité de première main. Le programme éducatif a transformé notre curriculum.', author: 'Dr. Emily Watson', role: 'Directrice', company: 'Greenview Academy' },
    { quote: 'Travailler avec MicroHabitat nous a aidés à atteindre nos objectifs ESG tout en créant un bel espace communautaire.', author: 'James Park', role: 'PDG', company: 'Sustainable Ventures' },
    { quote: 'La qualité des produits et le professionnalisme de l\'équipe ont dépassé toutes nos attentes.', author: 'Lisa Thompson', role: 'Directrice Services Alimentaires', company: 'Metro Hospital' },
    { quote: 'La ferme urbaine de MicroHabitat est devenue le cœur de nos initiatives d\'engagement communautaire.', author: 'David Martinez', role: 'Responsable Communautaire', company: 'Riverside Commons' },
    { quote: 'Un partenariat incroyable qui génère un impact environnemental réel et une valeur commerciale tangible.', author: 'Jennifer Lee', role: 'VP Développement Durable', company: 'Global Finance Corp' },
    { quote: 'Les herbes fraîches et légumes de notre ferme sur toit ont considérablement élevé le menu de notre restaurant.', author: 'Chef Antoine Dubois', role: 'Chef Exécutif', company: 'Le Jardin Restaurant' },
  ],
  nl: [
    { quote: 'MicroHabitat heeft ons dak getransformeerd tot een bloeiende stedelijke oase. Onze medewerkers zijn dol op de verse producten en workshops.', author: 'Sarah Chen', role: 'Directeur Duurzaamheid', company: 'TechCorp Inc.' },
    { quote: 'De impact op de LEED-certificering van ons gebouw was onmiddellijk. Het team van MicroHabitat maakte het proces naadloos.', author: 'Michael Roberts', role: 'Vastgoedbeheerder', company: 'Urban Realty Group' },
    { quote: 'Onze studenten leren uit eerste hand over duurzaamheid. Het educatieve programma heeft ons curriculum getransformeerd.', author: 'Dr. Emily Watson', role: 'Directeur', company: 'Greenview Academy' },
    { quote: 'Samenwerken met MicroHabitat hielp ons onze ESG-doelen te bereiken en een mooie ruimte te creëren voor onze gemeenschap.', author: 'James Park', role: 'CEO', company: 'Sustainable Ventures' },
    { quote: 'De kwaliteit van de producten en het professionalisme van het team overtroffen al onze verwachtingen.', author: 'Lisa Thompson', role: 'Directeur Voedingsdiensten', company: 'Metro Hospital' },
    { quote: 'De stadsboerderij van MicroHabitat is het hart geworden van onze community engagement initiatieven.', author: 'David Martinez', role: 'Community Manager', company: 'Riverside Commons' },
    { quote: 'Een ongelooflijke samenwerking die echte milieu-impact en tastbare bedrijfswaarde oplevert.', author: 'Jennifer Lee', role: 'VP Duurzaamheid', company: 'Global Finance Corp' },
    { quote: 'De verse kruiden en groenten van onze dakboerderij hebben het menu van ons restaurant aanzienlijk verbeterd.', author: 'Chef Antoine Dubois', role: 'Executive Chef', company: 'Le Jardin Restaurant' },
  ],
};

// Cities translations (name stays same, country translates)
const citiesTranslations = {
  en: {
    'Canada': 'Canada',
    'United States': 'United States',
    'Netherlands': 'Netherlands',
    'Germany': 'Germany',
    'United Kingdom': 'United Kingdom',
    'France': 'France',
    'Switzerland': 'Switzerland',
  },
  fr: {
    'Canada': 'Canada',
    'United States': 'États-Unis',
    'Netherlands': 'Pays-Bas',
    'Germany': 'Allemagne',
    'United Kingdom': 'Royaume-Uni',
    'France': 'France',
    'Switzerland': 'Suisse',
  },
  nl: {
    'Canada': 'Canada',
    'United States': 'Verenigde Staten',
    'Netherlands': 'Nederland',
    'Germany': 'Duitsland',
    'United Kingdom': 'Verenigd Koninkrijk',
    'France': 'Frankrijk',
    'Switzerland': 'Zwitserland',
  },
};

// FAQ translations
const faqTranslations = {
  en: {
    categories: {
      'General Urban Farming Queries': 'General Urban Farming Queries',
      'About Us': 'About Us',
      'Technical': 'Technical',
      'Products and Services': 'Products and Services',
      'Engagement': 'Engagement',
      'Getting Started': 'Getting Started',
      'Safety': 'Safety',
    },
    items: [
      { q: 'Why would someone integrate urban farming?', a: 'Integrating urban farming brings social and environmental advantages including fresh produce access, educational opportunities, community engagement, biodiversity support, and green building certifications.' },
      { q: 'What is the first step to define if my building can welcome a program?', a: 'Conduct a free site evaluation with our team during a virtual meeting to evaluate space, sunlight exposure, water access, and structural integrity.' },
      { q: 'How do I know if my building is suitable?', a: 'Requirements include at least 200 sq ft of space, minimum 6 hours of sunlight daily, accessible water sources, and safe roof access if applicable.' },
      { q: 'Can I get green building certification points?', a: 'Yes! Our programs support LEED, BOMA, BOMA BEST, GRESB, Fitwel, and WELL certifications.' },
      { q: 'Do you offer indoor solutions?', a: 'Yes, MicroHabitat offers indoor units with year-long growth through our turn-key solution.' },
      { q: 'Why was MicroHabitat created?', a: 'To address urban food insecurity by transforming underutilized city spaces into productive ecological gardens.' },
      { q: 'What is the history of MicroHabitat?', a: 'Established in Montreal in 2016, now the largest urban farms network in North America.' },
      { q: 'Where is MicroHabitat implemented?', a: 'Across North America and Europe on rooftops, terraces, and ground spaces in over 20 major cities.' },
      { q: 'Is MicroHabitat a franchise?', a: 'No, we are a single company with full-time employees across multiple regions.' },
      { q: 'Does installation modify my building?', a: 'No permanent changes. Our grow pots require no drilling or digging.' },
      { q: 'How much space do I need?', a: 'Minimum 200 sq ft for outdoor farms. Indoor solutions work with smaller spaces.' },
      { q: 'Is it safe on roofs?', a: 'Our ultra-light grow pots typically don\'t compromise roof load capacity.' },
      { q: 'What insurance do you offer?', a: 'Liability coverage of 5 million dollars for commercial, automobile and excess liability.' },
      { q: 'How does the program work?', a: 'Turn-key programs include installation, irrigation, planting, maintenance, harvesting, educational activities, and marketing tools.' },
      { q: 'What is included?', a: 'Installation, irrigation system, seasonal planting, weekly maintenance, harvesting, educational activities, marketing tools, and corporate gifts.' },
      { q: 'What happens with the produce?', a: 'Options include internal distribution or donation to local food banks through our Urban Solidarity Farms program.' },
      { q: 'How do you engage occupants?', a: 'Minimum two educational activities covering ecological farming, seed saving, composting, and sustainability.' },
      { q: 'What types of activities?', a: 'Interactive kiosks, guided garden visits, and educational workshops customized to your needs.' },
      { q: 'Do you offer online activities?', a: 'Yes, virtual workshops on farming, maintenance, winterization, seed saving, and pollinator support.' },
      { q: 'How do I get started?', a: 'Book a demo through our website for a free consultation to discuss your goals and assess your property.' },
      { q: 'What is the installation timeline?', a: 'Installation typically occurs within 4-6 weeks after signing, coordinated with your schedule.' },
      { q: 'Do occupants need access?', a: 'Access is not required but may be desired for engagement or green building certification credits.' },
      { q: 'How do you ensure roof safety?', a: 'Minimum safety clearance per local guidelines with gardens contained away from roof edges.' },
    ],
  },
  fr: {
    categories: {
      'General Urban Farming Queries': 'Questions Générales sur l\'Agriculture Urbaine',
      'About Us': 'À Propos de Nous',
      'Technical': 'Technique',
      'Products and Services': 'Produits et Services',
      'Engagement': 'Engagement',
      'Getting Started': 'Pour Commencer',
      'Safety': 'Sécurité',
    },
    items: [
      { q: 'Pourquoi intégrer l\'agriculture urbaine?', a: 'L\'intégration de l\'agriculture urbaine apporte des avantages sociaux et environnementaux incluant l\'accès aux produits frais, des opportunités éducatives, l\'engagement communautaire, le soutien à la biodiversité et les certifications de bâtiments verts.' },
      { q: 'Quelle est la première étape pour savoir si mon bâtiment peut accueillir un programme?', a: 'Effectuez une évaluation gratuite du site avec notre équipe lors d\'une réunion virtuelle pour évaluer l\'espace, l\'exposition au soleil, l\'accès à l\'eau et l\'intégrité structurelle.' },
      { q: 'Comment savoir si mon bâtiment est adapté?', a: 'Les exigences incluent au moins 200 pi² d\'espace, minimum 6 heures de soleil par jour, des sources d\'eau accessibles et un accès sécuritaire au toit si applicable.' },
      { q: 'Puis-je obtenir des points de certification de bâtiment vert?', a: 'Oui! Nos programmes supportent les certifications LEED, BOMA, BOMA BEST, GRESB, Fitwel et WELL.' },
      { q: 'Offrez-vous des solutions intérieures?', a: 'Oui, MicroHabitat offre des unités intérieures avec croissance toute l\'année grâce à notre solution clé en main.' },
      { q: 'Pourquoi MicroHabitat a-t-il été créé?', a: 'Pour répondre à l\'insécurité alimentaire urbaine en transformant les espaces sous-utilisés en jardins écologiques productifs.' },
      { q: 'Quelle est l\'histoire de MicroHabitat?', a: 'Établi à Montréal en 2016, maintenant le plus grand réseau de fermes urbaines en Amérique du Nord.' },
      { q: 'Où MicroHabitat est-il implanté?', a: 'À travers l\'Amérique du Nord et l\'Europe sur les toits, terrasses et espaces au sol dans plus de 20 grandes villes.' },
      { q: 'MicroHabitat est-il une franchise?', a: 'Non, nous sommes une entreprise unique avec des employés à temps plein dans plusieurs régions.' },
      { q: 'L\'installation modifie-t-elle mon bâtiment?', a: 'Aucun changement permanent. Nos bacs de culture ne nécessitent ni perçage ni excavation.' },
      { q: 'De combien d\'espace ai-je besoin?', a: 'Minimum 200 pi² pour les fermes extérieures. Les solutions intérieures fonctionnent avec moins d\'espace.' },
      { q: 'Est-ce sécuritaire sur les toits?', a: 'Nos bacs ultra-légers ne compromettent généralement pas la capacité de charge du toit.' },
      { q: 'Quelle assurance offrez-vous?', a: 'Couverture de responsabilité de 5 millions de dollars pour responsabilité commerciale, automobile et excédentaire.' },
      { q: 'Comment fonctionne le programme?', a: 'Les programmes clé en main incluent l\'installation, l\'irrigation, la plantation, l\'entretien, la récolte, les activités éducatives et les outils marketing.' },
      { q: 'Qu\'est-ce qui est inclus?', a: 'Installation, système d\'irrigation, plantation saisonnière, entretien hebdomadaire, récolte, activités éducatives, outils marketing et cadeaux corporatifs.' },
      { q: 'Qu\'advient-il des récoltes?', a: 'Les options incluent la distribution interne ou le don aux banques alimentaires locales via notre programme Fermes Solidaires Urbaines.' },
      { q: 'Comment engagez-vous les occupants?', a: 'Minimum deux activités éducatives couvrant l\'agriculture écologique, la conservation des semences, le compostage et la durabilité.' },
      { q: 'Quels types d\'activités?', a: 'Kiosques interactifs, visites guidées du jardin et ateliers éducatifs personnalisés selon vos besoins.' },
      { q: 'Offrez-vous des activités en ligne?', a: 'Oui, des ateliers virtuels sur l\'agriculture, l\'entretien, l\'hivernisation, la conservation des semences et le soutien aux pollinisateurs.' },
      { q: 'Comment commencer?', a: 'Réservez une démo via notre site web pour une consultation gratuite afin de discuter de vos objectifs et évaluer votre propriété.' },
      { q: 'Quel est le délai d\'installation?', a: 'L\'installation se fait généralement dans les 4-6 semaines suivant la signature, coordonnée avec votre horaire.' },
      { q: 'Les occupants ont-ils besoin d\'accès?', a: 'L\'accès n\'est pas requis mais peut être souhaité pour l\'engagement ou les crédits de certification de bâtiment vert.' },
      { q: 'Comment assurez-vous la sécurité sur le toit?', a: 'Dégagement de sécurité minimum selon les directives locales avec jardins contenus loin des bords du toit.' },
    ],
  },
  nl: {
    categories: {
      'General Urban Farming Queries': 'Algemene Vragen over Stadslandbouw',
      'About Us': 'Over Ons',
      'Technical': 'Technisch',
      'Products and Services': 'Producten en Diensten',
      'Engagement': 'Betrokkenheid',
      'Getting Started': 'Aan de Slag',
      'Safety': 'Veiligheid',
    },
    items: [
      { q: 'Waarom zou iemand stadslandbouw integreren?', a: 'Het integreren van stadslandbouw brengt sociale en milieuvoordelen met zich mee, waaronder toegang tot verse producten, educatieve mogelijkheden, gemeenschapsbetrokkenheid, biodiversiteitsondersteuning en groene gebouwcertificeringen.' },
      { q: 'Wat is de eerste stap om te bepalen of mijn gebouw een programma kan huisvesten?', a: 'Voer een gratis locatie-evaluatie uit met ons team tijdens een virtuele vergadering om ruimte, zonlichtblootstelling, watertoegang en structurele integriteit te evalueren.' },
      { q: 'Hoe weet ik of mijn gebouw geschikt is?', a: 'Vereisten zijn minimaal 200 vierkante voet ruimte, minimaal 6 uur zonlicht per dag, toegankelijke waterbronnen en veilige daktoegang indien van toepassing.' },
      { q: 'Kan ik punten krijgen voor groene gebouwcertificering?', a: 'Ja! Onze programma\'s ondersteunen LEED, BOMA, BOMA BEST, GRESB, Fitwel en WELL certificeringen.' },
      { q: 'Bieden jullie binnenoplossingen?', a: 'Ja, MicroHabitat biedt binnen-units met jaarrond groei via onze kant-en-klare oplossing.' },
      { q: 'Waarom is MicroHabitat opgericht?', a: 'Om stedelijke voedselonzekerheid aan te pakken door onderbenutte stadsruimtes om te vormen tot productieve ecologische tuinen.' },
      { q: 'Wat is de geschiedenis van MicroHabitat?', a: 'Opgericht in Montreal in 2016, nu het grootste netwerk van stadsboerderijen in Noord-Amerika.' },
      { q: 'Waar is MicroHabitat actief?', a: 'In heel Noord-Amerika en Europa op daken, terrassen en grondruimtes in meer dan 20 grote steden.' },
      { q: 'Is MicroHabitat een franchise?', a: 'Nee, wij zijn één bedrijf met fulltime medewerkers in meerdere regio\'s.' },
      { q: 'Wijzigt de installatie mijn gebouw?', a: 'Geen permanente wijzigingen. Onze kweekbakken vereisen geen boren of graven.' },
      { q: 'Hoeveel ruimte heb ik nodig?', a: 'Minimaal 200 vierkante voet voor buitenboerderijen. Binnenoplossingen werken met kleinere ruimtes.' },
      { q: 'Is het veilig op daken?', a: 'Onze ultralichte kweekbakken compromitteren doorgaans de draagcapaciteit van het dak niet.' },
      { q: 'Welke verzekering bieden jullie?', a: 'Aansprakelijkheidsdekking van 5 miljoen dollar voor commerciële, auto- en excedent aansprakelijkheid.' },
      { q: 'Hoe werkt het programma?', a: 'Kant-en-klare programma\'s omvatten installatie, irrigatie, beplanting, onderhoud, oogst, educatieve activiteiten en marketingtools.' },
      { q: 'Wat is inbegrepen?', a: 'Installatie, irrigatiesysteem, seizoensgebonden beplanting, wekelijks onderhoud, oogst, educatieve activiteiten, marketingtools en bedrijfsgeschenken.' },
      { q: 'Wat gebeurt er met de oogst?', a: 'Opties zijn interne distributie of donatie aan lokale voedselbanken via ons Urban Solidarity Farms programma.' },
      { q: 'Hoe betrekken jullie bewoners?', a: 'Minimaal twee educatieve activiteiten over ecologische landbouw, zaadbesparing, compostering en duurzaamheid.' },
      { q: 'Welke soorten activiteiten?', a: 'Interactieve kiosken, begeleide tuinbezoeken en educatieve workshops op maat van uw behoeften.' },
      { q: 'Bieden jullie online activiteiten?', a: 'Ja, virtuele workshops over landbouw, onderhoud, winterklaar maken, zaadbesparing en bestuiverondersteuning.' },
      { q: 'Hoe begin ik?', a: 'Boek een demo via onze website voor een gratis consultatie om uw doelen te bespreken en uw eigendom te beoordelen.' },
      { q: 'Wat is de installatietijdlijn?', a: 'Installatie vindt doorgaans plaats binnen 4-6 weken na ondertekening, gecoördineerd met uw planning.' },
      { q: 'Hebben bewoners toegang nodig?', a: 'Toegang is niet vereist maar kan gewenst zijn voor betrokkenheid of groene gebouwcertificeringskredieten.' },
      { q: 'Hoe zorgen jullie voor dakveiligheid?', a: 'Minimale veiligheidsafstand volgens lokale richtlijnen met tuinen op afstand van dakranden.' },
    ],
  },
};

// Hero translations
const heroTranslations = {
  en: {
    title: 'Transform Your Space',
    titleHighlight: 'Into a Living Ecosystem',
    subtitle: 'We design and maintain urban farms that reconnect communities with nature and fresh, local food.',
    ctaPrimary: 'Book a Demo',
    ctaSecondary: 'Learn More',
  },
  fr: {
    title: 'Transformez Votre Espace',
    titleHighlight: 'En un Écosystème Vivant',
    subtitle: 'Nous concevons et entretenons des fermes urbaines qui reconnectent les communautés avec la nature et les aliments frais et locaux.',
    ctaPrimary: 'Réserver une Démo',
    ctaSecondary: 'En Savoir Plus',
  },
  nl: {
    title: 'Transformeer Uw Ruimte',
    titleHighlight: 'Tot een Levend Ecosysteem',
    subtitle: 'Wij ontwerpen en onderhouden stadsboerderijen die gemeenschappen herverbinden met de natuur en vers, lokaal voedsel.',
    ctaPrimary: 'Boek een Demo',
    ctaSecondary: 'Meer Info',
  },
};

// Section translations
const sectionTranslations = {
  impact: {
    en: { label: 'Our Impact', title: 'Making a Difference', subtitle: 'Real results from our urban farming network' },
    fr: { label: 'Notre Impact', title: 'Faire la Différence', subtitle: 'Des résultats concrets de notre réseau de fermes urbaines' },
    nl: { label: 'Onze Impact', title: 'Het Verschil Maken', subtitle: 'Echte resultaten van ons stadslandbouwnetwerk' },
  },
  services: {
    en: { label: 'Services', title: 'What We Offer', subtitle: 'Comprehensive urban farming solutions' },
    fr: { label: 'Services', title: 'Nos Offres', subtitle: 'Solutions complètes d\'agriculture urbaine' },
    nl: { label: 'Diensten', title: 'Wat Wij Bieden', subtitle: 'Uitgebreide stadslandbouwoplossingen' },
  },
  partners: {
    en: { label: 'Partners', title: 'Trusted By', subtitle: 'Leading organizations choose MicroHabitat' },
    fr: { label: 'Partenaires', title: 'Ils Nous Font Confiance', subtitle: 'Les organisations leaders choisissent MicroHabitat' },
    nl: { label: 'Partners', title: 'Vertrouwd Door', subtitle: 'Toonaangevende organisaties kiezen MicroHabitat' },
  },
  testimonials: {
    en: { label: 'Testimonials', title: 'What Our Clients Say', subtitle: 'Hear from organizations we\'ve worked with' },
    fr: { label: 'Témoignages', title: 'Ce Que Disent Nos Clients', subtitle: 'Écoutez les organisations avec lesquelles nous avons travaillé' },
    nl: { label: 'Getuigenissen', title: 'Wat Onze Klanten Zeggen', subtitle: 'Hoor van organisaties waarmee we hebben gewerkt' },
  },
  cities: {
    en: { label: 'Locations', title: 'Where We Operate', subtitle: 'Find MicroHabitat in your city' },
    fr: { label: 'Emplacements', title: 'Où Nous Opérons', subtitle: 'Trouvez MicroHabitat dans votre ville' },
    nl: { label: 'Locaties', title: 'Waar We Actief Zijn', subtitle: 'Vind MicroHabitat in uw stad' },
  },
  faq: {
    en: { label: 'FAQ', title: 'Frequently Asked Questions', subtitle: 'Find answers to common questions' },
    fr: { label: 'FAQ', title: 'Questions Fréquentes', subtitle: 'Trouvez des réponses aux questions courantes' },
    nl: { label: 'FAQ', title: 'Veelgestelde Vragen', subtitle: 'Vind antwoorden op veelgestelde vragen' },
  },
  cta: {
    en: { title: 'Ready to Transform Your Space?', subtitle: 'Book a free consultation to discuss your urban farming project.', ctaPrimary: 'Book a Demo', ctaSecondary: 'Contact Us' },
    fr: { title: 'Prêt à Transformer Votre Espace?', subtitle: 'Réservez une consultation gratuite pour discuter de votre projet d\'agriculture urbaine.', ctaPrimary: 'Réserver une Démo', ctaSecondary: 'Nous Contacter' },
    nl: { title: 'Klaar om Uw Ruimte te Transformeren?', subtitle: 'Boek een gratis consultatie om uw stadslandbouwproject te bespreken.', ctaPrimary: 'Boek een Demo', ctaSecondary: 'Contacteer Ons' },
  },
};

async function seedTranslations() {
  console.log('Starting translation seed for FR and NL...\n');

  const payload = await getPayload({ config });

  // ===========================================
  // 1. UPDATE STATS
  // ===========================================
  console.log('Updating Stats translations...');
  const { docs: stats } = await payload.find({ collection: 'stats', limit: 100, sort: 'order' });

  for (let i = 0; i < stats.length && i < statsTranslations.fr.length; i++) {
    const stat = stats[i];

    // Update French
    await payload.update({
      collection: 'stats',
      id: stat.id,
      locale: 'fr',
      data: {
        label: statsTranslations.fr[i].label,
        description: statsTranslations.fr[i].description,
      },
    });

    // Update Dutch
    await payload.update({
      collection: 'stats',
      id: stat.id,
      locale: 'nl',
      data: {
        label: statsTranslations.nl[i].label,
        description: statsTranslations.nl[i].description,
      },
    });

    await delay(100);
  }
  console.log(`  Updated ${stats.length} stats\n`);

  // ===========================================
  // 2. UPDATE SERVICES
  // ===========================================
  console.log('Updating Services translations...');
  const { docs: services } = await payload.find({ collection: 'services', limit: 100, sort: 'order' });

  for (let i = 0; i < services.length && i < servicesTranslations.fr.length; i++) {
    const service = services[i];

    // Update French
    await payload.update({
      collection: 'services',
      id: service.id,
      locale: 'fr',
      data: {
        title: servicesTranslations.fr[i].title,
        description: servicesTranslations.fr[i].description,
        features: servicesTranslations.fr[i].features.map(f => ({ feature: f })),
      },
    });

    // Update Dutch
    await payload.update({
      collection: 'services',
      id: service.id,
      locale: 'nl',
      data: {
        title: servicesTranslations.nl[i].title,
        description: servicesTranslations.nl[i].description,
        features: servicesTranslations.nl[i].features.map(f => ({ feature: f })),
      },
    });

    await delay(100);
  }
  console.log(`  Updated ${services.length} services\n`);

  // ===========================================
  // 3. UPDATE TESTIMONIALS
  // ===========================================
  console.log('Updating Testimonials translations...');
  const { docs: testimonials } = await payload.find({ collection: 'testimonials', limit: 100, sort: 'order' });

  for (let i = 0; i < testimonials.length && i < testimonialsTranslations.fr.length; i++) {
    const testimonial = testimonials[i];

    // Update French
    await payload.update({
      collection: 'testimonials',
      id: testimonial.id,
      locale: 'fr',
      data: {
        quote: testimonialsTranslations.fr[i].quote,
        role: testimonialsTranslations.fr[i].role,
      },
    });

    // Update Dutch
    await payload.update({
      collection: 'testimonials',
      id: testimonial.id,
      locale: 'nl',
      data: {
        quote: testimonialsTranslations.nl[i].quote,
        role: testimonialsTranslations.nl[i].role,
      },
    });

    await delay(100);
  }
  console.log(`  Updated ${testimonials.length} testimonials\n`);

  // ===========================================
  // 4. UPDATE CITIES
  // ===========================================
  console.log('Updating Cities translations...');
  const { docs: cities } = await payload.find({ collection: 'cities', limit: 100, sort: 'order' });

  for (const city of cities) {
    const enCountry = city.country as string;
    const cityName = city.name as string;
    const frCountry = citiesTranslations.fr[enCountry as keyof typeof citiesTranslations.fr] || enCountry;
    const nlCountry = citiesTranslations.nl[enCountry as keyof typeof citiesTranslations.nl] || enCountry;

    try {
      // Update French - include name (required field)
      await payload.update({
        collection: 'cities',
        id: city.id,
        locale: 'fr',
        data: { name: cityName, country: frCountry },
      });

      // Update Dutch - include name (required field)
      await payload.update({
        collection: 'cities',
        id: city.id,
        locale: 'nl',
        data: { name: cityName, country: nlCountry },
      });

      console.log(`    ${cityName} updated`);
    } catch (err) {
      console.log(`    ${cityName} skipped (error)`);
    }

    await delay(200);
  }
  console.log(`  Updated ${cities.length} cities\n`);

  // ===========================================
  // 5. UPDATE FAQ ITEMS
  // ===========================================
  console.log('Updating FAQ translations...');
  const { docs: faqItems } = await payload.find({ collection: 'faq-items', limit: 100, sort: 'order' });

  for (let i = 0; i < faqItems.length && i < faqTranslations.fr.items.length; i++) {
    const faq = faqItems[i];
    const enCategory = faq.category as string;

    try {
      // Update French - keep category in English (select field options are fixed)
      await payload.update({
        collection: 'faq-items',
        id: faq.id,
        locale: 'fr',
        data: {
          question: faqTranslations.fr.items[i].q,
          answer: faqTranslations.fr.items[i].a,
        },
      });

      // Update Dutch - keep category in English (select field options are fixed)
      await payload.update({
        collection: 'faq-items',
        id: faq.id,
        locale: 'nl',
        data: {
          question: faqTranslations.nl.items[i].q,
          answer: faqTranslations.nl.items[i].a,
        },
      });

      console.log(`    FAQ ${i + 1} updated`);
    } catch (err: any) {
      console.log(`    FAQ ${i + 1} skipped: ${err.message || 'error'}`);
    }

    await delay(200);
  }
  console.log(`  Updated ${Math.min(faqItems.length, faqTranslations.fr.items.length)} FAQ items\n`);

  // ===========================================
  // 6. UPDATE HERO GLOBAL
  // ===========================================
  console.log('Updating Hero translations...');

  await payload.updateGlobal({
    slug: 'hero',
    locale: 'fr',
    data: heroTranslations.fr,
  });

  await payload.updateGlobal({
    slug: 'hero',
    locale: 'nl',
    data: heroTranslations.nl,
  });
  console.log('  Hero updated\n');

  // ===========================================
  // 7. UPDATE SECTION GLOBALS
  // ===========================================
  console.log('Updating Section globals translations...');

  const sections = [
    { slug: 'impact-section', data: sectionTranslations.impact },
    { slug: 'services-section', data: sectionTranslations.services },
    { slug: 'partners-section', data: sectionTranslations.partners },
    { slug: 'testimonials-section', data: sectionTranslations.testimonials },
    { slug: 'cities-section', data: sectionTranslations.cities },
    { slug: 'faq-section', data: sectionTranslations.faq },
    { slug: 'cta-section', data: sectionTranslations.cta },
  ];

  for (const section of sections) {
    try {
      await payload.updateGlobal({
        slug: section.slug as any,
        locale: 'fr',
        data: section.data.fr,
      });

      await payload.updateGlobal({
        slug: section.slug as any,
        locale: 'nl',
        data: section.data.nl,
      });
      console.log(`  ${section.slug} updated`);
    } catch (err) {
      console.log(`  ${section.slug} skipped (may not exist)`);
    }
    await delay(100);
  }

  console.log('\n==================================================');
  console.log('Translation seed completed!');
  console.log('==================================================\n');

  process.exit(0);
}

seedTranslations().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
