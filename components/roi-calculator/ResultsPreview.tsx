"use client";

import { type CalculatorResults } from "@/lib/calculator/types";
import { formatCurrency } from "@/lib/calculator/calculations";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { type Locale, getTranslations } from "@/lib/i18n";

interface ResultsPreviewProps {
  results: CalculatorResults;
  onUnlock: () => void;
  locale: Locale;
}

export function ResultsPreview({ results, onUnlock, locale }: ResultsPreviewProps) {
  const translations = getTranslations(locale);
  const t = (key: string) => translations[key] || key;

  const paybackYears = results.paybackPeriodMonths / 12;

  return (
    <div className="bg-card border border-border rounded-md p-6 md:p-8">
      <h3 className="text-lg font-medium text-foreground mb-6">
        {t("roiCalculator.preview.title")}
      </h3>

      <p className="text-sm text-muted-foreground mb-6">
        {t("roiCalculator.preview.description")}
      </p>

      {/* Visible preview metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-primary/5 rounded-md">
          <p className="text-2xl md:text-3xl font-medium text-primary">
            {results.fiveYearROI}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {t("roiCalculator.preview.estimatedROI")}
          </p>
        </div>
        <div className="text-center p-4 bg-primary/5 rounded-md">
          <p className="text-2xl md:text-3xl font-medium text-primary">
            {paybackYears.toFixed(1)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {t("roiCalculator.preview.paybackPeriod")} ({t("roiCalculator.preview.years")})
          </p>
        </div>
        <div className="text-center p-4 bg-primary/5 rounded-md">
          <p className="text-2xl md:text-3xl font-medium text-primary">
            {formatCurrency(results.totalAnnualBenefit)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {t("roiCalculator.preview.annualBenefit")}
          </p>
        </div>
      </div>

      {/* Blurred details section */}
      <div className="relative">
        <div className="blur-sm pointer-events-none select-none">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex justify-between py-2 border-b border-border">
              <span>{t("roiCalculator.results.retentionSavings")}</span>
              <span className="font-medium">$XX,XXX</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span>{t("roiCalculator.results.rentPremium")}</span>
              <span className="font-medium">$XX,XXX</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span>{t("roiCalculator.results.energySavings")}</span>
              <span className="font-medium">$X,XXX</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span>{t("roiCalculator.results.propertyValueIncrease")}</span>
              <span className="font-medium">$XXX,XXX</span>
            </div>
          </div>
        </div>

        {/* Overlay with unlock button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-[2px]">
          <Lock className="w-6 h-6 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground mb-4">
            {t("roiCalculator.preview.blurredMessage")}
          </p>
          <Button onClick={onUnlock}>
            {t("roiCalculator.preview.unlockReport")}
          </Button>
        </div>
      </div>
    </div>
  );
}
