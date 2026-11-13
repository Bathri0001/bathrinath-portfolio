"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/profile";
import { readStorage, writeStorage } from "@/lib/utils";
import { fetchStats, postStat } from "@/lib/stats";

const LAST_KEY = "bathri_portfolio_last_visit_v3";
const THROTTLE_MS = 20_000; // returning visitors always count; rapid refreshes within 20s do not
const BASE = profile.baseAudience; // 400

/** Shared visit counter stored server-side. Each visit counts, including repeat visitors. */
export default function AudienceIndicator() {
  const [value, setValue] = useState(BASE);

  useEffect(() => {
    const last = Number(readStorage("local", LAST_KEY) ?? 0);
    const now = Date.now();
    if (now - last < THROTTLE_MS) { fetchStats().then((s) => s && setValue(s.views)); return; }
    writeStorage("local", LAST_KEY, String(now)); // set first so StrictMode / re-renders never double count
    postStat("view").then((s) => (s ? setValue(s.views) : fetchStats().then((x) => x && setValue(x.views))));
  }, []);

  return (
    <div className="group relative inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-fg/[0.03] px-4 text-sm text-muted">
      <span className="live-dot h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
      <span className="relative inline-block overflow-hidden tabular-nums text-fg">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={value} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} className="inline-block">{value}</motion.span>
        </AnimatePresence>
      </span>
      <span>visitors</span>
      <span className="sr-only">{value} visitors</span>
    </div>
  );
}
