// Default presets and theme configurations for the Card Designer

export const CARD_TYPES = {
  FUT: 'fut',
  POKEMON: 'pokemon',
  DEV: 'dev',
  YUGIOH: 'yugioh',
  MUSIC: 'music',
  ESPORTS: 'esports',
  MTG: 'mtg',
  STEAM: 'steam',
  INSTAGRAM: 'instagram',
  POLAROID: 'polaroid',
  BUSINESS: 'business',
  CREDIT: 'credit',
  DND: 'dnd',
  TICKET: 'ticket',
  CRYPTO: 'crypto'
};

export const FUT_THEMES = [
  {
    id: 'gold-rare',
    name: 'Gold Rare',
    bgGradient: 'linear-gradient(135deg, #fce074 0%, #e2b21c 50%, #9e7b08 100%)',
    textColor: '#322500',
    borderColor: '#e8c148',
    glowColor: 'rgba(252, 224, 116, 0.4)',
    accentBg: 'rgba(255, 255, 255, 0.25)',
    holoPattern: 'none'
  },
  {
    id: 'toty',
    name: 'Team of the Year (TOTY)',
    bgGradient: 'linear-gradient(135deg, #020b24 0%, #0d2a6b 40%, #1e59bc 70%, #d4af37 100%)',
    textColor: '#ffffff',
    borderColor: '#d4af37',
    glowColor: 'rgba(30, 89, 188, 0.6)',
    accentBg: 'rgba(255, 255, 255, 0.15)',
    holoPattern: 'sparkle'
  },
  {
    id: 'tots',
    name: 'Team of the Season (TOTS)',
    bgGradient: 'linear-gradient(135deg, #0a2d54 0%, #185a9d 40%, #ffd700 85%, #0c2540 100%)',
    textColor: '#ffffff',
    borderColor: '#ffd700',
    glowColor: 'rgba(24, 90, 157, 0.6)',
    accentBg: 'rgba(255, 255, 255, 0.12)',
    holoPattern: 'diagonal-stripes'
  },
  {
    id: 'fut-icon',
    name: 'Icon',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #eae5d9 45%, #bca570 85%, #8c7343 100%)',
    textColor: '#3d3018',
    borderColor: '#bca570',
    glowColor: 'rgba(188, 165, 112, 0.4)',
    accentBg: 'rgba(255, 255, 255, 0.3)',
    holoPattern: 'glass-glare'
  },
  {
    id: 'cyber-fut',
    name: 'Cyberpunk Neon',
    bgGradient: 'linear-gradient(135deg, #0f051d 0%, #290b54 50%, #7c00ff 100%)',
    textColor: '#00ffff',
    borderColor: '#00ffff',
    glowColor: 'rgba(0, 255, 255, 0.5)',
    accentBg: 'rgba(0, 255, 255, 0.08)',
    holoPattern: 'diagonal-stripes'
  }
];

export const POKEMON_THEMES = [
  {
    id: 'fire-holo',
    name: 'Fire Holo',
    type: 'fire',
    bgGradient: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
    borderColor: '#e2b21c',
    glowColor: 'rgba(255, 88, 88, 0.5)',
    cardBg: '#ffdcd1',
    bannerBg: 'linear-gradient(to right, #ff9a9e, #fecfef)',
    holoPattern: 'sparkle'
  },
  {
    id: 'water-ex',
    name: 'Water EX (Full Art)',
    type: 'water',
    bgGradient: 'linear-gradient(135deg, #15d5e3 0%, #1e59bc 50%, #031026 100%)',
    borderColor: '#ffd700',
    glowColor: 'rgba(21, 213, 227, 0.5)',
    cardBg: '#d6f0ff',
    bannerBg: 'linear-gradient(to right, #a1c4fd, #c2e9fb)',
    holoPattern: 'diagonal-stripes'
  },
  {
    id: 'grass-vintage',
    name: 'Grass Vintage',
    type: 'grass',
    bgGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    borderColor: '#c69a3b',
    glowColor: 'rgba(56, 239, 125, 0.4)',
    cardBg: '#d0f8d0',
    bannerBg: 'linear-gradient(to right, #84fab0, #8fd3f4)',
    holoPattern: 'none'
  },
  {
    id: 'psychic-cosmic',
    name: 'Psychic Cosmic',
    type: 'psychic',
    bgGradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    borderColor: '#ff69b4',
    glowColor: 'rgba(161, 140, 209, 0.5)',
    cardBg: '#ebd4fc',
    bannerBg: 'linear-gradient(to right, #fbc2eb, #a18cd1)',
    holoPattern: 'glass-glare'
  },
  {
    id: 'lightning-electric',
    name: 'Lightning Rare',
    type: 'lightning',
    bgGradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
    borderColor: '#f5af19',
    glowColor: 'rgba(245, 175, 25, 0.5)',
    cardBg: '#fff6d1',
    bannerBg: 'linear-gradient(to right, #fad961, #f76b1c)',
    holoPattern: 'sparkle'
  }
];

export const DEV_THEMES = [
  {
    id: 'glass-emerald',
    name: 'Glassmorphic Emerald',
    bgGradient: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(240,253,250,0.5) 100%)',
    borderColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    textColor: '#0f172a',
    accentColor: '#10b981',
    badgeStyle: 'glass',
    holoPattern: 'none'
  },
  {
    id: 'terminal-dark',
    name: 'Developer Slate',
    bgGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    borderColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    textColor: '#f8fafc',
    accentColor: '#38bdf8',
    badgeStyle: 'cyber',
    holoPattern: 'diagonal-stripes'
  },
  {
    id: 'cyber-neon',
    name: 'Cyberpunk Hacker',
    bgGradient: 'linear-gradient(135deg, #09090b 0%, #180828 50%, #000000 100%)',
    borderColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.5)',
    textColor: '#e4e4e7',
    accentColor: '#f43f5e',
    badgeStyle: 'cyber',
    holoPattern: 'glass-glare'
  },
  {
    id: 'sunset-orange',
    name: 'Modern Sunset',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fff7ed 100%)',
    borderColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    textColor: '#431407',
    accentColor: '#f97316',
    badgeStyle: 'glass',
    holoPattern: 'sparkle'
  }
];

export const YUGIOH_THEMES = [
  {
    id: 'normal-monster',
    name: 'Normal Monster (Yellow)',
    bgGradient: 'linear-gradient(135deg, #dfb978 0%, #cf9e4a 50%, #af7e2f 100%)',
    borderColor: '#4a3319',
    glowColor: 'rgba(223, 185, 120, 0.5)',
    cardBg: '#e6ded0',
    textColor: '#1a1005',
    accentBg: '#dfcfb5'
  },
  {
    id: 'effect-monster',
    name: 'Effect Monster (Orange)',
    bgGradient: 'linear-gradient(135deg, #cf7d3d 0%, #ab5621 50%, #8b3c0e 100%)',
    borderColor: '#3c1d07',
    glowColor: 'rgba(207, 125, 61, 0.5)',
    cardBg: '#e6ded0',
    textColor: '#241203',
    accentBg: '#dfc2a5'
  },
  {
    id: 'spell-card',
    name: 'Spell Card (Green)',
    bgGradient: 'linear-gradient(135deg, #1e9d85 0%, #147661 50%, #0b4e3e 100%)',
    borderColor: '#062d24',
    glowColor: 'rgba(30, 157, 133, 0.5)',
    cardBg: '#e2f4f1',
    textColor: '#05241d',
    accentBg: '#bcdfd8'
  },
  {
    id: 'trap-card',
    name: 'Trap Card (Pink)',
    bgGradient: 'linear-gradient(135deg, #b52c65 0%, #8e1545 50%, #680529 100%)',
    borderColor: '#3a0215',
    glowColor: 'rgba(181, 44, 101, 0.5)',
    cardBg: '#f6ebf0',
    textColor: '#29000a',
    accentBg: '#ebd0dd'
  },
  {
    id: 'xyz-monster',
    name: 'Xyz Monster (Black)',
    bgGradient: 'linear-gradient(135deg, #2a2a2e 0%, #18181b 55%, #0c0c0e 100%)',
    borderColor: '#c0c0c0',
    glowColor: 'rgba(192, 192, 192, 0.4)',
    cardBg: '#eaeae8',
    textColor: '#f8fafc',
    accentBg: '#3f3f46'
  },
  {
    id: 'link-monster',
    name: 'Link Monster (Blue Grid)',
    bgGradient: 'linear-gradient(135deg, #1d4ed8 0%, #172554 60%, #0c0a09 100%)',
    borderColor: '#ef4444',
    glowColor: 'rgba(29, 78, 216, 0.5)',
    cardBg: '#dbeafe',
    textColor: '#f8fafc',
    accentBg: '#1e3a8a'
  }
];

export const MUSIC_THEMES = [
  {
    id: 'spotify-light',
    name: 'Spotify Minimal (Light)',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderColor: '#e2e8f0',
    glowColor: 'rgba(22, 163, 74, 0.25)',
    textColor: '#0f172a',
    subColor: '#64748b',
    activeColor: '#16a34a',
    progressBg: '#e2e8f0'
  },
  {
    id: 'spotify-dark',
    name: 'Spotify Classic (Dark)',
    bgGradient: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
    borderColor: '#27272a',
    glowColor: 'rgba(30, 215, 96, 0.4)',
    textColor: '#ffffff',
    subColor: '#a1a1aa',
    activeColor: '#1db954',
    progressBg: '#3f3f46'
  },
  {
    id: 'vinyl-gold',
    name: 'Vinyl Golden Record',
    bgGradient: 'linear-gradient(135deg, #180803 0%, #090302 100%)',
    borderColor: '#d4af37',
    glowColor: 'rgba(212, 175, 55, 0.4)',
    textColor: '#ffffff',
    subColor: '#d4af37',
    activeColor: '#d4af37',
    progressBg: '#3e2723'
  },
  {
    id: 'cyber-synth',
    name: 'Neon Synthwave',
    bgGradient: 'linear-gradient(135deg, #080315 0%, #1c053a 50%, #310557 100%)',
    borderColor: '#ff007f',
    glowColor: 'rgba(255, 0, 127, 0.5)',
    textColor: '#00ffff',
    subColor: '#ff007f',
    activeColor: '#00ffff',
    progressBg: '#1c053a'
  }
];

export const ESPORTS_THEMES = [
  {
    id: 'valorant-red',
    name: 'Valorant Crimson',
    bgGradient: 'linear-gradient(135deg, #111111 0%, #1f1f2e 100%)',
    borderColor: '#ff4655',
    glowColor: 'rgba(255, 70, 85, 0.5)',
    textColor: '#ffffff',
    accentColor: '#ff4655',
    cardBg: 'rgba(255, 70, 85, 0.05)'
  },
  {
    id: 'radiant-yellow',
    name: 'Radiant Gold',
    bgGradient: 'linear-gradient(135deg, #020617 0%, #0c1a30 50%, #d97706 100%)',
    borderColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
    cardBg: 'rgba(251, 191, 36, 0.08)'
  },
  {
    id: 'esports-neon',
    name: 'Cyber Arena',
    bgGradient: 'linear-gradient(135deg, #050515 0%, #0f102b 100%)',
    borderColor: '#00ffff',
    glowColor: 'rgba(0, 255, 255, 0.5)',
    textColor: '#00ffff',
    accentColor: '#ff007f',
    cardBg: 'rgba(0, 255, 255, 0.05)'
  }
];

export const MTG_THEMES = [
  { id: 'mtg-red', name: 'Red Fire Mana', borderColor: '#3a190f', glowColor: 'rgba(92, 45, 27, 0.5)' },
  { id: 'mtg-blue', name: 'Blue Water Mana', borderColor: '#1a2d3f', glowColor: 'rgba(45, 75, 104, 0.5)' },
  { id: 'mtg-green', name: 'Green Forest Mana', borderColor: '#1b3123', glowColor: 'rgba(46, 80, 59, 0.5)' },
  { id: 'mtg-black', name: 'Black Swamp Mana', borderColor: '#242224', glowColor: 'rgba(62, 60, 63, 0.5)' },
  { id: 'mtg-white', name: 'White Sun Mana', borderColor: '#3c3631', glowColor: 'rgba(92, 84, 77, 0.4)' }
];

export const PRESETS = {
  [CARD_TYPES.FUT]: {
    cardType: CARD_TYPES.FUT,
    themeId: 'gold-rare',
    name: 'MESSI',
    rating: '94',
    position: 'RW',
    country: 'Argentina',
    club: 'Inter Miami',
    avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=400',
    avatarScale: 1.2,
    avatarX: 0,
    avatarY: -10,
    avatarFilter: 'none',
    borderWidth: 3,
    glowIntensity: 60,
    stats: [
      { name: 'PAC', value: 85 },
      { name: 'SHO', value: 92 },
      { name: 'PAS', value: 91 },
      { name: 'DRI', value: 95 },
      { name: 'DEF', value: 38 },
      { name: 'PHY', value: 68 }
    ]
  },
  [CARD_TYPES.POKEMON]: {
    cardType: CARD_TYPES.POKEMON,
    themeId: 'fire-holo',
    name: 'CHARIZARD',
    hp: '120',
    type: 'fire',
    stage: 'Stage 2',
    species: 'Flame Pokémon. HT: 5\'7", WT: 200 lbs.',
    avatar: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=400',
    avatarScale: 1.05,
    avatarX: 0,
    avatarY: 0,
    avatarFilter: 'none',
    borderWidth: 4,
    glowIntensity: 70,
    attack1Name: 'Slash',
    attack1Cost: ['colorless', 'colorless', 'colorless'],
    attack1Desc: 'Standard slashing strike. Requires 3 energy cards.',
    attack1Damage: '30',
    attack2Name: 'Fire Spin',
    attack2Cost: ['fire', 'fire', 'colorless', 'colorless'],
    attack2Desc: 'Discard 2 energy cards attached to this card to use this attack.',
    attack2Damage: '100',
    weakness: 'water',
    resistance: 'none',
    retreatCost: 3
  },
  [CARD_TYPES.DEV]: {
    cardType: CARD_TYPES.DEV,
    themeId: 'glass-emerald',
    name: 'Alex Mercer',
    subtitle: 'Senior Lead Architect',
    company: 'Quantum Tech',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    avatarScale: 1.1,
    avatarX: 0,
    avatarY: -5,
    avatarFilter: 'none',
    borderWidth: 2,
    glowIntensity: 40,
    status: 'online',
    skills: 'React, TypeScript, Node.js, Tailwind, Docker, Web3',
    stats: [
      { name: 'Commits', value: '3.4k' },
      { name: 'Bugs Slain', value: '942' },
      { name: 'Coffee (L)', value: '412' },
      { name: 'PRs Merged', value: '187' }
    ]
  },
  [CARD_TYPES.YUGIOH]: {
    cardType: CARD_TYPES.YUGIOH,
    themeId: 'effect-monster',
    name: 'DARK MAGICIAN',
    attribute: 'dark',
    level: 7,
    monsterType: '[ Spellcaster / Effect ]',
    description: 'The ultimate wizard in terms of attack and defense. Able to channel arcane spells to overwhelm any opponent.',
    atk: '2500',
    def: '2100',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    avatarScale: 1.25,
    avatarX: 0,
    avatarY: 0,
    avatarFilter: 'none',
    borderWidth: 3,
    glowIntensity: 60
  },
  [CARD_TYPES.MUSIC]: {
    cardType: CARD_TYPES.MUSIC,
    themeId: 'spotify-light',
    name: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours (Deluxe)',
    progress: '1:34',
    duration: '3:20',
    avatar: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400',
    avatarScale: 1.0,
    avatarX: 0,
    avatarY: 0,
    avatarFilter: 'none',
    borderWidth: 2,
    glowIntensity: 50
  },
  [CARD_TYPES.ESPORTS]: {
    cardType: CARD_TYPES.ESPORTS,
    themeId: 'valorant-red',
    name: 'TenZ',
    tag: 'SEN#123',
    rank: 'Radiant',
    agent: 'Jett',
    weapon: 'Vandal',
    borderWidth: 3,
    glowIntensity: 75,
    avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400',
    avatarScale: 1.15,
    avatarX: 0,
    avatarY: -5,
    avatarFilter: 'none',
    stats: [
      { name: 'ACS', value: '276' },
      { name: 'K/D Ratio', value: '1.42' },
      { name: 'HS %', value: '31.8%' },
      { name: 'Win Rate', value: '68.5%' }
    ]
  },
  [CARD_TYPES.MTG]: {
    cardType: CARD_TYPES.MTG,
    themeId: 'mtg-red',
    name: 'Chandra Nalaar',
    species: 'Planeswalker — Chandra',
    description: 'Chandra is a pyromancer whose flame burns hot and bright, channeling spells that damage her foes.',
    atk: '6',
    def: '5',
    avatar: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=400',
    avatarScale: 1.15,
    avatarX: 0,
    avatarY: 0,
    avatarFilter: 'none',
    borderWidth: 3,
    glowIntensity: 50
  },
  [CARD_TYPES.STEAM]: {
    cardType: CARD_TYPES.STEAM,
    themeId: 'default',
    name: 'Master Duelist',
    album: 'Yu-Gi-Oh! Master Duel',
    description: 'Win 100 ranked duels against other players globally.',
    progress: '1.2%',
    avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400',
    avatarScale: 1.0,
    avatarX: 0,
    avatarY: 0,
    avatarFilter: 'none',
    borderWidth: 2,
    glowIntensity: 50
  },
  [CARD_TYPES.INSTAGRAM]: {
    cardType: CARD_TYPES.INSTAGRAM,
    themeId: 'default',
    name: 'Post',
    artist: 'traveller.alex',
    country: 'Paris, France',
    description: 'Exploring the romantic streets of Paris! 🥖✨ #travel #wanderlust',
    avatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=400',
    avatarScale: 1.0,
    avatarX: 0,
    avatarY: 0,
    avatarFilter: 'none',
    borderWidth: 1,
    glowIntensity: 20
  },
  [CARD_TYPES.POLAROID]: {
    cardType: CARD_TYPES.POLAROID,
    themeId: 'default',
    name: 'Summer Memories',
    duration: 'June 2026',
    avatar: 'https://images.unsplash.com/photo-1489945052260-4f21c52268b9?auto=format&fit=crop&q=80&w=400',
    avatarScale: 1.05,
    avatarX: 0,
    avatarY: 0,
    avatarFilter: 'none',
    borderWidth: 1,
    glowIntensity: 30
  },
  [CARD_TYPES.BUSINESS]: {
    cardType: CARD_TYPES.BUSINESS,
    themeId: 'default',
    name: 'Jonathan Doe',
    subtitle: 'Chief Design Officer',
    email: 'jonathan@aetherlabs.com',
    company: 'www.aetherdesign.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    avatarScale: 1.0,
    avatarX: 0,
    avatarY: 0,
    avatarFilter: 'none',
    borderWidth: 1,
    glowIntensity: 40
  },
  [CARD_TYPES.CREDIT]: {
    cardType: CARD_TYPES.CREDIT,
    themeId: 'default',
    name: 'ALEX MERCER',
    cardNumber: '4712 9403 1827 9402',
    duration: '12/29',
    avatar: '',
    avatarScale: 1.0,
    avatarX: 0,
    avatarY: 0,
    avatarFilter: 'none',
    borderWidth: 1,
    glowIntensity: 50
  },
  [CARD_TYPES.DND]: {
    cardType: CARD_TYPES.DND,
    themeId: 'default',
    name: 'Kaelen',
    species: 'Elf Rogue / Scout',
    level: 5,
    rating: '16',
    hp: '38',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    avatarScale: 1.25,
    avatarX: 0,
    avatarY: 0,
    avatarFilter: 'none',
    borderWidth: 3,
    glowIntensity: 40
  },
  [CARD_TYPES.TICKET]: {
    cardType: CARD_TYPES.TICKET,
    themeId: 'default',
    name: 'RETRO GAMESPASS',
    tag: 'ARCADE ONE',
    duration: 'JUNE 2026',
    avatar: '',
    avatarScale: 1.0,
    avatarX: 0,
    avatarY: 0,
    avatarFilter: 'none',
    borderWidth: 2,
    glowIntensity: 40
  },
  [CARD_TYPES.CRYPTO]: {
    cardType: CARD_TYPES.CRYPTO,
    themeId: 'default',
    name: 'CYBER APES NFT',
    rating: '7412',
    hp: '2.45',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
    avatarScale: 1.0,
    avatarX: 0,
    avatarY: 0,
    avatarFilter: 'none',
    borderWidth: 1,
    glowIntensity: 50
  }
};
