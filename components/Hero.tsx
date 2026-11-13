"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { Download, Mail, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import LikeButton from "./LikeButton";
import AudienceIndicator from "./AudienceIndicator";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center px-5 pb-16 pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-[110%] overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
        <Image src="/images/hero-bg.png" alt="" fill priority sizes="100vw" className="object-cover object-center opacity-25 dark:opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/75 to-bg/20" />
        <div className="absolute inset-0 bg-accent/15 mix-blend-color" />
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm text-green-700 dark:text-green-300">
            <span className="live-dot h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
            {profile.availability}
          </motion.div>
          <motion.a variants={item} href={profile.mapsUrl} target="_blank" rel="noopener noreferrer" className="mb-6 ml-0 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-accent-ink sm:ml-3" aria-label={`Location: ${profile.location} (opens map)`}>
            <MapPin className="h-4 w-4" /> {profile.location}
          </motion.a>
          <motion.p variants={item} className="text-lg text-muted">Hello, I&apos;m</motion.p>
          <motion.h1 variants={item} className="gradient-text mt-1 text-5xl font-bold uppercase leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
            {profile.displayName}
          </motion.h1>
          <motion.p variants={item} className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-accent2-ink sm:text-base">{profile.title}</motion.p>
          <motion.p variants={item} className="mt-6 max-w-xl text-2xl font-medium leading-snug text-fg/90 sm:text-3xl">{profile.headline}</motion.p>
          <motion.p variants={item} className="mt-5 max-w-xl text-muted">{profile.intro}</motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/#projects" className="btn btn-primary">View My Work</Link>
            <a href="/resume.pdf" download="Bathrinath_M_Resume.pdf" className="btn btn-ghost"><Download className="h-4 w-4" /> Download Resume</a>
            <Link href="/#contact" className="btn btn-ghost">Let&apos;s Talk</Link>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-2">
            <a className="icon-btn" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><GitHubIcon /></a>
            <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><LinkedInIcon /></a>
            <a className="icon-btn" href={`mailto:${profile.email}`} aria-label="Send an email"><Mail className="h-5 w-5" /></a>
            <span className="mx-2 hidden h-6 w-px bg-line sm:block" />
            <LikeButton />
            <AudienceIndicator />
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto aspect-[4/5] w-full max-w-sm sm:max-w-md lg:max-w-none">
      {/* connected AI nodes */}
      <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full opacity-70" aria-hidden="true">
        {[[40,90,150,40],[150,40,330,100],[330,100,370,250],[370,250,300,430],[300,430,90,450],[90,450,30,300],[30,300,40,90],[150,40,370,250],[30,300,300,430]].map(([x1,y1,x2,y2],i)=>(
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#g)" strokeWidth="1" className="net-line" />
        ))}
        {[[40,90],[150,40],[330,100],[370,250],[300,430],[90,450],[30,300]].map(([cx,cy],i)=>(
          <circle key={i} cx={cx} cy={cy} r="5" fill="#8b5cf6" className="net-node" style={{ animationDelay: `${i * 0.4}s` }} />
        ))}
        <defs><linearGradient id="g" x1="0" x2="1"><stop stopColor="#8b5cf6" /><stop offset="1" stopColor="#22d3ee" /></linearGradient></defs>
      </svg>

      {/* floating cards */}
      <div className="float card absolute left-0 top-[14%] hidden items-center gap-2 bg-elevated/90 px-3 py-2 text-xs sm:flex">
        <Sparkles className="h-4 w-4 text-accent-ink" /> RAG pipeline · 5 file types
      </div>
      <div className="float-slow card absolute right-0 top-[34%] w-28 bg-elevated/90 p-3 text-[10px] text-muted">
        <p className="mb-2">Retrieval relevance</p>
        <div className="flex h-10 items-end gap-1">
          {[40, 60, 45, 80, 65, 95].map((h, i) => (
            <span key={i} className="flex-1 rounded-sm bg-gradient-to-t from-accent to-accent2" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="float card absolute bottom-0 left-[-2%] w-[78%] bg-surface/90 p-3 font-mono text-[11px] leading-relaxed sm:left-[2%]">
        <div className="mb-2 flex gap-1.5"><i className="h-2 w-2 rounded-full bg-red-500/80" /><i className="h-2 w-2 rounded-full bg-yellow-500/80" /><i className="h-2 w-2 rounded-full bg-green-500/80" /></div>
        <p><span className="text-accent2-ink">$</span> rag.query(<span className="text-green-700 dark:text-green-300">&quot;find document&quot;</span>)</p>
        <p className="text-muted">→ embed ✓ → qdrant.search ✓</p>
        <p>→ answer ready<span className="caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-accent2" /></p>
      </div>
      <div className="float-slow card absolute bottom-[20%] right-[-2%] hidden items-center gap-2 bg-elevated/90 px-3 py-2 text-xs sm:flex">
        <span className="h-2 w-2 rounded-full bg-accent2" /> Vector search
      </div>
    </motion.div>
  );
}
