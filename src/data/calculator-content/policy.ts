import { calculateMinimumWage } from "@/calculators/finance/calculate";
import { calculateSeveranceEstimate } from "@/calculators/policy/severance";
import { calculateSocialInsurance } from "@/calculators/policy/social-insurance";
import { createCalculatorPage } from "@/data/calculator-content/create-page";
import { minimumWage2026 } from "@/data/policies/minimum-wage/2026";
import { employeeInsurance2026, insuranceSources } from "@/data/policies/insurance/2026";
import { severancePolicy2026 } from "@/data/policies/severance/2026";
import { formatNumber } from "@/lib/formatter/number";
import type { CalculatorPageDefinition } from "@/types/calculator-page";

export const policyCalculatorPages: readonly CalculatorPageDefinition[] = [
  createCalculatorPage({
    slug: "minimum-wage", name: "2026 최저임금 계산기", shortName: "최저임금", category: "salary", policyType: "POLICY", policyYear: minimumWage2026.policyYear,
    description: "2026년 적용 최저 시급과 입력한 시급의 차이, 공식 일급·월 환산액을 확인합니다.", title: "2026 최저임금 계산기: 시급·일급·월 환산액", keywords: ["2026 최저임금", "최저시급 계산기", "최저임금 월급"], relatedCalculatorIds: ["severance-pay", "date-difference"],
    fields: [{ name: "hourlyWage", label: "비교할 시급 (원)", type: "number", min: 0, step: 10 }], calculate: calculateMinimumWage,
    howTo: "비교하고 싶은 시급을 입력하면 2026년 적용 최저 시급과 차이를 확인할 수 있습니다. 일급과 월 환산액은 최저임금위원회가 안내한 표준 기준입니다.", formula: "8시간 일급 = 2026년 최저 시급 × 8 · 월 환산액 = 최저 시급 × 209시간", example: { question: "시급 10,000원을 2026년 기준과 비교하면?", answer: "공식 최저 시급 10,320원보다 시간당 320원 낮습니다. 이 단순 비교만으로 위법 여부를 판정하지 않습니다." },
    notes: ["2026년 적용 최저임금 기준입니다. 근로시간, 수당, 적용 제외 등 개인별 근로 조건을 검토한 법률 판단이나 체불 판정이 아닙니다."],
    faqs: [{ question: "2026년 최저 시급은 얼마인가요?", answer: `최저임금위원회가 안내한 2026년 적용 시간급은 ${formatNumber(minimumWage2026.hourlyWon)}원입니다.` }, { question: "월 환산액은 어떤 기준인가요?", answer: "주 40시간 근로와 유급주휴 8시간을 포함한 월 209시간 기준으로 안내된 금액입니다." }],
    sources: [{ name: minimumWage2026.source.name, url: minimumWage2026.source.url, checkedAt: minimumWage2026.source.checkedAt }], updatedAt: minimumWage2026.updatedAt,
  }),
  createCalculatorPage({
    slug: "severance-pay", name: "퇴직금 계산기", shortName: "퇴직금", category: "salary", policyType: "POLICY", policyYear: severancePolicy2026.policyYear,
    description: "입사일과 마지막 근무일, 직접 확인한 1일 평균임금으로 퇴직금을 단순 추정합니다.", title: "퇴직금 계산기: 근속기간과 평균임금 기준 추정", keywords: ["퇴직금 계산기", "퇴직금 계산", "퇴직금 평균임금"], relatedCalculatorIds: ["minimum-wage", "date-difference", "average"],
    fields: [{ name: "start", label: "입사일", type: "date" }, { name: "lastWorkday", label: "마지막 근무일", type: "date" }, { name: "averageDailyWage", label: "1일 평균임금 (원)", type: "number", min: 0, step: 1000 }], calculate: calculateSeveranceEstimate,
    howTo: "입사일, 마지막 근무일과 확인한 1일 평균임금을 입력하세요. 계속근로일수에 비례해 30일분 평균임금 기준 예상액을 계산합니다.", formula: "예상 퇴직금 = 1일 평균임금 × 30 × 계속근로일수 ÷ 365", example: { question: "1일 평균임금 100,000원, 계속근로 365일이라면?", answer: "단순 산식 기준 예상 퇴직금은 3,000,000원입니다." },
    notes: ["평균임금은 퇴직 전 3개월 임금과 총일수 등 법정 기준으로 산정해야 합니다. 이 계산기는 평균임금을 입력값으로 받아 단순 추정하며 지급 자격이나 실제 지급액을 판정하지 않습니다."],
    faqs: [{ question: "평균임금은 어떻게 구하나요?", answer: "일반적으로 산정 사유 발생 전 3개월간 지급된 임금 총액을 그 기간의 총일수로 나누는 법정 기준이 적용됩니다. 실제 산정에는 제외 기간 등 추가 규칙이 있어 고용노동부 안내를 확인하세요." }, { question: "퇴직금 지급 자격도 판정하나요?", answer: "아닙니다. 근속기간과 입력한 평균임금으로 금액을 단순 추정하며 근로시간·고용 형태 등 지급 요건을 판단하지 않습니다." }],
    sources: [{ name: severancePolicy2026.source.name, url: severancePolicy2026.source.url, checkedAt: severancePolicy2026.source.checkedAt }, { name: "고용노동부 — 퇴직금 산정 안내", url: "https://1350.moel.go.kr/home/hp/retirementpaycal/retirementpaycal.jsp", checkedAt: severancePolicy2026.source.checkedAt }], updatedAt: severancePolicy2026.updatedAt,
  }),
  createCalculatorPage({
    slug: "social-insurance", name: "2026 4대보험 계산기", shortName: "4대보험", category: "salary", policyType: "POLICY", policyYear: employeeInsurance2026.policyYear,
    description: "2026년 직장가입자의 산정 기준 월 보수로 근로자 부담 국민연금·건강보험·장기요양·고용보험을 단순 추정합니다.", title: "2026 4대보험 계산기: 월 보수 기준 근로자 부담액", keywords: ["2026 4대보험 계산기", "4대보험 공제액", "직장인 보험료 계산"], relatedCalculatorIds: ["minimum-wage", "severance-pay"],
    fields: [{ name: "monthlyWage", label: "보험료 산정 기준 월 보수 (원)", type: "number", min: 0, step: 10000 }], calculate: calculateSocialInsurance,
    howTo: "비과세 항목을 제외한 보험료 산정 기준 월 보수를 입력하세요. 근로자 부담 보험료 항목과 합계를 확인할 수 있습니다.", formula: "국민연금 = 기준소득월액 × 근로자 요율 · 건강보험 = 월 보수 × 근로자 요율 · 장기요양 = 건강보험료 × 장기요양 요율 ÷ 건강보험 요율 · 고용보험 = 월 보수 × 실업급여 근로자 요율", example: { question: "2026년 기준 월 보수 4,000,000원이라면?", answer: "단순 계산 시 근로자 부담 보험료 합계는 약 388,696원입니다. 실제 공제액은 자격·보수와 보험료 반올림 및 정산에 따라 달라질 수 있습니다." },
    notes: ["2026년 7~12월 기준 데이터입니다. 국민연금 기준소득월액 상·하한을 반영하고 건강보험 근로자 부담 상한을 적용합니다. 비과세 보수, 경감·지원, 사업장별 산정·정산 조건은 반영하지 않습니다.", "산재보험료는 사업주가 전액 부담하며 업종별로 달라 근로자 부담 합계에서 제외했습니다. 소득세·지방소득세는 포함하지 않습니다."],
    faqs: [{ question: "입력할 월급은 세전 월급인가요?", answer: "보험료 산정에 사용하는 월 보수를 입력해야 합니다. 비과세 항목과 보수 산정 규칙에 따라 일반적인 계약상 월급과 다를 수 있습니다." }, { question: "산재보험과 소득세도 합계에 포함되나요?", answer: "산재보험은 근로자가 부담하지 않아 제외했습니다. 소득세와 지방소득세도 별도 계산이며 포함하지 않습니다." }],
    sources: insuranceSources, updatedAt: employeeInsurance2026.updatedAt,
  }),
];
