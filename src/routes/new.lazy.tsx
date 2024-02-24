import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/new")({
  component: New,
});

function New() {
  return <>new</>;
}
