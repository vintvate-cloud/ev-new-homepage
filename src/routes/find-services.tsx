import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  Search,
  MapPin,
  Wrench,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  BatteryCharging,
  Cpu,
  ArrowRight,
  Sparkles,
  PhoneCall,
  SlidersHorizontal,
  Navigation,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/find-services")({
  component: FindServicesPage,
});

function FindServicesPage() {
  const [searchCity, setSearchCity] = useState("Pune");
  const [selectedService, setSelectedService] = useState("Battery Repair");
  const [selectedBrand, setSelectedBrand] = useState("Ather");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [selectedCity, setSelectedCity] = useState("Pune");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      `Searching centers in ${searchCity || "Pune"} for ${selectedBrand} ${selectedService}...`
    );
  };

  const MARQUEE_TAGS = [
    "Certified Technicians",
    "Doorstep EV Service",
    "Battery Health Check",
    "Warranty Tracking",
    "Genuine Spare Parts",
    "AI Diagnostics",
    "Multi-Brand Support",
    "Pan-India Network",
    "Quick & On-Time",
    "Transparent Pricing",
    "2W & 3W Specialists",
    "OEM-Grade Standards",
  ];

  const POPULAR_SERVICES = [
    {
      title: "Battery Health Check",
      centers: "50+ Centers",
      icon: BatteryCharging,
      desc: "Comprehensive battery diagnostics with cell-level analysis and predictive health scoring for 2W & 3W.",
      price: "₹399",
    },
    {
      title: "Motor & Controller",
      centers: "150+ Centers",
      icon: Cpu,
      desc: "Electric motor inspection, controller diagnostics, and performance tuning.",
      price: "₹1,999",
    },
    {
      title: "Charging System",
      centers: "250+ Centers",
      icon: Zap,
      desc: "Charger diagnostics, port inspection, and charging speed optimization.",
      price: "₹899",
    },
    {
      title: "Software Updates",
      centers: "350+ Centers",
      icon: SlidersHorizontal,
      desc: "Latest firmware updates, BMS calibration, and feature activation.",
      price: "₹699",
    },
    {
      title: "Advanced Battery Diagnostic",
      centers: "450+ Centers",
      icon: ShieldCheck,
      desc: "Deep battery system scan with cell voltage and temperature monitoring.",
      price: "₹999",
    },
    {
      title: "Battery Cell Balancing",
      centers: "550+ Centers",
      icon: Wrench,
      desc: "Equalization of battery cells to improve battery life and efficiency.",
      price: "₹1,399",
    },
    {
      title: "Battery Pack Repair",
      centers: "600+ Centers",
      icon: Wrench,
      desc: "Repair of battery connectors, internal wiring, and pack issues.",
      price: "₹3,499",
    },
    {
      title: "Battery Replacement",
      centers: "650+ Centers",
      icon: BatteryCharging,
      desc: "Install compatible replacement battery pack for degraded units.",
      price: "₹999",
    },
  ];

  const BRANDS = [
    { name: "Ola Electric", logo: "⚡", models: "S1 Pro, S1 Air, S1 X" },
    { name: "Ather", logo: "🔋", models: "450X, 450S, Rizta" },
    { name: "TVS", logo: "🛵", models: "iQube, X" },
    { name: "Hero Electric", logo: "🌱", models: "Optima, Nyx, Atria" },
    { name: "Vida by Hero", logo: "✨", models: "Vida V1 Plus, V1 Pro" },
    { name: "Bajaj Chetak", logo: "⚡", models: "Chetak Premium, Urbane" },
  ];

  const WHY_CHOOSE = [
    {
      title: "Certified Technicians",
      subtitle: "Expert in EV repair & service",
      desc: "All workshop staff are trained at Autobot Master Academy for high-voltage battery safety.",
      icon: ShieldCheck,
    },
    {
      title: "Genuine Spare Parts",
      subtitle: "100% original & reliable",
      desc: "Direct OEM supply chain fulfillment for authentic BMS, controllers, and spare cells.",
      icon: CheckCircle2,
    },
    {
      title: "Quick & On-time Service",
      subtitle: "We value your time",
      desc: "Same-day turnaround for standard maintenance & express diagnostic turnaround.",
      icon: Clock,
    },
    {
      title: "Transparent Pricing",
      subtitle: "No hidden charges",
      desc: "AI estimated digital job cards before service starts with upfront line item prices.",
      icon: Zap,
    },
    {
      title: "Trusted by Thousands",
      subtitle: "4.8+ customer rating",
      desc: "Over 25,000+ happy electric 2W & 3W owners serviced across our network.",
      icon: Star,
    },
  ];

  const FAQS = [
    {
      q: "How can I find EV service centers near me?",
      a: "Simply enter your city or area (e.g. Pune, Baner) in the search bar above, select your EV brand and required service, and click 'Find Nearby Centers' to view verified local centers.",
    },
    {
      q: "Is there any warranty on the service?",
      a: "Yes! All repairs and periodic maintenance carried out at MY EV SERVICE centers come with a standard 90-day work warranty and genuine OEM spare parts warranty.",
    },
    {
      q: "Do you use genuine spare parts?",
      a: "100%. We source components directly from certified manufacturers and OEM supply chains to ensure total reliability and battery safety.",
    },
    {
      q: "Can I book a service for my electric scooter?",
      a: "Absolutely! We specialize in all electric 2W and 3W scooters, bikes, and commercial fleets including Ola, Ather, TVS, Hero Electric, Chetak, and more.",
    },
    {
      q: "How long does a typical service take?",
      a: "Standard periodic maintenance takes 2–3 hours. Battery cell balancing or deep diagnostics usually take 4–6 hours depending on pack capacity.",
    },
    {
      q: "Do you offer pickup and drop service?",
      a: "Yes, we offer doorstep pickup and drop-off in major hub areas including Pune, Bangalore, and Delhi NCR.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-serif overflow-x-hidden">
      
      {/* Navbar */}
      <Nav />

      {/* =========================================================================
          1. HERO SEARCH SECTION (NO SHADOWS)
         ========================================================================= */}
      <section className="relative pt-36 pb-20 px-6 border-b border-white/10 bg-gradient-to-b from-[#080e0b] to-[#020403] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#00D084]/10 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/40 bg-[#00D084]/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00D084]">
            <Sparkles className="w-3.5 h-3.5" />
            Find Trusted Certified Technicians Near You
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white leading-[1.08]">
            Find Service Centers <br />
            <span className="text-[#00D084]">Near You</span>
          </h1>

          <p className="text-base sm:text-lg text-white/70 font-serif font-normal leading-relaxed max-w-2xl mx-auto">
            Your one-stop solution for all EV repair, maintenance and services — quick, reliable and hassle-free.
          </p>

          {/* Search Form Card (NO SHADOWS) */}
          <div className="bg-[#050c08] border-2 border-[#00D084]/40 rounded-3xl p-6 md:p-8 text-left mt-8 backdrop-blur-xl">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              <div>
                <label className="text-[11px] font-serif text-white/50 block mb-1">Enter City or Area</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#00D084] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Eg. Pune, Baner"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full bg-[#020403] border border-white/15 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white font-serif focus:outline-none focus:border-[#00D084]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-serif text-white/50 block mb-1">Select Service</label>
                <div className="relative">
                  <Wrench className="w-4 h-4 text-[#00D084] absolute left-3.5 top-3.5" />
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[#020403] border border-white/15 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white font-serif focus:outline-none focus:border-[#00D084] cursor-pointer"
                  >
                    <option value="Battery Repair">Battery Repair</option>
                    <option value="General Service">General Service</option>
                    <option value="Motor & Controller">Motor & Controller</option>
                    <option value="Software Updates">Software Updates</option>
                    <option value="Cell Balancing">Cell Balancing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-serif text-white/50 block mb-1">Select Brand</label>
                <div className="relative">
                  <Zap className="w-4 h-4 text-[#00D084] absolute left-3.5 top-3.5" />
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full bg-[#020403] border border-white/15 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white font-serif focus:outline-none focus:border-[#00D084] cursor-pointer"
                  >
                    <option value="Ather">Ather</option>
                    <option value="Ola Electric">Ola Electric</option>
                    <option value="TVS">TVS iQube</option>
                    <option value="Hero Electric">Hero Electric</option>
                    <option value="Vida by Hero">Vida by Hero</option>
                    <option value="Bajaj Chetak">Bajaj Chetak</option>
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" /> Find Nearby Centers
                </button>
              </div>

            </form>

            <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-white/10 text-xs text-white/50 font-serif">
              <span className="font-bold text-white/80">Popular Searches:</span>
              {["Battery Repair Near Me", "Doorstep Service Baner", "Ather Charger Repair", "Ola Battery Test"].map((tag, i) => (
                <button
                  key={i}
                  onClick={() => setSearchCity("Pune")}
                  className="bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full text-white/70 hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. MARQUEE TICKER OF CERTIFIED FEATURES
         ========================================================================= */}
      <section className="bg-[#050907] border-b border-white/10 py-3.5 overflow-hidden font-serif">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          {MARQUEE_TAGS.concat(MARQUEE_TAGS).map((tag, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-serif font-medium text-white/80">
              <span>{tag}</span>
              <span className="text-white/20 ml-6">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. POPULAR SERVICES GRID
         ========================================================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto font-serif border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
              Services Directory
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 tracking-tight">
              Popular Services
            </h2>
            <p className="text-white/60 text-sm mt-1 font-serif">
              Professional care for your electric vehicle
            </p>
          </div>

          <button
            onClick={() => toast.info("Showing all 68+ specialized EV services.")}
            className="px-6 py-3 rounded-full border border-white/20 text-white text-xs font-serif font-bold hover:bg-white/10 transition-all cursor-pointer w-fit"
          >
            View All Services
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_SERVICES.map((srv, idx) => {
            const IconComp = srv.icon;
            return (
              <div
                key={idx}
                className="bg-[#050907] border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#00D084] bg-[#00D084]/10 px-3 py-1 rounded-full border border-[#00D084]/20">
                      {srv.centers}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-[#00D084] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-white/60 font-serif leading-relaxed mb-4">
                    {srv.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-white/40 block text-[10px]">STARTING FROM</span>
                    <span className="font-bold text-white text-sm">{srv.price}</span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedService(srv.title);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#00D084] hover:text-[#020403] text-white font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    Book Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. TOP EV BRANDS WE SERVICE
         ========================================================================= */}
      <section className="py-24 px-6 border-b border-white/10 bg-[#040806] font-serif">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
                Multi-Brand Experts
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 tracking-tight">
                Top EV Brands We Service
              </h2>
              <p className="text-white/60 text-sm mt-1 font-serif">
                We provide expert service for all leading EV brands
              </p>
            </div>

            <button
              onClick={() => toast.info("We support over 20+ EV 2W and 3W brands.")}
              className="px-6 py-3 rounded-full border border-white/20 text-white text-xs font-serif font-bold hover:bg-white/10 transition-all cursor-pointer w-fit"
            >
              View All Brands
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {BRANDS.map((brand, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedBrand(brand.name);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-[#020503] border border-white/10 hover:border-[#00D084] rounded-2xl p-5 text-center transition-all cursor-pointer hover:bg-[#00D084]/10 group"
              >
                <div className="text-3xl mb-2">{brand.logo}</div>
                <h4 className="text-sm font-serif font-bold text-white group-hover:text-[#00D084]">
                  {brand.name}
                </h4>
                <p className="text-[10px] text-white/50 font-serif mt-1">{brand.models}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. WHY CHOOSE MY EV SERVICE?
         ========================================================================= */}
      <section className="py-24 px-6 border-b border-white/10 bg-[#020403] font-serif">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
              Our Promise
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 mb-4 tracking-tight">
              Why Choose MY EV SERVICE?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {WHY_CHOOSE.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#050907] border border-white/10 rounded-3xl p-6 text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] mb-4">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <div className="text-xs font-bold text-[#00D084] mb-2">{item.subtitle}</div>
                    <p className="text-xs text-white/60 font-serif leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. ALL CITIES NETWORK MAP
         ========================================================================= */}
      <section className="py-24 px-6 border-b border-white/10 bg-gradient-to-b from-[#020403] via-[#040a07] to-[#020403] font-serif">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">
                Coverage
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 tracking-tight">
                All Cities
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs font-serif font-bold">
              <span className="px-3.5 py-1.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[#00D084]">
                1 city in our network
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/70">
                0 active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => setSelectedCity("Pune")}
              className={`p-8 rounded-3xl border-2 transition-all cursor-pointer font-serif ${
                selectedCity === "Pune"
                  ? "bg-[#050c08] border-[#00D084]"
                  : "bg-[#050907] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#00D084] uppercase tracking-widest">
                  HUB NETWORK
                </span>
              </div>
              <h3 className="text-3xl font-serif font-extrabold text-white mb-2">Pune</h3>
              <p className="text-xs text-white/60 font-serif">
                5+ Centers operational in Baner, Wakad, Kothrud, Viman Nagar & Hadapsar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. START YOUR OWN EV SERVICE CENTER BANNER
         ========================================================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto font-serif">
        <div className="bg-[#00D084]/15 border-2 border-[#00D084] rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#00D084] block">
              FRANCHISE OPPORTUNITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-white">
              Start Your Own EV Service Center
            </h2>
            <p className="text-sm sm:text-base text-white/80 font-serif font-light">
              Join India's fastest growing EV service network.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-serif font-bold text-[#00D084] pt-2">
              <span>Low Investment</span> • <span>High Returns</span> • <span>Complete Training & Support</span>
            </div>
          </div>

          <Link
            to="/franchise"
            className="px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shrink-0 cursor-pointer"
          >
            Become a Franchise Partner
          </Link>
        </div>
      </section>

      {/* =========================================================================
          8. FREQUENTLY ASKED QUESTIONS
         ========================================================================= */}
      <section className="py-24 px-6 max-w-4xl mx-auto font-serif">
        <div className="text-center mb-12">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#050907] border border-white/10 hover:border-[#00D084]/40 rounded-2xl p-6 transition-all cursor-pointer font-serif"
                onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-serif font-bold text-white leading-snug">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#00D084] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/40 shrink-0" />
                  )}
                </div>

                {isOpen && (
                  <p className="mt-4 pt-4 border-t border-white/10 text-xs md:text-sm text-white/70 font-serif font-light leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          9. FOOTER CALLOUT BANNER
         ========================================================================= */}
      <section className="py-24 px-6 border-t border-white/10 bg-gradient-to-b from-[#080d0a] to-[#020403] font-serif text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#00D084]">
            India's #1 EV Service Network
          </span>

          <h2 className="text-4xl sm:text-6xl font-serif font-black text-white tracking-tight leading-tight">
            Your EV Deserves <span className="text-[#00D084]">Expert Care</span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-serif font-light max-w-2xl mx-auto">
            Certified technicians. Doorstep service. Genuine parts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => toast.success("Booking system opened!")}
              className="px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer"
            >
              Book a Service
            </button>
            <Link
              to="/store"
              className="px-8 py-4 rounded-full border border-white/20 text-white text-xs font-serif font-bold uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
            >
              Explore Parts
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white text-xs font-serif font-bold uppercase tracking-widest hover:bg-white/20 transition-all cursor-pointer"
            >
              Find Centers Near You
            </button>
          </div>

          <div className="pt-6 flex items-center justify-center gap-2 text-xs font-serif font-bold text-white/80">
            <div className="flex text-[#00D084]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span>4.8 Average Rating</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}
