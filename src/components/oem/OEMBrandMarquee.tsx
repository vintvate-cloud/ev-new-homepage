import React from "react";
import { motion } from "framer-motion";

const BRANDS = [
  { name: "Ather Energy", logo: "/brands/ather.jpeg" },
  { name: "Ola Electric", logo: "/brands/ola.jpeg" },
  { name: "Tata Motors", logo: "/brands/tata.webp" },
  { name: "TVS Motor", logo: "/brands/tvs.webp" },
  { name: "Bajaj Auto", logo: "/brands/bajaj.png" },
  { name: "Mahindra Electric", logo: "/brands/mahindra.jpeg" },
  { name: "BluSmart Mobility", logo: "/brands/blu_smart_mobility_logo.jpeg" },
  { name: "Ultraviolette", logo: "/brands/ultraviolette_automotive_logo.webp" },
  { name: "Revolt Motors", logo: "/brands/revolt.webp" },
  { name: "Simple Energy", logo: "/brands/simple-energy.jpg" },
  { name: "Piaggio", logo: "/brands/piaggio.jpeg" },
  { name: "Okinawa", logo: "/brands/okinawa-autotech.jpeg" },
];

export function OEMBrandMarquee() {
  return (
    <div className="w-full py-8 bg-[#040805] border-y border-white/10 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto px-6 mb-4 flex items-center justify-between">
        <span className="text-[10px] font-mono text-[#00D084] uppercase tracking-widest font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
          Multi-Brand OEM Compatibility Matrix
        </span>
        <span className="text-[10px] font-mono text-white/40 uppercase">
          Tested across 18+ Electric Vehicle Platforms
        </span>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="flex w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          className="flex items-center gap-8 shrink-0 py-2"
        >
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00D084]/40 transition-all shrink-0 group"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center p-0.5">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="text-xs font-mono font-bold text-white/70 group-hover:text-white transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

