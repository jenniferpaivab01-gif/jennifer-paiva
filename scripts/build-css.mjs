import { spawnSync } from "node:child_process";
import { renameSync, existsSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const input = join(root, "src/styles/globals.css");
const temp = join(root, "src/app/globals.generated.css");
const output = join(root, "src/app/globals.css");

const result = spawnSync(
  process.execPath,
  [
    join(root, "node_modules/@tailwindcss/cli/dist/index.mjs"),
    "-i",
    input,
    "-o",
    temp,
  ],
  { stdio: "inherit", cwd: root },
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

if (!existsSync(temp)) {
  console.error("Tailwind CSS build produced no output.");
  process.exit(1);
}

if (existsSync(output)) unlinkSync(output);
renameSync(temp, output);
console.log("Wrote", output);
