import type { LocalizedCalculatorSlug } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { msPage } from "@/i18n/dictionaries/ms-page";
import { msGlobalResultLabels64 } from "@/i18n/dictionaries/ms-global-result-labels";

type UsPageSpec = Parameters<typeof msPage>[1];
export function msUsPage(slug: LocalizedCalculatorSlug, spec: Omit<UsPageSpec, "results">): LocalizedCalculatorContent {
  return msPage(slug, { ...spec, results: msGlobalResultLabels64 });
}

export const msGlobalResultPage = msUsPage;
