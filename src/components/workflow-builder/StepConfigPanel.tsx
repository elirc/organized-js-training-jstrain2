"use client";

import { useMemo } from "react";
import { useWorkflowBuilderStore } from "@/stores/workflow-builder.store";

export function StepConfigPanel() {
  const { steps, selectedStepId, updateStepConfig } = useWorkflowBuilderStore();
  const selected = useMemo(() => steps.find((item) => item.id === selectedStepId), [steps, selectedStepId]);

  if (!selected) {
    return (
      <aside className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">Select a step to configure it.</aside>
    );
  }

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-sm font-semibold">Step Config</h2>
      <p className="mt-1 text-xs text-slate-500">{selected.name}</p>
      <textarea
        className="mt-3 min-h-[180px] w-full rounded-md border border-slate-300 p-2 text-xs font-mono"
        value={JSON.stringify(selected.config, null, 2)}
        onChange={(event) => {
          try {
            const parsed = JSON.parse(event.target.value) as Record<string, unknown>;
            updateStepConfig(selected.id, parsed);
          } catch {
            // keep editor editable during invalid JSON
          }
        }}
      />
    </aside>
  );
}
