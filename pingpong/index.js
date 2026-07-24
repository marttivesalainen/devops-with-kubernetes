import fs from "node:fs";
import Fastify from "fastify";

const DATA_DIR = "/tmp/pingpong";
if (!fs.existsSync(DATA_DIR)) {
	fs.mkdirSync(DATA_DIR, { recursive: true });
}

const COUNTER_FILE = `${DATA_DIR}/counter.txt`;

const fastify = Fastify({
	logger: true,
});

const getCurrentCount = () => {
	if (fs.existsSync(COUNTER_FILE)) {
		return parseInt(fs.readFileSync(COUNTER_FILE, "utf-8"), 10);
	}
	return 0;
};

fastify.get("/pingpong", (_, reply) => {
	const currentCount = getCurrentCount();

	reply.send(`pong ${currentCount}`);

	const newCount = currentCount + 1;
	fs.writeFileSync(COUNTER_FILE, newCount.toString());
});

fastify.listen({ host: process.env.HOST ?? "localhost", port: 3000 }, (err) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
