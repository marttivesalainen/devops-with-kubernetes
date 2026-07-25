export async function getRandomImage(): Promise<ArrayBuffer> {
	const newImage = await fetch("https://picsum.photos/1200", { method: "GET" });
	return await newImage.arrayBuffer();
}
