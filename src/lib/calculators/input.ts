export const MAX_MONEY = 1_000_000_000_000_000;
export const MAX_QUANTITY = 1_000_000_000;
export const MAX_RATE = 100_000;
export const MAX_LIST_ITEMS = 500;
export const MAX_LIST_INPUT_LENGTH = 30_000;
export const MAX_DATE_RANGE_DAYS = 200 * 366;
export const MAX_NUMBER_INPUT_LENGTH = 64;

export function readNumber(input: Record<string, string>, key: string): number | undefined {
  const source = input[key];
  if (!source || source.length > MAX_NUMBER_INPUT_LENGTH) return undefined;
  const raw = source.replace(/,/g, "").trim();
  if (!raw) return undefined;
  const value = Number(raw);
  return Number.isFinite(value) && Math.abs(value) <= MAX_MONEY ? value : undefined;
}

export function requireNumber(input: Record<string, string>, key: string, label: string): number | string {
  const value = readNumber(input, key);
  if (value === undefined) return `${label}을(를) 숫자로 입력해 주세요.`;
  return value;
}

export function result(label: string, value: number, unit = "", digits = 2) {
  const rounded = Number(value.toFixed(digits));
  return { label, value: Object.is(rounded, -0) ? 0 : rounded, ...(unit ? { unit } : {}) };
}

export function splitNumbers(value: string): number[] | undefined {
  if (value.length > MAX_LIST_INPUT_LENGTH) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const isGroupedSingleNumber = /^[-+]?\d{1,3}(,\d{3})+(\.\d+)?$/.test(trimmed);
  const parts = isGroupedSingleNumber
    ? [trimmed]
    : trimmed.split(/[;\n]+/).length > 1
      ? trimmed.split(/[;\n]+/)
      : trimmed.replace(/(?<=\d),(?=\d{3}(?:[.\s,;]|$))/g, "").split(/[\s,]+/);
  const cleanParts = parts.map((item) => item.trim()).filter(Boolean);
  if (!cleanParts.length || cleanParts.length > MAX_LIST_ITEMS) return undefined;
  const numbers = cleanParts.map((item) => Number(item.replace(/,/g, "")));
  return numbers.every((number) => Number.isFinite(number) && Math.abs(number) <= MAX_MONEY) ? numbers : undefined;
}
