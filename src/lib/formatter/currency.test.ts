import { describe, expect, it } from "vitest";
import { currencyCodes, defaultCurrencyByLocale, formatCurrency, formatLocalizedInput, isCurrencyCode, parseLocalizedNumber, unformatLocalizedInput } from "@/lib/formatter/currency";

describe("currency configuration and display", () => {
  it("defines distinct defaults for all 26 planned locales", () => {
    expect(Object.keys(defaultCurrencyByLocale)).toHaveLength(26);
    expect(new Set(Object.keys(defaultCurrencyByLocale)).size).toBe(26);
    expect(defaultCurrencyByLocale).toMatchObject({ ko: "KRW", en: "USD", ja: "JPY", de: "EUR", pl: "PLN", ru: "RUB", tr: "TRY", fil: "PHP", bn: "BDT", uk: "UAH", ms: "MYR", sv: "SEK", cs: "CZK", ro: "RON", el: "EUR" });
    expect(currencyCodes.length).toBeGreaterThanOrEqual(26);
  });

  it("validates currency codes and uses currency-specific fraction digits", () => {
    expect(isCurrencyCode("KRW")).toBe(true);
    expect(isCurrencyCode("ZZZ")).toBe(false);
    expect(formatCurrency(1_000_000, "KRW", "ko")).toContain("1,000,000");
    expect(formatCurrency(1_000_000, "USD", "en")).toContain("1,000,000.00");
    expect(formatCurrency(1_000_000, "JPY", "ja")).toContain("1,000,000");
    expect(formatCurrency(1_000_000, "RUB", "ru")).toContain("1 000 000,00");
    expect(formatCurrency(Number.NaN, "USD", "en")).toBe("—");
    expect(formatCurrency(-0, "USD", "en")).not.toContain("-");
  });

  it("parses locale grouping and decimal conventions and keeps unfinished input empty", () => {
    expect(parseLocalizedNumber("1.234,56", "de")).toBe(1234.56);
    expect(parseLocalizedNumber("1 234,56", "fr")).toBe(1234.56);
    expect(parseLocalizedNumber("1,234.56", "en")).toBe(1234.56);
    expect(parseLocalizedNumber("1 234,56", "ru")).toBe(1234.56);
    expect(parseLocalizedNumber("12,34,567.89", "hi")).toBe(1234567.89);
    expect(parseLocalizedNumber("-", "en")).toBeUndefined();
    expect(parseLocalizedNumber("1,2,3", "en")).toBeUndefined();
    expect(formatLocalizedInput("1234,56", "de")).toBe("1.234,56");
    expect(unformatLocalizedInput("1 234,56", "fr")).toBe("1234.56");
    expect(formatLocalizedInput("-", "sv")).toBe("-");
  });
});
