import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/components/site/PlaceholderPage';
import { DonorDirectoryPage } from '@/components/donors/DonorDirectoryPage';
import { DonorContactDialog } from '@/components/donors/DonorContactDialog';
import { findDonorBySlug } from '@/data/donors';

export const Route = createFileRoute('/donors')({
  validateSearch: (s: Record<string, unknown>): { preview?: string | undefined } => ({ preview: typeof s['preview'] === 'string' ? s['preview'] : undefined }),
  head: () => pageHead('Find Blood Donors', 'Search the LifeDrop community donor directory by blood group, city and availability. Fictional demo donors, with contact details kept private.'),
  component: DonorsRoute,
});

function DonorsRoute() {
  const { preview } = Route.useSearch();
  const [contactSlug, setContactSlug] = useState<string | undefined>();
  return <>
    <DonorDirectoryPage previewError={preview === 'error'} onContact={setContactSlug} />
    <DonorContactDialog donor={contactSlug ? findDonorBySlug(contactSlug) : undefined} onClose={() => setContactSlug(undefined)} />
  </>;
}
