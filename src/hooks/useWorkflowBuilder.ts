"use client";

import { useMemo } from "react";
import { useWorkflowBuilderStore } from "@/stores/workflow-builder.store";

export function useWorkflowBuilder() {
  const store = useWorkflowBuilderStore();

  return useMemo(
    () => ({
      steps: store.steps,
      selectedStepId: store.selectedStepId,
      addStep: store.addStep,
      selectStep: store.selectStep,
      updateStepConfig: store.updateStepConfig,
    }),
    [store],
  );
}
