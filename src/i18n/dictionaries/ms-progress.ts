import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { msBatchOne } from "@/i18n/dictionaries/ms-batch-1";

// Translation workbench only. Malay remains unpublished until all calculator pages and shared UI are complete.
export const malayCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...msBatchOne,
};
export const translatedMalayCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in malayCalculatorContent);
export const remainingMalayCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in malayCalculatorContent));
