"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { GraduationCap, MapPin } from "lucide-react";
import { education } from "@/data/education";
import { DocActions } from "./CertificateViewer";
import Badge3D from "./Badge3D";
import { Reveal, SectionHeading } from "./Reveal";

export default function Education() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section id="education" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Education" title="My learning journey">A timeline from my internship and MCA back to 10th standard. Use View to open each mark sheet or certificate.</SectionHeading>

        <ol ref={ref} className="relative">
          <span aria-hidden="true" className="absolute left-5 top-0 h-full w-px bg-line md:left-1/2" />
          <motion.span aria-hidden="true" style={{ scaleY }} className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-accent to-accent2 md:left-1/2" />

          {education.map((e, i) => (
            <li key={e.degree} className="relative grid grid-cols-[40px_1fr] gap-x-5 pb-12 last:pb-0 md:grid-cols-[1fr_40px_1fr] md:gap-x-10">
              <div className="relative z-10 md:col-start-2 md:row-start-1">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-bg ${i === 0 ? "shadow-[0_0_24px_var(--accent)]" : ""}`}>
                  {i === 0 ? <GraduationCap className="h-5 w-5 text-accent-ink" /> : <MapPin className="h-4 w-4 text-accent-ink" />}
                </span>
              </div>

              <div aria-hidden="false" className={`hidden items-center md:flex ${i % 2 === 0 ? "md:col-start-3 md:row-start-1 md:justify-start md:pl-6" : "md:col-start-1 md:row-start-1 md:justify-end md:pr-6"}`}>
                <Badge3D text={e.tag} />
              </div>
              <Reveal className={i % 2 === 0 ? "md:col-start-1 md:row-start-1" : "md:col-start-3 md:row-start-1"}>
                <div className="card card-hover p-5 sm:p-6">
                  <div className="mb-3 md:hidden"><Badge3D text={e.tag} small /></div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono uppercase tracking-widest text-accent2-ink">{e.level}</span>
                    <span className="text-muted">· {e.period}</span>
                    {e.status && <span className="rounded-full bg-accent/15 px-2 py-0.5 text-accent-ink">{e.status}</span>}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">{e.degree}</h3>
                  <p className="mt-1 text-sm text-muted">{e.school}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted"><MapPin className="h-3 w-3" />{e.place}</p>
                  {e.score && <p className="mt-3 inline-block rounded-full border border-line bg-fg/5 px-3 py-1 text-sm font-medium">{e.score}</p>}
                  {e.details?.map((d) => <p key={d} className="mt-2 text-sm text-muted">{d}</p>)}
                  <div className="mt-4 space-y-2 border-t border-line pt-4">
                    {e.docs.map((d) => (
                      <div key={d.file} className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs text-muted">{d.title}</span>
                        <DocActions doc={d} />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
