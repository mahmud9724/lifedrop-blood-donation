import { AlertTriangle, ArrowRight, Building2, CalendarDays, CheckCircle2, Clock, HeartHandshake, MapPin } from 'lucide-react';
import { Badge } from '@/components/site/ui';
import { canHelp, formatRequestTime, statusLabels, type ListedRequest } from '@/data/blood-requests';
import { urgencyLabel } from '@/data/sample';
import { RequestButton } from './RequestControls';

export function BloodRequestCard({ request: r, onDetails, onHelp }: { request: ListedRequest; onDetails: (id: string) => void; onHelp: (id: string) => void }) {
  const Icon = r.urgency === 'critical' ? AlertTriangle : r.urgency === 'urgent' ? Clock : CalendarDays;
  return <article className={`relative flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-lift focus-within:border-primary/40 ${r.urgency === 'critical' && r.status === 'open' ? 'border-primary/40' : ''}`}>
    {r.urgency === 'critical' && r.status === 'open' && <div className="flex items-center gap-2 border-b border-primary/20 bg-primary-soft px-5 py-2 text-xs font-semibold text-destructive"><AlertTriangle className="h-4 w-4" aria-hidden /> Emergency · time-sensitive</div>}
    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-xl font-extrabold text-primary-foreground"><span className="sr-only">Blood group </span>{r.bloodGroup}</div>
        <div className="flex flex-col items-end gap-2"><Badge tone={r.urgency}><Icon className="h-3.5 w-3.5" aria-hidden />{urgencyLabel[r.urgency]}</Badge><span className={`inline-flex items-center gap-1.5 text-xs font-medium ${r.status === 'open' ? 'text-success' : 'text-muted-foreground'}`}>{r.status === 'open' || r.status === 'fulfilled' ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> : <Clock className="h-3.5 w-3.5" aria-hidden />}{statusLabels[r.status]}</span></div>
      </div>
      <p className="mt-5 text-2xl font-bold">{r.units} <span className="text-sm font-medium text-muted-foreground">{r.units === 1 ? 'unit' : 'units'} required</span></p>
      <h2 className="mt-4 flex items-start gap-2.5 text-base font-semibold leading-snug"><Building2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />{r.hospital}</h2>
      <p className="mt-2 flex items-center gap-2.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4 shrink-0" aria-hidden />{r.city}</p>
      <div className="mt-5 border-t pt-4"><p className="flex items-center gap-2 text-xs font-medium text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" aria-hidden />Required by</p><time dateTime={r.requiredAt} className="mt-1 block text-sm font-semibold">{formatRequestTime(r.requiredAt)}</time></div>
      <p className="mb-5 mt-2 text-xs text-muted-foreground">Posted <time dateTime={r.postedAt}>{formatRequestTime(r.postedAt)}</time></p>
      <div className="mt-auto grid gap-2"><RequestButton variant="outline" className="w-full" onClick={() => onDetails(r.id)} aria-label={`View Details for ${r.id}`}>View Details <ArrowRight aria-hidden /></RequestButton>{canHelp(r) && <RequestButton className="w-full" onClick={() => onHelp(r.id)} aria-label={`I Can Help with ${r.id}`}><HeartHandshake aria-hidden />I Can Help</RequestButton>}</div>
    </div>
  </article>;
}
