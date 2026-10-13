"use client";

import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import type { SharedUiCopy } from "@/i18n/shared-ui";

export function FamilySiteSwitcher({ locale, copy }: { locale: Locale; copy: SharedUiCopy }) {
  const current = localePath(locale, "/calculators");
  const sites = [
    { href: localePath(locale), label: copy.portal },
    { href: localePath(locale, "/money"), label: copy.moneyBook },
    { href: current, label: copy.calculator },
    { href: localePath(locale, "/tools"), label: copy.tools },
  ];

  return <label className="flex shrink-0 items-center">
    <span className="sr-only">{copy.familySite}</span>
    <select aria-label={copy.familySite} className="min-h-11 w-[5.75rem] rounded-lg border border-slate-300 bg-white px-2 text-xs leading-5 text-slate-700 focus-visible:outline-2 focus-visible:outline-teal-700 sm:w-auto sm:text-sm" value={current} onChange={(event) => window.location.assign(event.currentTarget.value)}>
      {sites.map((site) => <option key={site.href} value={site.href}>{site.label}</option>)}
    </select>
  </label>;
}
