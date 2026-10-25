import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        // Text colours are explicit for every state so they can never inherit a clashing colour
        // (e.g. the shadcn ghost variant's `hover:text-accent-foreground`, which equals `--secondary`).
        primary: "bg-primary text-primary-foreground shadow-card hover:bg-secondary hover:text-primary-foreground focus-visible:text-primary-foreground active:bg-secondary active:text-primary-foreground",
        outline: "border border-input bg-background text-foreground hover:border-primary hover:bg-background hover:text-primary focus-visible:text-primary active:text-primary",
        ghost: "text-foreground hover:bg-muted hover:text-foreground focus-visible:text-foreground active:text-foreground",
        soft: "bg-primary-soft text-secondary hover:bg-primary hover:text-primary-foreground focus-visible:text-secondary active:bg-primary active:text-primary-foreground",
        inverse: "bg-background text-secondary hover:bg-primary-soft hover:text-secondary focus-visible:text-secondary active:text-secondary",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);
export type ButtonStyleProps = VariantProps<typeof buttonStyles>;

const badgeStyles = cva("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", {
  variants: {
    tone: {
      critical: "bg-primary-soft text-destructive",
      urgent: "bg-warning-soft text-warning",
      normal: "bg-success-soft text-success",
      neutral: "bg-muted text-muted-foreground",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export function Badge({ tone, children, className }: VariantProps<typeof badgeStyles> & { children: ReactNode; className?: string }) {
  return <span className={cn(badgeStyles({ tone }), className)}>{children}</span>;
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
    </div>
  );
}

export function DropIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2.5c-.3 0-.6.15-.8.4C9.4 5.2 5 10.9 5 14.8 5 18.8 8.1 22 12 22s7-3.2 7-7.2c0-3.9-4.4-9.6-6.2-11.9-.2-.25-.5-.4-.8-.4Z" />
    </svg>
  );
}
