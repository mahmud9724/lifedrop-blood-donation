import { Link } from '@tanstack/react-router';
import { AlertTriangle, ArrowLeft, CalendarDays, HeartHandshake, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { Badge, buttonStyles } from '@/components/site/ui';
import { RequestButton } from '@/components/requests/RequestControls';
import { availabilityLabels, type DirectoryDonor } from '@/data/donors';
import { formatDate } from '@/data/sample';
import { availabilityTone, donorInitials } from './DonorCard';

export function DonorProfilePage({ donor, onContact }: { donor: DirectoryDonor; onContact: () => void }) {
  const firstName = donor.name.split(' ')[0];
  return <div className="bg-surface">
    <div className="container-page py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs text-muted-foreground"><Link to="/" className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Home</Link><span aria-hidden>/</span><Link to="/donors" className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Donors</Link><span aria-hidden>/</span><span aria-current="page">{donor.name}</span></nav>
      <section className="rounded-2xl border bg-card p-6 shadow-card sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div aria-hidden className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary-soft text-3xl font-bold text-secondary">{donorInitials(donor.name)}</div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3"><h1 className="text-3xl font-bold md:text-4xl">{donor.name}</h1><Badge tone={availabilityTone[donor.availability]}>{availabilityLabels[donor.availability]}</Badge></div>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 shrink-0" aria-hidden />{donor.city}</span>
              <span className="flex items-center gap-1.5"><HeartHandshake className="h-4 w-4 shrink-0" aria-hidden />{donor.donations} {donor.donations === 1 ? 'donation' : 'donations'} recorded</span>
              {donor.lastDonation && <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 shrink-0" aria-hidden />Last donation <time dateTime={donor.lastDonation}>{formatDate(donor.lastDonation)}</time></span>}
            </div>
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:items-end">
            <span className="flex h-14 w-14 items-center justify-center self-start rounded-xl bg-primary text-xl font-extrabold text-primary-foreground sm:self-end"><span className="sr-only">Blood group </span>{donor.bloodGroup}</span>
            <RequestButton onClick={onContact}><MessageCircle aria-hidden />Contact {firstName}</RequestButton>
          </div>
        </div>
        <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground"><AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />Fictional demo donor profile. The name, numbers and history are sample data, not real donation records or verified identities.</p>
      </section>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section aria-labelledby="donation-history" className="rounded-2xl border bg-card p-6 shadow-card lg:col-span-2 sm:p-8">
          <h2 id="donation-history" className="text-xl font-bold">Donation history</h2>
          <p className="mt-1 text-sm text-muted-foreground">A summary of {firstName}’s recorded donations (demo data).</p>
          {donor.history.length === 0 ? <p className="mt-5 rounded-xl bg-muted p-4 text-sm text-muted-foreground">No recorded donations yet. {firstName} is new to the directory{donor.availability === 'unavailable' ? ' and is currently unavailable' : ''}.</p> : <ol className="mt-5 space-y-4">
            {donor.history.map(record => <li key={record.date} className="flex items-start gap-3 border-b pb-4 last:border-b-0 last:pb-0">
              <span aria-hidden className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success-soft text-success"><HeartHandshake className="h-4 w-4" /></span>
              <div><p className="font-semibold">{record.location}</p><time dateTime={record.date} className="text-sm text-muted-foreground">{formatDate(record.date)}</time></div>
            </li>)}
          </ol>}
        </section>
        <aside className="space-y-6">
          <section aria-labelledby="about-donor" className="rounded-2xl border bg-card p-6 shadow-card">
            <h2 id="about-donor" className="text-lg font-bold">About</h2>
            <p className="mt-3 text-sm text-muted-foreground">{donor.bio}</p>
            <dl className="mt-5 space-y-3 border-t pt-5 text-sm">
              <div><dt className="text-xs text-muted-foreground">Donor since</dt><dd className="mt-0.5 font-semibold"><time dateTime={donor.joined}>{formatDate(donor.joined)}</time></dd></div>
              <div><dt className="text-xs text-muted-foreground">Availability</dt><dd className="mt-0.5 font-semibold">{availabilityLabels[donor.availability]}</dd></div>
            </dl>
          </section>
          <section aria-labelledby="privacy-donor" className="rounded-2xl border border-primary/20 bg-primary-soft p-6">
            <h2 id="privacy-donor" className="flex items-center gap-2 text-lg font-bold text-secondary"><ShieldCheck className="h-5 w-5 text-primary" aria-hidden />Privacy first</h2>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2"><span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Public profiles show a display name, blood group, general city and availability only.</li>
              <li className="flex items-start gap-2"><span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Phone numbers, email addresses and exact home addresses are never shown.</li>
              <li className="flex items-start gap-2"><span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Contact happens through LifeDrop, and a donor decides whether to respond.</li>
            </ul>
          </section>
        </aside>
      </div>
      <div className="mt-8"><Link to="/donors" className={buttonStyles({ variant: 'outline' })}><ArrowLeft aria-hidden />Back to donor directory</Link></div>
    </div>
  </div>;
}
