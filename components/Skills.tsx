import { Brain, Code, Database, Layers, Wrench } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { dbIcons } from "@/data/dbIcons";
import { Reveal, SectionHeading } from "./Reveal";
import Logo3D from "./Logo3D";

const icons = { code: Code, layers: Layers, brain: Brain, database: Database, wrench: Wrench };
const ORDER = ["Programming", "Frameworks", "Tools", "AI / ML", "Databases"];
const DB: { label: string; icon: (typeof dbIcons)[keyof typeof dbIcons] }[] = [
  { label: "MySQL", icon: dbIcons.mysql },
  { label: "PostgreSQL", icon: dbIcons.postgres },
  { label: "MongoDB", icon: dbIcons.mongodb },
  { label: "Firebase", icon: dbIcons.firebase },
  { label: "Vector DB (Qdrant)", icon: dbIcons.qdrant },
];

export default function Skills() {
  const groups = [...skillGroups].sort((a, b) => ORDER.indexOf(a.title) - ORDER.indexOf(b.title));
  return (
    <section id="skills" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Skills" title="Technologies I work with">Tools and technologies from my projects and internship experience.</SectionHeading>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => {
            const Icon = icons[g.icon];
            const isDb = g.title === "Databases";
            const wide = g.title === "AI / ML" || isDb;
            return (
              <Reveal key={g.title} delay={i * 0.06} className={wide ? "md:col-span-2 lg:col-span-3" : ""}>
                <div className="card card-hover h-full p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent-ink"><Icon className="h-5 w-5" /></span>
                    <h3 className="text-lg font-semibold">{g.title}</h3>
                  </div>
                  {isDb ? (
                    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                      {DB.map((d) => <li key={d.label}><Logo3D icon={d.icon} label={d.label} /></li>)}
                    </ul>
                  ) : (
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <li key={s} className="rounded-full border border-line bg-fg/[0.03] px-3 py-1.5 text-sm text-muted transition hover:-translate-y-0.5 hover:border-accent2/50 hover:text-fg">{s}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
