# 🃏 Card & Badge Studio

A premium, interactive card designer built with **React + Vite** that lets you create, customize, and export stunning digital cards and badges — from FIFA Ultimate Team cards to Pokémon cards, Yu-Gi-Oh!, and much more.

---

## ✨ Features

- **15 unique card templates** across gaming, social, and creative categories
- **3D holographic tilt effect** on hover with configurable glow and holo patterns
- **Live real-time editor** — every change reflects instantly on the card preview
- **High-resolution PNG export** at 3× pixel ratio for ultra-sharp results
- **Randomize Attributes** button to quickly generate new card stats
- **Multiple preview backgrounds** — Light Grid, Dot Grid, Pastel Radial, Pure White, Dark Studio
- **Confetti celebration** on successful export

---

## 🗂️ Card Templates

| Category | Templates |
|---|---|
| ⚽ Football | FIFA FUT Card (Gold Rare, TOTY, TOTS, Icons, Cyber FUT) |
| 🎮 Gaming | Pokémon Card, Yu-Gi-Oh!, Magic: The Gathering, Steam Profile |
| 🧑‍💻 Developer | Developer ID Badge |
| 🎵 Music | Spotify-style Music Card |
| 🏆 Esports | Esports Player Card (Valorant, CS2 themes) |
| 📸 Social | Instagram Post Card, Polaroid Photo Card |
| 💼 Misc | Business Card, Credit Card, D&D Character Card, Event Ticket, Crypto Coin Card |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/card-maker.git
cd card-maker

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [Vite 6](https://vitejs.dev/) | Build tool & dev server |
| [TailwindCSS 4](https://tailwindcss.com/) | Utility-first styling |
| [html-to-image](https://github.com/bubkoo/html-to-image) | High-res PNG export |
| [canvas-confetti](https://github.com/catdad/canvas-confetti) | Export celebration animation |
| [Lucide React](https://lucide.dev/) | Icon library |

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Root layout, export logic, card renderer
├── components/
│   ├── CardWrapper.jsx      # 3D tilt, holo overlay, glow effects
│   ├── EditorPanel.jsx      # Full right-side editor sidebar
│   ├── Presets.js           # Card type constants & default preset data
│   ├── FutCard.jsx          # FIFA FUT card renderer
│   ├── PokemonCard.jsx      # Pokémon card renderer
│   ├── DevBadge.jsx         # Developer ID badge renderer
│   ├── YugiohCard.jsx       # Yu-Gi-Oh! card renderer
│   ├── MusicCard.jsx        # Music/Spotify card renderer
│   ├── EsportsCard.jsx      # Esports player card renderer
│   └── ExtraCards.jsx       # MTG, Steam, Instagram, Polaroid, Business,
│                            #   Credit, D&D, Ticket, Crypto cards
└── index.css                # Global styles
```

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server with HMR |
| `npm run build` | Build optimised production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

---

## 🖼️ Export

Click **Export High-Res PNG** in the editor sidebar to download your card as a 3× resolution PNG file. The export flattens all 3D transforms and captures only the card artwork — no background, no glow.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
