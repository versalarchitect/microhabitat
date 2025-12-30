#!/usr/bin/env bun

const STRAPI_URL = "http://localhost:1337";
const STRAPI_TOKEN = "a2416df878fc230e8f8b78d8ca890c45a63ff8deecc7a53ad011ed1e9d9d001dc1711a58cd47ffe16fc310eac45057fcf7f7f3d56a5b6b23e1f74ffe12f0b441495251e91db3e639b2cb718989c257a64391a8f45c84cbf0572bd19170eb623fff4d48a56d02bfa942ae947a765badfc51aa157934052bc2beb47a81e44ea9c4";

interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

interface PageSEO {
  [locale: string]: SEOData;
}

// ============================================================================
// OPTIMIZED SEO CONTENT - ALL PAGES, ALL LANGUAGES
// Titles: ~55-60 chars | Descriptions: ~155-160 chars
// ============================================================================

const SEO_DATA: Record<string, PageSEO> = {
  "about-page": {
    en: {
      metaTitle: "About Microhabitat | World's Largest Urban Farm Network",
      metaDescription: "Founded in 2016 by Orlane & Alexandre, Microhabitat operates 150+ urban farms across North America & Europe. Discover our mission to reconnect cities with nature.",
      keywords: "about microhabitat, urban farming company, sustainable agriculture, founders, mission, urban farm network",
    },
    fr: {
      metaTitle: "À Propos de Microhabitat | Plus Grand Réseau de Fermes Urbaines",
      metaDescription: "Fondé en 2016 par Orlane et Alexandre, Microhabitat exploite 150+ fermes urbaines en Amérique du Nord et Europe. Découvrez notre mission de reconnecter les villes.",
      keywords: "à propos microhabitat, entreprise agriculture urbaine, agriculture durable, fondateurs, mission",
    },
    de: {
      metaTitle: "Über Microhabitat | Weltweit Größtes Stadtfarm-Netzwerk",
      metaDescription: "2016 von Orlane & Alexandre gegründet, betreibt Microhabitat 150+ Stadtfarmen in Nordamerika & Europa. Entdecken Sie unsere Mission, Städte mit der Natur zu verbinden.",
      keywords: "über microhabitat, urban farming unternehmen, nachhaltige landwirtschaft, gründer, mission",
    },
    nl: {
      metaTitle: "Over Microhabitat | 's Werelds Grootste Stadslandbouwnetwerk",
      metaDescription: "Opgericht in 2016 door Orlane & Alexandre, beheert Microhabitat 150+ stadsboerderijen in Noord-Amerika & Europa. Ontdek onze missie om steden te verbinden met natuur.",
      keywords: "over microhabitat, stadslandbouw bedrijf, duurzame landbouw, oprichters, missie",
    },
    it: {
      metaTitle: "Chi Siamo | Microhabitat - Rete di Fattorie Urbane Mondiale",
      metaDescription: "Fondata nel 2016 da Orlane e Alessandro, Microhabitat gestisce 150+ fattorie urbane in Nord America ed Europa. Scopri la nostra missione per riconnettere le città.",
      keywords: "chi siamo microhabitat, azienda agricoltura urbana, agricoltura sostenibile, fondatori, missione",
    },
    es: {
      metaTitle: "Sobre Microhabitat | Mayor Red de Granjas Urbanas del Mundo",
      metaDescription: "Fundada en 2016 por Orlane y Alexandre, Microhabitat opera 150+ granjas urbanas en Norteamérica y Europa. Descubre nuestra misión de reconectar ciudades con la naturaleza.",
      keywords: "sobre microhabitat, empresa agricultura urbana, agricultura sostenible, fundadores, misión",
    },
  },

  "careers-page": {
    en: {
      metaTitle: "Careers at Microhabitat | Join the Urban Farming Revolution",
      metaDescription: "Build a career that matters. Join Microhabitat's team of urban farmers, educators & sustainability experts. Open positions in Montreal, Toronto, NYC, Paris & more.",
      keywords: "microhabitat careers, urban farming jobs, sustainability careers, green jobs, agriculture careers",
    },
    fr: {
      metaTitle: "Carrières chez Microhabitat | Rejoignez la Révolution Agricole",
      metaDescription: "Construisez une carrière qui compte. Rejoignez notre équipe d'agriculteurs urbains et experts en développement durable. Postes à Montréal, Toronto, NYC, Paris.",
      keywords: "carrières microhabitat, emplois agriculture urbaine, carrières durabilité, emplois verts",
    },
    de: {
      metaTitle: "Karriere bei Microhabitat | Werde Teil der Urban-Farming-Revolution",
      metaDescription: "Gestalte eine Karriere mit Bedeutung. Werde Teil unseres Teams aus Stadtbauern, Pädagogen & Nachhaltigkeitsexperten. Offene Stellen in Montreal, Toronto, NYC, Paris.",
      keywords: "microhabitat karriere, urban farming jobs, nachhaltigkeits-karriere, grüne jobs",
    },
    nl: {
      metaTitle: "Werken bij Microhabitat | Word Deel van de Stadslandbouw Revolutie",
      metaDescription: "Bouw een carrière die ertoe doet. Word deel van ons team van stadsboeren, docenten & duurzaamheidsexperts. Vacatures in Montreal, Toronto, NYC, Parijs en meer.",
      keywords: "microhabitat vacatures, stadslandbouw banen, duurzaamheid carrière, groene banen",
    },
    it: {
      metaTitle: "Lavora con Microhabitat | Unisciti alla Rivoluzione Agricola Urbana",
      metaDescription: "Costruisci una carriera che conta. Unisciti al nostro team di agricoltori urbani, educatori ed esperti di sostenibilità. Posizioni aperte a Montreal, Toronto, NYC, Parigi.",
      keywords: "carriere microhabitat, lavori agricoltura urbana, carriere sostenibilità, lavori verdi",
    },
    es: {
      metaTitle: "Empleos en Microhabitat | Únete a la Revolución de Agricultura Urbana",
      metaDescription: "Construye una carrera que importa. Únete a nuestro equipo de agricultores urbanos, educadores y expertos en sostenibilidad. Puestos en Montreal, Toronto, NYC, París.",
      keywords: "empleos microhabitat, trabajos agricultura urbana, carreras sostenibilidad, empleos verdes",
    },
  },

  "contact-page": {
    en: {
      metaTitle: "Contact Microhabitat | Get in Touch With Our Urban Farm Experts",
      metaDescription: "Ready to transform your space into a thriving urban farm? Contact Microhabitat today for a free consultation. Offices in Montreal, Toronto, New York City & Paris.",
      keywords: "contact microhabitat, urban farming consultation, get in touch, request quote, urban farm experts",
    },
    fr: {
      metaTitle: "Contactez Microhabitat | Parlez à Nos Experts en Agriculture Urbaine",
      metaDescription: "Prêt à transformer votre espace en ferme urbaine florissante? Contactez Microhabitat pour une consultation gratuite. Bureaux à Montréal, Toronto, New York, Paris.",
      keywords: "contact microhabitat, consultation agriculture urbaine, nous contacter, demande de devis",
    },
    de: {
      metaTitle: "Kontakt Microhabitat | Sprechen Sie Mit Unseren Stadtfarm-Experten",
      metaDescription: "Bereit, Ihren Raum in eine florierende Stadtfarm zu verwandeln? Kontaktieren Sie Microhabitat für eine kostenlose Beratung. Büros in Montreal, Toronto, NYC & Paris.",
      keywords: "kontakt microhabitat, urban farming beratung, kontaktieren, angebot anfordern",
    },
    nl: {
      metaTitle: "Contact Microhabitat | Neem Contact Op Met Onze Stadslandbouw Experts",
      metaDescription: "Klaar om uw ruimte om te vormen tot een bloeiende stadsboerderij? Neem contact op met Microhabitat voor gratis advies. Kantoren in Montreal, Toronto, NYC & Parijs.",
      keywords: "contact microhabitat, stadslandbouw advies, neem contact op, offerte aanvragen",
    },
    it: {
      metaTitle: "Contatta Microhabitat | Parla con i Nostri Esperti di Fattorie Urbane",
      metaDescription: "Pronto a trasformare il tuo spazio in una fattoria urbana fiorente? Contatta Microhabitat oggi per una consulenza gratuita. Uffici a Montreal, Toronto, NYC e Parigi.",
      keywords: "contatta microhabitat, consulenza agricoltura urbana, contattaci, richiedi preventivo",
    },
    es: {
      metaTitle: "Contacta Microhabitat | Habla con Nuestros Expertos en Granjas Urbanas",
      metaDescription: "¿Listo para transformar tu espacio en una granja urbana próspera? Contacta a Microhabitat hoy para una consulta gratuita. Oficinas en Montreal, Toronto, NYC y París.",
      keywords: "contacto microhabitat, consulta agricultura urbana, contáctanos, solicitar presupuesto",
    },
  },

  "outdoor-farm-page": {
    en: {
      metaTitle: "Rooftop & Outdoor Urban Farms | Microhabitat Farming Solutions",
      metaDescription: "Transform rooftops, terraces & unused outdoor spaces into productive urban farms. Full-service design, installation & maintenance. 500+ successful projects worldwide.",
      keywords: "rooftop farming, outdoor urban farms, green roofs, terrace gardens, urban agriculture solutions",
    },
    fr: {
      metaTitle: "Fermes Urbaines sur Toits et Extérieures | Solutions Microhabitat",
      metaDescription: "Transformez toits, terrasses et espaces extérieurs en fermes urbaines productives. Conception, installation et entretien complets. 500+ projets réussis dans le monde.",
      keywords: "agriculture sur toit, fermes urbaines extérieures, toits verts, jardins de terrasse",
    },
    de: {
      metaTitle: "Dachfarmen & Outdoor-Stadtfarmen | Microhabitat Farming-Lösungen",
      metaDescription: "Verwandeln Sie Dächer, Terrassen & ungenutzte Außenflächen in produktive Stadtfarmen. Full-Service Design, Installation & Wartung. 500+ erfolgreiche Projekte weltweit.",
      keywords: "dachfarming, outdoor stadtfarmen, grüne dächer, terrassengärten, urbane landwirtschaft",
    },
    nl: {
      metaTitle: "Daktuinen & Outdoor Stadsboerderijen | Microhabitat Oplossingen",
      metaDescription: "Transformeer daken, terrassen en ongebruikte buitenruimtes in productieve stadsboerderijen. Volledige service: ontwerp, installatie en onderhoud. 500+ projecten wereldwijd.",
      keywords: "daklandbouw, outdoor stadsboerderijen, groene daken, terrrastuinen, urbane landbouw",
    },
    it: {
      metaTitle: "Fattorie su Tetti e Outdoor | Soluzioni Agricole Urbane Microhabitat",
      metaDescription: "Trasforma tetti, terrazze e spazi esterni inutilizzati in fattorie urbane produttive. Design, installazione e manutenzione completa. 500+ progetti di successo nel mondo.",
      keywords: "agricoltura su tetto, fattorie urbane outdoor, tetti verdi, giardini pensili",
    },
    es: {
      metaTitle: "Granjas en Azoteas y Exteriores | Soluciones Agrícolas Microhabitat",
      metaDescription: "Transforma azoteas, terrazas y espacios exteriores en granjas urbanas productivas. Diseño, instalación y mantenimiento completo. 500+ proyectos exitosos en el mundo.",
      keywords: "agricultura en azoteas, granjas urbanas exteriores, techos verdes, jardines de terraza",
    },
  },

  "indoor-farm-page": {
    en: {
      metaTitle: "Indoor & Vertical Farming Solutions | Year-Round Urban Agriculture",
      metaDescription: "Grow fresh produce 365 days a year with Microhabitat's indoor farming systems. Vertical gardens, hydroponic setups & controlled environment agriculture for any space.",
      keywords: "indoor farming, vertical gardens, hydroponics, controlled environment agriculture, year-round growing",
    },
    fr: {
      metaTitle: "Fermes Intérieures et Verticales | Agriculture Urbaine Toute l'Année",
      metaDescription: "Cultivez des produits frais 365 jours par an avec les systèmes de culture intérieure Microhabitat. Jardins verticaux, hydroponie et agriculture en environnement contrôlé.",
      keywords: "agriculture intérieure, jardins verticaux, hydroponie, agriculture en environnement contrôlé",
    },
    de: {
      metaTitle: "Indoor- & Vertikalfarming Lösungen | Ganzjährige Stadtlandwirtschaft",
      metaDescription: "Bauen Sie 365 Tage im Jahr frische Produkte an mit Microhabitats Indoor-Farming-Systemen. Vertikale Gärten, Hydroponik & kontrollierte Umgebungslandwirtschaft für jeden Raum.",
      keywords: "indoor farming, vertikale gärten, hydroponik, kontrollierte umgebung landwirtschaft",
    },
    nl: {
      metaTitle: "Indoor & Verticale Landbouw Oplossingen | Jaarrond Stadslandbouw",
      metaDescription: "Kweek 365 dagen per jaar verse producten met Microhabitat's indoor farming systemen. Verticale tuinen, hydrocultuur en gecontroleerde omgevingslandbouw voor elke ruimte.",
      keywords: "indoor farming, verticale tuinen, hydrocultuur, gecontroleerde omgeving landbouw",
    },
    it: {
      metaTitle: "Agricoltura Indoor e Verticale | Coltivazione Urbana Tutto l'Anno",
      metaDescription: "Coltiva prodotti freschi 365 giorni l'anno con i sistemi di agricoltura indoor Microhabitat. Giardini verticali, idroponica e agricoltura a ambiente controllato per ogni spazio.",
      keywords: "agricoltura indoor, giardini verticali, idroponica, agricoltura ambiente controllato",
    },
    es: {
      metaTitle: "Agricultura Indoor y Vertical | Cultivo Urbano Durante Todo el Año",
      metaDescription: "Cultiva productos frescos 365 días al año con los sistemas de agricultura indoor de Microhabitat. Jardines verticales, hidroponía y agricultura de ambiente controlado.",
      keywords: "agricultura indoor, jardines verticales, hidroponía, agricultura ambiente controlado",
    },
  },

  "educational-activities-page": {
    en: {
      metaTitle: "Urban Farming Workshops & Educational Programs | Microhabitat",
      metaDescription: "Learn sustainable agriculture through hands-on workshops, farm tours & educational programs. Perfect for schools, corporate teams & community groups. Book your session today.",
      keywords: "urban farming workshops, educational programs, farm tours, sustainability education, hands-on learning",
    },
    fr: {
      metaTitle: "Ateliers d'Agriculture Urbaine et Programmes Éducatifs | Microhabitat",
      metaDescription: "Apprenez l'agriculture durable grâce à des ateliers pratiques, visites de fermes et programmes éducatifs. Parfait pour écoles, entreprises et groupes communautaires.",
      keywords: "ateliers agriculture urbaine, programmes éducatifs, visites de fermes, éducation durable",
    },
    de: {
      metaTitle: "Urban Farming Workshops & Bildungsprogramme | Microhabitat",
      metaDescription: "Lernen Sie nachhaltige Landwirtschaft durch praxisnahe Workshops, Farmtouren & Bildungsprogramme. Perfekt für Schulen, Firmenteams & Gemeindegruppen. Buchen Sie heute.",
      keywords: "urban farming workshops, bildungsprogramme, farmtouren, nachhaltigkeitsbildung",
    },
    nl: {
      metaTitle: "Stadslandbouw Workshops & Educatieve Programma's | Microhabitat",
      metaDescription: "Leer duurzame landbouw door praktische workshops, boerderijrondleidingen en educatieve programma's. Perfect voor scholen, bedrijfsteams en gemeenschapsgroepen. Boek vandaag.",
      keywords: "stadslandbouw workshops, educatieve programma's, boerderijrondleidingen, duurzaamheidsonderwijs",
    },
    it: {
      metaTitle: "Workshop di Agricoltura Urbana e Programmi Educativi | Microhabitat",
      metaDescription: "Impara l'agricoltura sostenibile attraverso workshop pratici, tour delle fattorie e programmi educativi. Perfetto per scuole, team aziendali e gruppi comunitari.",
      keywords: "workshop agricoltura urbana, programmi educativi, tour fattorie, educazione sostenibilità",
    },
    es: {
      metaTitle: "Talleres de Agricultura Urbana y Programas Educativos | Microhabitat",
      metaDescription: "Aprende agricultura sostenible a través de talleres prácticos, tours de granjas y programas educativos. Perfecto para escuelas, equipos corporativos y grupos comunitarios.",
      keywords: "talleres agricultura urbana, programas educativos, tours de granjas, educación sostenibilidad",
    },
  },

  "community-engagement-page": {
    en: {
      metaTitle: "Community Programs & Food Bank Partnerships | Microhabitat Impact",
      metaDescription: "Creating lasting social impact through food bank partnerships, community gardens & volunteer programs. Join Microhabitat in fighting food insecurity in urban communities.",
      keywords: "community engagement, food bank partnerships, community gardens, volunteer programs, social impact, food security",
    },
    fr: {
      metaTitle: "Programmes Communautaires et Partenariats Alimentaires | Microhabitat",
      metaDescription: "Créons un impact social durable grâce aux partenariats avec banques alimentaires, jardins communautaires et programmes bénévoles. Luttez contre l'insécurité alimentaire.",
      keywords: "engagement communautaire, partenariats banques alimentaires, jardins communautaires, bénévolat",
    },
    de: {
      metaTitle: "Gemeinschaftsprogramme & Tafel-Partnerschaften | Microhabitat Impact",
      metaDescription: "Nachhaltige soziale Wirkung durch Tafel-Partnerschaften, Gemeinschaftsgärten & Freiwilligenprogramme. Kämpfen Sie mit Microhabitat gegen Ernährungsunsicherheit in Städten.",
      keywords: "gemeinschaftsengagement, tafel-partnerschaften, gemeinschaftsgärten, freiwilligenprogramme",
    },
    nl: {
      metaTitle: "Gemeenschapsprogramma's & Voedselbank Partnerschappen | Microhabitat",
      metaDescription: "Duurzame sociale impact creëren door voedselbank partnerschappen, gemeenschapstuinen en vrijwilligersprogramma's. Help Microhabitat bij het bestrijden van voedselonzekerheid.",
      keywords: "gemeenschapsbetrokkenheid, voedselbank partnerschappen, gemeenschapstuinen, vrijwilligersprogramma's",
    },
    it: {
      metaTitle: "Programmi Comunitari e Partnership con Banchi Alimentari | Microhabitat",
      metaDescription: "Creiamo un impatto sociale duraturo attraverso partnership con banchi alimentari, orti comunitari e programmi di volontariato. Combatti l'insicurezza alimentare urbana.",
      keywords: "impegno comunitario, partnership banchi alimentari, orti comunitari, programmi volontariato",
    },
    es: {
      metaTitle: "Programas Comunitarios y Alianzas con Bancos de Alimentos | Microhabitat",
      metaDescription: "Creamos impacto social duradero a través de alianzas con bancos de alimentos, huertos comunitarios y programas de voluntariado. Combate la inseguridad alimentaria urbana.",
      keywords: "compromiso comunitario, alianzas bancos alimentos, huertos comunitarios, voluntariado",
    },
  },

  "commercial-real-estate-page": {
    en: {
      metaTitle: "Urban Farms for Commercial Real Estate | Green Building Solutions",
      metaDescription: "Boost property value & tenant satisfaction with rooftop farms and green spaces. Microhabitat helps property managers achieve LEED certification & ESG goals. Get a free assessment.",
      keywords: "commercial real estate farming, green buildings, LEED certification, property value, tenant amenities, ESG",
    },
    fr: {
      metaTitle: "Fermes Urbaines pour Immobilier Commercial | Solutions Bâtiments Verts",
      metaDescription: "Augmentez la valeur immobilière et satisfaction des locataires avec fermes sur toit et espaces verts. Atteignez la certification LEED et objectifs ESG. Évaluation gratuite.",
      keywords: "immobilier commercial agriculture, bâtiments verts, certification LEED, valeur immobilière, ESG",
    },
    de: {
      metaTitle: "Stadtfarmen für Gewerbeimmobilien | Grüne Gebäudelösungen",
      metaDescription: "Steigern Sie Immobilienwert & Mieterzufriedenheit mit Dachfarmen und Grünflächen. Microhabitat hilft bei LEED-Zertifizierung & ESG-Zielen. Kostenlose Bewertung erhalten.",
      keywords: "gewerbeimmobilien farming, grüne gebäude, LEED-zertifizierung, immobilienwert, ESG",
    },
    nl: {
      metaTitle: "Stadsboerderijen voor Commercieel Vastgoed | Groene Gebouwoplossingen",
      metaDescription: "Verhoog vastgoedwaarde en huurderstevredenheid met dakboerderijen en groene ruimtes. Microhabitat helpt bij LEED-certificering en ESG-doelen. Gratis beoordeling aanvragen.",
      keywords: "commercieel vastgoed landbouw, groene gebouwen, LEED-certificering, vastgoedwaarde, ESG",
    },
    it: {
      metaTitle: "Fattorie Urbane per Immobili Commerciali | Soluzioni Edifici Verdi",
      metaDescription: "Aumenta il valore immobiliare e la soddisfazione degli inquilini con fattorie sui tetti e spazi verdi. Raggiungi la certificazione LEED e obiettivi ESG. Valutazione gratuita.",
      keywords: "immobili commerciali agricoltura, edifici verdi, certificazione LEED, valore immobiliare, ESG",
    },
    es: {
      metaTitle: "Granjas Urbanas para Bienes Raíces Comerciales | Edificios Verdes",
      metaDescription: "Aumenta el valor de la propiedad y satisfacción de inquilinos con granjas en azoteas y espacios verdes. Logra certificación LEED y metas ESG. Evaluación gratuita disponible.",
      keywords: "bienes raíces comerciales agricultura, edificios verdes, certificación LEED, valor propiedad, ESG",
    },
  },

  "corporations-page": {
    en: {
      metaTitle: "Corporate Urban Farming & ESG Programs | Sustainability Solutions",
      metaDescription: "Achieve your ESG goals with Microhabitat's corporate urban farming programs. Employee wellness, team building, carbon reduction & measurable sustainability impact for your brand.",
      keywords: "corporate sustainability, ESG programs, employee wellness, team building, carbon reduction, corporate farming",
    },
    fr: {
      metaTitle: "Agriculture Urbaine d'Entreprise et Programmes ESG | Durabilité",
      metaDescription: "Atteignez vos objectifs ESG avec les programmes d'agriculture urbaine Microhabitat. Bien-être employés, team building, réduction carbone et impact mesurable pour votre marque.",
      keywords: "durabilité entreprise, programmes ESG, bien-être employés, team building, réduction carbone",
    },
    de: {
      metaTitle: "Corporate Urban Farming & ESG-Programme | Nachhaltigkeitslösungen",
      metaDescription: "Erreichen Sie Ihre ESG-Ziele mit Microhabitats Corporate Urban Farming. Mitarbeiter-Wellness, Teambuilding, CO2-Reduktion & messbare Nachhaltigkeitswirkung für Ihre Marke.",
      keywords: "unternehmens-nachhaltigkeit, ESG-programme, mitarbeiter-wellness, teambuilding, CO2-reduktion",
    },
    nl: {
      metaTitle: "Zakelijke Stadslandbouw & ESG Programma's | Duurzaamheidsoplossingen",
      metaDescription: "Bereik uw ESG-doelen met Microhabitat's zakelijke stadslandbouwprogramma's. Werknemerswelzijn, teambuilding, CO2-reductie en meetbare duurzaamheidsimpact voor uw merk.",
      keywords: "zakelijke duurzaamheid, ESG programma's, werknemerswelzijn, teambuilding, CO2-reductie",
    },
    it: {
      metaTitle: "Agricoltura Urbana Aziendale e Programmi ESG | Soluzioni Sostenibili",
      metaDescription: "Raggiungi i tuoi obiettivi ESG con i programmi di agricoltura urbana aziendale Microhabitat. Benessere dipendenti, team building, riduzione carbonio e impatto misurabile.",
      keywords: "sostenibilità aziendale, programmi ESG, benessere dipendenti, team building, riduzione carbonio",
    },
    es: {
      metaTitle: "Agricultura Urbana Corporativa y Programas ESG | Sostenibilidad",
      metaDescription: "Alcanza tus objetivos ESG con los programas de agricultura urbana corporativa de Microhabitat. Bienestar empleados, team building, reducción de carbono e impacto medible.",
      keywords: "sostenibilidad corporativa, programas ESG, bienestar empleados, team building, reducción carbono",
    },
  },

  "schools-page": {
    en: {
      metaTitle: "School Garden Programs & Educational Farming | Microhabitat",
      metaDescription: "Bring hands-on STEM learning to your school with Microhabitat's educational farming programs. Curriculum-aligned workshops, school gardens & student engagement for K-12 and universities.",
      keywords: "school gardens, educational farming, STEM learning, student engagement, curriculum workshops, K-12",
    },
    fr: {
      metaTitle: "Programmes de Jardins Scolaires et Agriculture Éducative | Microhabitat",
      metaDescription: "Offrez un apprentissage STEM pratique avec les programmes d'agriculture éducative Microhabitat. Ateliers alignés au curriculum, jardins scolaires pour primaire à université.",
      keywords: "jardins scolaires, agriculture éducative, apprentissage STEM, engagement étudiant, ateliers",
    },
    de: {
      metaTitle: "Schulgarten-Programme & Pädagogische Landwirtschaft | Microhabitat",
      metaDescription: "Bringen Sie praktisches MINT-Lernen an Ihre Schule mit Microhabitats pädagogischen Farming-Programmen. Lehrplan-Workshops, Schulgärten für K-12 und Universitäten.",
      keywords: "schulgärten, pädagogische landwirtschaft, MINT-lernen, schülerengagement, curriculum-workshops",
    },
    nl: {
      metaTitle: "Schooltuinprogramma's & Educatieve Landbouw | Microhabitat",
      metaDescription: "Breng praktisch STEM-leren naar uw school met Microhabitat's educatieve landbouwprogramma's. Curriculum-workshops, schooltuinen en studentenbetrokkenheid voor alle niveaus.",
      keywords: "schooltuinen, educatieve landbouw, STEM-leren, studentenbetrokkenheid, curriculum workshops",
    },
    it: {
      metaTitle: "Programmi Orti Scolastici e Agricoltura Educativa | Microhabitat",
      metaDescription: "Porta l'apprendimento STEM pratico nella tua scuola con i programmi di agricoltura educativa Microhabitat. Workshop curriculari, orti scolastici per scuole e università.",
      keywords: "orti scolastici, agricoltura educativa, apprendimento STEM, coinvolgimento studenti, workshop",
    },
    es: {
      metaTitle: "Programas de Huertos Escolares y Agricultura Educativa | Microhabitat",
      metaDescription: "Lleva el aprendizaje STEM práctico a tu escuela con los programas de agricultura educativa de Microhabitat. Talleres curriculares, huertos escolares para K-12 y universidades.",
      keywords: "huertos escolares, agricultura educativa, aprendizaje STEM, participación estudiantil, talleres",
    },
  },

  "partnerships-page": {
    en: {
      metaTitle: "Partner With Microhabitat | Urban Farming Collaboration & Licensing",
      metaDescription: "Join Microhabitat's global network of urban farming partners. Licensing opportunities, joint ventures & collaboration programs for municipalities, developers & organizations.",
      keywords: "microhabitat partnerships, urban farming licensing, joint ventures, collaboration, franchise opportunities",
    },
    fr: {
      metaTitle: "Devenez Partenaire Microhabitat | Collaboration Agriculture Urbaine",
      metaDescription: "Rejoignez le réseau mondial de partenaires Microhabitat. Licences, coentreprises et programmes de collaboration pour municipalités, promoteurs et organisations.",
      keywords: "partenariats microhabitat, licence agriculture urbaine, coentreprises, collaboration, franchise",
    },
    de: {
      metaTitle: "Partner von Microhabitat werden | Urban Farming Kooperationen",
      metaDescription: "Treten Sie Microhabitats globalem Netzwerk von Urban-Farming-Partnern bei. Lizenzmöglichkeiten, Joint Ventures & Kooperationsprogramme für Kommunen und Entwickler.",
      keywords: "microhabitat partnerschaften, urban farming lizenz, joint ventures, kooperation, franchise",
    },
    nl: {
      metaTitle: "Word Partner van Microhabitat | Stadslandbouw Samenwerking & Licenties",
      metaDescription: "Word deel van Microhabitat's wereldwijde netwerk van stadslandbouwpartners. Licentiemogelijkheden, joint ventures en samenwerkingsprogramma's voor gemeenten en ontwikkelaars.",
      keywords: "microhabitat partnerschappen, stadslandbouw licenties, joint ventures, samenwerking, franchise",
    },
    it: {
      metaTitle: "Diventa Partner Microhabitat | Collaborazioni Agricoltura Urbana",
      metaDescription: "Unisciti alla rete globale di partner Microhabitat. Opportunità di licenza, joint venture e programmi di collaborazione per comuni, sviluppatori e organizzazioni.",
      keywords: "partnership microhabitat, licenze agricoltura urbana, joint venture, collaborazione, franchise",
    },
    es: {
      metaTitle: "Asóciate con Microhabitat | Colaboración en Agricultura Urbana",
      metaDescription: "Únete a la red global de socios de Microhabitat. Oportunidades de licencia, joint ventures y programas de colaboración para municipios, desarrolladores y organizaciones.",
      keywords: "asociaciones microhabitat, licencias agricultura urbana, joint ventures, colaboración, franquicia",
    },
  },

  "faq-page": {
    en: {
      metaTitle: "Urban Farming FAQ | Common Questions Answered by Microhabitat",
      metaDescription: "Get answers to frequently asked questions about urban farming, our services, pricing, installation process & maintenance. Everything you need to know before starting.",
      keywords: "urban farming FAQ, frequently asked questions, microhabitat questions, farming answers, getting started",
    },
    fr: {
      metaTitle: "FAQ Agriculture Urbaine | Questions Fréquentes par Microhabitat",
      metaDescription: "Obtenez des réponses aux questions fréquentes sur l'agriculture urbaine, nos services, tarifs, processus d'installation et entretien. Tout ce qu'il faut savoir avant de commencer.",
      keywords: "FAQ agriculture urbaine, questions fréquentes, questions microhabitat, réponses, démarrer",
    },
    de: {
      metaTitle: "Urban Farming FAQ | Häufige Fragen Beantwortet von Microhabitat",
      metaDescription: "Antworten auf häufig gestellte Fragen zu Urban Farming, unseren Services, Preisen, Installationsprozess & Wartung. Alles was Sie wissen müssen bevor Sie starten.",
      keywords: "urban farming FAQ, häufig gestellte fragen, microhabitat fragen, antworten, loslegen",
    },
    nl: {
      metaTitle: "Stadslandbouw FAQ | Veelgestelde Vragen Beantwoord door Microhabitat",
      metaDescription: "Krijg antwoorden op veelgestelde vragen over stadslandbouw, onze diensten, prijzen, installatieproces en onderhoud. Alles wat u moet weten voordat u begint.",
      keywords: "stadslandbouw FAQ, veelgestelde vragen, microhabitat vragen, antwoorden, aan de slag",
    },
    it: {
      metaTitle: "FAQ Agricoltura Urbana | Domande Frequenti Risposte da Microhabitat",
      metaDescription: "Ottieni risposte alle domande frequenti sull'agricoltura urbana, i nostri servizi, prezzi, processo di installazione e manutenzione. Tutto ciò che devi sapere per iniziare.",
      keywords: "FAQ agricoltura urbana, domande frequenti, domande microhabitat, risposte, iniziare",
    },
    es: {
      metaTitle: "FAQ Agricultura Urbana | Preguntas Frecuentes por Microhabitat",
      metaDescription: "Obtén respuestas a preguntas frecuentes sobre agricultura urbana, nuestros servicios, precios, proceso de instalación y mantenimiento. Todo lo que necesitas saber para empezar.",
      keywords: "FAQ agricultura urbana, preguntas frecuentes, preguntas microhabitat, respuestas, comenzar",
    },
  },

  "blog-page": {
    en: {
      metaTitle: "Urban Farming Blog | News, Tips & Insights from Microhabitat",
      metaDescription: "Stay updated with the latest urban farming trends, sustainability tips, project stories & expert insights from Microhabitat's team. Subscribe for weekly updates.",
      keywords: "urban farming blog, sustainability news, farming tips, microhabitat stories, agriculture insights",
    },
    fr: {
      metaTitle: "Blog Agriculture Urbaine | Actualités et Conseils de Microhabitat",
      metaDescription: "Restez informé des dernières tendances en agriculture urbaine, conseils durabilité, histoires de projets et expertises de l'équipe Microhabitat. Abonnez-vous maintenant.",
      keywords: "blog agriculture urbaine, actualités durabilité, conseils culture, histoires microhabitat",
    },
    de: {
      metaTitle: "Urban Farming Blog | Neuigkeiten & Tipps von Microhabitat",
      metaDescription: "Bleiben Sie auf dem Laufenden mit den neuesten Urban-Farming-Trends, Nachhaltigkeitstipps, Projektgeschichten & Experteneinblicken. Abonnieren Sie für wöchentliche Updates.",
      keywords: "urban farming blog, nachhaltigkeits-news, farming tipps, microhabitat geschichten",
    },
    nl: {
      metaTitle: "Stadslandbouw Blog | Nieuws & Tips van Microhabitat",
      metaDescription: "Blijf op de hoogte van de laatste stadslandbouwtrends, duurzaamheidstips, projectverhalen en expertinzichten van het Microhabitat team. Schrijf je in voor updates.",
      keywords: "stadslandbouw blog, duurzaamheidsnieuws, landbouwtips, microhabitat verhalen",
    },
    it: {
      metaTitle: "Blog Agricoltura Urbana | Notizie e Consigli da Microhabitat",
      metaDescription: "Rimani aggiornato sulle ultime tendenze dell'agricoltura urbana, consigli sulla sostenibilità, storie di progetti e approfondimenti degli esperti Microhabitat.",
      keywords: "blog agricoltura urbana, notizie sostenibilità, consigli agricoltura, storie microhabitat",
    },
    es: {
      metaTitle: "Blog Agricultura Urbana | Noticias y Consejos de Microhabitat",
      metaDescription: "Mantente actualizado con las últimas tendencias en agricultura urbana, consejos de sostenibilidad, historias de proyectos e insights de expertos de Microhabitat.",
      keywords: "blog agricultura urbana, noticias sostenibilidad, consejos cultivo, historias microhabitat",
    },
  },

  "cities-page": {
    en: {
      metaTitle: "Urban Farm Locations | 20+ Cities Across North America & Europe",
      metaDescription: "Explore Microhabitat's urban farming locations in Montreal, Toronto, New York, Paris, London & more. Find a farm near you and discover local urban agriculture initiatives.",
      keywords: "urban farm locations, cities, Montreal, Toronto, New York, Paris, London, urban farming near me",
    },
    fr: {
      metaTitle: "Emplacements des Fermes Urbaines | 20+ Villes Amérique du Nord et Europe",
      metaDescription: "Explorez les emplacements Microhabitat à Montréal, Toronto, New York, Paris, Londres et plus. Trouvez une ferme près de chez vous et découvrez l'agriculture urbaine locale.",
      keywords: "emplacements fermes urbaines, villes, Montréal, Toronto, New York, Paris, agriculture près de moi",
    },
    de: {
      metaTitle: "Stadtfarm-Standorte | 20+ Städte in Nordamerika & Europa",
      metaDescription: "Entdecken Sie Microhabitats Stadtfarm-Standorte in Montreal, Toronto, New York, Paris, London & mehr. Finden Sie eine Farm in Ihrer Nähe und entdecken Sie lokale Initiativen.",
      keywords: "stadtfarm standorte, städte, Montreal, Toronto, New York, Paris, London, urban farming in meiner nähe",
    },
    nl: {
      metaTitle: "Stadsboerderij Locaties | 20+ Steden in Noord-Amerika & Europa",
      metaDescription: "Ontdek Microhabitat's stadslandbouwlocaties in Montreal, Toronto, New York, Parijs, Londen en meer. Vind een boerderij bij u in de buurt en ontdek lokale initiatieven.",
      keywords: "stadsboerderij locaties, steden, Montreal, Toronto, New York, Parijs, stadslandbouw bij mij",
    },
    it: {
      metaTitle: "Sedi delle Fattorie Urbane | 20+ Città in Nord America ed Europa",
      metaDescription: "Esplora le sedi Microhabitat a Montreal, Toronto, New York, Parigi, Londra e altre città. Trova una fattoria vicino a te e scopri le iniziative di agricoltura urbana locale.",
      keywords: "sedi fattorie urbane, città, Montreal, Toronto, New York, Parigi, Londra, agricoltura vicino a me",
    },
    es: {
      metaTitle: "Ubicaciones de Granjas Urbanas | 20+ Ciudades en América del Norte y Europa",
      metaDescription: "Explora las ubicaciones de Microhabitat en Montreal, Toronto, Nueva York, París, Londres y más. Encuentra una granja cerca de ti y descubre iniciativas de agricultura urbana.",
      keywords: "ubicaciones granjas urbanas, ciudades, Montreal, Toronto, Nueva York, París, agricultura cerca de mí",
    },
  },

  "privacy-policy-page": {
    en: {
      metaTitle: "Privacy Policy | Microhabitat Data Protection & Your Rights",
      metaDescription: "Learn how Microhabitat collects, uses & protects your personal data. Our privacy policy explains your rights under GDPR, CCPA & other data protection regulations.",
      keywords: "privacy policy, data protection, GDPR, CCPA, personal data, user rights",
      noIndex: true,
    },
    fr: {
      metaTitle: "Politique de Confidentialité | Protection des Données Microhabitat",
      metaDescription: "Découvrez comment Microhabitat collecte, utilise et protège vos données personnelles. Notre politique explique vos droits sous le RGPD et autres réglementations.",
      keywords: "politique confidentialité, protection données, RGPD, données personnelles, droits utilisateur",
      noIndex: true,
    },
    de: {
      metaTitle: "Datenschutzrichtlinie | Microhabitat Datenschutz & Ihre Rechte",
      metaDescription: "Erfahren Sie, wie Microhabitat Ihre personenbezogenen Daten erhebt, verwendet & schützt. Unsere Datenschutzrichtlinie erklärt Ihre Rechte unter DSGVO & anderen Vorschriften.",
      keywords: "datenschutzrichtlinie, datenschutz, DSGVO, personenbezogene daten, nutzerrechte",
      noIndex: true,
    },
    nl: {
      metaTitle: "Privacybeleid | Microhabitat Gegevensbescherming & Uw Rechten",
      metaDescription: "Lees hoe Microhabitat uw persoonsgegevens verzamelt, gebruikt en beschermt. Ons privacybeleid legt uw rechten uit onder AVG en andere gegevensbeschermingsregels.",
      keywords: "privacybeleid, gegevensbescherming, AVG, persoonsgegevens, gebruikersrechten",
      noIndex: true,
    },
    it: {
      metaTitle: "Informativa sulla Privacy | Protezione Dati Microhabitat e Tuoi Diritti",
      metaDescription: "Scopri come Microhabitat raccoglie, utilizza e protegge i tuoi dati personali. La nostra informativa spiega i tuoi diritti secondo GDPR e altre normative sulla protezione.",
      keywords: "informativa privacy, protezione dati, GDPR, dati personali, diritti utente",
      noIndex: true,
    },
    es: {
      metaTitle: "Política de Privacidad | Protección de Datos Microhabitat y Tus Derechos",
      metaDescription: "Conoce cómo Microhabitat recopila, usa y protege tus datos personales. Nuestra política de privacidad explica tus derechos bajo GDPR, CCPA y otras regulaciones.",
      keywords: "política privacidad, protección datos, GDPR, CCPA, datos personales, derechos usuario",
      noIndex: true,
    },
  },

  "terms-of-service-page": {
    en: {
      metaTitle: "Terms of Service | Microhabitat Website & Service Agreement",
      metaDescription: "Read Microhabitat's terms of service governing your use of our website, urban farming services & digital platforms. Last updated December 2024.",
      keywords: "terms of service, terms and conditions, user agreement, service terms, legal",
      noIndex: true,
    },
    fr: {
      metaTitle: "Conditions d'Utilisation | Accord de Service Microhabitat",
      metaDescription: "Lisez les conditions d'utilisation de Microhabitat régissant votre utilisation de notre site web, services d'agriculture urbaine et plateformes numériques.",
      keywords: "conditions utilisation, conditions générales, accord utilisateur, conditions service, légal",
      noIndex: true,
    },
    de: {
      metaTitle: "Nutzungsbedingungen | Microhabitat Website & Service-Vereinbarung",
      metaDescription: "Lesen Sie die Nutzungsbedingungen von Microhabitat für die Nutzung unserer Website, Urban-Farming-Services & digitalen Plattformen. Zuletzt aktualisiert Dezember 2024.",
      keywords: "nutzungsbedingungen, AGB, nutzervereinbarung, servicebedingungen, rechtliches",
      noIndex: true,
    },
    nl: {
      metaTitle: "Servicevoorwaarden | Microhabitat Website & Service Overeenkomst",
      metaDescription: "Lees de servicevoorwaarden van Microhabitat voor het gebruik van onze website, stadslandbouwdiensten en digitale platformen. Laatst bijgewerkt december 2024.",
      keywords: "servicevoorwaarden, algemene voorwaarden, gebruikersovereenkomst, dienstvoorwaarden, juridisch",
      noIndex: true,
    },
    it: {
      metaTitle: "Termini di Servizio | Accordo Sito Web e Servizi Microhabitat",
      metaDescription: "Leggi i termini di servizio di Microhabitat che regolano l'uso del nostro sito web, servizi di agricoltura urbana e piattaforme digitali. Ultimo aggiornamento dicembre 2024.",
      keywords: "termini di servizio, termini e condizioni, accordo utente, termini servizio, legale",
      noIndex: true,
    },
    es: {
      metaTitle: "Términos de Servicio | Acuerdo de Sitio Web y Servicios Microhabitat",
      metaDescription: "Lee los términos de servicio de Microhabitat que rigen el uso de nuestro sitio web, servicios de agricultura urbana y plataformas digitales. Última actualización diciembre 2024.",
      keywords: "términos de servicio, términos y condiciones, acuerdo usuario, términos servicio, legal",
      noIndex: true,
    },
  },

  "cookie-policy-page": {
    en: {
      metaTitle: "Cookie Policy | How Microhabitat Uses Cookies & Tracking",
      metaDescription: "Understand how Microhabitat uses cookies, analytics & tracking technologies on our website. Learn how to manage your cookie preferences and opt-out options.",
      keywords: "cookie policy, cookies, tracking, analytics, opt-out, cookie preferences",
      noIndex: true,
    },
    fr: {
      metaTitle: "Politique de Cookies | Comment Microhabitat Utilise les Cookies",
      metaDescription: "Comprenez comment Microhabitat utilise les cookies, analyses et technologies de suivi. Apprenez à gérer vos préférences de cookies et options de désactivation.",
      keywords: "politique cookies, cookies, suivi, analytique, désactivation, préférences cookies",
      noIndex: true,
    },
    de: {
      metaTitle: "Cookie-Richtlinie | Wie Microhabitat Cookies & Tracking Nutzt",
      metaDescription: "Verstehen Sie, wie Microhabitat Cookies, Analytics & Tracking-Technologien nutzt. Erfahren Sie, wie Sie Ihre Cookie-Einstellungen verwalten und Opt-out-Optionen nutzen.",
      keywords: "cookie-richtlinie, cookies, tracking, analytics, opt-out, cookie-einstellungen",
      noIndex: true,
    },
    nl: {
      metaTitle: "Cookiebeleid | Hoe Microhabitat Cookies & Tracking Gebruikt",
      metaDescription: "Begrijp hoe Microhabitat cookies, analytics en tracking-technologieën gebruikt. Leer hoe u uw cookievoorkeuren beheert en opt-out opties gebruikt.",
      keywords: "cookiebeleid, cookies, tracking, analytics, opt-out, cookievoorkeuren",
      noIndex: true,
    },
    it: {
      metaTitle: "Politica sui Cookie | Come Microhabitat Utilizza Cookie e Tracking",
      metaDescription: "Comprendi come Microhabitat utilizza cookie, analytics e tecnologie di tracciamento. Scopri come gestire le tue preferenze sui cookie e le opzioni di opt-out.",
      keywords: "politica cookie, cookie, tracciamento, analytics, opt-out, preferenze cookie",
      noIndex: true,
    },
    es: {
      metaTitle: "Política de Cookies | Cómo Microhabitat Usa Cookies y Seguimiento",
      metaDescription: "Comprende cómo Microhabitat usa cookies, analytics y tecnologías de seguimiento. Aprende a gestionar tus preferencias de cookies y opciones de exclusión.",
      keywords: "política cookies, cookies, seguimiento, analytics, exclusión, preferencias cookies",
      noIndex: true,
    },
  },
};

const locales = ["en", "fr", "de", "nl", "it", "es"];

async function updatePageSEO(endpoint: string, locale: string, seoData: SEOData) {
  const url = `${STRAPI_URL}/api/${endpoint}?locale=${locale}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          seo: seoData,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ ${endpoint} (${locale}): ${response.status} - ${errorText}`);
      return false;
    }

    const result = await response.json();
    const title = result.data?.seo?.metaTitle || "Updated";
    console.log(`✅ ${endpoint} (${locale}): ${title.length}/60 chars`);
    return true;
  } catch (error) {
    console.error(`❌ ${endpoint} (${locale}): ${error}`);
    return false;
  }
}

async function main() {
  console.log("🚀 Updating SEO for all pages in all languages...\n");

  let successCount = 0;
  let failCount = 0;

  for (const [endpoint, localeData] of Object.entries(SEO_DATA)) {
    console.log(`\n📄 ${endpoint}`);

    for (const locale of locales) {
      const seoData = localeData[locale];
      if (seoData) {
        const success = await updatePageSEO(endpoint, locale, seoData);
        if (success) {
          successCount++;
        } else {
          failCount++;
        }
      }
    }
  }

  console.log(`\n✨ Complete! ${successCount} succeeded, ${failCount} failed`);
  console.log(`Total: ${Object.keys(SEO_DATA).length} pages × ${locales.length} languages = ${Object.keys(SEO_DATA).length * locales.length} SEO entries`);
}

main();
