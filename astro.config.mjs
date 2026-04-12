// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

const SITE_URL = process.env.SITE_URL ?? "https://example.com";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [react(), sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 750,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/three/")) {
              return "three";
            }
            if (id.includes("node_modules/@react-three/")) {
              return "react-three";
            }
          },
        },
      },
    },
  },
  // Enable View Transitions for seamless page navigation
  prefetch: true,
});