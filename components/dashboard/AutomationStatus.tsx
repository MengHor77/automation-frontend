import type { AutomationJob } from "@/types/automation";

interface AutomationStatusProps {
  jobs: AutomationJob[];
}

export default function AutomationStatus({
  jobs,
}: AutomationStatusProps) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-bold">
          Recent Tests
        </h2>

        <p className="text-sm text-gray-500">
          Browser automation test history
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-6 text-center text-gray-500">
          No automation tests yet.
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col gap-3 rounded-xl border p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {job.targetUrl}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {job.startedAt
                    ? new Date(job.startedAt).toLocaleString()
                    : "Not started"}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  job.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : job.status === "running"
                      ? "bg-blue-100 text-blue-700"
                      : job.status === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                }`}
              >
                {job.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}