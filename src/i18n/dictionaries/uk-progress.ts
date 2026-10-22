import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { ukBatchOne } from "@/i18n/dictionaries/uk-batch-1";
import { ukBatchTwo } from "@/i18n/dictionaries/uk-batch-2";
import { ukBatchThree } from "@/i18n/dictionaries/uk-batch-3";
import { ukBatchFour } from "@/i18n/dictionaries/uk-batch-4";
import { ukBatchFive } from "@/i18n/dictionaries/uk-batch-5";
import { ukBatchSix } from "@/i18n/dictionaries/uk-batch-6";
import { ukBatchSeven } from "@/i18n/dictionaries/uk-batch-7";
import { ukBatchEight } from "@/i18n/dictionaries/uk-batch-8";
import { ukBatchNine } from "@/i18n/dictionaries/uk-batch-9";
import { ukBatchTen } from "@/i18n/dictionaries/uk-batch-10";
import { ukBatchEleven } from "@/i18n/dictionaries/uk-batch-11";

// Workbench only: keep Ukrainian pages unpublished until all calculator pages and shared UI are complete.
export const ukrainianCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...ukBatchOne,
  ...ukBatchTwo,
  ...ukBatchThree,
  ...ukBatchFour,
  ...ukBatchFive,
  ...ukBatchSix,
  ...ukBatchSeven,
  ...ukBatchEight,
  ...ukBatchNine,
  ...ukBatchTen,
  ...ukBatchEleven,
};
export const translatedUkrainianCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in ukrainianCalculatorContent);
export const remainingUkrainianCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in ukrainianCalculatorContent));
