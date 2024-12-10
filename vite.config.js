import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	loadEnv(mode, process.cwd());

	return {
		plugins: [react(), , svgr()],
		server: {
			port: 7002,
		},
	};
});
