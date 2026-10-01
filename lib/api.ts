import type {
  CreateAutomationJobRequest,
  CreateAutomationJobResponse,
} from "@/types/automation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function createAutomationJob(
  data: CreateAutomationJobRequest,
): Promise<CreateAutomationJobResponse> {
  const response = await fetch(`${API_URL}/api/automation/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.message || "Failed to create automation job",
    );
  }

  return response.json();
}

export async function getAutomationJobs() {
  const response = await fetch(`${API_URL}/api/automation/jobs`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load automation jobs");
  }

  return response.json();
}