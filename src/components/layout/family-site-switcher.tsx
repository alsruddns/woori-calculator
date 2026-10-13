"use client";

import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { familySitesCopy } from "@/i18n/family-sites";

export function FamilySiteSwitcher({ locale }: { locale: Locale }) {
  const copy = familySitesCopy[locale];
  const sites = [
    { href: localePath(locale), value: "portal", label: copy.portal },
    { href: localePath(locale, "/calculators"), value: "calculator", label: copy.calculator },
    { href: localePath(locale, "/tools"), value: "tools", label: copy.tools },
    { href: localePath(locale, "/money"), value: "money", label: copy.moneyBook },
  ];

  return <label className="family-site-control flex shrink-0 flex-col items-start">
    <span className="text-[9px] font-semibold leading-tight text-slate-600 sm:text-[11px]">{copy.label}</span>
    <select aria-label={`${copy.label} (${copy.newTab})`} className="min-h-10 w-[10rem] max-w-[58vw] rounded-lg border border-slate-300 bg-white px-2 text-[10px] leading-5 text-slate-700 focus-visible:outline-2 focus-visible:outline-teal-700 sm:min-h-11 sm:w-auto sm:max-w-[17rem] sm:text-sm" value="calculator" onChange={(event) => {
      const site = sites.find(({ value }) => value === event.currentTarget.value);
      if (site) window.open(site.href, "_blank", "noopener,noreferrer");
    }}>
      {sites.map((site) => <option key={site.value} value={site.value}>{site.label}</option>)}
    </select>
  </label>;
}
