"use client";

import { useMemo, useState } from "react";
import type { Job } from "@prisma/client";
import { JobCard } from "@/components/JobCard";
import { GoogleAd } from "@/components/GoogleAd";

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<string>("all");

  const locations = useMemo(() => {
    const set = new Set<string>();
    for (const job of jobs) {
      if (job.location) set.add(job.location);
    }
    return Array.from(set).sort();
  }, [jobs]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return jobs.filter((job) => {
      if (location !== "all" && job.location !== location) return false;

      if (!term) return true;
      const haystack = `${job.title} ${job.company} ${job.location}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [jobs, search, location]);

  return (
    <div className="space-y-4">
      <section className="sticky top-[52px] z-40 border-b border-slate-200 bg-slate-50/90 pb-3 pt-1 backdrop-blur">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by title, company, or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex flex-wrap gap-2 text-xs md:justify-end">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="all">All locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            {(location !== "all" || search.trim()) && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setLocation("all");
                }}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:border-primary hover:text-primary"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
        <div className="mx-auto mt-1 max-w-3xl text-[11px] text-slate-500">
          Showing {filtered.length} job{filtered.length === 1 ? "" : "s"}
        </div>
      </section>

      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {filtered.map((job, index) => (
          <div key={job.id}>
            <JobCard job={job} />
            {(index + 1) % 3 === 0 && <GoogleAd />}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-slate-500">
            No jobs match your search yet. Try adjusting filters.
          </p>
        )}
      </div>
    </div>
  );
}
