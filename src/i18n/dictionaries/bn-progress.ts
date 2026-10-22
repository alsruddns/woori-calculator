import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnBatchOne } from "@/i18n/dictionaries/bn-batch-1";
import { bnBatchTwo } from "@/i18n/dictionaries/bn-batch-2";

// Translation workbench only. Publish only after the shared Bengali UI and all pages are complete.
export const bengaliCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...bnBatchOne,
  ...bnBatchTwo,
};
export const translatedBengaliCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in bengaliCalculatorContent);
export const remainingBengaliCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in bengaliCalculatorContent));
