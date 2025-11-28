import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/prisma";

import { getAdminFromCookie } from "@/lib/auth";
import AdminJobForm from "./AdminJobForm";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { DeleteJobButton } from "@/components/DeleteJobButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const username = getAdminFromCookie();
  if (!username) {
    redirect("/admin/login");
  }
  const prisma = await getPrisma();
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-600">
            Signed in as <span className="font-medium">{username}</span>
          </p>
        </div>
        <AdminLogoutButton />
      </header>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-slate-800">
          Post a new visa sponsored job
        </h2>
        <AdminJobForm />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-800">
          Existing jobs
        </h2>
        {jobs.length === 0 ? (
          <p className="text-sm text-slate-500">No jobs yet.</p>
        ) : (
          <div className="space-y-2 text-sm">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-start justify-between gap-2 rounded-xl border bg-white px-3 py-2"
              >
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-xs text-slate-600">
                    {job.company} • {job.location}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500">
                    {job.isActive ? "Active" : "Hidden"}
                  </span>
                  <DeleteJobButton jobId={job.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
