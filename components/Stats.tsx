"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

type S = { target: number | null; pad?: number; suffix?: string; symbol?: string; label: string };
const STATS: S[] = [
  { target: 5, pad: 2, suffix: "+", label: "Products designed\nand developed" },
  { target: 10, suffix: "+", label: "Technologies in\nactive practice" },
  { target: 1, pad: 2, label: "Month of professional\nexperience" },
  { target: null, symbol: "∞", label: "Learning" },
];

function Value({ s }: { s: S }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || s.target === null) return;
    const c = animate(0, s.target, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, s.target]);
  if (s.target === null) return <span ref={ref}>{s.symbol}</span>;
  return <span ref={ref}>{String(n).padStart(s.pad ?? 0, "0")}{s.suffix}</span>;
}

export default function Stats() {
  return (
    <section aria-label="Highlights" className="px-5 pb-6">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-surface/80 p-6 backdrop-blur sm:p-8">
            <dd className="gradient-text text-5xl font-semibold tracking-tight sm:text-6xl"><Value s={s} /></dd>
            <dt className="mt-3 whitespace-pre-line font-mono text-xs uppercase leading-relaxed tracking-wider text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
