import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@app-types": "/src/types",
			"@context": "/src/Contexts",
			"@api": "/src/API",
			"@components": "/src/Components"
		}
	}
});
