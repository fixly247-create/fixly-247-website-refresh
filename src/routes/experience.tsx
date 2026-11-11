import { createFileRoute, redirect } from "@tanstack/react-router";

// The Experience page was removed; old links land on the home page instead of a 404.
export const Route = createFileRoute("/experience")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
