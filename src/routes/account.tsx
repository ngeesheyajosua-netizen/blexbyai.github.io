import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";
import { Crown, Download, Shield } from "lucide-react";

export const Route = createFileRoute("/account")({
  component: Account,
  head: () => ({ meta: [{ title: "Your account — BlexbyAI" }] }),
});

function Account() {
  const { user, tier, active, isAdmin, loading, signOut } = useAuth();
  const nav = useNavigate();
  useEffect(() => { if (!loading && !user) nav({ to: "/auth" }); }, [loading, user, nav]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-16 pb-24">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Account</p>
            <h1 className="text-4xl font-display font-bold">Welcome back</h1>
            <p className="text-muted-foreground mt-1">{user.email}</p>
          </div>

          <div className="gradient-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="size-5 text-primary" />
              <h2 className="font-display font-bold text-xl">Subscription</h2>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                <span className="font-mono text-xs uppercase text-muted-foreground">Tier · </span>
                <span className="font-bold capitalize text-primary">{tier ?? "basic"}</span>
              </div>
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-border">
                <span className="font-mono text-xs uppercase text-muted-foreground">Status · </span>
                <span className={`font-bold ${active ? "text-success" : "text-accent-pink"}`}>{active ? "Active" : "Pending"}</span>
              </div>
              <Link to="/pricing" className="ml-auto px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110">
                Change plan
              </Link>
            </div>
            {!active && (
              <p className="text-sm text-muted-foreground mt-4">
                Your subscription is pending activation. An admin will activate your account once payment is confirmed.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/download" className="p-5 rounded-2xl border border-border bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
              <Download className="size-5 text-primary mb-3" />
              <div className="font-semibold mb-1">Download terminal</div>
              <p className="text-sm text-muted-foreground">Get the BlexbyAI app for Windows, macOS or Linux.</p>
            </Link>
            {isAdmin && (
              <Link to="/admin" className="p-5 rounded-2xl border border-accent-pink/30 bg-accent-pink/5 hover:bg-accent-pink/10 transition-colors">
                <Shield className="size-5 text-accent-pink mb-3" />
                <div className="font-semibold mb-1">Admin panel</div>
                <p className="text-sm text-muted-foreground">Manage user subscriptions and roles.</p>
              </Link>
            )}
          </div>

          <button onClick={() => { signOut(); nav({ to: "/" }); }} className="text-sm text-muted-foreground hover:text-foreground">
            Sign out
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
