import React, { useEffect, useState } from 'react';
import { FlyingItem } from '../types';

interface FlyingItemOverlayProps {
  items: FlyingItem[];
  onComplete: (id: string) => void;
}

export const FlyingItemOverlay: React.FC<FlyingItemOverlayProps> = ({ items, onComplete }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {items.map((item) => (
        <FlyingTrajectoryItem key={item.id} item={item} onComplete={() => onComplete(item.id)} />
      ))}
    </div>
  );
};

const FlyingTrajectoryItem: React.FC<{ item: FlyingItem; onComplete: () => void }> = ({
  item,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 650; // 650ms parabolic arc flight

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      setProgress(t);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [item, onComplete]);

  // Compute parabolic coordinates:
  // X moves linearly from startX to endX
  // Y moves from startY to endY with an upward arc vertex
  const currentX = item.startX + (item.endX - item.startX) * progress;
  // Parabolic arch formula: 4 * peak * t * (1 - t)
  const arcHeight = 120; // 120px upward peak
  const linearY = item.startY + (item.endY - item.startY) * progress;
  const currentY = linearY - Math.sin(progress * Math.PI) * arcHeight;
  const rotation = progress * 360;
  const scale = 1 - progress * 0.35; // gently scales down as it enters the cart

  return (
    <div
      style={{
        left: `${currentX}px`,
        top: `${currentY}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
      }}
      className="absolute text-xl sm:text-2xl drop-shadow-md select-none pointer-events-none"
    >
      {item.type === 'teddy' ? '🧸' : '⭐'}
    </div>
  );
};
