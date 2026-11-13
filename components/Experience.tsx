import { Building2, CalendarDays, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { Reveal, SectionHeading } from "./Reveal";
import { DocActions } from "./CertificateViewer";

export default function Experience() {
  return (
    <section id="experience" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Experience" title="Where I've applied my skills" />
        <ol className="relative border-l border-line pl-8">
          {experience.map((e) => (
            <li key={e.company} className="relative">
              <span className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-accent bg-bg shadow-[0_0_20px_var(--color-accent)]" aria-hidden="true" />
              <Reveal>
                <div className="card p-6 sm:p-8">
                  <h3 className="text-xl font-semibold sm:text-2xl">{e.role}</h3>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                    <span className="inline-flex items-center gap-2"><Building2 className="h-4 w-4 text-accent-ink" />{e.company}</span>
                    <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-accent-ink" />{e.period}</span>
                    <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-accent-ink" />{e.location}</span>
                  </div>
                  <p className="mt-5 text-sm text-accent2-ink">Project: {e.project}</p>
                  <p className="mt-2 max-w-3xl text-muted">{e.description}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {e.metrics.map((m) => (
                      <div key={m.label} className="rounded-2xl border border-line bg-fg/[0.03] p-4">
                        <dt className="sr-only">{m.label}</dt>
                        <dd className="gradient-text text-3xl font-bold">{m.value}</dd>
                        <p className="mt-1 text-xs text-muted" aria-hidden="true">{m.label}</p>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 border-t border-line pt-4"><DocActions doc={e.docs[0]} label="Certificate of Appreciation" /></div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
