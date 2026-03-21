/**
 * FTP / static hosting: `output: "export"` cannot include App Router Route Handlers
 * (`src/app/api/**`). This script temporarily moves `src/app/api` aside, runs
 * `next build` with STATIC_EXPORT=true, then restores the folder.
 *
 * Usage: npm run build:static
 * (CI: .github/workflows/deploy.yml)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const apiDir = path.join(root, "src", "app", "api");
/** Must NOT live under `src/app/` or Next will still compile it as routes. */
const stashDir = path.join(root, ".api-static-stash");

function recoverInterruptedBuild() {
  if (!fs.existsSync(stashDir)) return;
  if (!fs.existsSync(apiDir)) {
    fs.renameSync(stashDir, apiDir);
    console.log("[build:static] Restored src/app/api from previous run.");
    return;
  }
  fs.rmSync(stashDir, { recursive: true, force: true });
}

/** Remove stale `.next` types that still point at `src/app/api` after it was moved. */
function cleanNextDir() {
  const nextDir = path.join(root, ".next");
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log("[build:static] Cleared .next for a clean static export.");
  }
}

function stashApi() {
  recoverInterruptedBuild();
  if (!fs.existsSync(apiDir)) {
    console.error("[build:static] Missing src/app/api — nothing to stash.");
    process.exit(1);
  }
  fs.renameSync(apiDir, stashDir);
  console.log("[build:static] Moved src/app/api aside (not compatible with output: export).");
}

function restoreApi() {
  if (!fs.existsSync(stashDir)) return;
  if (fs.existsSync(apiDir)) {
    fs.rmSync(apiDir, { recursive: true, force: true });
  }
  fs.renameSync(stashDir, apiDir);
  console.log("[build:static] Restored src/app/api.");
}

const require = createRequire(path.join(root, "package.json"));
let nextBin;
try {
  nextBin = require.resolve("next/dist/bin/next");
} catch {
  try {
    nextBin = require.resolve("next/dist/bin/next.js");
  } catch {
    console.error("[build:static] next CLI not found. Run npm ci first.");
    process.exit(1);
  }
}

recoverInterruptedBuild();
cleanNextDir();
stashApi();

let exitCode = 1;
try {
  // --webpack avoids Turbopack symlink issues with firebase-admin (see npm run dev --webpack)
  const result = spawnSync(process.execPath, [nextBin, "build", "--webpack"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "true" },
  });
  exitCode = result.status === 0 ? 0 : result.status ?? 1;
} finally {
  restoreApi();
}

process.exit(exitCode);
