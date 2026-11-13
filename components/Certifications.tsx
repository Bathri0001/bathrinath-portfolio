import { Award, Trophy } from "lucide-react";
import { achievements, certifications } from "@/data/certifications";
import { DocActions } from "./CertificateViewer";
import { Reveal, SectionHeading } from "./Reveal";

export default function Certifications() {
  return (
    <section id="certifications" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Recognition" title="Certifications & achievements">Verified documents — view or download each one.</SectionHeading>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold"><Award className="h-5 w-5 text-accent-ink" /> Certifications</h3>
            <div className="space-y-4">
              {certifications.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <div className="card card-hover p-5">
                    <p className="font-medium">{c.title}</p>
                    <p className="mt-1 text-sm text-muted">{c.issuer} · {c.date}</p>
                    <p className="mt-2 text-sm text-muted">{c.note}</p>
                    <div className="mt-4"><DocActions doc={c.doc} /></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold"><Trophy className="h-5 w-5 text-accent-ink" /> Achievements</h3>
            <div className="space-y-4">
              {achievements.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.06}>
                  <div className="card card-hover p-5">
                    <p className="font-medium">{a.title}</p>
                    <p className="mt-1 text-sm text-muted">{a.note}</p>
                    <div className="mt-4"><DocActions doc={a.doc} /></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
