import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Sparkles, TerminalSquare } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

/**
 * Premium Linear-Style Layout
 * We use next/font/google to pull in a sharp, modern Inter.
 */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Fadelisme",
  description: "Personal Website & Writings by Fadhel Yafie",
};

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased min-h-screen flex flex-col selection:bg-indigo-500/30 selection:text-white transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >

          {/* Subtle, premium background grain/glow */}
          <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.05] via-transparent to-transparent opacity-80" />
          <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500/[0.03] via-transparent to-transparent" />

          {/* Theme Toggle Button - Top Right */}
          <div className="fixed top-6 right-4 sm:right-6 md:right-8 z-[60]">
            <ThemeToggle />
          </div>

          <div className="sticky top-0 w-full pt-6 px-4 z-50 pointer-events-none pb-4">
            <header className="pointer-events-auto mx-auto max-w-fit rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/70 backdrop-blur-xl shadow-sm px-6 py-3 flex items-center justify-between gap-12 sm:gap-24 transition-all hover:border-black/20 dark:hover:border-white/20">
              <Link href="/" className="flex items-center gap-2 font-medium text-black dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                <TerminalSquare size={16} className="text-indigo-500" />
                <span>Fadelisme.</span>
              </Link>
              <nav className="flex space-x-6 items-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
                <Link href="/writings" className="hover:text-foreground transition-colors">
                  Writings
                </Link>
              </nav>
            </header>
          </div>

          <main className="flex-grow flex flex-col w-full mx-auto relative z-10">
            {children}
          </main>

          <footer className="w-full border-t border-black/5 dark:border-white/5 bg-background py-12 mt-auto relative z-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 max-w-4xl">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <Sparkles size={14} className="text-zinc-500" />
                <span>Crafted with precision &middot; {new Date().getFullYear()}</span>
              </div>
              <div className="font-mono">ALL SYSTEMS ONLINE</div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
