import React from 'react';
import { FUT_THEMES } from './Presets';

export default function FutCard({ data }) {
  const activeTheme = FUT_THEMES.find(t => t.id === data.themeId) || FUT_THEMES[0];
  const { borderWidth } = data;

  // Render stats section
  const renderStats = () => {
    if (!data.stats) return null;
    
    // Group into 2 columns of 3 stats each
    const leftCol = data.stats.slice(0, 3);
    const rightCol = data.stats.slice(3, 6);

    const StatItem = ({ stat }) => (
      <div className="flex items-center justify-between text-[11px] font-bold tracking-wider py-0.5 px-2">
        <span style={{ color: activeTheme.textColor }} className="opacity-80 font-mono text-[12px]">{stat.value}</span>
        <span style={{ color: activeTheme.textColor }} className="font-semibold">{stat.name}</span>
      </div>
    );

    return (
      <div className="grid grid-cols-2 gap-x-2 divide-x divide-black/10 mt-2 px-4 border-t border-black/5 pt-1.5">
        <div className="flex flex-col">
          {leftCol.map((s, i) => <StatItem key={i} stat={s} />)}
        </div>
        <div className="flex flex-col pl-2">
          {rightCol.map((s, i) => <StatItem key={i} stat={s} />)}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="fifa-card-clip relative select-none"
      style={{
        width: '280px',
        height: '390px',
        background: activeTheme.borderColor,
        padding: `${borderWidth}px`
      }}
    >
      <div 
        className="fifa-card-inner-clip w-full h-full relative overflow-hidden flex flex-col justify-between"
        style={{
          background: activeTheme.bgGradient,
        }}
      >
        {/* Dynamic Abstract Design Lines in Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[150%] rotate-45 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0px,rgba(255,255,255,0.1)_10px,transparent_10px,transparent_20px)]" />
        </div>

        {/* Card Header Section: Stats & Avatar */}
        <div className="flex justify-between items-start pt-8 px-4 h-[220px] relative">
          
          {/* Left Side: Rating, Position, Nation, Club */}
          <div className="flex flex-col items-center justify-center space-y-1 z-10 mt-2">
            <span 
              className="text-4xl font-extrabold tracking-tighter leading-none"
              style={{ color: activeTheme.textColor }}
            >
              {data.rating}
            </span>
            <span 
              className="text-sm font-black tracking-widest uppercase leading-none opacity-90"
              style={{ color: activeTheme.textColor }}
            >
              {data.position}
            </span>
            
            {/* Nation Flag */}
            <div className="w-8 h-5 overflow-hidden rounded-sm shadow-sm border border-black/5 bg-slate-200 mt-1 flex items-center justify-center">
              {data.country ? (
                <img 
                  src={`https://flagcdn.com/w40/${getCountryCode(data.country)}.png`} 
                  alt={data.country}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `<span class="text-[8px] font-bold text-slate-800">${data.country.substring(0, 3).toUpperCase()}</span>`;
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[8px] font-bold text-slate-700">ARG</span>
              )}
            </div>

            {/* Club Crest Placeholder */}
            <div 
              className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center overflow-hidden shadow-sm mt-1 p-0.5"
              style={{ backgroundColor: activeTheme.accentBg }}
            >
              {data.club ? (
                <div 
                  className="text-[9px] font-black tracking-tighter text-center leading-none"
                  style={{ color: activeTheme.textColor }}
                >
                  {data.club.split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase()}
                </div>
              ) : (
                <span className="text-[10px]">⚽</span>
              )}
            </div>
          </div>

          {/* Right Side: Player Picture Container */}
          <div className="absolute right-0 bottom-0 w-[190px] h-[220px] overflow-hidden flex items-end justify-center pointer-events-none">
            {data.avatar ? (
              <img
                src={data.avatar}
                alt={data.name}
                className="max-w-none object-cover origin-bottom transition-all"
                style={{
                  width: `${(data.avatarScale || 1.0) * 160}px`,
                  transform: `translateX(${(data.avatarX || 0)}px) translateY(${(data.avatarY || 0)}px)`,
                  filter: data.avatarFilter === 'grayscale' ? 'grayscale(100%)' :
                          data.avatarFilter === 'sepia' ? 'sepia(100%)' :
                          data.avatarFilter === 'vintage' ? 'contrast(120%) saturate(120%) hue-rotate(-20deg)' : 'none',
                }}
              />
            ) : (
              <div className="w-[140px] h-[195px] flex items-center justify-center border-2 border-dashed border-black/10 rounded-lg text-slate-400 text-xs">
                No Photo
              </div>
            )}
            
            {/* Fade overlay at the bottom of player image */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${activeTheme.bgGradient.match(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g)?.pop() || '#1e59bc'} 0%, transparent 100%)`
              }}
            />
          </div>
        </div>

        {/* Card Footer Section: Name and Stats */}
        <div className="flex flex-col justify-end pb-8 z-10">
          {/* Player Name */}
          <div className="text-center">
            <h3 
              className="text-lg font-black tracking-widest uppercase border-t border-black/5 pt-1.5 mx-6"
              style={{ 
                color: activeTheme.textColor,
                textShadow: activeTheme.textColor === '#ffffff' ? '0 1px 3px rgba(0,0,0,0.3)' : 'none'
              }}
            >
              {data.name}
            </h3>
          </div>

          {/* Stats grid */}
          {renderStats()}
        </div>
      </div>
    </div>
  );
}

// Helper to convert country names to FlagCDN codes
function getCountryCode(country) {
  const codes = {
    'argentina': 'ar', 'portugal': 'pt', 'brazil': 'br', 'france': 'fr', 'england': 'gb', 
    'spain': 'es', 'germany': 'de', 'italy': 'it', 'netherlands': 'nl', 'belgium': 'be', 
    'usa': 'us', 'canada': 'ca', 'mexico': 'mx', 'japan': 'jp', 'korea': 'kr', 
    'india': 'in', 'australia': 'au', 'croatia': 'hr', 'uruguay': 'uy'
  };
  return codes[country.toLowerCase()] || 'ar';
}
