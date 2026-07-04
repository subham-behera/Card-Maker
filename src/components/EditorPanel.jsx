import React, { useState, useEffect } from 'react';
import { 
  Palette, Image as ImageIcon, FileText, FolderHeart, 
  Upload, Sparkles, RefreshCw, Plus, Trash2, Award
} from 'lucide-react';
import { 
  CARD_TYPES, FUT_THEMES, POKEMON_THEMES, DEV_THEMES, YUGIOH_THEMES, MUSIC_THEMES, ESPORTS_THEMES, MTG_THEMES, PRESETS 
} from './Presets';
import { TYPE_METADATA } from './PokemonCard';

export default function EditorPanel({ 
  cardData, 
  setCardData, 
  onExport, 
  onRandomize 
}) {
  const [activeTab, setActiveTab] = useState('style');
  const [savedCards, setSavedCards] = useState([]);
  const [saveName, setSaveName] = useState('');

  // Load saved designs on mount
  useEffect(() => {
    const saved = localStorage.getItem('custom-card-designer-collection');
    if (saved) {
      try {
        setSavedCards(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved cards', e);
      }
    }
  }, []);

  // Update a single field in card state
  const updateField = (field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update a stat in the stats array
  const updateStat = (index, value, name = null) => {
    setCardData(prev => {
      const newStats = [...prev.stats];
      newStats[index] = {
        ...newStats[index],
        value: value,
        ...(name && { name })
      };
      return { ...prev, stats: newStats };
    });
  };

  // Handle local file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateField('avatar', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Switch template and load template defaults
  const handleTemplateSwitch = (type) => {
    const defaultData = PRESETS[type];
    setCardData(defaultData);
  };

  // Save card to localStorage
  const handleSaveCard = () => {
    const nameToUse = saveName.trim() || `${cardData.name || 'Untitled'} (${cardData.cardType.toUpperCase()})`;
    const newSave = {
      id: Date.now().toString(),
      displayName: nameToUse,
      data: cardData
    };
    const updated = [newSave, ...savedCards];
    setSavedCards(updated);
    localStorage.setItem('custom-card-designer-collection', JSON.stringify(updated));
    setSaveName('');
  };

  // Load saved card
  const handleLoadSavedCard = (savedItem) => {
    setCardData(savedItem.data);
  };

  // Delete saved card
  const handleDeleteSavedCard = (id, e) => {
    e.stopPropagation();
    const updated = savedCards.filter(c => c.id !== id);
    setSavedCards(updated);
    localStorage.setItem('custom-card-designer-collection', JSON.stringify(updated));
  };

  const currentType = cardData.cardType;

  // Gather current themes based on card template type
  const getThemeList = () => {
    if (currentType === CARD_TYPES.FUT) return FUT_THEMES;
    if (currentType === CARD_TYPES.POKEMON) return POKEMON_THEMES;
    if (currentType === CARD_TYPES.YUGIOH) return YUGIOH_THEMES;
    if (currentType === CARD_TYPES.MUSIC) return MUSIC_THEMES;
    if (currentType === CARD_TYPES.ESPORTS) return ESPORTS_THEMES;
    if (currentType === CARD_TYPES.MTG) return MTG_THEMES;
    return [];
  };

  return (
    <div className="w-full lg:w-[440px] bg-white border border-slate-200/80 rounded-2xl shadow-xl flex flex-col h-full overflow-hidden">
      {/* Settings Navigation Tabs */}
      <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-100 p-1">
        <button
          onClick={() => setActiveTab('style')}
          className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl text-[10px] font-bold transition-all ${
            activeTab === 'style' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Palette size={16} className="mb-1" />
          Theme
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl text-[10px] font-bold transition-all ${
            activeTab === 'image' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ImageIcon size={16} className="mb-1" />
          Photo
        </button>
        <button
          onClick={() => setActiveTab('text')}
          className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl text-[10px] font-bold transition-all ${
            activeTab === 'text' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText size={16} className="mb-1" />
          Details
        </button>
        <button
          onClick={() => setActiveTab('collection')}
          className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl text-[10px] font-bold transition-all ${
            activeTab === 'collection' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FolderHeart size={16} className="mb-1" />
          Saves ({savedCards.length})
        </button>
      </div>

      {/* Editor Content Area (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        
        {/* Style & Theme Tab */}
        {activeTab === 'style' && (
          <div className="space-y-5">
            {/* Template Type Selector Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-black tracking-wider uppercase text-slate-500 block">Select Card Template Layout</label>
              <select
                value={currentType}
                onChange={(e) => handleTemplateSwitch(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <optgroup label="👾 GAMING & ESPORTS">
                  <option value="fut">EA FC FUT Shield</option>
                  <option value="pokemon">Pokémon TCG Card</option>
                  <option value="yugioh">Yu-Gi-Oh! TCG Card</option>
                  <option value="mtg">Magic: The Gathering</option>
                  <option value="esports">Valorant Profile Card</option>
                </optgroup>
                <optgroup label="🎵 MUSIC">
                  <option value="music">Spotify Music Player</option>
                </optgroup>
                <optgroup label="👔 PROFESSIONAL & BRANDING">
                  <option value="dev">Developer Tech Badge</option>
                  <option value="business">Digital Business QR Card</option>
                  <option value="credit">Premium Metal Credit Card</option>
                </optgroup>
                <optgroup label="🐉 ADVENTURE">
                  <option value="dnd">D&D Character Card</option>
                </optgroup>
              </select>
            </div>

            {/* Presets Quick Load */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black tracking-wider uppercase text-slate-500 block">Quick Preset</label>
                <button 
                  onClick={onRandomize}
                  className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full"
                >
                  <RefreshCw size={10} /> Randomize Stats
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCardData(PRESETS[currentType])}
                  className="py-1.5 px-3 rounded-lg border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <RefreshCw size={12} className="opacity-70" /> Reset Default
                </button>
                <div className="text-[10px] text-slate-400 flex items-center justify-center italic">
                  Loaded preset: {cardData.name}
                </div>
              </div>
            </div>

            {/* Theme Skins Select */}
            {getThemeList().length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-black tracking-wider uppercase text-slate-500 block">Theme Skin / Border Color</label>
                <select
                  value={cardData.themeId}
                  onChange={(e) => updateField('themeId', e.target.value)}
                  className="w-full py-2 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {getThemeList().map((theme) => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Border Width Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Card Border Width</span>
                <span>{cardData.borderWidth}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={cardData.borderWidth}
                onChange={(e) => updateField('borderWidth', Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Glow Intensity Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Holographic Outer Glow</span>
                <span>{cardData.glowIntensity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={cardData.glowIntensity}
                onChange={(e) => updateField('glowIntensity', Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Holo Overlay Reflection Selection */}
            <div className="space-y-2">
              <label className="text-xs font-black tracking-wider uppercase text-slate-500 block">Holographic Overlay Effect</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none', label: 'No Foil Shine' },
                  { id: 'glass-glare', label: 'Glass Glare' },
                  { id: 'diagonal-stripes', label: 'Prism Stripes' },
                  { id: 'sparkle', label: 'Cosmic Sparkle' }
                ].map((foil) => (
                  <button
                    key={foil.id}
                    onClick={() => {
                      // We must inject a temporary or updated state
                      // But CardWrapper reads this from App. We can pass it or update holoPattern field.
                      // Wait! The parent handles rendering cardWrapper, let's keep the option stored in cardData
                      updateField('holoPattern', foil.id);
                    }}
                    className={`py-1.5 px-2.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      (cardData.holoPattern || 'none') === foil.id
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Sparkles size={12} className="opacity-75" />
                    {foil.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Character Image Tab */}
        {activeTab === 'image' && (
          <div className="space-y-5">
            {/* Image Source & Upload */}
            <div className="space-y-2">
              <label className="text-xs font-black tracking-wider uppercase text-slate-500 block">Character Image Source</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste Image URL..."
                  value={cardData.avatar.startsWith('data:') ? '' : cardData.avatar}
                  onChange={(e) => updateField('avatar', e.target.value)}
                  className="flex-1 text-xs py-2 px-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <label className="py-2 px-3 bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm">
                  <Upload size={12} />
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Scale Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Scale / Zoom</span>
                <span>{(cardData.avatarScale || 1.0).toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={cardData.avatarScale || 1.0}
                onChange={(e) => updateField('avatarScale', Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Offset X Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Offset Horizontal (X)</span>
                <span>{cardData.avatarX || 0}px</span>
              </div>
              <input
                type="range"
                min="-120"
                max="120"
                step="1"
                value={cardData.avatarX || 0}
                onChange={(e) => updateField('avatarX', Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Offset Y Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Offset Vertical (Y)</span>
                <span>{cardData.avatarY || 0}px</span>
              </div>
              <input
                type="range"
                min="-120"
                max="120"
                step="1"
                value={cardData.avatarY || 0}
                onChange={(e) => updateField('avatarY', Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Image Filters */}
            <div className="space-y-2">
              <label className="text-xs font-black tracking-wider uppercase text-slate-500 block">Render Filter Style</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none', label: 'Default Vivid' },
                  { id: 'grayscale', label: 'Noir Grayscale' },
                  { id: 'sepia', label: 'Classic Sepia' },
                  { id: 'vintage', label: 'Cyber Contrast' }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => updateField('avatarFilter', filter.id)}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition-all ${
                      (cardData.avatarFilter || 'none') === filter.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats & Info Tab */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            
            {/* FIFA Layout Inputs */}
            {currentType === CARD_TYPES.FUT && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Player Name</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">OVR Rating</label>
                    <input
                      type="text"
                      maxLength={3}
                      value={cardData.rating}
                      onChange={(e) => updateField('rating', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Position</label>
                    <input
                      type="text"
                      maxLength={3}
                      value={cardData.position}
                      onChange={(e) => updateField('position', e.target.value.toUpperCase())}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Country Flag</label>
                    <input
                      type="text"
                      placeholder="e.g. Argentina"
                      value={cardData.country}
                      onChange={(e) => updateField('country', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Club Crest</label>
                    <input
                      type="text"
                      placeholder="e.g. Inter Miami"
                      value={cardData.club}
                      onChange={(e) => updateField('club', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* FUT Stats Slider Grid */}
                <div className="space-y-2 mt-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 block">Attribute Scores</label>
                  <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {cardData.stats?.map((stat, i) => (
                      <div key={i} className="space-y-0.5">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <input 
                            type="text" 
                            value={stat.name} 
                            maxLength={3}
                            onChange={(e) => updateStat(i, stat.value, e.target.value.toUpperCase())}
                            className="w-10 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 font-extrabold focus:outline-none"
                          />
                          <span>{stat.value}</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="99"
                          value={stat.value}
                          onChange={(e) => updateStat(i, Number(e.target.value))}
                          className="w-full accent-blue-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Pokemon Layout Inputs */}
            {currentType === CARD_TYPES.POKEMON && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Pokémon Name</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">HP Value</label>
                    <input
                      type="number"
                      value={cardData.hp}
                      onChange={(e) => updateField('hp', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Stage Text</label>
                    <input
                      type="text"
                      value={cardData.stage}
                      onChange={(e) => updateField('stage', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Energy Type</label>
                    <select
                      value={cardData.type}
                      onChange={(e) => updateField('type', e.target.value)}
                      className="w-full py-1.5 px-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      {Object.keys(TYPE_METADATA).map(k => (
                        <option key={k} value={k}>
                          {TYPE_METADATA[k].icon} {k.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Retreat Cost</label>
                    <input
                      type="number"
                      min="0"
                      max="4"
                      value={cardData.retreatCost}
                      onChange={(e) => updateField('retreatCost', Number(e.target.value))}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Species/Dimensions Banner</label>
                  <input
                    type="text"
                    value={cardData.species}
                    onChange={(e) => updateField('species', e.target.value)}
                    className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Attack 1 Setup */}
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-500 block">Primary Move (Attack 1)</span>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Attack Name"
                      value={cardData.attack1Name}
                      onChange={(e) => updateField('attack1Name', e.target.value)}
                      className="col-span-2 py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Damage"
                      value={cardData.attack1Damage}
                      onChange={(e) => updateField('attack1Damage', e.target.value)}
                      className="py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold text-center focus:outline-none bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-0.5">
                      <label className="text-[9px] font-extrabold text-slate-400">Energy Costs</label>
                      <input
                        type="text"
                        placeholder="fire, colorless"
                        value={Array.isArray(cardData.attack1Cost) ? cardData.attack1Cost.join(', ') : cardData.attack1Cost}
                        onChange={(e) => updateField('attack1Cost', e.target.value.split(',').map(s => s.trim()))}
                        className="w-full py-1 px-2 border border-slate-200 rounded text-[11px] focus:outline-none bg-white font-mono"
                      />
                    </div>
                    <div className="col-span-2 space-y-0.5">
                      <label className="text-[9px] font-extrabold text-slate-400">Move Description</label>
                      <input
                        type="text"
                        placeholder="Description..."
                        value={cardData.attack1Desc}
                        onChange={(e) => updateField('attack1Desc', e.target.value)}
                        className="w-full py-1 px-2 border border-slate-200 rounded text-[11px] focus:outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Attack 2 Setup */}
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-500 block">Secondary Move (Attack 2)</span>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Attack Name"
                      value={cardData.attack2Name}
                      onChange={(e) => updateField('attack2Name', e.target.value)}
                      className="col-span-2 py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Damage"
                      value={cardData.attack2Damage}
                      onChange={(e) => updateField('attack2Damage', e.target.value)}
                      className="py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold text-center focus:outline-none bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-0.5">
                      <label className="text-[9px] font-extrabold text-slate-400">Energy Costs</label>
                      <input
                        type="text"
                        placeholder="water, water"
                        value={Array.isArray(cardData.attack2Cost) ? cardData.attack2Cost.join(', ') : cardData.attack2Cost}
                        onChange={(e) => updateField('attack2Cost', e.target.value.split(',').map(s => s.trim()))}
                        className="w-full py-1 px-2 border border-slate-200 rounded text-[11px] focus:outline-none bg-white font-mono"
                      />
                    </div>
                    <div className="col-span-2 space-y-0.5">
                      <label className="text-[9px] font-extrabold text-slate-400">Move Description</label>
                      <input
                        type="text"
                        placeholder="Description..."
                        value={cardData.attack2Desc}
                        onChange={(e) => updateField('attack2Desc', e.target.value)}
                        className="w-full py-1 px-2 border border-slate-200 rounded text-[11px] focus:outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Weakness & Resistance */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 block">Weakness</label>
                    <select
                      value={cardData.weakness}
                      onChange={(e) => updateField('weakness', e.target.value)}
                      className="w-full py-1.5 px-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none bg-white"
                    >
                      <option value="none">NONE</option>
                      {Object.keys(TYPE_METADATA).map(k => (
                        <option key={k} value={k}>{TYPE_METADATA[k].icon} {k.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 block">Resistance</label>
                    <select
                      value={cardData.resistance}
                      onChange={(e) => updateField('resistance', e.target.value)}
                      className="w-full py-1.5 px-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none bg-white"
                    >
                      <option value="none">NONE</option>
                      {Object.keys(TYPE_METADATA).map(k => (
                        <option key={k} value={k}>{TYPE_METADATA[k].icon} {k.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Developer Credential Inputs */}
            {currentType === CARD_TYPES.DEV && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Dev Name</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Title / Rank</label>
                    <input
                      type="text"
                      value={cardData.subtitle}
                      onChange={(e) => updateField('subtitle', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Company Name</label>
                    <input
                      type="text"
                      value={cardData.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Online Status</label>
                    <select
                      value={cardData.status}
                      onChange={(e) => updateField('status', e.target.value)}
                      className="w-full py-1.5 px-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="online">🟢 Online</option>
                      <option value="coding">🔵 Coding</option>
                      <option value="busy">🔴 Busy</option>
                      <option value="offline">⚪ Offline</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Core Skills (comma separated)</label>
                  <input
                    type="text"
                    placeholder="React, Tailwind, Node, Docker"
                    value={cardData.skills}
                    onChange={(e) => updateField('skills', e.target.value)}
                    className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Dev stats metrics */}
                <div className="space-y-2 mt-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 block">Tech Stats Metrics</label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {cardData.stats?.map((stat, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          value={stat.name}
                          onChange={(e) => updateStat(i, stat.value, e.target.value)}
                          className="w-16 py-1 px-1.5 border border-slate-200 rounded text-[10px] bg-white font-bold"
                        />
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => updateStat(i, e.target.value)}
                          className="flex-1 py-1 px-1.5 border border-slate-200 rounded text-[10px] text-center bg-white font-mono font-bold"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Yu-Gi-Oh Layout Inputs */}
            {currentType === CARD_TYPES.YUGIOH && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Card Name</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Attribute</label>
                    <select
                      value={cardData.attribute}
                      onChange={(e) => updateField('attribute', e.target.value)}
                      className="w-full py-1.5 px-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
                    >
                      <option value="dark">🔮 DARK</option>
                      <option value="light">☀️ LIGHT</option>
                      <option value="water">💧 WATER</option>
                      <option value="fire">🔥 FIRE</option>
                      <option value="earth">🪨 EARTH</option>
                      <option value="wind">💨 WIND</option>
                      <option value="divine">⚡ DIVINE</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Level (Stars)</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={cardData.level || 1}
                      onChange={(e) => updateField('level', Number(e.target.value))}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">ATK Value</label>
                    <input
                      type="text"
                      value={cardData.atk || ''}
                      onChange={(e) => updateField('atk', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">DEF Value</label>
                    <input
                      type="text"
                      value={cardData.def || ''}
                      onChange={(e) => updateField('def', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Type Brackets</label>
                  <input
                    type="text"
                    placeholder="e.g. [ Spellcaster / Effect ]"
                    value={cardData.monsterType || ''}
                    onChange={(e) => updateField('monsterType', e.target.value)}
                    className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Description / Lore / Card Effects</label>
                  <textarea
                    rows={3}
                    value={cardData.description || ''}
                    onChange={(e) => updateField('description', e.target.value)}
                    className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none font-sans"
                  />
                </div>
              </>
            )}

            {/* Music Song Layout Inputs */}
            {currentType === CARD_TYPES.MUSIC && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Song Title</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Artist Name</label>
                    <input
                      type="text"
                      value={cardData.artist || ''}
                      onChange={(e) => updateField('artist', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Album Name</label>
                  <input
                    type="text"
                    value={cardData.album || ''}
                    onChange={(e) => updateField('album', e.target.value)}
                    className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Playback Progress (e.g. 1:45)</label>
                    <input
                      type="text"
                      placeholder="e.g. 1:45"
                      value={cardData.progress || ''}
                      onChange={(e) => updateField('progress', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Track Duration (e.g. 3:20)</label>
                    <input
                      type="text"
                      placeholder="e.g. 3:20"
                      value={cardData.duration || ''}
                      onChange={(e) => updateField('duration', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center bg-white"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Esports Valorant Layout Inputs */}
            {currentType === CARD_TYPES.ESPORTS && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Gamer Tag</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Tagline (e.g. SEN#123)</label>
                    <input
                      type="text"
                      value={cardData.tag || ''}
                      onChange={(e) => updateField('tag', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Competitive Rank</label>
                    <input
                      type="text"
                      placeholder="e.g. Radiant"
                      value={cardData.rank || ''}
                      onChange={(e) => updateField('rank', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Weapon Select</label>
                    <input
                      type="text"
                      placeholder="e.g. Vandal"
                      value={cardData.weapon || ''}
                      onChange={(e) => updateField('weapon', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Competitive Rank</label>
                    <input
                      type="text"
                      placeholder="e.g. Radiant"
                      value={cardData.rank || ''}
                      onChange={(e) => updateField('rank', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Weapon Select</label>
                    <input
                      type="text"
                      placeholder="e.g. Vandal"
                      value={cardData.weapon || ''}
                      onChange={(e) => updateField('weapon', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                </div>

                {/* Esports stats grid */}
                <div className="space-y-2 mt-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 block">Combat Stats</label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {cardData.stats?.map((stat, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          value={stat.name}
                          onChange={(e) => updateStat(i, stat.value, e.target.value)}
                          className="w-16 py-1 px-1.5 border border-slate-200 rounded text-[10px] bg-white font-bold"
                        />
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => updateStat(i, e.target.value)}
                          className="flex-1 py-1 px-1.5 border border-slate-200 rounded text-[10px] text-center bg-white font-mono font-bold"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* MTG Layout Inputs */}
            {currentType === CARD_TYPES.MTG && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Card Name</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Subtype / Species</label>
                    <input
                      type="text"
                      placeholder="Legendary Creature — Dragon"
                      value={cardData.species}
                      onChange={(e) => updateField('species', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Power (ATK)</label>
                    <input
                      type="text"
                      value={cardData.atk || ''}
                      onChange={(e) => updateField('atk', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Toughness (DEF)</label>
                    <input
                      type="text"
                      value={cardData.def || ''}
                      onChange={(e) => updateField('def', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Rules Text / Abilities</label>
                  <textarea
                    rows={3}
                    value={cardData.description || ''}
                    onChange={(e) => updateField('description', e.target.value)}
                    className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none font-sans"
                  />
                </div>
              </>
            )}

            {currentType === CARD_TYPES.BUSINESS && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Job Title</label>
                    <input
                      type="text"
                      value={cardData.subtitle || ''}
                      onChange={(e) => updateField('subtitle', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Email Address</label>
                    <input
                      type="email"
                      value={cardData.email || ''}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Website URL</label>
                    <input
                      type="text"
                      value={cardData.company || ''}
                      onChange={(e) => updateField('company', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Credit Card Layout Inputs */}
            {currentType === CARD_TYPES.CREDIT && (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Card Holder Name</label>
                  <input
                    type="text"
                    value={cardData.name}
                    onChange={(e) => updateField('name', e.target.value.toUpperCase())}
                    className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Card Number</label>
                    <input
                      type="text"
                      value={cardData.cardNumber || ''}
                      onChange={(e) => updateField('cardNumber', e.target.value)}
                      placeholder="xxxx xxxx xxxx xxxx"
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Expires Date</label>
                    <input
                      type="text"
                      value={cardData.duration || ''}
                      onChange={(e) => updateField('duration', e.target.value)}
                      placeholder="MM/YY"
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Dnd Character Layout Inputs */}
            {currentType === CARD_TYPES.DND && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Character Name</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Level</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={cardData.level || 1}
                      onChange={(e) => updateField('level', Number(e.target.value))}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Species & Class</label>
                    <input
                      type="text"
                      placeholder="e.g. Elf Rogue / Scout"
                      value={cardData.species || ''}
                      onChange={(e) => updateField('species', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Armor Class (AC)</label>
                    <input
                      type="number"
                      value={cardData.rating || ''}
                      onChange={(e) => updateField('rating', e.target.value)}
                      className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-center"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Hit Points (HP)</label>
                  <input
                    type="number"
                    value={cardData.hp || ''}
                    onChange={(e) => updateField('hp', e.target.value)}
                    className="w-full py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </>
            )}

          </div>
        )}

        {/* Saved Collection Tab */}
        {activeTab === 'collection' && (
          <div className="space-y-4">
            {/* Save Form */}
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-2.5">
              <span className="text-xs font-black tracking-wider uppercase text-blue-800 block">Save Current Design</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Design name (e.g. My Charizard)"
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  className="flex-1 text-xs py-2 px-3 border border-slate-200 rounded-lg focus:outline-none bg-white"
                />
                <button
                  onClick={handleSaveCard}
                  className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-black shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Plus size={14} />
                  Save
                </button>
              </div>
            </div>

            {/* Saved Designs List */}
            <div className="space-y-2">
              <label className="text-xs font-black tracking-wider uppercase text-slate-500 block">Your Collection</label>
              {savedCards.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
                  Your saved items will appear here.
                </div>
              ) : (
                <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
                  {savedCards.map((saved) => (
                    <div
                      key={saved.id}
                      onClick={() => handleLoadSavedCard(saved)}
                      className="flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded-xl hover:border-blue-500 hover:shadow-md cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <Award size={14} className="text-blue-600 opacity-70" />
                        <div className="text-left">
                          <p className="text-xs font-bold text-slate-800 leading-tight">{saved.displayName}</p>
                          <p className="text-[9px] font-semibold text-slate-400 uppercase leading-none mt-0.5">
                            {saved.data.cardType} • {saved.data.themeId}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleDeleteSavedCard(saved.id, e)}
                        className="p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Card"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Editor Footer Actions (Export triggers) */}
      <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-2">
        <button
          onClick={onExport}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95"
        >
          <Plus size={16} /> Export High-Res PNG
        </button>
      </div>
    </div>
  );
}
