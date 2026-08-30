import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

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

type WebinarsSearchParams = {
  webinarId?: string;
  replayId?: string;
  pathId?: string;
};

export const Route = createFileRoute("/webinars")({
  validateSearch: (search: Record<string, unknown>): WebinarsSearchParams => {
    return {
      webinarId: search.webinarId as string | undefined,
      replayId: search.replayId as string | undefined,
      pathId: search.pathId as string | undefined,
    };
  },
  component: WebinarsPage,
});

// Authentic Datasets for Webinar Tabs
const UPCOMING_WEBINARS = [
  {
    id: "up-1",
    title: "Multi-Brand EV Service Centre Opportunity in Pune | City Launch",
    description: "",
    datetime: "March 1, 2026 • 4:30 PM IST",
    duration: "120 min",
    speaker: "Ashwini Tiwari (Founder, Autobot Engineers)",
    tags: ["pune-launch", "franchise-opportunity", "business-modelling"],
    category: "Franchises",
    bgImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=60"
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
    bgImage: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&auto=format&fit=crop&q=60"
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
    bgImage: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "up-4",
    title: "EV Charging Infrastructure Selection & Grid Connection ROI",
    description: "Expert tips on choosing chargers, grid compliance, layout safety rules, and project economics for commercial parking nodes.",
    datetime: "April 10, 2026 • 4:00 PM IST",
    duration: "90 min",
    speaker: "Ashwini Tiwari (Founder, Autobot Engineers)",
    tags: ["ev-charging", "grid-compliance", "roi-modelling"],
    category: "Franchises",
    bgImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "up-5",
    title: "Advanced BMS Thermal Runaway Prevention & Safety Protocols",
    description: "Deep dive into battery management system calibration, sensor troubleshooting, and preventing safety incidents in fleet vehicles.",
    datetime: "April 24, 2026 • 6:30 PM IST",
    duration: "100 min",
    speaker: "My EV Services Engineering Team",
    tags: ["bms-calibration", "thermal-safety", "preventative-care"],
    category: "Technicians",
    bgImage: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&auto=format&fit=crop&q=60"
  }
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
    bgImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=60"
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
    bgImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=60"
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
    bgImage: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "ar-4",
    title: "Masterclass: EV Motor Controller Repair & Diagnostics",
    description: "Detailed recording of repairing MOSFETs, capacitors, and phase sensors in multi-brand motor controllers.",
    date: "Feb 10, 2026",
    duration: "120 min",
    speaker: "Ashwini Tiwari (Founder, Autobot Engineers)",
    views: "1,850 views",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-working-in-a-factory-42867-large.mp4",
    tags: ["motor-repair", "diagnostics", "mosfets"],
    bgImage: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "ar-5",
    title: "Webinar: Fleet Electrification SLA & Telematics Setup",
    description: "How to use OBD-II telematics data to monitor fleet batteries, track driver safety, and maintain 99% uptime.",
    date: "Jan 15, 2026",
    duration: "90 min",
    speaker: "My EV Services Academy Team",
    views: "1,220 views",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-in-a-high-tech-factory-42868-large.mp4",
    tags: ["telematics", "fleet-sla", "monitoring"],
    bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60"
  }
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
    bgImage: "https://images.unsplash.com/photo-1517524006129-1a341fd1ebe3?w=800&auto=format&fit=crop&q=60"
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
    bgImage: "https://images.unsplash.com/photo-1580894732444-8fecef2271fe?w=800&auto=format&fit=crop&q=60"
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
    bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "rec-4",
    targetAudience: "EV Fleet Managers",
    title: "Certified EV Fleet Manager & SLA Master Track",
    description: "Complete learning track for logistics managers: EV routing algorithms, telematics setup, driver training, and fast-charging grid capacity planning.",
    modulesCount: "6 Modules • 10 Hours Total",
    recommendedSessions: [
      "Fleet Electrification Unit Economics",
      "BMS Anomaly & Driver Behaviour Tracking",
      "DC Fast Charger Placement & Scheduling",
    ],
    bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60"
  }
];

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardItemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 220,
    },
  },
};

function WebinarsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const [activeTab, setActiveTab] = useState<"upcoming" | "archive" | "recommended">("upcoming");
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [requestTopicModalOpen, setRequestTopicModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedWebinarForReg, setSelectedWebinarForReg] = useState<any>(null);
  const [selectedReplay, setSelectedReplay] = useState<any>(null);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [selectedDrawerItem, setSelectedDrawerItem] = useState<any>(null);
  const [viewAllModalOpen, setViewAllModalOpen] = useState(false);

  const handleCloseDrawer = () => {
    setSideDrawerOpen(false);
    navigate({
      search: (old) => ({ ...old, webinarId: undefined, replayId: undefined, pathId: undefined }),
      replace: true,
      resetScroll: false,
    });
    setTimeout(() => {
      setSelectedDrawerItem(null);
    }, 500);
  };

  useEffect(() => {
    if (search.webinarId) {
      const found = UPCOMING_WEBINARS.find((item) => item.id === search.webinarId);
      if (found) {
        setActiveTab("upcoming");
        setSelectedDrawerItem(found);
        setSideDrawerOpen(true);
      }
    } else if (search.replayId) {
      const found = ARCHIVE_REPLAYS.find((item) => item.id === search.replayId);
      if (found) {
        setActiveTab("archive");
        setSelectedDrawerItem(found);
        setSideDrawerOpen(true);
      }
    } else if (search.pathId) {
      const found = RECOMMENDED_PATHS.find((item) => item.id === search.pathId);
      if (found) {
        setActiveTab("recommended");
        setSelectedDrawerItem(found);
        setSideDrawerOpen(true);
      }
    }
  }, [search.webinarId, search.replayId, search.pathId]);

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
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentUpRef.current,
              start: "top 95%",
              end: "top 60%",
              scrub: 0.4,
            },
          }
        );
      }

      // Statement Section Anim
      gsap.fromTo(".statement-anim",
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".statement-anim",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Bento Cards Anims
      gsap.fromTo(".bento-left",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bento-left",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(".bento-right-1",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bento-right-1",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(".bento-right-2",
        { y: 50, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bento-right-2",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Services Header Anim
      gsap.fromTo(".services-header-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-header-anim",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Expert Spotlight Header Anim
      gsap.fromTo(".expert-header-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".expert-header-anim",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Expert Cards Anims
      gsap.fromTo(".expert-card-left",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".expert-card-left",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(".expert-card-right",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".expert-card-right",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
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
          {/* Background Hero Image */}
          <img
            src="/webinar-hero.png"
            alt="Webinar Hero"
            className="w-full h-full object-cover opacity-100 pointer-events-none scale-105"
          />

          {/* Hero Content Container */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center items-center px-6 max-w-5xl mx-auto space-y-4 z-10 transition-all pointer-events-auto text-center overflow-y-auto py-6"
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 leading-[1.10]"
              style={{ fontWeight: 900, WebkitTextStroke: "0.6px white", textShadow: "0 3px 12px rgba(0, 0, 0, 0.85)" }}
            >
              Webinars built for <span className="text-[#00D084]" style={{ WebkitTextStroke: "0.6px #00D084", textShadow: "0 3px 12px rgba(0, 0, 0, 0.85)" }}>EV owner</span>, technicians, and franchises.
            </h1>

            <p
              className="text-base sm:text-lg md:text-xl text-white font-black max-w-3xl mx-auto mb-6 leading-relaxed"
              style={{ fontWeight: 900, WebkitTextStroke: "0.4px white", textShadow: "0 2px 8px rgba(0, 0, 0, 0.85)" }}
            >
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
                className="px-7 py-3.5 rounded-full border border-white/40 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#00D084]" />
                REQUEST A TOPIC
              </button>
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
      <section className="py-24 px-6 max-w-6xl mx-auto text-center relative z-10 border-t border-white/10 statement-anim">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white/70 mb-6">
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
          <motion.div
            whileHover={{
              scale: 1.01,
              borderColor: "rgba(0, 208, 132, 0.3)",
              boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="lg:col-span-7 bg-[#101015]/90 border border-white/10 rounded-[36px] p-8 sm:p-12 flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden group bento-left will-change-transform"
          >
            <div className="relative z-10">
              <span className="text-xs text-[#00D084] font-bold uppercase tracking-widest block mb-2">
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
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/15 mb-8 cursor-pointer"
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
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white/90">
                <span>Session: Franchise Partner Onboarding</span>
                <span className="text-[#00D084]">3/1/2026 • 4:30 PM</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column Bento Cards Stack */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            {/* Top Stat Card */}
            <motion.div
              whileHover={{
                scale: 1.01,
                borderColor: "rgba(0, 208, 132, 0.3)",
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-[#101015]/90 border border-white/10 rounded-[36px] p-8 sm:p-10 backdrop-blur-2xl flex flex-col justify-between flex-1 bento-right-1 will-change-transform"
            >
              <div>
                <p className="text-xs text-white/60 mb-2">
                  Trusted by 120+ clients across 4 industries — shipping EV knowledge to production in 8-10 weeks
                </p>
              </div>
              <div className="pt-6">
                <div className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                  120+
                </div>
                <div className="flex items-center gap-1 text-[#00D084] mt-2">
                  {"★".repeat(5)}
                  <span className="text-xs text-white/50 ml-2">5.0 Rating</span>
                </div>
              </div>
            </motion.div>

            {/* Bottom Testimonial / Speaker Card */}
            <motion.div
              whileHover={{
                scale: 1.01,
                borderColor: "rgba(0, 208, 132, 0.3)",
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-[#101015]/90 border border-white/10 rounded-[36px] p-8 backdrop-blur-2xl flex items-center gap-6 bento-right-2 will-change-transform"
            >
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
                <div className="text-[10px] opacity-50">Founder & EV Consultant • Autobot Engineers</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          5. INTERACTIVE WEBINAR TABS & SESSIONS GRID
         ========================================================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        {/* Top Header Block */}
        <div className="mb-12 text-center max-w-3xl mx-auto services-header-anim">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00D084] mb-4">
            • Services & Masterclasses
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
            End-to-End EV Services & Training
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-8">
            We turn ambiguous EV battery & diagnostic ideas into field-ready SOPs combining strategy, engineering, and hands-on evaluation.
          </p>

          {/* Interactive Tabs List (Horizontal) */}
          <div className="flex flex-nowrap md:justify-center overflow-x-auto no-scrollbar pb-3 gap-3 -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`py-3 px-5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-2 whitespace-nowrap flex-nowrap shrink-0 ${
                activeTab === "upcoming"
                  ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-lg shadow-[#00D084]/20 scale-[1.02]"
                  : "bg-[#101015]/80 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <Radio className={`w-3.5 h-3.5 shrink-0 ${activeTab === "upcoming" ? "animate-pulse" : "text-[#00D084]"}`} />
              <span>Upcoming Live Sessions ({UPCOMING_WEBINARS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("archive")}
              className={`py-3 px-5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-2 whitespace-nowrap flex-nowrap shrink-0 ${
                activeTab === "archive"
                  ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-lg shadow-[#00D084]/20 scale-[1.02]"
                  : "bg-[#101015]/80 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <Play className={`w-3.5 h-3.5 shrink-0 ${activeTab === "archive" ? "fill-black" : "fill-[#00D084] text-[#00D084]"}`} />
              <span>Archive Replays ({ARCHIVE_REPLAYS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("recommended")}
              className={`py-3 px-5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-2 whitespace-nowrap flex-nowrap shrink-0 ${
                activeTab === "recommended"
                  ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-lg shadow-[#00D084]/20 scale-[1.02]"
                  : "bg-[#101015]/80 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 shrink-0 ${activeTab === "recommended" ? "text-black" : "text-[#00D084]"}`} />
              <span>Recommended Path ({RECOMMENDED_PATHS.length})</span>
            </button>
          </div>
        </div>

        {/* Bottom Cards Area (Horizontal display) */}
        <div className="mt-12">
          {/* UPCOMING LIVE SESSIONS */}
          {activeTab === "upcoming" && (
            <motion.div
              variants={cardContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {UPCOMING_WEBINARS.slice(0, 3).map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={cardItemVariants}
                  onClick={() => {
                    setSelectedDrawerItem(item);
                    setSideDrawerOpen(true);
                    navigate({
                      search: (old) => ({ ...old, webinarId: item.id, replayId: undefined, pathId: undefined }),
                      replace: true,
                      resetScroll: false,
                    });
                  }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgba(0, 208, 132, 0.4)",
                    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 50px -10px rgba(0, 208, 132, 0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-[450px] w-full rounded-[32px] relative overflow-hidden flex flex-col justify-end p-6 group border border-white/10 shadow-lg cursor-pointer will-change-transform"
                >
                  {/* Background Image & Gradient Overlay */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.bgImage}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                  </div>

                  {/* Content Container */}
                  <div className="relative z-10 flex flex-col text-left">
                    <span className="text-[10px] font-bold tracking-widest text-[#00D084] uppercase mb-1.5 block">
                      {item.category || "LIVE SESSION"}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2 leading-tight group-hover:text-[#00D084] transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/80 font-medium mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#00D084]" /> {item.datetime.split("•")[0].trim()}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#00D084]" /> {item.duration}
                      </span>
                    </div>

                    <div className="text-xs text-white/60 truncate" title={item.speaker}>
                      Speaker: {item.speaker}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "upcoming" && UPCOMING_WEBINARS.length > 3 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setViewAllModalOpen(true)}
                className="px-8 py-4 rounded-full border border-[#00D084]/30 hover:border-[#00D084] text-[#00D084] text-xs font-black uppercase tracking-widest hover:bg-[#00D084]/5 cursor-pointer transition-all flex items-center gap-2"
              >
                VIEW ALL LIVE SESSIONS ({UPCOMING_WEBINARS.length}) <ChevronRight className="w-4 h-4 animate-pulse" />
              </button>
            </div>
          )}

          {/* ARCHIVE REPLAYS */}
          {activeTab === "archive" && (
            <motion.div
              variants={cardContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {ARCHIVE_REPLAYS.slice(0, 3).map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={cardItemVariants}
                  onClick={() => {
                    setSelectedDrawerItem(item);
                    setSideDrawerOpen(true);
                    navigate({
                      search: (old) => ({ ...old, replayId: item.id, webinarId: undefined, pathId: undefined }),
                      replace: true,
                      resetScroll: false,
                    });
                  }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgba(0, 208, 132, 0.4)",
                    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 50px -10px rgba(0, 208, 132, 0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-[450px] w-full rounded-[32px] relative overflow-hidden flex flex-col justify-end p-6 group border border-white/10 shadow-lg cursor-pointer will-change-transform"
                >
                  {/* Background Image & Gradient Overlay */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.bgImage}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                  </div>

                  {/* Content Container */}
                  <div className="relative z-10 flex flex-col text-left">
                    <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase mb-1.5 block">
                      REPLAY • {item.views}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2 leading-tight group-hover:text-[#00D084] transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/80 font-medium mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#00D084]" /> Recorded {item.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#00D084]" /> {item.duration}
                      </span>
                    </div>

                    <div className="text-xs text-white/60 truncate" title={item.speaker}>
                      Speaker: {item.speaker}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "archive" && ARCHIVE_REPLAYS.length > 3 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setViewAllModalOpen(true)}
                className="px-8 py-4 rounded-full border border-[#00D084]/30 hover:border-[#00D084] text-[#00D084] text-xs font-black uppercase tracking-widest hover:bg-[#00D084]/5 cursor-pointer transition-all flex items-center gap-2"
              >
                VIEW ALL REPLAYS ({ARCHIVE_REPLAYS.length}) <ChevronRight className="w-4 h-4 animate-pulse" />
              </button>
            </div>
          )}

          {/* RECOMMENDED PATH */}
          {activeTab === "recommended" && (
            <motion.div
              variants={cardContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {RECOMMENDED_PATHS.slice(0, 3).map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={cardItemVariants}
                  onClick={() => {
                    setSelectedDrawerItem(item);
                    setSideDrawerOpen(true);
                    navigate({
                      search: (old) => ({ ...old, pathId: item.id, webinarId: undefined, replayId: undefined }),
                      replace: true,
                      resetScroll: false,
                    });
                  }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgba(0, 208, 132, 0.4)",
                    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 50px -10px rgba(0, 208, 132, 0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-[450px] w-full rounded-[32px] relative overflow-hidden flex flex-col justify-end p-6 group border border-white/10 shadow-lg cursor-pointer will-change-transform"
                >
                  {/* Background Image & Gradient Overlay */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.bgImage}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                  </div>

                  {/* Content Container */}
                  <div className="relative z-10 flex flex-col text-left">
                    <span className="text-[10px] font-bold tracking-widest text-[#00D084] uppercase mb-1.5 block">
                      CURATED PATH
                    </span>

                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2 leading-tight group-hover:text-[#00D084] transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="text-[11px] text-white/80 font-bold mb-3">
                      {item.modulesCount}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 backdrop-blur-md">
                      {item.recommendedSessions.slice(0, 2).map((session, sIdx) => (
                        <div key={sIdx} className="text-[11px] text-white/90 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084] shrink-0 mt-0.5" />
                          <span className="leading-snug truncate" title={session}>{session}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "recommended" && RECOMMENDED_PATHS.length > 3 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setViewAllModalOpen(true)}
                className="px-8 py-4 rounded-full border border-[#00D084]/30 hover:border-[#00D084] text-[#00D084] text-xs font-black uppercase tracking-widest hover:bg-[#00D084]/5 cursor-pointer transition-all flex items-center gap-2"
              >
                VIEW ALL CURATED PATHS ({RECOMMENDED_PATHS.length}) <ChevronRight className="w-4 h-4 animate-pulse" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          6. DEDICATED EXPERT NETWORK & LATEST NEWS SECTION (MOVED DOWN)
         ========================================================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/10">
        <div className="mb-12 text-center max-w-3xl mx-auto expert-header-anim">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00D084] mb-4">
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
          <motion.div
            whileHover={{
              scale: 1.01,
              borderColor: "rgba(0, 208, 132, 0.3)",
              boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-[#101015]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl relative overflow-hidden group flex flex-col justify-between expert-card-left will-change-transform"
          >
            <div>
              <div className="flex items-center justify-between text-xs opacity-50 mb-4">
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
                  <p className="text-xs text-[#00D084]">Founder & EV Consultant • Autobot Engineers</p>
                </div>
              </div>

              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Specialist in EV powertrain diagnostics, battery architecture, and setting up high-efficiency repair workflows for pan-India service hubs.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[10px] px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">EV Technology</span>
                <span className="text-[10px] px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">Battery Technology</span>
                <span className="text-[10px] px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">EV Business Modelling</span>
              </div>
            </div>

            <button
              onClick={() => setProfileModalOpen(true)}
              className="w-full py-3 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/20 border border-white/15 cursor-pointer transition-all"
            >
              VIEW PROFILE
            </button>
          </motion.div>

          {/* Card 2: Latest News Item */}
          <motion.div
            whileHover={{
              scale: 1.01,
              borderColor: "rgba(0, 208, 132, 0.3)",
              boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-[#101015]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl relative overflow-hidden group flex flex-col justify-between expert-card-right will-change-transform"
          >
            <div>
              <div className="flex items-center justify-between text-xs opacity-50 mb-4">
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
                <span className="text-[10px] px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">#pune-launch</span>
                <span className="text-[10px] px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">#franchise-hub</span>
              </div>
            </div>

            <a
              href="/news"
              className="w-full py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-bold uppercase tracking-wider text-center hover:bg-[#00e08f] cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              READ FULL NEWS RELEASE <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
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
              <span className="text-[10px] font-bold uppercase text-[#00D084]">
                Webinar Pass Registration
              </span>
              <h3 className="text-2xl font-black mt-1">
                {selectedWebinarForReg ? selectedWebinarForReg.title : "Franchise Partner Onboarding"}
              </h3>
              <p className="text-xs opacity-70 mt-1">
                {selectedWebinarForReg
                  ? `${selectedWebinarForReg.datetime} • Speaker: ${selectedWebinarForReg.speaker}`
                  : "3/1/2026, 4:30:00 PM • Speaker: Arun Patel"}
              </p>
            </div>

            <form onSubmit={handleRegSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase opacity-70 block mb-1">
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
                  <label className="text-[11px] uppercase opacity-70 block mb-1">
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
                  <label className="text-[11px] uppercase opacity-70 block mb-1">
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
                <label className="text-[11px] uppercase opacity-70 block mb-1">
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
              <span className="text-[10px] font-bold uppercase text-[#00D084]">
                Archive Webinar Replay
              </span>
              <h3 className="text-2xl font-black mt-1">{selectedReplay.title}</h3>
              <p className="text-xs opacity-70 mt-1">
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
              <span className="text-xs text-[#00D084]">{selectedReplay.views}</span>
              <button
                onClick={() => setSelectedReplay(null)}
                className="px-6 py-2 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/20 cursor-pointer"
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

            <span className="text-[10px] font-bold uppercase text-[#00D084]">
              Community Request
            </span>
            <h3 className="text-2xl font-black mt-1 mb-2">Request a Webinar Topic</h3>
            <p className="text-xs opacity-70 mb-6">
              Tell us what EV diagnostic, battery tech, or business topic you want our experts to cover next.
            </p>

            <form onSubmit={handleTopicSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase opacity-70 block mb-1">
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
                <label className="text-[11px] uppercase opacity-70 block mb-1">
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
                <label className="text-[11px] uppercase opacity-70 block mb-1">
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
              <p className="text-xs text-[#00D084] font-bold mt-0.5">
                Founder & EV Consultant
              </p>
              <p className="text-xs opacity-60 mt-0.5">
                Autobot Engineers India Pvt Ltd.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <span className="text-[10px] uppercase opacity-60 block">
                Expertise Domains:
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">
                  EV Technology
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">
                  Battery Technology
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">
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

      {/* Side Drawer for Details */}
      <AnimatePresence>
        {sideDrawerOpen && selectedDrawerItem && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              onClick={handleCloseDrawer}
            />

            <div className="fixed inset-y-0 right-0 p-4 sm:p-6 max-w-full flex z-10">
              <motion.div
                initial={{ x: "110%", opacity: 0, scale: 0.95 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: "110%", opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-screen sm:w-[620px] max-w-full bg-[#0a0a0f]/95 border border-white/10 text-white flex flex-col justify-between shadow-2xl relative rounded-[32px] overflow-hidden backdrop-blur-xl"
              >
                
                {/* Close Button */}
                <button
                  onClick={handleCloseDrawer}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Main Scrollable Content */}
                <div className="flex-1 h-0 overflow-y-auto p-8 pt-20">
                  <span className="text-[10px] font-bold tracking-widest text-[#00D084] uppercase block mb-3">
                    {selectedDrawerItem.category || (selectedDrawerItem.views ? "REPLAY" : "CURATED PATH")}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight mb-6">
                    {selectedDrawerItem.title}
                  </h3>

                  {/* Details Section */}
                  <div className="space-y-6">
                    {selectedDrawerItem.description && (
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">Description</h4>
                        <p className="text-xs text-white/80 leading-relaxed">
                          {selectedDrawerItem.description}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1">Date / Time</h4>
                        <p className="text-xs font-semibold text-white/90">
                          {selectedDrawerItem.datetime || selectedDrawerItem.date}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1">Duration</h4>
                        <p className="text-xs font-semibold text-white/90">
                          {selectedDrawerItem.duration}
                        </p>
                      </div>
                    </div>

                    {selectedDrawerItem.speaker && (
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5">Expert Speaker</h4>
                        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                          <div className="w-9 h-9 rounded-full bg-[#00D084]/20 flex items-center justify-center text-[#00D084] font-black text-xs shrink-0">
                            {selectedDrawerItem.speaker.split(" ")[0][0]}
                          </div>
                          <span className="text-xs text-white/90 font-medium">
                            {selectedDrawerItem.speaker}
                          </span>
                        </div>
                      </div>
                    )}

                    {selectedDrawerItem.tags && selectedDrawerItem.tags.length > 0 && (
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">Topics & Tags</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedDrawerItem.tags.map((t: string) => (
                            <span
                              key={t}
                              className="text-[9px] px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedDrawerItem.recommendedSessions && (
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">Recommended Curriculum</h4>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                          <div className="text-xs font-bold text-[#00D084] mb-1">
                            {selectedDrawerItem.modulesCount}
                          </div>
                          {selectedDrawerItem.recommendedSessions.map((session: string, sIdx: number) => (
                            <div key={sIdx} className="text-xs text-white/80 flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                              <span className="leading-snug">{session}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-8 border-t border-white/10 bg-[#07070a]/90 backdrop-blur-md">
                  {selectedDrawerItem.datetime ? (
                    <button
                      onClick={() => {
                        setSideDrawerOpen(false);
                        setSelectedWebinarForReg(selectedDrawerItem);
                        setRegModalOpen(true);
                        navigate({
                          search: (old) => ({ ...old, webinarId: undefined }),
                          replace: true,
                          resetScroll: false,
                        });
                      }}
                      className="w-full py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-md shadow-[#00D084]/20"
                    >
                      REGISTER FOR FREE PASS
                    </button>
                  ) : selectedDrawerItem.views ? (
                    <button
                      onClick={() => {
                        setSideDrawerOpen(false);
                        setSelectedReplay(selectedDrawerItem);
                        navigate({
                          search: (old) => ({ ...old, replayId: undefined }),
                          replace: true,
                          resetScroll: false,
                        });
                      }}
                      className="w-full py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-md shadow-[#00D084]/20 flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4 text-black fill-black shrink-0" /> WATCH REPLAY NOW
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSideDrawerOpen(false);
                        setActiveTab("upcoming");
                        toast.info(`Switched to Live Sessions for ${selectedDrawerItem.targetAudience}!`);
                        navigate({
                          search: (old) => ({ ...old, pathId: undefined }),
                          replace: true,
                          resetScroll: false,
                        });
                      }}
                      className="w-full py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-md shadow-[#00D084]/20 flex items-center justify-center gap-2"
                    >
                      EXPLORE LIVE SESSIONS <ArrowRight className="w-4 h-4 text-black shrink-0" />
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Sheet Modal for View All */}
      <AnimatePresence>
        {viewAllModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewAllModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            
            {/* Bottom Sheet Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="relative w-full max-w-7xl bg-[#0a0a0f] border-t border-white/10 rounded-t-[40px] shadow-2xl flex flex-col max-h-[85vh] z-10"
            >
              {/* Premium Drag-like Handle indicator */}
              <div className="flex justify-center py-4 shrink-0">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setViewAllModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="px-8 pb-6 border-b border-white/5 shrink-0 text-left">
                <span className="text-[10px] font-bold tracking-widest text-[#00D084] uppercase block mb-1">
                  {activeTab === "upcoming" ? "LIVE SESSIONS" : activeTab === "archive" ? "ARCHIVE REPLAYS" : "RECOMMENDED PATHS"}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  {activeTab === "upcoming"
                    ? `All Upcoming Live Sessions (${UPCOMING_WEBINARS.length})`
                    : activeTab === "archive"
                    ? `All Archive Replays (${ARCHIVE_REPLAYS.length})`
                    : `All Curated Recommended Paths (${RECOMMENDED_PATHS.length})`}
                </h3>
              </div>

              {/* Scrollable Grid of Cards */}
              <div className="flex-1 overflow-y-auto p-8 no-scrollbar pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Render based on active tab */}
                  {activeTab === "upcoming" &&
                    UPCOMING_WEBINARS.map((item) => (
                      <motion.div
                        key={item.id}
                        onClick={() => {
                          setSelectedDrawerItem(item);
                          setSideDrawerOpen(true);
                          setViewAllModalOpen(false);
                          navigate({
                            search: (old) => ({ ...old, webinarId: item.id, replayId: undefined, pathId: undefined }),
                            replace: true,
                            resetScroll: false,
                          });
                        }}
                        whileHover={{
                          scale: 1.02,
                          borderColor: "rgba(0, 208, 132, 0.4)",
                          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 50px -10px rgba(0, 208, 132, 0.15)",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="h-[400px] w-full rounded-[32px] relative overflow-hidden flex flex-col justify-end p-6 group border border-white/10 shadow-lg cursor-pointer will-change-transform text-left"
                      >
                        <div className="absolute inset-0 z-0">
                          <img
                            src={item.bgImage}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                        </div>
                        <div className="relative z-10 flex flex-col">
                          <span className="text-[10px] font-bold tracking-widest text-[#00D084] uppercase mb-1.5 block">
                            {item.category || "LIVE SESSION"}
                          </span>
                          <h3 className="text-lg font-black tracking-tight text-white mb-2 leading-snug group-hover:text-[#00D084] transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/80 font-medium mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-[#00D084]" /> {item.datetime.split("•")[0].trim()}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#00D084]" /> {item.duration}
                            </span>
                          </div>
                          <div className="text-xs text-white/60 truncate">
                            Speaker: {item.speaker}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                  {activeTab === "archive" &&
                    ARCHIVE_REPLAYS.map((item) => (
                      <motion.div
                        key={item.id}
                        onClick={() => {
                          setSelectedDrawerItem(item);
                          setSideDrawerOpen(true);
                          setViewAllModalOpen(false);
                          navigate({
                            search: (old) => ({ ...old, replayId: item.id, webinarId: undefined, pathId: undefined }),
                            replace: true,
                            resetScroll: false,
                          });
                        }}
                        whileHover={{
                          scale: 1.02,
                          borderColor: "rgba(0, 208, 132, 0.4)",
                          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 50px -10px rgba(0, 208, 132, 0.15)",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="h-[400px] w-full rounded-[32px] relative overflow-hidden flex flex-col justify-end p-6 group border border-white/10 shadow-lg cursor-pointer will-change-transform text-left"
                      >
                        <div className="absolute inset-0 z-0">
                          <img
                            src={item.bgImage}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                        </div>
                        <div className="relative z-10 flex flex-col">
                          <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase mb-1.5 block">
                            REPLAY • {item.views}
                          </span>
                          <h3 className="text-lg font-black tracking-tight text-white mb-2 leading-snug group-hover:text-[#00D084] transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/80 font-medium mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-[#00D084]" /> Recorded {item.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#00D084]" /> {item.duration}
                            </span>
                          </div>
                          <div className="text-xs text-white/60 truncate">
                            Speaker: {item.speaker}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                  {activeTab === "recommended" &&
                    RECOMMENDED_PATHS.map((item) => (
                      <motion.div
                        key={item.id}
                        onClick={() => {
                          setSelectedDrawerItem(item);
                          setSideDrawerOpen(true);
                          setViewAllModalOpen(false);
                          navigate({
                            search: (old) => ({ ...old, pathId: item.id, webinarId: undefined, replayId: undefined }),
                            replace: true,
                            resetScroll: false,
                          });
                        }}
                        whileHover={{
                          scale: 1.02,
                          borderColor: "rgba(0, 208, 132, 0.4)",
                          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 50px -10px rgba(0, 208, 132, 0.15)",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="h-[400px] w-full rounded-[32px] relative overflow-hidden flex flex-col justify-end p-6 group border border-white/10 shadow-lg cursor-pointer will-change-transform text-left"
                      >
                        <div className="absolute inset-0 z-0">
                          <img
                            src={item.bgImage}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                        </div>
                        <div className="relative z-10 flex flex-col">
                          <span className="text-[10px] font-bold tracking-widest text-[#00D084] uppercase mb-1.5 block">
                            CURATED PATH
                          </span>
                          <h3 className="text-lg font-black tracking-tight text-white mb-2 leading-snug group-hover:text-[#00D084] transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                          <div className="text-[11px] text-white/80 font-bold mb-3">
                            {item.modulesCount}
                          </div>
                          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 backdrop-blur-md">
                            {item.recommendedSessions.slice(0, 2).map((session, sIdx) => (
                              <div key={sIdx} className="text-[11px] text-white/90 flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084] shrink-0 mt-0.5" />
                                <span className="leading-snug truncate">{session}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
