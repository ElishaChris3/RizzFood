"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoaderScreen from "@/components/ui/LoaderScreen";
import LandingScreen from "@/components/ui/LandingScreen";
import GameScreen from "@/components/ui/GameScreen";
import ResultScreen from "@/components/ui/ResultScreen";

export default function Home() {
  const [screen, setScreen] = useState("loader");
  const [finalScore, setFinalScore] = useState(0);

  const handleGameOver = (score) => {
    setFinalScore(score);
    setScreen("result");
  };

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-[#0D0D0D]">
      <AnimatePresence mode="wait">

        {screen === "loader" && (
          <LoaderScreen key="loader" onDone={() => setScreen("landing")} />
        )}

        {screen === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LandingScreen onPlay={() => setScreen("game")} />
          </motion.div>
        )}

        {screen === "game" && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GameScreen onGameOver={handleGameOver} />
          </motion.div>
        )}

        {screen === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ResultScreen
              score={finalScore}
              onPlayAgain={() => setScreen("game")}
              onHome={() => setScreen("landing")}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}
