import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage, pageHead } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("Privacy Policy", "How LifeDrop handles your information"),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <PlaceholderPage eyebrow="Legal" title="Privacy Policy" description="Our full privacy policy will be published here before launch." />;
}
