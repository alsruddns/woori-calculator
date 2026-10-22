import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { msBatchOne } from "@/i18n/dictionaries/ms-batch-1";
import { msBatchTwo } from "@/i18n/dictionaries/ms-batch-2";
import { msBatchThree } from "@/i18n/dictionaries/ms-batch-3";
import { msBatchFour } from "@/i18n/dictionaries/ms-batch-4";
import { msBatchFive } from "@/i18n/dictionaries/ms-batch-5";
import { msBatchSix } from "@/i18n/dictionaries/ms-batch-6";
import { msBatchSeven } from "@/i18n/dictionaries/ms-batch-7";
import { msBatchEight } from "@/i18n/dictionaries/ms-batch-8";
import { msBatchNine } from "@/i18n/dictionaries/ms-batch-9";
import { msBatchTen } from "@/i18n/dictionaries/ms-batch-10";
import { msBatchEleven } from "@/i18n/dictionaries/ms-batch-11";
import { msBatchTwelve } from "@/i18n/dictionaries/ms-batch-12";

// Translation workbench only. Malay remains unpublished until all calculator pages and shared UI are complete.
export const malayCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...msBatchOne,
  ...msBatchTwo,
  ...msBatchThree,
  ...msBatchFour,
  ...msBatchFive,
  ...msBatchSix,
  ...msBatchSeven,
  ...msBatchEight,
  ...msBatchNine,
  ...msBatchTen,
  ...msBatchEleven,
  ...msBatchTwelve,
};
export const translatedMalayCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in malayCalculatorContent);
export const remainingMalayCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in malayCalculatorContent));
