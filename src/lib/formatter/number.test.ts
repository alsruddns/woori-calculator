import { describe, expect, it } from "vitest";
import { formatInputNumber, formatKrw, formatNumber } from "@/lib/formatter/number";

describe("shared number formatting", () => {
  it.each([
    [1000, "1,000"],
    [1234567.89, "1,234,567.89"],
    [-0, "0"],
    [-0.001, "0"],
  ])("formats %s as %s", (value, expected) => {
    expect(formatNumber(value)).toBe(expected);
  });

  it("uses Korean won suffix and a safe placeholder for non-finite values", () => {
    expect(formatKrw(10000)).toBe("10,000원");
    expect(formatKrw(3333.333, 2)).toBe("3,333.33원");
    expect(formatNumber(Number.NaN)).toBe("—");
    expect(formatNumber(Number.POSITIVE_INFINITY)).toBe("—");
    expect(formatNumber(1234.567, Number.NaN)).toBe("1,234.57");
    expect(formatKrw(Number.NaN)).toBe("—");
  });

  it("groups input without removing a decimal part or a leading minus", () => {
    expect(formatInputNumber("1234567.89")).toBe("1,234,567.89");
    expect(formatInputNumber("-1234567.89")).toBe("-1,234,567.89");
    expect(formatInputNumber("-")).toBe("-");
  });
});
