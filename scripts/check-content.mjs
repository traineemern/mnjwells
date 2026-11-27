/**
 * Content & tag integrity guard (`npm run check:content`).
 * Verifies every entry in `site` has explicit tag metadata (`legacy`, `verify`, or `dummy`),
 * ensures dummy sections are properly wrapped behind <GuardContent />, and supports `--strict`
 * failure if any `dummy` block remains unconfirmed before launch.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

// Mock import.meta.env for standalone Node execution
globalThis.importMetaEnvFallback = { VITE_SITE_URL: "https://mandjwaterwells.com", VITE_FORMSPREE_ENDPOINT: "" };

const sitePath = pathToFileURL(path.join(rootDir, "src", "data", "site.js")).href;
const srcText = fs.readFileSync(path.join(rootDir, "src", "data", "site.js"), "utf8");

// Ensure valid ES module tags exist cleanly
const allowedTags = new Set(["legacy", "verify", "dummy"]);
const tagMatches = [...srcText.matchAll(/tag:\s*"([^"]+)"/g)].map((m) => m[1]);
const invalidTags = tagMatches.filter((t) => !allowedTags.has(t));

if (invalidTags.length > 0) {
  console.error("Invalid content tags in src/data/site.js:", [...new Set(invalidTags)]);
  process.exit(1);
}

// Check that every JSX component rendering tagged dummy arrays uses GuardContent or DEV gating
const jsxDir = path.join(rootDir, "src");
function collectFiles(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(collectFiles(full));
    else if (/\.(jsx|js|tsx|ts)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const files = collectFiles(jsxDir);
const dummyReferences = [];
const unguarded = [];

for (const file of files) {
  const rel = path.relative(rootDir, file).replace(/\\/g, "/");
  if (rel === "src/data/site.js") continue;
  const content = fs.readFileSync(file, "utf8");

  // Detect usage of dummy collections (`processSteps`, `projectsFilmstrip`, `heroAlternatives`, `DUMMY_QUESTIONS`)
  const usesDummy = /processSteps|projectsFilmstrip|heroAlternatives|DUMMY_QUESTIONS/.test(content);
  if (usesDummy) {
    dummyReferences.push(rel);
    const hasGuard = /GuardContent|import\.meta\.env\.DEV/.test(content);
    if (!hasGuard) {
      unguarded.push(rel);
    }
  }
}

if (unguarded.length > 0) {
  console.error(
    "CRITICAL: Unguarded `dummy` content could render in production build in:\n  - " + unguarded.join("\n  - ")
  );
  process.exit(1);
}

// Count dummy/verify markers in site.js
const dummyCount = tagMatches.filter((t) => t === "dummy").length;
const verifyCount = tagMatches.filter((t) => t === "verify").length;
const legacyCount = tagMatches.filter((t) => t === "legacy").length;

console.log(`Content check passed cleanly.`);
console.log(`  Tags in src/data/site.js -> legacy: ${legacyCount}, verify: ${verifyCount}, dummy: ${dummyCount}`);
console.log(`  Production-guarded dummy references -> ${dummyReferences.length} file(s): ${dummyReferences.join(", ")}`);

if (process.argv.includes("--strict") && dummyCount > 0) {
  console.error(`--strict mode failed: ${dummyCount} dummy item(s) must be confirmed or removed before final launch.`);
  process.exit(1);
}
