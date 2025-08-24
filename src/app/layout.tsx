import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RepoHealth - GitHub Repository Health Scorecard",
  description:
    "Get comprehensive insights into your repository's health, security, and community engagement with our automated scoring system.",
  keywords: [
    "github",
    "repository",
    "health",
    "score",
    "analytics",
    "open source",
  ],
  authors: [{ name: "RepoHealth Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
                  
                  // Tailwind v4: Use data-theme attribute
                  if (shouldUseDark) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div id="root" key="app-root">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
