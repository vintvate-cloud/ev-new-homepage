import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  MapPin,
  CalendarCheck,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Building2,
  Phone,
  Clock,
  Wrench,
  Sparkles,
  ExternalLink,
  Cpu,
  BatteryCharging,
  Navigation,
} from "lucide-react";
import { toast } from "sonner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getOnboardedCities, onboardNewCity, EVCity, getCityServiceCenters, ServiceCenter } from "../data/cities";
import { CityPreBookingModal, DEFAULT_CITY_SLOTS, PreBookingSlot } from "../components/CityPreBookingModal";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/city/$cityId")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      service: typeof search?.service === "string" ? search.service : undefined,
      brand: typeof search?.brand === "string" ? search.brand : undefined,
      searchArea: typeof search?.searchArea === "string" ? search.searchArea : undefined,
    };
  },
  component: CityPageComponent,
});

function CityPageComponent() {
  const { cityId } = Route.useParams();
  const { service, brand, searchArea } = Route.useSearch();
  const [citiesList, setCitiesList] = useState<EVCity[]>(getOnboardedCities());
  const [preBookingModalOpen, setPreBookingModalOpen] = useState(false);

  const heroTextRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const cardsUpRef = useRef<HTMLDivElement>(null);
  const cardsRightRef = useRef<HTMLDivElement>(null);

  // Sync cities list if updated via window event or storage
  useEffect(() => {
    const handleUpdate = () => setCitiesList(getOnboardedCities());
    window.addEventListener("ev_cities_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("ev_cities_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Find city in onboarded cities database
  const currentCity = citiesList.find(
    (c) => c.id.toLowerCase() === cityId.toLowerCase()
  );

  if (!currentCity) {
    const formattedName = cityId
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return (
      <div className="min-h-screen bg-[#070908] text-white flex flex-col justify-between font-sans selection:bg-[#00D084] selection:text-black">
        <Nav />
        
        <div className="max-w-3xl mx-auto px-6 py-32 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto text-2xl shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            📍
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Service Unavailable in <span className="text-[#00D084]">{formattedName}</span>
          </h1>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium">
            MY EV SERVICE hubs are currently active in 6 major metro networks (Pune, Mumbai, Bangalore, Delhi NCR, Hyderabad & Ahmedabad). We have not opened a certified diagnostic center in <strong className="text-white">{formattedName}</strong> yet.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/find-services"
              className="px-6 py-3.5 rounded-xl bg-[#00D084] text-[#020403] font-black uppercase text-xs tracking-wider hover:bg-[#00e08f] transition-all shadow-[0_0_20px_rgba(0,208,132,0.4)]"
            >
              Browse Active Cities →
            </Link>
            
            <button
              onClick={() => toast.success(`Registered your vote to open a MY EV SERVICE hub in ${formattedName}!`)}
              className="px-6 py-3.5 rounded-xl border border-white/20 hover:border-[#00D084] text-white hover:text-[#00D084] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Request Hub in {formattedName}
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // GSAP ScrollTrigger Animations (Identical to Media Page)
  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero text slow fade-out & shrink as content overlay slides up over hero
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

      // 2. Cards container rises up onto the fixed hero section
      gsap.fromTo(
        cardsUpRef.current,
        { y: 120, opacity: 0 },
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

      // 3. Feature cards slide in from the right on further scroll
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
  }, [cityId]);

  // Retrieve custom or preset pre-booking slots for this city
  const cityKey = currentCity.id.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const citySlots: PreBookingSlot[] =
    DEFAULT_CITY_SLOTS[cityKey] ||
    currentCity.areas.map((areaName, i) => ({
      id: `${cityKey}-${i + 1}`,
      area: areaName,
      pincode: `${411000 + (i + 1) * 7}`,
      status: i % 3 === 2 ? "booked" : "available",
    }));

  // Get real-time service centers for this city
  const serviceCenters = getCityServiceCenters(currentCity.name, searchArea);

  return (
    <div className="min-h-screen bg-[#070908] text-white font-sans selection:bg-[#00D084] selection:text-black relative overflow-x-hidden">
      <Nav />

      {/* Main Container */}
      <div className="relative min-h-screen">
        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0 LIKE MEDIA PAGE)
            - 100% Clear Hero Image (No dark shadow overlay layer!)
           ========================================================================= */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background Hero Poster Image - 100% Crystal Clear */}
          <img
            src={currentCity.heroImage}
            alt={currentCity.name}
            className="w-full h-full object-cover object-center opacity-100 pointer-events-none"
          />

          {/* Hero Content Container (Text slowly fades out as cards rise over it) */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center px-6 lg:px-16 max-w-4xl space-y-4 z-10 transition-all pointer-events-none"
          >
            {/* Title - Bold & Clear like Media Page */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              {currentCity.name} EV Hubs
            </h1>

            {/* Description - Bold & Clear like Media Page */}
            <p className="text-lg sm:text-xl font-bold text-white leading-relaxed max-w-2xl drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
              {currentCity.description}
            </p>

            <div className="pointer-events-auto pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setPreBookingModalOpen(true)}
                className="px-8 py-4 rounded-2xl bg-[#00D084] hover:bg-[#00e08f] text-black font-black uppercase text-xs tracking-widest transition-all cursor-pointer shadow-[0_10px_30px_rgba(0,208,132,0.4)] hover:scale-[1.03] flex items-center gap-2"
              >
                <CalendarCheck className="w-5 h-5" />
                PRE-BOOK SLOT IN {currentCity.name.toUpperCase()}
              </button>
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
          {/* VERIFIED NEAREST SERVICE CENTERS RISING UP ANIMATEDLY (GSAP SCRUBBED OVER HERO) */}
          <section ref={cardsUpRef} className="px-6 lg:px-12 py-12 max-w-7xl mx-auto space-y-16">
            
            {/* =========================================================================
                NEAREST SERVICE CENTERS LISTED AT THE VERY TOP
               ========================================================================= */}
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/40 text-[#00D084] text-[10px] font-black uppercase tracking-widest mb-2">
                    <Sparkles className="w-3.5 h-3.5 fill-[#00D084]" /> Real-Time Location Connected
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                    Nearest Service Centers in <span className="text-[#00D084]">{currentCity.name}</span>
                  </h2>
                  <p className="text-white/70 text-sm mt-1 max-w-xl font-medium">
                    Detected certified EV workshops sorted by real-time proximity. 100% genuine OEM spares & battery diagnostic bays on duty.
                  </p>
                </div>

                {searchArea && (
                  <div className="px-4 py-2 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs font-mono font-bold text-white/90">
                    Searching near: <span className="text-[#00D084] font-black">{searchArea}</span>
                    {brand && <span className="text-white/60 ml-2">• Brand: {brand}</span>}
                    {service && <span className="text-white/60 ml-2">• Service: {service}</span>}
                  </div>
                )}
              </div>

              {/* Nearest Centers Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {serviceCenters.map((center) => (
                  <div
                    key={center.id}
                    className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-300 p-6 md:p-7 flex flex-col justify-between space-y-6 ${
                      center.isNearest
                        ? "border-[#00D084] bg-gradient-to-br from-[#03190e] via-[#052418] to-[#020503] shadow-[0_0_50px_rgba(0,208,132,0.3)] scale-[1.01]"
                        : "border-white/15 bg-[#050907] hover:border-[#00D084]/60"
                    }`}
                  >
                    {center.isNearest && (
                      <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-[#00D084] text-[#020403] text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 fill-[#020403]" /> 🏆 NEAREST CERTIFIED HUB • {center.distanceKm} KM AWAY
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4 pt-2">
                        <div>
                          <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                            {center.name}
                          </h3>
                          <p className="text-xs text-white/70 font-medium flex items-center gap-1.5 mt-1.5">
                            <MapPin className="w-4 h-4 text-[#00D084] shrink-0" />
                            {center.address}
                          </p>
                        </div>
                        
                        {!center.isNearest && (
                          <span className="shrink-0 text-xs font-mono font-bold text-[#00D084] bg-[#00D084]/15 px-3 py-1 rounded-full border border-[#00D084]/30">
                            📍 {center.distanceKm} km
                          </span>
                        )}
                      </div>

                      {/* Quick Metrics Bar */}
                      <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
                        <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                          ★ {center.rating} ({center.reviewsCount} reviews)
                        </span>
                        <span className="flex items-center gap-1 text-[#00D084] font-bold bg-[#00D084]/10 px-2.5 py-1 rounded-lg border border-[#00D084]/20">
                          ⚡ {center.baysAvailable} Bays Available
                        </span>
                        <span className="flex items-center gap-1 text-white/80 font-bold bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                          👨‍🔧 {center.techniciansOnDuty} Certified Techs
                        </span>
                      </div>

                      {/* Brands Serviced */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] text-white/50 font-bold block uppercase tracking-wider">
                          Supported Brands:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {center.brandsServiced.map((b, i) => (
                            <span
                              key={i}
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                brand && b.toLowerCase().includes(brand.toLowerCase())
                                  ? "bg-[#00D084] text-[#020403] border-[#00D084] font-black"
                                  : "bg-white/10 text-white/90 border-white/15"
                              }`}
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <a
                        href={center.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-[#00D084] text-xs font-bold text-white hover:text-[#00D084] transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5 text-[#00D084]" /> Get Directions
                      </a>

                      <a
                        href={`tel:${center.phone.replace(/\s+/g, "")}`}
                        className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-[#00D084] text-xs font-bold text-white hover:text-[#00D084] transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#00D084]" /> Call Hub
                      </a>

                      <button
                        onClick={() => {
                          toast.success(`Booking slot selected for ${center.name}`);
                          setPreBookingModalOpen(true);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,208,132,0.4)]"
                      >
                        <CalendarCheck className="w-3.5 h-3.5 fill-[#020403]" /> Book Appointment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* =========================================================================
                AREA CLUSTERS DIRECTORY
               ========================================================================= */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                    HUB DIRECTORY
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-white mt-2 tracking-tight">
                    {currentCity.name} Area Service Clusters
                  </h2>
                  <p className="text-white/60 text-sm mt-1">
                    Select your nearby cluster to check doorstep service & diagnostic center status.
                  </p>
                </div>

                <button
                  onClick={() => setPreBookingModalOpen(true)}
                  className="px-6 py-3 rounded-full border border-[#00D084]/40 bg-[#00D084]/10 text-[#00D084] text-xs font-mono font-bold hover:bg-[#00D084] hover:text-black transition-all cursor-pointer w-fit flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Pre-Booking Directory
                </button>
              </div>

              {/* Areas Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentCity.areas.map((area, idx) => {
                  const slot = citySlots[idx] || {
                    area,
                    pincode: `${411000 + (idx + 1) * 7}`,
                    status: idx % 2 === 0 ? "available" : "booked",
                  };

                  return (
                    <div
                      key={idx}
                      className="bg-[#050907] border border-white/10 hover:border-[#00D084]/60 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-2xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084]">
                            <MapPin className="w-5 h-5" />
                          </div>

                          <span className="text-[11px] font-mono font-bold text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            PIN: {slot.pincode}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white group-hover:text-[#00D084] transition-colors">
                          {area}
                        </h3>

                        <div className="mt-3 flex items-center gap-2">
                          {slot.status === "available" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] animate-pulse" />
                              AVAILABLE
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/10 text-white/40 border border-white/10">
                              BOOKED
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-white/50 font-mono">Hub Cluster #0{idx + 1}</span>
                        <button
                          onClick={() => setPreBookingModalOpen(true)}
                          className="text-xs font-bold text-[#00D084] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Check Slot</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SLIDING IN FEATURE CARDS (GSAP SCRUBBED FROM RIGHT) */}
          <section ref={cardsRightRef} className="px-6 lg:px-12 py-16 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                  HUB INFRASTRUCTURE
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
                  Certified Standards in {currentCity.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center text-[#00D084]">
                    <BatteryCharging className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Active Cell Balancing</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Automated high-voltage active battery balancing restoring 95%+ original battery pack health.
                  </p>
                </div>

                <div className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center text-[#00D084]">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">BMS Firmware Flashing</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Official multi-brand ECU scanner updates ensuring error-free thermal shutdown thresholds.
                  </p>
                </div>

                <div className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center text-[#00D084]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">100% Refundable Slot</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Pre-booking slot tokens guarantee priority doorstep service with 100% money-back policy.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </div>

      {/* Pre-Booking Modal Popup */}
      <CityPreBookingModal
        isOpen={preBookingModalOpen}
        onClose={() => setPreBookingModalOpen(false)}
        cityName={currentCity.name}
        initialSlots={citySlots}
      />
    </div>
  );
}
