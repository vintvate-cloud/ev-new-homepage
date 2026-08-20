import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Mail,
  Copy,
  Check,
  FileText,
  ArrowRight,
  Zap,
  Wrench,
  ShieldAlert,
  Sliders,
  DollarSign,
  AlertTriangle,
  Award,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/franchise-terms")({
  component: FranchiseTermsPage,
});

function FranchiseTermsPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("franchise@myevservice.in");
    setCopiedEmail(true);
    toast.success("Copied franchise@myevservice.in to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans overflow-x-hidden">
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-[#020403]">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00D084]/12 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00D084] shadow-md backdrop-blur-md">
            <Building2 className="w-4 h-4" />
            <span>MY EV SERVICE Franchise Network</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Franchise Partner Terms &amp; Conditions <br />
            <span className="text-[#00D084] drop-shadow-[0_0_20px_rgba(0,208,132,0.4)]">
              MY EV SERVICE
            </span>
          </h1>

          <p className="text-xs sm:text-sm font-mono text-[#00D084]">
            Last Updated: March 1, 2026
          </p>

          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            Owned and operated by <strong className="text-white">Autobot Emobility Business Solutions Private Limited</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/franchise"
              className="px-5 py-2.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all shadow-[0_0_15px_rgba(0,208,132,0.3)]"
            >
              Apply for Franchise
            </Link>
            <Link
              to="/franchise"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all"
            >
              Onboarding Form
            </Link>
            <Link
              to="/franchise"
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-xs font-bold transition-all"
            >
              My Application
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 max-w-5xl mx-auto space-y-8">
        
        {/* Intro */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
            These Franchise Partner Terms &amp; Conditions outline the framework governing the relationship between <strong className="text-[#00D084]">MY EV SERVICE</strong> and its authorized franchise partners.
          </p>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
            The MY EV SERVICE platform and service network are owned and operated by <strong className="text-white">Autobot Emobility Business Solutions Private Limited</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
          </p>
          <div className="p-4 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs text-[#00D084] font-medium">
            By applying for or operating a MY EV SERVICE franchise, the franchise partner (&quot;Partner&quot;) agrees to comply with these terms and conditions.
          </div>
        </div>

        {/* 1. About MY EV SERVICE Franchise Network */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">1.</span> About MY EV SERVICE Franchise Network
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            MY EV SERVICE is a technology-enabled electric vehicle service ecosystem that provides:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-white/80 font-light">
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
              <span>EV service and maintenance</span>
            </li>
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
              <span>Battery diagnostics &amp; refurbishment</span>
            </li>
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
              <span>High-voltage system repair</span>
            </li>
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
              <span>Fleet maintenance services</span>
            </li>
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
              <span>EV roadside assistance</span>
            </li>
            <li className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
              <span>Retrofit and upgrade services</span>
            </li>
          </ul>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-[#00D084] uppercase">The franchise network operates through multiple business formats including:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <h4 className="font-bold text-white">Hub Model Centers</h4>
                <p className="text-white/70 font-light leading-relaxed">
                  Regional high-capacity EV service hubs equipped with advanced diagnostics and battery refurbishment infrastructure.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <h4 className="font-bold text-white">City Centre Model</h4>
                <p className="text-white/70 font-light leading-relaxed">
                  Urban EV service centers offering regular maintenance, diagnostics, and repairs.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <h4 className="font-bold text-white">Garage Partner Model</h4>
                <p className="text-white/70 font-light leading-relaxed">
                  Authorized local EV garages integrated into the MY EV SERVICE platform network.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Franchise Grant */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">2.</span> Franchise Grant
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Autobot Emobility Business Solutions Private Limited grants selected partners the right to operate a MY EV SERVICE authorized franchise center within an approved territory.
          </p>
          <p className="text-xs text-white/70 font-light">The franchise partner will receive:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Brand usage rights</li>
            <li>Operational support</li>
            <li>Training and technical guidance</li>
            <li>Access to MY EV SERVICE digital platform</li>
            <li>Standard operating procedures (SOPs)</li>
            <li>Marketing and branding guidelines</li>
          </ul>
          <p className="text-xs text-amber-300 font-mono pt-1">
            The franchise grant is non-transferable unless approved by the Company.
          </p>
        </div>

        {/* 3. Territory Rights */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">3.</span> Territory Rights
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            The franchise partner may be assigned an operational territory based on:
          </p>
          <ul className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">City zones</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Postal PIN codes</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Regional coverage</span>
          </ul>
          <p className="text-xs text-white/70 font-light pt-1">
            Territory allocation may be exclusive or non-exclusive depending on the franchise model. Exclusive territory rights may be granted to selected partners based on performance and investment level.
          </p>
        </div>

        {/* 4. Franchise Models */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">4.</span> Franchise Models
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            MY EV SERVICE offers multiple franchise formats:
          </p>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <h3 className="font-bold text-[#00D084] text-sm">Hub Model</h3>
              <p className="text-white/70 font-light">Large EV service infrastructure with capabilities including:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-white/80 list-disc list-inside font-light">
                <li>Advanced EV diagnostics</li>
                <li>Battery refurbishment</li>
                <li>High-voltage repair</li>
                <li>Fleet service operations</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <h3 className="font-bold text-[#00D084] text-sm">City Centre Model</h3>
              <p className="text-white/70 font-light">Mid-sized service centers designed for urban EV owners offering:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-white/80 list-disc list-inside font-light">
                <li>Preventive maintenance</li>
                <li>Repair services</li>
                <li>Diagnostics</li>
                <li>Component replacement</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <h3 className="font-bold text-[#00D084] text-sm">Garage Partner Model</h3>
              <p className="text-white/70 font-light">
                Existing automotive garages upgraded to provide EV services under MY EV SERVICE standards.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Franchise Investment */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">5.</span> Franchise Investment
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Franchise partners are responsible for investment related to:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light">
            <li className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084]" /> Workshop infrastructure
            </li>
            <li className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084]" /> Service equipment and tools
            </li>
            <li className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084]" /> Electrical and safety setup
            </li>
            <li className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084]" /> Branding and interior design
            </li>
            <li className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084]" /> Staff hiring and training
            </li>
            <li className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084]" /> Initial spare parts inventory
            </li>
          </ul>
          <p className="text-xs text-white/70 font-light pt-1">
            Investment requirements vary depending on the franchise model selected.
          </p>
        </div>

        {/* 6. Training and Certification */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">6.</span> Training and Certification
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            All franchise partners must undergo mandatory training programs provided by MY EV SERVICE. Training may include:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>EV safety standards</li>
            <li>High-voltage system handling</li>
            <li>EV diagnostics and repair</li>
            <li>Battery system servicing</li>
            <li>Customer service protocols</li>
            <li>Platform usage and service booking management</li>
          </ul>
          <div className="p-3.5 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs text-[#00D084] font-bold">
            Only certified technicians may perform EV service operations.
          </div>
        </div>

        {/* 7. Operational Standards */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">7.</span> Operational Standards
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Franchise partners must adhere to MY EV SERVICE operational guidelines including:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Standard service procedures</li>
            <li>Quality control protocols</li>
            <li>Safety compliance</li>
            <li>Workshop infrastructure standards</li>
            <li>Customer service policies</li>
          </ul>
          <p className="text-xs text-white/70 font-light pt-1">
            Regular audits may be conducted to ensure compliance.
          </p>
        </div>

        {/* 8. Platform Integration */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">8.</span> Platform Integration
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Franchise partners must operate through the MY EV SERVICE digital platform for:
          </p>
          <ul className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Service bookings</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Job card management</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Inventory tracking</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Service reporting</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Customer communication</span>
          </ul>
          <p className="text-xs text-[#00D084] font-medium pt-1">
            All service records must be maintained through the platform.
          </p>
        </div>

        {/* 9. Branding and Identity */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">9.</span> Branding and Identity
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Franchise partners are permitted to use the MY EV SERVICE brand name, logo, and identity only as per official brand guidelines.
          </p>
          <p className="text-xs text-white/70 font-light">Partners must maintain standardized:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Store signage</li>
            <li>Workshop branding</li>
            <li>Technician uniforms</li>
            <li>Customer experience standards</li>
          </ul>
          <p className="text-xs text-rose-400 font-bold pt-1 uppercase">
            Unauthorized brand usage is strictly prohibited.
          </p>
        </div>

        {/* 10. Marketing and Promotions */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">10.</span> Marketing and Promotions
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            MY EV SERVICE may conduct national or regional marketing campaigns. Franchise partners may also conduct local marketing activities subject to brand guidelines.
          </p>
          <p className="text-xs text-white/70 font-light">Marketing activities may include:</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Digital marketing campaigns</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Local advertising</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Community events</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Fleet partnerships</span>
          </div>
        </div>

        {/* 11. Revenue and Fees */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">11.</span> Revenue and Fees
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Franchise partners may be required to pay:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Franchise onboarding fee</li>
            <li>Platform usage fees</li>
            <li>Revenue sharing or royalty fees</li>
            <li>Marketing contribution (if applicable)</li>
          </ul>
          <p className="text-xs text-white/70 font-light pt-1">
            The exact fee structure will be defined in the individual franchise agreement.
          </p>
        </div>

        {/* 12. Spare Parts and Procurement */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">12.</span> Spare Parts and Procurement
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Franchise partners may procure spare parts through:
          </p>
          <ul className="space-y-1.5 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>MY EV SERVICE approved vendors</li>
            <li>Authorized OEM suppliers</li>
            <li>Company-supported procurement channels</li>
          </ul>
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 font-medium">
            Use of substandard or unauthorized components is prohibited.
          </div>
        </div>

        {/* 13. Warranty and Service Responsibility */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">13.</span> Warranty and Service Responsibility
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Franchise partners must honor the MY EV SERVICE Service Warranty Policy. Partners are responsible for:
          </p>
          <ul className="space-y-1.5 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Service quality</li>
            <li>Technician competency</li>
            <li>Safe handling of EV components</li>
          </ul>
          <p className="text-xs text-white/70 font-light pt-1">
            Customer complaints and warranty claims must be handled according to company procedures.
          </p>
        </div>

        {/* 14. Safety Compliance */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">14.</span> Safety Compliance
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Due to the high-voltage nature of EV systems, franchise partners must maintain strict safety compliance including:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>High-voltage safety equipment</li>
            <li>Battery handling protocols</li>
            <li>Fire safety systems</li>
            <li>Insulated tools and protective equipment</li>
          </ul>
          <p className="text-xs text-rose-400 font-semibold pt-1">
            Failure to comply may lead to suspension of franchise rights.
          </p>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-light">
            Franchise partners must also ensure all staff acknowledge the{" "}
            <Link to="/hv-safety" className="text-[#00D084] underline font-bold">
              High Voltage Safety Disclaimer
            </Link>.
          </div>
        </div>

        {/* 15. Confidentiality */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">15.</span> Confidentiality
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Franchise partners must maintain confidentiality of:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Technical knowledge</li>
            <li>Service processes</li>
            <li>Training materials</li>
            <li>Business operations</li>
            <li>Platform technology</li>
          </ul>
          <p className="text-xs text-rose-400 font-bold pt-1 uppercase">
            Unauthorized sharing of confidential information is prohibited.
          </p>
        </div>

        {/* 16. Termination of Franchise */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">16.</span> Termination of Franchise
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            The franchise agreement may be terminated under the following conditions:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Violation of brand guidelines</li>
            <li>Poor service quality</li>
            <li>Safety violations</li>
            <li>Fraudulent activities</li>
            <li>Failure to comply with operational standards</li>
          </ul>
          <p className="text-xs text-white/70 font-light pt-1">
            Upon termination, partners must immediately cease use of MY EV SERVICE branding.
          </p>
        </div>

        {/* 17. Limitation of Liability */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">17.</span> Limitation of Liability
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Autobot Emobility Business Solutions Private Limited shall not be liable for:
          </p>
          <ul className="space-y-1 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Operational losses incurred by franchise partners</li>
            <li>Local business risks</li>
            <li>Workforce management issues</li>
          </ul>
          <p className="text-xs text-[#00D084] font-medium pt-1">
            Partners operate as independent business entities within the MY EV SERVICE ecosystem.
          </p>
        </div>

        {/* 18. Governing Law */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">18.</span> Governing Law
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            These terms shall be governed by the laws of India. Any disputes shall fall under the jurisdiction of courts located in Pune, Maharashtra, India.
          </p>
        </div>

        {/* 19. Contact Information */}
        <div className="backdrop-blur-xl bg-[#00D084]/10 border border-[#00D084]/40 rounded-3xl p-6 sm:p-8 space-y-4 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center justify-center gap-2">
            <span className="text-[#00D084] font-mono">19.</span> Contact Information
          </h2>
          <p className="text-xs sm:text-sm text-white/80 font-light max-w-lg mx-auto">
            For franchise inquiries or support, please contact:
          </p>
          
          <div className="space-y-1 text-xs text-white/90 font-medium">
            <p className="text-base font-bold text-[#00D084]">MY EV SERVICE Franchise Team</p>
            <p className="text-white/70">Operated by Autobot Emobility Business Solutions Private Limited</p>
            <p className="text-white/80 font-mono">Email: franchise@myevservice.in</p>
            <p className="text-white/80 font-mono">Website: www.myevservice.in</p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/franchise"
              className="px-6 py-3 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer inline-flex items-center gap-2 shadow-[0_0_15px_rgba(0,208,132,0.3)]"
            >
              <span>Apply to Become a Partner</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15 flex items-center gap-2"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-[#00D084]" /> : <Copy className="w-4 h-4" />}
              <span>Copy franchise@myevservice.in</span>
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

