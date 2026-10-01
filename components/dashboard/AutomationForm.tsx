
"use client";

import { FormEvent, useState } from "react";
import { createAutomationJob } from "@/lib/api";

interface AutomationFormProps {
  onCreated?: () => void;
}

export default function AutomationForm({
  onCreated,
}: AutomationFormProps) {
  const [targetUrl, setTargetUrl] = useState("");
  const [durationSeconds, setDurationSeconds] = useState(30);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");

    if (!targetUrl.trim()) {
      setMessage("Please enter a URL.");
      return;
    }

    try {
      new URL(targetUrl);
    } catch {
      setMessage("Please enter a valid URL.");
      return;
    }

    try {
      setLoading(true);

      await createAutomationJob({
        targetUrl: targetUrl.trim(),
        durationSeconds,
      });

      setTargetUrl("");
      setMessage("Automation test started successfully.");

      onCreated?.();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Start Browser Test
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Enter a URL that you own or are authorized to test.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Target URL */}
        <div>
          <label
            htmlFor="targetUrl"
            className="mb-2 block text-sm font-medium"
          >
            Target URL
          </label>

          <input
            id="targetUrl"
            type="url"
            value={targetUrl}
            onChange={(event) => setTargetUrl(event.target.value)}
            placeholder="https://example.com/test-page"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="duration"
            className="mb-2 block text-sm font-medium"
          >
            Test duration
          </label>

          <select
            id="duration"
            value={durationSeconds}
            onChange={(event) =>
              setDurationSeconds(Number(event.target.value))
            }
            className="rounded-lg border px-4 py-3"
          >
            <option value={10}>10 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={60}>60 seconds</option>
            <option value={120}>120 seconds</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-6 py-3 font-medium text-white disabled:opacity-50"
        >
          {loading ? "Starting..." : "Run Test"}
        </button>

        {/* Message */}
        {message && (
          <p className="rounded-lg bg-gray-100 p-3 text-sm">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}