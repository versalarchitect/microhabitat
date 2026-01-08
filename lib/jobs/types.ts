/**
 * Job listing types for Breezy HR integration
 */

export interface Job {
  id: string;
  title: string;
  location: string;
  city: string;
  country: string;
  department: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'seasonal';
  salary?: string;
  url: string;
}

export interface JobsByLocation {
  location: string;
  country: string;
  jobs: Job[];
}

export interface JobsByDepartment {
  department: string;
  jobs: Job[];
}

export interface JobsData {
  jobs: Job[];
  byLocation: JobsByLocation[];
  byDepartment: JobsByDepartment[];
  lastUpdated: string;
  totalCount: number;
}

// Department categories for grouping
export const DEPARTMENT_CATEGORIES = {
  farming: ['Urban Farming', 'Farming', 'Installation', 'Agriculture'],
  sales: ['Sales', 'Business Development', 'Account Management'],
  marketing: ['Marketing', 'Communications', 'Social Media'],
  education: ['Education', 'Training', 'Workshop'],
  operations: ['Operations', 'Admin', 'Administrative', 'Procurement', 'Logistics'],
  creative: ['Photography', 'Design', 'Creative'],
} as const;

// Country name mappings
export const COUNTRY_MAPPINGS: Record<string, string> = {
  'Canada': 'Canada',
  'USA': 'USA',
  'United States': 'USA',
  'UK': 'UK',
  'United Kingdom': 'UK',
  'France': 'France',
  'Germany': 'Germany',
  'Netherlands': 'Netherlands',
  'Poland': 'Poland',
  'Switzerland': 'Switzerland',
};
