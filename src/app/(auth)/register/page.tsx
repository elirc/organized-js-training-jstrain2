"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold">Register</h1>
      <form className="rounded-xl border border-slate-200 bg-white p-6">
        <label className="mb-3 block text-sm font-medium">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        <label className="mb-3 block text-sm font-medium">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        <label className="mb-3 block text-sm font-medium">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        <p className="mt-3 text-xs text-slate-500">Registration endpoint can be added as API extension.</p>
      </form>
    </section>
  );
}
