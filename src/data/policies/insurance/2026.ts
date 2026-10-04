import type { PolicyDataMetadata } from "@/types/calculator";

export const employeeInsurance2026: PolicyDataMetadata & {
  nationalPension: { employeeRate: number; minimumBase: number; maximumBase: number };
  healthInsurance: { employeeRate: number; minimumTotalPremium: number; maximumTotalPremium: number };
  longTermCare: { incomeRate: number; healthRate: number };
  employmentInsurance: { employeeRate: number };
} = {
  id: "employee-social-insurance-kr-2026",
  policyYear: 2026,
  version: "1.0.0",
  updatedAt: "2026-10-05",
  effectiveFrom: "2026-07-01",
  effectiveTo: "2026-12-31",
  source: {
    name: "2026년 직장가입자 사회보험 요율 및 국민연금 기준소득월액",
    url: "https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0038M0.do?menuId=MN24001113",
    checkedAt: "2026-10-05",
  },
  nationalPension: { employeeRate: 0.0475, minimumBase: 410_000, maximumBase: 6_590_000 },
  healthInsurance: { employeeRate: 0.03595, minimumTotalPremium: 20_160, maximumTotalPremium: 9_183_480 },
  longTermCare: { incomeRate: 0.009448, healthRate: 0.0719 },
  employmentInsurance: { employeeRate: 0.009 },
};

export const insuranceSources = [
  employeeInsurance2026.source,
  { name: "국민건강보험공단 — 2026년 보험료율 안내", url: "https://edi.nhis.or.kr/portal/images/popup/20251204_pop01longdesc.html", checkedAt: employeeInsurance2026.updatedAt },
  { name: "국가법령정보센터 — 월별 건강보험료 상·하한 고시", url: "https://www.law.go.kr/LSW/admRulLsInfoP.do?admRulSeq=2100000270472", checkedAt: employeeInsurance2026.updatedAt },
  { name: "고용보험 — 근로자 실업급여 보험료", url: "https://edrm.ei.go.kr/ei/eih/eg/ei/eiEminsr/retrieveEi0102Info.do", checkedAt: employeeInsurance2026.updatedAt },
] as const;
