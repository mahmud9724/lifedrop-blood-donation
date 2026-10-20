import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import { Logo, navLinks } from "./Navbar";

const h = "text-sm font-semibold text-foreground";
const a = "text-sm text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:underline";

export function Footer() {
  return (
    <footer className="border-t bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            LifeDrop is a community-driven platform helping donors and people in need find each other — simply, respectfully, and quickly.
          </p>
          <div className="mt-5 flex gap-2">
            {[{ I: Facebook, l: "Facebook" }, { I: Instagram, l: "Instagram" }, { I: Twitter, l: "X (Twitter)" }].map(({ I, l }) => (
              <a key={l} href="#" aria-label={`LifeDrop on ${l} (coming soon)`} className="flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground hover:border-primary hover:text-primary">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <nav aria-label="Quick links">
          <p className={h}>Quick Links</p>
          <ul className="mt-4 space-y-2.5">{navLinks.map((l) => <li key={l.to}><Link to={l.to} className={a}>{l.label}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Donation resources">
          <p className={h}>Resources</p>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/donate" className={a}>Donor eligibility</Link></li>
            <li><Link to="/news" className={a}>Preparing to donate</Link></li>
            <li><Link to="/request-blood" className={a}>How to request blood</Link></li>
            <li><Link to="/blood-requests" className={a}>Report a suspicious request</Link></li>
          </ul>
        </nav>
        <div>
          <p className={h}>Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" aria-hidden /> hello@lifedrop.example</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" aria-hidden /> +00 000 000 000</li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} LifeDrop. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className={a}>Privacy Policy</Link>
            <Link to="/terms" className={a}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
