import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],

  output: "static",
  // Change this to your base URL if you want to deploy the site somewhere else
  site: "https://eramdam.github.io",
  base: "/mastodon-archive-viewer",
});
