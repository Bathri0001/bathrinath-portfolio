"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";
import { profile } from "@/data/profile";
import { readStorage, writeStorage } from "@/lib/utils";
import { fetchStats, postStat } from "@/lib/stats";

const LIKED_KEY = "bathri_portfolio_liked_v2"; // remembers whether THIS browser already liked
const BASE = profile.baseLikes; // 100

export default function LikeButton() {
  const [count, setCount] = useState(BASE);
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(0);
  const locked = useRef(false);

  useEffect(() => {
    setLiked(readStorage("local", LIKED_KEY) === "1");
    fetchStats().then((s) => s && setCount(s.likes));
  }, []);

  async function toggle() {
    if (locked.current) return; // prevent rapid repeats
    locked.current = true;
    setTimeout(() => (locked.current = false), 600);
    const next = !liked;
    setLiked(next);
    setCount((c) => Math.max(BASE, c + (next ? 1 : -1))); // optimistic
    writeStorage("local", LIKED_KEY, next ? "1" : "0");
    if (next) setBurst((b) => b + 1);
    const s = await postStat(next ? "like" : "unlike");
    if (s) setCount(s.likes);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={liked}
        aria-label={`${liked ? "Unlike" : "Like"} this portfolio. ${count} likes`}
        title="Likes are shared by all visitors"
        className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm transition ${
          liked ? "border-pink-500/50 bg-pink-500/10 text-pink-500" : "border-line bg-fg/[0.03] text-muted hover:text-fg"
        }`}
      >
        <motion.span key={`${liked}`} initial={{ scale: 0.6 }} animate={{ scale: [0.6, 1.35, 1] }} transition={{ duration: 0.45 }}>
          <Heart className={`h-4 w-4 ${liked ? "fill-pink-500 text-pink-500" : ""}`} />
        </motion.span>
        <span className="tabular-nums" aria-hidden="true">{count}</span>
        <span className="hidden sm:inline" aria-hidden="true">likes</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">{liked ? `Liked. ${count} likes` : ""}</span>
      <AnimatePresence>
        {burst > 0 && liked &&
          Array.from({ length: 6 }).map((_, i) => (
            <motion.span key={`${burst}-${i}`} aria-hidden="true" className="pointer-events-none absolute left-6 top-1/2 text-xs text-pink-500"
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, x: Math.cos((i / 6) * Math.PI * 2) * 34, y: Math.sin((i / 6) * Math.PI * 2) * 34 - 10, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}>♥</motion.span>
          ))}
      </AnimatePresence>
    </div>
  );
}
