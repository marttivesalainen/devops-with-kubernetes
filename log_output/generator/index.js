import crypto from "node:crypto";
import fs from "node:fs";

const UUID = crypto.randomUUID();
const TIMEOUT = 5000;

const LOG_DIR = "/tmp/log-output";
if (!fs.existsSync(LOG_DIR)) {
	fs.mkdirSync(LOG_DIR, { recursive: true });
}

const LOG_FILE = `${LOG_DIR}/log.txt`;

const writeLine = () => {
	const timestamp = new Date().toISOString();
	const line = `${timestamp}: ${UUID}`;

	fs.writeFile(LOG_FILE, line, (err) => {
		if (err) {
			console.error(`Error writing to file ${LOG_FILE}:`, err);
		}
	});

	setTimeout(() => {
		writeLine();
	}, TIMEOUT);
};

writeLine();
