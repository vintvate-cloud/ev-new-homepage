import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  Search,
  CheckCircle2,
  Clock,
  Activity,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/track")({
  component: TrackPage,
});

const MOCK_TRACKING_DATA = {
  bookingId: "MYEV-84920",
  customerName: "Rahul Sharma",
  vehicleModel: "Ola S1 Pro (2W)",
  serviceType: "Battery Cell Balancing & 32-Point AI Health Diagnostic",
  scheduledTime: "Today, 02:30 PM",
  hubLocation: "Master Service Hub - Powai, Mumbai",
  technicianName: "Vikram Singh (Senior EV Specialist)",
  technicianRating: "4.9 ★",
  technicianPhone: "+91 98201 44821",
  currentStage: 3, // Stage 3 = Repair & Cell Balancing in Progress
  stages: [
    { title: "Booking Confirmed", desc: "Appointment registered & technician assigned", time: "10:15 AM", done: true },
    { title: "Telemetry Inspection", desc: "12-point thermal imaging & BMS scan completed", time: "11:45 AM", done: true },
    { title: "Repair & Cell Balancing", desc: "Active cell balancing & high-voltage relay check", time: "01:20 PM", inProgress: true },
    { title: "Quality Audit", desc: "Final load bench test & digital certificate generation", time: "Pending", done: false },
    { title: "Ready for Pickup", desc: "Vehicle sanitized & ready for doorstep dispatch", time: "Pending", done: false },
  ],
};

function TrackPage() {
  const [searchId, setSearchId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<typeof MOCK_TRACKING_DATA | null>(MOCK_TRACKING_DATA);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) {
      toast.error("Please enter a Booking ID or Mobile Number.");
      return;
    }
    toast.success(`Telemetry Data Fetched for ${searchId.toUpperCase()}`);
    setTrackingInfo(MOCK_TRACKING_DATA);
  };

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans">
      
      {/* Unified Landing Navbar */}
      <Nav />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#060c09] to-[#020403]">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#00D084]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00D084] mb-6">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Live Diagnostic Telemetry Status
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Track Your <span className="text-[#00D084]">EV Service</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed mb-8">
            Real-time tracking for doorstep repairs, workshop diagnostics, and battery balancing.
          </p>

          {/* Search Input Box */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex items-center gap-2 bg-[#050907] border border-white/10 rounded-2xl p-2 shadow-2xl">
            <Search className="w-5 h-5 text-white/40 ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Enter Booking ID (e.g. MYEV-84920) or Phone Number..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full bg-transparent px-2 py-2 text-xs text-white placeholder-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-extrabold uppercase tracking-wider hover:bg-[#00e08f] transition-all shrink-0 cursor-pointer"
            >
              Track Status
            </button>
          </form>
        </div>
      </section>

      {/* Tracking Result View */}
      {trackingInfo && (
        <section className="py-16 px-6 max-w-5xl mx-auto">
          
          {/* Status Header Card */}
          <div className="bg-[#050907] border border-white/10 rounded-3xl p-8 mb-8 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D084]">
                  BOOKING REFERENCE
                </span>
                <h3 className="text-2xl font-bold font-mono text-white mt-1">
                  {trackingInfo.bookingId}
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Customer: <span className="text-white font-medium">{trackingInfo.customerName}</span> • Vehicle: <span className="text-white font-medium">{trackingInfo.vehicleModel}</span>
                </p>
              </div>

              <div className="bg-[#00D084]/10 border border-[#00D084]/30 rounded-2xl px-4 py-3 text-right">
                <span className="text-[9px] font-mono text-[#00D084] uppercase font-bold tracking-wider block">
                  Current Status
                </span>
                <span className="text-sm font-bold text-white flex items-center justify-end gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#00D084] animate-ping" />
                  Repair In Progress
                </span>
              </div>
            </div>

            {/* Service & Technician Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/40 font-mono">Service Requested:</span>
                  <span className="text-white font-medium">{trackingInfo.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 font-mono">Hub Location:</span>
                  <span className="text-white font-medium">{trackingInfo.hubLocation}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/40 font-mono">Assigned Technician:</span>
                  <span className="text-[#00D084] font-bold">{trackingInfo.technicianName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 font-mono">Technician Contact:</span>
                  <a href={`tel:${trackingInfo.technicianPhone}`} className="text-white font-mono hover:text-[#00D084]">
                    {trackingInfo.technicianPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Stage Live Timeline */}
          <div className="bg-[#050907] border border-white/10 rounded-3xl p-8">
            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#00D084]" />
              Live Repair Timeline
            </h3>

            <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
              {trackingInfo.stages.map((stg, i) => (
                <div key={i} className="relative flex items-start gap-6 pl-2">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${
                      stg.done
                        ? "bg-[#00D084] border-[#00D084] text-[#020403]"
                        : stg.inProgress
                        ? "bg-[#050907] border-[#00D084] text-[#00D084] animate-pulse"
                        : "bg-[#020403] border-white/20 text-white/40"
                    }`}
                  >
                    {stg.done ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-mono font-bold">{i + 1}</span>
                    )}
                  </div>

                  <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold ${stg.inProgress ? "text-[#00D084]" : "text-white"}`}>
                        {stg.title}
                      </h4>
                      <span className="text-[10px] font-mono text-white/40">{stg.time}</span>
                    </div>
                    <p className="text-xs text-white/60 mt-1 font-light">{stg.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Unified Landing Footer */}
      <Footer />

    </div>
  );
}
