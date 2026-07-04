import React from 'react';
import { 
  QrCode, Mail, Globe, Award, Shield, Swords
} from 'lucide-react';

// === 1. MAGIC: THE GATHERING (MTG) CARD ===
export function MtgCard({ data }) {
  const getThemeStyles = () => {
    switch (data.themeId) {
      case 'mtg-red': return { bg: 'bg-[#5c2d1b]', text: 'text-stone-100', border: 'border-[#3a190f]', mana: '🔥' };
      case 'mtg-blue': return { bg: 'bg-[#2d4b68]', text: 'text-stone-100', border: 'border-[#1a2d3f]', mana: '💧' };
      case 'mtg-green': return { bg: 'bg-[#2e503b]', text: 'text-stone-100', border: 'border-[#1b3123]', mana: '🌿' };
      case 'mtg-black': return { bg: 'bg-[#3e3c3f]', text: 'text-stone-100', border: 'border-[#242224]', mana: '💀' };
      default: return { bg: 'bg-[#5c544d]', text: 'text-stone-100', border: 'border-[#3c3631]', mana: '☀️' };
    }
  };
  const theme = getThemeStyles();
  
  return (
    <div 
      className={`w-[280px] h-[390px] rounded-[16px] p-3 border-[4px] flex flex-col justify-between select-none ${theme.bg} ${theme.border} text-stone-100`}
    >
      <div className="border border-black/40 rounded-lg p-2 h-full flex flex-col justify-between bg-stone-900/10">
        {/* Title & Mana */}
        <div className="flex justify-between items-center bg-stone-100/10 border border-white/10 rounded px-2 py-0.5 shadow-sm">
          <span className="font-serif font-black text-xs uppercase tracking-wide">{data.name || 'Creature'}</span>
          <span className="text-xs">{theme.mana} {theme.mana}</span>
        </div>

        {/* Art Window */}
        <div className="w-full h-[155px] border-2 border-stone-800 rounded overflow-hidden my-1 bg-stone-950 flex items-center justify-center shadow-inner relative">
          {data.avatar ? (
            <img
              src={data.avatar}
              alt={data.name}
              className="w-full h-full object-cover"
              style={{
                transform: `scale(${data.avatarScale || 1.0}) translate(${(data.avatarX || 0)}px, ${(data.avatarY || 0)}px)`,
                filter: data.avatarFilter === 'grayscale' ? 'grayscale(100%)' : 'none'
              }}
            />
          ) : (
            <span className="text-stone-500 text-xs">Artwork</span>
          )}
        </div>

        {/* Type Line */}
        <div className="bg-stone-100/10 border border-white/10 rounded px-2 py-0.5 text-[9px] font-bold tracking-wide italic text-left shadow-sm">
          {data.species || 'Legendary Creature — Dragon'}
        </div>

        {/* Text Box */}
        <div className="flex-1 border border-black/20 rounded p-2 text-stone-800 text-[9.5px] leading-tight font-medium overflow-hidden my-1 bg-[#ede8df] text-left">
          <p className="font-serif italic opacity-90">{data.description || 'Rules & abilities description.'}</p>
        </div>

        {/* Power/Toughness */}
        <div className="flex justify-end">
          <span className="bg-stone-100/15 border border-white/10 rounded px-2.5 py-0.5 text-[11px] font-black font-mono tracking-wider shadow-sm">
            {data.atk || '5'} / {data.def || '5'}
          </span>
        </div>
      </div>
    </div>
  );
}


export function BusinessCard({ data }) {
  return (
    <div className="w-[280px] h-[390px] bg-slate-900 border border-slate-800 rounded-[20px] p-5 flex flex-col justify-between select-none text-slate-100 relative overflow-hidden">
      {/* Abstract Design shapes */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-xl pointer-events-none" />

      {/* Header Profile Info */}
      <div className="flex items-start justify-between">
        <div className="text-left space-y-1">
          <span className="text-[8px] font-black uppercase text-indigo-400 tracking-widest">DIGITAL PROFILE</span>
          <h2 className="text-base font-black tracking-tight leading-none uppercase">{data.name || 'CARD HOLDER'}</h2>
          <p className="text-[10px] font-bold text-slate-400">{data.subtitle || 'Role Title'}</p>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-700 bg-slate-800 shadow-sm p-0.5">
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-200">
            {data.avatar && (
              <img src={data.avatar} className="w-full h-full object-cover" alt="" />
            )}
          </div>
        </div>
      </div>

      {/* QR Code section */}
      <div className="flex flex-col items-center justify-center my-4">
        <div className="p-3 bg-white border border-slate-700 rounded-xl shadow-md flex items-center justify-center">
          <QrCode size={90} className="text-slate-900" />
        </div>
        <span className="text-[8px] font-bold tracking-widest text-slate-500 mt-2 uppercase">
          SCAN TO CONNECT
        </span>
      </div>

      {/* Footer Info details */}
      <div className="border-t border-slate-800 pt-3 space-y-1.5 text-left text-[9.5px] text-slate-400 font-semibold">
        <div className="flex items-center gap-2">
          <Mail size={11} className="text-indigo-400" />
          <span>{data.email || 'info@company.com'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe size={11} className="text-indigo-400" />
          <span>{data.company || 'www.company.com'}</span>
        </div>
      </div>
    </div>
  );
}

// === 6. PREMIUM METAL CREDIT CARD ===
export function CreditCard({ data }) {
  return (
    <div className="w-[280px] h-[390px] bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 rounded-[20px] p-6 flex flex-col justify-between select-none text-slate-100 relative overflow-hidden">
      {/* Diagonal metallic shine lines */}
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_45%,rgba(255,255,255,0.05)_50%,transparent_55%)] pointer-events-none" />

      {/* Header brand */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">AETHER CAPITAL</span>
        <span className="text-[8px] font-mono text-slate-500 font-bold">METAL PLATINUM</span>
      </div>

      {/* SIM Chip & NFC */}
      <div className="flex items-center justify-between pt-4">
        <div className="w-10 h-7 bg-amber-500/25 border border-amber-500/40 rounded-md shadow-inner flex flex-wrap p-0.5 gap-0.5">
          <div className="w-[8px] h-full bg-amber-500/30 rounded" />
          <div className="w-[12px] h-full bg-amber-500/30 rounded" />
          <div className="w-[8px] h-full bg-amber-500/30 rounded" />
        </div>
        <div className="text-[9px] font-mono text-slate-500 rotate-90 leading-none">NFC</div>
      </div>

      {/* Credit Card Number */}
      <div className="text-left py-4">
        <h3 className="text-sm font-bold font-mono tracking-[4px] text-amber-500/95 leading-none">
          {data.cardNumber || '4712 9403 1827 9402'}
        </h3>
      </div>

      {/* Details (Holder & Expiry) */}
      <div className="flex justify-between items-end">
        <div className="text-left space-y-1">
          <span className="text-[7px] text-slate-500 uppercase tracking-widest leading-none block">CARD HOLDER</span>
          <span className="text-[10px] font-bold uppercase tracking-wider block">{data.name || 'HOLDER NAME'}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[7px] text-slate-500 uppercase tracking-widest leading-none block">EXPIRES</span>
            <span className="text-[9px] font-bold font-mono block">{data.duration || '09/29'}</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs">
            🌐
          </div>
        </div>
      </div>
    </div>
  );
}

// === 7. D&D CHARACTER CARD ===
export function DndCard({ data }) {
  return (
    <div className="w-[280px] h-[390px] bg-[#f2e6d0] border-[5px] border-[#5c4a37] rounded-lg p-3.5 flex flex-col justify-between select-none text-[#3e2c1c] font-serif">
      <div className="border border-[#8c6d4f] rounded p-2 h-full flex flex-col justify-between bg-[#fbf5e6]/50">
        {/* Header Details */}
        <div className="text-left border-b border-[#8c6d4f]/30 pb-1.5 flex justify-between items-start">
          <div>
            <h3 className="text-sm font-black uppercase tracking-tight leading-none text-[#2b1f14]">{data.name || 'DND CHARACTER'}</h3>
            <span className="text-[8px] uppercase tracking-wide opacity-80 mt-0.5 block">{data.species || 'Human Paladin'}</span>
          </div>
          <div className="bg-[#5c4a37] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase leading-none shadow-sm">
            LVL {data.level || '5'}
          </div>
        </div>

        {/* Character Miniature */}
        <div className="w-full h-[120px] border-2 border-[#5c4a37] rounded overflow-hidden my-2 bg-stone-950 flex items-center justify-center relative shadow-inner">
          {data.avatar ? (
            <img src={data.avatar} className="w-full h-full object-cover" alt="" />
          ) : (
            <span className="text-stone-600 text-[10px]">Add Mini Photo</span>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-6 gap-1 border-y border-[#8c6d4f]/30 py-2 my-1.5 text-center">
          {[
            { label: 'STR', val: '16' },
            { label: 'DEX', val: '12' },
            { label: 'CON', val: '14' },
            { label: 'INT', val: '10' },
            { label: 'WIS', val: '13' },
            { label: 'CHA', val: '15' }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col bg-[#ede2c8] p-0.5 rounded border border-[#c1ad8b]">
              <span className="text-[7px] font-bold font-sans opacity-70 leading-none">{stat.label}</span>
              <span className="text-[10px] font-black leading-none mt-0.5">{stat.val}</span>
            </div>
          ))}
        </div>

        {/* DND Attributes details */}
        <div className="grid grid-cols-3 gap-2 text-[9px] text-[#2b1f14] font-semibold text-left">
          <div className="flex items-center gap-1">
            <Swords size={11} className="text-[#8c6d4f]" />
            <span>AC: {data.rating || '18'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield size={11} className="text-[#8c6d4f]" />
            <span>HP: {data.hp || '42'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Award size={11} className="text-[#8c6d4f]" />
            <span>Speed: 30ft</span>
          </div>
        </div>
      </div>
    </div>
  );
}

