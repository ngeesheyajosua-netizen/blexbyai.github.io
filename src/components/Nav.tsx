import { Link, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import logo from "@/assets/blexby-icon.png";

export function Nav() {
  const { user, isAdmin, signOut } = useAuth();
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="BlexbyAI" className="size-8 rounded-lg" />
          <span className="font-display font-bold text-xl tracking-tight">BlexbyAI</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>Home</Link>
          <Link to="/features" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Features</Link>
          <Link to="/pricing" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Pricing</Link>
          <Link to="/compare" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Compare</Link>
          <Link to="/download" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Download</Link>
          <div className="h-4 w-px bg-border" />
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="text-accent-pink hover:text-accent-pink/80" activeProps={{ className: "text-accent-pink" }}>Admin</Link>
              )}
              <Link to="/account" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>Account</Link>
              <button
                onClick={async () => { await signOut(); router.navigate({ to: "/" }); }}
                className="text-muted-foreground hover:text-foreground"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="hover:text-foreground">Sign in</Link>
              <Link to="/download" className="bg-foreground text-background px-4 py-2 rounded-full hover:bg-white/90 transition-all">
                Get the app
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
