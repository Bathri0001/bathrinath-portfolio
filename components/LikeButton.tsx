"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { profile } from "@/data/profile";
import { fetchStats, postStat } from "@/lib/stats";

const BASE = profile.baseLikes; // 100
type Fly = { id: number; dx: number; rise: number; size: number; delay: number; rot: number };
let flyId = 0;

export default function LikeButton() {
  const [count, setCount] = useState(BASE);
  const [liked, setLiked] = useState(false); // always starts empty on every visit
  const [flies, setFlies] = useState<Fly[]>([]);
  const locked = useRef(false);

  useEffect(() => {
    fetchStats().then((s) => s && setCount(s.likes));
  }, []);

  function burst() {
    const batch: Fly[] = Array.from({ length: 9 }, () => ({
      id: ++flyId,
      dx: (Math.random() - 0.5) * 110,
      rise: 110 + Math.random() * 70,
      size: 14 + Math.random() * 16,
      delay: Math.random() * 0.2,
      rot: (Math.random() - 0.5) * 60,
    }));
    setFlies((f) => [...f, ...batch]);
    setTimeout(() => setFlies((f) => f.filter((x) => !batch.some((b) => b.id === x.id))), 1800);
  }

  async function toggle() {
    if (locked.current) return;
    locked.current = true;
    setTimeout(() => (locked.current = false), 450);
    const next = !liked;
    setLiked(next);
    setCount((c) => Math.max(BASE, c + (next ? 1 : -1))); // instant
    if (next) burst();
    const s = await postStat(next ? "like" : "unlike"); // shared, real count
    if (s) setCount(s.likes);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={liked}
        aria-label={`${liked ? "Unlike" : "Like"} this portfolio. ${count} likes`}
        className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm transition ${
          liked ? "border-pink-500/50 bg-pink-500/10 text-pink-500" : "border-line bg-fg/[0.03] text-muted hover:text-fg"
        }`}
      >
        <motion.span key={`${liked}`} initial={{ scale: 0.5 }} animate={{ scale: [0.5, 1.4, 1] }} transition={{ duration: 0.4 }}>
          <Heart className={`h-4 w-4 ${liked ? "fill-pink-500 text-pink-500" : ""}`} />
        </motion.span>
        <span className="tabular-nums" aria-hidden="true">{count}</span>
        <span className="hidden sm:inline" aria-hidden="true">likes</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">{liked ? `Liked. ${count} likes` : ""}</span>

      {/* Instagram-style flying hearts */}
      {flies.map((f) => (
        <motion.span
          key={f.id}
          data-fly
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-2 z-30 text-pink-500"
          initial={{ opacity: 0, y: 0, x: 0, scale: 0.3, rotate: 0 }}
          animate={{ opacity: [0, 1, 1, 0], y: -f.rise, x: f.dx, scale: [0.3, 1.1, 1], rotate: f.rot }}
          transition={{ duration: 1.5, delay: f.delay, ease: "easeOut" }}
        >
          <Heart style={{ width: f.size, height: f.size }} className="fill-pink-500" />
        </motion.span>
      ))}
    </div>
  );
}