import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import { EcosystemHubVisualizer } from "../components/ecosystem/EcosystemHubVisualizer";
import { EcosystemPartnersCarousel } from "../components/ecosystem/EcosystemPartnersCarousel";
import {
  ShieldCheck,
  Building2,
  CalendarCheck,
  Cpu,
  Zap,
  ArrowRight,
  TrendingUp,
  Wrench,
  Layers,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  BatteryCharging,
  Network,
  Truck,
  Car,
  Users,
  Store,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: "EV Service Ecosystem Platform India | MY EV SERVICE" },
      {
        name: "description",
        content:
          "MY EV SERVICE connects EV owners, service centres, charging, spare parts and fleets on one platform: India's integrated EV service ecosystem.",
      },
      { name: "keywords", content: "EV Service Ecosystem India, EV service platform, electric vehicle service infrastructure, EV charging and service, Autobot OS" },
      { property: "og:title", content: "EV Service Ecosystem Platform India | MY EV SERVICE" },
      { property: "og:description", content: "MY EV SERVICE connects EV owners, service centres, charging, spare parts and fleets on one platform." },
      { property: "og:image", content: "/assets/images/ev-service-ecosystem.jpg" },
    ],
  }),
  component: EcosystemPage,
});

export const ECOSYSTEM_HERO_BG = "/ecosystem/edge.jpg";

export function EcosystemPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const heroTextRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const contentUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title-reveal",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-sub-reveal",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, delay: 0.2, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-btn-reveal",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.9, delay: 0.4, ease: "power3.out" }
      );

      gsap.to(".services-bg-img", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: contentOverlayRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });

      if (heroTextRef.current && contentOverlayRef.current) {
        gsap.to(heroTextRef.current, {
          opacity: 0,
          scale: 0.9,
          y: -50,
          ease: "power1.out",
          scrollTrigger: {
            trigger: contentOverlayRef.current,
            start: "top 95%",
            end: "top 35%",
            scrub: 0.6,
          },
        });
      }

      if (contentUpRef.current) {
        gsap.fromTo(
          contentUpRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentUpRef.current,
              start: "top 95%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".ecosystem-reveal").forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084]/30 selection:text-[#00D084]">
      <Nav theme="dark" onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Main Container matching Services page architecture */}
      <div className="relative min-h-screen">

        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0)
           ========================================================================= */}
        <div className="page-hero fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background image with parallax zoom */}
          <div
            className="services-bg-img absolute inset-0 bg-cover bg-center opacity-70 pointer-events-none scale-105 transition-all duration-700"
            style={{
              backgroundImage: `url('${ECOSYSTEM_HERO_BG}')`,
            }}
          />
          {/* Subtle blur & darkening layer for optimal text readability */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.2)_70%,transparent_100%)] pointer-events-none" />

          <div
            ref={heroTextRef}
            className="max-w-4xl mx-auto text-center relative z-10 px-6 space-y-4 pointer-events-auto"
          >
            <span className="hero-sub-reveal text-xs font-mono font-bold uppercase tracking-widest text-[#00D084]">
              • Technology Platform · Autobot OS
            </span>
            <h1 className="hero-title-reveal text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
              India's First Integrated <br className="hidden sm:block" />
              <span className="text-[#00D084]">EV Service Ecosystem Platform</span>
            </h1>
            <p className="hero-sub-reveal text-sm sm:text-base md:text-lg text-[#c2d1c7] font-light max-w-2xl mx-auto leading-relaxed">
              Service centres, charging, spare parts, fleets and technology, connected so every EV gets proper care and every partner grows with the national network.
            </p>
            <div className="hero-btn-reveal pt-3 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/franchise"
                className="whitespace-nowrap inline-flex items-center shrink-0 gap-2 px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] cursor-pointer hover:scale-105"
              >
                <span>JOIN THE ECOSYSTEM</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <button
                onClick={() => setBookingModalOpen(true)}
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
              >
                Book EV Service
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. CARDS OVERLAY CONTAINER (SLIDES UP DIRECTLY ON TOP OF THE FIXED HERO)
           ========================================================================= */}
        <div
          ref={contentOverlayRef}
          className="relative z-10 min-h-screen mt-[calc(100vh-80px)] pt-6 rounded-t-[40px] border-t border-white/10 shadow-2xl bg-[#020403]"
        >
          <div ref={contentUpRef}>
            {/* S0: Breadcrumb */}
            <div className="pb-3 px-6 max-w-7xl mx-auto">
              <nav aria-label="breadcrumb" className="text-xs font-mono text-white/50 flex items-center gap-2">
                <Link to="/" className="hover:text-[#00D084] transition-colors">Home</Link>
                <span>&rsaquo;</span>
                <span className="text-[#00D084]">Ecosystem</span>
              </nav>
            </div>

            {/* S1: Hub-and-Spoke Interactive Architecture & Autobot OS Engine */}
            <section className="pt-4 pb-16 max-w-7xl mx-auto px-6">
              <EcosystemHubVisualizer />
            </section>

      {/* S2: What is the Ecosystem? */}
      <section className="ecosystem-reveal py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider font-bold">
              <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
              Our Architecture Blueprint
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              India's First EV Service <br />
              <span className="text-[#00D084]">Super Market (SSM)</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
              Everything an electric vehicle needs after rolling out of the showroom: diagnostics, repairs, preventive maintenance, battery balancing, genuine parts, and charging — unified on one platform.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#08120b] border border-white/10 hover:border-[#00D084]/40 transition-all">
                <span className="text-xs font-mono font-bold text-[#00D084] uppercase block mb-1">01 // SSM Model</span>
                <h4 className="text-sm font-bold text-white mb-1">Multi-Brand Super Market</h4>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  Single destination for 2W & 3W EVs across Ola, Ather, TVS, Bajaj, Mahindra, and fleet commercial makes.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#08120b] border border-white/10 hover:border-[#00D084]/40 transition-all">
                <span className="text-xs font-mono font-bold text-[#F5A623] uppercase block mb-1">02 // Cloud Sync</span>
                <h4 className="text-sm font-bold text-white mb-1">Real-Time Autobot OS Data</h4>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  Owners track on mobile, centres execute in digital bays, and fleets review unified invoices.
                </p>
              </div>
            </div>

            {/* Market Gap Stat Ribbon */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-white/60">PUNE RTO EV GROWTH:</span>
              <span className="text-white font-bold">12,737 → 37,808 EVs (~3× YoY)</span>
              <span className="text-[#00D084] font-bold">HIGH DEMAND</span>
            </div>
          </div>

          {/* Right: High-Resolution Photographic Editorial Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 group shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <img 
                src="/ecosystem/edge.jpg" 
                alt="CAN-bus Battery Diagnostic Lab" 
                className="w-full aspect-[4/3] object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />
              
              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-white/90">
                <span className="w-2 h-2 rounded-full bg-[#00D084] animate-ping" />
                <span>CAN-BUS DIAGNOSTIC FACILITY</span>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="text-left">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#00D084] font-bold">Standardized Facility</div>
                  <div className="text-sm font-bold text-white">Flagship Master Workshop Bay</div>
                </div>
                <span className="text-[10px] font-mono font-bold text-black bg-[#00D084] px-3 py-1.5 rounded-xl shadow-md">
                  ✓ 36-PT SAFETY VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* S5: 5 Key Components with Real Cinematic Imagery */}
      <section className="ecosystem-reveal py-20 px-6 bg-[#030704] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-3">
              Core Physical & Digital Infrastructure
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              5 Pillars Powering the Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-light mt-2 max-w-xl mx-auto">
              Every pillar is digitally connected to Autobot OS, guaranteeing consistent engineering standards nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                title: "EV Service Centres Network",
                desc: "Certified Garages, Centres and Master Hubs equipped with HV lifts, scanners, and safety gear.",
                icon: Building2,
                image: "/ev-master-workshop-hero.png",
                stat: "240+ Bays",
                tag: "1000V SAFETY",
              },
              {
                title: "EV Charging Infrastructure",
                desc: "Fast DC charging co-located at hubs for quick top-ups, walk-ins, and delivery fleets.",
                icon: BatteryCharging,
                image: "/ai-gallery/ev_charging_hub.png",
                stat: "180+ Guns",
                tag: "60-120kW DC",
              },
              {
                title: "EV Spare Parts Supply Chain",
                desc: "Centralized sourcing warehouse with RFID inventory tracking and express 2-hour bay delivery.",
                icon: Store,
                image: "/franchise-banner-building.png",
                stat: "12,500+ SKUs",
                tag: "RFID TRACKED",
              },
              {
                title: "Battery Lifecycle Services",
                desc: "SoH diagnostics, cell balancing, module rebuilds, and certified second-life repurposing.",
                icon: Activity,
                image: "/gallery/battery-lab.png",
                stat: "14,820+ Packs",
                tag: "CAN-BUS AI",
              },
              {
                title: "Fleet Mobility Command",
                desc: "Predictive maintenance AMCs, overnight charging routines, and dedicated priority bays for fleets.",
                icon: Truck,
                image: "/ai-gallery/ev_workshop_bay.png",
                stat: "8,200+ EVs",
                tag: "98.5% UPTIME",
              },
            ].map((col) => {
              const Icon = col.icon;
              return (
                <div 
                  key={col.title} 
                  className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#00D084]/50 transition-all duration-500 shadow-xl flex flex-col justify-between min-h-[380px] p-6 text-left"
                >
                  {/* Real Background Image with Dark Cinematic Gradient */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <img 
                      src={col.image} 
                      alt={col.title} 
                      className="w-full h-full object-cover filter brightness-[0.4] group-hover:brightness-[0.5] group-hover:scale-110 transition-all duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-[#020503]/80 to-transparent" />
                  </div>
                  
                  {/* Top Bar with Icon and Tag */}
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#00D084] group-hover:bg-[#00D084] group-hover:text-black transition-all shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-white/70 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 group-hover:border-[#00D084]/40 group-hover:text-[#00D084] transition-all">
                      {col.tag}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-[#00D084] transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed font-light mb-4">
                      {col.desc}
                    </p>
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-white/40 uppercase">Scale:</span>
                      <strong className="text-[#00D084] font-bold">{col.stat}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* S7: Who Can Join - Reference-style interactive carousel */}
      <EcosystemPartnersCarousel />

      {/* S9: Closing CTA */}
      <section className="py-16 px-6 bg-[#0D5C2E] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Join India's EV Service Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Service centres, charging, parts and fleets on one connected platform. Accelerate your EV business today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/franchise"
              className="px-8 py-4 rounded-full bg-white text-[#020403] font-black text-xs uppercase tracking-widest hover:bg-white/90 shadow-2xl transition-all"
            >
              Become an Ecosystem Partner
            </Link>
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-8 py-4 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
            >
              Book EV Service
            </button>
          </div>
        </div>
      </section>
          </div>
        </div>
      </div>

      <Footer />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </main>
  );
}