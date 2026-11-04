import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, ArrowUpRight, Cpu, Radio, ShieldCheck, CheckCircle2 
} from "lucide-react";

export type NodeData = {
  id: string;
  name: string;
  code: string;
  role: string;
  category: "Serve" | "Deliver" | "Core";
  description: string;
  protocol: string;
  ping: string;
  status: "ONLINE" | "STREAMING" | "SYNCED";
  metrics: { label: string; value: string; change?: string }[];
  autonomousAction: string;
  accentColor?: string;
};

interface EcosystemNodeTooltipProps {
  node: NodeData | null;
  position?: { x: number; y: number } | null;
  onClose?: () => void;
}

export function EcosystemNodeTooltip({ node, position }: EcosystemNodeTooltipProps) {
  if (!node) return null;

  const accent = node.accentColor || "#00D084";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 10 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto z-50 w-80 sm:w-96 rounded-2xl bg-[#060d09]/95 border border-[#00D084]/40 p-4.5 sm:p-5 shadow-[0_12px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(0,208,132,0.15)] backdrop-blur-xl text-left select-none"
        style={{
          boxShadow: `0 12px 45px rgba(0,0,0,0.8), 0 0 30px ${accent}25`,
          borderColor: `${accent}50`,
        }}
      >
        {/* Top Bar: Code, Status & Ping */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: accent }} />
            <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-white/90">
              {node.code}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-white/5 border border-white/10 text-white/70">
              {node.protocol}
            </span>
            <span 
              className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${accent}20`,
                color: accent,
                border: `1px solid ${accent}40`,
              }}
            >
              {node.status} · {node.ping}
            </span>
          </div>
        </div>

        {/* Node Name & Role */}
        <div className="mb-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-0.5">
            Ecosystem Satellite Module
          </div>
          <h4 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
            {node.name}
          </h4>
          <p className="text-xs text-white/70 leading-relaxed mt-1 font-light">
            {node.description}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
          {node.metrics.map((m, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[9px] font-mono uppercase tracking-wider text-white/50">
                {m.label}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm font-bold font-mono text-white">
                  {m.value}
                </span>
                {m.change && (
                  <span className="text-[9px] font-mono text-[#00D084]">
                    {m.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Autobot OS Autonomous Workflow */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#00D084] font-semibold mb-1">
            <Cpu className="w-3 h-3 shrink-0" />
            <span>Autobot OS Autonomous Action</span>
          </div>
          <div className="text-[11px] text-white/80 leading-relaxed font-light bg-black/40 p-2 rounded-lg border border-white/5 font-mono">
            ↳ {node.autonomousAction}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

