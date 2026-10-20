import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { AlertTriangle, ArrowDown, HeartHandshake, Loader2, RotateCcw, Search, SearchX, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { buttonStyles } from '@/components/site/ui';
import { bloodGroups, canHelp, defaultFilters, filterRequests, loadDemoRequests, requestCities, statusLabels, type ListedRequest, type RequestFilters } from '@/data/blood-requests';
import { BloodRequestCard } from './BloodRequestCard';
import { RequestButton, RequestSelect } from './RequestControls';
import { RequestDetails } from './RequestDetails';

const pageSize = 6;
export function BloodRequestsPage({ id, previewError = false, onSelect }: { id?: string; previewError?: boolean; onSelect: (id?: string) => void }) {
  const [filters, setFilters] = useState<RequestFilters>(defaultFilters);
  const [requests, setRequests] = useState<ListedRequest[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  const [visible, setVisible] = useState(pageSize);
  const [helping, setHelping] = useState(false);
  useEffect(() => {
    let active = true;
    setState('loading');
    loadDemoRequests(previewError && attempt === 0).then(data => { if (active) { setRequests(data); setState('ready'); } }).catch(() => { if (active) setState('error'); });
    return () => { active = false; };
  }, [attempt, previewError]);
  const update = (key: keyof RequestFilters, value: string) => { setFilters(prev => ({ ...prev, [key]: value })); setVisible(pageSize); };
  const reset = () => { setFilters(defaultFilters); setVisible(pageSize); };
  const results = filterRequests(requests, filters);
  const selected = requests.find(r => r.id === id);
  const activeCount = Object.entries(filters).filter(([key, value]) => key !== 'sort' && value !== defaultFilters[key as keyof RequestFilters]).length;
  const show = (requestId: string, help = false) => { setHelping(help); onSelect(requestId); };

  return <div className="bg-surface">
    <section className="border-b bg-background">
      <div className="container-page py-10 md:py-14">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs text-muted-foreground"><Link to="/" className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Home</Link><span aria-hidden>/</span><span aria-current="page">Blood Requests</span></nav>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div><p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary"><HeartHandshake className="h-4 w-4" aria-hidden />A community ready to help</p><h1 className="text-4xl font-bold md:text-5xl">Blood Requests</h1><p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">Discover people who need blood, find a request near you, and see where your donation could make a difference.</p></div>
          <Link to="/request-blood" className={buttonStyles({ className: 'shrink-0 self-start' })}>Request Blood <HeartHandshake className="h-4 w-4" aria-hidden /></Link>
        </div>
        <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground"><AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />Fictional demo requests only. No real donor responses are sent. All times shown in UTC.</p>
      </div>
    </section>
    <div className="container-page py-8 md:py-10">
      <section aria-label="Search and filter requests" className="border-b pb-7">
        <label htmlFor="request-search" className="sr-only">Search requests</label>
        <div className="relative"><Search className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" aria-hidden /><Input id="request-search" type="search" placeholder="Search by hospital, city, blood group or request ID" value={filters.search} onChange={e => update('search', e.target.value)} className="h-12 rounded-xl bg-background pl-12 text-base" /></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <RequestSelect label="Blood group" value={filters.bloodGroup} onChange={v => update('bloodGroup', v)}><option value="all">All blood groups</option>{bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}</RequestSelect>
          <RequestSelect label="City / location" value={filters.city} onChange={v => update('city', v)}><option value="all">All locations</option>{requestCities.map(city => <option key={city} value={city}>{city}</option>)}</RequestSelect>
          <RequestSelect label="Urgency" value={filters.urgency} onChange={v => update('urgency', v)}><option value="all">All urgency levels</option><option value="critical">Critical / emergency</option><option value="urgent">Urgent</option><option value="normal">Scheduled</option></RequestSelect>
          <RequestSelect label="Request status" value={filters.status} onChange={v => update('status', v)}><option value="all">All statuses</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</RequestSelect>
        </div>
        {activeCount > 0 && <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground"><SlidersHorizontal className="h-4 w-4" aria-hidden />{activeCount} active {activeCount === 1 ? 'filter' : 'filters'}<RequestButton variant="ghost" size="sm" onClick={reset}><RotateCcw aria-hidden />Clear filters</RequestButton></div>}
      </section>
      <div className="mb-6 mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground">{state === 'loading' ? 'Loading requests…' : state === 'error' ? 'Requests unavailable' : <><span className="font-semibold text-foreground">{results.length}</span> {results.length === 1 ? 'request' : 'requests'} found{results.length > 0 && ` · Showing ${Math.min(visible, results.length)} of ${results.length}`}</>}</p>
        <div className="w-full sm:w-48"><RequestSelect label="Sort by" value={filters.sort} onChange={v => update('sort', v)}><option value="newest">Newest first</option><option value="urgent">Most urgent first</option></RequestSelect></div>
      </div>
      <section aria-label="Blood request results" aria-busy={state === 'loading'}>
        {state === 'loading' ? <><div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden />Getting sample requests…</div><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-hidden>{Array.from({ length: 6 }, (_, i) => <div key={i} className="h-96 animate-pulse rounded-2xl border bg-muted motion-reduce:animate-none" />)}</div></> : state === 'error' ? <div role="alert" className="flex flex-col items-center py-16 text-center"><AlertTriangle className="h-9 w-9 text-destructive" aria-hidden /><h2 className="mt-4 text-xl font-semibold">We couldn’t load the requests</h2><p className="mb-6 mt-2 text-sm text-muted-foreground">The sample list is temporarily unavailable. Please try again.</p><RequestButton onClick={() => setAttempt(a => a + 1)}><RotateCcw aria-hidden />Try again</RequestButton></div> : results.length === 0 ? <div className="flex flex-col items-center py-16 text-center"><SearchX className="h-10 w-10 text-muted-foreground" aria-hidden /><h2 className="mt-4 text-xl font-semibold">No matching requests</h2><p className="mb-6 mt-2 max-w-sm text-sm text-muted-foreground">No requests match your search and filters. Try a different location or blood group.</p><RequestButton variant="outline" onClick={reset}><RotateCcw aria-hidden />Clear filters</RequestButton></div> : <>
          <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">{results.slice(0, visible).map(r => <BloodRequestCard key={r.id} request={r} onDetails={requestId => show(requestId)} onHelp={requestId => show(requestId, true)} />)}</div>
          <div className="flex flex-col items-center gap-3 py-9">{visible < results.length ? <RequestButton variant="outline" onClick={() => setVisible(v => v + pageSize)}><ArrowDown aria-hidden />Load more requests</RequestButton> : <p className="text-sm text-muted-foreground">You’ve seen all {results.length} {results.length === 1 ? 'request' : 'requests'}.</p>}<p className="text-xs text-muted-foreground">Showing {Math.min(visible, results.length)} of {results.length} requests</p></div>
        </>}
      </section>
    </div>
    {state === 'ready' && <RequestDetails request={selected} missing={Boolean(id) && !selected} helping={helping && Boolean(selected && canHelp(selected))} onClose={() => { onSelect(undefined); setHelping(false); }} onHelp={() => setHelping(true)} />}
  </div>;
}
