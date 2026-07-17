import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

const myAppRoutes = ["/notices", "/account", "/register", "/recover/account"];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: "https://jnotifier.devapps.codingworks.in",
      readable: true,
      dynamicRoutes: myAppRoutes,
    }),
  ],
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
});
