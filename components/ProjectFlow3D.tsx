"use client";
import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck, BarChart3, Bell, Bot, BrainCircuit, CalendarPlus, ClipboardCheck, CloudSun, Database, FileBarChart, FileText, Gauge, GitCompare,
  Layers, LineChart, MessageSquareText, Newspaper, Receipt, Scissors, Search, ShieldCheck, Sparkles, TrendingUp, Trophy, Upload, UserCog, UtensilsCrossed, Wallet,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/data/projects";

const ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck, upload: Upload, database: Database, scissors: Scissors, search: Search, bot: Bot, layers: Layers, market: LineChart,
  trend: TrendingUp, news: Newspaper, bell: Bell, calendar: CalendarPlus, review: ClipboardCheck, report: FileBarChart, feedback: MessageSquareText,
  wallet: Wallet, receipt: Receipt, bill: FileText, climate: CloudSun, food: UtensilsCrossed, suggest: Sparkles, trophy: Trophy, gauge: Gauge,
  profile: UserCog, brain: BrainCircuit, results: BarChart3, compare: GitCompare, verify: BadgeCheck,
};

export default function ProjectFlow3D({ p, size = "card", labels = true }: { p: Project; size?: "card" | "page"; labels?: boolean }) {
  const steps = p.steps ?? [];
  const n = steps.length;
  const big = size === "page";
  const COLS = 3, rows = Math.max(1, Math.ceil(n / COLS));
  const W = big ? 600 : 320, ROW = big ? 128 : 94, NODE = big ? 76 : 54, H = rows * ROW;
  const pos = steps.map((_, i) => {
    const r = Math.floor(i / COLS), c0 = i % COLS, c = r % 2 === 0 ? c0 : COLS - 1 - c0; // snake path
    return { x: ((c + 0.5) / COLS) * W, y: (r + 0.5) * ROW };
  });

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (paused || n === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setActive(n - 1); return; }
    const t = setInterval(() => setActive((a) => (a + 1) % n), 1300);
    return () => clearInterval(t);
  }, [paused, n]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, (el.clientWidth - 28) / (W + 40)));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [W]);
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 22}deg`);
    ref.current.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 14}deg`);
  };
  const leave = () => { ref.current?.style.setProperty("--ry", "0deg"); ref.current?.style.setProperty("--rx", "0deg"); };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} role="group" aria-label={`3D flow of ${p.title}`}
      className={`relative overflow-hidden border-line ${big ? "h-[30rem] rounded-3xl border sm:h-[38rem]" : "h-[23rem] border-y"}`}>
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(70% 80% at 50% 45%, color-mix(in oklab, var(--accent) 24%, transparent), transparent 70%)" }} />
      <div className="absolute left-1/2" style={{ top: "50%", marginTop: -H / 2 + 14, width: W, height: H, marginLeft: -W / 2, transformStyle: "preserve-3d", transform: `scale(${scale}) rotateX(calc(var(--rx, 0deg) + 30deg)) rotateY(var(--ry, 0deg))`, transition: "transform .25s ease-out" }}>
        <div className="flow-sway absolute inset-0">
          <div aria-hidden="true" className="absolute -inset-5 rounded-3xl border border-line bg-fg/[0.03]" style={{ transform: "translateZ(-26px)" }} />
          <svg width={W} height={H} className="absolute inset-0 overflow-visible" aria-hidden="true">
            {pos.slice(1).map((pt, i) => (
              <line key={i} x1={pos[i].x} y1={pos[i].y} x2={pt.x} y2={pt.y} stroke="var(--accent2)" strokeWidth="2" strokeDasharray="4 8" className="net-line" opacity={i < active ? 1 : 0.3} />
            ))}
            {n > 0 && <circle r="6" fill="var(--accent2)" style={{ transform: `translate(${pos[active].x}px, ${pos[active].y}px)`, transition: active === 0 ? "none" : "transform 1.3s linear", filter: "drop-shadow(0 0 8px var(--accent2))" }} />}
          </svg>
          {steps.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Sparkles, on = i === active, done = i < active;
            return (
              <div key={s.label} onMouseEnter={() => { setPaused(true); setActive(i); }} onMouseLeave={() => setPaused(false)} className="absolute"
                style={{ left: pos[i].x - NODE / 2, top: pos[i].y - NODE / 2, width: NODE, height: NODE, transformStyle: "preserve-3d", transform: `translateZ(${on ? 36 : done ? 8 : 0}px) scale(${on ? 1.12 : 1})`, transition: "transform .5s cubic-bezier(.2,.8,.2,1)" }}>
                {[2, 1].map((k) => <span key={k} aria-hidden="true" className="absolute inset-0 rounded-2xl" style={{ transform: `translateZ(${-k * 6}px)`, background: `color-mix(in oklab, var(--accent) ${22 * k}%, black)` }} />)}
                <span className={`absolute inset-0 grid place-items-center rounded-2xl border transition-colors duration-300 ${on ? "border-accent2 bg-accent text-on-accent shadow-[0_0_28px_var(--accent)]" : done ? "border-accent/60 bg-accent/25 text-accent-ink" : "border-line bg-surface text-muted"}`}>
                  <Icon style={{ width: NODE * 0.42, height: NODE * 0.42 }} />
                </span>
                <b className="absolute -left-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-bg text-[9px] ring-1 ring-line" style={{ transform: "translateZ(3px)" }}>{i + 1}</b>
                {labels && <span aria-hidden="true" className="absolute left-1/2 top-full mt-1.5 w-24 -translate-x-1/2 text-center font-mono leading-tight text-muted" style={{ fontSize: big ? 11 : 9 }}>{s.label}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <ol className="sr-only">{steps.map((s) => <li key={s.label}>{s.label}</li>)}</ol>
      <div className="absolute right-3 top-3 flex max-w-[92%] items-center gap-2 rounded-full border border-line bg-bg/70 px-3 py-1.5 font-mono text-[11px] backdrop-blur">
        <span className="h-2 w-2 shrink-0 rounded-full bg-accent2" /><b className="truncate tracking-wide">{p.pill.label}</b>
        <span className="hidden h-3 w-px bg-line sm:block" /><span className="hidden truncate text-muted sm:block">{p.pill.meta}</span>
      </div>
      <div className="absolute bottom-0 right-0 rounded-tl-2xl bg-gradient-to-br from-accent to-accent2 px-4 py-3 text-on-accent">
        <p className="font-serif text-3xl font-semibold leading-none">{p.metric.value}</p>
        <p className="mt-1 font-mono text-[11px]">{p.metric.label}</p>
      </div>
    </div>
  );
}