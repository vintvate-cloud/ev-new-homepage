import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAPTextReveal } from "../components/ui/gsap-text-reveal";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
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
  const { centerId } = Route.useParams();

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
    { name: "Ola Electric", tag: "Ola S1 Pro / Air / X" },
    { name: "Ather Energy", tag: "Ather 450X / Apex" },
    { name: "TVS iQube", tag: "iQube S / ST" },
    { name: "Bajaj Chetak", tag: "Chetak Premium / Urban" },
    { name: "Hero Electric", tag: "Optima / Nyx" },
    { name: "Vida EV", tag: "Vida V1 Pro" },
    { name: "Tata EV", tag: "Nexon EV / Tiago EV" },
    { name: "MG EV", tag: "ZS EV / Comet EV" },
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
      desc: "Cell-level voltage & internal resistance tester",
      icon: BatteryCharging,
      tag: "HIGH VOLTAGE",
    },
    {
      name: "Motor Tester",
      desc: "Stator winding & hall sensor diagnostic bench",
      icon: Wrench,
      tag: "PRECISION TEST",
    },
    {
      name: "BMS Diagnostic Tool",
      desc: "CAN-bus data logging & balancing suite",
      icon: Cpu,
      tag: "CAN-BUS AI",
    },
    {
      name: "Thermal Imaging",
      desc: "Infrared heat spot detection camera",
      icon: Thermometer,
      tag: "INFRARED SCAN",
    },
    {
      name: "EV Scanner",
      desc: "Multi-brand OBD-II scanner for electric 2W/3W",
      icon: Activity,
      tag: "MULTI-BRAND",
    },
    {
      name: "Fast Charger Tester",
      desc: "DC fast charging protocol diagnostic suite",
      icon: Zap,
      tag: "FAST CHARGE",
    },
  ];

  // Customer Reviews
  const REVIEWS = [
    {
      name: "Rohit S.",
      model: "Ola S1 Pro",
      rating: 5,
      comment: "Excellent service! Battery check was very detailed and transparent. Staff is professional and helpful.",
      time: "2 days ago",
      avatarBg: "from-blue-600 to-indigo-700",
    },
    {
      name: "Priya K.",
      model: "Ather 450X",
      rating: 5,
      comment: "Quick service and genuine parts. My scooter is running like new. Highly recommended!",
      time: "1 week ago",
      avatarBg: "from-emerald-500 to-teal-700",
    },
    {
      name: "Vikram M.",
      model: "TVS iQube",
      rating: 5,
      comment: "Very good experience. They explain every issue clearly with solutions. Will definitely visit again.",
      time: "2 weeks ago",
      avatarBg: "from-purple-600 to-pink-600",
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
      <div className="fixed top-0 left-0 right-0 h-screen w-full overflow-hidden bg-black z-0 flex items-center justify-center pt-20">
        {/* Background Hero Poster Image */}
        <img
          src="/ev-franchise-hero.jpg"
          alt="EV PRO Service Centre Pune"
          className="w-full h-full object-cover object-center opacity-45 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020403] via-black/50 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020403]/50 to-[#020403] pointer-events-none" />

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

            {/* Right Column: Find Your Service Centre Interactive Form */}
            <div className="lg:col-span-5 bg-[#030704]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 relative font-serif border border-white/20 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00D084]/20 rounded-full blur-[70px] pointer-events-none" />

              <div className="mb-5 text-left relative z-10 border-b border-white/10 pb-4">
                <h3 className="text-xl sm:text-2xl font-serif font-black text-white tracking-tight flex items-center justify-between">
                  Find Your Service Centre
                  <Search className="w-5 h-5 text-[#00D084]" />
                </h3>
                <p className="text-xs text-white/60 font-serif font-medium mt-1">
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
                    className="w-full bg-[#020503] hover:bg-black focus:bg-black rounded-xl px-4 py-2.5 text-xs text-white font-serif font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all border border-white/20 cursor-pointer"
                  >
                    <option value="Pune">Pune (Kharadi EON IT Park Hub)</option>
                    <option value="Mumbai">Mumbai (Andheri West Hub)</option>
                    <option value="Bangalore">Bangalore (Koramangala Hub)</option>
                    <option value="Delhi NCR">Delhi NCR (Gurugram Hub)</option>
                    <option value="Hyderabad">Hyderabad (HITECH City Hub)</option>
                    <option value="Chennai">Chennai (Guindy Hub)</option>
                    <option value="Ahmedabad">Ahmedabad (SG Highway Hub)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-serif font-bold text-white/80 uppercase tracking-wider block mb-1">
                    Select Vehicle Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["2W", "3W", "4W"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedVehicle(type)}
                        className={`py-2 rounded-xl text-xs font-serif font-bold transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${selectedVehicle === type
                            ? "bg-[#00D084] text-[#020403] border-[#00D084] font-black shadow-[0_0_12px_rgba(0,208,132,0.4)]"
                            : "bg-[#020503] text-white/70 border-white/10 hover:border-white/30 hover:text-white"
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
                      className="w-full bg-[#020503] hover:bg-black rounded-xl px-3 py-2.5 text-xs text-white font-serif font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all border border-white/20 cursor-pointer"
                    >
                      <option value="Ola Electric">Ola Electric</option>
                      <option value="Ather Energy">Ather Energy</option>
                      <option value="TVS iQube">TVS iQube</option>
                      <option value="Bajaj Chetak">Bajaj Chetak</option>
                      <option value="Hero Electric">Hero Electric</option>
                      <option value="Vida EV">Vida EV</option>
                      <option value="Tata EV">Tata EV</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-serif font-bold text-white/80 uppercase tracking-wider block mb-1">
                      Select Model
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-[#020503] hover:bg-black rounded-xl px-3 py-2.5 text-xs text-white font-serif font-bold focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all border border-white/20 cursor-pointer"
                    >
                      <option value="Ola S1 Pro">Ola S1 Pro</option>
                      <option value="Ather 450X">Ather 450X</option>
                      <option value="TVS iQube S">TVS iQube S</option>
                      <option value="Chetak Premium">Chetak Premium</option>
                      <option value="Nexon EV">Nexon EV</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-xl"
                >
                  Book Service Now <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 text-center">
                  <a
                    href="tel:18001234567"
                    className="text-xs font-serif font-bold text-white/70 hover:text-[#00D084] inline-flex items-center gap-1.5 transition-colors"
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
          {/* TRUST & FEATURE BANNER (4 PILLARS STRIP) */}
          <section className="bg-[#040805] border-y border-white/10 py-6 px-6 font-serif">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { title: "Genuine Parts", desc: "100% Original OEM Components", icon: ShieldCheck },
                { title: "Quick & Reliable", desc: "On-Time Service Guarantee", icon: Clock },
                { title: "Transparent Pricing", desc: "Zero Hidden Charges & Estimates", icon: CheckCircle2 },
                { title: "Pick & Drop", desc: "Doorstep Pickup Available", icon: Navigation },
              ].map((pillar, i) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-3 text-left transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-serif font-extrabold text-white">
                        {pillar.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-white/50 font-serif leading-tight">
                        {pillar.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

          {/* ABOUT EV PRO SERVICE CENTRE & VIDEO TOUR SECTION */}
          <section className="py-24 px-6 max-w-7xl mx-auto font-serif">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="lg:col-span-6 space-y-6 text-left"
              >
                <div>
                  <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
                    About Our Hub
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white mt-2 leading-tight gsap-slide-up">
                    About EV PRO Service Centre
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-white/80 font-serif font-light leading-relaxed">
                  EV Pro Service Centre is your one-stop destination for all electric vehicle service and repair needs. Equipped with advanced diagnostic tools, experienced technicians, and genuine OEM parts, we ensure your EV performs at its best.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="bg-[#050907] border border-white/10 rounded-2xl p-4 text-center space-y-1">
                    <div className="text-xs text-white/50 uppercase font-bold">ESTABLISHED</div>
                    <div className="text-xl font-black text-white">2022</div>
                  </div>
                  <div className="bg-[#050907] border border-white/10 rounded-2xl p-4 text-center space-y-1">
                    <div className="text-xs text-white/50 uppercase font-bold">TECHNICIANS</div>
                    <div className="text-xl font-black text-[#00D084]">12+ Experts</div>
                  </div>
                  <div className="bg-[#050907] border border-white/10 rounded-2xl p-4 text-center space-y-1">
                    <div className="text-xs text-white/50 uppercase font-bold">SERVICES DONE</div>
                    <div className="text-xl font-black text-white">10,000+</div>
                  </div>
                  <div className="bg-[#050907] border border-white/10 rounded-2xl p-4 text-center space-y-1">
                    <div className="text-xs text-white/50 uppercase font-bold">RATING</div>
                    <div className="text-xl font-black text-[#00D084]">4.7 / 5</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => toast.info("EV Pro Service Centre Pune Profile Brochure sent!")}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-serif font-bold transition-all cursor-pointer"
                  >
                    Know More About Us
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById("centre-location-map");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-3 rounded-xl bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer"
                  >
                    Visit Centre
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
                <div className="relative rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl group cursor-pointer bg-black">
                  <img
                    src="/ev-franchise-hero.jpg"
                    alt="Watch Centre Video Tour"
                    className="w-full h-80 sm:h-96 object-cover object-center opacity-80 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div
                    onClick={() => setVideoTourOpen(true)}
                    className="absolute inset-0 flex items-center justify-center flex-col gap-3"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#00D084] text-[#020403] flex items-center justify-center shadow-[0_0_30px_rgba(0,208,132,0.8)] group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-[#020403] ml-1" />
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-serif font-extrabold text-white flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#00D084]" /> Watch Centre Tour Video
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* OUR SERVICES GRID */}
          <section className="py-24 px-6 bg-[#030604] border-y border-white/10 font-serif">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
                    Transparent EV Care
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 tracking-tight gsap-slide-up">
                    Our Services
                  </h2>
                </div>

                <button
                  onClick={() => toast.info("Displaying full 24-point EV service catalog!")}
                  className="text-xs font-serif font-bold text-[#00D084] hover:underline inline-flex items-center gap-1.5"
                >
                  View All Services <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {SERVICES_LIST.map((service) => (
                  <motion.div
                    key={service.id}
                    variants={staggerItem}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className={`bg-[#050907] border rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative group ${service.popular ? "border-[#00D084] shadow-[0_0_25px_rgba(0,208,132,0.15)]" : "border-white/10 hover:border-white/30"
                      }`}
                  >
                    {service.popular && (
                      <span className="absolute top-4 right-4 bg-[#00D084] text-[#020403] text-[9px] font-serif font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                        MOST POPULAR
                      </span>
                    )}

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#00D084] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-white/50 font-serif mt-0.5">
                          {service.subtitle}
                        </p>
                      </div>

                      <div className="flex items-baseline justify-between pt-2 border-t border-white/10">
                        <span className="text-3xl font-serif font-extrabold text-[#00D084]">
                          {service.price}
                        </span>
                        <span className="text-xs font-serif text-white/60 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-white/40" /> {service.duration}
                        </span>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-serif text-white/80">
                        {service.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleServiceCardBook(service.title, service.price)}
                      className="w-full mt-6 py-3 rounded-2xl bg-white/5 hover:bg-[#00D084] text-white hover:text-[#020403] border border-white/15 hover:border-[#00D084] text-xs font-serif font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                    >
                      Book Now
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ADVANCED TOOLS. EXPERT CARE SHOWCASE */}
          <section className="py-24 px-6 max-w-7xl mx-auto font-serif">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
                OEM Grade Infrastructure
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 mb-4 tracking-tight gsap-slide-up">
                Advanced Tools. Expert Care.
              </h2>
              <p className="text-white/70 text-sm sm:text-base font-serif font-light">
                We use industry-leading tools and technology to deliver OEM-level service experience.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {DIAGNOSTIC_TOOLS.map((tool, idx) => {
                const IconComp = tool.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    whileHover={{ y: -5, scale: 1.04 }}
                    className="bg-[#050907] border border-white/10 hover:border-[#00D084] rounded-3xl p-5 text-center flex flex-col items-center justify-between space-y-3 transition-all duration-300 group shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-serif font-bold text-white group-hover:text-[#00D084] transition-colors leading-snug">
                        {tool.name}
                      </h4>
                      <p className="text-[10px] text-white/50 font-serif mt-1 leading-tight">
                        {tool.desc}
                      </p>
                    </div>

                    <span className="text-[9px] font-serif font-extrabold text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/20 px-2 py-0.5 rounded-full uppercase">
                      {tool.tag}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

          {/* TECH BACKED NETWORK, BRANDS & SPECIAL OFFER BANNER */}
          <section className="py-24 px-6 bg-[#030604] border-t border-white/10 font-serif">
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  className="lg:col-span-4 bg-[#050907] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#00D084]">
                      AUTOBOT OS BACKED
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-white mt-1">
                      Technology Backed Service Network
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs text-white/80 font-serif">
                    {[
                      "Centralized service tracking & CRM",
                      "Real-time technician allocation & dispatch",
                      "Digital service reports & inspection videos",
                      "Paperless & transparent billing process",
                      "Nationwide warranty & service support",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <span className="px-3 py-1.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[#00D084] text-[11px] font-serif font-bold flex items-center justify-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" /> Powered by Autobot OS Cloud App
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  className="lg:col-span-4 bg-[#050907] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xl text-center"
                >
                  <div>
                    <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#00D084]">
                      MULTI-BRAND EXPERTISE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-white mt-1">
                      Brands We Service
                    </h3>
                    <p className="text-xs text-white/50 font-serif mt-1">
                      We service all leading EV brands with original parts
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {BRANDS.map((brand, idx) => (
                      <div
                        key={idx}
                        className="bg-[#020503] border border-white/10 hover:border-[#00D084]/50 rounded-2xl p-3 text-center space-y-0.5 transition-all"
                      >
                        <div className="text-xs font-serif font-bold text-white">{brand.name}</div>
                        <div className="text-[9px] text-[#00D084] font-serif font-semibold">{brand.tag}</div>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-white/50 font-serif italic">
                    + 5 More Regional Electric 2W & 3W OEMs
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={scaleIn}
                  className="lg:col-span-4 bg-gradient-to-br from-[#05140b] via-[#020603] to-[#040c07] border-2 border-[#00D084]/60 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-[0_0_30px_rgba(0,208,132,0.2)] relative overflow-hidden"
                >
                  <div className="absolute top-3 right-3 w-14 h-14 rounded-full bg-[#00D084] text-[#020403] flex items-center justify-center font-extrabold text-lg shadow-lg rotate-12">
                    <Percent className="w-7 h-7 stroke-[3]" />
                  </div>

                  <div>
                    <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#00D084]">
                      LIMITED TIME OFFER!
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-black text-white mt-1 leading-snug">
                      Get Flat <span className="text-[#00D084]">20% OFF</span> On General Service
                    </h3>
                    <p className="text-xs text-white/60 font-serif mt-2">
                      Valid till 31 May 2025 across all Pune hubs
                    </p>
                  </div>

                  <div className="bg-[#020503] border border-[#00D084]/40 rounded-2xl p-4 space-y-1 text-xs">
                    <span className="text-[#00D084] font-bold block">PROMO CODE: MYEV20</span>
                    <span className="text-white/70 block">Show promo code at checkout or mention over phone</span>
                  </div>

                  <button
                    onClick={() => handleServiceCardBook("General EV Service (20% OFF)", "₹479")}
                    className="w-full py-3.5 rounded-2xl bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-xl"
                  >
                    Book Now & Save
                  </button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* WHAT OUR CUSTOMERS SAY */}
          <section className="py-24 px-6 max-w-7xl mx-auto font-serif">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="lg:col-span-4 bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-6 text-center shadow-xl"
              >
                <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
                  Customer Reviews
                </span>
                <h3 className="text-5xl font-serif font-black text-white">4.7</h3>

                <div className="flex items-center justify-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-white/60 font-serif">Based on 128 verified customer reviews in Pune</p>

                <div className="space-y-2 pt-4 border-t border-white/10 text-xs font-serif text-white/70">
                  {[
                    { star: "5 ★", pct: 78 },
                    { star: "4 ★", pct: 14 },
                    { star: "3 ★", pct: 5 },
                    { star: "2 ★", pct: 2 },
                    { star: "1 ★", pct: 1 },
                  ].map((bar, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-8 font-bold">{bar.star}</span>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00D084] rounded-full" style={{ width: `${bar.pct}%` }} />
                      </div>
                      <span className="w-8 text-right text-white/50">{bar.pct}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {REVIEWS.map((review, idx) => (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-[#050907] border border-white/10 hover:border-[#00D084]/50 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl transition-all font-serif"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-9 h-9 rounded-full bg-gradient-to-tr ${review.avatarBg} flex items-center justify-center text-white font-black text-xs shadow-md`}
                          >
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">{review.name}</h4>
                            <p className="text-[10px] text-[#00D084] font-semibold">{review.model}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>

                      <p className="text-xs text-white/80 font-light leading-relaxed">
                        "{review.comment}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 text-[10px] text-white/40 font-semibold">
                      {review.time} • Verified Customer
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

          {/* PHOTO GALLERY & LOCATION MAP SECTION */}
          <section className="py-24 px-6 max-w-7xl mx-auto font-serif">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
                    Workshop Inside Look
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif font-extrabold text-white mt-1 gsap-slide-up">
                    Photo Gallery
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {(["workshop", "team", "equipment", "vehicles"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveGalleryTab(tab)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold capitalize transition-all cursor-pointer border ${activeGalleryTab === tab
                          ? "bg-[#00D084] text-[#020403] border-[#00D084]"
                          : "bg-[#050907] text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeGalleryTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    {GALLERY_ITEMS[activeGalleryTab].map((item, idx) => (
                      <div
                        key={idx}
                        className="group relative rounded-2xl overflow-hidden border border-white/15 h-36 sm:h-44 bg-black shadow-lg cursor-pointer"
                      >
                        <img
                          src={item.src}
                          alt={item.label}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                        <span className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] font-serif font-bold text-white leading-tight">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div id="centre-location-map" className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
                    Centre Coordinates
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif font-extrabold text-white mt-1 gsap-slide-up">
                    Find Us Here
                  </h3>
                </div>

                <div className="bg-[#050907] border-2 border-[#00D084]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 text-xs font-serif">
                      <MapPin className="w-5 h-5 text-[#00D084] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-white text-sm">EV PRO Service Centre</h4>
                        <p className="text-white/70 mt-0.5 leading-relaxed">
                          SR No. 82/1, Plot No. 5, Kharadi, Near EON IT Park, Pune - 411014, Maharashtra, India
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif pt-3 border-t border-white/10">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="w-4 h-4 text-[#00D084] shrink-0" />
                        <span>Mon - Sun 9:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Phone className="w-4 h-4 text-[#00D084] shrink-0" />
                        <span>1800-123-4567</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-44 rounded-2xl overflow-hidden border border-white/15 bg-[#020503] flex items-center justify-center group shadow-inner">
                    <img
                      src="/ev-franchise-hero.jpg"
                      alt="Pune Kharadi Map"
                      className="w-full h-full object-cover opacity-50 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                    <div className="relative z-10 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-[#00D084] text-[#020403] flex items-center justify-center mx-auto shadow-[0_0_20px_#00D084]">
                        <MapPin className="w-5 h-5 fill-[#020403]" />
                      </div>
                      <a
                        href="https://maps.google.com/?q=EON+IT+Park+Pune"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-wider inline-flex items-center gap-1.5 hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg"
                      >
                        Get Directions <Navigation className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

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

          {/* BOTTOM CALL TO ACTION BANNER */}
          <section className="py-20 px-6 bg-gradient-to-r from-[#030e07] via-[#020503] to-[#041209] font-serif border-t border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D084]/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight gsap-slide-up">
                Ready to Give Your EV the Best Care?
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-serif font-light max-w-2xl mx-auto">
                Book your service today and experience the difference with AI-powered diagnostics and genuine OEM parts.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => handleServiceCardBook("General EV Service", "₹599")}
                  className="px-8 py-4 rounded-2xl bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-2xl"
                >
                  Book Service Now
                </button>
                <a
                  href="tel:18001234567"
                  className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-serif font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
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
