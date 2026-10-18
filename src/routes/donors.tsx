import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage, pageHead } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/donors")({
  head: () => pageHead("Find Donors", "Search for donors by blood group and city"),
  component: DonorsPage,
});

function DonorsPage() {
  return <PlaceholderPage eyebrow="Find Donors" title="Find Donors" description="Donor discovery will let you search by blood group and area while keeping donor contact details private until they choose to respond." />;
}
