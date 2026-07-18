import Link from "next/link";

export default function DashboardPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Link href="/dashboard/workflows/new" className="rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white">
          New Workflow
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Runs today</p>
          <p className="text-2xl font-semibold">0</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Success rate</p>
          <p className="text-2xl font-semibold">0%</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Dead letters</p>
          <p className="text-2xl font-semibold">0</p>
        </div>
      </div>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
        <p className="font-medium">Open workflows</p>
        <Link href="/dashboard/workflows" className="mt-2 inline-block text-sm text-brand-700">
          View workflow list
        </Link>
      </div>
    </section>
  );
}
