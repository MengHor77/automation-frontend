
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
      setLoading(true);

      const data = await getAutomationJobs();

      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Failed to load automation jobs:", error);
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
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Browser Automation Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Run controlled browser tests against authorized URLs.
          </p>
        </div>

        {/* =====================================================
            STATISTICS
        ===================================================== */}
        <StatsCards
          total={jobs.length}
          running={running}
          completed={completed}
          failed={failed}
        />

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* ===================================================
              START BROWSER TEST
          =================================================== */}
          <AutomationForm onCreated={loadJobs} />

          {/* ===================================================
              RECENT TESTS
          =================================================== */}
          <div>
            {loading ? (
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Tests
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Browser automation test history
                </p>

                <div className="mt-6 rounded-lg bg-gray-50 p-6 text-center text-gray-500">
                  Loading...
                </div>
              </section>
            ) : (
              <AutomationStatus jobs={jobs} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
