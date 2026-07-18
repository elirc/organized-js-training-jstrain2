import crypto from "crypto";
import { hmacSha256 } from "@/lib/utils/crypto";

export function signPayload(payload: string, secret: string): string {
  return hmacSha256(payload, secret);
}

export function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expected = signPayload(payload, secret);
  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(signature, "utf8");

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}
