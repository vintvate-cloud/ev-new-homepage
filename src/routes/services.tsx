import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { SERVICES, SERVICE_CATEGORIES, EVServiceItem } from "../data/services";
import { PACKAGES } from "../data/packages";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  Search,
  Zap,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  X,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Info,
  Check,
  Award,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

// HERO BACKGROUND IMAGE — Update this image URL to put any custom image behind "More than an EV workshop."
export const HERO_BG_IMAGE =
  "https://images.unsplash.com/photo-1558441719-2347b7341ed2?w=1600&auto=format&fit=crop&q=80";

const ITEMS_PER_PAGE = 8;

// Fallback high-resolution thematic images per service category
const CATEGORY_IMAGES: Record<string, string> = {
  "Battery & Energy Systems":
    "https://images.unsplash.com/photo-1558441719-2347b7341ed2?w=800&auto=format&fit=crop&q=80",
  "Motor & Powertrain":
    "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80",
  "Controller & Electronics":
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
  "Diagnostics & Software":
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
  "Periodic Maintenance":
    "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800&auto=format&fit=crop&q=80",
  "Wire-harness & Connectors":
    "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=800&auto=format&fit=crop&q=80",
  "Display & Sensors":
    "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=800&auto=format&fit=crop&q=80",
  "Brake System":
    "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80",
  "Tyre & Suspension":
    "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=800&auto=format&fit=crop&q=80",
  "Charging Systems":
    "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
  "Cleaning & Protection":
    "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&auto=format&fit=crop&q=80",
  "Emergency Services":
    "https://images.unsplash.com/photo-1562920840-086c2e718b52?w=800&auto=format&fit=crop&q=80",
  "Inspection & Certification":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
};

// Detailed category subtitles for EV services matching screenshot style
const CATEGORY_SUBTITLES: Record<string, string> = {
  "All Services":
    "High-yield diagnostic modules, cell balancing, and autonomous EV care platforms.",
  "Battery & Energy Systems":
    "Cell-level internal resistance audit, SOH score & active cell balancing.",
  "Motor & Powertrain":
    "BLDC motor bearing renewal, hall sensor alignment & gearbox flushing.",
  "Controller & Electronics":
    "MOSFET power gate repairs, HV isolation testing & DC-DC converter modules.",
  "Diagnostics & Software":
    "OTA ECU firmware updates, CAN-bus telemetry tracing & live OBD-II logging.",
  "Periodic Maintenance":
    "Full-spectrum 32-point inspection checkups & seasonal protection audits.",
  "Wire-harness & Connectors":
    "High-voltage conduit sleeving, hydraulic lug crimps & DC circuit panels.",
  "Display & Sensors":
    "Digital TFT cluster repair, wheel speed ABS alignment & keyless NFC pairing.",
  "Brake System":
    "Hydraulic DOT4 vacuum flushing, ceramic pad swaps & electronic EBS sync.",
  "Tyre & Suspension":
    "Low-rolling-resistance EV tyres, laser rim alignment & suspension fork renewal.",
  "Charging Systems":
    "Home charger port earth audits, CCS2 thermal scans & OCPP smart patches.",
  "Cleaning & Protection":
    "Dielectric zero-water eco foam wash, 9H ceramic coating & underbody rust guard.",
  "Emergency Services":
    "24/7 mobile service van dispatch, flatbed hydraulic towing & roadside jumpstart.",
  "Inspection & Certification":
    "50-point digital EV health certificates & SOH laboratory capacity ratings.",
};

function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [vehicleType, setVehicleType] = useState<"2W" | "3W">("2W");
  const [selectedService, setSelectedService] = useState<EVServiceItem | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<typeof PACKAGES[0] | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Dynamic Theme state listening to document.documentElement
  const [siteTheme, setSiteTheme] = useState<"dark" | "light">(() => {
    if (
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("theme-light")
    ) {
      return "light";
    }
    return "dark";
  });

  // Listen to document.documentElement theme-light mutations from header Nav button
  useEffect(() => {
    if (typeof document === "undefined") return;

    const checkTheme = () => {
      const isLight = document.documentElement.classList.contains("theme-light");
      setSiteTheme(isLight ? "light" : "dark");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Form State for Booking
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    city: "Mumbai",
    date: "",
    address: "",
  });

  // Filter services based on search & category
  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory =
        selectedCategory === "All Services" || service.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.desc.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.specs.some((s) => s.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredServices.length / ITEMS_PER_PAGE));
  const currentServices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredServices.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredServices, currentPage]);

  const handleBookService = (service: EVServiceItem) => {
    setSelectedService(service);
    setSelectedPackage(null);
    setBookingModalOpen(true);
  };

  const handleBookPackage = (pkg: typeof PACKAGES[0]) => {
    setSelectedPackage(pkg);
    setSelectedService(null);
    setBookingModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      toast.error("Please fill in your Name and Mobile Number.");
      return;
    }
    toast.success(
      `Booking Confirmed! Our engineering team will contact you shortly for ${
        selectedService ? selectedService.title : selectedPackage?.title
      }.`
    );
    setBookingModalOpen(false);
    setBookingForm({ name: "", phone: "", city: "Mumbai", date: "", address: "" });
  };

  const currentCategorySubtitle =
    CATEGORY_SUBTITLES[selectedCategory] || CATEGORY_SUBTITLES["All Services"];

  const isLight = siteTheme === "light";

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 ${
        isLight
          ? "bg-[#f8faf9] text-[#1a2320] selection:bg-[#00D084] selection:text-black"
          : "bg-[#030604] text-white selection:bg-[#00D084] selection:text-black"
      }`}
    >
      {/* Landing Page Shared Header Nav */}
      <Nav
        onOpenBooking={() => {
          setSelectedService(SERVICES[0]);
          setBookingModalOpen(true);
        }}
      />

      {/* =========================================================================
          2. HERO SECTION (Full-Width, Edge-to-Edge Display attached to display)
         ========================================================================= */}
      <section
        className={`relative w-full rounded-none overflow-hidden text-white pt-44 pb-44 md:pt-52 md:pb-52 px-6 min-h-[560px] flex items-center justify-center -mt-20 border-b ${
          isLight ? "bg-[#0c1410] border-[#2d3a34]" : "bg-[#060b08] border-white/10"
        }`}
      >
        {/* Background image overlay directly behind "More than an EV workshop." */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-luminosity pointer-events-none scale-105 transition-all duration-700"
          style={{
            backgroundImage: `url('${HERO_BG_IMAGE}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020403]/85 via-[#030604]/55 to-[#020403]/95 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 my-auto pt-4 md:pt-8">
          {/* Headline text with background image support */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-5 leading-[1.08] drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            More than an EV workshop.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#c2d1c7] font-normal max-w-2xl mx-auto mb-10 drop-shadow-md">
            It's your mobility infrastructure. We power your journey.
          </p>

          <a
            href="#products-grid"
            className="inline-flex items-center gap-2 rounded-full bg-[#00D084] text-[#020403] px-9 py-4 text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_30px_rgba(0,208,132,0.4)] hover:scale-105 cursor-pointer"
          >
            GET STARTED
          </a>
        </div>
      </section>

      {/* 3. HERO OVERLAPPING CARDS ROW (Exact Match to Screenshot - Tall 420px Poster Cards for Value Packages) */}
      <div className="-mt-28 relative z-20 max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACKAGES.slice(0, 4).map((pkg, index) => {
            const bgImg =
              pkg.img ||
              CATEGORY_IMAGES["Battery & Energy Systems"] ||
              "https://images.unsplash.com/photo-1558441719-2347b7341ed2?w=800&auto=format&fit=crop&q=80";
            const tagCode = `SAVINGS • 0${index + 1}`;

            return (
              <div
                key={pkg.id}
                onClick={() => handleBookPackage(pkg)}
                className={`relative h-[420px] rounded-[28px] overflow-hidden p-5 shadow-2xl transition-all duration-500 cursor-pointer group flex flex-col justify-between border-none ${
                  isLight
                    ? "shadow-lg hover:shadow-2xl hover:scale-[1.02]"
                    : "shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:scale-[1.02]"
                }`}
              >
                {/* Full Card Cover Image */}
                <img
                  src={bgImg}
                  alt={pkg.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 pointer-events-none"
                />

                {/* Dark Vignette Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 pointer-events-none" />

                {/* Top Badges Header */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase text-[#00D084] border border-[#00D084]/40 shadow-sm">
                    {tagCode}
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="bg-[#00D084] text-[#020403] text-[9px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                      {pkg.save}
                    </span>
                    {["CE", "RoHS"].map((c) => (
                      <span
                        key={c}
                        className="bg-black/75 backdrop-blur-md text-[8px] font-mono font-bold text-white border border-white/20 rounded-full w-5 h-5 flex items-center justify-center shadow-xs"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Overlay Content */}
                <div className="relative z-10 pt-16">
                  {/* Eyebrow */}
                  <div className="text-[10px] font-mono font-bold uppercase text-[#00D084] tracking-wider mb-1">
                    MORE SERVICES • BETTER SAVINGS
                  </div>

                  {/* Title & Tag */}
                  <h3 className="text-xl font-black text-white leading-snug mb-1 drop-shadow-md group-hover:text-[#00D084] transition-colors">
                    {pkg.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-white/80 font-normal leading-relaxed line-clamp-2 mb-3">
                    {pkg.desc}
                  </p>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 mb-4 font-mono">
                    <span className="text-2xl font-black text-white">{pkg.price}</span>
                    <span className="text-xs text-white/50 line-through">{pkg.oldPrice}</span>
                  </div>

                  {/* 2 Action Buttons: DETAILS & BOOK NOW */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookPackage(pkg);
                      }}
                      className="py-3 rounded-full border border-white/40 text-white hover:bg-white/15 backdrop-blur-md text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer text-center"
                    >
                      DETAILS
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookPackage(pkg);
                      }}
                      className="py-3 rounded-full bg-[#00D084] hover:bg-[#00e08f] text-[#020403] text-[11px] font-black uppercase tracking-wider transition-all shadow-md cursor-pointer text-center"
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          4. ENGINEERED INTRO SECTION
         ========================================================================= */}
      <section id="engineered-section" className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column Heading */}
          <div className="lg:col-span-7">
            <h2
              className={`text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] ${
                isLight ? "text-[#1a2320]" : "text-white"
              }`}
            >
              Expert EV Services
            </h2>
          </div>

          {/* Right Column Paragraph & Green Circle Icon */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <p
              className={`text-base sm:text-lg font-normal leading-relaxed ${
                isLight ? "text-[#4a5851]" : "text-white/70"
              }`}
            >
              Professional diagnostics and repairs for Electric Scooters, Bikes & Autos
            </p>

            <div>
              <div className="w-8 h-8 rounded-full border-2 border-[#00D084] text-[#00D084] flex items-center justify-center hover:bg-[#00D084] hover:text-[#020403] transition-colors cursor-pointer">
                <Check className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#00D084] text-[#020403] shadow-md scale-105"
                    : isLight
                    ? "bg-[#e2ebe4] text-[#334139] hover:bg-[#d5e2d8] hover:text-[#1a2320]"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Switcher */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl p-4 md:px-6 mb-12 border ${
            isLight
              ? "bg-[#e5eee7] border-[#d2e0d5]"
              : "bg-[#090f0c] border-white/10"
          }`}
        >
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D084]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services by name, specs or category..."
              className={`w-full rounded-xl pl-11 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#00D084] border ${
                isLight
                  ? "bg-white border-[#c5d6ca] text-[#1a2320] placeholder-[#607267]"
                  : "bg-[#030604] border-white/15 text-white placeholder-white/40"
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="text-xs font-mono font-bold text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/20 rounded-lg px-3.5 py-1.5">
              {filteredServices.length} Services Available
            </div>

            {/* Vehicle Type Switcher */}
            <div
              className={`flex items-center rounded-xl p-1 border ${
                isLight ? "bg-white border-[#c5d6ca]" : "bg-[#030604] border-white/15"
              }`}
            >
              <button
                onClick={() => setVehicleType("2W")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  vehicleType === "2W"
                    ? "bg-[#00D084] text-[#020403] shadow-xs"
                    : isLight
                    ? "text-[#4a5851] hover:text-[#1a2320]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                2W (Scooter/Bike)
              </button>
              <button
                onClick={() => setVehicleType("3W")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  vehicleType === "3W"
                    ? "bg-[#00D084] text-[#020403] shadow-xs"
                    : isLight
                    ? "text-[#4a5851] hover:text-[#1a2320]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                3W (Auto/Cargo)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. MAIN SERVICE CARDS GRID
         ========================================================================= */}
      <section id="products-grid" className="pb-24 px-6 max-w-7xl mx-auto">
        
        {/* Category Header Title & Subtitle */}
        <div className="mb-8">
          <h3
            className={`text-3xl font-black tracking-tight mb-1 ${
              isLight ? "text-[#1a2320]" : "text-white"
            }`}
          >
            {selectedCategory === "All Services"
              ? "EV Service & Diagnostics Platforms"
              : selectedCategory}
          </h3>
          <p
            className={`text-sm font-normal ${
              isLight ? "text-[#52645a]" : "text-white/70"
            }`}
          >
            {currentCategorySubtitle}
          </p>
        </div>

        {/* 4-Column Product Grid (Unboxed Clean Design like Hindled Screenshot) */}
        {currentServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {currentServices.map((service, index) => {
              const bgImg =
                CATEGORY_IMAGES[service.category] ||
                "https://images.unsplash.com/photo-1558441719-2347b7341ed2?w=800&auto=format&fit=crop&q=80";
              const tagCode = `${service.id.split("-")[0]} • 0${(index % 8) + 1}`;
              const firstSpec = service.specs[0] ? service.specs[0].toUpperCase() : "DIAGNOSTIC MODULE";

              return (
                <div
                  key={service.id}
                  onClick={() => handleBookService(service)}
                  className="flex flex-col justify-between transition-all duration-300 group cursor-pointer hover:-translate-y-1 bg-transparent p-0 border-none shadow-none"
                >
                  {/* Top Standalone Image Container */}
                  <div className="relative h-56 w-full rounded-[26px] overflow-hidden mb-4 bg-slate-900 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={bgImg}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                    {/* Top Left Tag Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase text-[#1a2320] border border-white/50 shadow-sm">
                      {tagCode}
                    </div>

                    {/* Safety cert badges top right */}
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                      {["CE", "RoHS", "ISO"].map((c) => (
                        <span
                          key={c}
                          className="bg-black/75 backdrop-blur-md text-[8px] font-mono font-bold text-white border border-white/20 rounded-full w-5 h-5 flex items-center justify-center shadow-xs"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Body Content (Directly on Page Background, No Card Box) */}
                  <div className="flex-1 flex flex-col justify-between mb-4 px-0.5">
                    <div>
                      {/* Card Title */}
                      <h4
                        className={`text-base font-black tracking-tight transition-colors mb-2 leading-snug ${
                          isLight
                            ? "text-[#1a2320] group-hover:text-[#009b4e]"
                            : "text-white group-hover:text-[#00D084]"
                        }`}
                      >
                        {service.title}
                      </h4>

                      {/* Paragraph Description */}
                      <p
                        className={`text-xs font-normal leading-relaxed line-clamp-3 mb-3 ${
                          isLight ? "text-[#52645a]" : "text-white/60"
                        }`}
                      >
                        {service.desc}
                      </p>
                    </div>

                    {/* Pricing Summary */}
                    <div
                      className={`pt-2.5 border-t flex items-center justify-between text-xs font-mono mb-1 ${
                        isLight ? "border-[#d8e5dc]" : "border-white/10"
                      }`}
                    >
                      <span
                        className={`text-[11px] ${
                          isLight ? "text-[#607267]" : "text-white/50"
                        }`}
                      >
                        Rates ({vehicleType}):
                      </span>
                      <span
                        className={`font-black text-sm ${
                          isLight ? "text-[#009b4e]" : "text-[#00D084]"
                        }`}
                      >
                        {vehicleType === "2W" ? service.price2W : service.price3W}
                      </span>
                    </div>
                  </div>

                  {/* 2 Standalone Action Buttons: DETAILS & BOOK NOW */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookService(service);
                      }}
                      className={`py-3 rounded-full border text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                        isLight
                          ? "border-[#009b4e] text-[#009b4e] hover:bg-[#009b4e]/10"
                          : "border-[#00D084] text-[#00D084] hover:bg-[#00D084]/10"
                      }`}
                    >
                      DETAILS
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookService(service);
                      }}
                      className="py-3 rounded-full bg-[#009b4e] hover:bg-[#008643] text-white text-[11px] font-black uppercase tracking-wider transition-all shadow-md cursor-pointer text-center"
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={`py-20 text-center rounded-[28px] border ${
              isLight ? "bg-white border-[#d6e3da]" : "bg-[#090f0c] border-white/10 text-white"
            }`}
          >
            <Info className="w-12 h-12 text-[#00D084] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Services Match Your Criteria</h3>
            <p className="text-sm opacity-70 mb-6">
              Try resetting your search query or selecting ALL SERVICES.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Services");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-40 ${
                isLight
                  ? "bg-white border-[#d6e3da] text-[#1a2320] hover:border-[#00D084]"
                  : "bg-[#090f0c] border-white/10 text-white hover:border-[#00D084]"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? "bg-[#00D084] text-[#020403] shadow-sm font-black"
                    : isLight
                    ? "bg-white border border-[#d6e3da] text-[#1a2320] hover:border-[#00D084]"
                    : "bg-[#090f0c] border border-white/10 text-white hover:border-[#00D084]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-40 ${
                isLight
                  ? "bg-white border-[#d6e3da] text-[#1a2320] hover:border-[#00D084]"
                  : "bg-[#090f0c] border-white/10 text-white hover:border-[#00D084]"
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* =========================================================================
          6. VALUE PACKAGES SECTION
         ========================================================================= */}
      <section
        id="packages"
        className={`py-24 border-t px-6 ${
          isLight
            ? "border-[#d2e0d5] bg-[#e7f1e9]"
            : "border-white/10 bg-[#060b08]"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                Value Packages
              </span>
              <h2
                className={`text-4xl md:text-5xl font-black tracking-tight mt-3 mb-4 ${
                  isLight ? "text-[#1a2320]" : "text-white"
                }`}
              >
                More services. <span className="text-[#00D084]">Better savings.</span>
              </h2>
              <p
                className={`text-base font-light leading-relaxed ${
                  isLight ? "text-[#4a5851]" : "text-white/70"
                }`}
              >
                Pre-bundled EV care packs engineered to keep your vehicle operating at peak efficiency.
              </p>
            </div>

            <div>
              <button
                onClick={() => {
                  setSelectedCategory("All Services");
                  window.scrollTo({ top: 800, behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-extrabold uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer shadow-sm"
              >
                EXPLORE ALL SERVICES
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className={`rounded-[28px] p-6 flex flex-col justify-between transition-all duration-300 border-none relative group ${
                    isLight
                      ? "bg-white shadow-md hover:shadow-2xl"
                      : "bg-[#090f0c] shadow-xl hover:shadow-[0_15px_40px_rgba(0,208,132,0.15)]"
                  }`}
                >
                  <div className="absolute top-4 right-4 bg-[#00D084]/15 border border-[#00D084]/30 text-[#00D084] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                    {pkg.tag}
                  </div>

                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#00D084]/10 border border-[#00D084]/20 flex items-center justify-center text-[#00D084] mb-6">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isLight ? "text-[#1a2320]" : "text-white"
                      }`}
                    >
                      {pkg.title}
                    </h3>
                    <p
                      className={`text-xs mb-6 font-normal leading-relaxed ${
                        isLight ? "text-[#52645a]" : "text-white/60"
                      }`}
                    >
                      {pkg.desc}
                    </p>

                    <div className="space-y-2.5 mb-8">
                      {pkg.features.map((feature, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-2.5 text-xs ${
                            isLight ? "text-[#334139]" : "text-white/80"
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`pt-6 border-t ${
                      isLight ? "border-slate-100" : "border-white/10"
                    }`}
                  >
                    <div className="flex items-baseline gap-3 mb-2">
                      <span
                        className={`text-3xl font-extrabold font-mono ${
                          isLight ? "text-[#1a2320]" : "text-white"
                        }`}
                      >
                        {pkg.price}
                      </span>
                      <span className="text-sm text-slate-400 line-through font-mono">
                        {pkg.oldPrice}
                      </span>
                      <span className="text-xs font-bold text-[#00D084] bg-[#00D084]/10 px-2 py-0.5 rounded">
                        {pkg.save}
                      </span>
                    </div>

                    <div
                      className={`text-[11px] font-mono mb-6 ${
                        isLight ? "text-[#607267]" : "text-white/50"
                      }`}
                    >
                      {pkg.validity}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookPackage(pkg);
                        }}
                        className={`py-3 rounded-full border text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                          isLight
                            ? "border-[#009b4e] text-[#009b4e] hover:bg-[#009b4e]/10"
                            : "border-[#00D084] text-[#00D084] hover:bg-[#00D084]/10"
                        }`}
                      >
                        DETAILS
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookPackage(pkg);
                        }}
                        className="py-3 rounded-full bg-[#00D084] hover:bg-[#00e08f] text-[#020403] text-[11px] font-black uppercase tracking-wider transition-all shadow-md cursor-pointer text-center"
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FOOTER SECTION
         ========================================================================= */}
      {/* Global Shared Footer */}
      <Footer />

      {/* =========================================================================
          8. INTERACTIVE BOOKING & DETAILS MODAL
         ========================================================================= */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className={`border rounded-[32px] max-w-lg w-full p-6 md:p-8 relative overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 ${
              isLight
                ? "bg-white border-[#d6e3da] text-[#1a2320]"
                : "bg-[#090f0c] border-white/15 text-white"
            }`}
          >
            <button
              onClick={() => setBookingModalOpen(false)}
              className={`absolute top-5 right-5 p-2 rounded-full transition-colors cursor-pointer ${
                isLight ? "text-slate-400 hover:text-slate-900 bg-slate-100" : "text-white/40 hover:text-white bg-white/10"
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D084]">
                Direct EV Service Booking
              </span>
              <h3 className="text-2xl font-black mt-1">
                {selectedService ? selectedService.title : selectedPackage?.title}
              </h3>
              <p className="text-xs opacity-75 mt-1">
                {selectedService ? selectedService.desc : selectedPackage?.desc}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-2">
                  Vehicle Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVehicleType("2W")}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      vehicleType === "2W"
                        ? "bg-[#00D084] border-[#00D084] text-[#020403]"
                        : isLight
                        ? "border-[#c5d6ca] bg-[#f2f7f4] text-[#1a2320]"
                        : "border-white/15 bg-[#030604] text-white"
                    }`}
                  >
                    2W (Scooter / Bike)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVehicleType("3W")}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      vehicleType === "3W"
                        ? "bg-[#00D084] border-[#00D084] text-[#020403]"
                        : isLight
                        ? "border-[#c5d6ca] bg-[#f2f7f4] text-[#1a2320]"
                        : "border-white/15 bg-[#030604] text-white"
                    }`}
                  >
                    3W (Auto / Cargo)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#00D084] ${
                    isLight
                      ? "bg-[#f2f7f4] border-[#c5d6ca] text-[#1a2320]"
                      : "bg-[#030604] border-white/15 text-white"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#00D084] ${
                      isLight
                        ? "bg-[#f2f7f4] border-[#c5d6ca] text-[#1a2320]"
                        : "bg-[#030604] border-white/15 text-white"
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className={`w-full border rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#00D084] ${
                      isLight
                        ? "bg-[#f2f7f4] border-[#c5d6ca] text-[#1a2320]"
                        : "bg-[#030604] border-white/15 text-white"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                  Pickup / Doorstep Address
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter full address for doorstep service dispatch..."
                  value={bookingForm.address}
                  onChange={(e) => setBookingForm({ ...bookingForm, address: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#00D084] ${
                    isLight
                      ? "bg-[#f2f7f4] border-[#c5d6ca] text-[#1a2320]"
                      : "bg-[#030604] border-white/15 text-white"
                  }`}
                />
              </div>

              {/* Price summary */}
              <div
                className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  isLight
                    ? "bg-[#e5eee7] border-[#d2e0d5]"
                    : "bg-[#030604] border-white/15"
                }`}
              >
                <span className="text-xs opacity-75">Estimated Service Cost:</span>
                <span className="text-lg font-black text-[#00D084] font-mono">
                  {selectedService
                    ? vehicleType === "2W"
                      ? selectedService.price2W
                      : selectedService.price3W
                    : selectedPackage?.price}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-md cursor-pointer mt-2"
              >
                CONFIRM APPOINTMENT
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
