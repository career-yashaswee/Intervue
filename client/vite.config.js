import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname } from "path";
import commonjs from "@rollup/plugin-commonjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   host: "192.168.122.219", // or '0.0.0.0' to allow access from any network
  //   port: 5173,
  //   https: {
  //     key: "./server.key", // Path to your private key
  //     cert: "./server.crt", // Path to your certificate
  //   },
  // },
  plugins: [react(), commonjs()],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  build: {
    sourcemap: true, // Enable source maps only in production
  },

  commonjsOptions: {
    esmExternals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
