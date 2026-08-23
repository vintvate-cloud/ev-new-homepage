import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Building2,
  Cpu,
  Layers,
  Database,
  Lock,
  GitBranch,
  QrCode,
  MapPin,
  DollarSign,
  PieChart,
  BarChart3,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Users,
  Briefcase,
  Globe,
  Radio,
  Clock,
  Send,
  FileText,
  Activity,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";

export const Route = createFileRoute("/investors")({
  component: InvestorRelationsPage,
});

// Reusable Framer Motion Variants for High-Impact Dynamic Entrance Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function InvestorRelationsPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [deckModalOpen, setDeckModalOpen] = useState(false);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [archModalOpen, setArchModalOpen] = useState(false);

  // Form State for Deck Request
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    firm: "",
    type: "Institutional VC",
    message: "",
  });

  // GSAP Animation Refs
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardsOverlayRef = useRef<HTMLDivElement>(null);
  const cardsUpRef = useRef<HTMLDivElement>(null);
  const statsBarRef = useRef<HTMLDivElement>(null);
  const thesisRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const techPinRef = useRef<HTMLDivElement>(null);
  const techPage1Ref = useRef<HTMLDivElement>(null);
  const techPage2Ref = useRef<HTMLDivElement>(null);
  const techPage3Ref = useRef<HTMLDivElement>(null);
  const [techActivePage, setTechActivePage] = useState(1);
  const revenueRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Automatic ScrollSpy: Updates activeTab as user scrolls through sections
  useEffect(() => {
    const sectionIds = ["market", "problem", "solution", "technology", "revenue", "roadmap", "connect"];

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 220;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // GSAP ScrollTrigger Animations (Matching Media Page Sticky Hero & Section Scrubbing)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Sticky Hero Image Parallax & Fade-out as user scrolls
      gsap.to(heroImageRef.current, {
        scale: 1.25,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: cardsOverlayRef.current,
          start: "top 100%",
          end: "top 20%",
          scrub: 0.8,
        },
      });

      // 2. Hero Text slow fade-out & scale down as content overlay moves up over hero
      gsap.to(heroTextRef.current, {
        opacity: 0,
        scale: 0.88,
        y: -70,
        ease: "power1.out",
        scrollTrigger: {
          trigger: cardsOverlayRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: 0.6,
        },
      });

      // 3. First section of content overlay rises up onto the fixed hero
      gsap.fromTo(
        cardsUpRef.current,
        { y: 140, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsUpRef.current,
            start: "top 92%",
            end: "top 45%",
            scrub: 0.6,
          },
        }
      );

      // 4. Thesis Section Entrance
      gsap.fromTo(
        thesisRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: thesisRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.5,
          },
        }
      );

      // 5. Market Section Entrance
      gsap.fromTo(
        marketRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: marketRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.5,
          },
        }
      );

      // 6. Problem Section Entrance
      gsap.fromTo(
        problemRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: problemRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.5,
          },
        }
      );

      // 7. Tech Stack Pinned 3-Stage Elevator Rise Sequence (Cards rise up from bottom of screen)
      if (techPinRef.current && techPage1Ref.current && techPage2Ref.current && techPage3Ref.current) {
        gsap.set(techPage1Ref.current, { y: 160, opacity: 0, scale: 0.88, pointerEvents: "none" });
        gsap.set(techPage2Ref.current, { y: 160, opacity: 0, scale: 0.88, pointerEvents: "none" });
        gsap.set(techPage3Ref.current, { y: 160, opacity: 0, scale: 0.88, pointerEvents: "none" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: techPinRef.current,
            start: "top 100px",
            end: "+=2400px",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progress < 0.38) {
                setTechActivePage(1);
              } else if (progress < 0.72) {
                setTechActivePage(2);
              } else {
                setTechActivePage(3);
              }
            },
          },
        });

        // Stage 1 Entrance: Rises up from bottom of screen to position (y: 0)
        tl.to(techPage1Ref.current, { y: 0, opacity: 1, scale: 1, pointerEvents: "auto", duration: 1 })
          
          // Stage 1 Exit (Ascends up & out y: -160) + Stage 2 Entrance (Rises up from bottom y: 160 -> 0)
          .to(techPage1Ref.current, { y: -160, opacity: 0, scale: 0.88, pointerEvents: "none", duration: 1 }, "+=0.6")
          .to(techPage2Ref.current, { y: 0, opacity: 1, scale: 1, pointerEvents: "auto", duration: 1 }, "<")

          // Stage 2 Exit (Ascends up & out y: -160) + Stage 3 Entrance (Rises up from bottom y: 160 -> 0)
          .to(techPage2Ref.current, { y: -160, opacity: 0, scale: 0.88, pointerEvents: "none", duration: 1 }, "+=0.6")
          .to(techPage3Ref.current, { y: 0, opacity: 1, scale: 1, pointerEvents: "auto", duration: 1 }, "<");
      }

      // 8. Revenue Section Entrance
      gsap.fromTo(
        revenueRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: revenueRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.5,
          },
        }
      );

      // 9. Roadmap Section Entrance
      gsap.fromTo(
        roadmapRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: roadmapRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.5,
          },
        }
      );

      // 10. Connect Section Entrance
      gsap.fromTo(
        connectRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: connectRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) {
      toast.error("Please enter your name and email address.");
      return;
    }
    toast.success("Investor Deck Request received! Our team will get in touch shortly.");
    setDeckModalOpen(false);
    setFormData({ name: "", email: "", firm: "", type: "Institutional VC", message: "" });
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans relative overflow-x-hidden">
      {/* Navigation Header */}
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Main Container */}
      <div className="relative min-h-screen">

        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (MATCHING MEDIA & ABOUT PAGES - Z-0)
           ========================================================================= */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-[#020403] z-0 flex items-center justify-center">
          {/* Cool Blurry EV Investment Poster Image */}
          <img
            ref={heroImageRef}
            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1920&auto=format&fit=crop&q=85"
            alt="Autobot OS Investor Hero"
            className="w-full h-full object-cover object-center filter blur-sm scale-105 opacity-60 pointer-events-none transition-all duration-300"
          />

          {/* Dynamic Floating Glow Rings */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-[#00D084]/20 rounded-full blur-[190px] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020403] via-black/50 to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,4,3,0.85)_100%)] pointer-events-none" />

          {/* Hero Content Container (Fades & Scales out via GSAP as cards rise) */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 lg:px-16 max-w-3xl mx-auto space-y-5 z-10 transition-all pointer-events-none pt-14 sm:pt-20"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
            >
              The Operating System for India's <br />
              <span className="text-[#00D084] drop-shadow-[0_0_35px_rgba(0,208,132,0.5)]">
                EV Services Economy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs sm:text-sm md:text-base font-normal text-white/80 leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]"
            >
              Autobot OS is a full-stack infrastructure platform powering EV service delivery at scale — from technician dispatch and inventory tracking to franchise operations and financial automation. Built for the defining decade of India's electric mobility transition.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center justify-center gap-3 pt-1 pointer-events-auto"
            >
              <button
                onClick={() => scrollToSection("market")}
                className="px-6 py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-extrabold uppercase tracking-wider hover:bg-[#00e08f] hover:scale-105 shadow-[0_0_25px_rgba(0,208,132,0.35)] transition-all cursor-pointer flex items-center gap-2"
              >
                Explore the Opportunity <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeckModalOpen(true)}
                className="px-6 py-3 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white text-xs font-bold hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
              >
                Connect With Our Team <Users className="w-4 h-4 text-[#00D084]" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* =========================================================================
            2. CARDS OVERLAY LAYER (SLIDES UP DIRECTLY ON TOP OF THE FIXED HERO - Z-10)
           ========================================================================= */}
        <div
          ref={cardsOverlayRef}
          className="relative z-10 bg-[#020403] min-h-screen mt-[calc(100vh-80px)] pt-8 rounded-t-[40px] border-t border-white/10 shadow-2xl space-y-24 px-6 lg:px-12 pb-24"
        >
          {/* Sticky Secondary Investor Sub-Nav Bar */}
          <div className="sticky top-20 z-40 bg-[#040806]/90 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-6">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084]">
                Investor Portal
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {[
                { id: "market", label: "Market" },
                { id: "problem", label: "Problem" },
                { id: "solution", label: "Solution" },
                { id: "technology", label: "Technology" },
                { id: "revenue", label: "Revenue" },
                { id: "roadmap", label: "Roadmap" },
                { id: "connect", label: "Connect" },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-colors cursor-pointer ${
                      isActive ? "text-[#020403] font-bold" : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="investorActiveTabPill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 bg-[#00D084] rounded-full shadow-[0_0_20px_rgba(0,208,132,0.5)] z-0"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setDeckModalOpen(true)}
              className="shrink-0 px-4 py-1.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/40 text-[#00D084] hover:bg-[#00D084] hover:text-[#020403] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" /> Request Deck
            </button>
          </div>

          {/* 4 Hero Highlight Metrics Cards (Rises up onto fixed hero via GSAP) */}
          <div ref={cardsUpRef} className="pt-4">
            <div ref={statsBarRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {[
                { value: "90M+", label: "EVs on Indian roads by 2030 (projected)" },
                { value: "₹35,000 Cr", label: "EV aftermarket opportunity by 2030" },
                { value: "15+", label: "Integrated platform modules" },
                { value: "90%", label: "Operations automated" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-[#070b09]/90 border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-md shadow-xl transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D084]/5 rounded-full blur-xl group-hover:bg-[#00D084]/15 transition-all" />
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-[#00D084] mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(0,208,132,0.2)]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/60 font-medium uppercase tracking-wider leading-relaxed">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              3. OUR THESIS
             ========================================================================= */}
          <section ref={thesisRef} className="space-y-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={scaleIn}
              className="bg-[#070b09]/90 border border-white/10 rounded-[36px] p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D084]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-4xl mx-auto space-y-6 text-center">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                  Our Thesis
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                  Not a service company. An infrastructure platform.
                </h2>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed font-light">
                  India's EV transition will create a servicing gap of unprecedented scale. Autobot OS addresses this not by deploying more mechanics — but by building the operational layer that makes every technician, franchise, spare part, and service booking programmable, trackable, and optimizable.
                </p>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
                  We are to EV servicing what Shopify is to commerce — the infrastructure that enables thousands of independent service operators to function at enterprise grade. Deterministic automation handles 90% of operations. AI provides the remaining 10% as an advisory intelligence layer.
                </p>
              </div>

              {/* 3 Core Architecture Cards */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12"
              >
                {[
                  {
                    title: "Enterprise-Grade ERP",
                    desc: "Full lifecycle management for bookings, inventory, payments, and franchise operations in a unified platform.",
                    icon: Building2,
                  },
                  {
                    title: "Franchise Network OS",
                    desc: "Standardized operations, training, quality control, and financial automation across distributed franchise nodes.",
                    icon: Layers,
                  },
                  {
                    title: "Intelligence Layer",
                    desc: "AI-powered insights for demand forecasting, anomaly detection, and franchise performance scoring — isolated and optional.",
                    icon: Cpu,
                  },
                ].map((card, i) => {
                  const IconComp = card.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={staggerItem}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="bg-white/[0.02] border border-white/10 hover:border-[#00D084]/50 p-6 sm:p-7 rounded-2xl space-y-4 transition-all group shadow-lg"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] group-hover:bg-[#00D084] group-hover:text-[#020403] transition-all">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00D084] transition-colors">{card.title}</h3>
                      <p className="text-xs text-white/60 leading-relaxed font-light">{card.desc}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </section>

          {/* =========================================================================
              4. MARKET OPPORTUNITY
             ========================================================================= */}
          <section id="market" ref={marketRef} className="space-y-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto space-y-4"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                Market Opportunity
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                India's EV revolution is a structural inevitability
              </h2>
              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                Driven by policy mandates, falling battery costs, and consumer adoption curves, India's EV ecosystem is scaling faster than the service infrastructure required to sustain it.
              </p>
            </motion.div>

            {/* 4 Market Stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { stat: "56%", label: "EV 2W sales growth YoY (FY25)" },
                { stat: "1 Cr+", label: "Registered EVs in India" },
                { stat: "₹10,000 Cr", label: "Current EV aftermarket size" },
                { stat: "49%", label: "CAGR in EV service demand" },
              ].map((m, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-[#070b09] border border-white/10 hover:border-[#00D084]/40 p-6 rounded-2xl text-center transition-all shadow-md"
                >
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white mb-1">{m.stat}</div>
                  <div className="text-[11px] text-white/60 font-mono uppercase">{m.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* 2 Segment Play Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInLeft}
                className="bg-[#080d0a]/90 border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-8 space-y-6 transition-all shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 flex items-center justify-center text-[#00D084]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Electric Two-Wheelers: The Volume Play</h3>
                    <span className="text-xs font-mono text-[#00D084]">High Volume • High Frequency</span>
                  </div>
                </div>
                <ul className="space-y-3 text-xs text-white/70 font-light">
                  {[
                    "2W EVs constitute over 62% of all EV registrations in India",
                    "Over 10 lakh electric 2Ws sold in FY2025 alone",
                    "Battery degradation creates recurring service demand within 18-24 months",
                    "OEM service networks cover less than 30% of ownership geography",
                    "Average service cost: ₹2,500-8,000 per visit — high enough for marketplace economics",
                  ].map((item, i) => (
                    <motion.li key={i} whileHover={{ x: 4 }} className="flex items-start gap-2.5 transition-all">
                      <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInRight}
                className="bg-[#080d0a]/90 border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-8 space-y-6 transition-all shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 flex items-center justify-center text-[#00D084]">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Three-Wheelers & Commercial: The Margin Play</h3>
                    <span className="text-xs font-mono text-[#00D084]">High Margin • Urgent SLA</span>
                  </div>
                </div>
                <ul className="space-y-3 text-xs text-white/70 font-light">
                  {[
                    "3W EVs growing at 40%+ CAGR with fleet adoption accelerating",
                    "Commercial EVs require 3-4x more frequent servicing than personal vehicles",
                    "Downtime cost for fleet operators: ₹1,500-3,000/day — urgency drives premium pricing",
                    "Battery swapping and reconditioning: emerging ₹5,000 Cr sub-market",
                    "Spare parts margins 40-65% vs 20-30% for ICE equivalents",
                  ].map((item, i) => (
                    <motion.li key={i} whileHover={{ x: 4 }} className="flex items-start gap-2.5 transition-all">
                      <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Policy & Regulatory Tailwinds */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={scaleIn}
              className="bg-[#050806] border border-white/10 hover:border-[#00D084]/30 rounded-3xl p-8 space-y-6 transition-all shadow-xl"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00D084]" /> Policy & Regulatory Tailwinds
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 border-l-2 border-[#00D084] pl-4">
                  <h4 className="text-sm font-bold text-white">FAME III & PM E-Drive</h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    ₹10,900 Cr subsidy allocation for EV adoption through 2027. Direct demand accelerant for service infrastructure.
                  </p>
                </div>
                <div className="space-y-2 border-l-2 border-[#00D084] pl-4">
                  <h4 className="text-sm font-bold text-white">Battery Waste Management Rules</h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    Mandatory EPR compliance creates structured aftermarket channels. First-mover advantage for compliant service networks.
                  </p>
                </div>
                <div className="space-y-2 border-l-2 border-[#00D084] pl-4">
                  <h4 className="text-sm font-bold text-white">State EV Policies</h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    28+ states with dedicated EV policies including service infrastructure mandates. Regulatory pull for standardized service networks.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* =========================================================================
              5. THE PROBLEM
             ========================================================================= */}
          <section id="problem" ref={problemRef} className="space-y-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto space-y-4"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                The Problem
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                India has an EV adoption engine. It lacks the service infrastructure.
              </h2>
              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                The market is fragmented across unaccountable local garages, under-invested OEM networks, and aggregator platforms that treat EV servicing as a listing problem rather than an infrastructure problem.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  title: "Untrained Workforce",
                  desc: "Less than 5% of existing mechanics are trained for high-voltage EV systems. Incorrect handling leads to safety incidents and warranty voiding.",
                },
                {
                  title: "Opaque Supply Chain",
                  desc: "No chain-of-custody tracking for EV spare parts. Counterfeit batteries and components create safety risks and erode brand trust.",
                },
                {
                  title: "Zero Visibility",
                  desc: "Vehicle owners have no real-time tracking, standardized pricing, or service history portability. Every interaction starts from zero.",
                },
                {
                  title: "OEM Capacity Gap",
                  desc: "OEM service networks cover metro cores only. Tier-2 and Tier-3 cities — where EV adoption is fastest — have virtually no authorized support.",
                },
                {
                  title: "No Operational Data",
                  desc: "Independent garages operate without analytics. No demand forecasting, no inventory optimization, no performance benchmarking.",
                },
                {
                  title: "Payment Friction",
                  desc: "Cash-heavy operations, manual invoicing, no commission automation. Financial reconciliation costs operators 15-20% of revenue in overhead.",
                },
              ].map((prob, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-[#080d0a]/90 border border-white/10 hover:border-red-500/40 p-6 sm:p-7 rounded-3xl space-y-3 transition-all group shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-mono font-bold text-xs group-hover:bg-red-500 group-hover:text-black transition-all">
                    0{i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">{prob.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{prob.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* =========================================================================
              6. OUR SOLUTION & ARCHITECTURE
             ========================================================================= */}
          <section id="solution" ref={solutionRef} className="space-y-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto space-y-4"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                Our Solution
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                A complete operating system — not another aggregator
              </h2>
              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                Autobot OS is a vertically integrated platform that controls every layer of EV service delivery — from customer booking through spare parts procurement to technician payment settlement.
              </p>
            </motion.div>

            {/* Layered OS Architecture Stack Trigger Button */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={scaleIn}
              className="bg-[#070b09]/90 border border-white/10 rounded-[32px] p-8 sm:p-10 text-center backdrop-blur-md relative overflow-hidden shadow-2xl flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-80 h-80 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none"
              />

              <button
                onClick={() => setArchModalOpen(true)}
                className="px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-extrabold uppercase tracking-wider hover:bg-[#00e08f] hover:scale-105 shadow-[0_0_30px_rgba(0,208,132,0.4)] transition-all cursor-pointer inline-flex items-center gap-2.5 relative z-10"
              >
                <Layers className="w-4 h-4" /> Open Autobot OS Architecture Stack
              </button>
            </motion.div>

            {/* 5 Core Technological Capabilities */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { num: "01", category: "Booking Engine", title: "State Machine Booking Engine", desc: "Every booking follows a deterministic state machine. Invalid transitions are blocked. No booking can reach an inconsistent state. Cancellations require reason codes. Completions require validation." },
                { num: "02", category: "QR Tracking", title: "QR Chain-of-Custody", desc: "Every spare part is tracked from warehouse to installation via QR scan. Append-only movement logs. One physical unit = one record. No manual quantity editing without admin audit trail." },
                { num: "03", category: "Dispatch Engine", title: "Uber-Style Live Dispatch", desc: "Real-time technician tracking, intelligent geo-allocation, route optimization, and customer-visible ETA. Franchise managers see full operational maps." },
                { num: "04", category: "Financial Engine", title: "Immutable Financial Ledger", desc: "All payment confirmations via webhook only. Commission calculations are deterministic. Refunds create reverse ledger entries. No direct frontend payment manipulation possible." },
                { num: "05", category: "Security Architecture", title: "Enterprise Security Architecture", desc: "Row-level security, JWT authentication, role-based access, rate limiting, input validation. Every critical action requires role verification and generates an immutable audit log.", colSpan: "md:col-span-2 lg:col-span-2" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`bg-[#080d0a]/90 border border-white/10 hover:border-[#00D084]/40 rounded-2xl p-6 space-y-3 transition-all group shadow-lg ${item.colSpan || ""}`}
                >
                  <div className="text-xs font-mono font-bold text-[#00D084]">{item.num} • {item.category}</div>
                  <h4 className="text-base font-bold text-white group-hover:text-[#00D084] transition-colors">{item.title}</h4>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* =========================================================================
              7. COMPETITIVE LANDSCAPE COMPARISON MATRIX
             ========================================================================= */}
          <section className="space-y-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto space-y-4"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                Competitive Landscape
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                Beyond aggregation. Beyond OEM dependency.
              </h2>
              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                Existing players address surface-level problems. Autobot OS addresses the infrastructure stack.
              </p>
            </motion.div>

            {/* Matrix Teaser Box & Popup Trigger Button */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={scaleIn}
              className="bg-[#070b09]/90 border border-white/10 rounded-[32px] p-8 sm:p-12 text-center space-y-8 backdrop-blur-md relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#00D084]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Quick Score Preview Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center">
                  <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">Local Garage</span>
                  <span className="text-2xl font-black font-mono text-white/40">0 / 11</span>
                  <span className="text-[10px] text-red-400/80 block mt-1">Unregulated</span>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center">
                  <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">OEM Service</span>
                  <span className="text-2xl font-black font-mono text-white/60">4 / 11</span>
                  <span className="text-[10px] text-amber-400/80 block mt-1">Brand-Captive</span>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center">
                  <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">Aggregators</span>
                  <span className="text-2xl font-black font-mono text-white/60">3 / 11</span>
                  <span className="text-[10px] text-amber-400/80 block mt-1">Listing Only</span>
                </div>
                <div className="bg-[#00D084]/10 border border-[#00D084]/40 rounded-2xl p-5 text-center shadow-[0_0_25px_rgba(0,208,132,0.15)]">
                  <span className="text-[10px] font-mono uppercase text-[#00D084] font-bold block mb-1">Autobot OS</span>
                  <span className="text-2xl font-black font-mono text-[#00D084]">11 / 11</span>
                  <span className="text-[10px] text-[#00D084] font-bold block mt-1">Full Infrastructure</span>
                </div>
              </div>

              {/* Action Callout & Button */}
              <div className="space-y-4 max-w-xl mx-auto pt-2">
                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                  Compare Autobot OS against traditional service models across all 11 critical operational, technological, and financial capabilities.
                </p>

                <button
                  onClick={() => setTableModalOpen(true)}
                  className="px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-extrabold uppercase tracking-wider hover:bg-[#00e08f] hover:scale-105 shadow-[0_0_30px_rgba(0,208,132,0.4)] transition-all cursor-pointer inline-flex items-center gap-2.5"
                >
                  <BarChart3 className="w-4 h-4" /> Open Capability Comparison Matrix
                </button>
              </div>
            </motion.div>

            {/* 2 Model Analysis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInLeft}
                className="bg-[#080d0a]/90 border border-white/10 hover:border-white/30 rounded-2xl p-6 space-y-3 transition-all shadow-md"
              >
                <h4 className="text-base font-bold text-white">Aggregator Model Limitations</h4>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Platforms like UrbanCompany and GoMechanic (now wound down) treat service as discovery + listing. They don't control quality, inventory, training, or financial flows. The customer experience depends entirely on individual provider competence. This model fails at scale for specialized EV servicing where safety and technical standards are non-negotiable.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInRight}
                className="bg-[#080d0a]/90 border border-white/10 hover:border-white/30 rounded-2xl p-6 space-y-3 transition-all shadow-md"
              >
                <h4 className="text-base font-bold text-white">OEM Service Network Constraints</h4>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Ola Electric, Ather, and TVS service networks are brand-captive and geographically limited. A multi-brand EV owner must navigate multiple service ecosystems. None offer standardized multi-brand support, franchise-level operational software, or third-party technician integration. The gap widens as EV brands proliferate.
                </p>
              </motion.div>
            </div>
          </section>

          {/* =========================================================================
              8. TECHNOLOGY MOAT & PINNED 3-STAGE PAGE SEQUENCE
             ========================================================================= */}
          <section id="technology" ref={techRef} className="space-y-12">
            
            {/* Pinned Container for 9 Tech Moat Cards (3 per scroll step) */}
            <div ref={techPinRef} className="space-y-8 py-4">
              
              {/* Section Header with Active Page Indicator Pill */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                  Technology Moat
                </span>

                <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                  Infrastructure-grade engineering. Not MVP-grade code.
                </h2>
                <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                  Autobot OS is built on enterprise architectural patterns — event-driven, deterministic, auditable, and designed for multi-franchise horizontal scaling from day one.
                </p>

                {/* 3 Page Step Indicator Bar */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  {[1, 2, 3].map((page) => (
                    <div
                      key={page}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        techActivePage === page ? "w-10 bg-[#00D084] shadow-[0_0_12px_rgba(0,208,132,0.5)]" : "w-2.5 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* 3 Stacked Pages Container (Absolute Layered Position for Smooth Scroll Paging Replacement) */}
              <div className="relative min-h-[340px] sm:min-h-[240px] max-w-7xl mx-auto">

                {/* STAGE 1: Cards 01 - 03 (System Core) */}
                <div
                  ref={techPage1Ref}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 absolute inset-0 w-full h-full z-10 transition-all"
                >
                  {[
                    { num: "01", category: "SYSTEM CORE", t: "Event-Driven Architecture", d: "Every state change is event-sourced and auditable. No direct state mutation outside the approved service layer. Database is the single source of truth." },
                    { num: "02", category: "SYSTEM CORE", t: "State Machine Engine", d: "Booking lifecycle follows a strict state machine. Invalid transitions are blocked at the service layer. No booking reaches an inconsistent state." },
                    { num: "03", category: "SYSTEM CORE", t: "Append-Only QR Tracking", d: "Inventory movements are append-only. Every spare part tracked via QR from procurement to installation. Immutable chain-of-custody logs." },
                  ].map((tech) => (
                    <div
                      key={tech.num}
                      className="bg-[#070b09]/95 border border-[#00D084]/30 hover:border-[#00D084] p-6 sm:p-7 rounded-3xl space-y-3 transition-all group shadow-xl hover:shadow-[0_0_30px_rgba(0,208,132,0.15)] flex flex-col justify-start h-full min-h-[210px]"
                    >
                      <div className="text-xs font-mono font-bold text-[#00D084]">{tech.num} • {tech.category}</div>
                      <h4 className="text-lg font-bold text-white group-hover:text-[#00D084] transition-colors">{tech.t}</h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">{tech.d}</p>
                    </div>
                  ))}
                </div>

                {/* STAGE 2: Cards 04 - 06 (Security & Automation) */}
                <div
                  ref={techPage2Ref}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 absolute inset-0 w-full h-full z-10 opacity-0 pointer-events-none transition-all"
                >
                  {[
                    { num: "04", category: "SECURITY & AUTOMATION", t: "Immutable Transaction Logs", d: "All financial records are immutable. Every action traceable to user ID + timestamp. Exportable audit trail for compliance." },
                    { num: "05", category: "SECURITY & AUTOMATION", t: "Supabase RLS Architecture", d: "Row Level Security enforced at database level. Role-based access control. No direct database access from frontend. JWT authentication." },
                    { num: "06", category: "SECURITY & AUTOMATION", t: "Edge Function Automation", d: "Server-side edge functions handle sensitive logic, webhook processing, commission calculations. No API keys in frontend." },
                  ].map((tech) => (
                    <div
                      key={tech.num}
                      className="bg-[#070b09]/95 border border-[#00D084]/30 hover:border-[#00D084] p-6 sm:p-7 rounded-3xl space-y-3 transition-all group shadow-xl hover:shadow-[0_0_30px_rgba(0,208,132,0.15)] flex flex-col justify-start h-full min-h-[210px]"
                    >
                      <div className="text-xs font-mono font-bold text-[#00D084]">{tech.num} • {tech.category}</div>
                      <h4 className="text-lg font-bold text-white group-hover:text-[#00D084] transition-colors">{tech.t}</h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">{tech.d}</p>
                    </div>
                  ))}
                </div>

                {/* STAGE 3: Cards 07 - 09 (Intelligence & Multi-Tenant Scale) */}
                <div
                  ref={techPage3Ref}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 absolute inset-0 w-full h-full z-10 opacity-0 pointer-events-none transition-all"
                >
                  {[
                    { num: "07", category: "INTELLIGENCE & SCALE", t: "AI Isolation Layer", d: "AI is read-only. Receives only aggregated data. Never touches PII. Responses are structured JSON. Failure does not break core operations." },
                    { num: "08", category: "INTELLIGENCE & SCALE", t: "Live Map Optimization", d: "Real-time WebSocket-based technician tracking. Geo-fenced allocation. Route optimization. Capacity-aware dispatch engine." },
                    { num: "09", category: "INTELLIGENCE & SCALE", t: "Multi-Tenant Design", d: "Architecture supports multiple franchises with isolated data and shared operational rules. Horizontal scaling requires zero code duplication." },
                  ].map((tech) => (
                    <div
                      key={tech.num}
                      className="bg-[#070b09]/95 border border-[#00D084]/30 hover:border-[#00D084] p-6 sm:p-7 rounded-3xl space-y-3 transition-all group shadow-xl hover:shadow-[0_0_30px_rgba(0,208,132,0.15)] flex flex-col justify-start h-full min-h-[210px]"
                    >
                      <div className="text-xs font-mono font-bold text-[#00D084]">{tech.num} • {tech.category}</div>
                      <h4 className="text-lg font-bold text-white group-hover:text-[#00D084] transition-colors">{tech.t}</h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">{tech.d}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* QR Supply Chain Spotlight */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={scaleIn}
              className="bg-[#080d0a]/90 border border-white/10 hover:border-[#00D084]/30 rounded-3xl p-8 space-y-8 shadow-xl transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-[#00D084] uppercase tracking-widest">QR Supply Chain</span>
                  <h3 className="text-2xl font-bold text-white">Every part tracked. Every movement logged.</h3>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D084]/10 border border-[#00D084]/20 text-xs font-mono text-[#00D084]">
                  <QrCode className="w-4 h-4" /> Zero Gray Market Leakage
                </div>
              </div>

              {/* 6 Flow Steps */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                {[
                  { step: "01", label: "Procurement", detail: "Part ordered, QR generated" },
                  { step: "02", label: "Warehouse Receipt", detail: "Scanned at warehouse" },
                  { step: "03", label: "Franchise Dispatch", detail: "Movement logged" },
                  { step: "04", label: "Technician Assign", detail: "Scanned on allocation" },
                  { step: "05", label: "Installation", detail: "Linked to booking" },
                  { step: "06", label: "Customer Verify", detail: "Authenticity verified" },
                ].map((s) => (
                  <motion.div
                    key={s.step}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className="bg-black/40 border border-white/10 hover:border-[#00D084]/40 p-4 rounded-xl space-y-1 transition-all"
                  >
                    <span className="text-xs font-mono text-[#00D084] font-bold">{s.step}</span>
                    <h5 className="text-xs font-bold text-white">{s.label}</h5>
                    <p className="text-[10px] text-white/50 leading-tight">{s.detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* =========================================================================
              9. AUTOBOT ACADEMY
             ========================================================================= */}
          <section className="space-y-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={scaleIn}
              className="bg-[#070b09]/90 border border-white/10 rounded-[36px] p-8 sm:p-12 lg:p-14 shadow-2xl space-y-8 backdrop-blur-md"
            >
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                  Autobot Academy
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                  The talent moat. Vertically integrated.
                </h2>
                <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                  Autobot Academy is not a training program — it's a strategic vertical integration that controls the most constrained resource in India's EV service ecosystem: skilled technicians.
                </p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[
                  { title: "Training Pipeline", desc: "Structured curriculum for EV-specific skills: high-voltage systems, battery diagnostics, motor repair, software troubleshooting." },
                  { title: "Certification System", desc: "Multi-level certifications with verifiable credentials. Skill grades determine service assignment eligibility and tier pricing." },
                  { title: "Skill Grading", desc: "Continuous assessment and skill-level tracking. Performance data feeds back into allocation algorithms for optimal job matching." },
                  { title: "Franchise Hiring", desc: "Franchises hire exclusively from the Academy pipeline. Pre-trained technicians reduce onboarding time from months to days." },
                  { title: "Standardization Moat", desc: "Uniform training standards across all franchise locations. Every technician follows the same diagnostic protocols and safety procedures." },
                  { title: "Quality Control", desc: "Service quality scoring linked to training outcomes. Low performers automatically routed to refresher modules. Data-driven improvement." },
                ].map((acad, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="bg-white/[0.02] border border-white/10 hover:border-[#00D084]/40 p-6 rounded-2xl space-y-2 transition-all group shadow-md"
                  >
                    <h4 className="text-sm font-bold text-white group-hover:text-[#00D084] transition-colors">{acad.title}</h4>
                    <p className="text-xs text-white/60 leading-relaxed font-light">{acad.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Why This Matters Callout Box */}
              <div className="bg-[#00D084]/10 border border-[#00D084]/30 rounded-2xl p-6 space-y-2">
                <h4 className="text-sm font-mono font-bold text-[#00D084] uppercase">Why This Matters</h4>
                <p className="text-xs text-white/80 leading-relaxed font-light">
                  India has fewer than 50,000 EV-trained mechanics for a market growing to 90M+ vehicles. The company that controls the training pipeline controls the supply side of the market. Autobot Academy converts this constraint into a durable competitive advantage — every trained technician becomes a node in the Autobot network.
                </p>
              </div>
            </motion.div>
          </section>

          {/* =========================================================================
              10. REVENUE MODEL & UNIT ECONOMICS
             ========================================================================= */}
          <section id="revenue" ref={revenueRef} className="space-y-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto space-y-4"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                Revenue Model
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                Layered monetization. Compounding economics.
              </h2>
              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                Six revenue streams that reinforce each other — creating a flywheel where every new franchise, technician, and customer increases platform value non-linearly.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { type: "Recurring", name: "Service Commission", value: "18-25%", desc: "Platform commission on every service booking. Recurring and proportional to GMV growth." },
                { type: "Recurring", name: "Spare Parts Margin", value: "40-65%", desc: "Centralized procurement with margin capture on spare parts sold through the QR supply chain." },
                { type: "One-time", name: "Franchise Fee", value: "₹5-15L", desc: "One-time onboarding fee per franchise. Covers setup, training, initial inventory, and platform access." },
                { type: "Recurring", name: "Technology Fee", value: "₹25-50K/mo", desc: "Monthly SaaS subscription per franchise for platform access, updates, and support." },
                { type: "Recurring", name: "Academy Revenue", value: "₹15-30K", desc: "Per-technician certification fee. Refresher and advanced courses create ongoing revenue." },
                { type: "Future", name: "SaaS Licensing", value: "White-label", desc: "Future white-label platform licensing for OEMs, fleet operators, and international markets." },
              ].map((rev, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-[#070b09] border border-white/10 hover:border-[#00D084]/40 p-6 rounded-2xl space-y-3 transition-all group shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/20 px-2 py-0.5 rounded">
                      {rev.type}
                    </span>
                    <span className="text-lg font-black font-mono text-white group-hover:text-[#00D084] transition-colors">{rev.value}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{rev.name}</h4>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{rev.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Per-Booking & Per-Franchise Unit Economics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInLeft}
                className="bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-8 space-y-4 shadow-xl transition-all"
              >
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#00D084]" /> Per-Booking Unit Economics
                </h3>
                <div className="space-y-2.5 text-xs divide-y divide-white/10">
                  <div className="flex justify-between py-1.5"><span className="text-white/70">Average Booking Value</span><span className="font-mono text-white">₹3,500</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-white/70">Spare Parts Revenue</span><span className="font-mono text-white">₹2,200</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-white/70">Spare Parts Margin</span><span className="font-mono text-white">₹1,100 (50%)</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-white/70">Service Commission</span><span className="font-mono text-white">₹700 (20%)</span></div>
                  <div className="flex justify-between py-2 font-bold text-sm text-[#00D084]"><span className="text-[#00D084]">Platform Revenue per Booking</span><span className="font-mono">₹1,800</span></div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInRight}
                className="bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-8 space-y-4 shadow-xl transition-all"
              >
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#00D084]" /> Per-Franchise Economics (Monthly)
                </h3>
                <div className="space-y-2.5 text-xs divide-y divide-white/10">
                  <div className="flex justify-between py-1.5"><span className="text-white/70">Bookings per Month</span><span className="font-mono text-white">120-180</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-white/70">Gross Revenue (Service)</span><span className="font-mono text-white">₹4.2-6.3L</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-white/70">Spare Parts Revenue</span><span className="font-mono text-white">₹2.6-4.0L</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-white/70">Technology Fee</span><span className="font-mono text-white">₹35K</span></div>
                  <div className="flex justify-between py-2 font-bold text-sm text-[#00D084]"><span className="text-[#00D084]">Net Platform Revenue</span><span className="font-mono">₹2.5-3.8L</span></div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* =========================================================================
              11. EXPANSION ROADMAP
             ========================================================================= */}
          <section id="roadmap" ref={roadmapRef} className="space-y-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto space-y-4"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                Expansion Roadmap
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                Systematic expansion. Data-driven sequencing.
              </h2>
              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                City expansion is sequenced by EV density, service gap analysis, and franchise applicant quality — not by arbitrary geographic ambition.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  phase: "Phase 1",
                  period: "2025-2026",
                  title: "Foundation",
                  items: ["Launch in Delhi NCR with 5-10 nodes", "Validate unit economics & platform maturity", "Academy v1: First 200 certified techs", "QR supply chain operational across all nodes", "Achieve ₹2 Cr monthly GMV run-rate"],
                },
                {
                  phase: "Phase 2",
                  period: "2026-2027",
                  title: "Scale",
                  items: ["Expand to 6 metro cities (Mumbai, Blr, Pune...)", "50+ franchise nodes operational", "Academy v2: 1,000+ certified techs", "Fleet operator partnerships", "Achieve ₹15 Cr monthly GMV run-rate"],
                },
                {
                  phase: "Phase 3",
                  period: "2027-2028",
                  title: "Density",
                  items: ["Tier-2 city expansion: 20+ cities", "200+ franchise nodes", "SaaS licensing model for OEM service networks", "Battery reconditioning vertical", "Achieve ₹50 Cr monthly GMV run-rate"],
                },
                {
                  phase: "Phase 4",
                  period: "2028-2030",
                  title: "Platform",
                  items: ["Pan-India coverage: 50+ cities", "White-label platform for international markets", "EV fleet management vertical", "Battery-as-a-Service integration", "IPO readiness milestone"],
                },
              ].map((p, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-[#070b09] border border-white/10 hover:border-[#00D084]/50 p-6 sm:p-7 rounded-3xl space-y-4 relative overflow-hidden transition-all group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/20 px-2.5 py-1 rounded-lg">
                      {p.phase}
                    </span>
                    <span className="text-xs font-mono text-white/50">{p.period}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#00D084] transition-colors">{p.title}</h3>
                  <ul className="space-y-2 text-xs text-white/70 font-light">
                    {p.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#00D084] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* =========================================================================
              12. INVESTOR CONNECT (CTA & FORM)
             ========================================================================= */}
          <section id="connect" ref={connectRef} className="space-y-12 pt-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={scaleIn}
              className="bg-gradient-to-b from-[#080d0a] to-[#040705] border border-white/15 hover:border-[#00D084]/30 rounded-[36px] p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden text-center space-y-8 transition-all"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                  Investor Connect
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  Building India's EV Services infrastructure layer.
                </h2>
                <p className="text-xs sm:text-base text-white/80 font-light leading-relaxed">
                  We are preparing for our next round of strategic investment. If you are an institutional investor, venture capital firm, or strategic partner interested in India's EV infrastructure opportunity, we welcome a conversation.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setDeckModalOpen(true)}
                    className="px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-extrabold uppercase tracking-wider hover:bg-[#00e08f] hover:scale-105 shadow-[0_0_30px_rgba(0,208,132,0.4)] transition-all cursor-pointer flex items-center gap-2"
                  >
                    Request Investor Deck <FileText className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs font-mono text-white/60">
                  <div><span className="text-white/40">Stage:</span> <span className="text-white font-bold">Seed / Pre-Series A</span></div>
                  <div><span className="text-white/40">Focus:</span> <span className="text-white font-bold">Infrastructure</span></div>
                  <div><span className="text-white/40">Geography:</span> <span className="text-white font-bold">India-first</span></div>
                </div>
              </div>

              <p className="text-[10px] text-white/40 font-mono max-w-3xl mx-auto pt-6 border-t border-white/10">
                This page is for informational purposes only and does not constitute an offer of securities. All market data referenced is based on publicly available industry reports from SMEV, NITI Aayog, JMK Research, and Redseer. Forward-looking projections are based on current operational trajectory and are not guarantees of future performance.
              </p>
            </motion.div>
          </section>

        </div>
      </div>

      {/* Request Deck Modal */}
      <AnimatePresence>
        {deckModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#080d0a] border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl relative space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#00D084]" /> Request Investor Deck
                </h3>
                <button
                  onClick={() => setDeckModalOpen(false)}
                  className="text-white/40 hover:text-white text-sm font-mono cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-white/70 font-mono mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-mono mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vikram@fund.vc"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-mono mb-1">Firm / Organization</label>
                  <input
                    type="text"
                    value={formData.firm}
                    onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                    placeholder="e.g. Peak XV Partners"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-mono mb-1">Investor Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-[#080d0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D084]"
                  >
                    <option value="Institutional VC">Institutional VC</option>
                    <option value="Angel Investor">Angel Investor</option>
                    <option value="Corporate Strategic">Corporate Strategic</option>
                    <option value="Family Office">Family Office</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#00D084] text-[#020403] font-bold text-xs uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,208,132,0.3)]"
                >
                  <Send className="w-4 h-4" /> Submit Deck Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Capability Comparison Table Right Slide-Over Drawer */}
      <AnimatePresence>
        {tableModalOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setTableModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
            />

            {/* Right Slide-Over Floating Curved Drawer Panel */}
            <motion.div
              initial={{ x: "110%" }}
              animate={{ x: 0 }}
              exit={{ x: "110%" }}
              transition={{ type: "spring", damping: 26, stiffness: 210 }}
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="fixed top-3 bottom-3 right-3 sm:top-5 sm:bottom-5 sm:right-5 w-[calc(100%-24px)] max-w-5xl bg-[#030604]/95 border border-white/20 rounded-[32px] sm:rounded-[36px] shadow-[0_0_80px_rgba(0,0,0,0.95)] z-50 flex flex-col justify-between p-6 sm:p-8 space-y-6 overflow-hidden backdrop-blur-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] shadow-[0_0_15px_rgba(0,208,132,0.2)]">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">Competitive Capability Matrix</h3>
                    <p className="text-xs text-white/60 font-mono">11-Capability Structural Evaluation</p>
                  </div>
                </div>
                <button
                  onClick={() => setTableModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center text-sm font-mono cursor-pointer transition-all hover:scale-105"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Table Content (Lenis Prevent, Hidden Scrollbar) */}
              <div
                data-lenis-prevent="true"
                data-lenis-prevent-wheel="true"
                data-lenis-prevent-touch="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="overflow-y-auto overflow-x-auto rounded-2xl border border-white/10 bg-black/40 flex-1 overscroll-contain no-scrollbar [::-webkit-scrollbar]:hidden [scrollbar-width:none]"
              >
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead className="sticky top-0 z-10 bg-[#080d0a]">
                    <tr className="border-b border-white/10 bg-white/[0.04]">
                      <th className="p-4 sm:p-5 text-xs font-mono font-bold uppercase text-white/70">Capability</th>
                      <th className="p-4 sm:p-5 text-xs font-mono font-bold uppercase text-white/50 text-center">Local Garage</th>
                      <th className="p-4 sm:p-5 text-xs font-mono font-bold uppercase text-white/50 text-center">OEM Service</th>
                      <th className="p-4 sm:p-5 text-xs font-mono font-bold uppercase text-white/50 text-center">Aggregator</th>
                      <th className="p-4 sm:p-5 text-xs font-mono font-bold uppercase text-[#00D084] text-center bg-[#00D084]/15">Autobot OS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs">
                    {[
                      "Real-time GPS Tracking",
                      "Full ERP Integration",
                      "Inventory Visibility",
                      "Franchise Standardization",
                      "AI Operational Insights",
                      "QR Part Traceability",
                      "Financial Automation",
                      "Horizontal Scalability",
                      "Certified Talent Pipeline",
                      "Immutable Audit Logs",
                      "Multi-Franchise Management",
                    ].map((cap, i) => (
                      <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                        <td className="p-4 font-medium text-white">{cap}</td>
                        <td className="p-4 text-center text-white/40">{i < 2 ? "Limited" : <XCircle className="w-4 h-4 text-red-500/60 mx-auto" />}</td>
                        <td className="p-4 text-center text-white/60">{[0, 1, 3, 8].includes(i) ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-red-500/60 mx-auto" />}</td>
                        <td className="p-4 text-center text-white/60">{[0, 6, 7].includes(i) ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-red-500/60 mx-auto" />}</td>
                        <td className="p-4 text-center font-bold text-[#00D084] bg-[#00D084]/10">
                          <Check className="w-4 h-4 text-[#00D084] mx-auto" />
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-[#00D084]/15 font-bold border-t border-[#00D084]/40">
                      <td className="p-4 text-sm font-mono text-white">Score</td>
                      <td className="p-4 text-center text-white/40 font-mono">0 / 11</td>
                      <td className="p-4 text-center text-white/60 font-mono">4 / 11</td>
                      <td className="p-4 text-center text-white/60 font-mono">3 / 11</td>
                      <td className="p-4 text-center text-[#00D084] font-mono text-base">11 / 11</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Drawer Footer Bar */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4 shrink-0">
                <span className="text-xs text-white/50 font-mono">100% Capabilities Supported on Autobot OS</span>
                <button
                  onClick={() => setTableModalOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/40 text-[#00D084] hover:bg-[#00D084] hover:text-[#020403] text-xs font-bold transition-all cursor-pointer"
                >
                  Close Matrix
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Autobot OS Architecture Stack (L1 - L6) Right Slide-Over Drawer */}
      <AnimatePresence>
        {archModalOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setArchModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
            />

            {/* Right Slide-Over Floating Curved Drawer Panel */}
            <motion.div
              initial={{ x: "110%" }}
              animate={{ x: 0 }}
              exit={{ x: "110%" }}
              transition={{ type: "spring", damping: 26, stiffness: 210 }}
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="fixed top-3 bottom-3 right-3 sm:top-5 sm:bottom-5 sm:right-5 w-[calc(100%-24px)] max-w-6xl bg-[#030604]/95 border border-white/20 rounded-[32px] sm:rounded-[36px] shadow-[0_0_80px_rgba(0,0,0,0.95)] z-50 flex flex-col justify-between p-6 sm:p-8 space-y-6 overflow-hidden backdrop-blur-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] shadow-[0_0_15px_rgba(0,208,132,0.2)]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">AUTOBOT OS ARCHITECTURE & CAPABILITIES</h3>
                    <p className="text-xs text-white/60 font-mono">Full-Stack Modular Infrastructure & Core Technical Engine</p>
                  </div>
                </div>
                <button
                  onClick={() => setArchModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center text-sm font-mono cursor-pointer transition-all hover:scale-105"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable 2-Column Content (Lenis Prevent Enabled, Hidden Scrollbar) */}
              <div
                data-lenis-prevent="true"
                data-lenis-prevent-wheel="true"
                data-lenis-prevent-touch="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="overflow-y-auto flex-1 pr-2 text-white overscroll-contain no-scrollbar [::-webkit-scrollbar]:hidden [scrollbar-width:none] touch-auto"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start py-2">
                  
                  {/* LEFT COLUMN: 6 OS Architecture Layers (L1 - L6) */}
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] block mb-2">
                      OS Architecture Layers (L1 - L6)
                    </span>
                    {[
                      { level: "L1", title: "Customer Interface", subtitle: "Booking, tracking, payments, service history" },
                      { level: "L2", title: "Service Orchestration", subtitle: "State machine engine, auto-allocation, dispatch" },
                      { level: "L3", title: "Franchise Operations", subtitle: "ERP dashboards, inventory, performance analytics" },
                      { level: "L4", title: "Supply Chain", subtitle: "QR-based tracking, procurement, chain-of-custody" },
                      { level: "L5", title: "Financial Engine", subtitle: "Payments, commissions, settlements, ledger" },
                      { level: "L6", title: "Intelligence Layer", subtitle: "AI analytics, forecasting, anomaly detection" },
                    ].map((layer, idx) => (
                      <motion.div
                        key={layer.level}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + idx * 0.04, duration: 0.3 }}
                        whileHover={{ scale: 1.01, x: 4 }}
                        className="bg-[#07100b] border border-[#00D084]/25 hover:border-[#00D084]/60 rounded-2xl p-5 relative flex items-center justify-between shadow-lg transition-all group"
                      >
                        <div className="space-y-1">
                          <h4 className="text-base font-bold text-white group-hover:text-[#00D084] transition-colors">{layer.title}</h4>
                          <p className="text-xs text-white/60 font-light">{layer.subtitle}</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-white/30 group-hover:text-[#00D084] transition-colors shrink-0 ml-4">
                          {layer.level}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* RIGHT COLUMN: 5 Technological Capabilities */}
                  <div className="space-y-6">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] block mb-2">
                      Core Technological Capabilities
                    </span>

                    {[
                      {
                        title: "State Machine Booking Engine",
                        desc: "Every booking follows a deterministic state machine. Invalid transitions are blocked. No booking can reach an inconsistent state. Cancellations require reason codes. Completions require validation.",
                        icon: GitBranch,
                      },
                      {
                        title: "QR Chain-of-Custody",
                        desc: "Every spare part is tracked from warehouse to installation via QR scan. Append-only movement logs. One physical unit = one record. No manual quantity editing without admin audit trail.",
                        icon: QrCode,
                      },
                      {
                        title: "Uber-Style Live Dispatch",
                        desc: "Real-time technician tracking, intelligent geo-allocation, route optimization, and customer-visible ETA. Franchise managers see full operational maps.",
                        icon: MapPin,
                      },
                      {
                        title: "Immutable Financial Ledger",
                        desc: "All payment confirmations via webhook only. Commission calculations are deterministic. Refunds create reverse ledger entries. No direct frontend payment manipulation possible.",
                        icon: Lock,
                      },
                      {
                        title: "Enterprise Security Architecture",
                        desc: "Row-level security, JWT authentication, role-based access, rate limiting, input validation. Every critical action requires role verification and generates an immutable audit log.",
                        icon: ShieldCheck,
                      },
                    ].map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
                          className="flex items-start gap-4 group"
                        >
                          <div className="w-10 h-10 rounded-2xl bg-[#00D084]/15 border border-[#00D084]/35 flex items-center justify-center text-[#00D084] shrink-0 mt-1 shadow-[0_0_12px_rgba(0,208,132,0.2)] group-hover:scale-105 transition-all">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-base font-bold text-white group-hover:text-[#00D084] transition-colors">{item.title}</h4>
                            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                </div>
              </div>

              {/* Drawer Footer Bar */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4 shrink-0">
                <span className="text-xs text-white/50 font-mono">Autobot OS Modular Infrastructure & Technological Capabilities</span>
                <button
                  onClick={() => setArchModalOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/40 text-[#00D084] hover:bg-[#00D084] hover:text-[#020403] text-xs font-bold transition-all cursor-pointer"
                >
                  Close Drawer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unified Footer */}
      <Footer />

      {/* Diagnostic Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
