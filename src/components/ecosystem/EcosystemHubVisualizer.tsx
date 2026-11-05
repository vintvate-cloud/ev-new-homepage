import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Car,
  Truck,
  Building2,
  BatteryCharging,
  Wrench,
  Store,
  PhoneCall,
  ShieldCheck,
  Radio,
  RefreshCw,
  Cpu,
  Database,
  Sparkles,
  Layers,
  ArrowRight,
  Zap,
} from "lucide-react";
import { EcosystemStackExplorer } from "./EcosystemStackExplorer";

type ViewMode = "topology" | "stack";

interface NodeItem {
  id: string;
  name: string;
  tag: string;
  sub: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  ping: string;
  protocol: string;
  metrics: { label: string; val: string }[];
  action: string;
}

const LEFT_NODES: NodeItem[] = [
  {
    id: "bms",
    name: "BMS Telemetry",
    tag: "CAN 2.0B // IoT",
    sub: "14,820 live packs",
    icon: Activity,
    color: "#00D084",
    ping: "12ms",
    protocol: "MQTT / TLS 1.3",
    metrics: [
      { label: "Monitored Packs", val: "14,820" },
      { label: "Anomaly Rate", val: "99.4%" },
    ],
    action: "Detects ΔV > 80mV during transit; auto-queues cell balancing bay.",
  },
  {
    id: "driver",
    name: "Driver Mobile App",
    tag: "iOS / Android",
    sub: "65,000+ riders",
    icon: Car,
    color: "#38bdf8",
    ping: "14ms",
    protocol: "WebSockets / Push",
    metrics: [
      { label: "Active Riders", val: "65,000+" },
      { label: "SOS Response", val: "< 28 mins" },
    ],
    action: "Predictive push alerts for brake pad wear and 1-tap SOS roadside rescue.",
  },
  {
    id: "fleet",
    name: "Commercial Fleets",
    tag: "B2B Telemetry",
    sub: "8,200+ delivery EVs",
    icon: Truck,
    color: "#00D084",
    ping: "15ms",
    protocol: "gRPC / Webhooks",
    metrics: [
      { label: "Commercial EVs", val: "8,200+" },
      { label: "Guaranteed Uptime", val: "98.5%" },
    ],
    action: "Batches overnight maintenance routines during off-peak shift charging.",
  },
  {
    id: "oem",
    name: "OEM Brand Bridge",
    tag: "Manufacturer API",
    sub: "18+ partner brands",
    icon: Building2,
    color: "#a855f7",
    ping: "20ms",
    protocol: "OAuth2 / REST",
    metrics: [
      { label: "Partner OEMs", val: "18+ Brands" },
      { label: "Claim Settlement", val: "Same-Day" },
    ],
    action: "Submits authenticated diagnostic data for instant digital warranty approvals.",
  },
  {
    id: "charging",
    name: "Fast Charging Grid",
    tag: "OCPP 2.0.1",
    sub: "180+ DC guns",
    icon: BatteryCharging,
    color: "#f59e0b",
    ping: "28ms",
    protocol: "OCPP 2.0.1 / JSON",
    metrics: [
      { label: "Fast Guns", val: "180+ Guns" },
      { label: "Grid Efficiency", val: "+32%" },
    ],
    action: "Syncs battery temp to charge gun, modulating DC current to prevent lithium plating.",
  },
];

const RIGHT_NODES: NodeItem[] = [
  {
    id: "workshops",
    name: "Master Service Bays",
    tag: "1000V Certified",
    sub: "240+ digital bays",
    icon: Wrench,
    color: "#00D084",
    ping: "16ms",
    protocol: "WebSocket Bay-Sync",
    metrics: [
      { label: "Active Bays", val: "240+ Bays" },
      { label: "First-Time Fix", val: "96.8%" },
    ],
    action: "Pushes digital job cards and validates 36-point HV safety sign-offs.",
  },
  {
    id: "parts",
    name: "EV Spare Hub",
    tag: "RFID Automated",
    sub: "12,500+ OEM SKUs",
    icon: Store,
    color: "#f59e0b",
    ping: "22ms",
    protocol: "EDI / REST API",
    metrics: [
      { label: "In-Stock SKUs", val: "12,500+" },
      { label: "Express Dispatch", val: "< 2 hours" },
    ],
    action: "Predicts spare consumption from DTC codes and dispatches before disassembly.",
  },
  {
    id: "vans",
    name: "Depot Mobile Vans",
    tag: "On-Site Service",
    sub: "< 35-min window",
    icon: Truck,
    color: "#38bdf8",
    ping: "18ms",
    protocol: "GPS / Fleet Bridge",
    metrics: [
      { label: "Mobile Vans", val: "45 Units" },
      { label: "Depot Coverage", val: "Metro Hubs" },
    ],
    action: "Performs inter-shift mobile battery swaps and preventive servicing.",
  },
  {
    id: "rsa",
    name: "Priority Roadside RSA",
    tag: "24/7 SOS Rescue",
    sub: "< 28-min arrival",
    icon: PhoneCall,
    color: "#f43f5e",
    ping: "15ms",
    protocol: "Cellular / GPS",
    metrics: [
      { label: "Avg Arrival", val: "24.6 mins" },
      { label: "Resolution Rate", val: "94.2%" },
    ],
    action: "Dispatches nearest flatbed or mobile mechanic based on live telemetry.",
  },
  {
    id: "billing",
    name: "Unified GST Settlement",
    tag: "Financial Ledger",
    sub: "100% automated",
    icon: ShieldCheck,
    color: "#00D084",
    ping: "12ms",
    protocol: "GSTN / E-Invoice API",
    metrics: [
      { label: "Invoice Accuracy", val: "100%" },
      { label: "Reconciliation", val: "Instant" },
    ],
    action: "Automates multi-party revenue splits between franchise, parts hub, and fleet.",
  },
];

const AI_INSIGHTS = [
  "Autobot AI: Detected ΔV > 82mV in Bajaj Chetak (MH-12) — queued Kothrud Bay 2",
  "Auto-reserved OEM disc brake kit #ATH-BMS-HRN9 in West Hub inventory",
  "BluSmart Cluster #08: 32 EVs completed 36-pt HV audit · Settled unified GST invoice",
  "Fast Charger Gun #04: Modulated current to prevent 41°C thermal lithium plating",
  "Depot Mobile Van #03: Completed overnight inter-shift balancing for 28 cargo 3Ws",
];

const ACTIVE_ENTITIES = [
  { label: "Ather 450X (KA-01)", sub: "98% SoH · Normal", dot: "#00D084" },
  { label: "Zepto Cargo #18", sub: "Bay 2 Scheduled", dot: "#00D084" },
  { label: "120kW DC Gun #04", sub: "41°C Modulated", dot: "#f59e0b" },
  { label: "RFID Depo West", sub: "12,500 SKUs Ready", dot: "#00D084" },
];

function NodeFloatingPopover({
  node,
  side,
}: {
  node: NodeItem;
  side: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, x: side === "left" ? 10 : -10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`absolute z-50 pointer-events-none w-72 sm:w-80 p-4 rounded-2xl bg-[#060e0a]/98 border border-[#00D084]/45 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(0,208,132,0.2)] backdrop-blur-2xl text-left ${
        side === "left"
          ? "left-full ml-4 top-1/2 -translate-y-1/2"
          : "right-full mr-4 top-1/2 -translate-y-1/2"
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] font-mono">
        <span className="font-bold text-[#00D084] flex items-center gap-1.5 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-ping" />
          {node.tag}
        </span>
        <span className="text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          {node.ping} · {node.protocol}
        </span>
      </div>

      <h5 className="text-sm font-bold text-white mb-0.5">{node.name}</h5>
      <p className="text-[11px] text-white/60 font-light mb-3 leading-relaxed">
        {node.sub}
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/10 mb-2.5">
        {node.metrics.map((m, i) => (
          <div key={i}>
            <span className="text-[8.5px] font-mono uppercase text-white/40 block tracking-wider">
              {m.label}
            </span>
            <span className="text-xs font-mono font-bold text-white">{m.val}</span>
          </div>
        ))}
      </div>

      {/* Autonomous Action */}
      <div className="text-[9.5px] font-mono text-[#00D084]/95 bg-[#00D084]/10 border border-[#00D084]/20 p-2 rounded-lg leading-relaxed">
        ⚡ {node.action}
      </div>
    </motion.div>
  );
}

export function EcosystemHubVisualizer() {
  const [viewMode, setViewMode] = useState<ViewMode>("topology");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeInsightIndex, setActiveInsightIndex] = useState(0);

  // Cycle through live autonomous insights smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveInsightIndex((prev) => (prev + 1) % AI_INSIGHTS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative z-20">
      {/* ── Top Header & Minimal Switcher ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[10px] font-mono text-[#00D084] font-bold uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
            Autobot OS // Live Central Nervous System
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Autonomous Aftermarket Neural Network
          </h3>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Minimal 2-view pill toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/10 text-xs font-mono backdrop-blur-md">
            <button
              onClick={() => setViewMode("topology")}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "topology"
                  ? "bg-[#00D084] text-black font-bold shadow-[0_0_15px_rgba(0,208,132,0.35)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Neural Matrix
            </button>
            <button
              onClick={() => setViewMode("stack")}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "stack"
                  ? "bg-[#00D084] text-black font-bold shadow-[0_0_15px_rgba(0,208,132,0.35)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              4-Tier Stack
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-[#00D084]/25 text-[11px] font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D084] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D084]" />
            </span>
            <span className="text-white/60">AUTOBOT OS:</span>
            <span className="text-[#00D084] font-bold">14,820 NODES ONLINE (14ms)</span>
          </div>
        </div>
      </div>

      {/* ── View 1: Reference-Inspired Neural Topology Matrix ── */}
      {viewMode === "topology" && (
        <div className="relative rounded-[32px] bg-gradient-to-b from-[#040805] via-[#020503] to-[#040805] border border-white/15 p-4 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden">
          {/* Ambient radial lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,208,132,0.12)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* Mobile swipe helper */}
          <div className="lg:hidden text-center text-[10px] font-mono text-white/40 mb-2">
            ← Scroll horizontally to view full neural network →
          </div>

          {/* Horizontally scrollable canvas for perfect mobile & desktop compatibility */}
          <div className="w-full overflow-x-auto scrollbar-none py-2">
            <div className="w-[1160px] h-[500px] relative mx-auto select-none">
              
              {/* ── SVG Smooth Curved Connectors Canvas ── */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 1160 500"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Left Splines: Left Node (215, y) -> Connect (305, 250) */}
                {LEFT_NODES.map((node, i) => {
                  const y1 = 40 + i * 95 + 24; // 64, 159, 254, 349, 444
                  const pathD = `M 215 ${y1} C 265 ${y1}, 275 250, 305 250`;
                  const isHovered = hoveredNode === node.id;

                  return (
                    <g key={`spline-left-${node.id}`}>
                      {/* Base Line */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={isHovered ? "#00D084" : "rgba(255,255,255,0.14)"}
                        strokeWidth={isHovered ? 2.5 : 1.5}
                        className="transition-colors duration-300"
                      />
                      {/* Animated dashed stream */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#00D084"
                        strokeWidth={isHovered ? 2 : 1}
                        strokeDasharray="4 10"
                        opacity={isHovered ? 0.95 : 0.45}
                      />
                      {/* Gliding Glowing Data Packet */}
                      <circle r={isHovered ? 3.5 : 2.5} fill="#00D084" filter="url(#glowGreen)">
                        <animateMotion
                          dur={`${2.4 + i * 0.25}s`}
                          repeatCount="indefinite"
                          path={pathD}
                        />
                      </circle>
                    </g>
                  );
                })}

                {/* Straight line: Connect (345, 250) -> Center Card (415, 250) */}
                <path
                  d="M 345 250 L 415 250"
                  fill="none"
                  stroke="#00D084"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  opacity="0.8"
                />
                <circle r="3" fill="#00D084" filter="url(#glowGreen)">
                  <animateMotion dur="1.2s" repeatCount="indefinite" path="M 345 250 L 415 250" />
                </circle>

                {/* Straight line: Center Card (745, 250) -> Sync (815, 250) */}
                <path
                  d="M 745 250 L 815 250"
                  fill="none"
                  stroke="#00D084"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  opacity="0.8"
                />
                <circle r="3" fill="#00D084" filter="url(#glowGreen)">
                  <animateMotion dur="1.2s" repeatCount="indefinite" path="M 745 250 L 815 250" />
                </circle>

                {/* Right Splines: Sync (855, 250) -> Right Node (945, y) */}
                {RIGHT_NODES.map((node, i) => {
                  const y2 = 40 + i * 95 + 24; // 64, 159, 254, 349, 444
                  const pathD = `M 855 250 C 885 250, 900 ${y2}, 945 ${y2}`;
                  const isHovered = hoveredNode === node.id;

                  return (
                    <g key={`spline-right-${node.id}`}>
                      {/* Base Line */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={isHovered ? "#00D084" : "rgba(255,255,255,0.14)"}
                        strokeWidth={isHovered ? 2.5 : 1.5}
                        className="transition-colors duration-300"
                      />
                      {/* Animated dashed stream */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#00D084"
                        strokeWidth={isHovered ? 2 : 1}
                        strokeDasharray="4 10"
                        opacity={isHovered ? 0.95 : 0.45}
                      />
                      {/* Gliding Glowing Data Packet */}
                      <circle r={isHovered ? 3.5 : 2.5} fill="#00D084" filter="url(#glowGreen)">
                        <animateMotion
                          dur={`${2.4 + i * 0.25}s`}
                          repeatCount="indefinite"
                          path={pathD}
                        />
                      </circle>
                    </g>
                  );
                })}
              </svg>

              {/* ── Left Column: 5 Input Integration Nodes ── */}
              <div className="absolute left-[15px] top-[40px] flex flex-col gap-[47px]">
                {LEFT_NODES.map((node) => {
                  const isHovered = hoveredNode === node.id;
                  const Icon = node.icon;

                  return (
                    <div
                      key={node.id}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="relative"
                    >
                      <div
                        className={`w-[200px] h-[48px] px-3 py-2 rounded-xl flex items-center justify-between border transition-all duration-200 cursor-pointer ${
                          isHovered
                            ? "bg-[#09180f] border-[#00D084] shadow-[0_0_20px_rgba(0,208,132,0.3)] scale-[1.03]"
                            : "bg-[#060c08]/95 border-white/10 hover:border-white/25"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border"
                            style={{
                              backgroundColor: `${node.color}15`,
                              borderColor: `${node.color}35`,
                              color: node.color,
                            }}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 text-left">
                            <span className="text-xs font-bold text-white block truncate leading-tight">
                              {node.name}
                            </span>
                            <span className="text-[9px] font-mono text-white/50 block truncate">
                              {node.sub}
                            </span>
                          </div>
                        </div>

                        {/* Connection pin dot */}
                        <div
                          className={`w-2 h-2 rounded-full border transition-all ${
                            isHovered
                              ? "bg-[#00D084] border-[#00D084] shadow-[0_0_8px_#00D084]"
                              : "bg-white/15 border-white/20"
                          }`}
                        />
                      </div>

                      {/* Floating Tooltip anchored directly over the hovered card */}
                      <AnimatePresence>
                        {isHovered && <NodeFloatingPopover node={node} side="left" />}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* ── "Connect" Gateway Node ── */}
              <div className="absolute left-[305px] top-[228px] w-[40px] h-[44px] flex flex-col items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-[#050b07] border border-[#00D084]/45 flex items-center justify-center text-[#00D084] shadow-[0_0_15px_rgba(0,208,132,0.3)]">
                  <Radio className="w-4 h-4 animate-pulse" />
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/80 mt-1">
                  Connect
                </span>
              </div>

              {/* ── Central Autobot OS Engine Card (Modeled on Reference Design) ── */}
              <div
                className="absolute left-[415px] top-[95px] w-[330px] h-[310px] rounded-3xl bg-gradient-to-b from-[#08140c]/95 via-[#040906]/98 to-[#020503] border border-white/15 hover:border-[#00D084]/50 shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-5 backdrop-blur-2xl flex flex-col justify-between text-center select-none transition-all duration-300 relative overflow-hidden"
              >
                {/* Background ambient lighting */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D084]/10 rounded-full blur-2xl pointer-events-none" />

                {/* 1. Top Prompt / AI Action Pill with Sparkle */}
                <div className="relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-[#00D084] shrink-0 animate-pulse" />
                  <div className="min-w-0 overflow-hidden flex-1 text-left">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeInsightIndex}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.22 }}
                        className="text-[10px] font-mono text-white/90 truncate font-medium"
                      >
                        {AI_INSIGHTS[activeInsightIndex]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* 2. Middle: Connected Entity Status Chips */}
                <div className="relative z-10 grid grid-cols-2 gap-2 my-auto">
                  {ACTIVE_ENTITIES.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.02] border border-white/5 text-left hover:border-white/15 transition-all"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.dot }}
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-white block truncate leading-tight">
                          {item.label}
                        </span>
                        <span className="text-[8.5px] font-mono text-white/50 block truncate mt-0.5">
                          {item.sub}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3. Bottom: Database Badge with Radiating Radar Wave Rings */}
                <div className="relative z-10 flex flex-col items-center pt-2">
                  {/* Concentric semi-circular signal rings radiating upward */}
                  <div className="absolute -top-7 flex items-center justify-center pointer-events-none">
                    <div className="w-24 h-24 rounded-full border border-[#00D084]/20 animate-ping opacity-25" />
                    <div className="w-16 h-16 rounded-full border border-dashed border-[#00D084]/35 animate-pulse" />
                    <div className="w-8 h-8 rounded-full bg-[#00D084]/15 blur-sm" />
                  </div>

                  <div className="relative z-10 w-9 h-9 rounded-full bg-[#050b07] border border-[#00D084]/50 flex items-center justify-center text-[#00D084] shadow-[0_0_20px_rgba(0,208,132,0.4)] mb-1">
                    <Database className="w-4 h-4" />
                  </div>

                  <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider block">
                    AUTOBOT OS v4.2
                  </span>
                  <span className="text-[8.5px] font-mono text-[#00D084] tracking-tight block">
                    14ms LATENCY · 68 MASTER HUBS · 99.98% LIVE SLA
                  </span>
                </div>
              </div>

              {/* ── "Sync" Gateway Node ── */}
              <div className="absolute left-[815px] top-[228px] w-[40px] h-[44px] flex flex-col items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-[#050b07] border border-[#00D084]/45 flex items-center justify-center text-[#00D084] shadow-[0_0_15px_rgba(0,208,132,0.3)]">
                  <RefreshCw className="w-4 h-4 animate-[spin_10s_linear_infinite]" />
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/80 mt-1">
                  Sync
                </span>
              </div>

              {/* ── Right Column: 5 Fulfillment Target Nodes ── */}
              <div className="absolute left-[945px] top-[40px] flex flex-col gap-[47px]">
                {RIGHT_NODES.map((node) => {
                  const isHovered = hoveredNode === node.id;
                  const Icon = node.icon;

                  return (
                    <div
                      key={node.id}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="relative"
                    >
                      <div
                        className={`w-[200px] h-[48px] px-3 py-2 rounded-xl flex items-center justify-between border transition-all duration-200 cursor-pointer ${
                          isHovered
                            ? "bg-[#09180f] border-[#00D084] shadow-[0_0_20px_rgba(0,208,132,0.3)] scale-[1.03]"
                            : "bg-[#060c08]/95 border-white/10 hover:border-white/25"
                        }`}
                      >
                        {/* Connection pin dot */}
                        <div
                          className={`w-2 h-2 rounded-full border transition-all ${
                            isHovered
                              ? "bg-[#00D084] border-[#00D084] shadow-[0_0_8px_#00D084]"
                              : "bg-white/15 border-white/20"
                          }`}
                        />

                        <div className="flex items-center gap-2.5 min-w-0 text-right">
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-white block truncate leading-tight">
                              {node.name}
                            </span>
                            <span className="text-[9px] font-mono text-white/50 block truncate">
                              {node.sub}
                            </span>
                          </div>
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border"
                            style={{
                              backgroundColor: `${node.color}15`,
                              borderColor: `${node.color}35`,
                              color: node.color,
                            }}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* Floating Tooltip anchored directly over the hovered card */}
                      <AnimatePresence>
                        {isHovered && <NodeFloatingPopover node={node} side="right" />}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── View 2: 4-Tier Infrastructure Stack Explorer ── */}
      {viewMode === "stack" && <EcosystemStackExplorer />}
    </div>
  );
}
