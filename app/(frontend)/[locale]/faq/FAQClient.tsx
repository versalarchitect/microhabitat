"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { type Locale, getLocalePath } from "@/lib/i18n";
import type { FAQItem } from "@/lib/strapi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQClientProps {
  locale: Locale;
  translations: Record<string, string>;
  faqItems: FAQItem[];
}

// Map category keys to translation keys
const categoryTranslationKeys: Record<string, string> = {
  "General Urban Farming Queries": "faqPage.categories.general",
  "About Us": "faqPage.categories.aboutUs",
  "Technical": "faqPage.categories.technical",
  "Products and Services": "faqPage.categories.productsServices",
  "Engagement": "faqPage.categories.engagement",
  "Collaboration": "faqPage.categories.collaboration",
  "Getting Started": "faqPage.categories.gettingStarted",
  "Safety": "faqPage.categories.safety",
};

// Define category order for consistent display
const categoryOrder = [
  "General Urban Farming Queries",
  "About Us",
  "Technical",
  "Products and Services",
  "Engagement",
  "Collaboration",
  "Getting Started",
  "Safety",
];

// Generate FAQ Schema for structured data
function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function FAQClient({ locale, translations, faqItems }: FAQClientProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  // Group FAQ items by category from CMS data
  const faqByCategory = useMemo(() => {
    const grouped: Record<string, FAQItem[]> = {};
    for (const item of faqItems) {
      const category = item.category || 'General Urban Farming Queries';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    }
    return grouped;
  }, [faqItems]);

  // Get categories in the correct order
  const categories = categoryOrder.filter((cat) => faqByCategory[cat]?.length > 0);

  // Flatten all FAQs for structured data
  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      {/* FAQ Structured Data */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="label mb-6">{t('faqPage.label')}</p>
          <h1 className="heading-display mb-8">
            <span className="text-primary">{t('faqPage.title')}</span>
          </h1>
          <p className="text-body max-w-3xl mb-10">
            {t('faqPage.description')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setShowDemoModal(true)}>
              {t('common.bookDemo')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link href={localePath('/contact')} className="btn-outline">
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* FAQ Categories */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="heading-section mb-6">{t(categoryTranslationKeys[category] || category)}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqByCategory[category]?.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category}-${index}`}
                      className="card-minimal px-6"
                    >
                      <AccordionTrigger className="text-left py-4 hover:no-underline">
                        <span className="font-medium pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Still Have Questions */}
      <section className="section bg-muted/30">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <h2 className="heading-section mb-6">
            {t('faqPage.stillQuestions.title')}
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            {t('faqPage.stillQuestions.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => setShowDemoModal(true)}>
              {t('common.bookDemo')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link href={localePath('/contact')} className="btn-outline">
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
      </section>

      <BookDemoModal open={showDemoModal} onOpenChange={setShowDemoModal} locale={locale} />
    </>
  );
}
