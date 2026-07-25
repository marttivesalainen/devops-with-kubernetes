import fastifyStatic from "@fastify/static";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

type FrontendOptions = { root: string };

function spaFallback(request: FastifyRequest, reply: FastifyReply): void {
	if (request.url.startsWith("/api/")) {
		reply.code(404).send({ statusCode: 404, error: "Not Found" });
		return;
	}
	reply.sendFile("index.html");
}

export async function registerFrontend(
	app: FastifyInstance,
	options: FrontendOptions,
): Promise<void> {
	await app.register(fastifyStatic, { root: options.root, wildcard: false });
	app.setNotFoundHandler(spaFallback);
}
