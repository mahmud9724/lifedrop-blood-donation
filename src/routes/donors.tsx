import { Outlet } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/components/site/PlaceholderPage';

export const Route = createFileRoute('/donors')({
  validateSearch: (s: Record<string, unknown>): { preview?: string | undefined } => ({ preview: typeof s['preview'] === 'string' ? s['preview'] : undefined }),
  head: () => pageHead('Find Blood Donors', 'Search the LifeDrop community donor directory by blood group, city and availability. Fictional demo donors, with contact details kept private.'),
  component: () => <Outlet />,
});
