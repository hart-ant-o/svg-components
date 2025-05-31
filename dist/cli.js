#!/usr/bin/env node
var __glob = (map) => (path2) => {
  var fn = map[path2];
  if (fn) return fn();
  throw new Error("Module not found in bundle: " + path2);
};

// src/cli.ts
import path from "path";
import { fileURLToPath } from "url";

// import("./commands/**/*.js") in src/cli.ts
var globImport_commands_js = __glob({});

// src/cli.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var command = process.argv[2];
var args = process.argv.slice(3);
if (!command) {
  console.log("Usage: svg-components <command>");
  process.exit(1);
}
try {
  const module = await globImport_commands_js(`./commands/${command}.js`);
  await module.default(args, __dirname);
} catch (err) {
  console.error(`\u274C Unknown command: ${command}`);
  process.exit(1);
}
