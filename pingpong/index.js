import Fastify from "fastify";

let counter = 0;

const fastify = Fastify({
	logger: true,
});

fastify.get("/pingpong", (_, reply) => {
	reply.send(`pong ${counter}`);

	counter++;
});

fastify.listen({ host: process.env.HOST ?? "localhost", port: 3000 }, (err) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
