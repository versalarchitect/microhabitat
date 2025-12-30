/**
 * Quick translation check - captures rendered text from each page
 */
import { chromium } from 'playwright';

const LOCALES = ['en', 'fr', 'de', 'nl', 'it', 'es'] as const;
type Locale = typeof LOCALES[number];

const PAGES_TO_CHECK = ['/', '/about', '/indoor-farm', '/careers'];

const SLUG_MAP: Record<Locale, Record<string, string>> = {
  en: {},
  fr: { 'about': 'a-propos', 'indoor-farm': 'ferme-interieure', 'careers': 'carrieres' },
  de: { 'about': 'ueber-uns', 'indoor-farm': 'indoor-farm', 'careers': 'karriere' },
  nl: { 'about': 'over-ons', 'indoor-farm': 'indoor-boerderij', 'careers': 'carriere' },
  it: { 'about': 'chi-siamo', 'indoor-farm': 'fattoria-interna', 'careers': 'carriere' },
  es: { 'about': 'sobre-nosotros', 'indoor-farm': 'granja-interior', 'careers': 'carreras' },
};

function getPath(path: string, locale: Locale): string {
  if (path === '/') return locale === 'en' ? '/' : `/${locale}`;
  const slug = path.replace('/', '');
  const localized = SLUG_MAP[locale][slug] || slug;
  return locale === 'en' ? `/${localized}` : `/${locale}/${localized}`;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const baseUrl = 'http://localhost:5173';

  console.log('Checking translations on key pages...\n');

  for (const locale of LOCALES) {
    console.log(`\n=== ${locale.toUpperCase()} ===`);

    for (const pagePath of PAGES_TO_CHECK) {
      const url = baseUrl + getPath(pagePath, locale);

      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(500);

        // Get key text elements
        const h1 = await page.$eval('h1', el => el.textContent?.trim() || '').catch(() => 'N/A');
        const firstP = await page.$eval('main p', el => el.textContent?.trim().slice(0, 80) || '').catch(() => 'N/A');
        const navItems = await page.$$eval('nav a', els => els.slice(0, 3).map(el => el.textContent?.trim())).catch(() => []);

        console.log(`\n${getPath(pagePath, locale)}`);
        console.log(`  H1: ${h1.slice(0, 60)}${h1.length > 60 ? '...' : ''}`);
        console.log(`  P:  ${firstP}${firstP.length >= 80 ? '...' : ''}`);
        console.log(`  Nav: ${navItems.join(', ')}`);

      } catch (e: any) {
        console.log(`  ERROR: ${e.message}`);
      }
    }
  }

  await browser.close();
  console.log('\n✨ Done!');
}

main().catch(console.error);
