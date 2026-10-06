import { describe, expect, it } from "vitest";
import { numberToKoreanText } from "@/lib/formatter/korean-number";

describe("Korean number reading", () => {
  it.each([
    [0, "영"], [1, "일"], [10, "십"], [11, "십일"], [100, "백"], [101, "백일"], [1000, "천"],
    [10000, "일만"], [100000000, "일억"], [365000000, "삼억 육천오백만"],
    [123456789, "일억 이천삼백사십오만 육천칠백팔십구"], [1000000000000, "일조"], [-10001, "마이너스 일만 일"],
  ])("reads %s as %s", (input, expected) => {
    expect(numberToKoreanText(input)).toBe(expected);
  });
  it("supports large integer strings and omits decimals or unsafe numeric values", () => {
    expect(numberToKoreanText("10000000000000000")).toBe("일경");
    expect(numberToKoreanText("12.5")).toBeUndefined();
    expect(numberToKoreanText(Number.MAX_SAFE_INTEGER + 1)).toBeUndefined();
  });
});
