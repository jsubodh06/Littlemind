import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/audio';

interface ActiveBubble {
  id: number;
  x: number; // percentage across screen (5% to 95%)
  y: number; // pixels from bottom
  size: number;
  speed: number;
  hue: string; // pastel color
}

interface PoppedBubble {
  id: number;
  x: number;
  y: number;
  text: string;
}

export const BubblePopOverlay: React.FC = () => {
  const [bubbles, setBubbles] = useState<ActiveBubble[]>([]);
  const [poppedBubbles, setPoppedBubbles] = useState<PoppedBubble[]>([]);

  // Periodically generate gentle ambient bubbles
  useEffect(() => {
    let nextId = 1;
    const colors = [
      'rgba(186, 230, 253, 0.45)', // sky blue
      'rgba(251, 207, 232, 0.45)', // rose pink
      'rgba(167, 243, 208, 0.45)', // mint
      'rgba(254, 240, 138, 0.45)', // butter
      'rgba(233, 213, 255, 0.45)', // lavender
    ];

    const addBubble = () => {
      setBubbles((prev) => {
        if (prev.length >= 7) return prev; // Keep subtle and performant
        return [
          ...prev,
          {
            id: nextId++,
            x: 8 + Math.random() * 84,
            y: -60,
            size: 32 + Math.floor(Math.random() * 26),
            speed: 0.8 + Math.random() * 0.9,
            hue: colors[Math.floor(Math.random() * colors.length)],
          },
        ];
      });
    };

    // Add initial set
    for (let i = 0; i < 4; i++) {
      setTimeout(addBubble, i * 1400);
    }

    const interval = setInterval(addBubble, 3600);
    return () => clearInterval(interval);
  }, []);

  // Float loop with RAF
  useEffect(() => {
    let animId: number;

    const updatePositions = () => {
      setBubbles((prev) =>
        prev
          .map((b) => ({
            ...b,
            y: b.y + b.speed,
          }))
          .filter((b) => b.y < window.innerHeight + 100)
      );
      animId = requestAnimationFrame(updatePositions);
    };

    animId = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animId);
  }, []);

  const popBubble = (b: ActiveBubble, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playBubblePop();

    // Remove from active
    setBubbles((prev) => prev.filter((item) => item.id !== b.id));

    // Add popped celebration text
    const cheerWords = ['yay! ✨', 'pop! 🫧', 'giggle! 💕', 'sweet! ⭐'];
    const chosenCheer = cheerWords[Math.floor(Math.random() * cheerWords.length)];

    const poppedId = Date.now() + Math.random();
    setPoppedBubbles((prev) => [
      ...prev,
      {
        id: poppedId,
        x: b.x,
        y: b.y,
        text: chosenCheer,
      },
    ]);

    setTimeout(() => {
      setPoppedBubbles((prev) => prev.filter((p) => p.id !== poppedId));
    }, 1100);
  };

  const blowMoreBubbles = () => {
    soundManager.playBubblePop();
    const colors = [
      'rgba(186, 230, 253, 0.55)',
      'rgba(251, 207, 232, 0.55)',
      'rgba(167, 243, 208, 0.55)',
      'rgba(254, 240, 138, 0.55)',
    ];

    setBubbles((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        x: 15 + Math.random() * 30,
        y: 20,
        size: 38,
        speed: 1.4,
        hue: colors[0],
      },
      {
        id: Date.now() + 2,
        x: 45 + Math.random() * 20,
        y: 10,
        size: 46,
        speed: 1.1,
        hue: colors[1],
      },
      {
        id: Date.now() + 3,
        x: 70 + Math.random() * 20,
        y: 40,
        size: 34,
        speed: 1.6,
        hue: colors[2],
      },
    ]);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {/* Floating Active Bubbles */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          onClick={(e) => popBubble(b, e)}
          style={{
            left: `${b.x}%`,
            bottom: `${b.y}px`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            backgroundColor: b.hue,
          }}
          className="absolute pointer-events-auto cursor-pointer rounded-full border border-white/60 shadow-sm backdrop-blur-[0.5px] transition-transform duration-150 hover:scale-125 active:scale-95 group"
          title="Tap to pop!"
        >
          {/* Bubble Specular Glint */}
          <div className="absolute top-[18%] left-[20%] w-[28%] h-[20%] bg-white/80 rounded-full rotate-[-30deg]" />
          <div className="absolute bottom-[20%] right-[22%] w-[15%] h-[15%] bg-white/50 rounded-full" />
        </div>
      ))}

      {/* Popped Sparkle & "yay!" Text */}
      {poppedBubbles.map((p) => (
        <div
          key={p.id}
          style={{
            left: `${p.x}%`,
            bottom: `${p.y}px`,
          }}
          className="absolute flex flex-col items-center pointer-events-none z-40 -translate-x-1/2"
        >
          {/* Sparkles */}
          <div className="relative w-12 h-12 flex items-center justify-center animate-ping">
            <span className="text-amber-400 text-sm">✨</span>
          </div>
          <span className="text-xs font-bold text-pink-600 bg-white/95 px-2.5 py-0.5 rounded-full shadow-sm border border-pink-200 -mt-8 animate-float-fast">
            {p.text}
          </span>
        </div>
      ))}

      {/* Floating "Blow Bubbles 🫧" Button on lower right */}
      <button
        onClick={blowMoreBubbles}
        className="fixed bottom-6 right-6 pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-stone-700 text-xs font-semibold rounded-full shadow-md border border-stone-200/80 backdrop-blur-xs hover:scale-105 active:scale-95 transition-all group"
        title="Release more playful bubbles"
      >
        <span className="text-base group-hover:rotate-12 transition-transform">🫧</span>
        <span className="hidden sm:inline">Blow Bubbles</span>
      </button>
    </div>
  );
};
