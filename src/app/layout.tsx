// =============================================================================
// CareerForge — Root Layout
// =============================================================================

import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CareerForge — AI-Powered Career Automation",
    template: "%s | CareerForge",
  },
  description:
    "Your AI-powered career automation platform. Generate stunning resumes, find high-paying jobs, and automate your job hunt — all in one place.",
  keywords: [
    "career automation",
    "resume builder",
    "job finder",
    "AI resume",
    "job hunting",
    "career management",
  ],
  openGraph: {
    title: "CareerForge — AI-Powered Career Automation",
    description:
      "Generate stunning resumes, find high-paying jobs, and automate your job hunt.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="noise-overlay">
        {children}
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: "hsl(230 18% 16%)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "hsl(0 0% 95%)",
            },
          }}
        />
      </body>
    </html>
  );
}
