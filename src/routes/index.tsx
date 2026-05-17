import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TIERS } from "@/lib/tiers";
import hero from "@/assets/hero-robot.jpg";
import appDashboard from "@/assets/app-dashboard.png";
import appMarkets from "@/assets/app-markets.png";
import appPnl from "@/assets/app-pnl.png";
import appTrade from "@/assets/app-trade.png";
import { Activity, Bot, Clock, Cpu, Gauge, Shield, Zap, AlertTriangle, Check, X, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BlexbyAI — Automation Meets Precision" },
      { name: "description", content: "Official automated trading terminal for MetaTrader 5. Replace hours of manual chart analysis with millisecond execution. 4 tiers from $3.99/mo." },
    ],
  }),
});

const TABS = [
  { id: "markets", label: "Live Markets", img: appMarkets },
  { id: "dashboard", label: "Dashboard", img: appDashboard },
  { id: "trade", label: "Trade Card", img: appTrade },
  { id: "pnl", label: "P&L Tracker", img: appPnl },
];

function Index() {
  const [tab, setTab] = useState(TABS[0].id);
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* HERO */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl aspect-square bg-primary/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              MT5 TERMINAL · LIVE
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.05] text-balance mb-6">
              Automation Meets <span className="gradient-text">Precision</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed">
              Stop burning hours on manual chart analysis. BlexbyAI executes with mathematical certainty on MetaTrader 5, around the clock.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/auth" className="px-7 py-3.5 bg-foreground text-background font-semibold rounded-xl hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
                Get Started <ChevronRight className="size-4" />
              </Link>
              <Link to="/pricing" className="px-7 py-3.5 border border-border bg-white/5 font-semibold rounded-xl hover:bg-white/10 transition-all">
                View Pricing
              </Link>
            </div>
            <div className="mt-10 flex gap-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <div><span className="text-primary font-bold text-lg block font-display">0.04ms</span> Latency</div>
              <div><span className="text-accent-pink font-bold text-lg block font-display">99.9%</span> Uptime</div>
              <div><span className="text-accent-violet font-bold text-lg block font-display">24/5</span> Active</div>
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:200ms]">
            <div className="gradient-border overflow-hidden scan-effect bg-card">
              <img src={hero} alt="BlexbyAI trading robot" className="w-full aspect-[4/3] object-cover" width={1280} height={960} />
            </div>
            <div className="absolute -bottom-6 -left-6 gradient-border p-4 bg-background/90 backdrop-blur-md w-[180px]">
              <div className="text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-tighter">Net Equity</div>
              <div className="text-2xl font-display font-bold text-primary">$9,857</div>
            </div>
            <div className="absolute -top-6 -right-6 gradient-border p-4 bg-background/90 backdrop-blur-md w-[180px]">
              <div className="text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-tighter">Today P&L</div>
              <div className="text-2xl font-display font-bold text-accent-pink">+$152.28</div>
            </div>
          </div>
        </div>
      </section>

      {/* MT5 CRITICAL BAR */}
      <section className="border-y border-destructive/30 bg-destructive/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center gap-4 justify-center text-center">
          <AlertTriangle className="size-5 text-destructive shrink-0" />
          <p className="text-sm text-destructive/90">
            <span className="font-bold">MT5-ONLY:</span> BlexbyAI works exclusively with brokers that support MetaTrader 5. If your broker has no MT5, the app will not be accessible.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-4">The benefits of automation</h2>
            <p className="text-muted-foreground">Manual trading drains time, focus, and discipline. BlexbyAI does the work — so you don't have to.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Clock, color: "primary", title: "Reclaim your hours", body: "Stop the 8-hour daily grind of chart monitoring. The bot watches every candle so you can focus on strategy and life." },
              { icon: Bot, color: "accent-violet", title: "No emotion, just logic", body: "Fear, greed, FOMO — eliminated. BlexbyAI executes on math, not mood, and never hesitates on a signal." },
              { icon: Zap, color: "accent-pink", title: "MT5-native speed", body: "Direct MetaTrader 5 integration means sub-millisecond execution. No web scraping, no proxy latency." },
              { icon: Cpu, color: "primary", title: "Replaces chart analysis", body: "Multi-timeframe pattern recognition runs across every pair, every second. What takes you an hour takes the bot 40ms." },
              { icon: Shield, color: "accent-violet", title: "Dynamic risk controls", body: "Adaptive stop-loss and take-profit that respond to volatility — not the static SL most bots ship with." },
              { icon: Gauge, color: "accent-pink", title: "24/5 always-on", body: "The market doesn't sleep. Neither does the bot. Trade Asia, London, and NY sessions without staying up." },
            ].map(({ icon: Icon, color, title, body }) => (
              <div key={title} className="p-7 border border-border rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                <div className={`size-11 rounded-lg bg-${color}/10 flex items-center justify-center mb-5 text-${color}`}>
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP PREVIEW WITH TABS */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-4">
              Market analysis, <span className="gradient-text">reimagined</span>
            </h2>
            <p className="text-muted-foreground">A real glimpse into the terminal. Indicators, P&L, and trade execution — all in one cockpit.</p>
          </div>

          {/* segmented tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-background border border-border rounded-xl">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                    tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="gradient-border p-2 bg-card shadow-2xl shadow-primary/10 max-w-5xl mx-auto">
            <img
              key={active.id}
              src={active.img}
              alt={`BlexbyAI ${active.label} preview`}
              loading="lazy"
              width={1600}
              height={1000}
              className="w-full rounded-lg animate-fade-up"
            />
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">Other bots talk. <span className="gradient-text">BlexbyAI delivers.</span></h2>
            <p className="text-muted-foreground">Most bots are dashboards in disguise. We benchmarked head-to-head.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card/50">
            <table className="w-full text-left">
              <thead className="bg-white/[0.03] border-b border-border">
                <tr>
                  <th className="p-5 font-mono text-xs uppercase text-muted-foreground">Capability</th>
                  <th className="p-5 font-display font-bold text-primary">BlexbyAI</th>
                  <th className="p-5 font-display font-bold text-muted-foreground">Typical Bots</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {[
                  ["Execution latency", "<1ms (MT5 native)", "~150ms (web proxy)"],
                  ["Risk management", "Dynamic multi-layer", "Fixed static SL"],
                  ["Pattern recognition", "Multi-timeframe ML", "Single RSI cross"],
                  ["Live broker integration", "Direct MT5 socket", "API polling"],
                  ["Profit booster logic", "Adaptive volatility-aware", "Fixed % targets"],
                  ["Actually works", true, false],
                ].map(([k, a, b], i) => (
                  <tr key={i}>
                    <td className="p-5 text-foreground/90">{k as string}</td>
                    <td className="p-5 font-mono">
                      {typeof a === "boolean" ? <Check className="size-5 text-primary" /> : <span className="text-primary">{a as string}</span>}
                    </td>
                    <td className="p-5 font-mono text-muted-foreground">
                      {typeof b === "boolean" ? <X className="size-5 text-destructive" /> : (b as string)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Choose your edge</h2>
            <p className="text-muted-foreground">Four tiers — every trader, every budget.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIERS.map((t) => (
              <div
                key={t.id}
                className={`p-7 rounded-2xl flex flex-col ${
                  t.highlight ? "gradient-border bg-card scale-[1.02] shadow-2xl shadow-primary/10" : "border border-border bg-white/[0.03]"
                }`}
              >
                {t.highlight && <div className="inline-block px-2 py-0.5 rounded bg-primary text-[10px] font-bold text-primary-foreground uppercase mb-3 self-start">Most popular</div>}
                <div className="text-xs font-mono uppercase text-muted-foreground mb-2">{t.tagline}</div>
                <div className="font-display text-lg font-bold mb-2">{t.name}</div>
                <div className="text-4xl font-display font-bold mb-5">${t.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                <ul className="space-y-2.5 text-sm text-muted-foreground mb-6 flex-grow">
                  {t.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex gap-2"><Check className={`size-4 shrink-0 mt-0.5 ${t.highlight ? "text-primary" : "text-muted-foreground"}`} />{f}</li>
                  ))}
                </ul>
                <Link
                  to="/pricing"
                  className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    t.highlight ? "bg-primary text-primary-foreground hover:brightness-110" : "border border-border hover:bg-white/5"
                  }`}
                >
                  {t.highlight ? "Unlock Gold" : "Choose plan"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISK DISCLAIMER */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto p-6 border border-border bg-white/[0.03] rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="size-4 text-accent-pink" />
            <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Risk disclosure</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Trading financial instruments carries significant risk. <span className="text-foreground font-medium">There is no reward without risk.</span> BlexbyAI is a tool to assist trading, not a guarantee of profit. Past performance does not indicate future results. Only trade with capital you can afford to lose. This platform operates strictly on MT5 infrastructure.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
