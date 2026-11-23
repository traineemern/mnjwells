import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { Server } from "lucide-react";

const staticRoutes = ["services", "about", "faq", "contact", "404"];

function staticRoutePages() {
  return {
    name: "static-route-pages",
    apply: "build",
    closeBundle() {
      const source = resolve("dist/index.html");
      for (const route of staticRoutes) {
        const destination = resolve(`dist/${route}/index.html`);
        mkdirSync(dirname(destination), { recursive: true });
        copyFileSync(source, destination);
      }
    },
  };
}


export default defineConfig({
  plugins: [react(), tailwindcss(), staticRoutePages()],
  server: {
    allowedHosts: ['.loca.lt'] // Allows any *.loca.lt subdomain
  }
});
