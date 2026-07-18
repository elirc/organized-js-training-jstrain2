"use client";

import { useEffect, useState } from "react";

interface RunEvent {
  event: string;
  status?: string;
  [key: string]: unknown;
}

export function useRunStream(runId: string) {
  const [events, setEvents] = useState<RunEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const source = new EventSource(`/api/events/stream?runId=${encodeURIComponent(runId)}`);

    source.onopen = () => {
      setIsConnected(true);
    };

    source.onmessage = (message) => {
      try {
        const parsed = JSON.parse(message.data) as RunEvent;
        setEvents((prev) => [...prev, parsed]);
      } catch {
        // no-op
      }
    };

    source.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      source.close();
      setIsConnected(false);
    };
  }, [runId]);

  return { events, isConnected };
}
