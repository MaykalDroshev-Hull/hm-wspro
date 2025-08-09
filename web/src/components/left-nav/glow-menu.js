"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import styles from "./glow-menu.module.css";

export function GlowMenu({ items, cta }) {
  const containerRef = useRef(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [language, setLanguage] = useState("bg");
  const { theme, setTheme } = useTheme();

  function handleMouseMove(e) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    // Persist language preference
    try {
      const stored = localStorage.getItem("hm_lang");
      if (stored) setLanguage(stored);
    } catch {}
  }, []);

  function selectLanguage(next) {
    setLanguage(next);
    try {
      localStorage.setItem("hm_lang", next);
    } catch {}
  }

  return (
    <aside className="group relative z-40 h-full">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={`${styles.menu} w-[88px] group-hover:w-[272px] transition-[width] duration-300 p-4`}
        initial="initial"
        whileHover="hover"
      >
        <div className={styles.cursorGlow} />

        {/* Logo placeholder */}
        <div className="mb-2">
          <a
            href="#"
            aria-label="Лого"
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 h-12 w-12 group-hover:w-[216px] transition-[width] duration-300 pl-1 pr-3 flex items-center`}
          >
            <span className={`${styles.itemGlow}`} />
            <span className={`${styles.ring}`} />
            <div className="relative h-12 w-12 shrink-0 grid place-items-center">
              <div className="h-7 w-7 rounded-md bg-white/15 border border-white/20" />
            </div>
            <span className="ml-2 whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm">
              Вашето лого
            </span>
          </a>
        </div>

        <nav role="navigation" className="mt-1 flex flex-col gap-3 pb-20">
          {items.map((it, idx) => (
            <motion.a
              key={it.label}
              href={it.href}
              className={`${styles.item} group/item relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 h-12 w-12 group-hover:w-full transition-[width] duration-300 pr-4 pl-1`}
              initial={{}}
              whileHover={{}}
              style={{
                // Per-item color pairs
                "--glowA": [
                  "rgba(34,211,238,0.35)", // cyan
                  "rgba(99,102,241,0.35)", // indigo
                  "rgba(16,185,129,0.35)", // emerald
                  "rgba(249,115,22,0.35)", // orange
                ][idx % 4],
                "--glowB": [
                  "rgba(167,139,250,0.3)", // violet
                  "rgba(236,72,153,0.3)", // pink
                  "rgba(59,130,246,0.3)", // blue
                  "rgba(234,179,8,0.3)", // yellow
                ][idx % 4],
              }}
            >
              <span className={`${styles.itemGlow}`} />
              <span className={`${styles.ring}`} />
              <div className="relative h-12 w-12 shrink-0" style={{ perspective: 600 }}>
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ rotateX: 0, opacity: 1 }}
                  whileHover={{ rotateX: -90, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }}
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7">
                    <path d={it.path} fill="currentColor" />
                  </svg>
                </motion.span>
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d", transformOrigin: "center top" }}
                  initial={{ rotateX: 90, opacity: 0 }}
                  whileHover={{ rotateX: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 pl-2 pr-1">
                    <svg viewBox="0 0 24 24" className="h-7 w-7">
                      <path d={it.path} fill="currentColor" />
                    </svg>
                    <span className="text-sm">{it.label}</span>
                  </div>
                </motion.span>
              </div>
              <span className="ml-2 whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm">
                {it.label}
              </span>
            </motion.a>
          ))}
        </nav>

        {/* Settings button and panel */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setIsSettingsOpen((v) => !v)}
              className={`${styles.item} relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 h-12 w-12 group-hover:w-full transition-[width] duration-300 pl-1 pr-3 text-left`}
            >
              <span className={`${styles.itemGlow}`} />
              <span className={`${styles.ring}`} />
              <div className="relative h-12 w-12 shrink-0 grid place-items-center">
                {/* Cog icon */}
                <svg viewBox="0 0 24 24" className="h-7 w-7">
                  <path fill="currentColor" d="M12 8a4 4 0 100 8 4 4 0 000-8zm9 4a7.96 7.96 0 00-.3-2.2l2.1-1.6-2-3.5-2.5 1A8.1 8.1 0 0016 2.7l-.5-2.7h-5L10 2.7A8.1 8.1 0 006.7 5.7l-2.5-1-2 3.5 2.1 1.6A7.96 7.96 0 004 12c0 .75.1 1.47.3 2.2L2.2 15.8l2 3.5 2.5-1c.9 1.2 2 2.2 3.3 2.9l.5 2.8h5l.5-2.8c1.3-.7 2.4-1.7 3.3-2.9l2.5 1 2-3.5-2.1-1.6c.2-.73.3-1.45.3-2.2z"/>
                </svg>
              </div>
              <span className="ml-2 whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm">
                Настройки
              </span>
            </button>
            <div
              className={`overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-[max-height,opacity] duration-300 ${isSettingsOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="p-3 space-y-3">
                <div>
                  <p className="text-xs text-white/60 mb-2">Тема</p>
                  <div className="flex items-center space-x-2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    <Sun
                      className={`h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        theme === "dark" ? "text-[#A1A1AA] scale-75 rotate-12" : "text-foreground scale-100 rotate-0"
                      }`}
                    />
                    <button
                      onClick={toggleTheme}
                      className="relative inline-flex h-6 w-11 items-center rounded-full border border-white/10 bg-white/10 transition-colors hover:bg-white/15"
                      role="switch"
                      aria-checked={theme === "dark"}
                      aria-label="Toggle theme"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                          theme === "dark" ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <Moon
                      className={`h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        theme === "light" ? "text-[#A1A1AA] scale-75 rotate-12" : "text-foreground scale-100 rotate-0"
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-2">Език</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => selectLanguage("bg")} className={`rounded-lg border px-2 py-1 text-sm ${language === "bg" ? "bg-cyan-500/20 border-cyan-400/40" : "border-white/10 bg-white/10 hover:bg-white/15"}`}>
                      BG
                    </button>
                    <button onClick={() => selectLanguage("en")} className={`rounded-lg border px-2 py-1 text-sm ${language === "en" ? "bg-cyan-500/20 border-cyan-400/40" : "border-white/10 bg-white/10 hover:bg-white/15"}`}>
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle CTA */}
        <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2">
          <motion.a
            href={cta.href}
            className={`group/cta relative flex items-center gap-3 rounded-2xl border border-cyan-300/30 bg-cyan-500/10 h-12 w-12 group-hover:w-full transition-[width] duration-300 px-0 text-cyan-200 hover:text-white overflow-hidden`}
            initial="initial"
            whileHover="hover"
            style={{ "--glowA": "rgba(34,211,238,0.35)", "--glowB": "rgba(167,139,250,0.3)" }}
          >
            <span className={`${styles.itemGlow}`} />
            <span className={`${styles.ring}`} />
            <div className="relative h-12 w-12 shrink-0" style={{ perspective: 600 }}>
              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                initial={{ rotateX: 0, opacity: 1 }}
                whileHover={{ rotateX: -90, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }}
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </motion.span>
              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d", transformOrigin: "center top" }}
                initial={{ rotateX: 90, opacity: 0 }}
                whileHover={{ rotateX: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }}
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </motion.span>
            </div>
            <span className="ml-2 whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-semibold">
              {cta.label}
            </span>
          </motion.a>
        </div>
      </motion.div>
    </aside>
  );
}

export default GlowMenu;


