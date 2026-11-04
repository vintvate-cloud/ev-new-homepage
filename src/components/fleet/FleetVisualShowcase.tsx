import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  Activity,
  Truck,
  Building2,
  Zap,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";

const DOMAINS = [
  {
    id: "battery",
    tag: "PREDICTIVE BATTERY AUDITS",
    title: "Cell-Level Telemetry & Pack Balancing",
    desc: "Monthly CAN-bus scans identify internal resistance delta, thermal anomalies, and failing cells weeks before they trigger unexpected mid-shift downtime.",
    image: "/gallery/battery-lab.png",
    stat: "99.4%",
    statLabel: "Predictive Diagnosis Accuracy",
    points: [
      "Individual cell impedance and voltage delta analysis",
      "Automated balancing restores up to 12% lost daily range",
      "Historical battery State-of-Health (SoH) degradation curves",
    ],
  },
  {
    id: "depot",
    tag: "DEPOT & DOORSTEP CARE",
    title: "Mobile Workshop Teams at Your Rider Hub",
    desc: "Certified mobile technician units arrive directly at your charging hubs, dark stores, and rider shift depots to perform PM checklists while vehicles charge.",
    image: "/hero/doorstep_repairs.png",
    stat: "< 35 Mins",
    statLabel: "Average Inter-Shift PM Service",
    points: [
      "Zero rider downtime during active earning and peak delivery windows",
      "Full 32-point mechanical, electrical, and firmware checklist",
      "Digital job cards signed off directly on Autobot Mobile App",
    ],
  },
  {
    id: "rsa",
    tag: "PRIORITY FLEET RSA",
    title: "Express On-Demand Breakdown & Towing",
    desc: "Dedicated roadside response vans and flatbeds geofenced across active city zones ensure stranded riders and cargo vehicles are recovered without lost shift revenue.",
    image: "/hero/rsa_service.png",
    stat: "< 45 Mins",
    statLabel: "Guaranteed SLA Response",
    points: [
      "Priority dispatch pipeline reserved for commercial fleet contracts",
      "On-spot puncture, fuse, relay, brake, and throttle replacement",
      "Express flatbed towing to the nearest multi-brand hub if non-drivable",
    ],
  },
  {
    id: "parts",
    tag: "PARTS & POWERTRAIN LAB",
    title: "Contract-Rate Parts & Powertrain Repairs",
    desc: "Direct access to EV Spare Hub inventory at pre-negotiated wholesale rates. In-house repair for motors, controllers, DC-DC converters, and onboard chargers.",
    image: "/hero/genuine_parts.png",
    stat: "2 Hours",
    statLabel: "Local Parts Depot Dispatch",
    points: [
      "Guaranteed stock of controllers, throttles, pads, tyres, and chargers",
      "Serial-number barcode tracking eliminates component shrinkage",
      "OEM-certified component repairs at 60% lower cost than replacement",
    ],
  },
];

const ALL_SERVICES = [
  {
    step: "01",
    title: "Preventive maintenance AMC",
    desc: "Scheduled servicing to a fixed EV checklist: brakes, tyres, suspension, connectors, firmware.",
    icon: Wrench,
  },
  {
    step: "02",
    title: "Predictive battery health",
    desc: "Monthly cell-level scans, balancing and SoH trends that flag weak packs before they fail.",
    icon: Activity,
  },
  {
    step: "03",
    title: "Breakdown & roadside response",
    desc: "Priority dispatch for fleet vehicles, with towing to the nearest hub when needed.",
    icon: Truck,
  },
  {
    step: "04",
    title: "Depot and doorstep service",
    desc: "Technician teams at your depot or rider hubs, so vehicles are serviced between shifts.",
    icon: Building2,
  },
  {
    step: "05",
    title: "Motor, controller & charger repair",
    desc: "EV-grade diagnostics and repair for powertrain and charging faults, across brands.",
    icon: Zap,
  },
  {
    step: "06",
    title: "Parts at contract rates",
    desc: "Batteries, chargers, controllers, tyres and brake parts supplied through EV Spare Hub.",
    icon: Cpu,
  },
  {
    step: "07",
    title: "Battery lifecycle management",
    desc: "Repair, refurbishment and replacement planning, with certified end-of-life handling.",
    icon: Layers,
  },
  {
    step: "08",
    title: "Rider care training",
    desc: "Short practical sessions for riders on charging habits and daily checks that cut avoidable faults.",
    icon: ShieldCheck,
  },
];

export function FleetVisualShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const current = DOMAINS[activeTab];

  return (
    <div className="w-full space-y-12 text-left">
      {/* ── Interactive Visual Stage Switcher ── */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 p-2 rounded-2xl bg-[#060c08] border border-white/10 max-w-4xl">
          {DOMAINS.map((dom, idx) => (
            <button
              key={dom.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === idx
                  ? "bg-[#00D084] text-black shadow-[0_0_20px_rgba(0,208,132,0.4)]"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>[0{idx + 1}]</span>
              <span>{dom.tag}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-[#07110b] border border-white/15 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch"
          >
            {/* Left Column: Details & Key Points */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#00D084] uppercase tracking-wider block mb-2">
                  // {current.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  {current.title}
                </h3>
                <p className="text-sm text-white/70 font-light mt-3 leading-relaxed">
                  {current.desc}
                </p>

                {/* Bullets */}
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

              {/* Performance Target Pill */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between font-mono">
                <div>
                  <span className="text-[10px] text-white/50 uppercase block">Fleet Target SLA</span>
                  <span className="text-sm font-bold text-white">{current.statLabel}</span>
                </div>
                <span className="text-2xl font-black text-[#00D084]">{current.stat}</span>
              </div>
            </div>

            {/* Right Column: High-Res Editorial Photography with HUD Badges */}
            <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full overflow-hidden group">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-[10px] font-mono text-white/90 font-bold flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#00D084] animate-ping" />
                <span>AUTOBOT FLEET COMMAND</span>
              </div>

              {/* Bottom Info Pill */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#00D084] tracking-widest font-bold block">
                    Zero Operational Blindspots
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white">
                    Integrated Fleet Service Infrastructure
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── All 8 Comprehensive Fleet Solutions Grid (Exact Original Content) ── */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
            All 8 Modular Fleet Capabilities
          </span>
          <span className="text-xs font-mono text-[#00D084]">
            Available standalone or bundled into AMC
          </span>
        </div>

        <div className="fleet-services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALL_SERVICES.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.step}
                className="fleet-service-card p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#00D084]">{card.step}</span>
                    <Icon className="w-5 h-5 text-white/40 group-hover:text-[#00D084] transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-white">
                    {card.title}
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

