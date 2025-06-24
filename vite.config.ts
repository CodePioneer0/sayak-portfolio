import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize for performance
    target: "es2015",
    minify: "terser",
    sourcemap: false, // Disable source maps for production
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"], // Remove specific console calls
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          framer: ["framer-motion"],
          ui: ["@radix-ui/react-slot", "@radix-ui/react-toast"],
          utils: ["clsx", "tailwind-merge", "class-variance-authority"],
        },
        // Optimize chunk file names
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  optimizeDeps: {
    include: ["framer-motion"],
  },
});
