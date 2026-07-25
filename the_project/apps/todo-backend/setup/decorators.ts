import type { AppConfig } from "./createConfig.js";

declare module "fastify" {
	interface FastifyInstance {
		config: AppConfig;
	}
}
