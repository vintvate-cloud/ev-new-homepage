import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  MapPin,
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  UserCheck,
  Phone,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  FileText,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/track")({
  component: TrackPage,
});

function TrackPage() {
  const [bookingId, setBookingId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeJob, setActiveJob] = useState<any>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId && !phoneNumber) {
      toast.error("Please enter your Booking ID or Registered Mobile Number.");
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      setActiveJob({
        jobCardId: bookingId || "JOB-EV-98412",
        status: "In Progress",
        stage: "Battery Cell Diagnostic & Telemetry Sync",
        progressPercent: 65,
        vehicleLabel: "Ola S1 Pro (MH 12 EV 8821)",
        technician: "Ramesh Sharma (Master EV Engineer - L3 Certified)",
        technicianPhone: "+91 98765 43210",
        serviceCenter: "Pune Central EV Technology Hub, Baner",
        eta: "35 mins",
        checklist: [
          { task: "Vehicle In-Gate High Voltage Safety Isolation Check", done: true },
          { task: "BMS Cell Voltage Delta & Thermal Sensor Diagnostic", done: true },
          { task: "Motor Controller Current Output & Phase Testing", done: true },
          { task: "Software Calibration & Telemetry Firmware Update", done: false, active: true },
          { task: "Final Road Test & Digital Quality Certification", done: false },
        ],
      });
      toast.success("Live Job Card Found! Tracking status updated.");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans overflow-x-hidden">
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-[#020403]">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00D084]/12 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00D084] shadow-md backdrop-blur-md">
            <MapPin className="w-4 h-4" />
            <span>Live Digital Job Card &amp; Service Tracker</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Track Your Service <br />
            <span className="text-[#00D084] drop-shadow-[0_0_20px_rgba(0,208,132,0.4)]">
              In Real-Time
            </span>
          </h1>

          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            Enter your Job Card ID or registered mobile phone number to inspect real-time technician progress, BMS diagnostic logs, and estimated completion time.
          </p>

          {/* Search Card */}
          <div className="bg-[#050c08] border-2 border-[#00D084]/40 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto backdrop-blur-xl shadow-2xl text-left">
            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-white/50 block mb-1">Booking / Job Card ID</label>
                  <input
                    type="text"
                    placeholder="e.g. JOB-EV-98412"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    className="w-full bg-[#020403] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-white/50 block mb-1">Registered Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-[#020403] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_20px_rgba(0,208,132,0.3)] cursor-pointer flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <span>Searching Telemetry Logs...</span>
                ) : (
                  <>
                    <Search className="w-4 h-4" /> Track Live Progress
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Status & Tracking Dashboard */}
      {activeJob && (
        <section className="py-12 px-6 max-w-5xl mx-auto space-y-8">
          
          {/* Status Header Card */}
          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D084] block mb-1">
                  JOB CARD ID: {activeJob.jobCardId}
                </span>
                <h2 className="text-2xl font-extrabold text-white">{activeJob.vehicleLabel}</h2>
                <p className="text-xs text-white/60 font-light mt-0.5">{activeJob.serviceCenter}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-[#00D084]/20 border border-[#00D084]/40 text-xs font-bold text-[#00D084] font-mono animate-pulse">
                  🟢 {activeJob.status}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00D084]" /> ETA: {activeJob.eta}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/70">Overall Completion:</span>
                <span className="text-[#00D084] font-bold">{activeJob.progressPercent}%</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-[#00D084] rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(0,208,132,0.8)]"
                  style={{ width: `${activeJob.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* SOP Technician Checklist Progress */}
          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#00D084]" /> Real-Time Technician Inspection Checklist
            </h3>

            <div className="space-y-3">
              {activeJob.checklist.map((item: any, i: number) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    item.done
                      ? "bg-black/40 border-emerald-500/30 text-white"
                      : item.active
                      ? "bg-[#00D084]/10 border-[#00D084]/50 text-white"
                      : "bg-white/[0.01] border-white/10 text-white/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.done ? (
                      <CheckCircle2 className="w-5 h-5 text-[#00D084] shrink-0" />
                    ) : item.active ? (
                      <div className="w-5 h-5 rounded-full border-2 border-[#00D084] border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-white/20 shrink-0" />
                    )}
                    <span className="text-xs sm:text-sm font-medium">{item.task}</span>
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    {item.done ? "Completed" : item.active ? "In Progress" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Technician Card */}
          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center text-[#00D084] font-bold text-xl shrink-0">
                <UserCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#00D084] uppercase font-bold">Assigned Technician</span>
                <h4 className="text-base font-bold text-white">{activeJob.technician}</h4>
                <p className="text-xs text-white/60 font-light">4.9 ★ Rating • 340+ Certified Jobs Completed</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`tel:${activeJob.technicianPhone}`}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call Tech
              </a>
            </div>
          </div>

        </section>
      )}

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
