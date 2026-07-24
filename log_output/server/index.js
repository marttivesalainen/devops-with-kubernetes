import fs from "node:fs";
import Fastify from "fastify";

const LOG_FILE = "/tmp/log-output/log.txt";

const fastify = Fastify({
	logger: true,
});

fastify.get("/", (_, reply) => {
	fs.readFile(LOG_FILE, "utf8", (err, data) => {
		if (err) {
			console.error(`Error reading file ${LOG_FILE}:`, err);
			reply.send(null);
			return;
		}

		reply.send(data);
	});
});

fastify.listen({ host: process.env.HOST ?? "0.0.0.0", port: process.env.PORT ?? 3000 }, (err) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
