"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Letter paths — bold italic skeleton strokes
   ViewBox: 0 0 305 100
   Each letter is one continuous pen stroke so pathLength works.
───────────────────────────────────────────────────────────── */
/* italic slant: top points shifted +14 to the right of bottom points
   viewBox space: 380 × 130 — extra padding for chunky strokes  */
const LETTERS = [
  {
    id: "R",
    /* leg up → top bar → bump round → diagonal leg */
    d: "M 28,118 L 50,16 L 92,16 Q 118,16 118,42 Q 118,68 80,72 L 102,118",
    delay: 0,
    duration: 1.05,
  },
  {
    id: "I",
    /* top serif → italic descend → bottom serif */
    d: "M 132,16 L 178,16 L 158,16 L 144,118 L 128,118 L 174,118",
    delay: 1.15,
    duration: 0.55,
  },
  {
    id: "Z1",
    /* top bar → diagonal slash → bottom bar */
    d: "M 192,16 L 262,16 L 184,118 L 254,118",
    delay: 1.78,
    duration: 0.68,
  },
  {
    id: "Z2",
    d: "M 274,16 L 344,16 L 266,118 L 336,118",
    delay: 2.52,
    duration: 0.6,
  },
];

const LOAD_DURATION = 3100; // ms — synced so last letter finishes at ~100 %

const TIPS = [
  "Catching fruits boosts your score ⚡",
  "Coffee cups are worth 30 pts ☕",
  "Coupons give you 50 pts 🎫",
  "Speed increases as time runs out 🔥",
  "Drag with your finger on mobile 👆",
];

const FLOATS = [
  { e: "🍊", x: "7%",  y: "16%", d: 0.2, s: "2rem",   t: 3.2 },
  { e: "🍓", x: "82%", y: "11%", d: 0.5, s: "1.8rem",  t: 2.8 },
  { e: "🥭", x: "88%", y: "66%", d: 0.8, s: "2rem",    t: 3.5 },
  { e: "🫐", x: "5%",  y: "70%", d: 0.3, s: "1.6rem",  t: 3.0 },
  { e: "🍋", x: "47%", y: "7%",  d: 1.0, s: "1.7rem",  t: 2.6 },
  { e: "☕", x: "91%", y: "37%", d: 0.4, s: "1.8rem",  t: 2.9 },
  { e: "🥤", x: "51%", y: "87%", d: 0.9, s: "1.7rem",  t: 3.1 },
  { e: "🍍", x: "3%",  y: "42%", d: 0.6, s: "1.9rem",  t: 3.3 },
];

export default function LoaderScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [phase, setPhase]       = useState("tracing"); // tracing | filled | exiting

  /* rotating tips */
  useEffect(() => {
    const id = setInterval(() => setTipIndex((i) => (i + 1) % TIPS.length), 1150);
    return () => clearInterval(id);
  }, []);

  /* exit sequence */
  const handleDone = useCallback(() => {
    setPhase("filled");          // glow burst
    setTimeout(() => {
      setPhase("exiting");
      setTimeout(onDone, 580);
    }, 550);
  }, [onDone]);

  /* RAF progress counter — drives both bar and letter sync */
  useEffect(() => {
    let start = null;
    let raf;
    const tick = (ts) => {
      if (!start) start = ts;
      const pct = Math.min(((ts - start) / LOAD_DURATION) * 100, 100);
      setProgress(Math.round(pct));
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        handleDone();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [handleDone]);

  const isFilled = phase === "filled";

  return (
    <AnimatePresence>
      {phase !== "exiting" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 32% 18%, #2a1200 0%, #0e0a07 55%, #080608 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.56, ease: "easeInOut" }}
        >
          {/* ── ambient blobs ── */}
          <div className="blob" style={{ width: 320, height: 320, background: "#FF6B2B", top: -90,  left: -90,  opacity: 0.07 }} />
          <div className="blob" style={{ width: 280, height: 280, background: "#FFB800", bottom: -70, right: -70, opacity: 0.06 }} />
          <div className="blob" style={{ width: 180, height: 180, background: "#AAFF00", top: "45%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.03 }} />

          {/* ── floating fruits ── */}
          {FLOATS.map((f, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none select-none"
              style={{ left: f.x, top: f.y, fontSize: f.s }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: [0, 0.55, 0.55, 0], y: [18, 0, -12, 0] }}
              transition={{ delay: f.d, duration: f.t, repeat: Infinity, ease: "easeInOut" }}
            >
              {f.e}
            </motion.div>
          ))}

          {/* ── main content ── */}
          <div className="relative z-10 flex flex-col items-center gap-8 w-full px-4">

            {/* ─── RIZZ stroke-trace SVG ─── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ width: "min(360px, 92vw)" }}
            >
              <svg
                viewBox="0 0 380 134"
                width="100%"
                style={{ overflow: "visible" }}
              >
                <defs>
                  {/* stroke gradient while tracing */}
                  <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#FF6B2B" />
                    <stop offset="45%"  stopColor="#FFB800" />
                    <stop offset="100%" stopColor="#AAFF00" />
                  </linearGradient>
                  {/* glow filter */}
                  <filter id="traceGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* brighter glow for filled state */}
                  <filter id="fillGlow" x="-25%" y="-25%" width="150%" height="150%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {LETTERS.map((letter) => (
                  <motion.path
                    key={letter.id}
                    d={letter.d}
                    fill="none"
                    stroke="url(#traceGrad)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={isFilled ? "url(#fillGlow)" : "url(#traceGlow)"}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: 1,
                      strokeWidth: isFilled ? 30 : 24,
                    }}
                    transition={{
                      pathLength: {
                        delay: letter.delay,
                        duration: letter.duration,
                        ease: [0.4, 0, 0.2, 1],
                      },
                      opacity: { delay: letter.delay, duration: 0.05 },
                      strokeWidth: { duration: 0.3 },
                    }}
                  />
                ))}

                {/* flash overlay on fill phase */}
                {isFilled && (
                  <motion.rect
                    x="-20" y="-20" width="420" height="170" rx="20"
                    fill="rgba(255,200,0,0.12)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.45 }}
                  />
                )}
              </svg>
            </motion.div>

            {/* ─── brand sub-label + rotating tip ─── */}
            <motion.div
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <span
                className="text-[10px] font-black tracking-[0.35em] uppercase"
                style={{ color: "rgba(255,184,0,0.45)" }}
              >
                🍊 Rizz Juices
              </span>

              <div className="overflow-hidden" style={{ height: 20, width: 240 }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={tipIndex}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0,  opacity: 1 }}
                    exit={{   y: -14, opacity: 0 }}
                    transition={{ duration: 0.26, ease: "easeInOut" }}
                    className="text-center text-[11px] leading-5"
                    style={{ color: "rgba(255,255,255,0.36)" }}
                  >
                    {progress < 100 ? TIPS[tipIndex] : "Get ready! 🔥"}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ─── liquid progress bar ─── */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.88 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.65, duration: 0.45 }}
              style={{ width: "min(260px, 82vw)" }}
            >
              {/* track */}
              <div style={{
                width: "100%", height: 7, borderRadius: 99,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.07)",
                overflow: "hidden", position: "relative",
              }}>
                {/* fill */}
                <div style={{
                  position: "absolute", left: 0, top: 0,
                  height: "100%",
                  width: `${progress}%`,
                  borderRadius: 99,
                  background: "linear-gradient(90deg, #FF6B2B 0%, #FFB800 55%, #AAFF00 100%)",
                  boxShadow: "0 0 12px rgba(255,184,0,0.55)",
                  transition: "width 0.12s linear",
                }}>
                  {/* top shine */}
                  <div style={{ position: "absolute", inset: 0, borderRadius: 99, background: "linear-gradient(180deg, rgba(255,255,255,0.32) 0%, transparent 60%)" }} />
                  {/* leading bubble */}
                  <div style={{
                    position: "absolute", right: -1, top: "50%", transform: "translateY(-50%)",
                    width: 11, height: 11, borderRadius: "50%",
                    background: "white",
                    boxShadow: "0 0 8px rgba(255,255,255,0.9), 0 0 16px rgba(255,184,0,0.85)",
                  }} />
                </div>
              </div>

              {/* label row */}
              <div className="flex justify-between mt-1.5">
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.22)", letterSpacing: "0.14em" }}>LOADING</span>
                <motion.span
                  key={progress}
                  initial={{ scale: 1.2, color: "#AAFF00" }}
                  animate={{ scale: 1,   color: "#FFB800" }}
                  transition={{ duration: 0.15 }}
                  style={{ fontSize: 10, fontWeight: 800 }}
                >
                  {progress}%
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* ── bottom tagline ── */}
          <motion.div
            className="absolute bottom-10 text-[10px] tracking-[0.24em] uppercase"
            style={{ color: "rgba(255,255,255,0.14)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            🍊 Play · Catch · Win
          </motion.div>

          {/* ── full-screen splash burst on complete ── */}
          <AnimatePresence>
            {isFilled && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 42%, rgba(255,184,0,0.18) 0%, transparent 65%)",
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1.4, 2] }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
