import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { calculatorPages, publishedCalculatorPages } from "@/data/calculator-content";
import { calculatorRegistry } from "@/data/calculators/registry";
import { locales, supportedLocalesForCalculator } from "@/i18n/config";

const catalog = readFileSync(resolve(process.cwd(), "docs/service-catalog.md"), "utf8");
const indexNow = readFileSync(resolve(process.cwd(), "scripts/submit-indexnow.mjs"), "utf8");
const rows = catalog.split(/\r?\n/).filter((line) => /^\| \d+ \|/.test(line)).map((line) => line.split("|").map((cell) => cell.trim()));
const entry = new Map(rows.map((row) => [row[8]?.replaceAll("`", ""), row]));

describe("service catalog coverage", () => {
  it("lists each content slug exactly once and matches the public registry", () => {
    const slugs = rows.map((row) => row[8]?.replaceAll("`", ""));
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.sort()).toEqual(calculatorPages.map(({ slug }) => slug).sort());
    for (const page of calculatorPages) {
      const row = entry.get(page.slug)!;
      if (page.isPublished) expect(row[3]).toBe("open");
      expect(row[4]).toBe(page.policyType === "POLICY" ? "true" : "false");
      expect(row[7]?.split(", ")).toEqual([...supportedLocalesForCalculator(page.slug)]);
      if (page.isPublished) expect(calculatorRegistry.some(({ slug }) => slug === page.slug)).toBe(true);
      if (!page.isPublished) expect(row[3]).toMatch(/^close - .+/);
    }
    expect(publishedCalculatorPages.length).toBe(169);
  });

  it("records a year and linked source for every policy-sensitive calculator", () => {
    for (const page of calculatorPages.filter(({ policyType }) => policyType === "POLICY")) {
      const row = entry.get(page.slug)!;
      expect(row[5]).toBe(String(page.policyYear));
      expect(row[6]).toMatch(/\[[^\]]+\]\(https?:\/\//);
    }
  });

  it("contains complete fifteen-locale references and no duplicate paths", () => {
    for (const row of rows) expect(row[7]?.split(", ")).toEqual([...locales]);
    expect(catalog).toContain("| dca-calculator | 제외 | india-sip-calculator");
    for (const page of publishedCalculatorPages) expect(indexNow).toContain(`"${page.slug}"`);
  });
});

