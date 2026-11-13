import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { clientIp, rateLimited } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO = process.env.CONTACT_TO ?? "bathri2404@gmail.com";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v: unknown, max: number) => String(v ?? "").replace(/\r/g, "").trim().slice(0, max);

export async function POST(req: Request) {
  if (rateLimited(`contact:${clientIp(req)}`, 4, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }
  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  if (clean(b.website, 200)) return NextResponse.json({ ok: true }); // honeypot: silently drop bots

  const name = clean(b.name, 100), email = clean(b.email, 200), subject = clean(b.subject, 150).replace(/\n/g, " "), message = clean(b.message, 5000);
  if (!name || !subject || !message) return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
  if (!emailRe.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  const text = `New message from your portfolio\n\nName: ${name}\nEmail: ${email}\n\n${message}\n`;
  const mailSubject = `[Portfolio] ${subject}`;

  try {
    if (process.env.RESEND_API_KEY) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>", to: [TO], reply_to: email, subject: mailSubject, text }),
      });
      if (!r.ok) throw new Error(`resend ${r.status}`);
      return NextResponse.json({ ok: true });
    }
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transport = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
      await transport.sendMail({ from: `Portfolio <${process.env.SMTP_USER}>`, to: TO, replyTo: email, subject: mailSubject, text });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Email service is not configured yet." }, { status: 503 });
  } catch {
    return NextResponse.json({ error: "Could not send the message right now. Please try again or email me directly." }, { status: 502 });
  }
}
