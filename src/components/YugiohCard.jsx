import React from 'react';
import { YUGIOH_THEMES } from './Presets';

export const YUGIOH_ATTRIBUTES = {
  dark: { icon: '🔮', color: 'bg-purple-900', label: 'DARK' },
  light: { icon: '☀️', color: 'bg-yellow-100 text-slate-900', label: 'LIGHT' },
  water: { icon: '💧', color: 'bg-blue-600', label: 'WATER' },
  fire: { icon: '🔥', color: 'bg-red-600', label: 'FIRE' },
  earth: { icon: '🪨', color: 'bg-amber-800', label: 'EARTH' },
  wind: { icon: '💨', color: 'bg-teal-500', label: 'WIND' },
  divine: { icon: '⚡', color: 'bg-yellow-500', label: 'DIVINE' }
};

export default function YugiohCard({ data }) {
  const activeTheme = YUGIOH_THEMES.find(t => t.id === data.themeId) || YUGIOH_THEMES[0];
  const { borderWidth } = data;

  const attr = YUGIOH_ATTRIBUTES[data.attribute] || YUGIOH_ATTRIBUTES.dark;
  const isSpell = data.themeId === 'spell-card';
  const isTrap = data.themeId === 'trap-card';
  const isMonster = !isSpell && !isTrap;

  // Render Level Stars or Spell/Trap Sub-banner
  const renderSubHeader = () => {
    if (isSpell) {
      return (
        <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1 self-start font-mono uppercase tracking-widest shadow-sm">
          <span>[ Spell Card ]</span>
          <span>🟢</span>
        </div>
      );
    }
    if (isTrap) {
      return (
        <div className="flex items-center gap-1.5 text-[10px] font-black text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 mt-1 self-start font-mono uppercase tracking-widest shadow-sm">
          <span>[ Trap Card ]</span>
          <span>🔴</span>
        </div>
      );
    }
    
    // It's a Monster: render stars
    const starCount = Number(data.level) || 1;
    return (
      <div className="flex gap-0.5 mt-1 select-none flex-wrap">
        {Array.from({ length: Math.min(starCount, 12) }).map((_, idx) => (
          <span 
            key={idx} 
            className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-[10px] shadow-sm text-white"
            title={`Level ${starCount}`}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  return (
    <div 
      className="relative rounded-[12px] select-none p-[8px] overflow-hidden"
      style={{
        width: '280px',
        height: '390px',
        background: activeTheme.bgGradient,
        border: `${borderWidth}px solid ${activeTheme.borderColor}`,
        boxShadow: 'inset 0 0 8px rgba(0,0,0,0.15)'
      }}
    >
      {/* Inner card frame border */}
      <div 
        className="w-full h-full border border-black/20 rounded-[6px] flex flex-col justify-between p-2.5 relative"
        style={{
          backgroundColor: activeTheme.bgGradient.match(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g)?.[1] || '#b26829'
        }}
      >
        {/* Header Name & Attribute */}
        <div className="flex justify-between items-center bg-black/10 backdrop-blur-sm px-2 py-1.5 rounded border border-black/5 shadow-sm">
          <h3 
            className="text-[14px] font-black tracking-tight leading-none truncate pr-2"
            style={{ color: activeTheme.textColor }}
          >
            {data.name || 'YU-GI-OH CARD'}
          </h3>
          <div 
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md border border-white/10 font-bold ${attr.color}`}
            title={attr.label}
          >
            {attr.icon}
          </div>
        </div>

        {/* Level Stars or Spell/Trap tag */}
        <div className="px-1 py-0.5 flex items-center">
          {renderSubHeader()}
        </div>

        {/* Character Image Window */}
        <div 
          className="w-full h-[155px] border-4 border-slate-500/80 rounded-sm overflow-hidden shadow-inner flex items-center justify-center bg-zinc-950 relative"
          style={{
            borderColor: activeTheme.borderColor
          }}
        >
          {data.avatar ? (
            <img
              src={data.avatar}
              alt={data.name}
              className="max-w-none object-cover transition-all"
              style={{
                width: `${(data.avatarScale || 1.0) * 100}%`,
                transform: `translateX(${(data.avatarX || 0)}px) translateY(${(data.avatarY || 0)}px)`,
                filter: data.avatarFilter === 'grayscale' ? 'grayscale(100%)' :
                        data.avatarFilter === 'sepia' ? 'sepia(100%)' :
                        data.avatarFilter === 'vintage' ? 'contrast(120%) saturate(120%) hue-rotate(-20deg)' : 'none',
              }}
            />
          ) : (
            <div className="text-slate-400 text-xs text-center p-4">
              Add Character Photo
            </div>
          )}
        </div>

        {/* Bottom Rules / Effect Info Box */}
        <div 
          className="flex-1 w-full border border-black/20 rounded p-2 text-slate-900 flex flex-col justify-between overflow-hidden shadow-sm mt-2"
          style={{ backgroundColor: activeTheme.cardBg }}
        >
          {/* Monster Type brackets */}
          {isMonster && (
            <div className="text-[10px] font-black text-slate-800 tracking-wide font-sans mb-0.5 leading-none">
              {data.monsterType || '[ Monster / Effect ]'}
            </div>
          )}

          {/* Description Text */}
          <p className="text-[9px] text-slate-700 leading-tight font-medium overflow-hidden line-clamp-4 flex-1">
            {data.description || 'Enter the rules description details.'}
          </p>

          {/* ATK / DEF readouts */}
          {isMonster && (
            <div className="border-t border-black/10 pt-1 flex justify-end gap-3 text-[10px] font-bold font-mono text-slate-900 tracking-wider">
              <span>ATK / <span className="font-extrabold">{data.atk || '0'}</span></span>
              <span>DEF / <span className="font-extrabold">{data.def || '0'}</span></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
