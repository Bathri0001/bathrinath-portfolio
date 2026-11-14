import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { profile, siteUrl } from "@/data/profile";
import Providers from "@/components/Providers";
import Background from "@/components/Background";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import EasterEgg from "@/components/EasterEgg";

const title = `${profile.displayName} — ${profile.title}`;
const description ="Bathrinath Murugan is a GenAI-focused Full-Stack Developer specializing in Generative AI, RAG applications, Python, React, Next.js and intelligent software solutions. Explore projects, technical skills and professional experience.";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.displayName}` },
  description,
  alternates: { canonical: "/" },
  robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
},
  icons: { icon: "/favicon.ico", apple: "/icons/apple-touch-icon.png" },
  appleWebApp: { capable: true, title: "Portfolio", statusBarStyle: "black-translucent" },
  applicationName: "Portfolio",
  openGraph: { type: "website", title, description, url: "/", siteName: `${profile.displayName} Portfolio`, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};
export const viewport: Viewport = { themeColor: "#06060b", width: "device-width", initialScale: 1 };

const themeScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem('bathri_theme_v1'),a=localStorage.getItem('bathri_accent_v1');if(t==='light'||t==='dark')d.dataset.theme=t;if(['violet','blue','cyan','green','amber','pink','red'].indexOf(a)>-1)d.dataset.accent=a;}catch(e){}})();`;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.displayName,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Thiruvarur", addressRegion: "Tamil Nadu", addressCountry: "IN" },
  sameAs: [profile.github, profile.linkedin],
  alumniOf: [{ "@type": "CollegeOrUniversity", name: "Puducherry Technological University" }],
  knowsAbout: ["Generative AI", "RAG", "Full-Stack Development", "Python", "Java", "React", "Next.js"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" data-accent="violet" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <noscript><style>{`[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style></noscript>
      </head>
      <body>
        <Providers>
          <a href="#main" className="sr-only z-[100] rounded bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
          <Background />
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
          <EasterEgg />
        </Providers>
      </body>
    </html>
  );
}
