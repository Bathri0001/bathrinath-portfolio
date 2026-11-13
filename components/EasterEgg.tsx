"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";

/** Type "b" then "m" (or press the ✦ button in the footer) for a small surprise. */
export default function EasterEgg() {
  const [open, setOpen] = useState(false);
  const last = useRef<{ k: string; t: number } | null>(null);

  const fire = useCallback(() => {
    setOpen(true);
    setTimeout(() => setOpen(false), 3500);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.ctrlKey || e.metaKey || e.altKey) return;
      const now = Date.now();
      const k = e.key.toLowerCase();
      if (k === "m" && last.current?.k === "b" && now - last.current.t < 1500) fire();
      last.current = { k, t: now };
    };
    const onCustom = () => fire();
    window.addEventListener("keydown", onKey);
    window.addEventListener("bm-easter-egg", onCustom);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("bm-easter-egg", onCustom);
    };
  }, [fire]);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed bottom-20 left-1/2 z-[70] -translate-x-1/2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className="card flex items-center gap-2 bg-elevated px-5 py-3 text-sm shadow-2xl"
          >
            <Sparkles className="h-4 w-4 text-accent2-ink" /> Hello, curious developer — thanks for exploring! 👋
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function EasterEggButton() {
  return (
    <button
      type="button"
      aria-label="Reveal a small surprise"
      className="rounded-full p-2 text-muted transition hover:text-accent2-ink"
      onClick={() => window.dispatchEvent(new Event("bm-easter-egg"))}
    >
      <Sparkles className="h-4 w-4" />
    </button>
  );
}
