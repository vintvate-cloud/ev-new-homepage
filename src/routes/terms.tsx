import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Mail,
  Globe,
  Building,
  Scale,
  Calendar,
  Lock,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

const SECTIONS = [
  { id: "sec-1", title: "1. About MY EV SERVICE" },
  { id: "sec-2", title: "2. Eligibility to Use the Platform" },
  { id: "sec-3", title: "3. User Accounts" },
  { id: "sec-4", title: "4. Services Offered" },
  { id: "sec-5", title: "5. Booking & Service Fulfillment" },
  { id: "sec-6", title: "6. Pricing and Payments" },
  { id: "sec-7", title: "7. Cancellation and Rescheduling" },
  { id: "sec-8", title: "8. Franchise and Partner Services" },
  { id: "sec-9", title: "9. Warranty and Service Liability" },
  { id: "sec-10", title: "10. Spare Parts and Components" },
  { id: "sec-11", title: "11. Intellectual Property" },
  { id: "sec-12", title: "12. Platform Usage Restrictions" },
  { id: "sec-13", title: "13. Limitation of Liability" },
  { id: "sec-14", title: "14. Privacy and Data Protection" },
  { id: "sec-15", title: "15. Modification of Terms" },
  { id: "sec-16", title: "16. Governing Law" },
  { id: "sec-17", title: "17. Contact Information" },
];

function TermsPage() {
  const [activeSection, setActiveSection] = useState("sec-1");
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

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
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

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans">
      
      {/* Unified Landing Navbar */}
      <Nav />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#060c09] to-[#020403]">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00D084]/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00D084] mb-6">
            <FileText className="w-3.5 h-3.5" />
            MY EV SERVICE Platform Legal Agreement
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-4 leading-[1.1]">
            Terms of <span className="text-[#00D084]">Service</span>
          </h1>

          <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl mx-auto leading-relaxed mb-6">
            Operated by <strong className="text-white font-semibold">Autobot Emobility Business Solutions Private Limited</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-sans font-medium text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#00D084]" />
              Last Updated: 1st January 2026
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <Building className="w-4 h-4 text-[#00D084]" />
              Jurisdiction: Pune, India
            </span>
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
                  {SECTIONS.findIndex((s) => s.id === activeSection) + 1} / {SECTIONS.length}
                </span>
              </div>

              {/* Scrollable Lenis Wrapper (No Visible Scrollbar) */}
              <div
                ref={sidebarNavRef}
                className="max-h-[60vh] overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div ref={innerTocRef} className="space-y-1.5">
                  {SECTIONS.map((sec) => {
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
                Legal Questions?
              </h4>
              <p className="text-white/60 leading-relaxed font-light">
                For formal enquiries regarding our platform terms or operational compliance:
              </p>
              <a
                href="mailto:info@myevservice.in"
                className="inline-flex items-center gap-2 text-[#00D084] font-mono font-bold hover:underline"
              >
                <Mail className="w-3.5 h-3.5" /> info@myevservice.in
              </a>
            </div>
          </div>

          {/* Main Legal Sections Container */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Preamble Statement */}
            <div className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">Welcome to MY EV SERVICE</h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Welcome to MY EV SERVICE, a digital platform and service network designed to provide electric vehicle (EV) owners, fleet operators, and businesses with reliable service, maintenance, diagnostics, and mobility support solutions.
              </p>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                These Terms of Service ("Terms") govern your access to and use of the MY EV SERVICE platform, website, mobile interfaces, partner services, and associated offerings.
              </p>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                The platform is owned and operated by <strong className="text-white font-semibold">Autobot Emobility Business Solutions Private Limited</strong> ("Company", "we", "us", or "our").
              </p>
              <div className="p-4 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs text-[#00D084] font-medium leading-relaxed">
                By accessing or using the MY EV SERVICE platform, you agree to comply with and be legally bound by these Terms. If you do not agree with these Terms, please refrain from using the platform.
              </div>
            </div>

            {/* 1. About MY EV SERVICE */}
            <div id="sec-1" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">01</span>
                About MY EV SERVICE
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                MY EV SERVICE is a digital EV service ecosystem that connects EV owners, fleet operators, and businesses with certified EV service centers, diagnostic experts, and mobility solution providers.
              </p>

              <div className="space-y-3">
                <p className="text-xs font-mono uppercase font-bold text-[#00D084] tracking-wider">
                  The platform enables users to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-white/80">
                  {[
                    "Discover EV service centers",
                    "Book EV maintenance and repair services",
                    "Access battery diagnostics and refurbishment services",
                    "Request roadside assistance and fleet support",
                    "Schedule EV inspection and preventive maintenance",
                    "Purchase EV service plans and bundled service packages",
                    "Access EV retrofit, component replacement, and battery services",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/5 p-3 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <p className="text-xs font-mono uppercase font-bold text-white/60 tracking-wider mb-2">
                  MY EV SERVICE operates through a network of:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/70">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" /> Company-operated service centers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" /> Franchise partner centers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" /> Authorized service partners
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" /> Certified technicians and service providers
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Eligibility to Use the Platform */}
            <div id="sec-2" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">02</span>
                Eligibility to Use the Platform
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                To use MY EV SERVICE services, users must satisfy the following criteria:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/80">
                {[
                  "Be at least 18 years of age",
                  "Provide accurate registration details",
                  "Use the platform for lawful purposes only",
                  "Comply with applicable laws and regulations",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/5 p-3.5 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-[#00D084] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/60 font-light leading-relaxed pt-2">
                Businesses, fleets, and organizations using the platform must ensure that authorized representatives are permitted to act on their behalf.
              </p>
            </div>

            {/* 3. User Accounts */}
            <div id="sec-3" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">03</span>
                User Accounts
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                To access certain services, users may be required to create an account. Users agree to:
              </p>
              <ul className="space-y-2.5 text-xs text-white/80">
                <li className="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl">
                  <Lock className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                  <span>Provide accurate and updated personal or business information</span>
                </li>
                <li className="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl">
                  <Lock className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                  <span>Maintain confidentiality of login credentials</span>
                </li>
                <li className="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl">
                  <Lock className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                  <span>Accept responsibility for all activities conducted under their account</span>
                </li>
              </ul>
              <p className="text-xs text-[#00D084] font-medium leading-relaxed">
                MY EV SERVICE reserves the right to suspend or terminate accounts found violating these terms.
              </p>
            </div>

            {/* 4. Services Offered */}
            <div id="sec-4" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">04</span>
                Services Offered
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Services available on the platform may include but are not limited to:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold font-mono text-[#00D084] uppercase">EV Maintenance Services</h4>
                  <ul className="text-xs text-white/70 space-y-1 list-disc list-inside">
                    <li>Routine servicing</li>
                    <li>Brake and suspension service</li>
                    <li>Software diagnostics and updates</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold font-mono text-[#00D084] uppercase">Battery Services</h4>
                  <ul className="text-xs text-white/70 space-y-1 list-disc list-inside">
                    <li>Battery health diagnostics</li>
                    <li>Battery refurbishment</li>
                    <li>Battery replacement and upgrade</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold font-mono text-[#00D084] uppercase">Diagnostic Services</h4>
                  <ul className="text-xs text-white/70 space-y-1 list-disc list-inside">
                    <li>High-voltage system diagnostics</li>
                    <li>Controller and inverter testing</li>
                    <li>Thermal management inspection</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold font-mono text-[#00D084] uppercase">Fleet Services</h4>
                  <ul className="text-xs text-white/70 space-y-1 list-disc list-inside">
                    <li>Fleet maintenance programs</li>
                    <li>EV inspection programs</li>
                    <li>Preventive maintenance contracts</li>
                  </ul>
                </div>

                <div className="sm:col-span-2 bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold font-mono text-[#00D084] uppercase">Emergency Support</h4>
                  <ul className="text-xs text-white/70 space-y-1 list-disc list-inside">
                    <li>EV roadside assistance</li>
                    <li>On-site diagnostics</li>
                  </ul>
                </div>
              </div>

              <p className="text-xs text-white/50 font-mono italic">
                Services may vary depending on location, vehicle type, and service center capability.
              </p>
            </div>

            {/* 5. Booking and Service Fulfillment */}
            <div id="sec-5" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">05</span>
                Booking and Service Fulfillment
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                When users book services through the platform:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {[
                  { step: "01", text: "A service request is generated." },
                  { step: "02", text: "The request is assigned to a nearby service partner or center." },
                  { step: "03", text: "Service scheduling is confirmed with the user." },
                  { step: "04", text: "The service is performed by certified technicians." },
                ].map((s) => (
                  <div key={s.step} className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center space-y-2">
                    <span className="text-xs font-mono font-black text-[#00D084] block">{s.step}</span>
                    <span className="text-xs text-white/80 block leading-tight">{s.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2">
                <p className="text-xs font-mono uppercase font-bold text-white/60">
                  Actual service timelines may vary depending on:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/70">
                  <span>• Spare parts availability</span>
                  <span>• Vehicle condition</span>
                  <span>• Diagnostic findings</span>
                  <span>• Service partner availability</span>
                </div>
              </div>
            </div>

            {/* 6. Pricing and Payments */}
            <div id="sec-6" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">06</span>
                Pricing and Payments
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Service pricing may include service charges, spare parts cost, diagnostic fees, logistics/pickup charges, and taxes applicable under Indian law.
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs text-white/80">
                <p className="font-semibold text-white">Indicative Estimates Notice:</p>
                <p className="text-white/60 font-light">
                  Prices displayed on the platform may be indicative estimates and may change based on final vehicle diagnosis.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-mono uppercase font-bold text-[#00D084]">Payments may be processed via:</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["Online payment gateways", "Digital wallets", "Bank transfers", "On-site payments (where permitted)"].map((m) => (
                    <span key={m} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-white/50 font-mono">
                MY EV SERVICE reserves the right to modify pricing structures without prior notice.
              </p>
            </div>

            {/* 7. Cancellation and Rescheduling */}
            <div id="sec-7" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">07</span>
                Cancellation and Rescheduling
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Users may cancel or reschedule service appointments subject to the following conditions:
              </p>

              <div className="space-y-2 text-xs text-white/80">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                  <span>Cancellation before technician dispatch may be free of charge.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Cancellation after technician dispatch may incur service charges.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Emergency services may not be refundable once initiated.</span>
                </div>
              </div>

              <p className="text-xs text-white/60 font-light">
                Specific cancellation policies may vary by service category. See our{" "}
                <Link to="/refund" className="text-[#00D084] underline font-semibold">
                  Refund Policy
                </Link>{" "}
                for full details.
              </p>
            </div>

            {/* 8. Franchise and Partner Services */}
            <div id="sec-8" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">08</span>
                Franchise and Partner Services
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                MY EV SERVICE operates through a network of independent franchise partners and service providers. While the platform ensures partner onboarding standards, certain services may be performed by third-party service partners.
              </p>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Autobot Emobility Business Solutions Private Limited acts as a technology platform and ecosystem facilitator, connecting users with service providers. However, the company may not be directly responsible for operational execution performed by independent service partners.
              </p>
            </div>

            {/* 9. Warranty and Service Liability */}
            <div id="sec-9" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">09</span>
                Warranty and Service Liability
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Warranty on services may vary depending on the type of repair, parts installed, and service package selected. Service warranties will be communicated during service booking or invoicing. See our{" "}
                <Link to="/terms" className="text-[#00D084] underline font-semibold">
                  Warranty Policy
                </Link>{" "}
                for details.
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <p className="text-xs font-mono uppercase font-bold text-amber-400">
                  MY EV SERVICE shall not be responsible for:
                </p>
                <ul className="text-xs text-white/70 space-y-1.5 list-disc list-inside">
                  <li>Pre-existing vehicle defects</li>
                  <li>Unauthorized modifications performed by third parties</li>
                  <li>Damages caused by misuse of the vehicle</li>
                  <li>Issues unrelated to the performed service</li>
                </ul>
              </div>
            </div>

            {/* 10. Spare Parts and Components */}
            <div id="sec-10" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">10</span>
                Spare Parts and Components
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Spare parts installed during service may include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center font-semibold text-white">
                  OEM Components
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center font-semibold text-white">
                  Compatible Aftermarket Parts
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center font-semibold text-white">
                  Reconditioned / Refurbished Parts
                </div>
              </div>
              <p className="text-xs text-white/60 font-light">
                Users will be informed before installation of refurbished or compatible parts.
              </p>
            </div>

            {/* 11. Intellectual Property */}
            <div id="sec-11" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">11</span>
                Intellectual Property
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                All content on the MY EV SERVICE platform including logos, brand names, service frameworks, platform design, training systems, and documentation are the intellectual property of Autobot Emobility Business Solutions Private Limited or its licensors.
              </p>
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-semibold">
                Unauthorized use, reproduction, or distribution of any platform intellectual property is strictly prohibited.
              </div>
            </div>

            {/* 12. Platform Usage Restrictions */}
            <div id="sec-12" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">12</span>
                Platform Usage Restrictions
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Users must strictly refrain from:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/80">
                {[
                  "Attempting to disrupt platform functionality",
                  "Accessing restricted areas of the platform",
                  "Using the platform for illegal activities",
                  "Misrepresenting identity or vehicle ownership",
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/5 p-3.5 rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/50 font-mono">
                Violation may result in immediate suspension or termination of services.
              </p>
            </div>

            {/* 13. Limitation of Liability */}
            <div id="sec-13" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">13</span>
                Limitation of Liability
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                To the fullest extent permitted by law, Autobot Emobility Business Solutions Private Limited shall not be liable for:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/70">
                <li className="flex items-center gap-2 bg-white/5 p-3 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" /> Indirect or consequential damages
                </li>
                <li className="flex items-center gap-2 bg-white/5 p-3 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" /> Loss of business or revenue
                </li>
                <li className="flex items-center gap-2 bg-white/5 p-3 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" /> Vehicle downtime
                </li>
                <li className="flex items-center gap-2 bg-white/5 p-3 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" /> Third-party service partner actions
                </li>
              </ul>
              <div className="p-4 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs text-[#00D084] font-medium leading-relaxed">
                Our liability shall be limited to the value of the service transaction conducted through the platform. See also our{" "}
                <Link to="/disclaimer" className="underline font-bold">
                  Platform Disclaimer
                </Link>.
              </div>
            </div>

            {/* 14. Privacy and Data Protection */}
            <div id="sec-14" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">14</span>
                Privacy and Data Protection
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                User data collected through the platform is handled according to our{" "}
                <Link to="/privacy" className="text-[#00D084] underline font-semibold">
                  Privacy Policy
                </Link>. Information collected may include personal details, vehicle information, service history, and payment information. The platform follows reasonable measures to ensure secure data processing.
              </p>
            </div>

            {/* 15. Modification of Terms */}
            <div id="sec-[#sec-15]" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28" id="sec-15">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">15</span>
                Modification of Terms
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                MY EV SERVICE reserves the right to modify these Terms of Service at any time. Updated terms will be published on this page with the revised date. Continued use of the platform after updates constitutes acceptance of the revised terms.
              </p>
            </div>

            {/* 16. Governing Law */}
            <div id="sec-16" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">16</span>
                Governing Law
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from these Terms shall fall under the jurisdiction of courts located in <strong className="text-white font-semibold">Pune, Maharashtra, India</strong>.
              </p>
            </div>

            {/* 17. Contact Information */}
            <div id="sec-17" className="bg-[#080d0a] border border-[#00D084]/30 rounded-3xl p-8 sm:p-10 space-y-6 scroll-mt-28 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] block">
                  Legal & Corporate Contact
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  MY EV SERVICE
                </h2>
                <p className="text-xs sm:text-sm text-white/70 font-light">
                  Operated by <strong className="text-white font-semibold">Autobot Emobility Business Solutions Private Limited</strong>
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
                <a
                  href="mailto:info@myevservice.in"
                  className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#00D084]/40 p-4 rounded-2xl transition-all text-white hover:text-[#00D084]"
                >
                  <Mail className="w-5 h-5 text-[#00D084] shrink-0" />
                  <span>info@myevservice.in</span>
                </a>

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
                  <Link to="/privacy" className="hover:underline flex items-center gap-1">
                    Privacy Policy <ExternalLink className="w-3 h-3" />
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

      {/* Unified Landing Footer */}
      <Footer />

    </div>
  );
}
