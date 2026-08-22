import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Building2,
  Mail,
  Globe,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  Eye,
  UserCheck,
  Database,
  KeyRound,
  BellRing,
  Clock,
  Scale,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

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

function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("sec-1");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const sidebarNavRef = useRef<HTMLDivElement>(null);
  const innerTocRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lenis Smooth Scroll for Table of Contents box (No Scrollbar)
  useEffect(() => {
    if (!sidebarNavRef.current || !innerTocRef.current) return;

    const tocLenis = new Lenis({
      wrapper: sidebarNavRef.current,
      content: innerTocRef.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    let rafId: number;
    function update(time: number) {
      tocLenis.raf(time);
      rafId = requestAnimationFrame(update);
    }
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      tocLenis.destroy();
    };
  }, []);

  // ScrollSpy Listener: Sync active section with page scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;
      const scrollPosition = window.scrollY + 140;

      for (let i = TOC.length - 1; i >= 0; i--) {
        const section = document.getElementById(TOC[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(TOC[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll the sidebar container to keep active section in view inside TOC list
  useEffect(() => {
    if (!innerTocRef.current) return;
    const activeItem = innerTocRef.current.querySelector(`[data-sec-id="${activeSection}"]`);
    if (activeItem) {
      activeItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    isClickScrolling.current = true;
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("info@myevservice.in");
    setCopiedEmail(true);
    toast.success("Copied info@myevservice.in to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans">
      
      {/* Navigation Header */}
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#060c09] to-[#020403]">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00D084]/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00D084] mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            MY EV SERVICE Platform Data Protection
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Privacy <span className="text-[#00D084]">Policy</span>
          </h1>

          <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Operated by <strong className="text-white font-semibold">Autobot Emobility Business Solutions Private Limited</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-sans font-medium text-white/70 pt-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#00D084]" />
              Last Updated: March 1st, 2026
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#00D084]" />
              SSL 256-Bit Encryption
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
              to="/cookies"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-bold transition-colors border border-white/10"
            >
              Cookie Policy
            </Link>
            <Link
              to="/disclaimer"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-bold transition-colors border border-white/10"
            >
              Platform Disclaimer
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sidebar Navigation */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sticky Table of Contents Sidebar */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-[#050907] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  Table of Contents
                </h3>
                <span className="text-[10px] font-mono text-white/40">
                  {TOC.findIndex((s) => s.id === activeSection) + 1} / {TOC.length}
                </span>
              </div>

              {/* Scrollable Lenis Wrapper (No Visible Scrollbar) */}
              <div
                ref={sidebarNavRef}
                className="max-h-[60vh] overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div ref={innerTocRef} className="space-y-1.5">
                  {TOC.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        data-sec-id={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full text-left text-xs py-2.5 px-3.5 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer ${
                          isActive
                            ? "bg-[#00D084] text-[#020403] font-black shadow-[0_0_15px_rgba(0,208,132,0.3)] translate-x-1"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="truncate pr-2">{sec.title}</span>
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Support Quick Contact Box */}
            <div className="bg-[#080d0a] border border-[#00D084]/20 rounded-3xl p-6 space-y-3 text-xs">
              <h4 className="font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#00D084]" />
                Privacy Concerns?
              </h4>
              <p className="text-white/60 leading-relaxed font-light">
                For formal enquiries regarding our data privacy practices or policy compliance:
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

          {/* Main Legal Sections Container */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Preamble Statement */}
            <div className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">MY EV SERVICE Privacy Commitment</h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                <strong className="text-[#00D084]">MY EV SERVICE</strong> values your privacy and is committed to protecting your personal and business information. This Privacy Policy explains how we collect, use, store, and protect the data you provide when using the MY EV SERVICE platform.
              </p>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                The MY EV SERVICE platform is owned and operated by <strong className="text-white font-semibold">Autobot Emobility Business Solutions Private Limited</strong> ("Company", "we", "us", or "our").
              </p>
              <div className="p-4 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs text-[#00D084] font-medium leading-relaxed">
                By accessing or using the MY EV SERVICE website, mobile interface, service booking platform, or partner services, you agree to the terms outlined in this Privacy Policy.
              </div>
            </div>

            {/* 1. Information We Collect */}
            <div id="sec-1" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">01</span>
                Information We Collect
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                When you use MY EV SERVICE, we may collect the following types of information:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
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

                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
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

                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
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

                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
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
            <div id="sec-2" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">02</span>
                How We Use Your Information
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                We use the information collected to:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/80 font-light">
                <li className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Process EV service bookings
                </li>
                <li className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Schedule service appointments
                </li>
                <li className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Provide diagnostics &amp; repair services
                </li>
                <li className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Communicate service updates &amp; notifications
                </li>
                <li className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Process payments and invoices
                </li>
                <li className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Improve service quality &amp; customer care
                </li>
                <li className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Provide technical customer support
                </li>
                <li className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D084]" /> Enable fleet &amp; enterprise management
                </li>
              </ul>
              <p className="text-xs text-white/60 font-light italic border-t border-white/10 pt-3">
                Your information may also be used to personalize services and recommend relevant maintenance or service packages.
              </p>
            </div>

            {/* 3. Sharing of Information */}
            <div id="sec-3" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">03</span>
                Sharing of Information
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                MY EV SERVICE may share user data with trusted parties in order to deliver services:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <h4 className="text-xs font-bold text-[#00D084] uppercase">Service Partners</h4>
                  <p className="text-xs text-white/70 font-light mt-1">
                    Authorized service centers and technicians may receive necessary vehicle and contact information to perform services.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <h4 className="text-xs font-bold text-[#00D084] uppercase">Franchise Partners</h4>
                  <p className="text-xs text-white/70 font-light mt-1">
                    Local MY EV SERVICE franchise operators may access service requests within their operational territory.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <h4 className="text-xs font-bold text-[#00D084] uppercase">Payment Processors</h4>
                  <p className="text-xs text-white/70 font-light mt-1">
                    Payment details may be processed through secure third-party payment gateway providers under PCI-DSS compliance.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
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
            <div id="sec-4" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">04</span>
                Data Storage and Security
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
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
            <div id="sec-5" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">05</span>
                Cookies and Tracking Technologies
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
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
            <div id="sec-6" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">06</span>
                Data Retention
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
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
            <div id="sec-7" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">07</span>
                User Rights
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Users have the right to request:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/80 font-light">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> Access their personal information
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> Update or correct information
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> Request deletion of personal data
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
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
            <div id="sec-8" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">08</span>
                Marketing Communications
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
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
            <div id="sec-9" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">09</span>
                Third-Party Links
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                The MY EV SERVICE platform may contain links to third-party websites, payment gateways, or partner services. We are not responsible for the privacy practices or content of external websites. Users are encouraged to review the privacy policies of third-party platforms they interact with.
              </p>
            </div>

            {/* 10. Children's Privacy */}
            <div id="sec-10" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">10</span>
                Children's Privacy
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                MY EV SERVICE services are intended for individuals aged 18 years or older. We do not knowingly collect personal data from children under 18. If such information is discovered, it will be removed promptly from our servers.
              </p>
            </div>

            {/* 11. Updates to This Privacy Policy */}
            <div id="sec-11" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">11</span>
                Updates to This Privacy Policy
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                MY EV SERVICE reserves the right to update this Privacy Policy periodically. Changes will be posted on this page with the updated effective date ("March 1st, 2026"). Users are encouraged to review this page regularly to stay informed about how their information is protected.
              </p>
            </div>

            {/* 12. Contact Information */}
            <div id="sec-12" className="bg-[#080d0a] border border-[#00D084]/30 rounded-3xl p-8 sm:p-10 space-y-6 scroll-mt-28 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] block">
                  Data Protection &amp; Compliance Contact
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  MY EV SERVICE
                </h2>
                <p className="text-xs sm:text-sm text-white/70 font-light">
                  Operated by <strong className="text-white font-semibold">Autobot Emobility Business Solutions Private Limited</strong>
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#00D084]/40 p-4 rounded-2xl transition-all text-white hover:text-[#00D084] cursor-pointer text-left"
                >
                  <Mail className="w-5 h-5 text-[#00D084] shrink-0" />
                  <span>info@myevservice.in</span>
                </button>

                <a
                  href="https://www.myevservice.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#00D084]/40 p-4 rounded-2xl transition-all text-white hover:text-[#00D084]"
                >
                  <Globe className="w-5 h-5 text-[#00D084] shrink-0" />
                  <span>www.myevservice.in</span>
                </a>
              </div>

              {/* Related Policies Links Bar */}
              <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-white/40 font-mono">Associated Legal Policies:</span>
                <div className="flex flex-wrap items-center gap-4 text-[#00D084]">
                  <Link to="/terms" className="hover:underline flex items-center gap-1">
                    Terms of Service <ExternalLink className="w-3 h-3" />
                  </Link>
                  <Link to="/terms" className="hover:underline flex items-center gap-1">
                    Warranty Policy <ExternalLink className="w-3 h-3" />
                  </Link>
                  <Link to="/refund" className="hover:underline flex items-center gap-1">
                    Refund Policy <ExternalLink className="w-3 h-3" />
                  </Link>
                  <Link to="/disclaimer" className="hover:underline flex items-center gap-1">
                    Platform Disclaimer <ExternalLink className="w-3 h-3" />
                  </Link>
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
