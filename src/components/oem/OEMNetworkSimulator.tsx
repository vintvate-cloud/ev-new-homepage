import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, TrendingUp, Clock, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

export function OEMNetworkSimulator() {
  const [vehicleType, setVehicleType] = useState<"2W" | "3W" | "Fleet">("2W");
  const [scale, setScale] = useState<"5_cities" | "12_metros" | "pan_india">("12_metros");

  // Dynamic calculations based on selection
  let bays = "72 Bays";
  let capexSaved = "₹2.8 Cr";
  let launchTime = "14 Days";
  let sla = "< 3.2 Hours";
  let cities = "12 Major Metros";

  if (scale === "5_cities") {
    bays = vehicleType === "Fleet" ? "36 Bays" : "28 Bays";
    capexSaved = "₹1.4 Cr";
    launchTime = "10 Days";
    sla = "< 2.8 Hours";
    cities = "5 Target Cities";
  } else if (scale === "pan_india") {
    bays = vehicleType === "Fleet" ? "210 Bays" : "180+ Bays";
    capexSaved = "₹6.2 Cr";
    launchTime = "21 Days";
    sla = "< 3.5 Hours";
    cities = "35+ Tier 1 & 2 Cities";
  } else {
    bays = vehicleType === "Fleet" ? "88 Bays" : "72 Bays";
    capexSaved = "₹2.8 Cr";
    launchTime = "14 Days";
    sla = "< 3.2 Hours";
    cities = "12 Major Metros";
  }

  return (
    <div className="w-full rounded-3xl bg-[#060e08] border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden text-left">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#00D084]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[10px] font-mono font-bold text-[#00D084] uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            Interactive Network Planner
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Estimate Your After-Sales Launch Capacity
          </h3>
          <p className="text-xs sm:text-sm text-white/60 font-light mt-1 max-w-xl">
            Simulate your service bay capacity, capex savings, and turnaround speed based on your expansion goals.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-white/50 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
          <span>SLA GUARANTEE: <strong>98.5% UPTIME</strong></span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Step 1: Vehicle Segment */}
          <div>
            <label className="text-[11px] font-mono text-white/50 uppercase tracking-wider block mb-2 font-bold">
              1. Select Vehicle Platform
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "2W", label: "Electric 2W" },
                { id: "3W", label: "3W & Cargo" },
                { id: "Fleet", label: "Commercial" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setVehicleType(item.id as any)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                    vehicleType === item.id
                      ? "bg-[#00D084] text-black border-[#00D084] shadow-[0_0_15px_rgba(0,208,132,0.3)]"
                      : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Footprint Scale */}
          <div>
            <label className="text-[11px] font-mono text-white/50 uppercase tracking-wider block mb-2 font-bold">
              2. Target Expansion Footprint
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "5_cities", label: "5 Cities" },
                { id: "12_metros", label: "12 Metros" },
                { id: "pan_india", label: "Pan-India" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setScale(item.id as any)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                    scale === item.id
                      ? "bg-[#00D084] text-black border-[#00D084] shadow-[0_0_15px_rgba(0,208,132,0.3)]"
                      : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/60 font-light leading-relaxed">
            ↳ Network capacity is backed by Autobot Academy certified technicians, standardized 1000V HV tooling, and automated spare parts buffer.
          </div>
        </div>

        {/* Right: Live Simulated Metrics Output */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#09150e] border border-[#00D084]/30 shadow-lg">
            <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
              Active Service Capacity
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mb-1">
              {bays}
            </div>
            <span className="text-[11px] text-[#00D084] font-mono font-medium">
              Across {cities}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#09150e] border border-[#00D084]/30 shadow-lg">
            <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
              Estimated Capex Saved
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#00D084] font-mono mb-1">
              {capexSaved}
            </div>
            <span className="text-[11px] text-white/50 font-mono font-medium">
              Zero retail real estate lease
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#09150e] border border-[#00D084]/30 shadow-lg">
            <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
              Launch Readiness Velocity
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#F5A623] font-mono mb-1">
              {launchTime}
            </div>
            <span className="text-[11px] text-white/50 font-mono font-medium">
              vs 6+ months company-owned
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#09150e] border border-[#00D084]/30 shadow-lg">
            <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
              First-Fix Turnaround SLA
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mb-1">
              {sla}
            </div>
            <span className="text-[11px] text-[#00D084] font-mono font-medium">
              AI-guided diagnostic accuracy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

