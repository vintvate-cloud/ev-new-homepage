import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import {
  Video,
  Calendar,
  Clock,
  User,
  Sparkles,
  Play,
  CheckCircle2,
  Share2,
  X,
  Search,
  Users,
  Award,
  Zap,
  ArrowRight,
  ShieldCheck,
  Building,
  GraduationCap,
  MessageSquare,
  Radio,
  Flame,
  Star,
  Download,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Briefcase,
  MapPin,
  Newspaper,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/webinars")({
  component: WebinarsPage,
});

// Authentic Datasets for Webinar Tabs
const UPCOMING_WEBINARS = [
  {
    id: "up-1",
    title: "Multi-Brand EV Service Centre Opportunity in Pune | City Launch",
    description: "Discover high-demand PIN code areas in Pune, EV market potential, unit economics, and how to become a certified My EV Service franchise partner.",
    datetime: "March 1, 2026 • 4:30 PM IST",
    duration: "120 min",
    speaker: "Ashwini Tiwari (Founder, Autobot Engineers)",
    tags: ["pune-launch", "franchise-opportunity", "business-modelling"],
    category: "Franchises",
  },
  {
    id: "up-2",
    title: "EV Battery Pack Diagnostics & BMS Firmware Flashing",
    description: "Deep dive into cell voltage balancing, state-of-health diagnostics, active balancing tools, and high-voltage safety isolation.",
    datetime: "March 15, 2026 • 6:00 PM IST",
    duration: "90 min",
    speaker: "Ashwini Tiwari (Founder, Autobot Engineers)",
    tags: ["bms-diagnostics", "battery-tech", "high-voltage-safety"],
    category: "Technicians",
  },
  {
    id: "up-3",
    title: "EV Maintenance & Real-World Range Optimization for EV Owners",
    description: "Essential care practices for 2W & 3W EV owners to prolong lithium battery health, prevent thermal runaway, and maximize daily range.",
    datetime: "March 28, 2026 • 5:00 PM IST",
    duration: "60 min",
    speaker: "My EV Services Technical Team",
    tags: ["ev-owner-care", "battery-health", "range-optimization"],
    category: "EV Owners",
  },
];

const ARCHIVE_REPLAYS = [
  {
    id: "ar-1",
    title: "Thermal Runaway Prevention & Early Anomaly Detection in 2W/3W Fleets",
    description: "Field-tested SOPs for diagnosing thermal spikes, BMS safety cutoffs, and preventing cell degradation in high-usage commercial fleets.",
    date: "Feb 12, 2026",
    duration: "75 min",
    speaker: "Ashwini Tiwari (Founder, Autobot Engineers)",
    views: "1,420 views",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-working-in-a-factory-42867-large.mp4",
    tags: ["thermal-safety", "bms", "fleet-care"],
  },
  {
    id: "ar-2",
    title: "Upskilling Traditional Automotive Mechanics into Certified EV Specialists",
    description: "How to transition legacy workshop staff into certified high-voltage EV repair technicians with zero safety incidents.",
    date: "Jan 28, 2026",
    duration: "90 min",
    speaker: "My EV Services Academy Team",
    views: "2,150 views",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-in-a-high-tech-factory-42868-large.mp4",
    tags: ["upskilling", "certification", "technicians"],
  },
  {
    id: "ar-3",
    title: "Multi-Brand EV Workshop Setup & Pan-India Franchise Unit Economics",
    description: "Detailed roadmap covering shop space planning, diagnostic tool procurement, spare part supply chain, and local marketing.",
    date: "Dec 20, 2025",
    duration: "85 min",
    speaker: "Ashwini Tiwari (Founder, Autobot Engineers)",
    views: "1,950 views",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-in-a-high-tech-factory-42868-large.mp4",
    tags: ["franchise-setup", "unit-economics", "operations"],
  },
];

const RECOMMENDED_PATHS = [
  {
    id: "rec-1",
    targetAudience: "EV Owners",
    title: "EV Owner Essential Maintenance & Battery Health Path",
    description: "Learn how to prolong battery life, optimize real-world range, decode dashboard telemetry, and handle emergencies safely.",
    modulesCount: "4 Modules • 3.5 Hours Total",
    recommendedSessions: [
      "Thermal & Range Optimization Basics",
      "EV Fleet & Battery Lifetime Management",
      "Understanding Home vs Fast Charging Impact",
    ],
  },
  {
    id: "rec-2",
    targetAudience: "Technicians & Engineers",
    title: "Certified High-Voltage EV Diagnostic Specialist Track",
    description: "From basic multimeter safety to advanced BMS flashing, motor controller diagnostics, and battery module rebuilding.",
    modulesCount: "6 Modules • 8 Hours Total",
    recommendedSessions: [
      "High-Voltage Safety & SOP Isolation",
      "BMS Firmware Flashing & CAN Bus Logging",
      "Motor Controller Troubleshooting",
    ],
  },
  {
    id: "rec-3",
    targetAudience: "Franchises & Entrepreneurs",
    title: "Turnkey Workshop Operations & Business Scaling Track",
    description: "Complete blueprint for opening an EV service hub: licensing, equipment procurement, SOP deployment, and marketing.",
    modulesCount: "5 Modules • 6 Hours Total",
    recommendedSessions: [
      "Franchise Partner Onboarding",
      "Multi-Brand Spare Sourcing & Inventory",
      "Customer SLA Management & Marketing",
    ],
  },
];

function WebinarsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "archive" | "recommended">("upcoming");
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [requestTopicModalOpen, setRequestTopicModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedWebinarForReg, setSelectedWebinarForReg] = useState<any>(null);
  const [selectedReplay, setSelectedReplay] = useState<any>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  // Pin section until the last right card is scrolled through
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const timer = setTimeout(() => {
      if (!sectionRef.current || !cardsContainerRef.current) return;

      const cardsContainer = cardsContainerRef.current;
      const scrollAmount = cardsContainer.scrollHeight - cardsContainer.clientHeight;

      if (scrollAmount <= 10) return;

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top+=80",
        end: () => `+=${scrollAmount + 250}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: (self) => {
          if (cardsContainer) {
            cardsContainer.scrollTop = self.progress * scrollAmount;
          }
        },
      });

      return () => {
        trigger.kill();
      };
    }, 150);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === sectionRef.current) t.kill();
      });
    };
  }, [activeTab]);

  const heroTextRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const contentUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, []);

  const [siteTheme, setSiteTheme] = useState<"dark" | "light">(() => {
    if (
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("theme-light")
    ) {
      return "light";
    }
    return "dark";
  });

  useEffect(() => {
    if (typeof document === "undefined") return;

    const checkTheme = () => {
      const isLight = document.documentElement.classList.contains("theme-light");
      setSiteTheme(isLight ? "light" : "dark");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Registration Form State
  const [regForm, setRegForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    notes: "",
  });

  // Request Topic Form State
  const [topicForm, setTopicForm] = useState({
    name: "",
    email: "",
    requestedTopic: "",
  });

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.fullName || !regForm.email || !regForm.mobile) {
      toast.error("Please fill in your Full Name, Email, and Mobile number.");
      return;
    }
    const webinarTitle = selectedWebinarForReg?.title || "Franchise Partner Onboarding";
    toast.success(
      `Pass Confirmed for "${webinarTitle}"! Registration link sent to ${regForm.email}`
    );
    setRegModalOpen(false);
    setSelectedWebinarForReg(null);
    setRegForm({ fullName: "", email: "", mobile: "", city: "", notes: "" });
  };

  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicForm.name || !topicForm.email || !topicForm.requestedTopic) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Topic request submitted! Our team will notify you when scheduled.");
    setRequestTopicModalOpen(false);
    setTopicForm({ name: "", email: "", requestedTopic: "" });
  };

  const isLight = siteTheme === "light";

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 relative overflow-x-hidden ${
        isLight
          ? "bg-[#f4f8f5] text-[#1a2320] selection:bg-[#00D084] selection:text-black"
          : "bg-[#070908] text-white selection:bg-[#00D084] selection:text-black"
      }`}
    >
      {/* Shared Navigation Header */}
      <Nav />

      {/* Main Container */}
      <div className="relative min-h-screen">

        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0)
           ========================================================================= */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background Video Stream */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-85 pointer-events-none scale-105"
            poster="https://images.unsplash.com/photo-1558441719-2347b7341ed2?w=1600&auto=format&fit=crop&q=80"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-working-in-a-factory-42867-large.mp4"
              type="video/mp4"
            />
          </video>

          {/* Cinematic Vignette Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070908]/85 via-black/50 to-[#070908] pointer-events-none" />

          {/* Hero Content Container */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center items-center px-6 max-w-5xl mx-auto space-y-4 z-10 transition-all pointer-events-auto text-center overflow-y-auto py-6"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-3 leading-[1.10] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Webinars built for <span className="text-[#00D084]">EV owner</span>, technicians, and franchises.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#d0e0d6] font-normal max-w-2xl mx-auto mb-6 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Practical, field-tested sessions designed for EV owners, technicians, and franchise partners to master battery diagnostics and shop automation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#featured-section"
                className="px-7 py-3.5 rounded-full bg-[#00D084] text-[#020403] text-[11px] font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all hover:scale-105 cursor-pointer flex items-center gap-2 shadow-lg"
              >
                EXPLORE FEATURED <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setRequestTopicModalOpen(true)}
                className="px-7 py-3.5 rounded-full border border-white/30 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#00D084]" />
                REQUEST A TOPIC
              </button>
            </div>

            {/* Quick Metrics Bar below Hero CTAs */}
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-6 pt-6 border-t border-white/15 w-full">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-black text-white font-mono">230+</div>
                <div className="text-[10px] font-serif text-white/60 uppercase mt-0.5">Masterclasses Held</div>
              </div>
              <div className="text-center border-x border-white/15">
                <div className="text-xl sm:text-2xl font-black text-[#00D084] font-mono">95%</div>
                <div className="text-[10px] font-serif text-white/60 uppercase mt-0.5">SOP Quality</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-black text-white font-mono">400+</div>
                <div className="text-[10px] font-serif text-white/60 uppercase mt-0.5">Partner Hubs</div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. CONTENT OVERLAY LAYER (SLIDES UP DIRECTLY ON TOP OF THE FIXED HERO)
           ========================================================================= */}
        <div
          ref={contentOverlayRef}
          className="relative z-10 bg-[#070908] min-h-screen mt-[calc(100vh-80px)] pt-12 rounded-t-[40px] border-t border-white/10 shadow-2xl"
        >
          <div ref={contentUpRef}>

      {/* =========================================================================
          2. LARGE TYPOGRAPHIC STATEMENT SECTION
         ========================================================================= */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center relative z-10 border-t border-white/10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-white/70 mb-6">
          • About Our Sessions
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black leading-snug tracking-tight text-white/90 max-w-5xl mx-auto">
          We <span className="text-[#00D084] underline decoration-[#00D084]/50">design</span> and deploy EV masterclasses with practical field-tested SOPs at the core, ensuring every <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D084] to-emerald-300">system enhances</span> real-world diagnostic performance.
        </h2>
      </section>

      {/* =========================================================================
          3. BENTO BOX FEATURE GRID
         ========================================================================= */}
      <section id="featured-section" className="py-16 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Big Bento Card */}
          <div className="lg:col-span-7 bg-[#101015]/90 border border-white/10 rounded-[36px] p-8 sm:p-12 flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-xs font-mono text-[#00D084] font-bold uppercase tracking-widest block mb-2">
                • Available for Franchise Partners
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Based in <span className="text-[#00D084]">Pune, India</span> & Pan-India Hubs
              </h3>
              <button
                onClick={() => {
                  setSelectedWebinarForReg(UPCOMING_WEBINARS[0]);
                  setRegModalOpen(true);
                }}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider border border-white/15 mb-8 cursor-pointer"
              >
                Start a Franchise
              </button>
            </div>

            {/* Visual Media Container */}
            <div className="relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80"
                alt="Franchise Onboarding Workshop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/90">
                <span>Session: Franchise Partner Onboarding</span>
                <span className="text-[#00D084]">3/1/2026 • 4:30 PM</span>
              </div>
            </div>
          </div>

          {/* Right Column Bento Cards Stack */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            {/* Top Stat Card */}
            <div className="bg-[#101015]/90 border border-white/10 rounded-[36px] p-8 sm:p-10 backdrop-blur-2xl flex flex-col justify-between flex-1">
              <div>
                <p className="text-xs font-mono text-white/60 mb-2">
                  Trusted by 120+ clients across 4 industries — shipping EV knowledge to production in 8-10 weeks
                </p>
              </div>
              <div className="pt-6">
                <div className="text-5xl sm:text-6xl font-black font-mono text-white tracking-tight">
                  120+
                </div>
                <div className="flex items-center gap-1 text-[#00D084] mt-2">
                  {"★".repeat(5)}
                  <span className="text-xs font-mono text-white/50 ml-2">5.0 Rating</span>
                </div>
              </div>
            </div>

            {/* Bottom Testimonial / Speaker Card */}
            <div className="bg-[#101015]/90 border border-white/10 rounded-[36px] p-8 backdrop-blur-2xl flex items-center gap-6">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                alt="Ashwini Tiwari"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#00D084] shrink-0"
              />
              <div>
                <p className="text-xs text-white/80 italic font-normal leading-relaxed mb-3">
                  "Good EV training feels obvious—because the hard diagnostic work is hidden."
                </p>
                <div className="text-xs font-bold text-white">Ashwini Tiwari</div>
                <div className="text-[10px] font-mono opacity-50">Founder & EV Consultant • Autobot Engineers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. BRAND LOGO TICKER
         ========================================================================= */}
      <section className="py-12 px-6 max-w-7xl mx-auto relative z-10 border-t border-b border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-8 opacity-50">
          <span className="text-xs font-mono uppercase tracking-widest text-white/60">
            Trusted by 100+ top-tier brands
          </span>
          <div className="flex flex-wrap items-center gap-8 font-mono text-sm font-black tracking-widest text-white/80">
            <span>MY EV SERVICE</span>
            <span>✦</span>
            <span>AUTOBOT OS</span>
            <span>✦</span>
            <span>ATHER ENERGY</span>
            <span>✦</span>
            <span>OLA ELECTRIC</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. INTERACTIVE WEBINAR TABS & SESSIONS GRID
         ========================================================================= */}
      <section ref={sectionRef} className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Navigation Tabs (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-[#00D084] mb-4">
              • Services & Masterclasses
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
              End-to-End EV Services & Training
            </h2>
            <p className="text-sm text-white/60 leading-relaxed mb-8">
              We turn ambiguous EV battery & diagnostic ideas into field-ready SOPs combining strategy, engineering, and hands-on evaluation.
            </p>

            {/* Interactive Tabs List */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`w-full py-4 px-6 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider text-left transition-all cursor-pointer border flex items-center justify-between ${
                  activeTab === "upcoming"
                    ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-lg shadow-[#00D084]/20 scale-[1.02]"
                    : "bg-[#101015]/80 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Radio className={`w-4 h-4 ${activeTab === "upcoming" ? "animate-pulse" : "text-[#00D084]"}`} />
                  <span>Upcoming Live Sessions</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === "upcoming" ? "bg-black/20 text-black" : "bg-white/10 text-white/60"}`}>
                  {UPCOMING_WEBINARS.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("archive")}
                className={`w-full py-4 px-6 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider text-left transition-all cursor-pointer border flex items-center justify-between ${
                  activeTab === "archive"
                    ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-lg shadow-[#00D084]/20 scale-[1.02]"
                    : "bg-[#101015]/80 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Play className={`w-4 h-4 ${activeTab === "archive" ? "fill-black" : "fill-[#00D084] text-[#00D084]"}`} />
                  <span>Archive Replays</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === "archive" ? "bg-black/20 text-black" : "bg-white/10 text-white/60"}`}>
                  {ARCHIVE_REPLAYS.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("recommended")}
                className={`w-full py-4 px-6 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider text-left transition-all cursor-pointer border flex items-center justify-between ${
                  activeTab === "recommended"
                    ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-lg shadow-[#00D084]/20 scale-[1.02]"
                    : "bg-[#101015]/80 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className={`w-4 h-4 ${activeTab === "recommended" ? "text-black" : "text-[#00D084]"}`} />
                  <span>Recommended Path</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === "recommended" ? "bg-black/20 text-black" : "bg-white/10 text-white/60"}`}>
                  {RECOMMENDED_PATHS.length}
                </span>
              </button>
            </div>
          </div>

          {/* Right Interactive Cards Area (Pinned Scrollable Container) */}
          <div ref={cardsContainerRef} className="lg:col-span-7 max-h-[580px] overflow-y-auto pr-3 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#00D084]/60 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-white/5">
            {/* UPCOMING LIVE SESSIONS */}
            {activeTab === "upcoming" && (
              <div className="space-y-4 animate-fadeIn">
                {UPCOMING_WEBINARS.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-[#101015]/90 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-2xl relative overflow-hidden group hover:border-[#00D084]/40 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono opacity-50 mb-2">
                      <span>0{index + 1}</span>
                      <span className="text-[#00D084] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-ping" />
                        LIVE SESSION
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed mb-3">{item.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-white/60 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#00D084]" /> {item.datetime}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#00D084]" /> {item.duration}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-[11px] font-mono text-white/80">Speaker: {item.speaker}</span>
                      <button
                        onClick={() => {
                          setSelectedWebinarForReg(item);
                          setRegModalOpen(true);
                        }}
                        className="px-4 py-1.5 rounded-full bg-[#00D084] text-[#020403] text-[10px] font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer shadow-md shadow-[#00D084]/20"
                      >
                        REGISTER NOW
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ARCHIVE REPLAYS */}
            {activeTab === "archive" && (
              <div className="space-y-4 animate-fadeIn">
                {ARCHIVE_REPLAYS.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-[#101015]/90 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-2xl relative overflow-hidden group hover:border-[#00D084]/40 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono opacity-50 mb-2">
                      <span>0{index + 1}</span>
                      <span className="text-white/70 font-bold uppercase tracking-wider">
                        REPLAY • {item.views}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed mb-3">{item.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-white/60 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#00D084]" /> Recorded {item.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#00D084]" /> {item.duration}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-[11px] font-mono text-white/80">Speaker: {item.speaker}</span>
                      <button
                        onClick={() => setSelectedReplay(item)}
                        className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-wider hover:bg-white/20 hover:border-[#00D084] transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Play className="w-3 h-3 text-[#00D084] fill-[#00D084]" /> WATCH REPLAY
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* RECOMMENDED PATH */}
            {activeTab === "recommended" && (
              <div className="space-y-4 animate-fadeIn">
                {RECOMMENDED_PATHS.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-[#101015]/90 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-2xl relative overflow-hidden group hover:border-[#00D084]/40 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono opacity-50 mb-2">
                      <span>0{index + 1}</span>
                      <span className="text-[#00D084] font-bold uppercase tracking-wider">
                        CURATED PATH
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed mb-3">{item.description}</p>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-3 space-y-1.5">
                      <div className="text-[11px] font-mono font-bold text-[#00D084]">
                        {item.modulesCount}
                      </div>
                      {item.recommendedSessions.map((session, sIdx) => (
                        <div key={sIdx} className="text-[11px] text-white/80 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084] shrink-0" />
                          <span>{session}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-[11px] font-mono text-white/60">Tailored Curriculum</span>
                      <button
                        onClick={() => {
                          setActiveTab("upcoming");
                          toast.info(`Switched to Live Sessions for ${item.targetAudience}!`);
                        }}
                        className="px-4 py-1.5 rounded-full bg-[#00D084] text-[#020403] text-[10px] font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        EXPLORE PATH SESSIONS <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. DEDICATED EXPERT NETWORK & LATEST NEWS SECTION (MOVED DOWN)
         ========================================================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/10">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-[#00D084] mb-4">
            • Leadership & Industry Updates
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            Expert Network & Latest News
          </h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
            Connect with industry-leading EV consultants and stay updated on expansion milestones across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Expert Spotlight */}
          <div className="bg-[#101015]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl relative overflow-hidden group hover:border-[#00D084]/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono opacity-50 mb-4">
                <span>EXPERT SPOTLIGHT</span>
                <span className="text-[#00D084] font-bold">KEYNOTE SPEAKER</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Ashwini Tiwari"
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#00D084] shrink-0"
                />
                <div>
                  <h4 className="text-xl font-bold text-white">Ashwini Tiwari</h4>
                  <p className="text-xs text-[#00D084] font-mono">Founder & EV Consultant • Autobot Engineers</p>
                </div>
              </div>

              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Specialist in EV powertrain diagnostics, battery architecture, and setting up high-efficiency repair workflows for pan-India service hubs.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">EV Technology</span>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">Battery Technology</span>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">EV Business Modelling</span>
              </div>
            </div>

            <button
              onClick={() => setProfileModalOpen(true)}
              className="w-full py-3 rounded-full bg-white/10 text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-white/20 border border-white/15 cursor-pointer transition-all"
            >
              VIEW PROFILE
            </button>
          </div>

          {/* Card 2: Latest News Item */}
          <div className="bg-[#101015]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl relative overflow-hidden group hover:border-white/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono opacity-50 mb-4">
                <span>LATEST NEWS RELEASE</span>
                <span className="text-white/80 font-bold">ANNOUNCEMENT</span>
              </div>

              <h4 className="text-xl font-black text-white mb-3 leading-snug">
                Multi-Brand EV Service Centre Opportunity in Pune | City Launch by MY EV SERVICE
              </h4>

              <p className="text-xs text-white/60 leading-relaxed mb-6">
                Discover the Pune city launch of MY EV SERVICE’s multi-brand EV service centre opportunity. Explore high-demand PIN code areas, EV market potential, and how to become a certified hub.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">#pune-launch</span>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">#franchise-hub</span>
              </div>
            </div>

            <a
              href="/news"
              className="w-full py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-mono font-bold uppercase tracking-wider text-center hover:bg-[#00e08f] cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              READ FULL NEWS RELEASE <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

          </div>
        </div>
      </div>

      {/* Shared Footer */}
      <Footer />

      {/* =========================================================================
          7. INTERACTIVE MODALS
         ========================================================================= */}

      {/* Registration Modal */}
      {regModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="border border-white/20 rounded-[32px] max-w-lg w-full p-6 md:p-8 relative bg-[#0a0a0f] text-white">
            <button
              onClick={() => {
                setRegModalOpen(false);
                setSelectedWebinarForReg(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold uppercase text-[#00D084]">
                Webinar Pass Registration
              </span>
              <h3 className="text-2xl font-black mt-1">
                {selectedWebinarForReg ? selectedWebinarForReg.title : "Franchise Partner Onboarding"}
              </h3>
              <p className="text-xs font-mono opacity-70 mt-1">
                {selectedWebinarForReg
                  ? `${selectedWebinarForReg.datetime} • Speaker: ${selectedWebinarForReg.speaker}`
                  : "3/1/2026, 4:30:00 PM • Speaker: Arun Patel"}
              </p>
            </div>

            <form onSubmit={handleRegSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={regForm.fullName}
                  onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    className="w-full border border-white/15 rounded-xl px-3 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                    Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={regForm.mobile}
                    onChange={(e) => setRegForm({ ...regForm, mobile: e.target.value })}
                    className="w-full border border-white/15 rounded-xl px-3 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pune, Bangalore, Delhi"
                  value={regForm.city}
                  onChange={(e) => setRegForm({ ...regForm, city: e.target.value })}
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer mt-2"
              >
                CONFIRM FREE REGISTRATION
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Archive Video Replay Modal */}
      {selectedReplay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="border border-white/20 rounded-[32px] max-w-2xl w-full p-6 md:p-8 relative bg-[#0a0a0f] text-white">
            <button
              onClick={() => setSelectedReplay(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-mono font-bold uppercase text-[#00D084]">
                Archive Webinar Replay
              </span>
              <h3 className="text-2xl font-black mt-1">{selectedReplay.title}</h3>
              <p className="text-xs font-mono opacity-70 mt-1">
                Recorded {selectedReplay.date} • {selectedReplay.duration} • Speaker: {selectedReplay.speaker}
              </p>
            </div>

            {/* Video Player Container */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/15 mb-4">
              <video controls autoPlay className="w-full h-full object-cover">
                <source src={selectedReplay.videoUrl} type="video/mp4" />
              </video>
            </div>

            <p className="text-xs text-white/70 leading-relaxed mb-6">
              {selectedReplay.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-[#00D084]">{selectedReplay.views}</span>
              <button
                onClick={() => setSelectedReplay(null)}
                className="px-6 py-2 rounded-full bg-white/10 text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-white/20 cursor-pointer"
              >
                CLOSE REPLAY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Topic Modal */}
      {requestTopicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="border border-white/20 rounded-[32px] max-w-lg w-full p-6 md:p-8 relative bg-[#0a0a0f] text-white">
            <button
              onClick={() => setRequestTopicModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono font-bold uppercase text-[#00D084]">
              Community Request
            </span>
            <h3 className="text-2xl font-black mt-1 mb-2">Request a Webinar Topic</h3>
            <p className="text-xs opacity-70 mb-6">
              Tell us what EV diagnostic, battery tech, or business topic you want our experts to cover next.
            </p>

            <form onSubmit={handleTopicSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={topicForm.name}
                  onChange={(e) => setTopicForm({ ...topicForm, name: e.target.value })}
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={topicForm.email}
                  onChange={(e) => setTopicForm({ ...topicForm, email: e.target.value })}
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                  Requested Topic / Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. BMS firmware flashing, 3W motor rewinding..."
                  value={topicForm.requestedTopic}
                  onChange={(e) => setTopicForm({ ...topicForm, requestedTopic: e.target.value })}
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer"
              >
                SUBMIT TOPIC REQUEST
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Expert Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="border border-white/20 rounded-[32px] max-w-md w-full p-6 md:p-8 relative bg-[#0a0a0f] text-white">
            <button
              onClick={() => setProfileModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                alt="Ashwini Tiwari"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#00D084] mx-auto mb-4"
              />
              <h3 className="text-2xl font-black">Ashwini Tiwari</h3>
              <p className="text-xs text-[#00D084] font-mono font-bold mt-0.5">
                Founder & EV Consultant
              </p>
              <p className="text-xs font-mono opacity-60 mt-0.5">
                Autobot Engineers India Pvt Ltd.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <span className="text-[10px] font-mono uppercase opacity-60 block">
                Expertise Domains:
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">
                  EV Technology
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">
                  Battery Technology
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">
                  EV Business Modelling
                </span>
              </div>
            </div>

            <button
              onClick={() => setProfileModalOpen(false)}
              className="w-full py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest cursor-pointer"
            >
              CLOSE PROFILE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
