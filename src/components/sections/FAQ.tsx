import { useState, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FilterButtonGroup, type FilterOption } from "../ui/filter-button-group";
import type { FAQItem } from "../../lib/strapi";

interface FAQProps {
  faq: FAQItem[];
  onBookDemo: () => void;
}

export function FAQ({ faq, onBookDemo }: FAQProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories from the FAQ data
  const filterOptions: FilterOption[] = useMemo(() => {
    const uniqueCategories = Array.from(new Set(faq.map((item) => item.category)));
    return [
      { label: "All", value: "All" },
      ...uniqueCategories.map((cat) => ({ label: cat, value: cat })),
    ];
  }, [faq]);

  const filteredFAQs =
    activeCategory === "All"
      ? faq
      : faq.filter((item) => item.category === activeCategory);

  return (
    <>
      <div className="divider" />

      <section id="faq" className="section scroll-mt-nav">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* Section header */}
          <div className="mb-12">
            <p className="label mb-4">FAQ</p>
            <h2 className="heading-section text-foreground">
              Frequently asked{" "}
              <span className="text-primary">questions</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Everything you need to know about urban farming with MicroHabitat.
            </p>
          </div>

          {/* Category filter */}
          <FilterButtonGroup
            options={filterOptions}
            activeValue={activeCategory}
            onChange={setActiveCategory}
            className="mb-8"
          />

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Bottom CTA */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help.
            </p>
            <button type="button" onClick={onBookDemo} className="btn-outline">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
