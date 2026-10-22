import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { ukBatchOne } from "@/i18n/dictionaries/uk-batch-1";

// Workbench only: keep Ukrainian pages unpublished until all calculator pages and shared UI are complete.
export const ukrainianCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...ukBatchOne,
};
export const translatedUkrainianCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in ukrainianCalculatorContent);
export const remainingUkrainianCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in ukrainianCalculatorContent));
