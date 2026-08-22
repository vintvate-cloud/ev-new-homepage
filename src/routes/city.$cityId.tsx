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
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getOnboardedCities, onboardNewCity, EVCity } from "../data/cities";
import { CityPreBookingModal, DEFAULT_CITY_SLOTS, PreBookingSlot } from "../components/CityPreBookingModal";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/city/$cityId")({
  component: CityPageComponent,
});

function CityPageComponent() {
  const { cityId } = Route.useParams();
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

  // Find city or auto-generate dynamic city page for backend-onboarded city
  let currentCity = citiesList.find(
    (c) => c.id.toLowerCase() === cityId.toLowerCase()
  );

  if (!currentCity) {
    // Format raw city slug to title case e.g. "nagpur" -> "Nagpur"
    const formattedName = cityId
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    // Auto-create & register new city so city page automatically exists
    currentCity = onboardNewCity({
      id: cityId,
      name: formattedName,
      state: "India",
      centersCount: 5,
      areas: [
        `Central ${formattedName}`,
        `North ${formattedName}`,
        `West ${formattedName}`,
        `East ${formattedName}`,
        `South ${formattedName}`,
      ],
      heroImage:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&auto=format&fit=crop&q=80",
      status: "active",
      description: `Official MY EV SERVICE certified multi-brand EV diagnostic and battery repair hub in ${formattedName}.`,
    });
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

            <div className="pointer-events-auto pt-2">
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
          {/* VERIFIED AREA HUBS RISING UP ANIMATEDLY (GSAP SCRUBBED OVER HERO) */}
          <section ref={cardsUpRef} className="px-6 lg:px-12 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
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
