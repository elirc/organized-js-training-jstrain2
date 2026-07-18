import { EventEmitter } from "events";

type RedisSetOption = "PX" | "NX";

const bus = new EventEmitter();
const kv = new Map<string, { value: string; expiresAt?: number }>();

function cleanupExpired(): void {
  const now = Date.now();
  for (const [key, value] of kv.entries()) {
    if (value.expiresAt && value.expiresAt <= now) {
      kv.delete(key);
    }
  }
}

export class InMemoryRedis {
  private readonly subscriptions = new Set<string>();

  async set(
    key: string,
    value: string,
    option1?: RedisSetOption,
    option2?: number | RedisSetOption,
    option3?: RedisSetOption,
  ): Promise<"OK" | null> {
    cleanupExpired();

    const options = [option1, option2, option3];
    const nx = options.includes("NX");
    const px = options.includes("PX");
    const pxIndex = options.findIndex((item) => item === "PX");
    const ttlCandidate = pxIndex >= 0 ? options[pxIndex + 1] : undefined;
    const ttl = typeof ttlCandidate === "number" ? ttlCandidate : undefined;

    if (nx && kv.has(key)) {
      return null;
    }

    kv.set(key, { value, expiresAt: px && ttl ? Date.now() + ttl : undefined });
    return "OK";
  }

  async del(key: string): Promise<number> {
    cleanupExpired();
    return kv.delete(key) ? 1 : 0;
  }

  async publish(channel: string, payload: string): Promise<number> {
    bus.emit(channel, payload);
    return 1;
  }

  duplicate(): InMemoryRedis {
    return new InMemoryRedis();
  }

  async connect(): Promise<void> {
    return;
  }

  async subscribe(channel: string): Promise<void> {
    this.subscriptions.add(channel);
  }

  async unsubscribe(channel: string): Promise<void> {
    this.subscriptions.delete(channel);
  }

  on(event: "message", listener: (channel: string, payload: string) => void): this {
    if (event === "message") {
      for (const channel of this.subscriptions) {
        bus.on(channel, (payload: string) => listener(channel, payload));
      }
    }
    return this;
  }

  off(event: "message", listener: (channel: string, payload: string) => void): this {
    if (event === "message") {
      for (const channel of this.subscriptions) {
        bus.off(channel, (payload: string) => listener(channel, payload));
      }
    }
    return this;
  }

  async quit(): Promise<void> {
    return;
  }
}

export const redis = new InMemoryRedis();
export const redisSubscriber = new InMemoryRedis();
