"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import ThemeControls from "./ThemeControls";
import { InstallButton } from "./InstallApp";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [isHome]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "border-b border-line bg-bg/70 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label="Bathrinath Murugan — home" className="group flex items-center gap-2 font-semibold tracking-tight">
          <motion.span whileHover={{ rotate: -6, scale: 1.08 }} className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-sm font-bold text-black">BM</motion.span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <Link href={`/#${l.id}`} aria-current={isHome && active === l.id ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition ${isHome && active === l.id ? "text-fg" : "text-muted hover:text-fg"}`}>
                {isHome && active === l.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-fg/10" />}
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeControls />
          <span className="hidden xl:inline-block"><InstallButton className="btn btn-ghost !py-2" label="Install" /></span>
          <Link href="/#contact" className="btn btn-primary hidden !py-2 sm:inline-flex">Let&apos;s Talk</Link>
          <button type="button" className="icon-btn lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden lg:hidden">
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-5">
              {links.map((l) => (
                <li key={l.id}>
                  <Link href={`/#${l.id}`} onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 text-muted hover:bg-fg/5 hover:text-fg">{l.label}</Link>
                </li>
              ))}
              <li><Link href="/#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-2 w-full">Let&apos;s Talk</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
