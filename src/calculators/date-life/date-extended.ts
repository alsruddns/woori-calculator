import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";
import { parseDateOnly } from "@/lib/calculators/date-only";

const DAY = 86_400_000;
const MAX_DAYS = 200 * 366;

export const calculateTenure: CalculatorFunction = (input) => {
  const start = parseDateOnly(input.start), end = parseDateOnly(input.end);
  if (start === undefined || end === undefined) return { error: "입사일과 기준일을 올바르게 입력해 주세요." };
  if (end < start) return { error: "기준일은 입사일과 같거나 이후여야 합니다.", field: "end" };
  if ((end - start) / DAY > MAX_DAYS) return { error: "기간은 최대 200년까지 계산할 수 있습니다.", field: "end" };
  const a = new Date(start), b = new Date(end);
  let months = (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + b.getUTCMonth() - a.getUTCMonth();
  if (b.getUTCDate() < a.getUTCDate()) months -= 1;
  const anchor = new Date(a);
  anchor.setUTCMonth(anchor.getUTCMonth() + months);
  const days = Math.floor((end - anchor.getTime()) / DAY);
  return { results: [{ label: "근속 기간", value: `${Math.floor(months / 12)}년 ${months % 12}개월 ${days}일` }, { label: "완료한 총 개월", value: months, unit: "개월" }, { label: "총 경과 일수", value: (end - start) / DAY, unit: "일" }] };
};

export const calculateTimeArithmetic: CalculatorFunction = (input) => {
  const aHours = Number(input.aHours), aMinutes = Number(input.aMinutes), bHours = Number(input.bHours), bMinutes = Number(input.bMinutes);
  const values = [aHours, aMinutes, bHours, bMinutes];
  if (values.some((v, i) => !Number.isFinite(v) || v < 0 || v > (i % 2 ? 59 : 100000) || !Number.isInteger(v))) return { error: "시간은 0~100,000, 분은 0~59의 정수로 입력해 주세요." };
  const a = aHours * 60 + aMinutes, b = bHours * 60 + bMinutes;
  const result = input.mode === "subtract" ? a - b : input.mode === "add" ? a + b : NaN;
  if (!Number.isFinite(result) || Math.abs(result) > 100000 * 60) return { error: "계산 방식을 선택하거나 입력 범위를 줄여 주세요." };
  const sign = result < 0 ? "−" : "";
  const abs = Math.abs(result), totalHours = Math.floor(abs / 60);
  return { results: [{ label: "시간·분", value: `${sign}${Math.floor(totalHours / 24)}일 ${totalHours % 24}시간 ${abs % 60}분` }, { label: "총 분", value: result, unit: "분" }] };
};

export const calculatePregnancyDates: CalculatorFunction = (input) => {
  const lmp = parseDateOnly(input.lmp);
  if (lmp === undefined) return { error: "마지막 생리 시작일을 올바르게 입력해 주세요.", field: "lmp" };
  const reference = input.mode === "weeks" ? parseDateOnly(input.reference) : lmp + 280 * DAY;
  if (reference === undefined) return { error: "기준일을 올바르게 입력해 주세요.", field: "reference" };
  if (input.mode === "due") {
    const d = new Date(reference);
    const due = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
    return { results: [{ label: "예상 출산 예정일", value: due }], note: "마지막 생리 시작일 기준 280일을 더한 참고 추정일입니다. 의료진이 초음파와 병력을 바탕으로 산정한 예정일을 우선하세요." };
  }
  if (input.mode !== "weeks" || reference < lmp || (reference - lmp) / DAY > 500) return { error: "기준일은 마지막 생리 시작일 이후 500일 이내로 입력해 주세요.", field: "reference" };
  const days = (reference - lmp) / DAY;
  const due = new Date(lmp + 280 * DAY);
  const dueText = `${due.getUTCFullYear()}-${String(due.getUTCMonth() + 1).padStart(2, "0")}-${String(due.getUTCDate()).padStart(2, "0")}`;
  return { results: [{ label: "임신 주수(계산상)", value: `${Math.floor(days / 7)}주 ${days % 7}일` }, { label: "예상 출산 예정일", value: dueText }], note: "마지막 생리 시작일 기준 달력상 경과 기간입니다. 임신 여부나 의학적 주수를 진단하지 않습니다." };
};
