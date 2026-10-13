import { describe, expect, it } from "vitest";
import { localePath, locales } from "@/i18n/config";
import { sharedUiCopy } from "@/i18n/shared-ui";

describe("shared header and contact translations", () => {
  it("provides translated family navigation and contact content for all locales", () => {
    expect(Object.keys(sharedUiCopy).sort()).toEqual([...locales].sort());
    for (const locale of locales) {
      const copy = sharedUiCopy[locale];
      expect(copy.logoLabel).toBeTruthy();
      expect(copy.familySite).toBeTruthy();
      expect(copy.portal).toBeTruthy();
      expect(copy.moneyBook).toBeTruthy();
      expect(copy.calculator).toBeTruthy();
      expect(copy.tools).toBeTruthy();
      expect(copy.footerNavigation).toBeTruthy();
      expect(copy.contact.title).toBeTruthy();
      expect(copy.contact.intro).toBeTruthy();
      expect(copy.contact.details).toBeTruthy();
      expect(copy.contact.types).toHaveLength(4);
      expect(copy.contact.emailLabel).toBeTruthy();
      expect(copy.contact.email).toBe("krdd125@gmail.com");
      expect(copy.contact.reply).toBeTruthy();
      expect(copy.contact.close).toBeTruthy();
      if (locale !== "en") {
        expect(copy.familySite).not.toBe(sharedUiCopy.en.familySite);
        expect(copy.contact.intro).not.toBe(sharedUiCopy.en.contact.intro);
      }
      expect(localePath(locale)).toBe(`/${locale}`);
      expect(localePath(locale, "/money")).toBe(`/${locale}/money`);
      expect(localePath(locale, "/calculators")).toBe(`/${locale}/calculators`);
      expect(localePath(locale, "/tools")).toBe(`/${locale}/tools`);
    }
  });

  it("uses the requested Korean contact copy and a mailto address", () => {
    const { contact } = sharedUiCopy.ko;
    expect(contact.title).toBe("문의 사항");
    expect(contact.intro).toBe("woori.today 서비스 이용 중 궁금한 점이나 요청사항이 있으신가요?");
    expect(contact.types).toEqual(["일반 문의 및 요청사항", "협업 문의", "광고 문의 및 제안", "버그 제보"]);
    expect(`mailto:${contact.email}`).toBe("mailto:krdd125@gmail.com");
  });
});
