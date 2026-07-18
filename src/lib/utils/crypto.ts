import crypto from "crypto";

export function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function hmacSha256(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function randomSecret(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("hex");
}

export function truncatePayload(input: string, maxBytes = 1024): string {
  return Buffer.byteLength(input, "utf8") > maxBytes ? `${input.slice(0, maxBytes)}...` : input;
}

export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, "flowpilot-salt", 64, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(derivedKey.toString("hex"));
    });
  });
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const nextHash = await hashPassword(password);
  const expected = Buffer.from(hash, "hex");
  const actual = Buffer.from(nextHash, "hex");

  if (expected.length !== actual.length) {
    return false;
  }

  return crypto.timingSafeEqual(expected, actual);
}
