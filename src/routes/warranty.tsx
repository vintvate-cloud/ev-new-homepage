import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  ShieldCheck,
  Award,
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
  Zap,
  Battery,
  Wrench,
  FileCheck,
} from "lucide-react";

export const Route = createFileRoute("/warranty")({
  component: WarrantyPage,
});

const SECTIONS = [
  { id: "sec-1", title: "1. Scope of Warranty" },
  { id: "sec-2", title: "2. Warranty Coverage for EV Components" },
  { id: "sec-3", title: "3. Warranty Claim Process" },
  { id: "sec-4", title: "4. Conditions for Warranty Validity" },
  { id: "sec-5", title: "5. Warranty Exclusions" },
  { id: "sec-6", title: "6. Software & Diagnostic Services" },
  { id: "sec-7", title: "7. Spare Parts Warranty" },
  { id: "sec-8", title: "8. Fleet & Commercial Vehicle Warranty" },
  { id: "sec-9", title: "9. Limitation of Liability" },
  { id: "sec-10", title: "10. Warranty Transferability" },
  { id: "sec-11", title: "11. Governing Law" },
  { id: "sec-12", title: "12. Contact for Warranty Claims" },
];

function WarrantyPage() {
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
            <Award className="w-3.5 h-3.5" />
            EV Service Warranty Policy • MY EV SERVICE Platform
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-4 leading-[1.1]">
            EV Service <span className="text-[#00D084]">Warranty Policy</span>
          </h1>

          <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl mx-auto leading-relaxed mb-6">
            Operated by <strong className="text-white font-semibold">Autobot Emobility Business Solutions Private Limited</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-sans font-medium text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#00D084]" />
              Last Updated: March 1st, 2026
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
                Warranty Support?
              </h4>
              <p className="text-white/60 leading-relaxed font-light">
                Submit claims or verify component coverage with our technical support team:
              </p>
              <a
                href="mailto:support@myevservice.in"
                className="inline-flex items-center gap-2 text-[#00D084] font-mono font-bold hover:underline"
              >
                <Mail className="w-3.5 h-3.5" /> support@myevservice.in
              </a>
            </div>
          </div>

          {/* Main Legal Sections Container */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Preamble Statement */}
            <div className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">Policy Overview</h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                This EV Service Warranty Policy outlines the warranty coverage provided for services, repairs, and components supplied through the MY EV SERVICE platform and service network.
              </p>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                MY EV SERVICE is owned and operated by <strong className="text-white font-semibold">Autobot Emobility Business Solutions Private Limited</strong> ("Company", "we", "our", or "us").
              </p>
              <div className="p-4 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs text-[#00D084] font-medium leading-relaxed">
                This policy applies to services performed by MY EV SERVICE authorized centers, technicians, franchise partners, and service providers.
              </div>
            </div>

            {/* 1. Scope of Warranty */}
            <div id="sec-1" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">01</span>
                Scope of Warranty
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                The warranty applies to EV repair and maintenance services carried out by authorized MY EV SERVICE centers including:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-white/80">
                {[
                  "Electric vehicle diagnostics",
                  "Battery repair or replacement",
                  "Battery refurbishment services",
                  "Controller and inverter repair",
                  "Charging system repairs",
                  "Power electronics replacement",
                  "Thermal management system servicing",
                  "High-voltage wiring and component repair",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/5 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2">
                <p className="text-xs font-mono uppercase font-bold text-[#00D084]">
                  The warranty covers defects related to:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-white/70">
                  <li className="p-3 rounded-xl bg-white/5 border border-white/5 text-center font-medium">
                    Workmanship of service
                  </li>
                  <li className="p-3 rounded-xl bg-white/5 border border-white/5 text-center font-medium">
                    Installation of components
                  </li>
                  <li className="p-3 rounded-xl bg-white/5 border border-white/5 text-center font-medium">
                    Performance of delivered service
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Warranty Coverage for EV Components */}
            <div id="sec-2" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-6 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">02</span>
                Warranty Coverage for EV Components
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Warranty coverage may vary depending on the type of service or component:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* General EV Service Warranty */}
                <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-[#00D084]">
                    <Wrench className="w-5 h-5" />
                    <h4 className="text-xs font-bold font-mono uppercase">General EV Service Warranty</h4>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    Labor and workmanship performed by MY EV SERVICE technicians carry a warranty period of:
                  </p>
                  <div className="text-lg font-extrabold text-[#00D084] font-mono">
                    30 to 90 Days
                  </div>
                  <p className="text-[11px] text-white/40">Depending on the service category.</p>
                </div>

                {/* High Voltage System Components */}
                <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-[#00D084]">
                    <Zap className="w-5 h-5" />
                    <h4 className="text-xs font-bold font-mono uppercase">High Voltage System Components</h4>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    Repairs involving high-voltage components carry a warranty of:
                  </p>
                  <div className="text-lg font-extrabold text-[#00D084] font-mono">
                    30 to 180 Days
                  </div>
                  <p className="text-[11px] text-white/40">Includes inverter, motor controller, DC-DC converter, HV cables & charging interface.</p>
                </div>

                {/* EV Battery Replacement */}
                <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-[#00D084]">
                    <Battery className="w-5 h-5" />
                    <h4 className="text-xs font-bold font-mono uppercase">EV Battery Replacement</h4>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    New replacement batteries installed carry warranty coverage ranging from:
                  </p>
                  <div className="text-lg font-extrabold text-[#00D084] font-mono">
                    6 Months to 3 Years
                  </div>
                  <p className="text-[11px] text-white/40">Based on battery manufacturer terms, chemistry, and capacity.</p>
                </div>

                {/* Battery Refurbishment Services */}
                <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-[#00D084]">
                    <ShieldCheck className="w-5 h-5" />
                    <h4 className="text-xs font-bold font-mono uppercase">Battery Refurbishment Services</h4>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    Refurbished battery packs (cell replacement, module balancing, BMS calibration) carry a limited warranty of:
                  </p>
                  <div className="text-lg font-extrabold text-[#00D084] font-mono">
                    3 to 12 Months
                  </div>
                  <p className="text-[11px] text-white/40">Depending on refurbishment scope and initial battery condition.</p>
                </div>
              </div>
            </div>

            {/* 3. Warranty Claim Process */}
            <div id="sec-3" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">03</span>
                Warranty Claim Process
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                To submit a warranty claim, customers must follow these steps:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { step: "01", text: "Contact MY EV SERVICE Support team" },
                  { step: "02", text: "Provide original service invoice or service record" },
                  { step: "03", text: "Allow inspection by authorized technicians" },
                ].map((s) => (
                  <div key={s.step} className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center space-y-2">
                    <span className="text-xs font-mono font-black text-[#00D084] block">{s.step}</span>
                    <span className="text-xs text-white/80 block leading-tight">{s.text}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs">
                <p className="font-bold text-[#00D084] uppercase font-mono">Inspection Details:</p>
                <p className="text-white/70 font-light">
                  The inspection may include diagnostic testing, battery health analysis, and system performance checks. Warranty claims will be evaluated based on verified diagnostic findings.
                </p>
              </div>
            </div>

            {/* 4. Conditions for Warranty Validity */}
            <div id="sec-4" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">04</span>
                Conditions for Warranty Validity
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Warranty coverage remains valid only if:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/80">
                {[
                  "The vehicle has not been modified after service",
                  "The vehicle is operated according to manufacturer guidelines",
                  "Repairs are not performed by unauthorized service providers",
                  "Charging systems used comply with safety standards",
                ].map((cond, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/5 p-3.5 rounded-xl">
                    <FileCheck className="w-4 h-4 text-[#00D084] shrink-0" />
                    <span>{cond}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-white/60 font-light pt-2">
                Customers must follow recommended charging practices, operating conditions, and preventive maintenance schedules.
              </p>
            </div>

            {/* 5. Warranty Exclusions */}
            <div id="sec-5" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">05</span>
                Warranty Exclusions
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                This warranty does not cover issues resulting from:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-white/80">
                {[
                  "Vehicle accidents or external damage",
                  "Water damage or flooding",
                  "Unauthorized modifications",
                  "Improper charging equipment",
                  "Use of incompatible chargers",
                  "Tampering with battery or electrical systems",
                  "Wear and tear of consumable parts",
                ].map((ex, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/5 p-3 rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{ex}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-semibold space-y-1">
                <p>Warranty is void if:</p>
                <ul className="list-disc list-inside font-normal text-red-300">
                  <li>Non-authorized technicians attempt repair</li>
                  <li>Battery pack is opened or altered after service</li>
                </ul>
              </div>
            </div>

            {/* 6. Software and Diagnostic Services */}
            <div id="sec-6" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">06</span>
                Software and Diagnostic Services
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Software updates, system calibrations, and diagnostic services carry a limited service warranty.
              </p>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-white/70 space-y-2">
                <p className="font-bold text-white">Disclaimer on Firmware & Restrictions:</p>
                <p className="font-light">
                  MY EV SERVICE does not guarantee resolution of issues caused by OEM software restrictions, third-party firmware modifications, or manufacturer-controlled system updates.
                </p>
              </div>
            </div>

            {/* 7. Spare Parts Warranty */}
            <div id="sec-7" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">07</span>
                Spare Parts Warranty
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Spare parts installed through MY EV SERVICE carry manufacturer warranty where applicable. Parts may include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {["Battery cells or modules", "Charging connectors", "Power electronics components", "Sensors and control units"].map((p) => (
                  <div key={p} className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center font-medium text-white">
                    {p}
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/50 font-mono">
                Warranty duration will depend on the specific component manufacturer.
              </p>
            </div>

            {/* 8. Fleet and Commercial Vehicle Warranty */}
            <div id="sec-8" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">08</span>
                Fleet and Commercial Vehicle Warranty
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Fleet operators and commercial vehicle customers may have customized warranty terms as part of fleet maintenance contracts, enterprise service agreements, or annual maintenance programs.
              </p>
              <div className="p-4 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs text-[#00D084] font-medium">
                Such enterprise contracts may override standard retail warranty terms.
              </div>
            </div>

            {/* 9. Limitation of Liability */}
            <div id="sec-9" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">09</span>
                Limitation of Liability
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                MY EV SERVICE shall not be liable for:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-white/70">
                <li className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                  Loss of vehicle usage
                </li>
                <li className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                  Commercial losses from downtime
                </li>
                <li className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                  Indirect or consequential damages
                </li>
              </ul>
              <p className="text-xs text-[#00D084] font-medium">
                The liability of MY EV SERVICE shall be limited to the value of the service performed.
              </p>
            </div>

            {/* 10. Warranty Transferability */}
            <div id="sec-10" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">10</span>
                Warranty Transferability
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Service warranties are generally applicable only to the original customer and vehicle serviced. Transfer of warranty to a new vehicle owner may be permitted only with valid service documentation and vehicle ownership verification.
              </p>
            </div>

            {/* 11. Governing Law */}
            <div id="sec-11" className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-5 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#00D084]/15 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center border border-[#00D084]/30">11</span>
                Governing Law
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                This warranty policy shall be governed by the laws of India. Any disputes related to this warranty shall fall under the jurisdiction of courts located in <strong className="text-white font-semibold">Pune, Maharashtra, India</strong>.
              </p>
            </div>

            {/* 12. Contact for Warranty Claims */}
            <div id="sec-12" className="bg-[#080d0a] border border-[#00D084]/30 rounded-3xl p-8 sm:p-10 space-y-6 scroll-mt-28 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] block">
                  Warranty Claims Support
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  MY EV SERVICE Support Team
                </h2>
                <p className="text-xs sm:text-sm text-white/70 font-light">
                  Operated by <strong className="text-white font-semibold">Autobot Emobility Business Solutions Private Limited</strong>
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
                <a
                  href="mailto:support@myevservice.in"
                  className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#00D084]/40 p-4 rounded-2xl transition-all text-white hover:text-[#00D084]"
                >
                  <Mail className="w-5 h-5 text-[#00D084] shrink-0" />
                  <span>support@myevservice.in</span>
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
                  <Link to="/terms" className="hover:underline flex items-center gap-1">
                    Terms of Service <ExternalLink className="w-3 h-3" />
                  </Link>
                  <Link to="/privacy" className="hover:underline flex items-center gap-1">
                    Privacy Policy <ExternalLink className="w-3 h-3" />
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
