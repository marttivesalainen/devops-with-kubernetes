import process from "node:process";
import { createApp } from "./setup/createApp.js";
import { createConfig } from "./setup/createConfig.js";

async function run(): Promise<void> {
	const config = createConfig();
	const app = await createApp(config);

	await app.listen({ port: config.port, host: config.host });
	console.log(`Server started on ${config.host}:${config.port}`);
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
