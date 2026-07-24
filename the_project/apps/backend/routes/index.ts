import type { FastifyPluginAsync } from "fastify";
import { healthRoutes } from "./health.js";
import { imageRoutes } from "./image.js";

export const apiRoutes: FastifyPluginAsync = async (app) => {
	await app.register(healthRoutes);
	await app.register(imageRoutes);
};
