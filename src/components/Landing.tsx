import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, animate, AnimatePresence, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@tanstack/react-router";
import { Footer } from "./Footer";
import { CustomerStoriesWall } from "./CustomerStoriesWall";
import { Reveal, StaggerContainer, StaggerItem, SequentialHeader } from "./ui/scroll-reveal";
import { GSAPHeader, GSAPText, useGSAPTextReveal } from "./ui/gsap-text-reveal";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Battery,
  Bolt,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Clock,
  Cpu,
  Crosshair,
  Disc,
  Gauge,
  Globe,
  Home,
  Leaf,
  Mail,
  Map,
  MapPin,
  Menu,
  Minus,
  Package,
  Plus,
  Radio,
  RefreshCw,
  Settings2,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Terminal,
  TrendingUp,
  Truck,
  Upload,
  User,
  UserPlus,
  Wrench,
  X,
  Zap,
  Check,
  Bike,
  Car,
  Gift,
  IndianRupee,
  Phone,
  PhoneCall,
  ShoppingCart,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

import hero from "@/assets/ev-scooter-hero.png";
import modelS from "@/assets/model-s.jpg";
import modelX from "@/assets/model-x.jpg";
import roadster from "@/assets/roadster.jpg";
import tech from "@/assets/tech.jpg";
import interior from "@/assets/interior.jpg";
import energy from "@/assets/energy.jpg";
import factory from "@/assets/factory.jpg";
import botanicalBg from "@/assets/botanical-bg.png";
import evScooterHero from "@/assets/ev-scooter-hero.png";
import evScooterSmall from "@/assets/ev-scooter-small.png";
import evMotorcycleHero from "@/assets/ev-motorcycle-hero.png";
import evThreewheelerHero from "@/assets/ev-threewheeler-hero.png";
import { Ecosystem } from "./Ecosystem";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


/* ---------------- Global theme controller ---------------- */
/**
 * Drives --page-bg via ScrollTrigger scrub, tied to the Interior section pin.
 * Also exposes a "theme" (warm | mid | dark) so the fixed Nav can adapt.
 */
type Theme = "warm" | "mid" | "dark";


import { Nav } from "./Nav";

/* ---------------- Hero ---------------- */
const HERO_SLIDES = [
  {
    id: "scooter",
    heading: "THE PREMIER EV SERVICE ECOSYSTEM",
    cardTitle: "VOLTRIDE X1",
    cardDesc: "VoltRide X1 is a stylish commuter choice.",
    cardImg: evScooterSmall,
    bottomTitle: "SMART MOBILITY FOR EVERYONE",
    bottomDesc: "Enjoy smooth rides, easy charging, and modern design made to simplify short trips across the city.",
    bigImg: evScooterSmall,
    bigImgStyle: {
      width: "clamp(480px, 50%, 980px)",
      bottom: "-90px",
      right: "5%",
    },
    ghostText: "EASY BOOKING IN SECONDS",
    statsValue: "125+",
    statsLabel: "happy riders every day",
    gradStart: "#00D084",
    gradEnd: "#00B574",
    riders: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
    ],
    commands: [
      { cmd: "CMD_01", label: "BOOK SERVICE", icon: "zap", href: "#ev-services" },
      { cmd: "CMD_02", label: "FIND CENTRE", icon: "map-pin", href: "#nearest-center" },
      { cmd: "CMD_03", label: "REQUEST RSA", icon: "phone-call", href: "#request-rsa", isRsa: true },
      { cmd: "CMD_04", label: "FRANCHISE", icon: "store", href: "#join-franchise" },
    ]
  },
  {
    id: "motorcycle",
    heading: "PERFORMANCE MOTORCYCLE TUNING CYCLE",
    cardTitle: "APEX RAPTOR",
    cardDesc: "Raptor series for high-velocity sports dynamics.",
    cardImg: evMotorcycleHero,
    bottomTitle: "UNLEASH HYPER SPORT PERFORMANCE",
    bottomDesc: "Calibrate throttle response, monitor high-speed dyno telemetry, and diagnostics to OEM standards.",
    bigImg: evMotorcycleHero,
    bigImgStyle: {
      width: "clamp(420px, 46%, 860px)",
      bottom: "20px",
      right: "7%",
    },
    ghostText: "DYNO TUNED FOR TRACKS",
    statsValue: "340+",
    statsLabel: "track tests this week",
    gradStart: "#059669",
    gradEnd: "#047857",
    riders: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80"
    ],
    commands: [
      { cmd: "TUNE_01", label: "DYNO RUN", icon: "activity", href: "#ev-services" },
      { cmd: "TUNE_02", label: "ECU FLASH", icon: "cpu", href: "#ev-services" },
      { cmd: "TUNE_03", label: "SUSPENSION", icon: "wrench", href: "#ev-services" },
      { cmd: "TUNE_04", label: "DIAGNOSTICS", icon: "crosshair", href: "#ev-services" },
    ]
  },
  {
    id: "cargo",
    heading: "COMMERCIAL 3-WHEELER FLIGHT SYSTEMS",
    cardTitle: "CARGOPRO 3",
    cardDesc: "Commercial heavy-load cargo chassis.",
    cardImg: evThreewheelerHero,
    bottomTitle: "MAXIMIZE COMMERCIAL FLEET UPTIME",
    bottomDesc: "Engineered for robust urban cargo delivery logistics with 12-point battery swapping thermal diagnostics.",
    bigImg: evThreewheelerHero,
    bigImgStyle: {
      width: "clamp(440px, 48%, 920px)",
      bottom: "-10px",
      right: "6%",
    },
    ghostText: "99.8% UPTIME GUARANTEE",
    statsValue: "1,200+",
    statsLabel: "fleets managed daily",
    gradStart: "#10b981",
    gradEnd: "#059669",
    riders: [
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=100&h=100&q=80",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&h=100&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80"
    ],
    commands: [
      { cmd: "FLT_01", label: "BATTERY SWAP", icon: "zap", href: "#ev-services" },
      { cmd: "FLT_02", label: "LOAD SCAN", icon: "gauge", href: "#ev-services" },
      { cmd: "FLT_03", label: "HUB ROUTER", icon: "map", href: "#ev-services" },
      { cmd: "FLT_04", label: "FLEET CONNECT", icon: "globe", href: "#ev-services" },
    ]
  }
];

/* ---------------- Interactive Hero Multi-Step Get Started Form ---------------- */
function HeroGetStartedForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedOption, setSelectedOption] = useState<"service" | "products" | "buy">("service");
  const [pincode, setPincode] = useState("");
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);

  const OPTIONS = [
    {
      id: "service",
      title: "Service",
      desc: "Repair & diagnostics",
      badge: "Book in 60 seconds",
      icon: <Wrench className="h-4 w-4 text-[#00D084]" />,
    },
    {
      id: "products",
      title: "Products",
      desc: "Parts & accessories",
      badge: "Browse store catalog",
      icon: <Package className="h-4 w-4 text-[#00D084]" />,
    },
    {
      id: "buy",
      title: "Buy EV",
      desc: "Talk to sales",
      badge: "Get expert guidance",
      icon: <ShieldCheck className="h-4 w-4 text-[#00D084]" />,
    },
  ] as const;

  const handleDetectLocation = () => {
    setDetectingLocation(true);
    setLocationStatus("Detecting location...");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setDetectingLocation(false);
          setPincode("Location Verified (GPS)");
          setLocationStatus("Location detected successfully!");
        },
        () => {
          setDetectingLocation(false);
          setLocationStatus("Could not detect. Enter pincode manually.");
        },
        { timeout: 5000 }
      );
    } else {
      setDetectingLocation(false);
      setLocationStatus("Geolocation unavailable.");
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption === "service") {
      window.location.href = `/services?location=${encodeURIComponent(pincode || "default")}`;
    } else if (selectedOption === "products") {
      window.location.href = `/store`;
    } else {
      window.location.href = `/contact`;
    }
  };

  return (
    <div className="w-full bg-[#070908]/95 border border-white/10 hover:border-[#00D084]/40 rounded-[24px] p-4 sm:p-5 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-white font-sans relative overflow-hidden transition-all duration-500 max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-none">
      {/* Background ambient lighting */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#00D084]/10 rounded-full blur-2xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-3"
          >
            {/* Header Badge & Subtitle */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#00D084]/20 bg-[#00D084]/5 backdrop-blur-md mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] shadow-[0_0_8px_#00D084] animate-pulse" />
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#00D084] uppercase">
                  GET STARTED
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white leading-tight">
                What do you want to start?
              </h3>
            </div>

            {/* Selectable Cards */}
            <div className="space-y-2">
              {OPTIONS.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOption(opt.id)}
                    className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all duration-300 flex items-center justify-between gap-2.5 cursor-pointer ${
                      isSelected
                        ? "bg-[#00D084]/10 border-[#00D084] shadow-[0_0_15px_rgba(0,208,132,0.15)]"
                        : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${isSelected ? "bg-[#00D084]/20 border-[#00D084]/40" : "bg-white/5 border-white/10"}`}>
                        {opt.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-xs uppercase tracking-wider text-white truncate">
                            {opt.title}
                          </span>
                          {isSelected && (
                            <span className="text-[8px] font-mono text-[#00D084] uppercase bg-[#00D084]/20 border border-[#00D084]/30 px-1 py-0.2 rounded shrink-0">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-white/60 font-light mt-0.5 truncate">
                          {opt.desc}
                        </p>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono text-white/50 border border-white/10 bg-white/5 px-2 py-0.5 rounded-full shrink-0 hidden sm:inline">
                      {opt.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Action CTA */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-[#00D084] hover:bg-[#00e894] text-black font-extrabold uppercase tracking-wider text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(0,208,132,0.3)] hover:scale-[1.01] cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-white/40 mt-2">
                <ShieldCheck className="h-3 w-3 text-[#00D084]" />
                <span>Doorstep arrival, prompt service</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-3 text-left font-sans"
          >
            {/* Top Title & Back Link */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white m-0">
                Get Started
              </h3>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
            </div>

            {/* Heading & Subtitle */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white/90 m-0">
                First, confirm your location
              </h4>
              <p className="text-[10px] text-white/50 font-normal mt-0.5 m-0">
                So we can check service availability
              </p>
            </div>

            {/* 2 Side-by-Side Action Cards: Detect & Check */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Detect Card */}
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={detectingLocation}
                className="bg-[#0e1310] hover:bg-[#141b17] border border-white/10 hover:border-[#00D084]/40 p-2.5 sm:p-3 rounded-xl flex items-center gap-2.5 text-left transition-all duration-300 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#00D084]/15 border border-[#00D084]/20 flex items-center justify-center shrink-0">
                  <MapPin className={`h-3.5 w-3.5 text-[#00D084] ${detectingLocation ? "animate-bounce" : ""}`} />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block leading-tight truncate">
                    {detectingLocation ? "Detecting..." : "Detect"}
                  </span>
                  <span className="text-[9px] text-white/50 block truncate mt-0.5">
                    Use current location
                  </span>
                </div>
              </button>

              {/* Check Card */}
              <button
                type="button"
                onClick={() => {
                  if (!pincode) setPincode("Huzur, Madhya Pradesh, - 462001");
                  setLocationStatus("Outside service area");
                }}
                className="bg-[#0e1310] hover:bg-[#141b17] border border-white/10 hover:border-[#00D084]/40 p-2.5 sm:p-3 rounded-xl flex items-center gap-2.5 text-left transition-all duration-300 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#00D084]/15 border border-[#00D084]/20 flex items-center justify-center shrink-0">
                  <ArrowRight className="h-3.5 w-3.5 text-[#00D084]" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block leading-tight truncate">
                    Check
                  </span>
                  <span className="text-[9px] text-white/50 block truncate mt-0.5">
                    Verify service area
                  </span>
                </div>
              </button>
            </div>

            {/* Address / Pincode Card Block */}
            <div className="bg-[#0e1310]/90 border border-white/10 rounded-xl p-2.5 sm:p-3 space-y-1.5">
              <label className="block text-[11px] font-medium text-white/60">
                Address / Pincode
              </label>

              <div className="bg-[#050706] border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-white/40 shrink-0" />
                <input
                  type="text"
                  value={pincode || "Huzur, Madhya Pradesh, - 462001"}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter your address / pincode..."
                  className="w-full bg-transparent text-xs font-medium text-white placeholder-white/30 outline-none"
                />
              </div>
            </div>

            {/* Alert Box: Outside Service Area (Amber Tinted Card) */}
            <div className="bg-[#1a1408] border border-amber-500/40 rounded-xl p-3 text-left space-y-0.5">
              <div className="text-[11px] font-bold text-[#f59e0b]">
                Outside service area
              </div>
              <p className="text-[10.5px] text-white/80 font-normal leading-normal m-0">
                We'll convert your booking to a service enquiry — you can still continue.
              </p>
            </div>

            {/* Primary Action Button: Continue - Request Quote */}
            <form onSubmit={handleFinalSubmit} className="pt-0.5 space-y-2">
              <button
                type="submit"
                className="w-full bg-[#00D084] hover:bg-[#00e894] text-black font-extrabold text-xs sm:text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(0,208,132,0.35)] hover:scale-[1.01] cursor-pointer"
              >
                <span>Continue - Request Quote</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              {/* Reassurance Footer */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/40">
                <Clock className="h-3 w-3 text-white/40" />
                <span>Doorstep arrival, prompt service</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const width = scrollContainerRef.current.clientWidth;
    if (width > 0) {
      const index = Math.round(scrollLeft / width);
      if (index !== activeSlide) {
        setActiveSlide(index);
      }
    }
  };

  const scrollToSlide = (index: number) => {
    if (!scrollContainerRef.current) return;
    const width = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: index * width,
      behavior: "smooth"
    });
    setActiveSlide(index);
  };

  // Auto-play interval
  useEffect(() => {
    const interval = setInterval(() => {
      scrollToSlide((activeSlide + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [activeSlide]);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "zap": return <Zap className="h-3.5 w-3.5 text-[#00D084]" />;
      case "map-pin": return <MapPin className="h-3.5 w-3.5 text-white/70 group-hover:text-[#00D084]" />;
      case "phone-call": return <PhoneCall className="h-3.5 w-3.5 text-red-400 group-hover:text-red-300" />;
      case "store": return <Store className="h-3.5 w-3.5 text-white/70 group-hover:text-[#00D084]" />;
      case "activity": return <Activity className="h-3.5 w-3.5 text-[#00D084]" />;
      case "cpu": return <Cpu className="h-3.5 w-3.5 text-white/70 group-hover:text-[#00D084]" />;
      case "wrench": return <Wrench className="h-3.5 w-3.5 text-white/70 group-hover:text-[#00D084]" />;
      case "crosshair": return <Crosshair className="h-3.5 w-3.5 text-white/70 group-hover:text-[#00D084]" />;
      case "gauge": return <Gauge className="h-3.5 w-3.5 text-[#00D084]" />;
      case "map": return <Map className="h-3.5 w-3.5 text-[#00D084]" />;
      case "globe": return <Globe className="h-3.5 w-3.5 text-[#00D084]" />;
      default: return <Zap className="h-3.5 w-3.5" />;
    }
  };

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative w-full overflow-hidden transition-colors duration-300"
      style={{ height: "100svh", minHeight: 700, background: "var(--background)" }}
    >
      {/* Scrollable Slides Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {HERO_SLIDES.map((slide, index) => {
          const isCurrent = index === activeSlide;

          return (
            <div
              key={slide.id}
              className="w-screen h-full flex-shrink-0 snap-start relative overflow-hidden flex flex-col justify-between md:block"
            >
              {/* Background Blob Shape */}
              <div className="absolute inset-0 z-[1] pointer-events-none">
                <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="w-full h-full opacity-80 md:opacity-100">
                  <defs>
                    <linearGradient id={`grad-${slide.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={slide.gradStart} />
                      <stop offset="100%" stopColor={slide.gradEnd} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 85,138 
                       L 315,138 
                       Q 375,138 375,198 
                       Q 375,222 399,222 
                       L 915,222 
                       Q 975,222 975,282 
                       L 975,504 
                       Q 975,564 915,564 
                       L 85,564 
                       Q 25,564 25,504 
                       L 25,198 
                       Q 25,138 85,138 Z"
                    fill={`url(#grad-${slide.id})`}
                  />
                </svg>

                {/* Ghost text inside the shape */}
                <div
                  className="absolute pointer-events-none font-black uppercase leading-[0.9] select-none hidden md:block"
                  style={{
                    fontSize: "clamp(2rem, 5.5vw, 6.2rem)",
                    color: "rgba(255, 255, 255, 0.12)",
                    top: "65%",
                    left: "58%",
                    transform: "translate(-50%, -50%)",
                    letterSpacing: "-0.02em",
                    fontFamily: "var(--font-sans)",
                    width: "60%",
                    whiteSpace: "normal",
                  }}
                >
                  {slide.ghostText}
                </div>
              </div>

              {/* HEADING */}
              <div
                className="w-full text-center px-4 relative z-10"
                style={{
                  paddingTop: "clamp(100px, 12vh, 140px)",
                }}
              >
                <h1
                  className="m-0 p-0 leading-none transition-colors duration-300 flex justify-center flex-wrap"
                  style={{
                    color: "var(--foreground)",
                    fontSize: "clamp(1.2rem, 3.8vw, 4.4rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {slide.heading.split(" ").map((word, i) => {
                    const isItalic = i === 1; // standard format
                    return (
                      <span
                        key={i}
                        className={`mr-[0.25em] inline-block uppercase ${
                          isItalic ? "italic text-[#00D084] font-serif normal-case font-light" : "font-extrabold"
                        }`}
                        style={isItalic ? { fontFamily: "var(--font-serif)", textTransform: "none" } : undefined}
                      >
                        {word}
                      </span>
                    );
                  })}
                </h1>
              </div>

              {/* DESKTOP LAYOUT CONTENT (Visible only on desktop) */}
              <div className="hidden md:block">
                {/* BIG EV VEHICLE IMAGE */}
                <AnimatePresence mode="wait">
                  {isCurrent && (
                    <motion.img
                      key={`img-desk-${slide.id}`}
                      initial={{ x: 120, opacity: 0, scale: 0.8 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      exit={{ x: -120, opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      src={slide.bigImg}
                      alt={slide.cardTitle}
                      className="pointer-events-none select-none block absolute z-[2] animate-float"
                      style={{
                        ...slide.bigImgStyle,
                        objectFit: "contain",
                        filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.25))",
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* HAPPY RIDERS STATS PILL */}
                <div
                  className="absolute z-10 flex items-center gap-3"
                  style={{ right: "5%", top: "26%" }}
                >
                  <div className="flex -space-x-3">
                    {slide.riders.map((imgUrl, i) => (
                      <img key={i} className="inline-block h-9 w-9 rounded-full ring-2 ring-card object-cover" src={imgUrl} alt={`Rider ${i + 1}`} />
                    ))}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-foreground leading-none">{slide.statsValue}</span>
                    <span className="text-[10px] text-muted-foreground font-medium">{slide.statsLabel}</span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* FIXED & STATIONARY GET STARTED MULTI-STEP FORM */}
      <div
        className="absolute z-30 pointer-events-auto left-5 right-5 md:left-[6.5%] top-[170px] md:top-[210px] w-auto md:w-[32%] max-w-[400px]"
      >
        <HeroGetStartedForm />
      </div>

      {/* Navigation Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-black/40 border border-white/5 backdrop-blur-md px-4 py-2 rounded-full">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeSlide === index
                ? "bg-[#00D084] w-6 shadow-[0_0_8px_#00D084]"
                : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Left/Right Chevrons (Desktop Only) */}
      <button
        onClick={() => scrollToSlide((activeSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 border border-white/5 items-center justify-center text-white/60 hover:text-[#00D084] hover:border-[#00D084]/40 hover:bg-[#00D084]/5 hover:scale-105 transition-all cursor-pointer"
      >
        <ChevronDown className="h-5 w-5 rotate-90" />
      </button>
      <button
        onClick={() => scrollToSlide((activeSlide + 1) % HERO_SLIDES.length)}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 border border-white/5 items-center justify-center text-white/60 hover:text-[#00D084] hover:border-[#00D084]/40 hover:bg-[#00D084]/5 hover:scale-105 transition-all cursor-pointer"
      >
        <ChevronDown className="h-5 w-5 -rotate-90" />
      </button>
    </section>
  );
}

/* ---------------- Select Your EV Type (Redesigned: Premium GSAP Scroll Showcase) ---------------- */
const EV_TYPES = [
  {
    id: "01",
    num: "01",
    tag: "01 // TWO WHEELER",
    category: "PERSONAL MOBILITY",
    title: "ELECTRIC SCOOTER",
    desc: "BMS firmware calibration, active thermal scanning, and rapid motor diagnostics for urban 2-wheelers.",
    bgImage: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1400&auto=format&fit=crop&q=85",
    metrics: [
      { label: "SLA PASS RATE", val: "99.4%" },
      { label: "DIAGNOSTIC TIME", val: "15 MIN" },
      { label: "STARTING COST", val: "₹499" },
    ],
    brands: ["Ola S1 Pro", "Ather 450X", "TVS iQube", "Bajaj Chetak", "Hero Vida"],
  },
  {
    id: "02",
    num: "02",
    tag: "02 // HIGH PERFORMANCE",
    category: "SUPERSPORT & URBAN BIKES",
    title: "PERFORMANCE MOTORCYCLE",
    desc: "High-voltage isolation testing, dyno telemetry, and active liquid-cooling loop optimization.",
    bgImage: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1400&auto=format&fit=crop&q=85",
    metrics: [
      { label: "RIDER RATING", val: "4.9 / 5" },
      { label: "CELL BALANCING", val: "0.1mV" },
      { label: "STARTING COST", val: "₹799" },
    ],
    brands: ["Revolt RV400", "Ultraviolette F77", "Matter AERA", "Tork Kratos"],
  },
  {
    id: "03",
    num: "03",
    tag: "03 // PASSENGER TRANSIT",
    category: "COMMERCIAL RICKSHAW & TRANSIT",
    title: "3-WHEELER PASSENGER",
    desc: "Differential axle alignment, battery swap dock validation, and gearbox thermal audits.",
    bgImage: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1400&auto=format&fit=crop&q=85",
    metrics: [
      { label: "SERVICED UNITS", val: "12,000+" },
      { label: "SWAP DOCK SLA", val: "99.9%" },
      { label: "STARTING COST", val: "₹599" },
    ],
    brands: ["Mahindra Treo", "Piaggio Ape E-City", "Mayuri EV", "Yatri E-Rickshaw"],
  },
  {
    id: "04",
    num: "04",
    tag: "04 // LOGISTICS & CARGO",
    category: "LAST-MILE FREIGHT",
    title: "3-WHEELER CARGO",
    desc: "Chassis leaf spring tuning, high-load BMS current limit checks, and regenerative braking calibration.",
    bgImage: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1400&auto=format&fit=crop&q=85",
    metrics: [
      { label: "FLEET UPTIME", val: "99.8%" },
      { label: "PAYLOAD AUDIT", val: "750 KG" },
      { label: "STARTING COST", val: "₹699" },
    ],
    brands: ["Euler HiLoad", "Mahindra Zor Grand", "Altigreen neEV", "Cargo Plus"],
  },
  {
    id: "05",
    num: "05",
    tag: "05 // ENTERPRISE FLEET",
    category: "COMMERCIAL CABS & CARS",
    title: "FLEET VEHICLES",
    desc: "Predictive cell degradation analytics, automated API alert hooks, and fast DC charging safety audits.",
    bgImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1400&auto=format&fit=crop&q=85",
    metrics: [
      { label: "TELEMATICS API", val: "REALTIME" },
      { label: "DC FAST SLA", val: "100%" },
      { label: "PRICING MODEL", val: "CUSTOM SLA" },
    ],
    brands: ["Tata Xpres-T", "BYD e6", "Mahindra eVerito", "Tata Tigor EV"],
  },
  {
    id: "06",
    num: "06",
    tag: "06 // MICRO MOBILITY",
    category: "EXPRESS DELIVERY FLEETS",
    title: "DELIVERY E-BIKES",
    desc: "Dual-battery dock maintenance, brake pad diagnostics, and 30-minute express doorstep RSA.",
    bgImage: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=1400&auto=format&fit=crop&q=85",
    metrics: [
      { label: "EXPRESS TURNAROUND", val: "30 MIN" },
      { label: "RSA COVERAGE", val: "24 / 7" },
      { label: "PRICING MODEL", val: "FLEXIBLE" },
    ],
    brands: ["Zypp Cargo", "Yulu Wynn", "Hero Lectro", "Kinetic Green"],
  },
];

function EVTypeSelection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bentoGridRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger Entrance for Bento Cards
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        ".bento-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Bento cards stagger entrance
      gsap.fromTo(
        ".bento-card",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bentoGridRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ev-services"
      className="relative bg-[#020403] py-28 sm:py-36 border-y border-white/10 overflow-hidden text-white font-sans selection:bg-[#00D084] selection:text-black"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-[#00D084]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-emerald-950/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid line background texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-16 relative z-10">
        {/* Bento Section Header */}
        <div className="bento-header flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            {/* Code Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00D084]/20 bg-[#00D084]/5 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00D084] shadow-[0_0_10px_#00D084] animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#00D084] uppercase">
                // 02. MULTI-BRAND ARCHITECTURE MATRIX
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-[-0.04em] text-white leading-[0.92]">
              SPECTRUM <span className="text-[#00D084] drop-shadow-[0_0_35px_rgba(0,208,132,0.3)]">OF CARE.</span>
            </h2>
          </div>

          {/* Subtitle & Metadata */}
          <div className="max-w-md lg:text-right space-y-3">
            <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
              Precision diagnostics, BMS cell balancing, and hardware calibrations tailored across six core EV architectures.
            </p>
            <div className="flex items-center justify-start lg:justify-end gap-4 font-mono text-xs text-white/40 pt-2 border-t border-white/5">
              <span>06 DOMAINS</span>
              <span>•</span>
              <span>100% SLA COMPLIANCE</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BENTO GRID (Asymmetrical 12-Column Responsive Layout)
           ========================================================================= */}
        <div ref={bentoGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* BENTO CARD 1: Hero Featured Card (Electric Scooter - 7 cols) */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bento-card lg:col-span-7 bg-[#070908]/90 border border-white/10 hover:border-[#00D084]/50 rounded-[36px] p-8 sm:p-10 lg:p-12 relative overflow-hidden backdrop-blur-2xl group flex flex-col justify-between min-h-[440px] lg:min-h-[500px] shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_70px_rgba(0,208,132,0.18)] transition-all duration-500"
          >
            {/* Background Image with Vignette */}
            <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-45 transition-opacity duration-700 pointer-events-none">
              <img
                src={EV_TYPES[0].bgImage}
                alt={EV_TYPES[0].title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070908] via-[#070908]/75 to-transparent" />
            </div>

            {/* Faint Background Mono Code */}
            <span className="text-9xl sm:text-[14rem] font-black font-mono text-white/[0.03] absolute right-6 top-0 select-none pointer-events-none leading-none">
              01
            </span>

            {/* Top Badge & Live Status HUD */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6">
              <span className="text-xs font-mono text-[#00D084] font-bold tracking-widest uppercase">
                01 // TWO WHEELER
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#00D084] shadow-[0_0_8px_#00D084] animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-[#00D084] uppercase">
                  99.4% SLA PASS RATE
                </span>
              </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-xl my-auto">
              <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.03em] text-white leading-tight mb-3 group-hover:text-[#00D084] transition-colors">
                {EV_TYPES[0].title}
              </h3>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6">
                {EV_TYPES[0].desc}
              </p>

              {/* 3 Metric HUD Indicators */}
              <div className="py-4 border-y border-white/10 grid grid-cols-3 gap-4 mb-6">
                {EV_TYPES[0].metrics.map((m, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-0.5">
                      {m.label}
                    </span>
                    <span className="text-lg sm:text-2xl font-black font-mono text-[#00D084] tracking-tight">
                      {m.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Compatible Brands & Action CTA */}
            <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono text-white/30 uppercase mr-1">SUPPORTED:</span>
                {EV_TYPES[0].brands.map((b, i) => (
                  <span key={i} className="text-[10px] font-mono text-white/80 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                    {b}
                  </span>
                ))}
              </div>

              <Link
                to="/services"
                className="shrink-0 bg-[#00D084] hover:bg-[#00e894] text-black font-extrabold uppercase tracking-wider text-xs px-7 py-3.5 rounded-full flex items-center gap-2 transition-all duration-300 shadow-[0_0_25px_rgba(0,208,132,0.3)] hover:scale-105 group/btn cursor-pointer"
              >
                <span>INITIATE DIAGNOSTIC</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* BENTO CARD 2: Tall Feature Card (Performance Motorcycle - 5 cols) */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bento-card lg:col-span-5 bg-[#070908]/90 border border-white/10 hover:border-[#00D084]/50 rounded-[36px] p-8 sm:p-10 relative overflow-hidden backdrop-blur-2xl group flex flex-col justify-between min-h-[440px] lg:min-h-[500px] shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_70px_rgba(0,208,132,0.18)] transition-all duration-500"
          >
            {/* Background Image with Dark Gradient Overlay */}
            <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-45 transition-opacity duration-700 pointer-events-none">
              <img
                src={EV_TYPES[1].bgImage}
                alt={EV_TYPES[1].title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070908] via-[#070908]/80 to-transparent" />
            </div>

            {/* Faint Background Mono Code */}
            <span className="text-9xl font-black font-mono text-white/[0.03] absolute right-6 top-0 select-none pointer-events-none leading-none">
              02
            </span>

            {/* Top Header */}
            <div className="relative z-10 flex items-center justify-between gap-4 mb-6">
              <span className="text-xs font-mono text-[#00D084] font-bold tracking-widest uppercase">
                02 // HIGH PERFORMANCE
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 border border-white/10 px-3 py-1 rounded-full bg-white/5">
                4.9/5 RIDER RATING
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 my-auto">
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-[-0.03em] text-white leading-tight mb-3 group-hover:text-[#00D084] transition-colors">
                {EV_TYPES[1].title}
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                {EV_TYPES[1].desc}
              </p>

              <div className="py-4 border-y border-white/10 grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-[9px] font-mono uppercase text-white/40 block mb-0.5">CELL BALANCING</span>
                  <span className="text-lg font-mono font-bold text-[#00D084]">0.1mV LIMIT</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase text-white/40 block mb-0.5">STARTING PRICE</span>
                  <span className="text-lg font-mono font-bold text-white">₹799</span>
                </div>
              </div>
            </div>

            {/* Brands & Arrow CTA */}
            <div className="relative z-10 pt-4 flex items-center justify-between gap-4 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {EV_TYPES[1].brands.slice(0, 3).map((b, i) => (
                  <span key={i} className="text-[10px] font-mono text-white/70 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                    {b}
                  </span>
                ))}
              </div>

              <Link
                to="/services"
                className="w-11 h-11 rounded-full bg-[#00D084] text-black hover:bg-[#00e894] transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-[0_0_20px_rgba(0,208,132,0.3)] hover:scale-110"
              >
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {/* BENTO CARD 3: 3-Wheeler Passenger (4 cols) */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bento-card lg:col-span-4 bg-[#070908]/90 border border-white/10 hover:border-[#00D084]/50 rounded-[32px] p-8 relative overflow-hidden backdrop-blur-2xl group flex flex-col justify-between min-h-[320px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_rgba(0,208,132,0.15)] transition-all duration-500"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none">
              <img
                src={EV_TYPES[2].bgImage}
                alt={EV_TYPES[2].title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070908] via-[#070908]/85 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between gap-4 mb-4">
              <span className="text-xs font-mono text-[#00D084] font-bold tracking-widest uppercase">
                03 // TRANSIT
              </span>
              <span className="text-[10px] font-mono text-[#00D084] border border-[#00D084]/20 bg-[#00D084]/5 px-2.5 py-1 rounded-full">
                12,000+ SERVICED
              </span>
            </div>

            <div className="relative z-10 my-auto">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-[-0.03em] text-white leading-tight mb-2 group-hover:text-[#00D084] transition-colors">
                {EV_TYPES[2].title}
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed line-clamp-2 mb-4">
                {EV_TYPES[2].desc}
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-white/50">STARTS AT ₹599</span>
              <Link
                to="/services"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#00D084] group-hover:text-black group-hover:border-[#00D084] transition-all flex items-center justify-center shrink-0 cursor-pointer"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* BENTO CARD 4: 3-Wheeler Cargo (4 cols) */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bento-card lg:col-span-4 bg-[#070908]/90 border border-white/10 hover:border-[#00D084]/50 rounded-[32px] p-8 relative overflow-hidden backdrop-blur-2xl group flex flex-col justify-between min-h-[320px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_rgba(0,208,132,0.15)] transition-all duration-500"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none">
              <img
                src={EV_TYPES[3].bgImage}
                alt={EV_TYPES[3].title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070908] via-[#070908]/85 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between gap-4 mb-4">
              <span className="text-xs font-mono text-[#00D084] font-bold tracking-widest uppercase">
                04 // LOGISTICS
              </span>
              <span className="text-[10px] font-mono text-[#00D084] border border-[#00D084]/20 bg-[#00D084]/5 px-2.5 py-1 rounded-full">
                99.8% UPTIME
              </span>
            </div>

            <div className="relative z-10 my-auto">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-[-0.03em] text-white leading-tight mb-2 group-hover:text-[#00D084] transition-colors">
                {EV_TYPES[3].title}
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed line-clamp-2 mb-4">
                {EV_TYPES[3].desc}
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-white/50">STARTS AT ₹699</span>
              <Link
                to="/services"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#00D084] group-hover:text-black group-hover:border-[#00D084] transition-all flex items-center justify-center shrink-0 cursor-pointer"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* BENTO CARD 5: Fleet & Delivery EVs (4 cols) */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bento-card lg:col-span-4 bg-[#070908]/90 border border-white/10 hover:border-[#00D084]/50 rounded-[32px] p-8 relative overflow-hidden backdrop-blur-2xl group flex flex-col justify-between min-h-[320px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_rgba(0,208,132,0.15)] transition-all duration-500"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none">
              <img
                src={EV_TYPES[4].bgImage}
                alt={EV_TYPES[4].title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070908] via-[#070908]/85 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between gap-4 mb-4">
              <span className="text-xs font-mono text-[#00D084] font-bold tracking-widest uppercase">
                05 // FLEET & DELIVERY
              </span>
              <span className="text-[10px] font-mono text-[#00D084] border border-[#00D084]/20 bg-[#00D084]/5 px-2.5 py-1 rounded-full">
                24/7 RSA & API
              </span>
            </div>

            <div className="relative z-10 my-auto">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-[-0.03em] text-white leading-tight mb-2 group-hover:text-[#00D084] transition-colors">
                FLEET & DELIVERY EVs
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed line-clamp-2 mb-4">
                Enterprise telematics synchronization, rapid 30-minute doorstep RSA, and DC fast charging validation.
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-white/50">CUSTOM SLA MODEL</span>
              <Link
                to="/services"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#00D084] group-hover:text-black group-hover:border-[#00D084] transition-all flex items-center justify-center shrink-0 cursor-pointer"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ---------------- Genuine Spare Parts (Image 3) ---------------- */
const SPARE_PARTS = [
  {
    title: "Lithium-Ion Batteries",
    desc: "High density energy packs with built-in thermal management and battery monitoring system (BMS).",
    price: "₹24,999",
    icon: <Zap className="h-5 w-5 text-[#00D084]" />,
    hud: {
      type: "ENERGY STORAGE MODULE",
      density: "240 Wh/kg",
      thermal: "Max 65°C Limit",
      config: "20S8P NMC Cells",
      voltage: "72V Nominal"
    }
  },
  {
    title: "Smart Chargers",
    desc: "Fast charging power adapter blocks with voltage protection and intelligent auto-shutoff.",
    price: "₹3,499",
    icon: <Zap className="h-5 w-5 text-[#00D084]" />,
    hud: {
      type: "HIGH FREQUENCY RECTIFIER",
      density: "96.8% Efficiency",
      thermal: "Active Fan Cooled",
      config: "CAN-Bus Protocol v2.1",
      voltage: "84V Peak Out"
    }
  },
  {
    title: "Motor Controllers",
    desc: "Advanced digital motor controller units for smooth power delivery and regenerative braking.",
    price: "₹7,999",
    icon: <Cpu className="h-5 w-5 text-[#00D084]" />,
    hud: {
      type: "DIGITAL POWER INVERTER",
      density: "Field-Oriented Control",
      thermal: "Aluminium Heatsink",
      config: "ARM Cortex-M4 MCU",
      voltage: "Phase Peak 350A"
    }
  },
  {
    title: "EV Optimized Tires",
    desc: "Low rolling resistance specialized tubeless tires designed for maximum range and grip.",
    price: "₹1,899",
    icon: <Bike className="h-6 w-6 text-[#00D084]" />,
    hud: {
      type: "COMPOSITE GRIP TYRE",
      density: "Low Roll Compound",
      thermal: "All-Weather Silica",
      config: "Load Index 92 (630kg)",
      voltage: "Speed Rating P"
    }
  }
];

function GenuineSpareParts() {
  const [hoveredIdx, setHoveredIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  const activePart = SPARE_PARTS[hoveredIdx];

  // Micro-animate HUD on active part change
  useEffect(() => {
    if (!hudRef.current) return;
    gsap.fromTo(hudRef.current,
      { opacity: 0.4, scale: 0.99 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    );
  }, [hoveredIdx]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    gsap.fromTo(".spare-part-card",
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} id="warehouse" className="relative bg-[#020403] py-28 border-b border-white/5 overflow-hidden">
      
      {/* Ambient glowing spots */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#00D084]/2 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Header */}
        <GSAPHeader
          badge="E-Commerce Catalogue"
          title="Genuine"
          highlight="Spare Parts"
          subtitle="Order 100% certified OEM-standard electric components directly from our service hubs. Guaranteed compatibility, full warranty coverage, and next-day dispatch."
          className="max-w-2xl mb-16 text-left"
        />

        {/* Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Live CAD Telemetry HUD */}
          <Reveal className="lg:col-span-5 flex flex-col" yOffset={30}>
            <div className="bg-gradient-to-br from-[#050806] to-[#010201] border border-white/5 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden h-full">
            
            {/* Grid graphic background */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(to right, #00D084 1px, transparent 1px), linear-gradient(to bottom, #00D084 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }}
            />

            <div ref={hudRef} className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                    CAD Specification HUD
                  </span>
                  <span className="text-[9px] font-mono text-[#00D084] bg-[#00D084]/10 rounded px-2 py-0.5 font-bold">
                    OEM_CERTIFIED
                  </span>
                </div>

                <div className="mt-6">
                  <span className="text-[9px] uppercase tracking-wider text-[#00D084] font-mono font-bold">
                    System Classification
                  </span>
                  <h4 className="text-white font-bold text-lg mt-1 font-mono tracking-tight">
                    {activePart.hud.type}
                  </h4>
                </div>

                {/* Specs List */}
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between border-b border-white/[0.03] pb-2 text-xs">
                    <span className="text-white/40 font-mono">VOLTAGE CLASS</span>
                    <span className="text-white font-mono font-bold">{activePart.hud.voltage}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.03] pb-2 text-xs">
                    <span className="text-white/40 font-mono">EFFICIENCY / DENSITY</span>
                    <span className="text-white font-mono font-bold">{activePart.hud.density}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.03] pb-2 text-xs">
                    <span className="text-white/40 font-mono">BMS CONFIGURATION</span>
                    <span className="text-white font-mono font-bold">{activePart.hud.config}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.03] pb-2 text-xs">
                    <span className="text-white/40 font-mono">THERMAL COEFFICIENT</span>
                    <span className="text-[#00D084] font-mono font-bold">{activePart.hud.thermal}</span>
                  </div>
                </div>

                {/* Assurance points */}
                <ul className="mt-8 space-y-3">
                  <li className="flex items-center gap-2.5 text-xs text-white/70">
                    <Check className="h-4 w-4 text-[#00D084]" />
                    <span>100% Genuine OEM Standards</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-white/70">
                    <Check className="h-4 w-4 text-[#00D084]" />
                    <span>12-Month Replacement Warranty</span>
                  </li>
                </ul>
              </div>

              {/* Order action */}
              <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 font-mono uppercase">Catalogue Price</span>
                  <span className="text-xl font-bold text-white font-mono mt-0.5">{activePart.price}</span>
                </div>
                <a
                  href="#warehouse"
                  className="rounded-full text-xs font-bold flex items-center gap-1.5 px-5 py-3.5 transition-all hover:scale-[1.02] cursor-pointer"
                  style={{ background: "#00D084", color: "#020403" }}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Order Component
                </a>
              </div>
            </div>
            </div>
          </Reveal>

          {/* Right panel: Parts Grid */}
          <StaggerContainer staggerDelay={0.1} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SPARE_PARTS.map((part, i) => {
              const isHovered = hoveredIdx === i;
              return (
                <StaggerItem
                  key={i}
                  onMouseEnter={() => setHoveredIdx(i)}
                  className={`spare-part-card group bg-[#050806] border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? "border-[#00D084]/40 bg-[#070c09] shadow-[0_15px_30px_-10px_rgba(0,208,132,0.05)]"
                      : "border-white/5 hover:border-white/10 hover:bg-[#070b08]"
                  }`}
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      isHovered ? "bg-[#00D084]/20 text-[#00D084]" : "bg-white/5 text-[#00D084]/80"
                    }`}>
                      {part.icon}
                    </div>
                    <h3 className="text-white font-bold text-sm mt-5 group-hover:text-[#00D084] transition-colors">
                      {part.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-3 leading-relaxed font-light">
                      {part.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white">{part.price}</span>
                    <span className="text-[10px] text-[#00D084] font-mono group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      SPEC &gt;
                    </span>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

        </div>
      </div>
    </section>
  );
}

/* ---------------- How It Works Horizontal (Cinematic 4-Step) ---------------- */
function HowItWorksHorizontal() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const getScrollWidth = () => {
          const scrollWidth = sectionRef.current?.scrollWidth || 0;
          return scrollWidth;
        };

        // Distance required to slide in and center the cards container
        const getTranslateX = () => {
          const scrollWidth = getScrollWidth();
          return -((scrollWidth + window.innerWidth) / 2);
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${Math.abs(getTranslateX())}`,
            invalidateOnRefresh: true,
          },
        });

        // Translate the cards container to the center of the viewport
        tl.to(sectionRef.current, {
          x: () => getTranslateX(),
          ease: "none",
        }, 0);

        // Fade out the stationary title block in the center as cards slide in
        tl.to(".how-it-works-title-layer", {
          opacity: 0,
          scale: 0.95,
          ease: "power1.inOut",
        }, 0);

        // Animate the progress of the circuit pipeline
        tl.fromTo(
          ".circuit-progress-line",
          { width: "0%" },
          {
            width: "100%",
            ease: "none",
          },
          0
        );
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Select Service",
      desc: "Choose from doorstep service or visit our service centers"
    },
    {
      num: "02",
      title: "Choose Location",
      desc: "Enter your address or select nearest service center"
    },
    {
      num: "03",
      title: "Technician Diagnosis",
      desc: "Our certified technician diagnoses your EV with AI tools"
    },
    {
      num: "04",
      title: "Service Completion",
      desc: "Get your EV serviced with genuine parts and warranty"
    }
  ];

  return (
    <section ref={triggerRef} className="relative w-full bg-black overflow-hidden lg:h-screen flex items-center select-none border-b border-white/5">
      {/* 1. Stationary Title (Centered on desktop, z-index 10) */}
      <div className="how-it-works-title-layer w-full lg:absolute lg:inset-0 flex flex-col items-center justify-center px-6 lg:z-10 text-center lg:pointer-events-none mb-12 lg:mb-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#0d1410] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00D084] w-fit mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-ping" />
          Simple 4-Step Process
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          How It <span className="text-[#00D084]">Works</span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base font-light leading-relaxed max-w-md mx-auto">
          Simple 4-step process to get your EV serviced
        </p>
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#00D084]/60 mt-12 animate-pulse justify-center">
          <span>SCROLL DOWN TO REVEAL PROCESS</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      {/* 2. Sliding Cards Track (z-index 20) */}
      <div 
        ref={sectionRef} 
        className="w-full flex flex-col lg:absolute lg:top-0 lg:left-full lg:h-full lg:w-max lg:flex-row lg:items-center py-20 px-6 lg:py-0 lg:px-0 z-20"
      >
        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:px-24 w-full">
          
          {/* Animated Connecting Circuit Pipeline */}
          <div className="hidden lg:block absolute left-[246px] right-[246px] top-[68px] h-[2px] bg-white/5 z-0">
            <div className="circuit-progress-line h-full bg-gradient-to-r from-[#00D084] to-emerald-400 w-0 shadow-[0_0_10px_#00D084]" />
          </div>

          {/* Cards */}
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="w-full lg:w-[300px] bg-[#050806] border border-white/5 hover:border-[#00D084]/30 rounded-[32px] p-8 pt-10 pb-10 flex flex-col items-center min-h-[280px] relative transition-all duration-300 hover:shadow-[0_20px_40px_-20px_rgba(0,208,132,0.06)] shrink-0 z-10 group"
            >
              {/* Circle number */}
              <div className="w-14 h-14 rounded-full bg-[#00D084]/10 border border-[#00D084]/20 flex items-center justify-center text-[#00D084] text-base font-bold font-mono shadow-[0_0_15px_rgba(0,208,132,0.1)] group-hover:scale-110 transition-transform duration-300">
                {step.num}
              </div>

              {/* Title */}
              <h3 className="text-white font-extrabold text-xl tracking-tight mt-6 group-hover:text-[#00D084] transition-colors duration-300 text-center">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-xs leading-relaxed mt-4 font-light text-center max-w-[240px]">
                {step.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>


  );
}

/* ---------------- How It Works (Image 4) ---------------- */
function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [configPack, setConfigPack] = useState<"standard" | "pro">("pro");
  const [batteryCharge, setBatteryCharge] = useState(72);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate battery charge value for the calibration step
  useEffect(() => {
    if (activeStep === 2) {
      const interval = setInterval(() => {
        setBatteryCharge((prev) => (prev >= 100 ? 72 : prev + 1));
      }, 150);
      return () => clearInterval(interval);
    }
  }, [activeStep]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    gsap.fromTo(".how-it-works-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".step-premium-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#020403] py-32 border-b border-white/5 overflow-hidden">
      {/* Editorial aesthetic lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00D084]/2 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.01] rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Editorial Section Header */}
        <GSAPHeader
          badge="The Service Cycle"
          title="Engineered"
          highlight="Simplicity."
          subtitle="A three-phase service workflow engineered to deliver maximum performance, real-time tracking, and complete clarity for your electric vehicle."
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20"
        />

        {/* 3 Step Premium Cards - Desktop Only */}
        <StaggerContainer staggerDelay={0.12} className="hidden lg:grid lg:grid-cols-3 gap-8 relative items-stretch">
          
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[280px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#00D084]/10 to-transparent pointer-events-none" />

          {/* STEP 1: Select & Book */}
          <div
            onClick={() => setActiveStep(0)}
            className={`step-premium-card group relative bg-gradient-to-b border rounded-[32px] p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer min-h-[580px] ${
              activeStep === 0
                ? "from-[#0a120e] to-[#040806] border-[#00D084]/30 shadow-[0_30px_60px_-15px_rgba(0,208,132,0.1)]"
                : "from-[#060907] to-[#030504] border-white/5 hover:border-white/10 hover:from-[#080d0a] hover:to-[#040705]"
            }`}
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#00D084] font-bold">01 // DIAGNOSTIC CONFIG</span>
              <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeStep === 0 ? "bg-[#00D084] shadow-[0_0_8px_#00D084]" : "bg-white/10"}`} />
            </div>

            {/* Sleek App UI Container */}
            <div className="my-8 bg-[#070b09]/60 border border-white/5 rounded-3xl p-5 relative overflow-hidden flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                  <span className="text-[10px] tracking-widest text-[#00D084] font-bold">SELECT METHOD</span>
                  <span className="text-[10px] text-white/40">STEP 1/3</span>
                </div>
                
                <div className="space-y-3">
                  {/* Option 1 */}
                  <div
                    onClick={(e) => { e.stopPropagation(); setConfigPack("standard"); }}
                    className={`p-3.5 rounded-2xl border transition-all duration-300 relative flex items-center justify-between cursor-pointer ${
                      configPack === "standard"
                        ? "bg-[#0d1410] border-[#00D084]/40 shadow-[0_0_15px_rgba(0,208,132,0.05)]"
                        : "bg-black/40 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${configPack === "standard" ? "bg-[#00D084]/20 text-[#00D084]" : "bg-white/5 text-white/60"}`}>
                        <Home className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-white text-xs font-bold">Doorstep Service</h4>
                        <p className="text-[9.5px] text-white/40 mt-0.5 font-light">Technician visits you</p>
                      </div>
                    </div>
                    {configPack === "standard" && (
                      <span className="bg-[#00D084]/15 text-[#00D084] text-[8px] font-bold px-1.5 py-0.5 rounded-full">POPULAR</span>
                    )}
                  </div>

                  {/* Option 2 */}
                  <div
                    onClick={(e) => { e.stopPropagation(); setConfigPack("pro"); }}
                    className={`p-3.5 rounded-2xl border transition-all duration-300 relative flex items-center justify-between cursor-pointer ${
                      configPack === "pro"
                        ? "bg-[#0d1410] border-[#00D084]/40 shadow-[0_0_15px_rgba(0,208,132,0.05)]"
                        : "bg-black/40 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${configPack === "pro" ? "bg-[#00D084]/20 text-[#00D084]" : "bg-white/5 text-white/60"}`}>
                        <Store className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-white text-xs font-bold">Service Center</h4>
                        <p className="text-[9.5px] text-white/40 mt-0.5 font-light">Visit our diagnostics hub</p>
                      </div>
                    </div>
                    {configPack === "pro" && (
                      <span className="bg-[#00D084]/15 text-[#00D084] text-[8px] font-bold px-1.5 py-0.5 rounded-full">EXPRESS</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-white/40 font-light">Estimated Booking</span>
                <span className="text-white font-bold">{configPack === "standard" ? "Doorstep (45 min)" : "Center (90 min)"}</span>
              </div>
            </div>

            {/* Core Info */}
            <div className="mt-auto">
              <h3 className="text-white font-bold text-xl tracking-tight group-hover:text-[#00D084] transition-colors">
                Select & Book
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mt-3 font-light">
                Choose your specific EV type, configure diagnostic modules with clear pricing, and book your service slot.
              </p>
            </div>
          </div>

          {/* STEP 2: Diagnostic Pickup */}
          <div
            onClick={() => setActiveStep(1)}
            className={`step-premium-card group relative bg-gradient-to-b border rounded-[32px] p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer min-h-[580px] ${
              activeStep === 1
                ? "from-[#0a120e] to-[#040806] border-[#00D084]/30 shadow-[0_30px_60px_-15px_rgba(0,208,132,0.1)]"
                : "from-[#060907] to-[#030504] border-white/5 hover:border-white/10 hover:from-[#080d0a] hover:to-[#040705]"
            }`}
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-wider text-[#00D084] font-bold uppercase">02 // ACTIVE DISPATCH</span>
              <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeStep === 1 ? "bg-[#00D084] shadow-[0_0_8px_#00D084]" : "bg-white/10"}`} />
            </div>

            {/* Live GPS Telemetry Mock */}
            <div className="my-8 bg-[#070b09]/60 border border-white/5 rounded-3xl p-5 relative overflow-hidden flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                  <span className="text-[10px] tracking-widest text-[#00D084] font-bold">LIVE DISPATCH</span>
                  <span className="text-[10px] text-white/40">STEP 2/3</span>
                </div>

                {/* Styled Isometric Map Graphic */}
                <div className="h-28 bg-black/40 border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: "radial-gradient(#00D084 1px, transparent 0)",
                      backgroundSize: "12px 12px"
                    }}
                  />
                  
                  {/* Curvy Route Path SVG */}
                  <svg className="absolute w-full h-full stroke-white/10 stroke-2 fill-none">
                    <path d="M 30,80 Q 90,20 150,70 T 250,30" />
                  </svg>
                  
                  {/* Animated Path fill */}
                  <svg className="absolute w-full h-full stroke-[#00D084]/40 stroke-2 fill-none">
                    <path d="M 30,80 Q 90,20 150,70 T 250,30" className="animate-[dash_8s_linear_infinite]"
                      style={{
                        strokeDasharray: "8, 8"
                      }}
                    />
                  </svg>

                  {/* Start Point Dot */}
                  <div className="absolute left-[24px] bottom-[24px] w-3 h-3 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* End Point (Technician Green Marker) */}
                  <div className="absolute right-[44px] top-[24px] w-6 h-6 rounded-full bg-[#00D084]/20 flex items-center justify-center animate-pulse">
                    <div className="w-3 h-3 rounded-full bg-[#00D084] shadow-[0_0_12px_#00D084] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Technician Profile overlay inside the app card */}
              <div className="mt-4 bg-black/50 border border-white/5 rounded-xl p-2.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-950 flex items-center justify-center text-[#00D084] shrink-0 font-bold text-xs">
                  VM
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-[8px] text-white/40">TECH EN ROUTE</div>
                  <div className="text-xs text-white font-bold truncate">Vikram Mehta</div>
                </div>
                <div className="text-right">
                  <div className="text-[10.5px] text-[#00D084] font-bold">14 MINS</div>
                  <div className="text-[8.5px] text-white/30">ETA</div>
                </div>
              </div>
            </div>

            {/* Core Info */}
            <div className="mt-auto">
              <h3 className="text-white font-bold text-xl tracking-tight group-hover:text-[#00D084] transition-colors">
                Pickup & Visit
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mt-3 font-light">
                A certified technician visits your doorstep for diagnostic checks or arranges a secure transport to our service lab.
              </p>
            </div>
          </div>

          {/* STEP 3: Calibration & Return */}
          <div
            onClick={() => setActiveStep(2)}
            className={`step-premium-card group relative bg-gradient-to-b border rounded-[32px] p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer min-h-[580px] ${
              activeStep === 2
                ? "from-[#0a120e] to-[#040806] border-[#00D084]/30 shadow-[0_30px_60px_-15px_rgba(0,208,132,0.1)]"
                : "from-[#060907] to-[#030504] border-white/5 hover:border-white/10 hover:from-[#080d0a] hover:to-[#040705]"
            }`}
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-wider text-[#00D084] font-bold uppercase">03 // RESTORATION LAB</span>
              <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeStep === 2 ? "bg-[#00D084] shadow-[0_0_8px_#00D084]" : "bg-white/10"}`} />
            </div>

            {/* Animated Calibration Dashboard */}
            <div className="my-8 bg-[#070b09]/60 border border-white/5 rounded-3xl p-5 relative overflow-hidden flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                  <span className="text-[10px] tracking-widest text-[#00D084] font-bold">CALIBRATION LAB</span>
                  <span className="text-[10px] text-white/40">STEP 3/3</span>
                </div>

                <div className="flex items-center justify-center py-2 gap-4">
                  {/* Circular SVG Ring Progress bar */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        className="stroke-white/5"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        className="stroke-[#00D084] transition-all duration-300"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 26}
                        strokeDashoffset={2 * Math.PI * 26 * (1 - batteryCharge / 100)}
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 0 6px rgba(0, 208, 132, 0.4))" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-white font-bold text-xs tracking-tight">{batteryCharge}%</span>
                      <span className="text-[6.5px] text-[#00D084] font-mono uppercase">SOH</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-1.5 text-left">
                    <div className="flex flex-col">
                      <span className="text-[7.5px] text-white/40 uppercase font-mono">BMS Status</span>
                      <span className="text-[10.5px] text-white font-bold mt-0.5">Optimum Balance</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[7.5px] text-white/40 uppercase font-mono">Temp Calibration</span>
                      <span className="text-[10.5px] text-white font-bold mt-0.5">38°C (Nominal)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-[10px]">
                <span className="text-white/40 font-light">Calibration Status</span>
                <span className="text-[#00D084] font-mono font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
                  SUCCESS // OK
                </span>
              </div>
            </div>

            {/* Core Info */}
            <div className="mt-auto">
              <h3 className="text-white font-bold text-xl tracking-tight group-hover:text-[#00D084] transition-colors">
                Service & Smart Return
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mt-3 font-light">
                Your vehicle undergoes diagnostic checks and calibration to OEM standards, then gets delivered in peak health.
              </p>
            </div>
          </div>

        </StaggerContainer>

        {/* Mobile Responsive Layout (Visible on mobile/tablet only) */}
        <div className="lg:hidden flex flex-col gap-6">
          {/* Step Selector Tabs */}
          <div className="flex bg-[#070b09]/80 border border-white/5 p-1 rounded-2xl gap-1">
            {[
              { num: "01", label: "Config" },
              { num: "02", label: "Dispatch" },
              { num: "03", label: "Return" }
            ].map((tab, i) => {
              const isSelected = activeStep === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`flex-1 py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                    isSelected
                      ? "bg-[#0d1410] border border-[#00D084]/20 text-[#00D084]"
                      : "text-white/40 border border-transparent"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold leading-none">{tab.num}</span>
                  <span className="text-[11px] font-semibold leading-none">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Card Body */}
          <div className="min-h-[460px] bg-gradient-to-b from-[#0a120e] to-[#040806] border border-[#00D084]/30 rounded-[32px] p-6 flex flex-col justify-between shadow-[0_30px_60px_-15px_rgba(0,208,132,0.1)]">
            
            {/* Top Indicator */}
            {activeStep === 0 && (
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00D084] font-bold">01 // DIAGNOSTIC CONFIG</span>
                <span className="w-2 h-2 rounded-full bg-[#00D084] shadow-[0_0_8px_#00D084]" />
              </div>
            )}
            {activeStep === 1 && (
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-wider text-[#00D084] font-bold uppercase">02 // ACTIVE DISPATCH</span>
                <span className="w-2 h-2 rounded-full bg-[#00D084] shadow-[0_0_8px_#00D084]" />
              </div>
            )}
            {activeStep === 2 && (
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-wider text-[#00D084] font-bold uppercase">03 // RESTORATION LAB</span>
                <span className="w-2 h-2 rounded-full bg-[#00D084] shadow-[0_0_8px_#00D084]" />
              </div>
            )}

            {/* Interactive Visual Element */}
            <div className="my-6 bg-[#070b09]/60 border border-white/5 rounded-3xl p-4 flex-1 flex flex-col justify-between">
              {activeStep === 0 && (
                <>
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                      <span className="text-[10px] tracking-widest text-[#00D084] font-bold">SELECT METHOD</span>
                      <span className="text-[10px] text-white/40">STEP 1/3</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div
                        onClick={() => setConfigPack("standard")}
                        className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                          configPack === "standard"
                            ? "bg-[#0d1410] border-[#00D084]/40"
                            : "bg-black/40 border-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${configPack === "standard" ? "bg-[#00D084]/20 text-[#00D084]" : "bg-white/5 text-white/60"}`}>
                            <Home className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-white text-xs font-bold">Doorstep Service</h4>
                            <p className="text-[9.5px] text-white/40 mt-0.5 font-light">Technician visits you</p>
                          </div>
                        </div>
                        {configPack === "standard" && (
                          <span className="bg-[#00D084]/15 text-[#00D084] text-[8px] font-bold px-1.5 py-0.5 rounded-full">POPULAR</span>
                        )}
                      </div>

                      <div
                        onClick={() => setConfigPack("pro")}
                        className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                          configPack === "pro"
                            ? "bg-[#0d1410] border-[#00D084]/40"
                            : "bg-black/40 border-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${configPack === "pro" ? "bg-[#00D084]/20 text-[#00D084]" : "bg-white/5 text-white/60"}`}>
                            <Store className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-white text-xs font-bold">Service Center</h4>
                            <p className="text-[9.5px] text-white/40 mt-0.5 font-light">Visit our diagnostics hub</p>
                          </div>
                        </div>
                        {configPack === "pro" && (
                          <span className="bg-[#00D084]/15 text-[#00D084] text-[8px] font-bold px-1.5 py-0.5 rounded-full">EXPRESS</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-white/40 font-light">Estimated Booking</span>
                    <span className="text-white font-bold">{configPack === "standard" ? "Doorstep (45 min)" : "Center (90 min)"}</span>
                  </div>
                </>
              )}

              {activeStep === 1 && (
                <>
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                      <span className="text-[10px] tracking-widest text-[#00D084] font-bold">LIVE DISPATCH</span>
                      <span className="text-[10px] text-white/40">STEP 2/3</span>
                    </div>

                    <div className="h-24 bg-black/40 border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 opacity-[0.03]"
                        style={{
                          backgroundImage: "radial-gradient(#00D084 1px, transparent 0)",
                          backgroundSize: "12px 12px"
                        }}
                      />
                      <svg className="absolute w-full h-full stroke-white/10 stroke-2 fill-none">
                        <path d="M 30,60 Q 90,20 150,50 T 250,30" />
                      </svg>
                      <svg className="absolute w-full h-full stroke-[#00D084]/40 stroke-2 fill-none">
                        <path d="M 30,60 Q 90,20 150,50 T 250,30" className="animate-[dash_8s_linear_infinite]"
                          style={{ strokeDasharray: "8, 8" }}
                        />
                      </svg>
                      <div className="absolute left-[24px] bottom-[14px] w-3 h-3 rounded-full bg-white/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <div className="absolute right-[44px] top-[14px] w-6 h-6 rounded-full bg-[#00D084]/20 flex items-center justify-center animate-pulse">
                        <div className="w-3 h-3 rounded-full bg-[#00D084] shadow-[0_0_12px_#00D084] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 bg-black/50 border border-white/5 rounded-xl p-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center text-[#00D084] shrink-0 font-bold text-xs">
                      VM
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-[8px] text-white/40">TECH EN ROUTE</div>
                      <div className="text-xs text-white font-bold truncate">Vikram Mehta</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10.5px] text-[#00D084] font-bold">14 MINS</div>
                      <div className="text-[8.5px] text-white/30">ETA</div>
                    </div>
                  </div>
                </>
              )}

              {activeStep === 2 && (
                <>
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                      <span className="text-[10px] tracking-widest text-[#00D084] font-bold">CALIBRATION LAB</span>
                      <span className="text-[10px] text-white/40">STEP 3/3</span>
                    </div>

                    <div className="flex items-center justify-center py-1 gap-4">
                      <div className="relative w-14 h-14 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="28" cy="28" r="22" className="stroke-white/5" strokeWidth="3" fill="transparent" />
                          <circle cx="28" cy="28" r="22" className="stroke-[#00D084] transition-all duration-300" strokeWidth="3" fill="transparent"
                            strokeDasharray={2 * Math.PI * 22}
                            strokeDashoffset={2 * Math.PI * 22 * (1 - batteryCharge / 100)}
                            strokeLinecap="round"
                            style={{ filter: "drop-shadow(0 0 6px rgba(0, 208, 132, 0.4))" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-white font-bold text-[11px] tracking-tight">{batteryCharge}%</span>
                          <span className="text-[6px] text-[#00D084] font-mono uppercase">SOH</span>
                        </div>
                      </div>
                      <div className="flex-1 space-y-1 text-left">
                        <div className="flex flex-col">
                          <span className="text-[7px] text-white/40 uppercase font-mono">BMS Status</span>
                          <span className="text-[10px] text-white font-bold">Optimum Balance</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[7px] text-white/40 uppercase font-mono">Temp Calibration</span>
                          <span className="text-[10px] text-white font-bold">38°C (Nominal)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between bg-black/40 border border-[#00D084]/20 rounded-xl px-3 py-1.5 text-[9px]">
                    <span className="text-white/40 font-light">Calibration Status</span>
                    <span className="text-[#00D084] font-mono font-bold flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#00D084] animate-pulse" />
                      SUCCESS // OK
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Core Info */}
            <div className="text-left">
              {activeStep === 0 && (
                <>
                  <h3 className="text-white font-bold text-lg tracking-tight">Select & Book</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mt-2 font-light">
                    Choose your specific EV type, configure diagnostic modules with clear pricing, and book your service slot.
                  </p>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <h3 className="text-white font-bold text-lg tracking-tight">Pickup & Visit</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mt-2 font-light">
                    A certified technician visits your doorstep for diagnostic checks or arranges a secure transport to our service lab.
                  </p>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <h3 className="text-white font-bold text-lg tracking-tight">Service & Smart Return</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mt-2 font-light">
                    Your vehicle undergoes diagnostic checks and calibration to OEM standards, then gets delivered in peak health.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Global CTA button */}
        <div className="flex justify-center mt-16">
          <a
            href="#ev-services"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0f0c] px-7 py-4 text-sm font-semibold text-[#00D084] transition-all hover:border-[#00D084]/40 hover:bg-[#00D084]/5"
          >
            Start Your Configuration Cycles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
      `}</style>
    </section>
  );
}




/* ---------------- Vehicle data ---------------- */
type Vehicle = {
  id: string;
  name: string;
  tag: string;
  img: string;
  spec: { k: string; v: string }[];
  desc: string;
};

const VEHICLES: Vehicle[] = [
  {
    id: "model-v", name: "Model V", tag: "Flagship Hypercar", img: hero,
    desc: "The apex of AURORA engineering. Tri-motor architecture and active aero.",
    spec: [{ k: "Range", v: "824 km" }, { k: "0-100", v: "1.9s" }, { k: "Power", v: "1,020 hp" }]
  },
  {
    id: "model-l", name: "Model L", tag: "Executive Sedan", img: modelS,
    desc: "A luxury sedan defined by silence, air suspension, and effortless torque.",
    spec: [{ k: "Range", v: "712 km" }, { k: "0-100", v: "2.4s" }, { k: "Power", v: "760 hp" }]
  },
  {
    id: "model-t", name: "Model T", tag: "Adaptive SUV", img: modelX,
    desc: "Adaptive suspension and dynamic AWD. Where the road ends, presence begins.",
    spec: [{ k: "Range", v: "648 km" }, { k: "0-100", v: "3.1s" }, { k: "Power", v: "680 hp" }]
  },
  {
    id: "roadster", name: "Roadster N", tag: "Open-Sky GT", img: roadster,
    desc: "A roofless grand tourer, tuned for the salt flats and the silk-road highways.",
    spec: [{ k: "Range", v: "998 km" }, { k: "0-100", v: "1.7s" }, { k: "Power", v: "1,180 hp" }]
  },
];

/* ---------------- Cinematic Ecosystem Overview (Framer Motion) ---------------- */
function CinematicEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const [activeTab, setActiveTab] = useState(0);

  const capabilities = [
    {
      id: "diagnostics",
      badge: "AI DIAGNOSTICS",
      title: "Real-Time BMS & Battery Telemetry",
      desc: "Instant health profiling, cell-level voltage balance checks, and thermal runaway prevention using proprietary OBD-II EV scan protocols.",
      metrics: [
        { label: "BMS Scan Time", value: "< 45 sec" },
        { label: "Predictive Accuracy", value: "99.8%" },
        { label: "Supported Protocols", value: "50+" },
      ],
      features: [
        "Cell-level degradation analysis & state-of-health (SoH) rating",
        "Thermal management anomaly detection & alerting",
        "Instant digital report generated for EV owners & insurers"
      ],
      icon: Battery,
      graphicType: "battery",
    },
    {
      id: "spares",
      badge: "LOGISTICS GRID",
      title: "Instant OEM Spare Parts Dispatch",
      desc: "Direct integration with top EV component manufacturers ensuring zero counterfeit parts, automated inventory reordering, and sub-2-hour doorstep delivery.",
      metrics: [
        { label: "Dispatch Speed", value: "< 120 mins" },
        { label: "Genuine Guarantee", value: "100%" },
        { label: "Warehouse Hubs", value: "45+" },
      ],
      features: [
        "Cryptographically signed QR codes for anti-counterfeit verification",
        "Automated reordering when franchise inventory hits threshold",
        "Direct warranty claim processing with 24-hour turnaround"
      ],
      icon: Package,
      graphicType: "spares",
    },
    {
      id: "franchise-os",
      badge: "INTELLIGENT OS",
      title: "Automated Workshop Operations Grid",
      desc: "An all-in-one operating system that handles customer bookings, technician route optimization, job sign-offs, and live commission splits.",
      metrics: [
        { label: "Operational Uptime", value: "99.99%" },
        { label: "Daily Transactions", value: "15,000+" },
        { label: "Settlement Speed", value: "Instant" },
      ],
      features: [
        "Geo-fenced job distribution for minimum technician travel time",
        "Automated invoice & GST compliance generation",
        "Real-time owner dashboard with zero manual reconciliation"
      ],
      icon: Cpu,
      graphicType: "os",
    },
    {
      id: "fleet",
      badge: "FLEET INFRASTRUCTURE",
      title: "Enterprise Fleet Telematics & Uptime",
      desc: "Turnkey maintenance platform for commercial 2W/3W delivery fleets, guaranteeing maximum vehicle uptime and minimized total cost of ownership.",
      metrics: [
        { label: "Fleet Uptime SLA", value: "98.5%" },
        { label: "Cost Reduction", value: "32%" },
        { label: "Active Vehicles", value: "25,000+" },
      ],
      features: [
        "Scheduled night-shift preventive maintenance programs",
        "Swappable battery pack health monitoring",
        "Dedicated account manager & 24/7 road assistance SLA"
      ],
      icon: ShieldCheck,
      graphicType: "fleet",
    },
  ];

  return (
    <section ref={containerRef} className="relative py-28 px-6 lg:px-12 bg-[#020403] overflow-hidden selection:bg-[#00D084] selection:text-[#020403]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#00D084]/10 via-[#00D084]/5 to-transparent blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00D084]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D084]/10 border border-[#00D084]/30 mb-6">
            <Sparkles className="w-4 h-4 text-[#00D084]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#00D084] uppercase">
              NEXT-GEN EV ARCHITECTURE
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-serif text-white tracking-tight leading-[1.1]">
            Connected Intelligence Platform for <span className="text-[#00D084]">Modern EV Mobility</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 mt-6 font-light leading-relaxed max-w-3xl mx-auto">
            Beyond standard repairs: Our proprietary technology stack unifies real-time battery diagnostics, direct OEM logistics, and automated workshop operations into a single intelligent grid.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? "text-[#020403] font-bold shadow-[0_0_25px_rgba(0,208,132,0.4)]"
                    : "text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-[#00D084] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#020403]" : "text-[#00D084]"}`} />
                  {item.badge}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Active Content Feature Card Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-[32px] bg-[#070c09]/80 border border-white/10 p-8 lg:p-12 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.7)] relative overflow-hidden"
          >
            {/* Ambient Background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D084]/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Left Content Area */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8 relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/10 border border-[#00D084]/30 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#00D084] uppercase">
                    {capabilities[activeTab].badge}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-white font-bold tracking-tight mb-4">
                  {capabilities[activeTab].title}
                </h3>
                <p className="text-white/70 text-base md:text-lg leading-relaxed font-light mb-8">
                  {capabilities[activeTab].desc}
                </p>

                {/* Key Features Bullet List */}
                <div className="space-y-3.5">
                  {capabilities[activeTab].features.map((feat, fIdx) => (
                    <motion.div
                      key={fIdx}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * fIdx + 0.2 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#00D084]/20 border border-[#00D084]/50 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#00D084]" />
                      </div>
                      <span className="text-sm md:text-base text-white/90 font-medium">{feat}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                {capabilities[activeTab].metrics.map((m, mIdx) => (
                  <div key={mIdx} className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex flex-col">
                    <span className="text-2xl md:text-3xl font-bold font-mono text-[#00D084]">{m.value}</span>
                    <span className="text-xs text-white/50 font-sans mt-1">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Animated Display Panel */}
            <div className="lg:col-span-5 relative z-10 min-h-[320px] rounded-2xl bg-black/60 border border-white/10 p-6 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] font-mono text-white/40 tracking-wider">LIVE TELEMETRY STREAM</span>
              </div>

              {/* Dynamic Interactive Illustration based on active tab */}
              <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
                {capabilities[activeTab].graphicType === "battery" && (
                  <div className="w-full space-y-6">
                    <div className="relative w-48 h-24 mx-auto border-2 border-[#00D084]/60 rounded-2xl p-2 flex items-center justify-between overflow-hidden bg-emerald-950/20">
                      <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#00D084]/60 rounded-r-md" />
                      {/* Cell Bars */}
                      {[1, 2, 3, 4, 5].map((bar) => (
                        <motion.div
                          key={bar}
                          initial={{ opacity: 0.3, height: "40%" }}
                          animate={{ opacity: [0.4, 1, 0.4], height: ["60%", "90%", "60%"] }}
                          transition={{ duration: 2, repeat: Infinity, delay: bar * 0.2 }}
                          className="w-6 bg-[#00D084] rounded-md shadow-[0_0_12px_#00D084]"
                        />
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/30 px-3 py-1.5 rounded-full">
                      <Bolt className="w-3.5 h-3.5 animate-pulse" />
                      VOLTAGE STABLE: 74.2V | TEMP: 31°C
                    </div>
                  </div>
                )}

                {capabilities[activeTab].graphicType === "spares" && (
                  <div className="w-full space-y-6">
                    <div className="relative w-40 h-40 mx-auto border border-dashed border-[#00D084]/50 rounded-2xl flex flex-col items-center justify-center p-4 bg-emerald-950/10">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 border border-[#00D084]/20 rounded-xl pointer-events-none"
                      />
                      <Package className="w-12 h-12 text-[#00D084] mb-2 animate-bounce" />
                      <span className="text-[11px] font-mono text-white/80">QR VERIFIED #EV-9942</span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/30 px-3 py-1.5 rounded-full">
                      <Truck className="w-3.5 h-3.5" />
                      DISPATCHED FROM HUB #04 (MUMBAI)
                    </div>
                  </div>
                )}

                {capabilities[activeTab].graphicType === "os" && (
                  <div className="w-full space-y-4">
                    <div className="bg-black/80 border border-white/10 rounded-xl p-4 space-y-3 text-left">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/60">Workshop Node #108</span>
                        <span className="text-[#00D084] font-mono">ONLINE</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 1.5 }}
                          className="bg-[#00D084] h-full rounded-full shadow-[0_0_8px_#00D084]"
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-mono text-white/50">
                        <span>Jobs Completed: 48</span>
                        <span>Payout: ₹24,500</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/30 px-3 py-1.5 rounded-full">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                      AUTOMATED COMMISSION DISPATCH
                    </div>
                  </div>
                )}

                {capabilities[activeTab].graphicType === "fleet" && (
                  <div className="w-full space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div className="bg-emerald-950/30 border border-[#00D084]/30 p-3 rounded-xl">
                        <span className="text-[10px] text-white/50 block font-mono">ACTIVE FLEETS</span>
                        <span className="text-xl font-bold font-mono text-[#00D084]">1,420</span>
                      </div>
                      <div className="bg-emerald-950/30 border border-[#00D084]/30 p-3 rounded-xl">
                        <span className="text-[10px] text-white/50 block font-mono">UPTIME RATE</span>
                        <span className="text-xl font-bold font-mono text-[#00D084]">99.4%</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/30 px-3 py-1.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      ENTERPRISE SLA ACTIVE
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono">
                <span>SYSTEM STATUS: OPTIMAL</span>
                <span className="flex items-center gap-1.5 text-[#00D084]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-ping" />
                  REALTIME
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center flex flex-wrap justify-center items-center gap-4"
        >
          <button className="group inline-flex items-center gap-2 rounded-full bg-[#00D084] px-8 py-4 text-[15px] font-bold text-[#020403] transition-all hover:scale-105 hover:bg-white shadow-[0_0_30px_rgba(0,208,132,0.3)] cursor-pointer">
            Explore Technology Grid <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-[15px] font-bold text-white transition-all hover:border-[#00D084]/50 hover:bg-[#00D084]/10 cursor-pointer">
            Partner With Us
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- EV Services Showcase (Grid) ---------------- */
const EV_SERVICES = [
  {
    title: "Battery Health Check",
    desc: "Comprehensive battery diagnostics with cell level...",
    icon: <Battery className="h-5 w-5 text-[#00D084]" />,
    price: "₹399",
    originalPrice: "₹1,499",
    time: "45 min",
  },
  {
    title: "Motor & Controller",
    desc: "Electric motor inspection, controller diagnostics, and...",
    icon: <Gauge className="h-5 w-5 text-[#00D084]" />,
    price: "₹1,999",
    originalPrice: "₹2,999",
    time: "1h 30m",
  },
  {
    title: "Charging System",
    desc: "Charger diagnostics, port inspection, and charging spee...",
    icon: <Zap className="h-5 w-5 text-[#00D084]" />,
    price: "₹899",
    originalPrice: "₹1,299",
    time: "45 min",
  },
  {
    title: "Software Updates",
    desc: "Latest firmware updates, BMS calibration, and feature...",
    icon: <Cpu className="h-5 w-5 text-[#00D084]" />,
    price: "₹699",
    originalPrice: "₹999",
    time: "30 min",
  },
  {
    title: "Advanced Battery Diagnostic",
    desc: "Deep battery system scan with cell voltage and...",
    icon: <Activity className="h-5 w-5 text-[#00D084]" />,
    price: "₹999",
    originalPrice: "₹1,499",
    time: "1h",
  },
  {
    title: "Battery Cell Balancing",
    desc: "Equalization of battery cells to improve battery life and...",
    icon: <RefreshCw className="h-5 w-5 text-[#00D084]" />,
    price: "₹1,399",
    originalPrice: "₹1,799",
    time: "1h",
  },
];

/* ---------------- GlowCard Helper ---------------- */
interface GlowCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function GlowCard({ children, className = "", style = {} }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#080d0a] p-8 md:p-10 transition-all duration-300 hover:border-[#00D084]/30 ${className}`}
      style={style}
    >
      {/* Radial mouse glow effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 208, 132, 0.12), transparent 80%)"
        }}
      />
      {/* Radial border glow effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 border border-[#00D084]/30"
        style={{
          maskImage: "radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)",
          WebkitMaskImage: "radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)"
        }}
      />
      {children}
    </div>
  );
}

function EVServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lShapeRef = useRef<HTMLDivElement>(null);

  const handleLShapeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = lShapeRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Fade and slide up bento cards in viewport
      gsap.fromTo(".irregular-grid-item, .glow-card-stagger",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ev-services"
      ref={sectionRef}
      className="relative min-h-screen bg-[#020403] overflow-hidden flex items-center py-24 md:py-32"
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes voltPulse {
          0%, 100% { height: 50%; opacity: 0.6; }
          50% { height: 95%; opacity: 0.9; }
        }
        .voltage-bar {
          animation: voltPulse 3s ease-in-out infinite;
        }
        .voltage-bar-delay-1 {
          animation: voltPulse 3s ease-in-out infinite;
          animation-delay: 0.4s;
        }
        .voltage-bar-delay-2 {
          animation: voltPulse 3s ease-in-out infinite;
          animation-delay: 0.8s;
        }
        .voltage-bar-delay-3 {
          animation: voltPulse 3s ease-in-out infinite;
          animation-delay: 1.2s;
        }
      `}} />

      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#00D084]/5 blur-[160px] rounded-full pointer-events-none" />
      </div>

      <div className="mx-auto max-w-7xl w-full px-6 relative z-10 flex flex-col gap-16">

        {/* Section Header with Big Typography */}
        <GSAPText className="flex flex-col md:flex-row md:items-end justify-between gap-8 irregular-grid-item" stagger={0.12}>
          <div>
            <h2 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tight">
              EXPERT<br />
              <span className="text-white font-sans font-normal">EV SERVICES</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-[#a1a1aa] text-lg leading-relaxed mb-6">
              Professional diagnostics and repairs for Electric Scooters, Bikes & Autos. Engineered for scale, speed, and maximum vehicle uptime.
            </p>
            <button className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0f0c] px-6 py-3.5 text-sm font-medium text-white transition-all hover:border-[#00D084]/40 hover:bg-[#00D084]/5">
              View all 68 services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-[#00D084]" />
            </button>
          </div>
        </GSAPText>

        {/* Bento Grid */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">

          {/* Card 1: Battery Health Check (Wide Rectangle) */}
          <GlowCard className="md:col-span-8 flex flex-col md:flex-row justify-between gap-6 min-h-[320px] glow-card-stagger">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#030604] border border-[#00D084]/30 mb-6">
                  <Battery className="h-5 w-5 text-[#00D084]" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Battery Health Check</h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-sm">
                  Comprehensive battery diagnostics with cell level voltage scan and capacity verification.
                </p>
              </div>
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl font-bold text-[#00D084]">Starting from ₹399</span>
                <span className="text-sm text-[#52525b] line-through">₹1,499</span>
              </div>
            </div>
            {/* Visual Panel */}
            <div className="w-full md:w-[240px] h-[180px] bg-black/40 rounded-2xl border border-white/5 p-4 flex flex-col justify-between">
              <span className="text-[10px] text-gray-500 font-mono">BMS HEALTH METRICS</span>
              <div className="flex items-center justify-between gap-4">
                <div className="h-24 w-12 border-2 border-white/20 rounded-lg p-1 relative flex flex-col justify-end">
                  <div className="w-full bg-[#00D084] rounded-sm transition-all duration-500 h-[88%]" />
                  <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-4 h-1 bg-white/20 rounded-t-sm" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex justify-between text-[11px] font-mono"><span className="text-[#a1a1aa]">Health</span><span className="text-[#00D084]">94%</span></div>
                  <div className="flex justify-between text-[11px] font-mono"><span className="text-[#a1a1aa]">Cycles</span><span className="text-white">182</span></div>
                  <div className="flex justify-between text-[11px] font-mono"><span className="text-[#a1a1aa]">Temp</span><span className="text-white">32°C</span></div>
                </div>
              </div>
              <span className="text-[10px] text-[#00D084] font-bold tracking-widest text-center mt-1">SYSTEMS PASS</span>
            </div>
          </GlowCard>

          {/* Card 2: Motor & Controller (Square) */}
          <GlowCard className="md:col-span-4 flex flex-col justify-between min-h-[320px] glow-card-stagger">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#030604] border border-[#00D084]/30 mb-6">
                <Gauge className="h-5 w-5 text-[#00D084]" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">Motor & Controller</h3>
              <p className="text-[#a1a1aa] text-sm leading-relaxed">
                Electric motor inspection, controller diagnostics, and thermal stress mapping.
              </p>
            </div>
            <div className="flex items-baseline justify-between mt-4">
              <span className="text-xl font-bold text-[#00D084]">₹1,999</span>
              <span className="text-xs text-[#a1a1aa]">1h 30m duration</span>
            </div>
          </GlowCard>

          {/* Card 3: Charging System (Tall Vertical Rectangle) */}
          <GlowCard className="md:col-span-4 flex flex-col justify-between min-h-[660px] glow-card-stagger">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#030604] border border-[#00D084]/30 mb-6">
                <Zap className="h-5 w-5 text-[#00D084]" />
              </div>
              <h3 className="text-3xl font-serif text-white mb-4">Charging System</h3>
              <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">
                Charger diagnostics, port inspection, and speed profiling to guarantee maximum safety.
              </p>

              {/* Supported protocols */}
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-[10px] uppercase tracking-wider text-[#71717a] font-bold mb-1">PROTOCOLS TESTED</span>
                <div className="flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-xs text-white">CCS2 Fast Charge</span>
                  <CheckCircle2 className="h-4 w-4 text-[#00D084]" />
                </div>
                <div className="flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-xs text-white">GB/T Standard</span>
                  <CheckCircle2 className="h-4 w-4 text-[#00D084]" />
                </div>
                <div className="flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-xs text-white">Bharat AC 001</span>
                  <CheckCircle2 className="h-4 w-4 text-[#00D084]" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase">Starting From</span>
                  <div className="text-2xl font-bold text-[#00D084]">₹899</div>
                </div>
                <span className="text-xs text-[#a1a1aa]">45 min test</span>
              </div>
              <button className="w-full rounded-full bg-white py-3 text-sm font-bold text-black transition-colors hover:bg-[#00D084] hover:text-black">
                Book Inspection
              </button>
            </div>
          </GlowCard>

          {/* L-Shape Compound Container (Software + Advanced Diagnostics) - Desktop Only */}
          <div
            ref={lShapeRef}
            onMouseMove={handleLShapeMouseMove}
            className="hidden md:block md:col-span-8 relative h-[660px] group glow-card-stagger"
          >
            {/* Joined L-shape body backdrop with glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {/* Left vertical portion */}
              <div className="absolute left-0 top-0 bottom-0 w-[55%] rounded-3xl border border-white/10 bg-[#080d0a] transition-all group-hover:border-[#00D084]/30" />
              {/* Bottom horizontal portion */}
              <div className="absolute left-0 bottom-0 right-0 h-[48%] rounded-3xl border border-white/10 bg-[#080d0a] transition-all group-hover:border-[#00D084]/30" />
              {/* Overlap connector block */}
              <div className="absolute left-[1px] bottom-[1px] w-[54%] h-[47%] bg-[#080d0a]" />

              {/* Radial mouse glow across L-shape backdrop */}
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(500px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 208, 132, 0.12), transparent 80%)"
                }}
              />
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 border border-[#00D084]/30"
                style={{
                  maskImage: "radial-gradient(200px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)",
                  WebkitMaskImage: "radial-gradient(200px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)"
                }}
              />
            </div>

            {/* Left Content (Software Updates) */}
            <div className="absolute left-0 top-0 bottom-0 w-[55%] p-8 z-10 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#030604] border border-[#00D084]/30 mb-6">
                  <Cpu className="h-5 w-5 text-[#00D084]" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Software Updates</h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed">
                  Latest firmware updates, BMS calibration, and live system speed profiling.
                </p>
              </div>

              {/* Live firmware modules */}
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex justify-between items-center bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <span className="text-xs text-white">BMS Firmware</span>
                  <span className="text-[10px] bg-[#00D084]/15 text-[#00D084] px-2 py-0.5 rounded-full font-bold">v4.2.1 Active</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <span className="text-xs text-white">Telemetry OS</span>
                  <span className="text-[10px] bg-[#00D084]/15 text-[#00D084] px-2 py-0.5 rounded-full font-bold">v2.1.0 Stable</span>
                </div>
              </div>
            </div>

            {/* Bottom Right Horizontal Content */}
            <div className="absolute left-[58%] bottom-0 right-0 h-[48%] p-8 z-10 flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-[#71717a] mb-1">Calibration Status</div>
                <div className="text-lg font-bold text-white">All Systems Optimized</div>
              </div>
              <span className="text-2xl font-bold text-[#00D084]">100% OK</span>
            </div>

            {/* Nestled Square Card (Advanced Battery Diagnostic) */}
            <div className="absolute left-[58%] top-0 right-0 h-[48%] z-20">
              <GlowCard className="w-full h-full p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#030604] border border-[#00D084]/30">
                    <Activity className="h-5 w-5 text-[#00D084]" />
                  </div>
                  <span className="text-xs font-bold text-[#00D084]">₹999</span>
                </div>
                <div>
                  <h4 className="text-lg font-serif text-white mb-1">Advanced Diagnostics</h4>
                  <p className="text-[#a1a1aa] text-[11px] leading-snug">Cell voltage analysis and safety telemetry mapping.</p>
                </div>
              </GlowCard>
            </div>
          </div>

          {/* Mobile Fallback Cards (Visible only on mobile/tablet) */}
          <GlowCard className="md:hidden flex flex-col justify-between min-h-[320px] glow-card-stagger">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#030604] border border-[#00D084]/30 mb-6">
                <Cpu className="h-5 w-5 text-[#00D084]" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">Software Updates</h3>
              <p className="text-[#a1a1aa] text-sm leading-relaxed">
                Latest firmware updates, BMS calibration, and live system speed profiling.
              </p>
              
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex justify-between items-center bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <span className="text-xs text-white">BMS Firmware</span>
                  <span className="text-[10px] bg-[#00D084]/15 text-[#00D084] px-2 py-0.5 rounded-full font-bold">v4.2.1 Active</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <span className="text-xs text-white">Telemetry OS</span>
                  <span className="text-[10px] bg-[#00D084]/15 text-[#00D084] px-2 py-0.5 rounded-full font-bold">v2.1.0 Stable</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#00D084]">
              <span className="text-gray-400">Calibration Status</span>
              <span>All Systems Optimized</span>
            </div>
          </GlowCard>

          <GlowCard className="md:hidden flex flex-col justify-between min-h-[220px] glow-card-stagger">
            <div className="flex justify-between items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#030604] border border-[#00D084]/30">
                <Activity className="h-5 w-5 text-[#00D084]" />
              </div>
              <span className="text-xs font-bold text-[#00D084]">₹999</span>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-serif text-white mb-1">Advanced Diagnostics</h4>
              <p className="text-[#a1a1aa] text-xs leading-relaxed">Cell voltage analysis and safety telemetry mapping.</p>
            </div>
          </GlowCard>

          {/* Card 6: Battery Cell Balancing (Full Width Horizontal) */}
          <GlowCard className="md:col-span-12 flex flex-col md:flex-row gap-8 justify-between items-center min-h-[300px] glow-card-stagger">
            <div className="flex-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#030604] border border-[#00D084]/30 mb-6">
                <RefreshCw className="h-5 w-5 text-[#00D084]" />
              </div>
              <h3 className="text-3xl font-serif text-white mb-3">Battery Cell Balancing</h3>
              <p className="text-[#a1a1aa] text-base leading-relaxed max-w-xl">
                Equalization of battery cells to maximize energy efficiency, overall range, and longevity. Includes active load calibration.
              </p>
              <div className="mt-6 flex items-center gap-6">
                <div>
                  <span className="text-xs text-[#71717a] block uppercase tracking-wider mb-1">Service Cost</span>
                  <span className="text-2xl font-bold text-[#00D084]">₹1,399</span>
                </div>
                <button className="rounded-full bg-[#00D084] px-8 py-3 text-sm font-bold text-black transition-transform hover:scale-105">
                  Book Balancing
                </button>
              </div>
            </div>

            {/* Animated Cells Visualization */}
            <div className="w-full md:w-[450px] bg-black/40 rounded-2xl p-6 border border-white/5 flex flex-col gap-4">
              <div className="flex justify-between items-center text-xs text-[#a1a1aa]">
                <span>Active Equalization Module</span>
                <span className="text-[#00D084] font-mono animate-pulse">● CALIBRATING</span>
              </div>
              <div className="grid grid-cols-8 gap-2 h-24 items-end">
                {[3.8, 3.9, 3.8, 4.0, 3.9, 3.8, 4.0, 3.9].map((volts, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      className={`w-full bg-[#00D084] rounded-t-sm ${idx % 4 === 0
                        ? "voltage-bar"
                        : idx % 4 === 1
                          ? "voltage-bar-delay-1"
                          : idx % 4 === 2
                            ? "voltage-bar-delay-2"
                            : "voltage-bar-delay-3"
                        }`}
                      style={{
                        height: `${(volts / 4.2) * 100}%`,
                        opacity: 0.5 + (idx % 3) * 0.15
                      }}
                    />
                    <span className="text-[9px] font-mono text-gray-500">{volts}V</span>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>

        </StaggerContainer>
      </div>
    </section>
  );
}

/* ---------------- Value Packages Showcase (Premium Layout) ---------------- */
function ValuePackages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mouseOverActive, setMouseOverActive] = useState<boolean>(false);
  const [mouseOverPlaceholder, setMouseOverPlaceholder] = useState<number | null>(null);

  useEffect(() => {
    // If mouse is neither over the placeholder nor the active centered card, collapse it
    if (mouseOverPlaceholder === null && !mouseOverActive) {
      const timer = setTimeout(() => {
        setHoveredIdx(null);
      }, 150); // Grace period for user to move mouse to centered card
      return () => clearTimeout(timer);
    } else if (mouseOverPlaceholder !== null) {
      setHoveredIdx(mouseOverPlaceholder);
    }
  }, [mouseOverPlaceholder, mouseOverActive]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Smooth entrance reveal for the main header elements
      gsap.fromTo(".val-header-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const packs = [
    {
      title: "Basic Care Pack",
      desc: "Essential protection for your EV",
      price: "₹999",
      oldPrice: "₹2,000",
      save: "Save 50%",
      popular: true,
      icon: <Shield className="w-6 h-6 text-[#00D084]" />,
      themeColor: "#00D084",
      features: [
        "15-Point General Inspection",
        "Brake Adjustment & Cleaning",
        "Lubrication of Moving Parts"
      ]
    },
    {
      title: "Smart Protect Pack",
      desc: "Comprehensive protection & diagnostics",
      price: "₹2,999",
      oldPrice: "₹6,000",
      save: "Save 50%",
      popular: true,
      icon: <Gauge className="w-6 h-6 text-[#10B981]" />,
      themeColor: "#10B981",
      features: [
        "Comprehensive Diagnostic Scan",
        "Battery Health & BMS Analysis",
        "Motor Controller Check"
      ]
    },
    {
      title: "Complete EV Health Pack",
      desc: "The ultimate EV health package",
      price: "₹4,499",
      oldPrice: "₹9,000",
      save: "Save 50%",
      popular: false,
      icon: <Activity className="w-6 h-6 text-[#06B6D4]" />,
      themeColor: "#06B6D4",
      features: [
        "Deep Battery Cell Balancing",
        "Thermal System Diagnostics",
        "Charger Port & Controller Test"
      ]
    },
    {
      title: "Fleet Maintenance Pack",
      desc: "Bulk service for fleet operators",
      price: "₹7,499",
      oldPrice: "₹15,000",
      save: "Save 50%",
      popular: false,
      icon: <Truck className="w-6 h-6 text-[#6366F1]" />,
      themeColor: "#6366F1",
      features: [
        "Priority Doorstep Dispatch",
        "Standardized Diagnostic Logs",
        "Multi-Vehicle Health Tracking"
      ]
    }
  ];

  const usps = [
    "Up to 40% off vs. individual booking",
    "Multi-service protection in one pack",
    "Flexible validity — activate when ready",
    "Launch prices locked — limited period only"
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-[#030704] text-white py-24 md:py-36 selection:bg-[#00D084] selection:text-black overflow-hidden transition-colors duration-700">
      {/* Background gradients that shift colors dynamically based on hovered card */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: hoveredIdx !== null
              ? `radial-gradient(circle at 50% 50%, ${packs[hoveredIdx].themeColor}12, transparent 65%)`
              : 'radial-gradient(circle at 50% 50%, rgba(0, 208, 132, 0.05), transparent 60%)'
          }}
        />
        <div className="absolute top-1/4 right-0 w-[40vw] h-[40vh] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vh] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12">

        {/* Full-width Header Block */}
        <div className="mb-20">
          <p className="val-header-reveal text-[11px] uppercase tracking-[0.3em] text-[#00D084] mb-4 font-mono font-bold">
            Value Packages
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <h2 className="val-header-reveal lg:col-span-5 text-4xl md:text-6xl font-serif font-bold tracking-tight leading-[1.05] text-white">
              More services.<br />
              <span className="text-white/40 italic">Better savings.</span>
            </h2>
            <div className="val-header-reveal lg:col-span-7 flex flex-col gap-6 md:flex-row md:items-center justify-between">
              <p className="text-lg text-white/50 leading-relaxed max-w-md">
                Pre-bundled EV care packs designed to keep your vehicle at peak performance — at prices you won't find anywhere else.
              </p>
              {/* Header CTAs */}
              <div className="flex flex-wrap gap-4 shrink-0">
                <a
                  href="#services"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#00D084] px-6 py-3 text-sm font-bold text-[#020403] transition-all hover:scale-105 hover:bg-white"
                >
                  Explore All Services <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-bold text-white transition-all hover:border-[#00D084]/50 hover:bg-[#00D084]/5"
                >
                  Talk to Us
                </a>
              </div>
            </div>
          </div>

          {/* Quick USPs banner */}
          <div className="val-header-reveal mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 border-y border-white/10 py-6">
            {usps.map((usp, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <CheckCircle2 className="h-4 w-4 text-[#00D084] shrink-0" />
                <span className="text-xs md:text-sm text-white/70 font-medium">{usp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Blur Backdrop */}
        <AnimatePresence>
          {hoveredIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-30 cursor-pointer"
              onClick={() => setHoveredIdx(null)}
            />
          )}
        </AnimatePresence>

        {/* 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
          {packs.map((pkg, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={i}
                className="relative w-full h-[200px] md:h-[190px]"
                onMouseEnter={() => setMouseOverPlaceholder(i)}
                onMouseLeave={() => setMouseOverPlaceholder(null)}
              >
                {/* Visual Card with layout transition */}
                <motion.div
                  layout
                  onMouseEnter={() => setMouseOverActive(true)}
                  onMouseLeave={() => setMouseOverActive(false)}
                  onClick={() => setHoveredIdx(isHovered ? null : i)}
                  className="rounded-[28px] border p-6 md:p-8 flex flex-col justify-between overflow-hidden cursor-pointer"
                  style={isHovered ? {
                    position: "fixed",
                    inset: 0,
                    margin: "auto",
                    width: "90vw",
                    maxWidth: "480px",
                    height: "fit-content",
                    zIndex: 40,
                    borderColor: `${pkg.themeColor}50`,
                    boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 50px ${pkg.themeColor}20`,
                    backgroundColor: "#0d1410"
                  } : {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 10,
                    borderColor: "rgba(255,255,255,0.1)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                    backgroundColor: "rgba(10, 15, 12, 0.6)"
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Glow Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${pkg.themeColor}10, transparent)`
                    }}
                  />

                  {/* Always Visible Header Area */}
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4 items-center">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border transition-all duration-500"
                          style={{
                            borderColor: isHovered ? `${pkg.themeColor}50` : "rgba(255,255,255,0.1)",
                            backgroundColor: isHovered ? `${pkg.themeColor}10` : "rgba(255,255,255,0.05)"
                          }}
                        >
                          {pkg.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif text-white font-medium">
                          {pkg.title}
                        </h3>
                      </div>

                      <div className="flex flex-col gap-1 items-end shrink-0">
                        {pkg.popular && (
                          <span
                            className="text-[9px] uppercase tracking-widest font-bold px-3 py-0.5 rounded-full border"
                            style={{
                              borderColor: `${pkg.themeColor}40`,
                              backgroundColor: `${pkg.themeColor}15`,
                              color: pkg.themeColor
                            }}
                          >
                            Most Popular
                          </span>
                        )}
                        <span className="text-[9px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 text-white/60 px-3 py-0.5 rounded-full">
                          Launch Offer
                        </span>
                      </div>
                    </div>

                    {/* Slashed Pricing Row */}
                    <div className="mt-6 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-3xl md:text-4xl font-bold tracking-tight text-white">{pkg.price}</span>
                        <span className="text-base line-through text-white/30">{pkg.oldPrice}</span>
                      </div>
                      <span
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: pkg.themeColor }}
                      >
                        {pkg.save}
                      </span>
                    </div>
                  </div>

                  {/* Animated Expanded Reveal Panel */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden mt-6"
                      >
                        <div className="pt-4 border-t border-white/10 flex flex-col gap-6">
                          <p className="text-white/60 text-sm md:text-base leading-relaxed">
                            {pkg.desc}
                          </p>

                          {/* List of features */}
                          <div className="flex flex-col gap-3">
                            {pkg.features.map((feature, fIdx) => (
                              <div key={fIdx} className="flex gap-3 items-center">
                                <div
                                  className="w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{
                                    backgroundColor: pkg.themeColor,
                                    boxShadow: `0 0 8px ${pkg.themeColor}`
                                  }}
                                />
                                <span className="text-white/80 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* Bottom Row */}
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-[11px] text-white/40 font-mono">
                              Valid for 365 days
                            </span>
                            <button
                              className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300"
                              style={{
                                backgroundColor: pkg.themeColor,
                                color: "#020403"
                              }}
                            >
                              Book Package <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


/* ---------------- Vehicle storytelling ---------------- */
function VehicleStory({ v, index }: { v: Vehicle; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const imgWrap = imgWrapRef.current;
    if (!el || !imgWrap) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgWrap,
        { scale: 1.18, y: -40 },
        {
          scale: 1.0,
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const reverse = index % 2 === 1;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden py-24"
    >
      <div className={`mx-auto grid w-full max-w-[1400px] gap-12 px-6 lg:grid-cols-12 lg:gap-16 items-center`}>
        <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
          <div
            ref={imgWrapRef}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl will-change-transform group"
          >
            <img
              src={v.img}
              alt={v.name}
              loading="lazy"
              width={1920}
              height={1200}
              className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
          </div>
        </div>
        <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
          <Reveal>
            <p className="eyebrow mb-4">{v.tag}</p>
            <h2 className="text-balance text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-foreground">
              {v.name}
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground text-balance">
              {v.desc}
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {v.spec.map((s) => (
                <div key={s.k} className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {s.k}
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-foreground">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#experience" className="btn-primary">Configure</a>
              <a href="#experience" className="btn-ghost">Learn More</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Count-up stat ---------------- */
function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.4,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ---------------- Technology split ---------------- */
function TechShowcase() {
  return (
    <section id="tech" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <p className="eyebrow mb-4">Engineering Philosophy</p>
          <h2 className="max-w-3xl text-balance text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-foreground">
            Every gram considered. Every watt earned.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-8 lg:grid-cols-12 lg:gap-12 items-stretch">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-2xl lg:col-span-6 h-full group">
              <img src={tech} alt="Motor rotor" loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]" />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72), transparent 60%)" }} />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/60 mb-2 font-medium">Drive Unit</p>
                <h3 className="text-3xl font-semibold text-white">Aurora Halo Motor</h3>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6 grid gap-6">
            {[
              { icon: Cpu, title: "Neural Compute Core", body: "Custom silicon delivers 342 TOPS of real-time perception with 8ms of end-to-end latency." },
              { icon: Battery, title: "4680 Cell Architecture", body: "Structural pack integration reduces weight by 18% while enabling 350 kW peak charging." },
              { icon: Shield, title: "Machined Safety", body: "A CNC-milled monocoque exceeds every crash standard in North America and the EU." },
              { icon: Radio, title: "Silent Cabin", body: "Acoustic laminated glass and 14 microphones cancel road noise in real time." },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-elevate">
                  <div className="flex items-start gap-5">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-ember transition-transform duration-500 group-hover:rotate-6">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-lg font-semibold text-foreground">{f.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-ember/25 opacity-0 blur-3xl transition duration-700 group-hover:opacity-100" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Parts Warehouse (Holographic HUD) ---------------- */
const WAREHOUSE_CARDS = [
  {
    icon: CheckCircle2,
    img: hero, // using hero as stand-in for rickshaw
    title: "Verified parts",
    desc: "Compatibility-first catalog with service-friendly SKUs."
  },
  {
    icon: ShieldCheck,
    img: null, // Just the shield glow
    title: "Warranty support",
    desc: "Simple returns + warranty tracking for peace of mind."
  },
  {
    icon: Wrench,
    img: tech, // rotor
    title: "Service-grade quality",
    desc: "Built for technicians, franchises, and real field usage."
  }
];

function LabConfiguration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoWrapperRef.current;
    const placeholder = placeholderRef.current;
    const content = contentRef.current;
    if (!el || !video || !placeholder || !content || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=150%", // Scrolls for 1.5 viewport heights to complete animation
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true, // Recalculates starting positions if window is resized
        }
      });

      // Fade out left content
      tl.to(content, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        ease: "power2.inOut"
      }, 0);

      // Expand video to full screen
      tl.fromTo(video, {
        top: () => placeholder.getBoundingClientRect().top - el.getBoundingClientRect().top,
        left: () => placeholder.getBoundingClientRect().left - el.getBoundingClientRect().left,
        width: () => placeholder.getBoundingClientRect().width,
        height: () => placeholder.getBoundingClientRect().height,
        borderRadius: "2rem",
      }, {
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: 0,
        duration: 1,
        ease: "power2.inOut"
      }, 0);

    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] bg-[#060807] text-white flex items-center overflow-hidden">

      {/* Grid Layout Container */}
      <div className="mx-auto w-full h-full max-w-[1400px] px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center pointer-events-none">

        {/* Left Side: Content */}
        <div ref={contentRef} className="lg:col-span-5 relative z-10 flex flex-col justify-center pointer-events-auto h-full py-16">
          <h2 className="text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6">
            Step inside a<br />My EV Service<br />Centre.
          </h2>

          <p className="text-lg text-white/60 mb-12 max-w-md leading-relaxed">
            Every franchise outlet is built to a standardised lab-grade
            configuration — from service bay layout to equipment
            placement. Not improvised. Engineered.
          </p>

          <div className="flex flex-col gap-4 mb-12">
            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00D084]/10 text-[#00D084]">
                <Map className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Standardised Layout</h4>
                <p className="text-xs text-white/50">Same setup, every city</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00D084]/10 text-[#00D084]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Inspection-Ready</h4>
                <p className="text-xs text-white/50">Equipment pre specced</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00D084]/10 text-[#00D084]">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Fast to Deploy</h4>
                <p className="text-xs text-white/50">Centre-in-a-box model</p>
              </div>
            </div>
          </div>

          <button className="group inline-flex items-center gap-2 rounded-xl bg-[#00D084] px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-[#00D084]/90 w-max shadow-[0_0_20px_rgba(0,208,132,0.15)] mb-auto lg:mb-0">
            <Store className="h-4 w-4" />
            Explore Franchise
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right Side: Hidden Placeholder for Layout Coordinates */}
        <div className="lg:col-span-7 relative flex items-center justify-center h-full w-full opacity-0 pointer-events-none">
          <div ref={placeholderRef} className="relative w-full aspect-[4/3] lg:aspect-[16/11] lg:max-h-[580px]" />
        </div>
      </div>

      {/* Actual Animated Video Container */}
      <div
        ref={videoWrapperRef}
        className="absolute z-0 overflow-hidden bg-zinc-900 shadow-2xl pointer-events-auto"
      >
        <video
          src="/lab-3d-centre.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Subtle inner shadow overlay */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[inherit] pointer-events-none" />
      </div>
    </section>
  );
}




/* ---------------- Stats ---------------- */
function Stats() {
  const items = [
    { v: 1020, s: "hp", label: "Peak Output" },
    { v: 824, s: " km", label: "WLTP Range" },
    { v: 1.9, s: "s", label: "0–100 km/h", d: 1 },
    { v: 402, s: " km/h", label: "Top Speed" },
  ];
  return (
    <section className="relative overflow-hidden border-y border-border py-24">
      <div className="absolute inset-0 -z-10 opacity-50"
        style={{ background: "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--ember) 20%, transparent), transparent 60%)" }} />
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.08}>
            <div className="min-w-0">
              <div className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-foreground">
                <Counter to={it.v} suffix={it.s} decimals={it.d ?? 0} />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                {it.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}



/* ---------------- Technician Careers ---------------- */
function TechnicianCareers() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    language: "",
    profilePhoto: null as File | null,
    photoPreview: ""
  });

  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state before scroll
      gsap.set(contentRef.current, { scale: 0.85, opacity: 0.6 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });

      tl.to(contentRef.current, {
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        duration: 1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        profilePhoto: file,
        photoPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setIsOpen(false);
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      city: "",
      language: "",
      profilePhoto: null,
      photoPreview: ""
    });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen lg:h-screen bg-[var(--background)] text-white flex items-center justify-center overflow-visible lg:overflow-hidden py-16 lg:py-0 selection:bg-[#00D084] selection:text-[#020403]">
      {/* 16:9 Container */}
      <div ref={contentRef} className="w-full max-w-[1280px] md:aspect-video flex flex-col gap-5 relative px-4 md:px-0 h-auto md:h-full">
        
        {/* Top Row: Left & Right Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-5 min-h-0">
          
          {/* Top Left Card */}
          <div className="md:col-span-7 bg-[#0a0f0c] border border-white/10 rounded-2xl overflow-hidden flex flex-col relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D084]/5 to-transparent pointer-events-none" />
            <div className="h-[120px] md:h-[20%] relative shrink-0 overflow-hidden">
              <img src={factory} alt="EV Service Centre" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
            </div>
            
            <div className="flex-grow md:flex-1 p-5 md:p-6 flex flex-col z-10 overflow-hidden">
              <div className="mb-3">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#00D084]/20 bg-[#00D084]/5 px-2.5 py-0.5 mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#00D084] font-medium flex items-center gap-1.5 font-mono">
                    <UserPlus className="w-3.5 h-3.5" /> Join as Technician
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-1">Work with My EV Services</h3>
                <p className="text-[#a1a1aa] text-[13px] leading-relaxed max-w-sm">Get jobs, route guidance, QR-based inventory, and a professional workflow built for field technicians.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <h4 className="text-white text-[13px] font-medium mb-0.5">Smart dispatch</h4>
                  <p className="text-xs text-[#71717a] leading-tight">Accept/assigned jobs, on-time completion tracking.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <h4 className="text-white text-[13px] font-medium mb-0.5">QR inventory</h4>
                  <p className="text-xs text-[#71717a] leading-tight">Scan IN + USE items; no manual stock edits.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <h4 className="text-white text-[13px] font-medium mb-0.5">Earnings dashboard</h4>
                  <p className="text-xs text-[#71717a] leading-tight">Track income, completed jobs, and payouts in-app.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <h4 className="text-white text-[13px] font-medium mb-0.5">Live routing</h4>
                  <p className="text-xs text-[#71717a] leading-tight">Shortest route, real-time updates, fewer delays.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6 md:mt-auto pt-2">
                <button onClick={() => setIsOpen(true)} className="bg-[#00D084] hover:bg-[#00b574] text-[#020403] px-5 py-2 text-[13px] rounded-full font-bold transition-all shadow-[0_4px_20px_rgba(0,208,132,0.25)] flex items-center gap-2 cursor-pointer">
                  Start Onboarding <ArrowRight className="w-4 h-4" />
                </button>
                <Link to="/careers" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2 text-[13px] rounded-full font-semibold transition-all flex items-center gap-2 cursor-pointer">
                  View Careers <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Top Right Card */}
          <div className="md:col-span-5 bg-[#0a0f0c] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-bl from-[#00D084]/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full overflow-hidden">
              <h3 className="text-2xl font-semibold mb-2">Why people choose My EV Services</h3>
              <p className="text-[#a1a1aa] text-sm mb-8">Built for technicians who want a smarter, steadier career.</p>
              
              <ul className="space-y-5 flex-1">
                {[
                  { icon: ShieldCheck, title: "Professional workflow", desc: "Clear steps, checklists, and customer-ready reports." },
                  { icon: Wrench, title: "Tools + training", desc: "Standardized processes and quality-first service culture." },
                  { icon: Package, title: "Parts availability", desc: "Faster repairs with warehouse and franchise stock flows." },
                  { icon: TrendingUp, title: "Steady income flow", desc: "Regular jobs, transparent commission payouts every cycle." },
                  { icon: Cpu, title: "Tech-first ops", desc: "Digital job cards, no paperwork, everything tracked in-app." },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-[#00D084]/10 border border-[#00D084]/20 flex items-center justify-center">
                      <item.icon className="w-3.5 h-3.5 text-[#00D084]" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">{item.title}</h4>
                      <p className="text-xs text-[#71717a] mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Card */}
        <div className="h-auto md:h-[25%] shrink-0 rounded-2xl overflow-hidden relative flex items-center p-6 md:p-8 bg-[#0a0f0c] border border-white/10 group">
          <img src={tech} alt="Inside My EV Services" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity transition-transform group-hover:scale-105 duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030604] via-[#030604]/80 to-transparent" />
          
          <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="max-w-md text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-2 keep-white">Ready to accelerate your career?</h2>
              <p className="text-[#a1a1aa] text-sm">Join India's fastest growing multi-brand EV service network.</p>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="flex gap-8 hidden sm:flex">
                <div className="text-left">
                  <div className="text-4xl text-[#00D084] font-bold tracking-tight mb-0.5">~45<span className="text-xl tracking-normal"> min</span></div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mt-1">Avg. Job Completion</div>
                </div>
                <div className="text-left">
                  <div className="text-4xl text-[#00D084] font-bold tracking-tight mb-0.5">94%<span className="text-xl tracking-normal"></span></div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mt-1">Job Acceptance Rate</div>
                </div>
              </div>
              
              <button onClick={() => setIsOpen(true)} className="bg-white hover:bg-gray-100 text-black px-8 py-4 text-sm rounded-full font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
                Apply as Technician <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Popup/Bottom Sheet Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleReset}
              className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md cursor-pointer"
            />

            {/* Bottom sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 inset-x-0 z-[101] mx-auto max-w-2xl w-full rounded-t-[2.5rem] border-t border-white/10 bg-[#0a0f0c] p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              {/* Drag Handle indicator */}
              <div className="w-12 h-1 rounded-full bg-white/15 mx-auto mb-6 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={handleReset}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-all text-white/45 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                      Technician Application
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 font-light">
                      Provide your basic details to start your onboarding journey.
                    </p>
                  </div>

                  {/* Input Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                          className="w-full bg-white/[0.03] border border-white/5 focus:border-[#00D084]/40 focus:bg-white/[0.05] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-muted-foreground/60 transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="john@example.com"
                          className="w-full bg-white/[0.03] border border-white/5 focus:border-[#00D084]/40 focus:bg-white/[0.05] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-muted-foreground/60 transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* City */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="Mumbai, Bengaluru, etc."
                          className="w-full bg-white/[0.03] border border-white/5 focus:border-[#00D084]/40 focus:bg-white/[0.05] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-muted-foreground/60 transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* Language */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Preferred Language</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={formData.language}
                          onChange={e => setFormData(prev => ({ ...prev, language: e.target.value }))}
                          placeholder="Hindi, English, etc."
                          className="w-full bg-white/[0.03] border border-white/5 focus:border-[#00D084]/40 focus:bg-white/[0.05] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-muted-foreground/60 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Profile Photo */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Profile Photo</label>
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                      <div className="w-16 h-16 rounded-full border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center shrink-0">
                        {formData.photoPreview ? (
                          <img src={formData.photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold cursor-pointer text-white transition-all">
                          <Upload className="w-3.5 h-3.5" /> Select Photo
                          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </label>
                        <p className="text-[10px] text-muted-foreground mt-1.5 font-light">
                          {formData.profilePhoto ? formData.profilePhoto.name : "PNG, JPG up to 5MB."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#00D084] text-[#020403] hover:bg-[#00b574] font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(0,208,132,0.25)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Submit Application <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#00D084]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm mb-8 font-light leading-relaxed">
                    Thank you for applying, <span className="text-white font-medium">{formData.name}</span>. Our recruitment team will review your profile and contact you soon.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-all cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- Parts Warehouse Holographic SVGs ---------------- */
interface SVGProps {
  className?: string;
}

function RickshawSVG({ className = "w-40 h-40 text-[#00D084]" }: SVGProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="glowGradRick" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D084" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00D084" stopOpacity="0.1" />
        </linearGradient>
        <filter id="glowRick" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path d="M15 75 L30 30 H65 L85 55 L85 75 Z" stroke="currentColor" strokeWidth="2" filter="url(#glowRick)" />
      <path d="M30 30 L40 50 H65 V30 Z" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <path d="M48 50 H75 V75 H48 Z" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="75" x2="88" y2="75" stroke="currentColor" strokeWidth="3" />
      <circle cx="28" cy="80" r="8" stroke="currentColor" strokeWidth="2.5" fill="#030604" />
      <circle cx="28" cy="80" r="3" fill="currentColor" />
      <circle cx="70" cy="80" r="8" stroke="currentColor" strokeWidth="2.5" fill="#030604" />
      <circle cx="70" cy="80" r="3" fill="currentColor" />
      <polygon points="15,62 5,60 5,68 15,65" fill="url(#glowGradRick)" opacity="0.6" />
      <circle cx="15" cy="63.5" r="2" fill="currentColor" filter="url(#glowRick)" />
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
      <line x1="15" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

function ShieldHoloSVG({ className = "w-36 h-36 text-[#00D084]" }: SVGProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glowShield" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D084" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00D084" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d="M50 15 C65 15 80 20 80 35 C80 60 50 85 50 85 C50 85 20 60 20 35 C20 20 35 15 50 15 Z" fill="url(#shieldGrad)" />
      <path d="M50 15 C65 15 80 20 80 35 C80 60 50 85 50 85 C50 85 20 60 20 35 C20 20 35 15 50 15 Z" stroke="currentColor" strokeWidth="2" filter="url(#glowShield)" />
      <path d="M50 22 C61 22 72 26 72 37 C72 56 50 76 50 76 C50 76 28 56 28 37 C28 26 39 22 50 22 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
      <path d="M38 50 L46 58 L62 42" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glowShield)" />
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.25" className="animate-pulse" />
    </svg>
  );
}

/* ---------------- Parts Warehouse — Cinematic Automotive Experience ---------------- */
function PartsWarehouse() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  
  const listRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      num: "01",
      title: "Fast Delivery",
      desc: "Optimized dispatch for franchises and doorstep service flows. Parts reach your service bay same-day across our national logistics network.",
    },
    {
      num: "02",
      title: "Verified Parts",
      desc: "Compatibility-first catalog with service-friendly SKUs. Every part verified across 150+ EV models — 2W, 3W, and fleet vehicles.",
    },
    {
      num: "03",
      title: "Warranty Support",
      desc: "Simple returns + warranty tracking for total peace of mind. Automated claims, digital receipts, and real-time replacement status.",
    },
    {
      num: "04",
      title: "Service-Grade Quality",
      desc: "Built for technicians, franchises, and real field usage. Stress-tested components that meet OEM-grade quality standards.",
    },
  ];

  /* --- Quadratic Bezier position calculator for arc dots --- */
  /* Path: M 300 0 Q 520 450 300 900  (P0, P1, P2) — mirrored curve bulging to the right */
  const arcP0 = { x: 300, y: 0 };
  const arcP1 = { x: 520, y: 450 };
  const arcP2 = { x: 300, y: 900 };
  const bezierPoint = (t: number) => ({
    x: Math.pow(1 - t, 2) * arcP0.x + 2 * t * (1 - t) * arcP1.x + t * t * arcP2.x,
    y: Math.pow(1 - t, 2) * arcP0.y + 2 * t * (1 - t) * arcP1.y + t * t * arcP2.y,
  });

  /* Center point on the arc */
  const centerDot = bezierPoint(0.5);

  /* --- GSAP ScrollTrigger pin --- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Only: Pin and animate
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          id: "warehouse-cinematic",
          trigger: el,
          start: "top top",
          end: "+=350%",
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 0.333, 0.666, 1],
            duration: { min: 0.35, max: 0.75 },
            delay: 0.04,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const p = self.progress;
            const idx = p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3;
            setActiveIndex(idx);
            
            // Continuous vertical list scroll
            if (listRef.current) {
              const yOffset = -p * 3 * 160; 
              gsap.set(listRef.current, { y: yOffset });
            }

            // Dynamic scale/blur for each item
            itemsRef.current.forEach((el, i) => {
              if (!el) return;
              const activePos = p * 3; 
              const dist = Math.abs(activePos - i);
              const scale = Math.max(0.7, 1 - dist * 0.3);
              const opacity = Math.max(0, 1 - dist * 0.85);
              const blurAmt = Math.min(10, dist * 10);

              gsap.set(el, { 
                scale,
                opacity,
                filter: `blur(${blurAmt}px)`,
                transformOrigin: "left center"
              });
            });
          },
        });
      });

      // Mobile/Tablet Only: Reset animations & offsets
      mm.add("(max-width: 1023px)", () => {
        if (listRef.current) {
          gsap.set(listRef.current, { clearProps: "all" });
        }
        itemsRef.current.forEach((el) => {
          if (!el) return;
          gsap.set(el, { clearProps: "all" });
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  /* --- Animate card panel content --- */
  useEffect(() => {
    // The text carousel is now handled smoothly in onUpdate.
  }, [activeIndex]);

  /* --- Click-to-scroll to feature --- */
  const handleDotClick = (idx: number) => {
    const trigger = ScrollTrigger.getById("warehouse-cinematic");
    if (!trigger) return;
    const startY = trigger.start as number;
    window.scrollTo({
      top: startY + (idx / 3 + 0.04) * 3.5 * window.innerHeight,
      behavior: "smooth",
    });
  };

  /* Progress fraction for arc luminous overlay */
  const arcProgress = activeIndex / 3;
  /* Estimated arc path length (Q bezier approx.) */
  const ARC_LEN = 1100;

  return (
    <section
      ref={containerRef}
      id="warehouse"
      className="relative min-h-screen lg:h-screen bg-black overflow-visible lg:overflow-hidden flex items-center py-16 lg:py-0"
    >
      {/* ── Ambient radial glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[380px] h-[680px] rounded-full bg-[#00D084]/4 blur-[140px]" />
        <div
          className="absolute right-[28%] top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full blur-[100px] transition-all duration-1000"
          style={{ background: `rgba(0,208,132,${0.03 + activeIndex * 0.01})` }}
        />
      </div>

      {/* ── Full-height Arc Rail SVG (centered between columns, shifted left) ── */}
      <div className="warehouse-arc-rail absolute left-1/2 -translate-x-1/2 ml-[-250px] top-0 bottom-0 w-[600px] pointer-events-none z-20 hidden lg:block">
        <svg
          viewBox="0 0 600 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Dot glow */}
            <filter id="dotGlowF" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Arc path for dots and textPath */}
            <path id="arcMotionPath" d="M 300 0 Q 520 450 300 900" />
          </defs>

          {/* Main arc — clean white line */}
          <path
            d="M 300 0 Q 520 450 300 900"
            className="arc-main-line"
            stroke="white"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Progress overlay — brighter white as user scrolls */}
          <path
            d="M 300 0 Q 520 450 300 900"
            className="arc-main-line"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={ARC_LEN}
            strokeDashoffset={ARC_LEN - arcProgress * ARC_LEN}
            style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)" }}
            opacity="0.9"
          />

          {/* 1 static navigation dot in the center of the arc */}
          <g className="pointer-events-auto">
            {/* Mid ring — white */}
            <circle
              cx={centerDot.x} cy={centerDot.y}
              r={9}
              fill="none"
              stroke="white"
              strokeWidth={1}
              opacity={0.4}
              className="arc-dot"
            />
            {/* Core — white (Pulses slightly using the dotGlow filter) */}
            <circle
              cx={centerDot.x} cy={centerDot.y}
              r={3.5}
              fill="white"
              opacity={0.95}
              className="arc-dot"
              filter="url(#dotGlowF)"
            />
          </g>
        </svg>
      </div>

      {/* ── Main content grid (no more left-padding hack) ── */}
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center lg:h-full relative z-10">

        {/* Left: Typography column */}
        <div className="lg:col-span-5 flex flex-col justify-center lg:h-full py-6 lg:py-12">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/20 bg-[#00D084]/5 px-4 py-1.5 mb-8 w-max">
            <Store className="w-3.5 h-3.5 text-[#00D084]" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#00D084] font-medium font-mono">
              Multi-brand parts warehouse
            </span>
          </div>

          {/* Static heading */}
          <h2 className="text-3xl md:text-4xl font-sans font-medium tracking-tight text-white leading-snug mb-4 dark:text-white light:text-black">
            Genuine parts.<br />
            Fast delivery.<br />
            <span className="text-[#00D084]">Verified compatibility.</span>
          </h2>

          {/* Luminous divider */}
          <div className="relative w-10 h-px my-7 overflow-visible">
            <div className="absolute inset-0 bg-[#00D084]/30" />
            <div className="absolute inset-0 bg-[#00D084] blur-[4px] opacity-60" />
          </div>

          {/* Dynamic feature block and CTA moved to right column */}
        </div>

        {/* Right: Dynamic Feature Text & Premium Diagnostic Viewport Panel */}
        <div className="lg:col-span-7 flex flex-col lg:flex-row items-center justify-between gap-12 lg:pl-10 w-full">
          
          {/* Active feature animated block & CTA (Moved to the right of curve) */}
          <div className="flex flex-col justify-center w-full lg:max-w-[340px] z-30">
            <div className="relative lg:h-[160px] w-full overflow-visible">
              <div ref={listRef} className="relative lg:absolute inset-x-0 top-0 flex flex-col gap-8 lg:gap-0 items-start w-full">
                {steps.map((step, i) => (
                  <div 
                    key={i} 
                    ref={(el) => { itemsRef.current[i] = el; }}
                    className="warehouse-step-item w-full lg:h-[160px] flex flex-col justify-center shrink-0"
                  >
                    <span className="text-[13px] md:text-[14px] font-mono text-[#00D084]/65 tracking-[0.3em] uppercase block mb-2">
                      {step.num} / 04
                    </span>
                    <h3 className="text-2xl md:text-[1.75rem] font-sans font-semibold text-white leading-snug mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[#a1a1aa] text-sm md:text-[0.9rem] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA */}
            <div className="flex flex-wrap gap-3 mt-12 lg:mt-16">
              <Link
                to="/store"
                className="bg-[#00D084] hover:bg-[#00b574] text-black px-6 py-3 text-sm rounded-full font-bold transition-all duration-200 shadow-[0_4px_24px_rgba(0,208,132,0.28)] hover:shadow-[0_4px_32px_rgba(0,208,132,0.45)] flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                Shop Parts <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/store"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 text-sm rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Package className="w-4 h-4 text-white/55" />
                Browse Categories
              </Link>
            </div>
          </div>

          {/* Diagnostic Viewport Panel */}
          <div className="warehouse-panel relative w-full aspect-[3/3.6] max-w-[340px] shrink-0 border border-white/8 bg-black/85 backdrop-blur-2xl overflow-hidden hidden lg:flex items-center justify-center">

            {/* Grid texture */}
            <div className="absolute inset-0 grid-scanner-bg opacity-55 pointer-events-none" />

            {/* Emerald ambient background glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[45%] rounded-full blur-[80px] pointer-events-none transition-opacity duration-1000"
              style={{ background: "rgba(0,208,132,0.06)" }}
            />

            {/* Scanline overlay */}
            <div className="absolute inset-x-0 h-2 bg-[#00D084]/12 blur-[3px] top-0 animate-scanline pointer-events-none" />
            <div className="absolute inset-x-0 h-px bg-white/25 top-0 animate-scanline pointer-events-none" />

            {/* Corner brackets */}
            <div className="absolute top-5 left-5 w-5 h-5 border-t border-l border-[#00D084]/45" />
            <div className="absolute top-5 right-5 w-5 h-5 border-t border-r border-[#00D084]/45" />
            <div className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-[#00D084]/45" />
            <div className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-[#00D084]/45" />

            {/* HUD top label */}
            <div className="warehouse-hud-label absolute top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-[0.32em] text-[#00D084]/50 uppercase select-none whitespace-nowrap">
              [ SYSTEM VIEWPORT v2.0 ]
            </div>

            {/* Feature label top-left */}
            <div className="absolute top-[3.2rem] left-7 text-[8px] font-mono text-[#00D084]/45 select-none tracking-[0.15em] uppercase transition-all duration-400">
              FEAT:{steps[activeIndex].num} · {steps[activeIndex].title.toUpperCase()}
            </div>

            {/* Status LEDs top-right */}
            <div className="absolute top-[3.2rem] right-7 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] block animate-pulse" />
                <span className="text-[8px] font-mono text-[#00D084]/45">SYS.ONLINE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]/60 block animate-pulse" style={{ animationDelay: "0.6s" }} />
                <span className="text-[8px] font-mono text-[#00D084]/45">CAT.ACTIVE</span>
              </div>
            </div>

            {/* Rotating scanner rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[82%] h-[82%] rounded-full border border-[#00D084]/5 border-dashed animate-[spin_70s_linear_infinite]" />
              <div className="absolute w-[55%] h-[55%] rounded-full border border-[#00D084]/5 border-dashed animate-[spin_45s_linear_infinite_reverse]" />
            </div>

            {/* Coordinate labels bottom */}
            <div className="warehouse-coord-label absolute bottom-5 left-7 text-[8px] font-mono text-[#9ca3af]/50 select-none">
              COORD: <span className="text-[#00D084]/65">28.614 // 77.209</span>
            </div>
            <div className="absolute bottom-5 right-7 text-[8px] font-mono text-[#00D084]/50 flex items-center gap-1.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] inline-block animate-pulse" />
              SCANNER ACTIVE
            </div>

            {/* ── Morphing content with crossfade ── */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-8 pt-16 pb-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, y: -12, filter: "blur(2px)" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {activeIndex === 0 && (
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-72 h-72 rounded-full bg-[#00D084]/7 blur-[70px] pointer-events-none" />
                      <img
                        src={evScooterSmall}
                        alt="EV Scooter"
                        className="w-[290px] h-[290px] object-contain animate-float drop-shadow-[0_20px_50px_rgba(0,208,132,0.22)]"
                      />
                    </div>
                  )}
                  {activeIndex === 1 && (
                    <div className="relative flex items-center justify-center animate-float-delayed">
                      <div className="absolute w-60 h-60 rounded-full bg-[#00D084]/6 blur-[55px] pointer-events-none" />
                      <RickshawSVG className="w-[270px] h-[270px] text-[#00D084]" />
                    </div>
                  )}
                  {activeIndex === 2 && (
                    <div className="relative flex items-center justify-center animate-float">
                      <div className="absolute w-56 h-56 rounded-full bg-[#00D084]/6 blur-[55px] pointer-events-none" />
                      <ShieldHoloSVG className="w-[245px] h-[245px] text-[#00D084]" />
                    </div>
                  )}
                  {activeIndex === 3 && (
                    <div className="relative flex items-center justify-center animate-float-delayed">
                      <div className="absolute w-64 h-64 rounded-full bg-[#00D084]/7 blur-[65px] pointer-events-none" />
                      <div className="relative w-[220px] h-[220px] rounded-full border border-white/8 overflow-hidden bg-black p-2">
                        <div className="absolute inset-0 rounded-full border border-[#00D084]/30 border-dashed animate-[spin_40s_linear_infinite]" />
                        <img
                          src={tech}
                          alt="Brake Rotor"
                          className="w-full h-full object-cover rounded-full opacity-85 contrast-125 saturate-50"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Scanner sweep overlay — fires on each feature change */}
            <AnimatePresence>
              <motion.div
                key={`sweep-${activeIndex}`}
                initial={{ y: "-110%", opacity: 1 }}
                animate={{ y: "210%", opacity: 0 }}
                transition={{ duration: 0.72, ease: "linear" }}
                className="absolute inset-x-0 h-10 pointer-events-none z-30"
                style={{
                  background: "linear-gradient(to bottom, transparent, rgba(0,208,132,0.18) 40%, rgba(0,208,132,0.12) 60%, transparent)",
                }}
              />
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}

/* ---------------- Resources Journey ---------------- */
const RESOURCES = [
  {
    id: "webinars",
    eyebrow: "Webinars",

    title: "Learn the EV playbook.",
    desc: "Live sessions + on-demand replays on diagnostics, service workflows, and operations.",
    img: hero,
    cardTitle: "Franchise Partner Onboarding",
    cardDesc: "Complete walkthrough of franchise setup, inventory management, technician hiring, and customer acquisition strategies.",
    tags: ["On-demand", "Open"]
  },
  {
    id: "news",
    eyebrow: "News & Updates",
    title: "Track what we ship.",
    desc: "Announcements, product launches, and service improvements — designed for scale.",
    img: factory,
    cardTitle: "Multi-Brand EV Service Centre Opportunity in Pune | City Launch by MY EV SERVICE",
    cardDesc: "Discover the Pune city launch of MY EV SERVICE’s multi-brand EV service centre opportunity. Explore high-demand PIN code areas, EV market potential, and how to",
    tags: ["Company", "Read"]
  }
];

function ResourcesJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        }
      });

      tl.to(track, {
        xPercent: -50,
        ease: "none",
      }, 0);

      // Progress bar animation
      tl.fromTo('.progress-fill',
        { scaleX: 0 },
        { scaleX: 1, ease: "none" },
        0
      );

      // Fade up inner elements
      const cards = gsap.utils.toArray('.resource-content');
      cards.forEach((card: any, index: number) => {
        tl.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          },
          index * 0.3 // stagger their fade-in via the scrub timeline
        );
      });

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-[#030604] overflow-hidden flex items-center">
      <div ref={trackRef} className="flex w-[200vw] h-full will-change-transform">
        {RESOURCES.map((res, i) => (
          <div key={res.id} className="w-[100vw] h-full relative flex items-center justify-center p-6 md:p-12 lg:p-24">

            {/* Background Image with Parallax & Gradients */}
            <div className="absolute inset-0 z-0">
              <img src={res.img} alt={res.title} className="w-full h-full object-cover opacity-20 filter grayscale blur-[2px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030604] via-[#030604]/80 to-[#030604]/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030604] via-[#030604]/40 to-[#030604]" />
            </div>

            <div className="resource-content relative z-10 w-full max-w-[1400px] flex flex-col md:flex-row gap-12 lg:gap-24 items-center opacity-0 translate-y-12">

              {/* Text Content */}
              <div className="md:w-1/2 flex flex-col">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/20 bg-[#00D084]/5 px-4 py-1.5 mb-8 w-max">
                  <span className="text-[11px] uppercase tracking-widest text-[#00D084] font-medium keep-white">
                    {res.eyebrow}
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-[1.1] tracking-tight text-balance keep-white">
                  {res.title}
                </h2>
                <p className="text-[#a1a1aa] text-lg md:text-xl leading-relaxed max-w-md">
                  {res.desc}
                </p>
              </div>

              {/* Card Content */}
              <div className="md:w-1/2 w-full">
                <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0f0c]/80 backdrop-blur-2xl p-8 md:p-12 transition-all hover:bg-white/[0.04] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00D084]/5 to-transparent pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full min-h-[280px]">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-snug">
                      {res.cardTitle}
                    </h3>
                    <p className="text-[#a1a1aa] text-base leading-relaxed mb-10">
                      {res.cardDesc}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                      <span className="text-[11px] uppercase tracking-widest text-[#71717a] font-medium">
                        {res.tags[0]}
                      </span>
                      <button className="flex items-center gap-2 text-sm font-bold text-[#00D084] group-hover:text-white transition-colors">
                        {res.tags[1]}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Progress Track */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[200px] h-[2px] bg-white/10 rounded-full overflow-hidden z-20">
        <div className="progress-fill h-full w-full bg-[#00D084] origin-left" />
      </div>
    </section>
  );
}

/* ---------------- Factory parallax ---------------- */
function Factory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -80]);
  return (
    <section ref={ref} id="company" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-4">Behind the Build</p>
              <h2 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-balance text-foreground">
                Made where it's driven.
              </h2>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                Six vertically-integrated gigafactories on three continents.
                Robotic precision, human oversight — every Aurora is built
                by 342 people and 1,140 machines.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <motion.div style={{ y: y1 }} className="aspect-[3/4] overflow-hidden rounded-2xl">
              <img src={factory} alt="Robotic assembly" loading="lazy" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div style={{ y: y2 }} className="aspect-[3/4] overflow-hidden rounded-2xl mt-12">
              <img src={tech} alt="Motor detail" loading="lazy" className="h-full w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Comparison ---------------- */
function Compare() {
  const [active, setActive] = useState<string>("model-v");
  return (
    <section id="vehicles" className="relative py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <p className="eyebrow mb-4">The Range</p>
          <h2 className="max-w-2xl text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-balance text-foreground">
            Four vehicles. One philosophy.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {VEHICLES.map((v, i) => {
            const isActive = active === v.id;
            return (
              <Reveal key={v.id} delay={i * 0.06}>
                <button
                  onClick={() => setActive(v.id)}
                  onMouseEnter={() => setActive(v.id)}
                  className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl text-left transition-all duration-700 hover:-translate-y-1 ${isActive ? "ring-1 ring-ember/60 shadow-elevate" : "ring-1 ring-foreground/10"
                    }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={v.img}
                      alt={v.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.35) 40%, transparent 70%)" }} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-ember">{v.tag}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{v.name}</h3>
                    <motion.div
                      initial={false}
                      animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/15 pt-4">
                        {v.spec.map((s) => (
                          <div key={s.k} className="min-w-0">
                            <div className="text-[9px] uppercase tracking-[0.2em] text-white/55">
                              {s.k}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-white">{s.v}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
const TESTIMONIALS = [
  { q: "The diagnostic accuracy is unmatched. They detected a micro-fault in our fleet's battery cells before it caused downtime. Pure engineering excellence.", a: "Rahul Sharma", r: "Fleet Director, MoveEV", img: "https://i.pravatar.cc/150?img=11" },
  { q: "myevservice didn't just fix the hardware, they upgraded our entire telematics stack. A true premium ecosystem.", a: "Ananya Desai", r: "Operations Lead, GreenTransit", img: "https://i.pravatar.cc/150?img=5" },
  { q: "Finally, a service center that understands the software architecture of modern 3Ws. Extremely fast turnaround.", a: "Vikram Mehta", r: "Logistics Manager", img: "https://i.pravatar.cc/150?img=60" },
  { q: "The transparency and precision of their AI-driven diagnostics is the future of EV maintenance. Exceptional care.", a: "Priya Patel", r: "Independent Owner", img: "https://i.pravatar.cc/150?img=47" },
  { q: "We shifted our entire 200+ fleet to myevservice. The reduction in maintenance overhead has been incredible.", a: "Arjun Reddy", r: "CEO, VoltDelivery", img: "https://i.pravatar.cc/150?img=33" }
];



const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive(prev => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  const paginate = (newDirection: number) => {
    setActive(prev => {
      let next = prev + newDirection;
      if (next < 0) next = TESTIMONIALS.length - 1;
      if (next >= TESTIMONIALS.length) next = 0;
      return next;
    });
  };

  return (
    <section className="relative w-full bg-[#030604] py-32 md:py-48 flex justify-center min-h-[85vh] overflow-hidden selection:bg-[#00D084] selection:text-[#020403]">
      <div className="max-w-[1200px] w-full px-8 md:px-16 mx-auto relative flex flex-col justify-center h-full">

        {/* Massive Metallic Quote Icon */}
        <div
          className="absolute top-0 right-4 md:right-16 text-[200px] md:text-[300px] font-serif leading-none select-none pointer-events-none drop-shadow-2xl"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #404040 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: 0.9,
            lineHeight: 0.5
          }}
        >
          ”
        </div>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="relative z-10 w-full md:w-[90%] mt-16 mb-32 cursor-grab active:cursor-grabbing"
        >
          <div className="relative min-h-[250px] w-full flex items-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center text-3xl md:text-[40px] lg:text-[48px] font-serif leading-[1.35] tracking-tight text-white w-full"
              >
                “{TESTIMONIALS[active].q}”
              </motion.h2>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mt-auto border-t border-white/5 pt-8 z-10">
          {/* Author Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-5"
            >
              <img
                src={TESTIMONIALS[active].img}
                alt={TESTIMONIALS[active].a}
                className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-full object-cover grayscale opacity-90 border border-white/10"
              />
              <div className="flex flex-col">
                <span className="text-white font-semibold text-lg md:text-xl tracking-tight mb-1">{TESTIMONIALS[active].a}</span>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{TESTIMONIALS[active].r}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots matching the design */}
          <div className="flex items-center gap-2.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-700 ease-out ${active === i ? "w-6 bg-[#00D084]" : "w-2 bg-white/15 hover:bg-white/30"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  { q: "When can I take delivery?", a: "Reservations placed today are estimated for Q3 2026 delivery in North America, and Q1 2027 in Europe and Asia-Pacific." },
  { q: "Is charging included?", a: "Every Aurora comes with three years of complimentary charging across our 4,200-station Aurora Grid network." },
  { q: "What is the warranty?", a: "8 years or 240,000 km on the battery and drive unit. 4 years or 80,000 km bumper-to-bumper." },
  { q: "Can I service my Aurora anywhere?", a: "Yes. Mobile Service technicians handle 82% of repairs at your home or office. Certified centers cover the rest." },
  { q: "Do you offer trade-ins?", a: "We accept all makes and models. Our valuation team responds within 24 hours." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-3xl px-6">
        <GSAPHeader
          badge="Frequently Asked Questions"
          title="Answers,"
          highlight="engineered."
          subtitle="Everything you need to know about our multi-brand electric vehicle diagnostics, doorstep service, and warranty coverage."
          className="text-center max-w-2xl mx-auto mb-16"
        />
        <StaggerContainer staggerDelay={0.08} className="mt-16 divide-y divide-border">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <StaggerItem key={f.q} yOffset={20}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left group cursor-pointer"
                >
                  <span className="text-lg md:text-xl font-medium text-foreground transition-colors group-hover:text-[#00D084]">{f.q}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-strong text-foreground transition-transform duration-500 group-hover:rotate-90">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 max-w-2xl text-muted-foreground">{f.a}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section className="relative overflow-hidden py-40">
      <div className="absolute inset-0 -z-10">
        <img src={roadster} alt="" loading="lazy" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, var(--background), color-mix(in oklab, var(--background) 60%, transparent), var(--background))" }} />
        <div className="absolute inset-0 animate-ember-pulse"
          style={{ background: "radial-gradient(ellipse at 50% 60%, oklch(0.72 0.18 55 / 0.25), transparent 60%)" }} />
      </div>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="eyebrow mb-6">Reserve Your Aurora</p>
          <h2 className="text-6xl md:text-8xl font-semibold tracking-[-0.04em] text-balance text-foreground">
            The next chapter of driving <span className="text-gradient-ember">starts now.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">
            A fully refundable $500 reservation secures your delivery slot and configuration window.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/services" className="btn-primary flex items-center gap-2">Reserve Now <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Latest News & Updates ---------------- */
function LatestNews() {
  const newsItems = [
    {
      id: "news-01",
      category: "FLEET ENGINEERING",
      date: "19 JUL 2026",
      readTime: "5 MIN",
      title: "Revolutionizing Fleet Logistics: The Autonomous Battery Swapping Protocol V3.",
      desc: "An in-depth look at our low-latency firmware calibrations that reduce commercial battery swap cycles down to 90 seconds.",
      img: tech,
      tag: "FEATURED JOURNAL"
    },
    {
      id: "news-02",
      category: "DECENTRALIZED POWER",
      date: "14 JUL 2026",
      readTime: "4 MIN",
      title: "Decentralized Micro-Grid Network Launches in Western Transport Corridors.",
      desc: "Deploying high-throughput solar-storage nodes to ensure uninterrupted 3W cargo fleet uptime.",
      img: energy,
      tag: "SYSTEM UPDATE"
    },
    {
      id: "news-03",
      category: "SAFETY LABS",
      date: "08 JUL 2026",
      readTime: "3 MIN",
      title: "Solid-State Battery Service Certifications: Standardizing High-Voltage Calibrations.",
      desc: "Our engineering team sets safety guidelines for the next-generation solid-state cell packaging diagnostics.",
      img: interior,
      tag: "RESEARCH"
    },
    {
      id: "news-04",
      category: "PARTNER NETWORK",
      date: "01 JUL 2026",
      readTime: "6 MIN",
      title: "Autobot India Expansion: 40 New High-Throughput Service Nodes Online.",
      desc: "Scaling specialized diagnostic hubs to match rapid EV adoption across major industrial cities.",
      img: factory,
      tag: "GROWTH"
    }
  ];

  return (
    <section id="news" className="relative w-full bg-[#020403] py-32 md:py-48 overflow-hidden border-t border-white/5">
      {/* Editorial Decorative Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute left-[8%] inset-y-0 w-[1px] bg-white/5" />
        <div className="absolute right-[8%] inset-y-0 w-[1px] bg-white/5" />
        <div className="absolute top-[20%] inset-x-0 h-[1px] bg-white/5" />
        <div className="absolute bottom-[20%] inset-x-0 h-[1px] bg-white/5" />
      </div>

      <div className="max-w-[1400px] w-full px-8 md:px-16 mx-auto relative z-10">
        
        {/* Massive Editorial Header Block */}
        <GSAPText className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8" stagger={0.12}>
          <div className="max-w-xl">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#00D084] uppercase block mb-3">
              [ THE JOURNAL / VOL. 08 ]
            </span>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85] m-0">
              ECOSYSTEM<br />
              <span className="text-[#00D084] italic font-serif normal-case font-light">dispatch</span>
            </h2>
          </div>
          <div className="max-w-xs md:text-right font-mono text-white/40 text-[11px] leading-relaxed">
            <span>UPDATED DAILY // COORDINATING MULTI-BRAND REAL-TIME TELEMETRY DIAGNOSTICS & HARDWARE STANDARDS.</span>
          </div>
        </GSAPText>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FEATURED STORY (Left Column - Spans 7 cols) */}
          <Reveal className="lg:col-span-7 group" yOffset={35}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card transition-colors duration-500 hover:border-[#00D084]/40">
              
              {/* Image wrap with slow scale */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={newsItems[0].img} 
                  alt={newsItems[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100"
                />
                
                {/* Visual indicator corner tags */}
                <div className="absolute top-5 left-5 bg-[#00D084] text-[#020403] text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {newsItems[0].tag}
                </div>
                <div className="absolute top-5 right-5 bg-black/60 text-white text-[9px] font-mono px-2 py-0.5 rounded tracking-widest backdrop-blur-sm">
                  {newsItems[0].id}
                </div>
              </div>

              {/* Text content block */}
              <div className="p-8">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-[9.5px] font-mono text-[#00D084] mb-4">
                  <span>{newsItems[0].category}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/55">{newsItems[0].date}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/55">READ TIME: {newsItems[0].readTime}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mb-4 group-hover:text-[#00D084] transition-colors duration-300">
                  {newsItems[0].title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {newsItems[0].desc}
                </p>

                {/* Read CTA with drawing line hover */}
                <div className="inline-flex items-center gap-2 text-white font-mono text-[11px] font-bold tracking-wider group/cta">
                  <span>ACCESS DECRYPTED REPORT</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#00D084] transition-transform duration-300 group-hover/cta:translate-x-1.5" />
                </div>
              </div>

              {/* Progress reading bar indicator */}
              <div className="h-[2px] w-0 bg-[#00D084] group-hover:w-full transition-all duration-700 ease-out" />
            </div>
          </Reveal>

          {/* EDITORIAL FEED LIST (Right Column - Spans 5 cols) */}
          <StaggerContainer staggerDelay={0.1} className="lg:col-span-5 flex flex-col gap-6">
            
            {newsItems.slice(1).map((item) => (
              <StaggerItem
                href={`#news-${item.id}`}
                key={item.id}
                className="group flex flex-col sm:flex-row gap-5 p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#00D084]/20 transition-all duration-300"
              >
                {/* Mini Image thumbnail */}
                <div className="w-full sm:w-[130px] aspect-[4/3] rounded-xl overflow-hidden shrink-0 border border-white/5 bg-muted">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between py-1">
                  <div>
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-[9px] font-mono text-[#00D084] mb-2">
                      <span>{item.category}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-white/50">{item.date}</span>
                    </div>

                    {/* Headline */}
                    <h4 className="text-sm md:text-base font-bold text-white leading-snug group-hover:text-[#00D084] transition-colors duration-300 mb-2">
                      {item.title}
                    </h4>
                  </div>

                  {/* Read arrow */}
                  <div className="flex items-center gap-1.5 text-white/40 group-hover:text-white font-mono text-[9px] tracking-widest mt-2 transition-colors">
                    <span>READ REPORT</span>
                    <ArrowRight className="h-3 w-3 text-[#00D084] -translate-x-1 group-hover:translate-x-0 transition-transform duration-300" />
                  </div>
                </div>
              </StaggerItem>
            ))}

          </StaggerContainer>
        </div>

      </div>
    </section>
  );
}

/* ---------------- Ecosystem Offerings ---------------- */
function EcosystemOfferings() {
  const cards = [
    {
      id: "doorstep",
      badge: "Professional service at your home or office",
      title: "EV Service at Your Doorstep",
      desc: "Get your electric vehicle serviced without leaving your home. Our certified technicians come to you with all the necessary tools and genuine parts.",
      cta: "Book Doorstep Service",
      href: "#ev-services",
      Icon: Home,
      accent: "#00D084",
      bgGradient: "from-[#00D084]/10 to-[#020403]",
      borderAccent: "border-[#00D084]/20 hover:border-[#00D084]/50",
      layout: "left"
    },
    {
      id: "rsa",
      badge: "Emergency support anywhere, anytime",
      title: "24/7 Roadside Assistance",
      desc: "Breakdown? Battery drained? Tire puncture? Our RSA team is available 24/7 with average response time of just 30 minutes.",
      cta: "Request Emergency RSA",
      href: "#request-rsa",
      Icon: PhoneCall,
      accent: "#FF8A00",
      bgGradient: "from-[#FF8A00]/10 to-[#020403]",
      borderAccent: "border-[#FF8A00]/20 hover:border-[#FF8A00]/50",
      layout: "right"
    },
    {
      id: "fleet",
      badge: "Predictable operations for EV fleets",
      title: "Fleet AMC for EV Businesses",
      desc: "Comprehensive annual maintenance contracts for EV fleets. Priority service, dedicated account manager, and predictable maintenance costs.",
      cta: "Explore Fleet Plans",
      href: "#join-franchise",
      Icon: Truck,
      accent: "#0066FF",
      bgGradient: "from-[#0066FF]/10 to-[#020403]",
      borderAccent: "border-[#0066FF]/20 hover:border-[#0066FF]/50",
      layout: "left"
    },
    {
      id: "franchise",
      badge: "Join India's fastest growing EV service network",
      title: "Start Your EV Service Business",
      desc: "Get operations, inventory allocation, technician management, live tracking, and analytics — all in one platform. Low investment, high returns.",
      cta: "Apply for Franchise",
      href: "#join-franchise",
      Icon: Store,
      accent: "#9E00FF",
      bgGradient: "from-[#9E00FF]/10 to-[#020403]",
      borderAccent: "border-[#9E00FF]/20 hover:border-[#9E00FF]/50",
      layout: "right"
    }
  ];

  return (
    <section id="offerings" className="relative w-full bg-[#020403] py-24 md:py-32 overflow-hidden border-t border-white/5">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-[1400px] w-full px-8 md:px-16 mx-auto relative z-10">
        
        {/* Section Header */}
        <GSAPHeader
          badge="[ ECOSYSTEM DISPATCH / KEY CAPABILITIES ]"
          title="Tailored solutions."
          highlight="engineered for action."
          className="mb-16 text-left"
          highlightColor="text-[#00D084] italic font-serif normal-case font-light"
        />

        {/* Grid Container */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cards.map((card) => {
            const isLeft = card.layout === "left";
            return (
              <StaggerItem
                key={card.id}
                className={`group relative rounded-[32px] border ${card.borderAccent} bg-gradient-to-br ${card.bgGradient} p-8 md:p-10 flex flex-col justify-between overflow-hidden min-h-[380px] transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Background Translucent Floating Icon */}
                <div
                  className={`absolute bottom-[-20px] ${
                    isLeft ? "right-[-20px]" : "left-[-20px]"
                  } pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-105 transition-all duration-500`}
                >
                  <card.Icon className="w-64 h-64 stroke-[1.2]" style={{ color: card.accent }} />
                </div>

                {/* Top Row: Badge & Accent Glow Dot */}
                <div className="mb-8 flex items-center justify-between">
                  <div
                    style={{
                      background: `${card.accent}0a`,
                      border: `1px solid ${card.accent}20`
                    }}
                    className="flex items-center gap-2 rounded-full px-4.5 py-1.5 text-[10px] font-mono tracking-wider uppercase"
                  >
                    <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: card.accent }} />
                    <span className="text-white/80">{card.badge}</span>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className={`flex flex-col gap-4 relative z-10 ${isLeft ? "max-w-[80%] text-left items-start" : "max-w-[80%] ml-auto text-right items-end"}`}>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-none">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/55 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom CTA Button */}
                <div className={`mt-8 flex relative z-10 ${isLeft ? "justify-start" : "justify-end"}`}>
                  <a
                    href={card.href}
                    style={{
                      boxShadow: `0 4px 20px ${card.accent}20`
                    }}
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white text-black font-extrabold text-[10.5px] tracking-wider uppercase px-5 py-3.5 hover:scale-[1.03] active:scale-95 transition-all duration-300 group-hover:bg-[#00D084] group-hover:text-black"
                  >
                    <span>{card.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
}

/* ---------------- Download Our App ---------------- */
function DownloadApp() {
  return (
    <section id="app" className="relative w-full bg-[#020403] py-32 md:py-40 overflow-hidden border-t border-white/5">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#00D084]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] w-full px-8 md:px-16 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: TEXT, RATINGS, REVIEWS */}
          <Reveal className="lg:col-span-6 flex flex-col gap-8" yOffset={40}>
            
            {/* Header */}
            <GSAPText stagger={0.1}>
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#00D084] uppercase block mb-3">
                [ APP CONNECTIVITY / IOS & ANDROID ]
              </span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none m-0">
                Your cockpit,<br />
                <span className="text-[#00D084] italic font-serif normal-case font-light">digitized.</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-lg mt-6 leading-relaxed">
                Unlock real-time telemetry diagnostics, predictive health alerts, and instant 30-second service booking straight from your mobile device.
              </p>
            </GSAPText>

            {/* Ratings & Stores */}
            <div className="flex flex-wrap gap-8 items-center border-t border-b border-white/5 py-6">
              
              {/* App Store Rating */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white">4.9</span>
                  <div className="flex gap-0.5 text-[#00D084]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="text-[9.5px] font-mono text-white/40 uppercase tracking-wider">APP STORE // 12K RATINGS</span>
              </div>

              {/* Google Play Rating */}
              <div className="flex flex-col gap-2 border-l border-white/10 pl-8">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white">4.8</span>
                  <div className="flex gap-0.5 text-[#00D084]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="text-[9.5px] font-mono text-white/40 uppercase tracking-wider">PLAY STORE // 24K RATINGS</span>
              </div>

            </div>

            {/* Reviews */}
            <div className="flex flex-col gap-4 max-w-lg">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4.5">
                <p className="text-xs text-white/60 italic leading-relaxed mb-3">
                  "The live telemetry is absolutely flawless. I can track the health of my battery and request a diagnostic technician to my house in under 30 seconds."
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">— AMIT K. (OLA S1 OWNER)</span>
                  <div className="flex gap-0.5 text-[#00D084]/80">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-2 w-2 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4.5">
                <p className="text-xs text-white/60 italic leading-relaxed mb-3">
                  "Having instant access to detailed diagnostic parameters makes EV ownership worry-free. Exceptional service app!"
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">— ROHIT S. (ATHER 450X OWNER)</span>
                  <div className="flex gap-0.5 text-[#00D084]/80">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-2 w-2 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </Reveal>

          {/* RIGHT: SMARTPHONE MOCKUP & PREMIUM QR PAIRING CARD */}
          <Reveal className="lg:col-span-6 flex flex-col md:flex-row items-center justify-center gap-8 relative" yOffset={40} delay={0.2}>
            
            {/* Phone Mockup Frame */}
            <div className="relative w-[270px] h-[550px] rounded-[42px] border-[8px] border-white/10 bg-black shadow-[0_0_60px_rgba(0,208,132,0.18)] overflow-hidden flex flex-col p-3 transition-transform duration-500 hover:scale-[1.02] shrink-0">
              
              {/* Ear Speaker / Camera Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-5 rounded-full bg-black z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-white/20 rounded-full mb-1" />
                <div className="w-2.5 h-2.5 bg-white/10 rounded-full ml-2 mb-1" />
              </div>

              {/* Internal Screen Content */}
              <div className="flex-1 rounded-[32px] bg-[#030604] border border-white/5 overflow-hidden flex flex-col pt-8 px-4 text-white relative">
                
                {/* App Header */}
                <div className="flex items-center justify-between mt-2 mb-6">
                  <div className="flex items-center gap-1.5">
                    <div className="h-5 w-5 rounded bg-[#00D084] flex items-center justify-center">
                      <Zap className="h-3 w-3 text-black fill-current" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-white/90">MY EV SERVICE</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-white/50">
                    <Battery className="h-3.5 w-3.5 text-[#00D084]" />
                    <span>84%</span>
                  </div>
                </div>

                {/* Battery Dial Screen */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6">
                  
                  {/* Battery Dial */}
                  <div className="relative w-36 h-36 rounded-full border-4 border-dashed border-[#00D084]/20 flex items-center justify-center">
                    <div className="absolute inset-2 rounded-full border-2 border-[#00D084] border-t-transparent animate-spin" style={{ animationDuration: '6s' }} />
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-mono text-white/40 tracking-wider">BATTERY STATE</span>
                      <span className="text-3xl font-black text-white mt-0.5">84%</span>
                      <span className="text-[9px] text-[#00D084] font-semibold mt-1 tracking-wider uppercase">[ HEALTHY ]</span>
                    </div>
                  </div>

                  {/* Tech specs inside phone */}
                  <div className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-3.5 flex flex-col gap-2.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-white/45">TEMPERATURE</span>
                      <span className="font-mono text-white">32°C</span>
                    </div>
                    <div className="h-[1px] bg-white/5" />
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-white/45">RANGE CAPACITY</span>
                      <span className="font-mono text-white">142 km</span>
                    </div>
                  </div>

                </div>

                {/* Bottom App Actions */}
                <div className="pb-4 mt-auto">
                  <button className="w-full py-2.5 rounded-xl bg-[#00D084] text-black font-extrabold text-[10px] tracking-wider uppercase shadow-[0_0_15px_rgba(0,208,132,0.3)] hover:opacity-90 transition-opacity">
                    INITIATE CHARGE
                  </button>
                </div>

              </div>
            </div>

            {/* PREMIUM QR PAIRING CARD (POSITIONED NEAR DEVICE MOCKUP) */}
            <div className="w-full max-w-[270px] bg-[#070c09]/95 border border-[#00D084]/30 rounded-[32px] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col items-center text-center relative overflow-hidden group hover:border-[#00D084]/60 transition-all duration-500">
              
              {/* Background ambient glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#00D084]/20 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#00D084]/10 blur-3xl rounded-full pointer-events-none" />

              {/* Status Header Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/10 border border-[#00D084]/30 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse shadow-[0_0_8px_#00D084]" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#00D084] uppercase">
                  [ SCAN TO PAIR / DOWNLOAD ]
                </span>
              </div>

              {/* Ultra Premium QR Code Container */}
              <div className="relative p-4 bg-black/90 border border-white/15 rounded-2xl flex items-center justify-center w-40 h-40 group-hover:border-[#00D084]/60 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.9)] mb-5 overflow-hidden">
                {/* Laser scan animation beam */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D084] to-transparent animate-scan shadow-[0_0_12px_#00D084]" />
                
                {/* Glowing Corner Brackets for HUD feel */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00D084]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00D084]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00D084]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00D084]" />

                {/* Center EV Logo Badge inside QR */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-7 h-7 rounded-lg bg-[#00D084] border-2 border-black flex items-center justify-center shadow-[0_0_10px_rgba(0,208,132,0.8)] z-10">
                    <Zap className="w-4 h-4 text-black fill-current" />
                  </div>
                </div>

                {/* Precision SVG QR Code */}
                <svg viewBox="0 0 100 100" className="w-28 h-28 text-[#00D084] fill-current">
                  <path d="M0 0h30v10H10v20H0V0zm40 0h20v10H40V0zm30 0h30v30H90V10H80v10H70V0zM0 40h10v20H0V40zm30 10h10v10H30V50zm50-10h20v10H80V40zM0 70h30v30H20V90H10v10H0V70zm40 20h20v10H40V90zm30-20h30v10H80v10h10v10H70V70zm10 10h10v10H80V80z" />
                  <rect x="20" y="20" width="10" height="10" />
                  <rect x="70" y="20" width="10" height="10" />
                  <rect x="20" y="70" width="10" height="10" />
                  <rect x="45" y="45" width="10" height="10" />
                </svg>
              </div>

              {/* Explanatory text */}
              <p className="text-[12px] text-white/70 leading-relaxed font-light mb-3">
                Point your smartphone camera at the code to pair and launch the dashboard application instantly.
              </p>

              {/* Footer Subtext */}
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest border-t border-white/10 pt-3 w-full">
                IOS & ANDROID // INSTANT PAIRING
              </span>

            </div>

          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Quick Access Floating Sidebar ---------------- */
function QuickAccessSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger Button on the right edge */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#050806]/95 border border-[#00D084]/40 hover:border-[#00D084] text-white w-10 h-28 rounded-l-2xl flex flex-col items-center justify-center gap-2.5 cursor-pointer shadow-[0_0_20px_rgba(0,208,132,0.15)] transition-all duration-300 hover:pr-2 select-none group"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] shadow-[0_0_8px_#00D084] animate-pulse" />
        <span className="text-[10px] font-bold font-mono tracking-widest uppercase text-white/80 group-hover:text-white transition-colors flex items-center justify-center"
          style={{ writingMode: "vertical-lr" }}
        >
          QUICK ACCESS
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-45"
            />

            {/* Floating Sidebar (Untouched borders on right) */}
            <motion.div
              initial={{ x: "100%", opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              data-lenis-prevent
              className="quick-sidebar fixed right-4 top-4 bottom-4 w-[360px] sm:w-[380px] bg-[#020403]/95 border border-white/10 backdrop-blur-md rounded-[32px] p-6 z-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#00D084] shadow-[0_0_8px_#00D084] animate-pulse" />
                  <span className="text-xs font-bold font-mono tracking-wider text-white">SYSTEM CONTROLS</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Sidebar Content Widgets */}
              <div className="space-y-4 flex-1">
                
                {/* 1. Download Our App */}
                <div className="bg-[#050806] border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="flex items-center gap-2 w-full border-b border-white/5 pb-2.5 mb-4 text-xs font-bold text-white/90">
                    <Phone className="h-4 w-4 text-[#00D084]" />
                    <span>Download Our App</span>
                  </div>

                  {/* Phone Preview graphic */}
                  <div className="relative w-28 h-44 bg-black/85 border-2 border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-lg transition-transform group-hover:scale-[1.03] duration-300">
                    <div className="absolute top-2 w-8 h-1 bg-white/10 rounded-full" />
                    <div className="w-8 h-8 rounded-full bg-[#00D084]/10 flex items-center justify-center text-[#00D084]">
                      <Phone className="h-4.5 w-4.5 animate-pulse" />
                    </div>
                    <div className="absolute bottom-2 w-2 h-2 rounded-full bg-white/15" />
                  </div>
                  <span className="text-[10px] text-white/40 mt-3 font-mono">App Preview</span>
                </div>

                {/* 2. Special Offers */}
                <div className="bg-[#050806] border border-white/5 rounded-2xl p-5 flex flex-col relative overflow-hidden">
                  <div className="flex items-center gap-2 w-full border-b border-white/5 pb-2.5 mb-3 text-xs font-bold text-white/90">
                    <Gift className="h-4 w-4 text-[#00D084]" />
                    <span>Special Offers</span>
                  </div>

                  <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-3.5 flex flex-col text-left">
                    <span className="text-[#00D084] font-extrabold text-xs tracking-wider">Summer Special</span>
                    <span className="text-[11px] text-white/60 mt-1 font-light">25% off on all services</span>
                  </div>
                </div>

                {/* 3. 24/7 Assistance */}
                <a
                  href="tel:+919582390001"
                  className="bg-[#050806] border border-white/5 hover:border-[#00D084]/30 rounded-2xl p-5 flex flex-col items-center justify-center text-center relative overflow-hidden group block transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 w-full border-b border-white/5 pb-2.5 mb-4 text-xs font-bold text-white/90 text-left">
                    <PhoneCall className="h-4 w-4 text-[#00D084]" />
                    <span>24/7 Assistance</span>
                  </div>

                  <div className="w-12 h-12 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] shadow-[0_0_15px_rgba(0,208,132,0.1)] mb-3 group-hover:scale-110 transition-transform">
                    <PhoneCall className="h-5 w-5 animate-pulse" />
                  </div>
                  <span className="text-white font-extrabold text-sm tracking-wider group-hover:text-[#00D084] transition-colors">+91 95823 90001</span>
                  <span className="text-[10px] text-white/40 mt-1 font-mono">24/7 Emergency Support</span>
                </a>

                {/* 4. Find Nearest Centre */}
                <a
                  href="#nearest-center"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#050806] border border-white/5 hover:border-[#00D084]/30 rounded-2xl p-5 flex flex-col relative overflow-hidden block transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 w-full border-b border-white/5 pb-2.5 mb-4 text-xs font-bold text-white/90">
                    <MapPin className="h-4 w-4 text-[#00D084]" />
                    <span>Find Nearest Centre</span>
                  </div>

                  <div className="h-20 bg-black/85 border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: "radial-gradient(#00D084 1px, transparent 0)",
                        backgroundSize: "12px 12px"
                      }}
                    />
                    <MapPin className="h-6 w-6 text-[#00D084] animate-bounce" />
                  </div>
                  <span className="text-[10.5px] text-white/50 mt-3 text-center w-full font-light">Find centers near you</span>
                </a>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Page ---------------- */
function Landing() {
  const mainRef = useRef<HTMLElement>(null);
  useGSAPTextReveal(mainRef);

  // Force GSAP to recalculate pin positions after all lazy components/images load
  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <main ref={mainRef} className="relative bg-[#020403]">
      <Nav theme="warm" />
      <QuickAccessSidebar />

      {/* WARM LIGHT theme */}
      <div className="theme-warm bg-[#020403]">
        <Hero />
        <EVTypeSelection />
        <HowItWorks />
        <Ecosystem />
        <EVServices />
        <ValuePackages />
      </div>

      <CinematicEcosystem />

      <LabConfiguration />

      {/* PREMIUM GREEN theme */}
      <div className="theme-mid bg-[#020403]" style={{ backgroundColor: "#020403" }}>
        <Stats />
        <PartsWarehouse />
        <GenuineSpareParts />
        <HowItWorksHorizontal />
        <ResourcesJourney />
        <Factory />
        <CustomerStoriesWall />
        <LatestNews />
        <EcosystemOfferings />
        <DownloadApp />
        <FAQ />
        <TechnicianCareers />
        <Footer />
      </div>
    </main>
  );
}

export default Landing;
