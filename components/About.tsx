import { MapPin, Target, Briefcase, Heart } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal, SectionHeading } from "./Reveal";

const icons = [MapPin, Target, Briefcase, Heart];

export default function About() {
  return (
    <section id="about" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About" title="About Me" />
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
            {profile.about.map((p) => <p key={p}>{p}</p>)}
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {profile.facts.map((f, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={f.label} delay={i * 0.08}>
                  <div className="card card-hover h-full p-5">
                    <Icon className="mb-3 h-5 w-5 text-accent-ink" />
                    <p className="text-xs uppercase tracking-widest text-muted">{f.label}</p>
                    {f.href ? <a href={f.href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-medium underline decoration-accent/50 underline-offset-4 hover:text-accent-ink">{f.value} ↗</a> : <p className="mt-1 font-medium">{f.value}</p>}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
