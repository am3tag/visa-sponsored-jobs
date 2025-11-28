import Link from "next/link";
import type { Job } from "@prisma/client";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <article className="animate-fadeIn rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            {job.title}
          </h2>
          <p className="text-sm text-slate-600">
            {job.company} • {job.location}
          </p>
        </div>
        {job.salary && (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {job.salary}
          </span>
        )}
      </div>
      {job.description && (
        <p className="mt-2 text-sm text-slate-700">
          {job.description}
        </p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <Link
          href={job.url}
          target="_blank"
          className="btn-primary text-xs"
        >
          Apply Now
        </Link>
        <span className="text-[11px] uppercase tracking-wide text-primary">
          Visa Sponsorship Available
        </span>
      </div>
    </article>
  );
}
