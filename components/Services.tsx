import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const z = (n: number) => ({ transform: `translateZ(${n}px)` });

function WebScene() {
  return (
    <div className="svc-3d relative h-28 w-56">
      <div className="absolute inset-0 rounded-xl border border-accent/50 bg-surface/60">
        <div className="flex items-center gap-1 p-2"><i className="h-2 w-2 rounded-full bg-fg/40" /><i className="h-2 w-2 rounded-full bg-fg/40" /><i className="h-2 w-2 rounded-full bg-fg/40" /><span className="ml-1 h-2.5 flex-1 rounded-full border border-fg/40" /></div>
      </div>
      <div className="absolute left-3 top-9 h-16 w-14 rounded-md border border-accent/50 bg-accent/10" style={z(16)} />
      <div className="absolute left-[4.6rem] top-9 h-7 w-[8.4rem] rounded-md border border-accent2/50 bg-accent2/10" style={z(28)} />
      <div className="absolute left-[4.6rem] top-[4.6rem] h-6 w-16 rounded-md border border-accent2/50 bg-accent2/10" style={z(20)} />
      <div className="absolute left-[9.4rem] top-[4.6rem] h-6 w-[4.6rem] rounded-md border border-accent2/50 bg-accent2/10" style={z(20)} />
      <div className="absolute left-[5.6rem] top-[2.9rem]" style={z(46)}><span className="block h-3 w-3 rounded-full bg-accent2 shadow-[0_0_14px_var(--accent2)]" style={{ animation: "svcCursor 5s ease-in-out infinite" }} /></div>
    </div>
  );
}

function PhoneScene() {
  return (
    <div className="svc-3d relative h-[8.5rem] w-20">
      <div className="absolute inset-0 rounded-2xl border border-accent2/60 bg-surface/60"><span className="mx-auto mt-1.5 block h-1.5 w-8 rounded-full bg-accent2/70" /></div>
      <div className="absolute left-2 top-6 h-12 w-16 rounded-md border border-accent2/50 bg-accent2/10" style={z(18)} />
      <div className="absolute left-2 top-[4.7rem] h-8 w-7 rounded-md border border-accent/50 bg-accent/10" style={z(28)} />
      <div className="absolute left-[2.9rem] top-[4.7rem] h-8 w-7 rounded-md border border-accent/50 bg-accent/10" style={z(28)} />
      <div className="absolute left-2 top-[7.2rem] h-3 w-16 rounded-md border border-accent2/50" style={z(14)} />
    </div>
  );
}

function ApiScene() {
  return (
    <div className="svc-3d">
      <svg viewBox="0 0 240 120" className="h-28 w-56" aria-hidden="true">
        <g stroke="var(--accent2)" strokeWidth="1.2" fill="none" className="net-line"><path d="M44 60 H92" /><path d="M128 52 L172 30" /><path d="M128 68 L172 92" /></g>
        <g className="net-node" fill="var(--accent)"><circle cx="30" cy="60" r="7" /><circle cx="190" cy="26" r="7" /><circle cx="190" cy="96" r="7" /></g>
        <rect x="92" y="40" width="40" height="40" rx="10" fill="color-mix(in oklab, var(--accent2) 14%, transparent)" stroke="var(--accent2)" />
        <circle cx="112" cy="60" r="9" fill="var(--accent2)" className="net-node" />
        <rect x="170" y="10" width="40" height="32" rx="8" fill="none" stroke="var(--accent2)" strokeOpacity=".6" />
        <rect x="170" y="80" width="40" height="32" rx="8" fill="none" stroke="var(--accent)" strokeOpacity=".6" />
      </svg>
    </div>
  );
}

function DbScene() {
  const cyl = (cx: number, cy: number, w: number, h: number, c: string) => (
    <g stroke={c} fill="none" strokeWidth="1.2">
      <ellipse cx={cx} cy={cy} rx={w} ry={w * 0.28} />
      <path d={`M${cx - w} ${cy} V${cy + h} A${w} ${w * 0.28} 0 0 0 ${cx + w} ${cy + h} V${cy}`} />
      <path d={`M${cx - w} ${cy + h / 2} A${w} ${w * 0.28} 0 0 0 ${cx + w} ${cy + h / 2}`} />
    </g>
  );
  return (
    <div className="svc-3d">
      <svg viewBox="0 0 240 120" className="h-28 w-56" aria-hidden="true">
        {cyl(90, 22, 40, 34, "var(--accent)")}
        {cyl(96, 80, 30, 22, "var(--accent)")}
        <path d="M126 70 H170" stroke="var(--accent2)" strokeWidth="1.2" className="net-line" />
        <rect x="170" y="54" width="34" height="32" rx="8" fill="none" stroke="var(--accent2)" />
        <circle cx="187" cy="70" r="6" fill="var(--accent2)" className="net-node" />
      </svg>
    </div>
  );
}

const CARDS = [
  { n: "01", tag: "RESPONSIVE SYSTEMS", title: "Web development", text: "Fast, adaptable interfaces that feel considered on every screen.", tech: ["React.js", "Next.js", "HTML5", "CSS3", "JavaScript"], scene: <WebScene /> },
  { n: "02", tag: "NATIVE ARCHITECTURE", title: "Android development", text: "Useful mobile experiences designed around real-world context.", tech: ["Java", "Room DB", "Firebase"], scene: <PhoneScene /> },
  { n: "03", tag: "SCALABLE INTEGRATION", title: "API & systems", text: "Reliable integration layers that make product capabilities reusable.", tech: ["Node.js", "Express.js", "Spring Boot", "PHP", "Postman", "REST APIs"], scene: <ApiScene /> },
  { n: "04", tag: "DATA FOUNDATION", title: "Database design", text: "Practical data models that support clear, maintainable products.", tech: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Qdrant"], scene: <DbScene /> },
];

export default function Services() {
  return (
    <section id="services" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="What I do" title="Services & capabilities">The kinds of products I design and build — from interface to data.</SectionHeading>
        <div className="grid gap-6 md:grid-cols-2">
          {CARDS.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.07}>
              <article className="card card-hover flex h-full flex-col p-6 !rounded-3xl">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-accent-ink">{c.n}</span>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-widest text-muted">{c.tag}</span>
                  </div>
                  <Link href="/#contact" className="mini-btn !px-4 !py-2 font-mono">Discuss <ArrowUpRight className="h-3.5 w-3.5" /></Link>
                </div>
                <h3 className="mt-6 text-3xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-muted">{c.text}</p>
                <div className="mt-6 flex h-44 items-center justify-center rounded-2xl border border-line bg-bg/40" style={{ perspective: "800px" }}>{c.scene}</div>
                <ul className="mt-6 flex flex-wrap gap-2">{c.tech.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{t}</li>)}</ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}