import { NextRequest } from "next/server";
import { redisSubscriber } from "@/lib/queue/connection";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const runId = request.nextUrl.searchParams.get("runId");
  const workflowId = request.nextUrl.searchParams.get("workflowId");
  const channel = runId ? `flowpilot:runs:${runId}` : workflowId ? `flowpilot:workflows:${workflowId}` : "flowpilot:broadcast";

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const subscriber = redisSubscriber.duplicate();
      await subscriber.connect();
      await subscriber.subscribe(channel);

      const onMessage = (_channel: string, payload: string) => {
        controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
      };

      subscriber.on("message", onMessage);

      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event: "connected" })}\n\n`));

      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(`event: ping\ndata: ${Date.now()}\n\n`));
      }, 15000);

      request.signal.addEventListener("abort", async () => {
        clearInterval(heartbeat);
        subscriber.off("message", onMessage);
        await subscriber.unsubscribe(channel);
        await subscriber.quit();
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
