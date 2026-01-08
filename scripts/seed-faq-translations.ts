/**
 * Seed French (fr) and Dutch (nl) translations for FAQ items only
 * Run with: bun run scripts/seed-faq-translations.ts
 */

import { getPayload } from 'payload';
import config from '../payload.config';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// FAQ translations
const faqTranslations = {
  fr: [
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
  nl: [
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
};

async function seedFAQTranslations() {
  console.log('Starting FAQ translation seed for FR and NL...\n');

  const payload = await getPayload({ config });

  console.log('Updating FAQ translations...');
  const { docs: faqItems } = await payload.find({ collection: 'faq-items', limit: 100, sort: 'order' });

  console.log(`Found ${faqItems.length} FAQ items\n`);

  for (let i = 0; i < faqItems.length && i < faqTranslations.fr.length; i++) {
    const faq = faqItems[i];
    const category = faq.category as string; // Keep the same category value

    try {
      // Update French - include category (required localized field)
      await payload.update({
        collection: 'faq-items',
        id: faq.id,
        locale: 'fr',
        data: {
          question: faqTranslations.fr[i].q,
          answer: faqTranslations.fr[i].a,
          category: category, // Keep English category (it's the select value)
        },
      });

      await delay(150);

      // Update Dutch - include category (required localized field)
      await payload.update({
        collection: 'faq-items',
        id: faq.id,
        locale: 'nl',
        data: {
          question: faqTranslations.nl[i].q,
          answer: faqTranslations.nl[i].a,
          category: category, // Keep English category (it's the select value)
        },
      });

      console.log(`  FAQ ${i + 1}: ${(faq.question as string).substring(0, 40)}... updated`);
    } catch (err: any) {
      console.log(`  FAQ ${i + 1} error: ${err.message}`);
    }

    await delay(200);
  }

  console.log('\n==================================================');
  console.log('FAQ Translation seed completed!');
  console.log('==================================================\n');

  process.exit(0);
}

seedFAQTranslations().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
