import { Suspense, lazy } from "react";

const DevTools =
  process.env.NODE_ENV === "prod"
    ? () => <></> // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

export const TanStackRouterDevtools = () => (
  <Suspense>
    <DevTools />
  </Suspense>
);
