import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { csBatchOne } from "@/i18n/dictionaries/cs-batch-1";
import { csBatchTwo } from "@/i18n/dictionaries/cs-batch-2";
import { csBatchThree } from "@/i18n/dictionaries/cs-batch-3";
import { csBatchFour } from "@/i18n/dictionaries/cs-batch-4";
import { csBatchFive } from "@/i18n/dictionaries/cs-batch-5";
import { csBatchSix } from "@/i18n/dictionaries/cs-batch-6";
import { csBatchSeven } from "@/i18n/dictionaries/cs-batch-7";
import { csBatchEight } from "@/i18n/dictionaries/cs-batch-8";
import { csBatchNine } from "@/i18n/dictionaries/cs-batch-9";
import { csBatchTen } from "@/i18n/dictionaries/cs-batch-10";
import { csBatchEleven } from "@/i18n/dictionaries/cs-batch-11";

export const czechCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...csBatchOne,
  ...csBatchTwo,
  ...csBatchThree,
  ...csBatchFour,
  ...csBatchFive,
  ...csBatchSix,
  ...csBatchSeven,
  ...csBatchEight,
  ...csBatchNine,
  ...csBatchTen,
  ...csBatchEleven,
};

export const translatedCzechCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in czechCalculatorContent);
export const remainingCzechCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in czechCalculatorContent));
