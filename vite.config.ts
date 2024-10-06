import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@styles": "/src/assets/styles",
      "@components": "/src/components",
      "@images": "/src/assets/images",
      "@fonts": "/src/assets/fonts",
      "@types": "/src/types",
    },
  },
});
