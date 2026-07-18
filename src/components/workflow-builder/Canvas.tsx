"use client";

import { useWorkflowBuilderStore } from "@/stores/workflow-builder.store";
import { ToolboxSidebar } from "@/components/workflow-builder/ToolboxSidebar";
import { StepConfigPanel } from "@/components/workflow-builder/StepConfigPanel";
import { StepNode } from "@/components/workflow-builder/StepNode";

export function WorkflowBuilderShell({ workflowId }: { workflowId: string | null }) {
  const { steps, addStep, selectedStepId, selectStep } = useWorkflowBuilderStore();

  return (
    <div className="grid min-h-[560px] grid-cols-1 gap-4 lg:grid-cols-[220px_1fr_320px]">
      <ToolboxSidebar onAdd={addStep} />
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          {workflowId ? `Editing ${workflowId}` : "New workflow"}
        </p>
        <div className="space-y-2">
          {steps.length === 0 ? (
            <p className="text-sm text-slate-500">Add a step from the toolbox.</p>
          ) : (
            steps.map((step) => (
              <StepNode
                key={step.id}
                step={step}
                active={step.id === selectedStepId}
                onSelect={() => selectStep(step.id)}
              />
            ))
          )}
        </div>
      </div>
      <StepConfigPanel />
    </div>
  );
}

export default WorkflowBuilderShell;
