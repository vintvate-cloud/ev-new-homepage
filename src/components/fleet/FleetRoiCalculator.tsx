import React, { useState } from "react";
import { Check, ShieldCheck, Zap, TrendingUp, Clock, ChevronDown, ChevronUp } from "lucide-react";

export function FleetRoiCalculator() {
  const [fleetSize, setFleetSize] = useState(45);
  const [vehicleType, setVehicleType] = useState<"2W" | "3W" | "mixed">("mixed");
  const [showMatrix, setShowMatrix] = useState(false);

  // Dynamic calculations
  const downtimeSavedHours = Math.round(fleetSize * 3.8);
  const costPrevented = (fleetSize * 2850).toLocaleString("en-IN");
  const batteryLifeExtendedMonths = "6–8 Months";

  const recommendedTier =
    fleetSize <= 25 ? "Fleet Essential" : fleetSize <= 100 ? "Fleet Pro" : "Fleet Enterprise";

  return (
    <div className="w-full space-y-10 text-left">
      {/* ── Interactive Fleet Simulator ── */}
      <div className="rounded-3xl bg-[#060e08] border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00D084]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[10px] font-mono font-bold text-[#00D084] uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              Interactive Fleet AMC Planner
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Estimate Your Fleet Uptime &amp; Savings
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-light mt-1 max-w-xl">
              Simulate operational savings and find the ideal maintenance tier based on your active vehicle count.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/70 bg-black/40 px-3.5 py-1.5 rounded-xl border border-white/10">
            <span>RECOMMENDED: <strong className="text-[#00D084]">{recommendedTier}</strong></span>
          </div>
        </div>

        {/* Controls & Live Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Sliders & Buttons */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono text-white/50 uppercase tracking-wider font-bold">
                  Active Commercial Vehicles
                </label>
                <span className="text-lg font-black text-[#00D084] font-mono">
                  {fleetSize} Vehicles
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                step="5"
                value={fleetSize}
                onChange={(e) => setFleetSize(Number(e.target.value))}
                className="w-full accent-[#00D084] cursor-pointer h-2 bg-white/10 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                <span>10 Vehicles (Essential)</span>
                <span>100 (Pro)</span>
                <span>250+ (Enterprise)</span>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-white/50 uppercase tracking-wider block mb-2 font-bold">
                Vehicle Fleet Composition
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "2W", label: "Electric 2W" },
                  { id: "3W", label: "3W Cargo / Auto" },
                  { id: "mixed", label: "Mixed Fleet" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setVehicleType(item.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
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

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/60 font-light leading-relaxed">
              ↳ Includes certified monthly CAN-bus cell balancing and digital audit reports directly in Autobot OS.
            </div>
          </div>

          {/* Right: Calculated Metrics */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#09150e] border border-[#00D084]/30 shadow-lg">
              <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                Monthly Shift Hours Saved
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono mb-1">
                ~{downtimeSavedHours} Hrs
              </div>
              <span className="text-[11px] text-[#00D084] font-mono font-medium">
                Prevented breakdown delays
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#09150e] border border-[#00D084]/30 shadow-lg">
              <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                Estimated Monthly Savings
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#00D084] font-mono mb-1">
                ₹{costPrevented}
              </div>
              <span className="text-[11px] text-white/50 font-mono font-medium">
                In breakdown &amp; early wear costs
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#09150e] border border-[#00D084]/30 shadow-lg">
              <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                Battery Life Extended
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#F5A623] font-mono mb-1">
                {batteryLifeExtendedMonths}
              </div>
              <span className="text-[11px] text-white/50 font-mono font-medium">
                Via regular cell balancing
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#09150e] border border-[#00D084]/30 shadow-lg">
              <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                Guaranteed Target SLA
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono mb-1">
                99.4% Uptime
              </div>
              <span className="text-[11px] text-[#00D084] font-mono font-medium">
                Contractually backed
              </span>
            </div>
          </div>
        </div>
      </div>



      {/* ── Toggle Full Detailed 10-Feature Matrix (Exact Original Table) ── */}
      <div className="pt-4">
        <button
          onClick={() => setShowMatrix(!showMatrix)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 transition-all cursor-pointer"
        >
          <span>{showMatrix ? "Hide Detailed Feature Comparison" : "View Detailed 10-Feature Comparison Matrix"}</span>
          {showMatrix ? <ChevronUp className="w-4 h-4 text-[#00D084]" /> : <ChevronDown className="w-4 h-4 text-[#00D084]" />}
        </button>

        {showMatrix && (
          <div className="mt-4 plans-table-reveal overflow-x-auto rounded-2xl border border-white/10 bg-[#080d0a] shadow-2xl">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-white/5 border-b border-white/10 text-white/50 font-mono uppercase text-[11px]">
                <tr>
                  <th className="p-4 w-1/4">Feature</th>
                  <th className="p-4 text-center">Fleet Essential (10–25)</th>
                  <th className="p-4 text-center bg-[#0D5C2E]/20 text-[#00D084]">Fleet Pro (26–100)</th>
                  <th className="p-4 text-center">Fleet Enterprise (100+)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="p-4 font-bold text-white">Monthly preventive service</td>
                  <td className="p-4 text-center text-[#00D084]">✓</td>
                  <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">✓</td>
                  <td className="p-4 text-center text-[#00D084]">✓</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Battery health audit</td>
                  <td className="p-4 text-center text-white/60">Quarterly</td>
                  <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">Monthly</td>
                  <td className="p-4 text-center text-white font-semibold">Monthly + Live Alerts</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Priority service bay</td>
                  <td className="p-4 text-center text-white/30">—</td>
                  <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">✓</td>
                  <td className="p-4 text-center text-[#00D084]">✓</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Breakdown response</td>
                  <td className="p-4 text-center text-white/60">Standard</td>
                  <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">Priority</td>
                  <td className="p-4 text-center text-white font-semibold">Custom SLA</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Depot service team</td>
                  <td className="p-4 text-center text-white/30">—</td>
                  <td className="p-4 text-center bg-[#0D5C2E]/10 text-white/80">On Request</td>
                  <td className="p-4 text-center text-[#00D084] font-bold">✓ Dedicated</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Dedicated account manager</td>
                  <td className="p-4 text-center text-white/30">—</td>
                  <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">✓</td>
                  <td className="p-4 text-center text-[#00D084]">✓</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Fleet dashboard</td>
                  <td className="p-4 text-center text-[#00D084]">✓</td>
                  <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">✓</td>
                  <td className="p-4 text-center text-[#00D084]">✓ + API Integration</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Parts at contract rates</td>
                  <td className="p-4 text-center text-[#00D084]">✓</td>
                  <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">✓</td>
                  <td className="p-4 text-center text-[#00D084]">✓</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Monthly business review</td>
                  <td className="p-4 text-center text-white/30">—</td>
                  <td className="p-4 text-center bg-[#0D5C2E]/10 text-white/80">Quarterly</td>
                  <td className="p-4 text-center text-white font-semibold">Monthly</td>
                </tr>
                <tr className="bg-white/5 font-mono">
                  <td className="p-4 font-bold text-white">Pricing</td>
                  <td className="p-4 text-center text-white">Custom per vehicle</td>
                  <td className="p-4 text-center bg-[#0D5C2E]/20 text-[#00D084] font-bold">Recommended for scale</td>
                  <td className="p-4 text-center text-white">Custom SLA &amp; Volume</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

