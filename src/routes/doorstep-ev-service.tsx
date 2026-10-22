import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  Wrench,
  Zap,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  ArrowRight,
  BatteryCharging,
  Compass,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/doorstep-ev-service")({
  head: () => ({
    meta: [
      { title: "Doorstep EV Service in Pune | MY EV SERVICE" },
      {
        name: "description",
        content:
          "Certified electric scooter and 3-wheeler service at your doorstep in Pune. Diagnostic scans, battery health checks, periodic maintenance, and repairs.",
      },
      {
        name: "keywords",
        content: "Doorstep EV service Pune, electric scooter service at home, mobile EV mechanic Pune, EV battery doorstep check, Ather doorstep service Pune, Ola service at doorstep",
      },
      { property: "og:title", content: "Electric Scooter Service at Your Doorstep in Pune | MY EV SERVICE" },
      { property: "og:description", content: "Certified EV technicians arrive at your home or office with mobile diagnostic kits and genuine spare parts." },
    ],
  }),
  component: DoorstepEVServicePage,
});

export const DOORSTEP_HERO_BG = "/ev-services-hero.jpg";

export function DoorstepEVServicePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [pincode, setPincode] = useState("");
  const [checkResult, setCheckResult] = useState<string | null>(null);

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

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim()) {
      toast.error("Please enter a valid PIN code.");
      return;
    }
    const cleanPin = pincode.trim();
    if (cleanPin.startsWith("411") || cleanPin.length === 6) {
      setCheckResult(`Great news! Doorstep EV service is fully active in PIN code ${cleanPin}. Technicians can be dispatched within 45–60 minutes.`);
      toast.success(`Doorstep service active in ${cleanPin}!`);
    } else {
      setCheckResult(`PIN code ${cleanPin} is in our immediate expansion radar. You can still book at the nearest Pune Hub.`);
      toast.info(`PIN ${cleanPin} is launching soon.`);
    }
  };

  const DOORSTEP_SERVICES = [
    {
      title: "Battery Health & SOH Scan",
      desc: "Cell-by-cell voltage diagnostics, temperature analysis, and state-of-health verification at your doorstep.",
      price: "From ₹399",
      time: "40 mins",
      tag: "Most Booked",
    },
    {
      title: "Periodic General Service",
      desc: "Comprehensive 32-point inspection, brake pad cleaning, disc check, belt tensioning, and lube points.",
      price: "From ₹799",
      time: "60 mins",
      tag: "Scheduled Care",
    },
    {
      title: "Electrical & Wire Harness Audit",
      desc: "Insulation testing, throttle response tuning, loose connector diagnostics, and lighting inspection.",
      price: "From ₹549",
      time: "45 mins",
      tag: "Troubleshooting",
    },
    {
      title: "Brake & Suspension Tune-up",
      desc: "Brake pad replacement, caliper greasing, fluid top-up, and fork/shock absorber tuning at home.",
      price: "From ₹699",
      time: "50 mins",
      tag: "Safety",
    },
  ];

  const COVERED_LOCALITIES = [
    "Bhavdhan", "Kothrud", "Baner", "Aundh", "Wakad", "Hinjewadi",
    "Hadapsar", "Kharadi", "Viman Nagar", "Pashan", "Pimple Saudagar", "Katraj"
  ];

  const FAQS = [
    {
      q: "What types of EV services can be performed at my doorstep?",
      a: "Our mobile technicians perform 80%+ of common EV services at your doorstep including battery health diagnostics, periodic maintenance, brake tuning, tire puncture repair, firmware updates, and minor wiring fixes. For heavy jobs like complete battery pack teardown or hub motor winding, we offer pickup and drop to our certified hub.",
    },
    {
      q: "Which electric vehicle brands are supported?",
      a: "We service all major electric scooters and e-autos in India including Ola S1, Ather 450X & Rizta, TVS iQube, Bajaj Chetak, Hero Electric & Vida, Revolt RV400, Ampere, and commercial 3-wheelers.",
    },
    {
      q: "How quickly does a technician arrive after booking?",
      a: "For standard bookings, you can select any convenient 1-hour slot from 9:00 AM to 8:00 PM. For emergency breakdowns or dead batteries, roadside mobile assistance is dispatched immediately with arrival targets within 30–45 minutes across Pune.",
    },
    {
      q: "Do I have to pay upfront to book a doorstep appointment?",
      a: "No! There is zero advance payment required to book. Our technician conducts a professional diagnostic scan and gives you a digital estimate on your phone. You only approve and pay after the service is completed to your satisfaction.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030504] text-white selection:bg-[#00D084] selection:text-black font-sans relative overflow-x-hidden">
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Section */}
      <div className="page-hero fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-[#020403] z-0 flex items-center justify-center">
        <img
          ref={heroImageRef}
          src={DOORSTEP_HERO_BG}
          alt="Doorstep EV Service Pune"
          className="w-full h-full object-cover object-center scale-105 opacity-90 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020403]/80 via-[#020403]/60 to-[#030504]" />

        <div
          ref={heroTextRef}
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 lg:px-16 max-w-5xl mx-auto space-y-6 z-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/40 text-[#00D084] text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#00D084]" />
            DOORSTEP EV SERVICE // PUNE & PCMC
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            Electric Scooter Service <br />
            <span className="text-[#00D084]">At Your Doorstep</span> in Pune
          </h1>

          <p className="text-base sm:text-xl font-light text-white/85 max-w-3xl leading-relaxed">
            Certified EV technicians arrive at your home or office with professional diagnostic scanners, genuine spare parts, and battery health tools. No traffic, no workshop queues.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-sm font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer shadow-[0_0_30px_rgba(0,208,132,0.35)] hover:scale-105"
            >
              <span>Book Doorstep Service</span>
              <ArrowRight className="w-4 h-4 text-[#020403]" />
            </button>
            <a
              href="tel:+919582390001"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-black/60 text-white text-sm font-bold hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md"
            >
              <PhoneCall className="w-4 h-4 text-[#00D084]" />
              <span>Call +91 95823 90001</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Overlay */}
      <div
        ref={cardsOverlayRef}
        className="relative z-10 bg-[#030504] min-h-screen mt-[calc(100vh-80px)] pt-16 rounded-t-[40px] border-t border-white/10 shadow-2xl space-y-24 px-6 lg:px-16 pb-24"
      >
        {/* PIN Code Verification Card */}
        <section className="max-w-4xl mx-auto -mt-28 relative z-20">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#080d0a] border border-[#00D084]/30 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00D084] uppercase">
                  <MapPin className="w-4 h-4" />
                  Live Doorstep Coverage Check
                </div>
                <h3 className="text-2xl font-bold text-white">Enter Your PIN Code</h3>
                <p className="text-xs text-white/60">Check whether mobile technicians are available for dispatch in your area.</p>
              </div>

              <form onSubmit={handlePincodeCheck} className="flex w-full md:w-auto items-center gap-3">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 411021"
                  className="px-5 py-3.5 rounded-full bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm font-mono focus:outline-none focus:border-[#00D084] w-full md:w-44 text-center"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-[#00D084] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#00e08f] transition-all shrink-0 cursor-pointer"
                >
                  Check PIN
                </button>
              </form>
            </div>

            {checkResult && (
              <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-[#00D084]/20 text-xs font-mono text-[#00D084]">
                {checkResult}
              </div>
            )}
          </div>
        </section>

        {/* Popular Doorstep Services */}
        <section className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00D084] uppercase">
              <Wrench className="w-4 h-4" />
              Comprehensive Care at Home
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">Doorstep Service Menu</h2>
            <p className="text-sm text-white/70 max-w-2xl mx-auto">
              Fixed upfront prices. Digital diagnosis report sent straight to your phone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOORSTEP_SERVICES.map((serv) => (
              <div
                key={serv.title}
                className="p-6 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D084] bg-[#00D084]/10 px-2.5 py-1 rounded-md">
                    {serv.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00D084] transition-colors">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    {serv.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-[#00D084] block">{serv.price}</span>
                    <span className="text-[10px] text-white/40 font-mono">{serv.time}</span>
                  </div>
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-[#00D084] text-white hover:text-black transition-all cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Localities Covered in Pune */}
        <section className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[#00D084] uppercase">Areas Serviced</span>
            <h2 className="text-3xl font-extrabold text-white">Active Pune Localities</h2>
            <p className="text-xs text-white/60">Doorstep technicians stationed across urban clusters for rapid dispatch.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {COVERED_LOCALITIES.map((loc) => (
              <span
                key={loc}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:border-[#00D084]/40 hover:text-[#00D084] transition-colors"
              >
                {loc}
              </span>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-[#00D084] uppercase">Questions Answered</span>
            <h2 className="text-3xl font-extrabold text-white">Doorstep EV Service FAQs</h2>
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
        <section className="max-w-5xl mx-auto p-10 rounded-3xl bg-gradient-to-r from-[#00D084]/20 via-[#080d0a] to-[#00D084]/10 border border-[#00D084]/30 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Ready for Doorstep EV Care?</h2>
          <p className="text-xs text-white/70 max-w-xl mx-auto">
            Book online in 60 seconds. Our certified technician visits with calibrated diagnostic scanners and authentic spares.
          </p>
          <button
            onClick={() => setBookingModalOpen(true)}
            className="px-8 py-4 rounded-full bg-[#00D084] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg"
          >
            Schedule Doorstep Service
          </button>
        </section>

        <Footer />
      </div>

      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
