import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches the new listing and preserves the existing requests URL", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/blood-requests").at(-1)?.routeId).toBe("/blood-requests");
    expect(router.matchRoutes("/requests").at(-1)?.routeId).toBe("/requests");
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it("matches the donor directory and a donor profile page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/donors").at(-1)?.routeId).toBe("/donors");
    expect(router.matchRoutes("/donors/amara-h").at(-1)?.routeId).toBe("/donors/$slug");
  });
});
