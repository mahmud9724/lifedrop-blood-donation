import { useState } from 'react';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { pageHead } from '@/components/site/PlaceholderPage';
import { DonorProfilePage } from '@/components/donors/DonorProfilePage';
import { DonorContactDialog } from '@/components/donors/DonorContactDialog';
import { availabilityLabels, demoDonors, findDonorBySlug } from '@/data/donors';

export const Route = createFileRoute('/donors/$slug')({
  head: ({ params }) => {
    const donor = findDonorBySlug(params.slug);
    return donor
      ? pageHead(`${donor.name} — Blood Donor`, `${donor.bloodGroup} donor in ${donor.city}, ${availabilityLabels[donor.availability].toLowerCase()}. A fictional demo profile from the LifeDrop donor directory.`)
      : pageHead('Donor profile unavailable', 'This donor profile is not part of the LifeDrop sample directory.');
  },
  loader: ({ params }) => {
    if (!demoDonors.some(d => d.slug === params.slug)) throw notFound();
  },
  component: DonorProfileRoute,
});

function DonorProfileRoute() {
  const { slug } = Route.useParams();
  const donor = findDonorBySlug(slug);
  const [contactOpen, setContactOpen] = useState(false);
  if (!donor) throw notFound();
  return <>
    <DonorProfilePage donor={donor} onContact={() => setContactOpen(true)} />
    <DonorContactDialog donor={contactOpen ? donor : undefined} onClose={() => setContactOpen(false)} />
  </>;
}
