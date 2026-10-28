import { calculateUnemploymentBenefit } from "@/calculators/policy/unemployment-benefit";
import { createCalculatorPage } from "@/data/calculator-content/create-page";
import { unemploymentBenefit2026, unemploymentBenefitSources } from "@/data/policies/unemployment-benefit/2026";

export const employmentCalculatorPages = [
  createCalculatorPage({
    slug: "unemployment-benefit",
    name: "실업급여 계산기",
    shortName: "실업급여",
    category: "salary",
    countryCode: "KR",
    countryName: "대한민국",
    policyType: "POLICY",
    policyYear: unemploymentBenefit2026.policyYear,
    description: "퇴직 전 월 평균임금과 퇴직 당시 나이, 고용보험 가입기간으로 2026년 기준 예상 구직급여액과 소정급여일수를 계산합니다.",
    title: "2026 실업급여 계산기 - 구직급여 예상액·지급일수 계산 | woori.today",
    keywords: ["실업급여 계산기", "구직급여 예상액", "실업급여 지급일수"],
    relatedCalculatorIds: ["severance-pay", "minimum-wage", "social-insurance"],
    fields: [
      { name: "monthlyWage", label: "퇴직 전 최근 3개월 월 평균임금", type: "number", min: 0, step: 10_000, unit: "원" },
      { name: "age", label: "퇴직 당시 만 나이", type: "number", min: 0, step: 1, unit: "세" },
      { name: "insuredYears", label: "고용보험 가입기간", type: "number", min: 0, step: 0.1, unit: "년", placeholder: "예: 4.5" },
    ],
    calculate: calculateUnemploymentBenefit,
    howTo: "퇴직 전 최근 3개월의 월 평균임금, 퇴직 당시 만 나이, 고용보험 가입기간을 입력하면 1일 예상 구직급여액과 소정급여일수, 예상 총액을 확인할 수 있습니다.",
    formula: "1일 예상 구직급여액 = (최근 3개월 월 평균임금 × 3 ÷ 90 × 60%)을 2026년 상·하한액으로 조정 · 예상 총액 = 1일 예상액 × 소정급여일수",
    example: { question: "월 평균임금 3,000,000원, 만 35세, 가입기간 4년이라면?", answer: "1일 평균임금의 60%와 상·하한액, 연령·가입기간별 소정급여일수를 적용해 예상액을 계산합니다." },
    notes: ["이 계산기는 예상 구직급여액을 계산하며 수급자격을 판정하지 않습니다. 실제 평균임금, 최종 이직 사업의 소정근로시간, 이직 사유와 구직활동 요건 등에 따라 지급 여부와 금액이 달라질 수 있습니다.", "월 평균임금 입력을 바탕으로 3개월을 90일로 환산한 간편 추정입니다. 정확한 평균임금은 실제 임금총액과 산정기간의 총 일수로 계산합니다."],
    faqs: [
      { question: "실제 실업급여 수급 자격을 확인할 수 있나요?", answer: "아니요. 이 계산기는 예상액만 계산합니다. 고용보험 가입기간, 이직 사유, 구직활동 등 실제 수급자격은 관할 고용센터 또는 고용보험에서 확인해야 합니다." },
      { question: "2026년 구직급여 하한액은 얼마인가요?", answer: "2026년 최저임금과 1일 소정근로시간 8시간 기준으로 계산한 하한액은 66,048원입니다. 소정근로시간이 8시간보다 짧으면 하한액도 달라집니다." },
      { question: "소정급여일수는 무엇으로 정해지나요?", answer: "퇴직 당시 나이와 고용보험 가입기간에 따라 120일부터 270일까지 정해집니다. 과거 수급 이력 등 개인별 조건은 이 계산에 반영되지 않습니다." },
    ],
    sources: unemploymentBenefitSources,
    updatedAt: unemploymentBenefit2026.updatedAt,
  }),
];
