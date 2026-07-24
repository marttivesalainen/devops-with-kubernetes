import fs from "node:fs";
import path from "node:path";
import type { Readable } from "node:stream";
import { fileTypeFromFile } from "file-type";
import { getRandomImage } from "../clients/picsum.client.js";

const TEN_MINUTES_IN_MS = 10 * 60 * 1000;
const FALLBACK_CONTENT_TYPE = "application/octet-stream";

export type ImageResponse = {
	contentType: string;
	stream: Readable;
};

export type ImageService = {
	getImage: () => Promise<ImageResponse>;
};

export type ImageServiceOptions = {
	cacheDir: string;
	fileName?: string;
	ttlMs?: number;
};

export function createImageService(options: ImageServiceOptions): ImageService {
	const cachedImagePath = path.join(options.cacheDir, options.fileName ?? "image");
	const ttlMs = options.ttlMs ?? TEN_MINUTES_IN_MS;

	const shouldRefreshCachedImage = (): boolean => {
		if (!fs.existsSync(cachedImagePath)) {
			return true;
		}
		const fileStat = fs.statSync(cachedImagePath);
		return fileStat.mtimeMs < Date.now() - ttlMs;
	};

	const refreshCachedImage = async (): Promise<void> => {
		const arrayBuffer = await getRandomImage();
		fs.writeFileSync(cachedImagePath, Buffer.from(arrayBuffer));
	};

	return {
		async getImage(): Promise<ImageResponse> {
			if (shouldRefreshCachedImage()) {
				await refreshCachedImage();
			}
			const detected = await fileTypeFromFile(cachedImagePath);
			return {
				contentType: detected?.mime ?? FALLBACK_CONTENT_TYPE,
				stream: fs.createReadStream(cachedImagePath),
			};
		},
	};
}
