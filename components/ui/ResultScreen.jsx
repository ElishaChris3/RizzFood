'use client';

import { motion } from 'framer-motion';

function getDiscount(score) {
  if (score >= 300) return { pct: '25%', label: 'LEGENDARY!', emoji: '👑', color: '#B14EFF' };
  if (score >= 200) return { pct: '20%', label: 'AMAZING!', emoji: '🔥', color: '#FF2D87' };
  if (score >= 100) return { pct: '15%', label: 'GREAT!', emoji: '⚡', color: '#FFB800' };
  if (score >= 50)  return { pct: '10%', label: 'GOOD!', emoji: '🍊', color: '#FF6B2B' };
  return { pct: '5%', label: 'NICE TRY!', emoji: '😅', color: '#7FFF00' };
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};

const scoreVariants = {
  hidden: { scale: 0.3, opacity: 0, rotate: -10 },
  show: { scale: 1, opacity: 1, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 12, delay: 0.3 } },
};

export default function ResultScreen({ score, onPlayAgain, onHome }) {
  const discount = getDiscount(score);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0D0D0D] px-4">

      {/* Background blobs */}
      <div className="blob w-72 h-72 bg-neon-berry top-[-60px] right-[-60px]" />
      <div className="blob w-80 h-80 bg-neon-orange bottom-[-60px] left-[-60px]" />
      <div className="blob w-56 h-56 bg-neon-purple top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity: 0.1 }} />

      {/* Confetti-style floating emoji */}
      {['🎉', '⭐', '✨', '🍊', '🏆', '🎊'].map((e, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none select-none"
          style={{ left: `${10 + i * 15}%`, top: `${5 + (i % 3) * 20}%` }}
          animate={{ y: [0, -18, 0], rotate: [0, i % 2 ? 20 : -20, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
        >
          {e}
        </motion.div>
      ))}

      <motion.div
        className="relative z-20 flex flex-col items-center text-center max-w-sm w-full"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Result badge */}
        <motion.div variants={itemVariants} className="mb-3 text-5xl">
          {discount.emoji}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-2 px-5 py-1 rounded-full text-sm font-black tracking-widest uppercase"
          style={{ background: `${discount.color}22`, border: `2px solid ${discount.color}60`, color: discount.color }}
        >
          {discount.label}
        </motion.div>

        {/* Score display */}
        <motion.div
          variants={scoreVariants}
          className="my-6 flex flex-col items-center"
        >
          <div className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Final Score
          </div>
          <div
            className="text-7xl font-black leading-none"
            style={{
              background: `linear-gradient(135deg, ${discount.color}, #FFB800)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: `drop-shadow(0 0 20px ${discount.color}60)`,
            }}
          >
            {score}
          </div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>points</div>
        </motion.div>

        {/* Discount card */}
        <motion.div
          variants={itemVariants}
          className="w-full rounded-2xl p-5 mb-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,107,43,0.12), rgba(255,184,0,0.08))',
            border: '1px solid rgba(255,184,0,0.25)',
          }}
        >
          <div className="text-xs uppercase tracking-widest mb-1 font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>
            You&apos;ve unlocked
          </div>
          <div className="text-4xl font-black gradient-text text-glow-mango">
            {discount.pct} OFF
          </div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            On your next Rizz Juices order 🧃
          </div>

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-16 h-16 opacity-20"
            style={{ background: `radial-gradient(circle, ${discount.color}, transparent)` }}
          />
        </motion.div>

        {/* Action buttons */}
        <motion.button
          variants={itemVariants}
          onClick={onPlayAgain}
          className="btn-gradient glow-orange w-full max-w-xs py-4 rounded-2xl text-white font-black text-lg tracking-wide shadow-lg mb-3"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
        >
          🔄 Play Again
        </motion.button>

        <motion.button
          variants={itemVariants}
          onClick={onHome}
          className="w-full max-w-xs py-3 rounded-2xl font-bold text-sm tracking-wide"
          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.1)' }}
          whileTap={{ scale: 0.95 }}
        >
          🏠 Back to Home
        </motion.button>

        {/* Score tiers hint */}
        <motion.div
          variants={itemVariants}
          className="mt-6 w-full rounded-xl p-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="text-[10px] uppercase tracking-widest mb-2 text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Score tiers
          </div>
          <div className="flex justify-between text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span>50+ → 10%</span>
            <span>100+ → 15%</span>
            <span>200+ → 20%</span>
            <span>300+ → 25%</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
