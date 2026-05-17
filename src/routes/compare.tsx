import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/compare")({
  component: Compare,
  head: () => ({
    meta: [
      { title: "Why BlexbyAI vs other bots — Comparison" },
      { name: "description", content: "Head-to-head comparison: BlexbyAI's MT5-native execution vs generic trading bots." },
    ],
  }),
});

const ROWS = [
  ["MT5 native execution", true, false],
  ["Sub-millisecond latency", true, false],
  ["Dynamic, volatility-aware SL/TP", true, false],
  ["Multi-timeframe ML pattern recognition", true, false],
  ["Cloud-independent (runs on your terminal)", true, false],
  ["No emotional trading decisions", true, true],
  ["Adaptive profit boosters", true, false],
  ["Transparent risk disclosures", true, false],
  ["Replaces 8 hours/day of manual analysis", true, false],
  ["Actually delivers consistent execution", true, false],
];

function Compare() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-16 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-display font-bold mb-4">Built to actually <span className="gradient-text">work</span></h1>
            <p className="text-muted-foreground text-lg">Most bots are dashboards in disguise. Here's the real comparison.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card/50">
            <table className="w-full text-left">
              <thead className="bg-white/[0.03] border-b border-border">
                <tr>
                  <th className="p-5 font-mono text-xs uppercase text-muted-foreground">Capability</th>
                  <th className="p-5 font-display font-bold text-primary text-center">BlexbyAI</th>
                  <th className="p-5 font-display font-bold text-muted-foreground text-center">Typical bot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {ROWS.map(([k, a, b], i) => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="p-5 text-foreground/90">{k as string}</td>
                    <td className="p-5 text-center">{a ? <Check className="size-5 text-primary mx-auto" /> : <X className="size-5 text-destructive mx-auto" />}</td>
                    <td className="p-5 text-center">{b ? <Check className="size-5 text-muted-foreground mx-auto" /> : <X className="size-5 text-destructive mx-auto" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
