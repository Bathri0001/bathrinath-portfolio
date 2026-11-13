export type Stats = { views: number; likes: number; live?: boolean };

export async function fetchStats(): Promise<Stats | null> {
  try {
    const r = await fetch("/api/stats", { cache: "no-store" });
    return r.ok ? ((await r.json()) as Stats) : null;
  } catch {
    return null;
  }
}
export async function postStat(type: "view" | "like" | "unlike"): Promise<Stats | null> {
  try {
    const r = await fetch("/api/stats", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type }) });
    return r.ok ? ((await r.json()) as Stats) : null;
  } catch {
    return null;
  }
}
