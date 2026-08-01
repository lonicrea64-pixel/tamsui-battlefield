import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    minify: false
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts"
  }
});
