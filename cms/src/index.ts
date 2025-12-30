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
        const hashedPassword = await strapi.admin.services.auth.hashPassword("MicroHabitat2024");
        await strapi.db.query("admin::user").create({
          data: { firstname: "Admin", lastname: "User", email: "admin@microhabitat.com", password: hashedPassword, isActive: true, roles: [1] },
        });
        console.log("[Bootstrap] Admin user created: admin@microhabitat.com / MicroHabitat2024");
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
          // Main content types
          "api::hero.hero", "api::stat.stat", "api::service.service", "api::testimonial.testimonial",
          "api::partner.partner", "api::city.city", "api::nav-link.nav-link", "api::footer-section.footer-section",
          "api::faq.faq", "api::impact-section.impact-section", "api::cta-section.cta-section",
          "api::services-section.services-section", "api::partners-section.partners-section",
          "api::testimonials-section.testimonials-section", "api::cities-section.cities-section",
          "api::faq-section.faq-section",
          // Page SEO singleTypes
          "api::about-page.about-page", "api::outdoor-farm-page.outdoor-farm-page",
          "api::indoor-farm-page.indoor-farm-page", "api::educational-activities-page.educational-activities-page",
          "api::commercial-real-estate-page.commercial-real-estate-page", "api::corporations-page.corporations-page",
          "api::schools-page.schools-page", "api::careers-page.careers-page",
          "api::partnerships-page.partnerships-page", "api::community-engagement-page.community-engagement-page",
          "api::contact-page.contact-page", "api::faq-page.faq-page", "api::blog-page.blog-page",
          "api::blog-post.blog-post",
          "api::cities-page.cities-page", "api::privacy-policy-page.privacy-policy-page",
          "api::terms-of-service-page.terms-of-service-page", "api::cookie-policy-page.cookie-policy-page",
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

      // ================================================================
      // 15. Seed Page SEO (All pages, All 6 locales)
      // ================================================================
      console.log("[Bootstrap] Creating page SEO content...");

      // Page SEO data for all pages - OPTIMIZED for maximum character usage
      // Titles: ~55-60 chars | Descriptions: ~155-160 chars
      const pageSEOData: Record<string, Record<string, { metaTitle: string; metaDescription: string; keywords: string }>> = {
        'about-page': {
          en: { metaTitle: 'About Microhabitat | World\'s Largest Urban Farm Network', metaDescription: 'Founded in 2016 by Orlane & Alexandre, Microhabitat operates 150+ urban farms in North America & Europe. Discover our mission to reconnect cities with nature', keywords: 'about microhabitat, urban farming company, sustainable agriculture, founders, mission, urban farm network' },
          fr: { metaTitle: 'À Propos | Plus Grand Réseau de Fermes Urbaines au Monde', metaDescription: 'Fondé en 2016 par Orlane et Alexandre, Microhabitat exploite 150+ fermes urbaines en Amérique du Nord et Europe. Découvrez notre mission de reconnecter villes', keywords: 'à propos microhabitat, entreprise agriculture urbaine, agriculture durable, fondateurs, mission' },
          de: { metaTitle: 'Über Microhabitat | Weltweit Größtes Stadtfarm-Netzwerk', metaDescription: '2016 von Orlane & Alexandre gegründet, betreibt Microhabitat 150+ Stadtfarmen in Nordamerika & Europa. Entdecken Sie unsere Mission, Städte mit Natur verbinden', keywords: 'über microhabitat, urban farming unternehmen, nachhaltige landwirtschaft, gründer, mission' },
          nl: { metaTitle: 'Over Microhabitat | Grootste Stadslandbouwnetwerk ter Wereld', metaDescription: 'Opgericht in 2016 door Orlane & Alexandre, beheert Microhabitat 150+ stadsboerderijen in Noord-Amerika & Europa. Ontdek onze missie om steden te verbinden', keywords: 'over microhabitat, stadslandbouw bedrijf, duurzame landbouw, oprichters, missie' },
          it: { metaTitle: 'Chi Siamo | Microhabitat - Rete Fattorie Urbane Mondiale', metaDescription: 'Fondata nel 2016 da Orlane e Alessandro, Microhabitat gestisce 150+ fattorie urbane in Nord America ed Europa. Scopri la nostra missione per le città', keywords: 'chi siamo microhabitat, azienda agricoltura urbana, agricoltura sostenibile, fondatori, missione' },
          es: { metaTitle: 'Sobre Microhabitat | Mayor Red de Granjas Urbanas del Mundo', metaDescription: 'Fundada en 2016 por Orlane y Alexandre, Microhabitat opera 150+ granjas urbanas en Norteamérica y Europa. Descubre nuestra misión de reconectar ciudades', keywords: 'sobre microhabitat, empresa agricultura urbana, agricultura sostenible, fundadores, misión' },
        },
        'outdoor-farm-page': {
          en: { metaTitle: 'Rooftop & Outdoor Urban Farms | Microhabitat Solutions', metaDescription: 'Transform rooftops, terraces & outdoor spaces into productive urban farms. Full-service design, installation & maintenance. 500+ successful projects worldwide', keywords: 'rooftop farming, outdoor urban farms, green roofs, terrace gardens, urban agriculture solutions' },
          fr: { metaTitle: 'Fermes Urbaines Extérieures et Toits | Microhabitat', metaDescription: 'Transformez toits, terrasses et espaces extérieurs en fermes urbaines productives. Conception, installation et entretien complet. 500+ projets réussis', keywords: 'agriculture sur toit, fermes urbaines extérieures, toits verts, jardins de terrasse' },
          de: { metaTitle: 'Dachfarmen & Outdoor-Stadtfarmen | Microhabitat Lösungen', metaDescription: 'Verwandeln Sie Dächer, Terrassen & Außenflächen in produktive Stadtfarmen. Full-Service Design, Installation & Wartung. 500+ erfolgreiche Projekte weltweit', keywords: 'dachfarming, outdoor stadtfarmen, grüne dächer, terrassengärten, urbane landwirtschaft' },
          nl: { metaTitle: 'Daktuinen & Outdoor Stadsboerderijen | Microhabitat', metaDescription: 'Transformeer daken, terrassen en buitenruimtes in productieve stadsboerderijen. Volledige service: ontwerp, installatie en onderhoud. 500+ projecten wereldwijd', keywords: 'daklandbouw, outdoor stadsboerderijen, groene daken, terrrastuinen, urbane landbouw' },
          it: { metaTitle: 'Fattorie su Tetti e Outdoor | Soluzioni Microhabitat', metaDescription: 'Trasforma tetti, terrazze e spazi esterni in fattorie urbane produttive. Design, installazione e manutenzione completa. 500+ progetti di successo nel mondo', keywords: 'agricoltura su tetto, fattorie urbane outdoor, tetti verdi, giardini pensili' },
          es: { metaTitle: 'Granjas en Azoteas y Exteriores | Soluciones Microhabitat', metaDescription: 'Transforma azoteas, terrazas y espacios exteriores en granjas urbanas productivas. Diseño, instalación y mantenimiento completo. 500+ proyectos exitosos', keywords: 'agricultura en azoteas, granjas urbanas exteriores, techos verdes, jardines de terraza' },
        },
        'indoor-farm-page': {
          en: { metaTitle: 'Indoor & Vertical Farming | Year-Round Urban Agriculture', metaDescription: 'Grow fresh produce 365 days a year with Microhabitat indoor farming. Vertical gardens, hydroponic setups & controlled environment agriculture for any space', keywords: 'indoor farming, vertical gardens, hydroponics, controlled environment agriculture, year-round growing' },
          fr: { metaTitle: 'Fermes Intérieures et Verticales | Agriculture Toute l\'Année', metaDescription: 'Cultivez des produits frais 365 jours par an avec Microhabitat. Jardins verticaux, hydroponie et agriculture en environnement contrôlé pour tout type d\'espace', keywords: 'agriculture intérieure, jardins verticaux, hydroponie, agriculture en environnement contrôlé' },
          de: { metaTitle: 'Indoor- & Vertikalfarming | Ganzjährige Stadtlandwirtschaft', metaDescription: 'Bauen Sie 365 Tage frische Produkte an mit Microhabitat Indoor-Farming. Vertikale Gärten, Hydroponik & kontrollierte Umgebungslandwirtschaft für jeden Raum', keywords: 'indoor farming, vertikale gärten, hydroponik, kontrollierte umgebung landwirtschaft' },
          nl: { metaTitle: 'Indoor & Verticale Landbouw | Jaarrond Stadslandbouw', metaDescription: 'Kweek 365 dagen per jaar verse producten met Microhabitat indoor farming. Verticale tuinen, hydrocultuur en gecontroleerde omgevingslandbouw voor elke ruimte', keywords: 'indoor farming, verticale tuinen, hydrocultuur, gecontroleerde omgeving landbouw' },
          it: { metaTitle: 'Agricoltura Indoor e Verticale | Coltivazione Tutto l\'Anno', metaDescription: 'Coltiva prodotti freschi 365 giorni con Microhabitat. Giardini verticali, idroponica e agricoltura a ambiente controllato per ogni spazio e ogni esigenza', keywords: 'agricoltura indoor, giardini verticali, idroponica, agricoltura ambiente controllato' },
          es: { metaTitle: 'Agricultura Indoor y Vertical | Cultivo Urbano Todo el Año', metaDescription: 'Cultiva productos frescos 365 días al año con Microhabitat. Jardines verticales, hidroponía y agricultura de ambiente controlado para cualquier espacio', keywords: 'agricultura indoor, jardines verticales, hidroponía, agricultura ambiente controlado' },
        },
        'educational-activities-page': {
          en: { metaTitle: 'Urban Farming Workshops & Educational Programs', metaDescription: 'Learn sustainable agriculture through hands-on workshops, farm tours & educational programs. Perfect for schools, corporate teams & community groups. Book today', keywords: 'urban farming workshops, educational programs, farm tours, sustainability education, hands-on learning' },
          fr: { metaTitle: 'Ateliers Agriculture Urbaine et Programmes Éducatifs', metaDescription: 'Apprenez l\'agriculture durable grâce à des ateliers pratiques, visites de fermes et programmes éducatifs. Parfait pour écoles, entreprises et groupes', keywords: 'ateliers agriculture urbaine, programmes éducatifs, visites de fermes, éducation durable' },
          de: { metaTitle: 'Urban Farming Workshops & Bildungsprogramme | Microhabitat', metaDescription: 'Lernen Sie nachhaltige Landwirtschaft durch praxisnahe Workshops, Farmtouren & Bildungsprogramme. Perfekt für Schulen, Firmenteams & Gemeindegruppen. Buchen Sie', keywords: 'urban farming workshops, bildungsprogramme, farmtouren, nachhaltigkeitsbildung' },
          nl: { metaTitle: 'Stadslandbouw Workshops & Educatieve Programma\'s', metaDescription: 'Leer duurzame landbouw door praktische workshops, boerderijrondleidingen en educatieve programma\'s. Perfect voor scholen, bedrijfsteams en gemeenschapsgroepen', keywords: 'stadslandbouw workshops, educatieve programma\'s, boerderijrondleidingen, duurzaamheidsonderwijs' },
          it: { metaTitle: 'Workshop Agricoltura Urbana e Programmi Educativi', metaDescription: 'Impara l\'agricoltura sostenibile attraverso workshop pratici, tour delle fattorie e programmi educativi. Perfetto per scuole, team aziendali e gruppi comunitari', keywords: 'workshop agricoltura urbana, programmi educativi, tour fattorie, educazione sostenibilità' },
          es: { metaTitle: 'Talleres Agricultura Urbana y Programas Educativos', metaDescription: 'Aprende agricultura sostenible a través de talleres prácticos, tours de granjas y programas educativos. Perfecto para escuelas, equipos y grupos comunitarios', keywords: 'talleres agricultura urbana, programas educativos, tours de granjas, educación sostenibilidad' },
        },
        'commercial-real-estate-page': {
          en: { metaTitle: 'Urban Farms for Commercial Real Estate | Green Buildings', metaDescription: 'Boost property value & tenant satisfaction with rooftop farms and green spaces. Achieve LEED certification & ESG goals with Microhabitat. Free assessment', keywords: 'commercial real estate farming, green buildings, LEED certification, property value, tenant amenities, ESG' },
          fr: { metaTitle: 'Fermes Urbaines pour Immobilier Commercial | Bâtiments Verts', metaDescription: 'Augmentez la valeur immobilière et satisfaction des locataires avec fermes sur toit. Atteignez la certification LEED et objectifs ESG. Évaluation gratuite', keywords: 'immobilier commercial agriculture, bâtiments verts, certification LEED, valeur immobilière, ESG' },
          de: { metaTitle: 'Stadtfarmen für Gewerbeimmobilien | Grüne Gebäude', metaDescription: 'Steigern Sie Immobilienwert & Mieterzufriedenheit mit Dachfarmen und Grünflächen. LEED-Zertifizierung & ESG-Ziele erreichen. Kostenlose Bewertung', keywords: 'gewerbeimmobilien farming, grüne gebäude, LEED-zertifizierung, immobilienwert, ESG' },
          nl: { metaTitle: 'Stadsboerderijen voor Commercieel Vastgoed | Groene Gebouwen', metaDescription: 'Verhoog vastgoedwaarde en huurderstevredenheid met dakboerderijen en groene ruimtes. Bereik LEED-certificering en ESG-doelen. Gratis beoordeling', keywords: 'commercieel vastgoed landbouw, groene gebouwen, LEED-certificering, vastgoedwaarde, ESG' },
          it: { metaTitle: 'Fattorie Urbane per Immobili Commerciali | Edifici Verdi', metaDescription: 'Aumenta valore immobiliare e soddisfazione inquilini con fattorie sui tetti e spazi verdi. Raggiungi certificazione LEED e obiettivi ESG. Valutazione gratuita', keywords: 'immobili commerciali agricoltura, edifici verdi, certificazione LEED, valore immobiliare, ESG' },
          es: { metaTitle: 'Granjas Urbanas para Inmobiliario Comercial | Microhabitat', metaDescription: 'Aumenta el valor de la propiedad y satisfacción de inquilinos con granjas en azoteas. Logra certificación LEED y metas ESG. Evaluación gratuita', keywords: 'bienes raíces comerciales agricultura, edificios verdes, certificación LEED, valor propiedad, ESG' },
        },
        'corporations-page': {
          en: { metaTitle: 'Corporate Urban Farming & ESG Programs | Sustainability', metaDescription: 'Achieve your ESG goals with Microhabitat corporate urban farming. Employee wellness, team building, carbon reduction & measurable sustainability impact', keywords: 'corporate sustainability, ESG programs, employee wellness, team building, carbon reduction, corporate farming' },
          fr: { metaTitle: 'Agriculture Urbaine Entreprise et Programmes ESG', metaDescription: 'Atteignez vos objectifs ESG avec les programmes agriculture urbaine Microhabitat. Bien-être employés, team building, réduction carbone et impact mesurable', keywords: 'durabilité entreprise, programmes ESG, bien-être employés, team building, réduction carbone' },
          de: { metaTitle: 'Corporate Urban Farming & ESG-Programme | Nachhaltigkeit', metaDescription: 'Erreichen Sie Ihre ESG-Ziele mit Microhabitat Corporate Urban Farming. Mitarbeiter-Wellness, Teambuilding, CO2-Reduktion & messbare Nachhaltigkeitswirkung', keywords: 'unternehmens-nachhaltigkeit, ESG-programme, mitarbeiter-wellness, teambuilding, CO2-reduktion' },
          nl: { metaTitle: 'Zakelijke Stadslandbouw & ESG Programma\'s | Duurzaamheid', metaDescription: 'Bereik uw ESG-doelen met Microhabitat zakelijke stadslandbouwprogramma\'s. Werknemerswelzijn, teambuilding, CO2-reductie en meetbare duurzaamheidsimpact', keywords: 'zakelijke duurzaamheid, ESG programma\'s, werknemerswelzijn, teambuilding, CO2-reductie' },
          it: { metaTitle: 'Agricoltura Urbana Aziendale e Programmi ESG', metaDescription: 'Raggiungi i tuoi obiettivi ESG con programmi agricoltura urbana aziendale Microhabitat. Benessere dipendenti, team building, riduzione carbonio e impatto', keywords: 'sostenibilità aziendale, programmi ESG, benessere dipendenti, team building, riduzione carbonio' },
          es: { metaTitle: 'Agricultura Urbana Corporativa y Programas ESG', metaDescription: 'Alcanza tus objetivos ESG con programas agricultura urbana corporativa Microhabitat. Bienestar empleados, team building, reducción carbono e impacto medible', keywords: 'sostenibilidad corporativa, programas ESG, bienestar empleados, team building, reducción carbono' },
        },
        'schools-page': {
          en: { metaTitle: 'School Garden Programs & Educational Farming | Microhabitat', metaDescription: 'Bring hands-on STEM learning to your school with Microhabitat educational farming. Curriculum-aligned workshops, school gardens & student engagement', keywords: 'school gardens, educational farming, STEM learning, student engagement, curriculum workshops, K-12' },
          fr: { metaTitle: 'Programmes Jardins Scolaires et Agriculture Éducative', metaDescription: 'Offrez un apprentissage STEM pratique avec les programmes agriculture éducative Microhabitat. Ateliers alignés au curriculum, jardins scolaires pour tous', keywords: 'jardins scolaires, agriculture éducative, apprentissage STEM, engagement étudiant, ateliers' },
          de: { metaTitle: 'Schulgarten-Programme & Pädagogische Landwirtschaft', metaDescription: 'Bringen Sie praktisches MINT-Lernen an Ihre Schule mit Microhabitat pädagogischen Farming-Programmen. Lehrplan-Workshops, Schulgärten für alle', keywords: 'schulgärten, pädagogische landwirtschaft, MINT-lernen, schülerengagement, curriculum-workshops' },
          nl: { metaTitle: 'Schooltuinprogramma\'s & Educatieve Landbouw | Microhabitat', metaDescription: 'Breng praktisch STEM-leren naar uw school met Microhabitat educatieve landbouwprogramma\'s. Curriculum-workshops, schooltuinen en studentenbetrokkenheid', keywords: 'schooltuinen, educatieve landbouw, STEM-leren, studentenbetrokkenheid, curriculum workshops' },
          it: { metaTitle: 'Programmi Orti Scolastici e Agricoltura Educativa', metaDescription: 'Porta l\'apprendimento STEM pratico nella tua scuola con programmi agricoltura educativa Microhabitat. Workshop curriculari, orti scolastici per tutti', keywords: 'orti scolastici, agricoltura educativa, apprendimento STEM, coinvolgimento studenti, workshop' },
          es: { metaTitle: 'Programas Huertos Escolares y Agricultura Educativa', metaDescription: 'Lleva aprendizaje STEM práctico a tu escuela con programas agricultura educativa Microhabitat. Talleres curriculares, huertos escolares para todos', keywords: 'huertos escolares, agricultura educativa, aprendizaje STEM, participación estudiantil, talleres' },
        },
        'careers-page': {
          en: { metaTitle: 'Careers at Microhabitat | Join the Urban Farming Revolution', metaDescription: 'Build a career that matters. Join Microhabitat team of urban farmers, educators & sustainability experts. Open positions in Montreal, Toronto, NYC, Paris', keywords: 'microhabitat careers, urban farming jobs, sustainability careers, green jobs, agriculture careers' },
          fr: { metaTitle: 'Carrières Microhabitat | Rejoignez la Révolution Agricole', metaDescription: 'Construisez une carrière qui compte. Rejoignez notre équipe agriculteurs urbains et experts développement durable. Postes à Montréal, Toronto, NYC, Paris', keywords: 'carrières microhabitat, emplois agriculture urbaine, carrières durabilité, emplois verts' },
          de: { metaTitle: 'Karriere bei Microhabitat | Urban-Farming-Revolution', metaDescription: 'Gestalte eine Karriere mit Bedeutung. Werde Teil unseres Teams aus Stadtbauern, Pädagogen & Nachhaltigkeitsexperten. Stellen in Montreal, Toronto, NYC', keywords: 'microhabitat karriere, urban farming jobs, nachhaltigkeits-karriere, grüne jobs' },
          nl: { metaTitle: 'Werken bij Microhabitat | Stadslandbouw Revolutie', metaDescription: 'Bouw een carrière die ertoe doet. Word deel van ons team stadsboeren, docenten & duurzaamheidsexperts. Vacatures in Montreal, Toronto, NYC, Parijs', keywords: 'microhabitat vacatures, stadslandbouw banen, duurzaamheid carrière, groene banen' },
          it: { metaTitle: 'Lavora con Microhabitat | Rivoluzione Agricola Urbana', metaDescription: 'Costruisci una carriera che conta. Unisciti al nostro team agricoltori urbani, educatori ed esperti sostenibilità. Posizioni a Montreal, Toronto, NYC', keywords: 'carriere microhabitat, lavori agricoltura urbana, carriere sostenibilità, lavori verdi' },
          es: { metaTitle: 'Empleos en Microhabitat | Revolución Agricultura Urbana', metaDescription: 'Construye una carrera que importa. Únete a nuestro equipo agricultores urbanos, educadores y expertos sostenibilidad. Puestos en Montreal, Toronto, NYC', keywords: 'empleos microhabitat, trabajos agricultura urbana, carreras sostenibilidad, empleos verdes' },
        },
        'partnerships-page': {
          en: { metaTitle: 'Partner With Microhabitat | Urban Farming Collaboration', metaDescription: 'Join Microhabitat global network of urban farming partners. Licensing opportunities, joint ventures & collaboration programs for municipalities and developers', keywords: 'microhabitat partnerships, urban farming licensing, joint ventures, collaboration, franchise opportunities' },
          fr: { metaTitle: 'Devenez Partenaire Microhabitat | Collaboration Agriculture', metaDescription: 'Rejoignez le réseau mondial de partenaires Microhabitat. Licences, coentreprises et programmes collaboration pour municipalités, promoteurs et organisations', keywords: 'partenariats microhabitat, licence agriculture urbaine, coentreprises, collaboration, franchise' },
          de: { metaTitle: 'Microhabitat Partner werden | Urban Farming Kooperationen', metaDescription: 'Treten Sie Microhabitats globalem Netzwerk von Urban-Farming-Partnern bei. Lizenzmöglichkeiten, Joint Ventures & Kooperationen für Kommunen und Entwickler', keywords: 'microhabitat partnerschaften, urban farming lizenz, joint ventures, kooperation, franchise' },
          nl: { metaTitle: 'Word Partner van Microhabitat | Stadslandbouw Samenwerking', metaDescription: 'Word deel van Microhabitat wereldwijde netwerk stadslandbouwpartners. Licentiemogelijkheden, joint ventures en samenwerkingsprogramma\'s voor gemeenten', keywords: 'microhabitat partnerschappen, stadslandbouw licenties, joint ventures, samenwerking, franchise' },
          it: { metaTitle: 'Diventa Partner Microhabitat | Collaborazioni Agricoltura', metaDescription: 'Unisciti alla rete globale di partner Microhabitat. Opportunità di licenza, joint venture e programmi collaborazione per comuni, sviluppatori, organizzazioni', keywords: 'partnership microhabitat, licenze agricoltura urbana, joint venture, collaborazione, franchise' },
          es: { metaTitle: 'Asóciate con Microhabitat | Colaboración Agricultura Urbana', metaDescription: 'Únete a la red global de socios Microhabitat. Oportunidades licencia, joint ventures y programas colaboración para municipios, desarrolladores, organizaciones', keywords: 'asociaciones microhabitat, licencias agricultura urbana, joint ventures, colaboración, franquicia' },
        },
        'community-engagement-page': {
          en: { metaTitle: 'Community Programs & Food Bank Partnerships | Microhabitat', metaDescription: 'Creating lasting social impact through food bank partnerships, community gardens & volunteer programs. Join Microhabitat in fighting food insecurity', keywords: 'community engagement, food bank partnerships, community gardens, volunteer programs, social impact, food security' },
          fr: { metaTitle: 'Programmes Communautaires et Partenariats Alimentaires', metaDescription: 'Créons un impact social durable grâce aux partenariats banques alimentaires, jardins communautaires et programmes bénévoles. Luttez contre l\'insécurité', keywords: 'engagement communautaire, partenariats banques alimentaires, jardins communautaires, bénévolat' },
          de: { metaTitle: 'Gemeinschaftsprogramme & Tafel-Partnerschaften', metaDescription: 'Nachhaltige soziale Wirkung durch Tafel-Partnerschaften, Gemeinschaftsgärten & Freiwilligenprogramme. Kämpfen Sie gegen Ernährungsunsicherheit mit uns', keywords: 'gemeinschaftsengagement, tafel-partnerschaften, gemeinschaftsgärten, freiwilligenprogramme' },
          nl: { metaTitle: 'Gemeenschapsprogramma\'s & Voedselbank Partnerschappen', metaDescription: 'Duurzame sociale impact creëren door voedselbank partnerschappen, gemeenschapstuinen en vrijwilligersprogramma\'s. Help ons voedselonzekerheid bestrijden', keywords: 'gemeenschapsbetrokkenheid, voedselbank partnerschappen, gemeenschapstuinen, vrijwilligersprogramma\'s' },
          it: { metaTitle: 'Programmi Comunitari e Partnership Banchi Alimentari', metaDescription: 'Creiamo impatto sociale duraturo attraverso partnership banchi alimentari, orti comunitari e programmi volontariato. Combatti l\'insicurezza alimentare', keywords: 'impegno comunitario, partnership banchi alimentari, orti comunitari, programmi volontariato' },
          es: { metaTitle: 'Programas Comunitarios y Alianzas Bancos de Alimentos', metaDescription: 'Creamos impacto social duradero a través de alianzas bancos alimentos, huertos comunitarios y programas voluntariado. Combate la inseguridad alimentaria', keywords: 'compromiso comunitario, alianzas bancos alimentos, huertos comunitarios, voluntariado' },
        },
        'contact-page': {
          en: { metaTitle: 'Contact Microhabitat | Get in Touch With Urban Farm Experts', metaDescription: 'Ready to transform your space into a thriving urban farm? Contact Microhabitat today for a free consultation. Offices in Montreal, Toronto, NYC & Paris', keywords: 'contact microhabitat, urban farming consultation, get in touch, request quote, urban farm experts' },
          fr: { metaTitle: 'Contactez Microhabitat | Parlez à Nos Experts Agriculture', metaDescription: 'Prêt à transformer votre espace en ferme urbaine florissante? Contactez Microhabitat pour une consultation gratuite. Bureaux à Montréal, Toronto, NYC, Paris', keywords: 'contact microhabitat, consultation agriculture urbaine, nous contacter, demande de devis' },
          de: { metaTitle: 'Kontakt Microhabitat | Sprechen Sie Mit Unseren Experten', metaDescription: 'Bereit, Ihren Raum in eine florierende Stadtfarm zu verwandeln? Kontaktieren Sie Microhabitat für kostenlose Beratung. Büros in Montreal, Toronto, NYC', keywords: 'kontakt microhabitat, urban farming beratung, kontaktieren, angebot anfordern' },
          nl: { metaTitle: 'Contact Microhabitat | Neem Contact Op Met Onze Experts', metaDescription: 'Klaar om uw ruimte om te vormen tot een bloeiende stadsboerderij? Neem contact op voor gratis advies. Kantoren in Montreal, Toronto, NYC & Parijs', keywords: 'contact microhabitat, stadslandbouw advies, neem contact op, offerte aanvragen' },
          it: { metaTitle: 'Contatta Microhabitat | Parla con i Nostri Esperti', metaDescription: 'Pronto a trasformare il tuo spazio in una fattoria urbana fiorente? Contatta Microhabitat per una consulenza gratuita. Uffici a Montreal, Toronto, NYC', keywords: 'contatta microhabitat, consulenza agricoltura urbana, contattaci, richiedi preventivo' },
          es: { metaTitle: 'Contacta Microhabitat | Habla con Nuestros Expertos', metaDescription: 'Listo para transformar tu espacio en una granja urbana próspera? Contacta Microhabitat para consulta gratuita. Oficinas en Montreal, Toronto, NYC, París', keywords: 'contacto microhabitat, consulta agricultura urbana, contáctanos, solicitar presupuesto' },
        },
        'faq-page': {
          en: { metaTitle: 'Urban Farming FAQ | Common Questions Answered', metaDescription: 'Get answers to frequently asked questions about urban farming, our services, pricing, installation process & maintenance. Everything you need to know', keywords: 'urban farming FAQ, frequently asked questions, microhabitat questions, farming answers, getting started' },
          fr: { metaTitle: 'FAQ Agriculture Urbaine | Questions Fréquentes', metaDescription: 'Obtenez des réponses aux questions fréquentes sur l\'agriculture urbaine, nos services, tarifs, processus installation et entretien. Tout ce qu\'il faut savoir', keywords: 'FAQ agriculture urbaine, questions fréquentes, questions microhabitat, réponses, démarrer' },
          de: { metaTitle: 'Urban Farming FAQ | Häufige Fragen Beantwortet', metaDescription: 'Antworten auf häufig gestellte Fragen zu Urban Farming, unseren Services, Preisen, Installationsprozess & Wartung. Alles was Sie wissen müssen', keywords: 'urban farming FAQ, häufig gestellte fragen, microhabitat fragen, antworten, loslegen' },
          nl: { metaTitle: 'Stadslandbouw FAQ | Veelgestelde Vragen Beantwoord', metaDescription: 'Krijg antwoorden op veelgestelde vragen over stadslandbouw, onze diensten, prijzen, installatieproces en onderhoud. Alles wat u moet weten', keywords: 'stadslandbouw FAQ, veelgestelde vragen, microhabitat vragen, antwoorden, aan de slag' },
          it: { metaTitle: 'FAQ Agricoltura Urbana | Domande Frequenti Risposte', metaDescription: 'Ottieni risposte alle domande frequenti su agricoltura urbana, i nostri servizi, prezzi, processo installazione e manutenzione. Tutto quello che devi sapere', keywords: 'FAQ agricoltura urbana, domande frequenti, domande microhabitat, risposte, iniziare' },
          es: { metaTitle: 'FAQ Agricultura Urbana | Preguntas Frecuentes', metaDescription: 'Obtén respuestas a preguntas frecuentes sobre agricultura urbana, nuestros servicios, precios, proceso instalación y mantenimiento. Todo lo que necesitas', keywords: 'FAQ agricultura urbana, preguntas frecuentes, preguntas microhabitat, respuestas, comenzar' },
        },
        'blog-page': {
          en: { metaTitle: 'Urban Farming Blog | News, Tips & Insights', metaDescription: 'Stay updated with the latest urban farming trends, sustainability tips, project stories & expert insights from Microhabitat team. Subscribe for updates', keywords: 'urban farming blog, sustainability news, farming tips, microhabitat stories, agriculture insights' },
          fr: { metaTitle: 'Blog Agriculture Urbaine | Actualités et Conseils', metaDescription: 'Restez informé des dernières tendances agriculture urbaine, conseils durabilité, histoires projets et expertises de l\'équipe Microhabitat. Abonnez-vous', keywords: 'blog agriculture urbaine, actualités durabilité, conseils culture, histoires microhabitat' },
          de: { metaTitle: 'Urban Farming Blog | Neuigkeiten & Tipps', metaDescription: 'Bleiben Sie auf dem Laufenden mit den neuesten Urban-Farming-Trends, Nachhaltigkeitstipps, Projektgeschichten & Experteneinblicken. Abonnieren Sie jetzt', keywords: 'urban farming blog, nachhaltigkeits-news, farming tipps, microhabitat geschichten' },
          nl: { metaTitle: 'Stadslandbouw Blog | Nieuws & Tips', metaDescription: 'Blijf op de hoogte van de laatste stadslandbouwtrends, duurzaamheidstips, projectverhalen en expertinzichten van Microhabitat team. Schrijf je in', keywords: 'stadslandbouw blog, duurzaamheidsnieuws, landbouwtips, microhabitat verhalen' },
          it: { metaTitle: 'Blog Agricoltura Urbana | Notizie e Consigli', metaDescription: 'Rimani aggiornato sulle ultime tendenze agricoltura urbana, consigli sostenibilità, storie progetti e approfondimenti esperti Microhabitat. Iscriviti', keywords: 'blog agricoltura urbana, notizie sostenibilità, consigli agricoltura, storie microhabitat' },
          es: { metaTitle: 'Blog Agricultura Urbana | Noticias y Consejos', metaDescription: 'Mantente actualizado con las últimas tendencias agricultura urbana, consejos sostenibilidad, historias proyectos e insights de expertos Microhabitat', keywords: 'blog agricultura urbana, noticias sostenibilidad, consejos cultivo, historias microhabitat' },
        },
        'cities-page': {
          en: { metaTitle: 'Urban Farm Locations | 20+ Cities in North America & Europe', metaDescription: 'Explore Microhabitat urban farming locations in Montreal, Toronto, New York, Paris, London & more. Find a farm near you and discover local initiatives', keywords: 'urban farm locations, cities, Montreal, Toronto, New York, Paris, London, urban farming near me' },
          fr: { metaTitle: 'Emplacements Fermes Urbaines | 20+ Villes Amérique du Nord', metaDescription: 'Explorez les emplacements Microhabitat à Montréal, Toronto, New York, Paris, Londres et plus. Trouvez une ferme près de chez vous, découvrez l\'agriculture', keywords: 'emplacements fermes urbaines, villes, Montréal, Toronto, New York, Paris, agriculture près de moi' },
          de: { metaTitle: 'Stadtfarm-Standorte | 20+ Städte in Nordamerika & Europa', metaDescription: 'Entdecken Sie Microhabitat Stadtfarm-Standorte in Montreal, Toronto, New York, Paris, London & mehr. Finden Sie eine Farm in Ihrer Nähe, lokale Initiativen', keywords: 'stadtfarm standorte, städte, Montreal, Toronto, New York, Paris, London, urban farming in meiner nähe' },
          nl: { metaTitle: 'Stadsboerderij Locaties | 20+ Steden Noord-Amerika & Europa', metaDescription: 'Ontdek Microhabitat stadslandbouwlocaties in Montreal, Toronto, New York, Parijs, Londen en meer. Vind een boerderij bij u, ontdek lokale initiatieven', keywords: 'stadsboerderij locaties, steden, Montreal, Toronto, New York, Parijs, stadslandbouw bij mij' },
          it: { metaTitle: 'Sedi Fattorie Urbane | 20+ Città Nord America ed Europa', metaDescription: 'Esplora le sedi Microhabitat a Montreal, Toronto, New York, Parigi, Londra e altre città. Trova una fattoria vicino a te, scopri iniziative locali', keywords: 'sedi fattorie urbane, città, Montreal, Toronto, New York, Parigi, Londra, agricoltura vicino a me' },
          es: { metaTitle: 'Ubicaciones Granjas Urbanas | 20+ Ciudades América y Europa', metaDescription: 'Explora las ubicaciones Microhabitat en Montreal, Toronto, Nueva York, París, Londres y más. Encuentra una granja cerca de ti, descubre iniciativas', keywords: 'ubicaciones granjas urbanas, ciudades, Montreal, Toronto, Nueva York, París, agricultura cerca de mí' },
        },
        'privacy-policy-page': {
          en: { metaTitle: 'Privacy Policy | Microhabitat Data Protection & Your Rights', metaDescription: 'Learn how Microhabitat collects, uses & protects your personal data. Our privacy policy explains your rights under GDPR, CCPA & other regulations', keywords: 'privacy policy, data protection, GDPR, CCPA, personal data, user rights' },
          fr: { metaTitle: 'Politique de Confidentialité | Protection des Données', metaDescription: 'Découvrez comment Microhabitat collecte, utilise et protège vos données personnelles. Notre politique explique vos droits sous le RGPD et réglementations', keywords: 'politique confidentialité, protection données, RGPD, données personnelles, droits utilisateur' },
          de: { metaTitle: 'Datenschutzrichtlinie | Microhabitat Datenschutz & Rechte', metaDescription: 'Erfahren Sie, wie Microhabitat Ihre personenbezogenen Daten erhebt, verwendet & schützt. Datenschutzrichtlinie erklärt Ihre Rechte unter DSGVO & mehr', keywords: 'datenschutzrichtlinie, datenschutz, DSGVO, personenbezogene daten, nutzerrechte' },
          nl: { metaTitle: 'Privacybeleid | Microhabitat Gegevensbescherming & Rechten', metaDescription: 'Lees hoe Microhabitat uw persoonsgegevens verzamelt, gebruikt en beschermt. Ons privacybeleid legt uw rechten uit onder AVG en andere regels', keywords: 'privacybeleid, gegevensbescherming, AVG, persoonsgegevens, gebruikersrechten' },
          it: { metaTitle: 'Informativa Privacy | Protezione Dati Microhabitat', metaDescription: 'Scopri come Microhabitat raccoglie, utilizza e protegge i tuoi dati personali. La nostra informativa spiega i tuoi diritti secondo GDPR e normative', keywords: 'informativa privacy, protezione dati, GDPR, dati personali, diritti utente' },
          es: { metaTitle: 'Política de Privacidad | Protección de Datos Microhabitat', metaDescription: 'Conoce cómo Microhabitat recopila, usa y protege tus datos personales. Nuestra política de privacidad explica tus derechos bajo GDPR y otras normas', keywords: 'política privacidad, protección datos, GDPR, CCPA, datos personales, derechos usuario' },
        },
        'terms-of-service-page': {
          en: { metaTitle: 'Terms of Service | Microhabitat Website & Services', metaDescription: 'Read Microhabitat terms of service governing your use of our website, urban farming services & digital platforms. Last updated December 2024', keywords: 'terms of service, terms and conditions, user agreement, service terms, legal' },
          fr: { metaTitle: 'Conditions d\'Utilisation | Accord de Service Microhabitat', metaDescription: 'Lisez les conditions utilisation de Microhabitat régissant votre utilisation de notre site web, services agriculture urbaine et plateformes numériques', keywords: 'conditions utilisation, conditions générales, accord utilisateur, conditions service, légal' },
          de: { metaTitle: 'Nutzungsbedingungen | Microhabitat Website & Services', metaDescription: 'Lesen Sie die Nutzungsbedingungen von Microhabitat für die Nutzung unserer Website, Urban-Farming-Services & digitalen Plattformen. Dezember 2024', keywords: 'nutzungsbedingungen, AGB, nutzervereinbarung, servicebedingungen, rechtliches' },
          nl: { metaTitle: 'Servicevoorwaarden | Microhabitat Website & Services', metaDescription: 'Lees de servicevoorwaarden van Microhabitat voor het gebruik van onze website, stadslandbouwdiensten en digitale platformen. December 2024', keywords: 'servicevoorwaarden, algemene voorwaarden, gebruikersovereenkomst, dienstvoorwaarden, juridisch' },
          it: { metaTitle: 'Termini di Servizio | Accordo Sito Web Microhabitat', metaDescription: 'Leggi i termini di servizio di Microhabitat che regolano l\'uso del nostro sito web, servizi agricoltura urbana e piattaforme digitali. Dicembre 2024', keywords: 'termini di servizio, termini e condizioni, accordo utente, termini servizio, legale' },
          es: { metaTitle: 'Términos de Servicio | Acuerdo Sitio Web Microhabitat', metaDescription: 'Lee los términos de servicio de Microhabitat que rigen el uso de nuestro sitio web, servicios agricultura urbana y plataformas digitales. Diciembre 2024', keywords: 'términos de servicio, términos y condiciones, acuerdo usuario, términos servicio, legal' },
        },
        'cookie-policy-page': {
          en: { metaTitle: 'Cookie Policy | How Microhabitat Uses Cookies', metaDescription: 'Understand how Microhabitat uses cookies, analytics & tracking technologies on our website. Learn how to manage your cookie preferences and opt-out', keywords: 'cookie policy, cookies, tracking, analytics, opt-out, cookie preferences' },
          fr: { metaTitle: 'Politique de Cookies | Utilisation des Cookies Microhabitat', metaDescription: 'Comprenez comment Microhabitat utilise les cookies, analyses et technologies de suivi. Apprenez à gérer vos préférences cookies et désactivation', keywords: 'politique cookies, cookies, suivi, analytique, désactivation, préférences cookies' },
          de: { metaTitle: 'Cookie-Richtlinie | Wie Microhabitat Cookies Nutzt', metaDescription: 'Verstehen Sie, wie Microhabitat Cookies, Analytics & Tracking-Technologien nutzt. Erfahren Sie, wie Sie Cookie-Einstellungen verwalten und Opt-out', keywords: 'cookie-richtlinie, cookies, tracking, analytics, opt-out, cookie-einstellungen' },
          nl: { metaTitle: 'Cookiebeleid | Hoe Microhabitat Cookies Gebruikt', metaDescription: 'Begrijp hoe Microhabitat cookies, analytics en tracking-technologieën gebruikt. Leer hoe u uw cookievoorkeuren beheert en opt-out opties', keywords: 'cookiebeleid, cookies, tracking, analytics, opt-out, cookievoorkeuren' },
          it: { metaTitle: 'Politica sui Cookie | Come Microhabitat Usa i Cookie', metaDescription: 'Comprendi come Microhabitat utilizza cookie, analytics e tecnologie tracciamento. Scopri come gestire le tue preferenze cookie e opzioni opt-out', keywords: 'politica cookie, cookie, tracciamento, analytics, opt-out, preferenze cookie' },
          es: { metaTitle: 'Política de Cookies | Cómo Microhabitat Usa Cookies', metaDescription: 'Comprende cómo Microhabitat usa cookies, analytics y tecnologías de seguimiento. Aprende a gestionar tus preferencias cookies y opciones exclusión', keywords: 'política cookies, cookies, seguimiento, analytics, exclusión, preferencias cookies' },
        },
      };

      // Create/Update page SEO entries using Document Service for proper i18n
      for (const [pageType, localeData] of Object.entries(pageSEOData)) {
        try {
          const uid = `api::${pageType}.${pageType}` as any;
          const docService = strapi.documents(uid);

          for (const [locale, seoData] of Object.entries(localeData)) {
            try {
              // Find existing document for this locale
              const existing = await docService.findFirst({
                locale,
                populate: ['seo']
              });

              if (existing) {
                // Update existing document with SEO
                await docService.update({
                  documentId: existing.documentId,
                  locale,
                  data: { seo: seoData } as any,
                });
              } else {
                // Create new document for this locale
                await docService.create({
                  locale,
                  data: { seo: seoData } as any,
                  status: 'published',
                });
              }
            } catch (localeError: any) {
              // Silently continue on locale errors
            }
          }
          console.log(`[Bootstrap] Seeded SEO for ${pageType}`);
        } catch (e) {
          console.error(`[Bootstrap] Failed to seed SEO for ${pageType}:`, e);
        }
      }

      // ============================================
      // Page Content Seeding (body content for all pages)
      // ============================================
      console.log("[Bootstrap] Seeding page content...");

      const pageContentData: Record<string, Record<string, Record<string, any>>> = {
        'about-page': {
          en: {
            heroLabel: 'Our Story',
            heroTitle: 'Reconnecting',
            heroTitleHighlight: 'communities with nature',
            missionLabel: 'Our Mission',
            missionTitle: 'Transforming urban spaces into thriving ecosystems',
            missionParagraph1: 'MicroHabitat was founded in 2016 by Orlane and Alexandre, two childhood friends from Montreal united by a shared vision: making urban agriculture accessible to everyone.',
            missionParagraph2: 'Today, we operate the largest network of urban farms in the world, transforming underused rooftops and spaces into productive, ecological farms across North America and Europe.',
            solidarityLabel: 'Community Impact',
            solidarityTitle: 'Fresh food for those who need it most',
            solidarityDescription: 'Through our solidarity harvest program, we donate a portion of every harvest to local food banks and community organizations, ensuring that everyone has access to fresh, nutritious produce.',
            impactStats: [
              { value: '200+', label: 'Urban farms installed' },
              { value: '500K+', label: 'lbs of produce grown' },
              { value: '50K+', label: 'People engaged' },
              { value: '8', label: 'Years of experience' }
            ],
            storyLabel: 'Our Journey',
            storyTitle: 'From rooftop dreams to global impact',
            storyContent: 'What started as a single rooftop garden in Montreal has grown into a movement. We believe that every urban space has the potential to become a source of food, community, and environmental resilience.',
            ctaTitle: 'Ready to transform your space?',
            ctaDescription: 'Join the urban farming revolution and create a lasting impact in your community.'
          },
          fr: {
            heroLabel: 'Notre Histoire',
            heroTitle: 'Reconnecter les',
            heroTitleHighlight: 'communautés avec la nature',
            missionLabel: 'Notre Mission',
            missionTitle: 'Transformer les espaces urbains en écosystèmes florissants',
            missionParagraph1: 'MicroHabitat a été fondé en 2016 par Orlane et Alexandre, deux amis d\'enfance de Montréal unis par une vision commune : rendre l\'agriculture urbaine accessible à tous.',
            missionParagraph2: 'Aujourd\'hui, nous opérons le plus grand réseau de fermes urbaines au monde, transformant les toits et espaces sous-utilisés en fermes productives et écologiques à travers l\'Amérique du Nord et l\'Europe.',
            solidarityLabel: 'Impact Communautaire',
            solidarityTitle: 'Des aliments frais pour ceux qui en ont le plus besoin',
            solidarityDescription: 'Grâce à notre programme de récolte solidaire, nous donnons une partie de chaque récolte aux banques alimentaires locales et organisations communautaires.',
            impactStats: [
              { value: '200+', label: 'Fermes urbaines installées' },
              { value: '500K+', label: 'lb de produits cultivés' },
              { value: '50K+', label: 'Personnes engagées' },
              { value: '8', label: 'Années d\'expérience' }
            ],
            storyLabel: 'Notre Parcours',
            storyTitle: 'Des rêves de toits à un impact mondial',
            storyContent: 'Ce qui a commencé comme un simple jardin sur un toit à Montréal est devenu un mouvement. Nous croyons que chaque espace urbain peut devenir une source de nourriture et de résilience.',
            ctaTitle: 'Prêt à transformer votre espace?',
            ctaDescription: 'Rejoignez la révolution de l\'agriculture urbaine et créez un impact durable dans votre communauté.'
          },
          de: {
            heroLabel: 'Unsere Geschichte',
            heroTitle: 'Gemeinschaften wieder mit der',
            heroTitleHighlight: 'Natur verbinden',
            missionLabel: 'Unsere Mission',
            missionTitle: 'Städtische Räume in blühende Ökosysteme verwandeln',
            missionParagraph1: 'MicroHabitat wurde 2016 von Orlane und Alexandre gegründet, zwei Kindheitsfreunden aus Montreal, die eine gemeinsame Vision teilten.',
            missionParagraph2: 'Heute betreiben wir das größte Netzwerk städtischer Farmen der Welt und verwandeln ungenutzte Dächer in produktive, ökologische Farmen.',
            solidarityLabel: 'Gemeinschaftliche Wirkung',
            solidarityTitle: 'Frische Lebensmittel für Bedürftige',
            solidarityDescription: 'Durch unser Solidaritäts-Ernteprogramm spenden wir einen Teil jeder Ernte an lokale Lebensmittelbanken.',
            impactStats: [
              { value: '200+', label: 'Stadtfarmen installiert' },
              { value: '500K+', label: 'Pfund angebaut' },
              { value: '50K+', label: 'Menschen engagiert' },
              { value: '8', label: 'Jahre Erfahrung' }
            ],
            storyLabel: 'Unsere Reise',
            storyTitle: 'Von Dachträumen zur globalen Wirkung',
            storyContent: 'Was als ein einziger Dachgarten in Montreal begann, ist zu einer Bewegung geworden.',
            ctaTitle: 'Bereit, Ihren Raum zu verwandeln?',
            ctaDescription: 'Schließen Sie sich der Urban-Farming-Revolution an.'
          },
          nl: {
            heroLabel: 'Ons Verhaal',
            heroTitle: 'Gemeenschappen opnieuw verbinden',
            heroTitleHighlight: 'met de natuur',
            missionLabel: 'Onze Missie',
            missionTitle: 'Stedelijke ruimtes transformeren tot bloeiende ecosystemen',
            missionParagraph1: 'MicroHabitat werd in 2016 opgericht door Orlane en Alexandre, twee jeugdvrienden uit Montreal.',
            missionParagraph2: 'Vandaag beheren we het grootste netwerk van stadsboerderijen ter wereld.',
            solidarityLabel: 'Gemeenschapsimpact',
            solidarityTitle: 'Vers voedsel voor wie het het meest nodig heeft',
            solidarityDescription: 'Via ons solidariteitsoogstprogramma doneren we een deel van elke oogst aan lokale voedselbanken.',
            impactStats: [
              { value: '200+', label: 'Stadsboerderijen geïnstalleerd' },
              { value: '500K+', label: 'pond geteeld' },
              { value: '50K+', label: 'Mensen betrokken' },
              { value: '8', label: 'Jaar ervaring' }
            ],
            storyLabel: 'Onze Reis',
            storyTitle: 'Van dakdromen naar wereldwijde impact',
            storyContent: 'Wat begon als een enkele daktuin in Montreal is uitgegroeid tot een beweging.',
            ctaTitle: 'Klaar om uw ruimte te transformeren?',
            ctaDescription: 'Sluit u aan bij de stadslandbouwrevolutie.'
          },
          it: {
            heroLabel: 'La Nostra Storia',
            heroTitle: 'Riconnettere le',
            heroTitleHighlight: 'comunità con la natura',
            missionLabel: 'La Nostra Missione',
            missionTitle: 'Trasformare gli spazi urbani in ecosistemi rigogliosi',
            missionParagraph1: 'MicroHabitat è stata fondata nel 2016 da Orlane e Alexandre, due amici d\'infanzia di Montreal.',
            missionParagraph2: 'Oggi gestiamo la più grande rete di fattorie urbane al mondo.',
            solidarityLabel: 'Impatto Comunitario',
            solidarityTitle: 'Cibo fresco per chi ne ha più bisogno',
            solidarityDescription: 'Attraverso il nostro programma di raccolto solidale, doniamo una parte di ogni raccolto alle banche alimentari locali.',
            impactStats: [
              { value: '200+', label: 'Fattorie urbane installate' },
              { value: '500K+', label: 'libbre coltivate' },
              { value: '50K+', label: 'Persone coinvolte' },
              { value: '8', label: 'Anni di esperienza' }
            ],
            storyLabel: 'Il Nostro Viaggio',
            storyTitle: 'Dai sogni sui tetti all\'impatto globale',
            storyContent: 'Quello che è iniziato come un singolo orto sul tetto a Montreal è diventato un movimento.',
            ctaTitle: 'Pronto a trasformare il tuo spazio?',
            ctaDescription: 'Unisciti alla rivoluzione dell\'agricoltura urbana.'
          },
          es: {
            heroLabel: 'Nuestra Historia',
            heroTitle: 'Reconectando',
            heroTitleHighlight: 'comunidades con la naturaleza',
            missionLabel: 'Nuestra Misión',
            missionTitle: 'Transformar espacios urbanos en ecosistemas prósperos',
            missionParagraph1: 'MicroHabitat fue fundada en 2016 por Orlane y Alexandre, dos amigos de la infancia de Montreal.',
            missionParagraph2: 'Hoy operamos la red más grande de granjas urbanas del mundo.',
            solidarityLabel: 'Impacto Comunitario',
            solidarityTitle: 'Alimentos frescos para quienes más los necesitan',
            solidarityDescription: 'A través de nuestro programa de cosecha solidaria, donamos una parte de cada cosecha a bancos de alimentos locales.',
            impactStats: [
              { value: '200+', label: 'Granjas urbanas instaladas' },
              { value: '500K+', label: 'libras cultivadas' },
              { value: '50K+', label: 'Personas comprometidas' },
              { value: '8', label: 'Años de experiencia' }
            ],
            storyLabel: 'Nuestro Viaje',
            storyTitle: 'De sueños en azoteas a impacto global',
            storyContent: 'Lo que comenzó como un solo jardín en una azotea en Montreal se ha convertido en un movimiento.',
            ctaTitle: '¿Listo para transformar tu espacio?',
            ctaDescription: 'Únete a la revolución de la agricultura urbana.'
          }
        },
        'outdoor-farm-page': {
          en: {
            heroLabel: 'Outdoor Farms',
            heroTitle: 'Transform your rooftop into a',
            heroTitleHighlight: 'thriving urban farm',
            introLabel: 'Our Approach',
            introTitle: 'Full-service urban farming solutions',
            introDescription: 'We design, install, and maintain productive rooftop farms that provide fresh produce, community engagement, and environmental benefits.',
            services: [
              { title: 'Design & Installation', description: 'Custom farm design tailored to your space, including soil, irrigation, and planting systems.' },
              { title: 'Ongoing Maintenance', description: 'Regular care including planting, harvesting, pest management, and seasonal transitions.' },
              { title: 'Harvest Distribution', description: 'Fresh produce delivered to your building residents, employees, or community partners.' }
            ],
            packagesLabel: 'Packages',
            packagesTitle: 'Choose the right plan for your space',
            packages: [
              { name: 'Starter', features: ['Up to 1,000 sq ft', 'Seasonal planting', 'Monthly maintenance', 'Quarterly reports'] },
              { name: 'Professional', features: ['Up to 5,000 sq ft', 'Year-round production', 'Weekly maintenance', 'Community events included'] },
              { name: 'Enterprise', features: ['5,000+ sq ft', 'Custom programming', 'Dedicated farm manager', 'Full sustainability reporting'] }
            ],
            ctaTitle: 'Ready to grow with us?',
            ctaDescription: 'Contact us for a free consultation and site assessment.'
          },
          fr: {
            heroLabel: 'Fermes Extérieures',
            heroTitle: 'Transformez votre toit en une',
            heroTitleHighlight: 'ferme urbaine florissante',
            introLabel: 'Notre Approche',
            introTitle: 'Solutions d\'agriculture urbaine clé en main',
            introDescription: 'Nous concevons, installons et entretenons des fermes sur toit productives qui fournissent des produits frais et des avantages environnementaux.',
            services: [
              { title: 'Conception & Installation', description: 'Conception de ferme personnalisée adaptée à votre espace.' },
              { title: 'Entretien Continu', description: 'Soins réguliers incluant plantation, récolte et gestion des nuisibles.' },
              { title: 'Distribution des Récoltes', description: 'Produits frais livrés aux résidents ou employés de votre bâtiment.' }
            ],
            packagesLabel: 'Forfaits',
            packagesTitle: 'Choisissez le plan adapté à votre espace',
            packages: [
              { name: 'Débutant', features: ['Jusqu\'à 100 m²', 'Plantation saisonnière', 'Entretien mensuel', 'Rapports trimestriels'] },
              { name: 'Professionnel', features: ['Jusqu\'à 500 m²', 'Production toute l\'année', 'Entretien hebdomadaire', 'Événements communautaires'] },
              { name: 'Entreprise', features: ['500+ m²', 'Programmation personnalisée', 'Gestionnaire dédié', 'Rapports de durabilité'] }
            ],
            ctaTitle: 'Prêt à grandir avec nous?',
            ctaDescription: 'Contactez-nous pour une consultation gratuite.'
          },
          de: {
            heroLabel: 'Außenfarmen',
            heroTitle: 'Verwandeln Sie Ihr Dach in eine',
            heroTitleHighlight: 'blühende Stadtfarm',
            introLabel: 'Unser Ansatz',
            introTitle: 'Full-Service Urban-Farming-Lösungen',
            introDescription: 'Wir entwerfen, installieren und pflegen produktive Dachfarmen.',
            services: [
              { title: 'Design & Installation', description: 'Maßgeschneidertes Farm-Design für Ihren Raum.' },
              { title: 'Laufende Wartung', description: 'Regelmäßige Pflege einschließlich Pflanzen und Ernten.' },
              { title: 'Ernteverteilung', description: 'Frische Produkte für Bewohner oder Mitarbeiter.' }
            ],
            packagesLabel: 'Pakete',
            packagesTitle: 'Wählen Sie den richtigen Plan',
            packages: [
              { name: 'Starter', features: ['Bis zu 100 m²', 'Saisonale Bepflanzung', 'Monatliche Wartung'] },
              { name: 'Professional', features: ['Bis zu 500 m²', 'Ganzjährige Produktion', 'Wöchentliche Wartung'] },
              { name: 'Enterprise', features: ['500+ m²', 'Individuelle Programme', 'Dedizierter Manager'] }
            ],
            ctaTitle: 'Bereit, mit uns zu wachsen?',
            ctaDescription: 'Kontaktieren Sie uns für eine kostenlose Beratung.'
          },
          nl: {
            heroLabel: 'Buitenboerderijen',
            heroTitle: 'Transformeer uw dak in een',
            heroTitleHighlight: 'bloeiende stadsboerderij',
            introLabel: 'Onze Aanpak',
            introTitle: 'Full-service stadslandbouwoplossingen',
            introDescription: 'Wij ontwerpen, installeren en onderhouden productieve dakboerderijen.',
            services: [
              { title: 'Ontwerp & Installatie', description: 'Op maat gemaakt ontwerp voor uw ruimte.' },
              { title: 'Doorlopend Onderhoud', description: 'Regelmatige verzorging inclusief planten en oogsten.' },
              { title: 'Oogstverdeling', description: 'Verse producten voor bewoners of medewerkers.' }
            ],
            packagesLabel: 'Pakketten',
            packagesTitle: 'Kies het juiste plan',
            packages: [
              { name: 'Starter', features: ['Tot 100 m²', 'Seizoensgebonden beplanting', 'Maandelijks onderhoud'] },
              { name: 'Professioneel', features: ['Tot 500 m²', 'Jaarrond productie', 'Wekelijks onderhoud'] },
              { name: 'Enterprise', features: ['500+ m²', 'Aangepaste programma\'s', 'Toegewijde manager'] }
            ],
            ctaTitle: 'Klaar om met ons te groeien?',
            ctaDescription: 'Neem contact op voor een gratis consult.'
          },
          it: {
            heroLabel: 'Fattorie Esterne',
            heroTitle: 'Trasforma il tuo tetto in una',
            heroTitleHighlight: 'fattoria urbana rigogliosa',
            introLabel: 'Il Nostro Approccio',
            introTitle: 'Soluzioni complete di agricoltura urbana',
            introDescription: 'Progettiamo, installiamo e manteniamo fattorie sul tetto produttive.',
            services: [
              { title: 'Design & Installazione', description: 'Design personalizzato per il tuo spazio.' },
              { title: 'Manutenzione Continua', description: 'Cura regolare inclusa semina e raccolta.' },
              { title: 'Distribuzione Raccolto', description: 'Prodotti freschi per residenti o dipendenti.' }
            ],
            packagesLabel: 'Pacchetti',
            packagesTitle: 'Scegli il piano giusto',
            packages: [
              { name: 'Starter', features: ['Fino a 100 m²', 'Piantagione stagionale', 'Manutenzione mensile'] },
              { name: 'Professional', features: ['Fino a 500 m²', 'Produzione tutto l\'anno', 'Manutenzione settimanale'] },
              { name: 'Enterprise', features: ['500+ m²', 'Programmi personalizzati', 'Manager dedicato'] }
            ],
            ctaTitle: 'Pronto a crescere con noi?',
            ctaDescription: 'Contattaci per una consulenza gratuita.'
          },
          es: {
            heroLabel: 'Granjas Exteriores',
            heroTitle: 'Transforma tu azotea en una',
            heroTitleHighlight: 'granja urbana próspera',
            introLabel: 'Nuestro Enfoque',
            introTitle: 'Soluciones completas de agricultura urbana',
            introDescription: 'Diseñamos, instalamos y mantenemos granjas en azoteas productivas.',
            services: [
              { title: 'Diseño e Instalación', description: 'Diseño personalizado para tu espacio.' },
              { title: 'Mantenimiento Continuo', description: 'Cuidado regular incluyendo siembra y cosecha.' },
              { title: 'Distribución de Cosecha', description: 'Productos frescos para residentes o empleados.' }
            ],
            packagesLabel: 'Paquetes',
            packagesTitle: 'Elige el plan adecuado',
            packages: [
              { name: 'Inicial', features: ['Hasta 100 m²', 'Siembra estacional', 'Mantenimiento mensual'] },
              { name: 'Profesional', features: ['Hasta 500 m²', 'Producción todo el año', 'Mantenimiento semanal'] },
              { name: 'Empresa', features: ['500+ m²', 'Programas personalizados', 'Gerente dedicado'] }
            ],
            ctaTitle: '¿Listo para crecer con nosotros?',
            ctaDescription: 'Contáctanos para una consulta gratuita.'
          }
        },
        'contact-page': {
          en: {
            heroLabel: 'Get in Touch',
            heroTitle: 'Let\'s grow',
            heroTitleHighlight: 'together',
            introText: 'Ready to transform your space? We\'d love to hear from you. Reach out to discuss your project or just say hello.',
            offices: [
              { name: 'Montreal HQ', type: 'Headquarters', address: '123 Urban Farm Street', city: 'Montreal', country: 'Canada' },
              { name: 'Toronto Office', type: 'Regional Office', address: '456 Green Roof Ave', city: 'Toronto', country: 'Canada' },
              { name: 'New York Office', type: 'Regional Office', address: '789 Rooftop Blvd', city: 'New York', country: 'USA' },
              { name: 'Paris Office', type: 'Regional Office', address: '101 Rue des Jardins', city: 'Paris', country: 'France' }
            ],
            formTitle: 'Send us a message',
            formSubtitle: 'Fill out the form below and we\'ll get back to you within 24 hours.',
            quickLinks: [
              { label: 'General Inquiries', value: 'info@microhabitat.ca' },
              { label: 'Partnerships', value: 'partnerships@microhabitat.ca' },
              { label: 'Careers', value: 'careers@microhabitat.ca' }
            ]
          },
          fr: {
            heroLabel: 'Contactez-nous',
            heroTitle: 'Grandissons',
            heroTitleHighlight: 'ensemble',
            introText: 'Prêt à transformer votre espace? Nous serions ravis de vous entendre.',
            offices: [
              { name: 'Siège Montréal', type: 'Siège social', address: '123 Rue Ferme Urbaine', city: 'Montréal', country: 'Canada' },
              { name: 'Bureau Toronto', type: 'Bureau régional', address: '456 Ave Toit Vert', city: 'Toronto', country: 'Canada' },
              { name: 'Bureau New York', type: 'Bureau régional', address: '789 Blvd Rooftop', city: 'New York', country: 'USA' },
              { name: 'Bureau Paris', type: 'Bureau régional', address: '101 Rue des Jardins', city: 'Paris', country: 'France' }
            ],
            formTitle: 'Envoyez-nous un message',
            formSubtitle: 'Remplissez le formulaire et nous vous répondrons dans les 24 heures.',
            quickLinks: [
              { label: 'Demandes générales', value: 'info@microhabitat.ca' },
              { label: 'Partenariats', value: 'partnerships@microhabitat.ca' },
              { label: 'Carrières', value: 'careers@microhabitat.ca' }
            ]
          },
          de: {
            heroLabel: 'Kontakt',
            heroTitle: 'Lasst uns gemeinsam',
            heroTitleHighlight: 'wachsen',
            introText: 'Bereit, Ihren Raum zu transformieren? Kontaktieren Sie uns.',
            offices: [
              { name: 'Montreal HQ', type: 'Hauptsitz', address: '123 Urban Farm Street', city: 'Montreal', country: 'Kanada' },
              { name: 'Toronto Büro', type: 'Regionalbüro', address: '456 Green Roof Ave', city: 'Toronto', country: 'Kanada' },
              { name: 'New York Büro', type: 'Regionalbüro', address: '789 Rooftop Blvd', city: 'New York', country: 'USA' },
              { name: 'Paris Büro', type: 'Regionalbüro', address: '101 Rue des Jardins', city: 'Paris', country: 'Frankreich' }
            ],
            formTitle: 'Nachricht senden',
            formSubtitle: 'Füllen Sie das Formular aus.',
            quickLinks: [
              { label: 'Allgemeine Anfragen', value: 'info@microhabitat.ca' },
              { label: 'Partnerschaften', value: 'partnerships@microhabitat.ca' },
              { label: 'Karriere', value: 'careers@microhabitat.ca' }
            ]
          },
          nl: {
            heroLabel: 'Contact',
            heroTitle: 'Laten we samen',
            heroTitleHighlight: 'groeien',
            introText: 'Klaar om uw ruimte te transformeren? Neem contact op.',
            offices: [
              { name: 'Montreal HQ', type: 'Hoofdkantoor', address: '123 Urban Farm Street', city: 'Montreal', country: 'Canada' },
              { name: 'Toronto Kantoor', type: 'Regionaal kantoor', address: '456 Green Roof Ave', city: 'Toronto', country: 'Canada' },
              { name: 'New York Kantoor', type: 'Regionaal kantoor', address: '789 Rooftop Blvd', city: 'New York', country: 'VS' },
              { name: 'Parijs Kantoor', type: 'Regionaal kantoor', address: '101 Rue des Jardins', city: 'Parijs', country: 'Frankrijk' }
            ],
            formTitle: 'Stuur ons een bericht',
            formSubtitle: 'Vul het formulier in.',
            quickLinks: [
              { label: 'Algemene vragen', value: 'info@microhabitat.ca' },
              { label: 'Partnerschappen', value: 'partnerships@microhabitat.ca' },
              { label: 'Carrières', value: 'careers@microhabitat.ca' }
            ]
          },
          it: {
            heroLabel: 'Contattaci',
            heroTitle: 'Cresciamo',
            heroTitleHighlight: 'insieme',
            introText: 'Pronto a trasformare il tuo spazio? Contattaci.',
            offices: [
              { name: 'Montreal HQ', type: 'Sede centrale', address: '123 Urban Farm Street', city: 'Montreal', country: 'Canada' },
              { name: 'Ufficio Toronto', type: 'Ufficio regionale', address: '456 Green Roof Ave', city: 'Toronto', country: 'Canada' },
              { name: 'Ufficio New York', type: 'Ufficio regionale', address: '789 Rooftop Blvd', city: 'New York', country: 'USA' },
              { name: 'Ufficio Parigi', type: 'Ufficio regionale', address: '101 Rue des Jardins', city: 'Parigi', country: 'Francia' }
            ],
            formTitle: 'Inviaci un messaggio',
            formSubtitle: 'Compila il modulo.',
            quickLinks: [
              { label: 'Richieste generali', value: 'info@microhabitat.ca' },
              { label: 'Partnership', value: 'partnerships@microhabitat.ca' },
              { label: 'Carriere', value: 'careers@microhabitat.ca' }
            ]
          },
          es: {
            heroLabel: 'Contáctanos',
            heroTitle: 'Crezcamos',
            heroTitleHighlight: 'juntos',
            introText: '¿Listo para transformar tu espacio? Contáctanos.',
            offices: [
              { name: 'Montreal HQ', type: 'Sede central', address: '123 Urban Farm Street', city: 'Montreal', country: 'Canadá' },
              { name: 'Oficina Toronto', type: 'Oficina regional', address: '456 Green Roof Ave', city: 'Toronto', country: 'Canadá' },
              { name: 'Oficina Nueva York', type: 'Oficina regional', address: '789 Rooftop Blvd', city: 'Nueva York', country: 'EE.UU.' },
              { name: 'Oficina París', type: 'Oficina regional', address: '101 Rue des Jardins', city: 'París', country: 'Francia' }
            ],
            formTitle: 'Envíanos un mensaje',
            formSubtitle: 'Completa el formulario.',
            quickLinks: [
              { label: 'Consultas generales', value: 'info@microhabitat.ca' },
              { label: 'Alianzas', value: 'partnerships@microhabitat.ca' },
              { label: 'Carreras', value: 'careers@microhabitat.ca' }
            ]
          }
        },
        'careers-page': {
          en: {
            heroLabel: 'Join Our Team',
            heroTitle: 'Grow your career',
            heroTitleHighlight: 'with purpose',
            introText: 'We\'re building a team of passionate people who believe in making cities greener and communities stronger.',
            valuesLabel: 'Our Values',
            valuesTitle: 'What drives us every day',
            values: [
              { title: 'Sustainability', description: 'We put the planet first in everything we do.' },
              { title: 'Community', description: 'We believe in the power of bringing people together.' },
              { title: 'Innovation', description: 'We constantly push boundaries in urban agriculture.' },
              { title: 'Integrity', description: 'We operate with transparency and honesty.' }
            ],
            whyJoinLabel: 'Why Microhabitat',
            whyJoinTitle: 'More than just a job',
            benefits: [
              { title: 'Meaningful Work', description: 'Make a real impact on urban sustainability.' },
              { title: 'Growth Opportunities', description: 'Learn and grow in a dynamic environment.' },
              { title: 'Great Benefits', description: 'Competitive salary, health benefits, and more.' },
              { title: 'Flexible Work', description: 'Balance your work and personal life.' }
            ],
            ctaTitle: 'Ready to join us?',
            ctaDescription: 'Check out our open positions and apply today.'
          },
          fr: {
            heroLabel: 'Rejoignez Notre Équipe',
            heroTitle: 'Développez votre carrière',
            heroTitleHighlight: 'avec un sens',
            introText: 'Nous construisons une équipe de personnes passionnées qui croient en des villes plus vertes.',
            valuesLabel: 'Nos Valeurs',
            valuesTitle: 'Ce qui nous motive chaque jour',
            values: [
              { title: 'Durabilité', description: 'Nous mettons la planète en premier dans tout ce que nous faisons.' },
              { title: 'Communauté', description: 'Nous croyons au pouvoir de rassembler les gens.' },
              { title: 'Innovation', description: 'Nous repoussons constamment les limites.' },
              { title: 'Intégrité', description: 'Nous opérons avec transparence et honnêteté.' }
            ],
            whyJoinLabel: 'Pourquoi Microhabitat',
            whyJoinTitle: 'Plus qu\'un emploi',
            benefits: [
              { title: 'Travail Significatif', description: 'Ayez un impact réel sur la durabilité urbaine.' },
              { title: 'Opportunités de Croissance', description: 'Apprenez et grandissez dans un environnement dynamique.' },
              { title: 'Excellents Avantages', description: 'Salaire compétitif, assurance santé, et plus.' },
              { title: 'Travail Flexible', description: 'Équilibrez travail et vie personnelle.' }
            ],
            ctaTitle: 'Prêt à nous rejoindre?',
            ctaDescription: 'Consultez nos postes ouverts et postulez aujourd\'hui.'
          },
          de: {
            heroLabel: 'Werde Teil unseres Teams',
            heroTitle: 'Entwickle deine Karriere',
            heroTitleHighlight: 'mit Sinn',
            introText: 'Wir bauen ein Team leidenschaftlicher Menschen auf, die an grünere Städte glauben.',
            valuesLabel: 'Unsere Werte',
            valuesTitle: 'Was uns jeden Tag antreibt',
            values: [
              { title: 'Nachhaltigkeit', description: 'Wir stellen den Planeten an erste Stelle.' },
              { title: 'Gemeinschaft', description: 'Wir glauben an die Kraft des Zusammenkommens.' },
              { title: 'Innovation', description: 'Wir überschreiten ständig Grenzen.' },
              { title: 'Integrität', description: 'Wir handeln transparent und ehrlich.' }
            ],
            whyJoinLabel: 'Warum Microhabitat',
            whyJoinTitle: 'Mehr als nur ein Job',
            benefits: [
              { title: 'Sinnvolle Arbeit', description: 'Echte Wirkung auf städtische Nachhaltigkeit.' },
              { title: 'Wachstumsmöglichkeiten', description: 'Lernen und wachsen in dynamischer Umgebung.' },
              { title: 'Tolle Vorteile', description: 'Wettbewerbsfähiges Gehalt und Benefits.' },
              { title: 'Flexible Arbeit', description: 'Balance zwischen Arbeit und Privatleben.' }
            ],
            ctaTitle: 'Bereit, uns beizutreten?',
            ctaDescription: 'Sieh dir unsere offenen Stellen an.'
          },
          nl: {
            heroLabel: 'Sluit je aan bij ons team',
            heroTitle: 'Laat je carrière groeien',
            heroTitleHighlight: 'met betekenis',
            introText: 'We bouwen een team van gepassioneerde mensen die geloven in groenere steden.',
            valuesLabel: 'Onze Waarden',
            valuesTitle: 'Wat ons elke dag drijft',
            values: [
              { title: 'Duurzaamheid', description: 'We zetten de planeet op de eerste plaats.' },
              { title: 'Gemeenschap', description: 'We geloven in de kracht van samenkomen.' },
              { title: 'Innovatie', description: 'We verleggen voortdurend grenzen.' },
              { title: 'Integriteit', description: 'We handelen transparant en eerlijk.' }
            ],
            whyJoinLabel: 'Waarom Microhabitat',
            whyJoinTitle: 'Meer dan alleen een baan',
            benefits: [
              { title: 'Betekenisvol Werk', description: 'Maak echte impact op stedelijke duurzaamheid.' },
              { title: 'Groeimogelijkheden', description: 'Leer en groei in een dynamische omgeving.' },
              { title: 'Geweldige Voordelen', description: 'Competitief salaris en benefits.' },
              { title: 'Flexibel Werk', description: 'Balans tussen werk en privé.' }
            ],
            ctaTitle: 'Klaar om je bij ons aan te sluiten?',
            ctaDescription: 'Bekijk onze openstaande functies.'
          },
          it: {
            heroLabel: 'Unisciti al Nostro Team',
            heroTitle: 'Fai crescere la tua carriera',
            heroTitleHighlight: 'con uno scopo',
            introText: 'Stiamo costruendo un team di persone appassionate che credono in città più verdi.',
            valuesLabel: 'I Nostri Valori',
            valuesTitle: 'Cosa ci guida ogni giorno',
            values: [
              { title: 'Sostenibilità', description: 'Mettiamo il pianeta al primo posto.' },
              { title: 'Comunità', description: 'Crediamo nel potere di unire le persone.' },
              { title: 'Innovazione', description: 'Spingiamo costantemente i confini.' },
              { title: 'Integrità', description: 'Operiamo con trasparenza e onestà.' }
            ],
            whyJoinLabel: 'Perché Microhabitat',
            whyJoinTitle: 'Più di un semplice lavoro',
            benefits: [
              { title: 'Lavoro Significativo', description: 'Impatto reale sulla sostenibilità urbana.' },
              { title: 'Opportunità di Crescita', description: 'Impara e cresci in un ambiente dinamico.' },
              { title: 'Ottimi Benefici', description: 'Stipendio competitivo e benefici.' },
              { title: 'Lavoro Flessibile', description: 'Equilibrio tra lavoro e vita personale.' }
            ],
            ctaTitle: 'Pronto a unirti a noi?',
            ctaDescription: 'Consulta le nostre posizioni aperte.'
          },
          es: {
            heroLabel: 'Únete a Nuestro Equipo',
            heroTitle: 'Haz crecer tu carrera',
            heroTitleHighlight: 'con propósito',
            introText: 'Estamos construyendo un equipo de personas apasionadas que creen en ciudades más verdes.',
            valuesLabel: 'Nuestros Valores',
            valuesTitle: 'Lo que nos impulsa cada día',
            values: [
              { title: 'Sostenibilidad', description: 'Ponemos el planeta primero en todo.' },
              { title: 'Comunidad', description: 'Creemos en el poder de unir personas.' },
              { title: 'Innovación', description: 'Constantemente empujamos límites.' },
              { title: 'Integridad', description: 'Operamos con transparencia y honestidad.' }
            ],
            whyJoinLabel: 'Por Qué Microhabitat',
            whyJoinTitle: 'Más que solo un trabajo',
            benefits: [
              { title: 'Trabajo Significativo', description: 'Impacto real en la sostenibilidad urbana.' },
              { title: 'Oportunidades de Crecimiento', description: 'Aprende y crece en un ambiente dinámico.' },
              { title: 'Excelentes Beneficios', description: 'Salario competitivo y beneficios.' },
              { title: 'Trabajo Flexible', description: 'Equilibrio entre trabajo y vida personal.' }
            ],
            ctaTitle: '¿Listo para unirte?',
            ctaDescription: 'Revisa nuestras posiciones abiertas.'
          }
        }
      };

      // Seed page content using Document Service for proper i18n support
      for (const [pageType, localeData] of Object.entries(pageContentData)) {
        try {
          const uid = `api::${pageType}.${pageType}` as any;
          const docService = strapi.documents(uid);

          for (const [locale, contentData] of Object.entries(localeData)) {
            try {
              // Find existing document for this locale
              const existing = await docService.findFirst({
                locale,
              });

              if (existing) {
                // Update existing document
                await docService.update({
                  documentId: existing.documentId,
                  locale,
                  data: contentData as any,
                });
              } else {
                // Create new document for this locale
                await docService.create({
                  locale,
                  data: contentData as any,
                  status: 'published',
                });
              }
            } catch (localeError: any) {
              console.error(`[Bootstrap] Failed to seed ${pageType} (${locale}):`, localeError.message);
            }
          }
          console.log(`[Bootstrap] Seeded content for ${pageType}`);
        } catch (e: any) {
          console.error(`[Bootstrap] Failed to seed content for ${pageType}:`, e.message);
        }
      }

      // ================================================================
      // SEED BLOG POSTS from prepared JSON
      // ================================================================
      console.log("[Bootstrap] Seeding blog posts...");
      try {
        const blogDataPath = path.join(process.cwd(), "data", "blog-posts.json");
        if (fs.existsSync(blogDataPath)) {
          const blogPostsData = JSON.parse(fs.readFileSync(blogDataPath, "utf-8"));
          const blogDocService = strapi.documents("api::blog-post.blog-post");

          let seededCount = 0;
          for (const post of blogPostsData) {
            try {
              // Check if post exists
              const existing = await blogDocService.findMany({
                filters: { slug: post.slug },
                locale: "en",
              });

              if (existing.length === 0) {
                // Create new blog post
                await blogDocService.create({
                  locale: "en",
                  data: {
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    author: post.author,
                    publishedDate: post.date,
                    categories: post.categories,
                    seo: {
                      metaTitle: post.title.substring(0, 60),
                      metaDescription: post.excerpt.substring(0, 160),
                    },
                  },
                  status: "published",
                });
                seededCount++;
              }
            } catch (postError: any) {
              console.error(`[Bootstrap] Failed to seed blog post "${post.title}":`, postError.message);
            }
          }
          console.log(`[Bootstrap] Seeded ${seededCount} new blog posts (${blogPostsData.length} total in file)`);
        } else {
          console.log("[Bootstrap] No blog-posts.json found, skipping blog seeding");
          console.log("[Bootstrap] Run: node cms/scripts/prepare-blog-content.mjs to generate it");
        }
      } catch (blogError: any) {
        console.error("[Bootstrap] Blog seeding error:", blogError.message);
      }

      console.log("[Bootstrap] Bootstrap complete!");
    } catch (error) {
      console.error("[Bootstrap] Error during bootstrap:", error);
    }
  },
};
