import Fastify, { type FastifyInstance } from "fastify";

export function createApp(): FastifyInstance {
	const app = Fastify();

	return app;
}
