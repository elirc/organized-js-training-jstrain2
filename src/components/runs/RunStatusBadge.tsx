const styleByStatus: Record<string, string> = {
  pending: "bg-slate-100 text-slate-700",
  running: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  failed: "bg-rose-100 text-rose-700",
  retrying: "bg-amber-100 text-amber-700",
  dead_letter: "bg-orange-100 text-orange-700",
};

export function RunStatusBadge({ status }: { status: string }) {
  return <span className={`rounded-full px-2 py-1 text-xs ${styleByStatus[status] ?? styleByStatus.pending}`}>{status}</span>;
}
