"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { profile } from "@/data/profile";

export default function CopyEmail({ className = "btn btn-ghost" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const t = document.createElement("textarea");
      t.value = profile.email;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button type="button" onClick={copy} className={className}>
      {copied ? <Check className="h-4 w-4 text-green-600 dark:text-green-400" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied!" : "Copy email"}
      <span className="sr-only" role="status" aria-live="polite">{copied ? "Email address copied to clipboard" : ""}</span>
    </button>
  );
}
