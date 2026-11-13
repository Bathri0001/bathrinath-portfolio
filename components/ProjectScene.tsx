"use client";
import { useRef } from "react";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

/**
 * Interactive CSS-3D scene that explains how the project works:
 * a tilting device (PC or phone) showing the latest screenshot — or an animated
 * "how it works" flow when no screenshots exist yet — with floating step chips.
 */
export default function ProjectScene({ p, image, tall = false }: { p: Project; image?: string; tall?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 26}deg`);
    ref.current.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 18}deg`);
  };
  const leave = () => { ref.current?.style.setProperty("--ry", "0deg"); ref.current?.style.setProperty("--rx", "0deg"); };
  const steps = p.flow ?? [];
  const chipPos = ["left-2 top-[17%]", "right-2 top-[34%]", "left-2 top-[58%]", "right-2 top-[80%]"];

  const screen = image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={image} alt={`${p.title} output screenshot`} loading="lazy" className="h-full w-full object-cover object-top" />
  ) : steps.length ? (
    <ol className="flex h-full flex-col justify-center gap-1.5 p-3">
      {steps.map((s, i) => (
        <li key={s} style={{ "--i": i, "--n": steps.length } as CSSProperties} className="step-active flex items-center gap-2 rounded-md border border-line bg-fg/[0.05] px-2 py-1 text-[10px]">
          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent/30 text-[9px] text-accent-ink">{i + 1}</span>
          {s}
        </li>
      ))}
    </ol>
  ) : (
    <div className="flex h-full flex-col justify-center gap-2 p-3">
      {[90, 70, 80, 55].map((w, i) => <div key={i} className="step-active h-2 rounded bg-fg/10" style={{ width: `${w}%`, "--i": i, "--n": 4 } as CSSProperties} />)}
    </div>
  );

  const device =
    p.frame === "phone" ? (
      <div className="relative aspect-[9/18] h-[80%] overflow-hidden rounded-[1.6rem] border-[5px] border-fg/25 bg-surface shadow-2xl">
        <span aria-hidden="true" className="absolute left-1/2 top-1 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-fg/30" />
        <div className="h-full w-full pt-3">{screen}</div>
      </div>
    ) : (
      <div className="relative aspect-[16/10] w-[60%] min-w-[220px] overflow-hidden rounded-xl border border-fg/20 bg-surface shadow-2xl">
        <div className="flex items-center gap-1 border-b border-line bg-elevated px-2 py-1.5">
          <i className="h-1.5 w-1.5 rounded-full bg-red-500/80" /><i className="h-1.5 w-1.5 rounded-full bg-yellow-500/80" /><i className="h-1.5 w-1.5 rounded-full bg-green-500/80" />
          <span className="ml-2 h-2.5 flex-1 rounded-full bg-fg/10" />
        </div>
        <div className="h-[calc(100%-1.4rem)]">{screen}</div>
      </div>
    );

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`relative overflow-hidden border-y border-line ${tall ? "h-[26rem]" : "h-[19rem]"}`} style={{ perspective: "1100px" }}
      role="img" aria-label={`3D preview of ${p.title}${steps.length ? `: ${steps.join(" → ")}` : ""}`}>
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(70% 80% at 50% 40%, color-mix(in oklab, var(--accent) 26%, transparent), transparent 70%), linear-gradient(180deg, color-mix(in oklab, var(--accent2) 8%, transparent), transparent)" }} />
      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateX(calc(var(--rx, 0deg) + 5deg)) rotateY(var(--ry, 0deg))", transition: "transform .25s ease-out" }}>
        <div className="scene-sway absolute inset-0">
          <div aria-hidden="true" className="scene-floor" />
          <div className="absolute left-1/2 top-1/2 flex h-[78%] w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center" style={{ transformStyle: "preserve-3d" }}>{device}</div>
          {steps.slice(0, 4).map((s, i) => (
            <span key={s} className={`float absolute ${chipPos[i]} hidden items-center gap-1.5 rounded-full border border-accent/40 bg-bg/80 px-2.5 py-1 font-mono text-[10px] backdrop-blur sm:flex`} style={{ transform: "translateZ(70px)", animationDelay: `${i * 0.7}s` }}>
              <b className="text-accent2-ink">{i + 1}</b>{s}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute right-3 top-3 flex max-w-[92%] items-center gap-2 rounded-full border border-line bg-bg/70 px-3 py-1.5 font-mono text-[11px] backdrop-blur">
        <span className="h-2 w-2 shrink-0 rounded-full bg-accent2" />
        <b className="truncate tracking-wide">{p.pill.label}</b>
        <span className="hidden h-3 w-px bg-line sm:block" />
        <span className="hidden truncate text-muted sm:block">{p.pill.meta}</span>
      </div>
      <div className="absolute bottom-0 right-0 rounded-tl-2xl bg-gradient-to-br from-accent to-accent2 px-4 py-3 text-on-accent">
        <p className="font-serif text-3xl font-semibold leading-none">{p.metric.value}</p>
        <p className="mt-1 font-mono text-[11px]">{p.metric.label}</p>
      </div>
    </div>
  );
}
