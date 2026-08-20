import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  Copy,
  Check,
  FileText,
  ExternalLink,
  ShieldAlert,
  Wrench,
  BatteryCharging,
  Cpu,
  Scale,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/disclaimer")({
  component: DisclaimerPage,
});

function DisclaimerPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("info@myevservice.in");
    setCopiedEmail(true);
    toast.success("Copied info@myevservice.in to clipboard!");
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
            <AlertTriangle className="w-4 h-4" />
            <span>MY EV SERVICE Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Platform Disclaimer &amp; <br />
            <span className="text-[#00D084] drop-shadow-[0_0_20px_rgba(0,208,132,0.4)]">
              Limitation of Liability
            </span>
          </h1>

          <p className="text-xs sm:text-sm font-mono text-[#00D084]">
            Last Updated: March 1st, 2026
          </p>

          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            Owned and operated by <strong className="text-white">Autobot Emobility Business Solutions Private Limited</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
          </p>

          {/* Policy Navigation Bar */}
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
            <Link to="/hv-safety" className="px-3.5 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-mono text-amber-400 transition-all flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> HV Safety Disclaimer
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 max-w-5xl mx-auto space-y-8">
        
        {/* Intro */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
            This Platform Disclaimer &amp; Limitation of Liability outlines the limitations of responsibility related to the use of the MY EV SERVICE platform, services, and partner network.
          </p>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
            MY EV SERVICE is owned and operated by <strong className="text-white">Autobot Emobility Business Solutions Private Limited</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
          </p>
          <div className="p-4 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs text-[#00D084] font-medium">
            By accessing the MY EV SERVICE website, digital platform, mobile services, or service network, you acknowledge and agree to the terms outlined in this disclaimer.
          </div>
        </div>

        {/* 1. Nature of the Platform */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">1.</span> Nature of the Platform
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            MY EV SERVICE is a technology-enabled service platform and ecosystem that connects electric vehicle owners, fleet operators, and businesses with authorized EV service providers, franchise partners, and technicians.
          </p>
          <p className="text-xs text-white/70 font-light">The platform facilitates:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>EV service bookings</li>
            <li>Diagnostics and maintenance services</li>
            <li>Battery inspection and refurbishment services</li>
            <li>Spare parts sales and replacement</li>
            <li>Fleet service coordination</li>
          </ul>
          <p className="text-xs text-white/70 font-light pt-2 border-t border-white/10">
            While MY EV SERVICE establishes service standards and operational guidelines, certain services may be delivered by independent franchise partners or third-party service providers.
          </p>
        </div>

        {/* 2. Technical Disclaimer */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">2.</span> Technical Disclaimer
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Electric vehicles contain high-voltage electrical systems and complex electronic components. Service operations may involve:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>High-voltage battery systems</li>
            <li>Power electronics and motor controllers</li>
            <li>Charging infrastructure interfaces</li>
            <li>Vehicle software diagnostics</li>
          </ul>
          <p className="text-xs text-white/70 font-light">
            Although MY EV SERVICE partners follow industry-standard procedures and safety protocols, the company does not guarantee that:
          </p>
          <ul className="space-y-1.5 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>All vehicle issues can be fully diagnosed or resolved</li>
            <li>Repairs will permanently eliminate faults</li>
            <li>Software-related issues controlled by vehicle manufacturers can be modified or corrected</li>
          </ul>
          <p className="text-xs text-white/70 font-light">
            Certain technical limitations may exist due to OEM restrictions or proprietary systems.
          </p>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-light flex items-center justify-between gap-4">
            <span>For detailed safety information, see our high voltage guidelines.</span>
            <Link to="/hv-safety" className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-black font-bold text-xs shrink-0 hover:bg-amber-400 transition-all">
              High Voltage Safety Disclaimer
            </Link>
          </div>
        </div>

        {/* 3. Third-Party Service Providers */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">3.</span> Third-Party Service Providers
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Some services on the MY EV SERVICE platform may be performed by:
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Franchise partners</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Authorized garages</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Third-party service providers</span>
          </div>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            These partners operate as independent business entities. While MY EV SERVICE conducts onboarding and quality checks, the company does not assume full liability for operational activities conducted independently by such partners.
          </p>
          <p className="text-xs text-white/70 font-light">
            Users acknowledge that service delivery may involve third-party technicians and facilities.
          </p>
        </div>

        {/* 4. Battery Repair and Refurbishment Disclaimer */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">4.</span> Battery Repair and Refurbishment Disclaimer
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Battery diagnostics and refurbishment services involve complex procedures including:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Cell replacement</li>
            <li>Module balancing</li>
            <li>Battery management system calibration</li>
            <li>Thermal management inspection</li>
          </ul>
          <p className="text-xs text-white/70 font-light">
            Battery performance may depend on several factors including:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Age and usage of the battery</li>
            <li>Charging practices</li>
            <li>Environmental conditions</li>
            <li>Manufacturer design limitations</li>
          </ul>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light border-t border-white/10 pt-2">
            MY EV SERVICE does not guarantee that refurbished batteries will perform at the same level as new batteries. Battery refurbishment services may carry limited warranty coverage as defined in the{" "}
            <Link to="/warranty" className="text-[#00D084] underline font-bold">
              EV Service Warranty Policy
            </Link>.
          </p>
        </div>

        {/* 5. Spare Parts and Components */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">5.</span> Spare Parts and Components
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Spare parts installed during servicing may include:
          </p>
          <ul className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">OEM components</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Approved aftermarket components</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Reconditioned or refurbished parts</span>
          </ul>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            The performance and lifespan of these components may vary depending on manufacturer specifications and usage conditions. MY EV SERVICE shall not be responsible for issues caused by parts sourced or installed outside the authorized service network.
          </p>
        </div>

        {/* 6. Software and Electronic Systems */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">6.</span> Software and Electronic Systems
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Electric vehicles rely heavily on embedded software and electronic control units. Certain issues related to:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Firmware updates</li>
            <li>Vehicle software restrictions</li>
            <li>OEM security protocols</li>
            <li>Proprietary diagnostic systems</li>
          </ul>
          <p className="text-xs text-white/70 font-light pt-1">
            may not be accessible or modifiable by independent service providers. MY EV SERVICE does not guarantee compatibility with all manufacturer software systems.
          </p>
        </div>

        {/* 7. Vehicle Condition Disclaimer */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">7.</span> Vehicle Condition Disclaimer
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Service outcomes may be affected by the existing condition of the vehicle.
          </p>
          <p className="text-xs text-white/70 font-light">MY EV SERVICE shall not be responsible for:</p>
          <ul className="space-y-1.5 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Pre-existing mechanical or electrical faults</li>
            <li>Undetected manufacturing defects</li>
            <li>Issues arising from prior repairs by unauthorized service providers</li>
          </ul>
          <p className="text-xs text-[#00D084] font-medium pt-1">
            Technicians may identify additional issues during the service process that were not initially visible.
          </p>
        </div>

        {/* 8. Limitation of Liability */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">8.</span> Limitation of Liability
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            To the maximum extent permitted by law, Autobot Emobility Business Solutions Private Limited shall not be liable for:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Loss of vehicle usage or downtime</li>
            <li>Loss of business revenue or commercial disruption</li>
            <li>Indirect, incidental, or consequential damages</li>
            <li>Data loss or software-related failures</li>
            <li>Vehicle damage resulting from pre-existing faults</li>
          </ul>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-[#00D084] font-bold">
            The total liability of MY EV SERVICE, if any, shall be limited to the value of the specific service transaction performed through the platform.
          </div>
        </div>

        {/* 9. User Responsibility */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">9.</span> User Responsibility
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Users are responsible for:
          </p>
          <ul className="space-y-2 text-xs text-white/80 font-light">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
              <span>Providing accurate vehicle information</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
              <span>Following recommended charging and maintenance practices</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
              <span>Ensuring the vehicle is safe for service inspection</span>
            </li>
          </ul>
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-light">
            Users should not attempt to handle high-voltage components or battery systems without certified training.
          </div>
        </div>

        {/* 10. No Guarantee of Service Availability */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">10.</span> No Guarantee of Service Availability
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            While MY EV SERVICE aims to provide reliable service coverage, availability may vary depending on:
          </p>
          <ul className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Geographic location</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Technician availability</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Spare parts supply</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Operational conditions</span>
          </ul>
          <p className="text-xs text-white/70 font-light pt-1">
            The company does not guarantee uninterrupted availability of services in all regions.
          </p>
        </div>

        {/* 11. Regulatory Compliance */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">11.</span> Regulatory Compliance
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Users acknowledge that electric vehicles and battery systems may be subject to government safety and environmental regulations. MY EV SERVICE operates within applicable regulatory frameworks but cannot guarantee regulatory outcomes related to:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Vehicle modifications</li>
            <li>Retrofit installations</li>
            <li>Battery replacement approvals</li>
          </ul>
          <p className="text-xs text-white/70 font-light pt-1">
            Users should comply with local regulations governing vehicle safety and operation.
          </p>
        </div>

        {/* 12. Governing Law */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">12.</span> Governing Law
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            This disclaimer shall be governed by the laws of India. Any disputes arising from the use of the MY EV SERVICE platform shall fall under the jurisdiction of courts located in Pune, Maharashtra, India.
          </p>
        </div>

        {/* 13. Contact Information */}
        <div className="backdrop-blur-xl bg-[#00D084]/10 border border-[#00D084]/40 rounded-3xl p-6 sm:p-8 space-y-4 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center justify-center gap-2">
            <span className="text-[#00D084] font-mono">13.</span> Contact Information
          </h2>
          <p className="text-xs sm:text-sm text-white/80 font-light max-w-lg mx-auto">
            For questions regarding this Platform Disclaimer &amp; Limitation of Liability, please contact:
          </p>
          
          <div className="space-y-1 text-xs text-white/90 font-medium">
            <p className="text-base font-bold text-[#00D084]">MY EV SERVICE Support Team</p>
            <p className="text-white/70">Operated by Autobot Emobility Business Solutions Private Limited</p>
            <p className="text-white/80 font-mono">Email: info@myevservice.in</p>
            <p className="text-white/80 font-mono">Website: www.myevservice.in</p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer inline-flex items-center gap-2 shadow-[0_0_15px_rgba(0,208,132,0.3)]"
            >
              {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>Copy info@myevservice.in</span>
            </button>
          </div>

          {/* Related Links Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-white/80">
            <Link to="/terms" className="hover:text-[#00D084] transition-colors">Terms of Service</Link>
            <span>|</span>
            <Link to="/warranty" className="hover:text-[#00D084] transition-colors">Warranty Policy</Link>
            <span>|</span>
            <Link to="/refund" className="hover:text-[#00D084] transition-colors">Refund Policy</Link>
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

