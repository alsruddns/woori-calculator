import type { CalculatorDefinition } from "@/types/calculator";

// 상세 페이지와 실제 계산기가 준비되면 항목을 등록하고 공개 상태로 전환한다.
export const calculatorRegistry: readonly CalculatorDefinition[] = [];

export const publishedCalculators = calculatorRegistry.filter(
  (calculator) => calculator.isPublished,
);

export function getPublishedCalculatorBySlug(slug: string) {
  return publishedCalculators.find((calculator) => calculator.slug === slug);
}
