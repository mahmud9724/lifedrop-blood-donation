import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/components/site/PlaceholderPage";
import { RequestBloodForm } from "@/components/forms/RequestBloodForm";

export const Route = createFileRoute("/request-blood")({
  head: () => pageHead("Request Blood", "Post a blood request on LifeDrop (demo form)"),
  component: RequestBloodForm,
});
