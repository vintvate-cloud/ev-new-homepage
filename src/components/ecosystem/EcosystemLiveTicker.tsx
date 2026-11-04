import React, { useState, useEffect } from "react";
import { Terminal, Play, Pause, RefreshCw, Radio, CheckCircle2, ShieldAlert } from "lucide-react";
import { SIMULATED_TELEMETRY_LOGS } from "./ecosystem-data";

export function EcosystemLiveTicker() {
  const [logs, setLogs] = useState(SIMULATED_TELEMETRY_LOGS);
  const [filter, setFilter] = useState<string>("ALL");
  const [isPaused, setIsPaused] = useState(false);

  // Periodically add new simulated events to make it feel like a live data firehose
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const vehicleModels = [
        "Ola S1 Pro (MH-14-EA-9912)",
        "Ather 450X (KA-01-EV-3310)",
        "TVS iQube (DL-03-AQ-1194)",
        "Bajaj Chetak (MH-12-RR-8840)",
        "Mahindra Treo Zor (MH-14-TR-4029)",
        "Tata Ace EV Fleet #11",
      ];
      const categories = ["BMS", "PARTS", "FLEET", "CHARGING", "SAFETY"];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomVehicle = vehicleModels[Math.floor(Math.random() * vehicleModels.length)];

      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];

      let eventDesc = "Routine diagnostic heartbeat received; SoC 74%, Cell delta 12mV";
      let actionDesc = "Logged to permanent vehicle health passport";
      let status = "OPTIMAL";

      if (randomCategory === "BMS") {
        eventDesc = `SoH health report generated; Battery pack running at 98.4% efficiency`;
        actionDesc = `Synced with Autobot AI predictive maintenance queue`;
        status = "STREAMING";
      } else if (randomCategory === "PARTS") {
        eventDesc = `Brake pad wear index reached 82% on rear caliper`;
        actionDesc = `Auto-reserved OEM disc pad set in nearby Hub inventory`;
        status = "RESERVED";
      } else if (randomCategory === "FLEET") {
        eventDesc = `Batch AMC routine verified for 18 commercial delivery units`;
        actionDesc = `Uptime certificate issued; zero downtime reported`;
        status = "VERIFIED";
      } else if (randomCategory === "CHARGING") {
        eventDesc = `60kW Fast charger session completed in 26 mins`;
        actionDesc = `Cell balancing verified at 100% full charge`;
        status = "COMPLETED";
      }

      const newLog = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        category: randomCategory,
        source: randomVehicle,
        event: eventDesc,
        action: actionDesc,
        status: status,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 7)]);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused]);

  const filteredLogs = filter === "ALL" 
    ? logs 
    : logs.filter((l) => l.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="w-full rounded-2xl bg-[#030704] border border-[#00D084]/25 shadow-2xl overflow-hidden font-mono text-left">
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#08130b] border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-[#00D084]" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Autobot OS // Live Telemetry Feed
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[10px] text-[#00D084] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
            LIVE BUS
          </span>
        </div>

        {/* Filter Badges & Pause Toggle */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 text-[10px]">
            {["ALL", "BMS", "PARTS", "FLEET", "CHARGING"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-2 py-1 rounded transition-colors ${
                  filter === cat
                    ? "bg-[#00D084] text-black font-bold"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-[10px] border border-white/15 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title={isPaused ? "Resume Live Stream" : "Pause Stream"}
          >
            {isPaused ? <Play className="w-3 h-3 text-[#00D084]" /> : <Pause className="w-3 h-3 text-[#F5A623]" />}
            <span>{isPaused ? "RESUME" : "PAUSE"}</span>
          </button>
        </div>
      </div>

      {/* Terminal Log Items */}
      <div className="p-3 sm:p-4 space-y-2 max-h-72 overflow-y-auto font-mono text-[11px] leading-relaxed select-text">
        {filteredLogs.map((log) => {
          const isBMS = log.category === "BMS";
          const isFleet = log.category === "FLEET";
          const isParts = log.category === "PARTS";
          const tagColor = isBMS 
            ? "text-[#00D084] border-[#00D084]/30 bg-[#00D084]/10" 
            : isFleet 
            ? "text-[#38bdf8] border-[#38bdf8]/30 bg-[#38bdf8]/10" 
            : isParts 
            ? "text-[#F5A623] border-[#F5A623]/30 bg-[#F5A623]/10" 
            : "text-purple-400 border-purple-400/30 bg-purple-400/10";

          return (
            <div
              key={log.id}
              className="p-2 sm:p-2.5 rounded-lg bg-black/40 hover:bg-white/[0.03] border border-white/5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-2"
            >
              <div className="flex items-start md:items-center gap-2.5">
                <span className="text-white/40 shrink-0 text-[10px]">
                  [{log.timestamp}]
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border uppercase shrink-0 ${tagColor}`}>
                  {log.category}
                </span>
                <span className="text-white/80 font-bold shrink-0">
                  {log.source}:
                </span>
                <span className="text-white/70 font-light truncate max-w-md sm:max-w-xl">
                  {log.event}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0 pl-6 md:pl-0">
                <span className="text-[10px] text-[#00D084]/80 hidden lg:inline">
                  ↳ {log.action}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-white/90 border border-white/10 font-bold">
                  {log.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Footer Telemetry Counters */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-2.5 bg-[#061009] border-t border-white/10 text-[10px] text-white/50">
        <div className="flex items-center gap-4">
          <span>HUBS SYNCED: <strong className="text-white">68 NATIONWIDE</strong></span>
          <span>STREAMS: <strong className="text-[#00D084]">14,820 ACTIVE</strong></span>
          <span>LATENCY: <strong className="text-[#00D084]">14ms</strong></span>
        </div>
        <div className="text-white/40">
          AUTOBOT OS CLOUD ENGINE v4.2.8 // ENCRYPTED TLS 1.3
        </div>
      </div>
    </div>
  );
}

