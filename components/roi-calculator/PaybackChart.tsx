"use client";

import { type YearlyProjection } from "@/lib/calculator/types";
import { formatCurrency } from "@/lib/calculator/calculations";
import { type Locale, getTranslations } from "@/lib/i18n";

interface PaybackChartProps {
  projections: YearlyProjection[];
  locale: Locale;
}

export function PaybackChart({ projections, locale }: PaybackChartProps) {
  const translations = getTranslations(locale);
  const t = (key: string) => translations[key] || key;

  // Find the maximum cumulative value for scaling
  const maxNet = Math.max(...projections.map((p) => p.netPosition));
  const minNet = Math.min(...projections.map((p) => p.netPosition));
  const range = maxNet - minNet;

  // Normalize values for chart bars
  const normalizeValue = (value: number) => {
    if (range === 0) return 50;
    return ((value - minNet) / range) * 100;
  };

  return (
    <div className="bg-card border border-border rounded-md p-6 md:p-8">
      <h3 className="text-lg font-medium text-foreground mb-6">
        {t("roiCalculator.projection.title")}
      </h3>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                {t("roiCalculator.projection.year")}
              </th>
              <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                {t("roiCalculator.projection.investment")}
              </th>
              <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                {t("roiCalculator.projection.benefits")}
              </th>
              <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                {t("roiCalculator.projection.cumulative")}
              </th>
            </tr>
          </thead>
          <tbody>
            {projections.map((projection) => (
              <tr key={projection.year} className="border-b border-border last:border-0">
                <td className="py-3 px-2 font-medium">{projection.year}</td>
                <td className="py-3 px-2 text-right text-red-600">
                  -{formatCurrency(projection.cumulativeCost)}
                </td>
                <td className="py-3 px-2 text-right text-primary">
                  +{formatCurrency(projection.cumulativeBenefit)}
                </td>
                <td
                  className={`py-3 px-2 text-right font-medium ${
                    projection.netPosition >= 0 ? "text-primary" : "text-red-600"
                  }`}
                >
                  {projection.netPosition >= 0 ? "+" : ""}
                  {formatCurrency(projection.netPosition)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visual Bar Chart */}
      <div className="mt-8">
        <h4 className="text-sm font-medium text-muted-foreground mb-4">
          {t("roiCalculator.projection.netPosition")}
        </h4>
        <div className="space-y-3">
          {projections.map((projection) => {
            const width = normalizeValue(projection.netPosition);
            const isPositive = projection.netPosition >= 0;

            return (
              <div key={projection.year} className="flex items-center gap-3">
                <span className="w-16 text-sm text-muted-foreground">
                  {t("roiCalculator.projection.year")} {projection.year}
                </span>
                <div className="flex-1 h-6 bg-muted/30 rounded overflow-hidden relative">
                  <div
                    className={`absolute top-0 h-full rounded transition-all duration-500 ${
                      isPositive ? "bg-primary" : "bg-red-500/70"
                    }`}
                    style={{
                      width: `${Math.abs(width)}%`,
                      left: isPositive ? "0" : "auto",
                      right: isPositive ? "auto" : "0",
                    }}
                  />
                </div>
                <span
                  className={`w-24 text-right text-sm font-medium ${
                    isPositive ? "text-primary" : "text-red-600"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {formatCurrency(projection.netPosition)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
