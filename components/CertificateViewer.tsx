"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Download, ExternalLink, Eye, X } from "lucide-react";
import type { Doc } from "@/data/documents";

const Ctx = createContext<{ open: (d: Doc) => void }>({ open: () => {} });

export function CertificateProvider({ children }: { children: ReactNode }) {
  const [doc, setDoc] = useState<Doc | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  const open = useCallback((d: Doc) => {
    trigger.current = document.activeElement as HTMLElement;
    setDoc(d);
  }, []);
  const close = useCallback(() => {
    setDoc(null);
    trigger.current?.focus();
  }, []);

  useEffect(() => {
    if (!doc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>("button, a[href]");
      if (!f.length) return;
      const first = f[0], lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [doc, close]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {doc &&
        createPortal(
          <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && close()}>
            <div ref={panel} role="dialog" aria-modal="true" aria-label={doc.title} className="flex h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
                <p className="min-w-0 flex-1 truncate text-sm font-medium">{doc.title}</p>
                <div className="flex items-center gap-2">
                  <a className="mini-btn" href={doc.file} download aria-label={`Download ${doc.title}`}><Download className="h-3.5 w-3.5" /> Download</a>
                  <a className="mini-btn" href={doc.file} target="_blank" rel="noopener noreferrer" aria-label="Open in a new tab"><ExternalLink className="h-3.5 w-3.5" /> New tab</a>
                  <button type="button" className="icon-btn !h-9 !w-9" onClick={close} aria-label="Close document"><X className="h-4 w-4" /></button>
                </div>
              </div>
              <iframe src={doc.file} title={doc.title} className="min-h-0 flex-1 bg-white" />
              <p className="border-t border-line px-4 py-2 text-xs text-muted">Document not showing on your device? Use “New tab” or “Download”.</p>
            </div>
          </div>,
          document.body
        )}
    </Ctx.Provider>
  );
}

export function DocActions({ doc, label }: { doc: Doc; label?: string }) {
  const { open } = useContext(Ctx);
  return (
    <div className="flex flex-wrap items-center gap-2">
      {label && <span className="text-xs text-muted">{label}</span>}
      <button type="button" className="mini-btn" onClick={() => open(doc)} aria-label={`View ${doc.title}`}>
        <Eye className="h-3.5 w-3.5" /> View
      </button>
      <a className="mini-btn" href={doc.file} download aria-label={`Download ${doc.title}`}>
        <Download className="h-3.5 w-3.5" /> Download
      </a>
    </div>
  );
}
