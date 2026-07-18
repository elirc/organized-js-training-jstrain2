"use client";

import { create } from "zustand";

export type BuilderStepType = "http_request" | "transform" | "condition" | "delay" | "webhook_send" | "loop";

export interface BuilderStep {
  id: string;
  name: string;
  stepType: BuilderStepType;
  config: Record<string, unknown>;
}

interface WorkflowBuilderState {
  steps: BuilderStep[];
  selectedStepId: string | null;
  zoom: number;
  addStep: (stepType: BuilderStepType) => void;
  selectStep: (id: string | null) => void;
  updateStepConfig: (id: string, config: Record<string, unknown>) => void;
}

export const useWorkflowBuilderStore = create<WorkflowBuilderState>((set) => ({
  steps: [],
  selectedStepId: null,
  zoom: 1,
  addStep: (stepType) =>
    set((state) => {
      const id = crypto.randomUUID();
      const step: BuilderStep = {
        id,
        name: `${stepType.replace("_", " ")} ${state.steps.length + 1}`,
        stepType,
        config: {},
      };

      return {
        steps: [...state.steps, step],
        selectedStepId: id,
      };
    }),
  selectStep: (id) => set({ selectedStepId: id }),
  updateStepConfig: (id, config) =>
    set((state) => ({
      steps: state.steps.map((step) => (step.id === id ? { ...step, config } : step)),
    })),
}));
