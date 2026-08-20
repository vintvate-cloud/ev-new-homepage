import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  Zap,
  ShieldAlert,
  AlertOctagon,
  CheckCircle2,
  Lock,
  Mail,
  Copy,
  Check,
  Flame,
  ShieldCheck,
  Wrench,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/hv-safety")({
  component: HVSafetyPage,
});

function HVSafetyPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("safety@myevservice.in");
    setCopiedEmail(true);
    toast.success("Copied safety@myevservice.in to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans overflow-x-hidden">
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-[#020403]">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/12 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-400 shadow-md backdrop-blur-md">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>MY EV SERVICE Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            High Voltage (HV) <br />
            <span className="text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]">
              Safety Disclaimer
            </span>
          </h1>

          <p className="text-xs sm:text-sm font-mono text-amber-400">
            Last Updated: March 1st, 2026
          </p>

          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            Owned and operated by <strong className="text-white">Autobot Emobility Business Solutions Private Limited</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
          </p>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Link to="/terms" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 transition-all">
              Terms of Service
            </Link>
            <Link to="/warranty" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 transition-all">
              Warranty Policy
            </Link>
            <Link to="/privacy" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 transition-all">
              Privacy Policy
            </Link>
            <Link to="/disclaimer" className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 transition-all">
              Platform Disclaimer
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 max-w-5xl mx-auto space-y-8">
        
        {/* Intro Alert Box */}
        <div className="backdrop-blur-xl bg-amber-950/20 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertOctagon className="w-6 h-6 text-amber-400 shrink-0" />
            <h3 className="text-lg font-bold text-amber-300">Mandatory High-Voltage Safety Advisory</h3>
          </div>
          <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed font-light">
            Electric vehicle electrical architectures operate between <strong className="text-white font-mono">48V to 800V+ DC</strong>. Modern 2W, 3W, and commercial EV powertrains contain high-capacity Lithium-ion battery packs, inverters, motor controllers, and DC-DC converters. Unauthorized handling without insulated protective gear creates severe risk of arc flashes, electrocution, or thermal runaway.
          </p>
        </div>

        {/* 1. High Voltage Hazard Warning */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-amber-400 font-mono">1.</span> High Voltage Hazard Warning
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Electric vehicle powertrains and Lithium-ion battery packs operate at hazardous high-voltage direct current (DC). Attempting unauthorized repairs, probing high-voltage lines, or modifying battery enclosures outside of certified workshop environments can lead to severe personal injury, electric shock, high-energy arc flash events, or fatal electrical shock.
          </p>
        </div>

        {/* 2. Certified Technician Requirement */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-amber-400 font-mono">2.</span> Certified Technician Requirement
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            All high-voltage service operations within the MY EV SERVICE network are executed only by certified master technicians (Level 1 to Level 3 EV High-Voltage Engineers) using Class 0 (1000V rated) insulated tools and personal protective equipment (PPE).
          </p>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-white/70 space-y-2">
            <span className="font-bold text-rose-400 block uppercase">Prohibited for DIY or Uncertified Handling:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside font-light">
              <li>Main Battery Packs &amp; Lithium Cells</li>
              <li>High-Voltage Cables &amp; Orange Harnesses</li>
              <li>Motor Controllers &amp; Inverters</li>
              <li>On-Board Charger (OBC) Systems</li>
              <li>Battery Management Systems (BMS)</li>
              <li>DC-DC Voltage Converters</li>
            </ul>
          </div>
        </div>

        {/* 3 & 4. Safety Checks & Thermal Mitigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00D084]" /> 3. Safety Isolation Checks
            </h2>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Before commencing diagnostic or mechanical repair, our technicians perform insulation resistance tests, zero-voltage verification, and HV lockout procedures to guarantee a safe working environment.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" /> 4. Thermal Runaway Mitigation
            </h2>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Damaged, flooded, or deeply discharged Lithium-ion batteries present thermal runaway hazards. Workshop facilities feature specialized dry EV fire safety suppression and isolation bays.
            </p>
          </div>
        </div>

        {/* 5. Customer Safety Responsibilities */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-amber-400 font-mono">5.</span> Customer Safety Responsibilities
          </h2>
          <ul className="space-y-2.5 text-xs text-white/80 font-light">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
              <span>Promptly disclose any prior vehicle accidents, battery drops, or water immersion incidents to technicians.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
              <span>Use only OEM-approved charging cables and compatible wall chargers.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
              <span>Never open or cut orange high-voltage wiring harnesses under any circumstance.</span>
            </li>
          </ul>
        </div>

        {/* 6. Legal Limitation */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-amber-400 font-mono">6.</span> Platform Limitation of Liability
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Autobot Emobility Business Solutions Private Limited shall not be liable for injuries, vehicle damage, or loss resulting from unauthorized tampering, non-standard charging practices, or failure to follow these high-voltage safety instructions.
          </p>
        </div>

        {/* 7. Contact Safety Team */}
        <div className="backdrop-blur-xl bg-amber-500/10 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-4 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center justify-center gap-2">
            <span className="text-amber-400 font-mono">7.</span> Contact EV Safety Desk
          </h2>
          <p className="text-xs sm:text-sm text-white/80 font-light max-w-md mx-auto">
            Report high-voltage hazards, battery swelling, or emergency safety concerns to our technical team:
          </p>
          <div className="space-y-1 text-xs text-white/90 font-medium">
            <p className="text-base font-bold text-amber-400">MY EV SERVICE Technical Safety Desk</p>
            <p className="text-white/70">Operated by Autobot Emobility Business Solutions Private Limited</p>
            <p className="text-white/80 font-mono">Email: safety@myevservice.in</p>
            <p className="text-white/80 font-mono">Website: www.myevservice.in</p>
          </div>
          <div className="pt-2">
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3 rounded-xl bg-amber-500 text-black text-xs font-black uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer inline-flex items-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
            >
              {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>Copy safety@myevservice.in</span>
            </button>
          </div>
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

