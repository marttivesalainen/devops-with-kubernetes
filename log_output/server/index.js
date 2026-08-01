import crypto from "node:crypto";
import fs from "node:fs";
import Fastify from "fastify";

const RANDOM_UUID = crypto.randomUUID();
const PINGS_ENDPOINT = "http://pingpong-svc:2345/pings";

const readFileContents = async (filePath) => {
	try {
		const data = await fs.promises.readFile(filePath, "utf8");
		return data;
	} catch (err) {
		console.error(`Error reading file from disk: ${err}`);
		return null;
	}
};

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

	const fileContents = await readFileContents("/etc/config/file.txt");
	const response = [
		`file contents: ${fileContents}`,
		`env variable: MESSAGE=${process.env.MESSAGE}`,
		`${logEntry}`,
		`Ping / Pongs: ${currentCount}`,
	]
		.map((line) => line.trim())
		.join("\n");

	reply.send(response);
});

fastify.listen({ host: process.env.HOST ?? "0.0.0.0", port: process.env.PORT ?? 3000 }, (err) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
