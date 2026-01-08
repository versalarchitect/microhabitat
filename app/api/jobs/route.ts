import { NextRequest, NextResponse } from 'next/server';
import { fetchJobs } from '@/lib/jobs/breezy-fetcher';

export const revalidate = 900; // Revalidate every 15 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department');
    const country = searchParams.get('country');
    const city = searchParams.get('city');

    const jobsData = await fetchJobs();

    // Apply filters if provided
    let filteredJobs = jobsData.jobs;

    if (department) {
      filteredJobs = filteredJobs.filter(
        job => job.department.toLowerCase() === department.toLowerCase()
      );
    }

    if (country) {
      filteredJobs = filteredJobs.filter(
        job => job.country.toLowerCase() === country.toLowerCase()
      );
    }

    if (city) {
      filteredJobs = filteredJobs.filter(
        job => job.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    // If filters applied, return filtered results
    if (department || country || city) {
      return NextResponse.json({
        jobs: filteredJobs,
        totalCount: filteredJobs.length,
        lastUpdated: jobsData.lastUpdated,
      });
    }

    // Otherwise return full data with groupings
    return NextResponse.json(jobsData);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job listings' },
      { status: 500 }
    );
  }
}
