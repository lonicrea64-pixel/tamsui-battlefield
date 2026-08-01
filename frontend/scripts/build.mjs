import { rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { build } from "esbuild";

const rootDir = process.cwd();
const distDir = resolve(rootDir, "dist");
const apiBase = process.env.VITE_API_BASE_URL;

await rm(distDir, { recursive: true, force: true });

await build({
  entryPoints: [resolve(rootDir, "src/main.tsx")],
  bundle: true,
  format: "esm",
  target: ["es2020"],
  outdir: resolve(distDir, "assets"),
  entryNames: "index",
  minify: true,
  sourcemap: false,
  loader: {
    ".css": "css"
  },
  define: {
    "import.meta.env.VITE_API_BASE_URL": apiBase ? JSON.stringify(apiBase) : "undefined",
    "process.env.NODE_ENV": '"production"'
  }
});

const html = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>淡水古戰場互動地圖</title>
    <meta name="description" content="互動式探索清法戰爭淡水古戰場，快速理解歷史脈絡與地理位置。" />
    <link rel="stylesheet" href="/assets/index.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index.js"></script>
  </body>
</html>
`;

await writeFile(resolve(distDir, "index.html"), html, "utf8");
