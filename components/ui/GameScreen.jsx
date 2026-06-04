'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Phaser must be client-side only
const PhaserGame = dynamic(() => import('@/components/game/PhaserGame'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0D0D0D]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="text-5xl"
      >
        🍊
      </motion.div>
    </div>
  ),
});

const TIMER_WARN_THRESHOLD = 10;

export default function GameScreen({ onGameOver }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const handleScore = useCallback((newScore) => {
    setScore(newScore);
  }, []);

  const handleTimeUpdate = useCallback((t) => {
    setTimeLeft(t);
  }, []);

  const handleGameEnd = useCallback((finalScore) => {
    onGameOver(finalScore);
  }, [onGameOver]);

  const timerColor = timeLeft <= TIMER_WARN_THRESHOLD
    ? (timeLeft <= 5 ? '#FF2D87' : '#FF6B2B')
    : '#7FFF00';

  const timerBg = timeLeft <= TIMER_WARN_THRESHOLD
    ? (timeLeft <= 5 ? 'rgba(255,45,135,0.15)' : 'rgba(255,107,43,0.15)')
    : 'rgba(127,255,0,0.1)';

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0D0D0D] flex flex-col">

      {/* HUD bar */}
      <div className="relative z-30 flex items-center justify-between px-4 pt-safe py-3"
        style={{ background: 'rgba(13,13,13,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,107,43,0.2)' }}
      >
        {/* Score */}
        <motion.div
          key={score}
          initial={{ scale: 1.3, color: '#FFB800' }}
          animate={{ scale: 1, color: '#FFFFFF' }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <span className="text-xl">🏆</span>
          <div>
            <div className="text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Score</div>
            <div className="text-2xl font-black leading-none" style={{ color: '#FFB800' }}>
              {score.toLocaleString()}
            </div>
          </div>
        </motion.div>

        {/* Center logo */}
        <div className="text-sm font-black tracking-widest gradient-text opacity-60">RIZZ</div>

        {/* Timer */}
        <motion.div
          key={`timer-${Math.floor(timeLeft / 5)}`}
          animate={timeLeft <= 5 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.4, repeat: timeLeft <= 5 ? Infinity : 0 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ background: timerBg, border: `1px solid ${timerColor}40` }}
        >
          <span className="text-base">⏱</span>
          <div>
            <div className="text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Time</div>
            <div className="text-2xl font-black leading-none" style={{ color: timerColor }}>
              {String(timeLeft).padStart(2, '0')}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timer progress bar */}
      <div className="relative z-30 h-1 w-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="h-full"
          style={{
            background: `linear-gradient(90deg, ${timerColor}, ${timerColor}80)`,
            width: `${(timeLeft / 30) * 100}%`,
          }}
          transition={{ duration: 0.9, ease: 'linear' }}
        />
      </div>

      {/* Low time warning */}
      <AnimatePresence>
        {timeLeft <= 5 && timeLeft > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-20 left-0 right-0 z-40 flex justify-center pointer-events-none"
          >
            <div className="px-4 py-1.5 rounded-full text-sm font-bold"
              style={{ background: 'rgba(255,45,135,0.9)', color: 'white' }}
            >
              ⚡ HURRY! {timeLeft}s LEFT!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game canvas */}
      <div className="flex-1 relative z-10">
        <PhaserGame
          onScore={handleScore}
          onTimeUpdate={handleTimeUpdate}
          onGameEnd={handleGameEnd}
        />
      </div>

      {/* Bottom hint */}
      <div className="relative z-30 py-2 text-center text-xs"
        style={{ color: 'rgba(255,255,255,0.25)', background: 'rgba(13,13,13,0.7)', backdropFilter: 'blur(8px)' }}
      >
        👆 Drag to move · ← → Keyboard on desktop
      </div>
    </div>
  );
}
