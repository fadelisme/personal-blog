"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Sync with next-themes safely
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
        const isDark = theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
        const nextTheme = isDark ? "light" : "dark";

        // Check if View Transitions API is supported
        if (!document.startViewTransition) {
            setTheme(nextTheme);
            return;
        }

        // Get click coordinates to center the circular reveal transition
        const x = event.clientX;
        const y = event.clientY;

        // Calculate distance to the furthest corner to ensure full screen coverage
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        // Run transition
        const transition = document.startViewTransition(() => {
            setTheme(nextTheme);
        });

        // Custom animation definition attached to the active transition
        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            // Animate the root element
            document.documentElement.animate(
                {
                    clipPath: isDark ? [...clipPath].reverse() : clipPath,
                },
                {
                    duration: 700,
                    easing: "cubic-bezier(1, 0, 0, 1)",
                    pseudoElement: isDark
                        ? "::view-transition-old(root)"
                        : "::view-transition-new(root)",
                }
            );
        });
    };

    if (!mounted) {
        // Return a placeholder of the same size to prevent layout shift during hydration
        return <div className="w-9 h-9 opacity-0" />;
    }

    return (
        <button
            onClick={toggleTheme}
            className="relative inline-flex items-center justify-center p-2 rounded-full border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 bg-black/5 dark:bg-white/5 backdrop-blur-md transition-colors text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 glow-btn overflow-hidden w-9 h-9"
            aria-label="Toggle theme"
        >
            <Sun className="h-4 w-4 absolute transition-all scale-100 opacity-100 rotate-0 dark:scale-0 dark:opacity-0 dark:-rotate-90" />
            <Moon className="h-4 w-4 absolute transition-all scale-0 opacity-0 rotate-90 dark:scale-100 dark:opacity-100 dark:rotate-0" />
        </button>
    );
}
