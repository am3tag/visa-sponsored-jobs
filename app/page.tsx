import { prisma } from "@/lib/prisma";
import { JobList } from "@/components/JobList";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const jobs = await prisma.job.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        
        <p className="max-w-2xl text-sm text-slate-600">
          A focused board of roles that explicitly offer visa sponsorship for
          skilled professionals looking to move abroad.
        </p>
      </header>

      {jobs.length === 0 ? (
        <p className="text-sm text-slate-500">
          No jobs yet. Check back soon — or log in as admin to add the first role.
        </p>
      ) : (
        <JobList jobs={jobs} />
      )}
    </div>
  );
}
