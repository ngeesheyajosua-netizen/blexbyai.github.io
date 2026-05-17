import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TIERS } from "@/lib/tiers";
import { useAuth } from "@/lib/auth-context";
import { Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
  head: () => ({
    meta: [
      { title: "Pricing — BlexbyAI" },
      { name: "description", content: "Four BlexbyAI tiers: Basic $3.99, Bronze $8.99, Silver $19.99, Gold Premium $29.99. Full MT5 automation." },
    ],
  }),
});

function Pricing() {
  const { user, tier } = useAuth();
  const nav = useNavigate();

  const handleBuy = async (selected: typeof TIERS[number]) => {
    if (!user) {
      toast.info("Sign up first to purchase a plan");
      nav({ to: "/auth", search: { redirect: "/pricing" } as never });
      return;
    }
    // Payment placeholder — mark subscription as pending. Real Stripe link goes here.
    const { error } = await supabase
      .from("subscriptions")
      .update({ tier: selected.id, active: false })
      .eq("user_id", user.id);
    if (error) { toast.error(error.message); return; }
    toast.success(`${selected.name} selected. Payment integration coming soon — an admin will activate your account.`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-5xl font-display font-bold mb-4">Choose your <span className="gradient-text">edge</span></h1>
            <p className="text-muted-foreground text-lg">
              From a quick test drive to full elite access — pick the plan that matches your trading ambition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {TIERS.map((t) => {
              const isCurrent = tier === t.id;
              return (
                <div
                  key={t.id}
                  className={`p-7 rounded-2xl flex flex-col ${
                    t.highlight ? "gradient-border bg-card scale-[1.02] shadow-2xl shadow-primary/10" : "border border-border bg-white/[0.03]"
                  }`}
                >
                  {t.highlight && <div className="inline-block px-2 py-0.5 rounded bg-primary text-[10px] font-bold text-primary-foreground uppercase mb-3 self-start">Best value</div>}
                  <div className="text-xs font-mono uppercase text-muted-foreground mb-2">{t.tagline}</div>
                  <div className="font-display text-xl font-bold mb-2">{t.name}</div>
                  <div className="text-4xl font-display font-bold mb-6">${t.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                  <ul className="space-y-2.5 text-sm text-muted-foreground mb-6 flex-grow">
                    {t.features.map((f) => (
                      <li key={f} className="flex gap-2"><Check className={`size-4 shrink-0 mt-0.5 ${t.highlight ? "text-primary" : "text-muted-foreground"}`} />{f}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleBuy(t)}
                    disabled={isCurrent}
                    className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      t.highlight ? "bg-primary text-primary-foreground hover:brightness-110" : "border border-border hover:bg-white/5"
                    }`}
                  >
                    {isCurrent ? "Current plan" : `Buy ${t.name}`}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-5 border border-destructive/30 bg-destructive/5 rounded-xl flex gap-3">
              <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-destructive mb-1">Works only with MT5 brokers</p>
                <p className="text-muted-foreground">Before you subscribe, confirm your broker offers a MetaTrader 5 account. MT4-only or proprietary platforms are not supported.</p>
              </div>
            </div>
            <div className="p-5 border border-border bg-white/[0.03] rounded-xl text-sm text-muted-foreground">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Tier highlights</p>
              <ul className="space-y-2">
                <li><span className="text-foreground font-medium">Gold Premium</span> — full platform access with every profit booster and risk-management toolkit unlocked.</li>
                <li><span className="text-foreground font-medium">Silver Premium</span> — reduced benefit boosters but advanced execution and priority queue.</li>
                <li><span className="text-foreground font-medium">Bronze Premium</span> — limited: 2/3 open trades cap, 3 pairs, basic risk filter only.</li>
                <li><span className="text-foreground font-medium">Basic</span> — try-it-out tier: 1 pair, no risk or profit benefits.</li>
              </ul>
            </div>
            {!user && (
              <div className="text-center pt-4">
                <Link to="/auth" className="inline-flex px-6 py-3 bg-foreground text-background rounded-xl font-semibold hover:-translate-y-0.5 transition-all">
                  Create account to subscribe
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
