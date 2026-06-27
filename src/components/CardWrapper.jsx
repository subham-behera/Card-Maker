import React, { useState, useRef, useEffect } from 'react';

export default function CardWrapper({ 
  children, 
  glowIntensity = 50, 
  glowColor = 'rgba(252, 224, 116, 0.4)',
  holoPattern = 'none',
  exportRef = null
}) {
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    glareX: 50,
    glareY: 50,
    shadowX: 0,
    shadowY: 10,
    opacity: 0
  });

  const cardRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates (0 to 1)
    const px = x / rect.width;
    const py = y / rect.height;

    // Calculate rotation (-15deg to 15deg)
    const maxTilt = 15;
    const ry = (px - 0.5) * maxTilt;
    const rx = (py - 0.5) * -maxTilt;

    // Calculate shadow offset
    const shadowX = (px - 0.5) * -15;
    const shadowY = (py - 0.5) * -15 + 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`,
      glareX: px * 100,
      glareY: py * 100,
      shadowX,
      shadowY,
      opacity: 0.85
    });
  };

  const handlePointerLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      glareX: 50,
      glareY: 50,
      shadowX: 0,
      shadowY: 10,
      opacity: 0
    });
  };

  // Generate the holo overlay gradient based on selection
  const getHoloStyle = () => {
    const { glareX, glareY } = style;
    
    if (holoPattern === 'none') return {};

    let baseHolo = '';
    
    if (holoPattern === 'sparkle') {
      baseHolo = `
        radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.1) 30%, rgba(0, 0, 0, 0.5) 80%),
        repeating-linear-gradient(45deg, 
          rgba(255, 0, 0, 0.15) 0px, 
          rgba(255, 230, 0, 0.15) 15px, 
          rgba(0, 255, 50, 0.15) 30px, 
          rgba(0, 150, 255, 0.15) 45px, 
          rgba(150, 0, 255, 0.15) 60px, 
          rgba(255, 0, 0, 0.15) 75px
        )
      `;
    } else if (holoPattern === 'diagonal-stripes') {
      baseHolo = `
        linear-gradient(115deg, 
          transparent 20%, 
          rgba(255, 255, 255, 0.7) ${glareX - 10}%, 
          rgba(255, 0, 128, 0.3) ${glareX}%, 
          rgba(0, 255, 255, 0.3) ${glareX + 10}%, 
          transparent 80%
        ),
        repeating-linear-gradient(125deg, 
          rgba(255,255,255,0.1) 0px, 
          rgba(255,255,255,0.1) 2px, 
          transparent 2px, 
          transparent 10px
        )
      `;
    } else if (holoPattern === 'glass-glare') {
      baseHolo = `
        linear-gradient(105deg, 
          rgba(255, 255, 255, 0) 0%, 
          rgba(255, 255, 255, 0) ${glareX - 20}%, 
          rgba(255, 255, 255, 0.8) ${glareX}%, 
          rgba(255, 255, 255, 0) ${glareX + 20}%, 
          rgba(255, 255, 255, 0) 100%
        )
      `;
    }

    return {
      backgroundImage: baseHolo,
      mixBlendMode: 'color-dodge',
      opacity: style.opacity
    };
  };

  return (
    <div className="relative group select-none touch-none py-6 px-4">
      {/* Outer Glow behind the card */}
      <div 
        className="absolute transition-all duration-300 rounded-[24px] blur-2xl pointer-events-none"
        style={{
          backgroundColor: glowColor,
          width: 'calc(100% - 32px)',
          height: 'calc(100% - 48px)',
          left: '16px',
          top: '24px',
          transform: style.transform.replace(/scale\([^)]+\)/, 'scale(0.95)'),
          opacity: style.opacity > 0 ? (glowIntensity / 100) : (glowIntensity / 250),
          zIndex: 0
        }}
      />

      {/* Main card viewport wrapper */}
      <div
        ref={(node) => {
          cardRef.current = node;
          if (exportRef) exportRef.current = node;
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative transition-all duration-150 ease-out will-change-transform rounded-[24px] cursor-grab active:cursor-grabbing overflow-hidden bg-white"
        style={{
          transform: style.transform,
          boxShadow: `${style.shadowX}px ${style.shadowY}px 30px rgba(0, 0, 0, 0.12)`,
          zIndex: 10
        }}
      >
        {/* Children Render */}
        {children}

        {/* Holo Overlay Layer */}
        {holoPattern !== 'none' && (
          <div 
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-200"
            style={getHoloStyle()}
          />
        )}

        {/* Gloss Edge Highlight */}
        <div 
          className="absolute inset-0 pointer-events-none z-20 border border-white/20 rounded-[24px]"
        />
      </div>
    </div>
  );
}
