"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Check, Download, X } from "lucide-react";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };
const Ctx = createContext<{ canPrompt: boolean; installed: boolean; install: () => Promise<void> }>({ canPrompt: false, installed: false, install: async () => {} });

/** Registers the service worker and captures the browser's install prompt. */
export function InstallProvider({ children }: { children: ReactNode }) {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    if (window.matchMedia("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone) setInstalled(true);
    const before = (e: Event) => { e.preventDefault(); setEvt(e as BIPEvent); };
    const done = () => { setInstalled(true); setEvt(null); };
    window.addEventListener("beforeinstallprompt", before);
    window.addEventListener("appinstalled", done);
    return () => { window.removeEventListener("beforeinstallprompt", before); window.removeEventListener("appinstalled", done); };
  }, []);

  async function install() {
    if (!evt) return;
    await evt.prompt();
    const r = await evt.userChoice;
    if (r.outcome === "accepted") setInstalled(true);
    setEvt(null);
  }
  return <Ctx.Provider value={{ canPrompt: !!evt, installed, install }}>{children}</Ctx.Provider>;
}

/** "Install app" button. Uses the native prompt when available, otherwise shows how-to steps. */
export function InstallButton({ className = "btn btn-ghost", label = "Install App" }: { className?: string; label?: string }) {
  const { canPrompt, installed, install } = useContext(Ctx);
  const [help, setHelp] = useState(false);
  if (installed) return <span className="inline-flex items-center gap-1.5 text-xs text-muted"><Check className="h-3.5 w-3.5 text-green-500" /> App installed</span>;
  return (
    <span className="relative inline-block">
      <button type="button" className={className} onClick={() => (canPrompt ? install() : setHelp((h) => !h))} aria-expanded={help}>
        <Download className="h-4 w-4" /> {label}
      </button>
      {help && (
        <span role="dialog" aria-label="How to install" className="card absolute right-0 top-full z-[70] mt-2 block w-72 bg-elevated p-4 text-left text-xs leading-relaxed text-muted shadow-2xl">
          <button type="button" aria-label="Close" onClick={() => setHelp(false)} className="absolute right-2 top-2 text-muted hover:text-fg"><X className="h-4 w-4" /></button>
          <b className="mb-1 block text-sm text-fg">Install this portfolio as an app</b>
          <b className="text-fg">Android / Chrome:</b> menu ⋮ → <i>Install app</i> / <i>Add to Home screen</i>.<br />
          <b className="text-fg">iPhone / iPad (Safari):</b> Share → <i>Add to Home Screen</i>.<br />
          <b className="text-fg">Desktop Chrome / Edge:</b> click the install icon in the address bar.<br />
          <span className="mt-1 block">Works only on the deployed https site (not on plain localhost over http in some browsers).</span>
        </span>
      )}
    </span>
  );
}
