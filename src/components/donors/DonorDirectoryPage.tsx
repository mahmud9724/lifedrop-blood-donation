import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { AlertTriangle, Loader2, RotateCcw, Search, SearchX, SlidersHorizontal, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { buttonStyles } from '@/components/site/ui';
import { RequestButton, RequestSelect } from '@/components/requests/RequestControls';
import { availabilityLabels, bloodGroups, defaultDonorFilters, donorCities, filterDonors, loadDemoDonors, type DirectoryDonor, type DonorFilters } from '@/data/donors';
import { DonorCard } from './DonorCard';

export function DonorDirectoryPage({ previewError = false, onContact }: { previewError?: boolean; onContact: (slug: string) => void }) {
  const [filters, setFilters] = useState<DonorFilters>(defaultDonorFilters);
  const [donors, setDonors] = useState<DirectoryDonor[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setState('loading');
    loadDemoDonors(previewError && attempt === 0).then(data => { if (active) { setDonors(data); setState('ready'); } }).catch(() => { if (active) setState('error'); });
    return () => { active = false; };
  }, [attempt, previewError]);
  const update = (key: keyof DonorFilters, value: string) => setFilters(prev => ({ ...prev, [key]: value }));
  const reset = () => setFilters(defaultDonorFilters);
  const results = filterDonors(donors, filters);
  const activeCount = Object.entries(filters).filter(([key, value]) => key !== 'sort' && value !== defaultDonorFilters[key as keyof DonorFilters]).length;

  return <div className="bg-surface">
    <section className="border-b bg-background">
      <div className="container-page py-10 md:py-14">
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary"><Users className="h-4 w-4" aria-hidden />A community of everyday heroes</p>
        <h1 className="text-4xl font-bold md:text-5xl">Find Blood Donors</h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">Search the donor directory by name, blood group or area. Donor contact details stay private — contact happens through LifeDrop, and a donor decides whether to respond.</p>
        <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground"><AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />Fictional demo donors only. These profiles are not real people, statistics or donation records, and no contact information is shown or collected.</p>
      </div>
    </section>
    <div className="container-page py-8 md:py-10">
      <section aria-label="Search and filter donors" className="border-b pb-7">
        <label htmlFor="donor-search" className="sr-only">Search donors</label>
        <div className="relative"><Search className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" aria-hidden /><Input id="donor-search" type="search" placeholder="Search by name or city" value={filters.search} onChange={e => update('search', e.target.value)} className="h-12 rounded-xl bg-background pl-12 text-base" /></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <RequestSelect label="Blood group" value={filters.bloodGroup} onChange={v => update('bloodGroup', v)}><option value="all">All blood groups</option>{bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}</RequestSelect>
          <RequestSelect label="City / district" value={filters.city} onChange={v => update('city', v)}><option value="all">All locations</option>{donorCities.map(city => <option key={city} value={city}>{city}</option>)}</RequestSelect>
          <RequestSelect label="Availability" value={filters.availability} onChange={v => update('availability', v)}><option value="all">All availability</option>{Object.entries(availabilityLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</RequestSelect>
          <RequestSelect label="Sort by" value={filters.sort} onChange={v => update('sort', v)}><option value="name">Name (A–Z)</option><option value="location">Location (A–Z)</option><option value="donations">Most donations</option></RequestSelect>
        </div>
        {activeCount > 0 && <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground"><SlidersHorizontal className="h-4 w-4" aria-hidden />{activeCount} active {activeCount === 1 ? 'filter' : 'filters'}<RequestButton variant="ghost" size="sm" onClick={reset}><RotateCcw aria-hidden />Clear filters</RequestButton></div>}
      </section>
      <p role="status" aria-live="polite" className="mb-6 mt-6 text-sm text-muted-foreground">{state === 'loading' ? 'Loading donors…' : state === 'error' ? 'Donors unavailable' : <><span className="font-semibold text-foreground">{results.length}</span> {results.length === 1 ? 'donor' : 'donors'} found</>}</p>
      <section aria-label="Donor results" aria-busy={state === 'loading'}>
        {state === 'loading' ? <><div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden />Getting sample donors…</div><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-hidden>{Array.from({ length: 6 }, (_, i) => <div key={i} className="h-80 animate-pulse rounded-2xl border bg-muted motion-reduce:animate-none" />)}</div></>
          : state === 'error' ? <div role="alert" className="flex flex-col items-center py-16 text-center"><AlertTriangle className="h-9 w-9 text-destructive" aria-hidden /><h2 className="mt-4 text-xl font-semibold">We couldn’t load the donors</h2><p className="mb-6 mt-2 text-sm text-muted-foreground">The sample directory is temporarily unavailable. Please try again.</p><RequestButton onClick={() => setAttempt(a => a + 1)}><RotateCcw aria-hidden />Try again</RequestButton></div>
          : results.length === 0 ? <div className="flex flex-col items-center py-16 text-center"><SearchX className="h-10 w-10 text-muted-foreground" aria-hidden /><h2 className="mt-4 text-xl font-semibold">No matching donors</h2><p className="mb-6 mt-2 max-w-sm text-sm text-muted-foreground">No donors match your search and filters. Try a different location or blood group.</p><RequestButton variant="outline" onClick={reset}><RotateCcw aria-hidden />Clear filters</RequestButton></div>
          : <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">{results.map(donor => <DonorCard key={donor.slug} donor={donor} onContact={onContact} />)}</div>}
      </section>
      <div className="mt-10"><Link to="/request-blood" className={buttonStyles()}>Request Blood instead</Link></div>
    </div>
  </div>;
}
