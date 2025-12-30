# MicroHabitat Website

MicroHabitat corporate website built with Next.js and Tailwind CSS. Follows the same minimal, typography-first design system as MyUrbanFarm.

**Important**: This project works in tandem with **MyUrbanFarm** (`../myurbanfarm`). Features like the live chat system span both projects - the chat widget lives here, while the admin interface lives in MUF.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: Bun
- **Styling**: Tailwind CSS 3 with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **AI/Chat**: Transformers.js (Hugging Face) for RAG-based chatbot
- **Database**: Supabase (shared with MyUrbanFarm)
- **Email**: Resend API
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
├── app/                      # Next.js App Router
│   ├── [locale]/             # i18n dynamic route
│   │   ├── page.tsx          # Home page
│   │   ├── about/
│   │   ├── contact/
│   │   ├── careers/
│   │   └── ...               # All page routes
│   ├── api/
│   │   └── chat/             # Chat API endpoints
│   │       ├── start/route.ts
│   │       ├── message/route.ts
│   │       └── messages/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Impact.tsx
│   │   └── ...
│   ├── chat/
│   │   └── ChatPanel.tsx     # AI chatbot + live chat widget
│   ├── ui/                   # shadcn components
│   ├── BookDemoModal.tsx
│   └── LanguageSwitcher.tsx
├── lib/
│   ├── strapi.ts             # CMS client with fallback data
│   ├── i18n.ts               # i18n configuration
│   ├── chat/
│   │   ├── knowledge-base.ts # RAG knowledge base
│   │   ├── chatbot.ts        # Transformers.js implementation
│   │   ├── supabase.ts       # Chat database helpers
│   │   └── schema.sql        # Database migration
│   ├── translations/         # i18n translations
│   │   ├── en.ts, fr.ts, de.ts, nl.ts, it.ts, es.ts
│   │   └── index.ts
│   └── utils.ts
├── public/
│   ├── favicon.png
│   ├── robots.txt
│   └── sitemap.xml
├── cms/                      # Strapi CMS
│   ├── config/
│   ├── src/api/              # Content types
│   └── scripts/
├── src_vite_backup/          # Old Vite source (archived)
├── middleware.ts             # Next.js i18n middleware
├── next.config.ts
├── tailwind.config.js
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

### Structured Data (JSON-LD)

The site includes comprehensive schema.org structured data via `src/components/StructuredData.tsx`:

- **Organization Schema** - Company info, founders, locations, social links
- **WebSite Schema** - Site metadata with multi-language support
- **LocalBusiness Schema** - Individual office locations (Montreal, Toronto, NY, Paris)
- **FAQPage Schema** - Structured FAQ data for rich snippets
- **BreadcrumbList Schema** - Navigation breadcrumbs
- **Article Schema** - Blog post metadata (when applicable)

The `GlobalSEO` component in `App.tsx` automatically adds:
- Organization and WebSite schemas site-wide
- Hreflang tags for all 6 languages
- Preconnect hints for external resources

### Technical SEO Files

- **robots.txt** - `public/robots.txt` - Crawler instructions
- **sitemap.xml** - `public/sitemap.xml` - Auto-generated with 210 URLs
  - Generated on build via `bun run prebuild`
  - Includes all pages in all 6 languages with hreflang alternates
  - City detail pages for 20 cities

```bash
# Regenerate sitemap manually
bun run generate:sitemap
```

## AI Chatbot

The website includes an AI-powered chatbot using Transformers.js with RAG (Retrieval Augmented Generation).

### Architecture

- **Embedding Model**: `Xenova/all-MiniLM-L6-v2` - Converts questions to vectors
- **QA Model**: `Xenova/distilbert-base-cased-distilled-squad` - Answers questions
- **Knowledge Base**: `lib/chat/knowledge-base.ts` - Company info from documents

### How RAG Works

1. Knowledge base is chunked into ~500 token segments
2. User question is embedded into a vector
3. Most relevant chunks are found via cosine similarity
4. QA model answers using only relevant context
5. If confidence < 0.3, suggests contacting a representative

### Knowledge Base Sources

The knowledge base was built from:
- Employee Guide (company policies, culture)
- BOMA Guides (green building certifications)
- Green Building Certifications PDF
- MicroHabitat Pot specifications
- SEO Strategy document

### Updating the Knowledge Base

Edit `lib/chat/knowledge-base.ts` to add or modify content. The knowledge base is organized into sections:
- Company Overview
- Services (Outdoor, Indoor, Educational)
- Client Types (Corporations, Schools, Real Estate)
- Certifications (BOMA, LEED, WELL)
- FAQ
- Contact Info

## Development Guidelines

1. **Follow the design system** - Use established typography and color utilities
2. **Keep components minimal** - Border-based cards, no shadows
3. **Use React Query** - For data fetching with automatic caching
4. **Prefer fallback data** - Ensure site works without CMS
5. **Responsive first** - Mobile-first approach with Tailwind breakpoints
6. **i18n everywhere** - All user-facing text must be translatable
7. **SEO on every page** - All pages must have CMS-managed SEO with fallbacks
8. **Cross-project awareness** - Changes may need updates in MUF too

## About MicroHabitat

MicroHabitat was founded in 2016 by **Orlane** and **Alexandre**, two childhood friends from Montreal. The company operates the largest network of urban farms in the world, transforming underused urban spaces into productive ecological farms across North America and Europe.

**Mission**: Reconnecting communities with nature and fresh, local food through regenerative agriculture and innovative design.

## MyUrbanFarm Integration

This project is tightly integrated with **MyUrbanFarm** (`../myurbanfarm`). When working on cross-project features, you'll need to make changes in both repositories.

### Shared Supabase Database

Both projects connect to the same Supabase instance:
- **Project**: `cuzozmvjqkatxkzdkojj`
- **URL**: `https://cuzozmvjqkatxkzdkojj.supabase.co`

Environment variables in `.env`:
```env
MYURBANFARM_SUPABASE_URL=https://cuzozmvjqkatxkzdkojj.supabase.co
MYURBANFARM_SUPABASE_ANON_KEY=<anon-key>
MYURBANFARM_URL=https://www.myurbanfarm.ai
RESEND_API_KEY=<resend-key>
EMAIL_FROM=team@microhabitat.com
```

### Live Chat System

The chat system spans both projects:

**MicroHabitat (this repo)**:
- `components/chat/ChatPanel.tsx` - Chat widget with AI assistant + live chat
- `lib/chat/knowledge-base.ts` - RAG knowledge base from company documents
- `lib/chat/chatbot.ts` - Transformers.js RAG implementation
- `lib/chat/schema.sql` - Database schema for chat tables
- `app/api/chat/start/route.ts` - Creates chat session, sends email notification
- `app/api/chat/message/route.ts` - Visitor sends messages
- `app/api/chat/messages/route.ts` - Poll for new messages

**MyUrbanFarm**:
- `apps/web/app/[locale]/admin/website-chats/` - Chat list page
- `apps/web/app/[locale]/admin/website-chats/[id]/` - Chat detail with reply interface
- Staff can reply to visitors, close chats, convert to leads

### Chat Flow

1. Visitor uses AI chatbot on MicroHabitat website
2. Clicks "Contact a Representative" → fills form
3. Chat created in Supabase, email sent to Gabriel
4. Gabriel clicks email link → opens MUF admin `/admin/website-chats/[id]`
5. Gabriel replies → visitor sees response in real-time
6. Gabriel can convert chat to lead → appears in sales pipeline

### Database Tables

```sql
-- website_chats: Chat sessions
-- website_chat_messages: Messages in chats
-- Migration: lib/chat/schema.sql (run in MUF Supabase)
```

### Making Cross-Project Changes

When modifying shared features:
1. Update schema in `lib/chat/schema.sql` if needed
2. Run migration in Supabase dashboard
3. Update MicroHabitat API endpoints if needed
4. Update MUF admin pages if needed
5. Test the full flow end-to-end

## Related Projects

- **MyUrbanFarm** (`../myurbanfarm`) - Internal CRM/admin platform, shares Supabase database
- **Eric Immobilier CMS** - Reference Strapi implementation pattern
