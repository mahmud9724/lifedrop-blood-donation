import { Link } from "@tanstack/react-router";
import { Building2, CalendarDays, MapPin, ArrowRight, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import { Badge, buttonStyles } from "./ui";
import { formatDate, urgencyLabel, type Article, type BloodRequest, type Stat } from "@/data/sample";

const urgencyIcon = { critical: AlertTriangle, urgent: Clock, normal: CheckCircle2 };

export function RequestCard({ request }: { request: BloodRequest }) {
  const Icon = urgencyIcon[request.urgency];
  return (
    <article className="flex flex-col rounded-2xl border bg-card p-6 shadow-card transition-shadow hover:shadow-lift">
      <div className="flex items-start justify-between">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-2xl font-bold text-primary" aria-label={`Blood group ${request.bloodGroup}`}>
          {request.bloodGroup}
        </div>
        <Badge tone={request.urgency}>
          <Icon className="h-3.5 w-3.5" aria-hidden /> {urgencyLabel[request.urgency]}
        </Badge>
      </div>
      <p className="mt-5 text-lg font-semibold">{request.units} {request.units === 1 ? "unit" : "units"} needed</p>
      <dl className="mt-3 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2"><Building2 className="h-4 w-4" aria-hidden /><dt className="sr-only">Hospital</dt><dd>{request.hospital}</dd></div>
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden /><dt className="sr-only">Location</dt><dd>{request.city}</dd></div>
        <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4" aria-hidden /><dt className="sr-only">Required by</dt><dd>Needed by {formatDate(request.requiredDate)}</dd></div>
      </dl>
      <Link to="/requests" search={{ id: request.id }} className={buttonStyles({ variant: "outline", size: "sm", className: "mt-6 w-full" })}>
        View Details
      </Link>
    </article>
  );
}

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-card">
      <p className="text-3xl font-bold text-foreground md:text-4xl">{stat.value.toLocaleString("en-US")}{stat.suffix}</p>
      <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
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
