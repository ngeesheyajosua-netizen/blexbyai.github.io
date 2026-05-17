import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="py-20 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-6 bg-gradient-brand rounded" />
            <span className="font-display font-bold text-lg">BlexbyAI</span>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            The official route to terminal-based automated trading precision.
            Built exclusively for MetaTrader 5.
          </p>
        </div>
        <div>
          <h5 className="font-semibold mb-4 text-sm">Product</h5>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/features" className="hover:text-primary">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
            <li><Link to="/download" className="hover:text-primary">Download</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-4 text-sm">Account</h5>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/auth" className="hover:text-primary">Sign in</Link></li>
            <li><Link to="/account" className="hover:text-primary">My account</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
        <p>&copy; 2026 BlexbyAI. All rights reserved.</p>
        <p>MT5 is a trademark of MetaQuotes Ltd. Trading involves risk.</p>
      </div>
    </footer>
  );
}
