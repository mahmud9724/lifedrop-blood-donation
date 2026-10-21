import { Link } from '@tanstack/react-router';
import { ArrowRight, Droplets, MapPin } from 'lucide-react';
import { Badge, buttonStyles, SectionHeading } from './ui';
import { Reveal } from './Reveal';
import { demoTopDonors, type TopDonor } from '@/data/donors';

const initialsOf = (name: string) => name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();

function DonorCard({ donor, rank }: { donor: TopDonor; rank: number }) {
  const featured = rank === 1;
  return (
    <article className={`relative flex h-full flex-col items-center overflow-hidden rounded-2xl border p-8 text-center shadow-card transition-[box-shadow,border-color] duration-300 hover:shadow-lift ${featured ? 'border-primary/40 bg-gradient-to-b from-primary-soft/70 via-card to-card hover:border-primary/50' : 'bg-card hover:border-primary/30'}`}>
      {featured && <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/60" />}
      <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${featured ? 'bg-primary text-primary-foreground shadow-card' : 'bg-muted text-muted-foreground'}`}>
        {featured ? 'Top Donor · ' : ''}#{rank}
      </span>
      <span aria-hidden className={`mt-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-lg font-extrabold text-primary-foreground shadow-card ${featured ? 'ring-4 ring-primary-soft' : ''}`}>
        <span className="sr-only">Avatar for </span>{initialsOf(donor.name)}
      </span>
      <h3 className="mt-4 text-lg font-semibold">{donor.name}</h3>
      <div className="mt-2 flex items-center gap-2">
        <Badge tone="neutral">{donor.bloodGroup}</Badge>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" aria-hidden />{donor.city}</span>
      </div>
      <p className="mt-5 border-t pt-5 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 align-baseline"><Droplets className="h-4 w-4 text-primary" aria-hidden /><span className="text-2xl font-bold tabular-nums text-foreground">{donor.donations}</span></span>
        <span className="mt-0.5 block text-xs font-medium">Donations recorded</span>
      </p>
    </article>
  );
}

export function TopDonors() {
  return (
    <section className="bg-surface py-20" aria-labelledby="top-donors-heading">
      <div className="container-page">
        <Reveal>
          <SectionHeading eyebrow="Top donors" title="Our Everyday Heroes" description="Celebrating the generous people who make a difference through blood donation." align="center" />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demoTopDonors.map((donor, i) => (
            <Reveal key={donor.id} delay={i * 120} className="h-full">
              <DonorCard donor={donor} rank={i + 1} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex flex-col items-center gap-4">
          <Link to="/donors" className={buttonStyles({ variant: 'outline', size: 'lg' })}>Meet Our Donors <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">Demo donor profiles for preview only — not real donors or verified statistics.</p>
        </Reveal>
      </div>
    </section>
  );
}
