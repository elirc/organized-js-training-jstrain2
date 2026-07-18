export default function WorkflowRunsPage({ params }: { params: { id: string } }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Run History</h1>
      <p className="mt-2 text-sm text-slate-600">Workflow ID: {params.id}</p>
    </section>
  );
}
