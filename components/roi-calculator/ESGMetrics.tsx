"use client";

import { type ESGMetrics as ESGMetricsType } from "@/lib/calculator/types";
import { Leaf, Apple, Droplets, TreePine, Award } from "lucide-react";
import { type Locale, getTranslations } from "@/lib/i18n";

interface ESGMetricsProps {
  metrics: ESGMetricsType;
  locale: Locale;
}

export function ESGMetrics({ metrics, locale }: ESGMetricsProps) {
  const translations = getTranslations(locale);
  const t = (key: string) => translations[key] || key;

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const metricCards = [
    {
      icon: Leaf,
      label: t("roiCalculator.esg.co2Reduction"),
      value: formatNumber(metrics.co2Avoided),
      unit: t("roiCalculator.esg.co2Unit"),
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Apple,
      label: t("roiCalculator.esg.foodProduction"),
      value: formatNumber(metrics.foodProduced),
      unit: t("roiCalculator.esg.foodUnit"),
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Droplets,
      label: t("roiCalculator.esg.waterSaved"),
      value: formatNumber(metrics.waterManaged),
      unit: t("roiCalculator.esg.waterUnit"),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: TreePine,
      label: t("roiCalculator.esg.biodiversity"),
      value: t("roiCalculator.esg.biodiversityValue"),
      unit: "",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      isText: true,
    },
  ];

  return (
    <div className="bg-card border border-border rounded-md p-6 md:p-8">
      <h3 className="text-lg font-medium text-foreground mb-2">
        {t("roiCalculator.esg.title")}
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        {t("roiCalculator.esg.description")}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metricCards.map((metric) => (
          <div
            key={metric.label}
            className={`p-4 rounded-md ${metric.bgColor}`}
          >
            <metric.icon className={`w-5 h-5 ${metric.color} mb-2`} />
            <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
            {metric.isText ? (
              <p className={`text-xs font-medium ${metric.color}`}>{metric.value}</p>
            ) : (
              <>
                <p className={`text-xl font-semibold ${metric.color}`}>{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.unit}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="border-t border-border pt-6">
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              {t("roiCalculator.esg.certifications")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("roiCalculator.esg.certificationsValue")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
