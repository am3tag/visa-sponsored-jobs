"use client";

interface Props {
  jobId: string;
}

export function DeleteJobButton({ jobId }: Props) {
  async function handleDelete() {
    const ok = window.confirm("Are you sure you want to delete this job?");
    if (!ok) return;
    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (!res.ok) {
        alert("Failed to delete job");
        return;
      }
      window.location.reload();
    } catch (e) {
      alert("Failed to delete job");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="text-xs text-red-500 hover:text-red-600"
      title="Delete job"
    >
      ✕
    </button>
  );
}
