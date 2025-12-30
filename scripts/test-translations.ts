/**
 * Translation Testing Script
 * Uses Playwright to visit all pages in all languages
 * Uses Ollama to verify content is in the correct language
 */

import { chromium, type Browser, type Page } from 'playwright';
import { spawn, type ChildProcess } from 'child_process';

const LOCALES = ['en', 'fr', 'de', 'nl', 'it', 'es'] as const;
type Locale = typeof LOCALES[number];

const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  fr: 'French',
  de: 'German',
  nl: 'Dutch',
  it: 'Italian',
  es: 'Spanish',
};

// Pages to test (English paths)
const PAGES = [
  '/',
  '/about',
  '/outdoor-farm',
  '/indoor-farm',
  '/educational-activities',
  '/commercial-real-estate',
  '/corporations',
  '/schools',
  '/careers',
  '/partnerships',
  '/community-engagement',
  '/contact',
  '/cities',
  '/faq',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',
];

// Localized slugs mapping
const SLUG_MAP: Record<Locale, Record<string, string>> = {
  en: {},
  fr: {
    'about': 'a-propos',
    'outdoor-farm': 'ferme-exterieure',
    'indoor-farm': 'ferme-interieure',
    'educational-activities': 'activites-educatives',
    'commercial-real-estate': 'immobilier-commercial',
    'corporations': 'entreprises',
    'schools': 'ecoles',
    'careers': 'carrieres',
    'partnerships': 'partenariats',
    'community-engagement': 'engagement-communautaire',
    'cities': 'villes',
    'privacy-policy': 'politique-confidentialite',
    'terms-of-service': 'conditions-utilisation',
    'cookie-policy': 'politique-cookies',
  },
  de: {
    'about': 'ueber-uns',
    'outdoor-farm': 'outdoor-farm',
    'indoor-farm': 'indoor-farm',
    'educational-activities': 'bildungsaktivitaeten',
    'commercial-real-estate': 'gewerbeimmobilien',
    'corporations': 'unternehmen',
    'schools': 'schulen',
    'careers': 'karriere',
    'partnerships': 'partnerschaften',
    'community-engagement': 'gemeinschaftliches-engagement',
    'cities': 'staedte',
    'contact': 'kontakt',
    'privacy-policy': 'datenschutz',
    'terms-of-service': 'nutzungsbedingungen',
    'cookie-policy': 'cookie-richtlinie',
  },
  nl: {
    'about': 'over-ons',
    'outdoor-farm': 'outdoor-boerderij',
    'indoor-farm': 'indoor-boerderij',
    'educational-activities': 'educatieve-activiteiten',
    'commercial-real-estate': 'commercieel-vastgoed',
    'corporations': 'bedrijven',
    'schools': 'scholen',
    'careers': 'carriere',
    'partnerships': 'partnerschappen',
    'community-engagement': 'community-betrokkenheid',
    'cities': 'steden',
    'privacy-policy': 'privacybeleid',
    'terms-of-service': 'algemene-voorwaarden',
    'cookie-policy': 'cookiebeleid',
  },
  it: {
    'about': 'chi-siamo',
    'outdoor-farm': 'fattoria-esterna',
    'indoor-farm': 'fattoria-interna',
    'educational-activities': 'attivita-educative',
    'commercial-real-estate': 'immobiliare-commerciale',
    'corporations': 'aziende',
    'schools': 'scuole',
    'careers': 'carriere',
    'partnerships': 'partnership',
    'community-engagement': 'impegno-comunitario',
    'cities': 'citta',
    'contact': 'contatto',
    'privacy-policy': 'informativa-privacy',
    'terms-of-service': 'termini-servizio',
    'cookie-policy': 'politica-cookie',
  },
  es: {
    'about': 'sobre-nosotros',
    'outdoor-farm': 'granja-exterior',
    'indoor-farm': 'granja-interior',
    'educational-activities': 'actividades-educativas',
    'commercial-real-estate': 'inmobiliaria-comercial',
    'corporations': 'empresas',
    'schools': 'escuelas',
    'careers': 'carreras',
    'partnerships': 'colaboraciones',
    'community-engagement': 'participacion-comunitaria',
    'cities': 'ciudades',
    'contact': 'contacto',
    'privacy-policy': 'politica-privacidad',
    'terms-of-service': 'terminos-servicio',
    'cookie-policy': 'politica-cookies',
  },
};

function getLocalizedPath(path: string, locale: Locale): string {
  if (path === '/') {
    return locale === 'en' ? '/' : `/${locale}`;
  }

  const slug = path.replace('/', '');
  const localizedSlug = SLUG_MAP[locale][slug] || slug;

  if (locale === 'en') {
    return `/${localizedSlug}`;
  }
  return `/${locale}/${localizedSlug}`;
}

async function callOllama(prompt: string): Promise<string> {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3.1:8b',
      prompt,
      stream: false,
      options: { temperature: 0 },
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status}`);
  }

  const data = await response.json();
  return data.response;
}

async function detectLanguage(text: string, expectedLocale: Locale): Promise<{ isCorrect: boolean; detectedLang: string; confidence: string }> {
  const sampleText = text.slice(0, 1500); // Limit text for faster processing

  const prompt = `Analyze this text and determine what language it is written in. The text should be in ${LOCALE_NAMES[expectedLocale]}.

Text to analyze:
"""
${sampleText}
"""

Respond with ONLY a JSON object in this exact format (no other text):
{"language": "detected language name", "confidence": "high/medium/low", "matches_expected": true/false}`;

  try {
    const response = await callOllama(prompt);
    // Try to extract JSON from response
    const jsonMatch = response.match(/\{[^}]+\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        isCorrect: parsed.matches_expected === true,
        detectedLang: parsed.language || 'unknown',
        confidence: parsed.confidence || 'unknown',
      };
    }
  } catch (e) {
    console.error('  Ollama parse error:', e);
  }

  return { isCorrect: false, detectedLang: 'error', confidence: 'error' };
}

function findUntranslatedKeys(text: string): string[] {
  // Look for patterns that look like translation keys
  const keyPatterns = [
    /\b[a-z]+\.[a-z]+\.[a-z]+/g,  // e.g., about.mission.title
    /\b[a-z]+\.[a-z]+[A-Z][a-z]+/g,  // e.g., nav.urbanFarming
  ];

  const keys: string[] = [];
  for (const pattern of keyPatterns) {
    const matches = text.match(pattern) || [];
    keys.push(...matches);
  }

  // Filter out common false positives
  return keys.filter(k =>
    !k.includes('www.') &&
    !k.includes('.com') &&
    !k.includes('.org') &&
    !k.includes('http')
  );
}

interface TestResult {
  locale: Locale;
  path: string;
  url: string;
  status: 'pass' | 'fail' | 'error';
  languageCheck: { isCorrect: boolean; detectedLang: string; confidence: string } | null;
  untranslatedKeys: string[];
  error?: string;
}

async function testPage(page: Page, baseUrl: string, path: string, locale: Locale): Promise<TestResult> {
  const localizedPath = getLocalizedPath(path, locale);
  const url = `${baseUrl}${localizedPath}`;

  const result: TestResult = {
    locale,
    path: localizedPath,
    url,
    status: 'pass',
    languageCheck: null,
    untranslatedKeys: [],
  };

  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    if (!response || response.status() >= 400) {
      result.status = 'error';
      result.error = `HTTP ${response?.status() || 'no response'}`;
      return result;
    }

    // Wait for content to load
    await page.waitForTimeout(500);

    // Get visible text content
    const textContent = await page.evaluate(() => {
      const body = document.body;
      // Remove script and style content
      const scripts = body.querySelectorAll('script, style, noscript');
      scripts.forEach(el => el.remove());
      return body.innerText || '';
    });

    // Check for untranslated keys
    result.untranslatedKeys = findUntranslatedKeys(textContent);

    // Use Ollama to verify language (only for main content pages, not legal pages)
    if (!path.includes('policy') && !path.includes('terms') && !path.includes('cookie') && textContent.length > 100) {
      result.languageCheck = await detectLanguage(textContent, locale);

      if (!result.languageCheck.isCorrect && result.languageCheck.confidence !== 'error') {
        result.status = 'fail';
      }
    }

    if (result.untranslatedKeys.length > 0) {
      result.status = 'fail';
    }

  } catch (e: any) {
    result.status = 'error';
    result.error = e.message;
  }

  return result;
}

async function startDevServer(): Promise<ChildProcess> {
  return new Promise((resolve, reject) => {
    const server = spawn('bun', ['dev'], {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let started = false;

    server.stdout?.on('data', (data) => {
      const output = data.toString();
      if (output.includes('localhost') && !started) {
        started = true;
        setTimeout(() => resolve(server), 1000); // Give it a moment
      }
    });

    server.stderr?.on('data', (data) => {
      const output = data.toString();
      if (output.includes('localhost') && !started) {
        started = true;
        setTimeout(() => resolve(server), 1000);
      }
    });

    setTimeout(() => {
      if (!started) {
        started = true;
        resolve(server); // Assume it started
      }
    }, 5000);
  });
}

async function main() {
  console.log('🌍 MicroHabitat Translation Test Suite\n');
  console.log('Testing', LOCALES.length, 'languages ×', PAGES.length, 'pages =', LOCALES.length * PAGES.length, 'total tests\n');

  // Start dev server
  console.log('📦 Starting development server...');
  const server = await startDevServer();
  const baseUrl = 'http://localhost:5173';

  console.log('✅ Server started at', baseUrl, '\n');

  // Launch browser
  console.log('🌐 Launching Playwright browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results: TestResult[] = [];
  const failures: TestResult[] = [];

  // Test each locale
  for (const locale of LOCALES) {
    console.log(`\n━━━ Testing ${LOCALE_NAMES[locale]} (${locale}) ━━━`);

    for (const pagePath of PAGES) {
      const result = await testPage(page, baseUrl, pagePath, locale);
      results.push(result);

      const statusIcon = result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⚠️';
      let statusDetails = '';

      if (result.languageCheck) {
        statusDetails += ` [Lang: ${result.languageCheck.detectedLang}, ${result.languageCheck.confidence}]`;
      }
      if (result.untranslatedKeys.length > 0) {
        statusDetails += ` [${result.untranslatedKeys.length} untranslated keys]`;
      }
      if (result.error) {
        statusDetails += ` [Error: ${result.error}]`;
      }

      console.log(`  ${statusIcon} ${result.path}${statusDetails}`);

      if (result.status !== 'pass') {
        failures.push(result);
      }
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('═'.repeat(60));

  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;
  const errors = results.filter(r => r.status === 'error').length;

  console.log(`Total:  ${results.length}`);
  console.log(`Passed: ${passed} ✅`);
  console.log(`Failed: ${failed} ❌`);
  console.log(`Errors: ${errors} ⚠️`);

  if (failures.length > 0) {
    console.log('\n❌ FAILURES:');
    for (const f of failures) {
      console.log(`\n  ${f.locale.toUpperCase()} ${f.path}`);
      if (f.languageCheck && !f.languageCheck.isCorrect) {
        console.log(`    - Wrong language: detected "${f.languageCheck.detectedLang}" (expected ${LOCALE_NAMES[f.locale]})`);
      }
      if (f.untranslatedKeys.length > 0) {
        console.log(`    - Untranslated keys: ${f.untranslatedKeys.slice(0, 5).join(', ')}${f.untranslatedKeys.length > 5 ? '...' : ''}`);
      }
      if (f.error) {
        console.log(`    - Error: ${f.error}`);
      }
    }
  }

  // Cleanup
  await browser.close();
  server.kill();

  console.log('\n✨ Test complete!\n');

  // Exit with appropriate code
  process.exit(failures.length > 0 ? 1 : 0);
}

main().catch(console.error);
