/**
 * Tiny counter store.
 * - Production (Vercel): Upstash Redis REST (Vercel Marketplace "Upstash Redis" / "KV" sets the env vars).
 * - Local dev without env vars: in-memory fallback (resets when the server restarts).
 */
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
export const storeConfigured = Boolean(url && token);

const g = globalThis as unknown as { __bm_mem?: Record<string, number> };
const mem: Record<string, number> = (g.__bm_mem ??= {});

async function cmd(args: (string | number)[]): Promise<unknown> {
  const res = await fetch(url as string, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  const json = (await res.json()) as { result?: unknown; error?: string };
  if (!res.ok || json.error) throw new Error(json.error ?? res.statusText);
  return json.result;
}

export const KEYS = { views: "bathri:portfolio:views", likes: "bathri:portfolio:likes" } as const;

export async function getCounts(): Promise<{ views: number; likes: number }> {
  if (!storeConfigured) return { views: mem[KEYS.views] ?? 0, likes: mem[KEYS.likes] ?? 0 };
  const r = (await cmd(["MGET", KEYS.views, KEYS.likes])) as (string | null)[];
  return { views: Number(r?.[0] ?? 0), likes: Number(r?.[1] ?? 0) };
}

export async function increment(key: string): Promise<void> {
  if (!storeConfigured) { mem[key] = (mem[key] ?? 0) + 1; return; }
  await cmd(["INCR", key]);
}

export async function decrementClamped(key: string): Promise<void> {
  if (!storeConfigured) { mem[key] = Math.max(0, (mem[key] ?? 0) - 1); return; }
  const v = Number(await cmd(["DECR", key]));
  if (v < 0) await cmd(["INCR", key]);
}

/** Best-effort per-instance rate limiter. */
const hits = new Map<string, { n: number; t: number }>();
export function rateLimited(id: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const h = hits.get(id);
  if (!h || now - h.t > windowMs) { hits.set(id, { n: 1, t: now }); return false; }
  h.n += 1;
  return h.n > max;
}
export const clientIp = (req: Request) => req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
