// ROI Calculator Types

export type PropertyType = 'residential' | 'commercial' | 'mixed';
export type UnitSystem = 'imperial' | 'metric';
export type FarmSize = 'small' | 'medium' | 'large';

export interface CalculatorInputs {
  // Required inputs
  propertyType: PropertyType;
  numberOfProperties: number;
  averageUnitsPerProperty: number;
  averageMonthlyRent: number;
  currentTurnoverRate: number; // Percentage (0-100)
  rooftopSize: number;
  unitSystem: UnitSystem;

  // Optional inputs
  currentEnergyCosts?: number;
  propertyValue?: number;
}

export interface CostRange {
  min: number;
  max: number;
}

export interface YearlyProjection {
  year: number;
  cumulativeCost: number;
  cumulativeBenefit: number;
  netPosition: number;
}

export interface ESGMetrics {
  co2Avoided: number; // kg per year
  foodProduced: number; // kg per year
  waterManaged: number; // liters per year
  pollinatorsSupported: number; // sq meters habitat
}

export interface CalculatorResults {
  // Investment summary
  installationCost: CostRange;
  annualServiceCost: CostRange;
  yearOneTotal: CostRange;

  // Annual benefits
  retentionSavings: number;
  rentPremiumPotential: number;
  energySavings: number;
  propertyValueIncrease: number;
  totalAnnualBenefit: number;

  // Projections
  fiveYearProjection: YearlyProjection[];
  paybackPeriodMonths: number;
  fiveYearROI: number; // Percentage

  // ESG metrics
  esgMetrics: ESGMetrics;

  // Farm details
  farmSize: FarmSize;
  numberOfFarms: number;
}

export interface LeadCaptureData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
}

export const DEFAULT_INPUTS: CalculatorInputs = {
  propertyType: 'residential',
  numberOfProperties: 1,
  averageUnitsPerProperty: 50,
  averageMonthlyRent: 1500,
  currentTurnoverRate: 25,
  rooftopSize: 3000,
  unitSystem: 'imperial',
  currentEnergyCosts: undefined,
  propertyValue: undefined,
};
