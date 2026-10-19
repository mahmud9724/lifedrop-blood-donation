import { Link } from "@tanstack/react-router";
import { Building2, CalendarDays, MapPin, ArrowRight, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import { Badge, buttonStyles } from "./ui";
import { formatDate, urgencyLabel, type Article, type BloodRequest, type Stat } from "@/data/sample";

const urgencyIcon = { critical: AlertTriangle, urgent: Clock, normal: CheckCircle2 };

export function RequestCard({ request }: { request: BloodRequest }) {
  const Icon = urgencyIcon[request.urgency];
  return (
    <article className="group relative flex min-w-0 flex-col rounded-2xl border bg-card shadow-card transition-[box-shadow,border-color] hover:border-primary/30 hover:shadow-lift focus-within:border-primary/40">
      {request.urgency === "critical" && <span aria-hidden className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-primary" />}
      <div className="flex items-center gap-4 p-6 pb-5">
        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <span className="sr-only">Blood group</span>
          <span className="text-2xl font-extrabold leading-none">{request.bloodGroup}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-2xl font-bold leading-tight">{request.units} <span className="text-base font-semibold text-muted-foreground">{request.units === 1 ? "unit" : "units"} needed</span></p>
          <Badge tone={request.urgency} className="mt-2">
            <Icon className="h-3.5 w-3.5" aria-hidden /> {urgencyLabel[request.urgency]}
          </Badge>
        </div>
      </div>
      <dl className="mx-6 space-y-3 border-t pt-5 text-sm">
        <div className="flex items-start gap-3"><Building2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden /><dt className="sr-only">Hospital</dt><dd className="min-w-0 font-medium text-foreground">{request.hospital}</dd></div>
        <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden /><dt className="sr-only">Location</dt><dd className="text-muted-foreground">{request.city}</dd></div>
        <div className="flex items-start gap-3"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden /><dt className="sr-only">Required by</dt><dd className="text-muted-foreground">Needed by <time dateTime={request.requiredDate} className="font-medium text-foreground">{formatDate(request.requiredDate)}</time></dd></div>
      </dl>
      <div className="mt-auto p-6 pt-6">
        <Link to="/requests" search={{ id: request.id }} className={buttonStyles({ variant: request.urgency === "critical" ? "primary" : "outline", className: "w-full" })}>
          View Details<span className="sr-only">: {request.bloodGroup} request at {request.hospital}</span>
        </Link>
      </div>
    </article>
  );
}

export function StatCard({ stat, icon: Icon }: { stat: Stat; icon?: ComponentType<{ className?: string }> }) {
  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl border bg-card p-5 shadow-card sm:p-6">
      {Icon && <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" aria-hidden /></span>}
      <p className="mt-4 text-2xl font-bold tabular-nums text-foreground sm:text-3xl lg:text-4xl">{stat.value.toLocaleString("en-US")}{stat.suffix}</p>
      <p className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</p>
    </div>
  );
}

export function NewsCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-shadow hover:shadow-lift">
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img src={article.image} alt="" loading="lazy" width={1024} height={640} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs">
          <Badge tone="critical">{article.category}</Badge>
          <time dateTime={article.date} className="text-muted-foreground">{formatDate(article.date)}</time>
        </div>
        <h3 className="mt-4 text-lg font-semibold leading-snug">{article.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{article.excerpt}</p>
        <Link to="/news" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-secondary focus-visible:underline focus-visible:outline-none">
          Read More <ArrowRight className="h-4 w-4" aria-hidden /><span className="sr-only">: {article.title}</span>
        </Link>
      </div>
    </article>
  );
}
