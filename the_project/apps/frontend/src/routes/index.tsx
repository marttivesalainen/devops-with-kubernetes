import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

type Health = { status: string };

async function fetchHealth(): Promise<Health> {
	const res = await fetch("/api/v1/health");
	if (!res.ok) {
		throw new Error(`Health request failed: ${res.status}`);
	}
	return (await res.json()) as Health;
}

function HomePage() {
	const query = useQuery({ queryKey: ["health"], queryFn: fetchHealth });

	const status = query.isLoading
		? "checking…"
		: query.isError
			? "unreachable"
			: (query.data?.status ?? "unknown");

	return (
		<main>
			<h1>Todo app</h1>
			<p>
				Backend health: <strong>{status}</strong>
			</p>

			<img src="/api/v1/image" alt="Some random content" />
		</main>
	);
}

export const Route = createFileRoute("/")({ component: HomePage });
