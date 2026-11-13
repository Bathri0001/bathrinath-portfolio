"use client";
import { useRef, useState } from "react";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import CopyEmail from "./CopyEmail";
import { Reveal } from "./Reveal";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const field = "w-full rounded-xl border border-line bg-fg/[0.04] px-4 py-3 text-sm text-fg placeholder:text-muted/70 focus:border-accent focus:outline-none";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const d = new FormData(e.currentTarget);
    const v = (k: string) => String(d.get(k) ?? "").trim();
    const data = { name: v("name"), email: v("email"), subject: v("subject"), message: v("message"), website: v("website") };
    const err: Errors = {};
    if (!data.name) err.name = "Please enter your name.";
    if (!data.email) err.email = "Please enter your email.";
    else if (!emailRe.test(data.email)) err.email = "Please enter a valid email address.";
    if (!data.subject) err.subject = "Please enter a subject.";
    if (!data.message) err.message = "Please write a message.";
    setErrors(err);
    if (Object.keys(err).length) return;

    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        setStatus("sent");
        setFeedback(`Thanks ${data.name}! Your message was sent. I'll reply to ${data.email}.`);
        formRef.current?.reset();
      } else {
        setStatus("error");
        setFeedback(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please check your connection and try again.");
    }
  }

  const Err = ({ id }: { id: keyof Errors }) => (errors[id] ? <p id={`${id}-err`} className="mt-1 text-xs text-red-500">{errors[id]}</p> : null);
  const a11y = (id: keyof Errors) => ({ "aria-invalid": !!errors[id], "aria-describedby": errors[id] ? `${id}-err` : undefined });

  return (
    <section id="contact" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent2-ink">Contact</p>
          <h2 className="gradient-text text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">Let&apos;s Build Something Meaningful.</h2>
          <p className="mt-4 text-muted">Whether you&apos;re hiring, collaborating, or simply want to connect, I&apos;d be happy to hear from you.</p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="card space-y-5 p-6">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-muted hover:text-fg"><Mail className="h-5 w-5 text-accent-ink" />{profile.email}</a>
              <a href={profile.phoneHref} className="flex items-center gap-3 text-muted hover:text-fg"><Phone className="h-5 w-5 text-accent-ink" />{profile.phone}</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 break-all text-muted hover:text-fg"><LinkedInIcon className="h-5 w-5 shrink-0 text-accent-ink" />{profile.linkedin.replace("https://", "")}</a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 break-all text-muted hover:text-fg"><GitHubIcon className="h-5 w-5 shrink-0 text-accent-ink" />{profile.github.replace("https://", "")}</a>
              <a href={profile.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-fg" aria-label={`${profile.location} — open in Google Maps`}><MapPin className="h-5 w-5 text-accent-ink" />{profile.location} <span aria-hidden="true">↗</span></a>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href={`mailto:${profile.email}`} className="btn btn-primary"><Mail className="h-4 w-4" /> Email Me</a>
                <CopyEmail />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form ref={formRef} onSubmit={onSubmit} noValidate className="card space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label htmlFor="name" className="mb-1.5 block text-sm">Name</label><input id="name" name="name" autoComplete="name" required className={field} placeholder="Your name" {...a11y("name")} /><Err id="name" /></div>
                <div><label htmlFor="email" className="mb-1.5 block text-sm">Email</label><input id="email" name="email" type="email" autoComplete="email" required className={field} placeholder="you@example.com" {...a11y("email")} /><Err id="email" /></div>
              </div>
              <div><label htmlFor="subject" className="mb-1.5 block text-sm">Subject</label><input id="subject" name="subject" required className={field} placeholder="What's this about?" {...a11y("subject")} /><Err id="subject" /></div>
              <div><label htmlFor="message" className="mb-1.5 block text-sm">Message</label><textarea id="message" name="message" rows={5} required className={field} placeholder="Write your message…" {...a11y("message")} /><Err id="message" /></div>
              {/* honeypot — hidden from people, bots fill it */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full sm:w-auto">
                {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> Send Message</>}
              </button>
              <div role="status" aria-live="polite" className="min-h-5 text-sm">
                {status === "sent" && <p className="flex items-start gap-2 text-green-700 dark:text-green-400"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{feedback}</p>}
                {status === "error" && (
                  <p className="text-red-600 dark:text-red-400">{feedback} You can also <a className="underline" href={`mailto:${profile.email}`}>email me directly</a>.</p>
                )}
                {status === "idle" && <p className="text-xs text-muted">Your message is sent straight to my inbox — no email app needed.</p>}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
