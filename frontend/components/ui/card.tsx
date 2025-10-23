import clsx from "clsx";
import type { ReactNode } from "react";

type CardProps = {
  title?: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function Card({ title, action, className, children }: CardProps) {
  return (
    <section
      className={clsx(
        "rounded-3xl bg-surface-200/80 p-6 shadow-panel ring-1 ring-white/5 backdrop-blur",
        className
      )}
    >
      {(title || action) && (
        <header className="mb-5 flex items-center justify-between gap-2">
          {typeof title === "string" ? (
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300">
              {title}
            </h3>
          ) : (
            title
          )}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
};

const trendStyles: Record<NonNullable<MetricCardProps["trend"]>, string> = {
  up: "text-emerald-400",
  down: "text-rose-400",
  flat: "text-slate-300",
};

export function MetricCard({ label, value, delta, trend = "flat" }: MetricCardProps) {
  return (
    <Card className="space-y-3 border border-white/5 bg-gradient-to-br from-surface-200 to-surface-300">
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
        {label}
      </span>
      <div className="flex items-end gap-3">
        <span className="text-3xl font-semibold text-white">{value}</span>
        {delta && (
          <span className={clsx("text-xs font-medium", trendStyles[trend])}>
            {delta}
          </span>
        )}
      </div>
    </Card>
  );
}
