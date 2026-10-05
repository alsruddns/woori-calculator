import { describe, expect, it } from "vitest";
import { calculateUnitConversion, convertTemperature } from "@/calculators/conversion/convert";

describe("unit converter", () => {
  it("converts metric and imperial length, weight and volume", () => {
    expect(calculateUnitConversion({ category: "length", value: "1", fromUnit: "mile", toUnit: "km" })).toMatchObject({ results: [{ value: 1.609344 }] });
    expect(calculateUnitConversion({ category: "weight", value: "1", fromUnit: "lb", toUnit: "g" })).toMatchObject({ results: [{ value: 453.59237 }] });
    expect(calculateUnitConversion({ category: "volume", value: "1", fromUnit: "l", toUnit: "ml" })).toMatchObject({ results: [{ value: 1000 }] });
    expect(calculateUnitConversion({ category: "length", value: "1", fromUnit: "inch", toUnit: "cm" })).toMatchObject({ results: [{ value: 2.54 }] });
    expect(calculateUnitConversion({ category: "weight", value: "1", fromUnit: "lb", toUnit: "kg" })).toMatchObject({ results: [{ value: 0.45359237 }] });
    expect(calculateUnitConversion({ category: "length", value: "1", fromUnit: "m", toUnit: "g" })).toHaveProperty("error");
  });

  it("uses the separate Celsius and Fahrenheit equations", () => {
    expect(convertTemperature(0, "c", "f")).toBe(32);
    expect(convertTemperature(32, "f", "c")).toBe(0);
    expect(calculateUnitConversion({ category: "temperature", value: "100", fromUnit: "c", toUnit: "f" })).toMatchObject({ results: [{ value: 212 }] });
    expect(calculateUnitConversion({ category: "temperature", value: "-40", fromUnit: "c", toUnit: "f" })).toMatchObject({ results: [{ value: -40 }] });
    expect(calculateUnitConversion({ category: "temperature", value: "273.15", fromUnit: "c", toUnit: "c" })).toMatchObject({ results: [{ value: 273.15 }] });
  });

  it.each([
    ["length", "mm", "cm", "10", 1],
    ["length", "cm", "m", "100", 1],
    ["length", "km", "m", "1", 1000],
    ["length", "ft", "inch", "1", 12],
    ["length", "yard", "ft", "1", 3],
    ["length", "mile", "m", "1", 1609.344],
    ["weight", "mg", "g", "1000", 1],
    ["weight", "kg", "g", "1", 1000],
    ["weight", "oz", "g", "1", 28.34952313],
    ["volume", "ml", "l", "1000", 1],
  ])("converts %s %s to %s", (category, fromUnit, toUnit, value, expected) => {
    expect(calculateUnitConversion({ category, fromUnit, toUnit, value })).toMatchObject({ results: [{ value: expected }] });
  });
});
