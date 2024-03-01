import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import Sources from "../components/Sources";
import { TanStackRouterDevtools } from "../utils/TanStackRouterDevtools";

const Root = () => {
  // const savedSources = localStorage.getItem("savedSources");
  const savedSources = true;

  return (
    <>
      <Header />
      <main>{!!savedSources ? <Outlet /> : <Sources />}</main>
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
});
