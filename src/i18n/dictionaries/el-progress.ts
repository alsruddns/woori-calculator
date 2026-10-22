import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { elBatchOne } from "@/i18n/dictionaries/el-batch-1";
import { elBatchTwo } from "@/i18n/dictionaries/el-batch-2";

export const greekCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...elBatchOne,
  ...elBatchTwo,
};

export const translatedGreekCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in greekCalculatorContent);
export const remainingGreekCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in greekCalculatorContent));
