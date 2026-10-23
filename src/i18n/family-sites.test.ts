import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { supportedLocales, localePath } from "@/i18n/config";
import { familySitesCopy } from "@/i18n/family-sites";

describe("family site navigation", () => {
  it("localizes all six service names for every supported locale", () => {
    expect(Object.keys(familySitesCopy).sort()).toEqual([...supportedLocales].sort());
    expect([familySitesCopy.ko.portal, familySitesCopy.ko.calculator, familySitesCopy.ko.tools, familySitesCopy.ko.moneyBook, familySitesCopy.ko.documents, familySitesCopy.ko.quiz]).toEqual(["포탈", "계산기", "온라인 도구", "무료 공유 가계부", "문서·양식", "퀴즈·테스트"]);
    for (const locale of supportedLocales) {
      const copy = familySitesCopy[locale];
      expect(copy.label).toBeTruthy();
      expect(copy.menu).toBeTruthy();
      expect(copy.portal).toBeTruthy();
      expect(copy.calculator).toBeTruthy();
      expect(copy.tools).toBeTruthy();
      expect(copy.moneyBook).toBeTruthy();
      expect(copy.documents).toBeTruthy();
      expect(copy.quiz).toBeTruthy();
      expect(copy.newTab).toBeTruthy();
      expect(localePath(locale)).toBe(`/${locale}`);
      for (const service of ["calculators", "tools", "money", "docs", "quiz"]) {
        expect(localePath(locale, `/${service}`)).toBe(`/${locale}/${service}`);
      }
    }
    expect(localePath("ko", "/docs")).toBe("/ko/docs");
    expect(localePath("ko", "/quiz")).toBe("/ko/quiz");
  });

  it("uses desktop links and a compact mobile menu, with Calculator active", () => {
    const source = readFileSync("src/components/layout/family-site-switcher.tsx", "utf8");
    expect(source).toMatch(/<details className="relative xl:hidden">/);
    expect(source).toMatch(/className="hidden min-w-0 items-center justify-center gap-0\.5 xl:flex/);
    expect(source).toMatch(/aria-current=\{site\.active \? "page" : undefined\}/);
    expect(source).toMatch(/target="_blank" rel="noopener noreferrer"/);
    expect(source).toContain('localePath(locale, "/docs")');
    expect(source).toContain('localePath(locale, "/quiz")');
    expect(source).not.toContain("<select");
  });
});
