const { buildSync } = require("esbuild");
const path = require("node:path");

const outfile = path.resolve(__dirname, "../node_modules/.cache/vocalis-prerender.cjs");
buildSync({
  entryPoints: [path.join(__dirname, "prerender.jsx")],
  outfile,
  bundle: true,
  platform: "node",
  packages: "external",
  loader: { ".css": "empty", ".js": "jsx" },
});
require(outfile).prerender().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
