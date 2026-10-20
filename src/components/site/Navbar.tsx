import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { DropIcon, buttonStyles } from "./ui";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/donors", label: "Find Donors" },
  { to: "/blood-requests", label: "Blood Requests" },
  { to: "/donate", label: "Donate Blood" },
  { to: "/news", label: "News" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="LifeDrop home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <DropIcon className="h-5 w-5" />
      </span>
      <span className="text-xl font-bold tracking-tight">Life<span className="text-primary">Drop</span></span>
    </Link>
  );
}

const linkCls = "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
        <Logo />
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={linkCls} activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/login" className={buttonStyles({ variant: "ghost", size: "sm" })}>Login</Link>
          <Link to="/request-blood" className={buttonStyles({ size: "sm" })}>Request Blood</Link>
        </div>
        <button
          type="button"
          className="rounded-lg p-2 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t bg-background lg:hidden">
          <ul className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} className={linkCls + " block text-base"} activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>{l.label}</Link>
              </li>
            ))}
            <li className="mt-3 grid grid-cols-2 gap-2">
              <Link to="/login" onClick={() => setOpen(false)} className={buttonStyles({ variant: "outline" })}>Login</Link>
              <Link to="/request-blood" onClick={() => setOpen(false)} className={buttonStyles()}>Request Blood</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
