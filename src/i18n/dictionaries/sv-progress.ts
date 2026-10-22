import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { svBatchOne } from "@/i18n/dictionaries/sv-batch-1";
import { svBatchTwo } from "@/i18n/dictionaries/sv-batch-2";
import { svBatchThree } from "@/i18n/dictionaries/sv-batch-3";
import { svBatchFour } from "@/i18n/dictionaries/sv-batch-4";
import { svBatchFive } from "@/i18n/dictionaries/sv-batch-5";
import { svBatchSix } from "@/i18n/dictionaries/sv-batch-6";
import { svBatchSeven } from "@/i18n/dictionaries/sv-batch-7";

// Swedish stays unpublished until all calculator pages and shared UI are translated.
export const swedishCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...svBatchOne,
  ...svBatchTwo,
  ...svBatchThree,
  ...svBatchFour,
  ...svBatchFive,
  ...svBatchSix,
  ...svBatchSeven,
};
export const translatedSwedishCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in swedishCalculatorContent);
export const remainingSwedishCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in swedishCalculatorContent));
