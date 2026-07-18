import { RunTimeline } from "@/components/runs/RunTimeline";

export default function RunDetailPage({ params }: { params: { id: string; runId: string } }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Run Detail</h1>
      <p className="mt-2 text-sm text-slate-600">
        Workflow {params.id} / Run {params.runId}
      </p>
      <RunTimeline runId={params.runId} />
    </section>
  );
}
