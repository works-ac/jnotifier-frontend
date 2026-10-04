import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

const myAppRoutes = [
  "/",
  "/notices",
  "/archives",
];

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: "https://www.thejobnotifier.in",
      readable: true,
      outDir: "public",
      dynamicRoutes: myAppRoutes,
      exclude: ["/googleff9dd0933426b5fb"],
      robots: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/account", "/register", "/recover", "/offline"],
        },
      ],
    }),
  ],
  server: {
    port: 4242,
    host: "0.0.0.0",
  },
});
