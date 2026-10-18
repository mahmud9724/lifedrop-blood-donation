import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage, pageHead } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/login")({
  head: () => pageHead("Login", "Sign in to your LifeDrop account"),
  component: LoginPage,
});

function LoginPage() {
  return <PlaceholderPage eyebrow="Account" title="Login" description="Sign-in is not available yet. Soon you'll be able to manage your donor profile and requests here." />;
}
