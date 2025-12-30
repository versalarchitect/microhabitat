# MicroHabitat Website

MicroHabitat corporate website built with Vite, React, and Tailwind CSS. Follows the same minimal, typography-first design system as MyUrbanFarm.

## Tech Stack

- **Build Tool**: Vite 7 with Bun
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 3 with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: TanStack Query (React Query)
- **CMS**: Strapi 5 with i18n (multilingual: EN, FR, DE, NL, IT, ES)
- **Icons**: Lucide React

## Commands

```bash
# Frontend
bun install        # Install dependencies
bun dev            # Start development server
bun build          # Production build
bun preview        # Preview production build

# CMS (from ./cms directory)
cd cms
bun install        # Install CMS dependencies
npm run develop    # Start Strapi in development mode
npm run build      # Build Strapi for production
npm run start      # Start Strapi in production mode
```

## Project Structure

```
microhabitat/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Impact.tsx
│   │   │   ├── Partners.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Cities.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── CTA.tsx
│   │   ├── ui/
│   │   │   └── ... (shadcn components)
│   │   ├── BookDemoModal.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── SEO.tsx            # SEO meta tags component
│   ├── lib/
│   │   ├── strapi.ts         # CMS client with fallback data
│   │   ├── locale-context.tsx # i18n context provider
│   │   ├── translations/     # i18n translations (split by locale)
│   │   │   ├── index.ts      # Combines all locales + slug mappings
│   │   │   ├── en.ts         # English (source of truth)
│   │   │   ├── fr.ts         # French
│   │   │   ├── de.ts         # German
│   │   │   ├── nl.ts         # Dutch
│   │   │   ├── it.ts         # Italian
│   │   │   └── es.ts         # Spanish
│   │   └── utils.ts          # cn() utility
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── OutdoorFarm.tsx
│   │   ├── IndoorFarm.tsx
│   │   ├── EducationalActivities.tsx
│   │   ├── CommercialRealEstate.tsx
│   │   ├── Corporations.tsx
│   │   ├── Schools.tsx
│   │   ├── Careers.tsx
│   │   ├── Partnerships.tsx
│   │   ├── CommunityEngagement.tsx
│   │   ├── Contact.tsx
│   │   ├── FAQPage.tsx
│   │   ├── Blog.tsx
│   │   ├── CitiesPage.tsx
│   │   ├── CityDetail.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── TermsOfService.tsx
│   │   └── CookiePolicy.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── cms/                      # Strapi CMS
│   ├── config/
│   │   ├── plugins.ts        # i18n configuration
│   │   ├── database.ts
│   │   └── middlewares.ts
│   ├── src/
│   │   ├── api/              # Content types
│   │   │   ├── hero/         # Home page (with SEO)
│   │   │   ├── stat/
│   │   │   ├── service/
│   │   │   ├── testimonial/
│   │   │   ├── partner/
│   │   │   ├── city/         # City pages (with SEO)
│   │   │   ├── faq/
│   │   │   ├── about-page/   # Page SEO singleTypes
│   │   │   ├── careers-page/
│   │   │   ├── contact-page/
│   │   │   └── ... (17 page singleTypes for SEO)
│   │   ├── components/
│   │   │   └── shared/
│   │   │       └── seo.json  # Reusable SEO component
│   │   └── index.ts
│   └── scripts/
│       └── data/             # Seed data
│           ├── en/           # English content
│           └── fr/           # French content
└── .env
```

## Pages

The website includes 19 pages, all with CMS-managed SEO across 6 languages:

### Main Pages
- **Home** (`/`) - Landing page with Hero, Services, Impact, Testimonials, Cities, FAQ, CTA
- **About** (`/about`) - Company information and mission
- **Outdoor Farm** (`/outdoor-farm`) - Outdoor farming services
- **Indoor Farm** (`/indoor-farm`) - Indoor/vertical farming solutions
- **Educational Activities** (`/educational-activities`) - Workshops and learning programs
- **Community Engagement** (`/community-engagement`) - Community programs and food bank partnerships

### Client Pages
- **Commercial Real Estate** (`/commercial-real-estate`) - Solutions for property managers
- **Corporations** (`/corporations`) - Corporate sustainability programs
- **Schools** (`/schools`) - Educational institution partnerships

### Company Pages
- **Careers** (`/careers`) - Job opportunities
- **Partnerships** (`/partnerships`) - Partnership programs
- **Contact** (`/contact`) - Contact form and information

### Content Pages
- **Cities** (`/cities`) - All city locations
- **City Detail** (`/cities/:slug`) - Individual city pages
- **FAQ** (`/faq`) - Frequently asked questions
- **Blog** (`/blog`) - News and articles

### Legal Pages (noIndex)
- **Privacy Policy** (`/privacy`)
- **Terms of Service** (`/terms`)
- **Cookie Policy** (`/cookies`)

### URL Structure (i18n)
- English (default): `/`, `/about`, `/contact`, etc.
- French: `/fr`, `/fr/a-propos`, `/fr/contact`, etc.
- All 6 locales have localized URL slugs

## Multilingual Support (i18n)

The site supports 6 languages with URL-based locale routing:
- **English (en)** - Default, no prefix (`/`, `/about`)
- **French (fr)** - `/fr`, `/fr/a-propos`
- **German (de)** - `/de`, `/de/ueber-uns`
- **Dutch (nl)** - `/nl`, `/nl/over-ons`
- **Italian (it)** - `/it`, `/it/chi-siamo`
- **Spanish (es)** - `/es`, `/es/sobre-nosotros`

### Frontend Implementation
- `LocaleProvider` in `src/lib/locale-context.tsx` manages locale state
- `LanguageSwitcher` component for language selection in navbar
- `useLocale()` hook for accessing current locale and translations
- `t()` function for UI text translations
- Translations split into per-locale files in `src/lib/translations/`
- URL slugs are localized (e.g., `/about` → `/fr/a-propos`)
- React Query keys include locale for proper caching

### Adding Translations
1. English (`en.ts`) is the source of truth - add new keys there first
2. Copy new keys to all other locale files
3. Translate the values in each locale file

### CMS Content
All content types in Strapi have `i18n.localized: true` and content exists in all supported locales.

## Design System

The design follows a **minimal, typography-first** approach matching MyUrbanFarm:

### Colors (CSS Variables)

```css
/* Background - Warm off-white */
--background: 45 20% 97%;

/* Text - Warm dark tones */
--foreground: 30 10% 18%;
--muted-foreground: 30 8% 45%;

/* Primary - Sage green (MicroHabitat brand) */
--primary: 145 35% 38%;

/* Borders - Subtle warm gray */
--border: 40 10% 85%;
```

### Typography Utilities

```css
/* Label - Monospace uppercase for categories */
.label {
  @apply font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground;
}

/* Large heading - Editorial style */
.heading-display {
  @apply text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95];
}

/* Section heading */
.heading-section {
  @apply text-3xl md:text-4xl lg:text-5xl font-medium;
}
```

### Component Patterns

**Cards** - Border only, no shadows:
```tsx
<div className="border border-border rounded-md bg-card p-6">
  {/* content */}
</div>
```

**Buttons**:
```tsx
// Primary - solid green
<Button>Book a Demo</Button>

// Outline - border style
<button className="btn-outline">Learn More</button>
```

**Sections**:
```tsx
<>
  <div className="divider" />
  <section className="section scroll-mt-nav">
    <div className="max-w-6xl mx-auto px-6 md:px-8">
      <p className="label mb-4">Section Label</p>
      <h2 className="heading-section">Title</h2>
    </div>
  </section>
</>
```

### What to Avoid

- Heavy shadows (`shadow-lg`, `shadow-xl`)
- Glassmorphism effects
- Gradients on cards/buttons
- Complex hover animations
- `rounded-2xl` or larger - use `rounded-md`

## Strapi CMS Integration

### Configuration

Create `.env` in root with Strapi credentials:

```env
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_TOKEN=your-api-token
```

### Starting the CMS

```bash
cd cms
npm run develop
```

Admin panel: http://localhost:1337/admin

### Content Types

| Type | Kind | Description |
|------|------|-------------|
| hero | singleType | Hero section (title, subtitle, CTAs) + SEO |
| stat | collectionType | Impact statistics |
| service | collectionType | Service offerings with features |
| testimonial | collectionType | Client testimonials |
| partner | collectionType | Partner logos |
| city | collectionType | City coverage + SEO |
| faq | collectionType | FAQ items by category |
| about-page | singleType | About page SEO |
| careers-page | singleType | Careers page SEO |
| ... | singleType | 17 page singleTypes for SEO management |

### SEO Component

All pages have CMS-managed SEO via a shared `shared.seo` component with fields:
- `metaTitle` (string, required, max 60 chars)
- `metaDescription` (text, required, max 160 chars)
- `keywords` (text)
- `ogImage` (media)
- `twitterImage` (media)
- `canonical` (string)
- `noIndex` (boolean)
- `noFollow` (boolean)

### Fallback Data

If Strapi is unavailable, the site uses fallback data in `src/lib/strapi.ts`. This includes:
- Default content for all sections
- SEO fallback data for all 19 pages × 6 languages (114 entries)

This ensures the site always works, even without a CMS connection.

## SEO Implementation

Each page fetches SEO from Strapi with React Query and falls back to default data:

```tsx
import { useQuery } from "@tanstack/react-query";
import { SEO } from "../components/SEO";
import { getPageSEO, queryKeys } from "../lib/strapi";
import { useLocale } from "../lib/locale-context";

export function About() {
  const { locale } = useLocale();

  const { data: seo } = useQuery({
    queryKey: queryKeys.pageSEO('about', locale),
    queryFn: () => getPageSEO('about', locale),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <SEO
        title={seo?.metaTitle || 'About | Microhabitat'}
        description={seo?.metaDescription || 'Default description'}
        canonical={seo?.canonical}
        ogImage={seo?.ogImage}
        twitterImage={seo?.twitterImage}
        keywords={seo?.keywords?.split(',').map(k => k.trim())}
        noIndex={seo?.noIndex}
        noFollow={seo?.noFollow}
      />
      {/* Page content */}
    </>
  );
}
```

### Adding SEO for a New Page

1. Create singleType in Strapi: `cms/src/api/{page-name}-page/`
2. Add SEO component to schema
3. Add page key to `PageSEOKey` type in `strapi.ts`
4. Add fallback data for all 6 locales in `FALLBACK_PAGE_SEO`
5. Use `getPageSEO()` in the page component

## Development Guidelines

1. **Follow the design system** - Use established typography and color utilities
2. **Keep components minimal** - Border-based cards, no shadows
3. **Use React Query** - For data fetching with automatic caching
4. **Prefer fallback data** - Ensure site works without CMS
5. **Responsive first** - Mobile-first approach with Tailwind breakpoints
6. **i18n everywhere** - All user-facing text must be translatable
7. **SEO on every page** - All pages must have CMS-managed SEO with fallbacks

## About MicroHabitat

MicroHabitat was founded in 2016 by **Orlane** and **Alexandre**, two childhood friends from Montreal. The company operates the largest network of urban farms in the world, transforming underused urban spaces into productive ecological farms across North America and Europe.

**Mission**: Reconnecting communities with nature and fresh, local food through regenerative agriculture and innovative design.

## Related Projects

- **MyUrbanFarm** (`../myurbanfarm`) - Internal platform sharing the same design system
- **Eric Immobilier CMS** - Reference Strapi implementation pattern
