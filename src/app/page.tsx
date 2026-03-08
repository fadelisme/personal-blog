"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Fingerprint } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen px-4 justify-center relative overflow-hidden">

      {/* Intense Top Gradient (Linear Style) */}
      <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_inherit_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent blur-3xl opacity-60" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-zinc-800 dark:text-zinc-300 text-xs font-medium tracking-wide mb-8 shadow-sm">
          <Fingerprint size={12} className="text-indigo-600 dark:text-indigo-400" /> Identity Verified
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-950 to-zinc-700 dark:from-white dark:to-zinc-200 mb-8 leading-[1.1]">
          The Wandering Intellect
        </h1>

        <div className="text-lg md:text-xl text-zinc-900 dark:text-zinc-300 font-medium dark:font-light max-w-3xl mx-auto leading-relaxed mb-12 relative">
          <div className="sm:absolute left-0 top-1 bottom-1 w-1 bg-zinc-300 dark:bg-zinc-800 rounded-full mb-4 sm:mb-0 hidden sm:block" />
          <div className="sm:pl-8 space-y-4 text-left">
            <p>
              No single discipline. Just a genuine hunger to understand humans — across history, psychology, philosophy, and everything in between.
            </p>
            <p>
              Channeling that curiosity into technology that actually feels human — built to ease the friction of everyday life, one experience at a time.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/writings"
            className="group relative flex items-center justify-center gap-2 px-8 py-3 bg-zinc-900 text-white dark:bg-white dark:text-black font-medium rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95 glow-btn w-full sm:w-auto"
          >
            <span>Explore Writings</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

        </motion.div>
      </motion.div>

      {/* Bento Grid Preview (Linear Style Decor) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
      >
        {/* Card 1: Tech Enthusiast -> Systems Architect */}
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-md glass-panel flex flex-col px-8 py-10 relative overflow-hidden group hover:border-indigo-500/40 hover:bg-white dark:hover:bg-zinc-900/60 transition-all duration-500 shadow-sm dark:shadow-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-500" />
          <div className="w-12 h-12 rounded-2xl border border-black/10 dark:border-white/10 flex items-center justify-center mb-10 bg-black/5 dark:bg-white/5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" /></svg>
          </div>
          <div className="mt-auto">
            <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-4 tracking-tight">Systems Architect</h3>
            <p className="text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium dark:font-light">
              Engineering robust, scalable architectures and constantly exploring the frontiers of emerging technologies to build efficient digital ecosystems.
            </p>
          </div>
        </div>

        {/* Card 2: AI Product Manager -> AI Product Leader */}
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-md glass-panel flex flex-col px-8 py-10 relative overflow-hidden group hover:border-purple-500/40 hover:bg-white dark:hover:bg-zinc-900/60 transition-all duration-500 shadow-sm dark:shadow-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-500" />
          <div className="w-12 h-12 rounded-2xl border border-black/10 dark:border-white/10 flex items-center justify-center mb-10 bg-black/5 dark:bg-white/5 text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
          </div>
          <div className="mt-auto">
            <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-4 tracking-tight">AI Product Leader</h3>
            <p className="text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium dark:font-light">
              Bridging the gap between bleeding-edge artificial intelligence models and highly intuitive, human-centric product experiences.
            </p>
          </div>
        </div>

        {/* Card 3: Writer -> Digital Essayist */}
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-md glass-panel flex flex-col px-8 py-10 relative overflow-hidden group hover:border-emerald-500/40 hover:bg-white dark:hover:bg-zinc-900/60 transition-all duration-500 shadow-sm dark:shadow-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-500" />
          <div className="w-12 h-12 rounded-2xl border border-black/10 dark:border-white/10 flex items-center justify-center mb-10 bg-black/5 dark:bg-white/5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
          </div>
          <div className="mt-auto">
            <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-4 tracking-tight">Digital Essayist</h3>
            <p className="text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium dark:font-light">
              Distilling complex abstract concepts into philosophical reflections and coherent narratives to provoke thought and spark curiosity.
            </p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
