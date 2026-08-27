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
import { FranchiseSetupDrawer } from "../components/FranchiseSetupDrawer";
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

  // Setup Breakdown Right Drawer state
  const [drawerModel, setDrawerModel] = useState<DetailedFranchiseModel | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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
          {/* Full-bleed background image - No shadow/overlay, 100% crystal clear */}
          <img
            src="/ev-franchise-hero.jpg"
            alt="EV Service Workshop Hero"
            className="hero-bg-img w-full h-full object-cover object-center opacity-100 pointer-events-none"
          />

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
          3. OUR VISION & MISSION SECTION
         ========================================================================= */}
          <section className="vision-section py-24 px-6 bg-[#020403] font-serif">
            <div className="max-w-4xl mx-auto text-center">
              <span className="vision-reveal text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] block mb-2">
                Our Vision
              </span>
              <h2 className="vision-reveal text-3xl md:text-5xl font-serif font-extrabold text-white mb-6 leading-tight">
                We Are Building India's Largest EV Service Network
              </h2>
              <p className="vision-reveal text-white/70 text-base md:text-lg leading-relaxed font-serif font-light mb-6">
                The EV revolution is accelerating rapidly, but the service ecosystem is still fragmented. At MY EV SERVICE, we are building a pan-India multi-brand EV service network powered by our proprietary Autobot OS, an AI-powered digital operating system for EV service businesses.
              </p>
              <div className="vision-reveal bg-[#050907] border border-[#00D084]/30 rounded-2xl p-6 text-left my-8 space-y-2">
                <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#00D084]">
                  Our Mission is Simple:
                </span>
                <p className="text-lg font-serif font-bold text-white leading-snug">
                  Empower the next generation of entrepreneurs to build successful EV businesses while creating India's most trusted EV service infrastructure.
                </p>
              </div>
              <p className="vision-reveal text-white/60 text-sm md:text-base leading-relaxed font-serif font-light mb-8">
                We are inviting young entrepreneurs, garage owners, investors, and automotive professionals to join our network and launch their own EV service business with a field-tested, technology-driven 90-day model.
              </p>

              <button
                onClick={scrollToForm}
                className="vision-reveal px-8 py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer"
              >
                Apply for Franchise Opportunity
              </button>
            </div>
          </section>

          {/* =========================================================================
          4. PAN-INDIA INTERACTIVE MAP WITH HOVER CARDS FOR CITIES
         ========================================================================= */}
          <section className="py-24 px-6 bg-[#020403] font-serif">
            <div className="max-w-7xl mx-auto">
              <IndiaFranchiseMap
                onSelectCity={(cityName, stateName) => {
                  setForm((prev) => ({ ...prev, city: cityName, state: stateName }));
                  scrollToForm();
                }}
              />
            </div>
          </section>

          {/* =========================================================================
          5. STICKY PINNED 90-DAY ANIMATED ONBOARDING HIGHWAY JOURNEY
         ========================================================================= */}
          <FranchiseJourneyRoadmap />

          {/* =========================================================================
          6. TRADITIONAL GARAGE VS MY EV SERVICE HUB INTERACTIVE COMPARISON
         ========================================================================= */}
          <section className="comparison-section py-24 px-6 bg-[#020403] font-serif">
            <div className="max-w-7xl mx-auto">
              <div className="comparison-header-reveal text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] flex items-center justify-center gap-1.5">
                  <ArrowLeftRight className="w-4 h-4" /> Interactive Comparison Matrix
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 mb-4 tracking-tight">
                  Traditional Garage vs. MY EV SERVICE Hub
                </h2>
                <p className="text-white/70 text-base font-serif font-light">
                  Hover & click on any feature category to inspect live visual score metrics comparing traditional mechanics with our AI Autobot OS.
                </p>
              </div>

              {/* Feature Category Selector Tabs */}
              <div className="comparison-tabs-reveal flex flex-wrap items-center justify-center gap-2.5 mb-10">
                {COMPARISON_FEATURES.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCompFeature(idx)}
                    className={`px-4 py-3 rounded-2xl text-xs font-serif font-bold transition-all cursor-pointer border ${selectedCompFeature === idx
                      ? "bg-[#00D084] text-[#020403] border-[#00D084] scale-105 shadow-[0_0_15px_rgba(0,208,132,0.4)]"
                      : "bg-[#050907] text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                      }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              {/* Interactive Comparison Visual Display */}
              <div className="comparison-cards-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left: Traditional Garage Breakdown */}
                <div className="comparison-card-left lg:col-span-6 bg-red-950/20 border-2 border-red-500/30 hover:border-red-500/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 font-serif overflow-hidden">
                  <div className="space-y-5">
                    {/* Visual Image Header */}
                    <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-red-500/20 group">
                      <img
                        src="/find-services-hero.jpg"
                        alt="Traditional Garage Visual"
                        className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-red-950/60 to-transparent" />
                      <div className="absolute top-3 left-3 bg-red-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md">
                        Manual Operations
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-red-200">
                        <span>Diagnostic Tools: <strong>None</strong></span>
                        <span className="text-red-400 font-bold">Uncertified SOPs</span>
                      </div>
                    </div>

<<<<<<< HEAD
          {/* Feature Context Description Banner */}
          <div className="mt-8 bg-[#050907] border border-white/15 rounded-2xl p-6 text-center text-xs sm:text-sm text-white/80 font-serif">
            <span className="font-bold text-[#00D084]">Key Takeaway: </span>
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
=======
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                        OLD ERA TRADITIONAL GARAGE
>>>>>>> a61aef851eb607cfc920cc0c48387458b6e80724
                      </span>
                      <span className="text-xs font-serif font-bold text-red-400">
                        Score: {COMPARISON_FEATURES[selectedCompFeature].tradScore}/100
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                      Fragmented & Manual Operations
                    </h3>

                    <div className="bg-[#020503] border border-white/10 rounded-2xl p-4 space-y-2">
                      <span className="text-[11px] text-white/50 block font-serif">
                        CURRENT FEATURE STATUS:
                      </span>
                      <p className="text-sm font-serif font-bold text-red-300 flex items-start gap-2">
                        <span className="text-red-400 font-black">✕</span>
                        <span>{COMPARISON_FEATURES[selectedCompFeature].traditional}</span>
                      </p>
                    </div>
                  </div>

<<<<<<< HEAD
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
          BRAND COLLABORATIONS & PR MEDIA SHOWCASE (3D FLIP LOGOS)
         ========================================================================= */}
      <section className="brand-collaborations-section py-24 px-6 bg-[#030604] border-t border-white/10 font-serif relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Strategic Ecosystem Partnerships
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 mb-4 tracking-tight">
              OEM Collaborations & PR Media Coverage
            </h2>
            <p className="text-white/70 text-xs sm:text-sm font-serif font-light">
              Click any brand logo to flip for quick partnership specs and explore relevant PR articles, group photos & joint initiatives on the right.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Premium 3x3 Bento Flip Card Logo Grid */}
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#00D084]" />
                  Partner Ecosystem (3x3 Grid)
                </span>
                <span className="text-[10px] text-[#00D084] font-mono bg-[#00D084]/10 border border-[#00D084]/30 px-2 py-0.5 rounded-full">
                  Click logo card to flip 3D ↻
                </span>
              </div>

              {/* 3x3 Grid of 9 Premium Brand Cards */}
              <div className="grid grid-cols-3 gap-3 sm:gap-3.5">
                {BRAND_COLLABORATIONS.map((brand) => {
                  const isSelected = selectedBrandId === brand.id;
                  const isFlipped = flippedBrandId === brand.id;
                  return (
                    <div
                      key={brand.id}
                      className="h-36 sm:h-40 cursor-pointer"
                      style={{ perspective: 1000 }}
                    >
                      <motion.div
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        style={{ transformStyle: "preserve-3d" }}
                        onClick={() => {
                          setSelectedBrandId(brand.id);
                          setFlippedBrandId(isFlipped ? null : brand.id);
                        }}
                        className={`relative w-full h-full rounded-2xl ${
                          isSelected
                            ? "border-2 border-[#00D084] shadow-[0_0_25px_rgba(0,208,132,0.35)] bg-gradient-to-b from-[#07160d] to-[#040906]"
                            : "border border-white/10 hover:border-white/30 bg-[#050907] hover:bg-white/[0.04]"
                        }`}
                      >
                        {/* Front Side: Logo, Name & Category */}
                        <div
                          style={{ backfaceVisibility: "hidden" }}
                          className="absolute inset-0 p-2.5 sm:p-3 flex flex-col items-center justify-between rounded-2xl"
                        >
                          <div className="w-full flex items-center justify-between">
                            <span className="text-[8px] sm:text-[9px] font-mono text-white/40 uppercase tracking-tight truncate">
                              {brand.category}
                            </span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] shadow-[0_0_8px_#00D084] animate-pulse" />
                            )}
                          </div>

                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-black/60 border border-white/10 p-1.5 flex items-center justify-center transition-transform hover:scale-105 shadow-inner">
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="w-full h-full object-contain rounded-lg"
                            />
                          </div>

                          <div className="text-center w-full">
                            <span className="text-[11px] sm:text-xs font-bold text-white block truncate hover:text-[#00D084] transition-colors leading-tight">
                              {brand.name}
                            </span>
                            <span className="text-[8px] text-[#00D084] block font-mono">
                              Inspect ↻
                            </span>
=======
                  {/* Visual Metric Score Bar */}
                  <div className="space-y-1.5 pt-4">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Efficiency & Tech Rating</span>
                      <span className="text-red-400 font-bold">
                        {COMPARISON_FEATURES[selectedCompFeature].tradScore}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-red-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${COMPARISON_FEATURES[selectedCompFeature].tradScore}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right: MY EV SERVICE Hub Breakdown */}
                <div className="comparison-card-right lg:col-span-6 bg-[#00D084]/10 border-2 border-[#00D084] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 font-serif shadow-[0_0_35px_rgba(0,208,132,0.2)] overflow-hidden">
                  <div className="space-y-5">
                    {/* Visual Image Header */}
                    <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-[#00D084]/40 group">
                      <img
                        src="/ev-services-hero.jpg"
                        alt="MY EV SERVICE Visual"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#04120a] via-[#04120a]/50 to-transparent" />
                      <div className="absolute top-3 left-3 bg-[#00D084] text-[#020403] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-[0_0_12px_#00D084]">
                        AI Diagnostic Bay
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#00D084]">
                        <span>Autobot OS: <strong>Online</strong></span>
                        <span className="text-white font-bold">100% Certified SOPs</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif font-bold text-[#00D084] uppercase tracking-widest bg-[#00D084]/20 px-3 py-1 rounded-full border border-[#00D084]/40">
                        AI AUTOBOT OS POWERED HUB
                      </span>
                      <span className="text-xs font-serif font-bold text-[#00D084]">
                        Score: {COMPARISON_FEATURES[selectedCompFeature].myevScore}/100
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                      Automated & High-Yield EV Ecosystem
                    </h3>

                    <div className="bg-[#020503] border border-[#00D084]/30 rounded-2xl p-4 space-y-2">
                      <span className="text-[11px] text-[#00D084] block font-serif font-bold">
                        AUTOBOT OS ADVANTAGE:
                      </span>
                      <p className="text-sm font-serif font-bold text-white flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                        <span>{COMPARISON_FEATURES[selectedCompFeature].myev}</span>
                      </p>
                    </div>
                  </div>

                  {/* Visual Metric Score Bar */}
                  <div className="space-y-1.5 pt-4">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Efficiency & Tech Rating</span>
                      <span className="text-[#00D084] font-bold">
                        {COMPARISON_FEATURES[selectedCompFeature].myevScore}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#00D084] rounded-full shadow-[0_0_12px_#00D084]"
                        initial={{ width: 0 }}
                        animate={{ width: `${COMPARISON_FEATURES[selectedCompFeature].myevScore}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Context Description Banner */}
              <div className="mt-8 bg-[#050907] border border-white/15 rounded-2xl p-6 text-center text-xs sm:text-sm text-white/80 font-serif">
                <span className="font-bold text-[#00D084]">Key Takeaway: </span>
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
                    className={`model-card-reveal bg-gradient-to-b from-white/[0.03] to-white/[0.002] border backdrop-blur-xl rounded-[32px] p-8 flex flex-col justify-between transition-all duration-300 relative font-serif ${model.popular
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

                        {/* Separator line */}
                        <div className="h-[1px] bg-white/10 my-4" />

                        {/* Action Trigger for Included Setup Breakdown Drawer */}
                        <div className="pt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDrawerModel(model);
                              setDrawerOpen(true);
                            }}
                            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00D084]/15 via-white/[0.04] to-white/[0.02] hover:from-[#00D084]/25 hover:to-white/[0.08] border border-[#00D084]/30 hover:border-[#00D084] text-xs font-serif font-bold text-white hover:text-[#00D084] flex items-center justify-between transition-all duration-300 shadow-[0_0_20px_rgba(0,208,132,0.08)] hover:shadow-[0_0_25px_rgba(0,208,132,0.2)] cursor-pointer group"
                          >
                            <span className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-[#00D084] group-hover:rotate-12 transition-transform" />
                              View Included Setup ({model.includes.length} Items)
                            </span>
                            <ArrowRight className="w-4 h-4 text-[#00D084] group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8 flex flex-col gap-4">
                        <div className="bg-[#00D084]/10 border border-[#00D084]/20 rounded-xl p-3 text-xs text-[#00D084] text-center font-bold">
                          {model.osSavings}
                        </div>

                        <p className="text-[11px] text-white/40 italic text-center mb-2">
                          Best for: {model.bestFor}
                        </p>

                        {/* Centered button matching the screenshot */}
                        <div className="flex justify-center w-full">
                          <button
                            onClick={() => {
                              setSelectedModel(model);
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
          BRAND COLLABORATIONS & PR MEDIA SHOWCASE (3D FLIP LOGOS)
         ========================================================================= */}
          <section className="brand-collaborations-section py-24 px-6 bg-[#030604] border-t border-white/10 font-serif relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Strategic Ecosystem Partnerships
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 mb-4 tracking-tight">
                  OEM Collaborations & PR Media Coverage
                </h2>
                <p className="text-white/70 text-xs sm:text-sm font-serif font-light">
                  Click any brand logo to flip for quick partnership specs and explore relevant PR articles, group photos & joint initiatives on the right.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left: Premium 3x3 Bento Flip Card Logo Grid */}
                <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#00D084]" />
                      Partner Ecosystem (3x3 Grid)
                    </span>
                    <span className="text-[10px] text-[#00D084] font-mono bg-[#00D084]/10 border border-[#00D084]/30 px-2 py-0.5 rounded-full">
                      Click logo card to flip 3D ↻
                    </span>
                  </div>

                  {/* 3x3 Grid of 9 Premium Brand Cards */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-3.5">
                    {BRAND_COLLABORATIONS.map((brand) => {
                      const isSelected = selectedBrandId === brand.id;
                      const isFlipped = flippedBrandId === brand.id;
                      return (
                        <div
                          key={brand.id}
                          className="h-36 sm:h-40 cursor-pointer"
                          style={{ perspective: 1000 }}
                        >
                          <motion.div
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                            style={{ transformStyle: "preserve-3d" }}
                            onClick={() => {
                              setSelectedBrandId(brand.id);
                              setFlippedBrandId(isFlipped ? null : brand.id);
                            }}
                            className={`relative w-full h-full rounded-2xl ${isSelected
                              ? "border-2 border-[#00D084] shadow-[0_0_25px_rgba(0,208,132,0.35)] bg-gradient-to-b from-[#07160d] to-[#040906]"
                              : "border border-white/10 hover:border-white/30 bg-[#050907] hover:bg-white/[0.04]"
                              }`}
                          >
                            {/* Front Side: Logo, Name & Category */}
                            <div
                              style={{ backfaceVisibility: "hidden" }}
                              className="absolute inset-0 p-2.5 sm:p-3 flex flex-col items-center justify-between rounded-2xl"
                            >
                              <div className="w-full flex items-center justify-between">
                                <span className="text-[8px] sm:text-[9px] font-mono text-white/40 uppercase tracking-tight truncate">
                                  {brand.category}
                                </span>
                                {isSelected && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] shadow-[0_0_8px_#00D084] animate-pulse" />
                                )}
                              </div>

                              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-black/60 border border-white/10 p-1.5 flex items-center justify-center transition-transform hover:scale-105 shadow-inner">
                                <img
                                  src={brand.logo}
                                  alt={brand.name}
                                  className="w-full h-full object-contain rounded-lg"
                                />
                              </div>

                              <div className="text-center w-full">
                                <span className="text-[11px] sm:text-xs font-bold text-white block truncate hover:text-[#00D084] transition-colors leading-tight">
                                  {brand.name}
                                </span>
                                <span className="text-[8px] text-[#00D084] block font-mono">
                                  Inspect ↻
                                </span>
                              </div>
                            </div>

                            {/* Back Side: Partnership Specs */}
                            <div
                              style={{
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                              }}
                              className="absolute inset-0 p-3 bg-[#08130c] border border-[#00D084]/50 rounded-2xl flex flex-col justify-between text-left"
                            >
                              <div>
                                <span className="text-[9px] sm:text-[10px] font-bold text-[#00D084] uppercase tracking-wider block mb-1 border-b border-[#00D084]/20 pb-0.5 truncate">
                                  {brand.name} Specs
                                </span>
                                <div className="space-y-1 pt-1">
                                  {brand.flipStats.map((st, i) => (
                                    <div key={i} className="flex justify-between items-center text-[8px] sm:text-[9px]">
                                      <span className="text-white/60 truncate">{st.label}:</span>
                                      <span className="text-white font-bold shrink-0">{st.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <button
                                type="button"
                                className="w-full bg-[#00D084] text-black text-[9px] font-extrabold py-1 rounded transition-colors text-center shadow-md"
                              >
                                Selected →
                              </button>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Dynamic Selected Brand Media & PR Showcase Panel */}
                <div className="lg:col-span-6 bg-[#050a07] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
                  {(() => {
                    const activeBrand =
                      BRAND_COLLABORATIONS.find((b) => b.id === selectedBrandId) ||
                      BRAND_COLLABORATIONS[0];
                    return (
                      <div className="space-y-6">
                        {/* Header Banner */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-black/60 border border-[#00D084]/40 p-2 shrink-0">
                              <img
                                src={activeBrand.logo}
                                alt={activeBrand.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-xl font-serif font-bold text-white">
                                  {activeBrand.name}
                                </h3>
                                <span className="text-[10px] font-mono text-[#00D084] bg-[#00D084]/15 border border-[#00D084]/30 px-2 py-0.5 rounded-full uppercase">
                                  {activeBrand.category}
                                </span>
                              </div>
                              <p className="text-xs text-white/60 font-light mt-1">
                                {activeBrand.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* PR Articles & Group Photos Grid */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center gap-2">
                            <ExternalLink className="w-3.5 h-3.5 text-[#00D084]" />
                            Collaborations, MoU Photos & PR Articles
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {activeBrand.mediaShowcase.map((item) => (
                              <div
                                key={item.id}
                                className="bg-[#080e0a] border border-white/10 hover:border-[#00D084]/50 rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col justify-between shadow-md"
                              >
                                <div>
                                  <div className="relative h-36 w-full overflow-hidden">
                                    <img
                                      src={item.img}
                                      alt={item.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono text-[#00D084] px-2 py-0.5 rounded">
                                      {item.tag}
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-[9px] font-mono text-white/60 px-2 py-0.5 rounded">
                                      {item.date}
                                    </div>
                                  </div>

                                  <div className="p-4">
                                    <h5 className="text-xs font-serif font-bold text-white group-hover:text-[#00D084] transition-colors leading-snug line-clamp-2">
                                      {item.title}
                                    </h5>
                                  </div>
                                </div>

                                <div className="p-4 pt-0">
                                  <a
                                    href={item.prUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#00D084] hover:underline"
                                  >
                                    <span>Read PR & Media Article</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </a>
                                </div>
                              </div>
                            ))}
>>>>>>> a61aef851eb607cfc920cc0c48387458b6e80724
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
          <section className="testimonials-section py-24 bg-[#020403] font-serif overflow-hidden relative">
            <div className="testimonials-header-reveal max-w-7xl mx-auto px-6 mb-12 text-center">
              <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] flex items-center justify-center gap-1.5">
                <Quote className="w-4 h-4" /> Partner Success Stories
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 tracking-tight">
                What Our Partners Say
              </h2>
              <p className="text-white/60 text-xs sm:text-sm font-serif font-light mt-2">
                One line real partner reviews below & video interviews featuring live operational workshops
              </p>
            </div>

            {/* Dual Marquee Container (Hover to Pause) */}
            <div className="marquee-container space-y-10 relative">
              {/* Gradient Blur Edges Overlay */}
              <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#020403] to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#020403] to-transparent z-10 pointer-events-none" />

              {/* Row 1: One-Liner Partner Reviews Marquee */}
              <div className="flex overflow-hidden">
                <div className="animate-marquee-left flex gap-6">
                  {[...PARTNER_TESTIMONIALS_ROW1, ...PARTNER_TESTIMONIALS_ROW1].map(
                    (partner, idx) => (
                      <div
                        key={`row1-${partner.id}-${idx}`}
                        className="w-[320px] sm:w-[360px] shrink-0 bg-[#050907] border border-white/10 hover:border-[#00D084] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:scale-[1.03] cursor-pointer"
                      >
                        <div className="space-y-3">
                          {/* Top Header: Avatar + Author + City Badge */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-9 h-9 rounded-full bg-gradient-to-tr ${partner.avatarBg} border border-white/20 flex items-center justify-center text-white font-serif font-black text-xs shadow-sm`}
                              >
                                {partner.author.charAt(0)}
                              </div>
                              <div>
                                <h4 className="text-xs font-serif font-bold text-white group-hover:text-[#00D084] transition-colors">
                                  {partner.author}
                                </h4>
                                <p className="text-[10px] text-white/50 font-serif">
                                  {partner.role} •{" "}
                                  <span className="text-[#00D084] font-semibold">{partner.city}</span>
                                </p>
                              </div>
                            </div>

                            {/* Rating Stars */}
                            <div className="flex items-center gap-0.5 text-[#00D084]">
                              {[...Array(partner.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-[#00D084]" />
                              ))}
                            </div>
                          </div>

                          {/* One-Liner Green Headline */}
                          <h5 className="text-xs sm:text-sm font-serif font-extrabold text-[#00D084] leading-snug">
                            "{partner.headline}"
                          </h5>

                          {/* Quote Body */}
                          <p className="text-[11px] text-white/70 font-serif font-light leading-relaxed line-clamp-3">
                            {partner.quote}
                          </p>
                        </div>

                        {/* Bottom Stat Pill */}
                        <div className="pt-3 mt-3 border-t border-white/10 flex justify-between items-center text-[10px] font-serif">
                          <span className="text-white/40 font-semibold">Verified Partner</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[#00D084] font-bold">
                            {partner.stats}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Row 2: Partner Video Interviews Cards (Minimal & Premium Cinema Cards) */}
              <div className="max-w-7xl mx-auto px-6 pt-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-serif font-bold text-white/80 uppercase tracking-widest flex items-center gap-2">
                    <Play className="w-4 h-4 text-[#00D084]" /> Video Interviews & Case Studies
                  </span>
                  <span className="text-[11px] text-[#00D084] font-mono bg-[#00D084]/10 border border-[#00D084]/30 px-3 py-1 rounded-full">
                    Tap card to play interview ▶
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {PARTNER_VIDEO_INTERVIEWS.map((vid) => (
                    <div
                      key={vid.id}
                      onClick={() => setActiveVideo(vid)}
                      className="group relative h-64 sm:h-72 rounded-3xl border border-white/10 hover:border-[#00D084] bg-[#050907] overflow-hidden cursor-pointer transition-all duration-500 shadow-2xl hover:shadow-[0_0_35px_rgba(0,208,132,0.3)] hover:-translate-y-1.5 flex flex-col justify-between"
                    >
                      {/* High Resolution Poster Image */}
                      <img
                        src={vid.thumbnail}
                        alt={vid.videoTitle}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
                      />

                      {/* Gradient Scrim Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040806] via-[#040806]/40 to-black/30" />

                      {/* Top Glassmorphism Badges */}
                      <div className="relative z-10 p-4 flex items-center justify-between">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] shadow-[0_0_8px_#00D084] animate-pulse" />
                          <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                            {vid.city} • {vid.model}
                          </span>
                        </div>

                        <span className="text-[10px] font-mono font-bold text-white/80 bg-black/60 border border-white/15 px-2.5 py-1 rounded-full backdrop-blur-md">
                          {vid.duration}
                        </span>
                      </div>

                      {/* Center Glowing Play Button */}
                      <div className="relative z-10 flex items-center justify-center my-auto">
                        <div className="w-14 h-14 rounded-full bg-[#00D084] text-black flex items-center justify-center shadow-[0_0_30px_#00D084] group-hover:scale-115 transition-transform duration-300 border-2 border-white/40">
                          <Play className="w-6 h-6 fill-black ml-1" />
                        </div>
                      </div>

                      {/* Bottom Minimal Info Overlay */}
                      <div className="relative z-10 p-5 pt-0 space-y-2">
                        <h4 className="text-sm sm:text-base font-serif font-bold text-white group-hover:text-[#00D084] transition-colors leading-snug line-clamp-1">
                          {vid.videoTitle}
                        </h4>

                        <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
                          <span className="text-white/70 font-medium truncate">
                            {vid.partnerName}
                          </span>
                          <span className="text-[10px] font-extrabold text-[#00D084] bg-[#00D084]/20 border border-[#00D084]/40 px-2.5 py-0.5 rounded-full shrink-0">
                            {vid.statBadge}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
          DEVELOPED EV WORKSHOP CENTERS GALLERY (MINIMAL FRANCHISE GALLERY)
         ========================================================================= */}
          <FranchiseWorkshopsGallery />

          {/* =========================================================================
          9. CATEGORIZED FAQS ACCORDION
         ========================================================================= */}
          <section className="faq-section py-24 px-6 bg-[#020403] font-serif border-t border-white/10">
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
                      className={`px-4 py-2 rounded-2xl text-xs font-serif font-bold transition-all cursor-pointer border ${activeFaqCategory === cat.id
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

<<<<<<< HEAD
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
=======
      {/* Franchise Setup Sidebar Drawer */}
      <FranchiseSetupDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        model={drawerModel}
        onApply={(model) => {
          setSelectedModel(model);
          setApplyModalOpen(true);
        }}
      />
>>>>>>> a61aef851eb607cfc920cc0c48387458b6e80724

      {/* Footer */}
      <Footer />
    </div>
  );
}
