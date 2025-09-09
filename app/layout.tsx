import type { Metadata } from "next";
import "./globals.css";
import NoSSR from "@/components/NoSSR";
import AppShell from "@/components/AppShell";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Optimal Sports Management - College Athlete Marketing & Management",
  description:
    "Professional sports management and marketing services for college athletes.",
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
        {/* Prefer a crisp PNG favicon if available */}
        <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/logo-optimal.svg" type="image/svg+xml" />
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
