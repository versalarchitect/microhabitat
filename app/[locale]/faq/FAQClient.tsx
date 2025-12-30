"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { type Locale, getLocalePath } from "@/lib/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQClientProps {
  locale: Locale;
  translations: Record<string, string>;
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

const faqData = {
  "General Urban Farming Queries": [
    {
      question: "Why would someone integrate urban farming?",
      answer: "Integrating urban farming brings a range of social and environmental advantages, making it an appealing choice for communities looking to live healthier, more sustainable, and connected lives in urban areas. Benefits include fresh produce access, educational opportunities, community engagement, biodiversity support, and contribution to green building certifications.",
    },
    {
      question: "What is the first step to define if my building can welcome a program?",
      answer: "The first step to determine if your building can host a MicroHabitat program is to conduct a free site evaluation done by our team during a virtual meeting. This assessment would include evaluating the available space, sunlight exposure, water access, and structural integrity of your property.",
    },
    {
      question: "How do I know if my building is suitable for an urban farming project?",
      answer: "Requirements include at least 200 sq ft (20m2) of space, adequate sunlight (minimum 6 hours daily), accessible water sources, and safe roof access if applicable. Our team can assess your specific situation during a free consultation.",
    },
    {
      question: "Can I get points for my building from green building certifications?",
      answer: "Yes! Our programs support LEED, BOMA, BOMA BEST, GRESB, Fitwel, and WELL certifications. The specific credits depend on the project scale and scope.",
    },
    {
      question: "Do you offer indoor production solutions?",
      answer: "Yes, MicroHabitat offers an indoor unit which produces year-long growth through our turn-key solution. These are perfect for lobbies, cafeterias, and dedicated growing spaces.",
    },
  ],
  "About Us": [
    {
      question: "Why was MicroHabitat created?",
      answer: "MicroHabitat was founded to address urban food insecurity by transforming underutilized city spaces into productive ecological gardens, promoting sustainability and community connection to food sources.",
    },
    {
      question: "What is the history of MicroHabitat?",
      answer: "Established in Montreal in 2016, MicroHabitat has grown to become the largest network of urban farms in North America, now operating across multiple cities in Canada, the USA, and Europe.",
    },
    {
      question: "Where is MicroHabitat implemented?",
      answer: "Our projects operate across North America and Europe on rooftops, terraces, and ground spaces of businesses, schools, and organizations in over 20 major cities.",
    },
    {
      question: "Is MicroHabitat a franchise?",
      answer: "No, MicroHabitat is a single company with dedicated full-time employees and offices across multiple regions. We maintain consistent quality and service across all our locations.",
    },
  ],
  "Technical": [
    {
      question: "Does the installation modify my building or space?",
      answer: "No permanent changes occur. Our grow pots are designed with your property in mind - there's no drilling or digging required. Everything can be removed without leaving a trace.",
    },
    {
      question: "How much space do I need to get an urban farm?",
      answer: "A minimum of 200 sq ft (20m2) of accessible space is required for an outdoor farm. Indoor solutions can work with smaller spaces.",
    },
    {
      question: "What are the requirements to have an urban farm?",
      answer: "You need adequate space (minimum 200 sq ft) plus a minimum of 6 hours of sunlight daily for outdoor farms. Indoor farms have more flexible requirements.",
    },
    {
      question: "Is it safe to add a farm to a roof location?",
      answer: "Our ultra-light grow pots typically don't compromise roof load capacity. We always recommend consulting your building engineer, and we report universal approval from engineers we've worked with.",
    },
    {
      question: "What insurance coverage do you offer?",
      answer: "Our programs include liability coverage of 5 million dollars for commercial, automobile and excess liability, giving you complete peace of mind.",
    },
  ],
  "Products and Services": [
    {
      question: "How does the program work?",
      answer: "Our turn-key programs include installation, ecological irrigation systems, planting, weekly maintenance visits, harvesting and delivery, educational activities, and marketing tools. Outdoor farms work almost anywhere outdoors; indoor units work almost anywhere indoors.",
    },
    {
      question: "What is included in the program?",
      answer: "Our comprehensive package includes: installation, ecological irrigation system, seasonal planting, weekly maintenance visits, harvesting and drop-off, educational activities, marketing tools, and corporate gifts (depending on your selected package).",
    },
    {
      question: "What happens with the fresh produce?",
      answer: "You choose! Options include internal distribution to building occupants or employees, or donation to local food banks through our Urban Solidarity Farms program which runs from July to October.",
    },
  ],
  "Engagement": [
    {
      question: "How is the MicroHabitat program engaging with occupants?",
      answer: "Our programs include a minimum of two educational activities covering ecological farming practices, seed saving, composting, and related sustainability topics.",
    },
    {
      question: "Do you have different types of activities?",
      answer: "Yes! We offer interactive kiosks, guided garden visits, and educational workshops. Activities can be customized to your organization's needs and interests.",
    },
    {
      question: "Do you offer online activities?",
      answer: "Yes, our virtual workshops cover ecological farming, maintenance best practices, winterization, seed saving, crop succession planning, and pollinator support.",
    },
    {
      question: "Do you offer activities for all age groups?",
      answer: "Absolutely! All our educational activities are designed to be stimulating for individuals of all ages, from children to seniors.",
    },
  ],
  "Collaboration": [
    {
      question: "Can we partner with MicroHabitat?",
      answer: "Yes! We welcome partnerships with commercial real estate companies, corporations, schools, food banks, and community organizations. Contact us to discuss collaboration opportunities.",
    },
    {
      question: "Do you work with food banks?",
      answer: "Yes, our Urban Solidarity Farms program connects our partner properties with local food banks to donate fresh produce and support food security in communities.",
    },
  ],
  "Getting Started": [
    {
      question: "How do I get started with MicroHabitat?",
      answer: "Simply book a demo through our website or contact us directly. We'll schedule a free consultation to discuss your goals and assess your property's potential.",
    },
    {
      question: "What is the timeline for installation?",
      answer: "After signing, installation typically occurs within 4-6 weeks, depending on the season and project scope. We coordinate with your schedule to minimize disruption.",
    },
  ],
  "Safety": [
    {
      question: "Do building occupants need to access the installation?",
      answer: "Access is not required for our maintenance team to do their work. However, accessibility may be desired for tenant engagement or to qualify for certain green building certification credits.",
    },
    {
      question: "How do you create safe farming spaces on roofs without guardrails?",
      answer: "We create minimum safety clearance per local guidelines and contain all gardens within a localized perimeter away from roof edges. Safety is always our top priority.",
    },
    {
      question: "Can I have an urban farm if wild animals are present?",
      answer: "Yes! Our large textile pots prevent most animal interference. For areas with deer, we recommend additional fencing solutions which we can help implement.",
    },
  ],
};

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

export function FAQClient({ locale, translations }: FAQClientProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  const categories = Object.keys(faqData);

  // Flatten all FAQs for structured data
  const allFaqs = Object.values(faqData).flat();
  const faqSchema = generateFAQSchema(allFaqs);

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
                  {faqData[category as keyof typeof faqData].map((faq, index) => (
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
