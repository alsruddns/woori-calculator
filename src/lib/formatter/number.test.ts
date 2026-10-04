import { describe, expect, it } from "vitest";
import { formatKrw, formatNumber } from "@/lib/formatter/number";

describe("number formatters", () => {
  it("formats numbers using Korean grouping and decimals", () => {
    expect(formatNumber(1234567.5)).toBe("1,234,567.5");
  });

  it("formats Korean won without fractional digits", () => {
    expect(formatKrw(1234567)).toBe("₩1,234,567");
  });
});
