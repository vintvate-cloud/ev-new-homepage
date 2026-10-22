import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  ShieldCheck,
  Building2,
  CalendarCheck,
  FileText,
  Phone,
  CheckCircle2,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  Wrench,
  Cpu,
  Layers,
  Sparkles,
  PhoneCall,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Download,
  MessageSquare,
  Truck,
  Car,
  Bike,
  Activity,
  AlertCircle,
  Send,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

export const Route = createFileRoute("/fleet")({
  head: () => ({
    meta: [
      { title: "EV Fleet Maintenance & AMC | MY EV SERVICE" },
      {
        name: "description",
        content:
          "EV fleet AMC for electric scooter, e-auto and cargo fleets: priority service, predictive battery audits and one dashboard per vehicle. Get a quote.",
      },
      { name: "keywords", content: "EV fleet maintenance India, EV fleet service, electric vehicle AMC, EV fleet management service, delivery EV maintenance" },
      { property: "og:title", content: "EV Fleet Maintenance That Protects Your Uptime | MY EV SERVICE" },
      { property: "og:description", content: "EV fleet AMC for electric scooter, e-auto and cargo fleets: priority service, predictive battery audits and one dashboard per vehicle." },
      { property: "og:image", content: "/assets/images/ev-fleet-maintenance.jpg" },
    ],
  }),
  component: FleetSolutionsPage,
});

export const FLEET_HERO_BG = "/ev-master-workshop-hero.png";

export const FLEET_NEEDS_OPTIONS = [
  "Scheduled AMC",
  "Free Fleet Health Audit",
  "Breakdown & Roadside",
  "Battery Diagnostics",
  "Depot Service Team",
  "Parts at Contract Rates",
];

export function FleetSolutionsPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formStep, setFormStep] = useState<"main" | "needs">("main");
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    mobile: "",
    city: "Pune",
    fleetSize: "10-25",
    needs: [] as string[],
    vehicleTypes: [] as string[],
    consent: false,
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

  const handleNeedToggle = (item: string) => {
    setForm((prev) => ({
      ...prev,
      needs: prev.needs.includes(item)
        ? prev.needs.filter((n) => n !== item)
        : [...prev.needs, item],
    }));
  };

  const handleVehicleToggle = (item: string) => {
    setForm((prev) => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.includes(item)
        ? prev.vehicleTypes.filter((v) => v !== item)
        : [...prev.vehicleTypes, item],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.name || !form.mobile) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!form.consent) {
      toast.error("Please agree to the DPDP Act processing consent to proceed.");
      return;
    }
    toast.success("Thank you! A fleet specialist will reply within one working day.");
    setForm({
      company: "",
      name: "",
      email: "",
      mobile: "",
      city: "Pune",
      fleetSize: "10-25",
      needs: [],
      vehicleTypes: [],
      consent: false,
    });
    setFormStep("main");
  };

  const scrollToForm = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById("enquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const FAQS = [
    {
      q: "What is the minimum fleet size for an AMC?",
      a: "10 vehicles. Smaller fleets can use the Fleet Maintenance Pack available through our standard service packages.",
    },
    {
      q: "Can you service a mixed-brand fleet?",
      a: "Yes. All major electric 2W and 3W brands (Ola, Ather, TVS, Bajaj, Hero, Euler, Piaggio, and others) are covered under one single unified SLA contract.",
    },
    {
      q: "Do you service vehicles at our depot?",
      a: "Yes, on Pro and Enterprise plans, dedicated mobile technician vans and depot teams service vehicles right at your hub during idle shift hours.",
    },
    {
      q: "How is pricing calculated?",
      a: "Per vehicle per month, based on vehicle type, daily kilometer usage, depot frequency, and the response SLA you choose.",
    },
    {
      q: "Can Autobot OS connect to our telematics or ERP?",
      a: "Yes. Enterprise plans include direct API and webhook integration with popular telematics, ERP and logistics rider applications.",
    },
    {
      q: "Do you provide GST invoices?",
      a: "Yes, you receive one consolidated monthly GST invoice and spend analysis report across all vehicles and service centers.",
    },
    {
      q: "Which cities do you cover?",
      a: "Pune and Pimpri-Chinchwad today, with rapid Tier-1 & Tier-2 expansion underway. Inquire with us about custom hub setups in your city.",
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
            className="services-bg-img absolute inset-0 bg-cover bg-center opacity-85 pointer-events-none scale-105 transition-all duration-700"
            style={{
              backgroundImage: `url('${FLEET_HERO_BG}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

          {/* Hero Content Container (Text & Form) */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center px-6 md:px-12 pt-4 sm:pt-6 lg:pt-0 z-10 pointer-events-auto transition-all overflow-y-auto lg:overflow-visible"
          >
            {/* Left Column: Title & Text */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              <span className="hero-sub-reveal text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] inline-block">
                • EV Fleet Maintenance &amp; AMC · Pune &amp; Maharashtra
              </span>
              <h1 className="hero-title-reveal text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-white leading-[1.08]">
                EV Fleet Maintenance Built for <br className="hidden sm:block" />
                <span className="text-[#00D084]">Uptime, Speed &amp; Scale</span>
              </h1>
              <p className="hero-sub-reveal text-xs sm:text-sm md:text-base text-[#c2d1c7] font-light max-w-xl leading-relaxed">
                Multi-brand electric 2W, 3W and cargo fleet maintenance powered by Autobot OS. Guaranteed SLAs, depot mobile service teams, predictive battery audits, and one monthly GST invoice.
              </p>
              <div className="hero-btn-reveal pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="whitespace-nowrap inline-flex items-center justify-center shrink-0 gap-2 px-7 py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] cursor-pointer hover:scale-105"
                >
                  <CalendarCheck className="w-4 h-4 shrink-0" />
                  <span>BOOK FREE FLEET AUDIT</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <a
                  href="#fleet-solutions"
                  className="px-6 py-3.5 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>EXPLORE AMC PLANS</span>
                </a>
              </div>
            </div>

            {/* Right Column: Premium Glass Form Card */}
            <div
              id="enquiry"
              className="hero-form lg:col-span-5 bg-[#030604]/95 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 relative border border-white/20 shadow-2xl overflow-hidden text-left min-h-[480px] flex flex-col justify-between"
            >
              <AnimatePresence mode="wait">
                {formStep === "main" ? (
                  <motion.div
                    key="step-main"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="relative z-10 w-full"
                  >
                    <div className="mb-3 text-left">
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                        Get a Fleet Proposal
                      </h3>
                      <p className="text-xs text-white/70 font-medium mt-1">
                        A fleet specialist replies within one working day.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2.5 text-left">
                      {/* Company Name */}
                      <div>
                        <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block mb-1">
                          COMPANY NAME *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Zepto, Zomato, Porter, Delivery Co."
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 focus:bg-black rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/15"
                        />
                      </div>

                      {/* Your Name & Mobile */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block mb-1">
                            YOUR NAME *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Full name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 focus:bg-black rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/15"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block mb-1">
                            MOBILE *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 95823 90001"
                            value={form.mobile}
                            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                            className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 focus:bg-black rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/15"
                          />
                        </div>
                      </div>

                      {/* Work Email & City */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block mb-1">
                            WORK EMAIL
                          </label>
                          <input
                            type="email"
                            placeholder="name@company.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 focus:bg-black rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/15"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block mb-1">
                            CITY
                          </label>
                          <select
                            value={form.city}
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                            className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 focus:bg-black rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all border border-white/15 cursor-pointer"
                          >
                            <option value="Pune" className="bg-[#040906] text-white">Pune</option>
                            <option value="PCMC" className="bg-[#040906] text-white">PCMC</option>
                            <option value="Mumbai" className="bg-[#040906] text-white">Mumbai</option>
                            <option value="Bengaluru" className="bg-[#040906] text-white">Bengaluru</option>
                            <option value="Delhi NCR" className="bg-[#040906] text-white">Delhi NCR</option>
                            <option value="Hyderabad" className="bg-[#040906] text-white">Hyderabad</option>
                          </select>
                        </div>
                      </div>

                      {/* Fleet Size Pill Buttons */}
                      <div>
                        <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block mb-1">
                          FLEET SIZE
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "10-25", label: "10-25" },
                            { id: "26-100", label: "26-100" },
                            { id: "100+", label: "100+" },
                          ].map((pill) => {
                            const isSelected = form.fleetSize === pill.id;
                            return (
                              <button
                                key={pill.id}
                                type="button"
                                onClick={() => setForm({ ...form, fleetSize: pill.id })}
                                className={`py-2 px-3 rounded-full text-xs font-bold transition-all text-center cursor-pointer border ${
                                  isSelected
                                    ? "bg-[#00D084] text-[#020403] border-[#00D084] font-black shadow-[0_0_15px_rgba(0,208,132,0.35)]"
                                    : "bg-[#0d1410] text-white/80 border-white/15 hover:border-white/35 hover:bg-[#131d17]"
                                }`}
                              >
                                {pill.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* WHAT DO YOU NEED? - Interactive Flow Trigger */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block">
                            WHAT DO YOU NEED?
                          </label>
                          {form.needs.length > 0 && (
                            <span className="text-[10px] text-[#00D084] font-bold">
                              {form.needs.length} selected
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => setFormStep("needs")}
                          className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 border border-white/15 hover:border-[#00D084]/60 rounded-xl px-3.5 py-2.5 text-xs text-left transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-1.5 overflow-hidden pr-2">
                            {form.needs.length === 0 ? (
                              <span className="text-white/40">
                                Click to select services (AMC, Battery, etc.)...
                              </span>
                            ) : (
                              <div className="flex flex-wrap gap-1 max-h-12 overflow-hidden">
                                {form.needs.map((item) => (
                                  <span
                                    key={item}
                                    className="bg-[#00D084]/15 border border-[#00D084]/30 text-[#00D084] text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-[#00D084] font-bold text-xs shrink-0 group-hover:translate-x-0.5 transition-transform">
                            <span>{form.needs.length === 0 ? "Select" : "Edit"}</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </button>
                      </div>

                      {/* DPDP Act Consent Checkbox */}
                      <div className="pt-0.5">
                        <label className="flex items-start gap-2 cursor-pointer text-[10px] sm:text-[10.5px] text-white/75 select-none leading-tight">
                          <input
                            type="checkbox"
                            checked={form.consent}
                            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                            className="mt-0.5 accent-[#00D084] rounded"
                          />
                          <span>
                            I agree to the processing of contact information under the DPDP Act for receiving fleet service estimates.
                          </span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-1 shadow-[0_0_25px_rgba(0,208,132,0.4)]"
                      >
                        <span>REQUEST FLEET PROPOSAL</span>
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step-needs"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="relative z-10 flex flex-col justify-between w-full h-full min-h-[440px]"
                  >
                    <div>
                      {/* Back Navigation Bar */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
                        <button
                          type="button"
                          onClick={() => setFormStep("main")}
                          className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors cursor-pointer py-1 px-2 -ml-2 rounded-lg hover:bg-white/5"
                        >
                          <ChevronLeft className="w-4 h-4 text-[#00D084]" />
                          <span>Back to Form</span>
                        </button>
                        <span className="text-[10.5px] font-mono text-[#00D084] uppercase tracking-wider font-bold">
                          {form.needs.length} Selected
                        </span>
                      </div>

                      <div className="text-left mb-3">
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          What do you need?
                        </h3>
                        <p className="text-xs text-white/70 font-medium mt-0.5">
                          Select the services applicable to your fleet operations.
                        </p>
                      </div>

                      {/* 6 options from Image 1 in 2-column layout */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                        {FLEET_NEEDS_OPTIONS.map((item) => {
                          const isSelected = form.needs.includes(item);
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => handleNeedToggle(item)}
                              className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#00D084]/15 border-[#00D084] text-white shadow-[0_0_15px_rgba(0,208,132,0.2)]"
                                  : "bg-[#0a0f0d]/90 border-white/15 text-white/80 hover:border-white/35 hover:bg-[#121a15]"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                                  isSelected
                                    ? "bg-[#00D084] border-[#00D084] text-black"
                                    : "border-white/30 bg-transparent"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className="text-xs font-semibold leading-tight">
                                {item}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Next / Return Button */}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setFormStep("main")}
                        className="w-full py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,208,132,0.4)]"
                      >
                        <span>Next • Back to Proposal</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                <span className="text-[#00D084]">Fleet Solutions</span>
              </nav>
            </div>

            {/* S1: Dedicated B2B Header Bar */}
            <section className="bg-[#080d0a]/90 border-y border-white/10 py-3 px-6 sticky top-20 z-30 backdrop-blur-md">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="font-black text-white uppercase tracking-wider">MY EV SERVICE</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] font-bold text-[10px] uppercase">
                    FOR BUSINESS
                  </span>
                  <div className="hidden md:flex items-center gap-4 text-white/60 pl-4 border-l border-white/10">
                    <a href="#services" className="hover:text-white transition-colors">Fleet Solutions</a>
                    <Link to="/oem" className="hover:text-white transition-colors">OEM Solutions</Link>
                    <a href="#autobot-os" className="hover:text-white transition-colors">Autobot OS</a>
                    <a href="#plans" className="hover:text-white transition-colors">AMC Plans</a>
                    <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="tel:+919582390001" className="text-white/80 hover:text-[#00D084] flex items-center gap-1.5 transition-colors">
                    <PhoneCall className="w-3.5 h-3.5 text-[#00D084]" />
                    <span>+91 95823 90001</span>
                  </a>
                  <a
                    href="#enquiry"
                    className="px-3.5 py-1.5 rounded-full bg-[#00D084] text-[#020403] font-bold text-[11px] uppercase tracking-wider hover:bg-[#00e08f] transition-all"
                  >
                    Get a Fleet Proposal
                  </a>
                </div>
              </div>
            </section>

            {/* S2: Top Overview & Proposal Form Section */}
            <section id="fleet-solutions" className="relative px-6 py-12 md:py-16 overflow-hidden">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
                
                {/* Left Column: 4 Key Metric Highlight Tiles */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all shadow-lg">
                      <div className="w-8 h-8 rounded-xl bg-[#00D084]/20 text-[#00D084] flex items-center justify-center font-bold text-xs mb-3">01</div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#00D084] block mb-1 font-bold">Multi-Brand SLA</span>
                      <span className="text-sm font-semibold text-white block leading-snug">E-2W, e-autos &amp; cargo 3W managed on one single unified contract</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all shadow-lg">
                      <div className="w-8 h-8 rounded-xl bg-[#00D084]/20 text-[#00D084] flex items-center justify-center font-bold text-xs mb-3">02</div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#00D084] block mb-1 font-bold">Predictive Care</span>
                      <span className="text-sm font-semibold text-white block leading-snug">Monthly CAN-bus battery health audit &amp; cell balancing on every vehicle</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all shadow-lg">
                      <div className="w-8 h-8 rounded-xl bg-[#00D084]/20 text-[#00D084] flex items-center justify-center font-bold text-xs mb-3">03</div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#00D084] block mb-1 font-bold">Where You Are</span>
                      <span className="text-sm font-semibold text-white block leading-snug">Priority bays, depot shift visits and rapid doorstep mobile service teams</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all shadow-lg">
                      <div className="w-8 h-8 rounded-xl bg-[#00D084]/20 text-[#00D084] flex items-center justify-center font-bold text-xs mb-3">04</div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#00D084] block mb-1 font-bold">100% Visibility</span>
                      <span className="text-sm font-semibold text-white block leading-snug">One live fleet dashboard and one consolidated monthly GST invoice</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0D5C2E]/20 to-[#07110B] border border-[#00D084]/30 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-white">Need an immediate SLA audit?</h4>
                      <p className="text-xs text-white/60">Direct helpline for logistics and fleet dispatch managers</p>
                    </div>
                    <a
                      href="tel:+919582390001"
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-[#00D084] flex items-center gap-2 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" /> +91 95823 90001
                    </a>
                  </div>
                </div>

                {/* Right Column: Hero Inquiry Form (FLEET-008) */}
                <div id="enquiry" className="lg:col-span-5 bg-[#0a0f0c] border-2 border-white/15 rounded-[28px] p-6 sm:p-8 shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#F5A623] rounded-t-[26px]" />
            <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Get a Fleet Proposal</h2>
            <p className="text-xs text-white/60 mb-6 font-light">A fleet specialist replies within one working day.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zepto, Zomato, Porter, Delivery Co."
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 95823 90001"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Work Email</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">City</label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-[#121914] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  >
                    <option value="Pune">Pune</option>
                    <option value="Pimpri-Chinchwad">Pimpri-Chinchwad</option>
                    <option value="Other">Other (Expanding Soon)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/70 block mb-1.5">Fleet Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {["10-25", "26-100", "100+"].map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setForm({ ...form, fleetSize: size })}
                      className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                        form.fleetSize === size
                          ? "bg-[#00D084] text-black border-[#00D084]"
                          : "bg-white/5 text-white/70 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/70 block mb-1.5">What do you need?</label>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {[
                    "Scheduled AMC",
                    "Free Fleet Health Audit",
                    "Breakdown & Roadside",
                    "Battery Diagnostics",
                    "Depot Service Team",
                    "Parts at Contract Rates",
                  ].map((item) => (
                    <label
                      key={item}
                      onClick={() => handleNeedToggle(item)}
                      className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer select-none transition-all ${
                        form.needs.includes(item)
                          ? "bg-[#00D084]/15 border-[#00D084] text-white"
                          : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.needs.includes(item)}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${
                        form.needs.includes(item) ? "bg-[#00D084] border-[#00D084] text-black" : "border-white/30"
                      }`}>
                        {form.needs.includes(item) && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="leading-tight">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-[11px] text-white/60 leading-tight cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-0.5 rounded border-white/30 bg-white/5 text-[#00D084] focus:ring-0"
                  />
                  <span>
                    I agree to the processing of contact information under the DPDP Act for receiving fleet service estimates.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#00D084] text-black font-black text-xs uppercase tracking-widest hover:bg-[#00e08f] shadow-[0_0_20px_rgba(0,208,132,0.3)] transition-all cursor-pointer mt-2"
              >
                Request Fleet Proposal
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* S3: Built For (Segment Chips Band) */}
      <section className="py-6 border-y border-white/10 bg-[#060a08]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="text-[11px] font-mono text-[#00D084] uppercase tracking-wider font-bold">Built For:</span>
          {[
            "Quick-Commerce & Food Delivery",
            "E-Commerce Last Mile",
            "E-Auto Operators",
            "Cargo 3W Fleets",
            "EV Rental & Subscription",
            "Corporate & Campus Mobility",
          ].map((seg) => (
            <span key={seg} className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 font-medium">
              {seg}
            </span>
          ))}
        </div>
      </section>

      {/* S4: Problem vs Solution Table */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            The Problem We Solve
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Where EV fleets lose money, and how we fix it
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            For a fleet, downtime costs more than the repair. Every idle vehicle is a day of lost trips, and most of it comes from problems that are predictable.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#080d0a]">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-white/5 border-b border-white/10 text-white/50 font-mono uppercase text-[11px]">
              <tr>
                <th className="p-4 w-1/4">Problem</th>
                <th className="p-4 w-1/3">What It Costs You</th>
                <th className="p-4 w-5/12 bg-[#0D5C2E]/20 text-[#00D084]">The MY EV SERVICE Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              <tr>
                <td className="p-4 font-bold text-white">Unplanned breakdowns</td>
                <td className="p-4 text-white/60">Vehicles off the road mid-shift; riders lose earnings and you lose orders.</td>
                <td className="p-4 bg-[#0D5C2E]/10 text-[#00D084] font-medium">Scheduled preventive service plus priority breakdown response inside service zones.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Silent battery fade</td>
                <td className="p-4 text-white/60">Shorter range, fewer trips per charge, early pack replacement.</td>
                <td className="p-4 bg-[#0D5C2E]/10 text-[#00D084] font-medium">Monthly cell-level battery audit, cell balancing and state-of-health tracking per vehicle.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Brand-locked service</td>
                <td className="p-4 text-white/60">Mixed fleets need several service centres, each with its own queue.</td>
                <td className="p-4 bg-[#0D5C2E]/10 text-[#00D084] font-medium">One multi-brand network for every 2W and 3W in your fleet.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">No service data</td>
                <td className="p-4 text-white/60">Paper job cards; no view of cost per vehicle or repeat faults.</td>
                <td className="p-4 bg-[#0D5C2E]/10 text-[#00D084] font-medium">Digital job cards and a live fleet dashboard in Autobot OS.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Slow parts</td>
                <td className="p-4 text-white/60">Vehicles wait days for a controller, charger or tyre.</td>
                <td className="p-4 bg-[#0D5C2E]/10 text-[#00D084] font-medium">Parts stocked through EV Spare Hub at contract rates.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Invoice chaos</td>
                <td className="p-4 text-white/60">Dozens of small bills to reconcile every month.</td>
                <td className="p-4 bg-[#0D5C2E]/10 text-[#00D084] font-medium">One consolidated GST invoice and spend report each month.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* S5: Fleet Solutions Grid */}
      <section id="services" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            Fleet Solutions
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Everything an EV fleet needs, from one EV specialist
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            Pick the services you need, or bundle them into one annual maintenance contract.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Preventive maintenance AMC",
              desc: "Scheduled servicing to a fixed EV checklist: brakes, tyres, suspension, connectors, firmware.",
              icon: Wrench,
            },
            {
              step: "02",
              title: "Predictive battery health",
              desc: "Monthly cell-level scans, balancing and SoH trends that flag weak packs before they fail.",
              icon: Activity,
            },
            {
              step: "03",
              title: "Breakdown & roadside response",
              desc: "Priority dispatch for fleet vehicles, with towing to the nearest hub when needed.",
              icon: Truck,
            },
            {
              step: "04",
              title: "Depot and doorstep service",
              desc: "Technician teams at your depot or rider hubs, so vehicles are serviced between shifts.",
              icon: Building2,
            },
            {
              step: "05",
              title: "Motor, controller & charger repair",
              desc: "EV-grade diagnostics and repair for powertrain and charging faults, across brands.",
              icon: Zap,
            },
            {
              step: "06",
              title: "Parts at contract rates",
              desc: "Batteries, chargers, controllers, tyres and brake parts supplied through EV Spare Hub.",
              icon: Cpu,
            },
            {
              step: "07",
              title: "Battery lifecycle management",
              desc: "Repair, refurbishment and replacement planning, with certified end-of-life handling.",
              icon: Layers,
            },
            {
              step: "08",
              title: "Rider care training",
              desc: "Short practical sessions for riders on charging habits and daily checks that cut avoidable faults.",
              icon: ShieldCheck,
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.step}
                className="p-6 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#00D084]">{card.step}</span>
                    <Icon className="w-5 h-5 text-white/40 group-hover:text-[#00D084] transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{card.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* S6: Autobot OS for Fleets */}
      <section id="autobot-os" className="py-20 px-6 bg-[#040805] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
              Technology // Autobot OS
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              One AI-powered operating system runs every fleet job
            </h2>
            <p className="text-sm text-white/60 mt-3 font-light">
              Autobot OS automates the work that usually breaks fleet maintenance: scheduling, dispatch, job cards, parts and billing. AI flags problems early. Certified technicians verify every repair.
            </p>
          </div>

          {/* 6-Step Automation Flow */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
            {[
              { num: "01", title: "Detect", desc: "AI reads battery & fault data, flags risk." },
              { num: "02", title: "Schedule", desc: "Slots booked around shift downtime." },
              { num: "03", title: "Dispatch", desc: "Nearest tech & parts routed to job." },
              { num: "04", title: "Repair", desc: "Guided digital job card with photo logs." },
              { num: "05", title: "Verify", desc: "Post-repair test & sign-off before handover." },
              { num: "06", title: "Report", desc: "Dashboard, invoice & insights update live." },
            ].map((step) => (
              <div key={step.num} className="p-4 rounded-2xl bg-[#080d0a] border border-white/10">
                <span className="text-[10px] font-mono text-[#00D084] font-bold block mb-1">{step.num}</span>
                <span className="text-sm font-bold text-white block mb-1">{step.title}</span>
                <span className="text-[11px] text-white/60 block leading-tight">{step.desc}</span>
              </div>
            ))}
          </div>

          {/* 6 Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: "AI Diagnostics",
                title: "Fault prediction",
                desc: "Battery and motor anomalies ranked by risk, per vehicle.",
              },
              {
                tag: "Auto-scheduling",
                title: "Zero missed services",
                desc: "Service due-dates tracked by km and calendar, booked automatically.",
              },
              {
                tag: "Dispatch",
                title: "Live technician routing",
                desc: "Jobs assigned by location, skill and parts availability.",
              },
              {
                tag: "Inventory",
                title: "QR-tracked parts",
                desc: "Every part scanned from warehouse to vehicle. Zero leakage.",
              },
              {
                tag: "SLA Monitor",
                title: "Escalation built in",
                desc: "Open jobs tracked against your SLA, with automatic escalation.",
              },
              {
                tag: "API & Webhooks",
                title: "Plugs into your stack",
                desc: "Connects with telematics, ERP and rider apps. Exports for finance.",
              },
            ].map((mod) => (
              <div key={mod.title} className="p-6 rounded-2xl bg-[#080d0a] border border-white/10">
                <span className="text-[10px] font-mono text-[#00D084] uppercase tracking-wider font-bold block mb-2">{mod.tag}</span>
                <h3 className="text-base font-bold text-white mb-2">{mod.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S7: Fleet AMC Plans Table */}
      <section id="plans" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            Fleet AMC Plans
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Predictable cost per vehicle, per month
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            Three plans, priced per vehicle per month. Every plan is tailored after a free fleet audit.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#080d0a]">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-white/5 border-b border-white/10 text-white/50 font-mono uppercase text-[11px]">
              <tr>
                <th className="p-4 w-1/4">Feature</th>
                <th className="p-4 text-center">Fleet Essential (10–25)</th>
                <th className="p-4 text-center bg-[#0D5C2E]/20 text-[#00D084]">Fleet Pro (26–100)</th>
                <th className="p-4 text-center">Fleet Enterprise (100+)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              <tr>
                <td className="p-4 font-bold text-white">Monthly preventive service</td>
                <td className="p-4 text-center text-[#00D084]">✓</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">✓</td>
                <td className="p-4 text-center text-[#00D084]">✓</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Battery health audit</td>
                <td className="p-4 text-center text-white/60">Quarterly</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">Monthly</td>
                <td className="p-4 text-center text-white font-semibold">Monthly + Live Alerts</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Priority service bay</td>
                <td className="p-4 text-center text-white/30">—</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">✓</td>
                <td className="p-4 text-center text-[#00D084]">✓</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Breakdown response</td>
                <td className="p-4 text-center text-white/60">Standard</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">Priority</td>
                <td className="p-4 text-center text-white font-semibold">Custom SLA</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Depot service team</td>
                <td className="p-4 text-center text-white/30">—</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-white/80">On Request</td>
                <td className="p-4 text-center text-[#00D084] font-bold">✓ Dedicated</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Dedicated account manager</td>
                <td className="p-4 text-center text-white/30">—</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">✓</td>
                <td className="p-4 text-center text-[#00D084]">✓</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Fleet dashboard</td>
                <td className="p-4 text-center text-[#00D084]">✓</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">✓</td>
                <td className="p-4 text-center text-[#00D084]">✓ + API Integration</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Parts at contract rates</td>
                <td className="p-4 text-center text-[#00D084]">✓</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">✓</td>
                <td className="p-4 text-center text-[#00D084]">✓</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Monthly business review</td>
                <td className="p-4 text-center text-white/30">—</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-white/80">Quarterly</td>
                <td className="p-4 text-center text-white font-semibold">Monthly</td>
              </tr>
              <tr className="bg-white/5 font-mono">
                <td className="p-4 font-bold text-white">Pricing</td>
                <td className="p-4 text-center text-white">Custom per vehicle</td>
                <td className="p-4 text-center bg-[#0D5C2E]/20 text-[#00D084] font-bold">Recommended for scale</td>
                <td className="p-4 text-center text-white">Custom SLA &amp; Volume</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* S14: FAQ Accordion */}
      <section id="faqs" className="py-20 px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white tracking-tight">EV Fleet Maintenance FAQs</h2>
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

      {/* S15: Closing CTA Band */}
      <section className="py-16 px-6 bg-[#0D5C2E] text-white">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/80 font-bold block">
            FREE FOR FLEETS OF 10+
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Get your free fleet health audit
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            We scan a sample of your vehicles and share the complete battery and condition report. Zero commitment required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#enquiry"
              className="px-8 py-4 rounded-full bg-white text-[#020403] font-black text-xs uppercase tracking-widest hover:bg-white/90 shadow-2xl transition-all"
            >
              Book a Free Fleet Audit
            </a>
            <a
              href="tel:+919582390001"
              className="px-8 py-4 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call +91 95823 90001
            </a>
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
