import type { FastifyPluginAsync } from "fastify";
import { healthRoutes } from "./health.js";
import { todoRoutes } from "./todo.js";

export const apiRoutes: FastifyPluginAsync = async (app) => {
	await app.register(healthRoutes, { prefix: "/health" });
	await app.register(todoRoutes, { prefix: "/todos" });
};
