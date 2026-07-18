export type TriggerType = "manual" | "webhook" | "schedule";

export interface Workflow {
  id: string;
  tenantId: string;
  createdBy: string | null;
  name: string;
  description: string | null;
  triggerType: TriggerType;
  triggerConfig: Record<string, unknown>;
  isActive: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowListItem {
  id: string;
  name: string;
  triggerType: TriggerType;
  isActive: boolean;
  version: number;
  updatedAt: string;
}
