"use client";
import { useEffect, useRef } from "react";

type RGB = [number, number, number];
const hexToRgb = (h: string): RGB => {
  let x = h.trim().replace("#", "");
  if (x.length === 3) x = x.split("").map((c) => c + c).join("");
  const n = parseInt(x, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const GLYPHS = "01010110ABCDEF{}<>/=;λ∑ψ";

/**
 * Canvas scene: neural network (AI) + data packets, binary/hex rain (computer & data),
 * and orbiting-electron atoms (quantum). Colors follow the active accent + theme.
 */
export default function TechBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let w = 0, h = 0, raf = 0, last = 0, dpr = 1;
    let colors = { a: [139, 92, 246] as RGB, b: [34, 211, 238] as RGB, light: false };
    const mouse = { x: -999, y: -999 };

    type Node = { x: number; y: number; vx: number; vy: number };
    type Drop = { x: number; y: number; speed: number; len: number; chars: string[] };
    type Atom = { fx: number; fy: number; r: number; spin: number; phase: number; rot: number };
    type Packet = { a: number; b: number; t: number; v: number };
    let nodes: Node[] = [], drops: Drop[] = [], atoms: Atom[] = [], packets: Packet[] = [];

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = { a: hexToRgb(cs.getPropertyValue("--accent")), b: hexToRgb(cs.getPropertyValue("--accent2")), light: document.documentElement.dataset.theme === "light" };
      if (reduce) frame(0);
    };

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const glyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const small = w < 768;
      const n = small ? 22 : Math.min(70, Math.max(30, Math.floor((w * h) / 24000)));
      nodes = Array.from({ length: n }, () => ({ x: rnd(0, w), y: rnd(0, h), vx: rnd(-14, 14), vy: rnd(-14, 14) }));
      const cols = Math.floor(w / (small ? 70 : 46));
      drops = Array.from({ length: cols }, (_, i) => ({
        x: (i + 0.5) * (w / cols), y: rnd(-h, 0), speed: rnd(28, 70), len: Math.floor(rnd(7, 16)),
        chars: Array.from({ length: 18 }, glyph),
      }));
      atoms = [
        { fx: 0.1, fy: 0.28, r: 46, spin: 0.7, phase: 0, rot: 0.3 },
        { fx: 0.9, fy: 0.58, r: 58, spin: -0.55, phase: 2, rot: 1.1 },
        { fx: 0.52, fy: 0.9, r: 40, spin: 0.9, phase: 4, rot: 0.7 },
      ];
      packets = [];
      if (reduce) frame(0);
    };

    const frame = (dt: number) => {
      const L = colors.light;
      ctx.clearRect(0, 0, w, h);

      // --- binary / hex rain (computer + data) ---
      ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      for (const d of drops) {
        d.y += d.speed * dt;
        if (d.y - d.len * 16 > h) { d.y = rnd(-200, 0); d.speed = rnd(28, 70); }
        if (Math.random() < dt * 3) d.chars[Math.floor(Math.random() * d.chars.length)] = glyph();
        for (let i = 0; i < d.len; i++) {
          const a = (1 - i / d.len) * (L ? 0.26 : 0.17);
          ctx.fillStyle = rgba(i === 0 ? colors.b : colors.a, i === 0 ? a * 2 : a);
          ctx.fillText(d.chars[i % d.chars.length], d.x, d.y - i * 16);
        }
      }

      // --- quantum atoms ---
      for (const at of atoms) {
        at.phase += at.spin * dt;
        const cx = at.fx * w + Math.sin(at.phase * 0.4) * 18;
        const cy = at.fy * h + Math.cos(at.phase * 0.3) * 14;
        ctx.lineWidth = 1;
        for (let k = 0; k < 3; k++) {
          const rot = at.rot + (k * Math.PI) / 3 + at.phase * 0.15;
          ctx.strokeStyle = rgba(colors.b, L ? 0.34 : 0.22);
          ctx.beginPath();
          ctx.ellipse(cx, cy, at.r, at.r * 0.36, rot, 0, Math.PI * 2);
          ctx.stroke();
          const t = at.phase * 2.2 + k * 2.1;
          const ex = cx + Math.cos(t) * at.r * Math.cos(rot) - Math.sin(t) * at.r * 0.36 * Math.sin(rot);
          const ey = cy + Math.cos(t) * at.r * Math.sin(rot) + Math.sin(t) * at.r * 0.36 * Math.cos(rot);
          ctx.fillStyle = rgba(colors.a, L ? 0.85 : 0.75);
          ctx.beginPath(); ctx.arc(ex, ey, 2.4, 0, Math.PI * 2); ctx.fill();
        }
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14);
        g.addColorStop(0, rgba(colors.a, 0.7)); g.addColorStop(1, rgba(colors.a, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2); ctx.fill();
      }

      // --- neural network (AI) ---
      for (const n of nodes) {
        n.x += n.vx * dt; n.y += n.vy * dt;
        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
        if (fine) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < 14400 && d2 > 1) { const f = (1 - Math.sqrt(d2) / 120) * 40 * dt; n.x += (dx / Math.sqrt(d2)) * f; n.y += (dy / Math.sqrt(d2)) * f; }
        }
      }
      const links: [number, number][] = [];
      const maxD = w < 768 ? 110 : 140;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y, d = Math.hypot(dx, dy);
          if (d < maxD) {
            ctx.strokeStyle = rgba(colors.a, (1 - d / maxD) * (L ? 0.34 : 0.26));
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
            links.push([i, j]);
          }
        }
        if (fine) {
          const d = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
          if (d < 160) { ctx.strokeStyle = rgba(colors.b, (1 - d / 160) * 0.5); ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
        }
      }
      for (const n of nodes) { ctx.fillStyle = rgba(colors.a, L ? 0.75 : 0.6); ctx.beginPath(); ctx.arc(n.x, n.y, 2, 0, Math.PI * 2); ctx.fill(); }

      // data packets travelling along links
      if (!reduce && links.length && packets.length < 9 && Math.random() < dt * 2.5) {
        const [a, b] = links[Math.floor(Math.random() * links.length)];
        packets.push({ a, b, t: 0, v: rnd(0.5, 1.1) });
      }
      packets = packets.filter((p) => (p.t += p.v * dt) < 1);
      for (const p of packets) {
        const A = nodes[p.a], B = nodes[p.b];
        const x = A.x + (B.x - A.x) * p.t, y = A.y + (B.y - A.y) * p.t;
        ctx.fillStyle = rgba(colors.b, 0.95); ctx.beginPath(); ctx.arc(x, y, 2.8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = rgba(colors.b, 0.2); ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
      }
    };

    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000 || 0);
      last = t;
      frame(dt);
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (reduce || raf) return; last = performance.now(); raf = requestAnimationFrame(loop); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const onVis = () => (document.hidden ? stop() : start());
    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = mouse.y = -999; };

    readColors(); setup(); start();
    window.addEventListener("resize", setup);
    document.addEventListener("visibilitychange", onVis);
    if (fine) { window.addEventListener("pointermove", onMove, { passive: true }); document.addEventListener("pointerleave", onLeave); }
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-accent"] });
    return () => {
      stop(); mo.disconnect();
      window.removeEventListener("resize", setup);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0" />;
}
