"use client";

type StepType = "http_request" | "transform" | "condition" | "delay" | "webhook_send" | "loop";

const toolbox: Array<{ label: string; stepType: StepType }> = [
  { label: "HTTP Request", stepType: "http_request" },
  { label: "Transform", stepType: "transform" },
  { label: "Condition", stepType: "condition" },
  { label: "Delay", stepType: "delay" },
  { label: "Webhook Send", stepType: "webhook_send" },
  { label: "Loop", stepType: "loop" },
];

export function ToolboxSidebar({
  onAdd,
}: {
  onAdd: (stepType: StepType) => void;
}) {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="mb-3 text-sm font-semibold">Toolbox</h2>
      <div className="space-y-2">
        {toolbox.map((item) => (
          <button
            key={item.stepType}
            type="button"
            onClick={() => onAdd(item.stepType)}
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm"
          >
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
