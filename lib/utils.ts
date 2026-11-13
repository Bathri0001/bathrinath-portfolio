export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

type Kind = "local" | "session";
const store = (k: Kind) => (k === "local" ? window.localStorage : window.sessionStorage);

/** Storage access that never throws (private mode, blocked cookies, SSR). */
export function readStorage(kind: Kind, key: string): string | null {
  try {
    return store(kind).getItem(key);
  } catch {
    return null;
  }
}
export function writeStorage(kind: Kind, key: string, value: string): boolean {
  try {
    store(kind).setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
