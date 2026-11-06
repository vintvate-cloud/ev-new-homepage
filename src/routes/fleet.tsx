import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import { FleetVehicleMarquee } from "../components/fleet/FleetVehicleMarquee";
import { FleetVisualShowcase } from "../components/fleet/FleetVisualShowcase";
import { FleetRoiCalculator } from "../components/fleet/FleetRoiCalculator";
import {
  X,
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

export interface DetailedFleetPlan {
  type: string;
  name: string;
  subtitle: string;
  badge?: string;
  investment: string;
  originalInvestment?: string;
  foundingOffer?: string;
  area: string;
  bays: string;
  vehicles: string;
  includes: string[];
  osSavings: string;
  bestFor: string;
  popular?: boolean;
}

export const DETAILED_FLEET_PLANS: DetailedFleetPlan[] = [
  {
    type: "essential",
    name: "Fleet Essential",
    subtitle: "Starter • Entry-level EV fleet care",
    investment: "Custom / Veh",
    originalInvestment: "₹1,299 / Veh + GST",
    foundingOffer: "Free 32-Pt Onboarding Health Audit",
    area: "10–25 Vehicles",
    bays: "Monthly Cycle",
    vehicles: "EV 2-Wheelers",
    includes: [
      "Monthly scheduled multi-point preventive service",
      "Quarterly CAN-bus battery health and cell balancing audit",
      "Standard roadside breakdown response and flatbed towing",
      "Autobot OS live fleet telemetry and fault dashboard access",
      "OEM-certified genuine spare components at contract rates",
      "Digital job cards with high-res photo proof and technician logs",
      "Dedicated service scheduling window during non-peak hours",
      "Consolidated single monthly GST invoicing and MIS reports",
    ],
    osSavings: "₹28,500/mo saved in avoided downtime",
    bestFor: "Growing delivery fleets, quick-commerce dark stores, courier & local logistics hubs (10–25 vehicles)",
  },
  {
    type: "pro",
    name: "Fleet Pro",
    subtitle: "Popular • Full-service fleet maintenance",
    badge: "MOST POPULAR",
    investment: "Custom / Veh",
    originalInvestment: "₹1,899 / Veh + GST",
    foundingOffer: "Save up to 35% on breakdown costs",
    area: "26–100 Vehicles",
    bays: "Bi-Weekly / Monthly",
    vehicles: "EV 2W + 3W Cargo",
    includes: [
      "Scheduled bi-weekly / monthly preventive maintenance",
      "Monthly CAN-bus battery health and cell balancing audit",
      "Priority service bay reservation across all network hubs",
      "Sub-45 min emergency priority roadside breakdown response",
      "Mobile depot service vans dispatched on request for inter-shift jobs",
      "Dedicated enterprise fleet account manager and senior engineer",
      "Autobot OS telemetry integration and automated failure prediction alerts",
      "Wholesale genuine parts buffer with 2-hour intra-city dispatch",
      "Quarterly executive fleet reliability & uptime SLA reviews",
    ],
    osSavings: "₹72,000/mo saved in avoided downtime",
    bestFor: "Mid-to-large cargo fleets, e-commerce distribution networks & commercial 2W/3W operations (26–100 vehicles)",
    popular: true,
  },
  {
    type: "enterprise",
    name: "Fleet Enterprise",
    subtitle: "Premium • Regional depot & custom SLAs",
    badge: "REGIONAL ANCHOR",
    investment: "Custom SLA",
    originalInvestment: "Custom Enterprise Quote",
    foundingOffer: "Contractual 99.6% Uptime Guarantee",
    area: "100+ Vehicles",
    bays: "On-Site Depot Team",
    vehicles: "Full Commercial Fleet",
    includes: [
      "Dedicated on-site depot technician team stationed at your hub",
      "Inter-shift rapid servicing window (<35 mins turn-around per vehicle)",
      "Contractually guaranteed 99.6% fleet uptime SLA with penalty clauses",
      "Continuous live CAN-bus telemetry streaming and critical thermal alerts",
      "Sub-30 min priority mobile rescue and towing SLA guarantee",
      "Direct ERP, DMS, and transport management system API sync",
      "On-site critical spare parts consignment buffer maintained by Autobot",
      "Monthly strategic executive reviews and battery degradation analytics",
      "Dedicated master technicians certified by Autobot Academy",
    ],
    osSavings: "₹1,60,000/mo saved in avoided downtime",
    bestFor: "Large commercial fleets, 3PL logistics giants, corporate delivery operators & leasing companies (100+ vehicles)",
  },
];

export function FleetSolutionsPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [detailsModalPlan, setDetailsModalPlan] = useState<DetailedFleetPlan | null>(null);

  const handleSelectPlan = (plan: DetailedFleetPlan) => {
    let size: "10-25" | "26-100" | "100+" = "10-25";
    if (plan.type === "pro") size = "26-100";
    if (plan.type === "enterprise") size = "100+";
    setForm((prev) => ({
      ...prev,
      fleetSize: size,
      needs: prev.needs.includes(plan.name) ? prev.needs : [...prev.needs, plan.name],
    }));
    setDetailsModalPlan(null);
    scrollToForm();
    toast.success(`Selected ${plan.name}! Please complete the audit request form.`);
  };
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

      const mm = gsap.matchMedia();

      // Desktop only: hero parallax & rising card overlay (mobile uses smooth natural page flow)
      mm.add("(min-width: 1024px)", () => {
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

      // Scroll animations are powered smoothly via Framer Motion whileInView across all sections
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [openFaq]);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
    const el = document.getElementById("enquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
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
            1. HERO SECTION (NATURAL PAGE FLOW ON MOBILE, FIXED IN BACKGROUND ON DESKTOP)
           ========================================================================= */}
        <div className="page-hero relative lg:fixed lg:top-20 lg:left-0 lg:right-0 lg:h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center pt-28 sm:pt-32 lg:pt-0 pb-12 sm:pb-16 lg:pb-0">
          {/* Background image with parallax zoom */}
          <div
            className="services-bg-img absolute inset-0 bg-cover bg-center opacity-85 pointer-events-none scale-105 transition-all duration-700"
            style={{
              backgroundImage: `url('${FLEET_HERO_BG}')`,
            }}
          />
          {/* Subtle blur & darkening layer for optimal text readability */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

          {/* Hero Content Container (Non-scrollable, responsive flow on mobile) */}
          <div
            ref={heroTextRef}
            className="relative lg:absolute lg:inset-0 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center px-4 sm:px-6 md:px-12 z-10 pointer-events-auto transition-all"
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
              className="hero-form lg:col-span-5 bg-[#030604]/95 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 relative border border-white/20 shadow-2xl overflow-hidden text-left min-h-0 lg:min-h-[480px] flex flex-col justify-between w-full max-w-md mx-auto lg:max-w-none"
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
                    <div className="mb-2 sm:mb-3 text-left">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight drop-shadow-md">
                        Get a Fleet Proposal
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/70 font-medium mt-0.5 sm:mt-1">
                        A fleet specialist replies within one working day.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2.5 text-left">
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
                          className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 focus:bg-black rounded-xl px-3 py-1.5 sm:py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/15"
                        />
                      </div>

                      {/* Your Name & Mobile */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                        <div>
                          <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block mb-1 truncate">
                            YOUR NAME *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Full name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 focus:bg-black rounded-xl px-3 py-1.5 sm:py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/15"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block mb-1 truncate">
                            MOBILE *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 95823 90001"
                            value={form.mobile}
                            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                            className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 focus:bg-black rounded-xl px-3 py-1.5 sm:py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/15"
                          />
                        </div>
                      </div>

                      {/* Work Email & City */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                        <div>
                          <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block mb-1 truncate">
                            WORK EMAIL
                          </label>
                          <input
                            type="email"
                            placeholder="name@company.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 focus:bg-black rounded-xl px-3 py-1.5 sm:py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/15"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block mb-1 truncate">
                            CITY
                          </label>
                          <select
                            value={form.city}
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                            className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 focus:bg-black rounded-xl px-3 py-1.5 sm:py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all border border-white/15 cursor-pointer"
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
                        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
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
                                className={`fleet-size-pill py-1.5 sm:py-2 px-2 sm:px-3 rounded-full text-[11px] sm:text-xs font-bold transition-all text-center cursor-pointer border truncate min-w-0 ${
                                  isSelected
                                    ? "is-selected bg-[#00D084] text-[#020403] border-[#00D084] font-black shadow-[0_0_15px_rgba(0,208,132,0.35)]"
                                    : "bg-[#0d1410] text-white border-white/20 hover:border-white/40 hover:bg-[#131d17]"
                                }`}
                                style={
                                  isSelected
                                    ? {
                                        backgroundColor: "#00D084",
                                        color: "#020403",
                                        borderColor: "#00D084",
                                      }
                                    : {
                                        backgroundColor: "rgba(13, 20, 16, 0.95)",
                                        color: "#ffffff",
                                        borderColor: "rgba(255, 255, 255, 0.22)",
                                      }
                                }
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
                          className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 border border-white/15 hover:border-[#00D084]/60 rounded-xl px-3 py-2 sm:py-2.5 text-xs text-left transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-1.5 overflow-hidden pr-2">
                            {form.needs.length === 0 ? (
                              <span className="text-white/40 text-xs">
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
                            className="mt-0.5 accent-[#00D084] rounded shrink-0"
                          />
                          <span>
                            I agree to the processing of contact information under the DPDP Act for receiving fleet service estimates.
                          </span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-3 sm:py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider sm:tracking-widest hover:bg-[#00e08f] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-1 shadow-[0_0_25px_rgba(0,208,132,0.4)]"
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
            2. CARDS OVERLAY CONTAINER (SLIDES UP DIRECTLY ON TOP OF THE FIXED HERO ON DESKTOP)
           ========================================================================= */}
        <div
          ref={contentOverlayRef}
          className="relative z-10 min-h-screen mt-0 lg:mt-[calc(100vh-80px)] pt-6 rounded-t-[32px] sm:rounded-t-[40px] border-t border-white/10 shadow-2xl bg-[#020403]"
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
            <motion.section
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#080d0a]/90 border-y border-white/10 py-3 px-6 sticky top-20 z-30 backdrop-blur-md"
            >
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
            </motion.section>

            {/* S2: Top Overview / Key Highlights */}
            <motion.section
              id="fleet-solutions"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="fleet-overview-trigger relative px-6 py-12 md:py-16 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto space-y-6 relative z-10">
                {/* Live Operations Telemetry Status Strip */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.55 }}
                  className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#08120b] border border-[#00D084]/25 shadow-lg font-mono text-[11px]"
                >
                  <div className="flex items-center gap-2 text-white/90">
                    <span className="w-2 h-2 rounded-full bg-[#00D084] animate-ping" />
                    <span className="font-bold text-[#00D084]">FLEET STATUS: ACTIVE</span>
                    <span className="text-white/40 hidden sm:inline">• 1,420+ Commercial Assets Monitored</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <span className="text-white/70">
                      Uptime SLA: <strong className="text-[#00D084]">99.4%</strong>
                    </span>
                    <span className="text-white/70">
                      First Response: <strong className="text-[#F5A623]">&lt; 45 Mins</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[#00D084] text-[10px] font-bold">
                      BMS AUTO-BALANCED
                    </span>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { num: "01", tag: "Multi-Brand SLA", desc: "E-2W, e-autos & cargo 3W managed on one single unified contract" },
                    { num: "02", tag: "Predictive Care", desc: "Monthly CAN-bus battery health audit & cell balancing on every vehicle" },
                    { num: "03", tag: "Where You Are", desc: "Priority bays, depot shift visits and rapid doorstep mobile service teams" },
                    { num: "04", tag: "100% Visibility", desc: "One live fleet dashboard and one consolidated monthly GST invoice" }
                  ].map((card, idx) => (
                    <motion.div
                      key={card.num}
                      initial={{ opacity: 0, y: 30, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="fleet-metric-card p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all shadow-lg"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#00D084]/20 text-[#00D084] flex items-center justify-center font-bold text-xs mb-3">{card.num}</div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#00D084] block mb-1 font-bold">{card.tag}</span>
                      <span className="text-sm font-semibold text-white block leading-snug">{card.desc}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="fleet-helpline-card p-5 rounded-2xl bg-gradient-to-r from-[#0D5C2E]/20 to-[#07110B] border border-[#00D084]/30 flex flex-wrap items-center justify-between gap-4"
                >
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
                </motion.div>
              </div>
            </motion.section>

      {/* S3: Commercial Fleet Marquee & Segment Capabilities */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.65 }}
        className="fleet-chips-trigger"
      >
        <FleetVehicleMarquee />
        <div className="py-4 border-b border-white/10 bg-[#060a08]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <span className="text-[11px] font-mono text-[#00D084] uppercase tracking-wider font-bold">
              Built For:
            </span>
            {[
              "Quick-Commerce & Food Delivery",
              "E-Commerce Last Mile",
              "E-Auto Operators",
              "Cargo 3W Fleets",
              "EV Rental & Subscription",
              "Corporate & Campus Mobility",
            ].map((seg, idx) => (
              <motion.span
                key={seg}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="fleet-chip-item px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 font-medium text-[11px] hover:border-[#00D084]/40 hover:text-white transition-colors"
              >
                {seg}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* S4: Problem vs Solution Visual Command Center */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.12 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fleet-problem-trigger py-20 px-6 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="fleet-problem-header text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            The Problem We Solve
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Where EV fleets lose money, and how we fix it
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            For a fleet, downtime costs more than the repair. Every idle vehicle is a day of lost trips, and most of it comes from problems that are predictable.
          </p>
        </motion.div>

        {/* Visual Split: Workshop Fleet Operations & Exact Problem Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Operational Showcase Card */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-3xl overflow-hidden bg-[#07110b] border border-white/15 relative min-h-[460px] flex flex-col justify-between p-6 sm:p-8 shadow-2xl"
          >
            <img
              src="/hero/doorstep_repairs.png"
              alt="EV Fleet Mobile Service Unit"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45] contrast-[1.1] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040805] via-[#040805]/50 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#00D084]/40 text-[10px] font-mono font-bold text-[#00D084] uppercase tracking-wider">
                ● DEPOT MOBILE SERVICE VAN
              </span>
              <span className="text-xs font-mono text-white/60 bg-black/60 px-2.5 py-0.5 rounded-lg border border-white/10">
                ACTIVE SHIFT BUFFER
              </span>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-[#00D084] font-bold uppercase block">
                  Zero Delivery Interruptions
                </span>
                <p className="text-xs text-white/80 leading-relaxed font-light">
                  Our certified mobile vans service delivery scooters and cargo autos between shifts directly at your dark stores and charging hubs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                  <span className="text-xl font-black text-white font-mono block">&lt; 45 Mins</span>
                  <span className="text-[10px] text-white/50 uppercase font-mono">Mean Response SLA</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                  <span className="text-xl font-black text-[#00D084] font-mono block">99.4%</span>
                  <span className="text-[10px] text-white/50 uppercase font-mono">Guaranteed Uptime</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 6 Exact Problem vs Solution Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                problem: "Unplanned breakdowns",
                cost: "Vehicles off the road mid-shift; riders lose earnings and you lose orders.",
                fix: "Scheduled preventive service plus priority breakdown response inside service zones.",
                badge: "Uptime SLA",
              },
              {
                problem: "Silent battery fade",
                cost: "Shorter range, fewer trips per charge, early pack replacement.",
                fix: "Monthly cell-level battery audit, cell balancing and state-of-health tracking per vehicle.",
                badge: "Battery Health",
              },
              {
                problem: "Brand-locked service",
                cost: "Mixed fleets need several service centres, each with its own queue.",
                fix: "One multi-brand network for every 2W and 3W in your fleet.",
                badge: "Multi-Brand",
              },
              {
                problem: "No service data",
                cost: "Paper job cards; no view of cost per vehicle or repeat faults.",
                fix: "Digital job cards and a live fleet dashboard in Autobot OS.",
                badge: "Digital Records",
              },
              {
                problem: "Slow parts",
                cost: "Vehicles wait days for a controller, charger or tyre.",
                fix: "Parts stocked through EV Spare Hub at contract rates.",
                badge: "Contract Rates",
              },
              {
                problem: "Invoice chaos",
                cost: "Dozens of small bills to reconcile every month.",
                fix: "One consolidated GST invoice and spend report each month.",
                badge: "Single GST Bill",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all flex flex-col justify-between group shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-white/40 uppercase font-bold">Problem 0{idx + 1}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[#00D084] font-mono text-[9px] font-bold">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1 group-hover:text-[#00D084] transition-colors">
                    {item.problem}
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed font-light mb-3">
                    {item.cost}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                    <span className="text-xs text-white/90 font-medium leading-snug">
                      {item.fix}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* S5: Fleet Solutions Grid */}
      <motion.section
        id="services"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.12 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fleet-services-trigger py-20 px-6 max-w-7xl mx-auto border-t border-white/10"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="fleet-services-header text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            Fleet Solutions Suite
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Everything an EV fleet needs, from one EV specialist
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            Pick the services you need, or bundle them into one annual maintenance contract.
          </p>
        </motion.div>

        {/* Cinematic Visual Stage Showcase & Modular Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <FleetVisualShowcase />
        </motion.div>
      </motion.section>

      {/* S6: Autobot OS for Fleets */}
      <motion.section
        id="autobot-os"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.12 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-20 px-6 bg-[#040805] border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="autobot-header-reveal text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
              Technology // Autobot OS
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              One AI-powered operating system runs every fleet job
            </h2>
            <p className="text-sm text-white/60 mt-3 font-light">
              Autobot OS automates the work that usually breaks fleet maintenance: scheduling, dispatch, job cards, parts and billing. AI flags problems early. Certified technicians verify every repair.
            </p>
          </motion.div>

          {/* 6-Step Automation Flow */}
          <div className="autobot-steps-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { num: "01", title: "Detect", desc: "AI reads battery & fault data, flags risk." },
              { num: "02", title: "Schedule", desc: "Slots booked around shift downtime." },
              { num: "03", title: "Dispatch", desc: "Nearest tech & parts routed to job." },
              { num: "04", title: "Repair", desc: "Guided digital job card with photo logs." },
              { num: "05", title: "Verify", desc: "Post-repair test & sign-off before handover." },
              { num: "06", title: "Report", desc: "Dashboard, invoice & insights update live." },
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="autobot-step-pill p-4 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-colors shadow-md"
              >
                <span className="text-[10px] font-mono text-[#00D084] font-bold block mb-1">{step.num}</span>
                <span className="text-sm font-bold text-white block mb-1">{step.title}</span>
                <span className="text-[11px] text-white/60 block leading-tight">{step.desc}</span>
              </motion.div>
            ))}
          </div>

          {/* 6 Modules Grid */}
          <div className="autobot-mods-grid grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
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
            ].map((mod, idx) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="autobot-mod-card p-6 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/30 transition-all shadow-md"
              >
                <span className="text-[10px] font-mono text-[#00D084] uppercase tracking-wider font-bold block mb-2">{mod.tag}</span>
                <h3 className="text-base font-bold text-white mb-2">{mod.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{mod.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* S7: Fleet AMC Plans & ROI Calculator */}
      <motion.section
        id="plans"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.12 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10 space-y-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="plans-header-reveal text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084] block mb-2">
            Fleet AMC Plans
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Choose the Plan That Fits Your Vision
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            Predictable cost per vehicle, per month. Click any plan to view detailed inclusions, SLA metrics, and operational specs.
          </p>
        </motion.div>

        {/* 3 Model Cards Matching Franchise UI Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 [perspective:1200px]">
          {DETAILED_FLEET_PLANS.map((plan) => (
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={plan.type}
              onClick={() => setDetailsModalPlan(plan)}
              className={`bg-gradient-to-b from-white/[0.03] to-white/[0.002] border backdrop-blur-xl rounded-[32px] p-8 flex flex-col justify-between transition-all duration-300 relative cursor-pointer ${
                plan.popular
                  ? "border-[#00D084]/50 shadow-[0_0_35px_rgba(0,208,132,0.22)]"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {plan.badge && (
                <div className="absolute top-4 right-4 bg-[#00D084] text-[#020403] text-[9px] font-mono font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="text-left">
                    <span className="text-xs font-bold text-[#00D084]/80 block uppercase tracking-wider mb-1">
                      {plan.name.toUpperCase()}
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-white block tracking-tight">
                      {plan.investment}
                    </span>
                    {plan.originalInvestment && (
                      <span className="text-xs text-white/40 line-through block mt-0.5">
                        Standard: {plan.originalInvestment}
                      </span>
                    )}
                    {plan.foundingOffer && (
                      <span className="text-xs font-bold text-[#00D084] block mt-1">
                        {plan.foundingOffer}
                      </span>
                    )}
                    <p className="text-xs text-white/60 leading-relaxed mt-3 mb-0">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Separator line */}
                  <div className="h-[1px] bg-white/10 my-4" />

                  {/* Required Details HUD */}
                  <div className="space-y-2.5 text-xs text-white/70">
                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase tracking-wider font-mono">Fleet Size:</span>
                      <span className="text-white font-bold">{plan.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase tracking-wider font-mono">Service Bays:</span>
                      <span className="text-white font-bold">{plan.bays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40 uppercase tracking-wider font-mono">Vehicle Focus:</span>
                      <span className="text-white font-bold">{plan.vehicles}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex justify-center w-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPlan(plan);
                      }}
                      className="w-full bg-white text-black font-extrabold text-xs py-3 px-8 rounded-full hover:bg-white/90 transition-all shadow-md cursor-pointer text-center uppercase tracking-wider"
                    >
                      Apply for {plan.name}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Fleet ROI Calculator & Live Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <FleetRoiCalculator />
        </motion.div>
      </motion.section>

      {/* S14: FAQ Accordion */}
      <motion.section
        id="faqs"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-20 px-6 max-w-4xl mx-auto border-t border-white/10"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="faqs-header-reveal text-center mb-12"
        >
          <h2 className="text-3xl font-black text-white tracking-tight">EV Fleet Maintenance FAQs</h2>
        </motion.div>
        <div className="faqs-list-container space-y-3">
          {FAQS.map((faq, idx) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="faq-item-reveal rounded-2xl border border-white/10 bg-[#080d0a] overflow-hidden"
            >
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
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* S15: Closing CTA Band */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fleet-cta-banner py-16 px-6 bg-[#0D5C2E] text-white"
      >
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
      </motion.section>
          </div>
        </div>
      </div>

      {/* Fleet Plan Details Pop-Up Modal */}
      <AnimatePresence>
        {detailsModalPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setDetailsModalPlan(null)}
          >
            <motion.div
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="fleet-plan-details-modal relative w-full max-w-5xl bg-gradient-to-b from-[#07120a] to-[#040805] border border-[#00D084]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,208,132,0.15)] font-sans md:overflow-visible overflow-y-auto max-h-[95vh] z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setDetailsModalPlan(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Glowing Accent Ring in background */}
              <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#00D084]/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-900/10 rounded-full blur-[60px] pointer-events-none" />

              {/* Modal Content - 2 Columns on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10 text-left">
                {/* Left Column: Info & Stats */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#00D084] uppercase tracking-widest bg-[#00D084]/10 px-3 py-0.5 rounded-full border border-[#00D084]/20 font-sans">
                        {detailsModalPlan.type.toUpperCase()} PLAN
                      </span>
                      {detailsModalPlan.badge && (
                        <span className="text-[9px] font-bold text-black bg-[#00D084] px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                          {detailsModalPlan.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {detailsModalPlan.name}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed font-light">
                      {detailsModalPlan.subtitle}
                    </p>
                  </div>

                  {/* Main Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-black/40 border border-white/10 rounded-2xl p-3 sm:p-4 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-white/40 uppercase tracking-wider block font-sans">Pricing</span>
                      <span className="text-sm font-bold text-white block truncate">{detailsModalPlan.investment}</span>
                      {detailsModalPlan.originalInvestment && (
                        <span className="text-[9px] text-white/30 line-through block truncate">{detailsModalPlan.originalInvestment}</span>
                      )}
                    </div>
                    <div className="space-y-0.5 border-l border-white/10 pl-3">
                      <span className="text-[9px] text-white/40 uppercase tracking-wider block font-sans">Fleet Scale</span>
                      <span className="text-sm font-bold text-[#00D084] block truncate">{detailsModalPlan.area}</span>
                      <span className="text-[9px] text-white/50 block">Commercial units</span>
                    </div>
                    <div className="space-y-0.5 border-l border-white/10 pl-3">
                      <span className="text-[9px] text-white/40 uppercase tracking-wider block font-sans">Cadence</span>
                      <span className="text-sm font-bold text-white block truncate">{detailsModalPlan.bays}</span>
                      <span className="text-[9px] text-white/50 block truncate font-sans">{detailsModalPlan.vehicles}</span>
                    </div>
                  </div>

                  {/* Offer Details if present */}
                  {detailsModalPlan.foundingOffer && (
                    <div className="bg-[#00D084]/10 border border-[#00D084]/20 rounded-2xl p-3 sm:p-4 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[11px] font-bold text-[#00D084] uppercase tracking-wider">Plan Benefit</h4>
                        <p className="text-[10px] sm:text-[11px] text-white/90 mt-0.5 font-light leading-relaxed">
                          {detailsModalPlan.foundingOffer}. Plus, enjoy Autobot OS telemetry sync and consolidated monthly invoicing.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* More Details / Additional Setup Services */}
                  <div className="bg-black/50 border border-white/5 rounded-2xl p-3 sm:p-4 space-y-3 text-[11px] text-white/80">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <span className="font-bold text-white block text-[11px]">Autobot OS Fleet Integration</span>
                        <span className="text-white/50 block mt-0.5 text-[10px] leading-snug">Automated breakdown dispatch, telemetry health tracking & predictive parts logistics.</span>
                      </div>
                      <span className="text-[#00D084] font-bold shrink-0 text-[11px] font-sans">{detailsModalPlan.osSavings}</span>
                    </div>
                    <div className="h-[1px] bg-white/5" />
                    <div>
                      <span className="font-bold text-white block text-[11px]">Best Fit & Operator Profile</span>
                      <span className="text-white/50 block mt-0.5 text-[10px] leading-snug">{detailsModalPlan.bestFor}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Inclusions & CTA */}
                <div className="flex flex-col justify-between space-y-4">
                  {/* Package Highlights */}
                  <div className="space-y-2.5">
                    <h4 className="text-[11px] font-bold text-white/70 uppercase tracking-widest flex items-center gap-2 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084]" />
                      Included in Fleet AMC Coverage
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] sm:text-[11px]">
                      {detailsModalPlan.includes.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 bg-white/[0.02] border border-white/5 hover:border-[#00D084]/30 rounded-xl p-2 sm:p-2.5 text-white/90 transition-all leading-snug">
                          <Check className="w-3.5 h-3.5 text-[#00D084] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => handleSelectPlan(detailsModalPlan)}
                      className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-[#00D084] text-[#020403] text-xs font-bold uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer text-center"
                    >
                      Apply for {detailsModalPlan.name}
                    </button>
                    <button
                      onClick={() => setDetailsModalPlan(null)}
                      className="w-full sm:w-auto py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer text-center"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </main>
  );
}
