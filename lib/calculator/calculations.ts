// Core ROI calculation logic

import type {
  CalculatorInputs,
  CalculatorResults,
  CostRange,
  YearlyProjection,
  ESGMetrics,
  FarmSize,
} from './types';
import {
  CALCULATOR_CONSTANTS,
  getFarmSize,
  convertArea,
} from './constants';

/**
 * Calculate complete ROI based on user inputs
 */
export function calculateROI(inputs: CalculatorInputs): CalculatorResults {
  // Convert to imperial for calculations if needed
  const rooftopSizeSqFt =
    inputs.unitSystem === 'metric'
      ? convertArea(inputs.rooftopSize, 'metric', 'imperial')
      : inputs.rooftopSize;

  // Determine farm size category
  const farmSize = getFarmSize(rooftopSizeSqFt);
  const numberOfFarms = inputs.numberOfProperties;

  // Calculate installation costs
  const installationCost = calculateInstallationCost(farmSize, numberOfFarms);

  // Calculate annual service costs
  const annualServiceCost = calculateAnnualServiceCost(farmSize, numberOfFarms);

  // Calculate Year 1 total investment
  const yearOneTotal: CostRange = {
    min: installationCost.min + annualServiceCost.min,
    max: installationCost.max + annualServiceCost.max,
  };

  // Calculate benefits
  const retentionSavings = calculateRetentionSavings(inputs);
  const rentPremiumPotential = calculateRentPremium(inputs);
  const energySavings = calculateEnergySavings(inputs, rooftopSizeSqFt);
  const propertyValueIncrease = calculatePropertyValueIncrease(inputs);

  const totalAnnualBenefit =
    retentionSavings + rentPremiumPotential + energySavings;

  // Calculate projections
  const fiveYearProjection = calculateFiveYearProjection(
    installationCost,
    annualServiceCost,
    totalAnnualBenefit
  );

  const paybackPeriodMonths = calculatePaybackPeriod(
    installationCost,
    annualServiceCost,
    totalAnnualBenefit
  );

  const fiveYearROI = calculateFiveYearROI(
    installationCost,
    annualServiceCost,
    totalAnnualBenefit
  );

  // Calculate ESG metrics
  const esgMetrics = calculateESGMetrics(numberOfFarms);

  return {
    installationCost,
    annualServiceCost,
    yearOneTotal,
    retentionSavings,
    rentPremiumPotential,
    energySavings,
    propertyValueIncrease,
    totalAnnualBenefit,
    fiveYearProjection,
    paybackPeriodMonths,
    fiveYearROI,
    esgMetrics,
    farmSize,
    numberOfFarms,
  };
}

/**
 * Calculate installation cost based on farm size and number of properties
 */
function calculateInstallationCost(
  farmSize: FarmSize,
  numberOfProperties: number
): CostRange {
  const costs = CALCULATOR_CONSTANTS.installationCost[farmSize];
  return {
    min: costs.min * numberOfProperties,
    max: costs.max * numberOfProperties,
  };
}

/**
 * Calculate annual service cost based on farm size and number of properties
 */
function calculateAnnualServiceCost(
  farmSize: FarmSize,
  numberOfProperties: number
): CostRange {
  const costs = CALCULATOR_CONSTANTS.annualServiceCost[farmSize];
  return {
    min: costs.min * numberOfProperties,
    max: costs.max * numberOfProperties,
  };
}

/**
 * Calculate savings from improved tenant retention
 * Formula: Current turnover cost × turnover reduction rate
 */
function calculateRetentionSavings(inputs: CalculatorInputs): number {
  const totalUnits = inputs.averageUnitsPerProperty * inputs.numberOfProperties;
  const annualTurnovers = totalUnits * (inputs.currentTurnoverRate / 100);

  // Cost per turnover: ~2.5 months rent (renovation, marketing, vacancy)
  const costPerTurnover =
    inputs.averageMonthlyRent * CALCULATOR_CONSTANTS.turnoverCostMultiplier;
  const currentTurnoverCost = annualTurnovers * costPerTurnover;

  // Savings from reducing turnover by 15-20%
  const savings =
    currentTurnoverCost * CALCULATOR_CONSTANTS.benefits.turnoverReductionRate;

  return Math.round(savings);
}

/**
 * Calculate potential rent premium
 * Formula: Annual rent revenue × rent premium rate
 */
function calculateRentPremium(inputs: CalculatorInputs): number {
  const totalUnits = inputs.averageUnitsPerProperty * inputs.numberOfProperties;
  const annualRentRevenue = totalUnits * inputs.averageMonthlyRent * 12;

  // Rent premium potential: 3-5% (using 4% average)
  const premium =
    annualRentRevenue * CALCULATOR_CONSTANTS.benefits.rentPremiumRate;

  return Math.round(premium);
}

/**
 * Calculate energy savings from green roof insulation
 */
function calculateEnergySavings(
  inputs: CalculatorInputs,
  rooftopSizeSqFt: number
): number {
  // If user provided actual energy costs, use 15% reduction
  if (inputs.currentEnergyCosts) {
    return Math.round(inputs.currentEnergyCosts * 0.15);
  }

  // Otherwise estimate based on rooftop size
  const totalRooftopArea = rooftopSizeSqFt * inputs.numberOfProperties;
  const savings =
    totalRooftopArea * CALCULATOR_CONSTANTS.benefits.energySavingsPerSqFt;

  return Math.round(savings);
}

/**
 * Calculate property value increase (one-time, not annual)
 */
function calculatePropertyValueIncrease(inputs: CalculatorInputs): number {
  if (!inputs.propertyValue) {
    return 0;
  }

  const totalPropertyValue = inputs.propertyValue * inputs.numberOfProperties;
  const increase =
    totalPropertyValue *
    CALCULATOR_CONSTANTS.benefits.propertyValueIncreaseRate;

  return Math.round(increase);
}

/**
 * Calculate 5-year projection
 */
function calculateFiveYearProjection(
  installationCost: CostRange,
  annualServiceCost: CostRange,
  annualBenefit: number
): YearlyProjection[] {
  const projection: YearlyProjection[] = [];
  const avgInstallation = (installationCost.min + installationCost.max) / 2;
  const avgService = (annualServiceCost.min + annualServiceCost.max) / 2;

  for (let year = 1; year <= 5; year++) {
    // Year 1 includes installation + service, subsequent years only service
    const yearCost = year === 1 ? avgInstallation + avgService : avgService;
    const cumulativeCost =
      year === 1
        ? yearCost
        : projection[year - 2].cumulativeCost + yearCost;
    const cumulativeBenefit = annualBenefit * year;
    const netPosition = cumulativeBenefit - cumulativeCost;

    projection.push({
      year,
      cumulativeCost: Math.round(cumulativeCost),
      cumulativeBenefit: Math.round(cumulativeBenefit),
      netPosition: Math.round(netPosition),
    });
  }

  return projection;
}

/**
 * Calculate payback period in months
 */
function calculatePaybackPeriod(
  installationCost: CostRange,
  annualServiceCost: CostRange,
  annualBenefit: number
): number {
  const avgInstallation = (installationCost.min + installationCost.max) / 2;
  const avgService = (annualServiceCost.min + annualServiceCost.max) / 2;

  // Net annual benefit (benefit minus ongoing service cost)
  const netAnnualBenefit = annualBenefit - avgService;

  if (netAnnualBenefit <= 0) {
    return 999; // Never pays back
  }

  // Payback period = Initial investment / Net annual benefit
  const paybackYears = avgInstallation / netAnnualBenefit;
  const paybackMonths = Math.ceil(paybackYears * 12);

  return Math.min(paybackMonths, 999); // Cap at 999 months
}

/**
 * Calculate 5-year ROI percentage
 */
function calculateFiveYearROI(
  installationCost: CostRange,
  annualServiceCost: CostRange,
  annualBenefit: number
): number {
  const avgInstallation = (installationCost.min + installationCost.max) / 2;
  const avgService = (annualServiceCost.min + annualServiceCost.max) / 2;

  const totalCostOver5Years = avgInstallation + avgService * 5;
  const totalBenefitOver5Years = annualBenefit * 5;

  const roi =
    ((totalBenefitOver5Years - totalCostOver5Years) / totalCostOver5Years) *
    100;

  return Math.round(roi);
}

/**
 * Calculate ESG metrics based on number of farms
 */
function calculateESGMetrics(numberOfFarms: number): ESGMetrics {
  const metrics = CALCULATOR_CONSTANTS.esgMetricsPerFarm;

  return {
    co2Avoided: Math.round(metrics.co2AvoideKg * numberOfFarms),
    foodProduced: Math.round(metrics.foodProducedKg * numberOfFarms),
    waterManaged: Math.round(metrics.waterManagedLiters * numberOfFarms),
    pollinatorsSupported: Math.round(
      metrics.pollinatorHabitatSqM * numberOfFarms
    ),
  };
}

/**
 * Validate calculator inputs
 */
export function validateInputs(inputs: CalculatorInputs): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (inputs.numberOfProperties < 1) {
    errors.numberOfProperties = 'Must have at least 1 property';
  }
  if (inputs.numberOfProperties > 1000) {
    errors.numberOfProperties = 'Maximum 1000 properties';
  }

  if (inputs.averageUnitsPerProperty < 1) {
    errors.averageUnitsPerProperty = 'Must have at least 1 unit';
  }
  if (inputs.averageUnitsPerProperty > 1000) {
    errors.averageUnitsPerProperty = 'Maximum 1000 units per property';
  }

  if (inputs.averageMonthlyRent < 100) {
    errors.averageMonthlyRent = 'Minimum rent is $100';
  }
  if (inputs.averageMonthlyRent > 50000) {
    errors.averageMonthlyRent = 'Maximum rent is $50,000';
  }

  if (inputs.currentTurnoverRate < 0) {
    errors.currentTurnoverRate = 'Turnover rate cannot be negative';
  }
  if (inputs.currentTurnoverRate > 100) {
    errors.currentTurnoverRate = 'Maximum turnover rate is 100%';
  }

  if (inputs.rooftopSize < 100) {
    errors.rooftopSize = 'Minimum rooftop size is 100 sq ft';
  }
  if (inputs.rooftopSize > 100000) {
    errors.rooftopSize = 'Maximum rooftop size is 100,000 sq ft';
  }

  if (inputs.currentEnergyCosts !== undefined && inputs.currentEnergyCosts < 0) {
    errors.currentEnergyCosts = 'Energy costs cannot be negative';
  }

  if (inputs.propertyValue !== undefined && inputs.propertyValue < 0) {
    errors.propertyValue = 'Property value cannot be negative';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number, locale = 'en-CA'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format currency range for display
 */
export function formatCurrencyRange(range: CostRange, locale = 'en-CA'): string {
  return `${formatCurrency(range.min, locale)} - ${formatCurrency(range.max, locale)}`;
}

/**
 * Format number with thousand separators
 */
export function formatNumber(value: number, locale = 'en-CA'): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
