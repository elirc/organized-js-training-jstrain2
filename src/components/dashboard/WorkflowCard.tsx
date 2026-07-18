import { RunStatusBadge } from "@/components/runs/RunStatusBadge";

export function WorkflowCard({ name, status }: { name: string; status: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-medium">{name}</p>
      <div className="mt-2">
        <RunStatusBadge status={status} />
      </div>
    </div>
  );
}
