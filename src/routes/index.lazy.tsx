import { createLazyFileRoute } from "@tanstack/react-router";
import Listing from "../components/Listing";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Listing />
    </>
  );
}
