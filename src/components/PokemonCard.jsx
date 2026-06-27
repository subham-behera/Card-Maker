import React from 'react';
import { POKEMON_THEMES } from './Presets';

// Map of Pokemon types to emoji icons and colors
export const TYPE_METADATA = {
  fire: { icon: '🔥', color: '#ff5858', textColor: '#f8fafc', badgeBg: 'bg-red-500' },
  water: { icon: '💧', color: '#1e59bc', textColor: '#f8fafc', badgeBg: 'bg-blue-500' },
  grass: { icon: '🌿', color: '#38ef7d', textColor: '#1e293b', badgeBg: 'bg-emerald-500' },
  psychic: { icon: '👁️', color: '#a18cd1', textColor: '#f8fafc', badgeBg: 'bg-purple-500' },
  lightning: { icon: '⚡', color: '#f5af19', textColor: '#1e293b', badgeBg: 'bg-yellow-400' },
  colorless: { icon: '⭐', color: '#94a3b8', textColor: '#f8fafc', badgeBg: 'bg-slate-400' }
};

export default function PokemonCard({ data }) {
  const activeTheme = POKEMON_THEMES.find(t => t.id === data.themeId) || POKEMON_THEMES[0];
  const { borderWidth } = data;

  // Render energy symbols
  const renderEnergyList = (costs) => {
    if (!costs) return null;
    
    // Support either array format or comma-separated string
    const costArray = Array.isArray(costs) 
      ? costs 
      : costs.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

    return (
      <div className="flex gap-0.5">
        {costArray.map((cost, idx) => {
          const type = TYPE_METADATA[cost] || TYPE_METADATA.colorless;
          return (
            <span 
              key={idx}
              className={`w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] select-none shadow-sm ${type.badgeBg}`}
              title={cost}
            >
              {type.icon}
            </span>
          );
        })}
      </div>
    );
  };

  const currentType = TYPE_METADATA[data.type] || TYPE_METADATA.fire;

  return (
    <div 
      className="relative rounded-[16px] select-none bg-[#f1c40f] overflow-hidden"
      style={{
        width: '280px',
        height: '390px',
        border: `${borderWidth}px solid #d4ac0d`,
        padding: '8px',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
      }}
    >
      {/* Outer yellow border box, inner card template wrapper */}
      <div 
        className="w-full h-full rounded-[10px] flex flex-col justify-between p-3 border border-yellow-600/30"
        style={{
          background: activeTheme.bgGradient,
        }}
      >
        {/* Top Header: Name, HP, Type */}
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold tracking-tighter uppercase opacity-85 text-slate-800">
              {data.stage || 'Basic'}
            </span>
            <h3 className="text-[16px] font-black text-slate-900 tracking-tight leading-none">
              {data.name || 'POKÉMON'}
            </h3>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-red-600 font-extrabold text-[15px] font-mono leading-none">
              {data.hp || '100'} HP
            </span>
            <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-xs shadow-sm border border-black/10">
              {currentType.icon}
            </span>
          </div>
        </div>

        {/* Character Image Window */}
        <div 
          className="relative w-full h-[155px] border-4 border-yellow-500 rounded-sm overflow-hidden shadow-inner flex items-center justify-center"
          style={{
            backgroundColor: activeTheme.cardBg
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
          
          {/* Holographic sparkle texture overlay (simulated) */}
          {activeTheme.holoPattern !== 'none' && (
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-10 animate-pulse" />
          )}
        </div>

        {/* Midbar Description Banner */}
        <div 
          className="w-full text-center py-0.5 border border-yellow-700/20 text-[9px] font-medium text-slate-800 italic shadow-sm rounded-sm"
          style={{ background: activeTheme.bannerBg }}
        >
          {data.species || 'Unknown Species Pokemon'}
        </div>

        {/* Attack List Section */}
        <div className="flex-1 flex flex-col justify-center gap-1.5 my-1.5 px-0.5">
          {/* Attack 1 */}
          {data.attack1Name && (
            <div className="flex flex-col border-b border-black/5 pb-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  {renderEnergyList(data.attack1Cost)}
                  <span className="text-[12px] font-bold text-slate-900">{data.attack1Name}</span>
                </div>
                <span className="text-[12px] font-extrabold text-slate-900 font-mono">{data.attack1Damage}</span>
              </div>
              <p className="text-[9px] text-slate-700 leading-tight mt-0.5 font-medium pl-1 line-clamp-1">
                {data.attack1Desc}
              </p>
            </div>
          )}

          {/* Attack 2 */}
          {data.attack2Name && (
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  {renderEnergyList(data.attack2Cost)}
                  <span className="text-[12px] font-bold text-slate-900">{data.attack2Name}</span>
                </div>
                <span className="text-[12px] font-extrabold text-slate-900 font-mono">{data.attack2Damage}</span>
              </div>
              <p className="text-[9px] text-slate-700 leading-tight mt-0.5 font-medium pl-1 line-clamp-2">
                {data.attack2Desc}
              </p>
            </div>
          )}
        </div>

        {/* Footer: Weakness, Resistance, Retreat */}
        <div className="flex justify-between items-center text-[8px] font-bold text-slate-800 border-t border-black/5 pt-1 mt-0.5">
          {/* Weakness */}
          <div className="flex items-center gap-0.5">
            <span>weakness</span>
            {data.weakness && data.weakness !== 'none' ? (
              <span className="w-3.5 h-3.5 rounded-full bg-slate-100 flex items-center justify-center text-[7px] shadow-sm">
                {TYPE_METADATA[data.weakness.toLowerCase()]?.icon || '💧'}
              </span>
            ) : (
              <span className="opacity-50">none</span>
            )}
          </div>

          {/* Resistance */}
          <div className="flex items-center gap-0.5">
            <span>resistance</span>
            {data.resistance && data.resistance !== 'none' ? (
              <span className="w-3.5 h-3.5 rounded-full bg-slate-100 flex items-center justify-center text-[7px] shadow-sm">
                {TYPE_METADATA[data.resistance.toLowerCase()]?.icon || '⚡'}
              </span>
            ) : (
              <span className="opacity-50">none</span>
            )}
          </div>

          {/* Retreat Cost */}
          <div className="flex items-center gap-0.5">
            <span>retreat</span>
            <div className="flex gap-0.5">
              {Array.from({ length: Number(data.retreatCost) || 0 }).map((_, i) => (
                <span key={i} className="w-3 h-3 rounded-full bg-slate-300 flex items-center justify-center text-[6px]">
                  ⭐
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
