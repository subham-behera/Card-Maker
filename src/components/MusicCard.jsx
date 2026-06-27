import React from 'react';
import { MUSIC_THEMES } from './Presets';
import { 
  Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Music 
} from 'lucide-react';

export default function MusicCard({ data }) {
  const activeTheme = MUSIC_THEMES.find(t => t.id === data.themeId) || MUSIC_THEMES[0];
  const { borderWidth } = data;

  // Calculate width percentage of progress bar
  const getProgressPercentage = () => {
    try {
      const getSeconds = (timeStr) => {
        const parts = timeStr.split(':').map(Number);
        return parts[0] * 60 + parts[1];
      };
      const current = getSeconds(data.progress || '0:00');
      const total = getSeconds(data.duration || '3:00');
      return Math.min((current / total) * 100, 100) + '%';
    } catch (e) {
      return '40%';
    }
  };

  return (
    <div 
      className="relative rounded-[24px] overflow-hidden flex flex-col justify-between select-none p-5"
      style={{
        width: '280px',
        height: '390px',
        background: activeTheme.bgGradient,
        border: `${borderWidth}px solid ${activeTheme.borderColor}`,
        color: activeTheme.textColor
      }}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-1.5">
          <Music size={12} style={{ color: activeTheme.activeColor }} />
          <span className="text-[10px] font-black tracking-widest uppercase opacity-75">
            NOW PLAYING
          </span>
        </div>
        <span className="text-[8px] font-mono opacity-50 font-bold">STUDIO CAPTURE</span>
      </div>

      {/* Album Cover Picture */}
      <div className="relative w-full aspect-square max-h-[160px] my-3 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow bg-slate-100 flex items-center justify-center border border-black/5 dark:border-white/5">
        {data.avatar ? (
          <img
            src={data.avatar}
            alt={data.name}
            className="w-full h-full object-cover transition-all"
            style={{
              transform: `scale(${data.avatarScale || 1.0}) translate(${(data.avatarX || 0)}px, ${(data.avatarY || 0)}px)`,
              filter: data.avatarFilter === 'grayscale' ? 'grayscale(100%)' :
                      data.avatarFilter === 'sepia' ? 'sepia(100%)' :
                      data.avatarFilter === 'vintage' ? 'contrast(120%) saturate(120%) hue-rotate(-20deg)' : 'none',
            }}
          />
        ) : (
          <div className="text-slate-400 text-xs text-center p-4">
            No Album Cover
          </div>
        )}
      </div>

      {/* Track Information */}
      <div className="text-left w-full space-y-0.5">
        <h3 className="text-[15px] font-black tracking-tight leading-tight truncate">
          {data.name || 'Song Title'}
        </h3>
        <p className="text-[11px] font-bold truncate" style={{ color: activeTheme.subColor }}>
          {data.artist || 'Artist Name'}
        </p>
        <p className="text-[9px] font-medium italic opacity-60 truncate">
          {data.album || 'Album Title'}
        </p>
      </div>

      {/* Audio Wave Visualizer */}
      <div className="w-full flex items-end justify-between h-[22px] px-1 py-1 opacity-80 gap-[3px]">
        {[12, 18, 14, 8, 16, 22, 12, 6, 14, 20, 15, 10, 18, 12, 8, 16, 10, 14, 20, 8, 12, 6].map((h, i) => (
          <div 
            key={i} 
            className="flex-1 rounded-sm"
            style={{ 
              height: `${h}px`, 
              backgroundColor: i % 3 === 0 ? activeTheme.activeColor : `${activeTheme.activeColor}70` 
            }}
          />
        ))}
      </div>

      {/* Playback Slider Bar */}
      <div className="w-full space-y-1 mt-1">
        <div className="relative w-full h-[3.5px] rounded-full overflow-hidden" style={{ backgroundColor: activeTheme.progressBg }}>
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{ 
              width: getProgressPercentage(),
              backgroundColor: activeTheme.activeColor
            }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-mono font-bold opacity-60">
          <span>{data.progress || '0:00'}</span>
          <span>{data.duration || '3:00'}</span>
        </div>
      </div>

      {/* Player Media Controls */}
      <div className="flex items-center justify-between w-full px-2 pt-1 border-t border-black/5 dark:border-white/5">
        <Shuffle size={14} className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity" />
        <SkipBack size={16} className="opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
        
        {/* Play pause circle button */}
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transform active:scale-95 transition-all text-white shadow-sm hover:scale-105"
          style={{ backgroundColor: activeTheme.activeColor }}
        >
          <Play size={14} fill="white" className="ml-0.5" />
        </div>
        
        <SkipForward size={16} className="opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
        <Repeat size={14} className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity" />
      </div>
    </div>
  );
}
