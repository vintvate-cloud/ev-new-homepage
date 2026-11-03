import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  MapPin,
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  UserCheck,
  Phone,
  Sparkles,
  ArrowRight,
  Activity,
  Cpu,
  ShieldCheck,
  BellRing,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Live EV Service & Repair Tracking | MY EV SERVICE" },
      {
        name: "description",
        content:
          "Track real-time status of your EV service, battery diagnostics, technician inspection notes, and delivery ETA using your Booking ID or Phone Number.",
      },
    ],
  }),
  component: TrackPage,
});

export const TRACK_HERO_BG = "/ev-services-hero.jpg";

function TrackPage() {
  const [bookingId, setBookingId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeJob, setActiveJob] = useState<any>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const heroTextRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const contentUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

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

  const handleTrackSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!bookingId && !phoneNumber) {
      toast.error("Please enter your Booking ID or Registered Mobile Number.");
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      setActiveJob({
        jobCardId: bookingId || "JOB-EV-98412",
        status: "In Progress",
        stage: "Battery Cell Diagnostic & Telemetry Sync",
        progressPercent: 65,
        vehicleLabel: "Ola S1 Pro (MH 12 EV 8821)",
        technician: "Ramesh Sharma (Master EV Engineer - L3 Certified)",
        technicianPhone: "+91 95823 90001",
        serviceCenter: "Pune Central EV Technology Hub, Baner",
        eta: "35 mins",
        checklist: [
          { task: "Vehicle In-Gate High Voltage Safety Isolation Check", done: true },
          { task: "BMS Cell Voltage Delta & Thermal Sensor Diagnostic", done: true },
          { task: "Motor Controller Current Output & Phase Testing", done: true },
          { task: "Software Calibration & Telemetry Firmware Update", done: false, active: true },
          { task: "Final Road Test & Digital Quality Certification", done: false },
        ],
      });
      toast.success("Live Job Card Found! Tracking status updated.");
    }, 700);
  };

  const handleFillDemo = () => {
    setBookingId("JOB-EV-98412");
    setPhoneNumber("9582390001");
    toast.info("Sample credentials loaded. Click Track to search.");
  };

  return (
    <main className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084]/30 selection:text-[#00D084] font-sans">
      <Nav theme="dark" onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Main Container matching Services & Ecosystem page architecture */}
      <div className="relative min-h-screen">

        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0)
           ========================================================================= */}
        <div className="page-hero fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background image with parallax zoom */}
          <div
            className="services-bg-img absolute inset-0 bg-cover bg-center opacity-75 pointer-events-none scale-105 transition-all duration-700"
            style={{
              backgroundImage: `url('${TRACK_HERO_BG}')`,
            }}
          />

          {/* Subtle blur & darkening layer for optimal text readability */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.2)_70%,transparent_100%)] pointer-events-none" />

          {/* Hero Content Container */}
          <div
            ref={heroTextRef}
            className="max-w-4xl mx-auto text-center relative z-10 px-6 space-y-5 pointer-events-auto"
          >
            <div className="hero-sub-reveal inline-flex items-center gap-2 rounded-full border border-[#00D084]/40 bg-[#00D084]/15 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] shadow-[0_0_20px_rgba(0,208,132,0.3)] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#00D084]" />
              <span>Live Digital Job Card &amp; Service Tracker</span>
            </div>

            <h1 className="hero-title-reveal text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Track Your Service <br className="hidden sm:block" />
              <span className="text-[#00D084]">In Real-Time</span>
            </h1>

            <p className="hero-sub-reveal text-sm sm:text-base md:text-lg text-[#c2d1c7] font-light max-w-2xl mx-auto leading-relaxed">
              Enter your Job Card ID or registered mobile phone number to inspect real-time technician progress, BMS diagnostic logs, and estimated completion time.
            </p>

            <div className="hero-btn-reveal pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#track-status"
                className="whitespace-nowrap inline-flex items-center shrink-0 gap-2 px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] cursor-pointer hover:scale-105"
              >
                <Search className="w-4 h-4 shrink-0" />
                <span>TRACK JOB CARD NOW</span>
              </a>
              <button
                onClick={() => setBookingModalOpen(true)}
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md"
              >
                Book New Service
              </button>
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
            {/* Breadcrumb */}
            <div className="pb-3 px-6 max-w-5xl mx-auto">
              <nav aria-label="breadcrumb" className="text-xs font-mono text-white/50 flex items-center gap-2">
                <Link to="/" className="hover:text-[#00D084] transition-colors">Home</Link>
                <span>›</span>
                <span className="text-[#00D084]">Track Service</span>
              </nav>
            </div>

            {/* S1: Search / Job Lookup Card (#track-status) */}
            <section id="track-status" className="pt-4 pb-12 px-6 max-w-3xl mx-auto">
              <div className="ai-diagnostic-simulator rounded-[32px] bg-[#07110B] border-2 border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#00D084] animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Live Telemetry &amp; Job Card Lookup
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="text-[11px] font-mono text-[#00D084] hover:underline cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <span>Sample: JOB-EV-98412</span>
                  </button>
                </div>

                <form onSubmit={handleTrackSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-white/70 block mb-1.5 font-bold">
                        Booking / Job Card ID
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. JOB-EV-98412"
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                        className="w-full bg-[#0f1712] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono uppercase text-white/70 block mb-1.5 font-bold">
                        Registered Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9582390001"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-[#0f1712] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full py-4 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.35)] cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    {isSearching ? (
                      <span>Searching Telemetry Logs...</span>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        <span>Track Live Progress</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </section>

            {/* S2: Main Status & Tracking Dashboard (When Active) */}
            {activeJob ? (
              <section className="py-6 pb-20 px-6 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">

                {/* Status Header Card */}
                <div className="rounded-[32px] bg-[#07110B] border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D084] block mb-1">
                        JOB CARD ID: {activeJob.jobCardId}
                      </span>
                      <h2 className="text-2xl font-extrabold text-white">{activeJob.vehicleLabel}</h2>
                      <p className="text-xs text-white/60 font-light mt-0.5">{activeJob.serviceCenter}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#00D084]/20 border border-[#00D084]/40 text-xs font-bold text-[#00D084] font-mono animate-pulse">
                        🟢 {activeJob.status}
                      </span>
                      <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#00D084]" /> ETA: {activeJob.eta}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white/70">Overall Completion:</span>
                      <span className="text-[#00D084] font-bold">{activeJob.progressPercent}%</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full bg-[#00D084] rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(0,208,132,0.8)]"
                        style={{ width: `${activeJob.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* SOP Technician Checklist Progress */}
                <div className="rounded-[32px] bg-[#07110B] border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-[#00D084]" /> Real-Time Technician Inspection Checklist
                  </h3>

                  <div className="space-y-3">
                    {activeJob.checklist.map((item: any, i: number) => (
                      <div
                        key={i}
                        className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                          item.done
                            ? "bg-black/40 border-emerald-500/30 text-white"
                            : item.active
                            ? "bg-[#00D084]/10 border-[#00D084]/50 text-white"
                            : "bg-white/[0.01] border-white/10 text-white/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.done ? (
                            <CheckCircle2 className="w-5 h-5 text-[#00D084] shrink-0" />
                          ) : item.active ? (
                            <div className="w-5 h-5 rounded-full border-2 border-[#00D084] border-t-transparent animate-spin shrink-0" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-white/20 shrink-0" />
                          )}
                          <span className="text-xs sm:text-sm font-medium">{item.task}</span>
                        </div>

                        <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                          {item.done ? "Completed" : item.active ? "In Progress" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assigned Technician Card */}
                <div className="rounded-[32px] bg-[#07110B] border border-white/15 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center text-[#00D084] font-bold text-xl shrink-0">
                      <UserCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#00D084] uppercase font-bold">Assigned Technician</span>
                      <h4 className="text-base font-bold text-white">{activeJob.technician}</h4>
                      <p className="text-xs text-white/60 font-light">4.9 ★ Rating • 340+ Certified Jobs Completed</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <a
                      href={`tel:${activeJob.technicianPhone}`}
                      className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,208,132,0.3)]"
                    >
                      <Phone className="w-4 h-4" /> Call Tech
                    </a>
                  </div>
                </div>

              </section>
            ) : (
              /* S3: Transparency & Guarantee Pillars (Shown before search) */
              <section className="py-8 pb-20 px-6 max-w-5xl mx-auto">
                <div className="text-center mb-10">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] block mb-2">
                    Autobot OS Digital Transparency
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    What You Can Inspect During Service
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Activity,
                      title: "BMS Cell Telemetry",
                      desc: "Live millivolt delta, battery pack temperatures, and internal resistance readings as tested on diagnostic benches.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "50-Point Standard SOP",
                      desc: "Step-by-step checklist validation from high-voltage isolation to road test, certified by L3 technicians.",
                    },
                    {
                      icon: BellRing,
                      title: "Instant WhatsApp Updates",
                      desc: "Automated status alerts sent directly to your phone when parts are fitted and when quality checks complete.",
                    },
                  ].map((feat) => {
                    const Icon = feat.icon;
                    return (
                      <div
                        key={feat.title}
                        className="ecosystem-hub-node p-6 rounded-2xl bg-[#080d0a] border border-white/10 flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-12 h-12 rounded-xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] mb-4">
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                          <p className="text-xs text-white/60 leading-relaxed font-light">{feat.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Closing CTA */}
            <section className="py-16 px-6 bg-[#0D5C2E] text-white">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Need Immediate EV Maintenance?
                </h2>
                <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
                  Book a doorstep service or visit one of our certified multi-brand EV technology hubs in Pune.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="px-8 py-4 rounded-full bg-white text-[#020403] font-black text-xs uppercase tracking-widest hover:bg-white/90 shadow-2xl transition-all cursor-pointer"
                  >
                    Book EV Service
                  </button>
                  <a
                    href="tel:+919582390001"
                    className="px-8 py-4 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
                  >
                    Call Helpline: +91 95823 90001
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      <Footer />
    </main>
  );
}
