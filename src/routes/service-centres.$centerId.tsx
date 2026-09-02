import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPTextReveal } from "../components/ui/gsap-text-reveal";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import RadialArcGalleryShowcase from "../components/RadialArcGalleryShowcase";
import AucklandStyleLocationShowcase from "../components/AucklandStyleLocationShowcase";
import {
  Star,
  MapPin,
  CheckCircle2,
  PhoneCall,
  Clock,
  ShieldCheck,
  Zap,
  Wrench,
  BatteryCharging,
  Cpu,
  Tv,
  Thermometer,
  Activity,
  ChevronDown,
  ChevronUp,
  Play,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
  UserCheck,
  Building2,
  Search,
  ChevronRight,
  Download,
  Share2,
  Check,
  X,
  Phone,
  Mail,
  Navigation,
  Percent,
} from "lucide-react";
import { toast } from "sonner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/service-centres/$centerId")({
  component: ServiceCentresPage,
});

// Reusable Framer Motion Entrance Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ServiceCentresPage() {
  const centerId = "pune";

  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const cardsUpRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP Text Scroll Reveals
  useGSAPTextReveal(containerRef);

  // Widget Selection State
  const [selectedCity, setSelectedCity] = useState("Pune");
  const [selectedVehicle, setSelectedVehicle] = useState<"2W" | "3W" | "4W">("2W");
  const [selectedBrand, setSelectedBrand] = useState("Ola Electric");
  const [selectedModel, setSelectedModel] = useState("Ola S1 Pro");

  // Interactive Booking Modal
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingServiceTitle, setBookingServiceTitle] = useState("General EV Service & Checkup");
  const [bookingServicePrice, setBookingServicePrice] = useState("₹599");

  // Video Tour Modal State
  const [videoTourOpen, setVideoTourOpen] = useState(false);

  // Gallery Tab State
  const [activeGalleryTab, setActiveGalleryTab] = useState<
    "workshop" | "team" | "equipment" | "vehicles" | "videos"
  >("workshop");

  // FAQ State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Promo Code Copied Feedback State
  const [copiedPromo, setCopiedPromo] = useState(false);

  const handleCopyPromo = () => {
    navigator.clipboard.writeText("MYEV20");
    setCopiedPromo(true);
    toast.success("Promo code MYEV20 copied to clipboard!");
    setTimeout(() => setCopiedPromo(false), 3000);
  };

  // Address Copy Feedback State
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      "EV PRO Service Centre, SR No. 82/1, Plot No. 5, Kharadi, Near EON IT Park Phase 1, Pune - 411014, Maharashtra"
    );
    setCopiedAddress(true);
    toast.success("Hub address copied to clipboard!");
    setTimeout(() => setCopiedAddress(false), 3000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GSAP ScrollTrigger Sliding Window Overlay & Hero Fade Effect (Matching Franchise Page)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // 1. Hero text & widget slow fade-out as content overlay rises up over fixed hero
      if (heroTextRef.current && contentOverlayRef.current) {
        gsap.to(heroTextRef.current, {
          opacity: 0,
          scale: 0.9,
          y: -60,
          ease: "power1.out",
          scrollTrigger: {
            trigger: contentOverlayRef.current,
            start: "top 95%",
            end: "top 25%",
            scrub: 0.6,
          },
        });
      }

      // 2. Rising content cards entrance scrubbed onto hero
      if (cardsUpRef.current) {
        gsap.fromTo(
          cardsUpRef.current,
          { y: 90, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsUpRef.current,
              start: "top 90%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleQuickBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      `Service slot request received for ${selectedBrand} ${selectedModel} in ${selectedCity}! Our advisor will call you within 15 minutes.`
    );
  };

  const handleServiceCardBook = (title: string, price: string) => {
    setBookingServiceTitle(title);
    setBookingServicePrice(price);
    setBookingModalOpen(true);
  };

  // Brands list with logos/names
  const BRANDS = [
    { name: "Ola Electric", tag: "Ola S1 Pro / Air / X", logo: "/brands/ola.jpeg" },
    { name: "Ather Energy", tag: "Ather 450X / Apex", logo: "/brands/ather.jpeg" },
    { name: "TVS iQube", tag: "iQube S / ST", logo: "/brands/tvs.webp" },
    { name: "Bajaj Chetak", tag: "Chetak Premium / Urban", logo: "/brands/bajaj.png" },
    { name: "Hero Electric", tag: "Optima / Nyx", logo: "/brands/hero-electric.jpeg" },
    { name: "Tata EV", tag: "Nexon EV / Tiago EV", logo: "/brands/tata.webp" },
    { name: "MG EV", tag: "ZS EV / Comet EV", logo: "/brands/mg.webp" },
    { name: "Mahindra EV", tag: "XUV400 / Treo", logo: "/brands/mahindra.jpeg" },
  ];

  // Services Catalog
  const SERVICES_LIST = [
    {
      id: "s1",
      category: "maintenance",
      title: "Genuine Service",
      subtitle: "Comprehensive checkup & maintenance",
      price: "₹599",
      duration: "60 mins",
      features: [
        "Full 36-Point EV System Diagnostics",
        "Brake Pad & Fluid Inspection",
        "Tire Pressure & Alignment Check",
        "Battery Terminals Cleaning",
      ],
      popular: true,
    },
    {
      id: "s2",
      category: "battery",
      title: "Battery Diagnostics",
      subtitle: "Battery health check & performance report",
      price: "₹499",
      duration: "45 mins",
      features: [
        "Cell Level Voltage Balancing",
        "State of Health (SoH) Analysis",
        "Thermal Runaway Risk Scan",
        "CAN-bus BMS Data Log Report",
      ],
    },
    {
      id: "s3",
      category: "motor",
      title: "Motor & Controller Repair",
      subtitle: "Expert repair for motor & controller issues",
      price: "₹1,499",
      duration: "120 mins",
      features: [
        "Stator Winding Resistance Test",
        "Hall Sensor Replacement",
        "Controller MOSFET Diagnostic",
        "Water Ingress & Bearing Servicing",
      ],
    },
    {
      id: "s4",
      category: "software",
      title: "Software Update",
      subtitle: "Latest software update & calibration",
      price: "₹299",
      duration: "30 mins",
      features: [
        "Official OEM Firmware Flash",
        "Throttle Response Re-calibration",
        "Display Dashboard Reset",
        "BMS Bug Patches & Optimization",
      ],
    },
    {
      id: "s5",
      category: "charging",
      title: "Charging System Check",
      subtitle: "Charging port, cable & charger diagnostics",
      price: "₹399",
      duration: "45 mins",
      features: [
        "Charge Port Pin Tension Test",
        "Home Fast Charger Load Test",
        "Over-voltage Cutoff Test",
        "Charging Harness Insulation Scan",
      ],
    },
    {
      id: "s6",
      category: "electrical",
      title: "AC / Electrical System",
      subtitle: "Complete electrical system inspection",
      price: "₹799",
      duration: "60 mins",
      features: [
        "12V Auxiliary Battery Health Test",
        "DC-DC Converter Output Diagnostic",
        "Wiring Harness Continuity Scan",
        "Lighting & Horn Relay Inspection",
      ],
    },
  ];

  // Diagnostic Tools List
  const DIAGNOSTIC_TOOLS = [
    {
      name: "Battery Analyzer",
      bulletName: "• Battery Analyzer",
      image: "/tools/battery-analyzer.png",
    },
    {
      name: "Motor Tester",
      bulletName: "Motor Tester",
      image: "/tools/motor-tester.png",
    },
    {
      name: "BMS Diagnostic Tool",
      bulletName: "BMS Diagnostic Tool",
      image: "/tools/bms-diagnostic.png",
    },
    {
      name: "Thermal Imaging",
      bulletName: "Thermal Imaging",
      image: "/tools/thermal-imaging.png",
    },
    {
      name: "EV Scanner",
      bulletName: "EV Scanner",
      image: "/tools/ev-scanner.png",
    },
    {
      name: "Fast Charger Tester",
      bulletName: "Fast Charger Tester",
      image: "/tools/fast-charger-tester.png",
    },
  ];

  // Customer Reviews
  const REVIEWS = [
    {
      name: "Rohit Sharma",
      role: "Ola S1 Pro Owner",
      city: "Kharadi, Pune",
      brandLogo: "Ola Electric",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: "They tailor their solutions to our specific EV battery diagnostic needs and safety goals.",
      time: "2 days ago",
    },
    {
      name: "Ananya Deshmukh",
      role: "Ather 450X Owner",
      city: "Viman Nagar, Pune",
      brandLogo: "Ather Energy",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: "They organized their workshop repair workflow and internal vehicle management outstandingly.",
      time: "1 week ago",
    },
    {
      name: "Vikram Malhotra",
      role: "TVS iQube S Owner",
      city: "Hadapsar, Pune",
      brandLogo: "TVS iQube",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      quote: "Working with Autobot master technicians for my annual electric scooter service was a great experience.",
      time: "2 weeks ago",
    },
  ];

  // Gallery Images Mockup Data
  const GALLERY_ITEMS = {
    workshop: [
      { src: "/ev-franchise-hero.jpg", label: "Multi-Bay Hydraulic Lift Setup" },
      { src: "/tech.jpg", label: "High-Voltage Battery Diagnostic Lab" },
      { src: "/interior.jpg", label: "Customer Waiting Lounge & Reception" },
      { src: "/factory.jpg", label: "Spare Parts & Battery Storage Bay" },
    ],
    team: [
      { src: "/tech.jpg", label: "Autobot Certified Master Technicians" },
      { src: "/interior.jpg", label: "Service Advisors & Desk Team" },
    ],
    equipment: [
      { src: "/tech.jpg", label: "CAN-bus Scanner & Battery Balancer" },
      { src: "/energy.jpg", label: "Thermal Imaging Heat Detection" },
    ],
    vehicles: [
      { src: "/ev-scooter-hero.png", label: "Ola S1 Pro Serviced & Polished" },
      { src: "/tech.jpg", label: "Ather 450X Battery Pack Servicing" },
    ],
    videos: [
      { src: "/ev-franchise-hero.jpg", label: "3-Min Complete Centre Video Tour" },
    ],
  };

  // FAQs
  const FAQS = [
    {
      q: "Will my vehicle warranty be affected after service?",
      a: "No! All our services follow OEM-prescribed protocols using genuine parts and certified diagnostics. Your factory vehicle warranty remains 100% safe and intact.",
    },
    {
      q: "Do you use genuine original spare parts?",
      a: "Yes, 100%. We source OEM spare parts directly from verified component suppliers, ensuring full compatibility, durability, and manufacturer warranty.",
    },
    {
      q: "How long does a general service take?",
      a: "A standard periodic service takes approximately 60 to 90 minutes. You can relax in our air-conditioned customer lounge with live CCTV video monitoring of your vehicle.",
    },
    {
      q: "Do you provide pick and drop service?",
      a: "Yes! We offer doorstep pickup and drop services across Pune within a 15km radius of Kharadi EON IT Park centre.",
    },
    {
      q: "Can I track my service status online?",
      a: "Yes. Through Autobot OS and WhatsApp notifications, you get real-time digital job card updates, inspection photos, and live repair progress.",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-serif overflow-x-hidden relative"
    >
      {/* Fixed Navigation */}
      <Nav />

      {/* =========================================================================
          1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0)
         ========================================================================= */}
      <div className="fixed top-0 left-0 right-0 h-screen w-full overflow-hidden bg-[#020403] z-0 flex items-center justify-center pt-20">
        {/* Background Hero Poster Image - Realistic, bright, zero heavy black flare */}
        <img
          src="/ev-service-centre-real-hero.png"
          alt="EV PRO Service Centre"
          className="w-full h-full object-cover object-center opacity-90 pointer-events-none"
        />
        {/* Subtle scrim overlay for crisp text readability without heavy black flares */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/55 pointer-events-none" />

        {/* Hero Content Container (Fades out & scales via GSAP on scroll) */}
        <div
          ref={heroTextRef}
          className="absolute inset-0 flex items-center justify-center px-6 md:px-12 max-w-7xl mx-auto w-full z-10 transition-all pointer-events-auto overflow-y-auto py-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full my-auto">
            {/* Left Column: Centre Overview & Ratings */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D084]/20 border border-[#00D084]/40 text-xs font-serif font-extrabold text-[#00D084] shadow-lg backdrop-blur-md">
                <Building2 className="w-4 h-4 text-[#00D084]" />
                <span>Franchise Service Centre</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-white leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                  EV PRO Service Centre
                </h1>
                <p className="text-lg sm:text-xl font-serif font-extrabold text-[#00D084]">
                  Centre ID: {centerId}
                </p>
                <p className="text-md sm:text-lg font-serif text-white/80">
                  Your Trusted EV Care Partner
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-serif text-white/90 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 w-fit shadow-xl">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm">4.7</span>
                  <span className="text-white/60">(128 Reviews)</span>
                </div>
                <span className="text-white/30">•</span>
                <div className="flex items-center gap-2 font-bold text-[#00D084]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00D084] animate-ping" />
                  <span>Open - Closes at 8:00 PM</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { title: "Certified Technicians", icon: UserCheck },
                  { title: "OEM Grade Equipment", icon: ShieldCheck },
                  { title: "Multi Brand Support", icon: Zap },
                  { title: "Warranty Safe Service", icon: CheckCircle2 },
                ].map((badge, idx) => {
                  const IconComp = badge.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#050907]/90 border border-white/10 text-xs font-serif font-bold text-white/90 shadow-md backdrop-blur-sm transition-all"
                    >
                      <IconComp className="w-4 h-4 text-[#00D084] shrink-0" />
                      <span className="leading-tight">{badge.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Find Your Service Centre Interactive Form (True Glassmorphism) */}
            <div className="lg:col-span-5 bg-[#050b14]/40 backdrop-blur-2xl rounded-[32px] p-6 sm:p-8 relative font-serif border border-white/20 hover:border-white/35 shadow-[0_16px_40px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300">
              <div className="mb-5 text-left relative z-10 border-b border-white/10 pb-4">
                <h3 className="text-xl sm:text-2xl font-serif font-black text-white tracking-tight flex items-center justify-between">
                  Find Your Service Centre
                  <Search className="w-5 h-5 text-[#00D084]" />
                </h3>
                <p className="text-xs text-white/70 font-serif font-medium mt-1">
                  Get personalized services & instant price estimate
                </p>
              </div>

              <form onSubmit={handleQuickBookingSubmit} className="space-y-4 text-left relative z-10">
                <div>
                  <label className="text-[11px] font-serif font-bold text-white/80 uppercase tracking-wider block mb-1">
                    Select City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-white/[0.07] hover:bg-white/[0.12] focus:bg-black/90 rounded-2xl px-4 py-3 text-xs text-white font-serif font-bold focus:outline-none focus:ring-2 focus:ring-[#00D084]/60 transition-all border border-white/20 hover:border-white/30 backdrop-blur-md cursor-pointer"
                  >
                    <option value="Pune" className="bg-[#040C1A] text-white">Pune (Kharadi EON IT Park Hub)</option>
                    <option value="Mumbai" className="bg-[#040C1A] text-white">Mumbai (Andheri West Hub)</option>
                    <option value="Bangalore" className="bg-[#040C1A] text-white">Bangalore (Koramangala Hub)</option>
                    <option value="Delhi NCR" className="bg-[#040C1A] text-white">Delhi NCR (Gurugram Hub)</option>
                    <option value="Hyderabad" className="bg-[#040C1A] text-white">Hyderabad (HITECH City Hub)</option>
                    <option value="Chennai" className="bg-[#040C1A] text-white">Chennai (Guindy Hub)</option>
                    <option value="Ahmedabad" className="bg-[#040C1A] text-white">Ahmedabad (SG Highway Hub)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-serif font-bold text-white/80 uppercase tracking-wider block mb-1">
                    Select Vehicle Type
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {(["2W", "3W", "4W"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedVehicle(type)}
                        className={`py-2.5 rounded-2xl text-xs font-serif font-bold transition-all border flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-md ${selectedVehicle === type
                            ? "bg-[#00D084] text-[#020403] border-[#00D084] font-black shadow-[0_0_15px_rgba(0,208,132,0.4)]"
                            : "bg-white/[0.06] hover:bg-white/[0.12] text-white/80 border-white/15 hover:border-white/30"
                          }`}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-serif font-bold text-white/80 uppercase tracking-wider block mb-1">
                      Select Brand
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full bg-white/[0.07] hover:bg-white/[0.12] focus:bg-black/90 rounded-2xl px-3 py-3 text-xs text-white font-serif font-bold focus:outline-none focus:ring-2 focus:ring-[#00D084]/60 transition-all border border-white/20 hover:border-white/30 backdrop-blur-md cursor-pointer"
                    >
                      <option value="Ola Electric" className="bg-[#040C1A] text-white">Ola Electric</option>
                      <option value="Ather Energy" className="bg-[#040C1A] text-white">Ather Energy</option>
                      <option value="TVS iQube" className="bg-[#040C1A] text-white">TVS iQube</option>
                      <option value="Bajaj Chetak" className="bg-[#040C1A] text-white">Bajaj Chetak</option>
                      <option value="Hero Electric" className="bg-[#040C1A] text-white">Hero Electric</option>
                      <option value="Vida EV" className="bg-[#040C1A] text-white">Vida EV</option>
                      <option value="Tata EV" className="bg-[#040C1A] text-white">Tata EV</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-serif font-bold text-white/80 uppercase tracking-wider block mb-1">
                      Select Model
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-white/[0.07] hover:bg-white/[0.12] focus:bg-black/90 rounded-2xl px-3 py-3 text-xs text-white font-serif font-bold focus:outline-none focus:ring-2 focus:ring-[#00D084]/60 transition-all border border-white/20 hover:border-white/30 backdrop-blur-md cursor-pointer"
                    >
                      <option value="Ola S1 Pro" className="bg-[#040C1A] text-white">Ola S1 Pro</option>
                      <option value="Ather 450X" className="bg-[#040C1A] text-white">Ather 450X</option>
                      <option value="TVS iQube S" className="bg-[#040C1A] text-white">TVS iQube S</option>
                      <option value="Chetak Premium" className="bg-[#040C1A] text-white">Chetak Premium</option>
                      <option value="Nexon EV" className="bg-[#040C1A] text-white">Nexon EV</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#00D084] hover:bg-[#00e08f] text-[#020403] text-xs sm:text-sm font-serif font-black uppercase tracking-wider hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-3 shadow-xl"
                >
                  Book Service Now <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 text-center">
                  <a
                    href="tel:18001234567"
                    className="text-xs font-serif font-bold text-white/80 hover:text-[#00D084] inline-flex items-center gap-1.5 transition-colors bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2 rounded-xl border border-white/10"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#00D084]" /> Call Centre 1800-123-4567
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. SLIDING WINDOW OVERLAY LAYER (SLIDES UP DIRECTLY OVER THE FIXED HERO)
         ========================================================================= */}
      <div
        ref={contentOverlayRef}
        className="relative z-10 bg-[#020403] min-h-screen mt-[100vh] pt-6 rounded-t-[44px] border-t-2 border-white/15 shadow-[0_-20px_60px_rgba(0,0,0,0.95)]"
      >
        {/* Top Handle Pill Bar */}
        <div className="w-16 h-1.5 bg-white/25 rounded-full mx-auto mb-6" />

        {/* CARDS RISING UP ANIMATEDLY (GSAP SCRUBBED FROM BOTTOM OVER HERO) */}
        <div ref={cardsUpRef}>
          {/* TRUST & FEATURE BANNER (4 PILLARS STRIP - EDITORIAL MINIMAL) */}
          <section className="bg-[#030604] border-y border-white/10 py-10 px-6 font-serif">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10"
            >
              {[
                { num: "01", title: "Genuine Parts", desc: "100% Original OEM Components", icon: ShieldCheck },
                { num: "02", title: "Quick & Reliable", desc: "60-Min Service Guarantee", icon: Clock },
                { num: "03", title: "Transparent Pricing", desc: "Zero Hidden Fees & Live Estimate", icon: CheckCircle2 },
                { num: "04", title: "Pick & Drop", desc: "Doorstep Pickup Across City", icon: Navigation },
              ].map((pillar, i) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    whileHover={{ y: -3 }}
                    className="flex flex-col text-left space-y-2.5 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#00D084] tracking-widest uppercase font-bold">
                        PILLAR {pillar.num}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#00D084] group-hover:bg-[#00D084]/15 group-hover:border-[#00D084]/40 transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-serif font-bold text-white group-hover:text-[#00D084] transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-white/50 font-serif leading-relaxed mt-0.5">
                        {pillar.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

          {/* ABOUT EV PRO SERVICE CENTRE & VIDEO TOUR SECTION (HIGH EDITORIAL SHOWCASE) */}
          <section className="py-28 px-6 max-w-7xl mx-auto font-serif">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="lg:col-span-6 space-y-7 text-left"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#00D084] block">
                    Excellence in EV Care
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white leading-[1.15] tracking-tight gsap-slide-up">
                    Architects of Next-Gen Electric Mobility Maintenance.
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-white/80 font-serif font-light leading-relaxed">
                  EV PRO Service Centre is Pune's premier destination for electric vehicle diagnostic, battery health management, and mechanical restoration. Engineered with OEM-grade diagnostic bays, certified master technicians, and authentic component supply lines, we deliver unparalleled reliability.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="bg-[#050907] border border-white/10 rounded-2xl p-4 text-left space-y-1 hover:border-[#00D084]/40 transition-all">
                    <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest font-bold">ESTABLISHED</div>
                    <div className="text-2xl font-serif font-extrabold text-white">2022</div>
                  </div>
                  <div className="bg-[#050907] border border-white/10 rounded-2xl p-4 text-left space-y-1 hover:border-[#00D084]/40 transition-all">
                    <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest font-bold">EXPERT TEAM</div>
                    <div className="text-2xl font-serif font-extrabold text-[#00D084]">12+ Techs</div>
                  </div>
                  <div className="bg-[#050907] border border-white/10 rounded-2xl p-4 text-left space-y-1 hover:border-[#00D084]/40 transition-all">
                    <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest font-bold">COMPLETED</div>
                    <div className="text-2xl font-serif font-extrabold text-white">10k+ EVs</div>
                  </div>
                  <div className="bg-[#050907] border border-white/10 rounded-2xl p-4 text-left space-y-1 hover:border-[#00D084]/40 transition-all">
                    <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest font-bold">SATISFACTION</div>
                    <div className="text-2xl font-serif font-extrabold text-[#00D084]">4.7 ★</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => toast.info("EV Pro Service Centre Pune Profile Brochure sent!")}
                    className="px-7 py-3.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/20 text-white text-xs font-serif font-bold transition-all cursor-pointer shadow-lg"
                  >
                    Download Profile Brochure
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById("centre-location-map");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-7 py-3.5 rounded-2xl bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer shadow-[0_0_20px_rgba(0,208,132,0.4)]"
                  >
                    Directions to Centre
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={scaleIn}
                className="lg:col-span-6 relative"
              >
                <div className="relative rounded-[32px] overflow-hidden border border-white/20 shadow-2xl group cursor-pointer bg-black">
                  <img
                    src="/ev-service-centre-real-hero.png"
                    alt="Watch Centre Video Tour"
                    className="w-full h-80 sm:h-[420px] object-cover object-center opacity-85 group-hover:scale-105 transition-all duration-700 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  <div
                    onClick={() => setVideoTourOpen(true)}
                    className="absolute inset-0 flex items-center justify-center flex-col gap-4"
                  >
                    <div className="relative">
                      <div className="absolute -inset-3 bg-[#00D084]/40 rounded-full blur-xl animate-pulse" />
                      <div className="w-20 h-20 rounded-full bg-[#00D084] text-[#020403] flex items-center justify-center shadow-[0_0_40px_rgba(0,208,132,0.9)] group-hover:scale-110 transition-transform duration-300 relative z-10">
                        <Play className="w-8 h-8 fill-[#020403] ml-1" />
                      </div>
                    </div>

                    <span className="px-5 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/25 text-xs font-serif font-extrabold text-white flex items-center gap-2 shadow-xl">
                      <Sparkles className="w-4 h-4 text-[#00D084]" /> Watch Centre Video Tour
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* OUR SERVICES CATALOG (EDITORIAL LUXURY CARDS) */}
          <section className="py-28 px-6 bg-[#030604] border-y border-white/10 font-serif">
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#00D084] block">
                    Transparent EV Care Catalog
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 tracking-tight gsap-slide-up">
                    Precision Service Catalog
                  </h2>
                </div>

                <button
                  onClick={() => toast.info("Displaying full 24-point EV service catalog!")}
                  className="text-xs font-mono font-bold text-[#00D084] hover:underline inline-flex items-center gap-2 uppercase tracking-wider"
                >
                  View Full 24-Point Inspection <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {SERVICES_LIST.map((service) => (
                  <motion.div
                    key={service.id}
                    variants={staggerItem}
                    whileHover={{ y: -8 }}
                    className={`bg-[#060a07] border rounded-[28px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-500 relative group shadow-2xl ${service.popular ? "border-[#00D084]/60 shadow-[0_0_30px_rgba(0,208,132,0.15)]" : "border-white/10 hover:border-white/30"
                      }`}
                  >
                    {service.popular && (
                      <span className="absolute top-6 right-6 bg-[#00D084] text-[#020403] text-[9px] font-mono font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_12px_rgba(0,208,132,0.4)]">
                        MOST POPULAR
                      </span>
                    )}

                    <div className="space-y-5">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-[#00D084] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-white/50 font-serif mt-1">
                          {service.subtitle}
                        </p>
                      </div>

                      <div className="flex items-baseline justify-between pt-3 border-t border-white/10">
                        <span className="text-3xl sm:text-4xl font-serif font-black text-[#00D084]">
                          {service.price}
                        </span>
                        <span className="text-xs font-mono text-white/60 flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                          <Clock className="w-3.5 h-3.5 text-[#00D084]" /> {service.duration}
                        </span>
                      </div>

                      <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs font-serif text-white/80">
                        {service.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleServiceCardBook(service.title, service.price)}
                      className="w-full mt-8 py-3.5 rounded-2xl bg-white/5 hover:bg-[#00D084] text-white hover:text-[#020403] border border-white/15 hover:border-[#00D084] text-xs font-serif font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg"
                    >
                      Book This Service
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="py-24 px-6 bg-[#020403] border-t border-white/10 font-serif">
            <div className="max-w-7xl mx-auto space-y-14">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 block">
                  OEM Diagnostic Suite
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
                  Advanced Tools & Infrastructure
                </h2>
                <p className="text-xs sm:text-sm text-white/60 font-serif font-light leading-relaxed pt-1">
                  We use industry-leading diagnostic hardware and hardware scanners engineered for OEM-level precision.
                </p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-end"
              >
                {DIAGNOSTIC_TOOLS.map((tool, idx) => (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    whileHover={{ y: -6 }}
                    className="flex flex-col items-center justify-between text-center transition-all duration-300 group cursor-pointer"
                  >
                    {/* Floating Tool Image (Contained & Distinct) */}
                    <div className="w-full h-44 sm:h-52 md:h-60 flex items-center justify-center p-3 relative overflow-hidden">
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Tool Label */}
                    <h4 className="text-xs sm:text-sm font-sans font-bold text-white/90 group-hover:text-[#00D084] transition-colors mt-4 tracking-tight">
                      {tool.bulletName}
                    </h4>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* TECH BACKED NETWORK, BRANDS & SPECIAL OFFER BANNER (ARCHITECTURAL DARK GLASS BENTO GRID) */}
          <section className="py-24 px-6 bg-[#020403] border-t border-white/10 font-serif">
            <div className="max-w-7xl mx-auto space-y-16">
              {/* Header Label */}
              <div className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#00D084] font-bold">
                  ECOSYSTEM & TRUST SUITE
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
                  Engineered for <span className="text-white/40 font-light">Peak Performance</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* CARD 1: AUTOBOT OS BACKED (CYBER TERMINAL TECH SUITE) */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  className="lg:col-span-4 bg-[#050a07] border border-white/12 hover:border-[#00D084]/50 rounded-[32px] p-7 sm:p-9 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group transition-all duration-500"
                >
                  {/* Subtle Grid Accent */}
                  <div className="absolute inset-0 bg-[radial-gradient(#00D084_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.04] pointer-events-none" />

                  <div className="space-y-6 relative z-10 text-left">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00D084]/10 border border-[#00D084]/30 text-[#00D084] text-[10px] font-mono tracking-widest uppercase font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-ping" /> AUTOBOT OS v4.2
                      </span>
                      <Cpu className="w-5 h-5 text-white/40 group-hover:text-[#00D084] transition-colors" />
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight leading-tight">
                        Technology Backed Service Network
                      </h3>
                      <p className="text-xs text-white/50 font-serif mt-2 leading-relaxed">
                        End-to-end cloud telematics & real-time diagnostic pipeline.
                      </p>
                    </div>

                    {/* Cyber Terminal Status Snippet */}
                    <div className="bg-black/80 border border-white/10 rounded-2xl p-3.5 space-y-1 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-white/40 text-[9px] uppercase tracking-wider">
                        <span>STATUS: ONLINE</span>
                        <span className="text-[#00D084]">99.9% UPTIME</span>
                      </div>
                      <div className="text-white/80 font-semibold truncate">
                        sys_dispatch // live_tracking_active
                      </div>
                    </div>

                    <div className="space-y-3 text-xs text-white/80 font-serif pt-1">
                      {[
                        "Centralized service tracking & CRM",
                        "Real-time technician allocation & dispatch",
                        "Digital service reports & inspection videos",
                        "Paperless & transparent billing process",
                        "Nationwide warranty & service support",
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 group/item">
                          <div className="w-2 h-2 rounded-full bg-[#00D084] shadow-[0_0_8px_#00D084] shrink-0 mt-1.5 group-hover/item:scale-125 transition-transform" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 relative z-10">
                    <div className="w-full py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-[#00D084]/40 text-[#00D084] text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all">
                      <Sparkles className="w-4 h-4" /> Powered by Autobot OS Cloud App
                    </div>
                  </div>
                </motion.div>

                {/* CARD 2: MULTI-BRAND EXPERTISE (FROSTED BRAND TILES GRID) */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  className="lg:col-span-4 bg-[#050a07] border border-white/12 hover:border-[#00D084]/50 rounded-[32px] p-7 sm:p-9 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group transition-all duration-500"
                >
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-[#00D084] uppercase font-bold">
                        OEM CERTIFIED COMPATIBILITY
                      </span>
                      <Zap className="w-5 h-5 text-white/40 group-hover:text-[#00D084] transition-colors" />
                    </div>

                    <div className="text-left">
                      <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
                        Brands We Service
                      </h3>
                      <p className="text-xs text-white/50 font-serif mt-1">
                        Factory-trained maintenance with original parts
                      </p>
                    </div>

                    {/* Premium Asymmetric Bento Brand Grid */}
                    <div className="grid grid-cols-12 gap-3 text-left">
                      {/* Featured Hero Brand 1 (Ola Electric) - Spans 7 cols */}
                      <div className="col-span-12 sm:col-span-7 bg-white/[0.04] hover:bg-[#00D084]/15 border border-white/12 hover:border-[#00D084]/60 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between transition-all duration-300 group/tile cursor-pointer backdrop-blur-md shadow-md">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center p-1.5 shrink-0 group-hover/tile:scale-105 transition-transform overflow-hidden">
                            <img src="/brands/ola.jpeg" alt="Ola Electric" className="w-full h-full object-contain filter brightness-95 group-hover/tile:brightness-100 rounded-lg" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-xs font-serif font-black text-white group-hover/tile:text-[#00D084] transition-colors truncate">Ola Electric</div>
                            <div className="text-[9.5px] text-[#00D084] font-mono font-medium truncate">S1 Pro / Air / X</div>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-[#00D084] bg-[#00D084]/15 px-2 py-0.5 rounded-full border border-[#00D084]/30 hidden sm:inline-block shrink-0">TOP</span>
                      </div>

                      {/* Featured Hero Brand 2 (Ather Energy) - Spans 5 cols */}
                      <div className="col-span-12 sm:col-span-5 bg-white/[0.04] hover:bg-[#00D084]/15 border border-white/12 hover:border-[#00D084]/60 rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 transition-all duration-300 group/tile cursor-pointer backdrop-blur-md shadow-md">
                        <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center p-1.5 shrink-0 group-hover/tile:scale-105 transition-transform overflow-hidden">
                          <img src="/brands/ather.jpeg" alt="Ather Energy" className="w-full h-full object-contain filter brightness-95 group-hover/tile:brightness-100 rounded-lg" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-serif font-black text-white group-hover/tile:text-[#00D084] transition-colors truncate">Ather</div>
                          <div className="text-[9.5px] text-[#00D084] font-mono font-medium truncate">450X / Apex</div>
                        </div>
                      </div>

                      {/* Secondary Brands Row 1 */}
                      {[
                        { name: "TVS iQube", tag: "iQube ST", logo: "/brands/tvs.webp" },
                        { name: "Tata EV", tag: "Nexon EV", logo: "/brands/tata.webp" },
                      ].map((b, idx) => (
                        <div
                          key={idx}
                          className="col-span-6 bg-white/[0.03] hover:bg-[#00D084]/10 border border-white/10 hover:border-[#00D084]/50 rounded-2xl p-3 flex items-center gap-3 transition-all duration-300 group/tile cursor-pointer backdrop-blur-md shadow-md"
                        >
                          <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center p-1 shrink-0 group-hover/tile:scale-105 transition-transform overflow-hidden">
                            <img src={b.logo} alt={b.name} className="w-full h-full object-contain filter brightness-95 group-hover/tile:brightness-100 rounded-lg" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-xs font-serif font-bold text-white group-hover/tile:text-[#00D084] transition-colors truncate">{b.name}</div>
                            <div className="text-[9px] text-[#00D084] font-mono font-medium truncate opacity-80">{b.tag}</div>
                          </div>
                        </div>
                      ))}

                      {/* Secondary Brands Row 2 */}
                      {[
                        { name: "Bajaj Chetak", tag: "Chetak Urban", logo: "/brands/bajaj.png" },
                        { name: "Hero Electric", tag: "Optima / Nyx", logo: "/brands/hero-electric.jpeg" },
                      ].map((b, idx) => (
                        <div
                          key={idx}
                          className="col-span-6 bg-white/[0.03] hover:bg-[#00D084]/10 border border-white/10 hover:border-[#00D084]/50 rounded-2xl p-3 flex items-center gap-3 transition-all duration-300 group/tile cursor-pointer backdrop-blur-md shadow-md"
                        >
                          <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center p-1 shrink-0 group-hover/tile:scale-105 transition-transform overflow-hidden">
                            <img src={b.logo} alt={b.name} className="w-full h-full object-contain filter brightness-95 group-hover/tile:brightness-100 rounded-lg" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-xs font-serif font-bold text-white group-hover/tile:text-[#00D084] transition-colors truncate">{b.name}</div>
                            <div className="text-[9px] text-[#00D084] font-mono font-medium truncate opacity-80">{b.tag}</div>
                          </div>
                        </div>
                      ))}

                      {/* Secondary Brands Row 3 */}
                      {[
                        { name: "MG EV", tag: "ZS EV / Comet", logo: "/brands/mg.webp" },
                        { name: "Mahindra EV", tag: "XUV400 / Treo", logo: "/brands/mahindra.jpeg" },
                      ].map((b, idx) => (
                        <div
                          key={idx}
                          className="col-span-6 bg-white/[0.03] hover:bg-[#00D084]/10 border border-white/10 hover:border-[#00D084]/50 rounded-2xl p-3 flex items-center gap-3 transition-all duration-300 group/tile cursor-pointer backdrop-blur-md shadow-md"
                        >
                          <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center p-1 shrink-0 group-hover/tile:scale-105 transition-transform overflow-hidden">
                            <img src={b.logo} alt={b.name} className="w-full h-full object-contain filter brightness-95 group-hover/tile:brightness-100 rounded-lg" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-xs font-serif font-bold text-white group-hover/tile:text-[#00D084] transition-colors truncate">{b.name}</div>
                            <div className="text-[9px] text-[#00D084] font-mono font-medium truncate opacity-80">{b.tag}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 relative z-10 text-center">
                    <span className="text-xs font-mono font-semibold text-white/50 tracking-wider inline-flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]" /> + 5 More Regional Electric 2W & 3W OEMs
                    </span>
                  </div>
                </motion.div>

                {/* CARD 3: LIMITED TIME OFFER (HIGH-IMPACT MARKETING POSTER TICKET PASS) */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={scaleIn}
                  className="lg:col-span-4 bg-[#030805] border-2 border-[#00D084]/60 rounded-[32px] p-7 sm:p-9 flex flex-col justify-between shadow-[0_0_50px_rgba(0,208,132,0.3)] relative overflow-hidden group transition-all duration-500 min-h-[460px]"
                >
                  {/* Poster Background Image Visual */}
                  <img
                    src="/gallery/hydraulic-lift.png"
                    alt="EV Service Offer Marketing Poster Visual"
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.38] contrast-125 group-hover:scale-108 transition-transform duration-700 pointer-events-none"
                  />

                  {/* Dark Gradient Poster Vignette Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-[#020503]/80 to-[#020503]/40 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#00D084]/15 via-transparent to-transparent pointer-events-none" />

                  {/* Digital Ticket Side Notches */}
                  <div className="w-6 h-6 rounded-full bg-[#020403] border-r border-[#00D084]/40 absolute -left-3 top-1/2 -translate-y-1/2 z-20" />
                  <div className="w-6 h-6 rounded-full bg-[#020403] border-l border-[#00D084]/40 absolute -right-3 top-1/2 -translate-y-1/2 z-20" />

                  {/* Header Badge Row */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="px-3.5 py-1 rounded-full bg-[#00D084] text-[#020403] text-[10px] font-mono font-extrabold uppercase tracking-widest shadow-[0_0_20px_rgba(0,208,132,0.6)]">
                      SPECIAL PROMO PASS
                    </span>

                    {/* Rotating Poster Discount Badge Stamp */}
                    <div className="w-14 h-14 rounded-full bg-[#00D084] text-[#020403] flex flex-col items-center justify-center font-serif shadow-[0_0_25px_rgba(0,208,132,0.8)] rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      <span className="text-[10px] font-mono font-black uppercase leading-none tracking-tighter">FLAT</span>
                      <span className="text-base font-black leading-none mt-0.5">20%</span>
                      <span className="text-[8px] font-mono font-bold uppercase leading-none">OFF</span>
                    </div>
                  </div>

                  {/* Poster Main Content */}
                  <div className="space-y-4 my-4 relative z-10 text-left">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#00D084] tracking-widest uppercase font-bold bg-[#00D084]/10 px-2.5 py-0.5 rounded-md border border-[#00D084]/30 backdrop-blur-md">
                        <Sparkles className="w-3 h-3" /> PUNE WORKSHOP PROMO
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-serif font-black text-white leading-tight tracking-tight">
                        General EV <span className="text-[#00D084] underline decoration-[#00D084]/50 underline-offset-4">Service Offer</span>
                      </h3>
                      <p className="text-xs text-white/70 font-serif leading-relaxed pt-1">
                        Full 36-point telemetric diagnosis, battery SoH report & thermal scan included.
                      </p>
                    </div>

                    {/* Interactive Promo Coupon Voucher Block */}
                    <div className="bg-black/80 backdrop-blur-md border-2 border-dashed border-[#00D084]/50 hover:border-[#00D084] rounded-2xl p-4 flex items-center justify-between transition-all group/coupon shadow-xl">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">
                          VOUCHER PROMO CODE
                        </span>
                        <span className="text-lg font-mono font-black text-[#00D084] tracking-widest block">
                          MYEV20
                        </span>
                      </div>

                      <button
                        onClick={handleCopyPromo}
                        className="px-3.5 py-2 rounded-xl bg-[#00D084]/20 hover:bg-[#00D084] text-[#00D084] hover:text-[#020403] border border-[#00D084]/40 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        {copiedPromo ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Copied!
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5" /> Copy Code
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2 relative z-10">
                    <button
                      onClick={() => handleServiceCardBook("General EV Service (20% OFF)", "₹479")}
                      className="w-full py-4 rounded-2xl bg-[#00D084] hover:bg-[#00e08f] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-[0_0_30px_rgba(0,208,132,0.5)] flex items-center justify-center gap-2"
                    >
                      Claim Offer & Book Service <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* WHAT OUR CUSTOMERS SAY - LUXURY EDITORIAL CAROUSEL */}
          <section className="py-28 px-6 max-w-7xl mx-auto font-serif">
            <div className="space-y-12">
              {/* Header Row matching screenshot */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
                <div className="space-y-2 text-left">
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#00D084] block">
                    OUR REVIEWS
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white tracking-tight">
                    What Our <span className="text-white/40 font-light">Customers</span> Say
                  </h2>
                </div>

                {/* Circular Arrow Navigation Buttons matching screenshot */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toast.info("Viewing previous reviews")}
                    className="w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-[#00D084] hover:border-[#00D084] hover:text-[#020403] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                    aria-label="Previous Review"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => toast.info("Viewing next reviews")}
                    className="w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-[#00D084] hover:border-[#00D084] hover:text-[#020403] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                    aria-label="Next Review"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 3 Tall Cards Grid matching screenshot */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
              >
                {REVIEWS.map((review, idx) => (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    whileHover={{ y: -8 }}
                    className="bg-[#060a07] border border-white/12 hover:border-white/25 rounded-[32px] p-7 sm:p-9 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] shadow-2xl transition-all duration-500 group text-left relative overflow-hidden"
                  >
                    {/* Top Row: Circular Avatar + Brand Pill Badge */}
                    <div className="flex items-center justify-between">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border border-white/20 shadow-md group-hover:scale-105 transition-transform"
                      />

                      <div className="px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-sans font-bold text-white/90 flex items-center gap-1.5 backdrop-blur-md">
                        <Zap className="w-3.5 h-3.5 text-[#00D084]" />
                        <span>{review.brandLogo}</span>
                      </div>
                    </div>
                    <div className="my-4">
                      <span className="text-4xl sm:text-5xl text-[#00D084] font-serif leading-none block select-none opacity-90">
                        “
                      </span>
                    </div>

                    {/* Review Quote text matching screenshot style */}
                    <p className="text-base sm:text-xl font-serif font-medium text-white group-hover:text-white/90 transition-colors leading-snug my-2">
                      {review.quote}
                    </p>

                    {/* Bottom Metadata Block with left vertical border matching screenshot */}
                    <div className="pt-4 border-t border-white/10 mt-6">
                      <div className="border-l-2 border-[#00D084] pl-3.5 space-y-0.5">
                        <h4 className="text-sm font-sans font-bold text-white group-hover:text-[#00D084] transition-colors">
                          {review.name}
                        </h4>
                        <p className="text-xs font-sans text-white/60">
                          {review.role}
                        </p>
                        <p className="text-[11px] font-sans text-white/40">
                          {review.city}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* MILESTONES STRIP */}
          <section className="bg-[#040805] border-y border-white/10 py-10 px-6 font-serif">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {[
                { num: "10,000+", label: "Happy Customers", desc: "Served across hubs" },
                { num: "25+", label: "EV Experts", desc: "Certified technicians" },
                { num: "15+", label: "Service Bays", desc: "Advanced workshop" },
                { num: "98%", label: "Service Rating", desc: "Satisfaction rate" },
                { num: "3 Months", label: "Warranty", desc: "On labor & parts" },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-serif font-black text-[#00D084]">
                    {item.num}
                  </div>
                  <div className="text-xs font-serif font-bold text-white">{item.label}</div>
                  <div className="text-[10px] font-serif text-white/50">{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* RADIAL ARC DOME GALLERY SHOWCASE */}
          <RadialArcGalleryShowcase />

          {/* AUCKLAND/AUTEX REFERENCE LOCATION & MAP SHOWCASE */}
          <AucklandStyleLocationShowcase />

          {/* FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
          <section className="py-24 px-6 bg-[#030604] border-t border-white/10 font-serif">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
                  Got Questions?
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 mb-4 tracking-tight gsap-slide-up">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {FAQS.map((faq, idx) => {
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

          {/* BRIGHT FULL-WIDTH CINEMATIC CALL TO ACTION BANNER */}
          <section className="py-24 px-6 bg-[#040705] font-serif border-t border-white/10 relative overflow-hidden min-h-[480px] flex items-center justify-center">
            {/* Bright Full-Width Background Photo */}
            <img
              src="/ev-master-workshop-hero.png"
              alt="EV Service Master Workshop Visual"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-85 contrast-105 pointer-events-none transition-transform duration-1000"
            />

            {/* Subtle Vignette Gradient for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50 pointer-events-none" />

            {/* Floating Banner Content (No Frosted Glass Box) */}
            <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              <span className="text-xs font-mono tracking-[0.3em] text-[#00D084] uppercase font-bold block">
                EV PRO FLAGSHIP SERVICE
              </span>

              <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight gsap-slide-up">
                Ready to Give Your EV the Best Care?
              </h2>

              <p className="text-sm sm:text-base text-white/90 font-serif font-light max-w-2xl mx-auto leading-relaxed">
                Book your service today and experience the difference with AI-powered diagnostics and genuine OEM parts.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => handleServiceCardBook("General EV Service", "₹599")}
                  className="px-8 py-4 rounded-full bg-[#00D084] hover:bg-[#00e08f] text-[#020403] text-xs font-serif font-black uppercase tracking-widest transition-all cursor-pointer shadow-2xl hover:scale-105"
                >
                  Book Service Now
                </button>
                <a
                  href="tel:18001234567"
                  className="px-8 py-4 rounded-full bg-black/40 hover:bg-black/60 border border-white/30 text-white text-xs font-serif font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md"
                >
                  <PhoneCall className="w-4 h-4 text-[#00D084]" /> Call 1800-123-4567
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* =========================================================================
          13. INTERACTIVE SERVICE BOOKING MODAL
         ========================================================================= */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#050907] border-2 border-[#00D084]/40 rounded-3xl p-6 sm:p-8 max-w-md w-full relative font-serif shadow-2xl space-y-6"
            >
              <button
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-white p-1 rounded-full bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-serif font-bold text-[#00D084] uppercase tracking-wider block">
                  CONFIRM SERVICE BOOKING
                </span>
                <h3 className="text-xl font-serif font-black text-white mt-1">
                  {bookingServiceTitle}
                </h3>
                <span className="text-2xl font-serif font-extrabold text-[#00D084] block mt-1">
                  {bookingServicePrice}
                </span>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success(
                    `Booking confirmed for ${bookingServiceTitle} at EV PRO Service Centre Pune!`
                  );
                  setBookingModalOpen(false);
                }}
                className="space-y-3.5 text-xs text-left"
              >
                <div>
                  <label className="text-white/80 font-bold block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amit Kumar"
                    className="w-full bg-[#020503] border border-white/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>

                <div>
                  <label className="text-white/80 font-bold block mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    className="w-full bg-[#020503] border border-white/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/80 font-bold block mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      className="w-full bg-[#020503] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D084]"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 font-bold block mb-1">Preferred Time *</label>
                    <select className="w-full bg-[#020503] border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D084]">
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg mt-2"
                >
                  Confirm Appointment
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Tour Modal */}
      <AnimatePresence>
        {videoTourOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#050907] border-2 border-white/20 rounded-3xl p-6 max-w-2xl w-full relative font-serif shadow-2xl space-y-4"
            >
              <button
                onClick={() => setVideoTourOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white p-1 rounded-full bg-white/5 cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-serif font-extrabold text-white">
                EV PRO Service Centre - Pune Kharadi Tour
              </h3>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/10">
                <img
                  src="/ev-franchise-hero.jpg"
                  alt="Centre Tour"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 space-y-2">
                  <div className="w-14 h-14 rounded-full bg-[#00D084] text-[#020403] flex items-center justify-center shadow-[0_0_25px_#00D084]">
                    <Play className="w-6 h-6 fill-[#020403] ml-1" />
                  </div>
                  <p className="text-xs font-serif font-bold text-white">
                    Simulated 3-Minute HD Centre Video Tour
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
