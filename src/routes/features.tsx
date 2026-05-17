import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Bot, Clock, Cpu, Gauge, Shield, Zap, Activity, Sparkles } from "lucide-react";

export const Route = createFileRoute("/features")({
  component: Features,
  head: () => ({
    meta: [
      { title: "Features — BlexbyAI MT5 Automation" },
      { name: "description", content: "Deep dive into BlexbyAI's MT5-native execution, adaptive risk management, multi-timeframe ML signals and 24/5 always-on terminal." },
    ],
  }),
});

const FEATURES = [
  { icon: Clock, color: "primary", title: "Reclaim your time", body: "Replace hours of chart-staring with bot execution. The market never sleeps — you should." },
  { icon: Bot, color: "accent-violet", title: "Emotion-free decisions", body: "Pure math, zero hesitation. Removes fear, greed, and FOMO from every trade." },
  { icon: Zap, color: "accent-pink", title: "MT5-native execution", body: "Direct socket integration with MetaTrader 5 — sub-millisecond order placement." },
  { icon: Cpu, color: "primary", title: "Multi-timeframe ML", body: "Pattern recognition across 1m/5m/30m/1h/4h confirmation logic on every pair, every tick." },
  { icon: Shield, color: "accent-violet", title: "Dynamic risk controls", body: "Volatility-adaptive stop-loss and take-profit. No more static SL eating your account." },
  { icon: Gauge, color: "accent-pink", title: "24/5 always-on", body: "Trades Asia, London, and NY sessions. Asleep, on a flight, in a meeting — it doesn't matter." },
  { icon: Sparkles, color: "primary", title: "Profit boosters", body: "Adaptive position scaling on Gold/Silver tiers — compounds winners safely without martingale." },
  { icon: Activity, color: "accent-pink", title: "Transparent telemetry", body: "Every trade logged with entry, SL, TP, confidence score, and timestamp. Full audit trail." },
];

function Features() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-5xl font-display font-bold mb-4">Everything the terminal does, <span className="gradient-text">automatically</span></h1>
            <p className="text-muted-foreground text-lg">A complete look at what BlexbyAI handles for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, color, title, body }) => (
              <div key={title} className="p-6 border border-border rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                <div className={`size-11 rounded-lg bg-${color}/10 flex items-center justify-center mb-4 text-${color}`}>
                  <Icon className="size-5" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/pricing" className="inline-flex px-7 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:brightness-110 transition-all">
              See Pricing
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
