import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { 
  Sparkles, Grid, Eye, Compass, RefreshCw, 
  Layers, Settings, Laptop, Info
} from 'lucide-react';

import { CARD_TYPES, PRESETS } from './components/Presets';
import CardWrapper from './components/CardWrapper';
import FutCard from './components/FutCard';
import PokemonCard from './components/PokemonCard';
import DevBadge from './components/DevBadge';
import YugiohCard from './components/YugiohCard';
import MusicCard from './components/MusicCard';
import EsportsCard from './components/EsportsCard';
import { 
  MtgCard, 
  BusinessCard, 
  CreditCard, 
  DndCard
} from './components/ExtraCards';
import EditorPanel from './components/EditorPanel';

// Helper to determine the outer glow color of each card theme
const getCardGlowColor = (data) => {
  switch (data.cardType) {
    case CARD_TYPES.FUT:
      if (data.themeId === 'toty') return '#1e59bc';
      if (data.themeId === 'cyber-fut') return '#7c00ff';
      return '#ffe259';
    case CARD_TYPES.POKEMON:
      if (data.type === 'fire') return '#ff5858';
      if (data.type === 'water') return '#1e59bc';
      return '#38ef7d';
    case CARD_TYPES.YUGIOH:
      if (data.themeId === 'spell-card') return '#1e9d85';
      if (data.themeId === 'trap-card') return '#b52c65';
      return '#cf7d3d';
    case CARD_TYPES.MUSIC:
      if (data.themeId === 'spotify-dark') return '#1db954';
      if (data.themeId === 'spotify-light') return '#16a34a';
      return '#d4af37';
    case CARD_TYPES.ESPORTS:
      if (data.themeId === 'valorant-red') return '#ff4655';
      if (data.themeId === 'radiant-yellow') return '#fbbf24';
      return '#00ffff';
    case CARD_TYPES.MTG:
      if (data.themeId === 'mtg-red') return '#f87171';
      if (data.themeId === 'mtg-blue') return '#60a5fa';
      if (data.themeId === 'mtg-green') return '#34d399';
      if (data.themeId === 'mtg-black') return '#a78bfa';
      return '#fbbf24';
    case CARD_TYPES.BUSINESS:
      return '#818cf8';
    case CARD_TYPES.CREDIT:
      return '#f59e0b';
    case CARD_TYPES.DND:
      return '#b45309';
    default:
      return '#10b981';
  }
};

export default function App() {
  // Master Card State initialized with the FUT Messi preset
  const [cardData, setCardData] = useState(PRESETS[CARD_TYPES.FUT]);
  const [previewBg, setPreviewBg] = useState('grid-light');
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef(null);

  // Randomize stats for the currently selected template
  const handleRandomizeStats = () => {
    setCardData(prev => {
      const updated = { ...prev };
      if (prev.cardType === CARD_TYPES.FUT) {
        updated.stats = prev.stats.map(s => ({
          ...s,
          value: Math.floor(Math.random() * (99 - 50 + 1) + 50)
        }));
        updated.rating = Math.floor(Math.random() * (99 - 70 + 1) + 70).toString();
      } else if (prev.cardType === CARD_TYPES.POKEMON) {
        updated.hp = Math.floor(Math.random() * (250 - 50 + 1) + 50).toString();
        updated.attack1Damage = (Math.floor(Math.random() * 8 + 1) * 10).toString();
        updated.attack2Damage = (Math.floor(Math.random() * 15 + 5) * 10).toString();
      } else if (prev.cardType === CARD_TYPES.DEV) {
        updated.stats = prev.stats.map(s => {
          let val = '0';
          if (s.name.includes('Commits')) val = (Math.random() * 10).toFixed(1) + 'k';
          if (s.name.includes('Bugs')) val = Math.floor(Math.random() * 1000).toString();
          if (s.name.includes('Coffee')) val = Math.floor(Math.random() * 500).toString();
          if (s.name.includes('PRs')) val = Math.floor(Math.random() * 300).toString();
          return { ...s, value: val };
        });
      } else if (prev.cardType === CARD_TYPES.YUGIOH) {
        updated.level = Math.floor(Math.random() * (12 - 1 + 1) + 1);
        updated.atk = (Math.floor(Math.random() * 41 + 10) * 100).toString(); // Multiples of 100 from 1000 to 5000
        updated.def = (Math.floor(Math.random() * 41 + 10) * 100).toString();
      } else if (prev.cardType === CARD_TYPES.MUSIC) {
        // Randomize track progress minutes/seconds
        const min = Math.floor(Math.random() * 3);
        const sec = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        updated.progress = `${min}:${sec}`;
      } else if (prev.cardType === CARD_TYPES.ESPORTS) {
        updated.stats = prev.stats.map(s => {
          let val = '0';
          if (s.name.includes('ACS')) val = Math.floor(Math.random() * (350 - 180 + 1) + 180).toString();
          if (s.name.includes('K/D')) val = (Math.random() * (1.8 - 0.8) + 0.8).toFixed(2);
          if (s.name.includes('HS')) val = Math.floor(Math.random() * (45 - 15 + 1) + 15) + '%';
          if (s.name.includes('Win')) val = Math.floor(Math.random() * (80 - 45 + 1) + 45) + '%';
          return { ...s, value: val };
        });
      } else if (prev.cardType === CARD_TYPES.MTG) {
        updated.atk = Math.floor(Math.random() * 9 + 1).toString();
        updated.def = Math.floor(Math.random() * 9 + 1).toString();
      } else if (prev.cardType === CARD_TYPES.DND) {
        updated.level = Math.floor(Math.random() * 20 + 1);
        updated.hp = Math.floor(Math.random() * 90 + 10).toString();
        updated.rating = Math.floor(Math.random() * 12 + 10).toString();
      }
      return updated;
    });
  };

  // High Resolution Card Export
  const handleExportPNG = async () => {
    if (!cardRef.current || isExporting) return;
    
    setIsExporting(true);
    const cardElement = cardRef.current;
    
    // Temporarily flatten all 3D transforms so html-to-image captures a clean image
    const prevTransform = cardElement.style.transform;
    const prevBoxShadow = cardElement.style.boxShadow;
    cardElement.style.transform = 'none';
    cardElement.style.boxShadow = 'none';
    
    // Wait for repaint
    await new Promise(resolve => setTimeout(resolve, 150));

    toPng(cardElement, {
      pixelRatio: 3, // 3x multiplier for ultra-high-resolution details
      cacheBust: true,
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${(cardData.name || 'custom-card').toLowerCase().replace(/\s+/g, '-')}-card.png`;
        link.href = dataUrl;
        link.click();
        
        // Restore original styles
        cardElement.style.transform = prevTransform;
        cardElement.style.boxShadow = prevBoxShadow;
        setIsExporting(false);
        
        // Celebrate!
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#10b981', '#f5af19', '#ff5858', '#8b5cf6']
        });
      })
      .catch((err) => {
        console.error('PNG export failed', err);
        cardElement.style.transform = prevTransform;
        cardElement.style.boxShadow = prevBoxShadow;
        setIsExporting(false);
      });
  };

  // Switch card renderer component based on chosen type
  const renderCardBody = () => {
    switch (cardData.cardType) {
      case CARD_TYPES.FUT:
        return <FutCard data={cardData} />;
      case CARD_TYPES.POKEMON:
        return <PokemonCard data={cardData} />;
      case CARD_TYPES.DEV:
        return <DevBadge data={cardData} />;
      case CARD_TYPES.YUGIOH:
        return <YugiohCard data={cardData} />;
      case CARD_TYPES.MUSIC:
        return <MusicCard data={cardData} />;
      case CARD_TYPES.ESPORTS:
        return <EsportsCard data={cardData} />;
      case CARD_TYPES.MTG:
        return <MtgCard data={cardData} />;
      case CARD_TYPES.BUSINESS:
        return <BusinessCard data={cardData} />;
      case CARD_TYPES.CREDIT:
        return <CreditCard data={cardData} />;
      case CARD_TYPES.DND:
        return <DndCard data={cardData} />;
      default:
        return null;
    }
  };

  // Select preview backgrounds
  const getPreviewBgClass = () => {
    switch (previewBg) {
      case 'grid-light':
        return 'bg-slate-50 bg-grid-pattern';
      case 'dots':
        return 'bg-slate-50 bg-dot-pattern';
      case 'gradient':
        return 'bg-gradient-to-tr from-blue-50 via-indigo-50 to-purple-50';
      case 'solid-white':
        return 'bg-white border border-slate-100';
      case 'studio-dark':
        return 'bg-slate-900 bg-grid-pattern opacity-95';
      default:
        return 'bg-slate-50';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl text-white shadow-md shadow-blue-500/20">
              <Sparkles size={22} className="animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-slate-800 flex items-center gap-2">
                Card & Badge Studio
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  V1.2
                </span>
              </h1>
              <p className="text-[11px] font-semibold text-slate-400">
                Design stunning FUT Cards, Pokémon Cards, and Developer ID Badges
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
              <Laptop size={14} /> Responsive Sandbox
            </span>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
        
        {/* Left column: Card Canvas Sandbox */}
        <div className="flex-1 flex flex-col gap-4">
          
          {/* Studio Environment Settings */}
          <div className="bg-white p-3.5 border border-slate-200/80 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Eye size={15} className="text-slate-500" />
              <span className="text-xs font-black uppercase text-slate-400">Preview Background</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'grid-light', label: 'Light Grid' },
                { id: 'dots', label: 'Dot Grid' },
                { id: 'gradient', label: 'Pastel Radial' },
                { id: 'solid-white', label: 'Pure White' },
                { id: 'studio-dark', label: 'Dark Studio' }
              ].map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setPreviewBg(bg.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                    previewBg === bg.id
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {bg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Card Viewport Canvas Container */}
          <div 
            className={`flex-1 min-h-[460px] lg:min-h-0 rounded-3xl flex flex-col items-center justify-center relative transition-all duration-300 shadow-inner overflow-hidden ${getPreviewBgClass()}`}
          >
            {/* Helpful Tilt Instruction overlay */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md py-1 px-3 rounded-full border border-slate-200/50 text-[10px] font-black tracking-widest text-slate-500 uppercase shadow-sm pointer-events-none z-10 whitespace-nowrap">
              <Compass size={12} className="animate-pulse" /> Hover card for 3D Hologram Tilt
            </div>

            {/* Tilt Wrapper component */}
            <div ref={cardRef} className="relative z-10 transition-all select-none">
              <CardWrapper 
                glowIntensity={cardData.glowIntensity} 
                glowColor={getCardGlowColor(cardData)}
                holoPattern={cardData.holoPattern || 'none'}
                exportRef={cardRef}
              >
                {renderCardBody()}
              </CardWrapper>
            </div>
            
            {/* Quick action overlay below card */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              <button 
                onClick={handleRandomizeStats}
                className="py-1.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <RefreshCw size={12} className="opacity-75" />
                Randomize Attributes
              </button>
            </div>
          </div>
        </div>

        {/* Right column: Editor Settings Sidebar */}
        <EditorPanel 
          cardData={cardData} 
          setCardData={setCardData} 
          onExport={handleExportPNG}
          onRandomize={handleRandomizeStats}
        />
        
      </main>

      {/* Modern Footer info */}
      <footer className="bg-white border-t border-slate-200/80 py-4 px-6 text-center text-xs font-semibold text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© 2026 Card Designer Studio. Powered by React + TailwindCSS.</p>
          <p className="flex items-center gap-1">
            <Info size={12} /> Designed with high-performance 3D graphics filters.
          </p>
        </div>
      </footer>
    </div>
  );
}
