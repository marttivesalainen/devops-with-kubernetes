import Fastify from "fastify";

const fastify = Fastify({
	logger: true,
});

let count = 0;

fastify.get("/pingpong", (_, reply) => {
	reply.send(`pong ${count}`);
	count++;
});

fastify.get("/pings", (_, reply) => {
	reply.send(count);
});

fastify.listen({ host: process.env.HOST ?? "localhost", port: 3000 }, (err) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
