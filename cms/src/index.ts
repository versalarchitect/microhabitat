import type { Core } from "@strapi/strapi";
import path from "path";
import fs from "fs";
import https from "https";
import http from "http";

// Helper to download image from URL and save locally
async function downloadImage(url: string, filename: string): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filepath = path.join(uploadsDir, filename);

  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        downloadImage(response.headers.location!, filename).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve(filepath);
      });
    }).on("error", (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Helper to get MIME type from extension
function getMimeType(filepath: string): string {
  const ext = path.extname(filepath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
  };
  return mimeTypes[ext] || "image/jpeg";
}

// Helper to upload file to Strapi media library
async function uploadToMediaLibrary(
  strapi: Core.Strapi,
  filepath: string,
  name: string,
  altText: string
): Promise<number | null> {
  try {
    const stats = fs.statSync(filepath);
    const mimetype = getMimeType(filepath);

    // Strapi 5 upload service expects formidable-style file object
    const uploadedFiles = await strapi.plugins.upload.services.upload.upload({
      data: {
        fileInfo: {
          name: name,
          alternativeText: altText,
          caption: "",
        },
      },
      files: {
        filepath: filepath,
        originalFilename: path.basename(filepath),
        mimetype: mimetype,
        size: stats.size,
      },
    });

    if (uploadedFiles && uploadedFiles.length > 0) {
      return uploadedFiles[0].id;
    }
    return null;
  } catch (error) {
    console.error(`[Bootstrap] Failed to upload ${name}:`, error);
    return null;
  }
}

// Image URLs
const IMAGES = {
  hero: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
  impact1: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
  impact2: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/21e1af91-426e-4d14-937c-db9f51b817aa/Team+smile+%281%29.jpg",
  impact3: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  service1: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c59af8d9-e1c4-4139-abd8-8002026fa2f4/Starlight_45+Forty+Second+St-1829-Edit_MicroHabitat+2024.jpg",
  service2: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c4b9e4e9-eeb4-4408-bd49-492033a12fec/educational-activities.jpg",
  service3: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/5c71ed03-e569-4cf2-b217-b4cd0b3f501a/grown-locally.jpg",
  testimonial1: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/ee544728-972c-4b64-9d95-142a579f983c/555-Richmond-W-5323-8-e1650907079985.jpg",
  bnpLogo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/7cc8afae-d8c7-4c12-9b02-ef36319b3c75/BNP-Paribas-Logo-768x432.png",
  gwlLogo: "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/52266300-fb02-4529-a42e-ffdc33cfdd11/gwl-logo.png",
};

// Partner logo URLs
const PARTNER_LOGOS = [
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/14388830-877d-49a6-a118-59248c8cd138/75.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/31940f06-5b07-4eaa-a95f-1cfd624111f9/76.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/1f61d8c8-316c-4d8d-b2bb-28bff2147b93/77.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/4711e554-ab23-4dd8-8b6d-df130f9e8392/78.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/a60b66d6-254b-482e-a849-ba10dbe2dc81/79.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c66c9275-7ec9-4e3e-9991-f70b0cb3f161/80.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/060044a6-3d98-470d-86d5-d097cf5272ae/81.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/8dc2bda2-02d6-4806-91e0-162eac3ab2d8/82.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/0c4d446b-b179-4dfa-9fc0-20eb39b8f272/83.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/e2c49e2a-9727-4c29-a681-597ae571ea00/84.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/34a75b7a-bab4-443d-a01b-d53939ee07dd/85.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c562fae7-6131-44f7-97a1-3ce4b7f7918d/86.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/9532f9be-5f37-403a-be25-29bf6fa8e8e7/87.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/64371915-b369-4a74-973c-dd8f5cc1af14/88.png",
  "https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/c2554e99-1be0-476e-97e8-2407afcb963c/89.png",
];

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    try {
      // ================================================================
      // 1. Create admin user
      // ================================================================
      const adminCount = await strapi.db.query("admin::user").count({ where: { email: "admin@microhabitat.com" } });
      if (adminCount === 0) {
        console.log("[Bootstrap] Creating admin user...");
        const hashedPassword = await strapi.admin.services.auth.hashPassword("Admin123!");
        await strapi.db.query("admin::user").create({
          data: { firstname: "Admin", lastname: "User", email: "admin@microhabitat.com", password: hashedPassword, isActive: true, roles: [1] },
        });
        console.log("[Bootstrap] Admin user created: admin@microhabitat.com / Admin123!");
      }

      // ================================================================
      // 2. Create API token
      // ================================================================
      const tokenCount = await strapi.db.query("admin::api-token").count({ where: { name: "Development Token" } });
      if (tokenCount === 0) {
        console.log("[Bootstrap] Creating API token...");
        const token = await strapi.admin.services["api-token"].create({ name: "Development Token", description: "Token for local development", type: "full-access", lifespan: null });
        console.log("[Bootstrap] API Token created:");
        console.log(`VITE_STRAPI_TOKEN=${token.accessKey}`);
      }

      // ================================================================
      // 3. Set up public permissions for all content types
      // ================================================================
      const publicRole = await strapi.db.query("plugin::users-permissions.role").findOne({ where: { type: "public" } });
      if (publicRole) {
        const contentTypes = [
          "api::hero.hero", "api::stat.stat", "api::service.service", "api::testimonial.testimonial",
          "api::partner.partner", "api::city.city", "api::nav-link.nav-link", "api::footer-section.footer-section",
          "api::faq.faq", "api::impact-section.impact-section", "api::cta-section.cta-section",
          "api::services-section.services-section", "api::partners-section.partners-section",
          "api::testimonials-section.testimonials-section", "api::cities-section.cities-section",
          "api::faq-section.faq-section",
        ];
        for (const ct of contentTypes) {
          for (const action of ["find", "findOne"]) {
            const permissionAction = `${ct}.${action}`;
            const exists = await strapi.db.query("plugin::users-permissions.permission").findOne({ where: { action: permissionAction, role: publicRole.id } });
            if (!exists) {
              await strapi.db.query("plugin::users-permissions.permission").create({ data: { action: permissionAction, role: publicRole.id } });
            }
          }
        }
        console.log("[Bootstrap] Public API permissions configured");
      }

      // ================================================================
      // 4. Download and upload images
      // ================================================================
      console.log("[Bootstrap] Downloading and uploading images...");
      const uploadedImages: Record<string, number | null> = {};

      // Download and upload each image
      for (const [key, url] of Object.entries(IMAGES)) {
        try {
          const filename = `${key}-${Date.now()}.jpg`;
          const filepath = await downloadImage(url, filename);
          const imageId = await uploadToMediaLibrary(strapi, filepath, key, `MicroHabitat ${key} image`);
          uploadedImages[key] = imageId;
          console.log(`[Bootstrap] Uploaded ${key}: ID ${imageId}`);
        } catch (e) {
          console.error(`[Bootstrap] Failed to download/upload ${key}:`, e);
          uploadedImages[key] = null;
        }
      }

      // Upload partner logos
      const partnerImageIds: (number | null)[] = [];
      for (let i = 0; i < PARTNER_LOGOS.length; i++) {
        try {
          const filename = `partner-${i + 1}-${Date.now()}.png`;
          const filepath = await downloadImage(PARTNER_LOGOS[i], filename);
          const imageId = await uploadToMediaLibrary(strapi, filepath, `Partner ${i + 1}`, `Partner logo ${i + 1}`);
          partnerImageIds.push(imageId);
        } catch (e) {
          partnerImageIds.push(null);
        }
      }
      console.log("[Bootstrap] Partner logos uploaded");

      // ================================================================
      // 5. Seed Hero (All 6 locales)
      // ================================================================
      const heroEn = await strapi.documents("api::hero.hero").findFirst({ locale: "en" });
      if (!heroEn) {
        console.log("[Bootstrap] Creating hero content...");
        const heroData = {
          en: { title: "The world's largest", titleHighlight: "urban farming network", subtitle: "We transform underutilized urban spaces into revenue-generating, impact-creating ecosystems that deliver bottom-line results.", ctaPrimary: "Book a Demo", ctaSecondary: "Learn More", label: "North America · Europe" },
          fr: { title: "Le plus grand réseau", titleHighlight: "d'agriculture urbaine au monde", subtitle: "Nous transformons les espaces urbains sous-utilisés en écosystèmes générateurs de revenus et d'impact qui offrent des résultats concrets.", ctaPrimary: "Réserver une démo", ctaSecondary: "En savoir plus", label: "Amérique du Nord · Europe" },
          de: { title: "Das weltweit größte", titleHighlight: "Urban-Farming-Netzwerk", subtitle: "Wir verwandeln ungenutzte städtische Flächen in umsatzgenerierende, wirkungsvolle Ökosysteme, die konkrete Ergebnisse liefern.", ctaPrimary: "Demo buchen", ctaSecondary: "Mehr erfahren", label: "Nordamerika · Europa" },
          nl: { title: "Het grootste", titleHighlight: "stedelijke landbouwnetwerk ter wereld", subtitle: "Wij transformeren onderbenutte stedelijke ruimtes in omzet-genererende, impactvolle ecosystemen die concrete resultaten leveren.", ctaPrimary: "Demo boeken", ctaSecondary: "Meer informatie", label: "Noord-Amerika · Europa" },
          it: { title: "La più grande rete", titleHighlight: "di agricoltura urbana al mondo", subtitle: "Trasformiamo spazi urbani sottoutilizzati in ecosistemi generatori di reddito e impatto che offrono risultati concreti.", ctaPrimary: "Prenota una demo", ctaSecondary: "Scopri di più", label: "Nord America · Europa" },
          es: { title: "La red de agricultura urbana", titleHighlight: "más grande del mundo", subtitle: "Transformamos espacios urbanos subutilizados en ecosistemas generadores de ingresos e impacto que ofrecen resultados concretos.", ctaPrimary: "Reservar una demo", ctaSecondary: "Más información", label: "Norteamérica · Europa" },
        };
        for (const [locale, data] of Object.entries(heroData)) {
          await strapi.documents("api::hero.hero").create({ locale, data: { ...data, image: uploadedImages.hero } });
        }
      }

      // ================================================================
      // 6. Seed Stats (All 6 locales)
      // ================================================================
      const statsEn = await strapi.documents("api::stat.stat").findFirst({ locale: "en" });
      if (!statsEn) {
        console.log("[Bootstrap] Creating stats...");
        const statsData: Record<string, Array<{ value: number; suffix: string; label: string; description: string; order: number }>> = {
          en: [
            { value: 250, suffix: "+", label: "Urban Farms", description: "Active farms across North America and Europe", order: 1 },
            { value: 35, suffix: "+", label: "Food Banks", description: "Local food banks partnered for donations", order: 2 },
            { value: 40000, suffix: "", label: "Portions Donated", description: "Portions of food donated to communities", order: 3 },
            { value: 13000, suffix: "", label: "Funded Meals", description: "Meals funded through our programs", order: 4 },
            { value: 59400, suffix: "", label: "Lbs Harvested", description: "Pounds of produce harvested for clients", order: 5 },
          ],
          fr: [
            { value: 250, suffix: "+", label: "Fermes urbaines", description: "Fermes actives en Amérique du Nord et en Europe", order: 1 },
            { value: 35, suffix: "+", label: "Banques alimentaires", description: "Banques alimentaires locales partenaires pour les dons", order: 2 },
            { value: 40000, suffix: "", label: "Portions données", description: "Portions de nourriture données aux communautés", order: 3 },
            { value: 13000, suffix: "", label: "Repas financés", description: "Repas financés par nos programmes", order: 4 },
            { value: 59400, suffix: "", label: "Lbs récoltées", description: "Livres de produits récoltées pour les clients", order: 5 },
          ],
          de: [
            { value: 250, suffix: "+", label: "Urban Farms", description: "Aktive Farmen in Nordamerika und Europa", order: 1 },
            { value: 35, suffix: "+", label: "Tafeln", description: "Lokale Tafeln als Partner für Spenden", order: 2 },
            { value: 40000, suffix: "", label: "Gespendete Portionen", description: "Portionen an Gemeinden gespendet", order: 3 },
            { value: 13000, suffix: "", label: "Finanzierte Mahlzeiten", description: "Durch unsere Programme finanzierte Mahlzeiten", order: 4 },
            { value: 59400, suffix: "", label: "Lbs geerntet", description: "Pfund Produkte für Kunden geerntet", order: 5 },
          ],
          nl: [
            { value: 250, suffix: "+", label: "Stadsboerderijen", description: "Actieve boerderijen in Noord-Amerika en Europa", order: 1 },
            { value: 35, suffix: "+", label: "Voedselbanken", description: "Lokale voedselbanken als partners voor donaties", order: 2 },
            { value: 40000, suffix: "", label: "Gedoneerde porties", description: "Porties voedsel gedoneerd aan gemeenschappen", order: 3 },
            { value: 13000, suffix: "", label: "Gefinancierde maaltijden", description: "Maaltijden gefinancierd via onze programma's", order: 4 },
            { value: 59400, suffix: "", label: "Lbs geoogst", description: "Pond producten geoogst voor klanten", order: 5 },
          ],
          it: [
            { value: 250, suffix: "+", label: "Fattorie urbane", description: "Fattorie attive in Nord America ed Europa", order: 1 },
            { value: 35, suffix: "+", label: "Banchi alimentari", description: "Banchi alimentari locali partner per le donazioni", order: 2 },
            { value: 40000, suffix: "", label: "Porzioni donate", description: "Porzioni di cibo donate alle comunità", order: 3 },
            { value: 13000, suffix: "", label: "Pasti finanziati", description: "Pasti finanziati attraverso i nostri programmi", order: 4 },
            { value: 59400, suffix: "", label: "Lbs raccolte", description: "Libbre di prodotti raccolti per i clienti", order: 5 },
          ],
          es: [
            { value: 250, suffix: "+", label: "Granjas urbanas", description: "Granjas activas en Norteamérica y Europa", order: 1 },
            { value: 35, suffix: "+", label: "Bancos de alimentos", description: "Bancos de alimentos locales asociados para donaciones", order: 2 },
            { value: 40000, suffix: "", label: "Porciones donadas", description: "Porciones de comida donadas a comunidades", order: 3 },
            { value: 13000, suffix: "", label: "Comidas financiadas", description: "Comidas financiadas a través de nuestros programas", order: 4 },
            { value: 59400, suffix: "", label: "Lbs cosechadas", description: "Libras de productos cosechados para clientes", order: 5 },
          ],
        };
        for (const [locale, stats] of Object.entries(statsData)) {
          for (const stat of stats) {
            await strapi.documents("api::stat.stat").create({ locale, data: stat, status: "published" });
          }
        }
      }

      // ================================================================
      // 7. Seed Services (All 6 locales) with images
      // ================================================================
      const servicesEn = await strapi.documents("api::service.service").findFirst({ locale: "en" });
      if (!servicesEn) {
        console.log("[Bootstrap] Creating services...");
        const servicesData: Record<string, Array<{ icon: string; title: string; description: string; features: string[]; order: number }>> = {
          en: [
            { icon: "Leaf", title: "Garden Care & Harvest", description: "Our team expertly ensures your urban garden remains a vibrant and productive centerpiece of your property. Our professional team provides all-encompassing garden care, from plant health, harvesting and full production management.", features: ["Weekly maintenance visits", "Professional cultivation", "Harvest management", "Full production oversight"], order: 1 },
            { icon: "GraduationCap", title: "Educational Activities", description: "Enhance your property's appeal with our dynamic educational offerings. Our workshops are available both in-person and virtually, providing flexible learning opportunities about sustainable urban agriculture.", features: ["In-person workshops", "Virtual sessions", "Farm tours", "Interactive kiosks"], order: 2 },
            { icon: "Heart", title: "Local Harvest Distribution", description: "Enhance your property's community spirit by distributing fresh, ecologically grown produce directly to your occupants or donating it to local charities.", features: ["Fresh produce distribution", "Food bank donations", "Community engagement", "Urban Solidarity Farms program"], order: 3 },
          ],
          fr: [
            { icon: "Leaf", title: "Entretien du jardin et récolte", description: "Notre équipe veille avec expertise à ce que votre jardin urbain reste un élément central vibrant et productif de votre propriété.", features: ["Visites d'entretien hebdomadaires", "Culture professionnelle", "Gestion des récoltes", "Supervision complète de la production"], order: 1 },
            { icon: "GraduationCap", title: "Activités éducatives", description: "Rehaussez l'attrait de votre propriété grâce à nos offres éducatives dynamiques.", features: ["Ateliers en personne", "Sessions virtuelles", "Visites de fermes", "Kiosques interactifs"], order: 2 },
            { icon: "Heart", title: "Distribution des récoltes locales", description: "Renforcez l'esprit communautaire de votre propriété en distribuant des produits frais cultivés écologiquement.", features: ["Distribution de produits frais", "Dons aux banques alimentaires", "Engagement communautaire", "Programme Fermes de solidarité urbaine"], order: 3 },
          ],
          de: [
            { icon: "Leaf", title: "Gartenpflege & Ernte", description: "Unser Team sorgt fachkundig dafür, dass Ihr urbaner Garten ein lebendiger und produktiver Mittelpunkt Ihres Anwesens bleibt.", features: ["Wöchentliche Wartungsbesuche", "Professioneller Anbau", "Erntemanagement", "Vollständige Produktionsüberwachung"], order: 1 },
            { icon: "GraduationCap", title: "Bildungsaktivitäten", description: "Steigern Sie die Attraktivität Ihrer Immobilie mit unseren dynamischen Bildungsangeboten.", features: ["Persönliche Workshops", "Virtuelle Sitzungen", "Farmtouren", "Interaktive Kioske"], order: 2 },
            { icon: "Heart", title: "Lokale Ernteverteilung", description: "Stärken Sie den Gemeinschaftsgeist Ihrer Immobilie durch die Verteilung frischer, ökologisch angebauter Produkte.", features: ["Verteilung frischer Produkte", "Spenden an Tafeln", "Gemeinschaftsengagement", "Urban Solidarity Farms Programm"], order: 3 },
          ],
          nl: [
            { icon: "Leaf", title: "Tuinonderhoud & Oogst", description: "Ons team zorgt er deskundig voor dat uw stadstuin een levendig en productief middelpunt van uw pand blijft.", features: ["Wekelijkse onderhoudsbezoeken", "Professionele teelt", "Oogstbeheer", "Volledige productie-overzicht"], order: 1 },
            { icon: "GraduationCap", title: "Educatieve Activiteiten", description: "Vergroot de aantrekkelijkheid van uw pand met onze dynamische educatieve aanbiedingen.", features: ["Persoonlijke workshops", "Virtuele sessies", "Boerderijrondleidingen", "Interactieve kiosken"], order: 2 },
            { icon: "Heart", title: "Lokale Oogstdistributie", description: "Versterk de gemeenschapsgeest van uw pand door verse, ecologisch geteelde producten te distribueren.", features: ["Distributie van verse producten", "Donaties aan voedselbanken", "Gemeenschapsbetrokkenheid", "Urban Solidarity Farms programma"], order: 3 },
          ],
          it: [
            { icon: "Leaf", title: "Cura del Giardino & Raccolto", description: "Il nostro team garantisce con competenza che il vostro orto urbano rimanga un centro vivace e produttivo della vostra proprietà.", features: ["Visite di manutenzione settimanali", "Coltivazione professionale", "Gestione del raccolto", "Supervisione completa della produzione"], order: 1 },
            { icon: "GraduationCap", title: "Attività Educative", description: "Migliora l'attrattiva della tua proprietà con le nostre offerte educative dinamiche.", features: ["Workshop in presenza", "Sessioni virtuali", "Tour della fattoria", "Chioschi interattivi"], order: 2 },
            { icon: "Heart", title: "Distribuzione del Raccolto Locale", description: "Migliora lo spirito comunitario della tua proprietà distribuendo prodotti freschi coltivati ecologicamente.", features: ["Distribuzione di prodotti freschi", "Donazioni ai banchi alimentari", "Coinvolgimento della comunità", "Programma Urban Solidarity Farms"], order: 3 },
          ],
          es: [
            { icon: "Leaf", title: "Cuidado del Jardín y Cosecha", description: "Nuestro equipo asegura expertamente que su huerto urbano siga siendo un centro vibrante y productivo de su propiedad.", features: ["Visitas de mantenimiento semanales", "Cultivo profesional", "Gestión de cosecha", "Supervisión completa de producción"], order: 1 },
            { icon: "GraduationCap", title: "Actividades Educativas", description: "Mejore el atractivo de su propiedad con nuestras ofertas educativas dinámicas.", features: ["Talleres presenciales", "Sesiones virtuales", "Tours de granja", "Quioscos interactivos"], order: 2 },
            { icon: "Heart", title: "Distribución de Cosecha Local", description: "Mejore el espíritu comunitario de su propiedad distribuyendo productos frescos cultivados ecológicamente.", features: ["Distribución de productos frescos", "Donaciones a bancos de alimentos", "Compromiso comunitario", "Programa Urban Solidarity Farms"], order: 3 },
          ],
        };
        const serviceImages = [uploadedImages.service1, uploadedImages.service2, uploadedImages.service3];
        for (const [locale, services] of Object.entries(servicesData)) {
          for (let i = 0; i < services.length; i++) {
            await strapi.documents("api::service.service").create({ locale, data: { ...services[i], image: serviceImages[i] }, status: "published" });
          }
        }
      }

      // ================================================================
      // 8. Seed Testimonials (All 6 locales) with images
      // ================================================================
      const testimonialsEn = await strapi.documents("api::testimonial.testimonial").findFirst({ locale: "en" });
      if (!testimonialsEn) {
        console.log("[Bootstrap] Creating testimonials...");
        const testimonialData: Record<string, Array<{ quote: string; author: string; role: string; company: string; highlight: string; order: number }>> = {
          en: [
            { quote: "Transforming our patio into an urban farm with MicroHabitat was a welcome change for our organization. Since 2021, over 2,850 pounds of vegetables, edible flowers and herbs have been harvested and donated to local food banks.", author: "Cécile G.", role: "", company: "BNP Paribas in Canada", highlight: "2,850 lbs donated since 2021", order: 1 },
            { quote: "Partnering with MicroHabitat has been the highlight of my career. Our rooftop garden has brought new life to our property and re-ignited our tenant engagement initiatives following the Pandemic.", author: "Vanessa S.", role: "Tenant Services Coordinator", company: "GWL Realty Advisors Inc.", highlight: "Revitalized tenant engagement", order: 2 },
          ],
          fr: [
            { quote: "Transformer notre terrasse en ferme urbaine avec MicroHabitat a été un changement bienvenu pour notre organisation. Depuis 2021, plus de 2 850 livres de légumes, fleurs comestibles et herbes ont été récoltées et données aux banques alimentaires locales.", author: "Cécile G.", role: "", company: "BNP Paribas au Canada", highlight: "2 850 lbs données depuis 2021", order: 1 },
            { quote: "Le partenariat avec MicroHabitat a été le point culminant de ma carrière. Notre jardin sur le toit a apporté une nouvelle vie à notre propriété et a relancé nos initiatives d'engagement des locataires suite à la pandémie.", author: "Vanessa S.", role: "Coordonnatrice des services aux locataires", company: "GWL Realty Advisors Inc.", highlight: "Engagement des locataires revitalisé", order: 2 },
          ],
          de: [
            { quote: "Die Umwandlung unserer Terrasse in eine Urban Farm mit MicroHabitat war eine willkommene Veränderung für unsere Organisation. Seit 2021 wurden über 2.850 Pfund Gemüse, essbare Blumen und Kräuter geerntet und an lokale Tafeln gespendet.", author: "Cécile G.", role: "", company: "BNP Paribas in Kanada", highlight: "2.850 lbs seit 2021 gespendet", order: 1 },
            { quote: "Die Partnerschaft mit MicroHabitat war der Höhepunkt meiner Karriere. Unser Dachgarten hat unserem Anwesen neues Leben eingehaucht und unsere Mieterengagement-Initiativen nach der Pandemie wiederbelebt.", author: "Vanessa S.", role: "Koordinatorin Mieterservice", company: "GWL Realty Advisors Inc.", highlight: "Wiederbelebtes Mieterengagement", order: 2 },
          ],
          nl: [
            { quote: "Het transformeren van ons terras in een stadsboerderij met MicroHabitat was een welkome verandering voor onze organisatie. Sinds 2021 is er meer dan 2.850 pond groenten, eetbare bloemen en kruiden geoogst en gedoneerd aan lokale voedselbanken.", author: "Cécile G.", role: "", company: "BNP Paribas in Canada", highlight: "2.850 lbs gedoneerd sinds 2021", order: 1 },
            { quote: "Samenwerken met MicroHabitat is het hoogtepunt van mijn carrière geweest. Onze daktuin heeft nieuw leven gebracht in ons pand en onze huurderbetrokkenheidsinitiatieven na de pandemie nieuw leven ingeblazen.", author: "Vanessa S.", role: "Coördinator Huurdersdiensten", company: "GWL Realty Advisors Inc.", highlight: "Hersteld huurderbetrokkenheid", order: 2 },
          ],
          it: [
            { quote: "Trasformare il nostro patio in una fattoria urbana con MicroHabitat è stato un cambiamento gradito per la nostra organizzazione. Dal 2021, oltre 2.850 libbre di verdure, fiori commestibili ed erbe sono state raccolte e donate ai banchi alimentari locali.", author: "Cécile G.", role: "", company: "BNP Paribas in Canada", highlight: "2.850 lbs donate dal 2021", order: 1 },
            { quote: "Collaborare con MicroHabitat è stato il momento più alto della mia carriera. Il nostro giardino sul tetto ha portato nuova vita alla nostra proprietà e ha riacceso le nostre iniziative di coinvolgimento degli inquilini dopo la pandemia.", author: "Vanessa S.", role: "Coordinatrice Servizi Inquilini", company: "GWL Realty Advisors Inc.", highlight: "Coinvolgimento inquilini rivitalizzato", order: 2 },
          ],
          es: [
            { quote: "Transformar nuestro patio en una granja urbana con MicroHabitat fue un cambio bienvenido para nuestra organización. Desde 2021, se han cosechado y donado más de 2,850 libras de vegetales, flores comestibles y hierbas a bancos de alimentos locales.", author: "Cécile G.", role: "", company: "BNP Paribas en Canadá", highlight: "2,850 lbs donadas desde 2021", order: 1 },
            { quote: "Asociarse con MicroHabitat ha sido el punto culminante de mi carrera. Nuestro jardín en la azotea ha traído nueva vida a nuestra propiedad y ha reactivado nuestras iniciativas de compromiso con los inquilinos después de la pandemia.", author: "Vanessa S.", role: "Coordinadora de Servicios a Inquilinos", company: "GWL Realty Advisors Inc.", highlight: "Compromiso de inquilinos revitalizado", order: 2 },
          ],
        };
        for (const [locale, testimonials] of Object.entries(testimonialData)) {
          for (let i = 0; i < testimonials.length; i++) {
            const images = i === 0 ? { image: uploadedImages.testimonial1, companyLogo: uploadedImages.bnpLogo } : { companyLogo: uploadedImages.gwlLogo };
            await strapi.documents("api::testimonial.testimonial").create({ locale, data: { ...testimonials[i], ...images }, status: "published" });
          }
        }
      }

      // ================================================================
      // 9. Seed Partners with logos
      // ================================================================
      const partnersExist = await strapi.documents("api::partner.partner").findFirst({ locale: "en" });
      if (!partnersExist) {
        console.log("[Bootstrap] Creating partners...");
        for (let i = 0; i < 15; i++) {
          await strapi.documents("api::partner.partner").create({
            locale: "en",
            data: { name: `Partner ${i + 1}`, order: i + 1, logo: partnerImageIds[i] },
            status: "published",
          });
        }
      }

      // ================================================================
      // 10. Seed Cities (All 6 locales)
      // ================================================================
      const citiesEn = await strapi.documents("api::city.city").findFirst({ locale: "en" });
      if (!citiesEn) {
        console.log("[Bootstrap] Creating cities...");
        const citiesData: Record<string, Array<{ name: string; country: string; region: string }>> = {
          en: [
            { name: "Montreal", country: "Canada", region: "north-america" }, { name: "Toronto", country: "Canada", region: "north-america" },
            { name: "Vancouver", country: "Canada", region: "north-america" }, { name: "Calgary", country: "Canada", region: "north-america" },
            { name: "New York City", country: "USA", region: "north-america" }, { name: "Chicago", country: "USA", region: "north-america" },
            { name: "Los Angeles", country: "USA", region: "north-america" }, { name: "San Francisco", country: "USA", region: "north-america" },
            { name: "Paris", country: "France", region: "europe" }, { name: "London", country: "UK", region: "europe" },
            { name: "Berlin", country: "Germany", region: "europe" }, { name: "Amsterdam", country: "Netherlands", region: "europe" },
            { name: "Zurich", country: "Switzerland", region: "europe" },
          ],
          fr: [
            { name: "Montréal", country: "Canada", region: "north-america" }, { name: "Toronto", country: "Canada", region: "north-america" },
            { name: "Vancouver", country: "Canada", region: "north-america" }, { name: "Calgary", country: "Canada", region: "north-america" },
            { name: "New York", country: "États-Unis", region: "north-america" }, { name: "Chicago", country: "États-Unis", region: "north-america" },
            { name: "Los Angeles", country: "États-Unis", region: "north-america" }, { name: "San Francisco", country: "États-Unis", region: "north-america" },
            { name: "Paris", country: "France", region: "europe" }, { name: "Londres", country: "Royaume-Uni", region: "europe" },
            { name: "Berlin", country: "Allemagne", region: "europe" }, { name: "Amsterdam", country: "Pays-Bas", region: "europe" },
            { name: "Zurich", country: "Suisse", region: "europe" },
          ],
          de: [
            { name: "Montreal", country: "Kanada", region: "north-america" }, { name: "Toronto", country: "Kanada", region: "north-america" },
            { name: "Vancouver", country: "Kanada", region: "north-america" }, { name: "Calgary", country: "Kanada", region: "north-america" },
            { name: "New York City", country: "USA", region: "north-america" }, { name: "Chicago", country: "USA", region: "north-america" },
            { name: "Los Angeles", country: "USA", region: "north-america" }, { name: "San Francisco", country: "USA", region: "north-america" },
            { name: "Paris", country: "Frankreich", region: "europe" }, { name: "London", country: "Großbritannien", region: "europe" },
            { name: "Berlin", country: "Deutschland", region: "europe" }, { name: "Amsterdam", country: "Niederlande", region: "europe" },
            { name: "Zürich", country: "Schweiz", region: "europe" },
          ],
          nl: [
            { name: "Montreal", country: "Canada", region: "north-america" }, { name: "Toronto", country: "Canada", region: "north-america" },
            { name: "Vancouver", country: "Canada", region: "north-america" }, { name: "Calgary", country: "Canada", region: "north-america" },
            { name: "New York City", country: "VS", region: "north-america" }, { name: "Chicago", country: "VS", region: "north-america" },
            { name: "Los Angeles", country: "VS", region: "north-america" }, { name: "San Francisco", country: "VS", region: "north-america" },
            { name: "Parijs", country: "Frankrijk", region: "europe" }, { name: "Londen", country: "VK", region: "europe" },
            { name: "Berlijn", country: "Duitsland", region: "europe" }, { name: "Amsterdam", country: "Nederland", region: "europe" },
            { name: "Zürich", country: "Zwitserland", region: "europe" },
          ],
          it: [
            { name: "Montreal", country: "Canada", region: "north-america" }, { name: "Toronto", country: "Canada", region: "north-america" },
            { name: "Vancouver", country: "Canada", region: "north-america" }, { name: "Calgary", country: "Canada", region: "north-america" },
            { name: "New York City", country: "USA", region: "north-america" }, { name: "Chicago", country: "USA", region: "north-america" },
            { name: "Los Angeles", country: "USA", region: "north-america" }, { name: "San Francisco", country: "USA", region: "north-america" },
            { name: "Parigi", country: "Francia", region: "europe" }, { name: "Londra", country: "Regno Unito", region: "europe" },
            { name: "Berlino", country: "Germania", region: "europe" }, { name: "Amsterdam", country: "Paesi Bassi", region: "europe" },
            { name: "Zurigo", country: "Svizzera", region: "europe" },
          ],
          es: [
            { name: "Montreal", country: "Canadá", region: "north-america" }, { name: "Toronto", country: "Canadá", region: "north-america" },
            { name: "Vancouver", country: "Canadá", region: "north-america" }, { name: "Calgary", country: "Canadá", region: "north-america" },
            { name: "Nueva York", country: "EE.UU.", region: "north-america" }, { name: "Chicago", country: "EE.UU.", region: "north-america" },
            { name: "Los Ángeles", country: "EE.UU.", region: "north-america" }, { name: "San Francisco", country: "EE.UU.", region: "north-america" },
            { name: "París", country: "Francia", region: "europe" }, { name: "Londres", country: "Reino Unido", region: "europe" },
            { name: "Berlín", country: "Alemania", region: "europe" }, { name: "Ámsterdam", country: "Países Bajos", region: "europe" },
            { name: "Zúrich", country: "Suiza", region: "europe" },
          ],
        };
        for (const [locale, cities] of Object.entries(citiesData)) {
          for (const city of cities) {
            await strapi.documents("api::city.city").create({ locale, data: city, status: "published" });
          }
        }
      }

      // ================================================================
      // 11. Seed Nav Links (All 6 locales)
      // ================================================================
      const navLinksEn = await strapi.documents("api::nav-link.nav-link").findFirst({ locale: "en" });
      if (!navLinksEn) {
        console.log("[Bootstrap] Creating nav links...");
        const navData: Record<string, Array<{ label: string; href: string; order: number }>> = {
          en: [{ label: "Services", href: "#services", order: 1 }, { label: "Impact", href: "#impact", order: 2 }, { label: "Testimonials", href: "#testimonials", order: 3 }, { label: "Cities", href: "#cities", order: 4 }, { label: "FAQ", href: "#faq", order: 5 }],
          fr: [{ label: "Services", href: "#services", order: 1 }, { label: "Impact", href: "#impact", order: 2 }, { label: "Témoignages", href: "#testimonials", order: 3 }, { label: "Villes", href: "#cities", order: 4 }, { label: "FAQ", href: "#faq", order: 5 }],
          de: [{ label: "Dienste", href: "#services", order: 1 }, { label: "Wirkung", href: "#impact", order: 2 }, { label: "Referenzen", href: "#testimonials", order: 3 }, { label: "Städte", href: "#cities", order: 4 }, { label: "FAQ", href: "#faq", order: 5 }],
          nl: [{ label: "Diensten", href: "#services", order: 1 }, { label: "Impact", href: "#impact", order: 2 }, { label: "Getuigenissen", href: "#testimonials", order: 3 }, { label: "Steden", href: "#cities", order: 4 }, { label: "FAQ", href: "#faq", order: 5 }],
          it: [{ label: "Servizi", href: "#services", order: 1 }, { label: "Impatto", href: "#impact", order: 2 }, { label: "Testimonianze", href: "#testimonials", order: 3 }, { label: "Città", href: "#cities", order: 4 }, { label: "FAQ", href: "#faq", order: 5 }],
          es: [{ label: "Servicios", href: "#services", order: 1 }, { label: "Impacto", href: "#impact", order: 2 }, { label: "Testimonios", href: "#testimonials", order: 3 }, { label: "Ciudades", href: "#cities", order: 4 }, { label: "FAQ", href: "#faq", order: 5 }],
        };
        for (const [locale, links] of Object.entries(navData)) {
          for (const link of links) { await strapi.documents("api::nav-link.nav-link").create({ locale, data: link, status: "published" }); }
        }
      }

      // ================================================================
      // 12. Seed Footer Sections (All 6 locales)
      // ================================================================
      const footerEn = await strapi.documents("api::footer-section.footer-section").findFirst({ locale: "en" });
      if (!footerEn) {
        console.log("[Bootstrap] Creating footer sections...");
        const footerData: Record<string, Array<{ title: string; links: Array<{ label: string; href: string }>; order: number }>> = {
          en: [
            { title: "Services", links: [{ label: "Outdoor Farm", href: "/services/outdoor" }, { label: "Indoor Farm", href: "/services/indoor" }, { label: "Educational Activities", href: "/services/educational" }], order: 1 },
            { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Cities", href: "/cities" }, { label: "Careers", href: "/careers" }, { label: "Partnerships", href: "/partnerships" }], order: 2 },
            { title: "Resources", links: [{ label: "Contact", href: "/contact" }, { label: "FAQ", href: "/faq" }, { label: "Blog", href: "/blog" }], order: 3 },
          ],
          fr: [
            { title: "Services", links: [{ label: "Ferme extérieure", href: "/services/outdoor" }, { label: "Ferme intérieure", href: "/services/indoor" }, { label: "Activités éducatives", href: "/services/educational" }], order: 1 },
            { title: "Entreprise", links: [{ label: "À propos", href: "/about" }, { label: "Villes", href: "/cities" }, { label: "Carrières", href: "/careers" }, { label: "Partenariats", href: "/partnerships" }], order: 2 },
            { title: "Ressources", links: [{ label: "Contact", href: "/contact" }, { label: "FAQ", href: "/faq" }, { label: "Blogue", href: "/blog" }], order: 3 },
          ],
          de: [
            { title: "Dienste", links: [{ label: "Outdoor-Farm", href: "/services/outdoor" }, { label: "Indoor-Farm", href: "/services/indoor" }, { label: "Bildungsaktivitäten", href: "/services/educational" }], order: 1 },
            { title: "Unternehmen", links: [{ label: "Über uns", href: "/about" }, { label: "Städte", href: "/cities" }, { label: "Karriere", href: "/careers" }, { label: "Partnerschaften", href: "/partnerships" }], order: 2 },
            { title: "Ressourcen", links: [{ label: "Kontakt", href: "/contact" }, { label: "FAQ", href: "/faq" }, { label: "Blog", href: "/blog" }], order: 3 },
          ],
          nl: [
            { title: "Diensten", links: [{ label: "Buitenboerderij", href: "/services/outdoor" }, { label: "Binnenboerderij", href: "/services/indoor" }, { label: "Educatieve activiteiten", href: "/services/educational" }], order: 1 },
            { title: "Bedrijf", links: [{ label: "Over ons", href: "/about" }, { label: "Steden", href: "/cities" }, { label: "Carrières", href: "/careers" }, { label: "Partnerschappen", href: "/partnerships" }], order: 2 },
            { title: "Bronnen", links: [{ label: "Contact", href: "/contact" }, { label: "FAQ", href: "/faq" }, { label: "Blog", href: "/blog" }], order: 3 },
          ],
          it: [
            { title: "Servizi", links: [{ label: "Fattoria esterna", href: "/services/outdoor" }, { label: "Fattoria interna", href: "/services/indoor" }, { label: "Attività educative", href: "/services/educational" }], order: 1 },
            { title: "Azienda", links: [{ label: "Chi siamo", href: "/about" }, { label: "Città", href: "/cities" }, { label: "Carriere", href: "/careers" }, { label: "Partnership", href: "/partnerships" }], order: 2 },
            { title: "Risorse", links: [{ label: "Contatti", href: "/contact" }, { label: "FAQ", href: "/faq" }, { label: "Blog", href: "/blog" }], order: 3 },
          ],
          es: [
            { title: "Servicios", links: [{ label: "Granja exterior", href: "/services/outdoor" }, { label: "Granja interior", href: "/services/indoor" }, { label: "Actividades educativas", href: "/services/educational" }], order: 1 },
            { title: "Empresa", links: [{ label: "Acerca de", href: "/about" }, { label: "Ciudades", href: "/cities" }, { label: "Carreras", href: "/careers" }, { label: "Asociaciones", href: "/partnerships" }], order: 2 },
            { title: "Recursos", links: [{ label: "Contacto", href: "/contact" }, { label: "FAQ", href: "/faq" }, { label: "Blog", href: "/blog" }], order: 3 },
          ],
        };
        for (const [locale, sections] of Object.entries(footerData)) {
          for (const section of sections) { await strapi.documents("api::footer-section.footer-section").create({ locale, data: section, status: "published" }); }
        }
      }

      // ================================================================
      // 13. Seed FAQs (All 6 locales)
      // ================================================================
      const faqsEn = await strapi.documents("api::faq.faq").findFirst({ locale: "en" });
      if (!faqsEn) {
        console.log("[Bootstrap] Creating FAQs...");
        const faqData: Record<string, Array<{ question: string; answer: string; category: string; order: number }>> = {
          en: [
            { question: "Why would someone integrate urban farming?", answer: "Urban farming offers social and environmental benefits for communities seeking healthier, more sustainable lives. It provides fresh produce, educational opportunities, community engagement, and supports green building certifications.", category: "General", order: 1 },
            { question: "How do I know if my building is suitable?", answer: "Requirements include at least 200 sq ft of space, adequate sunlight (minimum 6 hours daily), accessible water sources, and safe roof access if applicable. Our team can assess your specific situation during a consultation.", category: "General", order: 2 },
            { question: "What is included in the program?", answer: "Our comprehensive package includes: installation, ecological irrigation system, seasonal planting, weekly maintenance visits, harvesting and delivery, educational activities, marketing tools, and corporate gifts (depending on your selected package).", category: "Products", order: 3 },
            { question: "Do you use chemicals or pesticides?", answer: "No, all our gardens are created without the use of chemicals, pesticides, or synthetic fertilizers. We use only sustainable, organic practices to grow healthy produce.", category: "Sustainability", order: 4 },
            { question: "What insurance coverage do you offer?", answer: "Our programs include liability coverage of 5 million dollars for commercial, automobile and excess liability, giving you complete peace of mind.", category: "Technical", order: 5 },
          ],
          fr: [
            { question: "Pourquoi intégrer l'agriculture urbaine?", answer: "L'agriculture urbaine offre des avantages sociaux et environnementaux pour les communautés qui recherchent des modes de vie plus sains et durables.", category: "Général", order: 1 },
            { question: "Comment savoir si mon bâtiment convient?", answer: "Les exigences comprennent au moins 200 pi² d'espace, un ensoleillement adéquat (minimum 6 heures par jour), des sources d'eau accessibles et un accès sécuritaire au toit.", category: "Général", order: 2 },
            { question: "Qu'est-ce qui est inclus dans le programme?", answer: "Notre forfait complet comprend: installation, système d'irrigation écologique, plantation saisonnière, visites d'entretien hebdomadaires, récolte et livraison, activités éducatives.", category: "Produits", order: 3 },
            { question: "Utilisez-vous des produits chimiques ou pesticides?", answer: "Non, tous nos jardins sont créés sans l'utilisation de produits chimiques, pesticides ou engrais synthétiques.", category: "Durabilité", order: 4 },
            { question: "Quelle couverture d'assurance offrez-vous?", answer: "Nos programmes incluent une couverture de responsabilité de 5 millions de dollars pour la responsabilité commerciale, automobile et excédentaire.", category: "Technique", order: 5 },
          ],
          de: [
            { question: "Warum sollte jemand Urban Farming integrieren?", answer: "Urban Farming bietet soziale und ökologische Vorteile für Gemeinschaften, die ein gesünderes, nachhaltigeres Leben anstreben.", category: "Allgemein", order: 1 },
            { question: "Wie weiß ich, ob mein Gebäude geeignet ist?", answer: "Anforderungen umfassen mindestens 20m² Fläche, ausreichend Sonnenlicht (mindestens 6 Stunden täglich), zugängliche Wasserquellen und sicheren Dachzugang.", category: "Allgemein", order: 2 },
            { question: "Was ist im Programm enthalten?", answer: "Unser umfassendes Paket beinhaltet: Installation, ökologisches Bewässerungssystem, saisonale Bepflanzung, wöchentliche Wartungsbesuche, Ernte und Lieferung.", category: "Produkte", order: 3 },
            { question: "Verwenden Sie Chemikalien oder Pestizide?", answer: "Nein, alle unsere Gärten werden ohne den Einsatz von Chemikalien, Pestiziden oder synthetischen Düngemitteln angelegt.", category: "Nachhaltigkeit", order: 4 },
            { question: "Welche Versicherungsdeckung bieten Sie an?", answer: "Unsere Programme beinhalten eine Haftpflichtdeckung von 5 Millionen Dollar für gewerbliche, Automobil- und Überschusshaftung.", category: "Technisch", order: 5 },
          ],
          nl: [
            { question: "Waarom zou iemand stadslandbouw integreren?", answer: "Stadslandbouw biedt sociale en milieuvoordelen voor gemeenschappen die een gezonder, duurzamer leven nastreven.", category: "Algemeen", order: 1 },
            { question: "Hoe weet ik of mijn gebouw geschikt is?", answer: "Vereisten omvatten minimaal 20m² ruimte, voldoende zonlicht (minimaal 6 uur per dag), toegankelijke waterbronnen en veilige daktoegang.", category: "Algemeen", order: 2 },
            { question: "Wat is inbegrepen in het programma?", answer: "Ons uitgebreide pakket omvat: installatie, ecologisch irrigatiesysteem, seizoensgebonden beplanting, wekelijkse onderhoudsbezoeken, oogsten en levering.", category: "Producten", order: 3 },
            { question: "Gebruiken jullie chemicaliën of pesticiden?", answer: "Nee, al onze tuinen worden aangelegd zonder het gebruik van chemicaliën, pesticiden of synthetische meststoffen.", category: "Duurzaamheid", order: 4 },
            { question: "Welke verzekeringsdekking bieden jullie?", answer: "Onze programma's omvatten aansprakelijkheidsdekking van 5 miljoen dollar voor commerciële, auto- en aanvullende aansprakelijkheid.", category: "Technisch", order: 5 },
          ],
          it: [
            { question: "Perché qualcuno dovrebbe integrare l'agricoltura urbana?", answer: "L'agricoltura urbana offre benefici sociali e ambientali per le comunità che cercano vite più sane e sostenibili.", category: "Generale", order: 1 },
            { question: "Come faccio a sapere se il mio edificio è adatto?", answer: "I requisiti includono almeno 20m² di spazio, luce solare adeguata (minimo 6 ore al giorno), fonti d'acqua accessibili e accesso sicuro al tetto.", category: "Generale", order: 2 },
            { question: "Cosa è incluso nel programma?", answer: "Il nostro pacchetto completo include: installazione, sistema di irrigazione ecologico, piantagione stagionale, visite di manutenzione settimanali, raccolta e consegna.", category: "Prodotti", order: 3 },
            { question: "Usate prodotti chimici o pesticidi?", answer: "No, tutti i nostri giardini sono creati senza l'uso di prodotti chimici, pesticidi o fertilizzanti sintetici.", category: "Sostenibilità", order: 4 },
            { question: "Quale copertura assicurativa offrite?", answer: "I nostri programmi includono copertura di responsabilità di 5 milioni di dollari per responsabilità commerciale, automobilistica e in eccesso.", category: "Tecnico", order: 5 },
          ],
          es: [
            { question: "¿Por qué alguien integraría la agricultura urbana?", answer: "La agricultura urbana ofrece beneficios sociales y ambientales para comunidades que buscan vidas más saludables y sostenibles.", category: "General", order: 1 },
            { question: "¿Cómo sé si mi edificio es adecuado?", answer: "Los requisitos incluyen al menos 20m² de espacio, luz solar adecuada (mínimo 6 horas diarias), fuentes de agua accesibles y acceso seguro al techo.", category: "General", order: 2 },
            { question: "¿Qué está incluido en el programa?", answer: "Nuestro paquete completo incluye: instalación, sistema de riego ecológico, plantación estacional, visitas de mantenimiento semanales, cosecha y entrega.", category: "Productos", order: 3 },
            { question: "¿Usan químicos o pesticidas?", answer: "No, todos nuestros jardines se crean sin el uso de químicos, pesticidas o fertilizantes sintéticos.", category: "Sostenibilidad", order: 4 },
            { question: "¿Qué cobertura de seguro ofrecen?", answer: "Nuestros programas incluyen cobertura de responsabilidad de 5 millones de dólares para responsabilidad comercial, automotriz y en exceso.", category: "Técnico", order: 5 },
          ],
        };
        for (const [locale, faqs] of Object.entries(faqData)) {
          for (const faq of faqs) { await strapi.documents("api::faq.faq").create({ locale, data: faq, status: "published" }); }
        }
      }

      // ================================================================
      // 14. Seed Section Content (All 6 locales)
      // ================================================================
      console.log("[Bootstrap] Creating section content...");
      const images = [uploadedImages.impact1, uploadedImages.impact2, uploadedImages.impact3].filter(Boolean);

      // Impact Section
      const impactSectionEn = await strapi.documents("api::impact-section.impact-section").findFirst({ locale: "en" });
      if (!impactSectionEn) {
        const impactData: Record<string, { label: string; heading: string; headingHighlight: string; description: string }> = {
          en: { label: "Our Impact", heading: "Making a real", headingHighlight: "difference", description: "Our urban farms create measurable impact through food production, community engagement, and environmental benefits." },
          fr: { label: "Notre impact", heading: "Faire une vraie", headingHighlight: "différence", description: "Nos fermes urbaines créent un impact mesurable grâce à la production alimentaire, à l'engagement communautaire et aux avantages environnementaux." },
          de: { label: "Unsere Wirkung", heading: "Einen echten", headingHighlight: "Unterschied machen", description: "Unsere Urban Farms schaffen messbaren Impact durch Lebensmittelproduktion, Gemeinschaftsengagement und Umweltvorteile." },
          nl: { label: "Onze Impact", heading: "Een echt", headingHighlight: "verschil maken", description: "Onze stadsboerderijen creëren meetbare impact door voedselproductie, gemeenschapsbetrokkenheid en milieuvoordelen." },
          it: { label: "Il Nostro Impatto", heading: "Fare una vera", headingHighlight: "differenza", description: "Le nostre fattorie urbane creano impatto misurabile attraverso produzione alimentare, coinvolgimento della comunità e benefici ambientali." },
          es: { label: "Nuestro Impacto", heading: "Haciendo una verdadera", headingHighlight: "diferencia", description: "Nuestras granjas urbanas crean impacto medible a través de producción de alimentos, participación comunitaria y beneficios ambientales." },
        };
        for (const [locale, data] of Object.entries(impactData)) {
          await strapi.documents("api::impact-section.impact-section").create({ locale, data: { ...data, images } });
        }
      }

      // Services Section
      const servicesSectionEn = await strapi.documents("api::services-section.services-section").findFirst({ locale: "en" });
      if (!servicesSectionEn) {
        const servicesSectionData: Record<string, { label: string; heading: string; headingHighlight: string; description: string; ctaText: string; ctaButtonText: string }> = {
          en: { label: "Our Services", heading: "Everything you need for", headingHighlight: "urban farming", description: "From installation to maintenance, we provide comprehensive urban farming solutions tailored to your space and goals.", ctaText: "Ready to transform your space?", ctaButtonText: "Book a demo" },
          fr: { label: "Nos services", heading: "Tout ce dont vous avez besoin pour", headingHighlight: "l'agriculture urbaine", description: "De l'installation à l'entretien, nous fournissons des solutions d'agriculture urbaine complètes adaptées à votre espace et vos objectifs.", ctaText: "Prêt à transformer votre espace?", ctaButtonText: "Réserver une démo" },
          de: { label: "Unsere Dienste", heading: "Alles was Sie brauchen für", headingHighlight: "Urban Farming", description: "Von der Installation bis zur Wartung bieten wir umfassende Urban-Farming-Lösungen, die auf Ihren Raum und Ihre Ziele zugeschnitten sind.", ctaText: "Bereit, Ihren Raum zu transformieren?", ctaButtonText: "Demo buchen" },
          nl: { label: "Onze Diensten", heading: "Alles wat u nodig heeft voor", headingHighlight: "stadslandbouw", description: "Van installatie tot onderhoud bieden wij uitgebreide stadslandbouwoplossingen op maat van uw ruimte en doelen.", ctaText: "Klaar om uw ruimte te transformeren?", ctaButtonText: "Demo boeken" },
          it: { label: "I Nostri Servizi", heading: "Tutto ciò di cui hai bisogno per", headingHighlight: "l'agricoltura urbana", description: "Dall'installazione alla manutenzione, forniamo soluzioni complete di agricoltura urbana su misura per il tuo spazio e i tuoi obiettivi.", ctaText: "Pronto a trasformare il tuo spazio?", ctaButtonText: "Prenota una demo" },
          es: { label: "Nuestros Servicios", heading: "Todo lo que necesitas para", headingHighlight: "agricultura urbana", description: "Desde la instalación hasta el mantenimiento, proporcionamos soluciones completas de agricultura urbana adaptadas a su espacio y objetivos.", ctaText: "¿Listo para transformar tu espacio?", ctaButtonText: "Reservar demo" },
        };
        for (const [locale, data] of Object.entries(servicesSectionData)) {
          await strapi.documents("api::services-section.services-section").create({ locale, data });
        }
      }

      // Partners Section
      const partnersSectionEn = await strapi.documents("api::partners-section.partners-section").findFirst({ locale: "en" });
      if (!partnersSectionEn) {
        const partnersSectionData: Record<string, { label: string; heading: string }> = {
          en: { label: "Trusted By", heading: "Leading organizations across North America" },
          fr: { label: "Ils nous font confiance", heading: "Des organisations leaders à travers l'Amérique du Nord" },
          de: { label: "Vertraut von", heading: "Führende Organisationen in ganz Nordamerika" },
          nl: { label: "Vertrouwd door", heading: "Leidende organisaties in heel Noord-Amerika" },
          it: { label: "Fiducia di", heading: "Organizzazioni leader in tutto il Nord America" },
          es: { label: "Confían en nosotros", heading: "Organizaciones líderes en toda Norteamérica" },
        };
        for (const [locale, data] of Object.entries(partnersSectionData)) {
          await strapi.documents("api::partners-section.partners-section").create({ locale, data });
        }
      }

      // Testimonials Section
      const testimonialsSectionEn = await strapi.documents("api::testimonials-section.testimonials-section").findFirst({ locale: "en" });
      if (!testimonialsSectionEn) {
        const testimonialsSectionData: Record<string, { label: string; heading: string; description: string }> = {
          en: { label: "Testimonials", heading: "What our clients say", description: "See how urban farming has transformed properties and communities across North America." },
          fr: { label: "Témoignages", heading: "Ce que disent nos clients", description: "Découvrez comment l'agriculture urbaine a transformé les propriétés et les communautés." },
          de: { label: "Referenzen", heading: "Was unsere Kunden sagen", description: "Sehen Sie, wie Urban Farming Immobilien und Gemeinschaften in ganz Nordamerika transformiert hat." },
          nl: { label: "Getuigenissen", heading: "Wat onze klanten zeggen", description: "Ontdek hoe stadslandbouw eigendommen en gemeenschappen in heel Noord-Amerika heeft getransformeerd." },
          it: { label: "Testimonianze", heading: "Cosa dicono i nostri clienti", description: "Scopri come l'agricoltura urbana ha trasformato proprietà e comunità in tutto il Nord America." },
          es: { label: "Testimonios", heading: "Lo que dicen nuestros clientes", description: "Vea cómo la agricultura urbana ha transformado propiedades y comunidades en toda Norteamérica." },
        };
        for (const [locale, data] of Object.entries(testimonialsSectionData)) {
          await strapi.documents("api::testimonials-section.testimonials-section").create({ locale, data });
        }
      }

      // Cities Section
      const citiesSectionEn = await strapi.documents("api::cities-section.cities-section").findFirst({ locale: "en" });
      if (!citiesSectionEn) {
        const citiesSectionData: Record<string, { label: string; heading: string; description: string; ctaText: string; ctaButtonText: string }> = {
          en: { label: "Our Network", heading: "Growing in cities worldwide", description: "From Montreal to Zurich, we're bringing urban farming to communities across North America and Europe.", ctaText: "Don't see your city?", ctaButtonText: "Let's talk about expansion" },
          fr: { label: "Notre réseau", heading: "En croissance dans les villes du monde entier", description: "De Montréal à Zurich, nous apportons l'agriculture urbaine aux communautés.", ctaText: "Vous ne voyez pas votre ville?", ctaButtonText: "Parlons d'expansion" },
          de: { label: "Unser Netzwerk", heading: "Wachstum in Städten weltweit", description: "Von Montreal bis Zürich bringen wir Urban Farming in Gemeinschaften in ganz Nordamerika und Europa.", ctaText: "Sehen Sie Ihre Stadt nicht?", ctaButtonText: "Lassen Sie uns über Expansion sprechen" },
          nl: { label: "Ons Netwerk", heading: "Groeiend in steden wereldwijd", description: "Van Montreal tot Zürich brengen we stadslandbouw naar gemeenschappen in heel Noord-Amerika en Europa.", ctaText: "Ziet u uw stad niet?", ctaButtonText: "Laten we praten over uitbreiding" },
          it: { label: "La Nostra Rete", heading: "In crescita nelle città di tutto il mondo", description: "Da Montreal a Zurigo, portiamo l'agricoltura urbana alle comunità in tutto il Nord America e l'Europa.", ctaText: "Non vedi la tua città?", ctaButtonText: "Parliamo di espansione" },
          es: { label: "Nuestra Red", heading: "Creciendo en ciudades de todo el mundo", description: "De Montreal a Zúrich, llevamos la agricultura urbana a comunidades en toda Norteamérica y Europa.", ctaText: "¿No ves tu ciudad?", ctaButtonText: "Hablemos de expansión" },
        };
        for (const [locale, data] of Object.entries(citiesSectionData)) {
          await strapi.documents("api::cities-section.cities-section").create({ locale, data });
        }
      }

      // FAQ Section
      const faqSectionEn = await strapi.documents("api::faq-section.faq-section").findFirst({ locale: "en" });
      if (!faqSectionEn) {
        const faqSectionData: Record<string, { label: string; heading: string; description: string; ctaText: string; ctaButtonText: string }> = {
          en: { label: "FAQ", heading: "Frequently asked questions", description: "Everything you need to know about urban farming with MicroHabitat.", ctaText: "Still have questions?", ctaButtonText: "Contact us" },
          fr: { label: "FAQ", heading: "Questions fréquemment posées", description: "Tout ce que vous devez savoir sur l'agriculture urbaine avec MicroHabitat.", ctaText: "Vous avez encore des questions?", ctaButtonText: "Contactez-nous" },
          de: { label: "FAQ", heading: "Häufig gestellte Fragen", description: "Alles, was Sie über Urban Farming mit MicroHabitat wissen müssen.", ctaText: "Noch Fragen?", ctaButtonText: "Kontaktieren Sie uns" },
          nl: { label: "FAQ", heading: "Veelgestelde vragen", description: "Alles wat u moet weten over stadslandbouw met MicroHabitat.", ctaText: "Nog vragen?", ctaButtonText: "Neem contact op" },
          it: { label: "FAQ", heading: "Domande frequenti", description: "Tutto quello che devi sapere sull'agricoltura urbana con MicroHabitat.", ctaText: "Hai ancora domande?", ctaButtonText: "Contattaci" },
          es: { label: "FAQ", heading: "Preguntas frecuentes", description: "Todo lo que necesitas saber sobre agricultura urbana con MicroHabitat.", ctaText: "¿Aún tienes preguntas?", ctaButtonText: "Contáctanos" },
        };
        for (const [locale, data] of Object.entries(faqSectionData)) {
          await strapi.documents("api::faq-section.faq-section").create({ locale, data });
        }
      }

      // CTA Section
      const ctaSectionEn = await strapi.documents("api::cta-section.cta-section").findFirst({ locale: "en" });
      if (!ctaSectionEn) {
        const ctaSectionData: Record<string, { label: string; heading: string; headingHighlight: string; description: string; ctaPrimary: string; ctaSecondary: string; ctaSecondaryEmail: string; trustIndicators: string[] }> = {
          en: { label: "Get Started", heading: "Ready to transform your", headingHighlight: "urban space?", description: "Join the world's largest urban farming network and create lasting impact for your community.", ctaPrimary: "Book a Demo", ctaSecondary: "Contact Sales", ctaSecondaryEmail: "sales@microhabitat.com", trustIndicators: ["No commitment required", "Customized proposals", "Expert consultation"] },
          fr: { label: "Commencer", heading: "Prêt à transformer votre", headingHighlight: "espace urbain?", description: "Rejoignez le plus grand réseau d'agriculture urbaine au monde et créez un impact durable pour votre communauté.", ctaPrimary: "Réserver une démo", ctaSecondary: "Contacter les ventes", ctaSecondaryEmail: "sales@microhabitat.com", trustIndicators: ["Aucun engagement requis", "Propositions personnalisées", "Consultation d'experts"] },
          de: { label: "Loslegen", heading: "Bereit, Ihren", headingHighlight: "städtischen Raum zu transformieren?", description: "Werden Sie Teil des weltweit größten Urban-Farming-Netzwerks und schaffen Sie nachhaltigen Impact für Ihre Gemeinschaft.", ctaPrimary: "Demo buchen", ctaSecondary: "Vertrieb kontaktieren", ctaSecondaryEmail: "sales@microhabitat.com", trustIndicators: ["Keine Verpflichtung erforderlich", "Maßgeschneiderte Vorschläge", "Expertenberatung"] },
          nl: { label: "Aan de slag", heading: "Klaar om uw", headingHighlight: "stedelijke ruimte te transformeren?", description: "Sluit u aan bij 's werelds grootste stadslandbouwnetwerk en creëer blijvende impact voor uw gemeenschap.", ctaPrimary: "Demo boeken", ctaSecondary: "Contact verkoop", ctaSecondaryEmail: "sales@microhabitat.com", trustIndicators: ["Geen verplichting vereist", "Op maat gemaakte voorstellen", "Expertconsultatie"] },
          it: { label: "Inizia", heading: "Pronto a trasformare il tuo", headingHighlight: "spazio urbano?", description: "Unisciti alla più grande rete di agricoltura urbana del mondo e crea un impatto duraturo per la tua comunità.", ctaPrimary: "Prenota una demo", ctaSecondary: "Contatta le vendite", ctaSecondaryEmail: "sales@microhabitat.com", trustIndicators: ["Nessun impegno richiesto", "Proposte personalizzate", "Consulenza di esperti"] },
          es: { label: "Comenzar", heading: "¿Listo para transformar tu", headingHighlight: "espacio urbano?", description: "Únete a la red de agricultura urbana más grande del mundo y crea un impacto duradero para tu comunidad.", ctaPrimary: "Reservar demo", ctaSecondary: "Contactar ventas", ctaSecondaryEmail: "sales@microhabitat.com", trustIndicators: ["Sin compromiso requerido", "Propuestas personalizadas", "Consulta de expertos"] },
        };
        for (const [locale, data] of Object.entries(ctaSectionData)) {
          await strapi.documents("api::cta-section.cta-section").create({ locale, data });
        }
      }

      console.log("[Bootstrap] Bootstrap complete!");
    } catch (error) {
      console.error("[Bootstrap] Error during bootstrap:", error);
    }
  },
};
