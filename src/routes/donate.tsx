import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage, pageHead } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/donate")({
  head: () => pageHead("Donate Blood", "Register as a blood donor with LifeDrop"),
  component: DonatePage,
});

function DonatePage() {
  return <PlaceholderPage eyebrow="Donate Blood" title="Donate Blood" description="Register as a donor, set your availability, and get notified when someone nearby needs your blood group. Always confirm eligibility with your local blood center." />;
}
