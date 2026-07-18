"use client";

import type { BuilderStep } from "@/stores/workflow-builder.store";

export function StepNode({
  step,
  active,
  onSelect,
}: {
  step: BuilderStep;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-lg border px-3 py-2 text-left ${
        active ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-slate-50"
      }`}
    >
      <p className="text-sm font-medium">{step.name}</p>
      <p className="text-xs uppercase tracking-wide text-slate-500">{step.stepType}</p>
    </button>
  );
}
