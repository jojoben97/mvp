import {
  fetchCampaigns,
  fetchCreatorDashboard,
  fetchStreams,
} from "../../src/lib/api";
import { MetricCard, Card } from "../../components/ui/card";
import { Sparkline } from "../../components/charts/sparkline";
import { MissionTimeline } from "../../components/dashboard/mission-timeline";
import { LeaderboardTable } from "../../components/dashboard/leaderboard-table";
import { StreamFeed } from "../../components/dashboard/stream-feed";

export default async function DashboardPage() {
  const [campaigns, streams, creatorDashboard] = await Promise.all([
    fetchCampaigns(),
    fetchStreams(),
    fetchCreatorDashboard(),
  ]);

  const totalHighlights = streams.items.reduce(
    (acc, stream) => acc + stream.ai_highlights.length,
    0
  );

  const activeStreams = streams.items.filter(
    (stream) => stream.status === "live"
  ).length;

  const missionCompletionRate =
    creatorDashboard.missions.length > 0
      ? Math.round(
          (creatorDashboard.missions.filter(
            (mission) => mission.status === "approved"
          ).length /
            creatorDashboard.missions.length) *
            100
        )
      : 0;

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="GMV - Last 7 Days"
          value={`$${(campaigns.items.length * 18_500).toLocaleString()}`}
          delta="+12.4%"
          trend="up"
        />
        <MetricCard
          label="AI Highlights Generated"
          value={totalHighlights.toString()}
          delta="+38 clips"
          trend="up"
        />
        <MetricCard
          label="Active Streams"
          value={activeStreams.toString()}
          delta="95% success"
          trend="up"
        />
        <MetricCard
          label="Mission Completion"
          value={`${missionCompletionRate}%`}
          delta="-3% vs target"
          trend={missionCompletionRate >= 80 ? "up" : "down"}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card
          title="Campaign Pulse"
          className="xl:col-span-2 border border-white/10 bg-surface-200/70"
          action={
            <span className="rounded-full bg-accent-500/20 px-3 py-1 text-xs font-semibold text-accent-400">
              Live sync enabled
            </span>
          }
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h4 className="text-lg font-semibold text-white">
                Viral velocity
              </h4>
              <p className="mt-2 text-sm text-slate-400">
                Monitoring aggregate engagement rate across sponsored clips on
                TikTok, Instagram Reels, and YouTube Shorts.
              </p>
              <div className="mt-6 rounded-2xl border border-white/5 bg-ink-900/40 p-4">
                <Sparkline values={[4, 6, 5, 9, 13, 15, 19, 24, 29, 32]} />
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>+212% week-over-week</span>
                  <span>Real-time feed</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/5 bg-ink-900/40 p-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
                AI signals
              </h4>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="rounded-xl border border-white/5 bg-surface-200/60 p-3">
                  Top clip: <strong className="text-white">Creator 001</strong> —
                  Watch time +38% vs cohort
                </li>
                <li className="rounded-xl border border-white/5 bg-surface-200/60 p-3">
                  Fraud shield: suspicious click farm detected in{" "}
                  <strong className="text-amber-300">Campaign cmp_004</strong>
                </li>
                <li className="rounded-xl border border-white/5 bg-surface-200/60 p-3">
                  Trend alert: #ZeroLagChallenge trending in MY/SG clusters
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Card title="Creator Mission Timeline" className="border border-white/10">
          <MissionTimeline missions={creatorDashboard.missions} />
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card title="Campaign Leaderboard" className="border border-white/10">
          <LeaderboardTable campaigns={campaigns.items} />
        </Card>
        <Card title="Live Stream Feed" className="border border-white/10">
          <StreamFeed streams={streams.items} />
        </Card>
      </section>
    </div>
  );
}
