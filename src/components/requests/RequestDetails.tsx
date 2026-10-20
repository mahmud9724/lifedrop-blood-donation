import { AlertTriangle, HeartHandshake, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/site/ui';
import { urgencyLabel } from '@/data/sample';
import { canHelp, formatRequestTime, statusLabels, type ListedRequest } from '@/data/blood-requests';
import { RequestButton } from './RequestControls';

export function RequestDetails({ request: r, missing, helping, onClose, onHelp }: { request?: ListedRequest | undefined; missing: boolean; helping: boolean; onClose: () => void; onHelp: () => void }) {
  return <Dialog open={Boolean(r) || missing} onOpenChange={open => { if (!open) onClose(); }}><DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl sm:max-w-xl">
    <DialogHeader><DialogTitle className="pr-6 text-2xl font-bold">{missing ? 'Request not found' : helping ? 'Thank you for offering to help' : 'Blood request details'}</DialogTitle><DialogDescription>{missing ? 'This request is not part of the current sample data.' : `Fictional demo request · ${r?.id}`}</DialogDescription></DialogHeader>
    {r && <>
      <div className="flex flex-wrap items-center gap-3"><span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground"><span className="sr-only">Blood group </span>{r.bloodGroup}</span><Badge tone={r.urgency}>{r.urgency === 'critical' && <AlertTriangle className="h-4 w-4" aria-hidden />}{urgencyLabel[r.urgency]}</Badge><Badge>{statusLabels[r.status]}</Badge></div>
      <dl className="grid grid-cols-1 gap-4 border-y py-5 text-sm sm:grid-cols-2">{[['Required units', `${r.units} ${r.units === 1 ? 'unit' : 'units'}`], ['Care context', r.patient], ['Hospital', r.hospital], ['City', r.city], ['Required by', formatRequestTime(r.requiredAt)], ['Posted', formatRequestTime(r.postedAt)]].map(([label, value]) => <div key={label}><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>)}</dl>
      {helping ? <div className="flex items-start gap-3 rounded-lg bg-primary-soft p-4 text-sm"><HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden /><div><p className="font-semibold">No response has been sent</p><p className="mt-1 text-muted-foreground">This is a preview only. These hospitals and requests are fictional; no donor response or contact information is collected.</p></div></div> : <div><h3 className="font-semibold">Donation arrangements</h3><p className="mt-2 text-sm text-muted-foreground">{r.notes}</p></div>}
      <p className="flex items-start gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />For a real medical emergency, contact local emergency services or your hospital directly.</p>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end"><RequestButton variant="outline" onClick={onClose}>Close</RequestButton>{canHelp(r) && !helping && <RequestButton onClick={onHelp}><HeartHandshake aria-hidden />I Can Help</RequestButton>}</div>
    </>}
    {missing && <RequestButton variant="outline" onClick={onClose}>Back to requests</RequestButton>}
  </DialogContent></Dialog>;
}
