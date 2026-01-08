import type { GlobalConfig } from 'payload';
import { seoFields } from '../fields/seo';

// Generic page global for pages that only need SEO management
// Used for: Educational Activities, Community Engagement, Commercial Real Estate,
// Corporations, Schools, Partnerships, Privacy Policy, Terms of Service, Cookie Policy, etc.

const createGenericPageGlobal = (
  slug: string,
  label: string,
  description: string
): GlobalConfig => ({
  slug,
  label,
  admin: {
    description,
  },
  fields: [...seoFields],
});

export const EducationalActivitiesPage = createGenericPageGlobal(
  'educational-activities-page',
  'Educational Activities Page',
  'SEO settings for the Educational Activities page'
);

export const CommunityEngagementPage = createGenericPageGlobal(
  'community-engagement-page',
  'Community Engagement Page',
  'SEO settings for the Community Engagement page'
);

export const CommercialRealEstatePage = createGenericPageGlobal(
  'commercial-real-estate-page',
  'Commercial Real Estate Page',
  'SEO settings for the Commercial Real Estate page'
);

export const CorporationsPage = createGenericPageGlobal(
  'corporations-page',
  'Corporations Page',
  'SEO settings for the Corporations page'
);

export const SchoolsPage = createGenericPageGlobal(
  'schools-page',
  'Schools Page',
  'SEO settings for the Schools page'
);

export const PartnershipsPage = createGenericPageGlobal(
  'partnerships-page',
  'Partnerships Page',
  'SEO settings for the Partnerships page'
);

export const CitiesPage = createGenericPageGlobal(
  'cities-page',
  'Cities Page',
  'SEO settings for the Cities listing page'
);

export const BlogPage = createGenericPageGlobal(
  'blog-page',
  'Blog Page',
  'SEO settings for the Blog listing page'
);

export const PrivacyPolicyPage = createGenericPageGlobal(
  'privacy-policy-page',
  'Privacy Policy Page',
  'SEO settings for the Privacy Policy page'
);

export const TermsOfServicePage = createGenericPageGlobal(
  'terms-of-service-page',
  'Terms of Service Page',
  'SEO settings for the Terms of Service page'
);

export const CookiePolicyPage = createGenericPageGlobal(
  'cookie-policy-page',
  'Cookie Policy Page',
  'SEO settings for the Cookie Policy page'
);

export const ROICalculatorPage = createGenericPageGlobal(
  'roi-calculator-page',
  'ROI Calculator Page',
  'SEO settings for the ROI Calculator page'
);
