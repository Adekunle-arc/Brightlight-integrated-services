import React from 'react';
import { Stethoscope, Bug, GraduationCap, ShoppingBag } from 'lucide-react';

interface OfficialServiceBadgesProps {
  onSelectCategory?: (category: 'medical' | 'fumigation' | 'training' | 'rentals') => void;
  activeCategory?: string;
  className?: string;
}

export const OfficialServiceBadges: React.FC<OfficialServiceBadgesProps> = ({
  onSelectCategory,
  activeCategory,
  className = ''
}) => {
  const badges = [
    {
      id: 'medical' as const,
      title: 'Health and Medical Consultations',
      shortTitle: 'Health & Medical',
      icon: Stethoscope,
      bgGradient: 'from-blue-600 to-indigo-800',
      borderRing: 'ring-amber-400',
      accentColor: 'text-blue-600'
    },
    {
      id: 'fumigation' as const,
      title: 'Pest Control (Fumigations)',
      shortTitle: 'Pest Control',
      icon: Bug,
      bgGradient: 'from-red-600 via-rose-700 to-blue-900',
      borderRing: 'ring-amber-400',
      accentColor: 'text-rose-600'
    },
    {
      id: 'training' as const,
      title: 'Training',
      shortTitle: 'Professional Training',
      icon: GraduationCap,
      bgGradient: 'from-sky-600 to-blue-800',
      borderRing: 'ring-amber-400',
      accentColor: 'text-sky-600'
    },
    {
      id: 'rentals' as const,
      title: 'Rentals, General Merchandise',
      shortTitle: 'Rentals & Logistics',
      icon: ShoppingBag,
      bgGradient: 'from-blue-700 to-slate-900',
      borderRing: 'ring-amber-400',
      accentColor: 'text-amber-600'
    }
  ];

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {badges.map((b) => {
        const Icon = b.icon;
        const isSelected = activeCategory === b.id;

        return (
          <div
            key={b.id}
            onClick={() => onSelectCategory && onSelectCategory(b.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center ${
              isSelected
                ? 'bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-400/40'
                : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
            }`}
          >
            {/* Circular Medallion matching official banner */}
            <div className="relative mb-3">
              {/* Gold outer rim */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-300 to-yellow-500 p-0.5 shadow-md flex items-center justify-center">
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${b.bgGradient} flex items-center justify-center text-white border-2 border-white/90`}>
                  <Icon className="w-7 h-7 drop-shadow-sm" />
                </div>
              </div>
            </div>

            <h4 className="text-xs font-bold text-slate-900 tracking-tight leading-tight">
              {b.title}
            </h4>
            <span className="text-[10px] text-slate-500 mt-1 uppercase font-semibold font-mono tracking-wider">
              Official Division
            </span>
          </div>
        );
      })}
    </div>
  );
};
