import { createFileRoute, redirect } from "@tanstack/react-router";

// The original /donate URL keeps working and forwards to the donor registration form.
export const Route = createFileRoute("/donate")({
  beforeLoad: () => {
    throw redirect({ to: "/donate-blood", replace: true });
  },
});
