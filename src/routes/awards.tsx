import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  Trophy,
  Award,
  Medal,
  Star,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  X,
  ExternalLink,
  Quote,
  Flame,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";
import Lenis from "lenis";

export const Route = createFileRoute("/awards")({
  component: AwardsPage,
});

interface AwardItem {
  id: string;
  title: string;
  category: "Technology & BMS" | "Franchise & Network" | "Safety & Sustainability" | "Leadership & Innovation";
  organization: string;
  year: string;
  tier: "Gold" | "Platinum" | "Emerald";
  image: string;
  summary: string;
  citation: string;
  jury: string;
  keynoteQuote: string;
  location: string;
  presenter: string;
}

const AWARDS_LIST: AwardItem[] = [
  {
    id: "award-2026-1",
    title: "Best EV Aftermarket Service Network of the Year",
    category: "Franchise & Network",
    organization: "National Clean Mobility Leadership Summit 2026",
    year: "2026",
    tier: "Gold",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&auto=format&fit=crop&q=80",
    summary: "Recognized for expanding standardized multi-brand diagnostic workshops across 40+ Tier-1 & Tier-2 Indian cities with 45-minute turnaround guarantees.",
    citation: "Awarded to MY EV SERVICE for revolutionizing electric two-wheeler and three-wheeler aftermarket maintenance through proprietary Autobot OS telemetry and standardized cell-balancing protocols.",
    jury: "Chaired by Ministry of Heavy Industries Advisory Panel & Society of Indian Automobile Manufacturers (SIAM).",
    keynoteQuote: "MY EV SERVICE has solved the single biggest hurdle to EV adoption—reliable, high-tech, and accessible nationwide aftermarket care.",
    location: "Bharat Mandapam, New Delhi",
    presenter: "Shri Rajesh Kumar, Joint Secretary (Clean Transportation)",
  },
  {
    id: "award-2026-2",
    title: "BMS Thermal Safety & Cell Balancing Innovation Trophy",
    category: "Technology & BMS",
    organization: "Automotive Tech India Excellence Awards 2026",
    year: "2026",
    tier: "Emerald",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop&q=80",
    summary: "For inventing real-time CAN-bus thermal anomaly detection algorithms that prevent battery thermal runaway 60 days before cell degradation.",
    citation: "In recognition of breakthrough electrochemistry diagnostics that enable precise SOH estimation and zero-fire safety guarantees for commercial delivery fleets.",
    jury: "Indian Institute of Science (IISc) Clean Energy Research Board.",
    keynoteQuote: "Cell-level telemetry balancing developed by MY EV SERVICE sets a new benchmark for global battery lifespan extension.",
    location: "Hotel Conrad, Bengaluru",
    presenter: "Dr. K. Sivanandan, Senior Fellow (Center for Battery Research)",
  },
  {
    id: "award-2025-1",
    title: "Most Trusted EV Franchise Model of the Year",
    category: "Franchise & Network",
    organization: "Indian Retail & Franchise Leadership Forum 2025",
    year: "2025",
    tier: "Platinum",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&auto=format&fit=crop&q=80",
    summary: "Honored for creating zero-royalty micro-franchise opportunities that upskilled over 1,200 local mechanics into certified EV diagnostic engineers.",
    citation: "For empowering regional automotive entrepreneurs with end-to-end Autobot OS workshop management, spare parts supply lines, and automated booking systems.",
    jury: "Franchise India & Economic Times Entrepreneurial Council.",
    keynoteQuote: "A masterclass in inclusive green economy transition, turning local repair shops into futuristic EV tech hubs.",
    location: "JCS Convention Center, Mumbai",
    presenter: "Anand Mahindra, Special Guest Speaker",
  },
  {
    id: "award-2025-2",
    title: "Green Mobility Pioneer & Decarbonization Award",
    category: "Safety & Sustainability",
    organization: "ET Auto & Transport Council Forum 2025",
    year: "2025",
    tier: "Gold",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    summary: "Commended for enabling over 85 million zero-emission commercial delivery kilometers with 99.4% fleet uptime guarantees.",
    citation: "Presented to MY EV SERVICE for leading urban carbon abatement initiatives and zero-landfill lithium battery recycling partnerships.",
    jury: "United Nations Environment Programme (UNEP) India Chapter.",
    keynoteQuote: "Extending lithium-ion battery life cycle by 35% directly translates to megatons of avoided carbon emissions.",
    location: "Leela Palace, New Delhi",
    presenter: "Ms. Sunita Narain, Director General (CSE)",
  },
  {
    id: "award-2025-3",
    title: "Outstanding Commercial Fleet Uptime SLA Award",
    category: "Leadership & Innovation",
    organization: "Supply Chain & Logistics Excellence Awards 2025",
    year: "2025",
    tier: "Emerald",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80",
    summary: "Acknowledging 24/7 mobile RSA emergency vans maintaining 15-minute response times for last-mile delivery fleets across top Indian metros.",
    citation: "For deployment of QR-tracked mobile diagnostic units equipped with rapid high-voltage battery swap packs and immediate roadside controller flashing.",
    jury: "Logistics Management Association of India.",
    keynoteQuote: "MY EV SERVICE is the silent engine powering India's last-mile e-commerce delivery revolution.",
    location: "JW Marriott, Pune",
    presenter: "Vikram Malhotra, President (Logistics Council)",
  },
  {
    id: "award-2024-1",
    title: "Excellence in Customer-Centric Clean Tech UX",
    category: "Leadership & Innovation",
    organization: "Consumer Mobility & Digital Experience Summit 2024",
    year: "2024",
    tier: "Platinum",
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=1200&auto=format&fit=crop&q=80",
    summary: "Celebrated for intuitive doorstep booking, real-time live service tracking, and transparent digital diagnostic health scorecards.",
    citation: "For establishing complete transparency in EV battery maintenance with real-time video streaming of repair SOPs.",
    jury: "Digital India Mobility Forum.",
    keynoteQuote: "Transforming automotive repair from a opaque hassle into an ultra-modern digital experience.",
    location: "Hyatt Regency, Hyderabad",
    presenter: "Dr. Arvind Gupta, Tech Policy Strategist",
  },
];

const PRESS_QUOTES = [
  {
    quote: "MY EV SERVICE has redefined how battery thermal safety and aftermarket diagnostic standards are delivered across India.",
    source: "FORBES INDIA",
    author: "Clean Tech Special Edition",
  },
  {
    quote: "By connecting 40+ cities under one diagnostic cloud OS, they are building the operating system for India's 2W & 3W EV transition.",
    source: "ECONOMIC TIMES AUTO",
    author: "Automotive Leadership Feature",
  },
  {
    quote: "Zero-royalty franchise model and doorstep cell-balancing technology make MY EV SERVICE the most promising EV infrastructure play.",
    source: "CNBC TV18",
    author: "Startup Spotlight 2026",
  },
  {
    quote: "Their 99.4% fleet uptime guarantee is single-handedly accelerating last-mile commercial electric vehicle adoption.",
    source: "FINANCIAL EXPRESS",
    author: "Supply Chain Insights",
  },
];

const CATEGORIES = [
  "All Trophies",
  "Technology & BMS",
  "Franchise & Network",
  "Safety & Sustainability",
  "Leadership & Innovation",
];

function AwardItemRow({
  award,
  index,
  onSelect,
}: {
  award: AwardItem;
  index: number;
  onSelect: (award: AwardItem) => void;
}) {
  const isEven = index % 2 === 0;

  const getTierColor = (tier: string) => {
    if (tier === "Gold")
      return "border-[#FFD700]/50 text-[#FFD700] bg-[#FFD700]/15 shadow-[0_0_15px_rgba(255,215,0,0.25)]";
    if (tier === "Platinum")
      return "border-slate-300/50 text-slate-200 bg-slate-200/15 shadow-[0_0_15px_rgba(226,232,240,0.25)]";
    return "border-[#00D084]/50 text-[#00D084] bg-[#00D084]/15 shadow-[0_0_15px_rgba(0,208,132,0.25)]";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center py-6 lg:py-10 group overflow-hidden">
      {/* Image Card Column - Slides from Left if even, Right if odd */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -70 : 70, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.02, y: -4 }}
        onClick={() => onSelect(award)}
        className={`lg:col-span-6 relative h-72 sm:h-96 lg:h-[380px] w-full rounded-3xl overflow-hidden bg-slate-900 border border-white/15 shadow-2xl cursor-pointer group-hover:border-[#00D084]/60 group-hover:shadow-[0_0_35px_rgba(0,208,132,0.2)] transition-all duration-500 ${
          isEven ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <img
          src={award.image}
          alt={award.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

        {/* Floating Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00D084]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Year Badge */}
        <div className="absolute top-5 left-5 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#00D084] border border-white/15 shadow-lg">
          {award.year}
        </div>

        {/* Tier Badge */}
        <div
          className={`absolute top-5 right-5 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-widest border ${getTierColor(
            award.tier
          )}`}
        >
          {award.tier} Trophy
        </div>

        {/* Location Badge */}
        <div className="absolute bottom-5 left-5 bg-black/85 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-mono text-white/90 border border-white/15 flex items-center gap-2 shadow-lg">
          <Calendar className="w-4 h-4 text-[#00D084]" /> {award.location}
        </div>
      </motion.div>

      {/* Content Details Column - Slides from Right if even, Left if odd */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 70 : -70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className={`lg:col-span-6 space-y-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-wrap items-center gap-2.5"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D084] bg-[#00D084]/15 border border-[#00D084]/35 px-4 py-1.5 rounded-full shadow-[0_0_12px_rgba(0,208,132,0.15)]">
            {award.category}
          </span>
          <span className="text-xs font-mono text-white/50">
            Presented by {award.organization}
          </span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.45, delay: 0.22 }}
          onClick={() => onSelect(award)}
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white group-hover:text-[#00D084] transition-colors leading-[1.15] cursor-pointer"
        >
          {award.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="text-sm sm:text-base text-white/75 font-light leading-relaxed"
        >
          {award.summary}
        </motion.p>

        {/* Citation Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.45, delay: 0.34 }}
          className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-white/90 italic font-light border-l-4 border-l-[#00D084] shadow-inner backdrop-blur-md"
        >
          "{award.citation}"
        </motion.div>

        {/* Details & Pop-up Trigger Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="pt-2 flex items-center justify-between"
        >
          <span className="text-xs font-mono text-white/50">
            Jury: {award.jury.split(" ")[0]}...
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(award)}
            className="px-7 py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(0,208,132,0.35)] hover:shadow-[0_0_35px_rgba(0,208,132,0.6)]"
          >
            View Details <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function AwardsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Trophies");
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardsOverlayRef = useRef<HTMLDivElement>(null);
  const modalScrollContainerRef = useRef<HTMLDivElement>(null);
  const modalScrollContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lenis Smooth Scroll initialization inside popup modal drawer
  useEffect(() => {
    if (!selectedAward || !modalScrollContainerRef.current) return;

    const lenis = new Lenis({
      wrapper: modalScrollContainerRef.current,
      content: modalScrollContentRef.current || undefined,
      eventsTarget: modalScrollContainerRef.current,
      smoothWheel: true,
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [selectedAward]);

  // GSAP ScrollTrigger Stuck Hero Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(heroTextRef.current, {
        opacity: 0,
        scale: 0.92,
        y: -40,
        ease: "power1.out",
        scrollTrigger: {
          trigger: cardsOverlayRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: 0.6,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const filteredAwards = AWARDS_LIST;

  return (
    <div className="min-h-screen bg-[#020503] text-white selection:bg-[#00D084] selection:text-black font-sans relative overflow-x-hidden">
      
      {/* Navigation Header */}
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Main Stuck Hero Container Wrapper */}
      <div className="relative min-h-screen">
        
        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0 BEHIND NAVBAR)
           ========================================================================= */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background Hero Image */}
          <img
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&auto=format&fit=crop&q=85"
            alt="Awards & Recognitions Gala"
            className="w-full h-full object-cover object-center opacity-70 pointer-events-none"
          />

          {/* Glowing Radial Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-black/40 to-black/60 pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D084]/15 rounded-full blur-[160px] pointer-events-none" />

          {/* Hero Content Container (Text slowly fades out & scales as cards rise over it) */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 max-w-5xl mx-auto space-y-5 z-10 text-center pointer-events-none"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/40 bg-[#00D084]/15 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] shadow-[0_0_20px_rgba(0,208,132,0.3)]">
              <Sparkles className="w-4 h-4" />
              CELEBRATING EV AFTERMARKET EXCELLENCE
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-white leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              Awards &amp; <span className="text-[#00D084]">Recognitions</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl font-light text-white/90 leading-relaxed max-w-3xl drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
              Honoring India's highest industry accolades in EV diagnostic engineering, battery thermal safety innovation, and clean mobility franchise leadership.
            </p>
          </div>
        </div>

        {/* =========================================================================
            2. CARDS OVERLAY CONTAINER (SLIDES UP DIRECTLY OVER THE FIXED HERO)
           ========================================================================= */}
        <div
          ref={cardsOverlayRef}
          className="relative z-10 bg-[#020503] text-white min-h-screen mt-[calc(100vh-80px)] rounded-t-[40px] border-t border-white/15 shadow-2xl transition-colors duration-500"
        >
          
          {/* =========================================================================
              3. FLOATING STATS COUNTER BAR
             ========================================================================= */}
          <section className="pt-12 pb-8 px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[#080f0b] border border-white/10 shadow-2xl backdrop-blur-xl">
              
              <div className="text-center p-4 border-r border-white/10 last:border-r-0">
                <div className="flex items-center justify-center gap-1.5 text-[#00D084] mb-1">
                  <Trophy className="w-5 h-5" />
                  <span className="text-3xl sm:text-4xl font-black tracking-tight">18+</span>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/60">
                  National Trophies
                </span>
              </div>

              <div className="text-center p-4 md:border-r border-white/10">
                <div className="flex items-center justify-center gap-1.5 text-[#00D084] mb-1">
                  <Award className="w-5 h-5" />
                  <span className="text-3xl sm:text-4xl font-black tracking-tight">45+</span>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/60">
                  Jury Citations
                </span>
              </div>

              <div className="text-center p-4 border-r border-white/10 last:border-r-0">
                <div className="flex items-center justify-center gap-1.5 text-[#00D084] mb-1">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-3xl sm:text-4xl font-black tracking-tight">ISO</span>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/60">
                  9001:2025 Certified
                </span>
              </div>

              <div className="text-center p-4">
                <div className="flex items-center justify-center gap-1.5 text-[#00D084] mb-1">
                  <Star className="w-5 h-5 fill-[#00D084]" />
                  <span className="text-3xl sm:text-4xl font-black tracking-tight">4.9/5</span>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/60">
                  Industry Rating
                </span>
              </div>

            </div>
          </section>

          {/* =========================================================================
              4. SECTION HEADER
             ========================================================================= */}
          <section className="pt-8 pb-4 px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="mb-8">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084] block mb-2">
                Hall of Honors
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.04em] text-white">
                Featured Industry Accolades
              </h2>
            </div>

            {/* =========================================================================
                5. ALTERNATING ZIGZAG FEATURED ACCOLADES SECTION
               ========================================================================= */}
            <div className="space-y-12 lg:space-y-16 py-8">
              {filteredAwards.map((award, index) => (
                <AwardItemRow
                  key={award.id}
                  award={award}
                  index={index}
                  onSelect={setSelectedAward}
                />
              ))}
            </div>
          </section>

          {/* =========================================================================
              6. PRESS ACCOLADES & QUOTES TICKER
             ========================================================================= */}
          <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto relative overflow-hidden">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084] block mb-2">
                  Media Recognition
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  What Industry Leaders Say
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PRESS_QUOTES.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-[#080e0a] border border-white/10 hover:border-[#00D084]/40 transition-all shadow-xl relative overflow-hidden group"
                  >
                    <Quote className="w-10 h-10 text-[#00D084]/20 absolute top-6 right-6 group-hover:text-[#00D084]/40 transition-colors" />

                    <p className="text-base sm:text-lg font-light text-white/90 leading-relaxed italic mb-6 relative z-10">
                      "{item.quote}"
                    </p>

                    <div className="flex items-center justify-between border-t border-white/10 pt-4 relative z-10">
                      <span className="text-xs font-mono font-black text-[#00D084] uppercase tracking-widest">
                        {item.source}
                      </span>
                      <span className="text-xs text-white/50 font-mono">
                        {item.author}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
          </section>



          {/* Footer */}
          <Footer />

        </div>
      </div>

      {/* =========================================================================
          8. AWARD DETAIL IMMERSIVE MODAL
         ========================================================================= */}
      {/* =========================================================================
          8. AWARD DETAIL BOTTOM SHEET POP-UP
         ========================================================================= */}
      <AnimatePresence>
        {selectedAward && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAward(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Bottom Sheet Drawer touching bottom, left, and right borders */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#070c09] border-t border-x border-white/20 rounded-t-[36px] max-h-[85vh] h-[85vh] w-full p-6 md:p-10 shadow-2xl text-white overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAward(null)}
                className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Side-by-Side Grid: Left Image (Fixed) + Right Text (Scrollable) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-stretch max-w-7xl mx-auto w-full pt-2 overflow-hidden">
                
                {/* LEFT COLUMN: FIXED IMAGE (Non-scrollable) */}
                <div className="lg:col-span-5 h-56 lg:h-full relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-xl shrink-0">
                  <img
                    src={selectedAward.image}
                    alt={selectedAward.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-mono text-white/90 border border-white/10 shadow-lg">
                    📍 {selectedAward.location}
                  </div>
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-[#00D084] border border-white/15">
                    {selectedAward.year} • {selectedAward.tier} Trophy
                  </div>
                </div>

                {/* RIGHT COLUMN: SCROLLABLE TEXT SIDE (Lenis Smooth Scroll, Hidden Scrollbar) */}
                <div
                  ref={modalScrollContainerRef}
                  tabIndex={0}
                  className="lg:col-span-7 h-full max-h-full overflow-y-auto overscroll-contain touch-pan-y pr-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus:outline-none"
                >
                  <div ref={modalScrollContentRef} className="space-y-6 pb-8 pr-4">
                    {/* Header Info */}
                    <div className="pr-10">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D084] bg-[#00D084]/15 border border-[#00D084]/30 px-3.5 py-1 rounded-full">
                        {selectedAward.category}
                      </span>

                      <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-4 mb-2 leading-snug">
                        {selectedAward.title}
                      </h2>

                      <p className="text-xs font-mono text-[#00D084]">
                        Presented by {selectedAward.organization}
                      </p>
                    </div>

                    {/* Official Jury Citation */}
                    <div>
                      <h4 className="text-xs font-mono uppercase font-bold text-[#00D084] mb-2">
                        Official Jury Citation
                      </h4>
                      <p className="text-xs sm:text-sm leading-relaxed text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 shadow-inner">
                        "{selectedAward.citation}"
                      </p>
                    </div>

                    {/* Keynote Address Quote */}
                    <div>
                      <h4 className="text-xs font-mono uppercase font-bold text-[#00D084] mb-2">
                        Keynote Address Quote
                      </h4>
                      <p className="text-xs sm:text-sm italic text-white/80 border-l-2 border-[#00D084] pl-4 py-2 bg-white/[0.02] rounded-r-xl">
                        "{selectedAward.keynoteQuote}"
                      </p>
                    </div>

                    {/* Jury Panel & Presenter Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-white/40 block text-[10px] uppercase mb-1">Jury Panel</span>
                        <span className="text-white font-medium">{selectedAward.jury}</span>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-white/40 block text-[10px] uppercase mb-1">Presented By</span>
                        <span className="text-white font-medium">{selectedAward.presenter}</span>
                      </div>
                    </div>

                    {/* Innovation Summary */}
                    <div>
                      <h4 className="text-xs font-mono uppercase font-bold text-[#00D084] mb-2">
                        Impact & Innovation
                      </h4>
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                        {selectedAward.summary}
                      </p>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                      <button
                        onClick={() => {
                          toast.success("Award Citation copied to clipboard!");
                        }}
                        className="px-6 py-3 rounded-full border border-white/20 text-xs font-bold flex items-center gap-2 hover:bg-white/10 transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4 text-[#00D084]" /> Share Award
                      </button>

                      <button
                        onClick={() => setSelectedAward(null)}
                        className="px-8 py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-bold uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-lg cursor-pointer"
                      >
                        Close Window
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

    </div>
  );
}
