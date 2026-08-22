import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  DETAILED_FRANCHISE_MODELS,
  FRANCHISE_FAQS,
  DetailedFranchiseModel,
} from "../data/franchiseData";
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  X,
  Send,
  Zap,
  TrendingUp,
  Sparkles,
  Download,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Compass,
  Calendar,
  Layers,
  ArrowLeftRight,
  ShieldCheck,
  Wrench,
  BatteryCharging,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/franchise")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      city: typeof search.city === "string" ? search.city : undefined,
      area: typeof search.area === "string" ? search.area : undefined,
      pincode: typeof search.pincode === "string" ? search.pincode : undefined,
    };
  },
  component: FranchisePage,
});

function FranchisePage() {
  const searchParams = Route.useSearch();
  const [selectedModel, setSelectedModel] = useState<DetailedFranchiseModel>(
    DETAILED_FRANCHISE_MODELS[1]
  );

  // Concept 2 Active City Node State
  const [selectedCityIdx, setSelectedCityIdx] = useState<number>(0);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const [applyModalOpen, setApplyModalOpen] = useState(
    !!(searchParams.city || searchParams.area || searchParams.pincode)
  );
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activePartnerIdx, setActivePartnerIdx] = useState<number>(0);

  const heroTextRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const contentUpRef = useRef<HTMLDivElement>(null);
  const cardsRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (searchParams.city || searchParams.area || searchParams.pincode) {
      setApplyModalOpen(true);
    }
  }, [searchParams]);

  // GSAP ScrollTrigger Animations (Matching Media Page Hero)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero text slow fade-out as content overlay rises up over the hero
      if (heroTextRef.current && contentOverlayRef.current) {
        gsap.to(heroTextRef.current, {
          opacity: 0,
          scale: 0.9,
          y: -50,
          ease: "power1.out",
          scrollTrigger: {
            trigger: contentOverlayRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 0.6,
          },
        });
      }

      // 2. Content overlay layer rises up onto the fixed hero section
      if (contentUpRef.current) {
        gsap.fromTo(
          contentUpRef.current,
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentUpRef.current,
              start: "top 90%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );
      }

      // 3. Section cards slide in from the right on further scroll
      if (cardsRightRef.current) {
        gsap.fromTo(
          cardsRightRef.current,
          { x: 200, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRightRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 0.6,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Application Form State
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    pincode: "",
    city: "",
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

  // City Territory Radar Nodes
  const CITIES_RADAR = [
    {
      name: "Pune",
      state: "Maharashtra",
      status: "5 Service Centres Launched",
      tag: "FOUNDING OFFER ACTIVE",
      color: "#00D084",
      demand: "High 2W & 3W EV Density",
      slots: "2 Territory Slots Available",
    },
    {
      name: "Bangalore",
      state: "Karnataka",
      status: "Master Hub Operational",
      tag: "HUB OPERATIONAL",
      color: "#3b82f6",
      demand: "EV Tech Capital",
      slots: "3 Pre-Booking Slots",
    },
    {
      name: "Delhi NCR",
      state: "Delhi",
      status: "Territory Pre-Booking Open",
      tag: "PRE-BOOKING OPEN",
      color: "#eab308",
      demand: "Commercial 3W Fleet Surge",
      slots: "5 Territory Slots",
    },
    {
      name: "Hyderabad",
      state: "Telangana",
      status: "New Centre Franchise Awarded",
      tag: "CENTRE AWARDED",
      color: "#ec4899",
      demand: "Rapid 2W EV Growth",
      slots: "1 Hub Slot Available",
    },
    {
      name: "Chennai",
      state: "Tamil Nadu",
      status: "Partnership Announcement Soon",
      tag: "COMING SOON",
      color: "#a855f7",
      demand: "Auto Manufacturing Belt",
      slots: "4 Slots Open",
    },
    {
      name: "Mumbai",
      state: "Maharashtra",
      status: "Franchise Territory Reserved",
      tag: "TERRITORY RESERVED",
      color: "#06b6d4",
      demand: "High Premium 2W EV Intake",
      slots: "2 Slots Remaining",
    },
  ];

  // 45-Day Onboarding Steps
  const ONBOARDING_STEPS = [
    {
      day: "Day 1 – 7",
      title: "Application & Territory Lock",
      desc: "Site location feasibility assessment, territory exclusivity agreement, and zero franchise fee onboarding.",
      checklist: ["Exclusive 5km Territory Lock", "Site Layout Verification", "Agreement Signoff"],
    },
    {
      day: "Day 8 – 20",
      title: "Workshop Layout & Lab Setup",
      desc: "Dispatch of hydraulic lifts, battery balancing equalizers, diagnostic benches, and OEM spare parts racks.",
      checklist: ["Hydraulic Service Bays Installed", "Battery Diagnostic Lab Setup", "Signage & Branding Fitout"],
    },
    {
      day: "Day 21 – 35",
      title: "Technician Training & Certification",
      desc: "Hands-on training of your workshop staff at Autobot Academy covering high-voltage battery safety & CAN-bus scanners.",
      checklist: ["Autobot Master Certification", "HV Safety Protocols", "Diagnostic SOPs Mastery"],
    },
    {
      day: "Day 36 – 45",
      title: "Autobot OS Sync & Grand Opening",
      desc: "Integration of Autobot OS business software, digital customer app listing, and central marketing lead dispatch.",
      checklist: ["Autobot OS Live Activation", "Google Maps & App Listing", "Customer Lead Dispatch"],
    },
  ];

  const PARTNER_TESTIMONIALS = [
    {
      quote:
        "Starting my MY EV SERVICE workshop in Pune was the best business decision I made. The Autobot OS automation software handles customer lead routing and diagnostic logging seamlessly, allowing us to maintain 28%+ profit margins.",
      author: "Rajesh Varma",
      role: "Centre Partner",
      city: "Pune",
      rating: 5,
      stats: "28% Net Margins",
    },
    {
      quote:
        "The 45-day onboarding roadmap was executed flawlessly. Autobot Academy trained our technicians on high-voltage battery cell balancing, and we broke even within 12 months!",
      author: "Aniket Kulkarni",
      role: "Master Hub Partner",
      city: "Bangalore",
      rating: 5,
      stats: "12 Month Breakeven",
    },
    {
      quote:
        "The constant spare parts supply chain support and 24/7 technical hotline give our workshop a massive competitive edge over traditional local garages.",
      author: "Priya Sharma",
      role: "Express Garage Partner",
      city: "Delhi NCR",
      rating: 5,
      stats: "140+ Monthly EVs",
    },
    {
      quote:
        "The brand trust and doorstep mobile app dispatch brought us 120+ active customer bookings in our very first month of operation.",
      author: "Siddharth Mehta",
      role: "Centre Partner",
      city: "Hyderabad",
      rating: 5,
      stats: "120+ Month-1 Leads",
    },
    {
      quote:
        "Autobot OS diagnostic scanners saved us months of trial-and-error. We can accurately diagnose battery health and motor controller issues in minutes.",
      author: "Venkatesh Rao",
      role: "Hub Partner",
      city: "Chennai",
      rating: 5,
      stats: "99.2% Customer CSAT",
    },
    {
      quote:
        "The zero-franchise-fee founding partner model gave us maximum capital allocation towards lifts, battery balancing benches, and inventory.",
      author: "Vikram Malhotra",
      role: "Centre Partner",
      city: "Mumbai",
      rating: 5,
      stats: "5km Exclusive Radius",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070908] text-white selection:bg-[#00D084] selection:text-black font-sans relative overflow-x-hidden">
      
      {/* Unified Landing Navbar */}
      <Nav />

      {/* Main Container */}
      <div className="relative min-h-screen">

        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0)
           ========================================================================= */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background Hero Poster Image */}
          <img
            src="/ev-franchise-hero.jpg"
            alt="EV Service Workshop Hero"
            className="w-full h-full object-cover object-center opacity-85 pointer-events-none"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070908] via-black/50 to-black/70 pointer-events-none" />

          {/* Hero Content Container (Fades out & scales via GSAP on scroll) */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full z-10 transition-all pointer-events-auto overflow-y-auto py-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full my-auto">
              
              {/* Left Column: Title & Text */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/40 text-xs font-mono font-bold text-[#00D084] backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#00D084]" />
                  <span>PAN-INDIA FRANCHISE NETWORK</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                  Launch Your Own <br />
                  <span className="text-[#00D084] font-black drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                    EV Service Franchise
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed max-w-xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] bg-black/60 backdrop-blur-md p-5 rounded-2xl border border-white/15">
                  Launch your own EV service business powered by Autobot OS, India's first AI-powered EV service automation platform. Become part of the fastest-growing EV ecosystem and build a future-ready, high-profit business.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={scrollToForm}
                    className="px-7 py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-bold uppercase tracking-widest hover:bg-[#00e08f] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_25px_rgba(0,208,132,0.4)]"
                  >
                    Become a Partner <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toast.info("Franchise Brochure download link sent to your mobile/email!")}
                    className="px-7 py-3.5 rounded-full border border-white/30 bg-black/40 text-white text-xs font-extrabold uppercase tracking-widest hover:bg-black/60 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md shadow-2xl"
                  >
                    <Download className="w-4 h-4 text-[#00D084]" /> Download Franchise Brochure
                  </button>
                </div>
              </div>

              {/* Right Column: Premium Glass Form Card */}
              <div id="hero-partner-form" className="lg:col-span-5 bg-[#030604]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 relative border border-white/20 shadow-2xl overflow-hidden">
                {/* Ambient Radial Lighting Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#00D084]/20 rounded-full blur-[70px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00D084]/15 rounded-full blur-[60px] pointer-events-none" />

                <div className="mb-5 text-left relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">Become a Partner</h3>
                  <p className="text-xs text-white/80 font-semibold mt-1">
                    Takes less than a minute. No commitment needed.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-3.5 text-left relative z-10">
                  <div>
                    <label className="text-[11px] font-bold text-white/90 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full bg-black/60 hover:bg-black/80 focus:bg-black/90 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-white/90 block mb-1">Email (optional)</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-black/60 hover:bg-black/80 focus:bg-black/90 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/20"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-white/90 block mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit number"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className="w-full bg-black/60 hover:bg-black/80 focus:bg-black/90 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-white/90 block mb-1">PIN Code</label>
                      <input
                        type="text"
                        placeholder="6-digit PIN"
                        value={form.pincode}
                        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                        className="w-full bg-black/60 hover:bg-black/80 focus:bg-black/90 rounded-xl px-3 py-2.5 text-xs text-white font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/20"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-white/90 block mb-1">City *</label>
                      <input
                        type="text"
                        required
                        placeholder="Your city"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full bg-black/60 hover:bg-black/80 focus:bg-black/90 rounded-xl px-3 py-2.5 text-xs text-white font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/20"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-white/90 block mb-1">State</label>
                      <input
                        type="text"
                        placeholder="e.g. Maharashtra"
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        className="w-full bg-black/60 hover:bg-black/80 focus:bg-black/90 rounded-xl px-3 py-2.5 text-xs text-white font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all placeholder:text-white/40 border border-white/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-white/90 block mb-1">Investment Range *</label>
                    <select
                      value={form.investmentRange}
                      onChange={(e) => setForm({ ...form, investmentRange: e.target.value })}
                      className="w-full bg-black/60 hover:bg-black/80 focus:bg-black/90 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all border border-white/20 cursor-pointer"
                    >
                      <option value="< ₹10 Lakh" className="bg-[#040906] text-white">&lt; ₹10 Lakh (Garage Tier)</option>
                      <option value="₹10L - ₹20L" className="bg-[#040906] text-white">₹10L – ₹20L (Centre Tier)</option>
                      <option value="> ₹20L" className="bg-[#040906] text-white">&gt; ₹20L (Hub Tier)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-2xl"
                  >
                    Become a Partner <Send className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] font-semibold text-white/60 leading-tight text-center pt-1">
                    By submitting you agree to be contacted by our franchise team and accept our Franchise Partner Terms & Conditions.
                  </p>
                </form>
              </div>

            </div>
          </div>
        </div>

        {/* =========================================================================
            2. CARDS OVERLAY LAYER (SLIDES UP DIRECTLY ON TOP OF THE FIXED HERO)
           ========================================================================= */}
        <div
          ref={contentOverlayRef}
          className="relative z-10 bg-[#070908] min-h-screen mt-[calc(100vh-80px)] pt-12 rounded-t-[40px] border-t border-white/10 shadow-2xl"
        >
          {/* CARDS RISING UP ANIMATEDLY (GSAP SCRUBBED FROM BOTTOM OVER HERO) */}
          <div ref={contentUpRef}>
            {/* Key Badges Section */}
            <section className="py-6 px-6">
              <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  "10+ Years EV R&D",
                  "AI Powered Autobot OS",
                  "Certified Training",
                  "Pan-India Expansion",
                ].map((badge, i) => (
                  <div key={i} className="flex items-center justify-center gap-2.5 text-xs sm:text-sm text-white/90 font-semibold bg-[#111613] border border-white/10 px-4 py-3.5 rounded-2xl hover:border-[#00D084]/40 transition-all shadow-lg">
                    <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Our Vision & Mission Section */}
            <section className="py-16 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00D084] block mb-2">
                  Our Vision
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                  We Are Building India's Largest EV Service Network
                </h2>
                <p className="text-white/70 text-base md:text-lg leading-relaxed font-light mb-6">
                  The EV revolution is accelerating rapidly, but the service ecosystem is still fragmented. At MY EV SERVICE, we are building a pan-India multi-brand EV service network powered by our proprietary Autobot OS, an AI-powered digital operating system for EV service businesses.
                </p>
                <div className="bg-[#111613] border border-[#00D084]/30 rounded-2xl p-6 text-left my-8 space-y-2 shadow-xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00D084]">Our Mission is Simple:</span>
                  <p className="text-lg font-bold text-white leading-snug">
                    Empower the next generation of entrepreneurs to build successful EV businesses while creating India's most trusted EV service infrastructure.
                  </p>
                </div>
                <p className="text-white/60 text-sm md:text-base leading-relaxed font-light mb-8">
                  We are inviting young entrepreneurs, garage owners, investors, and automotive professionals to join our network and launch their own EV service business with a field-tested, technology-driven model.
                </p>

                <button
                  onClick={scrollToForm}
                  className="px-8 py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg"
                >
                  Apply for Franchise Opportunity
                </button>
              </div>
            </section>
          </div>

          {/* CARDS SLIDING IN FROM THE RIGHT (GSAP SCRUBBED FROM RIGHT) */}
          <div ref={cardsRightRef}>
            <section className="py-20 px-6 border-t border-white/10">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-14">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00D084] flex items-center justify-center gap-1.5">
                    <Compass className="w-4 h-4" /> Territory Radar
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-4 tracking-tight">
                    Pan-India City Expansion Map
                  </h2>
                  <p className="text-white/70 text-base font-light">
                    Select a city node on our network radar to inspect active service centres, territory pre-booking slots, and local EV market demand.
                  </p>
                </div>

                {/* City Selector Radar Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                  {CITIES_RADAR.map((city, idx) => (
                    <button
                      key={city.name}
                      onClick={() => setSelectedCityIdx(idx)}
                      className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-2 ${
                        selectedCityIdx === idx
                          ? "bg-[#00D084] text-[#020403] border-[#00D084] scale-105 shadow-[0_0_20px_rgba(0,208,132,0.4)]"
                          : "bg-[#111613] text-white/70 border-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{city.name}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10">{city.state}</span>
                    </button>
                  ))}
                </div>

                {/* Selected City Detail Radar Card */}
                <div className="bg-[#0b0f0c] border-2 border-[#00D084]/40 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    
                    <div className="lg:col-span-7 space-y-4">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/40 text-xs font-bold text-[#00D084]">
                        {CITIES_RADAR[selectedCityIdx].tag}
                      </div>
                      
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                        {CITIES_RADAR[selectedCityIdx].name}, {CITIES_RADAR[selectedCityIdx].state}
                      </h3>
                      
                      <p className="text-base text-white/80 font-light">
                        Status: <span className="font-bold text-[#00D084]">{CITIES_RADAR[selectedCityIdx].status}</span>
                      </p>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                        <div className="bg-[#040605] border border-white/10 rounded-2xl p-4">
                          <span className="text-white/50 block mb-1">LOCAL EV DEMAND</span>
                          <span className="font-bold text-white text-sm">{CITIES_RADAR[selectedCityIdx].demand}</span>
                        </div>
                        <div className="bg-[#040605] border border-white/10 rounded-2xl p-4">
                          <span className="text-white/50 block mb-1">TERRITORY AVAILABILITY</span>
                          <span className="font-bold text-[#00D084] text-sm">{CITIES_RADAR[selectedCityIdx].slots}</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-[#040605] border border-white/15 rounded-2xl p-6 text-center space-y-4">
                      <h4 className="text-lg font-bold text-white">Reserve {CITIES_RADAR[selectedCityIdx].name} Territory</h4>
                      <p className="text-xs text-white/60 font-light">
                        Lock an exclusive 5km territory radius before slots are fully allocated in {CITIES_RADAR[selectedCityIdx].name}.
                      </p>
                      <button
                        onClick={() => {
                          setForm({ ...form, city: CITIES_RADAR[selectedCityIdx].name, state: CITIES_RADAR[selectedCityIdx].state });
                          scrollToForm();
                        }}
                        className="w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-extrabold uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg"
                      >
                        Reserve Territory Now
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </section>
          </div>

      {/* =========================================================================
          5. 45-DAY ONBOARDING JOURNEY TIMELINE
         ========================================================================= */}
      <section className="py-24 px-6 bg-[#020403] font-serif">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] flex items-center justify-center gap-1.5">
              <Calendar className="w-4 h-4" /> Partner Journey Roadmap
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 mb-4 tracking-tight">
              Your 45-Day Onboarding Roadmap
            </h2>
            <p className="text-white/70 text-base font-serif font-light">
              From application signoff to grand opening: see how we launch your EV workshop in just 45 days.
            </p>
          </div>

          {/* Interactive Timeline Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {ONBOARDING_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStepIdx(idx)}
                className={`p-6 rounded-2xl text-left transition-all border cursor-pointer font-serif ${
                  activeStepIdx === idx
                    ? "bg-[#050c08] border-[#00D084] scale-102"
                    : "bg-[#050907] border-white/10 hover:border-white/20 opacity-70"
                }`}
              >
                <div className="text-xs font-serif font-bold text-[#00D084] mb-2">{step.day}</div>
                <h4 className="text-base font-serif font-bold text-white mb-1">{step.title}</h4>
                <p className="text-xs text-white/50 font-serif font-light line-clamp-2">{step.desc}</p>
              </button>
            ))}
          </div>

          {/* Active Step Details Display */}
          <div className="bg-[#040806] border-2 border-[#00D084]/40 rounded-3xl p-8 relative overflow-hidden font-serif">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
              <div className="space-y-3">
                <span className="text-xs font-serif text-[#00D084] font-bold uppercase tracking-widest">
                  PHASE 0{activeStepIdx + 1} • {ONBOARDING_STEPS[activeStepIdx].day}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-white">
                  {ONBOARDING_STEPS[activeStepIdx].title}
                </h3>
                <p className="text-sm text-white/70 font-serif font-light max-w-2xl leading-relaxed">
                  {ONBOARDING_STEPS[activeStepIdx].desc}
                </p>
              </div>

              <div className="bg-[#020503] border border-white/10 rounded-2xl p-5 shrink-0 w-full lg:w-80 space-y-2 text-xs font-serif">
                <span className="text-white/50 block mb-1">KEY DELIVERABLES:</span>
                {ONBOARDING_STEPS[activeStepIdx].checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. TRADITIONAL GARAGE VS MY EV SERVICE HUB COMPARISON
         ========================================================================= */}
      <section className="py-24 px-6 bg-[#020403] font-serif">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] flex items-center justify-center gap-1.5">
              <ArrowLeftRight className="w-4 h-4" /> Comparison Matrix
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 mb-4 tracking-tight">
              Traditional Garage vs. MY EV SERVICE Hub
            </h2>
            <p className="text-white/70 text-base font-serif font-light">
              See how our AI-powered Autobot OS framework solves traditional workshop inefficiencies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Traditional Garage */}
            <div className="bg-red-500/5 border border-red-500/30 rounded-3xl p-8 space-y-4 font-serif">
              <div className="text-xs font-serif font-bold text-red-400 uppercase tracking-widest">
                OLD ERA TRADITIONAL GARAGE
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">Fragmented & Manual Operations</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-white/70">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>No diagnostic tools for high-voltage battery packs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Manual paper billing & zero repeat customer CRM</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Uncertain spare parts procurement & long delays</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Low net profit margins (10-14%)</span>
                </li>
              </ul>
            </div>

            {/* Right: MY EV SERVICE Hub */}
            <div className="bg-[#00D084]/10 border-2 border-[#00D084] rounded-3xl p-8 space-y-4 font-serif">
              <div className="text-xs font-serif font-bold text-[#00D084] uppercase tracking-widest">
                NEXT ERA MY EV SERVICE NETWORK
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">Automated AI Powered Hub</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-white/90">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                  <span>Autobot CAN-bus scanners & cell balancing lab</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                  <span>Autobot OS full digital automation & mobile app leads</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                  <span>Central OEM spare parts supply chain fulfillment</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                  <span>High net profit margins (25-30%) with 14-18mo payback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FOUNDING PARTNER OFFER (PUNE) & MODELS MATRIX
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

                <div className="space-y-2 mb-6 text-xs text-white/80 font-serif">
                  {model.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>

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
          9. PARTNER TESTIMONIAL & 18 EXPANDABLE FAQS
         ========================================================================= */}
      <section className="py-24 px-6 max-w-4xl mx-auto font-serif">
        {/* Testimonial Quote */}
        <div className="bg-[#050907] border border-white/10 rounded-3xl p-8 mb-20 text-center relative overflow-hidden font-serif">
          <p className="text-lg md:text-xl text-white font-serif font-light italic leading-relaxed mb-4">
            "I opened a MY EV SERVICE hub in Pune and achieved breakeven within 13 months. The Autobot OS platform made managing operations effortless from day one."
          </p>
          <div className="text-xs font-serif font-bold text-[#00D084]">
            — Franchise Partner, Pune Hub Model
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="text-center mb-12">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FRANCHISE_FAQS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#050907] border border-white/10 hover:border-[#00D084]/40 rounded-2xl p-6 transition-all cursor-pointer font-serif"
                onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-serif font-bold text-white leading-snug">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#00D084] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/40 shrink-0" />
                  )}
                </div>

                {isOpen && (
                  <p className="mt-4 pt-4 border-t border-white/10 text-xs md:text-sm text-white/70 font-serif font-light leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          10. WHAT OUR PARTNERS SAY SECTION (1 PARTNER DISPLAYED AT A TIME)
         ========================================================================= */}
      <section className="py-24 px-6 bg-[#020403] font-serif">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084] flex items-center justify-center gap-1.5">
              <Quote className="w-4 h-4" /> Partner Success Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white tracking-tight">
              What Our Partners Say
            </h2>
            <p className="text-white/70 text-base font-serif font-light">
              Real stories from entrepreneurs building successful EV service hubs across India.
            </p>
          </div>

          {/* Single Partner Card Carousel Container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {(() => {
                const partner = PARTNER_TESTIMONIALS[activePartnerIdx];
                return (
                  <motion.div
                    key={activePartnerIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-[#050907] border-2 border-[#00D084]/30 hover:border-[#00D084]/60 rounded-3xl p-8 md:p-12 shadow-2xl relative font-serif space-y-8 overflow-hidden"
                  >
                    {/* Ambient glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-1 text-[#00D084]">
                        {[...Array(partner.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#00D084]" />
                        ))}
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/40 text-[#00D084] text-xs font-serif font-bold uppercase tracking-wider">
                        {partner.stats}
                      </span>
                    </div>

                    <p className="text-base sm:text-xl md:text-2xl text-white font-serif font-medium leading-relaxed italic relative z-10">
                      "{partner.quote}"
                    </p>

                    <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center text-[#00D084] font-serif font-black text-lg">
                          {partner.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-lg md:text-xl font-serif font-bold text-white">
                            {partner.author}
                          </h4>
                          <p className="text-xs md:text-sm text-white/60 font-serif">
                            {partner.role} • <span className="text-[#00D084] font-semibold">{partner.city}</span>
                          </p>
                        </div>
                      </div>

                      {/* Navigation Arrow Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setActivePartnerIdx((prev) =>
                              prev === 0 ? PARTNER_TESTIMONIALS.length - 1 : prev - 1
                            )
                          }
                          className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#00D084] text-white hover:text-[#020403] border border-white/15 flex items-center justify-center transition-all cursor-pointer shadow-lg"
                          title="Previous Partner"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-xs font-serif font-bold text-white/50">
                          {activePartnerIdx + 1} / {PARTNER_TESTIMONIALS.length}
                        </span>
                        <button
                          onClick={() =>
                            setActivePartnerIdx((prev) =>
                              prev === PARTNER_TESTIMONIALS.length - 1 ? 0 : prev + 1
                            )
                          }
                          className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#00D084] text-white hover:text-[#020403] border border-white/15 flex items-center justify-center transition-all cursor-pointer shadow-lg"
                          title="Next Partner"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Pagination Indicators */}
            <div className="flex items-center justify-center gap-2.5 mt-8">
              {PARTNER_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePartnerIdx(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activePartnerIdx === idx
                      ? "w-8 bg-[#00D084]"
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                  title={`View partner ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. FINAL CLOSING CTA SECTION
         ========================================================================= */}
      <section className="py-24 px-6 bg-[#020403] font-serif">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#00D084]">
            India's #1 EV Service Network
          </span>

          <h2 className="text-4xl sm:text-6xl font-serif font-black text-white tracking-tight leading-tight">
            EVs Are Here. <span className="text-[#00D084]">Let's Service Them Right.</span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-serif font-light leading-relaxed max-w-2xl mx-auto">
            Join India's fastest growing EV service network. Build a future-ready business in the EV industry. Our team will reach out within 24 hours of your application.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={scrollToForm}
              className="px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer"
            >
              Become a Partner Now
            </button>
            <a
              href="/store"
              className="px-8 py-4 rounded-full border border-white/20 text-white text-xs font-serif font-bold uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
            >
              Explore Parts
            </a>
            <a
              href="/find-services"
              className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white text-xs font-serif font-bold uppercase tracking-widest hover:bg-white/20 transition-all cursor-pointer"
            >
              Find Centers Near You
            </a>
          </div>
        </div>
      </section>

        </div>
      </div>

      {/* Application Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-serif">
          <div className="bg-[#060c09] border border-white/10 rounded-3xl max-w-lg w-full p-6 md:p-8 relative overflow-hidden font-serif">
            
            <button
              onClick={() => setApplyModalOpen(false)}
              className="absolute top-5 right-5 text-white/40 hover:text-white bg-white/5 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-serif font-bold text-white mt-1">
                {selectedModel.name}
              </h3>
              <p className="text-xs text-white/60 font-serif mt-1">
                Investment: {selectedModel.investment} • Area: {selectedModel.area}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-serif text-white/50 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full bg-[#020403] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-serif focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-serif text-white/50 block mb-1">Email (optional)</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#020403] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-serif focus:outline-none focus:border-[#00D084]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-serif text-white/50 block mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className="w-full bg-[#020403] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-serif focus:outline-none focus:border-[#00D084]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-serif text-white/50 block mb-1">PIN Code</label>
                  <input
                    type="text"
                    placeholder="6-digit PIN"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    className="w-full bg-[#020403] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-serif focus:outline-none focus:border-[#00D084]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-serif text-white/50 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your city"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-[#020403] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-serif focus:outline-none focus:border-[#00D084]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-serif text-white/50 block mb-1">State</label>
                  <input
                    type="text"
                    placeholder="e.g. Maharashtra"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full bg-[#020403] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-serif focus:outline-none focus:border-[#00D084]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-serif text-white/50 block mb-1">Investment Range *</label>
                <select
                  value={form.investmentRange}
                  onChange={(e) => setForm({ ...form, investmentRange: e.target.value })}
                  className="w-full bg-[#020403] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-serif focus:outline-none focus:border-[#00D084]"
                >
                  <option value="< ₹10 Lakh">&lt; ₹10 Lakh (Garage Tier)</option>
                  <option value="₹10L - ₹20L">₹10L – ₹20L (Centre Tier)</option>
                  <option value="> ₹20L">&gt; ₹20L (Hub Tier)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                Submit Partner Application <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Unified Landing Footer */}
      <Footer />

    </div>
  );
}
