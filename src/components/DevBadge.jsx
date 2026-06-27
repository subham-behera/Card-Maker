import React from 'react';
import { DEV_THEMES } from './Presets';
import { Terminal, Shield, Wifi, Award } from 'lucide-react';

export default function DevBadge({ data }) {
  const activeTheme = DEV_THEMES.find(t => t.id === data.themeId) || DEV_THEMES[0];
  const { borderWidth } = data;

  const statusColors = {
    online: 'bg-emerald-500 ring-emerald-400/50',
    coding: 'bg-cyan-500 ring-cyan-400/50',
    busy: 'bg-rose-500 ring-rose-400/50',
    offline: 'bg-slate-400 ring-slate-300/50'
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'online': return 'ONLINE';
      case 'coding': return 'IN THE ZONE';
      case 'busy': return 'DO NOT DISTURB';
      default: return 'OFFLINE';
    }
  };

  const renderSkills = () => {
    if (!data.skills) return null;
    const skillList = typeof data.skills === 'string'
      ? data.skills.split(',').map(s => s.trim()).filter(Boolean)
      : data.skills;

    return (
      <div className="flex flex-wrap gap-1 justify-center my-3 max-h-[50px] overflow-hidden">
        {skillList.slice(0, 5).map((skill, idx) => (
          <span 
            key={idx}
            className="text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md uppercase tracking-wider transition-colors"
            style={{ 
              backgroundColor: activeTheme.badgeStyle === 'cyber' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
              color: activeTheme.textColor,
              border: `1px solid ${activeTheme.accentColor}30`
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div 
      className="relative rounded-[24px] overflow-hidden flex flex-col justify-between items-center select-none"
      style={{
        width: '280px',
        height: '390px',
        background: activeTheme.bgGradient,
        border: `${borderWidth}px solid ${activeTheme.borderColor}`,
        color: activeTheme.textColor
      }}
    >
      {/* Physical Lanyard Slot at top */}
      <div className="absolute top-2 w-12 h-2.5 rounded-full bg-black/20 dark:bg-white/10 border border-black/10 dark:border-white/10 z-20 flex items-center justify-center">
        <div className="w-8 h-0.5 rounded-full bg-slate-900/40 dark:bg-white/20" />
      </div>

      {/* Header Info */}
      <div className="w-full flex justify-between items-center px-5 pt-8 z-10">
        <div className="flex items-center gap-1.5">
          {activeTheme.badgeStyle === 'cyber' ? (
            <Terminal size={14} className="opacity-90" style={{ color: activeTheme.borderColor }} />
          ) : (
            <Shield size={14} className="opacity-80" style={{ color: activeTheme.borderColor }} />
          )}
          <span className="text-[10px] font-extrabold tracking-widest uppercase opacity-85">
            {data.company || 'AETHER SYSTEM'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Wifi size={10} className="opacity-60" />
          <span className="text-[8px] font-mono opacity-60">SECURE ID</span>
        </div>
      </div>

      {/* Main Dev Details */}
      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 z-10">
        
        {/* Avatar Area */}
        <div className="relative mb-3">
          {/* Outer Ring glow */}
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center p-0.5 border"
            style={{ 
              borderColor: activeTheme.borderColor,
              boxShadow: `0 0 15px ${activeTheme.borderColor}40`
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-200">
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt={data.name}
                  className="w-full h-full object-cover transition-all"
                  style={{
                    transform: `scale(${data.avatarScale || 1.1}) translate(${(data.avatarX || 0)}px, ${(data.avatarY || 0)}px)`,
                    filter: data.avatarFilter === 'grayscale' ? 'grayscale(100%)' :
                            data.avatarFilter === 'sepia' ? 'sepia(100%)' :
                            data.avatarFilter === 'vintage' ? 'contrast(120%) saturate(120%) hue-rotate(-20deg)' : 'none',
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 bg-slate-100">
                  Dev Photo
                </div>
              )}
            </div>
          </div>
          
          {/* Pulse status indicator */}
          <div className="absolute bottom-0 right-1 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 py-0.5 px-1.5 rounded-full border border-black/10 dark:border-white/10 shadow-sm">
            <span className={`w-2 h-2 rounded-full ring-2 animate-pulse ${statusColors[data.status]}`} />
            <span className="text-[7px] font-black tracking-widest font-mono text-slate-700 dark:text-slate-300 leading-none">
              {getStatusLabel(data.status)}
            </span>
          </div>
        </div>

        {/* Developer Identification */}
        <div className="text-center space-y-0.5">
          <h2 className="text-lg font-black tracking-tight uppercase leading-none">
            {data.name || 'Developer Name'}
          </h2>
          <p 
            className="text-[10px] font-bold uppercase tracking-wider opacity-85 px-2.5 py-0.5 rounded-md inline-block"
            style={{ 
              backgroundColor: activeTheme.badgeStyle === 'cyber' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              color: activeTheme.borderColor
            }}
          >
            {data.subtitle || 'Software Engineer'}
          </p>
        </div>

        {/* Skill tag pills */}
        {renderSkills()}
      </div>

      {/* Footer Dev Metrics Grid */}
      <div 
        className="w-full grid grid-cols-4 divide-x divide-black/5 dark:divide-white/5 border-t border-black/5 dark:border-white/5 py-3.5 bg-black/5 dark:bg-white/5 z-10"
      >
        {data.stats ? data.stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center px-1">
            <span className="text-[11px] font-black tracking-tight font-mono opacity-90 leading-none mb-0.5">
              {stat.value || '0'}
            </span>
            <span className="text-[7px] font-bold uppercase tracking-widest opacity-60 text-center leading-none">
              {stat.name}
            </span>
          </div>
        )) : (
          <div className="col-span-4 text-center text-[8px] opacity-60">NO METRICS CONFIGURED</div>
        )}
      </div>

      {/* Decorative scan line element for Cyber themes */}
      {activeTheme.badgeStyle === 'cyber' && (
        <div className="absolute top-0 left-0 w-full h-[1.5px] bg-white/20 pointer-events-none z-10 animate-shimmer" />
      )}
    </div>
  );
}
