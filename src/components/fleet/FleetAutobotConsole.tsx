import React, { useState } from "react";
import { Terminal, Cpu, Activity, ShieldCheck, Zap, Layers, CheckCircle2, Copy, Check } from "lucide-react";

export function FleetAutobotConsole() {
  const [activeTab, setActiveTab] = useState<"telemetry" | "dispatch" | "billing">("telemetry");
  const [copied, setCopied] = useState(false);

  const STREAMS = {
    telemetry: {
      endpoint: "WSS wss://telemetry.myevservice.com/v2/fleet/cluster-pune/live",
      json: `{
  "fleet_id": "FLT-ZEPTO-PUNE-CENTRAL",
  "total_active_assets": 148,
  "telemetry_timestamp": "2026-11-04T12:30:15Z",
  "fleet_health_index": 98.7,
  "bms_telemetry_summary": {
    "mean_soc_percentage": 71.4,
    "max_cell_voltage_delta_mv": 14.2,
    "thermal_runaway_alert": "ZERO_ANOMALIES",
    "scheduled_balancing_queue": 3
  },
  "sla_status": "OPTIMAL_UPTIME_99.4%"
}`,
    },
    dispatch: {
      endpoint: "POST https://api.myevservice.com/v2/fleet/jobs/inter-shift-dispatch",
      json: `{
  "job_id": "JOB-DISP-2026-8812",
  "vehicle_reg": "MH-12-EV-9410",
  "model": "MAHINDRA_TREO_ZOR",
  "shift_window": "14:00 - 15:30_AFTERNOON_BUFFER",
  "location": "DARK_STORE_BANER_HUB_4",
  "assigned_mobile_unit": "MOBILE_VAN_02_PUNE",
  "technician_cert": "AUTOBOT_HV_LEVEL_2",
  "checklist_scope": ["BRAKE_PADS", "TYRE_PRESSURE", "CAN_SCAN"],
  "status": "DISPATCHED_EN_ROUTE"
}`,
    },
    billing: {
      endpoint: "GET https://api.myevservice.com/v2/fleet/billing/monthly-summary",
      json: `{
  "account_id": "ACC-BLUSMART-COMMERCIAL",
  "billing_period": "2026-10-01_TO_2026-10-31",
  "total_serviced_units": 320,
  "consolidated_gst_invoice": "INV-2026-GST-10492",
  "breakdown": {
    "scheduled_pm_services": 320,
    "priority_breakdown_tows": 4,
    "parts_consumed_contract_rate": 42,
    "preventive_savings_estimated": "₹1,84,000"
  },
  "invoice_status": "CONSOLIDATED_GST_CLEARED"
}`,
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(STREAMS[activeTab].json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-3xl bg-[#030704] border border-[#00D084]/25 p-5 sm:p-8 shadow-2xl relative overflow-hidden text-left">
      {/* Top Console Bar with Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Autobot OS // Live Console Stream
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "telemetry", label: "Live Telemetry Feed" },
            { id: "dispatch", label: "Shift Dispatch API" },
            { id: "billing", label: "Consolidated Billing" },
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

      {/* Grid: Code Terminal + Real Video Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
        {/* Left: Code Box */}
        <div className="lg:col-span-7 rounded-2xl bg-[#08120b] border border-white/10 overflow-hidden font-mono text-xs flex flex-col justify-between">
          <div className="px-4 py-3 bg-black/60 border-b border-white/10 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="text-white/60 ml-2 truncate max-w-xs">{STREAMS[activeTab].endpoint}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[10px] text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-[#00D084]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Copy JSON"}</span>
            </button>
          </div>

          <pre className="p-4 sm:p-5 text-white/90 overflow-x-auto text-[11px] leading-relaxed">
            <code>{STREAMS[activeTab].json}</code>
          </pre>

          <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
            <span>TLS 1.3 SECURE // AES-256</span>
            <span className="text-[#00D084]">FLEET STREAM ACTIVE</span>
          </div>
        </div>

        {/* Right: High-Tech Workshop Video Viewport */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/15 bg-black/80 flex flex-col justify-between min-h-[300px]">
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
              ● CAM-03 // CENTRAL WORKSHOP BAY
            </span>
            <span className="text-[10px] font-mono text-white/60 bg-black/60 px-2 py-0.5 rounded">
              PUNE DEPOT
            </span>
          </div>

          {/* Bottom Overlay Info */}
          <div className="relative z-10 p-5 text-left">
            <span className="text-[10px] font-mono text-[#00D084] font-bold uppercase block mb-1">
              Field Telemetry Ingestion
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white mb-1">
              Autonomous Fleet Scheduling in Motion
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

