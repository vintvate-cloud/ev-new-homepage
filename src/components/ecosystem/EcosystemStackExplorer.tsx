import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Cpu, Wrench, Layers, ShieldCheck, ChevronRight, 
  ArrowRight, Sparkles, CheckCircle2, Zap 
} from "lucide-react";
import { INFRASTRUCTURE_TIERS } from "./ecosystem-data";

export function EcosystemStackExplorer() {
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const activeTier = INFRASTRUCTURE_TIERS[selectedTierIndex];

  return (
    <div className="w-full rounded-3xl bg-[#060e08] border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden text-left">
      {/* Subtle background radar glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D084]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[10px] font-mono font-bold text-[#00D084] uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Full Infrastructure Blueprint
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            The 4-Tier Full-Stack EV Infrastructure
          </h3>
          <p className="text-xs sm:text-sm text-white/60 font-light mt-1 max-w-xl">
            From physical high-voltage service bays to edge CAN-bus scanners and cloud AI algorithms.
          </p>
        </div>

        {/* Tier Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {INFRASTRUCTURE_TIERS.map((tier, idx) => (
            <button
              key={tier.tier}
              onClick={() => setSelectedTierIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                selectedTierIndex === idx
                  ? "bg-[#00D084] text-black shadow-[0_0_20px_rgba(0,208,132,0.4)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              <span>T-{tier.tier}</span>
              <span className="hidden sm:inline">{tier.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Active Tier Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTier.tier}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Tier Overview & Core Specs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F5A623] uppercase tracking-wider mb-1">
                <span>Tier {activeTier.tier}</span>
                <span>//</span>
                <span>{activeTier.tagline}</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {activeTier.name}
              </h4>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mt-2">
                {activeTier.description}
              </p>
            </div>

            {/* Spec Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeTier.specs.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00D084]/40 transition-colors"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-white mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  <p className="text-xs text-white/60 font-light leading-relaxed pl-6">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hardware & Diagnostic Tooling Showcase */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#09150d] border border-[#00D084]/20 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00D084] font-bold">
                Certified Tooling & Equipment
              </span>
              <span className="text-[10px] font-mono text-white/40">
                MY EV SERVICE STD
              </span>
            </div>

            <p className="text-xs text-white/60 font-light leading-relaxed">
              Every facility and node under Tier {activeTier.tier} is calibrated with industrial-grade precision equipment:
            </p>

            <div className="space-y-2.5">
              {activeTier.tools.map((tool, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/15 transition-all text-xs font-mono"
                >
                  <span className="text-white font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
                    {tool}
                  </span>
                  <span className="text-[10px] text-white/40 uppercase">CALIBRATED</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="p-3.5 rounded-xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs text-white/80 leading-relaxed font-light">
                <strong className="text-[#00D084] font-mono font-bold block mb-1">
                  AUTOBOT OS INTEGRATION:
                </strong>
                Direct digital handshake ensures all diagnostic measurements from Tier {activeTier.tier} flow directly into centralized vehicle health records.
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

