export function LiveRunIndicator({ active }: { active: boolean }) {
  return <span className={`inline-flex h-2 w-2 rounded-full ${active ? "bg-emerald-500" : "bg-slate-300"}`} />;
}
