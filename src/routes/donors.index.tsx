import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { DonorDirectoryPage } from '@/components/donors/DonorDirectoryPage';
import { DonorContactDialog } from '@/components/donors/DonorContactDialog';
import { findDonorBySlug } from '@/data/donors';

export const Route = createFileRoute('/donors/')({
  component: DonorsIndexRoute,
});

function DonorsIndexRoute() {
  const { preview } = Route.useSearch();
  const [contactSlug, setContactSlug] = useState<string | undefined>();
  return <>
    <DonorDirectoryPage previewError={preview === 'error'} onContact={setContactSlug} />
    <DonorContactDialog donor={contactSlug ? findDonorBySlug(contactSlug) : undefined} onClose={() => setContactSlug(undefined)} />
  </>;
}
