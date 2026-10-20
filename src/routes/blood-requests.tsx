import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/components/site/PlaceholderPage';
import { BloodRequestsPage } from '@/components/requests/BloodRequestsPage';

export const Route = createFileRoute('/blood-requests')({
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s['id'] === 'string' ? s['id'] : undefined, preview: typeof s['preview'] === 'string' ? s['preview'] : undefined }),
  head: () => pageHead('Blood Requests', 'Discover community blood requests by blood group, location, urgency and status with LifeDrop.'),
  component: BloodRequestsRoute,
});
function BloodRequestsRoute() {
  const { id, preview } = Route.useSearch();
  const navigate = Route.useNavigate();
  return <BloodRequestsPage id={id} previewError={preview === 'error'} onSelect={selected => { void navigate({ search: prev => ({ ...prev, id: selected }) }); }} />;
}
