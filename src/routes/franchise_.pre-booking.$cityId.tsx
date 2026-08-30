import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  CalendarCheck,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Lock,
  User,
  Phone,
  Mail,
  Send,
  Sparkles,
  Compass,
  Building2,
  TrendingUp,
  Award,
  Users,
  ChevronDown,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import { toast } from "sonner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CITIES_RADAR } from "../data/franchiseData";
import { DEFAULT_CITY_SLOTS, PreBookingSlot } from "../components/CityPreBookingModal";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/franchise_/pre-booking/$cityId")({
  component: CityPreBookingPage,
});

function CityPreBookingPage() {
  const { cityId } = Route.useParams();
  const navigate = useNavigate();
  const bookingTableRef = useRef<HTMLDivElement>(null);
  
  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardsOverlayRef = useRef<HTMLDivElement>(null);
  const whyPartnerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Find current city from route params
  const currentCity = CITIES_RADAR.find(
    (c) => c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === cityId.toLowerCase()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cityId]);

  // GSAP ScrollTrigger Animations matching Media Page
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero text slow fade-out & shrink as content overlay slides up over hero
      if (heroTextRef.current && cardsOverlayRef.current) {
        gsap.to(heroTextRef.current, {
          opacity: 0,
          scale: 0.9,
          y: -50,
          ease: "power1.out",
          scrollTrigger: {
            trigger: cardsOverlayRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 0.6,
          },
        });
      }

      // 1.5. Features Grid staggered card entrance
      if (featuresRef.current) {
        gsap.fromTo(
          featuresRef.current.querySelectorAll(".feature-card"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Hero background slow parallax scale pan
      gsap.fromTo(
        ".hero-bg-img",
        { yPercent: 0, scale: 1 },
        {
          yPercent: 12,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: cardsOverlayRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4,
          },
        }
      );

      // 3. Staggered card entrance for Why Partner section
      if (whyPartnerRef.current) {
        gsap.fromTo(
          whyPartnerRef.current.querySelectorAll(".why-partner-card"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: whyPartnerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 4. Stats widget counter count-up
      const statsObj = { val100: 0, val50: 0, val1000: 0 };
      const stat100El = document.querySelector(".stat-count-100");
      const stat50El = document.querySelector(".stat-count-50");
      const stat1000El = document.querySelector(".stat-count-1000");

      gsap.to(statsObj, {
        val100: 100,
        val50: 50,
        val1000: 1000,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stats-widget-container",
          start: "top 88%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (stat100El) stat100El.textContent = Math.floor(statsObj.val100) + "+";
          if (stat50El) stat50El.textContent = Math.floor(statsObj.val50) + "+";
          if (stat1000El) stat1000El.textContent = Math.floor(statsObj.val1000) + "+";
        },
      });
    });

    return () => ctx.revert();
  }, [cityId]);

  if (!currentCity) {
    const formattedName = cityId
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return (
      <div className="min-h-screen bg-[#020403] text-white flex flex-col justify-between font-sans selection:bg-[#00D084] selection:text-black">
        <Nav />
        <div className="max-w-3xl mx-auto px-6 py-32 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto text-2xl shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            📍
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Territory Booking Closed in <span className="text-[#00D084]">{formattedName}</span>
          </h1>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium">
            Franchise pre-booking is currently inactive or fully booked for <strong className="text-white">{formattedName}</strong>. We are active in 9 metropolitan corridors including Pune, Mumbai, Bangalore, Delhi NCR, Hyderabad & Ahmedabad.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/franchise"
              className="px-6 py-3.5 rounded-xl bg-[#00D084] text-[#020403] font-black uppercase text-xs tracking-wider hover:bg-[#00e08f] transition-all shadow-[0_0_20px_rgba(0,208,132,0.4)]"
            >
              Go to Franchise Map
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Set up local slots state
  const cityKey = currentCity.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const defaultSlots: PreBookingSlot[] = DEFAULT_CITY_SLOTS[cityKey] || [
    { id: `${cityKey}-1`, area: `Central ${currentCity.name}`, pincode: "411001", status: "available" },
    { id: `${cityKey}-2`, area: `North ${currentCity.name}`, pincode: "411002", status: "booked" },
    { id: `${cityKey}-3`, area: `South ${currentCity.name}`, pincode: "411003", status: "available" },
    { id: `${cityKey}-4`, area: `East ${currentCity.name}`, pincode: "411004", status: "available" },
  ];

  const [slots, setSlots] = useState<PreBookingSlot[]>(defaultSlots);
  const [showAllSlots, setShowAllSlots] = useState(false);
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState<PreBookingSlot | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    modelType: "Executive Hub (2W & 3W)",
    investmentBudget: "₹15 Lakhs - ₹25 Lakhs",
  });

  const [submittedToken, setSubmittedToken] = useState<string | null>(null);

  const handleBookSlot = (slot: PreBookingSlot) => {
    setSelectedSlotForBooking(slot);
    setSubmittedToken(null);
  };

  const handleConfirmPreBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlotForBooking) return;

    if (!formData.fullName || !formData.phone) {
      toast.error("Please fill in your Full Name and Mobile Number.");
      return;
    }

    // Mark slot as booked in state
    setSlots((prev) =>
      prev.map((s) => (s.id === selectedSlotForBooking.id ? { ...s, status: "booked" } : s))
    );

    const generatedToken = `EV-HUB-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedToken(generatedToken);
    
    toast.success(
      `Pre-booking confirmed for ${selectedSlotForBooking.area} (${selectedSlotForBooking.pincode})!`
    );
  };

  const scrollToBooking = () => {
    bookingTableRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCityChange = (cityName: string) => {
    const key = cityName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    navigate({ to: `/franchise/pre-booking/${key}` });
  };

  const displayedSlots = showAllSlots ? slots : slots.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#020403] text-white font-sans selection:bg-[#00D084] selection:text-black relative overflow-x-clip">
      
      {/* Navigation Header */}
      <Nav />

      {/* Main Layout Container */}
      <div className="relative min-h-screen">
        
        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0 LIKE MEDIA PAGE)
           ========================================================================= */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background Hero Image - 100% Crystal Clear */}
          <img
            src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1920&auto=format&fit=crop&q=85"
            alt="EV Service Network Franchise"
            className="w-full h-full object-cover object-center opacity-100 pointer-events-none"
          />

          {/* Hero Content Container (Text slowly fades out as cards rise over it) */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center px-6 lg:px-16 max-w-4xl space-y-4 z-10 transition-all pointer-events-none text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              TECHNOLOGY-BACKED <br />
              <span className="text-[#00D084]">EV SERVICE NETWORK</span>
            </h1>
          </div>
        </div>

        {/* =========================================================================
            2. CARDS OVERLAY LAYER (SLIDES UP DIRECTLY ON TOP OF THE FIXED HERO)
           ========================================================================= */}
        <div
          ref={cardsOverlayRef}
          className="relative z-10 bg-[#020403] min-h-screen mt-[calc(100vh-80px)] pt-16 pb-24 rounded-t-[40px] border-t border-white/10 shadow-2xl space-y-24"
        >
          
          {/* Breadcrumbs & Features Grid (Rises up over Hero) */}
          <div className="max-w-7xl mx-auto px-6 space-y-12 text-left">
            <div>
              <Link
                to="/franchise"
                className="inline-flex items-center gap-2 text-white/70 hover:text-[#00D084] transition-colors text-xs font-mono font-bold uppercase tracking-wider bg-white/5 px-4 py-2 rounded-full border border-white/10 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Franchise Hub
              </Link>
            </div>

            {/* 4 Core Features Grid */}
            <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "First in India",
                  desc: "Pioneering EV service network",
                  icon: <Compass className="w-6 h-6 text-[#00D084]" />,
                },
                {
                  title: "High Growth",
                  desc: "Future-ready business with unlimited potential",
                  icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
                },
                {
                  title: "Technology Backed",
                  desc: "Smart systems for powerful operations",
                  icon: <Zap className="w-6 h-6 text-yellow-400" />,
                },
                {
                  title: "End-to-End Support",
                  desc: "Training, Marketing & Operational support",
                  icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
                },
              ].map((feat, i) => (
                <div
                  key={i}
                  className="feature-card bg-[#050907]/90 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-[#00D084]/40 transition-colors shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{feat.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed mt-1">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              3. URGENCY BANNER (BE THE 1ST IN YOUR CITY)
             ========================================================================= */}
          <div className="max-w-7xl mx-auto px-6">
            <motion.section
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="bg-[#050c08] border-2 border-[#00D084]/50 rounded-[32px] p-6 sm:p-8 shadow-[0_15px_40px_-15px_rgba(0,208,132,0.25)] relative overflow-hidden text-center sm:text-left"
            >
              <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-[#00D084]/10 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-mono font-bold text-[#00D084] tracking-widest uppercase block">
                    BE THE 1ST IN YOUR CITY
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    LIMITED ZONES AVAILABLE!
                  </h2>
                  <p className="text-xs sm:text-sm text-white/70 font-medium font-sans">
                    Pre-book now and secure your exclusive franchise zone with guaranteed 5km territory protection.
                  </p>
                </div>
                <button
                  onClick={scrollToBooking}
                  className="px-6 py-3.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shrink-0 hover:scale-[1.02] shadow-lg cursor-pointer"
                >
                  PRE-BOOK YOUR FRANCHISE NOW
                </button>
              </div>
            </motion.section>
          </div>

          {/* =========================================================================
              4. INTERACTIVE CHOOSE YOUR CITY & AREA BOOKING TABLE
             ========================================================================= */}
          <div ref={bookingTableRef} className="max-w-7xl mx-auto px-6 space-y-12 scroll-mt-24">
            
            {/* Header & City Selector row (Side-by-side on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 border-b border-white/5 pb-8"
            >
              
              {/* Left Side: Header Text */}
              <div className="text-center lg:text-left space-y-3 max-w-2xl">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.35em] text-[#00D084] px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 inline-block">
                  CHOOSE YOUR CITY
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-sans">
                  Select a city to view available areas and pin codes for franchise booking
                </h2>
                <p className="text-white/50 text-xs sm:text-sm font-medium font-sans">
                  We are actively locking franchise territories across major industrial and municipal EV corridors. Select your region below to view real-time maps.
                </p>
              </div>

              {/* Right Side: Custom Location Selector */}
              <div className="w-full lg:max-w-md shrink-0">
                <CityCustomDropdown
                  currentCityName={currentCity.name}
                  currentCityState={currentCity.state}
                  onSelectCity={handleCityChange}
                />
              </div>

            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 relative">
              
              {/* Left Column: City Card (Screenshot) */}
              <motion.div
                initial={{ opacity: 0, x: -45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
                className="lg:col-span-4 lg:sticky lg:top-28 z-20"
              >
                <div className="bg-[#050c08] border-2 border-[#00D084]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#00D084]/10 rounded-full blur-[50px] pointer-events-none" />
                  
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/40 text-[#00D084] text-[10px] font-mono font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 animate-pulse" /> {currentCity.tag}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      {currentCity.growthRate}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="text-left">
                    <h3 className="text-4xl font-black text-white flex items-center gap-2">
                      {currentCity.name}
                      <span className="text-xs font-normal text-white/60 px-2.5 py-0.5 rounded-full bg-white/10">
                        {currentCity.state}
                      </span>
                    </h3>
                    <p className="text-xs text-[#00D084] font-bold mt-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> {currentCity.status}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 gap-3 pt-2 border-t border-white/10 text-xs text-left">
                    <div className="bg-[#020503] border border-white/10 rounded-2xl p-4 space-y-1">
                      <span className="text-white/40 block text-[9px] uppercase font-bold tracking-wider font-mono">
                        LOCAL EV DEMAND
                      </span>
                      <span className="font-bold text-white text-sm">
                        {currentCity.demand}
                      </span>
                    </div>

                    <div className="bg-[#020503] border border-white/10 rounded-2xl p-4 space-y-1">
                      <span className="text-white/40 block text-[9px] uppercase font-bold tracking-wider font-mono">
                        TERRITORY SLOTS
                      </span>
                      <span className="font-bold text-[#00D084] text-sm">
                        {currentCity.slots}
                      </span>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="bg-[#020503] border border-white/10 rounded-2xl p-4 space-y-2.5 text-xs text-left">
                    <div className="flex justify-between items-center text-white/70">
                      <span>Exclusive Territory Radius:</span>
                      <span className="font-bold text-white">5 km Guaranteed</span>
                    </div>
                    <div className="flex justify-between items-center text-white/70">
                      <span>Active Operating Hubs:</span>
                      <span className="font-bold text-[#00D084]">{currentCity.hubCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-white/70">
                      <span>Coordinates:</span>
                      <span className="font-mono text-[11px] text-white/60">
                        {currentCity.lat.toFixed(2)}° N, {currentCity.lng.toFixed(2)}° E
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Slots Table & Form */}
              <motion.div
                initial={{ opacity: 0, x: 45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
                className="lg:col-span-8 space-y-6"
              >
                
                {/* Form overlay */}
                <AnimatePresence mode="wait">
                  {selectedSlotForBooking && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97, y: -15 }}
                      transition={{ duration: 0.25 }}
                      className="bg-[#050c08] border-2 border-[#00D084]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
                    >
                      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#00D084]/10 rounded-full blur-2xl pointer-events-none" />

                      {submittedToken ? (
                        /* Success Panel */
                        <div className="text-center space-y-4 py-4 animate-in zoom-in-95 duration-200">
                          <div className="w-12 h-12 rounded-full bg-[#00D084]/20 border border-[#00D084]/50 flex items-center justify-center text-[#00D084] mx-auto">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-2xl font-black text-white">
                              Territory Locked!
                            </h3>
                            <p className="text-white/70 text-xs max-w-md mx-auto">
                              Congratulations! Your territory slot in <strong className="text-white">{selectedSlotForBooking.area} ({selectedSlotForBooking.pincode})</strong> has been locked.
                            </p>
                            <div className="inline-block bg-[#020503] border border-[#00D084]/30 px-5 py-2.5 rounded-xl mt-2">
                              <span className="text-[10px] font-mono text-white/50 block uppercase">Priority Token</span>
                              <span className="text-[#00D084] font-black text-sm tracking-wider">{submittedToken}</span>
                            </div>
                          </div>
                          <div className="pt-2 flex justify-center gap-3">
                            <Link
                              to="/franchise-apply"
                              search={{
                                city: currentCity.name,
                                area: selectedSlotForBooking.area,
                                pincode: selectedSlotForBooking.pincode,
                              }}
                              className="px-5 py-2.5 rounded-xl bg-[#00D084] text-black font-bold uppercase text-[11px] tracking-wider transition-all"
                            >
                              Proceed to Full Application
                            </Link>
                            <button
                              onClick={() => setSelectedSlotForBooking(null)}
                              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-[11px] font-bold uppercase hover:bg-white/15"
                            >
                              Close Form
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Input Panel */
                        <div className="space-y-4 text-left">
                          <div className="flex items-center justify-between border-b border-white/10 pb-3">
                            <div>
                              <span className="text-[10px] font-mono text-[#00D084] font-bold uppercase tracking-wider block">
                                SECURE EXCLUSIVE ZONE
                              </span>
                              <h4 className="text-lg font-bold text-white mt-0.5 font-sans">
                                Locking Area: {selectedSlotForBooking.area} ({selectedSlotForBooking.pincode})
                              </h4>
                            </div>
                            <button
                              onClick={() => setSelectedSlotForBooking(null)}
                              className="text-xs font-mono text-white/50 hover:text-white underline cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>

                          <form onSubmit={handleConfirmPreBooking} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-[11px] font-mono text-white/70 mb-1">
                                Full Name *
                              </label>
                              <div className="relative">
                                <User className="w-4 h-4 text-white/40 absolute left-4 top-3" />
                                <input
                                  type="text"
                                  required
                                  placeholder="Rahul Sharma"
                                  value={formData.fullName}
                                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                  className="w-full bg-[#020403] border border-white/15 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-mono text-white/70 mb-1">
                                Mobile Number *
                              </label>
                              <div className="relative">
                                <Phone className="w-4 h-4 text-white/40 absolute left-4 top-3" />
                                <input
                                  type="tel"
                                  required
                                  placeholder="10-digit mobile number"
                                  value={formData.phone}
                                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                  className="w-full bg-[#020403] border border-white/15 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-mono text-white/70 mb-1">
                                Email Address (Optional)
                              </label>
                              <div className="relative">
                                <Mail className="w-4 h-4 text-white/40 absolute left-4 top-3" />
                                <input
                                  type="email"
                                  placeholder="you@example.com"
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  className="w-full bg-[#020403] border border-white/15 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-mono text-white/70 mb-1">
                                Workshop Type Model
                              </label>
                              <select
                                value={formData.modelType}
                                onChange={(e) => setFormData({ ...formData, modelType: e.target.value })}
                                className="w-full bg-[#020403] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084] cursor-pointer"
                              >
                                <option value="Garage Starter Hub">Garage Starter (1 Bay)</option>
                                <option value="Executive Hub (2W & 3W)">Executive Hub (3 Bays)</option>
                                <option value="Master Regional Center">Master Hub (6+ Bays)</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] font-mono text-white/70 mb-1">
                                Investment Budget
                              </label>
                              <select
                                value={formData.investmentBudget}
                                onChange={(e) => setFormData({ ...formData, investmentBudget: e.target.value })}
                                className="w-full bg-[#020403] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084] cursor-pointer"
                              >
                                <option value="₹7.5 Lakhs - ₹15 Lakhs">₹7.5 Lakhs - ₹15 Lakhs</option>
                                <option value="₹15 Lakhs - ₹25 Lakhs">₹15 Lakhs - ₹25 Lakhs</option>
                                <option value="₹25 Lakhs +">₹25 Lakhs +</option>
                              </select>
                            </div>

                            <button
                              type="submit"
                              className="md:col-span-2 w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] font-bold uppercase text-xs tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg mt-2 flex items-center justify-center gap-2"
                            >
                              Lock {selectedSlotForBooking.area} Area Slot <Send className="w-4 h-4" />
                            </button>
                          </form>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Slots Table Card */}
                <div className="bg-[#050907] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-white/10 bg-[#070e0a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-left font-sans">
                      <span className="text-[10px] font-mono text-[#00D084] font-bold uppercase tracking-widest">
                        AREAS & PIN CODES
                      </span>
                      <h4 className="font-extrabold text-white text-lg tracking-tight mt-0.5">
                        {currentCity.name.toUpperCase()} Territory Map
                      </h4>
                    </div>
                    
                    {/* Status Legend */}
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-white/70">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00D084]/20 border border-[#00D084]" /> Available
                      </span>
                      <span className="flex items-center gap-1.5 text-white/40">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/5 border border-white/20" /> Booked
                      </span>
                    </div>
                  </div>

                  {/* Slots Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-white/5 text-white/40 font-mono text-[10px] uppercase tracking-wider bg-white/[0.01]">
                          <th className="py-3.5 px-6 font-bold">AREA</th>
                          <th className="py-3.5 px-6 font-bold">PIN CODES</th>
                          <th className="py-3.5 px-6 font-bold">STATUS</th>
                          <th className="py-3.5 px-6 font-bold text-right">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {displayedSlots.map((slot) => {
                          const isAvailable = slot.status === "available";
                          return (
                            <tr key={slot.id} className="hover:bg-white/[0.01] transition-colors">
                              <td className="py-4 px-6 font-bold text-white text-base">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-[#00D084] shrink-0" />
                                  <span>{slot.area}</span>
                                </div>
                              </td>
                              <td className="py-4 px-6 font-mono text-white/60 text-xs">
                                {slot.pincode}
                              </td>
                              <td className="py-4 px-6">
                                {isAvailable ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                                    Available
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/5 text-white/30 border border-white/10">
                                    Booked
                                  </span>
                                )}
                              </td>
                              <td className="py-4 px-6 text-right">
                                {isAvailable ? (
                                  <button
                                    onClick={() => handleBookSlot(slot)}
                                    className="px-4 py-1.5 rounded-full bg-[#00D084] text-[#020403] font-bold text-xs uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer shadow-md hover:scale-105"
                                  >
                                    BOOK NOW
                                  </button>
                                ) : (
                                  <button
                                    disabled
                                    className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/20 font-bold text-xs uppercase tracking-wider cursor-not-allowed opacity-50 select-none"
                                  >
                                    BOOKED
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* View More Trigger */}
                  {slots.length > 5 && (
                    <div className="p-4 border-t border-white/5 text-center bg-white/[0.01]">
                      <button
                        onClick={() => setShowAllSlots(!showAllSlots)}
                        className="px-6 py-2 rounded-full border border-white/10 hover:border-[#00D084] text-xs font-bold text-white hover:text-[#00D084] transition-all flex items-center gap-1.5 mx-auto cursor-pointer"
                      >
                        {showAllSlots ? "SHOW LESS" : "VIEW MORE AREAS"}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* =========================================================================
              5. WHY PARTNER WITH MY EV SERVICE?
             ========================================================================= */}
          <div ref={whyPartnerRef} className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                PARTNER ECOSYSTEM
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                WHY PARTNER WITH MY EV SERVICE?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-left">
              {[
                {
                  title: "Growing EV Market",
                  desc: "Be part of India's fastest growing industry with 30%+ CAGR.",
                  icon: <TrendingUp className="w-6 h-6 text-[#00D084]" />,
                },
                {
                  title: "Proven Business Model",
                  desc: "Technology + Process = High Profitability. Fast payback in 14-18mo.",
                  icon: <Building2 className="w-6 h-6 text-blue-400" />,
                },
                {
                  title: "Complete Training",
                  desc: "End-to-end training and onboarding at our certified Autobot Academy.",
                  icon: <Award className="w-6 h-6 text-yellow-400" />,
                },
                {
                  title: "Marketing Support",
                  desc: "National level branding & local marketing lead routing directly to you.",
                  icon: <Sparkles className="w-6 h-6 text-purple-400" />,
                },
                {
                  title: "Ongoing Support",
                  desc: "24/7 operational, hardware diagnostic, & technical backend support.",
                  icon: <Users className="w-6 h-6 text-teal-400" />,
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="why-partner-card bg-[#050907]/90 border border-white/10 rounded-2xl p-6 space-y-4 hover:border-[#00D084]/30 transition-all hover:scale-[1.01] shadow-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-white text-base leading-snug">{card.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed font-light font-sans">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              6. BRAND STATS & SOCIALS FOOTER WIDGET
             ========================================================================= */}
          <div className="max-w-7xl mx-auto px-6">
            <section className="stats-widget-container bg-[#050907] rounded-3xl p-8 w-full">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                
                {/* Left Side: Stats (grouped to left) */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 sm:gap-0 sm:divide-x divide-white/10 w-full lg:w-auto text-center sm:text-left">
                  <div className="sm:pr-8">
                    <span className="stat-count-100 block text-3xl sm:text-4xl font-black text-[#00D084]">0+</span>
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 mt-1">
                      Service Centers
                    </span>
                  </div>
                  <div className="sm:px-8">
                    <span className="stat-count-50 block text-3xl sm:text-4xl font-black text-[#00D084]">0+</span>
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 mt-1">
                      Cities (Soon)
                    </span>
                  </div>
                  <div className="sm:px-8">
                    <span className="stat-count-1000 block text-3xl sm:text-4xl font-black text-[#00D084]">0+</span>
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 mt-1">
                      Happy Customers
                    </span>
                  </div>
                  <div className="sm:pl-8">
                    <span className="block text-sm sm:text-base font-extrabold text-white mt-2 uppercase tracking-wider">
                      Strong
                    </span>
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 mt-0.5">
                      Brand Backing
                    </span>
                  </div>
                </div>

                {/* Right Side: Follow Us (pushed to right) */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4 shrink-0 w-full lg:w-auto border-t lg:border-t-0 border-white/5 pt-6 lg:pt-0">
                  <span className="text-xs font-mono font-black text-white/70 tracking-widest uppercase shrink-0">
                    FOLLOW US
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#00D084] hover:bg-[#00D084]/15 flex items-center justify-center text-white/70 hover:text-[#00D084] transition-all"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#00D084] hover:bg-[#00D084]/15 flex items-center justify-center text-white/70 hover:text-[#00D084] transition-all"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#00D084] hover:bg-[#00D084]/15 flex items-center justify-center text-white/70 hover:text-[#00D084] transition-all"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#00D084] hover:bg-[#00D084]/15 flex items-center justify-center text-white/70 hover:text-[#00D084] transition-all"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </section>
          </div>

          {/* =========================================================================
              7. BOTTOM CALL TO ACTION BANNER (MAKE HISTORY IN YOUR CITY)
             ========================================================================= */}
          <div className="max-w-7xl mx-auto px-6">
            <motion.section
              initial={{ opacity: 0, scale: 0.96, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="bg-gradient-to-br from-[#040906] via-[#020403] to-[#050c08] border border-[#00D084]/30 rounded-[36px] p-8 sm:p-14 text-center space-y-6 shadow-2xl max-w-5xl mx-auto relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,208,132,0.06)_0%,transparent_70%)] pointer-events-none" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084] block animate-pulse">
                MAKE HISTORY IN YOUR CITY!
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-sans">
                BE THE FIRST. BE THE BEST. <br />
                <span className="text-white/60 text-xl sm:text-2xl block font-medium mt-1 font-sans">
                  Limited Territories. Maximum Opportunity. Pre-book your Franchise today!
                </span>
              </h2>
              <div className="pt-2">
                <button
                  onClick={scrollToBooking}
                  className="px-8 py-4 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg hover:scale-[1.02] inline-flex items-center gap-2"
                >
                  PRE-BOOK NOW <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </motion.section>
          </div>

          {/* =========================================================================
              8. FOOTER & BRANDING (SPECIAL COPY & ACTION ITEMS)
             ========================================================================= */}
          <div className="pt-16 max-w-7xl mx-auto px-6 text-left border-t border-white/5 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-6 space-y-4 font-sans">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  India's #1 EV Service Platform
                </h3>
                <p className="text-sm font-bold text-white/80">
                  Your EV deserves expert care
                </p>
                <p className="text-xs text-white/50 leading-relaxed max-w-sm">
                  Certified technicians. Doorstep service. Genuine parts. Lock your franchise slots to secure recurring local fleet and retail service flow.
                </p>
              </div>

              <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  to="/find-services"
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center flex flex-col justify-center items-center gap-2 text-xs font-bold text-white uppercase hover:text-[#00D084] transition-all cursor-pointer"
                >
                  <Zap className="w-5 h-5 text-[#00D084]" />
                  Book a Service
                </Link>
                <Link
                  to="/store"
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center flex flex-col justify-center items-center gap-2 text-xs font-bold text-white uppercase hover:text-[#00D084] transition-all cursor-pointer"
                >
                  <Building2 className="w-5 h-5 text-[#00D084]" />
                  Explore Parts
                </Link>
                <Link
                  to="/find-services"
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-center flex flex-col justify-center items-center gap-2 text-xs font-bold text-white uppercase hover:text-[#00D084] transition-all cursor-pointer"
                >
                  <MapPin className="w-5 h-5 text-[#00D084]" />
                  Find Centers Near You
                </Link>
              </div>
            </div>
          </div>

          <Footer />

        </div>
      </div>
    </div>
  );
}

interface CityCustomDropdownProps {
  currentCityName: string;
  currentCityState: string;
  onSelectCity: (cityName: string) => void;
}

export function CityCustomDropdown({ currentCityName, currentCityState, onSelectCity }: CityCustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full z-30">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#050907] border-2 border-white/10 hover:border-[#00D084]/50 rounded-2xl p-4 flex items-center justify-between transition-all cursor-pointer shadow-lg group"
      >
        <div className="flex items-center gap-3.5 text-left">
          <div className="w-10 h-10 rounded-xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] shrink-0 group-hover:scale-105 transition-transform duration-300">
            <Compass className="w-5 h-5 text-[#00D084]" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-white/40 block font-bold uppercase tracking-wider">
              CURRENT LOCATION CORRIDOR
            </span>
            <span className="font-extrabold text-white text-base font-sans tracking-tight">
              {currentCityName} <span className="text-xs font-normal text-white/50 bg-white/5 px-2 py-0.5 rounded-md border border-white/10 ml-1.5">{currentCityState}</span>
            </span>
          </div>
        </div>

        <ChevronDown className={`w-5 h-5 text-white/40 group-hover:text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Floating Options Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#050c08]/95 backdrop-blur-xl border border-[#00D084]/30 rounded-2xl p-4 shadow-2xl overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D084]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CITIES_RADAR.map((city) => {
                const isSelected = city.name.toLowerCase() === currentCityName.toLowerCase();
                return (
                  <button
                    key={city.name}
                    onClick={() => {
                      onSelectCity(city.name);
                      setIsOpen(false);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between items-start gap-2.5 cursor-pointer relative group ${
                      isSelected
                        ? "bg-[#00D084]/15 border-[#00D084] text-[#00D084]"
                        : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-[#00D084] transition-colors font-sans">
                        {city.name}
                      </span>
                      <span className="text-[9px] font-mono text-white/40 block font-bold uppercase tracking-wider">
                        {city.state}
                      </span>
                    </div>

                    <div className="flex items-center justify-between w-full pt-1 border-t border-white/5">
                      <span className="text-[10px] text-white/50 font-sans">
                        {city.hubCount} Hubs Live
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        isSelected
                          ? "bg-[#00D084]/20 text-[#00D084]"
                          : "bg-white/5 text-white/40 group-hover:text-[#00D084]/70 group-hover:bg-[#00D084]/10"
                      }`}>
                        {city.slots}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
