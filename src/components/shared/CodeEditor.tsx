"use client";

export function CodeEditor({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-[220px] w-full rounded-md border border-slate-300 p-2 font-mono text-xs"
    />
  );
}
