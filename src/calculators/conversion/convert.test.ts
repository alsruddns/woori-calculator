import { describe, expect, it } from "vitest";
import { calculateUnitConversion, convertTemperature } from "@/calculators/conversion/convert";

describe("unit converter", () => {
  it("converts metric and imperial length, weight and volume", () => {
    expect(calculateUnitConversion({ category: "length", value: "1", fromUnit: "mile", toUnit: "km" })).toMatchObject({ results: [{ value: 1.609344 }] });
    expect(calculateUnitConversion({ category: "weight", value: "1", fromUnit: "lb", toUnit: "g" })).toMatchObject({ results: [{ value: 453.59237 }] });
    expect(calculateUnitConversion({ category: "volume", value: "1", fromUnit: "l", toUnit: "ml" })).toMatchObject({ results: [{ value: 1000 }] });
  });

  it("uses the separate Celsius and Fahrenheit equations", () => {
    expect(convertTemperature(0, "c", "f")).toBe(32);
    expect(convertTemperature(32, "f", "c")).toBe(0);
    expect(calculateUnitConversion({ category: "temperature", value: "100", fromUnit: "c", toUnit: "f" })).toMatchObject({ results: [{ value: 212 }] });
  });
});
