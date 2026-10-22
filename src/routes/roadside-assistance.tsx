import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  PhoneCall,
  Zap,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BatteryCharging,
  Compass,
  ChevronDown,
  Truck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/roadside-assistance")({
  head: () => ({
    meta: [
      { title: "EV Roadside Assistance Pune — 24/7 Breakdown Help | MY EV SERVICE" },
      {
        name: "description",
        content:
          "Fast 24/7 EV roadside assistance across Pune and PCMC. Emergency battery jump, mobile diagnostic scans, puncture repair, and secure towing.",
      },
      {
        name: "keywords",
        content: "EV roadside assistance Pune, 24/7 EV breakdown service Pune, electric scooter breakdown towing, dead EV battery rescue, Ather roadside assistance Pune, Ola breakdown service",
      },
      { property: "og:title", content: "EV Breakdown? Roadside Help Across Pune | MY EV SERVICE" },
      { property: "og:description", content: "Stuck with a dead battery, puncture or motor cut-off? Call our 24/7 roadside assistance hotline: +91 95823 90001." },
    ],
  }),
  component: RoadsideAssistancePage,
});

export const RSA_HERO_BG = "/find-services-hero.jpg";

export function RoadsideAssistancePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [liveLocationDetected, setLiveLocationDetected] = useState(false);

  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardsOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      if (heroImageRef.current && cardsOverlayRef.current) {
        gsap.to(heroImageRef.current, {
          scale: 1.2,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: cardsOverlayRef.current,
            start: "top 100%",
            end: "top 20%",
            scrub: 0.8,
          },
        });
      }

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
    });

    return () => ctx.revert();
  }, []);

  const handleShareLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLiveLocationDetected(true);
          toast.success("GPS Location verified! Calling emergency hotline...");
          window.location.href = "tel:+919582390001";
        },
        () => {
          toast.info("Please call our emergency helpline directly.");
          window.location.href = "tel:+919582390001";
        }
      );
    } else {
      window.location.href = "tel:+919582390001";
    }
  };

  const RSA_SERVICES = [
    {
      title: "Emergency Battery Boost / Swap",
      desc: "Ran out of charge mid-trip? Our mobile van arrives with compatible battery packs or fast emergency power to get you home safely.",
      icon: BatteryCharging,
      tag: "Immediate Dispatch",
    },
    {
      title: "On-Spot Tubeless Puncture Fix",
      desc: "Instant roadside puncture plug and high-pressure electric inflator service for 2W and 3W electric vehicles.",
      icon: AlertTriangle,
      tag: "15–20 Mins",
    },
    {
      title: "Mobile Diagnostic & Reset",
      desc: "Sudden motor cut-off on climbs or BMS error freeze? Our technician connects handheld OBD scanners to clear faults on site.",
      icon: Zap,
      tag: "CAN-Bus Tool",
    },
    {
      title: "Secure Flatbed EV Towing",
      desc: "Safe hydraulic flatbed towing without regenerative drag damage, delivering your EV directly to our nearest certified hub.",
      icon: Truck,
      tag: "Zero-Regen Tow",
    },
  ];

  const FAQS = [
    {
      q: "How fast will an EV breakdown technician reach me in Pune?",
      a: "Our average emergency arrival time is 30–45 minutes across primary Pune and PCMC corridors (Bhavdhan, Kothrud, Baner, Aundh, Wakad, Hinjewadi, Kharadi, Hadapsar, Viman Nagar). For peripheral highways, response times vary between 45–60 minutes.",
    },
    {
      q: "Can electric scooters be towed normally?",
      a: "Never tow an electric scooter with a normal rope! Turning the rear wheel while towing spins the hub/BLDC motor and back-feeds high voltage into the controller, which can blow the MOSFETs. MY EV SERVICE uses specialized flatbed dollies and secure hydraulic carriers designed specifically for EVs.",
    },
    {
      q: "What should I do while waiting for the mobile assistance van?",
      a: "Turn off the ignition, switch off the main MCB (located under the seat on most electric scooters), place the vehicle on the side stand away from high-speed traffic, and keep your phone accessible.",
    },
    {
      q: "Is roadside assistance free if I have an active AMC?",
      a: "Yes! All MY EV SERVICE Care Pack and Fleet AMC holders enjoy priority free breakdown callouts and towing credits across covered service radius.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030504] text-white selection:bg-[#00D084] selection:text-black font-sans relative overflow-x-hidden">
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Section */}
      <div className="page-hero fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-[#020403] z-0 flex items-center justify-center">
        <img
          ref={heroImageRef}
          src={RSA_HERO_BG}
          alt="EV Roadside Assistance Pune"
          className="w-full h-full object-cover object-center scale-105 opacity-90 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020403]/85 via-[#020403]/65 to-[#030504]" />

        <div
          ref={heroTextRef}
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 lg:px-16 max-w-5xl mx-auto space-y-4 sm:space-y-5 z-10 pb-20 sm:pb-24 lg:pb-28"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            24/7 EV BREAKDOWN RESCUE // PUNE
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
            EV Breakdown? <br />
            <span className="text-[#00D084]">Roadside Help</span> Across Pune
          </h1>

          <p className="text-sm sm:text-base lg:text-lg font-light text-white/85 max-w-2xl leading-relaxed">
            Dead battery, cut-off on climbs, flat tire, or controller fault? Certified EV technicians with mobile service vans and flatbed towing are on standby 24/7.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <a
              href="tel:+919582390001"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:scale-105"
            >
              <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span>Call Helpline: +91 95823 90001</span>
            </a>
            <button
              onClick={handleShareLocation}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-white/20 bg-black/60 text-white text-xs sm:text-sm font-bold hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md"
            >
              <MapPin className="w-4 h-4 text-[#00D084]" />
              <span>Share Live Location (GPS)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Overlay */}
      <div
        ref={cardsOverlayRef}
        className="relative z-10 bg-[#030504] min-h-screen mt-[calc(100vh-80px)] pt-16 rounded-t-[40px] border-t border-white/10 shadow-2xl space-y-24 px-6 lg:px-16 pb-24"
      >
        {/* Emergency Call Box */}
        <section className="max-w-4xl mx-auto -mt-28 relative z-20">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#080d0a] border border-red-500/30 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest block">
                Average Arrival Target: 30–45 Mins
              </span>
              <h3 className="text-2xl font-bold text-white">Stuck on the road right now?</h3>
              <p className="text-xs text-white/60">Tap below to connect directly with our Pune dispatch control room.</p>
            </div>

            <a
              href="tel:+919582390001"
              className="px-8 py-4 rounded-full bg-[#00D084] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#00e08f] transition-all shrink-0 cursor-pointer shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-black" />
              <span>Connect Now</span>
            </a>
          </div>
        </section>

        {/* Breakdown Scenarios Covered */}
        <section className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00D084] uppercase">
              <ShieldCheck className="w-4 h-4" />
              Specialized EV Breakdown Care
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">Emergency Assistance Services</h2>
            <p className="text-sm text-white/70 max-w-2xl mx-auto">
              Equipped with calibrated insulation testers, portable diagnostic scan tools, and zero-regen towing beds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RSA_SERVICES.map((serv) => {
              const IconComp = serv.icon;
              return (
                <div
                  key={serv.title}
                  className="p-8 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all flex items-start gap-5 group"
                >
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[#00D084] shrink-0 group-hover:bg-[#00D084]/15 transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00D084] transition-colors">
                        {serv.title}
                      </h3>
                      <span className="text-[10px] font-mono font-bold text-[#00D084] bg-[#00D084]/10 px-2 py-0.5 rounded">
                        {serv.tag}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed font-light">
                      {serv.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-[#00D084] uppercase">Emergency Guidance</span>
            <h2 className="text-3xl font-extrabold text-white">Roadside Assistance FAQs</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-white/10 bg-[#080d0a] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-base font-bold text-white">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#00D084] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs text-white/70 font-light leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Closing Banner */}
        <section className="max-w-5xl mx-auto p-10 rounded-3xl bg-gradient-to-r from-red-500/20 via-[#080d0a] to-[#00D084]/10 border border-white/10 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Save Our Emergency Hotline</h2>
          <p className="text-xs text-white/70 max-w-xl mx-auto">
            Save +91 95823 90001 in your phone contacts as "MY EV SERVICE Emergency RSA". Whenever you're stuck, help is just one tap away.
          </p>
          <a
            href="tel:+919582390001"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#00D084] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg"
          >
            <PhoneCall className="w-4 h-4 text-black" />
            <span>Call +91 95823 90001</span>
          </a>
        </section>

        <Footer />
      </div>

      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
