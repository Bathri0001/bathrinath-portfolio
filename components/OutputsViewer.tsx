"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";

type Opened = { title: string; frame: "pc" | "phone"; images: string[]; folder: string };
const Ctx = createContext<{ open: (o: Opened) => void }>({ open: () => {} });

export function OutputsProvider({ children }: { children: ReactNode }) {
  const [o, setO] = useState<Opened | null>(null);
  const [i, setI] = useState(0);
  const trigger = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const n = o?.images.length ?? 0;

  const open = useCallback((x: Opened) => { trigger.current = document.activeElement as HTMLElement; setI(0); setO(x); }, []);
  const close = useCallback(() => { setO(null); trigger.current?.focus(); }, []);
  const go = useCallback((d: number) => setI((v) => (n ? (v + d + n) % n : 0)), [n]);

  useEffect(() => {
    if (!o) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("button");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [o, close, go]);

  const name = (src: string) => decodeURIComponent(src.split("/").pop() ?? "").replace(/\.[^.]+$/, "");

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {o && createPortal(
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div ref={panel} role="dialog" aria-modal="true" aria-label={`${o.title} outputs`} className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <p className="truncate text-sm font-medium">{o.title} — Outputs</p>
              <button type="button" className="icon-btn !h-9 !w-9" onClick={close} aria-label="Close outputs"><X className="h-4 w-4" /></button>
            </div>

            {n === 0 ? (
              <div className="p-10 text-center text-sm text-muted">
                <Images className="mx-auto mb-3 h-8 w-8 text-accent-ink" />
                <p>No output screenshots yet.</p>
                <p className="mt-1">Add images to <code className="rounded bg-fg/10 px-1.5 py-0.5">public/images/{o.folder}/</code> and they will appear here automatically.</p>
              </div>
            ) : (
              <>
                <div role="tablist" aria-label="Output screenshots" className="flex gap-2 overflow-x-auto border-b border-line px-4 py-2">
                  {o.images.map((src, k) => (
                    <button key={src} role="tab" id={`out-tab-${k}`} aria-selected={k === i} aria-controls="out-panel" title={name(src)} onClick={() => setI(k)}
                      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition ${k === i ? "border-accent bg-accent/20 text-fg" : "border-line text-muted hover:text-fg"}`}>Output {k + 1}</button>
                  ))}
                </div>
                <div id="out-panel" role="tabpanel" aria-labelledby={`out-tab-${i}`} className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto p-4 sm:p-6">
                  <button type="button" onClick={() => go(-1)} aria-label="Previous output" className="icon-btn absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-bg/70 backdrop-blur"><ChevronLeft className="h-5 w-5" /></button>
                  <AnimatePresence mode="wait">
                    <motion.div key={i} initial={{ opacity: 0, x: 40, rotateY: -8 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: -40, rotateY: 8 }} transition={{ duration: 0.3 }} className="w-full" style={{ perspective: 1200 }}>
                      {o.frame === "phone" ? (
                        <div className="mx-auto w-[min(280px,64vw)] overflow-hidden rounded-[2rem] border-[6px] border-fg/25 bg-black shadow-2xl">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={o.images[i]} alt={`${o.title} output ${i + 1}`} className="block max-h-[62vh] w-full object-contain" />
                        </div>
                      ) : (
                        <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-fg/20 bg-elevated shadow-2xl">
                          <div className="flex items-center gap-1.5 border-b border-line px-3 py-2"><i className="h-2 w-2 rounded-full bg-red-500/80" /><i className="h-2 w-2 rounded-full bg-yellow-500/80" /><i className="h-2 w-2 rounded-full bg-green-500/80" /><span className="ml-2 h-3 flex-1 rounded-full bg-fg/10" /></div>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={o.images[i]} alt={`${o.title} output ${i + 1}`} className="block max-h-[58vh] w-full bg-surface object-contain object-top" />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                  <button type="button" onClick={() => go(1)} aria-label="Next output" className="icon-btn absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-bg/70 backdrop-blur"><ChevronRight className="h-5 w-5" /></button>
                </div>
                <p className="border-t border-line px-4 py-2 text-center text-xs text-muted" aria-live="polite">{i + 1} / {n} · use ← → keys or the tabs</p>
              </>
            )}
          </div>
        </div>, document.body)}
    </Ctx.Provider>
  );
}

export function OutputsButton({ title, frame, images, folder }: Opened) {
  const { open } = useContext(Ctx);
  return (
    <button type="button" className="mini-btn" onClick={() => open({ title, frame, images, folder })} aria-label={`View outputs of ${title}`}>
      <Images className="h-3.5 w-3.5" /> View Outputs{images.length > 0 && <span className="rounded-full bg-accent/20 px-1.5 text-[10px] text-accent-ink">{images.length}</span>}
    </button>
  );
}
