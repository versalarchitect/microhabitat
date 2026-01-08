"use client";

import { useState, useMemo } from "react";
import { ExternalLink, MapPin, Briefcase, Building2, ChevronDown, Search } from "lucide-react";
import type { JobsData, Job } from "@/lib/jobs/types";

interface JobListingsProps {
  translations: Record<string, string>;
  jobsData: JobsData;
}

type ViewMode = "location" | "department";

export function JobListings({ translations, jobsData }: JobListingsProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("location");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => {
    // Expand first 3 groups by default
    const initial = new Set<string>();
    jobsData.byLocation.slice(0, 3).forEach(g => initial.add(g.location));
    return initial;
  });

  const t = (key: string) => translations[key] || key;

  // Get unique cities and departments for filters
  const { cities, departments } = useMemo(() => {
    const citySet = new Set<string>();
    const deptSet = new Set<string>();

    jobsData.jobs.forEach(j => {
      citySet.add(j.city);
      deptSet.add(j.department);
    });

    return {
      cities: Array.from(citySet).sort(),
      departments: Array.from(deptSet).sort(),
    };
  }, [jobsData.jobs]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    let jobs = jobsData.jobs;

    if (cityFilter !== "all") {
      jobs = jobs.filter(j => j.city === cityFilter);
    }
    if (departmentFilter !== "all") {
      jobs = jobs.filter(j => j.department === departmentFilter);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      jobs = jobs.filter(
        j =>
          j.title.toLowerCase().includes(query) ||
          j.city.toLowerCase().includes(query) ||
          j.department.toLowerCase().includes(query)
      );
    }
    return jobs;
  }, [jobsData.jobs, cityFilter, departmentFilter, searchQuery]);

  // Group filtered jobs
  const groupedJobs = useMemo(() => {
    if (viewMode === "location") {
      const groups: Record<string, { location: string; country: string; jobs: Job[] }> = {};
      for (const job of filteredJobs) {
        const key = job.city;
        if (!groups[key]) {
          groups[key] = { location: job.city, country: job.country, jobs: [] };
        }
        groups[key].jobs.push(job);
      }
      // Sort by country then city
      return Object.values(groups).sort((a, b) => {
        if (a.country !== b.country) return a.country.localeCompare(b.country);
        return a.location.localeCompare(b.location);
      });
    } else {
      const groups: Record<string, { department: string; jobs: Job[] }> = {};
      for (const job of filteredJobs) {
        const key = job.department;
        if (!groups[key]) {
          groups[key] = { department: key, jobs: [] };
        }
        groups[key].jobs.push(job);
      }
      return Object.values(groups).sort((a, b) =>
        a.department.localeCompare(b.department)
      );
    }
  }, [filteredJobs, viewMode]);

  const toggleGroup = (key: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  if (jobsData.totalCount === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">{t("jobs.noOpenings")}</p>
        <a
          href="mailto:careers@microhabitat.com"
          className="inline-flex items-center text-primary hover:underline"
        >
          {t("jobs.sendResume")}
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-medium">
            {filteredJobs.length} {filteredJobs.length === 1 ? t("jobs.position") : t("jobs.positions")}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {t("jobs.acrossLocations").replace("{count}", String(cities.length))}
          </p>
        </div>
        <a
          href="https://microhabitat.breezy.hr/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-primary hover:underline"
        >
          {t("jobs.viewAll")}
          <ExternalLink className="ml-1 w-3 h-3" />
        </a>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("jobs.searchPlaceholder")}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* City filter */}
        <select
          value={cityFilter}
          onChange={e => setCityFilter(e.target.value)}
          className="px-4 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">{t("jobs.allCities")}</option>
          {cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Department filter */}
        <select
          value={departmentFilter}
          onChange={e => setDepartmentFilter(e.target.value)}
          className="px-4 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">{t("jobs.allDepartments")}</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* View mode toggle */}
        <div className="flex border border-border rounded-md overflow-hidden">
          <button
            onClick={() => setViewMode("location")}
            className={`px-3 py-2 text-sm flex items-center gap-1.5 transition-colors ${
              viewMode === "location"
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            {t("jobs.byLocation")}
          </button>
          <button
            onClick={() => setViewMode("department")}
            className={`px-3 py-2 text-sm flex items-center gap-1.5 transition-colors ${
              viewMode === "department"
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            {t("jobs.byDepartment")}
          </button>
        </div>
      </div>

      {/* Job listings */}
      <div className="space-y-4">
        {groupedJobs.map(group => {
          const groupKey = "location" in group ? group.location : group.department;
          const isExpanded = expandedGroups.has(groupKey);
          const groupLabel = "location" in group
            ? `${group.location}, ${group.country}`
            : group.department;

          return (
            <div key={groupKey} className="border border-border rounded-md overflow-hidden">
              {/* Group header */}
              <button
                onClick={() => toggleGroup(groupKey)}
                className="w-full flex items-center justify-between px-5 py-4 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {"location" in group ? (
                    <MapPin className="w-5 h-5 text-primary" />
                  ) : (
                    <Building2 className="w-5 h-5 text-primary" />
                  )}
                  <span className="font-medium">{groupLabel}</span>
                  <span className="text-sm text-muted-foreground">
                    ({group.jobs.length} {group.jobs.length === 1 ? t("jobs.opening") : t("jobs.openings")})
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Job list */}
              {isExpanded && (
                <div className="divide-y divide-border">
                  {group.jobs.map(job => (
                    <a
                      key={job.id}
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                          {job.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                          {"location" in group ? (
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5" />
                              {job.department}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {job.city}, {job.country}
                            </span>
                          )}
                          {job.salary && (
                            <span className="text-primary font-medium">
                              {job.salary}
                            </span>
                          )}
                          <span className="capitalize text-xs px-2 py-0.5 bg-muted rounded">
                            {job.type.replace("-", " ")}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No results */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12 border border-border rounded-md">
          <p className="text-muted-foreground mb-4">{t("jobs.noResults")}</p>
          <button
            onClick={() => {
              setCityFilter("all");
              setDepartmentFilter("all");
              setSearchQuery("");
            }}
            className="text-primary hover:underline"
          >
            {t("jobs.clearFilters")}
          </button>
        </div>
      )}
    </div>
  );
}
