"use client";
import { useRef } from "react";

type Icon = { title: string; hex: string; path: string };
const LAYERS = 9;

/** Pseudo-3D extruded brand logo: stacked SVG layers in CSS 3D, idle swing + mouse tilt. */
export default function Logo3D({ icon, label }: { icon: Icon; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 50}deg`);
    ref.current.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 40}deg`);
  };
  const leave = () => { ref.current?.style.setProperty("--ry", "0deg"); ref.current?.style.setProperty("--rx", "0deg"); };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className="card card-hover group relative flex flex-col items-center gap-3 px-3 pb-5 pt-6 text-center" style={{ perspective: "700px" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-4 h-24 rounded-full blur-2xl transition-opacity group-hover:opacity-100" style={{ background: icon.hex, opacity: 0.22 }} />
      <div className="relative h-24 w-24" style={{ transformStyle: "preserve-3d", transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))", transition: "transform .2s ease-out" }}>
        <div className="logo-swing relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          {Array.from({ length: LAYERS }).map((_, i) => (
            <svg key={i} viewBox="0 0 24 24" aria-hidden="true" className="absolute inset-0 h-full w-full"
              style={{ transform: `translateZ(${(i - LAYERS + 1) * 3}px)`, filter: i === LAYERS - 1 ? `drop-shadow(0 6px 10px ${icon.hex}66)` : undefined }}>
              <path d={icon.path} fill={i === LAYERS - 1 ? icon.hex : `color-mix(in oklab, ${icon.hex} ${38 + i * 6}%, black)`} />
            </svg>
          ))}
        </div>
      </div>
      <span aria-hidden="true" className="logo-shadow h-2 w-16 rounded-full bg-fg/20 blur-md" />
      <span className="text-sm font-medium">{label}</span>
      <span className="sr-only">{icon.title} logo</span>
    </div>
  );
}
