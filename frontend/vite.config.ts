import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// 👇 Ajoute ce middleware custom
const fixManifestContentType = () => ({
  name: "fix-manifest-content-type",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === "/manifest.json") {
        res.setHeader("Content-Type", "application/manifest+json");
      }
      next();
    });
  },
});

export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    fixManifestContentType(), // 👈 Ajout ici
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));