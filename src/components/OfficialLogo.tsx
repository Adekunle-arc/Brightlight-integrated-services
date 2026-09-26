import React, { useState, useEffect } from 'react';
import { DataService } from '../services/dataService';

interface OfficialLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
  showRc?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const OfficialLogo: React.FC<OfficialLogoProps> = ({
  className = '',
  variant = 'color',
  showRc = true,
  size = 'md'
}) => {
  const [customLogo, setCustomLogo] = useState<string>(() => DataService.getSiteSettings().logoImage);

  useEffect(() => {
    setCustomLogo(DataService.getSiteSettings().logoImage);
    const unsub = DataService.onPhotosChange(() => {
      setCustomLogo(DataService.getSiteSettings().logoImage);
    });
    return unsub;
  }, []);

  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subTextColor = isDark ? 'text-amber-400' : 'text-amber-700';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16'
  };

  const titleSizes = {
    sm: 'text-sm font-extrabold tracking-tight leading-tight',
    md: 'text-base font-extrabold tracking-tight leading-tight',
    lg: 'text-2xl font-black tracking-tight leading-tight'
  };

  const subSizes = {
    sm: 'text-[9px] tracking-wider font-bold uppercase',
    md: 'text-[11px] tracking-wider font-bold uppercase',
    lg: 'text-sm tracking-widest font-extrabold uppercase'
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Emblem Vector OR Custom Admin-Uploaded Logo */}
      <div className={`relative shrink-0 ${iconSizes[size]} flex items-center justify-center`}>
        {customLogo ? (
          <img
            src={customLogo}
            alt="Bright Light Integrated Services Logo"
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-sm"
          >
            <defs>
              <linearGradient id="blGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#996515" />
                <stop offset="35%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#F5D061" />
                <stop offset="100%" stopColor="#C59B27" />
              </linearGradient>
              <linearGradient id="blGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE082" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#8C5E13" />
              </linearGradient>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#B8860B" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Stylized Rising Sun / Geometric Rays Arc */}
            <g filter="url(#softGlow)">
              {/* Outer Encircling Golden Swoosh */}
              <path
                d="M 22 76 C 18 52 35 22 68 20 C 82 20 88 28 88 38 C 88 56 68 76 38 82 C 30 84 24 81 22 76 Z"
                fill="url(#blGoldGrad)"
                opacity="0.95"
              />
              {/* Inner Negative Space cutout */}
              <path
                d="M 32 74 C 28 55 42 32 66 30 C 76 30 80 36 80 43 C 80 57 64 71 42 75 C 36 76 33 75 32 74 Z"
                fill={isDark ? '#0f172a' : '#ffffff'}
              />
              {/* Ascending Light Columns / Architectural Towers (Official Symbolism) */}
              <rect x="36" y="44" width="4.5" height="30" rx="1.5" fill="url(#blGoldLight)" />
              <rect x="43" y="34" width="5" height="40" rx="1.5" fill="url(#blGoldGrad)" />
              <rect x="50" y="27" width="5.5" height="47" rx="1.5" fill="url(#blGoldLight)" />
              <rect x="58" y="32" width="5" height="42" rx="1.5" fill="url(#blGoldGrad)" />
              <rect x="65" y="42" width="4.5" height="32" rx="1.5" fill="url(#blGoldLight)" />

              {/* Radiant Crown Arc */}
              <path
                d="M 33 80 C 50 85 75 80 86 64 C 88 67 85 75 75 82 C 60 90 40 88 33 80 Z"
                fill="url(#blGoldGrad)"
              />
            </g>
          </svg>
        )}
      </div>

      {/* Corporate Typography */}
      <div className="flex flex-col">
        {showRc && (
          <span className={`text-[10px] font-semibold tracking-wider font-mono opacity-80 ${isDark ? 'text-amber-300' : 'text-slate-600'}`}>
            RC: 8162390
          </span>
        )}
        <span className={`${titleSizes[size]} ${textColor} uppercase tracking-tight leading-none`}>
          BRIGHT LIGHT
        </span>
        <span className={`${subSizes[size]} ${subTextColor} font-extrabold tracking-widest leading-none mt-0.5`}>
          INTEGRATED SERVICES
        </span>
      </div>
    </div>
  );
};
