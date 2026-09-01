import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { IndiaFranchiseMap } from "../components/IndiaFranchiseMap";
import { FranchiseJourneyRoadmap } from "../components/FranchiseJourneyRoadmap";
import { FranchiseWorkshopsGallery } from "../components/FranchiseWorkshopsGallery";
import { FranchiseVideoCurvedFan } from "../components/FranchiseVideoCurvedFan";
import {
  DETAILED_FRANCHISE_MODELS,
  FAQ_CATEGORIES,
  CATEGORIZED_FAQS,
  PARTNER_TESTIMONIALS_ROW1,
  PARTNER_TESTIMONIALS_ROW2,
  BRAND_COLLABORATIONS,
  PARTNER_VIDEO_INTERVIEWS,
  DEVELOPED_CENTERS_GALLERY,
  DetailedFranchiseModel,
  BrandCollaboration,
  PartnerVideoInterview,
  DevelopedCenter,
} from "../data/franchiseData";
import {
  CheckCircle2,
  Check,
  ArrowRight,
  X,
  Send,
  Sparkles,
  Download,
  ChevronDown,
  ChevronUp,
  Compass,
  Calendar,
  ArrowLeftRight,
  Star,
  Quote,
  Zap,
  Play,
  ExternalLink,
  Building2,
  MapPin,
  RotateCcw,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/franchise")({
  validateSearch: (
    search: Record<string, unknown>
  ): { city?: string; area?: string; pincode?: string } => {
    return {
      city: typeof search?.city === "string" ? search.city : undefined,
      area: typeof search?.area === "string" ? search.area : undefined,
      pincode: typeof search?.pincode === "string" ? search.pincode : undefined,
    };
  },
  component: FranchisePage,
});

function FranchisePage() {
  const searchParams = Route.useSearch();
  const [selectedModel, setSelectedModel] = useState<DetailedFranchiseModel>(
    DETAILED_FRANCHISE_MODELS[1]
  );

  // Application Modal state
  const [applyModalOpen, setApplyModalOpen] = useState(
    !!(searchParams.city || searchParams.area || searchParams.pincode)
  );

  // FAQ Categorized state
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>("all");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Partner Reviews Horizontal Scroll reference
  const reviewScrollRef = useRef<HTMLDivElement>(null);

  // Comparison Matrix Active Selected Feature for Visual Breakdown
  const [selectedCompFeature, setSelectedCompFeature] = useState<number>(0);

  // Brand Collaborations Grid 3D Flip state
  const [selectedBrandId, setSelectedBrandId] = useState<string>("ola");
  const [flippedBrandId, setFlippedBrandId] = useState<string | null>(null);

  // Partner Video Modal state
  const [activeVideo, setActiveVideo] = useState<PartnerVideoInterview | null>(null);

  // Developed Centers Gallery Filter state
  const [selectedCenterType, setSelectedCenterType] = useState<"all" | "hub" | "centre" | "garage">("all");

  // Franchise Models Expandable Services Dropdown state
  const [expandedModels, setExpandedModels] = useState<{ [key: string]: boolean }>({});

  // Franchise Model Details Modal state
  const [detailsModalModel, setDetailsModalModel] = useState<DetailedFranchiseModel | null>(null);

  // Hero section & ScrollTrigger refs
  const heroTextRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const cardsUpRef = useRef<HTMLDivElement>(null);

  const toggleModelDropdown = (type: string) => {
    setExpandedModels((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (searchParams.city || searchParams.area || searchParams.pincode) {
      setApplyModalOpen(true);
    }
  }, [searchParams]);

  // GSAP ScrollTrigger Animations (matching Media page pattern)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // --- HERO MOUNT ENTRANCE ANIMATIONS ---
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-desc",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1, delay: 0.2, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.9, delay: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-form",
        { opacity: 0, x: 45, scale: 0.97 },
        { opacity: 1, x: 0, scale: 1, duration: 1.1, delay: 0.2, ease: "power3.out" }
      );

      // --- HERO BACKGROUND PARALLAX ZOOM ---
      gsap.to(".hero-bg-img", {
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: contentOverlayRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });

      // --- HERO TEXT & FORM FADE OUT ON SCROLL ---
      gsap.to(heroTextRef.current, {
        opacity: 0,
        scale: 0.92,
        y: -40,
        ease: "power1.out",
        scrollTrigger: {
          trigger: contentOverlayRef.current,
          start: "top 95%",
          end: "top 35%",
          scrub: 0.6,
        },
      });

      // --- KEY BADGES ENTRANCE ---
      if (cardsUpRef.current) {
        gsap.fromTo(
          cardsUpRef.current,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsUpRef.current,
              start: "top 95%",
              end: "top 65%",
              scrub: 0.6,
            },
          }
        );
      }

      // --- SECTION REVEALS ---
      // 1. Vision Section
      gsap.fromTo(
        ".vision-reveal",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".vision-section",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 2. Comparison Header & Tabs
      gsap.fromTo(
        ".comparison-header-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".comparison-section",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".comparison-tabs-reveal button",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".comparison-tabs-reveal",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 3. Comparison Cards sliding in from sides
      gsap.fromTo(
        ".comparison-card-left",
        { opacity: 0, x: -70 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".comparison-cards-grid",
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".comparison-card-right",
        { opacity: 0, x: 70 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".comparison-cards-grid",
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 4. Models Banner & Cards
      gsap.fromTo(
        ".models-banner-reveal",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".models-banner-reveal",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".models-header-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".models-header-reveal",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".models-bg-text",
        { y: 55, scale: 0.9, opacity: 0 },
        {
          y: -25,
          scale: 1.06,
          opacity: 0.025,
          scrollTrigger: {
            trigger: "#franchise-models",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        ".model-card-reveal",
        { opacity: 0, y: 110, scale: 0.95, rotateX: 12 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.25,
          stagger: 0.18,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".model-cards-grid",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 5. Testimonials Header
      gsap.fromTo(
        ".testimonials-header-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-section",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 6. FAQ Header & Items
      gsap.fromTo(
        ".faq-header-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-section",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".faq-item-reveal",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-list-reveal",
            start: "top 80%",
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

  // Application Form State
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    pincode: searchParams.pincode || "",
    city: searchParams.city || "",
    state: "",
    investmentRange: "₹10L - ₹20L",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.mobile || !form.city) {
      toast.error("Please fill in your Full Name, Mobile Number, and City.");
      return;
    }
    toast.success(
      "Franchise Application Submitted! Our team will reach out within 24 hours."
    );
    setApplyModalOpen(false);
    setForm({
      fullName: "",
      email: "",
      mobile: "",
      pincode: "",
      city: "",
      state: "",
      investmentRange: "₹10L - ₹20L",
    });
  };

  const scrollToForm = () => {
    const el = document.getElementById("hero-partner-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Comparison Matrix Feature Data
  const COMPARISON_FEATURES = [
    {
      title: "Profit Margins & ROI",
      traditional: "10% – 14% Net Margins (Unpredictable)",
      myev: "25% – 30% Net Margins (14-18mo Payback)",
      tradScore: 35,
      myevScore: 94,
      desc: "Autobot OS automation cuts labor waste and diagnostic turnaround time by 60%, delivering industry-leading workshop profitability.",
    },
    {
      title: "High-Voltage Battery Diagnostics",
      traditional: "Trial & error parts replacement (Dangerous)",
      myev: "Autobot CAN-bus Diagnostic & Cell Equalizer Lab",
      tradScore: 15,
      myevScore: 98,
      desc: "Certified cell-level battery diagnostic equipment enables lucrative pack repairs instead of replacing entire battery units.",
    },
    {
      title: "Software & Digital Job Cards",
      traditional: "Manual paper billing & zero CRM tracking",
      myev: "AI Autobot OS Cloud App & Automated Dispatch",
      tradScore: 20,
      myevScore: 96,
      desc: "Digital job cards, live repair status tracking, and automated mobile app customer dispatch drive repeat visits.",
    },
    {
      title: "OEM Spare Parts Supply",
      traditional: "Counterfeit risk & 3-5 days local delays",
      myev: "Centralized 100% Genuine OEM Supply Chain",
      tradScore: 30,
      myevScore: 95,
      desc: "Direct OEM spare parts fulfillment ensures guaranteed authentic components with fast 24-hour turnaround.",
    },
    {
      title: "Customer & Fleet Lead Routing",
      traditional: "Dependent only on local street walk-ins",
      myev: "Customer App Leads + B2B Delivery Fleet Contracts",
      tradScore: 25,
      myevScore: 92,
      desc: "Continuous lead dispatch through the MY EV SERVICE App alongside commercial fleet AMC partnerships.",
    },
  ];

  // Filter FAQs based on active category
  const filteredFaqs =
    activeFaqCategory === "all"
      ? CATEGORIZED_FAQS
      : CATEGORIZED_FAQS.filter((faq) => faq.category === activeFaqCategory);

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-serif relative overflow-x-hidden">
      {/* Unified Landing Navbar */}
      <Nav />

      {/* Main Container */}
      <div className="relative min-h-screen">
        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0)
           ========================================================================= */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Full-bleed premium background image */}
          <img
            src="/ev-master-workshop-hero.png"
            alt="EV Master Service Workshop Hero"
            className="hero-bg-img w-full h-full object-cover object-center opacity-85 pointer-events-none"
          />
          {/* Subtle Dark Vignette Scrim for crystal clear legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020403] via-transparent to-black/50 pointer-events-none" />

          {/* Hero Content Container (Text & Form - text slowly fades out on scroll) */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-6 md:px-12 pt-6 sm:pt-10 z-10 pointer-events-auto transition-all"
          >
            {/* Left Column: Title & Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-white leading-[1.10] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                Launch Your Own <br />
                <span className="text-[#00D084] font-black drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                  EV Service Franchise
                </span>
              </h1>

              <p className="hero-desc text-sm sm:text-base text-white font-serif font-black leading-relaxed max-w-xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] bg-black/60 backdrop-blur-md p-5 rounded-2xl border border-white/20">
                Launch your own EV service business powered by Autobot OS, India's first AI-powered EV service automation platform. Become part of the fastest-growing EV ecosystem and build a future-ready, high-profit business in 90 days.
              </p>

              <div className="hero-cta flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={scrollToForm}
                  className="px-7 py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer flex items-center gap-2 shadow-2xl"
                >
                  Become a Partner <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    toast.info(
                      "Franchise Brochure download link sent to your mobile/email!"
                    )
                  }
                  className="px-7 py-3.5 rounded-full border border-white/30 bg-black/50 text-white text-xs font-serif font-black uppercase tracking-widest hover:bg-black/70 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md shadow-2xl"
                >
                  <Download className="w-4 h-4 text-[#00D084]" /> Download Franchise Brochure
                </button>
              </div>
            </div>

            {/* Right Column: Premium Glass Form Card */}
            <div
              id="hero-partner-form"
              className="hero-form lg:col-span-5 bg-[#030604]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 relative font-serif border border-white/20 shadow-2xl overflow-hidden"
            >
              {/* Ambient Radial Lighting Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00D084]/20 rounded-full blur-[70px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00D084]/15 rounded-full blur-[60px] pointer-events-none" />

              <div className="mb-4 text-left relative z-10">
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight drop-shadow-md">
                  Become a Partner
                </h3>
                <p className="text-xs text-white/90 font-serif font-extrabold mt-1">
                  Takes less than a minute. No commitment needed.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-3 text-left relative z-10">
                <div>
                  <label className="text-[11px] font-serif font-extrabold text-white block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full bg-black/70 hover:bg-black/85 focus:bg-black/95 rounded-xl px-4 py-2.5 text-xs text-white font-serif font-extrabold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/60 border border-white/25"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-serif font-extrabold text-white block mb-1">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-black/70 hover:bg-black/85 focus:bg-black/95 rounded-xl px-4 py-2.5 text-xs text-white font-serif font-extrabold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/60 border border-white/25"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-serif font-extrabold text-white block mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      className="w-full bg-black/70 hover:bg-black/85 focus:bg-black/95 rounded-xl px-4 py-2.5 text-xs text-white font-serif font-extrabold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/60 border border-white/25"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-serif font-extrabold text-white block mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      placeholder="6-digit PIN"
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      className="w-full bg-black/70 hover:bg-black/85 focus:bg-black/95 rounded-xl px-3 py-2.5 text-xs text-white font-serif font-extrabold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/60 border border-white/25"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-serif font-extrabold text-white block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your city"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-black/70 hover:bg-black/85 focus:bg-black/95 rounded-xl px-3 py-2.5 text-xs text-white font-serif font-extrabold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/60 border border-white/25"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-serif font-extrabold text-white block mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Maharashtra"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full bg-black/70 hover:bg-black/85 focus:bg-black/95 rounded-xl px-3 py-2.5 text-xs text-white font-serif font-extrabold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/60 border border-white/25"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-serif font-extrabold text-white block mb-1">
                    Investment Range *
                  </label>
                  <select
                    value={form.investmentRange}
                    onChange={(e) => setForm({ ...form, investmentRange: e.target.value })}
                    className="w-full bg-black/70 hover:bg-black/85 focus:bg-black/95 rounded-xl px-4 py-2.5 text-xs text-white font-serif font-extrabold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all border border-white/25 cursor-pointer"
                  >
                    <option value="< ₹10 Lakh" className="bg-[#040906] text-white">
                      &lt; ₹10 Lakh (Garage Tier)
                    </option>
                    <option value="₹10L - ₹20L" className="bg-[#040906] text-white">
                      ₹10L – ₹20L (Centre Tier)
                    </option>
                    <option value="> ₹20L" className="bg-[#040906] text-white">
                      &gt; ₹20L (Hub Tier)
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-2xl"
                >
                  Become a Partner <Send className="w-4 h-4" />
                </button>

                <p className="text-[10px] font-serif font-bold text-white/70 leading-tight text-center pt-1">
                  By submitting you agree to be contacted by our franchise team and accept our Franchise Partner Terms & Conditions.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. CARDS OVERLAY LAYER (SLIDES UP DIRECTLY ON TOP OF THE FIXED HERO)
           ========================================================================= */}
        <div
          ref={contentOverlayRef}
          className="relative z-10 bg-[#020403] min-h-screen mt-[calc(100vh-80px)] pt-8 rounded-t-[40px] border-t border-white/10 shadow-2xl"
        >
          {/* =========================================================================
              KEY BADGES SECTION BELOW HERO (RISING UP ANIMATEDLY)
             ========================================================================= */}
          <section ref={cardsUpRef} className="bg-[#020403] py-8 px-6 font-serif rounded-t-[40px]">
            <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                "10+ Years EV R&D",
                "AI Powered Autobot OS",
                "Certified Training",
                "Pan-India Expansion",
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-2.5 text-xs sm:text-sm text-white/90 font-serif font-extrabold bg-[#050907] border border-white/10 px-4 py-3.5 rounded-2xl hover:border-[#00D084]/40 transition-all shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </section>

      {/* =========================================================================
          3. OUR VISION & MISSION EDITORIAL SHOWCASE
         ========================================================================= */}
      <section className="vision-section py-28 px-6 bg-[#020403] font-serif border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="text-center max-w-3xl mx-auto space-y-3"
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 block">
              Vision & Mission
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-white tracking-tight leading-[1.1]">
              Building India's Electric Infrastructure
            </h2>
            <p className="text-white/60 text-xs sm:text-sm font-serif font-light max-w-xl mx-auto leading-relaxed pt-1">
              Powering the transition to zero-emission mobility through automated diagnostic technology and decentralized service hubs.
            </p>
          </motion.div>

          {/* 2-Column Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: Our Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-6 bg-[#060709] border border-white/10 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:border-white/20 transition-all duration-500"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
                    01 / OUR VISION
                  </span>
                  <span className="text-xs font-mono text-white/40">Pan-India Network</span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white leading-snug">
                    India's Largest Multi-Brand EV Service Network
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 font-serif font-light leading-relaxed">
                    The EV revolution is accelerating rapidly, but the service ecosystem remains fragmented. At MY EV SERVICE, we are building a nationwide multi-brand service network powered by Autobot OS — our proprietary AI operating system for EV repair hubs.
                  </p>
                </div>
              </div>

              {/* Bottom Stat Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div>
                  <span className="text-xs font-mono text-white/40 block uppercase tracking-wider">Target Reach</span>
                  <span className="text-lg font-serif font-medium text-white mt-1 block">100+ Master Hubs</span>
                </div>
                <div>
                  <span className="text-xs font-mono text-white/40 block uppercase tracking-wider">Technology</span>
                  <span className="text-lg font-serif font-medium text-white mt-1 block">AI Autobot OS</span>
                </div>
              </div>
            </motion.div>

            {/* Right Card: Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-6 bg-[#050A07] border border-[#00D084]/25 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:border-[#00D084]/40 transition-all duration-500"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#00D084]">
                    02 / OUR MISSION
                  </span>
                  <span className="text-xs font-mono text-[#00D084]">90-Day Execution</span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white leading-snug">
                    Empowering Next-Gen Automotive Entrepreneurs
                  </h3>
                  
                  <div className="border-l-2 border-[#00D084] pl-4 py-1 space-y-2">
                    <p className="text-sm sm:text-base font-serif font-light text-white/90 leading-relaxed italic">
                      "Empower young entrepreneurs, garage owners, and automotive professionals to build high-margin EV service businesses backed by field-tested training and corporate fleet contracts."
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                <span className="text-xs font-mono text-white/50 hidden sm:inline-block">Ready to expand?</span>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-sans font-semibold text-xs uppercase tracking-widest hover:bg-white/90 transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Apply for Franchise</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. PAN-INDIA INTERACTIVE MAP WITH HOVER CARDS FOR CITIES
         ========================================================================= */}
      <section className="map-section py-24 px-6 bg-[#020403] font-serif border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-7xl mx-auto"
        >
          <IndiaFranchiseMap
            onSelectCity={(cityName, stateName) => {
              setForm((prev) => ({ ...prev, city: cityName, state: stateName }));
              scrollToForm();
            }}
          />
        </motion.div>
      </section>

      {/* =========================================================================
          5. STICKY PINNED 90-DAY ANIMATED ONBOARDING HIGHWAY JOURNEY
         ========================================================================= */}
      <FranchiseJourneyRoadmap />

      {/* =========================================================================
          6. TRADITIONAL GARAGE VS MY EV SERVICE HUB EDITORIAL COMPARISON
         ========================================================================= */}
      <section className="comparison-section py-24 px-6 bg-[#020403] font-serif border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="comparison-header-reveal text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 block mb-2">
              Comparative Analysis
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-white tracking-tight">
              Operational Framework
            </h2>
            <p className="text-white/60 text-xs sm:text-sm font-serif font-light mt-3 leading-relaxed">
              An architectural breakdown contrasting traditional independent mechanics against the Autobot OS platform.
            </p>
          </div>

          {/* Feature Category Selector Tabs */}
          <div className="comparison-tabs-reveal flex flex-wrap items-center justify-center gap-2 mb-12">
            {COMPARISON_FEATURES.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedCompFeature(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-sans transition-all cursor-pointer border ${
                  selectedCompFeature === idx
                    ? "bg-white text-black font-semibold border-white"
                    : "bg-white/5 text-white/70 border-white/10 hover:border-white/25 hover:text-white"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Editorial Comparison Cards Grid */}
          <div className="comparison-cards-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: Traditional Workshop */}
            <div className="comparison-card-left lg:col-span-6 bg-[#060709] border border-white/10 rounded-[32px] flex flex-col justify-between overflow-hidden transition-all duration-300">
              {/* Card Top Content */}
              <div className="p-8 sm:p-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
                    CONVENTIONAL WORKSHOP
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    {COMPARISON_FEATURES[selectedCompFeature].tradScore}% Efficiency
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-white/90">
                    Manual & Fragmented Operations
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed font-serif">
                    {COMPARISON_FEATURES[selectedCompFeature].traditional}
                  </p>
                </div>

                {/* Quiet Progress Bar */}
                <div className="pt-2">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white/30"
                      initial={{ width: 0 }}
                      animate={{ width: `${COMPARISON_FEATURES[selectedCompFeature].tradScore}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Full Width Image at Card Bottom */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden mt-auto">
                <img
                  src="/find-services-hero.jpg"
                  alt="Conventional Workshop"
                  className="w-full h-full object-cover grayscale opacity-40 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/40 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#060709] to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-6 text-[11px] font-mono text-white/40">
                  Legacy Infrastructure
                </div>
              </div>
            </div>

            {/* Right Card: MY EV SERVICE Hub */}
            <div className="comparison-card-right lg:col-span-6 bg-[#050B08] border border-[#00D084]/25 rounded-[32px] flex flex-col justify-between overflow-hidden transition-all duration-300">
              {/* Card Top Content */}
              <div className="p-8 sm:p-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#00D084]">
                    MY EV SERVICE HUB
                  </span>
                  <span className="text-xs font-mono text-[#00D084]">
                    {COMPARISON_FEATURES[selectedCompFeature].myevScore}% Efficiency
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-white">
                    Automated & High-Yield Ecosystem
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed font-serif">
                    {COMPARISON_FEATURES[selectedCompFeature].myev}
                  </p>
                </div>

                {/* Quiet Progress Bar */}
                <div className="pt-2">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#00D084]/80"
                      initial={{ width: 0 }}
                      animate={{ width: `${COMPARISON_FEATURES[selectedCompFeature].myevScore}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Full Width Image at Card Bottom */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden mt-auto">
                <img
                  src="/ev-services-hero.jpg"
                  alt="MY EV SERVICE Hub"
                  className="w-full h-full object-cover opacity-75 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B08] via-[#050B08]/40 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050B08] to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-6 text-[11px] font-mono text-[#00D084]">
                  Autobot OS Powered
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Takeaway Banner */}
          <div className="mt-10 bg-[#050706] border border-white/10 rounded-2xl p-6 text-center text-xs sm:text-sm text-white/70 font-serif leading-relaxed">
            <span className="font-semibold text-white">Strategic Takeaway: </span>
            {COMPARISON_FEATURES[selectedCompFeature].desc}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FOUNDING PARTNER OFFER & MODELS MATRIX
         ========================================================================= */}
      <section id="franchise-models" className="models-section py-28 px-6 relative overflow-hidden bg-[#020403]">
        {/* Glowing radial backdrops matching the screenshot */}
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-blue-950/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-cyan-950/15 rounded-full blur-[180px] pointer-events-none" />
        
        {/* Giant background text matching the screenshot */}
        <div className="models-bg-text absolute top-[15%] left-0 right-0 text-center select-none pointer-events-none text-white/[0.02] font-sans font-black uppercase text-[12vw] sm:text-[15vw] leading-none tracking-[0.15em] z-0">
          MODELS
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Banner: Founding Partner Offer */}
          <div className="models-banner-reveal bg-[#00D084]/15 border-2 border-[#00D084] rounded-3xl p-8 mb-16 text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-2 bg-[#00D084] text-[#020403] text-[10px] font-serif font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" /> LIMITED OFFER
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif font-extrabold text-white mb-2 leading-tight">
              Founding Partner - Launch Phase Offer (Pune)
            </h3>
            <p className="text-sm sm:text-base text-white/80 max-w-3xl mx-auto leading-relaxed font-serif font-light">
              Save ₹2L on CENTRE or ₹5L on HUB. Autobot OS free for 2 years. Revenue share at 10% (vs 15% standard) for 2 years. 5km exclusive territory. Limited to first 10 partners only.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs font-serif font-bold text-[#00D084]">
              <span>Zero Franchise Fee</span> • <span>100% Investment in Business Setup</span> • <span>Quarterly Settlement</span>
            </div>
          </div>

          <div className="models-header-reveal text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
              Franchise Models
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 mb-4 tracking-tight">
              Choose the Model That Fits Your Vision
            </h2>
          </div>

          <div className="model-cards-grid grid grid-cols-1 lg:grid-cols-3 gap-8 [perspective:1200px]">
            {DETAILED_FRANCHISE_MODELS.map((model) => (
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={model.type}
                onClick={() => setDetailsModalModel(model)}
                className={`model-card-reveal bg-gradient-to-b from-white/[0.03] to-white/[0.002] border backdrop-blur-xl rounded-[32px] p-8 flex flex-col justify-between transition-all duration-300 relative font-serif cursor-pointer ${
                  model.popular
                    ? "border-[#00D084]/50 shadow-[0_0_35px_rgba(0,208,132,0.22)]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {model.badge && (
                  <div className="absolute top-4 right-4 bg-[#00D084] text-[#020403] text-[9px] font-serif font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                    {model.badge}
                  </div>
                )}

                <div className="flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="text-left">
                      <span className="text-xs font-bold text-[#00D084]/80 block uppercase tracking-wider mb-1">
                        {model.name}
                      </span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-white block tracking-tight">
                        {model.investment}
                      </span>
                      {model.originalInvestment && (
                        <span className="text-xs text-white/40 line-through block mt-0.5">
                          Standard: {model.originalInvestment}
                        </span>
                      )}
                      {model.foundingOffer && (
                        <span className="text-xs font-bold text-[#00D084] block mt-1">
                          {model.foundingOffer}
                        </span>
                      )}
                      <p className="text-xs text-white/60 leading-relaxed mt-3 mb-0">
                        {model.subtitle}
                      </p>
                    </div>

                    {/* Separator line */}
                    <div className="h-[1px] bg-white/10 my-4" />

                    {/* Required Details HUD */}
                    <div className="space-y-2.5 text-xs text-white/70">
                      <div className="flex justify-between">
                        <span className="text-white/40 uppercase tracking-wider">Required Area:</span>
                        <span className="text-white font-bold">{model.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40 uppercase tracking-wider">Service Bays:</span>
                        <span className="text-white font-bold">{model.bays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40 uppercase tracking-wider">Vehicle Focus:</span>
                        <span className="text-white font-bold">{model.vehicles}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-4">
                    {/* Centered button matching the screenshot */}
                    <div className="flex justify-center w-full">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedModel(model);
                          let investmentVal = "₹10L - ₹20L";
                          if (model.type === "garage") {
                            investmentVal = "< ₹10 Lakh";
                          } else if (model.type === "hub") {
                            investmentVal = "> ₹20L";
                          }
                          setForm((prev) => ({ ...prev, investmentRange: investmentVal }));
                          scrollToForm();
                        }}
                        className="w-full bg-white text-black font-extrabold text-xs py-3 px-8 rounded-full hover:bg-white/90 transition-all shadow-md cursor-pointer text-center"
                      >
                        Apply for {model.name}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BRAND COLLABORATIONS & PR MEDIA SHOWCASE (EDITORIAL SHOWCASE)
         ========================================================================= */}
      <section className="brand-collaborations-section py-24 px-6 bg-[#020403] font-serif border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 block mb-2">
              Strategic Ecosystem
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-white tracking-tight">
              OEM Collaborations & Media
            </h2>
            <p className="text-white/60 text-xs sm:text-sm font-serif font-light mt-3 leading-relaxed">
              Strategic partnerships, fleet MoUs, and national media coverage highlighting MY EV SERVICE expansion.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Premium 3x3 Bento Brand Tile Grid */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between px-1 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                  Partner Ecosystem (3x3 Grid)
                </span>
                <span className="text-[10px] font-mono text-white/50">
                  Select brand to view specs
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {BRAND_COLLABORATIONS.map((brand) => {
                  const isSelected = selectedBrandId === brand.id;
                  const isFlipped = flippedBrandId === brand.id;
                  return (
                    <div
                      key={brand.id}
                      className="h-32 sm:h-36 cursor-pointer"
                      style={{ perspective: 1000 }}
                      onClick={() => {
                        setSelectedBrandId(brand.id);
                        setFlippedBrandId(isFlipped ? null : brand.id);
                      }}
                    >
                      <motion.div
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        style={{ transformStyle: "preserve-3d" }}
                        className={`relative w-full h-full rounded-2xl border transition-all ${
                          isSelected
                            ? "bg-[#08120C] border-white/40 shadow-xl ring-1 ring-white/20"
                            : "bg-[#06080A] border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
                        }`}
                      >
                        {/* Front Side: Category Tag, Logo & Brand Name */}
                        <div
                          style={{ backfaceVisibility: "hidden" }}
                          className="absolute inset-0 p-3 flex flex-col items-center justify-between text-center rounded-2xl"
                        >
                          <div className="w-full flex items-center justify-between text-[8px] font-mono text-white/40 uppercase tracking-wider">
                            <span className="truncate">{brand.category.split(" ")[0]}</span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" />
                            )}
                          </div>

                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-black border border-white/15 p-2 flex items-center justify-center shadow-inner">
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="w-full h-full object-contain rounded-md"
                            />
                          </div>

                          <span className="text-[11px] sm:text-xs font-serif font-medium text-white truncate w-full">
                            {brand.name}
                          </span>
                        </div>

                        {/* Back Side: Specs Overview */}
                        <div
                          style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                          }}
                          className="absolute inset-0 p-3 bg-[#07130D] border border-white/30 rounded-2xl flex flex-col justify-between text-left"
                        >
                          <div>
                            <span className="text-[9px] font-mono font-semibold text-[#00D084] uppercase block mb-1 truncate border-b border-white/10 pb-0.5">
                              {brand.name}
                            </span>
                            <div className="space-y-1 pt-0.5">
                              {brand.flipStats.slice(0, 2).map((st, i) => (
                                <div key={i} className="text-[8px] sm:text-[9px] font-mono">
                                  <span className="text-white/50 block truncate">{st.label}</span>
                                  <span className="text-white font-semibold truncate">{st.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <span className="text-[8px] font-mono text-[#00D084] uppercase tracking-wider block text-right">
                            Active ✓
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected Brand Media Showcase Panel */}
            <div className="lg:col-span-7 bg-[#050806] border border-white/10 rounded-[32px] p-6 sm:p-10 space-y-8">
              {(() => {
                const activeBrand =
                  BRAND_COLLABORATIONS.find((b) => b.id === selectedBrandId) ||
                  BRAND_COLLABORATIONS[0];
                return (
                  <div className="space-y-8">
                    {/* Brand Profile Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-black border border-white/20 p-2 shrink-0 flex items-center justify-center">
                          <img
                            src={activeBrand.logo}
                            alt={activeBrand.name}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-serif font-medium text-white">
                              {activeBrand.name}
                            </h3>
                            <span className="text-[10px] font-mono text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/30 px-2.5 py-0.5 rounded-full">
                              {activeBrand.category}
                            </span>
                          </div>
                          <p className="text-xs text-white/60 font-serif font-light mt-1.5 leading-relaxed">
                            {activeBrand.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Partnership Specs */}
                    <div className="grid grid-cols-3 gap-3">
                      {activeBrand.flipStats.map((st, i) => (
                        <div
                          key={i}
                          className="bg-black/50 border border-white/10 rounded-2xl p-3.5 text-left"
                        >
                          <span className="text-[10px] font-mono text-white/40 block truncate">
                            {st.label}
                          </span>
                          <span className="text-xs sm:text-sm font-mono font-semibold text-white mt-1 block truncate">
                            {st.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* PR & Media Coverage Articles */}
                    <div className="space-y-4 pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block">
                        Media & Press Coverage
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeBrand.mediaShowcase.map((item) => (
                          <div
                            key={item.id}
                            className="bg-[#070A08] border border-white/10 rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col justify-between"
                          >
                            <div>
                              <div className="relative h-40 w-full overflow-hidden">
                                <img
                                  src={item.img}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                                />
                                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-white/15 text-[9px] font-mono text-white/70 px-2.5 py-1 rounded-md">
                                  {item.tag}
                                </div>
                                <div className="absolute bottom-3 right-3 bg-black/80 text-[9px] font-mono text-white/50 px-2 py-0.5 rounded">
                                  {item.date}
                                </div>
                              </div>

                              <div className="p-4">
                                <h5 className="text-xs font-serif font-medium text-white/90 leading-snug line-clamp-2">
                                  {item.title}
                                </h5>
                              </div>
                            </div>

                            <div className="p-4 pt-0">
                              <a
                                href={item.prUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/70 hover:text-white transition-colors"
                              >
                                <span>Read Media Article</span>
                                <ArrowRight className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. DUAL OPPOSITE MOVING MARQUEE REVIEWS & VIDEO INTERVIEWS
         ========================================================================= */}
      <section className="testimonials-section py-24 bg-[#020403] font-serif overflow-hidden relative border-t border-white/10">
        <div className="testimonials-header-reveal max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 block mb-2">
            Verified Partner Reviews
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-normal text-white tracking-tight">
            What Our Partners Say
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-serif font-light mt-3 max-w-xl mx-auto leading-relaxed">
            Real revenue milestones, payback timelines, and operational feedback from active MY EV SERVICE hub owners.
          </p>
        </div>

        {/* Dual Marquee Container (Hover to Pause) */}
        <div className="marquee-container space-y-12 relative">
          {/* Gradient Blur Edges Overlay */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#020403] via-[#020403]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#020403] via-[#020403]/80 to-transparent z-10 pointer-events-none" />

          {/* Row 1: One-Liner Partner Reviews Marquee */}
          <div className="flex overflow-hidden py-2">
            <div className="animate-marquee-left flex gap-8">
              {[...PARTNER_TESTIMONIALS_ROW1, ...PARTNER_TESTIMONIALS_ROW1].map(
                (partner, idx) => (
                  <div
                    key={`row1-${partner.id}-${idx}`}
                    className="w-[380px] sm:w-[460px] md:w-[500px] shrink-0 bg-[#06080A] border border-white/10 hover:border-white/25 rounded-[32px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl group hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="space-y-4">
                      {/* Top Header: Avatar + Author + Rating */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${partner.avatarBg} border border-white/20 flex items-center justify-center text-white font-serif font-bold text-base shadow-md shrink-0`}
                          >
                            {partner.author.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm sm:text-base font-serif font-medium text-white group-hover:text-white/90 transition-colors truncate">
                              {partner.author}
                            </h4>
                            <p className="text-xs font-mono text-white/50 truncate mt-0.5">
                              {partner.role} • <span className="text-white/80">{partner.city}</span>
                            </p>
                          </div>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 text-amber-400 shrink-0">
                          {[...Array(partner.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Editorial Headline */}
                      <h5 className="text-base sm:text-lg font-serif font-medium text-white leading-snug pt-1">
                        "{partner.headline}"
                      </h5>

                      {/* Quote Body */}
                      <p className="text-xs sm:text-sm text-white/70 font-serif font-light leading-relaxed">
                        {partner.quote}
                      </p>
                    </div>

                    {/* Bottom Stat Pill */}
                    <div className="pt-4 mt-6 border-t border-white/10 flex justify-between items-center text-xs font-mono">
                      <span className="text-white/40">Verified Franchise Partner</span>
                      <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-white font-semibold">
                        {partner.stats}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Row 2: Partner Video Interviews & Case Studies 3D Curved Fan Arc */}
      <FranchiseVideoCurvedFan onSelectVideo={setActiveVideo} />

      {/* =========================================================================
          DEVELOPED EV WORKSHOP CENTERS GALLERY SECTION
         ========================================================================= */}
      <FranchiseWorkshopsGallery />

      {/* =========================================================================
          9. CATEGORIZED FAQS ACCORDION
         ========================================================================= */}
      <section className="faq-section py-24 px-6 bg-[#020403] font-serif">
        <div className="max-w-4xl mx-auto">
          <div className="faq-header-reveal text-center mb-12">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
              FAQ & Guidance
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 text-sm font-serif font-light">
              Select a topic category below to filter questions
            </p>

            {/* Categorized Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveFaqCategory(cat.id);
                    setOpenFaqIdx(0);
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs font-serif font-bold transition-all cursor-pointer border ${
                    activeFaqCategory === cat.id
                      ? "bg-[#00D084] text-[#020403] border-[#00D084] scale-105 shadow-[0_0_15px_rgba(0,208,132,0.3)]"
                      : "bg-[#050907] text-white/70 border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="faq-list-reveal space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="faq-item-reveal bg-[#050907] border border-white/10 rounded-2xl overflow-hidden font-serif transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="text-base font-serif font-bold text-white leading-snug">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#00D084] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/50 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-xs sm:text-sm text-white/70 font-serif font-light leading-relaxed border-t border-white/5 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

        {/* Close Content Overlay Layer */}
        </div>
      {/* Close Main Relative Container */}
      </div>

      {/* Partner Video Interview Playback Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#080f0b] border border-[#00D084]/40 rounded-3xl p-6 max-w-3xl w-full space-y-4 shadow-2xl relative font-serif"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#00D084] uppercase tracking-widest block">
                    Partner Case Study Video • {activeVideo.duration}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white leading-tight mt-1">
                    {activeVideo.videoTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Container */}
              <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 aspect-video flex items-center justify-center">
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Video Meta Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
                <div>
                  <span className="text-white font-bold block">{activeVideo.partnerName} ({activeVideo.role})</span>
                  <span className="text-white/50">{activeVideo.city} • {activeVideo.model}</span>
                </div>
                <span className="text-[#00D084] font-extrabold bg-[#00D084]/15 border border-[#00D084]/30 px-3 py-1 rounded-full text-center">
                  {activeVideo.statBadge}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Franchise Model Details Modal */}
      <AnimatePresence>
        {detailsModalModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setDetailsModalModel(null)}
          >
            <motion.div
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-gradient-to-b from-[#07120a] to-[#040805] border border-[#00D084]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,208,132,0.15)] font-serif md:overflow-visible overflow-y-auto max-h-[95vh] z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setDetailsModalModel(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Glowing Accent Ring in background */}
              <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#00D084]/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-900/10 rounded-full blur-[60px] pointer-events-none" />

              {/* Modal Content - 2 Columns on desktop to fit without scrolling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10 text-left">
                {/* Left Column: Info & Stats */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#00D084] uppercase tracking-widest bg-[#00D084]/10 px-3 py-0.5 rounded-full border border-[#00D084]/20 font-sans">
                        {detailsModalModel.type.toUpperCase()} MODEL
                      </span>
                      {detailsModalModel.badge && (
                        <span className="text-[9px] font-bold text-white bg-[#00D084] px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                          {detailsModalModel.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {detailsModalModel.name}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed font-light">
                      {detailsModalModel.subtitle}
                    </p>
                  </div>

                  {/* Main Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 bg-black/40 border border-white/10 rounded-2xl p-3 sm:p-4 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-white/40 uppercase tracking-wider block font-sans">Investment</span>
                      <span className="text-sm font-bold text-white block truncate">{detailsModalModel.investment}</span>
                      {detailsModalModel.originalInvestment && (
                        <span className="text-[9px] text-white/30 line-through block truncate">{detailsModalModel.originalInvestment}</span>
                      )}
                    </div>
                    <div className="space-y-0.5 border-l border-white/10 pl-3">
                      <span className="text-[9px] text-white/40 uppercase tracking-wider block font-sans">Required Area</span>
                      <span className="text-sm font-bold text-[#00D084] block truncate">{detailsModalModel.area}</span>
                      <span className="text-[9px] text-white/50 block">5km radius</span>
                    </div>
                    <div className="space-y-0.5 border-l border-white/10 pl-3">
                      <span className="text-[9px] text-white/40 uppercase tracking-wider block font-sans">Setup/Bays</span>
                      <span className="text-sm font-bold text-white block truncate">{detailsModalModel.bays}</span>
                      <span className="text-[9px] text-white/50 block truncate font-sans">{detailsModalModel.vehicles}</span>
                    </div>
                  </div>

                  {/* Offer Details if present */}
                  {detailsModalModel.foundingOffer && (
                    <div className="bg-[#00D084]/10 border border-[#00D084]/20 rounded-2xl p-3 sm:p-4 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[11px] font-bold text-[#00D084] uppercase tracking-wider">Founding Partner Benefit</h4>
                        <p className="text-[10px] sm:text-[11px] text-white/90 mt-0.5 font-light leading-relaxed">
                          {detailsModalModel.foundingOffer}. Plus, enjoy 2 years of free Autobot OS setup and a reduced revenue share model.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* More Details / Additional Setup Services */}
                  <div className="bg-black/50 border border-white/5 rounded-2xl p-3 sm:p-4 space-y-3 text-[11px] text-white/80">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <span className="font-bold text-white block text-[11px]">Autobot OS Integration</span>
                        <span className="text-white/50 block mt-0.5 text-[10px] leading-snug">Automated lead routing, live diagnostics, parts ordering & accounting.</span>
                      </div>
                      <span className="text-[#00D084] font-bold shrink-0 text-[11px] font-sans">{detailsModalModel.osSavings}</span>
                    </div>
                    <div className="h-[1px] bg-white/5" />
                    <div>
                      <span className="font-bold text-white block text-[11px]">Target Partners & Best Fit</span>
                      <span className="text-white/50 block mt-0.5 text-[10px] leading-snug">{detailsModalModel.bestFor}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Inclusions & CTA */}
                <div className="flex flex-col justify-between space-y-4">
                  {/* Package Highlights (Detailed list of inclusions) */}
                  <div className="space-y-2.5">
                    <h4 className="text-[11px] font-bold text-white/70 uppercase tracking-widest flex items-center gap-2 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084]" />
                      Included in Package Setup
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] sm:text-[11px]">
                      {detailsModalModel.includes.map((inc, i) => (
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
                      onClick={() => {
                        setSelectedModel(detailsModalModel);
                        let investmentVal = "₹10L - ₹20L";
                        if (detailsModalModel.type === "garage") {
                          investmentVal = "< ₹10 Lakh";
                        } else if (detailsModalModel.type === "hub") {
                          investmentVal = "> ₹20L";
                        }
                        setForm((prev) => ({ ...prev, investmentRange: investmentVal }));
                        setDetailsModalModel(null);
                        scrollToForm();
                      }}
                      className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-[#00D084] text-[#020403] text-xs font-bold uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer text-center font-serif"
                    >
                      Apply for {detailsModalModel.name}
                    </button>
                    <button
                      onClick={() => setDetailsModalModel(null)}
                      className="w-full sm:w-auto py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer text-center font-serif"
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
