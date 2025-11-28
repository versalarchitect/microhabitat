# MicroHabitat Website

MicroHabitat corporate website built with Vite, React, and Tailwind CSS. Follows the same minimal, typography-first design system as MyUrbanFarm.

## Tech Stack

- **Build Tool**: Vite 7 with Bun
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 3 with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: TanStack Query (React Query)
- **CMS**: Strapi (optional, with fallback data)
- **Icons**: Lucide React

## Commands

```bash
bun install        # Install dependencies
bun dev            # Start development server
bun build          # Production build
bun preview        # Preview production build
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
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── sheet.tsx
│   │   └── BookDemoModal.tsx
│   ├── lib/
│   │   ├── strapi.ts      # CMS client with fallback data
│   │   └── utils.ts       # cn() utility
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css          # Design system
├── .env.example
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

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

The site can optionally connect to a Strapi CMS for content management.

### Configuration

Create `.env` with your Strapi credentials:

```env
VITE_STRAPI_URL=https://cms.microhabitat.com
VITE_STRAPI_TOKEN=your-api-token
```

### Fallback Data

If no Strapi URL is configured or the API fails, the site uses fallback data defined in `src/lib/strapi.ts`. This ensures the site always works, even without a CMS.

### Content Types

The Strapi schema should include:

- `hero` - Hero section content
- `stats` - Impact statistics
- `services` - Service offerings
- `testimonials` - Client testimonials
- `partners` - Partner logos
- `cities` - City coverage
- `navigation` - Nav links
- `footer` - Footer sections

## Deployment

### Vercel

```bash
vercel deploy
```

### Netlify

```bash
netlify deploy --prod
```

### Static Hosting

```bash
bun build
# Upload dist/ folder to your CDN
```

## Development Guidelines

1. **Follow the design system** - Use the established typography and color utilities
2. **Keep components minimal** - Border-based cards, no shadows
3. **Use React Query** - For data fetching with automatic caching
4. **Prefer fallback data** - Ensure site works without CMS
5. **Responsive first** - Mobile-first approach with Tailwind breakpoints

## Related Projects

- **MyUrbanFarm** (`../myurbanfarm`) - Internal platform sharing the same design system
