import { describe, expect, it } from "vitest";
import { formatInputNumber, formatKrw, formatNumber } from "@/lib/formatter/number";

describe("number formatters", () => {
  it("formats numbers using Korean grouping and decimals", () => {
    expect(formatNumber(1234567.5)).toBe("1,234,567.5");
    expect(formatNumber(0.00000062137, 8)).toBe("0.00000062");
  });

  it("formats Korean won without fractional digits", () => {
    expect(formatKrw(1234567)).toBe("₩1,234,567");
  });

  it("groups editable numeric input while preserving decimals and signs", () => {
    expect(formatInputNumber("1234567.80")).toBe("1,234,567.80");
    expect(formatInputNumber("-12345.6")).toBe("-12,345.6");
    expect(formatInputNumber("-")).toBe("-");
  });
});
