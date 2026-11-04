import React, { useState } from "react";
import { Terminal, Code, Cpu, ShieldCheck, Zap, Activity, Check } from "lucide-react";

export function OEMApiConsole() {
  const [activeTab, setActiveTab] = useState<"warranty" | "telemetry" | "inventory">("warranty");

  const PAYLOADS = {
    warranty: {
      endpoint: "POST https://api.myevservice.com/v2/oem/warranty/claims",
      json: `{
  "claim_id": "CLM-2026-90412",
  "oem_code": "ATHER_ENERGY",
  "vin": "MBH12AB4019XXXXXX",
  "fault_code": "DTC_BMS_CELL_IMBALANCE_0x82",
  "evidence": {
    "can_log_id": "CAN-BMS-88190",
    "voltage_delta_mv": 84.2,
    "photo_urls": ["s3://myev/audit/clm-90412-1.jpg"],
    "technician_cert": "AUTOBOT_HV_CERT_#402"
  },
  "action_requested": "REPLACE_CELL_MODULE_V2",
  "status": "AUTONOMOUSLY_VALIDATED"
}`,
    },
    telemetry: {
      endpoint: "GET https://api.myevservice.com/v2/oem/field-telemetry/stream",
      json: `{
  "stream_id": "FLT-BLUSMART-CLUSTER-08",
  "active_vehicles": 320,
  "sampling_rate": "10Hz_CAN_2.0B",
  "metrics_summary": {
    "avg_bms_pack_temp_c": 33.4,
    "mean_soc_percentage": 68.2,
    "thermal_runaway_risk": "ZERO_ANOMALIES_DETECTED",
    "fleet_uptime_sla": 99.8
  },
  "last_heartbeat_utc": "2026-11-04T11:45:00Z"
}`,
    },
    inventory: {
      endpoint: "GET https://api.myevservice.com/v2/oem/spare-hub/serial-trace",
      json: `{
  "sku": "OLA-S1P-BRAKE-CALIPER-R",
  "serial_number": "SN-BRK-9902148",
  "depo_location": "PUNE_CENTRAL_DEPOT_RACK_04",
  "transit_status": "DISPATCHED_TO_KOTHRUD_BAY_2",
  "eta_minutes": 22,
  "rfid_scanned_by": "DEPOT_ROBOTIC_RUNNER_#12"
}`,
    },
  };

  return (
    <div className="w-full rounded-3xl bg-[#030704] border border-[#00D084]/25 p-5 sm:p-8 shadow-2xl relative overflow-hidden text-left">
      {/* Top Console Bar with Tab Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Autobot OS // Telemetry &amp; API Console
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "warranty", label: "Warranty API" },
            { id: "telemetry", label: "Field Telemetry" },
            { id: "inventory", label: "RFID Parts Trace" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === t.id
                  ? "bg-[#00D084] text-black shadow-[0_0_15px_rgba(0,208,132,0.3)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Code Console + High-Tech Video/Visual Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Interactive API Code Box */}
        <div className="lg:col-span-7 rounded-2xl bg-[#08120b] border border-white/10 overflow-hidden font-mono text-xs flex flex-col justify-between">
          <div className="px-4 py-3 bg-black/60 border-b border-white/10 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="text-white/60 ml-2 truncate max-w-xs">{PAYLOADS[activeTab].endpoint}</span>
            </div>
            <span className="text-[#00D084] font-bold text-[10px]">200 OK (14ms)</span>
          </div>

          <pre className="p-4 sm:p-5 text-white/90 overflow-x-auto text-[11px] leading-relaxed">
            <code>{PAYLOADS[activeTab].json}</code>
          </pre>

          <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
            <span>TLS 1.3 SECURE // AES-256</span>
            <span className="text-[#00D084]">API v4.2 COMPLIANT</span>
          </div>
        </div>

        {/* Right: High-Tech Video / Motion Frame */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/15 bg-black/80 flex flex-col justify-between min-h-[300px]">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.6] contrast-[1.1]"
          >
            <source src="/lab-3d-centre.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

          {/* Top Scanline Badge */}
          <div className="relative z-10 p-4 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#00D084]/40 text-[9px] font-mono font-bold text-[#00D084] uppercase">
              ● LIVE WORKSHOP LAB VIEW
            </span>
            <span className="text-[10px] font-mono text-white/60 bg-black/60 px-2 py-0.5 rounded">
              CAM-02
            </span>
          </div>

          {/* Bottom Telemetry Overlay */}
          <div className="relative z-10 p-5 text-left">
            <span className="text-[10px] font-mono text-[#00D084] font-bold uppercase block mb-1">
              Field Telemetry Ingestion
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white mb-1">
              Automated Diagnostic Telemetry to OEM HQ
            </h4>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Every battery cycle, firmware revision, and fault log is verified and accessible on your engineering dashboard.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

