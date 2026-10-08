"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { matchesCalculatorSearch } from "@/lib/i18n/search";

export type SidebarCalculator = { slug: string; name: string; category: string; keywords?: readonly string[] };

type Props = {
  calculators: readonly SidebarCalculator[];
  categories: Readonly<Record<string, string>>;
  categoryOrder: readonly string[];
  labels: { menu: string; search: string; close: string; empty: string };
  basePath: string;
};

export function CalculatorSidebar({ calculators, categories, categoryOrder, labels, basePath }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const filtered = calculators.filter((item) => matchesCalculatorSearch(item, query));

  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  const list = (searchId: string) => <nav aria-label={labels.menu} className="min-w-0">
    <label className="sr-only" htmlFor={searchId}>{labels.search}</label>
    <input id={searchId} maxLength={200} className="mb-4 min-h-11 w-full rounded-lg border border-slate-300 px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.search} />
    {categoryOrder.map((category) => {
      const items = filtered.filter((item) => item.category === category);
      if (!items.length) return null;
      return <section key={category} className="mb-5" aria-label={categories[category] ?? category}>
        <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-slate-500">{categories[category] ?? category}</p>
        <ul className="space-y-1">{items.map((item) => {
          const href = `${basePath}/${item.slug}`;
          const active = pathname === href;
          return <li key={item.slug} className="min-w-0"><Link href={href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)} className={`block min-h-11 min-w-0 break-words rounded-lg px-3 py-3 text-sm leading-5 [overflow-wrap:anywhere] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${active ? "bg-teal-50 font-semibold text-teal-900" : "text-slate-700 hover:bg-slate-100"}`}>{item.name}</Link></li>;
        })}</ul>
      </section>;
    })}
    {!filtered.length ? <p className="px-2 text-sm text-slate-500">{labels.empty}</p> : null}
  </nav>;

  return <>
    <aside className="sticky top-5 hidden max-h-[calc(100vh-2.5rem)] w-64 min-w-0 self-start overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 lg:block" aria-label={labels.menu}>{list("desktop-calculator-menu-search")}</aside>
    <button ref={triggerRef} type="button" aria-expanded={open} aria-controls="calculator-mobile-menu" onClick={() => setOpen(true)} className="mb-1 min-h-11 self-start rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 lg:hidden">{labels.menu}</button>
    {open ? <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
      <button type="button" tabIndex={-1} aria-label={labels.close} onClick={() => setOpen(false)} className="absolute inset-0 h-full w-full bg-slate-950/40" />
      <aside ref={dialogRef} id="calculator-mobile-menu" role="dialog" aria-modal="true" aria-label={labels.menu} className="absolute inset-y-0 left-0 flex w-[min(21rem,88vw)] max-w-full flex-col overflow-y-auto overscroll-contain bg-white pb-[max(1.25rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] pr-4 pt-[max(1.25rem,env(safe-area-inset-top))] shadow-xl">
        <div className="mb-4 flex min-w-0 items-center justify-between gap-3"><h2 className="min-w-0 break-words font-bold [overflow-wrap:anywhere]">{labels.menu}</h2><button ref={closeRef} type="button" onClick={() => setOpen(false)} className="min-h-11 min-w-11 shrink-0 rounded px-3 text-sm focus-visible:outline-2 focus-visible:outline-teal-700">{labels.close}</button></div>
        {list("mobile-calculator-menu-search")}
      </aside>
    </div> : null}
  </>;
}
