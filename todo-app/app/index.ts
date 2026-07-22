import process from "node:process";
import { createApp } from "./setup/createApp.js";
import { createConfig } from "./setup/createConfig.js";

async function run() {
	const config = createConfig();

	const app = createApp();

	app.listen({ port: config.port }, (err) => {
		if (err) {
			throw new Error("Failed to start the server");
		}

		console.log(`Server started in port ${config.port}`);
	});
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
