import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { IndiaFranchiseMap } from "../components/IndiaFranchiseMap";
import { FranchiseJourneyRoadmap } from "../components/FranchiseJourneyRoadmap";
import {
  DETAILED_FRANCHISE_MODELS,
  FAQ_CATEGORIES,
  CATEGORIZED_FAQS,
  PARTNER_TESTIMONIALS_ROW1,
  PARTNER_TESTIMONIALS_ROW2,
  DetailedFranchiseModel,
} from "../data/franchiseData";
import {
  CheckCircle2,
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

export function FranchisePage() {
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

  // Franchise Models Expandable Services Dropdown state
  const [expandedModels, setExpandedModels] = useState<{ [key: string]: boolean }>({});

  const toggleModelDropdown = (type: string) => {
    setExpandedModels((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (searchParams.city || searchParams.area || searchParams.pincode) {
      setApplyModalOpen(true);
    }
  }, [searchParams]);

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
      setApplyModalOpen(true);
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
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-serif overflow-x-hidden">
      {/* Unified Landing Navbar */}
      <Nav />

      {/* =========================================================================
          1. FULL-SCREEN HERO SECTION WITH BG IMAGE & FORM
         ========================================================================= */}
      <section className="relative w-full min-h-screen pt-32 pb-16 px-6 md:px-12 flex items-center overflow-hidden">
        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/ev-franchise-hero.jpg"
            alt="EV Service Workshop Hero"
            className="w-full h-full object-cover object-center opacity-85 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020403] via-[#020403]/60 to-black/40" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 pt-12 sm:pt-16">
          {/* Left Column: Title & Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-white leading-[1.10] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Launch Your Own <br />
              <span className="text-[#00D084] font-black drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                EV Service Franchise
              </span>
            </h1>

            <p className="text-sm sm:text-base text-white font-serif font-bold leading-relaxed max-w-xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] bg-black/50 backdrop-blur-md p-5 rounded-2xl border border-white/15">
              Launch your own EV service business powered by Autobot OS, India's first AI-powered EV service automation platform. Become part of the fastest-growing EV ecosystem and build a future-ready, high-profit business in 90 days.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
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
                className="px-7 py-3.5 rounded-full border border-white/30 bg-black/40 text-white text-xs font-serif font-extrabold uppercase tracking-widest hover:bg-black/60 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md shadow-2xl"
              >
                <Download className="w-4 h-4 text-[#00D084]" /> Download Franchise Brochure
              </button>
            </div>
          </div>

          {/* Right Column: Premium Glass Form Card */}
          <div
            id="hero-partner-form"
            className="lg:col-span-5 bg-[#030604]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 relative font-serif border border-white/20 shadow-2xl overflow-hidden"
          >
            {/* Ambient Radial Lighting Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00D084]/20 rounded-full blur-[70px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00D084]/15 rounded-full blur-[60px] pointer-events-none" />

            <div className="mb-6 text-left relative z-10">
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight drop-shadow-md">
                Become a Partner
              </h3>
              <p className="text-xs text-white/80 font-serif font-semibold mt-1">
                Takes less than a minute. No commitment needed.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-left relative z-10">
              <div>
                <label className="text-[11px] font-serif font-bold text-white/90 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full bg-black/60 hover:bg-black/80 focus:bg-black/90 rounded-xl px-4 py-3 text-xs text-white font-serif font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-serif font-bold text-white/90 block mb-1">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-black/60 hover:bg-black/80 focus:bg-black/90 rounded-xl px-4 py-3 text-xs text-white font-serif font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/20"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-serif font-bold text-white/90 block mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className="w-full bg-black/60 hover:bg-black/80 focus:bg-black/90 rounded-xl px-4 py-3 text-xs text-white font-serif font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-serif font-bold text-white/90 block mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    placeholder="6-digit PIN"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    className="w-full bg-black/60 hover:bg-black/80 focus:bg-black/90 rounded-xl px-3 py-3 text-xs text-white font-serif font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/20"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-serif font-bold text-white/90 block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your city"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-black/60 hover:bg-black/80 focus:bg-black/90 rounded-xl px-3 py-3 text-xs text-white font-serif font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/20"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-serif font-bold text-white/90 block mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maharashtra"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full bg-black/60 hover:bg-black/80 focus:bg-black/90 rounded-xl px-3 py-3 text-xs text-white font-serif font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-serif font-bold text-white/90 block mb-1">
                  Investment Range *
                </label>
                <select
                  value={form.investmentRange}
                  onChange={(e) => setForm({ ...form, investmentRange: e.target.value })}
                  className="w-full bg-black/60 hover:bg-black/80 focus:bg-black/90 rounded-xl px-4 py-3 text-xs text-white font-serif font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all border border-white/20 cursor-pointer"
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
                className="w-full py-4 rounded-xl bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-3 shadow-2xl"
              >
                Become a Partner <Send className="w-4 h-4" />
              </button>

              <p className="text-[10px] font-serif font-semibold text-white/60 leading-tight text-center pt-2">
                By submitting you agree to be contacted by our franchise team and accept our Franchise Partner Terms & Conditions.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. KEY BADGES SECTION BELOW HERO
         ========================================================================= */}
      <section className="bg-[#020403] py-8 px-6 font-serif">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            "10+ Years EV R&D",
            "AI Powered Autobot OS",
            "Certified Training",
            "Pan-India Expansion",
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-2.5 text-xs sm:text-sm text-white/90 font-serif font-semibold bg-[#020403] border border-white/10 px-4 py-3.5 rounded-2xl hover:border-[#00D084]/40 transition-all"
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
      <section className="py-24 px-6 bg-[#020403] font-serif">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] block mb-2">
            Our Vision
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mb-6 leading-tight">
            We Are Building India's Largest EV Service Network
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed font-serif font-light mb-6">
            The EV revolution is accelerating rapidly, but the service ecosystem is still fragmented. At MY EV SERVICE, we are building a pan-India multi-brand EV service network powered by our proprietary Autobot OS, an AI-powered digital operating system for EV service businesses.
          </p>
          <div className="bg-[#050907] border border-[#00D084]/30 rounded-2xl p-6 text-left my-8 space-y-2">
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#00D084]">
              Our Mission is Simple:
            </span>
            <p className="text-lg font-serif font-bold text-white leading-snug">
              Empower the next generation of entrepreneurs to build successful EV businesses while creating India's most trusted EV service infrastructure.
            </p>
          </div>
          <p className="text-white/60 text-sm md:text-base leading-relaxed font-serif font-light mb-8">
            We are inviting young entrepreneurs, garage owners, investors, and automotive professionals to join our network and launch their own EV service business with a field-tested, technology-driven 90-day model.
          </p>

          <button
            onClick={scrollToForm}
            className="px-8 py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer"
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
      <section className="py-24 px-6 bg-[#020403] font-serif">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
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
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {COMPARISON_FEATURES.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCompFeature(idx)}
                className={`px-4 py-3 rounded-2xl text-xs font-serif font-bold transition-all cursor-pointer border ${
                  selectedCompFeature === idx
                    ? "bg-[#00D084] text-[#020403] border-[#00D084] scale-105 shadow-[0_0_15px_rgba(0,208,132,0.4)]"
                    : "bg-[#050907] text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Interactive Comparison Visual Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Traditional Garage Breakdown */}
            <div className="lg:col-span-6 bg-red-950/20 border-2 border-red-500/30 hover:border-red-500/60 rounded-3xl p-8 space-y-6 transition-all duration-300 font-serif">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                  OLD ERA TRADITIONAL GARAGE
                </span>
                <span className="text-xs font-serif font-bold text-red-400">
                  Score: {COMPARISON_FEATURES[selectedCompFeature].tradScore}/100
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white">
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

              {/* Visual Metric Score Bar */}
              <div className="space-y-1.5 pt-2">
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
            <div className="lg:col-span-6 bg-[#00D084]/10 border-2 border-[#00D084] rounded-3xl p-8 space-y-6 transition-all duration-300 font-serif shadow-[0_0_30px_rgba(0,208,132,0.15)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#00D084] uppercase tracking-widest bg-[#00D084]/20 px-3 py-1 rounded-full border border-[#00D084]/40">
                  AI AUTOBOT OS POWERED HUB
                </span>
                <span className="text-xs font-serif font-bold text-[#00D084]">
                  Score: {COMPARISON_FEATURES[selectedCompFeature].myevScore}/100
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white">
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

              {/* Visual Metric Score Bar */}
              <div className="space-y-1.5 pt-2">
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
      <section id="franchise-models" className="py-24 px-6 max-w-7xl mx-auto font-serif">
        {/* Banner: Founding Partner Offer */}
        <div className="bg-[#00D084]/15 border-2 border-[#00D084] rounded-3xl p-8 mb-16 text-center relative overflow-hidden">
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

        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
            Franchise Models
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 mb-4 tracking-tight">
            Choose the Model That Fits Your Vision
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DETAILED_FRANCHISE_MODELS.map((model) => (
            <div
              key={model.type}
              className={`bg-[#050907] border rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative font-serif ${
                model.popular
                  ? "border-[#00D084]"
                  : "border-white/10 hover:border-[#00D084]/40"
              }`}
            >
              {model.badge && (
                <div className="absolute top-4 right-4 bg-[#00D084] text-[#020403] text-[9px] font-serif font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                  {model.badge}
                </div>
              )}

              <div>
                <div className="text-xs font-serif font-bold uppercase tracking-widest text-[#00D084] mb-1">
                  {model.name}
                </div>
                <div className="text-xs text-white/60 mb-4 font-serif">{model.subtitle}</div>

                <div className="text-3xl font-serif font-extrabold text-white mb-1">
                  {model.investment}
                </div>
                {model.originalInvestment && (
                  <div className="text-xs text-white/40 line-through font-serif mb-1">
                    Standard: {model.originalInvestment}
                  </div>
                )}
                {model.foundingOffer && (
                  <div className="text-xs font-serif font-bold text-[#00D084] mb-6">
                    {model.foundingOffer}
                  </div>
                )}

                <div className="space-y-2 py-4 border-y border-white/10 mb-6 text-xs font-serif">
                  <div className="flex justify-between">
                    <span className="text-white/50">REQUIRED AREA:</span>
                    <span className="text-white font-bold">{model.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">SERVICE BAYS:</span>
                    <span className="text-white font-bold">{model.bays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">VEHICLE FOCUS:</span>
                    <span className="text-white font-bold">{model.vehicles}</span>
                  </div>
                </div>

                {/* Key Inclusions Preview */}
                <div className="space-y-2 mb-4 text-xs text-white/80 font-serif">
                  {model.includes.slice(0, 4).map((inc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>

                {/* Dropdown Toggle Button for All Services */}
                <button
                  onClick={() => toggleModelDropdown(model.type)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#00D084]/15 border border-white/15 hover:border-[#00D084]/40 text-xs font-serif font-bold text-white hover:text-[#00D084] flex items-center justify-between transition-all cursor-pointer mb-6 group"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#00D084]" />
                    {expandedModels[model.type]
                      ? "Hide Package Breakdown"
                      : "View All Included Services & Setup"}
                  </span>
                  {expandedModels[model.type] ? (
                    <ChevronUp className="w-4 h-4 text-[#00D084]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#00D084]" />
                  )}
                </button>

                {/* Collapsible Dropdown Panel: All 9 Services & Setup */}
                <AnimatePresence>
                  {expandedModels[model.type] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden mb-6"
                    >
                      <div className="bg-[#020503] border border-[#00D084]/40 rounded-2xl p-4 space-y-2 text-xs font-serif shadow-inner">
                        <div className="text-[10px] font-serif font-extrabold text-[#00D084] uppercase tracking-wider border-b border-white/10 pb-2 mb-2 flex items-center justify-between">
                          <span>COMPLETE WORKSHOP PACKAGE:</span>
                          <span className="text-white/40">9 SERVICES INCLUDED</span>
                        </div>
                        {[
                          "Multi-Bay Workshop Setup",
                          "Diagnostic & Testing Tools",
                          "Battery Diagnostic & Balancing Equipment",
                          "Spare Parts Racks",
                          "MY EV SERVICE Software",
                          "Staff Training & Certification",
                          "Marketing & Launch Support",
                          "Safety & Fire Compliance",
                          "6 Months Business Ops Support",
                        ].map((service, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-white/90 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084] shrink-0 mt-0.5" />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="bg-[#00D084]/10 border border-[#00D084]/20 rounded-xl p-3 text-xs text-[#00D084] font-serif font-bold mb-6">
                  {model.osSavings}
                </div>

                <p className="text-[11px] text-white/50 italic mb-6 font-serif">
                  Best for: {model.bestFor}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedModel(model);
                  scrollToForm();
                }}
                className="w-full py-3.5 rounded-2xl bg-[#00D084] text-[#020403] text-xs font-serif font-extrabold uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer"
              >
                Apply for {model.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. DUAL OPPOSITE MOVING MARQUEE REVIEWS WITH VISUALS AND ONE-LINERS
         ========================================================================= */}
      <section className="py-24 bg-[#020403] font-serif overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] flex items-center justify-center gap-1.5">
            <Quote className="w-4 h-4" /> Partner Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 tracking-tight">
            What Our Partners Say
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-serif font-light mt-2">
            Real stories from EV workshop partners across India • Hover on any card to pause scrolling
          </p>
        </div>

        {/* Dual Marquee Container (Hover to Pause) */}
        <div className="marquee-container space-y-6 relative">
          {/* Gradient Blur Edges Overlay */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#020403] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#020403] to-transparent z-10 pointer-events-none" />

          {/* Row 1: Moving LEFT */}
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

          {/* Row 2: Moving RIGHT (Opposite Direction) */}
          <div className="flex overflow-hidden">
            <div className="animate-marquee-right flex gap-6">
              {[...PARTNER_TESTIMONIALS_ROW2, ...PARTNER_TESTIMONIALS_ROW2].map(
                (partner, idx) => (
                  <div
                    key={`row2-${partner.id}-${idx}`}
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
        </div>
      </section>

      {/* =========================================================================
          9. CATEGORIZED FAQS ACCORDION
         ========================================================================= */}
      <section className="py-24 px-6 bg-[#020403] font-serif border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
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

          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#050907] border border-white/10 rounded-2xl overflow-hidden font-serif transition-all"
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
