import type { CampaignSummary } from "@/lib/api";

type LeaderboardTableProps = {
  campaigns: CampaignSummary[];
};

const mockPerformance = ["132 clips", "96 clips", "54 clips", "38 clips"];

export function LeaderboardTable({ campaigns }: LeaderboardTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/5 bg-surface-200/70">
      <table className="min-w-full divide-y divide-white/5 text-sm">
        <thead className="bg-surface-200/50 text-left text-xs uppercase tracking-[0.4em] text-slate-400">
          <tr>
            <th className="px-6 py-4 font-semibold">Campaign</th>
            <th className="px-6 py-4 font-semibold">Type</th>
            <th className="px-6 py-4 font-semibold">Budget</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Highlights</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-slate-200">
          {campaigns.map((campaign, index) => (
            <tr key={campaign.id} className="odd:bg-white/2 even:bg-white/0">
              <td className="px-6 py-4">
                <div className="font-semibold text-white">{campaign.name}</div>
                <div className="text-xs text-slate-400">
                  {campaign.start_at ? new Date(campaign.start_at).toLocaleDateString() : "Pending"}
                </div>
              </td>
              <td className="px-6 py-4 capitalize text-slate-300">
                {campaign.type.replace("_", " ")}
              </td>
              <td className="px-6 py-4 font-semibold text-accent-400">
                {campaign.budget_vcoin.toLocaleString()} V-Coin
              </td>
              <td className="px-6 py-4 capitalize text-slate-300">
                {campaign.status}
              </td>
              <td className="px-6 py-4 text-slate-200">
                {mockPerformance[index % mockPerformance.length]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
