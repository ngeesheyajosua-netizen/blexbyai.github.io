import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";
import { Download as DownloadIcon, AlertTriangle, Lock, Monitor, Apple, Terminal } from "lucide-react";

export const Route = createFileRoute("/download")({
  component: Download,
  head: () => ({
    meta: [
      { title: "Download BlexbyAI Terminal" },
      { name: "description", content: "Download the BlexbyAI MT5 automated trading terminal. Sign in to access the installer for Windows, macOS and Linux." },
    ],
  }),
});

function Download() {
  const { user, tier, active, loading } = useAuth();
  const canDownload = !!user && !!tier;

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-16 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-display font-bold mb-4">Download the <span className="gradient-text">terminal</span></h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              BlexbyAI is a desktop trading terminal. Install it, link your MT5 broker, and let the bot trade.
            </p>
          </div>

          <div className="p-5 border border-destructive/30 bg-destructive/5 rounded-xl flex gap-3 mb-8">
            <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-destructive mb-1">Requires MT5 broker</p>
              <p className="text-muted-foreground">BlexbyAI only connects to MetaTrader 5 accounts. Verify your broker supports MT5 before installing.</p>
            </div>
          </div>

          {loading ? (
            <div className="h-40 grid place-items-center text-muted-foreground">Loading…</div>
          ) : !user ? (
            <div className="gradient-border bg-card p-10 text-center">
              <div className="size-14 rounded-2xl bg-white/5 grid place-items-center mx-auto mb-5">
                <Lock className="size-6 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">Sign up to unlock the installer</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Download links are gated to registered members. Create an account first, then return here.
              </p>
              <div className="flex gap-3 justify-center">
                <Link to="/auth" search={{ redirect: "/download" } as never} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:brightness-110">
                  Sign up free
                </Link>
                <Link to="/pricing" className="px-6 py-3 border border-border bg-white/5 rounded-xl font-semibold hover:bg-white/10">
                  See pricing
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="gradient-border bg-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">Your plan</p>
                  <p className="text-2xl font-display font-bold capitalize">{tier ?? "basic"}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Status: <span className={active ? "text-success" : "text-accent-pink"}>{active ? "Active" : "Pending activation"}</span>
                  </p>
                </div>
                <Link to="/pricing" className="px-5 py-2.5 border border-border bg-white/5 rounded-xl text-sm font-semibold hover:bg-white/10">
                  Upgrade plan
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Monitor, label: "Windows", file: "BlexbyAI-Setup-win.exe" },
                  { icon: Apple, label: "macOS", file: "BlexbyAI.dmg" },
                  { icon: Terminal, label: "Linux", file: "BlexbyAI.AppImage" },
                ].map(({ icon: Icon, label, file }) => (
                  <a
                    key={label}
                    href={canDownload ? "#download-placeholder" : undefined}
                    className={`p-6 rounded-2xl border border-border bg-white/[0.03] hover:bg-white/[0.06] transition-colors block ${!canDownload ? "opacity-50 pointer-events-none" : ""}`}
                  >
                    <Icon className="size-7 mb-4 text-primary" />
                    <div className="font-semibold mb-1">{label}</div>
                    <div className="text-xs font-mono text-muted-foreground mb-4">{file}</div>
                    <div className="inline-flex items-center gap-2 text-sm text-primary">
                      <DownloadIcon className="size-4" /> Download
                    </div>
                  </a>
                ))}
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Download links are placeholders for now — the main app will be wired here shortly.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
