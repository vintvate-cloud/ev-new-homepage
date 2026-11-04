import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import { OEMBrandMarquee } from "../components/oem/OEMBrandMarquee";
import { OEMVisualStages } from "../components/oem/OEMVisualStages";
import { OEMNetworkSimulator } from "../components/oem/OEMNetworkSimulator";
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
  Mail,
  Car,
  Bike,
  Activity,
  Award,
  AlertCircle,
  Send,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

export const Route = createFileRoute("/oem")({
  head: () => ({
    meta: [
      { title: "EV After-Sales Partner for OEMs & Dealers | MY EV SERVICE" },
      {
        name: "description",
        content:
          "After-sales service partner for electric 2W and 3W brands: warranty, recall and PDI jobs, parts logistics, technician training and field data on Autobot OS.",
      },
      { name: "keywords", content: "EV after-sales service partner, EV OEM service partner India, EV warranty service partner, EV dealer service support, EV recall service" },
      { property: "og:title", content: "EV After-Sales Partner for OEMs & Dealers | MY EV SERVICE" },
      { property: "og:description", content: "After-sales service partner for electric 2W and 3W brands: warranty, recall and PDI jobs, parts logistics, technician training and field data on Autobot OS." },
      { property: "og:image", content: "/assets/images/og-oem.jpg" },
    ],
  }),
  component: OEMSolutionsPage,
});

export const OEM_HERO_BG = "/ev-service-centre-real-hero.png";

export const OEM_PARTNERSHIP_OPTIONS = [
  "After-Sales Service Network",
  "Warranty, Recall & PDI",
  "New City Launch Readiness",
  "Parts Distribution Logistics",
  "Technician Training & Cert",
  "Battery Refurbishment",
];

export function OEMSolutionsPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formStep, setFormStep] = useState<"main" | "scopes">("main");
  const [form, setForm] = useState({
    company: "",
    name: "",
    designation: "",
    email: "",
    mobile: "",
    vehicleCategory: "Both",
    partnershipType: [] as string[],
    targetCities: "",
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

      // --- SCROLL ANIMATIONS SUITE ---

      // 1. Overview Metric Tiles Stagger
      gsap.fromTo(
        ".oem-metric-card",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oem-overview-trigger",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Desk Callout
      gsap.fromTo(
        ".oem-desk-card",
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oem-desk-card",
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 2. Segment Chips Band
      gsap.fromTo(
        ".oem-chip-item",
        { opacity: 0, scale: 0.85, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oem-chips-trigger",
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 3. After-Sales Gap Comparison Section
      gsap.fromTo(
        ".oem-gap-header",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oem-gap-trigger",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
      gsap.fromTo(
        ".oem-gap-table",
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oem-gap-table",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 4. OEM Solutions Grid (9 cards)
      gsap.fromTo(
        ".oem-services-header",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oem-services-trigger",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
      gsap.fromTo(
        ".oem-service-card",
        { opacity: 0, y: 45, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oem-services-grid",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 5. Autobot OS Section
      gsap.fromTo(
        ".oem-autobot-header",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#autobot-os",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
      gsap.fromTo(
        ".oem-autobot-step",
        { opacity: 0, y: 30, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oem-autobot-steps",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
      gsap.fromTo(
        ".oem-autobot-mod",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oem-autobot-mods",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 6. Engagement Models (4 cards)
      gsap.fromTo(
        ".oem-models-header",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#models",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
      gsap.fromTo(
        ".oem-model-card",
        { opacity: 0, y: 45, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oem-models-grid",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 7. Speed & Scale Comparison Section
      gsap.fromTo(
        ".oem-scale-header",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oem-scale-trigger",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
      gsap.fromTo(
        ".oem-scale-table",
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oem-scale-table",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 8. FAQs Section
      gsap.fromTo(
        ".oem-faqs-header",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#faqs",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
      gsap.fromTo(
        ".oem-faq-item",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oem-faqs-list",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 9. Closing CTA Banner
      gsap.fromTo(
        ".oem-cta-banner",
        { scale: 0.94, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oem-cta-banner",
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
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

  const handleTypeToggle = (item: string) => {
    setForm((prev) => ({
      ...prev,
      partnershipType: prev.partnershipType.includes(item)
        ? prev.partnershipType.filter((t) => t !== item)
        : [...prev.partnershipType, item],
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
    toast.success("Thank you! Our OEM partnerships team will respond within one business day.");
    setForm({
      company: "",
      name: "",
      designation: "",
      email: "",
      mobile: "",
      vehicleCategory: "Both",
      partnershipType: [],
      targetCities: "",
      consent: false,
    });
    setFormStep("main");
  };

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const el = document.getElementById("enquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const FAQS = [
    {
      q: "Can you service our vehicles under our procedures?",
      a: "Yes. Your standard operating procedures (SOPs), labor times and parts lists are loaded directly into Autobot OS and enforced on every digital job card.",
    },
    {
      q: "Do you handle warranty and recall work?",
      a: "Yes. We diagnose, repair and submit claims with full photo, fault-code telemetry and battery data evidence for your engineering team's approval.",
    },
    {
      q: "How is our data and IP protected?",
      a: "We execute mutual NDAs and enterprise data-governance agreements before onboarding. Access in Autobot OS is role-based and encrypted.",
    },
    {
      q: "Do you require exclusivity?",
      a: "No. Engagements can be configured city-by-city and can sit alongside or back up your existing authorized dealership networks.",
    },
    {
      q: "Which vehicle categories do you support?",
      a: "Electric two-wheelers (motorcycles & high-speed scooters) and three-wheelers (L3 and L5 passenger & cargo models).",
    },
    {
      q: "How quickly can you cover a new city?",
      a: "It depends on initial volumes and parts availability. Typically, our standardized 90-day launch playbook prepares centres, tooling and technicians rapidly.",
    },
    {
      q: "Can you train our dealer technicians?",
      a: "Yes. Autobot Academy conducts customized technical training and certification batches specifically engineered around your powertrain platform.",
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
              backgroundImage: `url('${OEM_HERO_BG}')`,
            }}
          />
          {/* Subtle blur & darkening layer for optimal text readability */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

          {/* Hero Content Container (Text & Form) */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center px-6 md:px-12 pt-4 sm:pt-6 lg:pt-0 z-10 pointer-events-auto transition-all overflow-y-auto lg:overflow-visible"
          >
            {/* Left Column: Title & Text */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              <span className="hero-sub-reveal text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] inline-block">
                • EV After-Sales Infrastructure For Manufacturers · Pune &amp; Maharashtra
              </span>
              <h1 className="hero-title-reveal text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-white leading-[1.08]">
                Your After-Sales Network, <br className="hidden sm:block" />
                <span className="text-[#00D084]">Ready Wherever Your EVs Are Sold</span>
              </h1>
              <p className="hero-sub-reveal text-xs sm:text-sm md:text-base text-[#c2d1c7] font-light max-w-xl leading-relaxed">
                Plug-in service capacity for electric 2W and 3W manufacturers and dealer groups: certified EV technicians, standard workshops, parts logistics and warranty-job handling, all run on Autobot OS with full telemetry visibility.
              </p>
              <div className="hero-btn-reveal pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="whitespace-nowrap inline-flex items-center justify-center shrink-0 gap-2 px-7 py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] cursor-pointer hover:scale-105"
                >
                  <CalendarCheck className="w-4 h-4 shrink-0" />
                  <span>REQUEST PARTNERSHIP CALL</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <a
                  href="#models"
                  className="px-6 py-3.5 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>EXPLORE OEM MODELS</span>
                </a>
              </div>
            </div>

            {/* Right Column: Premium Glass Form Card */}
            <div
              id="enquiry"
              className="hero-form lg:col-span-5 bg-[#030604]/95 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 relative border border-white/20 shadow-2xl overflow-hidden text-left min-h-[490px] flex flex-col justify-between"
            >
              <AnimatePresence mode="wait">
                {formStep === "main" ? (
                  <motion.div
                    key="step-oem-main"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="relative z-10 w-full"
                  >
                    <div className="mb-3 text-left">
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                        Plan Your After-Sales Network
                      </h3>
                      <p className="text-xs text-white/70 font-medium mt-1">
                        Our OEM team replies within one working day.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2.5 text-left">
                      {/* Company / Brand Name */}
                      <div>
                        <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block mb-1">
                          COMPANY / BRAND NAME *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. EV Manufacturer, Dealer Group"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 focus:bg-black rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/15"
                        />
                      </div>

                      {/* Your Name & Designation */}
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
                            DESIGNATION
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. VP After-Sales, Head Service"
                            value={form.designation}
                            onChange={(e) => setForm({ ...form, designation: e.target.value })}
                            className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 focus:bg-black rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/15"
                          />
                        </div>
                      </div>

                      {/* Work Email & Mobile */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block mb-1">
                            WORK EMAIL
                          </label>
                          <input
                            type="email"
                            placeholder="name@oem.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
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

                      {/* Vehicle Category Pill Buttons */}
                      <div>
                        <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block mb-1">
                          VEHICLE CATEGORY
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "Electric 2W", label: "Electric 2W" },
                            { id: "Electric 3W (L3/L5)", label: "Electric 3W (L3/L5)" },
                            { id: "Both", label: "Both" },
                          ].map((pill) => {
                            const isSelected = form.vehicleCategory === pill.id;
                            return (
                              <button
                                key={pill.id}
                                type="button"
                                onClick={() => setForm({ ...form, vehicleCategory: pill.id })}
                                className={`py-2 px-2.5 rounded-full text-xs font-bold transition-all text-center cursor-pointer border ${
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

                      {/* PARTNERSHIP TYPE - Interactive Flow Trigger */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block">
                            PARTNERSHIP TYPE
                          </label>
                          {form.partnershipType.length > 0 && (
                            <span className="text-[10px] text-[#00D084] font-bold">
                              {form.partnershipType.length} selected
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => setFormStep("scopes")}
                          className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 border border-white/15 hover:border-[#00D084]/60 rounded-xl px-3.5 py-2.5 text-xs text-left transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-1.5 overflow-hidden pr-2">
                            {form.partnershipType.length === 0 ? (
                              <span className="text-white/40">
                                Click to choose partnership scopes...
                              </span>
                            ) : (
                              <div className="flex flex-wrap gap-1 max-h-12 overflow-hidden">
                                {form.partnershipType.map((item) => (
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
                            <span>{form.partnershipType.length === 0 ? "Select" : "Edit"}</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </button>
                      </div>

                      {/* Target Cities */}
                      <div>
                        <label className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 block mb-1">
                          TARGET CITIES
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Pune, Mumbai, Bangalore, Delhi NCR"
                          value={form.targetCities}
                          onChange={(e) => setForm({ ...form, targetCities: e.target.value })}
                          className="w-full bg-[#0a0f0d]/90 hover:bg-black/90 focus:bg-black rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/15"
                        />
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
                            I agree to the processing of enterprise details under the DPDP Act for evaluating service network partnerships.
                          </span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-1 shadow-[0_0_25px_rgba(0,208,132,0.4)]"
                      >
                        <span>REQUEST PARTNERSHIP CALL</span>
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step-oem-scopes"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="relative z-10 flex flex-col justify-between w-full h-full min-h-[460px]"
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
                          {form.partnershipType.length} Selected
                        </span>
                      </div>

                      <div className="text-left mb-3">
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          Partnership Type
                        </h3>
                        <p className="text-xs text-white/70 font-medium mt-0.5">
                          Select the scopes relevant to your brand's after-sales network.
                        </p>
                      </div>

                      {/* 6 options from OEM Image in 2-column layout */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                        {OEM_PARTNERSHIP_OPTIONS.map((item) => {
                          const isSelected = form.partnershipType.includes(item);
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => handleTypeToggle(item)}
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
                        <span>Next • Back to Form</span>
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
                <span className="text-[#00D084]">OEM Solutions</span>
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
                    <Link to="/fleet" className="hover:text-white transition-colors">Fleet Solutions</Link>
                    <a href="#services" className="hover:text-white transition-colors">OEM Solutions</a>
                    <a href="#autobot-os" className="hover:text-white transition-colors">Autobot OS for OEMs</a>
                    <a href="#models" className="hover:text-white transition-colors">Engagement Models</a>
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
                    Request Partnership Call
                  </a>
                </div>
              </div>
            </section>

            {/* S2: Top Overview / Key Highlights */}
            <section id="services" className="oem-overview-trigger relative px-6 py-12 md:py-16 overflow-hidden">
              <div className="max-w-7xl mx-auto space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="oem-metric-card p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all shadow-lg">
                    <div className="w-8 h-8 rounded-xl bg-[#00D084]/20 text-[#00D084] flex items-center justify-center font-bold text-xs mb-3">01</div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#00D084] block mb-1 font-bold">No New Capex</span>
                    <span className="text-sm font-semibold text-white block leading-snug">Instant service capacity without building or financing your own retail centres</span>
                  </div>
                  <div className="oem-metric-card p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all shadow-lg">
                    <div className="w-8 h-8 rounded-xl bg-[#00D084]/20 text-[#00D084] flex items-center justify-center font-bold text-xs mb-3">02</div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#00D084] block mb-1 font-bold">Your Exact SOPs</span>
                    <span className="text-sm font-semibold text-white block leading-snug">Warranty, recall and PDI jobs executed to your exact manufacturer specifications</span>
                  </div>
                  <div className="oem-metric-card p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all shadow-lg">
                    <div className="w-8 h-8 rounded-xl bg-[#00D084]/20 text-[#00D084] flex items-center justify-center font-bold text-xs mb-3">03</div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#00D084] block mb-1 font-bold">Real-Time Field Data</span>
                    <span className="text-sm font-semibold text-white block leading-snug">Every repair, fault code and part failure reported back to your engineering team via API</span>
                  </div>
                  <div className="oem-metric-card p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all shadow-lg">
                    <div className="w-8 h-8 rounded-xl bg-[#00D084]/20 text-[#00D084] flex items-center justify-center font-bold text-xs mb-3">04</div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#00D084] block mb-1 font-bold">City-Ready Scale</span>
                    <span className="text-sm font-semibold text-white block leading-snug">A proven launch playbook ensuring readiness wherever your distributors sell</span>
                  </div>
                </div>

                <div className="oem-desk-card p-5 rounded-2xl bg-gradient-to-r from-[#0D5C2E]/20 to-[#07110B] border border-[#00D084]/30 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-bold text-white">Direct OEM Partnerships Desk</h4>
                    <p className="text-xs text-white/60">Speak directly with our automotive VP of Partnerships</p>
                  </div>
                  <a
                    href="mailto:info@myevservice.in?subject=OEM%20Partnership"
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-[#00D084] flex items-center gap-2 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" /> Email info@myevservice.in
                  </a>
                </div>
              </div>
            </section>

      {/* S3: Infinite OEM Brand Marquee & Tested Platforms */}
      <section className="oem-chips-trigger">
        <OEMBrandMarquee />
        <div className="py-4 border-b border-white/10 bg-[#060a08]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <span className="text-[11px] font-mono text-[#00D084] uppercase tracking-wider font-bold">
              Turn-Key Infrastructure For:
            </span>
            {[
              "Electric 2W Manufacturers",
              "3W / L5 Cargo Makers",
              "New & Import EV Brands",
              "Automotive Dealer Groups",
              "Battery & Component Makers",
              "Leasing & Commercial Fleets",
            ].map((seg) => (
              <span
                key={seg}
                className="oem-chip-item px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 font-medium text-[11px] hover:border-[#00D084]/40 hover:text-white transition-colors"
              >
                {seg}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* S4: The After-Sales Gap Comparison */}
      <section className="oem-gap-trigger py-20 px-6 max-w-7xl mx-auto">
        <div className="oem-gap-header text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            The After-Sales Bottleneck
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            EV sales are moving faster than service networks
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            In Pune alone, EV registrations nearly tripled in FY 2025–26 to 37,808 vehicles. For an EV brand, poor after-sales in one city shows up as lost sales in the next. Here is how MY EV SERVICE solves the gap.
          </p>
        </div>

        {/* Visual Split: Workshop Imagery & Interactive Gap Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Operational Showcase Card */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden bg-[#07110b] border border-white/15 relative min-h-[460px] flex flex-col justify-between p-6 sm:p-8 shadow-2xl">
            <img
              src="/gallery/hydraulic-lift.png"
              alt="EV Service Multi-Bay Workshop"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-[1.1] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040805] via-[#040805]/50 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#00D084]/40 text-[10px] font-mono font-bold text-[#00D084] uppercase tracking-wider">
                ● MULTI-BAY 1000V HV SYSTEM
              </span>
              <span className="text-xs font-mono text-white/60 bg-black/60 px-2.5 py-0.5 rounded-lg border border-white/10">
                ZERO CAPEX
              </span>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-[#00D084] font-bold uppercase block">
                  The Scale Bottleneck
                </span>
                <p className="text-xs text-white/80 leading-relaxed font-light">
                  Building proprietary centres costs ₹2.5 Cr+ per location and takes 6–9 months. MY EV SERVICE gives you instant capacity in 14 days under your exact brand SOPs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                  <span className="text-xl font-black text-white font-mono block">14 Days</span>
                  <span className="text-[10px] text-white/50 uppercase font-mono">City Go-Live</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                  <span className="text-xl font-black text-[#00D084] font-mono block">&lt; 4 Hours</span>
                  <span className="text-[10px] text-white/50 uppercase font-mono">Mean Turnaround</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Friction vs Fix Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                problem: "Sales outpace service",
                impact: "Long customer wait times damaging customer NPS.",
                fix: "Turn-key service capacity pre-trained on your platform.",
                badge: "Immediate Scale",
              },
              {
                problem: "Capex-heavy centres",
                impact: "Capital tied down with 6+ months retail lease delays.",
                fix: "Network-as-a-Service: pay only for bays used per city.",
                badge: "Zero Capex",
              },
              {
                problem: "Uneven dealer quality",
                impact: "Inconsistent repairs across non-standardized dealers.",
                fix: "Standardized 1000V EV tooling & Autobot Academy cert.",
                badge: "Standard SOPs",
              },
              {
                problem: "Data blind spots",
                impact: "Repeat faults reach engineering teams months too late.",
                fix: "Every DTC code & repair logged and streamed via API.",
                badge: "Live Telemetry",
              },
              {
                problem: "Parts distribution delays",
                impact: "Vehicles sit idle for days waiting for spare shipments.",
                fix: "Regional parts buffer with RFID & 2-hr local delivery.",
                badge: "2-Hr Logistics",
              },
              {
                problem: "Warranty leakage",
                impact: "Weak evidence drives up warranty disputes & audit costs.",
                fix: "Digital job card with photo, BMS logs and sensor proof.",
                badge: "100% Verified",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-white/40 uppercase font-bold">Challenge {idx + 1}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[#00D084] font-mono text-[9px] font-bold">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1 group-hover:text-[#00D084] transition-colors">
                    {item.problem}
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed font-light mb-3">
                    {item.impact}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S5: OEM Solutions Interactive Stages */}
      <section id="services" className="oem-services-trigger py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="oem-services-header text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            OEM Solutions Suite
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            A complete after-sales layer for your EV brand
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            Take one capability or activate the full stack. Every workflow runs to your exact manufacturer SOPs with real-time digital accountability.
          </p>
        </div>

        {/* Cinematic Visual Stage Switcher Component */}
        <OEMVisualStages />

        {/* Specialized Capability Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-12 pt-12 border-t border-white/10">
          {[
            { tag: "Recalls & OTA", label: "Field Campaigns", icon: AlertCircle },
            { tag: "36-Pt Audit", label: "Dealer PDI Support", icon: CheckCircle2 },
            { tag: "Battery Lab", label: "Pack & Module Rebuild", icon: Activity },
            { tag: "Urban RSA", label: "2-Hr Flatbed Dispatch", icon: Wrench },
            { tag: "Autobot Academy", label: "Tech Certification", icon: Award },
            { tag: "Enterprise API", label: "DMS Cloud Sync", icon: Cpu },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all text-center flex flex-col items-center justify-center group"
              >
                <Icon className="w-5 h-5 text-white/40 group-hover:text-[#00D084] transition-colors mb-2" />
                <span className="text-[10px] font-mono text-[#00D084] uppercase block font-bold mb-0.5">
                  {item.tag}
                </span>
                <span className="text-xs font-bold text-white leading-tight">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* S6: Autobot OS for OEMs */}
      <section id="autobot-os" className="py-20 px-6 bg-[#040805] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="oem-autobot-header text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
              Technology // Autobot OS for OEMs
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              An AI-powered service platform your team can see into
            </h2>
            <p className="text-sm text-white/60 mt-3 font-light">
              Autobot OS runs every job from booking to warranty claim. It automates scheduling, dispatch, parts and reporting, giving your engineering and quality teams real-time field visibility.
            </p>
          </div>

          {/* 6-Step SOP Automation Flow */}
          <div className="oem-autobot-steps grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { num: "01", title: "Load SOPs", desc: "Your procedures, labour times & parts lists." },
              { num: "02", title: "Book", desc: "Customer, dealer or recall bookings routed." },
              { num: "03", title: "Diagnose", desc: "AI-guided fault finding on your platform." },
              { num: "04", title: "Approve", desc: "Warranty evidence sent for your sign-off." },
              { num: "05", title: "Repair", desc: "Guided digital job card with scanned parts." },
              { num: "06", title: "Report", desc: "Live failure trends & quality data exported." },
            ].map((step) => (
              <div key={step.num} className="oem-autobot-step p-4 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-colors">
                <span className="text-[10px] font-mono text-[#00D084] font-bold block mb-1">{step.num}</span>
                <span className="text-sm font-bold text-white block mb-1">{step.title}</span>
                <span className="text-[11px] text-white/60 block leading-tight">{step.desc}</span>
              </div>
            ))}
          </div>

          {/* 6 Modules Grid */}
          <div className="oem-autobot-mods grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[
              {
                tag: "Brand SOP Library",
                title: "Your process, every centre",
                desc: "Procedures and labour times enforced step by step on the technician's digital job card.",
              },
              {
                tag: "Warranty Workflow",
                title: "Evidence-first claims",
                desc: "High-resolution photos, BMS logs, and diagnostic trouble codes attached to every claim.",
              },
              {
                tag: "Field Analytics",
                title: "Failure trends by model",
                desc: "Identify repeat batch faults, parts wear rate and mean time-to-repair by model variant.",
              },
              {
                tag: "Traceability",
                title: "Serial-level parts",
                desc: "Every warranty component scanned from central warehouse to vehicle bay.",
              },
              {
                tag: "DMS Integration",
                title: "API to your DMS / ERP",
                desc: "Jobs, claims, customer profiles and vehicle telemetry flow seamlessly into your core ERP.",
              },
              {
                tag: "Data Governance",
                title: "Your data stays yours",
                desc: "Role-based access controls, strict NDAs and dedicated enterprise multi-tenant security.",
              },
            ].map((mod) => (
              <div key={mod.title} className="oem-autobot-mod p-6 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/30 transition-all">
                <span className="text-[10px] font-mono text-[#00D084] uppercase tracking-wider font-bold block mb-2">{mod.tag}</span>
                <h3 className="text-base font-bold text-white mb-2">{mod.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S7: Engagement Models & Network Simulator */}
      <section id="models" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10 space-y-16">
        <div className="oem-models-header text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            Network Planning &amp; Models
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Flexible models engineered for scale
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            Simulate your network requirement, then choose the commercial model that fits your growth targets.
          </p>
        </div>

        {/* Interactive Network Simulator */}
        <OEMNetworkSimulator />

        {/* 4 Commercial Engagement Models */}
        <div className="oem-models-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {[
            {
              model: "Service Partner",
              what: "Service your customers' vehicles at our multi-brand centres under your SOPs.",
              bestFor: "Brands with growing volume in a city",
              commercials: "Per-job labour rates + parts",
            },
            {
              model: "Network-as-a-Service",
              what: "Dedicated bays and certified technicians reserved for your brand in chosen cities.",
              bestFor: "Brands scaling sales fast",
              commercials: "Monthly capacity fee + per job",
            },
            {
              model: "Market-Entry Package",
              what: "Service readiness before a new city launch: centres, parts buffer, RSA and trained technicians.",
              bestFor: "New and import EV brands",
              commercials: "Project fee per city",
            },
            {
              model: "Training & Certification",
              what: "Autobot Academy trains and certifies your internal or dealer technicians on high-voltage systems.",
              bestFor: "Dealer networks & OEMs",
              commercials: "Per cohort / batch",
            },
          ].map((item) => (
            <div key={item.model} className="oem-model-card p-6 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-[10px] font-mono text-[#00D084] uppercase tracking-wider font-bold block mb-2">Model</span>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00D084] transition-colors">{item.model}</h3>
                <p className="text-xs text-white/70 leading-relaxed mb-4">{item.what}</p>
                <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs">
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase font-mono">Best For:</span>
                    <span className="text-white font-medium">{item.bestFor}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-white/40 block text-[10px] uppercase font-mono">Commercials:</span>
                    <span className="text-[#00D084] font-mono font-semibold">{item.commercials}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* S8: Speed & Scale Comparison Visual Matrix */}
      <section className="oem-scale-trigger py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="oem-scale-header text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            Strategic Architecture Showdown
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Cover more cities, faster, with less capital
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            Compare proprietary dealer networks vs. our agile, on-demand certified service infrastructure.
          </p>
        </div>

        {/* 3-Column Comparative Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Proprietary OEM Centres */}
          <div className="rounded-3xl bg-[#080d0a] border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold block mb-2">
                MODEL 01 // CAPEX INTENSIVE
              </span>
              <h3 className="text-xl font-bold text-white mb-2">Own Company Centres</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light mb-6">
                High initial investment and slow multi-city footprint expansion.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-mono">Upfront Capex</span>
                  <span className="text-red-400 font-bold">₹2.5 Cr+ per Centre</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-mono">New City Launch</span>
                  <span className="text-white/80">6–9 Months Setup Delay</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-mono">Consistency</span>
                  <span className="text-white/80">High, but slow scaling</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-mono">Technician Staffing</span>
                  <span className="text-white/80">Direct Payroll &amp; Benefits</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-mono">Cost Elasticity</span>
                  <span className="text-red-400">Fixed High Overhead</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 text-center">
              <span className="text-[11px] font-mono text-white/40 uppercase">High Risk // Low Agility</span>
            </div>
          </div>

          {/* Card 2: Dealer-Only Service */}
          <div className="rounded-3xl bg-[#080d0a] border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold block mb-2">
                MODEL 02 // FRAGMENTED
              </span>
              <h3 className="text-xl font-bold text-white mb-2">Dealer-Only Service</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light mb-6">
                Unpredictable customer experience and lack of unified telemetry data.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-mono">Upfront Capex</span>
                  <span className="text-white/80">Dealer-Funded (Uneven)</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-mono">New City Launch</span>
                  <span className="text-white/80">Dependent on Dealership signing</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-mono">Consistency</span>
                  <span className="text-yellow-400">Varies widely by dealer</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-mono">Tooling &amp; Safety</span>
                  <span className="text-yellow-400">Non-standard HV tools</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-mono">Field Data to R&amp;D</span>
                  <span className="text-red-400">Fragmented or Lost</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 text-center">
              <span className="text-[11px] font-mono text-yellow-400/80 uppercase">Brand NPS Risk</span>
            </div>
          </div>

          {/* Card 3: MY EV SERVICE Network (Featured / Hero) */}
          <div className="rounded-3xl bg-gradient-to-b from-[#0D5C2E]/40 via-[#07130b] to-[#040805] border-2 border-[#00D084] p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_40px_rgba(0,208,132,0.15)] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00D084] text-black font-black text-[10px] uppercase tracking-widest shadow-lg">
              ★ RECOMMENDED FOR SCALE
            </div>

            <div>
              <span className="text-[10px] font-mono text-[#00D084] uppercase tracking-widest font-bold block mb-2 pt-2">
                MODEL 03 // CLOUD &amp; NETWORK-AS-A-SERVICE
              </span>
              <h3 className="text-xl font-bold text-white mb-2">MY EV SERVICE Platform</h3>
              <p className="text-xs text-white/70 leading-relaxed font-light mb-6">
                Turn-key multi-city service capacity with unified Autobot OS telemetry.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#00D084]/20 text-xs">
                <div>
                  <span className="text-white/50 block text-[10px] uppercase font-mono">Upfront Capex</span>
                  <span className="text-[#00D084] font-black text-sm">₹0 for Capacity</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px] uppercase font-mono">New City Launch</span>
                  <span className="text-white font-bold">14 Days Go-Live SLA</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px] uppercase font-mono">Consistency</span>
                  <span className="text-white font-bold">100% Brand SOP Enforcement</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px] uppercase font-mono">Technician Staffing</span>
                  <span className="text-[#00D084] font-bold">Autobot Academy Certified</span>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px] uppercase font-mono">Field Data &amp; Claims</span>
                  <span className="text-[#00D084] font-bold">Live API + CAN Logs Ingested</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#00D084]/20">
              <a
                href="#enquiry"
                className="w-full py-3 rounded-xl bg-[#00D084] hover:bg-[#00e08f] text-black font-bold text-xs uppercase tracking-wider text-center block transition-all shadow-md"
              >
                Activate Partner Capacity
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* S14: FAQ Accordion */}
      <section id="faqs" className="py-20 px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="oem-faqs-header text-center mb-12">
          <h2 className="text-3xl font-black text-white tracking-tight">OEM Partnership FAQs</h2>
        </div>
        <div className="oem-faqs-list space-y-3">
          {FAQS.map((faq, idx) => (
            <div key={faq.q} className="oem-faq-item rounded-2xl border border-white/10 bg-[#080d0a] overflow-hidden">
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
      <section className="oem-cta-banner py-16 px-6 bg-[#0D5C2E] text-white">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/80 font-bold block">
            FOR EV BRANDS AND DEALER GROUPS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Let's plan your after-sales network
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Tell us your target cities and expected volumes. We'll return with a detailed service capacity plan and SLA framework.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#enquiry"
              className="px-8 py-4 rounded-full bg-white text-[#020403] font-black text-xs uppercase tracking-widest hover:bg-white/90 shadow-2xl transition-all"
            >
              Request a Partnership Call
            </a>
            <a
              href="mailto:info@myevservice.in?subject=OEM%20Partnership"
              className="px-8 py-4 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" /> Email info@myevservice.in
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
