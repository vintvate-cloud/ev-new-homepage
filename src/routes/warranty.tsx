import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Mail,
  Copy,
  Check,
  Wrench,
  Zap,
  ArrowRight,
  FileCheck,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/warranty")({
  component: WarrantyPage,
});

function WarrantyPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [claimJobId, setClaimJobId] = useState("");
  const [claimPhone, setClaimPhone] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("warranty@myevservice.in");
    setCopiedEmail(true);
    toast.success("Copied warranty@myevservice.in to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimJobId || !claimPhone) {
      toast.error("Please enter your Job Card ID / Booking ID and Phone Number.");
      return;
    }
    toast.success("Warranty Claim Initiated! A senior quality engineer will call you back within 2 hours to arrange a free re-inspection.");
    setClaimJobId("");
    setClaimPhone("");
  };

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans overflow-x-hidden">
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-[#020403]">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00D084]/12 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00D084] shadow-md backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" />
            <span>Service &amp; Spare Parts Guarantee</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Service Warranty <br />
            <span className="text-[#00D084] drop-shadow-[0_0_20px_rgba(0,208,132,0.4)]">
              MY EV SERVICE
            </span>
          </h1>

          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            Operated by <strong className="text-white">Autobot Emobility Business Solutions Private Limited</strong>. Every service performed carries our 90-day workmanship guarantee and manufacturer spare parts coverage.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00D084]" /> 90-Day Standard Workmanship Guarantee
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#00D084]" /> Up to 36-Month OEM Parts Warranty
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 max-w-5xl mx-auto space-y-8">
        
        {/* Instant Claim Box */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <FileCheck className="w-6 h-6 text-[#00D084]" />
            <div>
              <h2 className="text-xl font-extrabold text-white">File an Instant Warranty Claim</h2>
              <p className="text-xs text-white/60 font-light">Re-inspection is 100% free under valid warranty period.</p>
            </div>
          </div>

          <form onSubmit={handleClaimSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-mono text-white/50 block mb-1">Booking / Job Card ID *</label>
              <input
                type="text"
                required
                placeholder="e.g. EV-JOB-98214"
                value={claimJobId}
                onChange={(e) => setClaimJobId(e.target.value)}
                className="w-full bg-[#020403] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-white/50 block mb-1">Registered Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={claimPhone}
                onChange={(e) => setClaimPhone(e.target.value)}
                className="w-full bg-[#020403] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer shadow-[0_0_15px_rgba(0,208,132,0.3)]"
              >
                File Claim Now
              </button>
            </div>
          </form>
        </div>

        {/* Coverage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> 1. Standard Workmanship Warranty
            </h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              All general maintenance, brake overhauls, wiring harness repairs, and software updates are backed by our 90-day zero-cost workmanship guarantee.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> 2. OEM Spare Parts Coverage
            </h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Lithium battery cells, BMS modules, motor controllers, and chargers installed through our network carry 6 to 36-month OEM manufacturer warranties.
            </p>
          </div>
        </div>

        {/* Claim Procedure & Exclusions */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-extrabold text-white">3. Conditions &amp; Exclusions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-2">
              <h3 className="font-bold text-[#00D084] uppercase">Conditions for Validity</h3>
              <ul className="space-y-1 text-white/70 list-disc list-inside font-light">
                <li>Vehicle must not be altered post-service</li>
                <li>Repairs must not be attempted by third-party mechanics</li>
                <li>Charging equipment used must meet OEM specs</li>
                <li>Job Card invoice presented upon claim</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/30 space-y-2">
              <h3 className="font-bold text-rose-400 uppercase">Warranty Exclusions</h3>
              <ul className="space-y-1 text-white/70 list-disc list-inside font-light">
                <li>Accidental collision or external physical damage</li>
                <li>Water immersion or flood damage</li>
                <li>Unauthorized firmware tampering</li>
                <li>Normal wear and tear of tires and brake pads</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Desk */}
        <div className="backdrop-blur-xl bg-[#00D084]/10 border border-[#00D084]/40 rounded-3xl p-6 sm:p-8 space-y-4 text-center">
          <Mail className="w-8 h-8 text-[#00D084] mx-auto" />
          <h3 className="text-2xl font-bold text-white">Warranty Help Desk</h3>
          <p className="text-xs text-white/70 font-light max-w-md mx-auto">
            Email our warranty team directly for inspection status updates or component claims.
          </p>
          <button
            onClick={handleCopyEmail}
            className="px-6 py-3 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer inline-flex items-center gap-2"
          >
            {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>Email: warranty@myevservice.in</span>
          </button>
        </div>

      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
