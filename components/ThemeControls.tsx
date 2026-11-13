"use client";
import { useEffect, useRef, useState } from "react";
import { Moon, Palette, Sun } from "lucide-react";

export const ACCENTS = [
  { id: "violet", label: "Violet", color: "#8b5cf6" },
  { id: "blue", label: "Blue", color: "#3b82f6" },
  { id: "cyan", label: "Cyan", color: "#06b6d4" },
  { id: "green", label: "Green", color: "#10b981" },
  { id: "amber", label: "Amber", color: "#f59e0b" },
  { id: "pink", label: "Pink", color: "#ec4899" },
  { id: "red", label: "Red", color: "#ef4444" },
] as const;

const THEME_KEY = "bathri_theme_v1";
const ACCENT_KEY = "bathri_accent_v1";

function save(key: string, value: string) {
  try { window.localStorage.setItem(key, value); } catch { /* storage unavailable */ }
}

export default function ThemeControls() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [accent, setAccent] = useState("violet");
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = document.documentElement.dataset;
    setTheme(d.theme === "light" ? "light" : "dark");
    setAccent(d.accent ?? "violet");
  }, []);

  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", down);
    window.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", down); window.removeEventListener("keydown", esc); };
  }, [open]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    save(THEME_KEY, next);
  }
  function pick(id: string) {
    setAccent(id);
    document.documentElement.dataset.accent = id;
    save(ACCENT_KEY, id);
  }

  return (
    <div ref={wrap} className="relative flex items-center gap-2">
      <button type="button" onClick={toggleTheme} className="icon-btn !h-10 !w-10" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={theme === "dark" ? "Light mode" : "Dark mode"}>
        {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
      </button>
      <button type="button" onClick={() => setOpen((o) => !o)} className="icon-btn !h-10 !w-10" aria-label="Choose accent color" aria-expanded={open} aria-haspopup="true" title="Accent color">
        <Palette className="h-[18px] w-[18px]" />
      </button>
      {open && (
        <div role="radiogroup" aria-label="Accent color" className="card absolute right-0 top-12 z-[70] flex gap-2 bg-elevated p-3 shadow-2xl">
          {ACCENTS.map((a) => (
            <button key={a.id} type="button" role="radio" aria-checked={accent === a.id} aria-label={a.label} title={a.label} onClick={() => pick(a.id)}
              className="h-7 w-7 rounded-full border-2 transition hover:scale-110"
              style={{ background: a.color, borderColor: accent === a.id ? "var(--fg)" : "transparent" }} />
          ))}
        </div>
      )}
    </div>
  );
}
