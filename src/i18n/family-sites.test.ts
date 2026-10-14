import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { locales, localePath } from "@/i18n/config";
import { familySitesCopy } from "@/i18n/family-sites";

describe("family site switcher", () => {
  it("localizes the visible label and all service names for every supported locale", () => {
    expect(Object.keys(familySitesCopy).sort()).toEqual([...locales].sort());
    expect([familySitesCopy.ko.label, familySitesCopy.ko.portal, familySitesCopy.ko.calculator, familySitesCopy.ko.tools, familySitesCopy.ko.moneyBook]).toEqual(["패밀리사이트", "포탈", "계산기", "온라인 도구", "무료 공유 가계부"]);
    for (const locale of locales) {
      const copy = familySitesCopy[locale];
      expect(copy.label).toBeTruthy();
      expect(copy.portal).toBeTruthy();
      expect(copy.calculator).toBeTruthy();
      expect(copy.tools).toBeTruthy();
      expect(copy.moneyBook).toBeTruthy();
      expect(copy.newTab).toBeTruthy();
      if (locale !== "en") expect(copy.label).not.toBe(familySitesCopy.en.label);
      expect(localePath(locale)).toBe("/" + locale);
      expect(localePath(locale, "/calculators")).toBe("/" + locale + "/calculators");
      expect(localePath(locale, "/tools")).toBe("/" + locale + "/tools");
      expect(localePath(locale, "/money")).toBe("/" + locale + "/money");
    }
  });

  it("keeps a translated family-site trigger and resets it after opening a destination", () => {
    const source = readFileSync("src/components/layout/family-site-switcher.tsx", "utf8");
    expect(source).toMatch(/defaultValue=""/);
    expect(source).toMatch(/<option value="" disabled>\{copy.label\}<\/option>/);
    expect(source).toMatch(/window\.open\(site\.href, "_blank", "noopener,noreferrer"\)/);
    expect(source).toMatch(/event.currentTarget.value = ""/);
    expect(source).not.toMatch(/<span[^>]*>\{copy\.label\}<\/span>/);
  });

  it("opens the selected family destination securely in a new tab", () => {
    expect(familySitesCopy.ko.newTab).toBeTruthy();
  });
});
