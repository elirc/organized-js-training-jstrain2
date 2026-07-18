import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { AppProviders } from "@/components/shared/AppProviders";

export const metadata: Metadata = {
  title: "FlowPilot",
  description: "Job queue and workflow automation platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <AppProviders>
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-lg font-semibold text-brand-700">
                FlowPilot
              </Link>
              <nav className="flex items-center gap-4 text-sm text-slate-600">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/settings">Settings</Link>
                <Link href="/login">Login</Link>
              </nav>
            </div>
          </header>
          <main>{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
