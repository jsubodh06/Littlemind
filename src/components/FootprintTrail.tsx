import React, { useState, useEffect, useRef } from 'react';

interface Footprint {
  id: number;
  x: number;
  y: number;
  angle: number;
  isLeft: boolean;
}

export const FootprintTrail: React.FC = () => {
  const [prints, setPrints] = useState<Footprint[]>([]);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const isLeftRef = useRef(true);
  const nextIdRef = useRef(1);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const distance = Math.hypot(dx, dy);

      // Spawn every 42px of movement
      if (distance >= 42) {
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        const currentIsLeft = isLeftRef.current;
        isLeftRef.current = !currentIsLeft;
        lastPosRef.current = { x: e.clientX, y: e.clientY };

        const newId = nextIdRef.current++;
        // Offset slightly sideways for natural baby foot spacing
        const sideOffset = currentIsLeft ? -12 : 12;
        const perpAngle = ((angle - 90) * Math.PI) / 180;
        const spawnX = e.clientX + Math.cos(perpAngle) * sideOffset;
        const spawnY = e.clientY + Math.sin(perpAngle) * sideOffset;

        setPrints((prev) => [
          ...prev.slice(-14), // keep maximum 15 on screen at a time
          {
            id: newId,
            x: spawnX,
            y: spawnY,
            angle: angle + (currentIsLeft ? -8 : 8),
            isLeft: currentIsLeft,
          },
        ]);

        // Auto remove after 1.2s
        setTimeout(() => {
          setPrints((prev) => prev.filter((p) => p.id !== newId));
        }, 1200);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (prints.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none">
      {prints.map((p) => (
        <div
          key={p.id}
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
          }}
          className="absolute transition-opacity duration-1000 opacity-35 hover:opacity-0"
        >
          <svg viewBox="0 0 24 32" className="w-4 h-5 text-amber-500/70 fill-current">
            {/* Heel */}
            <circle cx="12" cy="22" r="5" />
            {/* Sole */}
            <ellipse cx="12" cy="14" rx="6" ry="7" />
            {/* 5 Tiny Toes */}
            {p.isLeft ? (
              <>
                <circle cx="8" cy="5" r="2.2" /> {/* Big toe */}
                <circle cx="11.5" cy="4.5" r="1.6" />
                <circle cx="14.5" cy="5.2" r="1.4" />
                <circle cx="16.8" cy="6.6" r="1.2" />
                <circle cx="18.5" cy="8.5" r="1.0" /> {/* Pinky */}
              </>
            ) : (
              <>
                <circle cx="16" cy="5" r="2.2" /> {/* Big toe */}
                <circle cx="12.5" cy="4.5" r="1.6" />
                <circle cx="9.5" cy="5.2" r="1.4" />
                <circle cx="7.2" cy="6.6" r="1.2" />
                <circle cx="5.5" cy="8.5" r="1.0" /> {/* Pinky */}
              </>
            )}
          </svg>
        </div>
      ))}
    </div>
  );
};
