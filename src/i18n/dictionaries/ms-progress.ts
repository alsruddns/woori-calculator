import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { msBatchOne } from "@/i18n/dictionaries/ms-batch-1";
import { msBatchTwo } from "@/i18n/dictionaries/ms-batch-2";
import { msBatchThree } from "@/i18n/dictionaries/ms-batch-3";
import { msBatchFour } from "@/i18n/dictionaries/ms-batch-4";
import { msBatchFive } from "@/i18n/dictionaries/ms-batch-5";

// Translation workbench only. Malay remains unpublished until all calculator pages and shared UI are complete.
export const malayCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...msBatchOne,
  ...msBatchTwo,
  ...msBatchThree,
  ...msBatchFour,
  ...msBatchFive,
};
export const translatedMalayCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in malayCalculatorContent);
export const remainingMalayCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in malayCalculatorContent));
