import type { PolicyDataMetadata } from "@/types/calculator";
import { minimumWage2026 } from "@/data/policies/minimum-wage/2026";

export const unemploymentBenefit2026: PolicyDataMetadata & {
  replacementRate: number;
  minimumRate: number;
  dailyUpperLimit: number;
  minimumWageHourly: number;
  standardDailyHours: number;
  ageBands: readonly { minAge: number; maxAge: number | null; daysByInsuredYears: readonly number[] }[];
  insuredYearUpperBounds: readonly (number | null)[];
} = {
  id: "unemployment-benefit-kr-2026",
  policyYear: 2026,
  version: "1.0.0",
  updatedAt: "2026-10-28",
  effectiveFrom: "2026-01-01",
  effectiveTo: "2026-12-31",
  source: {
    name: "고용노동부 1350 — 2026년 구직급여 상·하한 및 소정급여일수 안내",
    url: "https://1350.moel.go.kr/rtmview.do?id=1000324861",
    checkedAt: "2026-10-28",
  },
  replacementRate: 0.6,
  minimumRate: 0.8,
  dailyUpperLimit: 68_100,
  minimumWageHourly: minimumWage2026.hourlyWon,
  standardDailyHours: 8,
  insuredYearUpperBounds: [1, 3, 5, 10, null],
  ageBands: [
    { minAge: 0, maxAge: 49, daysByInsuredYears: [120, 150, 180, 210, 240] },
    { minAge: 50, maxAge: null, daysByInsuredYears: [120, 180, 210, 240, 270] },
  ],
};

export const unemploymentBenefitSources = [
  unemploymentBenefit2026.source,
  { name: "Korea Minimum Wage Commission — 2026 applied minimum wage", url: minimumWage2026.source.url, checkedAt: "2026-10-28" },
] as const;
