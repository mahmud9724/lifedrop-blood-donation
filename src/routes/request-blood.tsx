import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage, pageHead } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/request-blood")({
  head: () => pageHead("Request Blood", "Post a blood request on LifeDrop"),
  component: RequestBloodPage,
});

function RequestBloodPage() {
  return <PlaceholderPage eyebrow="Request Blood" title="Request Blood" description="Soon you'll be able to post a request with blood group, units, hospital and date so nearby donors can respond." />;
}
