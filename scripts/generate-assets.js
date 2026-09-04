const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

function createPhoneSvg(title, colorHex, accentHex, cameraStyle) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700" width="100%" height="100%">
    <defs>
      <linearGradient id="bodyGrad_${title.replace(/\s+/g, '_')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colorHex}" stop-opacity="0.95"/>
        <stop offset="50%" stop-color="${colorHex}" stop-opacity="1"/>
        <stop offset="100%" stop-color="${accentHex}" stop-opacity="0.9"/>
      </linearGradient>
      <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#a855f7" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.2"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#0f172a" flood-opacity="0.25"/>
      </filter>
    </defs>
    <!-- Shadow & Body -->
    <rect x="110" y="50" width="280" height="580" rx="48" fill="url(#bodyGrad_${title.replace(/\s+/g, '_')})" stroke="rgba(255,255,255,0.4)" stroke-width="4" filter="url(#shadow)"/>
    
    <!-- Screen Bezel -->
    <rect x="124" y="64" width="252" height="552" rx="38" fill="url(#screenGrad)" stroke="#1e293b" stroke-width="2"/>
    
    <!-- Dynamic Island / Top Notch -->
    <rect x="210" y="76" width="80" height="22" rx="11" fill="#000000" stroke="#334155" stroke-width="1"/>
    <circle cx="276" cy="87" r="4" fill="#1e293b"/>
    
    <!-- Screen Wallpaper Graphics -->
    <circle cx="250" cy="320" r="90" fill="url(#glowGrad)" filter="blur(20px)"/>
    <path d="M 140 460 Q 250 340 360 480" stroke="url(#glowGrad)" stroke-width="3" fill="none" opacity="0.7"/>
    
    <!-- Clock & Date on Screen -->
    <text x="250" y="160" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="700" text-anchor="middle">09:41</text>
    <text x="250" y="188" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" text-anchor="middle">Friday, September 12</text>
    
    <!-- 1Fi Mutual Fund Widget on Screen -->
    <rect x="144" y="220" width="212" height="80" rx="16" fill="rgba(30, 41, 59, 0.85)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <circle cx="168" cy="248" r="12" fill="#7c3aed"/>
    <text x="168" y="253" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">↑</text>
    <text x="188" y="246" fill="#f1f5f9" font-family="system-ui" font-size="12" font-weight="bold">1Fi Smart EMI</text>
    <text x="188" y="260" fill="#10b981" font-family="system-ui" font-size="11" font-weight="600">0% Interest • MF Backed</text>
    <text x="156" y="286" fill="#cbd5e1" font-family="system-ui" font-size="10">Compounding returns active</text>

    <!-- Bottom Home Indicator -->
    <rect x="200" y="600" width="100" height="4" rx="2" fill="#94a3b8"/>
  </svg>`;
}

const images = {
  'iphone-17-pro-desert.png': createPhoneSvg('iPhone 17 Pro Desert', '#C5A089', '#936D53', 'apple'),
  'iphone-17-pro-desert-back.png': createPhoneSvg('iPhone 17 Pro Desert Back', '#C5A089', '#78543E', 'apple'),
  'iphone-17-pro-angle.png': createPhoneSvg('iPhone 17 Pro Angle', '#C5A089', '#A87F66', 'apple'),
  'iphone-17-pro-natural.png': createPhoneSvg('iPhone 17 Pro Natural', '#9E978E', '#6B655E', 'apple'),
  'iphone-17-pro-black.png': createPhoneSvg('iPhone 17 Pro Black', '#3C3B3A', '#1E1D1C', 'apple'),
  'iphone-17-pro-white.png': createPhoneSvg('iPhone 17 Pro White', '#E3E4E5', '#B8B9BA', 'apple'),
  
  'samsung-s24-ultra-gray.png': createPhoneSvg('S24 Ultra Gray', '#717378', '#494B50', 'samsung'),
  'samsung-s24-ultra-violet.png': createPhoneSvg('S24 Ultra Violet', '#5C5368', '#383240', 'samsung'),
  'samsung-s24-ultra-black.png': createPhoneSvg('S24 Ultra Black', '#2B2B2C', '#171718', 'samsung'),
  'samsung-s24-ultra-yellow.png': createPhoneSvg('S24 Ultra Yellow', '#D5C8A6', '#A39674', 'samsung'),

  'google-pixel-9-pro-porcelain.png': createPhoneSvg('Pixel 9 Pro Porcelain', '#F0ECE1', '#CFC9BC', 'pixel'),
  'google-pixel-9-pro-obsidian.png': createPhoneSvg('Pixel 9 Pro Obsidian', '#2D3033', '#1A1C1E', 'pixel'),
  'google-pixel-9-pro-hazel.png': createPhoneSvg('Pixel 9 Pro Hazel', '#7C817A', '#51564F', 'pixel'),
  'google-pixel-9-pro-rose.png': createPhoneSvg('Pixel 9 Pro Rose', '#E5BAC2', '#B88A93', 'pixel'),

  'oneplus-12-emerald.png': createPhoneSvg('OnePlus 12 Emerald', '#35635B', '#1E3B36', 'oneplus'),
  'oneplus-12-black.png': createPhoneSvg('OnePlus 12 Black', '#1F2022', '#0F1011', 'oneplus'),
};

for (const [filename, content] of Object.entries(images)) {
  fs.writeFileSync(path.join(dir, filename), content, 'utf-8');
}
console.log(`Generated ${Object.keys(images).length} image assets in public/images/`);
