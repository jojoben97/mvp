import type { StreamDetail } from "@/lib/api";

type StreamFeedProps = {
  streams: StreamDetail[];
};

export function StreamFeed({ streams }: StreamFeedProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {streams.map((stream) => (
        <article
          key={stream.id}
          className="space-y-3 rounded-2xl border border-white/5 bg-surface-200/80 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {stream.platform}
              </p>
              <h4 className="text-base font-semibold text-white">
                Stream {stream.id}
              </h4>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              {stream.status}
            </span>
          </div>
          <div className="text-xs text-slate-400">
            {stream.started_at
              ? `Started ${new Date(stream.started_at).toLocaleTimeString()}`
              : "Scheduled"}
          </div>
          <div className="rounded-xl border border-white/5 bg-ink-800/40 p-3 text-xs text-slate-300">
            Highlights ready:{" "}
            <span className="font-semibold text-white">
              {stream.ai_highlights.length}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
