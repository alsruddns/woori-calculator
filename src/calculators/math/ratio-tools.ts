import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";
import { readNumber, result } from "@/lib/calculators/input";
import { formatNumber } from "@/lib/formatter/number";

const MAX_PART = 100_000;
const MAX_TOTAL = 1_000_000_000_000;
const PRECISION = 1_000_000;
const precise = (label: string, value: number, unit = "") => ({ ...result(label, value, unit, 6), precision: 6 });
const displayRatio = (parts: readonly number[]) => parts.map((part) => formatNumber(part, 6, "en")).join(" : ");

function gcd(a: number, b: number): number {
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

export function simplifyRatio(parts: readonly number[]): { parts: number[]; divisor: number } | undefined {
  if (parts.length < 2 || parts.length > 6 || parts.every((part) => part === 0)) return undefined;
  const scaled = parts.map((part) => Math.round(part * PRECISION));
  if (parts.some((part, index) => !Number.isFinite(part) || part < 0 || part > MAX_PART || !Number.isSafeInteger(scaled[index]) || Math.abs(part * PRECISION - scaled[index]!) > 0.00001)) return undefined;
  const divisor = scaled.reduce((current, value) => gcd(current, value));
  return { parts: scaled.map((value) => value / divisor), divisor: divisor / PRECISION };
}

function parseParts(raw: string | undefined): number[] | undefined {
  if (!raw || raw.length > 128) return undefined;
  const sources = raw.split(":").map((part) => part.trim());
  if (sources.length < 2 || sources.length > 6 || sources.some((part) => !/^(?:\d{1,6}|\d{1,3}(?:,\d{3})+)(?:\.\d{1,6})?$/.test(part))) return undefined;
  const parts = sources.map((part) => Number(part.replaceAll(",", "")));
  return simplifyRatio(parts) ? parts : undefined;
}

export function splitByRatio(total: number, parts: readonly number[]): number[] | undefined {
  const sum = parts.reduce((current, part) => current + part, 0);
  if (!simplifyRatio(parts) || !Number.isFinite(total) || total < 0 || total > MAX_TOTAL || sum <= 0) return undefined;
  return parts.map((part) => total * (part / sum));
}

export function ratioToPercentage(parts: readonly number[]): { percentages: number[]; decimals: number[] } | undefined {
  const sum = parts.reduce((current, part) => current + part, 0);
  if (!simplifyRatio(parts) || sum <= 0) return undefined;
  const decimals = parts.map((part) => part / sum);
  return { decimals, percentages: decimals.map((part) => part * 100) };
}

export function solveProportion(a: number, b: number, known: number, unknown: "c" | "d"): number | undefined {
  if (![a, b, known].every((value) => Number.isFinite(value) && value > 0 && value <= MAX_TOTAL)) return undefined;
  const answer = unknown === "c" ? a * known / b : b * known / a;
  return Number.isFinite(answer) && answer <= MAX_TOTAL ? answer : undefined;
}

export function aspectRatio(width: number, height: number): { ratio: string; decimal: number } | undefined {
  if (width <= 0 || height <= 0) return undefined;
  const simple = simplifyRatio([width, height]);
  return simple ? { ratio: displayRatio(simple.parts), decimal: width / height } : undefined;
}

export function scaleRatio(scaleDrawing: number, scaleActual: number, length: number, direction: "drawing-to-actual" | "actual-to-drawing", inputUnit: "cm" | "m", outputUnit: "cm" | "m"): number | undefined {
  if (![scaleDrawing, scaleActual, length].every((value) => Number.isFinite(value) && value > 0 && value <= MAX_TOTAL)) return undefined;
  const inputCm = inputUnit === "m" ? length * 100 : length;
  const outputCm = direction === "drawing-to-actual" ? inputCm * scaleActual / scaleDrawing : inputCm * scaleDrawing / scaleActual;
  const answer = outputUnit === "m" ? outputCm / 100 : outputCm;
  return Number.isFinite(answer) && answer <= MAX_TOTAL ? answer : undefined;
}

function number(input: Record<string, string>, key: string, allowZero = false): number | undefined {
  const value = readNumber(input, key);
  return value !== undefined && value <= MAX_TOTAL && (allowZero ? value >= 0 : value > 0) ? value : undefined;
}

const invalid = (field?: string): CalculatorOutcome => ({ error: "입력값을 확인해 주세요. 비율은 0 이상, 분모와 축척 값은 0보다 커야 하며 소수점 6자리까지 입력할 수 있습니다.", ...(field ? { field } : {}) });

export const calculateRatioHub: CalculatorFunction = (input) => {
  const mode = input.mode ?? "simplify";
  if (["simplify", "find", "split", "to-percentage"].includes(mode)) {
    const parts = parseParts(input.parts);
    if (!parts) return invalid("parts");
    const simplified = simplifyRatio(parts)!;
    if (mode === "simplify") {
      return { results: [
        { label: "simplifiedRatio", value: displayRatio(simplified.parts) },
        precise("greatestDivisor", simplified.divisor),
        ...parts.map((part, index) => precise(`part${index + 1}`, part / simplified.divisor)),
      ] };
    }
    if (mode === "find") {
      if (parts.length !== 2) return invalid("parts");
      const known = number(input, "knownValue", true);
      const side = input.knownSide ?? "first";
      if (known === undefined) return invalid("knownValue");
      if (side !== "first" && side !== "second") return invalid("knownSide");
      const denominator = side === "first" ? parts[0]! : parts[1]!;
      if (denominator === 0) return invalid("parts");
      const value = known * (side === "first" ? parts[1]! : parts[0]!) / denominator;
      return Number.isFinite(value) && value <= MAX_TOTAL ? { results: [precise("matchingValue", value), { label: "simplifiedRatio", value: displayRatio(simplified.parts) }] } : invalid();
    }
    if (mode === "split") {
      const total = number(input, "total", true);
      if (total === undefined) return invalid("total");
      const values = splitByRatio(total, parts);
      return values ? { results: [{ label: "simplifiedRatio", value: displayRatio(simplified.parts) }, ...values.map((value, index) => precise(`share${index + 1}`, value))] } : invalid();
    }
    const percentages = ratioToPercentage(parts);
    return percentages ? { results: [
      ...percentages.percentages.map((value, index) => precise(`percent${index + 1}`, value, "%")),
      ...percentages.decimals.map((value, index) => precise(`decimal${index + 1}`, value)),
    ] } : invalid();
  }
  if (mode === "from-percentage") {
    const parts = parseParts(input.percentages);
    if (!parts) return invalid("percentages");
    const simplified = simplifyRatio(parts)!;
    return { results: [{ label: "simplifiedRatio", value: displayRatio(simplified.parts) }] };
  }
  if (mode === "compare") {
    const first = parseParts(input.firstRatio);
    const second = parseParts(input.secondRatio);
    if (!first || first.length !== 2) return invalid("firstRatio");
    if (!second || second.length !== 2) return invalid("secondRatio");
    if (first[1] === 0 || second[1] === 0) return invalid();
    const firstValue = first[0]! / first[1]!;
    const secondValue = second[0]! / second[1]!;
    const sign = Math.abs(firstValue - secondValue) <= 1e-12 * Math.max(1, firstValue, secondValue) ? "=" : firstValue > secondValue ? ">" : "<";
    return { results: [precise("firstDecimal", firstValue), precise("secondDecimal", secondValue), { label: "comparison", value: `${displayRatio(first)} ${sign} ${displayRatio(second)}` }] };
  }
  if (mode === "proportion") return calculateProportion(input);
  return invalid("mode");
};

export const calculateProportion: CalculatorFunction = (input) => {
  const a = number(input, "a");
  const b = number(input, "b");
  const unknown = input.unknown ?? "c";
  const known = number(input, unknown === "c" ? "d" : "c");
  if (a === undefined) return invalid("a");
  if (b === undefined) return invalid("b");
  if (unknown !== "c" && unknown !== "d") return invalid("unknown");
  if (known === undefined) return invalid(unknown === "c" ? "d" : "c");
  const answer = solveProportion(a, b, known, unknown);
  return answer === undefined ? invalid() : { results: [precise("unknownValue", answer), { label: "proportionEquation", value: unknown === "c" ? `${displayRatio([a, b])} = ${displayRatio([answer, known])}` : `${displayRatio([a, b])} = ${displayRatio([known, answer])}` }] };
};

export const calculateAspectRatio: CalculatorFunction = (input) => {
  const width = number(input, "width");
  const height = number(input, "height");
  if (width === undefined) return invalid("width");
  if (height === undefined) return invalid("height");
  const answer = aspectRatio(width, height);
  return answer ? { results: [{ label: "aspectRatio", value: answer.ratio }, precise("decimalRatio", answer.decimal)] } : invalid();
};

export const calculateScaleRatio: CalculatorFunction = (input) => {
  const drawing = number(input, "scaleDrawing");
  const actual = number(input, "scaleActual");
  const length = number(input, "length");
  const direction = input.direction ?? "drawing-to-actual";
  const inputUnit = input.inputUnit ?? "cm";
  const outputUnit = input.outputUnit ?? "cm";
  if (drawing === undefined) return invalid("scaleDrawing");
  if (actual === undefined) return invalid("scaleActual");
  if (length === undefined) return invalid("length");
  if (direction !== "drawing-to-actual" && direction !== "actual-to-drawing") return invalid("direction");
  if ((inputUnit !== "cm" && inputUnit !== "m") || (outputUnit !== "cm" && outputUnit !== "m")) return invalid();
  const answer = scaleRatio(drawing, actual, length, direction, inputUnit, outputUnit);
  return answer === undefined ? invalid() : { results: [precise("convertedLength", answer, outputUnit), { label: "scale", value: displayRatio([drawing, actual]) }] };
};
