import type { Metadata } from "next";
import "./globals.css";
import NoSSR from "@/components/NoSSR";
import AppShell from "@/components/AppShell";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Optimal Sports Management - College Athlete Marketing & Management",
  description:
    "Professional sports management and marketing services for college athletes.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' }
    ],
    shortcut: '/favicon.svg',
    apple: '/logo-optimal.svg',
  },
  openGraph: {
    title: "Optimal Sports Management - College Athlete Marketing & Management",
    description: "Professional sports management and marketing services for college athletes.",
    images: [
      {
        url: '/output-onlinepngtools (5).png',
        width: 1200,
        height: 630,
        alt: 'Optimal Sports Management',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Optimal Sports Management - College Athlete Marketing & Management",
    description: "Professional sports management and marketing services for college athletes.",
    images: ['/output-onlinepngtools (5).png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Strip extension-injected attributes that cause hydration mismatches (e.g., bis_skin_checked) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(() => { const clean = () => { try { document.querySelectorAll('[bis_skin_checked]').forEach(el => el.removeAttribute('bis_skin_checked')); } catch(_) {} }; clean(); const start = performance.now(); const loop = () => { if (performance.now() - start < 2000) { clean(); requestAnimationFrame(loop); } }; requestAnimationFrame(loop); })();",
          }}
        />
        {/* Prefer PNG/SVG favicon with cache-buster to avoid stale icons */}
        <link rel="icon" href="/favicon.png?v=2" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
      </head>
      <body className="font-sans bg-white text-gray-900 dark:bg-black dark:text-white" suppressHydrationWarning>
        <ThemeProvider>
          <AppShell>
            <NoSSR>{children}</NoSSR>
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
