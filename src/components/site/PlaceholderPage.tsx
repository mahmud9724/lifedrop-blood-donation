import { Link } from "@tanstack/react-router";
import { Construction } from "lucide-react";
import type { ReactNode } from "react";
import { buttonStyles } from "./ui";

export function PlaceholderPage({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <section className="bg-surface">
      <div className="container-page py-20 md:py-28">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>
        {children}
        <div className="mt-10 flex max-w-xl items-start gap-4 rounded-2xl border border-dashed bg-background p-6">
          <Construction className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden />
          <div>
            <p className="font-semibold">This page is coming soon</p>
            <p className="mt-1 text-sm text-muted-foreground">We're still building this part of LifeDrop. Nothing you do here is saved yet.</p>
            <Link to="/" className={buttonStyles({ variant: "outline", size: "sm", className: "mt-4" })}>Back to home</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export const pageHead = (title: string, description: string) => ({
  meta: [
    { title: `${title} — LifeDrop` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — LifeDrop` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
