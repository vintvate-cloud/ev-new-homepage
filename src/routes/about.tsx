import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  ABOUT_STATS,
  TIMELINE_DATA,
  LEADERSHIP_TEAM,
  ROADMAP_PHASES,
  DUAL_PILLARS,
} from "../data/aboutData";
import {
  Zap,
  Building2,
  Globe,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  UserCheck,
  MapPin,
  Star,
  Activity,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  const [openTimelineIndex, setOpenTimelineIndex] = useState<number | null>(
    TIMELINE_DATA.length - 1
  );
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Animation Refs
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardsOverlayRef = useRef<HTMLDivElement>(null);
  const cardsUpRef = useRef<HTMLDivElement>(null);
  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const leftPillarRef = useRef<HTMLDivElement>(null);
  const rightPillarRef = useRef<HTMLDivElement>(null);
  const leftTimelineRef = useRef<HTMLDivElement>(null);
  const rightTimelineRef = useRef<HTMLDivElement>(null);
  const ctaBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GSAP ScrollTrigger Animations (Senior UI Developer Animation Suite)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Sticky Hero Parallax & Fade-out as user scrolls
      gsap.to(heroImageRef.current, {
        scale: 1.25,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: cardsOverlayRef.current,
          start: "top 100%",
          end: "top 20%",
          scrub: 0.8,
        },
      });

      gsap.to(heroTextRef.current, {
        opacity: 0,
        scale: 0.88,
        y: -70,
        ease: "power1.out",
        scrollTrigger: {
          trigger: cardsOverlayRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: 0.6,
        },
      });

      // 2. Main Content Overlay Layer Entrance
      gsap.fromTo(
        cardsUpRef.current,
        { y: 140, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsUpRef.current,
            start: "top 92%",
            end: "top 45%",
            scrub: 0.6,
          },
        }
      );

      // 3. Who We Are Section Fade & Rise
      gsap.fromTo(
        whoWeAreRef.current,
        { y: 90, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: whoWeAreRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 0.5,
          },
        }
      );

      // 4. Stats Section Reveal
      gsap.fromTo(
        statsSectionRef.current,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsSectionRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.5,
          },
        }
      );

      // 5. Dual Pillar Cards Sliding In from Left & Right (Matching Timeline)
      gsap.fromTo(
        leftPillarRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: leftPillarRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        rightPillarRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rightPillarRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.5,
          },
        }
      );

      // 6. Timeline Columns Sliding In from Left & Right
      gsap.fromTo(
        leftTimelineRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: leftTimelineRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        rightTimelineRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rightTimelineRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.5,
          },
        }
      );

      // 6. Panoramic CTA Banner Zoom Reveal
      gsap.fromTo(
        ctaBannerRef.current,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaBannerRef.current,
            start: "top 90%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#030504] text-white selection:bg-[#00D084] selection:text-black font-sans relative overflow-x-hidden">
      {/* Navigation Header */}
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Main Container */}
      <div className="relative min-h-screen">

        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0)
           ========================================================================= */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-[#020403] z-0 flex items-center justify-center">
          {/* Cool Blurry EV Poster Image with Parallax Zoom */}
          <img
            ref={heroImageRef}
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1920&auto=format&fit=crop&q=85"
            alt="MY EV SERVICE Network Hero"
            className="w-full h-full object-cover object-center filter blur-sm scale-105 opacity-60 pointer-events-none transition-all duration-300"
          />

          {/* Ambient Lighting Overlays */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-[#00D084]/20 rounded-full blur-[190px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030504] via-black/50 to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,5,4,0.85)_100%)] pointer-events-none" />

          {/* Hero Content Container (Fades & Scales out via GSAP as cards rise) */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 lg:px-16 max-w-4xl mx-auto space-y-6 z-10 transition-all pointer-events-none"
          >
            {/* Title - Bold & Clear */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] text-white leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
            >
              Powering India's <br />
              <span className="text-[#00D084] drop-shadow-[0_0_35px_rgba(0,208,132,0.5)]">Next Generation</span> EV Network
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-xl font-medium text-white/85 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]"
            >
              A technology-driven multi-brand electric vehicle service network built to support the rapidly growing electric mobility ecosystem in India.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2 pointer-events-auto"
            >
              <Link
                to="/franchise"
                className="px-8 py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-extrabold uppercase tracking-wider hover:bg-[#00e08f] hover:scale-105 shadow-[0_0_30px_rgba(0,208,132,0.4)] transition-all cursor-pointer flex items-center gap-2"
              >
                Become a Partner <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white text-xs font-bold hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all flex items-center gap-2"
              >
                Collaborate With Us <Globe className="w-4 h-4 text-[#00D084]" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* =========================================================================
            2. CARDS OVERLAY LAYER (SLIDES UP DIRECTLY ON TOP OF THE FIXED HERO)
           ========================================================================= */}
        <div
          ref={cardsOverlayRef}
          className="relative z-10 bg-[#030504] min-h-screen mt-[calc(100vh-80px)] pt-12 rounded-t-[40px] border-t border-white/10 shadow-2xl space-y-24 px-6 lg:px-12 pb-20"
        >
          
          {/* Introduction Card Section (Animated Upwards with GSAP) */}
          <section ref={cardsUpRef} className="pt-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D084]/10 border border-[#00D084]/20 text-xs font-semibold text-[#00D084] mb-6">
                <Building2 className="w-3.5 h-3.5" />
                Who We Are
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                Bridging the Critical Gap in India's EV Service Industry
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-light mb-6">
                As electric vehicles become mainstream across urban and rural landscapes, the need for professional EV servicing, certified high-voltage technicians, and reliable digital operations infrastructure is growing exponentially. MY EV SERVICE is built to address this critical gap by establishing a nationwide multi-brand EV service network powered by technology, intensive training, and an active ecosystem platform.
              </p>
              <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
                Our mission is to create India's most trusted EV service infrastructure while empowering a new generation of EV entrepreneurs, mechanics, and logistics professionals. The entire network runs on Autobot OS—our proprietary AI-driven operations platform that simplifies bookings, service workflows, vehicle diagnostics, spare parts fulfillment, and customer communications.
              </p>
            </div>
          </section>

          {/* =========================================================================
              WHO WE ARE (SPLIT CARD WITH OVERLAPPING GALLERY & FEATURES)
             ========================================================================= */}
          <section ref={whoWeAreRef} className="max-w-7xl mx-auto">
            <div className="bg-[#080d0a]/90 border border-white/10 rounded-[36px] p-8 sm:p-12 lg:p-14 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D084]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column: Overlapping Dual Image Stack */}
                <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
                  
                  {/* Back Image Frame */}
                  <motion.div
                    whileHover={{ scale: 1.04, rotate: -1.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute top-0 left-0 w-[72%] h-[82%] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black cursor-pointer"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&auto=format&fit=crop&q=80"
                      alt="Astronomical Tech Night"
                      className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </motion.div>

                  {/* Front Overlapping Image Frame */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -8, rotate: 1.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute bottom-0 right-0 w-[68%] h-[82%] rounded-3xl overflow-hidden border-2 border-[#00D084]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#0b120e] z-10 cursor-pointer"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
                      alt="EV Diagnostic Technician"
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    
                    {/* Floating Tag */}
                    <motion.div
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-4 left-4 right-4 px-3.5 py-2.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 flex items-center gap-2.5 shadow-lg"
                    >
                      <Activity className="w-4 h-4 text-[#00D084] shrink-0" />
                      <span className="text-[11px] font-mono font-bold text-white">Autobot OS AI Diagnostics</span>
                    </motion.div>
                  </motion.div>

                </div>

                {/* Right Column: Content & Features Grid */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                      Who We Are
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 leading-tight">
                      A Community Of EV Engineers & Pioneers
                    </h2>
                  </div>

                  <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                    As electric vehicles become mainstream across urban and rural landscapes, MY EV SERVICE provides the critical service, digital diagnostics, high-voltage battery safety, and technician training infrastructure needed for seamless adoption.
                  </p>

                  {/* 4-Item Checklist Feature Grid with Staggered Viewport Entrance */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {[
                      { icon: UserCheck, label: "Multi-Brand EV OS" },
                      { icon: ShieldCheck, label: "HV Safety Certified" },
                      { icon: MapPin, label: "24/7 RSA Mobile Vans" },
                      { icon: Star, label: "Zero Franchise Fee" },
                    ].map((feat, idx) => {
                      const IconComponent = feat.icon;
                      return (
                        <motion.div
                          key={feat.label}
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.1, ease: "easeOut" }}
                          className="flex items-start gap-2.5 group"
                        >
                          <IconComponent className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium text-white/90 group-hover:text-[#00D084] transition-colors">{feat.label}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Action CTA Button */}
                  <div className="pt-4">
                    <Link
                      to="/find-services"
                      className="inline-flex px-8 py-3.5 rounded-full bg-white/10 hover:bg-[#00D084] text-white hover:text-black border border-white/20 hover:border-[#00D084] text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer items-center gap-2 group"
                    >
                      Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* =========================================================================
              STATS & IMPACT (2x2 STATS LAYOUT)
             ========================================================================= */}
          <section ref={statsSectionRef} className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Heading & Description */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                  About Us
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                  EV Infrastructure For Everyone
                </h2>
                <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                  We empower local workshop entrepreneurs, certified EV technicians, and commercial fleet operators through an integrated tech stack and nationwide support network.
                </p>
              </div>

              {/* Right Column: 2x2 Big Stat Cards Grid */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-8 bg-[#070b09] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-xl">
                {[
                  { value: "15,000+", label: "Learners & Techs Trained" },
                  { value: "10+", label: "Years EV Ecosystem Experience" },
                  { value: "40+", label: "Cities Franchise Outlets" },
                  { value: "300+", label: "Workshops & Tech Programs" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.04, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="p-4 rounded-2xl border border-transparent hover:border-[#00D084]/30 hover:bg-white/[0.02] transition-all"
                  >
                    <h3 className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight mb-2 hover:text-[#00D084] transition-colors">
                      {stat.value}
                    </h3>
                    <p className="text-xs font-medium text-white/60 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

            </div>
          </section>

          {/* =========================================================================
              DUAL PILLAR ECOSYSTEM FOUNDATION (MATCHING TIMELINE SLIDE-IN ANIMATION)
             ========================================================================= */}
          <section className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                Our Ecosystem Foundation
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
                Built on a Dual Pillar Model
              </h2>
              <p className="text-white/70 text-sm sm:text-base font-light">
                Powered by the combined technical research and digital operations expertise of two specialized organizations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Left Pillar Card (GSAP Scrubbed Slide In) */}
              {DUAL_PILLARS[0] && (
                <div ref={leftPillarRef} className="h-full">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-[#080d0a]/90 border border-white/10 hover:border-[#00D084]/60 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 shadow-xl group h-full"
                  >
                    <div>
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#00D084] mb-2">
                        {DUAL_PILLARS[0].subtitle}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00D084] transition-colors">
                        {DUAL_PILLARS[0].title}
                      </h3>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light mb-6">
                        {DUAL_PILLARS[0].description}
                      </p>

                      <div className="space-y-3 pt-4 border-t border-white/10">
                        {DUAL_PILLARS[0].points.map((pt, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
                            className="flex items-start gap-2.5 text-xs text-white/80 group/item"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                            <span>{pt}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Right Pillar Card (GSAP Scrubbed Slide In) */}
              {DUAL_PILLARS[1] && (
                <div ref={rightPillarRef} className="h-full">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-[#080d0a]/90 border border-white/10 hover:border-[#00D084]/60 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 shadow-xl group h-full"
                  >
                    <div>
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#00D084] mb-2">
                        {DUAL_PILLARS[1].subtitle}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00D084] transition-colors">
                        {DUAL_PILLARS[1].title}
                      </h3>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light mb-6">
                        {DUAL_PILLARS[1].description}
                      </p>

                      <div className="space-y-3 pt-4 border-t border-white/10">
                        {DUAL_PILLARS[1].points.map((pt, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
                            className="flex items-start gap-2.5 text-xs text-white/80 group/item"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                            <span>{pt}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </section>

          {/* =========================================================================
              TIMELINE OF INNOVATION (MATCHING 2-COLUMN STACKED ACCORDION SCREENSHOT)
             ========================================================================= */}
          <section className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                Our Electrification Journey
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
                Timeline of Innovation
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left Column Card Box (GSAP Scrubbed Slide In) */}
              <div ref={leftTimelineRef} className="bg-[#070b09]/90 border border-white/10 rounded-[28px] overflow-hidden divide-y divide-white/10 shadow-2xl backdrop-blur-md">
                {TIMELINE_DATA.slice(0, Math.ceil(TIMELINE_DATA.length / 2)).map((item, idx) => {
                  const globalIndex = idx;
                  const isOpen = openTimelineIndex === globalIndex;
                  return (
                    <div key={item.year} className="group">
                      <button
                        type="button"
                        onClick={() => setOpenTimelineIndex(isOpen ? null : globalIndex)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xs font-mono font-extrabold text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/25 px-2.5 py-1 rounded-lg shrink-0">
                            {item.year}
                          </span>
                          <h4 className="text-sm sm:text-base font-medium tracking-tight text-white group-hover:text-[#00D084] transition-colors truncate">
                            {item.title}
                          </h4>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#00D084] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white shrink-0 transition-colors" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-white/70 font-light leading-relaxed border-t border-white/5 bg-black/20">
                              {item.body}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Right Column Card Box (GSAP Scrubbed Slide In) */}
              <div ref={rightTimelineRef} className="bg-[#070b09]/90 border border-white/10 rounded-[28px] overflow-hidden divide-y divide-white/10 shadow-2xl backdrop-blur-md">
                {TIMELINE_DATA.slice(Math.ceil(TIMELINE_DATA.length / 2)).map((item, idx) => {
                  const globalIndex = Math.ceil(TIMELINE_DATA.length / 2) + idx;
                  const isOpen = openTimelineIndex === globalIndex;
                  return (
                    <div key={item.year} className="group">
                      <button
                        type="button"
                        onClick={() => setOpenTimelineIndex(isOpen ? null : globalIndex)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xs font-mono font-extrabold text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/25 px-2.5 py-1 rounded-lg shrink-0">
                            {item.year}
                          </span>
                          <h4 className="text-sm sm:text-base font-medium tracking-tight text-white group-hover:text-[#00D084] transition-colors truncate">
                            {item.title}
                          </h4>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#00D084] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white shrink-0 transition-colors" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-white/70 font-light leading-relaxed border-t border-white/5 bg-black/20">
                              {item.body}
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

          {/* =========================================================================
              LEADERSHIP & MENTORS
             ========================================================================= */}
          <section className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                Leadership & Mentors
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
                The Minds Behind the Mission
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {LEADERSHIP_TEAM.map((member, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-[#080d0a]/90 border border-white/10 hover:border-[#00D084]/50 rounded-3xl p-8 text-center transition-all duration-300 shadow-xl group cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full bg-[#00D084]/10 border-2 border-[#00D084]/30 flex items-center justify-center text-[#00D084] font-mono font-extrabold text-2xl mx-auto mb-6 shadow-[0_0_25px_rgba(0,208,132,0.25)] group-hover:scale-105 transition-transform">
                    {member.initials}
                  </div>
                  <h4 className="text-xl font-bold text-[#00D084] mb-1">{member.name}</h4>
                  <div className="text-xs font-mono font-bold text-white/80 uppercase tracking-wider mb-2">
                    {member.title}
                  </div>
                  <p className="text-xs text-white/60 font-light">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              PANORAMIC BANNER CTA (LANDSCAPE BANNER)
             ========================================================================= */}
          <section ref={ctaBannerRef} className="max-w-7xl mx-auto pt-6">
            <div className="relative rounded-[36px] overflow-hidden min-h-[320px] flex items-center justify-center text-center p-8 sm:p-14 border border-white/20 shadow-2xl group">
              
              {/* Background High-Tech Cosmic Image with Parallax Scale */}
              <img
                src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=80"
                alt="Panoramic Cosmic EV Banner"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-1000 filter brightness-75 contrast-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 pointer-events-none" />

              {/* Banner Content */}
              <div className="relative z-10 max-w-2xl space-y-4">
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-md">
                  Let's Explore With Us
                </h2>
                <p className="text-xs sm:text-base text-white/80 font-light leading-relaxed max-w-xl mx-auto drop-shadow-sm">
                  Join India's fastest-growing multi-brand EV workshop network. Empower your business with AI diagnostics and 24/7 operational support.
                </p>
                
                <div className="pt-2">
                  <Link
                    to="/franchise"
                    className="inline-block px-8 py-3.5 rounded-full bg-white text-black text-xs font-black uppercase tracking-wider hover:bg-[#00D084] hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all cursor-pointer"
                  >
                    Join Us Now
                  </Link>
                </div>
              </div>

            </div>
          </section>

        </div>
      </div>

      {/* Unified Landing Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}

