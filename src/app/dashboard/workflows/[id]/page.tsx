import { WorkflowBuilderShell } from "@/components/workflow-builder/Canvas";

export default function WorkflowDetailPage({ params }: { params: { id: string } }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Workflow Builder</h1>
      <WorkflowBuilderShell workflowId={params.id} />
    </section>
  );
}
