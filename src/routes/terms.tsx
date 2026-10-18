import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage, pageHead } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/terms")({
  head: () => pageHead("Terms of Service", "Terms for using LifeDrop"),
  component: TermsPage,
});

function TermsPage() {
  return <PlaceholderPage eyebrow="Legal" title="Terms of Service" description="Our terms of service will be published here before launch." />;
}
