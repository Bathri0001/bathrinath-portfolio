import { Download, Eye, FileText } from "lucide-react";
import { Reveal } from "./Reveal";

export default function Resume() {
  return (
    <section id="resume" className="px-5 py-16">
      <Reveal className="mx-auto max-w-4xl">
        <div className="card flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent-ink"><FileText className="h-8 w-8" /></span>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">My Resume</h2>
            <p className="mt-1 text-muted">The full details of my education, experience, projects and skills in one PDF.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Eye className="h-4 w-4" /> View Resume</a>
            <a href="/resume.pdf" download="Bathrinath_M_Resume.pdf" className="btn btn-primary"><Download className="h-4 w-4" /> Download Resume</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
