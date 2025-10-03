import { defineConfig } from "vite";
import path from "path";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  plugins: [wasm()],
  resolve: {
    alias: {
      "@config": path.resolve(__dirname, "src/config"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@models": path.resolve(__dirname, "src/models"),
      "@data": path.resolve(__dirname, "src/data"),
      "@declarations": path.resolve(__dirname, "src/declarations"),
      // Add more aliases as needed
    },
  },
});
