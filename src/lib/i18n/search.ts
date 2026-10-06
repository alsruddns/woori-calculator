export type CalculatorSearchRecord = {
  name: string;
  slug: string;
  description?: string;
  keywords?: readonly string[];
};

export function matchesCalculatorSearch(item: CalculatorSearchRecord, query: string): boolean {
  const term = query.trim().toLocaleLowerCase();
  if (!term) return true;
  return `${item.name} ${item.slug} ${item.description ?? ""} ${(item.keywords ?? []).join(" ")}`
    .toLocaleLowerCase()
    .includes(term);
}
