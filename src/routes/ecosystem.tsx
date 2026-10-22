import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

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
                to="/become-our-partner"
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
                <span>›</span>
                <span className="text-[#00D084]">Ecosystem</span>
              </nav>
            </div>

            {/* S1: Hub-and-Spoke Interactive Diagram (ECO-003) */}
            <section className="pt-6 pb-12 max-w-5xl mx-auto px-6">
            <div className="p-8 sm:p-12 rounded-[32px] bg-[#07110B] border border-white/15 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,208,132,0.1),transparent_70%)] pointer-events-none" />
              
              <div className="text-[10px] font-mono text-[#00D084] uppercase tracking-widest mb-6 font-bold">
                The Operating System for India's EV Aftermarket Economy
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Left: Who We Serve */}
                <div className="space-y-3 text-left">
                  <div className="text-xs font-mono text-white/40 uppercase tracking-wider mb-2">Who We Serve</div>
                  {[
                    { title: "EV Owners", desc: "Book, track & get battery reports on phone" },
                    { title: "Fleet Operators", desc: "Uptime telemetry, scheduled AMC, single invoice" },
                    { title: "EV Brands (OEMs)", desc: "Warranty jobs, PDI & field failure API data" },
                  ].map((node) => (
                    <div key={node.title} className="p-4 rounded-2xl bg-[#0b1610] border border-white/10">
                      <div className="text-sm font-bold text-white mb-0.5">{node.title}</div>
                      <div className="text-[11px] text-white/60 leading-tight">{node.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Center: Autobot OS Core */}
                <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0D5C2E]/40 to-[#07110B] border-2 border-[#00D084] shadow-[0_0_40px_rgba(0,208,132,0.2)] text-center relative">
                  <div className="w-12 h-12 rounded-2xl bg-[#00D084] text-black mx-auto mb-3 flex items-center justify-center font-black">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-1">Autobot OS</h3>
                  <span className="text-[10px] font-mono font-bold text-[#F5A623] uppercase block mb-3">Core AI + Automation</span>
                  <div className="flex flex-wrap justify-center gap-1.5 text-[9px] font-mono text-white/80">
                    <span className="px-2 py-0.5 rounded bg-white/10">AI Diagnostics</span>
                    <span className="px-2 py-0.5 rounded bg-white/10">Auto-Scheduling</span>
                    <span className="px-2 py-0.5 rounded bg-white/10">QR Parts</span>
                    <span className="px-2 py-0.5 rounded bg-white/10">SLA Monitor</span>
                    <span className="px-2 py-0.5 rounded bg-white/10">GST Billing</span>
                  </div>
                </div>

                {/* Right: Who Delivers */}
                <div className="space-y-3 text-right md:text-left">
                  <div className="text-xs font-mono text-white/40 uppercase tracking-wider mb-2">Who Delivers</div>
                  {[
                    { title: "Certified Technicians", desc: "HV safety certified via Autobot Academy" },
                    { title: "Centres & Hubs", desc: "Garage, Centre & Hub formats with set tooling" },
                    { title: "EV Spare Hub", desc: "Centralized inventory tracked to every bay" },
                  ].map((node) => (
                    <div key={node.title} className="p-4 rounded-2xl bg-[#0b1610] border border-white/10">
                      <div className="text-sm font-bold text-white mb-0.5">{node.title}</div>
                      <div className="text-[11px] text-white/60 leading-tight">{node.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

      {/* S2: What is the Ecosystem? */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
              Our Blueprint
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-6">
              What is the MY EV Service Ecosystem?
            </h2>
            <div className="space-y-6 text-sm text-white/70 font-light leading-relaxed">
              <div className="p-5 rounded-2xl bg-[#080d0a] border border-white/10">
                <h3 className="text-base font-bold text-white mb-1.5">India's First EV Service Super Market (SSM)</h3>
                <p>Everything an EV needs after purchase, under one trusted brand: diagnostics, repairs, preventive maintenance, parts, accessories and battery care.</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#080d0a] border border-white/10">
                <h3 className="text-base font-bold text-white mb-1.5">A Unified Platform for Owners, Businesses and Providers</h3>
                <p>Owners book and track, centres operate, suppliers fulfil and fleets manage, all interconnected through real-time Autobot OS data channels.</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#07110B] border border-white/10 space-y-6">
            <span className="text-[11px] font-mono text-[#F5A623] uppercase font-bold tracking-widest block">The Market Gap</span>
            <h3 className="text-2xl font-bold text-white leading-tight">
              Rapid EV Adoption but Limited Service Infrastructure
            </h3>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              In Pune alone, EV registrations rose from 12,737 in FY 2024–25 to 37,808 in FY 2025–26 (Pune RTO). Brand centres serve single makes with long queues, while traditional roadside mechanics lack high-voltage diagnostic tools.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 font-mono">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-2xl font-black text-[#00D084] block">37,808</span>
                <span className="text-[10px] text-white/50 uppercase">Pune RTO EVs (FY 25–26)</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-2xl font-black text-[#F5A623] block">~3×</span>
                <span className="text-[10px] text-white/50 uppercase">Year-over-Year Growth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S5: 5 Key Components */}
      <section className="py-20 px-6 bg-[#040805] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
              Core Pillars
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Key Components of the MY EV Service Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                title: "EV Service Centres Network",
                desc: "Franchise-owned Garages, Centres and Hubs built to one engineering standard.",
                icon: Building2,
              },
              {
                title: "EV Charging Infrastructure",
                desc: "Fast charging at hubs for walk-in customers and delivery fleets.",
                icon: BatteryCharging,
              },
              {
                title: "EV Spare Parts Supply Chain",
                desc: "Central sourcing and compatibility verification with fast dispatch to centres.",
                icon: Store,
              },
              {
                title: "Battery Lifecycle Services",
                desc: "Health checks, cell balancing, module repair and certified second-life reuse.",
                icon: Activity,
              },
              {
                title: "Fleet Maintenance & Mobility",
                desc: "Annual contracts, predictive audits and priority bays for EV commercial fleets.",
                icon: Truck,
              },
            ].map((col) => {
              const Icon = col.icon;
              return (
                <div key={col.title} className="p-6 rounded-2xl bg-[#080d0a] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2 leading-snug">{col.title}</h3>
                    <p className="text-xs text-white/60 leading-relaxed font-light">{col.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* S7: Who Can Join */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            Partnership Opportunities
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Who Can Join the MY EV Service Ecosystem?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "EV Service Centres & Garages",
              desc: "Convert or upgrade your existing two-wheeler workshop into a branded, high-tech EV hub.",
              action: "Convert Centre",
              href: "/become-our-partner",
            },
            {
              title: "EV Charging Infrastructure Providers",
              desc: "Co-locate chargers at our hubs, or add certified vehicle service to your existing charge-points.",
              action: "Co-locate Charging",
              href: "/become-our-partner",
            },
            {
              title: "Fleet Operators & Logistics",
              desc: "Plug your commercial fleet directly into our scheduled preventive maintenance network.",
              action: "Connect Fleet",
              href: "/fleet",
            },
            {
              title: "EV Spare Parts Suppliers",
              desc: "Supply into EV Spare Hub and reach hundreds of service bays across India.",
              action: "Supply Parts",
              href: "/become-our-partner",
            },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-[#080d0a] border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed font-light mb-6">{item.desc}</p>
              </div>
              <Link
                to={item.href}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#00D084] hover:text-white transition-colors"
              >
                <span>{item.action}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

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
              to="/become-our-partner"
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
