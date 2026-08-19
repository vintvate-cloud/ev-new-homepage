import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  ShieldCheck,
  Lock,
  FileText,
  CheckCircle2,
  Building2,
  Mail,
  Globe,
  ArrowRight,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  Eye,
  BookOpen,
  UserCheck,
  Database,
  KeyRound,
  BellRing,
  HelpCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("sec-1");
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

  const scrollToSec = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const TOC = [
    { id: "sec-1", title: "1. Information We Collect" },
    { id: "sec-2", title: "2. How We Use Your Information" },
    { id: "sec-3", title: "3. Sharing of Information" },
    { id: "sec-4", title: "4. Data Storage & Security" },
    { id: "sec-5", title: "5. Cookies & Tracking" },
    { id: "sec-6", title: "6. Data Retention" },
    { id: "sec-7", title: "7. User Rights" },
    { id: "sec-8", title: "8. Marketing Communications" },
    { id: "sec-9", title: "9. Third-Party Links" },
    { id: "sec-10", title: "10. Children's Privacy" },
    { id: "sec-11", title: "11. Policy Updates" },
    { id: "sec-12", title: "12. Contact Information" },
  ];

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans overflow-x-hidden">
      {/* Header Navigation */}
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* =========================================================================
          1. HERO HEADER SECTION
         ========================================================================= */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-[#020403]">
        {/* Glow Spheres */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00D084]/12 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Legal Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00D084] shadow-md backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" />
            <span>Legal & Compliance Framework</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Privacy Policy <br />
            <span className="text-[#00D084] drop-shadow-[0_0_20px_rgba(0,208,132,0.4)]">
              MY EV SERVICE Platform
            </span>
          </h1>

          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            Owned and operated by <strong className="text-white font-semibold">Autobot Emobility Business Solutions Private Limited</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#00D084]" /> Last Updated: March 1st, 2026
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#00D084]" /> SSL 256-Bit Encryption
            </span>
          </div>

          {/* Related Legal Links Tab Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-white/10 max-w-3xl mx-auto">
            <span className="px-4 py-2 rounded-xl bg-[#00D084] text-[#020403] text-xs font-extrabold shadow-[0_0_15px_rgba(0,208,132,0.3)]">
              Privacy Policy
            </span>
            <Link
              to="/terms"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-bold transition-colors border border-white/10"
            >
              Terms of Service
            </Link>
            <Link
              to="/terms"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-bold transition-colors border border-white/10"
            >
              Cookie Policy
            </Link>
            <Link
              to="/terms"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-bold transition-colors border border-white/10"
            >
              Platform Disclaimer
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MAIN CONTENT LAYOUT (TOC SIDEBAR + POLICY CONTENT CARDS)
         ========================================================================= */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sticky Table of Contents Sidebar */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 shadow-xl">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Policy Navigation
              </h3>
              <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
                {TOC.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSec(item.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                      activeSection === item.id
                        ? "bg-[#00D084]/20 text-[#00D084] border border-[#00D084]/40 font-bold"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{item.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Contact Card in Sidebar */}
            <div className="backdrop-blur-xl bg-[#00D084]/10 border border-[#00D084]/30 rounded-3xl p-6 text-center space-y-3">
              <Mail className="w-8 h-8 text-[#00D084] mx-auto" />
              <h4 className="text-sm font-bold text-white">Privacy Concerns?</h4>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Contact our Data Protection Officer directly for any privacy inquiries.
              </p>
              <button
                onClick={handleCopyEmail}
                className="w-full py-2.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-extrabold uppercase tracking-wider hover:bg-[#00e08f] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>info@myevservice.in</span>
              </button>
            </div>
          </div>

          {/* Main Policy Content Cards */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Preamble Statement */}
            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4">
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
                <strong className="text-[#00D084]">MY EV SERVICE</strong> values your privacy and is committed to protecting your personal and business information. This Privacy Policy explains how we collect, use, store, and protect the data you provide when using the MY EV SERVICE platform.
              </p>
              <p className="text-sm text-white/80 leading-relaxed font-light">
                The MY EV SERVICE platform is owned and operated by <strong className="text-white font-semibold">Autobot Emobility Business Solutions Private Limited</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
              </p>
              <div className="p-4 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs text-[#00D084] font-medium leading-relaxed">
                By accessing or using the MY EV SERVICE website, mobile interface, service booking platform, or partner services, you agree to the terms outlined in this Privacy Policy.
              </div>
            </div>

            {/* 1. Information We Collect */}
            <div id="sec-1" className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">1. Information We Collect</h2>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                When you use MY EV SERVICE, we may collect the following types of information:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <h3 className="text-xs font-bold text-[#00D084] uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4" /> Personal Information
                  </h3>
                  <ul className="text-xs text-white/70 space-y-1.5 font-light list-disc list-inside">
                    <li>Full name</li>
                    <li>Phone number</li>
                    <li>Email address</li>
                    <li>Address and location information</li>
                    <li>Payment information (processed through secure partners)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <h3 className="text-xs font-bold text-[#00D084] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Vehicle Information
                  </h3>
                  <ul className="text-xs text-white/70 space-y-1.5 font-light list-disc list-inside">
                    <li>Vehicle make and model</li>
                    <li>Vehicle Identification Number (VIN)</li>
                    <li>Battery specifications &amp; telemetry</li>
                    <li>Service history records</li>
                    <li>Diagnostic report logs</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <h3 className="text-xs font-bold text-[#00D084] uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" /> Business Information
                  </h3>
                  <ul className="text-xs text-white/70 space-y-1.5 font-light list-disc list-inside">
                    <li>Company name &amp; GSTIN</li>
                    <li>Fleet vehicle details</li>
                    <li>Billing &amp; invoice addresses</li>
                    <li>Operational contact details</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <h3 className="text-xs font-bold text-[#00D084] uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-4 h-4" /> Platform Usage Info
                  </h3>
                  <ul className="text-xs text-white/70 space-y-1.5 font-light list-disc list-inside">
                    <li>IP address &amp; geolocation</li>
                    <li>Browser type &amp; OS version</li>
                    <li>Device information</li>
                    <li>Pages visited &amp; booking history</li>
                    <li>Platform interactions</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. How We Use Your Information */}
            <div id="sec-2" className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                  <Eye className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">2. How We Use Your Information</h2>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                We use the information collected to:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/80 font-light">
                <li className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Process EV service bookings
                </li>
                <li className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Schedule service appointments
                </li>
                <li className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Provide diagnostics &amp; repair services
                </li>
                <li className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Communicate service updates &amp; notifications
                </li>
                <li className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Process payments and invoices
                </li>
                <li className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Improve service quality &amp; customer care
                </li>
                <li className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Provide technical customer support
                </li>
                <li className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Enable fleet &amp; enterprise management
                </li>
              </ul>
              <p className="text-xs text-white/60 font-light italic border-t border-white/10 pt-3">
                Your information may also be used to personalize services and recommend relevant maintenance or service packages.
              </p>
            </div>

            {/* 3. Sharing of Information */}
            <div id="sec-3" className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                  <Globe className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">3. Sharing of Information</h2>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                MY EV SERVICE may share user data with trusted parties in order to deliver services:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                  <h4 className="text-xs font-bold text-[#00D084] uppercase">Service Partners</h4>
                  <p className="text-xs text-white/70 font-light mt-1">
                    Authorized service centers and technicians may receive necessary vehicle and contact information to perform services.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                  <h4 className="text-xs font-bold text-[#00D084] uppercase">Franchise Partners</h4>
                  <p className="text-xs text-white/70 font-light mt-1">
                    Local MY EV SERVICE franchise operators may access service requests within their operational territory.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                  <h4 className="text-xs font-bold text-[#00D084] uppercase">Payment Processors</h4>
                  <p className="text-xs text-white/70 font-light mt-1">
                    Payment details may be processed through secure third-party payment gateway providers under PCI-DSS compliance.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                  <h4 className="text-xs font-bold text-[#00D084] uppercase">Technology Providers</h4>
                  <p className="text-xs text-white/70 font-light mt-1">
                    We may use cloud hosting, analytics, and communication platforms to support platform operations.
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#00D084] font-medium">
                All third-party partners are expected to comply with applicable data protection standards.
              </p>
            </div>

            {/* 4. Data Storage and Security */}
            <div id="sec-4" className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">4. Data Storage and Security</h2>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                MY EV SERVICE implements reasonable security measures to protect user data from unauthorized access, misuse, or disclosure. Security measures include:
              </p>
              <ul className="space-y-2 text-xs text-white/80 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
                  <span>Secure servers and encrypted connections (256-bit SSL/TLS)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
                  <span>Access controls and role-based permissions for internal systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
                  <span>Regular monitoring and security audits of system activity</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
                  <span>Secure, tokenized payment processing infrastructure</span>
                </li>
              </ul>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 font-light">
                Note: Despite these measures, no system can guarantee complete security of information transmitted over the internet.
              </div>
            </div>

            {/* 5. Cookies and Tracking Technologies */}
            <div id="sec-5" className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">5. Cookies and Tracking Technologies</h2>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                The MY EV SERVICE platform may use cookies and similar technologies to improve user experience. Cookies help us:
              </p>
              <ul className="list-disc list-inside text-xs text-white/70 space-y-1.5 font-light">
                <li>Remember user preferences &amp; login sessions</li>
                <li>Analyze website traffic and usage metrics</li>
                <li>Improve platform performance and service functionality</li>
                <li>Provide personalized recommendations and service packages</li>
              </ul>
              <p className="text-xs text-white/60 font-light pt-2 border-t border-white/10">
                Users may modify browser settings to disable cookies, though certain features of the platform may not function properly without them.
              </p>
            </div>

            {/* 6. Data Retention */}
            <div id="sec-6" className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">6. Data Retention</h2>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                We retain user data only for as long as necessary to:
              </p>
              <ul className="list-disc list-inside text-xs text-white/70 space-y-1.5 font-light">
                <li>Provide requested EV services</li>
                <li>Maintain comprehensive vehicle service history records</li>
                <li>Comply with legal, tax, and regulatory requirements</li>
                <li>Resolve disputes and enforce platform agreements</li>
              </ul>
              <p className="text-xs text-[#00D084] font-medium pt-2">
                Vehicle service history may be retained to ensure proper maintenance tracking and customer support over the lifespan of your vehicle.
              </p>
            </div>

            {/* 7. User Rights */}
            <div id="sec-7" className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">7. User Rights</h2>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                Users have the right to request:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/80 font-light">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> Access their personal information
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> Update or correct information
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> Request deletion of personal data
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> Opt out of marketing communications
                </div>
              </div>
              <p className="text-xs text-white/70 font-light pt-2">
                Requests can be submitted by contacting the MY EV SERVICE support team at{" "}
                <button
                  onClick={handleCopyEmail}
                  className="text-[#00D084] font-bold underline cursor-pointer"
                >
                  info@myevservice.in
                </button>.
              </p>
            </div>

            {/* 8. Marketing Communications */}
            <div id="sec-8" className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                  <BellRing className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">8. Marketing Communications</h2>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                With user consent, MY EV SERVICE may send:
              </p>
              <ul className="list-disc list-inside text-xs text-white/70 space-y-1.5 font-light">
                <li>Automated service reminders &amp; maintenance alerts</li>
                <li>Promotional offers &amp; seasonal service packages</li>
                <li>Product &amp; platform service updates</li>
                <li>Educational EV care &amp; battery safety content</li>
              </ul>
              <p className="text-xs text-white/60 font-light pt-2 border-t border-white/10">
                Users may opt out of promotional communication at any time through unsubscribe links in emails or by contacting customer support.
              </p>
            </div>

            {/* 9. Third-Party Links */}
            <div id="sec-9" className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">9. Third-Party Links</h2>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                The MY EV SERVICE platform may contain links to third-party websites, payment gateways, or partner services. We are not responsible for the privacy practices or content of external websites. Users are encouraged to review the privacy policies of third-party platforms they interact with.
              </p>
            </div>

            {/* 10. Children's Privacy */}
            <div id="sec-10" className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">10. Children's Privacy</h2>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                MY EV SERVICE services are intended for individuals aged 18 years or older. We do not knowingly collect personal data from children under 18. If such information is discovered, it will be removed promptly from our servers.
              </p>
            </div>

            {/* 11. Updates to This Privacy Policy */}
            <div id="sec-11" className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">11. Updates to This Privacy Policy</h2>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                MY EV SERVICE reserves the right to update this Privacy Policy periodically. Changes will be posted on this page with the updated effective date (&quot;March 1st, 2026&quot;). Users are encouraged to review this page regularly to stay informed about how their information is protected.
              </p>
            </div>

            {/* 12. Contact Information */}
            <div id="sec-12" className="backdrop-blur-xl bg-[#00D084]/10 border border-[#00D084]/40 rounded-3xl p-6 sm:p-8 space-y-6 scroll-mt-28 shadow-2xl">
              <div className="flex items-center gap-3 border-b border-[#00D084]/20 pb-4">
                <div className="p-2.5 rounded-xl bg-[#00D084] text-[#020403] font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#00D084]">OFFICIAL LEGAL CONTACT</span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">12. Contact Information</h2>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-white/90 font-light">
                <p className="font-bold text-white text-base">MY EV SERVICE</p>
                <p className="text-white/70">
                  Operated by <strong className="text-white">Autobot Emobility Business Solutions Private Limited</strong>
                </p>
                <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-mono">
                  <button
                    onClick={handleCopyEmail}
                    className="px-4 py-2.5 rounded-xl bg-[#00D084] text-[#020403] font-extrabold hover:bg-[#00e08f] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>Email: info@myevservice.in</span>
                  </button>

                  <a
                    href="https://www.myevservice.in"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4 text-[#00D084]" />
                    <span>www.myevservice.in</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
