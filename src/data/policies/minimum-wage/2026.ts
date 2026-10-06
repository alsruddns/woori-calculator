import type { PolicyDataMetadata } from "@/types/calculator";

export const minimumWage2026: PolicyDataMetadata & {
  hourlyWon: number;
  dailyWon: number;
  monthlyWon: number;
  standardDailyHours: number;
  standardMonthlyHours: number;
} = {
  id: "minimum-wage-kr-2026",
  policyYear: 2026,
  version: "1.0.0",
  updatedAt: "2026-10-05",
  effectiveFrom: "2026-01-01",
  effectiveTo: "2026-12-31",
  source: {
    name: "최저임금위원회 — 2026년 적용 최저임금",
    url: "https://www.minimumwage.go.kr/index.jsp",
    checkedAt: "2026-10-05",
  },
  hourlyWon: 10_320,
  dailyWon: 82_560,
  monthlyWon: 2_156_880,
  standardDailyHours: 8,
  standardMonthlyHours: 209,
};
