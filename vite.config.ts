import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/AnchalP/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});

