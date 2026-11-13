import fs from "node:fs";
import path from "node:path";
import { projects } from "@/data/projects";

const IMG = /\.(png|jpe?g|webp|gif|avif)$/i;

/** Lists screenshots in public/images/<folder> (sorted 1,2,3… naturally). Server-only. */
export function getOutputs(folder: string): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "images", folder);
    return fs
      .readdirSync(dir)
      .filter((f) => IMG.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `/images/${folder}/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}

export function getAllOutputs(): Record<string, string[]> {
  return Object.fromEntries(projects.map((p) => [p.slug, getOutputs(p.folder)]));
}
