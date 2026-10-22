import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { svBatchOne } from "@/i18n/dictionaries/sv-batch-1";

// Swedish stays unpublished until all calculator pages and shared UI are translated.
export const swedishCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...svBatchOne,
};
export const translatedSwedishCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in swedishCalculatorContent);
export const remainingSwedishCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in swedishCalculatorContent));
