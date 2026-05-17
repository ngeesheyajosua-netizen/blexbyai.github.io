import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, Search } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({ meta: [{ title: "Admin — BlexbyAI" }] }),
});

type Tier = Database["public"]["Enums"]["subscription_tier"];
type Row = {
  user_id: string;
  email: string | null;
  display_name: string | null;
  tier: Tier;
  active: boolean;
  is_admin: boolean;
};

const TIERS: Tier[] = ["basic", "bronze", "silver", "gold"];

function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const nav = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/auth" });
    else if (!isAdmin) nav({ to: "/account" });
  }, [loading, user, isAdmin, nav]);

  const load = async () => {
    setBusy(true);
    const [{ data: profiles }, { data: subs }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("id, email, display_name"),
      supabase.from("subscriptions").select("user_id, tier, active"),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    const subMap = new Map(subs?.map((s) => [s.user_id, s]) ?? []);
    const adminSet = new Set(roles?.filter((r) => r.role === "admin").map((r) => r.user_id) ?? []);
    setRows(
      (profiles ?? []).map((p) => ({
        user_id: p.id,
        email: p.email,
        display_name: p.display_name,
        tier: (subMap.get(p.id)?.tier ?? "basic") as Tier,
        active: subMap.get(p.id)?.active ?? false,
        is_admin: adminSet.has(p.id),
      })),
    );
    setBusy(false);
  };

  useEffect(() => { if (isAdmin) load(); /* eslint-disable-next-line */ }, [isAdmin]);

  const updateTier = async (uid: string, tier: Tier) => {
    const { error } = await supabase.from("subscriptions").update({ tier }).eq("user_id", uid);
    if (error) return toast.error(error.message);
    toast.success("Tier updated");
    setRows((r) => r.map((x) => (x.user_id === uid ? { ...x, tier } : x)));
  };
  const toggleActive = async (uid: string, active: boolean) => {
    const { error } = await supabase.from("subscriptions").update({ active }).eq("user_id", uid);
    if (error) return toast.error(error.message);
    toast.success(active ? "Activated" : "Deactivated");
    setRows((r) => r.map((x) => (x.user_id === uid ? { ...x, active } : x)));
  };
  const toggleAdmin = async (uid: string, makeAdmin: boolean) => {
    if (makeAdmin) {
      const { error } = await supabase.from("user_roles").insert({ user_id: uid, role: "admin" });
      if (error) return toast.error(error.message);
    } else {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", uid).eq("role", "admin");
      if (error) return toast.error(error.message);
    }
    toast.success("Role updated");
    setRows((r) => r.map((x) => (x.user_id === uid ? { ...x, is_admin: makeAdmin } : x)));
  };

  const filtered = rows.filter((r) =>
    !q || r.email?.toLowerCase().includes(q.toLowerCase()) || r.display_name?.toLowerCase().includes(q.toLowerCase()),
  );

  if (loading || !user || !isAdmin) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-12 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="size-6 text-accent-pink" />
            <h1 className="text-4xl font-display font-bold">Admin panel</h1>
          </div>
          <p className="text-muted-foreground mb-8">Manage user subscriptions, activate plans, and grant admin access.</p>

          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by email or name"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <button onClick={load} disabled={busy} className="px-4 py-2.5 rounded-xl border border-border bg-white/5 text-sm hover:bg-white/10 disabled:opacity-50">
              {busy ? "Loading..." : "Refresh"}
            </button>
            <Link to="/account" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
          </div>

          <div className="border border-border rounded-2xl overflow-hidden bg-card/50">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.03] border-b border-border">
                  <tr className="text-left font-mono text-xs uppercase text-muted-foreground">
                    <th className="p-4">User</th>
                    <th className="p-4">Tier</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.length === 0 && (
                    <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No users found.</td></tr>
                  )}
                  {filtered.map((r) => (
                    <tr key={r.user_id} className="hover:bg-white/[0.02]">
                      <td className="p-4">
                        <div className="font-medium">{r.display_name ?? "—"}</div>
                        <div className="text-xs text-muted-foreground font-mono">{r.email}</div>
                      </td>
                      <td className="p-4">
                        <select
                          value={r.tier}
                          onChange={(e) => updateTier(r.user_id, e.target.value as Tier)}
                          className="px-3 py-1.5 rounded-lg bg-background border border-border text-sm capitalize focus:border-primary focus:outline-none"
                        >
                          {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleActive(r.user_id, !r.active)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                            r.active ? "bg-success/15 text-success border border-success/30" : "bg-accent-pink/10 text-accent-pink border border-accent-pink/30"
                          }`}
                        >
                          {r.active ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="p-4">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={r.is_admin} onChange={(e) => toggleAdmin(r.user_id, e.target.checked)} className="size-4 accent-primary" />
                          <span className="text-xs text-muted-foreground">Admin</span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Tip: To promote the first admin, run an UPDATE in the database, or promote yourself here once another admin exists.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
