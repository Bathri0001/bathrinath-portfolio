import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { KEYS, clientIp, decrementClamped, getCounts, increment, rateLimited, storeConfigured } from "@/lib/store";

export const dynamic = "force-dynamic";
const noStore = { "Cache-Control": "no-store" };

async function totals() {
  const c = await getCounts();
  return { views: profile.baseAudience + c.views, likes: profile.baseLikes + c.likes, live: storeConfigured };
}

export async function GET() {
  try {
    return NextResponse.json(await totals(), { headers: noStore });
  } catch {
    return NextResponse.json({ error: "stats_unavailable" }, { status: 503, headers: noStore });
  }
}

export async function POST(req: Request) {
  try {
    if (rateLimited(`stats:${clientIp(req)}`, 40, 60_000)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const body = (await req.json().catch(() => ({}))) as { type?: string };
    const bot = /bot|crawl|spider|preview|headless/i.test(req.headers.get("user-agent") ?? "");
    if (body.type === "view") { if (!bot) await increment(KEYS.views); }
    else if (body.type === "like") await increment(KEYS.likes);
    else if (body.type === "unlike") await decrementClamped(KEYS.likes);
    else return NextResponse.json({ error: "bad_request" }, { status: 400 });
    return NextResponse.json(await totals(), { headers: noStore });
  } catch {
    return NextResponse.json({ error: "stats_unavailable" }, { status: 503, headers: noStore });
  }
}
