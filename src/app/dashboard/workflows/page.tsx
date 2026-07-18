import Link from "next/link";

export default function WorkflowsPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Workflows</h1>
        <Link href="/dashboard/workflows/new" className="rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white">
          Create
        </Link>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Workflow listing is served from <code>/api/workflows</code> with cursor pagination.
      </div>
    </section>
  );
}
