import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

// Devtools are dev-only — lazy so Vite tree-shakes them out of prod bundles.
const TanStackRouterDevtools = import.meta.env.PROD
	? () => null
	: lazy(() =>
			import("@tanstack/react-router-devtools").then((m) => ({
				default: m.TanStackRouterDevtools,
			})),
		);

function RootLayout() {
	return (
		<>
			<nav>
				<Link to="/">Home</Link>
			</nav>
			<hr />
			<Outlet />
			<Suspense fallback={null}>
				<TanStackRouterDevtools />
			</Suspense>
		</>
	);
}

export const Route = createRootRoute({ component: RootLayout });
