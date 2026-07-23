import crypto from "node:crypto";
import Fastify from "fastify";

const UUID = crypto.randomUUID();

const fastify = Fastify({
	logger: true,
});

fastify.get("/status", (_, reply) => {
	const timestamp = new Date().toISOString();

	reply.send(`${timestamp}: ${UUID}`);
});

fastify.listen({ host: "0.0.0.0", port: 3000 }, (err) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
