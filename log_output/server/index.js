import fs from "node:fs";
import Fastify from "fastify";

const LOG_FILE = "/tmp/log-output/log.txt";
const COUNTER_FILE = "/tmp/log-output/counter.txt";

const fastify = Fastify({
	logger: true,
});

const getCurrentCount = () => {
	if (fs.existsSync(COUNTER_FILE)) {
		return parseInt(fs.readFileSync(COUNTER_FILE, "utf-8"), 10);
	}
	return 0;
};

const getCurrentLogEntry = () => {
	if (fs.existsSync(LOG_FILE)) {
		return fs.readFileSync(LOG_FILE, "utf-8");
	}
	return "";
};

fastify.get("/", (_, reply) => {
	const logEntry = getCurrentLogEntry();
	const currentCount = getCurrentCount();

	const response = `${logEntry}\nPing / Pongs: ${currentCount}`;

	reply.send(response);
});

fastify.listen({ host: process.env.HOST ?? "0.0.0.0", port: process.env.PORT ?? 3000 }, (err) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
