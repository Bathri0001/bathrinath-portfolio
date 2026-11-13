import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectFlow3D from "@/components/ProjectFlow3D";
import { OutputsButton } from "@/components/OutputsViewer";
import { getOutputs } from "@/lib/outputs";
import { GitHubIcon } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, alternates: { canonical: `/projects/${p.slug}` }, openGraph: { title: p.title, description: p.summary } };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card p-6">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const images = getOutputs(p.folder);

  return (
    <article className="mx-auto max-w-4xl px-5 pb-24 pt-28">
      <Link href="/#projects" className="mini-btn"><ArrowLeft className="h-3.5 w-3.5" /> All projects</Link>
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-accent2-ink">{p.type} · {p.year}</p>
      <h1 className="gradient-text mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{p.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{p.overview}</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {p.github ? (
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><GitHubIcon className="h-4 w-4" /> View on GitHub</a>
        ) : (
          <span className="text-sm text-muted">GitHub link: not available</span>
        )}
        <OutputsButton title={p.title} frame={p.frame} images={images} folder={p.folder} />
        {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><ExternalLink className="h-4 w-4" /> Live demo</a>}
      </div>

      <div className="mt-10"><ProjectFlow3D p={p} size="page" /></div>

      <div className="mt-10 grid gap-5">
        {p.problem && <Block title="Problem"><p className="text-muted">{p.problem}</p></Block>}
        {p.solution && <Block title="Solution"><p className="text-muted">{p.solution}</p></Block>}
        {p.architecture && (
          <Block title="Architecture (high level)">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              {p.architecture.map((s, k) => (
                <li key={s} className="flex items-center gap-2"><span className="rounded-full border border-line bg-fg/5 px-3 py-1.5">{s}</span>{k < p.architecture!.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted" />}</li>
              ))}
            </ol>
          </Block>
        )}
        {p.tech.length > 0 && (
          <Block title="Technologies">
            <ul className="flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="rounded-full border border-line bg-fg/5 px-3 py-1 text-sm text-muted">{t}</li>)}</ul>
          </Block>
        )}
        {p.results && (
          <Block title="Results">
            <ul className="space-y-2 text-muted">{p.results.map((r) => <li key={r}>▸ {r}</li>)}</ul>
          </Block>
        )}
      </div>

      <Link href={`/projects/${next.slug}`} className="card card-hover mt-12 flex items-center justify-between p-5">
        <span><span className="block text-xs text-muted">Next project</span><span className="font-medium">{next.title}</span></span>
        <ArrowRight className="h-5 w-5 text-accent-ink" />
      </Link>
    </article>
  );
}
