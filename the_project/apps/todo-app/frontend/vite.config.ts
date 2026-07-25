import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		// Must run before @vitejs/plugin-react.
		tanstackRouter({ target: "react", autoCodeSplitting: true }),
		react(),
		tailwindcss(),
	],
	server: {
		port: 5173,
		// In production, an Ingress dispatches by path prefix to the two backend
		// Services. In dev we mirror that split here: more specific prefixes must
		// come first, because Vite matches proxy keys in declared order.
		proxy: {
			"/api/v1/todos": {
				target: "http://localhost:3001",
				changeOrigin: true,
			},
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
		},
	},
	build: {
		outDir: "dist",
		emptyOutDir: true,
		sourcemap: true,
	},
});
