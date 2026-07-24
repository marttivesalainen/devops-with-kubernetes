import crypto from "node:crypto";
import Fastify from "fastify";

const RANDOM_UUID = crypto.randomUUID();
const PINGS_ENDPOINT = "http://pingpong-svc:2345/pings";

const fastify = Fastify({
	logger: true,
});

const getCurrentPingCount = async () => {
	const response = await fetch(PINGS_ENDPOINT);
	const count = await response.text();
	return count;
};

const getCurrentLogEntry = () => {
	const timestamp = new Date().toISOString();

	return `${timestamp}: ${RANDOM_UUID}`;
};

fastify.get("/", async (_, reply) => {
	const logEntry = getCurrentLogEntry();
	const currentCount = await getCurrentPingCount();

	const response = `${logEntry}\nPing / Pongs: ${currentCount}`;

	reply.send(response);
});

fastify.listen({ host: process.env.HOST ?? "0.0.0.0", port: process.env.PORT ?? 3000 }, (err) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
