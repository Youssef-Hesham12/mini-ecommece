import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/cart")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_user/cart"!</div>;
}
