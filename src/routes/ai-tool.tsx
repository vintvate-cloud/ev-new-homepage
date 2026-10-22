import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  ShieldCheck,
  Bot,
  Zap,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Search,
  CheckCircle2,
  Terminal,
  Cpu,
  AlertTriangle,
  Play,
  RotateCcw,
  Activity,
  Layers,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/ai-tool")({
  head: () => ({
    meta: [
      { title: "AI Tool for EV Diagnostics | MY EV SERVICE" },
      {
        name: "description",
        content:
          "MY EV SERVICE AI Tool helps EV technicians diagnose faults faster with AI troubleshooting, battery health insights and predictive maintenance.",
      },
      { name: "keywords", content: "AI Tool for EV Diagnostics, AI EV diagnostics tool, EV service AI technology, electric vehicle troubleshooting AI, EV predictive maintenance software" },
      { property: "og:title", content: "AI Tool for EV Diagnostics & Service Intelligence | MY EV SERVICE" },
      { property: "og:description", content: "Describe the symptom, add the error code, and get a likely cause, test steps and the fix in seconds." },
      { property: "og:image", content: "/assets/images/ev-ai-diagnostics.jpg" },
    ],
  }),
  component: AIToolPage,
});

export const AI_HERO_BG = "/ev-services-hero.jpg";

export function AIToolPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive Diagnostic Simulator State (#try)
  const [vehicle, setVehicle] = useState("Ola S1 Pro");
  const [symptom, setSymptom] = useState("Sudden power cut-off on climbs");
  const [errorCode, setErrorCode] = useState("ERR_BMS_CELL_DELTA_14");
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<{
    confidence: number;
    subsystem: string;
    rootCause: string;
    actionSteps: string[];
    safetyWarning: string;
  } | null>({
    confidence: 96,
    subsystem: "Battery Management System & Cell Block 3",
    rootCause: "Transient undervoltage cutoff triggered by 180mV cell divergence under peak acceleration current draw.",
    actionSteps: [
      "Isolate high-voltage traction harness (Follow HV SOP-04).",
      "Run cell-by-cell balancing cycle on Autobot Battery Diagnostic Bench.",
      "Inspect thermal junction on thermistor sensor probe #2.",
      "Flash BMS firmware patch v3.8.2 via Autobot OS.",
    ],
    safetyWarning: "High-voltage live pack hazard (>60V DC). Insulated ASTM Class 0 gloves mandatory before isolation test.",
  });

  const heroTextRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const contentUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title-reveal",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-sub-reveal",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, delay: 0.2, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-btn-reveal",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.9, delay: 0.4, ease: "power3.out" }
      );

      gsap.to(".services-bg-img", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: contentOverlayRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });

      if (heroTextRef.current && contentOverlayRef.current) {
        gsap.to(heroTextRef.current, {
          opacity: 0,
          scale: 0.9,
          y: -50,
          ease: "power1.out",
          scrollTrigger: {
            trigger: contentOverlayRef.current,
            start: "top 95%",
            end: "top 35%",
            scrub: 0.6,
          },
        });
      }

      if (contentUpRef.current) {
        gsap.fromTo(
          contentUpRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentUpRef.current,
              start: "top 95%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );
      }
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setDiagnosisResult({
        confidence: 94,
        subsystem: "Traction Inverter & Hall Sensor Bus",
        rootCause: `Diagnosed anomaly matching symptom '${symptom}' and telemetry code '${errorCode || "CAN_BROADCAST_POLL"}'.`,
        actionSteps: [
          "Connect oscilloscope to Motor Controller Phase U/V/W terminals.",
          "Check 5V DC reference supply on Throttle Hall connector.",
          "Perform motor coil insulation resistance check (>20MΩ at 500V test).",
          "Log job card telemetry snapshot in Autobot OS.",
        ],
        safetyWarning: "Discharge DC-link bus capacitors before probing inverter MOSFET leads.",
      });
      toast.success("AI Diagnostic Telemetry analysis complete!");
    }, 700);
  };

  const FAQS = [
    {
      q: "Who can use the AI Tool?",
      a: "MY EV SERVICE certified technicians and authorized partner centres. Demonstration and pilot evaluation access is available for fleet managers and workshop owners upon request.",
    },
    {
      q: "Which vehicles does it support?",
      a: "Electric 2W and 3W models from major Indian brands (Ola, Ather, TVS iQube, Bajaj Chetak, Hero Vida, Ampere, Revolt, Euler, and others), with continuous model parameter expansions.",
    },
    {
      q: "Does it replace diagnostic scanners?",
      a: "No. It works alongside professional hardware scanners and turns raw CAN-bus logs, error codes, and symptoms into guided, step-by-step diagnostic workflows.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084]/30 selection:text-[#00D084]">
      <Nav theme="dark" onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Main Container matching Services page architecture */}
      <div className="relative min-h-screen">

        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0)
           ========================================================================= */}
        <div className="page-hero fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background image with parallax zoom */}
          <div
            className="services-bg-img absolute inset-0 bg-cover bg-center opacity-75 pointer-events-none scale-105 transition-all duration-700"
            style={{
              backgroundImage: `url('${AI_HERO_BG}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

          <div
            ref={heroTextRef}
            className="max-w-4xl mx-auto text-center relative z-10 px-6 space-y-4 pointer-events-auto"
          >
            <span className="hero-sub-reveal text-xs font-mono font-bold uppercase tracking-widest text-[#00D084]">
              • Autobot OS Intelligence Engine · AI Fault Diagnosis
            </span>
            <h1 className="hero-title-reveal text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
              AI Powered EV Diagnostics &amp; <br className="hidden sm:block" />
              <span className="text-[#00D084]">Service Intelligence</span>
            </h1>
            <p className="hero-sub-reveal text-sm sm:text-base md:text-lg text-[#c2d1c7] font-light max-w-2xl mx-auto leading-relaxed">
              Describe the symptom, add the error code, and get a likely cause, the next test to run and the fix, in seconds. Built for EV technicians, fleet managers and service centres.
            </p>
            <div className="hero-btn-reveal pt-3 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#try"
                className="whitespace-nowrap inline-flex items-center shrink-0 gap-2 px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] cursor-pointer hover:scale-105"
              >
                <span>TRY THE AI TOOL</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
              <Link
                to="/contact"
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. CARDS OVERLAY CONTAINER (SLIDES UP DIRECTLY ON TOP OF THE FIXED HERO)
           ========================================================================= */}
        <div
          ref={contentOverlayRef}
          className="relative z-10 min-h-screen mt-[calc(100vh-80px)] pt-6 rounded-t-[40px] border-t border-white/10 shadow-2xl bg-[#020403]"
        >
          <div ref={contentUpRef}>
            {/* S0: Breadcrumb */}
            <div className="pb-3 px-6 max-w-7xl mx-auto">
              <nav aria-label="breadcrumb" className="text-xs font-mono text-white/50 flex items-center gap-2">
                <Link to="/" className="hover:text-[#00D084] transition-colors">Home</Link>
                <span>›</span>
                <span className="text-[#00D084]">AI Tool</span>
              </nav>
            </div>

            {/* S1.5: Interactive Diagnostic Simulator Widget (#try) */}
            <section id="try" className="py-8 px-6 max-w-6xl mx-auto">
        <div className="rounded-[32px] bg-[#07110B] border-2 border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#00D084] animate-pulse" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Interactive Fault Diagnostic Simulator
              </span>
            </div>
            <span className="text-[11px] font-mono text-white/40">Autobot OS Engine v4.2</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls */}
            <form onSubmit={handleSimulate} className="lg:col-span-5 space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Target EV Model</label>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full bg-[#0f1712] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                >
                  <option value="Ola S1 Pro">Ola S1 Pro</option>
                  <option value="Ather 450X">Ather 450X / Rizta</option>
                  <option value="TVS iQube">TVS iQube Electric</option>
                  <option value="Bajaj Chetak">Bajaj Chetak Premium</option>
                  <option value="Hero Vida V1">Hero Vida V1 Pro</option>
                  <option value="L5 Cargo 3W">Piaggio / Euler L5 3W</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Observed Symptom</label>
                <input
                  type="text"
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  placeholder="e.g. Won't charge past 80%, jerking on acceleration"
                  className="w-full bg-[#0f1712] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">DTC Error Code (Optional)</label>
                <input
                  type="text"
                  value={errorCode}
                  onChange={(e) => setErrorCode(e.target.value)}
                  placeholder="e.g. ERR_BMS_CELL_DELTA_14 or DTC_MOT_09"
                  className="w-full bg-[#0f1712] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <button
                type="submit"
                disabled={analyzing}
                className="w-full py-3.5 rounded-full bg-[#00D084] text-black font-black text-xs uppercase tracking-widest hover:bg-[#00e08f] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {analyzing ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" /> Analyzing CAN Telemetry...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Run AI Diagnostic Analysis
                  </>
                )}
              </button>
            </form>

            {/* Diagnostic Output Window */}
            <div className="lg:col-span-7 bg-[#030604] border border-white/10 rounded-2xl p-6 font-mono text-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-[11px]">
                <span className="text-[#00D084] font-bold">ANALYSIS TELEMETRY REPORT</span>
                <span className="px-2 py-0.5 rounded bg-[#00D084]/15 text-[#00D084] font-bold">
                  {diagnosisResult?.confidence}% MATCH CONFIDENCE
                </span>
              </div>

              {diagnosisResult && (
                <div className="space-y-4">
                  <div>
                    <span className="text-white/40 uppercase text-[10px] block">Identified Subsystem</span>
                    <span className="text-white font-bold text-sm">{diagnosisResult.subsystem}</span>
                  </div>

                  <div>
                    <span className="text-white/40 uppercase text-[10px] block">Probable Root Cause</span>
                    <p className="text-white/80 leading-relaxed font-sans text-xs mt-0.5">
                      {diagnosisResult.rootCause}
                    </p>
                  </div>

                  <div>
                    <span className="text-[#00D084] uppercase text-[10px] block font-bold mb-1.5">
                      Step-by-Step Test &amp; Resolution SOP
                    </span>
                    <ol className="space-y-1.5 pl-4 list-decimal text-white/70 font-sans text-xs">
                      {diagnosisResult.actionSteps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-tight font-sans">
                      {diagnosisResult.safetyWarning}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* S2 & S3: AI Features & Capabilities */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            Engineering Depth
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            AI Technology for EV Diagnostics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Smart Fault Detection",
              desc: "Combines symptom descriptions, error codes, and live BMS readings to rank most likely faults across battery, motor, and controller.",
              icon: Search,
            },
            {
              title: "AI Troubleshooting",
              desc: "Guides the technician directly to root causes, drastically cutting down on trial-and-error component swapping.",
              icon: Cpu,
            },
            {
              title: "Battery Health Monitoring",
              desc: "Tracks cell imbalance, internal resistance, and state-of-health trends to flag anomalies before pack degradation.",
              icon: Activity,
            },
            {
              title: "Motor & Controller Checks",
              desc: "Spots early patterns behind inverter cut-offs, phase line overheating, and sudden deceleration risks.",
              icon: Zap,
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="p-6 rounded-2xl bg-[#080d0a] border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* S6: Platform Integration & Safety Disclaimer */}
      <section className="py-16 px-6 bg-[#07110B] border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-mono text-[#00D084] uppercase tracking-widest font-bold">
            Autobot OS Integration
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Works inside Autobot OS for end-to-end service records
          </h2>
          <p className="text-xs text-white/70 font-light leading-relaxed">
            Diagnoses flow straight into the digital job card, parts requests via EV Spare Hub, and instant customer transparency reports. Every job completed makes the AI tool smarter across the nationwide network.
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-white/50 max-w-xl mx-auto">
            Disclaimer: AI suggestions support, and do not replace, a certified technician's judgement. Always follow standard high-voltage (HV) safety isolation procedures.
          </div>
        </div>
      </section>

      {/* S7: FAQs */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white tracking-tight">AI Tool FAQs</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div key={faq.q} className="rounded-2xl border border-white/10 bg-[#080d0a] overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left text-sm font-bold text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#00D084] transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-white/70 leading-relaxed font-light border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* S8: Closing CTA */}
      <section className="py-16 px-6 bg-[#0D5C2E] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            See the AI Tool in Action
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Book a personalized demonstration for your service workshop or fleet maintenance team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-white text-[#020403] font-black text-xs uppercase tracking-widest hover:bg-white/90 shadow-2xl transition-all"
            >
              Request a Workshop Demo
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Explore Our EV Services
            </Link>
          </div>
        </div>
      </section>

          </div>
        </div>
      </div>

      <Footer />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </main>
  );
}
