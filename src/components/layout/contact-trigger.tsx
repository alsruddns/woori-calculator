"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { SharedUiCopy } from "@/i18n/shared-ui";

export function ContactTrigger({ copy }: { copy: SharedUiCopy["contact"] }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return <>
    <button type="button" className="inline-flex min-h-11 items-center rounded pr-2 text-left hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700" onClick={() => setOpen(true)}>{copy.title}</button>
    <dialog ref={dialogRef} aria-labelledby={titleId} aria-describedby={descriptionId} onClose={() => setOpen(false)} className="m-auto max-h-[min(90dvh,48rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/50">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-7 sm:py-5">
        <h2 id={titleId} className="text-xl font-bold">{copy.title}</h2>
        <button type="button" autoFocus onClick={() => dialogRef.current?.close()} aria-label={copy.close} className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-slate-300 text-sm hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">{copy.close}</button>
      </div>
      <div id={descriptionId} className="space-y-4 px-5 py-5 text-sm leading-6 sm:px-7 sm:py-6">
        <p>{copy.intro}</p>
        <p>{copy.details}</p>
        <ul className="list-disc space-y-1 pl-5">{copy.types.map((type) => <li key={type}>{type}</li>)}</ul>
        <p><span className="font-semibold">{copy.emailLabel}: </span><a className="font-semibold text-teal-800 underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-teal-700" href={`mailto:${copy.email}`}>{copy.email}</a></p>
        <p className="text-slate-600">{copy.reply}</p>
      </div>
    </dialog>
  </>;
}
