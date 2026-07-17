const fs = require('fs');
let c = fs.readFileSync('src/components/Landing.tsx', 'utf8');

const replacements = [
  ['bg-[#050906]', 'bg-[#f4f7f5]'],
  ['bg-[#020403]', 'bg-white'],
  ['bg-[#030604]', 'bg-white'],
  ['bg-[#0a0f0c]', 'bg-white'],
  ['bg-[#0a0f0c]/90', 'bg-white/90'],
  ['text-white', 'text-[#020403]'],
  ['text-[#a1a1aa]', 'text-black/60'],
  ['text-[#71717a]', 'text-black/40'],
  ['border-white/10', 'border-black/10'],
  ['border-white/5', 'border-black/5'],
  ['border-white/20', 'border-black/20'],
  ['bg-white/5', 'bg-black/5'],
  ['bg-white/10', 'bg-black/10'],
  ['bg-white/20', 'bg-black/20'],
  ['fill-white/60', 'fill-black/60'],
  ['text-white/60', 'text-black/60'],
  ['text-white/40', 'text-black/40'],
  ['text-black', 'text-white'], // Swap black buttons back to white text
  ['bg-white px-8', 'bg-[#020403] px-8'], // Swap white buttons back to black bg
  ['bg-white px-5', 'bg-[#020403] px-5'], 
];

replacements.forEach(([from, to]) => {
  // Use split/join to replace all occurrences without regex escaping issues
  c = c.split(from).join(to);
});

// Fix specific broken replacements
c = c.split('[-webkit-text-stroke:1px_rgba(255,255,255,0.4)]').join('[-webkit-text-stroke:1px_rgba(0,0,0,0.3)]');
c = c.split('[-webkit-text-stroke:2px_rgba(255,255,255,0.4)]').join('[-webkit-text-stroke:2px_rgba(0,0,0,0.3)]');

fs.writeFileSync('src/components/Landing.tsx', c);
console.log("Done");
