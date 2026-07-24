export class HttpError extends Error {
	readonly status: number;

	constructor(status: number, message: string) {
		super(message);
		this.name = "HttpError";
		this.status = status;
	}
}

export async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
	const res = await fetch(input, init);
	if (!res.ok) {
		throw new HttpError(res.status, `Request failed: ${res.status}`);
	}
	return (await res.json()) as T;
}
