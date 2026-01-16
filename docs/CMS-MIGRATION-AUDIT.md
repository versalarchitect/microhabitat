# CMS Migration Audit - Hardcoded Content

> **Status:** TOP PRIORITY
> **Last Updated:** January 2025
> **Goal:** All content must come from Payload CMS. Zero hardcoded content.

---

## Executive Summary

A comprehensive audit revealed **significant hardcoded content** throughout the codebase that must be migrated to Payload CMS. This document tracks all issues and their resolution status.

---

## Critical Issues (Must Fix First)

### 1. Blog Posts - 100% Hardcoded
- **File:** `lib/blog-data.ts`
- **Issue:** 23 complete blog posts with full HTML content hardcoded in TypeScript
- **Impact:** Cannot update blog without code deployment
- **Solution:** Delete file, ensure all posts exist in Payload `BlogPosts` collection
- **Status:** [x] DONE
  - Types extracted to `lib/data/blog-fallback-data.ts`
  - `payload-client.ts` updated with full fallback support
  - Seed script with HTML→Lexical conversion: `scripts/seed-cms-data.ts --blog-only`
  - Blog pages use CMS first, fallback to hardcoded data
  - **Next step:** Run seed script, verify posts in CMS, optionally delete fallback data

### 2. City Detail Data - 20 Cities Hardcoded
- **File:** `app/(frontend)/[locale]/cities/[slug]/CityDetailClient.tsx` (lines 17-264)
- **Issue:** Complete city database with names, descriptions, and 4 highlights per city
- **Impact:** Cannot update city info without code changes
- **Solution:** Extend Payload `Cities` collection:
  - Add `description` (rich text, localized)
  - Add `highlights` (array of strings, localized)
- **Status:** [x] DONE
  - Schema updated in `payload/collections/Cities.ts`
  - Fallback data created in `lib/data/city-fallback-data.ts`
  - CityDetailClient refactored as pure presentational component
  - page.tsx fetches from CMS with fallback support
  - Seed script created: `scripts/seed-cms-data.ts`
  - **Next step:** Run database migration, then run seed script

### 3. AI Chatbot Knowledge Base - 70+ Items Hardcoded
- **Files:**
  - `lib/chat/knowledge-base.ts` - 15 sections of company knowledge
  - `lib/chat/responses.ts` - 9 curated responses + office addresses
  - `lib/chat/smart-chatbot.ts` - 28 knowledge sections
  - `lib/chat/smart-retrieval.ts` - 13 knowledge area mappings
- **Issue:** All chatbot knowledge is hardcoded including:
  - Company info, services, certifications
  - Case studies with client names and metrics
  - Office addresses (Montreal, Toronto, NY, Paris)
  - Contact emails, phone numbers
  - 14 FAQ pairs
- **Impact:** Cannot update chatbot knowledge without code changes
- **Solution:** Either:
  - Option A: Create `ChatKnowledge` collection in Payload
  - Option B: Have chatbot fetch from existing CMS collections dynamically
- **Status:** [ ] Not Started

---

## High Priority Issues

### 4. Partner/Food Bank Logo Arrays
- **File:** `app/(frontend)/[locale]/about/AboutClient.tsx` (lines 18-49)
- **Issue:** 25+ hardcoded Squarespace CDN URLs for logos
- **Solution:** Use existing Payload `Partners` collection, add `category` field (partner/foodbank)
- **Status:** [ ] Not Started

### 5. Gallery Images (Multiple Pages)
| File | Lines | Images | Status |
|------|-------|--------|--------|
| `AboutClient.tsx` | 70, 96-129 | 4 images | [ ] |
| `OutdoorFarmClient.tsx` | 24-35 | 7 images | [ ] |
| `IndoorFarmClient.tsx` | 56-61 | 4 images | [ ] |
| `EducationalActivitiesClient.tsx` | 71-76 | 4 images | [ ] |
| `CommercialRealEstateClient.tsx` | 46-51 | 4 images | [ ] |

- **Solution:** Add `galleryImages` (media array) field to each page global in Payload
- **Status:** [ ] Not Started

### 6. Impact Stats (Duplicated)
- **Files:**
  - `AboutClient.tsx` (lines 190-208): "250+", "35+", "40k", "13k", "59.4k"
  - `PartnershipsClient.tsx` (lines 163-175): "250+", "35+", "40k", "20"
- **Solution:** Either use existing `Stats` collection or add stats fields to page globals
- **Status:** [ ] Not Started

### 7. Social Media Links
- **File:** `components/layout/Footer.tsx` (lines 82-100)
- **Issue:** Hardcoded LinkedIn, Instagram, Facebook URLs
- **Solution:** Create `SocialLinks` global in Payload
- **Status:** [ ] Not Started

### 8. JSON-LD Structured Data
- **File:** `components/JsonLd.tsx` (lines 231-355)
- **Issue:** Hardcoded company info:
  - Company description, founding date
  - Founder names (Orlane, Alexandre)
  - Office addresses with coordinates
  - Social media URLs
- **Solution:** Create `Organization` global in Payload
- **Status:** [ ] Not Started

---

## Medium Priority Issues

### 9. Certifications Array
- **File:** `IndoorFarmClient.tsx` (lines 48-54)
- **Content:** `["LEED", "WELL", "Fitwel", "BOMA BEST", "GRESB"]`
- **Solution:** Add `certifications` field to `IndoorFarmPage` global
- **Status:** [ ] Not Started

### 10. Partner Company Names
- **File:** `PartnershipsClient.tsx` (lines 21-34)
- **Content:** "BNP Paribas", "Cadillac Fairview", etc.
- **Solution:** Use existing `Partners` collection
- **Status:** [ ] Not Started

### 11. Office Locations
- **File:** `CareersClient.tsx` (lines 25-30)
- **Content:** 4 offices (Montreal HQ, Toronto, New York, Paris)
- **Solution:** Create `Offices` collection in Payload
- **Status:** [ ] Not Started

### 12. Contact Information
| File | Line | Content |
|------|------|---------|
| `ContactClient.tsx` | 77-78 | Phone: "+1 (514) 123-4567" |
| `ChatWidget.tsx` | 96 | Email: "info@microhabitat.com" |
| `JobListings.tsx` | 114 | Email: "careers@microhabitat.com" |
| `JobListings.tsx` | 136 | URL: "https://microhabitat.breezy.hr/" |

- **Solution:** Create `ContactInfo` global in Payload
- **Status:** [ ] Not Started

### 13. Hero Region Label
- **File:** `components/sections/Hero.tsx` (line 22)
- **Content:** `"North America · Europe"`
- **Solution:** Add `regionLabel` field to `Hero` global
- **Status:** [ ] Not Started

### 14. Cities Filter Labels
- **File:** `components/sections/Cities.tsx` (lines 28-30)
- **Content:** "All", "North America", "Europe"
- **Solution:** Add filter labels to `CitiesSection` global or use translations
- **Status:** [ ] Not Started

---

## Required Payload CMS Schema Changes

### New Collections
```
Offices
├── name (string, required)
├── city (string, required)
├── country (string, required)
├── region (enum: north-america, europe)
├── type (enum: headquarters, regional, satellite)
├── address (text)
├── latitude (number)
├── longitude (number)
└── localized: true

ChatKnowledge (optional - for chatbot)
├── section (string, required)
├── content (rich text)
├── keywords (array of strings)
└── localized: true
```

### New Globals
```
SocialLinks
├── linkedin (string, URL)
├── instagram (string, URL)
├── facebook (string, URL)
├── twitter (string, URL)
└── localized: false

ContactInfo
├── email (string, email)
├── phone (string)
├── careersEmail (string, email)
├── jobBoardUrl (string, URL)
└── localized: false

Organization
├── description (text)
├── foundingDate (string)
├── founders (array)
│   ├── name (string)
│   └── role (string)
└── localized: true
```

### Updated Globals (Add Fields)
```
Hero
└── + regionLabel (string, localized)

CitiesSection
└── + filterLabels (array: { label, value })

AboutPage
├── + galleryImages (media array)
├── + foodBankLogos (relation to Partners)
└── + impactStats (component)

OutdoorFarmPage
└── + galleryImages (media array)

IndoorFarmPage
├── + galleryImages (media array)
└── + certifications (array of strings)

CommercialRealEstatePage
└── + galleryImages (media array)

EducationalActivitiesPage
└── + galleryImages (media array)

Cities (collection)
├── + description (rich text, localized)
└── + highlights (array of strings, localized)
```

---

## How to Run Migration

### Step 1: Database Migration
After updating the Payload schema, run the migration:
```bash
# The schema will auto-migrate on next Payload startup
bun dev  # or bun run payload migrate:create
```

### Step 2: Seed Data
Run the seed script to populate CMS with hardcoded data:
```bash
# Preview what will be created (no changes made)
bun run scripts/seed-cms-data.ts --dry-run

# Migrate cities only
bun run scripts/seed-cms-data.ts --cities-only

# Migrate blog posts only
bun run scripts/seed-cms-data.ts --blog-only

# Migrate everything
bun run scripts/seed-cms-data.ts
```

### Step 3: Verify & Cleanup
1. Check CMS admin panel to verify data
2. Test city detail pages and blog pages
3. Delete `lib/blog-data.ts` after verifying blog migration

---

## Migration Checklist

### Phase 1: Critical
- [x] Create schema changes in Payload (Cities collection)
- [~] Migrate blog posts to CMS (seed script ready)
- [x] Add city descriptions and highlights to CMS (seed script ready)
- [x] Update components to fetch from CMS (with fallback)

### Phase 2: High Priority (Week 2)
- [ ] Create SocialLinks global
- [ ] Create ContactInfo global
- [ ] Create Organization global
- [ ] Add gallery images to page globals
- [ ] Migrate partner logos

### Phase 3: Medium Priority (Week 3)
- [ ] Create Offices collection
- [ ] Add certifications to IndoorFarmPage
- [ ] Add filter labels to CitiesSection
- [ ] Update Hero with regionLabel

### Phase 4: Cleanup (Week 4)
- [ ] Delete `lib/blog-data.ts`
- [ ] Remove hardcoded arrays from components
- [ ] Consolidate fallback data (strapi.ts vs payload-client.ts)
- [ ] Update chatbot to use CMS data
- [ ] Final audit to verify zero hardcoded content

---

## Notes

- **Translations files** (`lib/translations/*.ts`) are acceptable for UI strings
- **Fallback data** in `payload-client.ts` is acceptable as CMS backup
- The goal is: **all CONTENT from CMS, all UI LABELS from translations**
