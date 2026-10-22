import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  Search,
  MapPin,
  Wrench,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
  Navigation,
  ArrowRight,
  ChevronDown,
  Building2,
  Sparkles,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/service-centre")({
  head: () => ({
    meta: [
      { title: "MY EV SERVICE Centres | Multi-Brand EV Service Network" },
      {
        name: "description",
        content:
          "Browse every MY EV SERVICE centre by city and locality. Multi-brand service for e-scooters, bikes and e-autos with hours, services and online booking.",
      },
      { name: "keywords", content: "EV service centres in India, EV service centre network, multi brand EV service centre, electric scooter service centre, EV service centre Pune" },
      { property: "og:title", content: "MY EV SERVICE Centres — Multi-Brand EV Service Network" },
      { property: "og:description", content: "Browse every MY EV SERVICE centre by city and locality with hours, services and online booking." },
      { property: "og:image", content: "/assets/images/ev-service-centre-network.jpg" },
    ],
  }),
  component: ServiceCentreNetworkPage,
});

export const SC_HERO_BG = "/ev-service-centre-real-hero.png";

interface Centre {
  id: string;
  name: string;
  locality: string;
  city: string;
  format: "Garage" | "Centre" | "Hub";
  address: string;
  landmark: string;
  hours: string;
  isOpen: boolean;
  vehicles: "E-2W" | "E-2W + E-3W";
  topServices: string[];
  phone: string;
}

const PUNE_CENTRES: Centre[] = [
  {
    id: "pune-bhavdhan",
    name: "MY EV SERVICE Bhavdhan Hub",
    locality: "Bhavdhan",
    city: "Pune",
    format: "Hub",
    address: "Unit 405, Vantage Tower C, Ram Nagar, NDA-Pashan Road",
    landmark: "Near Chandni Chowk",
    hours: "9:00 AM – 7:30 PM",
    isOpen: true,
    vehicles: "E-2W + E-3W",
    topServices: ["Battery Health Check", "Motor & Controller Repair", "Fast Charging Bay"],
    phone: "+91 95823 90001",
  },
  {
    id: "pune-kothrud",
    name: "MY EV SERVICE Kothrud Centre",
    locality: "Kothrud",
    city: "Pune",
    format: "Centre",
    address: "Shop 12, Paud Road, Opposite City Pride",
    landmark: "Paud Road Junction",
    hours: "9:30 AM – 7:30 PM",
    isOpen: true,
    vehicles: "E-2W",
    topServices: ["Periodic Service", "Cell Balancing", "Charger Repair"],
    phone: "+91 95823 90001",
  },
  {
    id: "pune-baner",
    name: "MY EV SERVICE Baner Flagship Hub",
    locality: "Baner",
    city: "Pune",
    format: "Hub",
    address: "Survey 48, Pan Card Club Road, Baner",
    landmark: "Next to High-Street Mall",
    hours: "9:00 AM – 8:00 PM",
    isOpen: true,
    vehicles: "E-2W + E-3W",
    topServices: ["Full Diagnostics", "Motor Rewinding", "Fleet Priority Bays"],
    phone: "+91 95823 90001",
  },
  {
    id: "pune-wakad",
    name: "MY EV SERVICE Wakad Centre",
    locality: "Wakad",
    city: "Pune",
    format: "Centre",
    address: "Datta Mandir Road, Wakad",
    landmark: "Near Hinjewadi Flyover",
    hours: "9:30 AM – 7:30 PM",
    isOpen: true,
    vehicles: "E-2W",
    topServices: ["Battery State-of-Health", "Brakes & Suspension", "Firmware Updates"],
    phone: "+91 95823 90001",
  },
  {
    id: "pune-hinjewadi",
    name: "MY EV SERVICE Hinjewadi Garage",
    locality: "Hinjewadi",
    city: "Pune",
    format: "Garage",
    address: "Phase 1 IT Park, Marunji Road",
    landmark: "Opposite Tech Hub 2",
    hours: "9:00 AM – 7:00 PM",
    isOpen: true,
    vehicles: "E-2W",
    topServices: ["Quick Minor Repair", "Tyre Puncture", "Scheduled Care Pack"],
    phone: "+91 95823 90001",
  },
  {
    id: "pune-hadapsar",
    name: "MY EV SERVICE Hadapsar Hub",
    locality: "Hadapsar",
    city: "Pune",
    format: "Hub",
    address: "Magarpatta City Link Road, Hadapsar",
    landmark: "Near Amanora Mall",
    hours: "9:00 AM – 7:30 PM",
    isOpen: true,
    vehicles: "E-2W + E-3W",
    topServices: ["Commercial Fleet AMC", "3W Cargo Repair", "Cell Balancing"],
    phone: "+91 95823 90001",
  },
];

export function ServiceCentreNetworkPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formatFilter, setFormatFilter] = useState<string>("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  const filteredCentres = useMemo(() => {
    return PUNE_CENTRES.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFormat = formatFilter === "All" || c.format === formatFilter;
      return matchesSearch && matchesFormat;
    });
  }, [searchQuery, formatFilter]);

  const FAQS = [
    {
      q: "Do all MY EV SERVICE centres service every EV brand?",
      a: "Yes, every centre services all major electric 2W brands (Ola, Ather, TVS, Bajaj, Hero, Ampere, Revolt). Hubs also service e-autos and cargo 3Ws.",
    },
    {
      q: "Are prices the same at every centre?",
      a: "Yes. Fully transparent, published menu pricing applies across the entire MY EV SERVICE network.",
    },
    {
      q: "Can I walk in without booking?",
      a: "Yes, walk-ins are always welcomed, though booking online gets you a prioritized, confirmed workshop bay slot.",
    },
    {
      q: "Is my service history shared between centres?",
      a: "Yes. Your digital job cards and battery diagnostic reports follow your vehicle securely across any MY EV SERVICE centre in India via Autobot OS.",
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
              backgroundImage: `url('${SC_HERO_BG}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

          <div
            ref={heroTextRef}
            className="max-w-4xl mx-auto text-center relative z-10 px-6 space-y-4 pointer-events-auto"
          >
            <span className="hero-sub-reveal text-xs font-mono font-bold uppercase tracking-widest text-[#00D084]">
              • Standardized Multi-Brand Workshops · Pan-India Network
            </span>
            <h1 className="hero-title-reveal text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
              MY EV SERVICE Centres: <br className="hidden sm:block" />
              <span className="text-[#00D084]">Multi-Brand EV Network</span>
            </h1>
            <p className="hero-sub-reveal text-sm sm:text-base md:text-lg text-[#c2d1c7] font-light max-w-2xl mx-auto leading-relaxed">
              Find a MY EV SERVICE centre in your city. Every centre services every EV brand, runs on the same checklist and gives you a digital job card. Book online, walk in, or ask for doorstep service.
            </p>
            <div className="hero-btn-reveal pt-3 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/service-centre-near-me"
                className="whitespace-nowrap inline-flex items-center shrink-0 gap-2 px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] cursor-pointer hover:scale-105"
              >
                <Navigation className="w-4 h-4 shrink-0" />
                <span>FIND NEAREST BY GPS / PIN</span>
              </Link>
              <button
                onClick={() => setBookingModalOpen(true)}
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
              >
                Book Doorstep Service
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
                <span className="text-[#00D084]">Service Centre Network</span>
              </nav>
            </div>

            {/* S2 & S3: Filter Bar & Centre Directory */}
            <section className="py-8 px-6 max-w-7xl mx-auto">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#080d0a] border border-white/10 mb-8">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by locality or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#020403] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-mono text-white/50 uppercase mr-1">Format:</span>
            {["All", "Garage", "Centre", "Hub"].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormatFilter(fmt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  formatFilter === fmt
                    ? "bg-[#00D084] text-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Centre Cards Grid (NET-011) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCentres.map((centre) => (
            <div
              key={centre.id}
              className="p-6 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      centre.format === "Hub"
                        ? "bg-[#00D084]/20 border border-[#00D084]/40 text-[#00D084]"
                        : centre.format === "Centre"
                        ? "bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623]"
                        : "bg-white/10 border border-white/20 text-white/80"
                    }`}
                  >
                    {centre.format} Format
                  </span>
                  <span className="text-[11px] font-mono text-[#00D084] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00D084]" />
                    Open Today
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00D084] transition-colors">
                  {centre.name}
                </h3>
                <p className="text-xs text-white/70 font-light leading-relaxed mb-2">
                  {centre.address}
                </p>
                <div className="text-[11px] text-white/50 mb-4 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00D084]" />
                  <span>Landmark: {centre.landmark}</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mb-4 space-y-1.5 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-white/80">
                    <span className="text-white/40">Hours:</span>
                    <span>{centre.hours}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span className="text-white/40">Vehicles:</span>
                    <span className="text-[#00D084] font-bold">{centre.vehicles}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-[10px] font-mono uppercase text-white/40 block mb-2">Top Services:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {centre.topServices.map((srv) => (
                      <span key={srv} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-white/70">
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="py-2.5 rounded-xl bg-[#00D084] text-black font-black text-xs uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer"
                >
                  Book Slot
                </button>
                <a
                  href={`tel:${centre.phone}`}
                  className="py-2.5 rounded-xl border border-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-white/10 transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#00D084]" /> Call
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* S5: What Every Centre Offers */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            Quality Assurance
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            What Every MY EV SERVICE Centre Offers
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            The same high engineering standard in every single centre, whoever owns it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              title: "Multi-Brand Service",
              desc: "Ola, Ather, TVS, Bajaj, Hero, Ampere, Revolt and cargo 3W under one roof.",
              icon: Building2,
            },
            {
              title: "Certified Technicians",
              desc: "Trained and certified by Autobot Academy in high-voltage safety & diagnostics.",
              icon: ShieldCheck,
            },
            {
              title: "Proper EV Equipment",
              desc: "BMS scanners, battery balancing benches and insulation resistance testers.",
              icon: Wrench,
            },
            {
              title: "Digital Job Card",
              desc: "Photos, parts scanned, and the battery state-of-health report on your phone.",
              icon: Sparkles,
            },
            {
              title: "Upfront Pricing",
              desc: "The same published prices at every centre, with zero repair starting without your OK.",
              icon: CheckCircle2,
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="p-6 rounded-2xl bg-[#080d0a] border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2 leading-snug">{card.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* S8: FAQs */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white tracking-tight">Service Centre FAQs</h2>
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
            Can't Find a Centre in Your Area?
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Book certified doorstep EV repair or bring MY EV SERVICE to your PIN code through our FOCO franchise model.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-8 py-4 rounded-full bg-white text-[#020403] font-black text-xs uppercase tracking-widest hover:bg-white/90 shadow-2xl transition-all cursor-pointer"
            >
              Book Doorstep Service
            </button>
            <Link
              to="/franchise"
              className="px-8 py-4 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Check Franchise Availability
            </Link>
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
