import React from 'react';
import { ESPORTS_THEMES } from './Presets';
import { Crosshair, Trophy, Zap, ShieldAlert } from 'lucide-react';

export default function EsportsCard({ data }) {
  const activeTheme = ESPORTS_THEMES.find(t => t.id === data.themeId) || ESPORTS_THEMES[0];
  const { borderWidth } = data;

  const renderStats = () => {
    if (!data.stats) return null;
    return (
      <div className="grid grid-cols-2 gap-2 mt-3 bg-black/30 backdrop-blur-md p-2 rounded-xl border border-white/5">
        {data.stats.map((s, idx) => (
          <div key={idx} className="flex flex-col text-left px-1 py-0.5 border-l border-white/10 pl-2">
            <span className="text-[7px] font-bold text-white/50 uppercase tracking-widest leading-none mb-0.5">
              {s.name}
            </span>
            <span className="text-[12px] font-black text-white leading-none font-mono">
              {s.value || '0'}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div 
      className="relative rounded-[20px] overflow-hidden flex flex-col justify-between select-none p-4"
      style={{
        width: '280px',
        height: '390px',
        background: activeTheme.bgGradient,
        border: `${borderWidth}px solid ${activeTheme.borderColor}`,
        color: activeTheme.textColor
      }}
    >
      {/* Background cyber grid lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />
      </div>

      {/* Top Header: Rank & Class */}
      <div className="flex justify-between items-center z-10 bg-black/20 px-2.5 py-1.5 rounded-lg border border-white/5 shadow-inner">
        <div className="flex items-center gap-1">
          <Trophy size={11} className="text-amber-400" />
          <span className="text-[9px] font-black tracking-widest text-white uppercase">
            {data.rank || 'VALORANT'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[8px] font-mono text-white/60">
          <Crosshair size={9} />
          <span>{data.weapon || 'Vandal'}</span>
        </div>
      </div>

      {/* Character Image Sandbox */}
      <div className="relative w-full h-[165px] my-2 overflow-hidden flex items-end justify-center rounded-xl bg-slate-950/40 border border-white/5">
        
        {/* Decorative tactical design brackets */}
        <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-white/20" />
        <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-white/20" />
        <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-white/20" />
        <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-white/20" />
        
        {data.avatar ? (
          <img
            src={data.avatar}
            alt={data.name}
            className="max-w-none object-cover origin-bottom transition-all z-10"
            style={{
              width: `${(data.avatarScale || 1.15) * 100}%`,
              transform: `translateX(${(data.avatarX || 0)}px) translateY(${(data.avatarY || 0)}px)`,
              filter: data.avatarFilter === 'grayscale' ? 'grayscale(100%)' :
                      data.avatarFilter === 'sepia' ? 'sepia(100%)' :
                      data.avatarFilter === 'vintage' ? 'contrast(120%) saturate(120%) hue-rotate(-20deg)' : 'none',
            }}
          />
        ) : (
          <div className="text-white/40 text-xs text-center p-4">
            No Agent Artwork
          </div>
        )}

        {/* Faded overlay blending the avatar image base */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
      </div>

      {/* Gamer identification and stats */}
      <div className="z-10 flex flex-col justify-end">
        {/* Gamer Tag & Tagline */}
        <div className="flex items-baseline justify-between border-b border-white/10 pb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-4 bg-red-500 rounded-sm" style={{ backgroundColor: activeTheme.borderColor }} />
            <h3 className="text-[16px] font-black tracking-tight text-white leading-none uppercase">
              {data.name || 'GamerName'}
            </h3>
          </div>
          <span className="text-[9px] font-mono text-white/50 font-semibold uppercase leading-none">
            {data.tag || 'TAG#000'}
          </span>
        </div>

        {/* Tactical metrics section */}
        {renderStats()}
      </div>

      {/* Top edge neon line */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent pointer-events-none z-20" style={{ backgroundImage: `linear-gradient(to right, transparent, ${activeTheme.borderColor}, transparent)` }} />
    </div>
  );
}
