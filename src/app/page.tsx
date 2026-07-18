import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-700">Workflow Automation</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Build and run reliable automations with retries, queues, and live logs.</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          FlowPilot lets teams compose event-driven workflows, trigger them via webhooks or manually, and monitor each step in real time.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/dashboard" className="rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
            Open Dashboard
          </Link>
          <Link href="/dashboard/workflows/new" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
            New Workflow
          </Link>
        </div>
      </div>
    </section>
  );
}
