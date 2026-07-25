import type { ImageService } from "../services/image.service.js";
import type { AppConfig } from "./createConfig.js";

declare module "fastify" {
	interface FastifyInstance {
		config: AppConfig;
		imageService: ImageService;
	}
}
