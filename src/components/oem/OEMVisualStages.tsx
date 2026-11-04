import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Wrench, Battery, Store, CheckCircle2, 
  ArrowRight, Sparkles, Cpu, Activity, Clock 
} from "lucide-react";

const STAGES = [
  {
    id: "warranty",
    num: "01",
    tag: "WARRANTY & CAMPAIGNS",
    title: "Nationwide Warranty & Recall Execution",
    badge: "Same-Day Claim Approvals",
    desc: "Your warranty claims diagnosed, documented with CAN-bus evidence, and executed to your exact manufacturer labour times without capex.",
    image: "/gallery/hydraulic-lift.png",
    stat: "< 24 Hours",
    statLabel: "Mean Claim Processing",
    points: [
      "Digital job cards with photo and sensor evidence attached",
      "Exact OEM labour time and reimbursement rate compliance",
      "Seamless batch recall scheduling with SMS/WhatsApp outreach",
    ],
  },
  {
    id: "pdi-launch",
    num: "02",
    tag: "CITY READINESS",
    title: "14-Day Rapid Market Entry & PDI",
    badge: "Turn-Key Launch Playbook",
    desc: "Launch deliveries in any new Indian city with fully operational high-voltage bays, certified technicians, and parts buffers ready on Day 1.",
    image: "/gallery/scanner.png",
    stat: "14 Days",
    statLabel: "New City Readiness",
    points: [
      "Rigorous 36-point pre-delivery inspection (PDI) with digital sign-off",
      "Baseline battery state-of-health (SoH) recorded before customer delivery",
      "Instant urban service footprint without lease commitments",
    ],
  },
  {
    id: "battery-lab",
    num: "03",
    tag: "HIGH VOLTAGE LAB",
    title: "Battery Teardown & Module Refurbishment",
    badge: "1000V Certified Workspace",
    desc: "Dedicated battery diagnostic labs capable of cell-level interrogation, balancing, module rebuilds, and second-life repurposing.",
    image: "/gallery/battery-lab.png",
    stat: "99.4%",
    statLabel: "Diagnostics Accuracy",
    points: [
      "Cell impedance testing and thermistor calibration",
      "Isolated explosion-proof high-voltage teardown enclosure",
      "Second-life battery certification for stationary energy storage",
    ],
  },
  {
    id: "parts-logistics",
    num: "04",
    tag: "SUPPLY CHAIN",
    title: "RFID-Tracked Spare Parts Buffer",
    badge: "2-Hour Intra-City SLA",
    desc: "Regional parts depots with barcode and serial-level traceability, preventing customer vehicles from sitting idle waiting for consignments.",
    image: "/franchise-banner-building.png",
    stat: "12,500+",
    statLabel: "Active OEM SKUs",
    points: [
      "Automated replenishment triggered by diagnostic fault codes",
      "Serial-level barcode scanning from warehouse rack to vehicle bay",
      "Express 2-hour intra-city delivery to all regional service centres",
    ],
  },
];

export function OEMVisualStages() {
  const [activeStage, setActiveStage] = useState(0);
  const current = STAGES[activeStage];

  return (
    <div className="w-full space-y-8 text-left">
      {/* Stage Selector Pills */}
      <div className="flex flex-wrap gap-2 p-2 rounded-2xl bg-[#060c08] border border-white/10 max-w-4xl">
        {STAGES.map((stage, idx) => (
          <button
            key={stage.id}
            onClick={() => setActiveStage(idx)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeStage === idx
                ? "bg-[#00D084] text-black shadow-[0_0_20px_rgba(0,208,132,0.4)]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>[{stage.num}]</span>
            <span>{stage.tag}</span>
          </button>
        ))}
      </div>

      {/* Cinematic Visual Stage Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-[#07110b] border border-white/15 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch"
        >
          {/* Left: Content & Bullet Points */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00D084] uppercase tracking-wider mb-2">
                <span>Phase {current.num}</span>
                <span>//</span>
                <span>{current.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {current.title}
              </h3>
              <p className="text-sm text-white/70 font-light mt-3 leading-relaxed">
                {current.desc}
              </p>

              {/* Punchy Key Highlights */}
              <div className="space-y-3 mt-6 pt-6 border-t border-white/10">
                {current.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stat Bar */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between font-mono">
              <div>
                <span className="text-[10px] text-white/50 uppercase block">Performance Target</span>
                <span className="text-sm font-bold text-white">{current.statLabel}</span>
              </div>
              <span className="text-2xl font-black text-[#00D084]">{current.stat}</span>
            </div>
          </div>

          {/* Right: High-Res Editorial Photography with HUD Badges */}
          <div className="lg:col-span-6 relative min-h-[360px] lg:min-h-full overflow-hidden group">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

            {/* Floating Top HUD Tag */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-[10px] font-mono text-white/90 font-bold flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#00D084] animate-ping" />
              <span>FACILITY VERIFIED // 1000V</span>
            </div>

            {/* Bottom Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#00D084] tracking-widest font-bold block">
                  Autobot OS Linked
                </span>
                <span className="text-base font-bold text-white">
                  Real-Time SOP Telemetry Synchronized
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

