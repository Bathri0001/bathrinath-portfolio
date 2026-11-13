"use client";
import { useEffect, useRef } from "react";
import TechBackground from "./TechBackground";

export default function Background() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const el = ref.current;
    const move = (e: PointerEvent) => {
      el?.style.setProperty("--mx", `${e.clientX}px`);
      el?.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-accent/20 blur-[120px]" style={{ animation: "drift 18s ease-in-out infinite" }} />
      <div className="absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full bg-accent2/15 blur-[120px]" style={{ animation: "drift 22s ease-in-out infinite reverse" }} />
      <TechBackground />
      <div className="spotlight absolute inset-0 hidden md:block" />
    </div>
  );
}
