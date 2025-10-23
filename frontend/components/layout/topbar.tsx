import Image from "next/image";
import clsx from "clsx";

const statusPills = [
  { label: "AI Highlight SLA", value: "38m avg", state: "positive" as const },
  { label: "Fraud Risk", value: "0.6%", state: "warning" as const },
  { label: "Live Streams", value: "4 active", state: "neutral" as const },
];

export function Topbar() {
  return (
    <header className="flex flex-col gap-6 border-b border-white/5 bg-surface-100/60 px-6 py-6 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
            Sponsor Command
          </p>
          <h2 className="text-xl font-semibold text-white">
            Galaxy S24 Launch - Control Room
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
        {statusPills.map((pill) => (
          <div
            key={pill.label}
            className={clsx(
              "inline-flex items-center gap-2 rounded-full px-3 py-2",
              pill.state === "positive" && "bg-emerald-500/10 text-emerald-300",
              pill.state === "warning" && "bg-amber-500/10 text-amber-300",
              pill.state === "neutral" && "bg-slate-500/10 text-slate-300"
            )}
          >
            <span className="font-medium uppercase tracking-[0.25em]">
              {pill.label}
            </span>
            <span className="font-semibold text-white">{pill.value}</span>
          </div>
        ))}

        <div className="ml-auto flex items-center gap-3">
          <div className="text-right">
            <span className="block text-sm font-semibold text-white">
              Ava Chen
            </span>
            <span className="text-xs text-slate-400">Sponsor Admin</span>
          </div>
          <Image
            src="https://i.pravatar.cc/64?img=47"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border border-white/20"
          />
        </div>
      </div>
    </header>
  );
}
