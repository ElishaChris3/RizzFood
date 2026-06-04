'use client';

import { useEffect, useRef } from 'react';

export default function PhaserGame({ onScore, onTimeUpdate, onGameEnd }) {
  const containerRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    // Phaser must be imported client-side only (no SSR)
    let game;

    async function initPhaser() {
      const Phaser = (await import('phaser')).default;
      const { createGameScene } = await import('@/lib/gameScene');

      if (!containerRef.current || gameRef.current) return;

      const el = containerRef.current;
      const w = el.offsetWidth || window.innerWidth;
      const h = el.offsetHeight || window.innerHeight;

      const GameScene = createGameScene(Phaser, { onScore, onTimeUpdate, onGameEnd });

      game = new Phaser.Game({
        type: Phaser.AUTO,
        width: w,
        height: h,
        backgroundColor: '#0D0D0D',
        parent: el,
        scene: [GameScene],
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: w,
          height: h,
        },
        input: {
          touch: true,
          mouse: true,
        },
        render: {
          antialias: true,
          pixelArt: false,
        },
        // Disable default Phaser banner
        banner: false,
      });

      gameRef.current = game;
    }

    initPhaser();

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="game-canvas-wrapper w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
}
