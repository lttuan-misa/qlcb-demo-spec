import { defineConfig } from "vite";
import { resolve } from "path";

// Multi-page application: one entry per feature HTML page.
// Feature 001: index.html       → Danh muc Chuc vu / Chuc danh
// Feature 002: co-cau-to-chuc.html → Co cau To chuc
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        cocautoChuc: resolve(__dirname, "co-cau-to-chuc.html"),
      },
    },
  },
});
