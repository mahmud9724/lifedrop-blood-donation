import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage, pageHead } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/news")({
  head: () => pageHead("News", "Blood donation news, guides and awareness stories"),
  component: NewsPage,
});

function NewsPage() {
  return <PlaceholderPage eyebrow="News & Awareness" title="News" description="Guides, community stories, and awareness articles about blood donation." />;
}
