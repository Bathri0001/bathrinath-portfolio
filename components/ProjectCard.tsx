import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { GitHubIcon } from "./Icons";
import ProjectFlow3D from "./ProjectFlow3D";
import { OutputsButton } from "./OutputsViewer";

export default function ProjectCard({ p, index, images }: { p: Project; index: number; images: string[] }) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden !rounded-3xl">
      <div className="flex items-center justify-between px-6 py-4 font-mono text-xs">
        <span className="text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
        <span className="tracking-widest text-muted">FEATURED BUILD</span>
      </div>
    <ProjectFlow3D p={p} />
      <div className="flex flex-1 flex-col px-6 pb-6 pt-7">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-ink">{p.type}</p>
        <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight">{p.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{p.summary}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
          <ul className="flex min-w-0 flex-1 flex-wrap gap-1.5" aria-label="Technologies">
            {p.tech.slice(0, 5).map((t) => <li key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">{t}</li>)}
          </ul>
          <div className="flex items-center gap-2">
            <OutputsButton title={p.title} frame={p.frame} images={images} folder={p.folder} />
            {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} on GitHub`} className="icon-btn !h-10 !w-10"><GitHubIcon className="h-4 w-4" /></a>}
            <Link href={`/projects/${p.slug}`} aria-label={`View details of ${p.title}`} className="grid h-11 w-11 place-items-center rounded-full bg-fg text-bg transition hover:scale-110 hover:bg-accent hover:text-on-accent">
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
