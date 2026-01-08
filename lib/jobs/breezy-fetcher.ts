/**
 * Breezy HR Job Fetcher
 *
 * Fetches job listings from MicroHabitat's Breezy HR public JSON API
 * and transforms them into a structured format for the careers page.
 */

import { Job, JobsData, JobsByLocation, JobsByDepartment } from './types';

const BREEZY_JSON_URL = 'https://microhabitat.breezy.hr/json';
const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes

// In-memory cache for server-side
let cachedData: { data: JobsData; timestamp: number } | null = null;

// Breezy HR API response types
interface BreezyLocation {
  country: { name: string; id: string };
  state?: { id: string; name: string };
  city?: string;
  name: string;
  is_remote?: boolean;
  remote_details?: { value: string; label: string };
}

interface BreezyJob {
  id: string;
  friendly_id: string;
  name: string;
  url: string;
  published_date: string;
  type: { id: string; name: string };
  location: BreezyLocation;
  department: string;
  salary?: string;
  company: { name: string; friendly_id: string };
  locations: BreezyLocation[];
}

/**
 * Map Breezy job type to our type
 */
function mapJobType(breezyType: string): Job['type'] {
  const typeMap: Record<string, Job['type']> = {
    'fullTime': 'full-time',
    'partTime': 'part-time',
    'contract': 'contract',
    'temporary': 'seasonal',
    'internship': 'seasonal',
  };
  return typeMap[breezyType] || 'full-time';
}

/**
 * Normalize department name
 */
function normalizeDepartment(department: string): string {
  const deptLower = department.toLowerCase();

  // Map variations to consistent names
  if (deptLower.includes('farming') || deptLower === 'urban farming') {
    return 'Urban Farming';
  }
  if (deptLower.includes('sales') || deptLower.includes('business development')) {
    return 'Sales';
  }
  if (deptLower.includes('marketing')) {
    return 'Marketing';
  }
  if (deptLower.includes('admin')) {
    return 'Admin';
  }
  if (deptLower.includes('education') || deptLower === 'éducation') {
    return 'Education';
  }
  if (deptLower.includes('photo')) {
    return 'Photography';
  }
  if (deptLower.includes('procurement') || deptLower.includes('operations')) {
    return 'Operations';
  }

  // Capitalize first letter
  return department.charAt(0).toUpperCase() + department.slice(1);
}

/**
 * Transform Breezy API job to our Job format
 */
function transformJob(breezyJob: BreezyJob): Job {
  const location = breezyJob.location;

  return {
    id: breezyJob.id,
    title: breezyJob.name,
    location: location.name || 'Remote',
    city: location.city || location.state?.name || location.country.name,
    country: location.country.name,
    department: normalizeDepartment(breezyJob.department),
    type: mapJobType(breezyJob.type.id),
    salary: breezyJob.salary || undefined,
    url: breezyJob.url,
  };
}

/**
 * Group jobs by location
 */
function groupByLocation(jobs: Job[]): JobsByLocation[] {
  const groups: Record<string, JobsByLocation> = {};

  for (const job of jobs) {
    const key = `${job.city}-${job.country}`;
    if (!groups[key]) {
      groups[key] = {
        location: job.city,
        country: job.country,
        jobs: [],
      };
    }
    groups[key].jobs.push(job);
  }

  // Sort by country then city, with Canada first, then USA, then Europe
  const countryOrder: Record<string, number> = {
    'Canada': 1,
    'United States': 2,
    'UK': 3,
    'France': 4,
    'Germany': 5,
    'Netherlands': 6,
    'Switzerland': 7,
    'Poland': 8,
  };

  return Object.values(groups).sort((a, b) => {
    const orderA = countryOrder[a.country] || 99;
    const orderB = countryOrder[b.country] || 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.location.localeCompare(b.location);
  });
}

/**
 * Group jobs by department
 */
function groupByDepartment(jobs: Job[]): JobsByDepartment[] {
  const groups: Record<string, JobsByDepartment> = {};

  for (const job of jobs) {
    const key = job.department;
    if (!groups[key]) {
      groups[key] = {
        department: key,
        jobs: [],
      };
    }
    groups[key].jobs.push(job);
  }

  // Sort by department name, with Urban Farming first
  const deptOrder: Record<string, number> = {
    'Urban Farming': 1,
    'Sales': 2,
    'Education': 3,
    'Marketing': 4,
    'Admin': 5,
    'Operations': 6,
    'Photography': 7,
  };

  return Object.values(groups).sort((a, b) => {
    const orderA = deptOrder[a.department] || 99;
    const orderB = deptOrder[b.department] || 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.department.localeCompare(b.department);
  });
}

/**
 * Fetch and parse jobs from Breezy HR public JSON API
 */
export async function fetchJobs(): Promise<JobsData> {
  // Check cache first
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  try {
    const response = await fetch(BREEZY_JSON_URL, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 900 }, // Revalidate every 15 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Breezy HR: ${response.status}`);
    }

    const breezyJobs: BreezyJob[] = await response.json();

    // Transform all jobs
    const jobs = breezyJobs.map(transformJob);

    const data: JobsData = {
      jobs,
      byLocation: groupByLocation(jobs),
      byDepartment: groupByDepartment(jobs),
      lastUpdated: new Date().toISOString(),
      totalCount: jobs.length,
    };

    // Cache the result
    cachedData = { data, timestamp: Date.now() };

    return data;
  } catch (error) {
    console.error('Error fetching jobs from Breezy HR:', error);

    // Return cached data if available, even if stale
    if (cachedData) {
      return cachedData.data;
    }

    // Return empty data structure
    return {
      jobs: [],
      byLocation: [],
      byDepartment: [],
      lastUpdated: new Date().toISOString(),
      totalCount: 0,
    };
  }
}

/**
 * Clear the jobs cache
 */
export function clearJobsCache(): void {
  cachedData = null;
}
