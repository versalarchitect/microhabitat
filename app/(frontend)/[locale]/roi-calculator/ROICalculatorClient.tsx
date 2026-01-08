"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { type Locale, getLocalePath } from "@/lib/i18n";
import {
  CalculatorForm,
  ResultsPreview,
  FullResults,
  PaybackChart,
  ESGMetrics,
  LeadCaptureModal,
} from "@/components/roi-calculator";
import {
  type CalculatorInputs,
  type CalculatorResults,
  type LeadCaptureData,
  DEFAULT_INPUTS,
} from "@/lib/calculator/types";
import {
  calculateROI,
  validateInputs,
} from "@/lib/calculator/calculations";

interface ROICalculatorClientProps {
  locale: Locale;
  translations: Record<string, string>;
}

export function ROICalculatorClient({ locale, translations }: ROICalculatorClientProps) {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const [isLeadCaptureOpen, setIsLeadCaptureOpen] = useState(false);
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [_leadData, setLeadData] = useState<LeadCaptureData | null>(null);

  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  const handleCalculate = async () => {
    const validation = validateInputs(inputs);
    if (!validation.valid) {
      // In a real app, show validation errors
      console.error("Validation errors:", validation.errors);
      return;
    }

    setIsCalculating(true);
    // Simulate calculation delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const calculatedResults = calculateROI(inputs);
    setResults(calculatedResults);
    setIsCalculating(false);
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResults(null);
    setIsUnlocked(false);
    setLeadData(null);
  };

  const handleUnlock = () => {
    setIsLeadCaptureOpen(true);
  };

  const handleLeadSubmit = (data: LeadCaptureData) => {
    setLeadData(data);
    setIsUnlocked(true);
    setIsLeadCaptureOpen(false);
  };

  const fiveYearProjection = results?.fiveYearProjection ?? [];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label mb-6">{t("roiCalculator.label")}</p>
              <h1 className="heading-display mb-8">
                {t("roiCalculator.title")}{" "}
                <span className="text-primary">
                  {t("roiCalculator.titleHighlight")}
                </span>
              </h1>
              <p className="text-body max-w-3xl mb-10">
                {t("roiCalculator.description")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => setIsBookDemoOpen(true)}>
                  {t("common.bookDemo")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href={localePath("/commercial-real-estate")} className="btn-outline">
                  {t("common.learnMore")}
                </Link>
              </div>
            </div>
            <div className="aspect-video rounded-md overflow-hidden relative">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/68127a796aa8cb650bef6990/d7453f90-694b-48ed-af1f-5c16b806db70/Rhapsody_425+Wellington+St+W-0438_MicroHabitat+2024+%281%29.jpg"
                alt={t("roiCalculator.imageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Calculator Section */}
      <section className="section bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <CalculatorForm
              inputs={inputs}
              onInputChange={setInputs}
              onCalculate={handleCalculate}
              onReset={handleReset}
              isCalculating={isCalculating}
              locale={locale}
            />

            {/* Results */}
            <div className="space-y-6">
              {results ? (
                isUnlocked ? (
                  <FullResults results={results} locale={locale} />
                ) : (
                  <ResultsPreview
                    results={results}
                    onUnlock={handleUnlock}
                    locale={locale}
                  />
                )
              ) : (
                <div className="bg-card border border-border rounded-md p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
                  <Calculator className="w-12 h-12 text-muted-foreground/40 mb-4" />
                  <p className="text-muted-foreground">
                    {t("roiCalculator.form.title")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Sections (shown after unlocking) */}
      {results && isUnlocked && (
        <>
          <div className="divider" />

          {/* 5-Year Projection */}
          <section className="section">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
              <PaybackChart projections={fiveYearProjection} locale={locale} />
            </div>
          </section>

          <div className="divider" />

          {/* ESG Metrics */}
          <section className="section bg-muted/30">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
              <ESGMetrics metrics={results.esgMetrics} locale={locale} />
            </div>
          </section>

          <div className="divider" />

          {/* Download Section */}
          <section className="section">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
              <div className="bg-card border border-border rounded-md p-8 text-center">
                <Download className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  {t("roiCalculator.download.title")}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t("roiCalculator.download.description")}
                </p>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  {t("roiCalculator.download.button")}
                </Button>
              </div>
            </div>
          </section>
        </>
      )}

      <div className="divider" />

      {/* Disclaimer */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <p className="text-xs text-muted-foreground text-center">
            {t("roiCalculator.disclaimer")}
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            {t("roiCalculator.cta.title")}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {t("roiCalculator.cta.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white transition-colors cursor-pointer"
            >
              {t("roiCalculator.cta.scheduleDemo")}
            </button>
            <Link
              href={localePath("/commercial-real-estate")}
              className="inline-block px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            >
              {t("common.learnMore")}
            </Link>
          </div>
        </div>
      </section>

      <BookDemoModal
        open={isBookDemoOpen}
        onOpenChange={setIsBookDemoOpen}
        locale={locale}
      />

      <LeadCaptureModal
        open={isLeadCaptureOpen}
        onOpenChange={setIsLeadCaptureOpen}
        onSubmit={handleLeadSubmit}
        locale={locale}
      />
    </>
  );
}
