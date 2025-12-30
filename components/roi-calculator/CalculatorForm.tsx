"use client";

import { type CalculatorInputs, PropertyType } from "@/lib/calculator/types";
import { FormInput, FormSelect } from "@/components/ui/form-input";
import { Button } from "@/components/ui/button";
import { type Locale, getTranslations } from "@/lib/i18n";

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onInputChange: (inputs: CalculatorInputs) => void;
  onCalculate: () => void;
  onReset: () => void;
  isCalculating: boolean;
  locale: Locale;
}

export function CalculatorForm({
  inputs,
  onInputChange,
  onCalculate,
  onReset,
  isCalculating,
  locale,
}: CalculatorFormProps) {
  const translations = getTranslations(locale);
  const t = (key: string) => translations[key] || key;

  const handleChange = (field: keyof CalculatorInputs, value: string | number | undefined) => {
    onInputChange({
      ...inputs,
      [field]: value,
    });
  };

  const propertyTypeOptions = [
    { value: "residential", label: t("roiCalculator.form.propertyType.residential") },
    { value: "commercial", label: t("roiCalculator.form.propertyType.commercial") },
    { value: "mixed", label: t("roiCalculator.form.propertyType.mixed") },
  ];

  return (
    <div className="bg-card border border-border rounded-md p-6 md:p-8">
      <h3 className="text-lg font-medium text-foreground mb-6">
        {t("roiCalculator.form.title")}
      </h3>

      <div className="space-y-5">
        {/* Property Type */}
        <FormSelect
          id="propertyType"
          label={t("roiCalculator.form.propertyType")}
          options={propertyTypeOptions}
          value={inputs.propertyType}
          onChange={(e) => handleChange("propertyType", e.target.value as PropertyType)}
        />

        {/* Number of Properties */}
        <FormInput
          id="numberOfProperties"
          label={t("roiCalculator.form.numberOfProperties")}
          type="number"
          min={1}
          value={inputs.numberOfProperties || ""}
          onChange={(e) => handleChange("numberOfProperties", parseInt(e.target.value) || 0)}
          placeholder={t("roiCalculator.form.numberOfProperties.placeholder")}
        />

        {/* Average Units per Property */}
        <FormInput
          id="averageUnitsPerProperty"
          label={t("roiCalculator.form.avgUnitsPerProperty")}
          type="number"
          min={1}
          value={inputs.averageUnitsPerProperty || ""}
          onChange={(e) => handleChange("averageUnitsPerProperty", parseInt(e.target.value) || 0)}
          placeholder={t("roiCalculator.form.avgUnitsPerProperty.placeholder")}
        />

        {/* Average Monthly Rent */}
        <FormInput
          id="averageMonthlyRent"
          label={t("roiCalculator.form.avgMonthlyRent")}
          type="number"
          min={0}
          step={100}
          value={inputs.averageMonthlyRent || ""}
          onChange={(e) => handleChange("averageMonthlyRent", parseFloat(e.target.value) || 0)}
          placeholder={t("roiCalculator.form.avgMonthlyRent.placeholder")}
        />

        {/* Current Turnover Rate */}
        <FormInput
          id="currentTurnoverRate"
          label={t("roiCalculator.form.currentTurnoverRate")}
          type="number"
          min={0}
          max={100}
          step={1}
          value={inputs.currentTurnoverRate || ""}
          onChange={(e) => handleChange("currentTurnoverRate", parseFloat(e.target.value) || 0)}
          placeholder={t("roiCalculator.form.currentTurnoverRate.placeholder")}
        />

        {/* Rooftop/Space Size */}
        <FormInput
          id="rooftopSize"
          label={t("roiCalculator.form.rooftopSize")}
          type="number"
          min={100}
          step={100}
          value={inputs.rooftopSize || ""}
          onChange={(e) => handleChange("rooftopSize", parseFloat(e.target.value) || 0)}
          placeholder={t("roiCalculator.form.rooftopSize.placeholder")}
        />

        {/* Optional: Annual Energy Costs */}
        <FormInput
          id="currentEnergyCosts"
          label={t("roiCalculator.form.annualEnergyCosts")}
          type="number"
          min={0}
          step={1000}
          value={inputs.currentEnergyCosts || ""}
          onChange={(e) => handleChange("currentEnergyCosts", parseFloat(e.target.value) || undefined)}
          placeholder={t("roiCalculator.form.annualEnergyCosts.placeholder")}
        />

        {/* Optional: Property Value */}
        <FormInput
          id="propertyValue"
          label={t("roiCalculator.form.propertyValue")}
          type="number"
          min={0}
          step={100000}
          value={inputs.propertyValue || ""}
          onChange={(e) => handleChange("propertyValue", parseFloat(e.target.value) || undefined)}
          placeholder={t("roiCalculator.form.propertyValue.placeholder")}
        />

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={onCalculate}
            disabled={isCalculating}
            className="flex-1"
          >
            {isCalculating
              ? t("roiCalculator.form.calculating")
              : t("roiCalculator.form.calculate")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            disabled={isCalculating}
          >
            {t("roiCalculator.form.reset")}
          </Button>
        </div>
      </div>
    </div>
  );
}
