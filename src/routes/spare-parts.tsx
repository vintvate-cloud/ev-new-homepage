import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  Store,
  Battery,
  Zap,
  Cpu,
  Layers,
  Wrench,
  Disc,
  ShieldCheck,
  CheckCircle2,
  Search,
  ShoppingCart,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  PhoneCall,
  Check,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/spare-parts")({
  head: () => ({
    meta: [
      { title: "EV Spare Parts Online India | MY EV SERVICE" },
      {
        name: "description",
        content:
          "Buy compatibility-checked EV spare parts online: batteries, chargers, controllers, motors, brakes and tyres. Fitment at any MY EV SERVICE centre.",
      },
      { name: "keywords", content: "EV spare parts online India, electric scooter spare parts, EV parts shop, EV battery price, electric scooter charger, EV motor controller" },
      { property: "og:title", content: "Genuine EV Spare Parts & Accessories | MY EV SERVICE" },
      { property: "og:description", content: "Buy compatibility-checked EV spare parts online: batteries, chargers, controllers, motors and tyres." },
      { property: "og:image", content: "/assets/images/ev-spare-parts.jpg" },
    ],
  }),
  component: SparePartsCatalogPage,
});

export const SPARE_HERO_BG = "/ev-services-hero.jpg";

export function SparePartsCatalogPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [cartCount, setCartCount] = useState(0);

  // Find-My-Part Selector State (SPARE-004)
  const [selectedType, setSelectedType] = useState("E-Scooter");
  const [selectedBrand, setSelectedBrand] = useState("Ola");
  const [selectedModel, setSelectedModel] = useState("S1 Pro Gen 2");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const handleAddToCart = (productName: string) => {
    setCartCount((c) => c + 1);
    toast.success(`Added ${productName} to cart with optional workshop fitment!`);
  };

  const CATEGORIES = [
    {
      id: "batteries",
      title: "EV Batteries",
      desc: "Lithium-ion packs with built-in smart BMS for 48V, 60V and 72V scooters and e-autos.",
      startingPrice: "₹24,999",
      icon: Battery,
    },
    {
      id: "chargers",
      title: "Smart Chargers",
      desc: "Fast smart chargers with auto cut-off, thermal overload control and surge protection.",
      startingPrice: "₹3,499",
      icon: Zap,
    },
    {
      id: "controllers",
      title: "Motor Controllers",
      desc: "Digital FOC sine-wave controllers for smooth acceleration and active regenerative braking.",
      startingPrice: "₹7,999",
      icon: Cpu,
    },
    {
      id: "motors",
      title: "Hub Motors & Parts",
      desc: "BLDC hub motors, hall sensor arrays, high-grade bearings and heavy-duty phase wires.",
      startingPrice: "₹4,499",
      icon: Layers,
    },
    {
      id: "electronics",
      title: "BMS & Electronics",
      desc: "BMS circuit boards, DC-DC 12V converters, electronic throttles, TFT displays & wiring looms.",
      startingPrice: "₹1,299",
      icon: Sparkles,
    },
    {
      id: "brakes-tyres",
      title: "Brakes, Tyres & Suspension",
      desc: "Ceramic pads, discs, low-rolling-resistance tubeless EV tyres and shock absorbers.",
      startingPrice: "₹1,899",
      icon: Disc,
    },
    {
      id: "body-lighting",
      title: "Body & Lighting",
      desc: "Aero fairing panels, mirrors, LED projector headlamps, blinkers, and handlebar switches.",
      startingPrice: "₹899",
      icon: Wrench,
    },
    {
      id: "accessories",
      title: "EV Accessories",
      desc: "All-weather scooter covers, vibration-damped phone mounts, portable tyre inflators & cables.",
      startingPrice: "₹499",
      icon: ShieldCheck,
    },
  ];

  const FAQS = [
    {
      q: "Are your EV spare parts genuine?",
      a: "Yes. We supply genuine OEM parts where available, and certified OEM-grade stress-tested alternatives with matching warranty protection.",
    },
    {
      q: "How do I know a part fits my scooter?",
      a: "Select your vehicle make and model in the Find-My-Part filter above; our vehicle compatibility engine guarantees verified fitment before shipment.",
    },
    {
      q: "Do you deliver outside Pune?",
      a: "Yes, we ship pan-India with express insured courier dispatch. Within Pune, same-day delivery or hub pickup is available.",
    },
    {
      q: "Can I return a part?",
      a: "Yes. Unused parts in original packaging can be returned within 7 days. Electrical and BMS components are pre-tested and warrantied.",
    },
    {
      q: "Should I fit an EV battery or controller myself?",
      a: "We strongly recommend professional fitment at any MY EV SERVICE centre or through our doorstep technician service for high-voltage safety and warranty compliance.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084]/30 selection:text-[#00D084]">
      <Nav theme="dark" onOpenBooking={() => setBookingModalOpen(true)} cartCount={cartCount} />

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
              backgroundImage: `url('${SPARE_HERO_BG}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

          <div
            ref={heroTextRef}
            className="max-w-4xl mx-auto text-center relative z-10 px-6 space-y-4 pointer-events-auto"
          >
            <span className="hero-sub-reveal text-xs font-mono font-bold uppercase tracking-widest text-[#00D084]">
              • EV Spare Hub · Genuine Aftermarket Components
            </span>
            <h1 className="hero-title-reveal text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Genuine EV Spare Parts: <br className="hidden sm:block" />
              <span className="text-[#00D084]">Matched to Your Model</span>
            </h1>
            <p className="hero-sub-reveal text-sm sm:text-base md:text-lg text-[#c2d1c7] font-light max-w-2xl mx-auto leading-relaxed">
              Batteries, chargers, controllers, motors, brakes, tyres and accessories for electric scooters, bikes and e-autos. Every part is checked for compatibility before dispatch, with fitment across India.
            </p>
            <div className="hero-btn-reveal pt-3 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#catalog"
                className="whitespace-nowrap inline-flex items-center shrink-0 gap-2 px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] cursor-pointer hover:scale-105"
              >
                <span>EXPLORE CATALOG</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
              <button
                onClick={() => setBookingModalOpen(true)}
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
              >
                Book Part Fitment
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
                <span className="text-[#00D084]">Spare Parts</span>
              </nav>
            </div>

            {/* S1: Trust Strip (SPARE-003) */}
            <div className="py-4 px-6 max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs text-white/70 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00D084]" />
                <span>Compatibility-Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00D084]" />
                <span>Warranty on Every Part</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00D084]" />
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00D084]" />
                <span>Professional Fitment Available</span>
              </div>
            </div>

            {/* S1: Find-My-Part Bar (SPARE-004) */}
            <div id="catalog" className="pt-4 pb-8 px-6 max-w-4xl mx-auto">
              <div className="p-6 rounded-[28px] bg-[#080d0a] border border-white/15 shadow-2xl">
                <div className="text-xs font-mono text-[#00D084] uppercase tracking-wider font-bold mb-4 text-left">
                  Find My Compatible Part
                </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-[#020403] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                >
                  <option value="E-Scooter">E-Scooter (2W)</option>
                  <option value="E-Motorcycle">E-Motorcycle (2W)</option>
                  <option value="E-Auto">E-Auto / 3W Cargo</option>
                </select>

                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="bg-[#020403] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                >
                  <option value="Ola">Ola Electric</option>
                  <option value="Ather">Ather Energy</option>
                  <option value="TVS">TVS iQube</option>
                  <option value="Bajaj">Bajaj Chetak</option>
                  <option value="Hero">Hero Vida</option>
                  <option value="Ampere">Ampere</option>
                  <option value="Revolt">Revolt</option>
                </select>

                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-[#020403] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                >
                  <option value="All Models">All Compatible Variants</option>
                  <option value="S1 Pro">Ola S1 Pro (Gen 1/2)</option>
                  <option value="450X">Ather 450X / Apex</option>
                  <option value="iQube ST">TVS iQube S / ST</option>
                  <option value="Chetak 2901">Bajaj Chetak 2901/3201</option>
                </select>

                <button
                  type="button"
                  onClick={() => toast.success(`Filtered parts verified for ${selectedBrand} ${selectedModel}!`)}
                  className="py-2.5 rounded-xl bg-[#00D084] text-black font-black text-xs uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" /> Show Parts
                </button>
              </div>
            </div>
          </div>

      {/* S2: Shop by Category (SPARE-005 to 013) */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            Catalog Browse
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Shop EV Spare Parts by Category
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            Every major EV system, in one unified compatibility catalog.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="p-6 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#00D084]">From {cat.startingPrice}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{cat.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light mb-6">{cat.desc}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => handleAddToCart(cat.title)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#00D084] hover:text-black text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Order with Fitment
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* S5: Parts Supply for Workshops & Fleets (B2B Trade Accounts) */}
      <section className="py-20 px-6 bg-[#040805] border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
              Wholesale &amp; Fleet Logistics
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Parts Supply for Workshops and Fleets
            </h2>
            <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
              Keep your fleet or independent garage operational with bulk supply contracts, scheduled replenishment cycles, and guaranteed zero parts shortages through EV Spare Hub.
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#080d0a] border border-white/10">
                <span className="text-xs font-mono font-bold text-[#00D084] block mb-1">For EV Workshops &amp; Garages</span>
                <span className="text-xs text-white/60 font-light block">Trade pricing, bulk orders and same-week dispatch across Maharashtra.</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#080d0a] border border-white/10">
                <span className="text-xs font-mono font-bold text-[#00D084] block mb-1">For Fleet Operators</span>
                <span className="text-xs text-white/60 font-light block">Parts at pre-agreed contract rates bundled directly into your monthly fleet AMC invoice.</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#080d0a] border border-white/15 space-y-6">
            <h3 className="text-xl font-bold text-white">Open a Wholesale Trade Account</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Connect with our procurement engineers to access trade discounts on lithium cells, controllers, and charger assemblies.
            </p>
            <div className="space-y-3">
              <Link
                to="/contact"
                className="w-full py-3.5 rounded-full bg-[#00D084] text-black font-black text-xs uppercase tracking-widest hover:bg-[#00e08f] transition-all flex items-center justify-center gap-2"
              >
                Open a Trade Account <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/fleet"
                className="w-full py-3.5 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all text-center block"
              >
                Bundle Parts with Fleet AMC
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* S7: FAQs */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white tracking-tight">EV Spare Parts FAQs</h2>
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

      {/* S8: Closing CTA */}
      <section className="py-16 px-6 bg-[#0D5C2E] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Need Help Finding the Right Part?
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Share your vehicle model and VIN with our parts engineers and we will match the verified component with warranty protection.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-white text-[#020403] font-black text-xs uppercase tracking-widest hover:bg-white/90 shadow-2xl transition-all"
            >
              Talk to a Parts Expert
            </Link>
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-8 py-4 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
            >
              Book Professional Fitment
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
