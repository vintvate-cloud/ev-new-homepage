import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu, Activity, Building2, Store, Truck, BatteryCharging,
  Network, Car, ArrowRight, Zap, ShieldCheck, Terminal,
  Layers, Radio, Sparkles, ChevronRight, X, ExternalLink
} from "lucide-react";
import { AUTOBOT_OS_CORE, SATELLITE_NODES } from "./ecosystem-data";
import { EcosystemNodeTooltip, type NodeData } from "./EcosystemNodeTooltip";
import { EcosystemStackExplorer } from "./EcosystemStackExplorer";
import { EcosystemPipeline } from "./EcosystemPipeline";
import { EcosystemLiveTicker } from "./EcosystemLiveTicker";

type ViewMode = "topology" | "stack" | "pipeline" | "console";

export function EcosystemHubVisualizer() {
  const [viewMode, setViewMode] = useState<ViewMode>("topology");
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  const activeInspectedNode = selectedNode || hoveredNode;

  return (
    <div className="w-full relative z-20">
      {/* ── View Lens Switcher Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-2 rounded-2xl bg-[#060c08]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {[
            { id: "topology", label: "Neural Topology", icon: Radio, code: "01" },
            { id: "stack", label: "4-Tier Infrastructure", icon: Layers, code: "02" },
            { id: "pipeline", label: "Data Pipeline", icon: Zap, code: "03" },
            { id: "console", label: "Live Telemetry Feed", icon: Terminal, code: "04" },
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = viewMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as ViewMode)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#00D084] text-black shadow-[0_0_25px_rgba(0,208,132,0.45)] scale-[1.02]"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline text-[10px] opacity-60">[{mode.code}]</span>
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live System Indicator */}
        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/60 border border-[#00D084]/25 text-[11px] font-mono shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D084] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D084]" />
          </span>
          <span className="text-white/60">AUTOBOT OS v4.2:</span>
          <span className="text-[#00D084] font-bold">14,820 NODES ONLINE (14ms)</span>
        </div>
      </div>

      {/* ── View 1: Neural Topology Visualizer ── */}
      {viewMode === "topology" && (
        <div className="space-y-8">
          <div className="ecosystem-topology-canvas relative rounded-[36px] bg-gradient-to-b from-[#040906] via-[#020503] to-[#040906] border border-white/15 p-6 sm:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Ambient Background Grid & Cyber Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,208,132,0.15)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Canvas Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-10 relative z-10 text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[10px] font-mono text-[#00D084] font-bold uppercase tracking-widest mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
                  Live Cybernetic Network Matrix
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Autobot OS Central Neural Nervous System
                </h3>
              </div>
              <div className="text-xs font-mono text-white/60 bg-black/60 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md w-max shadow-sm">
                ✦ Hover over any satellite node to trigger live telemetry
              </div>
            </div>

            {/* Central Stage: Central Hub & Orbiting Satellites */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Client & Driver Satellites */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest pb-1 border-b border-white/10">
                  <span>Input & Demand Channels</span>
                  <span className="text-[#00D084]">● STREAMING</span>
                </div>
                {SATELLITE_NODES.slice(0, 3).map((node) => {
                  const isHovered = hoveredNode?.id === node.id;
                  const isSelected = selectedNode?.id === node.id;
                  return (
                    <motion.div
                      key={node.id}
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => setSelectedNode(isSelected ? null : node)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-300 text-left relative cursor-pointer select-none overflow-hidden ${
                        isHovered || isSelected
                          ? "bg-gradient-to-r from-[#0c2214] to-[#07130b] border-[#00D084] shadow-[0_0_30px_rgba(0,208,132,0.35)]"
                          : "bg-[#07110B]/90 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D084]/5 rounded-full blur-xl group-hover:bg-[#00D084]/15 transition-all pointer-events-none" />
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold text-[#00D084] uppercase tracking-wider">
                          {node.code.split(" // ")[0]}
                        </span>
                        <span className="text-[9px] font-mono text-white/50 group-hover:text-[#00D084] transition-colors flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
                          {node.ping}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white mb-1 group-hover:text-[#00D084] transition-colors leading-snug">
                        {node.name}
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed font-light line-clamp-2">
                        {node.description}
                      </p>

                      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
                        <span>{node.protocol}</span>
                        <span className="text-[#00D084] group-hover:underline">Inspect Node →</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Center Column: High-Tech Autobot OS Cyber Core */}
              <div className="lg:col-span-4 flex flex-col justify-center items-center py-8 px-6 rounded-3xl bg-gradient-to-b from-[#091a10] via-[#040a06] to-[#020503] border-2 border-[#00D084] shadow-[0_0_60px_rgba(0,208,132,0.3)] relative overflow-hidden text-center min-h-[460px]">
                
                {/* Rotating HUD Radar Background Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-72 h-72 rounded-full border border-[#00D084]/15 animate-[spin_25s_linear_infinite]" />
                  <div className="w-56 h-56 rounded-full border border-dashed border-[#00D084]/25 animate-[spin_18s_linear_infinite_reverse]" />
                  <div className="w-40 h-40 rounded-full border border-[#00D084]/30 animate-pulse" />
                  <div className="w-24 h-24 rounded-full bg-[#00D084]/15 blur-2xl animate-pulse" />
                </div>

                <div className="relative z-10 w-full">
                  {/* Glowing Hexagonal / Circular Core Icon */}
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-2xl bg-[#00D084] text-[#020403] mx-auto mb-4 flex items-center justify-center font-black shadow-[0_0_35px_#00D084]"
                  >
                    <Cpu className="w-10 h-10 animate-pulse" />
                  </motion.div>

                  <span className="px-3.5 py-1 rounded-full bg-[#00D084]/20 border border-[#00D084]/40 text-[10px] font-mono font-bold text-[#00D084] uppercase tracking-wider inline-block mb-2">
                    Central Intelligence Hub
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                    Autobot OS v4.2
                  </h3>
                  <p className="text-xs text-white/70 font-light max-w-xs mx-auto mb-6 leading-relaxed">
                    India’s sovereign multi-brand aftermarket OS, autonomously orchestrating 68 service hubs, parts routing, and live battery telemetry.
                  </p>

                  {/* Core Telemetry Readouts */}
                  <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto text-left font-mono text-[10px] mb-6">
                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                      <span className="text-white/40 block">UPTIME SLA</span>
                      <strong className="text-[#00D084] text-xs">99.98% LIVE</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                      <span className="text-white/40 block">EDGE LATENCY</span>
                      <strong className="text-[#00D084] text-xs">14ms AVG</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                      <span className="text-white/40 block">CONNECTED HUBS</span>
                      <strong className="text-white text-xs">68 NATIONWIDE</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                      <span className="text-white/40 block">ACTIVE STREAMS</span>
                      <strong className="text-[#F5A623] text-xs">14,820 FEEDS</strong>
                    </div>
                  </div>

                  {/* Core Capabilities Pills */}
                  <div className="flex flex-wrap justify-center gap-1.5 text-[9px] font-mono text-white/80 max-w-xs mx-auto">
                    <span className="px-2 py-0.5 rounded bg-white/10 border border-white/5">AI Diagnostics</span>
                    <span className="px-2 py-0.5 rounded bg-white/10 border border-white/5">Auto-Bay Routing</span>
                    <span className="px-2 py-0.5 rounded bg-white/10 border border-white/5">QR Parts Dispatch</span>
                    <span className="px-2 py-0.5 rounded bg-white/10 border border-white/5">GST Settlement</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Execution & Fulfillment Satellites */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest pb-1 border-b border-white/10">
                  <span>Execution & Ground Infrastructure</span>
                  <span className="text-[#00D084]">● ACTIVE</span>
                </div>
                {SATELLITE_NODES.slice(3, 6).map((node) => {
                  const isHovered = hoveredNode?.id === node.id;
                  const isSelected = selectedNode?.id === node.id;
                  return (
                    <motion.div
                      key={node.id}
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => setSelectedNode(isSelected ? null : node)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-300 text-left relative cursor-pointer select-none overflow-hidden ${
                        isHovered || isSelected
                          ? "bg-gradient-to-r from-[#0c2214] to-[#07130b] border-[#00D084] shadow-[0_0_30px_rgba(0,208,132,0.35)]"
                          : "bg-[#07110B]/90 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D084]/5 rounded-full blur-xl group-hover:bg-[#00D084]/15 transition-all pointer-events-none" />
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold text-[#00D084] uppercase tracking-wider">
                          {node.code.split(" // ")[0]}
                        </span>
                        <span className="text-[9px] font-mono text-white/50 group-hover:text-[#00D084] transition-colors flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
                          {node.ping}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white mb-1 group-hover:text-[#00D084] transition-colors leading-snug">
                        {node.name}
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed font-light line-clamp-2">
                        {node.description}
                      </p>

                      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
                        <span>{node.protocol}</span>
                        <span className="text-[#00D084] group-hover:underline">Inspect Node →</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>

            {/* Active Inspected Hover HUD Card Popup */}
            <AnimatePresence>
              {activeInspectedNode && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.25 }}
                  className="mt-10 pt-6 border-t border-white/15"
                >
                  <div className="flex items-center justify-between mb-3 text-left">
                    <span className="text-xs font-mono font-bold text-[#00D084] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00D084] animate-ping" />
                      Live Telemetry Inspection // {activeInspectedNode.name}
                    </span>
                    {selectedNode && (
                      <button
                        onClick={() => setSelectedNode(null)}
                        className="text-xs font-mono text-white/50 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" /> Close Pin
                      </button>
                    )}
                  </div>
                  <EcosystemNodeTooltip node={activeInspectedNode} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Embedded Live Console at the base of Topology */}
          <EcosystemLiveTicker />
        </div>
      )}

      {/* ── View 2: 4-Tier Infrastructure Stack Explorer ── */}
      {viewMode === "stack" && (
        <EcosystemStackExplorer />
      )}

      {/* ── View 3: Data Pipeline ── */}
      {viewMode === "pipeline" && (
        <EcosystemPipeline />
      )}

      {/* ── View 4: Full Live Telemetry Console ── */}
      {viewMode === "console" && (
        <div className="space-y-6">
          <EcosystemLiveTicker />
          <EcosystemStackExplorer />
        </div>
      )}
    </div>
  );
}
