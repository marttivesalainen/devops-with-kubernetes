import fs from "node:fs";

export function initCache(cacheDir: string): Promise<void> {
	try {
		if (!fs.existsSync(cacheDir)) {
			fs.mkdirSync(cacheDir, { recursive: true });
		}
		return Promise.resolve();
	} catch (err) {
		return Promise.reject(err);
	}
}
