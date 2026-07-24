import process from "node:process";
import { z } from "zod";

const configSchema = z.object({
	PORT: z.coerce.number().int().positive(),
	HOST: z.string().min(1).default("0.0.0.0"),
	FRONTEND_DIST: z.string().min(1).optional(),
	CACHE_DIR: z.string().min(1).default("/cache"),
});

export type AppConfig = {
	port: number;
	host: string;
	frontendDist: string | undefined;
	cacheDir: string;
};

export function createConfig(): AppConfig {
	const parsed = configSchema.safeParse(process.env);

	if (!parsed.success) {
		const details = parsed.error.issues
			.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
			.join("; ");
		throw new Error(`Invalid environment configuration: ${details}`);
	}

	return {
		port: parsed.data.PORT,
		host: parsed.data.HOST,
		frontendDist: parsed.data.FRONTEND_DIST,
		cacheDir: parsed.data.CACHE_DIR,
	};
}
