"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { matchesCalculatorSearch } from "@/lib/i18n/search";

type CatalogItem = { slug: string; name: string; description: string; category: string; keywords?: readonly string[] };

export function CalculatorCatalog({ items, categories, categoryOrder, searchLabel, emptyLabel, basePath }: {
  items: readonly CatalogItem[];
  categories: Readonly<Record<string, string>>;
  categoryOrder: readonly string[];
  searchLabel: string;
  emptyLabel: string;
  basePath: string;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => items.filter((item) => matchesCalculatorSearch(item, query)), [items, query]);
  const groups = categoryOrder.map((category) => ({ category, items: filtered.filter((item) => item.category === category) })).filter(({ items: group }) => group.length);
  return <>
    <label className="mt-7 block max-w-xl"><span className="sr-only">{searchLabel}</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchLabel} className="min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base outline-none focus-visible:border-teal-700 focus-visible:ring-2 focus-visible:ring-teal-700/20" /></label>
    {groups.length ? <div className="mt-8 space-y-9">{groups.map(({ category, items: group }) => <section key={category} id={`category-${category}`} aria-labelledby={`heading-${category}`}><h2 id={`heading-${category}`} className="text-xl font-bold">{categories[category]}</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{group.map((item) => <li key={item.slug}><Link href={`${basePath}/${item.slug}`} className="block h-full rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"><h3 className="font-semibold">{item.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p></Link></li>)}</ul></section>)}</div> : <p className="mt-8 rounded-xl border border-slate-200 bg-white p-5 text-slate-600">{emptyLabel}</p>}
  </>;
}
