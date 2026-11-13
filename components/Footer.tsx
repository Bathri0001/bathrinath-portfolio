import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import { EasterEggButton } from "./EasterEgg";
import { Mail } from "lucide-react";
import { InstallButton } from "./InstallApp";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-5 py-8 text-sm text-muted sm:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <InstallButton className="btn btn-ghost !py-2" />
          <a className="icon-btn" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><GitHubIcon /></a>
          <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><LinkedInIcon /></a>
          <a className="icon-btn" href={`mailto:${profile.email}`} aria-label="Send an email"><Mail className="h-5 w-5" /></a>
          <EasterEggButton />
        </div>
      </div>
    </footer>
  );
}
