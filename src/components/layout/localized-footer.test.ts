import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/config";
import { localizedFooterLinks } from "@/components/layout/localized-footer";

describe("localized footer links", () => {
  it("keeps policy links on the active locale path", () => {
    for (const locale of locales) {
      const links = localizedFooterLinks(locale);
      expect(links.map(({ href }) => href)).toEqual([`/${locale}/about`, `/${locale}/privacy`, `/${locale}/terms`]);
      expect(links.every(({ label }) => label.length > 0)).toBe(true);
    }
    expect(localizedFooterLinks("ko").map(({ href }) => href)).toContain("/ko/privacy");
    expect(localizedFooterLinks("ko").map(({ href }) => href)).toContain("/ko/terms");
  });
});
