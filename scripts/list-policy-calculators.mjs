import { readFileSync } from "node:fs";

const catalog = readFileSync(new URL("../docs/service-catalog.md", import.meta.url), "utf8");
const rows = catalog.split(/\r?\n/).filter((line) => line.startsWith("|") && line.includes("| true |"));
const slugs = rows.map((line) => line.split("|")[8]?.replaceAll("`", "").trim()).filter(Boolean);
process.stdout.write(`${slugs.join("\n")}\n`);
