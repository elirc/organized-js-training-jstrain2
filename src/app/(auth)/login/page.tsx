"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("test@flowpilot.dev");
  const [password, setPassword] = useState("password123");

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="text-sm text-slate-600">Use seeded credentials to access protected APIs.</p>
      <form className="rounded-xl border border-slate-200 bg-white p-6">
        <label className="mb-3 block text-sm font-medium">Email</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <label className="mb-3 block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <p className="mt-3 text-xs text-slate-500">Auth routes are wired at `/api/auth/[...nextauth]`.</p>
      </form>
    </section>
  );
}
