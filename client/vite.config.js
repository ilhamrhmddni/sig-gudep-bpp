import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),],
  server: {
    proxy: {
      "/auth": {
        target: "https://sig-gudep-bpp-server.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    include: ["@reduxjs/toolkit"],
  },
});
