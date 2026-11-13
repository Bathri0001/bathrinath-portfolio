"use client";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { CertificateProvider } from "./CertificateViewer";
import { OutputsProvider } from "./OutputsViewer";
import { InstallProvider } from "./InstallApp";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <InstallProvider>
        <CertificateProvider>
          <OutputsProvider>{children}</OutputsProvider>
        </CertificateProvider>
      </InstallProvider>
    </MotionConfig>
  );
}
