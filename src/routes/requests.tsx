import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, SearchX } from "lucide-react";
import { pageHead } from "@/components/site/PlaceholderPage";
import { RequestCard } from "@/components/site/Cards";
import { sampleRequests, type BloodGroup } from "@/data/sample";

export const Route = createFileRoute("/requests")({
  validateSearch: (s: Record<string, unknown>): { id?: string } => ({ id: typeof s.id === "string" ? s.id : undefined }),
  head: () => pageHead("Blood Requests", "Browse open blood requests from the LifeDrop community."),
  component: RequestsPage,
});

const groups: (BloodGroup | "All")[] = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function RequestsPage() {
  const { id } = Route.useSearch();
  const [group, setGroup] = useState<(typeof groups)[number]>("All");
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t); }, [group]);

  const list = sampleRequests.filter((r) => group === "All" || r.bloodGroup === group);

  return (
    <section className="bg-surface">
      <div className="container-page py-16 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Blood Requests</p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">Open requests</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Sample requests shown for preview. Always confirm details directly with the hospital before donating.</p>
        {id && <p className="mt-4 rounded-xl border bg-background p-4 text-sm" role="status">Detailed view for request <strong>{id}</strong> is coming soon.</p>}

        <fieldset className="mt-8">
          <legend className="text-sm font-semibold">Filter by blood group</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {groups.map((g) => (
              <button key={g} type="button" aria-pressed={group === g} onClick={() => { setLoading(true); setGroup(g); }}
                className={"h-9 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " + (group === g ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary hover:text-primary")}>
                {g}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-8" aria-live="polite">
          {loading ? (
            <div className="flex items-center gap-2 py-16 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading requests…</div>
          ) : list.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed bg-background py-16 text-center">
              <SearchX className="h-8 w-8 text-muted-foreground" aria-hidden />
              <p className="mt-3 font-semibold">No open requests for {group}</p>
              <p className="mt-1 text-sm text-muted-foreground">Try another blood group or check back later.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((r) => <RequestCard key={r.id} request={r} />)}</div>
          )}
        </div>
      </div>
    </section>
  );
}
