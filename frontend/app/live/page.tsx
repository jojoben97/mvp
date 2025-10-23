import { Card } from "../../components/ui/card";
import { fetchStreams } from "../../src/lib/api";

const checklist = [
  "RTMP ingest: connect OBS, Streamlabs, or hardware encoder.",
  "Simulcast: sync Facebook, Instagram, YouTube, TikTok credentials.",
  "Latency monitor: < 3.2s average with adaptive bitrate enabled.",
  "Auto-highlight: AI clips ready within 38 minutes SLA.",
];

export default async function LiveControlPage() {
  const streams = await fetchStreams();

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-semibold text-white">Creator Live Control</h2>
        <p className="text-sm text-slate-400">
          Monitor ingest, health, and highlight generation across every live activation.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card title="Live Checklist" className="lg:col-span-2 border border-white/10">
          <ul className="space-y-3 text-sm text-slate-200">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/5 bg-ink-900/50 p-3"
              >
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent-500" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card
          title="Mux ingest summary"
          className="border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900"
        >
          <div className="space-y-2 text-sm text-slate-200">
            <p>RTMP endpoints provisioned: <strong className="text-white">12</strong></p>
            <p>Average bitrate: <strong className="text-accent-400">4.4 Mbps</strong></p>
            <p>Fallback WebRTC sessions: <strong className="text-white">2</strong></p>
            <p>AI highlight coverage: <strong className="text-white">92%</strong></p>
          </div>
        </Card>
      </section>

      <Card title="Live Sessions" className="border border-white/10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {streams.items.map((stream) => (
            <div
              key={stream.id}
              className="rounded-2xl border border-white/5 bg-ink-900/50 p-4 text-sm text-slate-200"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{stream.id}</h3>
                <span className="rounded-full bg-accent-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-400">
                  {stream.status}
                </span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">
                {stream.platform}
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Linked campaign:{" "}
                <span className="font-semibold text-white">
                  {stream.campaign_id ?? "Unassigned"}
                </span>
              </p>
              <div className="mt-4 space-y-2 rounded-xl border border-white/5 bg-surface-200/50 p-3 text-xs">
                <p>
                  Highlights ready:{" "}
                  <span className="font-semibold text-white">
                    {stream.ai_highlights.length}
                  </span>
                </p>
                <p>Latency guard: <span className="font-semibold text-emerald-300">&lt; 3.5s</span></p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
