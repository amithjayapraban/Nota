import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      base: "/",
      includeAssets: ["logo.png"],
      manifest: {
        name: "Nota",
        short_name: "Nota",

        description: "Note taking App",
        theme_color: "rgb(240, 239, 239)",
        icons: [
          {
            src: "logo.png",
            sizes: "207x207",
            type: "image/png",
          },
          {
            src: "logo.png",
            sizes: "207x207",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  define: {
    global: {},
  },
});
