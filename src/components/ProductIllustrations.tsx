import React from 'react';

interface IllustrationProps {
  type: string;
  className?: string;
}

export const ProductIllustration: React.FC<IllustrationProps> = ({ type, className = "w-full h-full" }) => {
  switch (type) {
    case 'stacker':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="grad-base" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
            <linearGradient id="grad-ring1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
            <linearGradient id="grad-ring2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <linearGradient id="grad-ring3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
            <linearGradient id="grad-ring4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FECDD3" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
          </defs>
          {/* Shadow */}
          <ellipse cx="100" cy="180" rx="55" ry="12" fill="#E2E8F0" opacity="0.6" />
          {/* Base */}
          <rect x="60" y="165" width="80" height="14" rx="7" fill="url(#grad-base)" opacity="0.8" />
          <rect x="94" y="45" width="12" height="125" rx="6" fill="#FDE68A" />
          {/* Ring 1 - Large Blue */}
          <rect x="45" y="142" width="110" height="24" rx="12" fill="url(#grad-ring1)" />
          <ellipse cx="100" cy="144" rx="50" ry="6" fill="#BFDBFE" opacity="0.5" />
          {/* Ring 2 - Mint */}
          <rect x="55" y="116" width="90" height="22" rx="11" fill="url(#grad-ring2)" />
          <ellipse cx="100" cy="118" rx="40" ry="5" fill="#D1FAE5" opacity="0.6" />
          {/* Ring 3 - Warm Butter */}
          <rect x="66" y="92" width="68" height="20" rx="10" fill="url(#grad-ring3)" />
          <ellipse cx="100" cy="94" rx="30" ry="4" fill="#FEF08A" opacity="0.6" />
          {/* Ring 4 - Rose Pink */}
          <rect x="76" y="70" width="48" height="18" rx="9" fill="url(#grad-ring4)" />
          {/* Top Wooden Ball */}
          <circle cx="100" cy="50" r="16" fill="#FBBF24" />
          <circle cx="95" cy="45" r="4" fill="#FEF9C3" opacity="0.8" />
        </svg>
      );

    case 'sleepsack':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Shadow */}
          <ellipse cx="100" cy="182" rx="48" ry="10" fill="#E2E8F0" opacity="0.6" />
          {/* Sack Body */}
          <path
            d="M80 35 C70 35 65 50 62 70 L50 145 C48 170 80 180 100 180 C120 180 152 170 150 145 L138 70 C135 50 130 35 120 35 C115 35 110 45 100 45 C90 45 85 35 80 35 Z"
            fill="#E0F2FE"
            stroke="#BAE6FD"
            strokeWidth="3"
          />
          {/* Arm openings */}
          <ellipse cx="65" cy="65" rx="6" ry="12" fill="#BAE6FD" opacity="0.5" />
          <ellipse cx="135" cy="65" rx="6" ry="12" fill="#BAE6FD" opacity="0.5" />
          {/* Neckline */}
          <path d="M85 35 Q100 48 115 35" stroke="#38BDF8" strokeWidth="2.5" fill="none" />
          {/* Center Zipper */}
          <line x1="100" y1="46" x2="100" y2="168" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="100" cy="50" r="4" fill="#0284C7" />
          {/* Cute Little Leaf Embroidery */}
          <path d="M85 110 Q92 105 92 98 Q85 105 85 110 Z" fill="#34D399" />
          <path d="M115 110 Q108 105 108 98 Q115 105 115 110 Z" fill="#34D399" />
          <path d="M100 130 C90 128 85 135 90 140 C95 145 105 140 100 130 Z" fill="#FDE68A" opacity="0.8" />
        </svg>
      );

    case 'rattle':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <ellipse cx="100" cy="180" rx="40" ry="8" fill="#E2E8F0" opacity="0.6" />
          {/* Wooden handle */}
          <rect x="94" y="90" width="12" height="75" rx="6" fill="#D97706" opacity="0.85" />
          <circle cx="100" cy="168" r="10" fill="#B45309" />
          {/* Rattling rings on handle */}
          <rect x="88" y="115" width="24" height="8" rx="4" fill="#6EE7B7" />
          <rect x="88" y="130" width="24" height="8" rx="4" fill="#FDE68A" />
          {/* Rattle Head */}
          <circle cx="100" cy="65" r="38" fill="#A7F3D0" stroke="#059669" strokeWidth="2" />
          <circle cx="100" cy="65" r="28" fill="#F0FDF4" />
          {/* Inner smiling bell/face */}
          <circle cx="92" cy="60" r="3" fill="#065F46" />
          <circle cx="108" cy="60" r="3" fill="#065F46" />
          <path d="M94 72 Q100 78 106 72" stroke="#065F46" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Cheeks */}
          <circle cx="86" cy="66" r="3.5" fill="#FECDD3" />
          <circle cx="114" cy="66" r="3.5" fill="#FECDD3" />
        </svg>
      );

    case 'bunny':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <ellipse cx="100" cy="178" rx="44" ry="10" fill="#E2E8F0" opacity="0.6" />
          {/* Floppy Left Ear */}
          <path d="M80 65 C65 30 50 40 65 75 Z" fill="#F5EBE0" stroke="#E6CCB2" strokeWidth="2" />
          <path d="M76 63 C67 38 57 45 68 72 Z" fill="#FBCFE8" />
          {/* Floppy Right Ear */}
          <path d="M120 65 C135 30 150 40 135 75 Z" fill="#F5EBE0" stroke="#E6CCB2" strokeWidth="2" />
          <path d="M124 63 C133 38 143 45 132 72 Z" fill="#FBCFE8" />
          {/* Bunny Body */}
          <ellipse cx="100" cy="138" rx="34" ry="36" fill="#F5EBE0" stroke="#E6CCB2" strokeWidth="2" />
          <ellipse cx="100" cy="144" rx="20" ry="22" fill="#FFFDF9" />
          {/* Bunny Paws */}
          <circle cx="78" cy="135" r="10" fill="#F5EBE0" stroke="#E6CCB2" strokeWidth="1.5" />
          <circle cx="122" cy="135" r="10" fill="#F5EBE0" stroke="#E6CCB2" strokeWidth="1.5" />
          <ellipse cx="84" cy="172" rx="12" ry="8" fill="#F5EBE0" stroke="#E6CCB2" strokeWidth="1.5" />
          <ellipse cx="116" cy="172" rx="12" ry="8" fill="#F5EBE0" stroke="#E6CCB2" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="100" cy="85" r="32" fill="#F5EBE0" stroke="#E6CCB2" strokeWidth="2" />
          {/* Eyes & Nose */}
          <ellipse cx="90" cy="80" rx="3" ry="4" fill="#4B5563" />
          <ellipse cx="110" cy="80" rx="3" ry="4" fill="#4B5563" />
          <path d="M97 90 L103 90 L100 94 Z" fill="#F43F5E" />
          <path d="M100 94 L100 98 M96 100 Q100 97 104 100" stroke="#4B5563" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Cheeks */}
          <circle cx="82" cy="88" r="5" fill="#FECDD3" opacity="0.8" />
          <circle cx="118" cy="88" r="5" fill="#FECDD3" opacity="0.8" />
        </svg>
      );

    case 'sorter':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <ellipse cx="100" cy="175" rx="52" ry="12" fill="#E2E8F0" opacity="0.6" />
          {/* Wooden Box Body */}
          <path d="M50 85 L100 65 L150 85 L150 150 L100 170 L50 150 Z" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="2" />
          {/* Top Lid */}
          <path d="M50 85 L100 65 L150 85 L100 105 Z" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2" />
          {/* Left Face Holes */}
          <circle cx="75" cy="122" r="10" fill="#5B21B6" opacity="0.5" />
          {/* Right Face Triangle Hole */}
          <polygon points="125,110 115,130 135,130" fill="#5B21B6" opacity="0.5" />
          {/* Floating Shape Block: Star */}
          <path d="M100 30 L104 42 L116 42 L106 50 L110 62 L100 54 L90 62 L94 50 L84 42 L96 42 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
        </svg>
      );

    case 'mobile':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Top Crossbar */}
          <line x1="50" y1="40" x2="150" y2="40" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
          <line x1="100" y1="10" x2="100" y2="40" stroke="#CBD5E1" strokeWidth="2" />
          {/* Suspension Strings */}
          <line x1="65" y1="40" x2="65" y2="80" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="100" y1="40" x2="100" y2="100" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="135" y1="40" x2="135" y2="75" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Cloud (left) */}
          <path d="M55 90 A6 6 0 0 1 65 84 A8 8 0 0 1 78 86 A6 6 0 0 1 75 96 L55 96 A4 4 0 0 1 55 90 Z" fill="#BAE6FD" />
          {/* Smiling Sun (middle) */}
          <circle cx="100" cy="115" r="16" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.5" />
          <circle cx="95" cy="112" r="2" fill="#78350F" />
          <circle cx="105" cy="112" r="2" fill="#78350F" />
          <path d="M97 119 Q100 122 103 119" stroke="#78350F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Star (right) */}
          <path d="M135 85 L138 94 L147 94 L140 100 L143 109 L135 103 L127 109 L130 100 L123 94 L132 94 Z" fill="#FBCFE8" stroke="#F43F5E" strokeWidth="1" />
        </svg>
      );

    case 'drum':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <ellipse cx="100" cy="175" rx="50" ry="10" fill="#E2E8F0" opacity="0.6" />
          {/* Drum Body */}
          <path d="M55 90 L55 140 C55 155 145 155 145 140 L145 90 Z" fill="#5EEAD4" stroke="#0D9488" strokeWidth="2.5" />
          {/* Chevron zigzag drum string */}
          <path d="M55 95 L75 145 L95 95 L115 145 L135 95 L145 120" stroke="#FBBF24" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Drum Membrane Top */}
          <ellipse cx="100" cy="90" rx="45" ry="16" fill="#FEF3C7" stroke="#0D9488" strokeWidth="2.5" />
          <ellipse cx="100" cy="90" rx="35" ry="11" stroke="#FDE68A" strokeWidth="1.5" fill="none" />
          {/* Drumsticks */}
          <line x1="60" y1="50" x2="95" y2="85" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
          <circle cx="95" cy="85" r="6" fill="#F43F5E" />
          <line x1="140" y1="50" x2="108" y2="83" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
          <circle cx="108" cy="83" r="6" fill="#F43F5E" />
        </svg>
      );

    case 'walker':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <ellipse cx="100" cy="180" rx="55" ry="10" fill="#E2E8F0" opacity="0.6" />
          {/* Push Handle and Arms */}
          <line x1="70" y1="60" x2="70" y2="130" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
          <line x1="60" y1="60" x2="140" y2="60" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
          <line x1="130" y1="60" x2="130" y2="130" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
          {/* Wooden Wagon Cart */}
          <rect x="55" y="115" width="90" height="35" rx="6" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
          {/* Blocks inside cart */}
          <rect x="62" y="105" width="20" height="20" rx="2" fill="#93C5FD" />
          <rect x="85" y="100" width="22" height="22" rx="2" fill="#FECDD3" />
          <rect x="110" y="104" width="20" height="20" rx="2" fill="#A7F3D0" />
          {/* Wheels */}
          <circle cx="70" cy="155" r="14" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
          <circle cx="70" cy="155" r="4" fill="#FFFFFF" />
          <circle cx="130" cy="155" r="14" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
          <circle cx="130" cy="155" r="4" fill="#FFFFFF" />
        </svg>
      );

    default:
      return null;
  }
};
