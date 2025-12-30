// Financial model constants derived from MicroHabitat Portfolio PDF
// All values in CAD

import type { FarmSize } from './types';

export const CALCULATOR_CONSTANTS = {
  // Installation costs per property (based on rooftop size)
  installationCost: {
    small: { min: 15000, max: 25000 }, // < 2000 sq ft / < 186 sq m
    medium: { min: 20000, max: 30000 }, // 2000-5000 sq ft / 186-465 sq m
    large: { min: 25000, max: 35000 }, // > 5000 sq ft / > 465 sq m
  } as Record<FarmSize, { min: number; max: number }>,

  // Annual service costs per property
  annualServiceCost: {
    small: { min: 8000, max: 10000 },
    medium: { min: 10000, max: 12000 },
    large: { min: 12000, max: 15000 },
  } as Record<FarmSize, { min: number; max: number }>,

  // Benefit multipliers (based on PDF data)
  benefits: {
    // Tenant retention: 15-20% improvement in lease renewals
    // Average: 17.5% improvement
    turnoverReductionRate: 0.175,

    // Rent premium: 3-5% increase possible
    // Average: 4% for participating units
    rentPremiumRate: 0.04,

    // Energy savings: $2,000-$5,000/year
    // Using per sq ft calculation for flexibility
    energySavingsPerSqFt: 0.75, // $/sq ft/year average

    // Property value increase: 5-8%
    // Average: 6.5%
    propertyValueIncreaseRate: 0.065,
  },

  // Turnover cost estimation
  // Industry standard: 1.5-2.5x monthly rent per turnover
  // Includes: renovation, marketing, vacancy period
  turnoverCostMultiplier: 2.5,

  // ESG impact metrics per farm (annual)
  // Based on 135-230 kg production per farm per season (6 months)
  esgMetricsPerFarm: {
    // CO2 avoided by eliminating food transport
    // ~500 km average food miles eliminated
    co2AvoideKg: 150, // kg CO2/year

    // Food production: 135-230 kg per season
    // Average: 182.5 kg for 6-month season
    foodProducedKg: 180, // kg/year

    // Rainwater management through green roof
    waterManagedLiters: 50000, // liters/year

    // Pollinator habitat created
    pollinatorHabitatSqM: 25, // sq m per farm
  },

  // Size thresholds (in sq ft - convert for metric)
  sizeThresholds: {
    smallMax: 2000, // sq ft
    mediumMax: 5000, // sq ft
  },

  // Conversion factors
  conversions: {
    sqFtToSqM: 0.0929,
    sqMToSqFt: 10.764,
    lbsToKg: 0.4536,
    kgToLbs: 2.205,
  },
};

// Size category determination
export function getFarmSize(rooftopSizeSqFt: number): FarmSize {
  if (rooftopSizeSqFt <= CALCULATOR_CONSTANTS.sizeThresholds.smallMax) {
    return 'small';
  }
  if (rooftopSizeSqFt <= CALCULATOR_CONSTANTS.sizeThresholds.mediumMax) {
    return 'medium';
  }
  return 'large';
}

// Convert area between unit systems
export function convertArea(
  value: number,
  fromSystem: 'imperial' | 'metric',
  toSystem: 'imperial' | 'metric'
): number {
  if (fromSystem === toSystem) return value;
  if (fromSystem === 'metric') {
    return value * CALCULATOR_CONSTANTS.conversions.sqMToSqFt;
  }
  return value * CALCULATOR_CONSTANTS.conversions.sqFtToSqM;
}
