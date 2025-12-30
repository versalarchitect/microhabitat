"use client";

import { type CalculatorResults } from "@/lib/calculator/types";
import { formatCurrency } from "@/lib/calculator/calculations";
import { type Locale, getTranslations } from "@/lib/i18n";

interface FullResultsProps {
  results: CalculatorResults;
  locale: Locale;
}

export function FullResults({ results, locale }: FullResultsProps) {
  const translations = getTranslations(locale);
  const t = (key: string) => translations[key] || key;

  const avgInstallation = (results.installationCost.min + results.installationCost.max) / 2;
  const avgServiceCost = (results.annualServiceCost.min + results.annualServiceCost.max) / 2;
  const yearOneTotal = avgInstallation + avgServiceCost;
  const netAnnualBenefit = results.totalAnnualBenefit - avgServiceCost;
  const paybackYears = results.paybackPeriodMonths / 12;

  return (
    <div className="bg-card border border-border rounded-md p-6 md:p-8">
      <h3 className="text-lg font-medium text-foreground mb-6">
        {t("roiCalculator.results.title")}
      </h3>

      {/* Investment Summary */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wide">
          {t("roiCalculator.results.summary")}
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">
              {t("roiCalculator.results.installationCost")}
            </span>
            <span className="text-sm font-medium text-foreground">
              {formatCurrency(avgInstallation)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">
              {t("roiCalculator.results.annualServiceCost")}
            </span>
            <span className="text-sm font-medium text-foreground">
              {formatCurrency(avgServiceCost)}
            </span>
          </div>
          <div className="flex justify-between py-2 bg-muted/30 px-2 -mx-2 rounded">
            <span className="text-sm font-medium text-foreground">
              {t("roiCalculator.results.totalFirstYear")}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {formatCurrency(yearOneTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Annual Benefits */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wide">
          {t("roiCalculator.results.benefits")}
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">
              {t("roiCalculator.results.retentionSavings")}
            </span>
            <span className="text-sm font-medium text-primary">
              +{formatCurrency(results.retentionSavings)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">
              {t("roiCalculator.results.rentPremium")}
            </span>
            <span className="text-sm font-medium text-primary">
              +{formatCurrency(results.rentPremiumPotential)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">
              {t("roiCalculator.results.energySavings")}
            </span>
            <span className="text-sm font-medium text-primary">
              +{formatCurrency(results.energySavings)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">
              {t("roiCalculator.results.propertyValueIncrease")}
            </span>
            <span className="text-sm font-medium text-primary">
              +{formatCurrency(results.propertyValueIncrease)}
            </span>
          </div>
          <div className="flex justify-between py-2 bg-primary/5 px-2 -mx-2 rounded">
            <span className="text-sm font-medium text-foreground">
              {t("roiCalculator.results.totalAnnualBenefit")}
            </span>
            <span className="text-sm font-semibold text-primary">
              +{formatCurrency(results.totalAnnualBenefit)}
            </span>
          </div>
        </div>
      </div>

      {/* Net Annual Benefit */}
      <div className="mb-8">
        <div className="flex justify-between py-3 bg-muted/30 px-4 -mx-2 rounded">
          <span className="text-sm font-medium text-foreground">
            {t("roiCalculator.results.netAnnualBenefit")}
          </span>
          <span className="text-base font-semibold text-primary">
            {formatCurrency(netAnnualBenefit)}
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-primary/5 rounded-md">
          <p className="text-3xl font-semibold text-primary">{results.fiveYearROI}%</p>
          <p className="text-xs text-muted-foreground mt-1">
            {t("roiCalculator.results.roi")}
          </p>
        </div>
        <div className="text-center p-4 bg-primary/5 rounded-md">
          <p className="text-3xl font-semibold text-primary">
            {paybackYears.toFixed(1)} {t("roiCalculator.preview.years")}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {t("roiCalculator.results.paybackPeriod")}
          </p>
        </div>
      </div>
    </div>
  );
}
