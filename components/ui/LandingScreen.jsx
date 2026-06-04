"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ── Inline SVG Characters ─────────────────────────────────────── */

function StrawberryChar({ size = 110 }) {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 110 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="55" cy="116" rx="28" ry="6" fill="rgba(0,0,0,0.3)" />
      {/* Body */}
      <path
        d="M55 30 C28 30 18 55 20 80 C22 102 38 114 55 114 C72 114 88 102 90 80 C92 55 82 30 55 30Z"
        fill="#D42B2B"
      />
      <path
        d="M55 30 C28 30 18 55 20 80 C22 102 38 114 55 114 C72 114 88 102 90 80 C92 55 82 30 55 30Z"
        fill="url(#sbGrad)"
      />
      <defs>
        <radialGradient id="sbGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FF5555" />
          <stop offset="100%" stopColor="#C01E1E" />
        </radialGradient>
      </defs>
      {/* Seeds */}
      {[
        [42, 55],
        [60, 50],
        [48, 70],
        [66, 68],
        [38, 78],
        [62, 84],
        [52, 90],
      ].map(([x, y], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="2.5"
          ry="3"
          fill="#FFE066"
          transform={`rotate(-15 ${x} ${y})`}
        />
      ))}
      {/* Highlight */}
      <path
        d="M38 48 Q42 38 50 36"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Green crown */}
      <path d="M30 32 C32 20 40 12 42 8 C43 16 45 22 48 26" fill="#3D9E38" />
      <path d="M48 26 C48 18 52 10 55 6 C58 10 62 18 62 26" fill="#4CBF45" />
      <path d="M62 26 C65 22 67 16 68 8 C70 12 78 20 80 32" fill="#3D9E38" />
      <path d="M30 32 Q55 25 80 32 Q68 30 55 28 Q42 30 30 32Z" fill="#4CBF45" />
      {/* Face: Eyes */}
      <circle cx="43" cy="72" r="7" fill="white" />
      <circle cx="43" cy="72" r="4.5" fill="#1a1a1a" />
      <circle cx="44.5" cy="70.5" r="1.8" fill="white" />
      <circle cx="67" cy="72" r="7" fill="white" />
      <circle cx="67" cy="72" r="4.5" fill="#1a1a1a" />
      <circle cx="68.5" cy="70.5" r="1.8" fill="white" />
      {/* Cheeks */}
      <ellipse cx="36" cy="80" rx="6" ry="4" fill="#FF8888" opacity="0.6" />
      <ellipse cx="74" cy="80" rx="6" ry="4" fill="#FF8888" opacity="0.6" />
      {/* Smile */}
      <path
        d="M44 88 Q55 97 66 88"
        stroke="#1a1a1a"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OrangeChar({ size = 105 }) {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 110 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="55" cy="114" rx="28" ry="6" fill="rgba(0,0,0,0.3)" />
      {/* Body */}
      <circle cx="55" cy="68" r="46" fill="url(#orangeGrad)" />
      <defs>
        <radialGradient id="orangeGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFBE44" />
          <stop offset="100%" stopColor="#E07000" />
        </radialGradient>
      </defs>
      {/* Texture lines */}
      <path
        d="M55 22 Q60 45 55 68"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="2"
      />
      <path
        d="M55 22 Q45 45 55 68"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="2"
      />
      <path
        d="M55 22 Q70 40 78 68"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
      />
      <path
        d="M55 22 Q40 40 32 68"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
      />
      {/* Highlight */}
      <path
        d="M38 42 Q42 30 52 28"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Leaf + stem */}
      <rect x="52" y="16" width="6" height="10" rx="3" fill="#5C3A1E" />
      <path d="M55 18 C48 8 36 10 34 18 C42 14 52 18 55 18Z" fill="#4CBF45" />
      <path d="M55 18 C62 8 74 10 76 18 C68 14 58 18 55 18Z" fill="#3D9E38" />
      {/* Face: Eyes */}
      <circle cx="44" cy="70" r="7" fill="white" />
      <circle cx="44" cy="70" r="4.5" fill="#1a1a1a" />
      <circle cx="45.5" cy="68.5" r="1.8" fill="white" />
      <circle cx="66" cy="70" r="7" fill="white" />
      <circle cx="66" cy="70" r="4.5" fill="#1a1a1a" />
      <circle cx="67.5" cy="68.5" r="1.8" fill="white" />
      {/* Cheeks */}
      <ellipse cx="36" cy="78" rx="6" ry="4" fill="#FF9944" opacity="0.6" />
      <ellipse cx="74" cy="78" rx="6" ry="4" fill="#FF9944" opacity="0.6" />
      {/* Smile */}
      <path
        d="M44 86 Q55 96 66 86"
        stroke="#1a1a1a"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CoffeeCupChar({ size = 120 }) {
  return (
    <svg
      width={size}
      height={size * 1.08}
      viewBox="0 0 120 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="60" cy="126" rx="34" ry="6" fill="rgba(0,0,0,0.35)" />
      {/* Cup body */}
      <path d="M22 40 L28 118 Q60 124 92 118 L98 40 Z" fill="url(#cupGrad)" />
      <defs>
        <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A2800" />
          <stop offset="40%" stopColor="#6B3A00" />
          <stop offset="100%" stopColor="#3D2000" />
        </linearGradient>
        <linearGradient id="lidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A1600" />
          <stop offset="100%" stopColor="#1A0E00" />
        </linearGradient>
        <linearGradient id="bandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A0E00" />
          <stop offset="100%" stopColor="#0D0700" />
        </linearGradient>
      </defs>
      {/* Cup sleeve band */}
      <path d="M26 62 L30 100 Q60 106 90 100 L94 62 Z" fill="url(#bandGrad)" />
      {/* Lid */}
      <rect x="18" y="30" width="84" height="14" rx="7" fill="url(#lidGrad)" />
      <rect x="24" y="22" width="72" height="12" rx="6" fill="#1A0E00" />
      <rect x="44" y="18" width="32" height="8" rx="4" fill="#2A1600" />
      {/* Coffee bean logo */}
      <ellipse cx="60" cy="82" rx="12" ry="14" fill="#8B5A2B" />
      <path
        d="M60 68 Q66 82 60 96"
        stroke="#5C3A1E"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M60 68 Q54 82 60 96"
        stroke="#5C3A1E"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Handle */}
      <path
        d="M94 58 Q112 58 112 78 Q112 98 94 98"
        stroke="#5C3A1E"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Face: Eyes */}
      <circle cx="46" cy="56" r="6.5" fill="white" />
      <circle cx="46" cy="56" r="4" fill="#1a1a1a" />
      <circle cx="47.5" cy="54.5" r="1.5" fill="white" />
      <circle cx="68" cy="56" r="6.5" fill="white" />
      <circle cx="68" cy="56" r="4" fill="#1a1a1a" />
      <circle cx="69.5" cy="54.5" r="1.5" fill="white" />
      {/* Cheeks */}
      <ellipse cx="38" cy="63" rx="5.5" ry="3.5" fill="#C06030" opacity="0.5" />
      <ellipse cx="76" cy="63" rx="5.5" ry="3.5" fill="#C06030" opacity="0.5" />
      {/* Smile */}
      <path
        d="M46 68 Q57 78 68 68"
        stroke="#1a1a1a"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Steam lines */}
      <path
        d="M46 18 Q44 10 46 4"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M60 16 Q58 8 60 2"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M74 18 Q72 10 74 4"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Corner Leaves ─────────────────────────────────────────────── */
function TopLeftLeaves() {
  return (
    <svg
      width="140"
      height="130"
      viewBox="0 0 140 130"
      fill="none"
      className="absolute top-0 left-0 opacity-80"
      style={{ zIndex: 1 }}
    >
      <path d="M0,0 Q70,5 90,55 Q45,70 0,50 Z" fill="#2E5E28" />
      <path d="M0,0 Q70,5 90,55 Q45,70 0,50 Z" fill="url(#leafGrad1)" />
      <path
        d="M5,5 Q62,12 82,50"
        stroke="#4A9A42"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
      <path d="M0,0 Q30,30 10,80 Q-5,50 0,0 Z" fill="#245220" />
      <path
        d="M10,80 Q50,110 80,120 Q40,95 10,80 Z"
        fill="#2E5E28"
        opacity="0.85"
      />
      <path
        d="M15,82 Q48,105 72,114"
        stroke="#4A9A42"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <defs>
        <linearGradient id="leafGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4A9A42" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1A4018" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BottomRightLeaves() {
  return (
    <svg
      width="130"
      height="140"
      viewBox="0 0 130 140"
      fill="none"
      className="absolute bottom-0 right-0 opacity-75"
      style={{ zIndex: 1 }}
    >
      <path d="M130,140 Q60,135 40,85 Q85,70 130,90 Z" fill="#2E5E28" />
      <path
        d="M125,135 Q68,128 48,88"
        stroke="#4A9A42"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
      <path d="M130,140 Q100,110 120,60 Q135,90 130,140 Z" fill="#245220" />
      <path
        d="M120,60 Q80,30 50,20 Q90,45 120,60 Z"
        fill="#2E5E28"
        opacity="0.85"
      />
      <path
        d="M115,58 Q82,35 56,26"
        stroke="#4A9A42"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

/* ── Coffee Beans decoration ───────────────────────────────────── */
function CoffeeBeanDeco({ x, y, size = 12, angle = 0, opacity = 0.6 }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`} opacity={opacity}>
      <ellipse cx="0" cy="0" rx={size * 0.6} ry={size} fill="#3D1A00" />
      <path
        d={`M0 ${-size} Q${size * 0.5} 0 0 ${size}`}
        stroke="#5C2800"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d={`M0 ${-size} Q${-size * 0.5} 0 0 ${size}`}
        stroke="#5C2800"
        strokeWidth="1.5"
        fill="none"
      />
    </g>
  );
}

function TopRightBeans() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      className="absolute top-2 right-3 opacity-70"
      style={{ zIndex: 1 }}
    >
      <CoffeeBeanDeco x={20} y={20} size={10} angle={-30} />
      <CoffeeBeanDeco x={50} y={12} size={8} angle={15} />
      <CoffeeBeanDeco x={65} y={40} size={9} angle={-45} />
    </svg>
  );
}

/* ── Juice Drops ───────────────────────────────────────────────── */
function JuiceDrop({ x, y, color, size = 8 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, zIndex: 2 }}
      animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
      transition={{
        duration: 2 + Math.random(),
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
    >
      <svg width={size} height={size * 1.3} viewBox="0 0 10 13" fill="none">
        <path d="M5 0 Q8 4 8 7 Q8 11 5 12 Q2 11 2 7 Q2 4 5 0Z" fill={color} />
      </svg>
    </motion.div>
  );
}

/* ── Main Component ────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 14 },
  },
};

export default function LandingScreen({ onPlay }) {
  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 10%, #2a1200 0%, #0e0a07 50%, #0a0808 100%)",
      }}
    >
      {/* Corner & decorative elements */}
      <TopLeftLeaves />
      <BottomRightLeaves />
      <TopRightBeans />

      {/* Background glow blobs */}
      <div
        className="blob"
        style={{
          width: 260,
          height: 260,
          background: "#FF6B2B",
          top: -80,
          left: -80,
          opacity: 0.08,
        }}
      />
      <div
        className="blob"
        style={{
          width: 280,
          height: 280,
          background: "#FFB800",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.06,
        }}
      />
      <div
        className="blob"
        style={{
          width: 240,
          height: 240,
          background: "#FF2D87",
          bottom: -60,
          right: -60,
          opacity: 0.07,
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative flex flex-col items-center w-full px-5 pt-10 pb-8 max-w-sm mx-auto"
        style={{ zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* ── Logo + Characters ── */}
        <motion.div
          variants={itemVariants}
          className="relative w-full flex flex-col items-center mb-1"
        >
          {/* Strawberry – left floating */}
          <motion.div
            className="absolute"
            style={{ left: -8, top: 10, zIndex: 5 }}
            animate={{ y: [0, -2, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <StrawberryChar size={95} />
          </motion.div>

          {/* Orange – right floating
          <motion.div
            className="absolute"
            style={{ right: -8, top: 50, zIndex: 5 }}
            animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <OrangeChar size={90} />
          </motion.div> */}

          {/* Logo image */}
          <div
            className="relative w-full flex justify-center select-none"
            style={{
              paddingLeft: "10%",
              paddingRight: "10%",
              paddingBottom: "8px",
            }}
          >
            <Image
              src="/assets/rizzLogo.png"
              alt="Rizz Juices"
              width={320}
              height={200}
              priority
              className="w-full h-auto"
              style={{
                filter: "drop-shadow(0 8px 24px rgba(255,107,43,0.45))",
              }}
            />
          </div>
          {/* Coffee cup – positioned below/overlapping logo right side */}
          <motion.div
            className="absolute"
            style={{ right: 4, bottom: -50, zIndex: 6 }}
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          >
            <CoffeeCupChar size={100} />
          </motion.div>
        </motion.div>

        {/* Spacer for coffee cup overlap */}
        <div style={{ height: 56 }} />

        {/* ── Heading ── */}
        <motion.div variants={itemVariants} className="w-full mb-3">
          <h1 className="text-3xl font-black leading-tight">
            <span style={{ color: "#fff" }}>Catch </span>
            <span style={{ color: "#FF8C00" }}>Fruits.</span>
            <br />
            <span style={{ color: "#fff" }}>Win </span>
            <span style={{ color: "#FF8C00" }}>Discounts.</span>
          </h1>
          {/* Underline accent */}
          <div className="flex gap-1.5 mt-2">
            <div
              className="h-1 w-8 rounded-full"
              style={{ background: "#FF6B2B" }}
            />
            <div
              className="h-1 w-2 rounded-full"
              style={{ background: "#FFB800" }}
            />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm leading-relaxed mb-8 w-full"
          style={{ color: "rgba(255,255,255,0.6)", maxWidth: "78%" }}
        >
          Catch as many falling fruits as possible in{" "}
          <span style={{ color: "#FF8C00", fontWeight: 700 }}>30 seconds</span>{" "}
          and unlock exclusive discounts.
        </motion.p>

        {/* ── Play Button — 3D game style ── */}
        <motion.button
          variants={itemVariants}
          onClick={onPlay}
          className="relative w-[70%] overflow-hidden flex items-center justify-center gap-3 font-black text-2xl tracking-widest uppercase"
          style={{
            borderRadius: "28px",
            padding: "16px 0 20px",
            background:
              "linear-gradient(180deg, #FFD166 0%, #FF9F1C 50%, #FF6B00 100%)",

            border: "2px solid rgba(180,255,80,0.5)",
            color: "white",
          }}
          whileHover={{
            scale: 1.03,
            boxShadow: [
              "inset 0 3px 0 rgba(255,255,255,0.5)",
              "inset 0 -2px 0 rgba(0,0,0,0.15)",
              "0 6px 0 #116600",
              "0 9px 0 #0A4400",
              "0 12px 24px rgba(0,0,0,0.55)",
              "0 0 55px rgba(100,255,0,0.75)",
              "0 0 90px rgba(100,255,0,0.3)",
            ].join(", "),
          }}
          whileTap={{
            scale: 0.97,
            y: 5,
            boxShadow: [
              "inset 0 3px 0 rgba(255,255,255,0.3)",
              "inset 0 -1px 0 rgba(0,0,0,0.1)",
              "0 2px 0 #116600",
              "0 3px 0 #0A4400",
              "0 4px 10px rgba(0,0,0,0.4)",
              "0 0 25px rgba(100,255,0,0.4)",
            ].join(", "),
            transition: { duration: 0.08 },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Glossy top-half shine */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: "52%",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.04) 100%)",
              borderRadius: "26px 26px 60% 60% / 18px 18px 12px 12px",
            }}
          />

          <span className="relative z-10">Play &amp; Win</span>
        </motion.button>

        {/* Footer note */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 mt-5 text-xs"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="6"
                width="20"
                height="14"
                rx="4"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 11h4M10 9v4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="16" cy="11" r="1" fill="currentColor" />
              <circle cx="14" cy="13.5" r="1" fill="currentColor" />
            </svg>
            Free to play
          </span>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>•</span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2 L14.5 8.5 H21.5 L15.5 12.5 L18 19 L12 15 L6 19 L8.5 12.5 L2.5 8.5 H9.5 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            No login required
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom rainbow bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, #FF6B2B, #FFB800, #FF2D87, #B14EFF, #FF6B2B)",
          zIndex: 20,
        }}
      />
    </div>
  );
}
