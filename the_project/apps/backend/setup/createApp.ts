import sensible from "@fastify/sensible";
import Fastify, { type FastifyInstance } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { apiRoutes } from "../routes/index.js";
import { createImageService } from "../services/image.service.js";
import type { AppConfig } from "./createConfig.js";
import "./decorators.js";
import { registerFrontend } from "./registerFrontend.js";

export async function createApp(config: AppConfig): Promise<FastifyInstance> {
	const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.decorate("config", config);
	app.decorate("imageService", createImageService({ cacheDir: config.cacheDir }));

	await app.register(sensible);
	await app.register(apiRoutes, { prefix: "/api/v1" });

	if (config.frontendDist) {
		await registerFrontend(app, { root: config.frontendDist });
	}

	return app;
}
