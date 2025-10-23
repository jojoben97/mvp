"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/campaigns", label: "Campaigns" },
  { href: "/live", label: "Creator Live" },
  { href: "/wallet", label: "Wallet" },
  { href: "/ai", label: "AI Insights" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col gap-6 border-r border-white/5 bg-surface-200/60 px-6 py-8 lg:flex">
      <div>
        <div className="text-xs uppercase tracking-[0.5em] text-slate-500">
          MVPX
        </div>
        <h1 className="mt-2 text-lg font-semibold text-white">Viral Engine</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "rounded-2xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-ink-700/80 text-white shadow-panel"
                  : "text-slate-400 hover:bg-ink-800/40 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 rounded-2xl border border-ink-800/80 bg-gradient-to-br from-ink-900 to-surface-200 p-4 text-xs text-slate-400">
        <p className="font-semibold text-white">Need a LIVE boost?</p>
        <p>Spin up multi-platform streams and auto-generate highlights with a single click.</p>
        <Link href="/live" className="inline-flex rounded-lg bg-accent-500 px-3 py-2 text-xs font-semibold text-ink-900">
          Launch Creator Live
        </Link>
      </div>
    </aside>
  );
}
