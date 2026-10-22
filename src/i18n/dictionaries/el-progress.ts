import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { elBatchOne } from "@/i18n/dictionaries/el-batch-1";
import { elBatchTwo } from "@/i18n/dictionaries/el-batch-2";
import { elBatchThree } from "@/i18n/dictionaries/el-batch-3";
import { elBatchFour } from "@/i18n/dictionaries/el-batch-4";
import { elBatchFive } from "@/i18n/dictionaries/el-batch-5";

export const greekCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...elBatchOne,
  ...elBatchTwo,
  ...elBatchThree,
  ...elBatchFour,
  ...elBatchFive,
};

export const translatedGreekCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in greekCalculatorContent);
export const remainingGreekCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in greekCalculatorContent));
