import Link from "next/link";
import { Card } from "../../components/ui/card";
import { fetchCampaigns } from "../../src/lib/api";

const wizardSteps = [
  {
    title: "Campaign Info",
    description:
      "Name, objectives, hero message, target regions, brand guardrails.",
  },
  {
    title: "KPIs & Missions",
    description:
      "Define success metrics, short video missions, livestream cadence.",
  },
  {
    title: "Budget & Escrow",
    description: "Allocate V-Coin budget and lock escrow via Stripe Connect.",
  },
  {
    title: "Creator Brief",
    description:
      "Auto-personalize briefs, AI caption packs, and trend heatmaps.",
  },
];

export default async function CampaignsPage() {
  const campaigns = await fetchCampaigns();

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Campaign wizard</h2>
          <p className="text-sm text-slate-400">
            Launch new briefs, manage missions, and monitor KPI pacing in one
            control plane.
          </p>
        </div>
        <Link
          href="#"
          className="inline-flex items-center justify-center rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-ink-900 shadow-panel"
        >
          Create new campaign
        </Link>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {wizardSteps.map((step, index) => (
          <Card
            key={step.title}
            title={
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-300">
                Step {index + 1}
              </div>
            }
            className="border border-white/10 bg-surface-200/80"
          >
            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{step.description}</p>
          </Card>
        ))}
      </div>

      <Card title="Active Campaigns" className="border border-white/10">
        <div className="grid gap-4 lg:grid-cols-3">
          {campaigns.items.map((campaign) => (
            <div
              key={campaign.id}
              className="rounded-2xl border border-white/5 bg-ink-900/40 p-4"
            >
              <div className="text-xs uppercase tracking-[0.4em] text-slate-400">
                {campaign.type}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {campaign.name}
              </h3>
              <p className="mt-4 text-sm text-slate-400">
                Budget locked:{" "}
                <span className="font-semibold text-accent-400">
                  {campaign.budget_vcoin.toLocaleString()} V-Coin
                </span>
              </p>
              <button
                type="button"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-accent-500/40 bg-accent-500/10 px-4 py-2 text-sm font-semibold text-accent-400"
              >
                Open brief
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
