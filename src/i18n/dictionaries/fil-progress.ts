import { localizedCalculatorSlugs } from "@/i18n/config";
import { filBatchOne } from "@/i18n/dictionaries/fil-batch-1";
import { filBatchTwo } from "@/i18n/dictionaries/fil-batch-2";
import { filBatchThree } from "@/i18n/dictionaries/fil-batch-3";
import { filBatchFour } from "@/i18n/dictionaries/fil-batch-4";
import { filBatchFive } from "@/i18n/dictionaries/fil-batch-5";
import { filBatchSix } from "@/i18n/dictionaries/fil-batch-6";
import { filBatchSeven } from "@/i18n/dictionaries/fil-batch-7";
import { filBatchEight } from "@/i18n/dictionaries/fil-batch-8";
import { filBatchNine } from "@/i18n/dictionaries/fil-batch-9";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

// Translation workbench only. It is deliberately not connected to public routing.
export const filipinoCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...filBatchOne,
  ...filBatchTwo,
  ...filBatchThree,
  ...filBatchFour,
  ...filBatchFive,
  ...filBatchSix,
  ...filBatchSeven,
  ...filBatchEight,
  ...filBatchNine,
};

export const translatedFilipinoCalculatorSlugs = localizedCalculatorSlugs.filter(
  (slug) => slug in filipinoCalculatorContent,
);
export const remainingFilipinoCalculatorSlugs = localizedCalculatorSlugs.filter(
  (slug) => !(slug in filipinoCalculatorContent),
);
