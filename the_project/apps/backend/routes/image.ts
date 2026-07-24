import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const imageRoutes: FastifyPluginAsyncZod = async (app) => {
	app.get("/image", async (_, res) => {
		const { contentType, stream } = await app.imageService.getImage();

		return res.type(contentType).send(stream);
	});
};
