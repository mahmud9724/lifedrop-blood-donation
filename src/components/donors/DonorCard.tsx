import { Link } from '@tanstack/react-router';
import { ArrowRight, CalendarDays, MapPin, MessageCircle } from 'lucide-react';
import { Badge, buttonStyles } from '@/components/site/ui';
import { RequestButton } from '@/components/requests/RequestControls';
import { availabilityLabels, type Availability, type DirectoryDonor } from '@/data/donors';
import { formatDate } from '@/data/sample';

export const availabilityTone: Record<Availability, 'normal' | 'urgent' | 'neutral'> = {
  available: 'normal',
  'recently-donated': 'urgent',
  unavailable: 'neutral',
};

export function donorInitials(name: string) {
  return name.split(/\s+/).map(part => part[0] ?? '').join('').slice(0, 2).toUpperCase();
}

export function DonorCard({ donor, onContact }: { donor: DirectoryDonor; onContact: (slug: string) => void }) {
  return <article className="flex min-w-0 flex-col rounded-2xl border bg-card p-5 shadow-card transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-lift focus-within:border-primary/40 sm:p-6">
    <div className="flex items-start justify-between gap-3">
      <div aria-hidden className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-soft text-lg font-bold text-secondary">{donorInitials(donor.name)}</div>
      <Badge tone={availabilityTone[donor.availability]}>{availabilityLabels[donor.availability]}</Badge>
    </div>
    <div className="mt-4 flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-extrabold text-primary-foreground"><span className="sr-only">Blood group </span>{donor.bloodGroup}</span>
      <div className="min-w-0">
        <h2 className="truncate text-lg font-bold leading-tight">{donor.name}</h2>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />{donor.city}</p>
      </div>
    </div>
    <p className="mt-4 text-sm text-muted-foreground"><span className="font-semibold text-foreground">{donor.donations}</span> {donor.donations === 1 ? 'donation' : 'donations'} recorded</p>
    {donor.lastDonation && <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground"><CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />Last donation <time dateTime={donor.lastDonation}>{formatDate(donor.lastDonation)}</time></p>}
    <div className="mt-5 grid gap-2 border-t pt-4">
      <Link to="/donors/$slug" params={{ slug: donor.slug }} className={buttonStyles({ variant: 'outline', className: 'w-full' })} aria-label={`View Profile for ${donor.name}`}>View Profile <ArrowRight aria-hidden /></Link>
      <RequestButton variant="soft" className="w-full" onClick={() => onContact(donor.slug)} aria-label={`Contact ${donor.name} through LifeDrop`}><MessageCircle aria-hidden />Contact</RequestButton>
    </div>
  </article>;
}
