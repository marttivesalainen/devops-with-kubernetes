import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchJson } from "../api/fetchJson";

export type Health = { status: string };

const healthKeys = {
	all: ["health"] as const,
};

async function fetchHealth(): Promise<Health> {
	return fetchJson<Health>("/api/v1/health");
}

export function healthQueryOptions() {
	return queryOptions({
		queryKey: healthKeys.all,
		queryFn: fetchHealth,
	});
}

export function useHealthQuery() {
	return useQuery(healthQueryOptions());
}
