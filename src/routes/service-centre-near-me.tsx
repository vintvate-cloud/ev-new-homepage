import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  Navigation,
  MapPin,
  PhoneCall,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Wrench,
  AlertTriangle,
  ChevronDown,
  Building2,
  Truck,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/service-centre-near-me")({
  head: () => ({
    meta: [
      { title: "EV Service Centre Near Me | E-Scooter Repair | MY EV SERVICE" },
      {
        name: "description",
        content:
          "Find the nearest MY EV SERVICE centre in seconds. Multi-brand e-scooter, bike and e-auto service near you, plus doorstep repair and roadside help.",
      },
      { name: "keywords", content: "EV service centre near me, electric scooter service near me, EV repair near me, EV mechanic near me, electric bike service centre near me" },
      { property: "og:title", content: "Find an EV Service Centre Near You | MY EV SERVICE" },
      { property: "og:description", content: "Find the nearest MY EV SERVICE centre in seconds with live distance and doorstep coverage." },
      { property: "og:image", content: "/assets/images/ev-service-near-me.jpg" },
    ],
  }),
  component: ServiceCentreNearMePage,
});

export const NEAR_ME_HERO_BG = "/find-services-hero.jpg";

export function ServiceCentreNearMePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [pinCode, setPinCode] = useState("");
  const [locating, setLocating] = useState(false);
  const [activeLocality, setActiveLocality] = useState("Bhavdhan");
  const [distanceInfo, setDistanceInfo] = useState<{
    locality: string;
    distance: string;
    time: string;
    status: string;
  } | null>({
    locality: "Bhavdhan, Pune",
    distance: "1.4 km",
    time: "6 mins away",
    status: "Open until 7:30 PM",
  });

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

  const handleUseLocation = () => {
    setLocating(true);
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setLocating(false);
        setDistanceInfo({
          locality: "Baner Flagship Hub, Pune",
          distance: "2.1 km",
          time: "8 mins away",
          status: "Open until 8:00 PM",
        });
        toast.success("Location identified! Showing nearest MY EV SERVICE centre.");
      },
      () => {
        setLocating(false);
        toast.info("Location permission denied. You can enter your 6-digit PIN code below.");
      }
    );
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinCode || pinCode.length < 6) {
      toast.error("Please enter a valid 6-digit PIN code.");
      return;
    }
    setDistanceInfo({
      locality: `Nearest Hub for PIN ${pinCode}`,
      distance: "2.8 km",
      time: "11 mins away",
      status: "Open until 7:30 PM",
    });
    toast.success(`Nearest centre located for PIN ${pinCode}!`);
  };

  const PUNE_LOCALITIES = [
    "Bhavdhan",
    "Kothrud",
    "Baner",
    "Aundh",
    "Pashan",
    "Wakad",
    "Hinjewadi",
    "Pimple Saudagar",
    "Pimpri-Chinchwad",
    "Hadapsar",
    "Kharadi",
    "Viman Nagar",
    "Wagholi",
    "Katraj",
    "Sinhagad Road",
    "Undri",
  ];

  const FAQS = [
    {
      q: "How do I find the nearest EV service centre?",
      a: "Tap 'Use My Location' or enter your PIN code above to view the closest MY EV SERVICE hubs sorted by real driving distance and open hours.",
    },
    {
      q: "Is there an EV service centre near me that services all brands?",
      a: "Yes. Every MY EV SERVICE workshop bay is equipped with universal multi-brand diagnostic scanners and certified for Ola, Ather, TVS, Bajaj, Hero, Ampere, and Revolt.",
    },
    {
      q: "Can an EV mechanic come to my home?",
      a: "Yes, our doorstep mobile vans cover major urban zones for periodic servicing, battery SOH checks, software flashes, and puncture repairs.",
    },
    {
      q: "What if my EV breaks down on the road?",
      a: "Call our immediate roadside assistance line at +91 95823 90001, and our rapid response team will be dispatched directly to your GPS coordinates.",
    },
    {
      q: "Are centres open on Sundays?",
      a: "Yes! Major flagship hubs operate 7 days a week (9:00 AM to 7:30 PM) to ensure delivery fleets and EV owners experience minimal downtime.",
    },
  ];

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
              backgroundImage: `url('${NEAR_ME_HERO_BG}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

          <div
            ref={heroTextRef}
            className="max-w-4xl mx-auto text-center relative z-10 px-6 space-y-4 pointer-events-auto"
          >
            <span className="hero-sub-reveal text-xs font-mono font-bold uppercase tracking-widest text-[#00D084]">
              • Live GPS Distance Locator · Multi-Brand Hubs
            </span>
            <h1 className="hero-title-reveal text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
              EV Service Centre Near Me: <br className="hidden sm:block" />
              <span className="text-[#00D084]">Find Your Nearest Workshop</span>
            </h1>
            <p className="hero-sub-reveal text-sm sm:text-base md:text-lg text-[#c2d1c7] font-light max-w-2xl mx-auto leading-relaxed">
              Allow location access or enter your PIN code. We'll show the closest centres, how far away they are, whether they're open now, and whether a technician can come to you.
            </p>
            <div className="hero-btn-reveal pt-3 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#locator"
                className="whitespace-nowrap inline-flex items-center shrink-0 gap-2 px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] cursor-pointer hover:scale-105"
              >
                <Compass className="w-4 h-4 shrink-0" />
                <span>LOCATE BY PIN / GPS</span>
              </a>
              <button
                onClick={() => setBookingModalOpen(true)}
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
              >
                Book Doorstep Van
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
            <div className="pb-4 px-6 max-w-7xl mx-auto">
              <nav aria-label="breadcrumb" className="text-xs font-mono text-white/50 flex items-center gap-2">
                <Link to="/" className="hover:text-[#00D084] transition-colors">Home</Link>
                <span>›</span>
                <span className="text-[#00D084]">Service Centre Near Me</span>
              </nav>
            </div>

            {/* S1: Locator Tool Container (#locator) */}
            <section id="locator" className="py-8 px-6 max-w-5xl mx-auto">
              {/* Interactive Locator Box (NEAR-003 & 004) */}
              <div className="max-w-2xl mx-auto">
                <div className="p-6 sm:p-8 rounded-[28px] bg-[#080d0a] border border-white/15 shadow-2xl space-y-5">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleUseLocation}
                  disabled={locating}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#00D084] text-black font-black text-xs uppercase tracking-wider hover:bg-[#00e08f] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  {locating ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" /> Detecting GPS...
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4" /> Use My Location
                    </>
                  )}
                </button>

                <div className="text-xs font-mono text-white/40 uppercase">or enter PIN</div>

                <form onSubmit={handlePinSubmit} className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full bg-[#020403] border border-white/15 rounded-full px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084] font-mono text-center"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase font-mono transition-colors shrink-0"
                  >
                    Check
                  </button>
                </form>
              </div>

              {/* Result Panel (NEAR-004) */}
              {distanceInfo && (
                <div className="p-4 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#00D084] font-bold uppercase mb-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Nearest Centre Identified
                    </div>
                    <div className="text-sm font-bold text-white">{distanceInfo.locality}</div>
                    <div className="text-[11px] text-white/60 font-mono">
                      {distanceInfo.distance} • {distanceInfo.time} • {distanceInfo.status}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setBookingModalOpen(true)}
                      className="px-4 py-2 rounded-full bg-[#00D084] text-black font-black text-xs uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer"
                    >
                      Book Slot
                    </button>
                    <a
                      href="https://maps.google.com/?q=MY+EV+SERVICE+Pune"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-full border border-white/20 text-white font-bold text-xs uppercase hover:bg-white/10 transition-all"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

      {/* S3: Can't Come to Us? We'll Come to You */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            Mobile Assistance
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Can't Come to Us? We'll Come to You
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-[#080d0a] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] mb-6">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Doorstep EV Service Near You</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light mb-6">
                Check whether your PIN code has doorstep cover. Diagnostics, software updates, battery checks and minor repairs can all be done right at your home or workplace.
              </p>
            </div>
            <button
              onClick={() => setBookingModalOpen(true)}
              className="py-3 rounded-full bg-white/10 hover:bg-[#00D084] hover:text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
            >
              Book Doorstep Visit
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-[#080d0a] border border-[#F5A623]/30 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-[#F5A623] text-black text-[10px] font-mono font-black uppercase rounded-bl-xl">
              24/7 Breakdown
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F5A623]/15 border border-[#F5A623]/30 flex items-center justify-center text-[#F5A623] mb-6">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">EV Roadside Assistance</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light mb-6">
                Stuck with a dead battery, a sudden cut-off or a puncture? Tap to call our 24/7 Pune dispatch helpline. An EV technician is sent directly to your live coordinates.
              </p>
            </div>
            <a
              href="tel:+919582390001"
              className="py-3 rounded-full bg-[#F5A623] text-black font-black text-xs uppercase tracking-wider hover:bg-[#ffb43a] transition-all text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Call Roadside: +91 95823 90001
            </a>
          </div>

          <div className="p-8 rounded-3xl bg-[#080d0a] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pickup and Drop Service</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light mb-6">
                For heavy powertrain overhauls, motor rewinding, or deep cell-level battery rejuvenation, we collect your EV, execute work in our hub bays, and deliver it back.
              </p>
            </div>
            <button
              onClick={() => setBookingModalOpen(true)}
              className="py-3 rounded-full bg-white/10 hover:bg-[#00D084] hover:text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
            >
              Request Pickup
            </button>
          </div>
        </div>
      </section>

      {/* S4: Brand Coverage Text Chips */}
      <section className="py-12 px-6 border-y border-white/10 bg-[#060a08]">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h2 className="text-lg font-bold text-white">EV Service Near You for Every Brand</h2>
          <p className="text-xs text-white/60 font-light">Whatever you ride, the nearest MY EV SERVICE centre can fix it.</p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              "Ola Electric",
              "Ather Energy",
              "TVS iQube",
              "Bajaj Chetak",
              "Hero Vida",
              "Ampere",
              "Revolt Motors",
              "Passenger E-Rickshaws",
              "L5 Cargo 3Ws",
            ].map((b) => (
              <span key={b} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/90">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* S6: Pune Localities Covered */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            #PuneEVMap
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            EV Service Near You Across Pune
          </h2>
          <p className="text-xs text-white/60 mt-2 font-light">Jump straight to your area for certified local hubs.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
          {PUNE_LOCALITIES.map((loc) => (
            <button
              key={loc}
              onClick={() => {
                setActiveLocality(loc);
                toast.info(`Showing service coverage details for ${loc}, Pune.`);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-mono transition-all ${
                activeLocality === loc
                  ? "bg-[#00D084] text-black font-bold"
                  : "bg-[#080d0a] border border-white/10 text-white/70 hover:border-white/30"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </section>

      {/* S8: FAQs */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white tracking-tight">EV Service Near Me FAQs</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div key={faq.q} className="rounded-2xl border border-white/10 bg-[#080d0a] overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left text-sm font-bold text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#00D084] transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-white/70 leading-relaxed font-light border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* S9: Closing CTA */}
      <section className="py-16 px-6 bg-[#0D5C2E] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Stuck Right Now?
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Call roadside help immediately and an EV technician will be dispatched to your location.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="tel:+919582390001"
              className="px-8 py-4 rounded-full bg-white text-[#020403] font-black text-xs uppercase tracking-widest hover:bg-white/90 shadow-2xl transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Call Roadside: +91 95823 90001
            </a>
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-8 py-4 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
            >
              Book Doorstep Service
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
