const digits = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"] as const;
const smallUnits = ["", "십", "백", "천"] as const;
const largeUnits = ["", "만", "억", "조", "경", "해", "자", "양", "구", "간", "정", "재", "극", "항하사", "아승기", "나유타", "불가사의", "무량대수"] as const;

function readFourDigits(value: number): string {
  let result = "";
  for (let place = 3; place >= 0; place -= 1) {
    const digit = Math.floor(value / 10 ** place) % 10;
    if (!digit) continue;
    result += `${place > 0 && digit === 1 ? "" : digits[digit]}${smallUnits[place]}`;
  }
  return result;
}

export function numberToKoreanText(value: number | bigint | string): string | undefined {
  let integer: bigint;
  if (typeof value === "bigint") integer = value;
  else if (typeof value === "number") {
    if (!Number.isSafeInteger(value)) return undefined;
    integer = BigInt(value);
  } else {
    const normalized = value.replace(/,/g, "").trim();
    if (!/^[+-]?\d+$/.test(normalized)) return undefined;
    try { integer = BigInt(normalized); } catch { return undefined; }
  }

  if (integer === BigInt(0)) return "영";
  const negative = integer < BigInt(0);
  let remaining = negative ? -integer : integer;
  const groups: string[] = [];
  let groupIndex = 0;
  while (remaining > BigInt(0)) {
    if (groupIndex >= largeUnits.length) return undefined;
    const group = Number(remaining % BigInt(10_000));
    if (group) groups.push(`${readFourDigits(group)}${largeUnits[groupIndex]}`);
    remaining /= BigInt(10_000);
    groupIndex += 1;
  }
  const text = groups.reverse().join(" ");
  return negative ? `마이너스 ${text}` : text;
}
