import sensible from "@fastify/sensible";
import Fastify, { type FastifyInstance } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { apiRoutes } from "../routes/index.js";
import type { AppConfig } from "./createConfig.js";
import "./decorators.js";

export async function createApp(config: AppConfig): Promise<FastifyInstance> {
	const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.decorate("config", config);

	await app.register(sensible);
	await app.register(apiRoutes, { prefix: "/api/v1" });

	return app;
}
