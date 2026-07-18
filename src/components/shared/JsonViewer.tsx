"use client";

export function JsonViewer({ value }: { value: unknown }) {
  return <pre className="overflow-auto rounded-md bg-slate-900 p-3 text-xs text-slate-100">{JSON.stringify(value, null, 2)}</pre>;
}
