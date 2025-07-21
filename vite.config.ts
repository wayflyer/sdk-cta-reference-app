import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), analyzer()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
