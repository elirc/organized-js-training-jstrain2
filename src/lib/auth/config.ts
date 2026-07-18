import { auth } from "@/auth";

export async function requireSession() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function resolveTenantId(_userId: string): Promise<string | null> {
  return process.env.DEFAULT_TENANT_ID ?? null;
}
