"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { filters, projects, type Category } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { Reveal, SectionHeading } from "./Reveal";

export default function Projects({ outputs }: { outputs: Record<string, string[]> }) {
  const [active, setActive] = useState<"All" | Category>("All");
  const shown = projects.map((p, i) => ({ p, i })).filter(({ p }) => active === "All" || p.categories.includes(active));

  return (
    <section id="projects" className="px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Projects" title="Selected work">Hover a card to tilt the 3D scene. Use “View Outputs” to flip through real screenshots, or the arrow for the full case study.</SectionHeading>
        <Reveal>
          <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button key={f} type="button" aria-pressed={active === f} onClick={() => setActive(f)}
                className={`min-h-11 rounded-full border px-5 text-sm transition ${active === f ? "border-accent bg-accent/20 text-fg" : "border-line text-muted hover:text-fg"}`}>{f}</button>
            ))}
          </div>
        </Reveal>
        <p className="sr-only" role="status" aria-live="polite">{shown.length} projects shown</p>
        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map(({ p, i }) => (
              <motion.div key={p.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
                <ProjectCard p={p} index={i} images={outputs[p.slug] ?? []} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
