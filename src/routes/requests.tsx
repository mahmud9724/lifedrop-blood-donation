import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/components/site/PlaceholderPage";
import { BloodRequestsPage } from "@/components/requests/BloodRequestsPage";

export const Route = createFileRoute("/requests")({
  validateSearch: (s: Record<string, unknown>): { id?: string | undefined } => ({ id: typeof s["id"] === "string" ? s["id"] : undefined }),
  head: () => pageHead("Blood Requests", "Browse open blood requests from the LifeDrop community."),
  component: RequestsPage,
});

function RequestsPage() {
  const { id } = Route.useSearch();
  const navigate = Route.useNavigate();
  return <BloodRequestsPage id={id} onSelect={selected => { void navigate({ search: { id: selected } }); }} />;
}
