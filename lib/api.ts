
import type {
  CreateAutomationJobRequest,
  CreateAutomationJobResponse,
} from "@/types/automation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ============================================================
// CREATE AUTOMATION JOB
// ============================================================

export async function createAutomationJob(
  data: CreateAutomationJobRequest,
): Promise<CreateAutomationJobResponse> {
  const response = await fetch(
    `${API_URL}/api/automation/jobs`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Failed to create automation job (${response.status}): ${errorText}`,
    );
  }

  return response.json();
}

// ============================================================
// GET AUTOMATION JOBS
// ============================================================

export async function getAutomationJobs() {
  const response = await fetch(
    `${API_URL}/api/automation/jobs`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Failed to load automation jobs (${response.status}): ${errorText}`,
    );
  }

  return response.json();
}