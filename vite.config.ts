import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";
import { connectDB } from "./server/db";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Connect to MongoDB in dev — otherwise every /api request fails
      connectDB().catch((err) =>
        console.error("❌ MongoDB connection failed:", err.message),
      );

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
