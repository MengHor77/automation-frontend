import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="max-w-2xl text-center">
        <p className="text-sm font-semibold text-blue-600">
          AUTOMATION BACKEND
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Browser Automation Dashboard
        </h1>

        <p className="mt-4 text-gray-600">
          Run controlled browser tests against websites and
          environments you own or are authorized to test.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-block rounded-lg bg-black px-6 py-3 font-medium text-white"
        >
          Open Dashboard
        </Link>
      </div>
    </main>
  );
}