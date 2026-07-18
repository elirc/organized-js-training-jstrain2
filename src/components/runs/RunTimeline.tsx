"use client";

import { useRunStream } from "@/hooks/useRunStream";
import { RunStatusBadge } from "@/components/runs/RunStatusBadge";

export function RunTimeline({ runId }: { runId: string }) {
  const { events, isConnected } = useRunStream(runId);

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Timeline</h2>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${isConnected ? "bg-emerald-500" : "bg-rose-500"}`} />
          <span className="text-xs text-slate-500">{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>
      <div className="space-y-2">
        {events.length === 0 ? <p className="text-sm text-slate-500">No events yet.</p> : null}
        {events.map((event, idx) => (
          <div key={`${event.event}-${idx}`} className="flex items-center justify-between rounded-md border border-slate-200 p-2 text-sm">
            <span>{event.event}</span>
            <RunStatusBadge status={event.status ?? "pending"} />
          </div>
        ))}
      </div>
    </div>
  );
}
