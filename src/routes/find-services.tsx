import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import { getOnboardedCities, onboardNewCity, EVCity } from "../data/cities";
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
  Plus,
  X,
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
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState<{ title: string; price: string } | null>(null);

  // Dynamic Cities State
  const [cities, setCities] = useState<EVCity[]>(() => getOnboardedCities());
  const [onboardModalOpen, setOnboardModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState("");
  const [newCityState, setNewCityState] = useState("");

  const navigate = useNavigate();

  const heroTextRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const contentUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleUpdate = () => setCities(getOnboardedCities());
    window.addEventListener("ev_cities_updated", handleUpdate);
    return () => window.removeEventListener("ev_cities_updated", handleUpdate);
  }, []);

  // GSAP ScrollTrigger Animations (Matching Media Page Hero)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (heroTextRef.current && contentOverlayRef.current) {
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
      }

      if (contentUpRef.current) {
        gsap.fromTo(
          contentUpRef.current,
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentUpRef.current,
              start: "top 90%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );
      }
    });

    return () => ctx.revert();
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
    <div className="min-h-screen bg-[#070908] text-white selection:bg-[#00D084] selection:text-black font-sans relative overflow-x-hidden">
      
      {/* Header Nav */}
      <Nav
        onOpenBooking={() => {
          setBookingModalOpen(true);
        }}
      />

      {/* Main Container */}
      <div className="relative min-h-screen">

        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0)
           ========================================================================= */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background Poster Image */}
          <img
            src="/find-services-hero.jpg"
            alt="Find EV Services Hero"
            className="w-full h-full object-cover object-center opacity-100 pointer-events-none"
          />

          {/* Hero Content Container */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center items-center px-6 max-w-4xl mx-auto space-y-4 z-10 transition-all pointer-events-auto text-center overflow-y-auto py-6"
          >
            <div className="inline-flex items-center rounded-full bg-[#020403]/80 border border-[#00D084]/40 backdrop-blur-md px-3.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#00D084] shadow-md">
              Find Trusted Certified Technicians Near You
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Find Service Centers <br />
              <span className="text-[#00D084]">Near You</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-white/90 font-medium leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Your one-stop solution for all EV repair, maintenance and services — quick, reliable and hassle-free.
            </p>

            {/* Search Form Card */}
            <div className="bg-[#050c08]/90 border-2 border-[#00D084]/40 rounded-3xl p-6 md:p-8 text-left mt-4 backdrop-blur-xl w-full shadow-2xl">
              <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                <div>
                  <label className="text-[11px] text-white/50 block mb-1">Enter City or Area</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#00D084] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="Eg. Pune, Baner"
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="w-full bg-[#020403] border border-white/15 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-white/50 block mb-1">Select Service</label>
                  <div className="relative">
                    <Wrench className="w-4 h-4 text-[#00D084] absolute left-3.5 top-3.5" />
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-[#020403] border border-white/15 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084] cursor-pointer"
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
                  <label className="text-[11px] text-white/50 block mb-1">Select Brand</label>
                  <div className="relative">
                    <Zap className="w-4 h-4 text-[#00D084] absolute left-3.5 top-3.5" />
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full bg-[#020403] border border-white/15 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084] cursor-pointer"
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
                    className="w-full py-3 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" /> Find Nearby Centers
                  </button>
                </div>

              </form>

              <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-white/10 text-xs text-white/50">
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
        </div>

        {/* =========================================================================
            2. CONTENT OVERLAY LAYER (SLIDES UP DIRECTLY ON TOP OF THE FIXED HERO)
           ========================================================================= */}
        <div
          ref={contentOverlayRef}
          className="relative z-10 bg-[#070908] min-h-screen mt-[calc(100vh-80px)] pt-12 rounded-t-[40px] border-t border-white/10 shadow-2xl"
        >
          <div ref={contentUpRef}>

      {/* =========================================================================
          2. MARQUEE TICKER OF CERTIFIED FEATURES
         ========================================================================= */}
      <section className="bg-[#020403] py-3.5 overflow-hidden font-serif">
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
          3. ALL CITIES NETWORK MAP (Coverage / All Cities - 1st Section)
         ========================================================================= */}
      <section className="py-20 px-6 bg-[#020403] font-serif">
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
                {cities.length} {cities.length === 1 ? "city" : "cities"} in our network
              </span>
              <button
                onClick={() => setOnboardModalOpen(true)}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#00D084] hover:text-[#020403] border border-white/20 text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Onboard New City</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {cities.map((city) => (
              <Link
                key={city.id}
                to="/city/$cityId"
                params={{ cityId: city.id }}
                className={`max-w-[270px] w-full h-[370px] p-7 rounded-[36px] border-2 transition-all cursor-pointer font-serif flex flex-col justify-end group hover:scale-[1.03] relative overflow-hidden ${
                  selectedCity.toLowerCase() === city.name.toLowerCase()
                    ? "bg-[#050c08] border-[#00D084]"
                    : "bg-[#050907] border-white/10 hover:border-[#00D084]/60"
                }`}
              >
                {/* Background Image Layer */}
                <img
                  src={city.heroImage}
                  alt={city.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050c08] via-[#050c08]/65 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#00D084]/20 backdrop-blur-md border border-[#00D084]/40 flex items-center justify-center text-[#00D084] mb-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>

                  <h3 className="text-3xl font-serif font-black text-white group-hover:text-[#00D084] transition-colors">
                    {city.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. POPULAR SERVICES GRID (Services Directory / Popular Services - 2nd Section)
         ========================================================================= */}
      <section className="py-20 px-6 bg-[#020403] font-serif">
        <div className="max-w-7xl mx-auto">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {POPULAR_SERVICES.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setBookingService({ title: srv.title, price: srv.price });
                    setBookingModalOpen(true);
                  }}
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/15 hover:border-[#00D084] rounded-2xl p-5 text-center transition-all duration-300 cursor-pointer hover:bg-[#00D084]/15 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(0,208,132,0.2)] group"
                >
                  <div className="p-3.5 rounded-2xl bg-[#00D084]/15 text-[#00D084] border border-[#00D084]/30 mb-3 mx-auto w-fit group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-white group-hover:text-[#00D084] transition-colors">
                    {srv.title}
                  </h4>
                  <p className="text-[10px] text-white/50 font-serif mt-1">{srv.centers}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. TOP EV BRANDS WE SERVICE (Glassmorphism Styled)
         ========================================================================= */}
      <section className="py-20 px-6 bg-[#020403] font-serif">
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
                className="backdrop-blur-xl bg-white/[0.03] border border-white/15 hover:border-[#00D084] rounded-2xl p-5 text-center transition-all duration-300 cursor-pointer hover:bg-[#00D084]/15 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(0,208,132,0.2)] group"
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
          6. WHY CHOOSE MY EV SERVICE? (Glassmorphism Styled)
         ========================================================================= */}
      <section className="py-20 px-6 bg-[#020403] font-serif">
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
                  className="backdrop-blur-xl bg-white/[0.03] border border-white/15 hover:border-[#00D084]/50 rounded-3xl p-6 text-left flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(0,208,132,0.15)]"
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
          7. START YOUR OWN EV SERVICE CENTER BANNER (Matching Screenshot)
         ========================================================================= */}
      <section className="py-12 px-6 max-w-7xl mx-auto font-sans">
        <div className="relative rounded-[32px] overflow-hidden border border-white/20 bg-[#071915] min-h-[300px] flex flex-col lg:flex-row items-center justify-between p-8 sm:p-10 lg:p-12 shadow-2xl">
          {/* Right Background Image with Gradient Fade */}
          <div
            className="absolute inset-y-0 right-0 w-full lg:w-[55%] bg-cover bg-right bg-no-repeat pointer-events-none opacity-90"
            style={{
              backgroundImage: "url('/franchise-bg.png')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#071915] via-[#071915]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071915]/60 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Left Text Content */}
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Start Your Own EV Service Center
            </h2>

            <p className="text-sm sm:text-base text-[#80a196] font-normal leading-relaxed">
              Join India's fastest growing EV service network.
            </p>

            <div className="flex flex-wrap items-center gap-5 text-xs text-[#a0c5ba] font-medium pt-2 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[#00D084]">💵</span>
                <span>Low Investment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#00D084]">📈</span>
                <span>High Returns</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#00D084]">🎓</span>
                <span>Complete Training & Support</span>
              </div>
            </div>

            <Link
              to="/franchise"
              className="mt-4 px-7 py-3.5 rounded-full bg-[#05110d] text-[#00D084] text-sm font-bold border border-[#00D084]/20 hover:bg-[#00D084] hover:text-[#020403] transition-all flex items-center gap-2 w-fit cursor-pointer group shadow-lg"
            >
              <span>Become a Franchise Partner</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FREQUENTLY ASKED QUESTIONS (Matching Screenshot Style)
         ========================================================================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto font-sans">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <button
            onClick={() => toast.info("Viewing all FAQs")}
            className="text-[#00D084] font-bold text-sm hover:underline flex items-center gap-1.5 cursor-pointer group"
          >
            <span>View All FAQs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2-Column Accordion Cards matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column Box */}
          <div className="bg-[#070b09] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10">
            {FAQS.slice(0, 3).map((faq, idx) => {
              const actualIdx = idx;
              const isOpen = openFaqIdx === actualIdx;
              return (
                <div
                  key={actualIdx}
                  className="p-5 sm:p-6 transition-colors cursor-pointer hover:bg-white/[0.02]"
                  onClick={() => setOpenFaqIdx(isOpen ? null : actualIdx)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.q}
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 text-white/60 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#00D084]" : ""
                      }`}
                    />
                  </div>
                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column Box */}
          <div className="bg-[#070b09] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10">
            {FAQS.slice(3, 6).map((faq, idx) => {
              const actualIdx = idx + 3;
              const isOpen = openFaqIdx === actualIdx;
              return (
                <div
                  key={actualIdx}
                  className="p-5 sm:p-6 transition-colors cursor-pointer hover:bg-white/[0.02]"
                  onClick={() => setOpenFaqIdx(isOpen ? null : actualIdx)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.q}
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 text-white/60 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#00D084]" : ""
                      }`}
                    />
                  </div>
                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FOOTER CALLOUT BANNER
         ========================================================================= */}
      <section className="py-24 px-6 bg-[#020403] font-serif text-center">
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

          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        service={bookingService}
      />

      {/* Onboard New City Modal */}
      {onboardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans">
          <div className="bg-[#090f0c] border border-white/20 rounded-[32px] max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setOnboardModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-[#00D084] font-mono text-xs font-bold uppercase tracking-widest">
              <Plus className="w-4 h-4" /> CITY HUB ONBOARDING
            </div>

            <h3 className="text-2xl font-black tracking-tight text-white mb-2">
              Onboard a New City
            </h3>
            <p className="text-xs text-white/60 leading-relaxed mb-6">
              Enter city details to launch an official diagnostic hub network and auto-generate the city landing page.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newCityName) {
                  toast.error("Please enter a City Name.");
                  return;
                }
                const created = onboardNewCity({
                  name: newCityName,
                  state: newCityState || "India",
                  centersCount: Math.floor(Math.random() * 5) + 3,
                  areas: [`Central ${newCityName}`, "North Cluster", "South Cluster"],
                });
                toast.success(`City "${created.name}" onboarded! Dynamic page generated at /city/${created.id}`);
                setOnboardModalOpen(false);
                setNewCityName("");
                setNewCityState("");
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-mono text-white/60 block mb-1">City Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Surat, Kolkata, Chennai"
                  value={newCityName}
                  onChange={(e) => setNewCityName(e.target.value)}
                  className="w-full bg-[#030604] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-white/60 block mb-1">State Name</label>
                <input
                  type="text"
                  placeholder="e.g. Gujarat, West Bengal"
                  value={newCityState}
                  onChange={(e) => setNewCityState(e.target.value)}
                  className="w-full bg-[#030604] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg"
              >
                ONBOARD CITY & LAUNCH PAGE
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

    </div>
  );
}
