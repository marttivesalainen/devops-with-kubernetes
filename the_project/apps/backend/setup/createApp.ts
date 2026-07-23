import Fastify, { type FastifyInstance } from "fastify";
import { registerApi } from "../routes/api.js";
import type { AppConfig } from "./createConfig.js";
import { registerFrontend } from "./registerFrontend.js";

export async function createApp(config: AppConfig): Promise<FastifyInstance> {
	const app = Fastify({ logger: true });

	await app.register(registerApi, { prefix: "/api/v1" });

	if (config.frontendDist) {
		await registerFrontend(app, { root: config.frontendDist });
	}

	return app;
}
