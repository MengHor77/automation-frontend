
export interface AutomationJob {
  id: string;
  targetUrl: string;
  status: "pending" | "running" | "completed" | "failed";
  startedAt?: string;
  completedAt?: string;
  message?: string;
}

export interface CreateAutomationJobRequest {
  targetUrl: string;
  durationSeconds: number;
}

export interface CreateAutomationJobResponse {
  success: boolean;
  job: AutomationJob;
}
