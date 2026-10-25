import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/components/site/PlaceholderPage";
import { BecomeDonorForm } from "@/components/forms/BecomeDonorForm";

export const Route = createFileRoute("/donate-blood")({
  head: () => pageHead("Become a Donor", "Register your interest in donating blood with LifeDrop (demo form)"),
  component: BecomeDonorForm,
});
