"use client";

import { useCallback, useEffect, useState } from "react";
import AutomationForm from "@/components/dashboard/AutomationForm";
import AutomationStatus from "@/components/dashboard/AutomationStatus";
import StatsCards from "@/components/dashboard/StatsCards";
import { getAutomationJobs } from "@/lib/api";
import type { AutomationJob } from "@/types/automation";

export default function DashboardPage() {
  const [jobs, setJobs] = useState<AutomationJob[]>([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = useCallback(async () => {
    try {
      const data = await getAutomationJobs();

      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Failed to load jobs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const running = jobs.filter(
    (job) => job.status === "running",
  ).length;

  const completed = jobs.filter(
    (job) => job.status === "completed",
  ).length;

  const failed = jobs.filter(
    (job) => job.status === "failed",
  ).length;

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Automation System
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Browser Automation Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Run controlled browser tests against authorized URLs.
          </p>
        </div>

        <StatsCards
          total={jobs.length}
          running={running}
          completed={completed}
          failed={failed}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[420px_1fr]">
          <AutomationForm onCreated={loadJobs} />

          <div>
            {loading ? (
              <div className="rounded-2xl border bg-white p-6">
                Loading...
              </div>
            ) : (
              <AutomationStatus jobs={jobs} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}