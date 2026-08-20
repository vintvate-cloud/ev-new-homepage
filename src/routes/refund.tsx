import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Mail,
  AlertCircle,
  FileText,
  Copy,
  Check,
  Building2,
  HelpCircle,
  Scale,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/refund")({
  component: RefundPage,
});

function RefundPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("support@myevservice.in");
    setCopiedEmail(true);
    toast.success("Copied support@myevservice.in to clipboard!");
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
            <RotateCcw className="w-4 h-4" />
            <span>MY EV SERVICE Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Refund &amp; Cancellation Policy <br />
            <span className="text-[#00D084] drop-shadow-[0_0_20px_rgba(0,208,132,0.4)]">
              MY EV SERVICE
            </span>
          </h1>

          <p className="text-xs sm:text-sm font-mono text-[#00D084]">
            Last Updated: March 1st, 2026
          </p>

          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            Owned and operated by <strong className="text-white">Autobot Emobility Business Solutions Private Limited</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
          </p>

          {/* Quick Legal Navigation Bar */}
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
        
        {/* Intro */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
            This Refund &amp; Cancellation Policy outlines the terms governing cancellations, refunds, and service adjustments for bookings made through the <strong className="text-[#00D084]">MY EV SERVICE</strong> platform.
          </p>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
            The MY EV SERVICE platform is owned and operated by <strong className="text-white">Autobot Emobility Business Solutions Private Limited</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
          </p>
          <div className="p-4 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs text-[#00D084] font-medium">
            By booking services through MY EV SERVICE, users agree to the terms outlined in this policy.
          </div>
        </div>

        {/* 1. Service Booking Confirmation */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">1.</span> Service Booking Confirmation
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            A service booking is considered confirmed once:
          </p>
          <ul className="space-y-2 text-xs text-white/80 font-light">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
              <span>The booking request is successfully placed on the MY EV SERVICE platform</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
              <span>Payment (if applicable) is completed or authorized</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
              <span>A service center or technician is assigned</span>
            </li>
          </ul>
          <div className="pt-2 border-t border-white/10 space-y-2">
            <p className="text-xs text-white/70 font-light">Customers will receive confirmation through:</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/80">SMS / Chat</span>
              <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/80">Email</span>
              <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/80">Platform notifications</span>
            </div>
          </div>
        </div>

        {/* 2. Cancellation by Customer */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">2.</span> Cancellation by Customer
          </h2>
          <p className="text-xs sm:text-sm text-white/80 font-light">
            Customers may cancel a booked service under the following conditions:
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-2">
              <h3 className="font-bold text-[#00D084] uppercase text-xs">Before Technician Dispatch</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                If the service appointment is cancelled before the technician or service partner begins dispatch:
              </p>
              <ul className="space-y-1 text-xs text-white/80 list-disc list-inside font-light">
                <li>No cancellation fee will apply</li>
                <li>Any prepaid amount will be refunded in full</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 space-y-2">
              <h3 className="font-bold text-amber-400 uppercase text-xs">After Technician Dispatch</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                If cancellation occurs after the technician has been dispatched or the service process has begun:
              </p>
              <ul className="space-y-1 text-xs text-white/80 list-disc list-inside font-light">
                <li>A service call or inspection charge may apply</li>
                <li>The remaining prepaid amount may be partially refunded after deducting applicable charges</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/30 space-y-2">
              <h3 className="font-bold text-rose-400 uppercase text-xs">Emergency or On-site Services</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                For emergency or roadside services: Once the technician reaches the location, the service charge may not be refundable.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Rescheduling of Service */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">3.</span> Rescheduling of Service
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Customers may request to reschedule a service appointment. Rescheduling requests must be made:
          </p>
          <ul className="space-y-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>At least 2 hours prior to the scheduled appointment time, or</li>
            <li>As per the service center&apos;s rescheduling policy</li>
          </ul>
          <p className="text-xs text-amber-300 font-light pt-1">
            Repeated rescheduling requests may result in cancellation of the booking.
          </p>
        </div>

        {/* 4. Cancellation by MY EV SERVICE */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">4.</span> Cancellation by MY EV SERVICE
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            In rare cases, MY EV SERVICE or its service partners may cancel a booking due to:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Technician unavailability</li>
            <li>Spare parts unavailability</li>
            <li>Safety concerns</li>
            <li>Incorrect booking details</li>
            <li>Operational constraints</li>
          </ul>
          <div className="p-4 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs text-[#00D084] font-medium space-y-1">
            <p>In such cases:</p>
            <ul className="list-disc list-inside text-white/90">
              <li>Customers will be informed promptly</li>
              <li>A full refund will be processed if payment was made</li>
            </ul>
          </div>
        </div>

        {/* 5. Refund Eligibility */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">5.</span> Refund Eligibility
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-3">
              <h3 className="font-bold text-[#00D084] uppercase">Refunds May Be Issued Where:</h3>
              <ul className="space-y-2 text-white/80 font-light">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084] shrink-0 mt-0.5" />
                  <span>Service cancellation before technician dispatch</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084] shrink-0 mt-0.5" />
                  <span>Payment charged but service not delivered</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084] shrink-0 mt-0.5" />
                  <span>Duplicate payment transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084] shrink-0 mt-0.5" />
                  <span>Incorrect billing or overcharge</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/30 space-y-3">
              <h3 className="font-bold text-rose-400 uppercase">Refunds May Not Apply Where:</h3>
              <ul className="space-y-2 text-white/80 font-light">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>Service has already been completed</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>Spare parts have been installed</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>The issue is unrelated to the service performed</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>Damage results from pre-existing vehicle conditions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 6. Spare Parts and Installed Components */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">6.</span> Spare Parts and Installed Components
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Once spare parts or components are installed in the vehicle:
          </p>
          <ul className="space-y-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Refunds may not be applicable</li>
            <li>Replacement or warranty claims may apply depending on the component</li>
          </ul>
          <p className="text-xs text-white/70 font-light pt-1">
            Any eligible warranty claims will be processed according to the{" "}
            <Link to="/warranty" className="text-[#00D084] underline font-bold">
              Service Warranty Policy
            </Link>.
          </p>
        </div>

        {/* 7. Refund Processing Timeline */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">7.</span> Refund Processing Timeline
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Approved refunds will typically be processed within: <strong className="text-[#00D084] font-mono text-base">5 to 10 business days</strong>
          </p>
          <p className="text-xs text-white/70 font-light">
            Refunds will be issued through the original payment method where possible. Refund timelines may vary depending on:
          </p>
          <ul className="flex flex-wrap gap-3 text-xs text-white/80 font-light pt-1">
            <span className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#00D084]" /> Payment gateway processing
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#00D084]" /> Bank processing timelines
            </span>
          </ul>
        </div>

        {/* 8. Service Packages and Membership Plans */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">8.</span> Service Packages and Membership Plans
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            For prepaid service packages, subscriptions, or maintenance plans:
          </p>
          <ul className="space-y-2 text-xs text-white/80 font-light list-disc list-inside pl-2">
            <li>Refunds may be prorated based on services already used</li>
            <li>Administrative or processing fees may apply</li>
            <li>Unused service credits may remain valid for the duration of the plan</li>
          </ul>
        </div>

        {/* 9. Fleet and Enterprise Service Agreements */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">9.</span> Fleet and Enterprise Service Agreements
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Refund and cancellation terms for:
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Fleet operators</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Corporate clients</span>
            <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-white/90">Enterprise contracts</span>
          </div>
          <p className="text-xs text-white/70 font-light">
            may be governed by separate Service Level Agreements (SLAs) or Enterprise Service Contracts.
          </p>
        </div>

        {/* 10. Dispute Resolution */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
            <span className="text-[#00D084] font-mono">10.</span> Dispute Resolution
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            If customers believe a service has been incorrectly charged or not delivered as expected, they may raise a support request with MY EV SERVICE.
          </p>
          <p className="text-xs text-white/70 font-light">
            The support team will review:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center font-medium text-white/90">
            <div className="p-3 rounded-xl bg-black/40 border border-white/10">Service records</div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/10">Technician reports</div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/10">Diagnostic results</div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/10">Payment transactions</div>
          </div>
          <p className="text-xs text-[#00D084] font-medium pt-1">
            and provide resolution accordingly.
          </p>
        </div>

        {/* 11. Contact for Refund Requests */}
        <div className="backdrop-blur-xl bg-[#00D084]/10 border border-[#00D084]/40 rounded-3xl p-6 sm:p-8 space-y-4 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center justify-center gap-2">
            <span className="text-[#00D084] font-mono">11.</span> Contact for Refund Requests
          </h2>
          <p className="text-xs sm:text-sm text-white/80 font-light max-w-lg mx-auto">
            To request a cancellation or refund, please contact:
          </p>
          
          <div className="space-y-1 text-xs text-white/90 font-medium">
            <p className="text-base font-bold text-[#00D084]">MY EV SERVICE Support Team</p>
            <p className="text-white/70">Operated by Autobot Emobility Business Solutions Private Limited</p>
            <p className="text-white/80 font-mono">Email: support@myevservice.in</p>
            <p className="text-white/80 font-mono">Website: www.myevservice.in</p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-white/70 max-w-md mx-auto space-y-1 text-left">
            <p className="font-bold text-white uppercase text-[11px]">Please include in your request:</p>
            <ul className="list-disc list-inside space-y-0.5 font-light">
              <li>Booking ID</li>
              <li>Registered phone number</li>
              <li>Service details</li>
              <li>Reason for cancellation or refund request</li>
            </ul>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer inline-flex items-center gap-2 shadow-[0_0_15px_rgba(0,208,132,0.3)]"
            >
              {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>Copy support@myevservice.in</span>
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

