import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Bathrinath Murugan — Portfolio",
    short_name: "Portfolio",
    description: "GenAI-focused Full-Stack Developer portfolio — installable app.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#06060b",
    theme_color: "#8b5cf6",
    categories: ["portfolio", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Projects", url: "/#projects", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Contact", url: "/#contact", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
