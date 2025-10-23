import { Card } from "../../components/ui/card";
import { fetchWallet } from "../../src/lib/api";

const payoutMethods = [
  { provider: "Stripe Connect", status: "Verified", account: "ACME HQ" },
  { provider: "PayPal Payouts", status: "Pending review", account: "finance@acme.com" },
];

export default async function WalletPage() {
  const wallet = await fetchWallet();

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-semibold text-white">V-Coin Wallet</h2>
        <p className="text-sm text-slate-400">
          Escrow balance, payout history, and ledger exports for finance ops.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <Card title="Available balance" className="border border-white/10 bg-surface-200/70">
          <p className="text-3xl font-semibold text-accent-400">
            {wallet.balance_vcoin.toLocaleString()} V-Coin
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">
            Ready to deploy
          </p>
        </Card>
        <Card title="Escrow locked" className="border border-white/10 bg-surface-200/70">
          <p className="text-3xl font-semibold text-white">
            {wallet.escrow_balance_vcoin.toLocaleString()} V-Coin
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">
            Protecting mission payouts
          </p>
        </Card>
        <Card title="Fiat conversion" className="border border-white/10 bg-surface-200/70">
          <p className="text-sm text-slate-200">
            Stripe Connect handles KYC, V-Coin is pegged 1:1 with USD, and payout
            requests auto-sync to finance Ops.
          </p>
          <button
            type="button"
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-accent-500 px-4 py-2 text-sm font-semibold text-ink-900"
          >
            Request payout
          </button>
        </Card>
      </section>

      <Card title="Ledger" className="border border-white/10">
        <div className="overflow-hidden rounded-2xl border border-white/5">
          <table className="min-w-full divide-y divide-white/5 text-sm text-slate-200">
            <thead className="bg-surface-200/60 text-left text-xs uppercase tracking-[0.3em] text-slate-400">
              <tr>
                <th className="px-6 py-3 font-semibold">Reference</th>
                <th className="px-6 py-3 font-semibold">Type</th>
                <th className="px-6 py-3 font-semibold">Amount</th>
                <th className="px-6 py-3 font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {wallet.transactions.map((transaction) => (
                <tr key={transaction.id} className="odd:bg-white/2 even:bg-white/5/10">
                  <td className="px-6 py-3">
                    <div className="font-semibold text-white">{transaction.reference_type}</div>
                    <div className="text-xs text-slate-400">{transaction.id}</div>
                  </td>
                  <td className="px-6 py-3 capitalize text-slate-300">{transaction.type}</td>
                  <td className="px-6 py-3 font-semibold text-accent-400">
                    {transaction.amount_vcoin.toFixed(2)} V-Coin
                  </td>
                  <td className="px-6 py-3 text-xs text-slate-400">
                    {new Date(transaction.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Payout Channels" className="border border-white/10">
        <ul className="grid gap-4 md:grid-cols-2">
          {payoutMethods.map((method) => (
            <li
              key={method.provider}
              className="rounded-2xl border border-white/5 bg-ink-900/50 p-4 text-sm text-slate-200"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{method.provider}</h3>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  {method.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-400">{method.account}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
