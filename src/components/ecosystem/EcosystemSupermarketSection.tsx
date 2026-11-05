import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, X, ArrowUpRight } from "lucide-react";

interface SupermarketCard {
  id: string;
  number: string;
  titleLine1: string;
  titleLine2: string;
  clipId: string;
  clipPath: string;
  image: string;
  tag: string;
  description: string;
  features: string[];
}

const SUPERMARKET_CARDS: SupermarketCard[] = [
  // CARD 1: Diagnostics Lab (Double-Pill Arch Silhouette)
  {
    id: "diagnostics",
    number: "01",
    titleLine1: "Diagnostics",
    titleLine2: "Lab",
    clipId: "clip-arch-double",
    clipPath:
      "M 0.14,0.27 A 0.15,0.15 0 0 1 0.44,0.27 L 0.44,0.42 L 0.56,0.42 L 0.56,0.27 A 0.15,0.15 0 0 1 0.86,0.27 L 0.86,0.73 A 0.15,0.15 0 0 1 0.56,0.73 L 0.56,0.58 L 0.44,0.58 L 0.44,0.73 A 0.15,0.15 0 0 1 0.14,0.73 Z",
    image: "/hero/ai_diagnostics.jpg",
    tag: "CAN-BUS AI",
    description:
      "Full-spectrum CAN-bus diagnostic lab. BMS health telemetry, real-time motor controller error decoding, and predictive sensor fault isolation for multi-brand EVs.",
    features: [
      "1000V High-Voltage Safety Scanners",
      "Proprietary BMS Firmware Sync",
      "Live Cloud Telemetry Logging via Autobot OS",
    ],
  },
  // CARD 2: Battery Balancing (Wavy Scalloped Oval Silhouette)
  {
    id: "battery",
    number: "02",
    titleLine1: "Battery",
    titleLine2: "Balancing",
    clipId: "clip-wavy-oval",
    clipPath:
      "M 0.958,0.500 Q 0.932,0.574 0.890,0.640 Q 0.866,0.711 0.824,0.779 Q 0.744,0.816 0.662,0.837 Q 0.586,0.873 0.500,0.895 Q 0.414,0.873 0.338,0.837 Q 0.256,0.816 0.176,0.779 Q 0.134,0.711 0.110,0.640 Q 0.068,0.574 0.042,0.500 Q 0.068,0.426 0.110,0.360 Q 0.134,0.289 0.176,0.221 Q 0.256,0.184 0.338,0.163 Q 0.414,0.127 0.500,0.105 Q 0.586,0.127 0.662,0.163 Q 0.744,0.184 0.824,0.221 Q 0.866,0.289 0.890,0.360 Q 0.932,0.426 0.958,0.500 Z",
    image: "/gallery/battery-lab.png",
    tag: "CELL INTELLIGENCE",
    description:
      "Deep-cycle cell balancing, active thermal dissipation audits, SoH degradation analytics, and certified module reconditioning to restore OEM range.",
    features: [
      "Millivolt Cell Voltage Matching",
      "Thermal Runaway Prevention Protocols",
      "Second-Life Battery Repurposing",
    ],
  },
  // CARD 3: Preventive Care (10-Petal Fluted Rosette Silhouette)
  {
    id: "maintenance",
    number: "03",
    titleLine1: "Preventive",
    titleLine2: "Care",
    clipId: "clip-rosette",
    clipPath:
      "M 0.500,0.040 Q 0.605,0.177 0.688,0.152 Q 0.775,0.300 0.856,0.329 Q 0.840,0.500 0.889,0.571 Q 0.775,0.700 0.773,0.786 Q 0.605,0.823 0.553,0.892 Q 0.395,0.823 0.312,0.848 Q 0.225,0.700 0.144,0.671 Q 0.160,0.500 0.111,0.429 Q 0.225,0.300 0.227,0.214 Q 0.395,0.177 0.447,0.108 Z",
    image: "/hero/certified_techs.jpg",
    tag: "PROACTIVE AMC",
    description:
      "Precision multi-point maintenance covering high-voltage insulation checks, regenerative braking calibration, coolant flushes, and scheduled wear-and-tear upkeep.",
    features: [
      "36-Point High-Voltage Safety Audit",
      "Brake Fluid & Regen Calibrations",
      "Scheduled Fleet & Personal AMC Plans",
    ],
  },
  // CARD 4: Genuine Parts & Charging (4-Lobe Clover Cross Silhouette)
  {
    id: "parts-charging",
    number: "04",
    titleLine1: "Parts &",
    titleLine2: "Charging",
    clipId: "clip-clover",
    clipPath:
      "M 0.960,0.500 Q 0.920,0.583 0.823,0.634 Q 0.726,0.651 0.670,0.670 Q 0.651,0.726 0.634,0.823 Q 0.583,0.920 0.500,0.960 Q 0.417,0.920 0.366,0.823 Q 0.349,0.726 0.330,0.670 Q 0.274,0.651 0.177,0.634 Q 0.080,0.583 0.040,0.500 Q 0.080,0.417 0.177,0.366 Q 0.274,0.349 0.330,0.330 Q 0.349,0.274 0.366,0.177 Q 0.417,0.080 0.500,0.040 Q 0.583,0.080 0.634,0.177 Q 0.651,0.274 0.670,0.330 Q 0.726,0.349 0.823,0.366 Q 0.920,0.417 0.960,0.500 Z",
    image: "/ai-gallery/ev_charging_hub.png",
    tag: "FAST GRID & OEM",
    description:
      "Unified access to genuine OEM spare components with express 2-hour delivery, coupled with co-located 60-120kW DC hyperchargers for rapid turnaround.",
    features: [
      "12,500+ RFID-Tracked OEM SKUs",
      "60-120kW Fast DC Charging Guns",
      "Priority Fleet Bays & Rapid Delivery",
    ],
  },
];

// Sleek organic teardrop / comma quotation mark top-right of cards (reference aesthetic)
function CardAccentMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 2.5C9.5 2.5 7 5.8 7 9.8c0 3.2 2.2 5.5 5.2 5.5.8 0 1.6-.2 2.1-.6-.4 2.8-2.6 4.9-5.3 5.8 3.8.3 8-2.5 8-9.2 0-5.1-1.5-8.8-3.5-8.8z" />
    </svg>
  );
}

interface EcosystemSupermarketSectionProps {
  onOpenBooking?: () => void;
}

export function EcosystemSupermarketSection({ onOpenBooking }: EcosystemSupermarketSectionProps) {
  const [activeCard, setActiveCard] = useState<SupermarketCard | null>(null);

  // Exactly 4 cards: 2 in Column 1, 2 in Column 2
  const col1Cards = [SUPERMARKET_CARDS[0], SUPERMARKET_CARDS[1]]; // Diagnostics Lab, Battery Balancing
  const col2Cards = [SUPERMARKET_CARDS[2], SUPERMARKET_CARDS[3]]; // Preventive Care, Parts & Charging

  return (
    <section className="ecosystem-reveal py-20 sm:py-28 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* =========================================================================
            LEFT COLUMN: High-Fashion Editorial Typography, Motifs & Minimal Body
           ========================================================================= */}
        <div className="lg:col-span-5 space-y-8 text-left lg:sticky lg:top-28">
          {/* Main Title: Clean, Bold, All-Caps */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/10 border border-[#00D084]/30 text-xs font-mono text-[#00D084] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
              <span>Architecture Blueprint</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.03] uppercase">
              India's First <br />
              EV Service <br />
              <span className="text-[#00D084]">Super Market</span>
            </h2>
            <div className="pt-0.5">
              <span className="text-xs font-mono text-white/50 tracking-widest uppercase">
                (SSM) Single-Platform Architecture
              </span>
            </div>
          </div>

          {/* Triad Brand Glyphs: Minimal Monochrome / Emerald Accents */}
          <div className="flex items-center gap-3 pt-1">
            {/* 1. Clover Glyph */}
            <div 
              className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center p-2.5 text-[#00D084] hover:border-[#00D084]/40 hover:bg-[#00D084]/10 transition-all duration-300"
              title="Telemetry & Diagnostics"
            >
              <svg viewBox="0 0 40 40" className="w-full h-full" fill="currentColor">
                <rect x="6" y="14" width="28" height="12" rx="6" />
                <rect x="14" y="6" width="12" height="28" rx="6" />
              </svg>
            </div>

            {/* 2. Segmented Capsule Glyph */}
            <div 
              className="w-14 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center p-2.5 text-[#00D084] hover:border-[#00D084]/40 hover:bg-[#00D084]/10 transition-all duration-300"
              title="High Voltage Battery Intelligence"
            >
              <svg viewBox="0 0 52 36" className="w-full h-full" fill="currentColor">
                <rect x="2" y="6" width="48" height="24" rx="12" />
                <circle cx="18" cy="18" r="3.5" fill="#020403" />
                <circle cx="34" cy="18" r="3.5" fill="#020403" />
              </svg>
            </div>

            {/* 3. 4-Circle Cluster Glyph */}
            <div 
              className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center p-2.5 text-[#00D084] hover:border-[#00D084]/40 hover:bg-[#00D084]/10 transition-all duration-300"
              title="Parts & Hypercharging Grid"
            >
              <svg viewBox="0 0 40 40" className="w-full h-full" fill="currentColor">
                <circle cx="13" cy="13" r="6" />
                <circle cx="27" cy="13" r="6" />
                <circle cx="13" cy="27" r="6" />
                <circle cx="27" cy="27" r="6" />
              </svg>
            </div>
          </div>

          {/* Exact Paragraph Requested by User (Spacious, refined, not text heavy) */}
          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-md">
            Everything an electric vehicle needs after rolling out of the showroom: diagnostics, repairs, preventive maintenance, battery balancing, genuine parts, and charging — unified on one platform.
          </p>

          {/* Lower Brand Lockup: Logo Mark + Wordmark */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00D084] shadow-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5v-3h3l-5-7v3H8l5 7z" />
                </svg>
              </div>
              <div>
                <div className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>MY EV SERVICE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
                </div>
                <div className="text-[10px] font-mono text-white/40 tracking-wider uppercase">
                  Autobot OS · Unified Super Market
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/franchise"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00D084] transition-all shadow-md hover:scale-105 cursor-pointer"
              >
                <span>Join Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              {onOpenBooking && (
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2.5 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer"
                >
                  Book Service
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Exactly 4 Minimalist Obsidian Cards in Staggered 2x2 Grid
           ========================================================================= */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-7 items-start">
          {/* COLUMN 1 */}
          <div className="space-y-6">
            {col1Cards.map((card) => (
              <div
                key={card.id}
                onClick={() => setActiveCard(card)}
                className="group relative rounded-[32px] sm:rounded-[36px] bg-[#09110B] border border-white/10 hover:border-[#00D084]/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,208,132,0.12)] overflow-hidden cursor-pointer min-h-[360px] sm:min-h-[390px]"
              >
                {/* Subtle Ambient Radial Glow on Hover */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#00D084]/5 rounded-full blur-3xl group-hover:bg-[#00D084]/15 transition-all duration-500 pointer-events-none" />

                {/* Top Row: Clean 2-Line Title Left, Organic Mark Right */}
                <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="block text-[10px] font-mono font-bold tracking-widest text-[#00D084] uppercase mb-1">
                      {card.number} // {card.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-[1.05]">
                      {card.titleLine1} <br />
                      <span className="text-white/90">{card.titleLine2}</span>
                    </h3>
                  </div>
                  <div className="shrink-0 text-[#00D084] opacity-80 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    <CardAccentMark className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                </div>

                {/* Center / Lower Cutout Window with Real Photography */}
                <div className="relative z-10 mt-auto pt-2 pb-1 flex items-center justify-center">
                  <div className="relative w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] overflow-visible"
                    >
                      <defs>
                        <clipPath id={card.clipId} clipPathUnits="objectBoundingBox">
                          <path d={card.clipPath} />
                        </clipPath>
                      </defs>
                      <g clipPath={`url(#${card.clipId})`}>
                        <image
                          href={card.image}
                          x="0"
                          y="0"
                          width="100"
                          height="100"
                          preserveAspectRatio="xMidYMid slice"
                          className="filter brightness-90 contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-110"
                          style={{ transformOrigin: "50% 50%" }}
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* COLUMN 2 (Shifted Down for Dynamic Editorial Asymmetry) */}
          <div className="space-y-6 sm:mt-10 lg:mt-12">
            {col2Cards.map((card) => (
              <div
                key={card.id}
                onClick={() => setActiveCard(card)}
                className="group relative rounded-[32px] sm:rounded-[36px] bg-[#09110B] border border-white/10 hover:border-[#00D084]/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,208,132,0.12)] overflow-hidden cursor-pointer min-h-[360px] sm:min-h-[390px]"
              >
                {/* Subtle Ambient Radial Glow on Hover */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#00D084]/5 rounded-full blur-3xl group-hover:bg-[#00D084]/15 transition-all duration-500 pointer-events-none" />

                {/* Top Row: Clean 2-Line Title Left, Organic Mark Right */}
                <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="block text-[10px] font-mono font-bold tracking-widest text-[#00D084] uppercase mb-1">
                      {card.number} // {card.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-[1.05]">
                      {card.titleLine1} <br />
                      <span className="text-white/90">{card.titleLine2}</span>
                    </h3>
                  </div>
                  <div className="shrink-0 text-[#00D084] opacity-80 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    <CardAccentMark className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                </div>

                {/* Center / Lower Cutout Window with Real Photography */}
                <div className="relative z-10 mt-auto pt-2 pb-1 flex items-center justify-center">
                  <div className="relative w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] overflow-visible"
                    >
                      <defs>
                        <clipPath id={card.clipId} clipPathUnits="objectBoundingBox">
                          <path d={card.clipPath} />
                        </clipPath>
                      </defs>
                      <g clipPath={`url(#${card.clipId})`}>
                        <image
                          href={card.image}
                          x="0"
                          y="0"
                          width="100"
                          height="100"
                          preserveAspectRatio="xMidYMid slice"
                          className="filter brightness-90 contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-110"
                          style={{ transformOrigin: "50% 50%" }}
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE DETAIL MODAL (Tapping a card displays crisp SSM capability)
         ========================================================================= */}
      {activeCard && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setActiveCard(null)}
        >
          <div 
            className="relative w-full max-w-lg rounded-3xl bg-[#09110B] border border-white/20 text-white p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#00D084] uppercase">
                  {activeCard.number} · {activeCard.tag} · SSM CAPABILITY
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                  {activeCard.titleLine1} {activeCard.titleLine2}
                </h3>
              </div>
              <button 
                onClick={() => setActiveCard(null)}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-6">
              {activeCard.description}
            </p>

            <div className="space-y-2.5 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-white/50 font-bold block">
                Included in Super Market Bay:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {activeCard.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90">
                    <Check className="w-4 h-4 shrink-0 text-[#00D084]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveCard(null)}
                className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-bold uppercase tracking-wider text-white/80 hover:bg-white/10 transition-all cursor-pointer"
              >
                Close
              </button>
              {onOpenBooking && (
                <button
                  onClick={() => {
                    setActiveCard(null);
                    onOpenBooking();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg"
                >
                  Book This Service
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
