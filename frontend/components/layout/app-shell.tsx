"use client";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-surface-100 text-slate-100">
      <Sidebar />
      <div className="flex grow flex-col">
        <Topbar />
        <main className="flex-1 bg-gradient-to-br from-surface-100 to-ink-900/80 px-6 py-8">
          <div className="mx-auto max-w-6xl space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
