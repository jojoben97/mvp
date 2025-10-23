import type { CreatorMission } from "@/lib/api";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";

type MissionTimelineProps = {
  missions: CreatorMission[];
};

const statusStyles: Record<string, string> = {
  pending: "border-slate-600 bg-slate-900/40 text-slate-300",
  in_progress: "border-amber-400/60 bg-amber-500/10 text-amber-100",
  submitted: "border-blue-400/60 bg-blue-500/10 text-blue-100",
  approved: "border-emerald-400/60 bg-emerald-500/10 text-emerald-100",
  rejected: "border-rose-400/60 bg-rose-500/10 text-rose-100",
};

function resolveStatus(status: string) {
  return statusStyles[status] ?? statusStyles.pending;
}

export function MissionTimeline({ missions }: MissionTimelineProps) {
  return (
    <ul className="space-y-4">
      {missions.map((mission) => (
        <li
          key={mission.id}
          className="flex items-start gap-4 rounded-2xl border border-white/5 bg-surface-200/80 p-4"
        >
          <div className="relative mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-accent-500 shadow-lg shadow-accent-500/30" />
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h4 className="text-sm font-semibold text-white">
                {mission.mission.title}
              </h4>
              <span
                className={clsx(
                  "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                  resolveStatus(mission.status)
                )}
              >
                {mission.status.replace("_", " ")}
              </span>
              {mission.due_at && (
                <span className="text-xs text-slate-400">
                  Due {formatDistanceToNow(new Date(mission.due_at), { addSuffix: true })}
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400">
              Reward:{" "}
              <span className="font-semibold text-accent-400">
                {mission.mission.reward_vcoin.toFixed(0)} V-Coin
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
