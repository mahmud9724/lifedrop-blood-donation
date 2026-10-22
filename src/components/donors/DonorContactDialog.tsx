import { ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RequestButton } from '@/components/requests/RequestControls';
import type { DirectoryDonor } from '@/data/donors';

export function DonorContactDialog({ donor, onClose }: { donor?: DirectoryDonor | undefined; onClose: () => void }) {
  const firstName = donor?.name.split(' ')[0] ?? 'the donor';
  return <Dialog open={Boolean(donor)} onOpenChange={open => { if (!open) onClose(); }}><DialogContent className="w-[calc(100%-2rem)] rounded-2xl sm:max-w-md">
    <DialogHeader><DialogTitle className="pr-6 text-xl font-bold">{donor ? `Contact ${donor.name}` : 'Contact donor'}</DialogTitle><DialogDescription>Privacy-conscious contact · fictional demo donor</DialogDescription></DialogHeader>
    {donor && <>
      <p className="text-sm text-muted-foreground">LifeDrop never publishes donor phone numbers, email addresses or home addresses. On the live platform your message would be delivered through LifeDrop, and {firstName} would decide whether to respond.</p>
      <div className="flex items-start gap-3 rounded-lg bg-primary-soft p-4 text-sm"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden /><div><p className="font-semibold">No message has been sent</p><p className="mt-1 text-muted-foreground">This is a preview only. These donor profiles are fictional demo data, so there is no one to contact.</p></div></div>
      <div className="flex justify-end"><RequestButton variant="outline" onClick={onClose}>Close</RequestButton></div>
    </>}
  </DialogContent></Dialog>;
}
