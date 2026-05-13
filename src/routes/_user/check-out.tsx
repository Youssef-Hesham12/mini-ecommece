import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/check-out")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_user/check-out"!</div>;
}
