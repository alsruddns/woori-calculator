import { publishedCalculatorPages } from "@/data/calculator-content";
import type { CalculatorDefinition } from "@/types/calculator";

export const calculatorRegistry: readonly CalculatorDefinition[] = publishedCalculatorPages.map((page): CalculatorDefinition => ({
  id: page.id,
  slug: page.slug,
  name: page.name,
  shortName: page.shortName,
  description: page.description,
  category: page.category,
  policyType: page.policyType,
  keywords: page.keywords,
  isPublished: page.isPublished,
  relatedCalculatorIds: page.relatedCalculatorIds,
}));

export const publishedCalculators = calculatorRegistry;

export function getPublishedCalculatorBySlug(slug: string) {
  return publishedCalculators.find((calculator) => calculator.slug === slug);
}
