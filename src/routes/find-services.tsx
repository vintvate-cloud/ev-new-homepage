import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import { CityPreBookingModal, DEFAULT_CITY_SLOTS, PreBookingSlot } from "../components/CityPreBookingModal";
import { getOnboardedCities, onboardNewCity, EVCity, findMatchingAvailableCity, getCityServiceCenters, ServiceCenter } from "../data/cities";
import { EV_BRANDS_POPULAR, EV_CATALOG, BOOKING_SERVICES_LIST, getBrandLogoUrl } from "../data/evCatalog";
import {
  Search,
  MapPin,
  Wrench,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Star,
  Clock,
  BatteryCharging,
  ArrowRight,
  PhoneCall,
  Phone,
  Navigation,
  Plus,
  X,
  Cpu,
  Activity,
  Layers,
  Sparkles,
  CalendarCheck,
  Building2,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

// ─── Framer Motion Variants ───────────────────────────────────────────────────
const EASE_SPRING = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_SPRING } },
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_SPRING } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE_SPRING } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: EASE_SPRING } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface CityOfferCampaign {
  id: string; cityName: string; badge: string; title: string; subtitle: string;
  discountTag: string; code: string; validUntil: string; perks: string[];
}

const CITY_OFFER_CAMPAIGNS: Record<string, CityOfferCampaign> = {
  pune: { id: "pune-monsoon-2026", cityName: "Pune", badge: "🔥 PUNE MONSOON SPECIAL", title: "Flat 25% OFF on BMS Battery Diagnostics & Cell Equalization", subtitle: "Exclusive for Pune EV owners! Free 32-Point Battery Health Scan & 90-Day Service Warranty across Baner, Wakad, Kothrud & Kharadi centers.", discountTag: "FLAT 25% OFF", code: "MYEVPUNE25", validUntil: "Ends in 3 days • 18 Left", perks: ["Free Doorstep Pickup in Pune", "Instant Diagnostic Report", "90-Day Warranty"] },
  mumbai: { id: "mumbai-mega-2026", cityName: "Mumbai", badge: "⚡ MUMBAI MEGA EV FESTIVAL", title: "Flat ₹500 OFF General Service + FREE 6-Month Emergency RSA", subtitle: "Rain-ready monsoon maintenance package for Ola, Ather & TVS 2W owners in Mumbai & Thane.", discountTag: "FLAT ₹500 OFF", code: "MUMBAI500", validUntil: "Valid till Sunday • Limited Slots", perks: ["Free RSA Towing (24/7)", "OEM Genuine Spare Parts", "3-Hour Express Service"] },
  bengaluru: { id: "blr-tech-2026", cityName: "Bengaluru", badge: "🚀 BENGALURU TECH CARE CAMPAIGN", title: "FREE BMS Software Firmware Flashing + 20% OFF Motor Tuning", subtitle: "High-performance motor controller calibration and thermal safety checks in Indiranagar, HSR & Koramangala.", discountTag: "FREE SOFTWARE FLASH", code: "BLREVTECH", validUntil: "Expires in 48 Hours", perks: ["FOC Controller Tuning", "Zero Cancellation Fee", "Certified Techs"] },
  delhi: { id: "delhi-green-2026", cityName: "Delhi NCR", badge: "🌿 DELHI NCR CLEAN AIR CAMPAIGN", title: "Flat 30% OFF Comprehensive Periodic Maintenance", subtitle: "Special monsoon care for Noida, Gurgaon & South Delhi EV riders with certified cell diagnostics.", discountTag: "30% DISCOUNT", code: "DELHIGREEN30", validUntil: "Limited to first 50 bookings", perks: ["Free Battery Safety Audit", "Same-Day Return", "100% Original Spares"] },
  hyderabad: { id: "hyd-charge-2026", cityName: "Hyderabad", badge: "⚡ HYDERABAD CHARGE-UP PROMO", title: "FREE Charger & Port Diagnostics + Flat 20% OFF Repairs", subtitle: "Get fast diagnostic reporting & cell balancing in Gachibowli, HITECH City & Madhapur.", discountTag: "FREE CHARGER SCAN", code: "HYDCHARGE20", validUntil: "Ends this week", perks: ["Free Charger Cable Check", "Doorstep Pickup", "Digital Jobcard"] },
};

const DEFAULT_CAMPAIGN: CityOfferCampaign = { id: "all-india-2026", cityName: "Pan-India", badge: "🇮🇳 PAN-INDIA EV REVOLUTION OFFER", title: "Flat 20% OFF Any EV Service + Free 32-Point Inspection", subtitle: "Available across all 40+ onboarded cities in India. Book certified doorstep or workshop service today!", discountTag: "FLAT 20% OFF", code: "MYEV2026", validUntil: "Active Today • All Centers", perks: ["40+ Cities Active", "Genuine OEM Components", "Instant Online Booking"] };

function getCityOfferCampaign(city: string): CityOfferCampaign {
  if (!city) return DEFAULT_CAMPAIGN;
  const key = city.trim().toLowerCase();
  for (const cName in CITY_OFFER_CAMPAIGNS) {
    if (key.includes(cName) || cName.includes(key)) return CITY_OFFER_CAMPAIGNS[cName];
  }
  return { ...DEFAULT_CAMPAIGN, cityName: city.toUpperCase(), title: `SPECIAL ${city.toUpperCase()} EV MAINTENANCE OFFER`, subtitle: `Get 20% OFF on all EV services in ${city} with 90-day warranty & certified diagnostic scan.`, code: `MYEV${city.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 5)}20` };
}

interface ExperienceItem { id: string; name: string; avatar: string; evModel: string; location: string; badge: string; quote: string; jobCard?: string; rating: number; }

const EXPERIENCES_DATA: ExperienceItem[] = [
  { id: "exp-1", name: "Rajesh Sharma", avatar: "RS", evModel: "Ola S1 Pro Owner", location: "Baner, Pune", badge: "⚡ SAVED ₹18,000 IN BATTERY REPAIR", quote: "My Ola S1 battery was draining rapidly near Baner. MY EV SERVICE diagnosed a faulty BMS thermal sensor within 30 minutes at their Baner workshop and saved me ₹18,000 in full pack replacement!", jobCard: "Job Card #EV-8821", rating: 5 },
  { id: "exp-2", name: "Priya Deshmukh", avatar: "PD", evModel: "Ather 450X Owner", location: "Bandra, Mumbai", badge: "📍 20-MIN RSA RESPONSE", quote: "Got stuck in waterlogged streets of Bandra during heavy rain. Their 24/7 mobile van arrived in 20 minutes, ran battery insulation checks, and escorted me home safely.", rating: 5 },
  { id: "exp-3", name: "Karthik Venkat", avatar: "KV", evModel: "Fleet Manager (45 EV Scooters)", location: "Indiranagar, BLR", badge: "🚀 +14% RANGE BOOST", quote: "We manage a commercial fleet of 45 delivery scooters in Bangalore. Their periodic software firmware flashing and cell balancing increased our daily range by 14%!", rating: 5 },
  { id: "exp-4", name: "Amitabh Verma", avatar: "AV", evModel: "TVS iQube Electric", location: "Cyber City, Gurugram", badge: "🔋 FOC CELL EQUALIZATION", quote: "After 2 years of daily commutes to Cyber City, my battery health dropped to 74%. Their workshop performed active cell balancing and brought it back up to 92%!", jobCard: "Job Card #EV-9140", rating: 5 },
  { id: "exp-5", name: "Sneha Reddi", avatar: "SR", evModel: "Hero Vida V1 Pro", location: "Gachibowli, Hyderabad", badge: "⚡ FAST CHARGER FIX", quote: "My home charger port was throwing high voltage errors. The mobile diagnostic tech arrived at Gachibowli within an hour and fixed the ground leak issue on the spot.", rating: 5 },
  { id: "exp-6", name: "Vikram Mehta", avatar: "VM", evModel: "Bajaj Chetak Premium", location: "SG Highway, Ahmedabad", badge: "🔧 45-MIN EXPRESS SERVICE", quote: "Booked periodic motor controller calibration on SG Highway. Rapid 45-minute turnaround with digital job card updates directly on WhatsApp!", rating: 5 },
];

const POPULAR_SERVICES = [
  { id: "srv-1", title: "Battery Health Scan", category: "Battery & BMS", centers: "180+ Hubs", image: "https://images.unsplash.com/photo-1558441719-670b357024bf?w=800&auto=format&fit=crop&q=80", desc: "32-Point cell voltage, thermal sensor audit & state-of-health report.", price: "₹399", badge: "⚡ 30-MIN EXPRESS", duration: "30 Mins", rating: "4.9★" },
  { id: "srv-2", title: "Motor & FOC Controller Tuning", category: "Motor & Drive", centers: "150+ Hubs", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80", desc: "Controller phase wire calibration, hall sensor testing & torque optimization.", price: "₹1,999", badge: "🚀 TOP PERFORMANCE", duration: "60 Mins", rating: "4.9★" },
  { id: "srv-3", title: "Fast Charger & Port Repair", category: "Diagnostics & Software", centers: "220+ Hubs", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80", desc: "High voltage thermal fuse replacement, ground fault fix & socket isolation test.", price: "₹899", badge: "🔌 SAFETY VERIFIED", duration: "45 Mins", rating: "4.8★" },
  { id: "srv-4", title: "BMS Firmware Flashing", category: "Diagnostics & Software", centers: "310+ Hubs", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80", desc: "Official OEM OTA firmware flashing, CAN bus telemetry reset & ECU updates.", price: "₹699", badge: "💻 OEM OFFICIAL", duration: "20 Mins", rating: "5.0★" },
  { id: "srv-5", title: "Active Cell Equalization", category: "Battery & BMS", centers: "420+ Hubs", image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&auto=format&fit=crop&q=80", desc: "Precision active cell balancing to restore lost battery range by up to 15%.", price: "₹1,399", badge: "🔋 RANGE BOOST", duration: "2 Hours", rating: "4.9★" },
  { id: "srv-6", title: "Monsoon Insulation Protection", category: "Motor & Drive", centers: "290+ Hubs", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80", desc: "Waterproofing enclosure seal check, IP67 harness coating & rust treatment.", price: "₹999", badge: "🌧️ MONSOON SHIELD", duration: "45 Mins", rating: "4.9★" },
  { id: "srv-7", title: "Full Pack BMS Thermal Repair", category: "Battery & BMS", centers: "510+ Hubs", image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80", desc: "Component-level repair of thermal sensors, BMS logic boards & heavy connectors.", price: "₹3,499", badge: "🛡️ 90-DAY WARRANTY", duration: "3 Hours", rating: "5.0★" },
  { id: "srv-8", title: "Comprehensive Annual Care", category: "Diagnostics & Software", centers: "600+ Hubs", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80", desc: "Complete 45-point EV health service, brake fluid bleed & belt alignment.", price: "₹2,499", badge: "🌟 BEST VALUE", duration: "3.5 Hours", rating: "4.9★" },
];

const BRANDS = [
  { name: "Ola Electric", logo: "/brands/ola.jpeg", models: "S1 Pro, S1 Air, S1 X" },
  { name: "Ather", logo: "/brands/ather.jpeg", models: "450X, 450S, Rizta" },
  { name: "TVS", logo: "/brands/tvs.webp", models: "iQube, X" },
  { name: "Hero Electric", logo: "/brands/hero-electric.jpeg", models: "Optima, Nyx, Atria" },
  { name: "Vida by Hero", logo: "/brands/hero-electric.jpeg", models: "Vida V1 Plus, V1 Pro" },
  { name: "Bajaj Chetak", logo: "/brands/bajaj.png", models: "Chetak Premium, Urbane" },
];

const WHY_CHOOSE = [
  { title: "Certified Technicians", subtitle: "Expert in EV repair & service", desc: "All workshop staff are trained at Autobot Master Academy for high-voltage battery safety.", icon: ShieldCheck },
  { title: "Genuine Spare Parts", subtitle: "100% original & reliable", desc: "Direct OEM supply chain fulfillment for authentic BMS, controllers, and spare cells.", icon: CheckCircle2 },
  { title: "Quick & On-time Service", subtitle: "We value your time", desc: "Same-day turnaround for standard maintenance & express diagnostic turnaround.", icon: Clock },
  { title: "Transparent Pricing", subtitle: "No hidden charges", desc: "AI estimated digital job cards before service starts with upfront line item prices.", icon: Zap },
  { title: "Trusted by Thousands", subtitle: "4.8+ customer rating", desc: "Over 25,000+ happy electric 2W & 3W owners serviced across our network.", icon: Star },
];

const FAQS = [
  { q: "How can I find EV service centers near me?", a: "Simply enter your city or area (e.g. Pune, Baner) in the search bar above, select your EV brand and required service, and click 'Find Nearby Centers' to view verified local centers." },
  { q: "Is there any warranty on the service?", a: "Yes! All repairs and periodic maintenance carried out at MY EV SERVICE centers come with a standard 90-day work warranty and genuine OEM spare parts warranty." },
  { q: "Do you use genuine spare parts?", a: "100%. We source components directly from certified manufacturers and OEM supply chains to ensure total reliability and battery safety." },
  { q: "Can I book a service for my electric scooter?", a: "Absolutely! We specialize in all electric 2W and 3W scooters, bikes, and commercial fleets including Ola, Ather, TVS, Hero Electric, Chetak, and more." },
  { q: "How long does a typical service take?", a: "Standard periodic maintenance takes 2–3 hours. Battery cell balancing or deep diagnostics usually take 4–6 hours depending on pack capacity." },
  { q: "Do you offer pickup and drop service?", a: "Yes, we offer doorstep pickup and drop-off in major hub areas including Pune, Bangalore, and Delhi NCR." },
];

const MARQUEE_TAGS = ["Certified Technicians", "Doorstep EV Service", "Battery Health Check", "Warranty Tracking", "Genuine Spare Parts", "AI Diagnostics", "Multi-Brand Support", "Pan-India Network", "Quick & On-Time", "Transparent Pricing", "2W & 3W Specialists", "OEM-Grade Standards"];



// ─── 3D Service Card ───────────────────────────────────────────────────────────
function Service3DCard({ srv, onBook, isCenter }: { srv: any; onBook: () => void; isCenter: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isCenter) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -12;
    const rotateY = ((x - rect.width / 2) / rect.width) * 12;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onBook}
      className="relative rounded-[28px] border border-white/15 hover:border-[#00D084]/80 bg-[#050b07] p-5 flex flex-col justify-between cursor-pointer group overflow-hidden"
      style={{ transition: "transform 0.15s ease-out, border-color 0.3s ease", minHeight: 220 }}
    >
      <img src={srv.image} alt={srv.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-65 group-hover:scale-110 transition-all duration-700 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-[#020503]/80 to-transparent pointer-events-none" />
      <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[#00D084]/20 to-transparent group-hover:left-full transition-all duration-1000 pointer-events-none" />
      <div className="relative z-10 space-y-2 mt-auto pt-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/60 font-mono flex items-center gap-1"><Clock className="w-3 h-3 text-[#00D084]" /> {srv.duration}</span>
          <span className="text-[10px] font-mono font-bold text-[#00D084]">{srv.centers}</span>
        </div>
        <h4 className="text-base font-black text-white group-hover:text-[#00D084] transition-colors leading-snug">{srv.title}</h4>
        <div className="pt-1.5 flex items-center justify-between">
          <span className="text-lg font-black text-white font-mono group-hover:text-[#00D084] transition-colors">{srv.price}</span>
          <button className="px-3 py-1.5 rounded-xl bg-[#00D084] text-[#020403] text-[10px] font-black uppercase tracking-wider group-hover:bg-[#00e08f] transition-all flex items-center gap-1 shadow-[0_0_15px_rgba(0,208,132,0.4)]">
            Book Now <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Route ─────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/find-services")({ component: FindServicesPage });

function FindServicesPage() {
  const [searchCity, setSearchCity] = useState("Pune");
  const [selectedService, setSelectedService] = useState("Battery Repair");
  const [selectedBrand, setSelectedBrand] = useState("Ather");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [selectedCity, setSelectedCity] = useState("Pune");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState<{ title: string; price: string } | null>(null);
  const [unavailableModalOpen, setUnavailableModalOpen] = useState(false);
  const [unservicedCityName, setUnservicedCityName] = useState("");
  const [expActiveIdx, setExpActiveIdx] = useState(0);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [isServicesPaused, setIsServicesPaused] = useState(false);
  const [activeServiceCategory, setActiveServiceCategory] = useState("All Services");
  const [activeSubNav, setActiveSubNav] = useState("cities");
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDraggingWave = useRef(false);
  const lastWheelTime = useRef(0);
  const [cities, setCities] = useState<EVCity[]>(() => getOnboardedCities());
  const [onboardModalOpen, setOnboardModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState("");
  const [newCityState, setNewCityState] = useState("");
  const [isDetectingLoc, setIsDetectingLoc] = useState(false);
  const [searchPhone, setSearchPhone] = useState("");
  const [activeSearchedCity, setActiveSearchedCity] = useState<EVCity | null>(null);
  const [preBookingModalOpen, setPreBookingModalOpen] = useState(false);

  // Inline selection flow states
  const [inlineBookingOpen, setInlineBookingOpen] = useState(false);
  const [inlineStep, setInlineStep] = useState<"brand" | "model" | "service">("brand");
  const [inlineSelectedBrand, setInlineSelectedBrand] = useState("");
  const [inlineSelectedModel, setInlineSelectedModel] = useState("");
  const [inlineBrandSearch, setInlineBrandSearch] = useState("");
  const [inlineBrandFilter, setInlineBrandFilter] = useState<"ALL" | "2W" | "3W">("ALL");

  // Inline calculations
  const filteredInlineBrands = useMemo(() => {
    let brands = EV_BRANDS_POPULAR;
    if (inlineBrandFilter !== "ALL") {
      brands = brands.filter((b) => b.category === inlineBrandFilter);
    }
    if (inlineBrandSearch.trim()) {
      const q = inlineBrandSearch.toLowerCase();
      brands = brands.filter(
        (b) => b.name.toLowerCase().includes(q) || b.displayName.toLowerCase().includes(q)
      );
    }
    return brands;
  }, [inlineBrandFilter, inlineBrandSearch]);

  const inlineAvailableModels = useMemo(() => {
    if (!inlineSelectedBrand) return [];
    const getBrandKey = (brand: string) => {
      const b = brand.toLowerCase();
      if (b.includes("ola")) return "ola";
      if (b.includes("ather")) return "ather";
      if (b.includes("tvs")) return "tvs";
      if (b.includes("bajaj") || b.includes("chetak")) return "bajaj";
      if (b.includes("hero")) return "hero";
      if (b.includes("revolt")) return "revolt";
      if (b.includes("ampere")) return "ampere";
      if (b.includes("simple")) return "simple";
      if (b.includes("tork")) return "tork";
      if (b.includes("okinawa")) return "okinawa";
      if (b.includes("mahindra")) return "mahindra";
      if (b.includes("piaggio") || b.includes("ape")) return "piaggio";
      if (b.includes("kinetic")) return "kinetic";
      return b;
    };
    const key = getBrandKey(inlineSelectedBrand);
    const set = new Set(
      EV_CATALOG.filter((m) => m.make.toLowerCase().includes(key)).map((m) => m.model)
    );
    const result = Array.from(set);
    return result.length > 0
      ? result
      : ["Standard Edition EV", "Pro Edition EV", "Extended Range EV"];
  }, [inlineSelectedBrand]);

  const getModelDisplayInfo = (brand: string, modelName: string) => {
    const getBrandKey = (b: string) => {
      const val = b.toLowerCase();
      if (val.includes("ola")) return "ola";
      if (val.includes("ather")) return "ather";
      if (val.includes("tvs")) return "tvs";
      if (val.includes("bajaj") || val.includes("chetak")) return "bajaj";
      if (val.includes("hero")) return "hero";
      if (val.includes("revolt")) return "revolt";
      if (val.includes("ampere")) return "ampere";
      if (val.includes("simple")) return "simple";
      if (val.includes("tork")) return "tork";
      if (val.includes("okinawa")) return "okinawa";
      if (val.includes("mahindra")) return "mahindra";
      if (val.includes("piaggio") || val.includes("ape")) return "piaggio";
      if (val.includes("kinetic")) return "kinetic";
      return val;
    };
    const key = getBrandKey(brand);
    const matched = EV_CATALOG.find(
      (item) =>
        item.make.toLowerCase().includes(key) &&
        item.model.toLowerCase() === modelName.toLowerCase()
    );
    const imageUrl = matched?.modelImageUrl || matched?.logoUrl || getBrandLogoUrl(brand);
    return {
      modelName,
      imageUrl,
      battery: matched?.batteryKwh ? `${matched.batteryKwh} kWh` : undefined,
    };
  };

  const mapBrandToSelectValue = (brandName: string) => {
    const b = brandName.toLowerCase();
    if (b.includes("ather")) return "Ather";
    if (b.includes("ola")) return "Ola Electric";
    if (b.includes("tvs")) return "TVS";
    if (b.includes("bajaj")) return "Bajaj";
    if (b.includes("mahindra")) return "Mahindra";
    if (b.includes("piaggio")) return "Piaggio";
    return "Ather";
  };

  const navigate = useNavigate();

  // Refs for local Lenis scroll inside inline form flow
  const inlineScrollWrapperRef = useRef<HTMLDivElement>(null);
  const inlineScrollContentRef = useRef<HTMLDivElement>(null);

  // Initialize smooth local scroll with Lenis for the active inline form step content
  useEffect(() => {
    if (!inlineBookingOpen || !inlineScrollWrapperRef.current || !inlineScrollContentRef.current) return;

    const localLenis = new Lenis({
      wrapper: inlineScrollWrapperRef.current,
      content: inlineScrollContentRef.current,
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    let rafId: number;
    function update(time: number) {
      localLenis.raf(time);
      rafId = requestAnimationFrame(update);
    }
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      localLenis.destroy();
    };
  }, [inlineBookingOpen, inlineStep]);

  // Refs for GSAP
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const contentUpRef = useRef<HTMLDivElement>(null);
  const citiesSectionRef = useRef<HTMLDivElement>(null);
  const brandsSectionRef = useRef<HTMLDivElement>(null);
  const whySectionRef = useRef<HTMLDivElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const subNavRef = useRef<HTMLDivElement>(null);

  // ─── Effects ───────────────────────────────────────────────────────────────
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const handleUpdate = () => setCities(getOnboardedCities());
    window.addEventListener("ev_cities_updated", handleUpdate);
    return () => window.removeEventListener("ev_cities_updated", handleUpdate);
  }, []);

  // Auto-rotate experiences & carousel
  useEffect(() => {
    const timer = setInterval(() => setExpActiveIdx(p => (p + 1) % EXPERIENCES_DATA.length), 2000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (isServicesPaused) return;
    const interval = setInterval(() => setCarouselIdx(p => (p + 1) % POPULAR_SERVICES.length), 4000);
    return () => clearInterval(interval);
  }, [isServicesPaused]);

  const heroExp = EXPERIENCES_DATA[expActiveIdx];
  const sideExp1 = EXPERIENCES_DATA[(expActiveIdx + 1) % EXPERIENCES_DATA.length];
  const sideExp2 = EXPERIENCES_DATA[(expActiveIdx + 2) % EXPERIENCES_DATA.length];

  const filteredServices = activeServiceCategory === "All Services"
    ? POPULAR_SERVICES
    : POPULAR_SERVICES.filter(s => s.category === activeServiceCategory);

  useEffect(() => {
    const sections = [
      { id: "cities", el: citiesSectionRef },
      { id: "services", el: contentOverlayRef },
      { id: "brands", el: brandsSectionRef },
      { id: "why-us", el: whySectionRef },
      { id: "callout", el: calloutRef },
    ];
    const onScroll = () => {
      const scrollY = window.scrollY + 220;
      for (const section of [...sections].reverse()) {
        if (section.el.current && section.el.current.offsetTop <= scrollY) {
          setActiveSubNav(section.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── GSAP ScrollTrigger ───────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // 2. Hero parallax: background scales and fades as content overlay rises
      if (heroBgRef.current && contentOverlayRef.current) {
        gsap.to(heroBgRef.current, {
          scale: 1.2,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: contentOverlayRef.current,
            start: "top 100%",
            end: "top 20%",
            scrub: 0.8,
          },
        });
      }

      // 3. Hero text fades out as user scrolls
      if (heroTextRef.current && contentOverlayRef.current) {
        gsap.to(heroTextRef.current, {
          opacity: 0,
          scale: 0.9,
          y: -55,
          ease: "power1.out",
          scrollTrigger: {
            trigger: contentOverlayRef.current,
            start: "top 92%",
            end: "top 32%",
            scrub: 0.6,
          },
        });
      }

      // 4. Content overlay rises up
      if (contentUpRef.current) {
        gsap.fromTo(
          contentUpRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0, opacity: 1, ease: "power2.out",
            scrollTrigger: {
              trigger: contentUpRef.current,
              start: "top 92%",
              end: "top 48%",
              scrub: 0.6,
            },
          }
        );
      }



      // 6. Cities section staggered entrance
      gsap.fromTo(
        ".city-card-item",
        { opacity: 0, y: 60, rotateX: 12, transformPerspective: 900 },
        {
          opacity: 1, y: 0, rotateX: 0,
          stagger: 0.07, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".cities-section-inner", start: "top 82%" },
        }
      );

      // 7. Brand cards 3D perspective reveal on scroll
      gsap.fromTo(
        ".brand-card-item",
        { opacity: 0, scale: 0.7, y: 100, rotateY: 55, transformPerspective: 1200 },
        {
          opacity: 1, scale: 1, y: 0, rotateY: 0,
          stagger: 0.08, duration: 0.95, ease: "power4.out",
          scrollTrigger: { trigger: brandsSectionRef.current, start: "top 85%" },
        }
      );

      // 8. Why choose us cards flip in
      gsap.fromTo(
        ".why-card-item",
        { opacity: 0, y: 50, rotateY: -8, transformPerspective: 800 },
        {
          opacity: 1, y: 0, rotateY: 0,
          stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: whySectionRef.current, start: "top 82%" },
        }
      );

      // 9. Footer callout scale up
      if (calloutRef.current) {
        gsap.fromTo(
          calloutRef.current,
          { scale: 0.94, opacity: 0 },
          {
            scale: 1, opacity: 1, ease: "power2.out",
            scrollTrigger: {
              trigger: calloutRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.5,
            },
          }
        );
      }

    });

    return () => ctx.revert();
  }, []);

  // ─── Drag Handlers for Wave Carousel ──────────────────────────────────────
  const handleWaveDragStart = (clientX: number) => { touchStartX.current = clientX; touchEndX.current = clientX; isDraggingWave.current = true; setIsServicesPaused(true); };
  const handleWaveDragMove = (clientX: number) => { if (!isDraggingWave.current) return; touchEndX.current = clientX; };
  const handleWaveDragEnd = () => {
    if (!isDraggingWave.current) return;
    isDraggingWave.current = false;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 35) setCarouselIdx(p => (p + 1) % POPULAR_SERVICES.length);
    else if (diff < -35) setCarouselIdx(p => (p - 1 + POPULAR_SERVICES.length) % POPULAR_SERVICES.length);
  };
  const handleWaveWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 300) return;
    if (Math.abs(e.deltaX) > 15 || Math.abs(e.deltaY) > 25) {
      lastWheelTime.current = now;
      if (e.deltaX > 15 || e.deltaY > 25) setCarouselIdx(p => (p + 1) % POPULAR_SERVICES.length);
      else setCarouselIdx(p => (p - 1 + POPULAR_SERVICES.length) % POPULAR_SERVICES.length);
    }
  };

  // ─── Location detection ────────────────────────────────────────────────────
  const handleDetectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) { toast.error("Geolocation not supported."); return; }
    setIsDetectingLoc(true);
    toast.info("Detecting your live coordinates & city...");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.suburb || data.address?.state_district || "Pune";
          setSearchCity(city); setSelectedCity(city);
          toast.success(`📍 Live Location Detected: ${city}!`);
        } catch { toast.success(`📍 Location detected near Pune!`); }
        finally { setIsDetectingLoc(false); }
      },
      () => { setIsDetectingLoc(false); toast.error("Location permission denied."); },
      { timeout: 10000 }
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Validate City field
    const queryCity = searchCity.trim();
    if (!queryCity) {
      toast.error("Please enter your City or Area!");
      return;
    }

    // 2. Validate custom Brand & Model trigger field
    if (!inlineSelectedBrand || !inlineSelectedModel) {
      toast.error("Please select your EV Brand & Model!");
      setInlineBookingOpen(true); // Open the selector so they can choose
      setInlineStep("brand");
      return;
    }

    // 3. Validate Phone Number field
    if (!searchPhone || searchPhone.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number!");
      return;
    }

    const matchedCity = findMatchingAvailableCity(queryCity);
    if (!matchedCity) { setUnservicedCityName(queryCity); setUnavailableModalOpen(true); return; }
    toast.success(`Locating certified EV centers in ${matchedCity.name}...`);
    setActiveSearchedCity(matchedCity);
    setTimeout(() => {
      scrollToSection("cities");
    }, 100);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 120; window.scrollTo({ top, behavior: "smooth" }); }
    setActiveSubNav(id);
  };

  const activeOffer = getCityOfferCampaign(searchCity || selectedCity || "Pune");

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#070908] text-white selection:bg-[#00D084] selection:text-black font-sans relative overflow-x-hidden">

      {/* ── Ambient pulsing glow behind hero ── */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.15, 0.32, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00D084]/15 rounded-full blur-[200px] pointer-events-none z-0"
      />

      {/* ── Nav ── */}
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* ── Main Container ── */}
      <div className="relative min-h-screen">

        {/* ===================================================================
            1. FIXED STUCK HERO
           =================================================================== */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* BG Image + parallax scrub via heroBgRef */}
          <div ref={heroBgRef} className="absolute inset-0">
            <img
              src="/find-services-hero.jpg"
              alt="Find EV Services Hero"
              className="w-full h-full object-cover object-center opacity-100"
            />
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,9,8,0.75)_100%)] pointer-events-none" />

          {/* Hero Content */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-12 max-w-7xl mx-auto z-10 pointer-events-auto overflow-y-auto py-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">

              {/* Left column */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-7 space-y-5 text-left"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/40 text-[11px] font-mono font-bold text-[#00D084]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" /> INDIA'S #1 EV SERVICE NETWORK
                </motion.div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">
                  Find Service Centers <br />
                  <span className="text-[#00D084] font-black drop-shadow-[0_0_30px_rgba(0,208,132,0.4)]">Near You</span>
                </h1>
                <p className="text-base sm:text-lg text-white/90 font-bold leading-relaxed max-w-2xl drop-shadow-[0_2px_16px_rgba(0,0,0,1)]">
                  Your one-stop solution for all EV repair, maintenance and services — quick, reliable and hassle-free.
                </p>
                {/* Floating stat chips */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap gap-2.5 pt-1"
                >
                  {["40+ Cities", "600+ Hubs", "25K+ Happy Riders", "90-Day Warranty"].map((chip, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-white/90"
                    >
                      {chip}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right: Search form */}
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-5 w-full"
              >
                <div className="bg-[#030c07]/95 border-2 border-[#00D084]/50 rounded-[32px] p-6 sm:p-7 backdrop-blur-3xl shadow-[0_0_60px_rgba(0,208,132,0.25)] relative overflow-hidden space-y-5 text-left">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#00D084]/20 rounded-full blur-3xl pointer-events-none" />
                  
                  <AnimatePresence>
                    {inlineBookingOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="absolute inset-0 bg-[#030d07]/98 z-30 p-6 sm:p-7 flex flex-col justify-between"
                      >
                        {/* BRAND STEP */}
                        {inlineStep === "brand" && (
                          <div className="flex-1 flex flex-col min-h-0">
                            {/* Minimal Top Bar with Title and Close Button */}
                            <div className="flex items-center justify-between mb-4 shrink-0 text-left">
                              <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">Select EV Manufacturer</h4>
                              <button
                                type="button"
                                onClick={() => setInlineBookingOpen(false)}
                                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer shrink-0"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Category Tabs Container */}
                            <div className="flex items-center gap-1 p-1 bg-white/5 rounded-2xl border border-white/10 mb-4 shrink-0">
                              <button
                                type="button"
                                onClick={() => setInlineBrandFilter("ALL")}
                                className={`flex-1 py-2 text-[10px] sm:text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                                  inlineBrandFilter === "ALL"
                                    ? "bg-[#00D084] text-black shadow-md"
                                    : "text-white/60 hover:text-white"
                                }`}
                              >
                                All (2W & 3W)
                              </button>
                              <button
                                type="button"
                                onClick={() => setInlineBrandFilter("2W")}
                                className={`flex-1 py-2 text-[10px] sm:text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                                  inlineBrandFilter === "2W"
                                    ? "bg-[#00D084] text-black shadow-md"
                                    : "text-white/60 hover:text-white"
                                }`}
                              >
                                🛵 2-Wheelers
                              </button>
                              <button
                                type="button"
                                onClick={() => setInlineBrandFilter("3W")}
                                className={`flex-1 py-2 text-[10px] sm:text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                                  inlineBrandFilter === "3W"
                                    ? "bg-[#00D084] text-black shadow-md"
                                    : "text-white/60 hover:text-white"
                                }`}
                              >
                                🛺 3-Wheelers
                              </button>
                            </div>

                            {/* Search input */}
                            <div className="relative mb-4 shrink-0">
                              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D084]" />
                              <input
                                type="text"
                                value={inlineBrandSearch}
                                onChange={(e) => setInlineBrandSearch(e.target.value)}
                                placeholder="Search brand (Ola, Ather, TVS, Bajaj, Mahindra...)"
                                className="w-full bg-[#020503] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00D084] transition-all"
                              />
                            </div>

                            {/* Manufacturers 3-Column Grid */}
                            <div ref={inlineScrollWrapperRef} className="flex-1 overflow-y-auto pr-0.5 min-h-0 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                              <div ref={inlineScrollContentRef} className="grid grid-cols-3 gap-2.5">
                                {filteredInlineBrands.map((b) => (
                                  <button
                                    key={b.name}
                                    type="button"
                                    onClick={() => {
                                      setInlineSelectedBrand(b.name);
                                      setInlineStep("model");
                                    }}
                                    className="p-3 rounded-2xl border border-white/10 hover:border-[#00D084]/50 bg-[#090f0c] hover:bg-white/5 transition-all flex flex-col items-center justify-center text-center gap-2.5 cursor-pointer group"
                                  >
                                    <div className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center p-1.5 bg-black/40 overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                                      {b.logoUrl ? (
                                        <img src={b.logoUrl} alt={b.displayName} className="w-full h-full object-contain" />
                                      ) : (
                                        <span className="text-lg">{b.icon}</span>
                                      )}
                                    </div>
                                    <span className="text-[10px] font-black text-white leading-tight truncate w-full">{b.displayName}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* MODEL STEP */}
                        {inlineStep === "model" && (
                          <div className="flex-1 flex flex-col min-h-0 text-left">
                            {/* Minimal Back & Close Row */}
                            <div className="flex items-center justify-between mb-4 shrink-0">
                              <button
                                type="button"
                                onClick={() => setInlineStep("brand")}
                                className="flex items-center gap-1 text-xs font-bold text-[#00D084] hover:underline cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                              >
                                <ChevronLeft className="w-4 h-4 text-[#00D084]" />
                                <span>Back to Brands</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setInlineBookingOpen(false)}
                                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer shrink-0"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Section Title */}
                            <div className="mb-4 shrink-0 text-left">
                              <span className="text-[9px] uppercase font-mono font-bold text-[#00D084] block mb-0.5">{inlineSelectedBrand}</span>
                              <h4 className="text-lg sm:text-xl font-black text-white tracking-tight leading-none">Select Model</h4>
                            </div>

                            {/* Models Grid */}
                            <div ref={inlineScrollWrapperRef} className="flex-1 overflow-y-auto pr-0.5 min-h-0 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                              <div ref={inlineScrollContentRef} className="grid grid-cols-2 gap-2.5">
                                {inlineAvailableModels.map((m) => {
                                  const info = getModelDisplayInfo(inlineSelectedBrand, m);
                                  return (
                                    <button
                                      key={m}
                                      type="button"
                                      onClick={() => {
                                        setInlineSelectedModel(m);
                                        setSelectedBrand(mapBrandToSelectValue(inlineSelectedBrand));
                                        setSelectedService("General Service");
                                        setInlineBookingOpen(false);
                                      }}
                                      className="p-3 rounded-2xl border border-white/10 hover:border-[#00D084]/50 bg-[#090f0c] hover:bg-white/5 transition-all text-left flex items-center gap-2.5 cursor-pointer group justify-between"
                                    >
                                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                        <div className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center bg-black/40 overflow-hidden shrink-0 p-1 group-hover:scale-105 transition-transform">
                                          {info.imageUrl ? (
                                            <img src={info.imageUrl} alt={m} className="w-full h-full object-contain rounded-full" />
                                          ) : (
                                            <div className="w-full h-full flex items-center justify-center font-extrabold text-[#00D084] text-[10px]">EV</div>
                                          )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <p className="text-xs sm:text-sm font-black text-white truncate group-hover:text-[#00D084] transition-colors">{m}</p>
                                          <p className="text-[9px] text-white/50 leading-tight mt-0.5 break-words">
                                            {inlineSelectedBrand} Electric {info.battery ? `• ${info.battery}` : ""}
                                          </p>
                                        </div>
                                      </div>
                                      <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#00D084] transition-all shrink-0 ml-1.5" />
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-base font-black text-white uppercase tracking-wider">Search Service Center</h3>
                    <span className="text-[10px] font-mono font-bold text-[#00D084] bg-[#00D084]/15 px-2.5 py-1 rounded-full border border-[#00D084]/30">INSTANT SEARCH</span>
                  </div>
                  <form onSubmit={handleSearchSubmit} className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] text-white/80 font-black uppercase tracking-wider block">Enter City or Area</label>
                        <button type="button" onClick={handleDetectLocation} disabled={isDetectingLoc}
                          className="text-[10px] text-[#00D084] font-mono font-bold hover:underline flex items-center gap-1 cursor-pointer bg-[#00D084]/10 px-2.5 py-0.5 rounded-full border border-[#00D084]/30 hover:bg-[#00D084]/20 transition-all">
                          <Navigation className={`w-3 h-3 text-[#00D084] ${isDetectingLoc ? "animate-spin" : "animate-pulse"}`} />
                          <span>{isDetectingLoc ? "Detecting..." : "Detect Location 📍"}</span>
                        </button>
                      </div>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#00D084] absolute left-3.5 top-3.5" />
                        <input type="text" placeholder="e.g. Pune, Baner, Wakad, Mumbai" value={searchCity}
                          onChange={e => { setSearchCity(e.target.value); setSelectedCity(e.target.value); }}
                          required
                          className="w-full bg-[#020503] border border-white/20 hover:border-[#00D084]/60 focus:border-[#00D084] focus:ring-2 focus:ring-[#00D084]/40 rounded-xl pl-10 pr-3.5 py-3 text-xs font-black text-white focus:outline-none transition-all placeholder:text-white/40 shadow-lg" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-white/80 font-black block mb-1.5 uppercase tracking-wider">Select EV Brand & Model</label>
                      <div className="relative">
                        <Wrench className="w-4 h-4 text-[#00D084] absolute left-3.5 top-3.5 pointer-events-none z-10" />
                        <button
                          type="button"
                          onClick={() => {
                            setInlineBookingOpen(true);
                            setInlineStep("brand");
                          }}
                          className="w-full bg-[#020503] border border-[#00D084]/20 hover:border-[#00D084]/60 focus:border-[#00D084] focus:ring-2 focus:ring-[#00D084]/40 rounded-xl pl-10 pr-4 py-3 text-xs font-black text-white text-left focus:outline-none cursor-pointer transition-all shadow-lg flex items-center"
                        >
                          <span className={inlineSelectedBrand && inlineSelectedModel ? "text-white font-black" : "text-white/60"}>
                            {inlineSelectedBrand && inlineSelectedModel ? `${inlineSelectedBrand} ${inlineSelectedModel}` : "Select EV Brand & Model..."}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-white/80 font-black block mb-1.5 uppercase tracking-wider">Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#00D084] absolute left-3.5 top-3.5 pointer-events-none z-10" />
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          maxLength={10}
                          placeholder="Enter 10-digit mobile number"
                          value={searchPhone}
                          onChange={e => setSearchPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="w-full bg-[#020503] border border-white/20 hover:border-[#00D084]/60 focus:border-[#00D084] focus:ring-2 focus:ring-[#00D084]/40 rounded-xl pl-10 pr-3.5 py-3 text-xs font-black text-white focus:outline-none transition-all placeholder:text-white/40 shadow-lg"
                        />
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, boxShadow: "0 0 35px rgba(0,208,132,0.6)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,208,132,0.4)] mt-2"
                    >
                      <Search className="w-4 h-4" /> Find Nearby Service Centers <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </form>
                  <div className="pt-3 border-t border-white/10 text-[11px]">
                    <p className="flex items-center gap-1.5 text-white/80 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00D084]" /> 100% Genuine OEM Spares & Certified Techs
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            2. CONTENT OVERLAY (rises over fixed hero)
           =================================================================== */}
        <div
          ref={contentOverlayRef}
          className="relative z-10 bg-[#070908] min-h-screen mt-[calc(100vh-80px)] rounded-t-[44px] border-t border-white/10 shadow-2xl"
        >
          {/* ── Sticky Sub-Nav Bar ── */}
          <div
            ref={subNavRef}
            className="sticky top-20 z-40 bg-[#040806]/90 backdrop-blur-xl border border-white/10 rounded-full mx-4 sm:mx-6 lg:mx-12 mt-5 px-4 sm:px-6 py-2.5 shadow-2xl flex items-center justify-between overflow-x-auto no-scrollbar gap-3"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D084] hidden sm:block">Find Services</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {[
                { id: "cities", label: "Cities" },
                { id: "services", label: "Services" },
                { id: "how-it-works", label: "How It Works" },
                { id: "brands", label: "Brands" },
                { id: "why-us", label: "Why Us" },
                { id: "callout", label: "Book" },
              ].map(tab => (
                <button key={tab.id} onClick={() => scrollToSection(tab.id)}
                  className={`relative px-3 sm:px-4 py-1.5 rounded-full text-[11px] font-mono font-semibold transition-colors cursor-pointer whitespace-nowrap ${activeSubNav === tab.id ? "text-[#020403] font-bold" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                >
                  {activeSubNav === tab.id && (
                    <motion.div
                      layoutId="findServicesNavPill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-[#00D084] rounded-full shadow-[0_0_18px_rgba(0,208,132,0.5)] z-0"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => { setBookingModalOpen(true); }}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/40 text-[#00D084] hover:bg-[#00D084] hover:text-[#020403] text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Book Now
            </motion.button>
          </div>

          <div ref={contentUpRef}>

            {/* ── Marquee Ticker ── */}
            <section className="bg-[#020403] py-3 overflow-hidden font-serif mt-6">
              <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
                {MARQUEE_TAGS.concat(MARQUEE_TAGS).map((tag, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-serif font-medium text-white/80">
                    <span>{tag}</span>
                    <span className="text-white/20 ml-6">•</span>
                  </div>
                ))}
              </div>
            </section>

            {/* =================================================================
                3. ALL CITIES NETWORK OR SEARCHED CITY DETAILS
               ================================================================= */}
            <section id="cities" ref={citiesSectionRef} className="py-20 px-6 bg-[#020403] font-serif">
              <div className="max-w-7xl mx-auto cities-section-inner">
                {!activeSearchedCity ? (
                  <>
                    <motion.div
                      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                      variants={fadeInUp}
                      className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
                    >
                      <div>
                        <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">Coverage</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 tracking-tight font-sans">All Cities</h2>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-serif font-bold">
                        <span className="px-3.5 py-1.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[#00D084] font-sans">{cities.length} {cities.length === 1 ? "city" : "cities"} in our network</span>
                        <motion.button whileHover={{ scale: 1.04 }} onClick={() => setOnboardModalOpen(true)}
                          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#00D084] hover:text-[#020403] border border-white/20 text-white transition-all cursor-pointer flex items-center gap-1.5 font-sans">
                          <Plus className="w-3.5 h-3.5" /><span>Onboard New City</span>
                        </motion.button>
                      </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                      {cities.map((city) => (
                        <button
                          key={city.id}
                          type="button"
                          onClick={() => {
                            setActiveSearchedCity(city);
                            setSearchCity(city.name);
                            setSelectedCity(city.name);
                            setTimeout(() => {
                              scrollToSection("cities");
                            }, 100);
                          }}
                          className={`city-card-item max-w-[270px] w-full h-[370px] p-7 rounded-[36px] border-2 transition-all cursor-pointer font-serif flex flex-col justify-end group hover:scale-[1.03] relative overflow-hidden text-left ${selectedCity.toLowerCase() === city.name.toLowerCase() ? "bg-[#050c08] border-[#00D084]" : "bg-[#050907] border-white/10 hover:border-[#00D084]/60"}`}
                        >
                          <img src={city.heroImage} alt={city.name} className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500 pointer-events-none" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050c08] via-[#050c08]/65 to-transparent pointer-events-none" />
                          <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-[#00D084]/20 backdrop-blur-md border border-[#00D084]/40 flex items-center justify-center text-[#00D084] mb-4 group-hover:scale-110 transition-transform">
                              <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-serif font-black text-white group-hover:text-[#00D084] transition-colors">{city.name}</h3>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  // Searched City Content overlay (rendered dynamically instead of navigating)
                  <div className="space-y-16">
                    {/* Header bar for city results */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4 text-left">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/40 text-[#00D084] text-[10px] font-black uppercase tracking-widest mb-2 font-sans">
                          <Sparkles className="w-3.5 h-3.5 fill-[#00D084]" /> Real-Time Location Connected
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-sans">
                          Nearest Service Centers in <span className="text-[#00D084]">{activeSearchedCity.name}</span>
                        </h2>
                        <p className="text-white/70 text-sm mt-1 max-w-xl font-medium font-sans">
                          Detected certified EV workshops sorted by real-time proximity. 100% genuine OEM spares & battery diagnostic bays on duty.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setActiveSearchedCity(null);
                          setSearchCity("");
                          setSelectedCity("Pune");
                        }}
                        className="px-5 py-2.5 rounded-xl border border-white/20 hover:border-[#00D084] text-xs font-bold text-white hover:text-[#00D084] transition-all cursor-pointer font-sans"
                      >
                        ← View All Cities
                      </button>
                    </div>

                    {/* Nearest Centers Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
                      {getCityServiceCenters(activeSearchedCity.name, searchCity).map((center) => (
                        <div
                          key={center.id}
                          className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-300 p-6 md:p-7 flex flex-col justify-between space-y-6 font-sans ${
                            center.isNearest
                              ? "border-[#00D084] bg-gradient-to-br from-[#03190e] via-[#052418] to-[#020503] shadow-[0_0_50px_rgba(0,208,132,0.3)] scale-[1.01]"
                              : "border-white/15 bg-[#050907] hover:border-[#00D084]/60"
                          }`}
                        >
                          {center.isNearest && (
                            <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-[#00D084] text-[#020403] text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-1.5 z-10">
                              <Zap className="w-3.5 h-3.5 fill-[#020403]" /> 🏆 NEAREST CERTIFIED HUB • {center.distanceKm} KM AWAY
                            </div>
                          )}

                          <div className="space-y-4">
                            <div className="flex items-start justify-between gap-4 pt-2">
                              <div>
                                <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                                  {center.name}
                                </h3>
                                <p className="text-xs text-white/70 font-medium flex items-center gap-1.5 mt-1.5">
                                  <MapPin className="w-4 h-4 text-[#00D084] shrink-0" />
                                  {center.address}
                                </p>
                              </div>
                              
                              {!center.isNearest && (
                                <span className="shrink-0 text-xs font-mono font-bold text-[#00D084] bg-[#00D084]/15 px-3 py-1 rounded-full border border-[#00D084]/30">
                                  📍 {center.distanceKm} km
                                </span>
                              )}
                            </div>

                            {/* Quick Metrics Bar */}
                            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
                              <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                                ★ {center.rating} ({center.reviewsCount} reviews)
                              </span>
                              <span className="flex items-center gap-1 text-[#00D084] font-bold bg-[#00D084]/10 px-2.5 py-1 rounded-lg border border-[#00D084]/20">
                                ⚡ {center.baysAvailable} Bays Available
                              </span>
                              <span className="flex items-center gap-1 text-white/80 font-bold bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                                👨‍🔧 {center.techniciansOnDuty} Certified Techs
                              </span>
                            </div>

                            {/* Brands Serviced */}
                            <div className="space-y-1.5 pt-1">
                              <span className="text-[11px] text-white/50 font-bold block uppercase tracking-wider">
                                Supported Brands:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {center.brandsServiced.map((b, i) => (
                                  <span
                                    key={i}
                                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-white/10 text-white/95 border-white/15`}
                                  >
                                    {b}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                            <a
                              href={center.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-[#00D084] text-xs font-bold text-white hover:text-[#00D084] transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Navigation className="w-3.5 h-3.5 text-[#00D084]" /> Get Directions
                            </a>

                            <a
                              href={`tel:${center.phone.replace(/\s+/g, "")}`}
                              className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-[#00D084] text-xs font-bold text-white hover:text-[#00D084] transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Phone className="w-3.5 h-3.5 text-[#00D084]" /> Call Hub
                            </a>

                            <Link
                              to="/service-centres/$centerId"
                              params={{ centerId: center.id }}
                              className="px-5 py-2.5 rounded-xl border border-white/20 hover:border-[#00D084] bg-white/5 text-white text-xs font-black uppercase tracking-wider hover:bg-[#00D084] hover:text-[#020403] transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <ExternalLink className="w-3.5 h-3.5" /> View Centre
                            </Link>

                            <button
                              onClick={() => {
                                setBookingService({ title: `Diagnostic Booking - ${center.name}`, price: "₹199" });
                                setBookingModalOpen(true);
                              }}
                              className="px-5 py-2.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,208,132,0.4)]"
                            >
                              <CalendarCheck className="w-3.5 h-3.5 fill-[#020403]" /> Book Appointment
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>



                    {/* Infrastructure details */}
                    <div className="pt-8 text-center max-w-7xl mx-auto">
                      <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084] font-sans">
                          HUB INFRASTRUCTURE
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white mt-2 font-sans">
                          Certified Standards in {activeSearchedCity.name}
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left font-sans">
                        <div className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center text-[#00D084]">
                            <BatteryCharging className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-white">Active Cell Balancing</h3>
                          <p className="text-xs text-white/60 leading-relaxed">
                            Automated high-voltage active battery balancing restoring 95%+ original battery pack health.
                          </p>
                        </div>

                        <div className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center text-[#00D084]">
                            <Cpu className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-white">BMS Firmware Flashing</h3>
                          <p className="text-xs text-white/60 leading-relaxed">
                            Official multi-brand ECU scanner updates ensuring error-free thermal shutdown thresholds.
                          </p>
                        </div>

                        <div className="bg-[#050907] border border-white/10 rounded-3xl p-8 space-y-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center text-[#00D084]">
                            <ShieldCheck className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-white">100% Refundable Slot</h3>
                          <p className="text-xs text-white/60 leading-relaxed">
                            Pre-booking slot tokens guarantee priority doorstep service with 100% money-back policy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* =================================================================
                4. POPULAR SERVICES — 3D Wave Carousel
               ================================================================= */}
            <section id="services" className="py-20 px-4 sm:px-6 bg-[#020403] font-serif relative overflow-hidden">
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00D084]/10 rounded-full blur-[140px] pointer-events-none" />
              <div className="max-w-7xl mx-auto space-y-6 relative z-10 text-center">
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                  variants={staggerContainer}
                  className="space-y-3"
                >
                  <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D084]/10 border border-[#00D084]/30 text-xs font-mono font-bold text-[#00D084]">
                    <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" /> CERTIFIED EV SERVICE PACKAGES
                  </motion.div>
                  <motion.h2 variants={staggerItem} className="text-3xl md:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight">Popular Services</motion.h2>

                  {/* Category filter pills */}
                  <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    {["All Services", "Battery & BMS", "Motor & Drive", "Diagnostics & Software"].map(cat => (
                      <motion.button
                        key={cat}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setActiveServiceCategory(cat); setCarouselIdx(0); }}
                        className={`px-4 py-1.5 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer border ${activeServiceCategory === cat ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-[0_0_20px_rgba(0,208,132,0.4)]" : "bg-white/5 text-white/70 border-white/15 hover:border-[#00D084]/50 hover:text-white"}`}
                      >
                        {cat}
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Nav arrows + action buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    onClick={() => setCarouselIdx(p => (p - 1 + POPULAR_SERVICES.length) % POPULAR_SERVICES.length)}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:border-[#00D084] hover:text-[#00D084] transition-all cursor-pointer">
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { const s = POPULAR_SERVICES[carouselIdx % POPULAR_SERVICES.length]; setBookingService({ title: s.title, price: s.price }); setBookingModalOpen(true); }}
                    className="px-6 py-2.5 rounded-full bg-white text-black font-extrabold text-xs sm:text-sm tracking-wide hover:bg-[#00D084] transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(0,208,132,0.5)] cursor-pointer">
                    Book Service Now
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.04 }}
                    onClick={() => (window.location.href = "/services")}
                    className="px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs sm:text-sm tracking-wide hover:bg-white/20 transition-all duration-300 backdrop-blur-md cursor-pointer">
                    Explore Packages
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    onClick={() => setCarouselIdx(p => (p + 1) % POPULAR_SERVICES.length)}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:border-[#00D084] hover:text-[#00D084] transition-all cursor-pointer">
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* 3D Wave Cards */}
                <div
                  className="relative w-full min-h-[440px] md:min-h-[480px] flex items-center justify-center overflow-hidden py-8 mt-2 cursor-grab active:cursor-grabbing touch-pan-x"
                  style={{ perspective: "1200px" }}
                  onMouseEnter={() => setIsServicesPaused(true)}
                  onMouseLeave={() => { setIsServicesPaused(false); isDraggingWave.current = false; }}
                  onMouseDown={e => handleWaveDragStart(e.clientX)}
                  onMouseMove={e => handleWaveDragMove(e.clientX)}
                  onMouseUp={handleWaveDragEnd}
                  onTouchStart={e => handleWaveDragStart(e.touches[0].clientX)}
                  onTouchMove={e => handleWaveDragMove(e.touches[0].clientX)}
                  onTouchEnd={handleWaveDragEnd}
                  onWheel={handleWaveWheel}
                >
                  {/* Vignette overlays */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 md:w-44 bg-gradient-to-r from-[#020403] via-[#020403]/85 to-transparent z-20 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-20 md:w-44 bg-gradient-to-l from-[#020403] via-[#020403]/85 to-transparent z-20 pointer-events-none" />

                  <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 w-full max-w-[1400px]">
                    {[-2, -1, 0, 1, 2].map((offset) => {
                      const index = (carouselIdx + offset + filteredServices.length) % filteredServices.length;
                      const srv = filteredServices[index];
                      if (!srv) return null;
                      let translateY = 0, rotateY = 0, scale = 1, opacity = 1, filter = "blur(0px)", zIndex = 10;
                      if (offset === 0) { translateY = 30; rotateY = 0; scale = 0.98; opacity = 1; filter = "blur(0px)"; zIndex = 30; }
                      else if (Math.abs(offset) === 1) { translateY = -30; rotateY = offset < 0 ? 12 : -12; scale = 0.88; opacity = 0.75; filter = "blur(3.5px)"; zIndex = 20; }
                      else { translateY = 15; rotateY = offset < 0 ? 22 : -22; scale = 0.76; opacity = 0.45; filter = "blur(7px)"; zIndex = 10; }

                      return (
                        <motion.div
                          key={`${srv.id}-${offset}`}
                          layout
                          animate={{ y: translateY, rotateY, scale, opacity, filter }}
                          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                          onClick={() => {
                            if (offset !== 0) setCarouselIdx(index);
                            else { setBookingService({ title: srv.title, price: srv.price }); setBookingModalOpen(true); }
                          }}
                          style={{ zIndex }}
                          className={`shrink-0 w-[240px] sm:w-[280px] md:w-[300px] h-[350px] sm:h-[390px] rounded-[32px] border bg-[#060c08] p-6 flex flex-col justify-between cursor-pointer group overflow-hidden relative select-none ${offset === 0 ? "border-[#00D084]" : "border-white/15 hover:border-white/30"}`}
                        >
                          <img src={srv.image} alt={srv.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none ${offset === 0 ? "opacity-65 group-hover:opacity-85 group-hover:scale-110" : "opacity-40"}`} />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-[#020503]/75 to-transparent pointer-events-none" />
                          {offset === 0 && (
                            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[#00D084]/20 to-transparent group-hover:left-full transition-all duration-1000 pointer-events-none" />
                          )}
                          <div className="relative z-10 flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-[#00D084] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#00D084]/40">
                              <Clock className="w-3 h-3 inline-block mr-1" />{srv.duration}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">{srv.centers}</span>
                          </div>
                          <div className="relative z-10 space-y-3 mt-auto pt-4 text-left">
                            <h4 className="text-lg sm:text-xl font-serif font-black text-white group-hover:text-[#00D084] transition-colors leading-snug">{srv.title}</h4>
                            <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                              <span className="text-xl sm:text-2xl font-black font-mono text-white group-hover:text-[#00D084] transition-colors">{srv.price}</span>
                              <button onClick={e => { e.stopPropagation(); setBookingService({ title: srv.title, price: srv.price }); setBookingModalOpen(true); }}
                                className="px-4 py-2 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider group-hover:bg-[#00e08f] transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,208,132,0.4)] cursor-pointer">
                                <span>Book Now</span><ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Dot progress indicators */}
                <div className="flex items-center justify-center gap-2 -mt-2">
                  {filteredServices.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setCarouselIdx(i)}
                      animate={{ width: i === carouselIdx % filteredServices.length ? 24 : 6, opacity: i === carouselIdx % filteredServices.length ? 1 : 0.35 }}
                      className={`h-1.5 rounded-full cursor-pointer ${i === carouselIdx % filteredServices.length ? "bg-[#00D084]" : "bg-white/40"}`}
                    />
                  ))}
                </div>
              </div>
            </section>



            {/* =================================================================
                6. TOP EV BRANDS
               ================================================================= */}
            <section id="brands" ref={brandsSectionRef} className="py-20 px-6 bg-[#020403] font-serif">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                  variants={staggerContainer}
                  className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
                >
                  <motion.div variants={staggerItem}>
                    <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">Multi-Brand Experts</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 tracking-tight">Top EV Brands We Service</h2>
                    <p className="text-white/60 text-sm mt-1 font-serif">We provide expert service for all leading EV brands</p>
                  </motion.div>
                  <motion.button variants={staggerItem} whileHover={{ scale: 1.04 }}
                    onClick={() => toast.info("We support over 20+ EV 2W and 3W brands.")}
                    className="px-6 py-3 rounded-full border border-white/20 text-white text-xs font-serif font-bold hover:bg-white/10 transition-all cursor-pointer w-fit">
                    View All Brands
                  </motion.button>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {BRANDS.map((brand, idx) => (
                    <motion.div
                      key={idx}
                      className="brand-card-item transition-all duration-300 cursor-pointer group flex items-center justify-center aspect-square w-full overflow-hidden rounded-2xl bg-[#050907] p-5"
                      whileHover={{ scale: 1.08, y: -4 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => { setSelectedBrand(brand.name); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      title={brand.name}
                    >
                      <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-105" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* =================================================================
                7. WHY CHOOSE MY EV SERVICE
               ================================================================= */}
            <section id="why-us" ref={whySectionRef} className="py-20 px-6 bg-[#020403] font-serif">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                  variants={fadeInUp}
                  className="text-center max-w-3xl mx-auto mb-16"
                >
                  <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#00D084]">Our Promise</span>
                  <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white mt-2 mb-4 tracking-tight">Why Choose MY EV SERVICE?</h2>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {WHY_CHOOSE.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <motion.div
                        key={idx}
                        className="why-card-item backdrop-blur-xl bg-white/[0.03] border border-white/15 hover:border-[#00D084]/50 rounded-3xl p-6 text-left flex flex-col justify-between transition-all duration-300"
                        whileHover={{ scale: 1.03, y: -6, boxShadow: "0 20px 40px rgba(0,208,132,0.15)" }}
                      >
                        <div>
                          <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className="w-12 h-12 rounded-2xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] mb-4"
                          >
                            <IconComp className="w-6 h-6" />
                          </motion.div>
                          <h3 className="text-lg font-serif font-bold text-white mb-1">{item.title}</h3>
                          <div className="text-xs font-bold text-[#00D084] mb-2">{item.subtitle}</div>
                          <p className="text-xs text-white/60 font-serif leading-relaxed">{item.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* =================================================================
                8. FRANCHISE BANNER
               ================================================================= */}
            <motion.section
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
              variants={scaleIn}
              className="py-12 px-6 max-w-7xl mx-auto font-sans"
            >
              <div className="relative rounded-[32px] overflow-hidden border border-white/20 bg-[#071915] min-h-[300px] flex flex-col lg:flex-row items-center justify-between p-8 sm:p-10 lg:p-12 shadow-2xl">
                <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] bg-cover bg-right bg-no-repeat pointer-events-none opacity-90"
                  style={{ backgroundImage: "url('/franchise-bg.png')" }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#071915] via-[#071915]/80 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071915]/60 via-transparent to-transparent lg:hidden" />
                </div>
                <div className="relative z-10 max-w-2xl space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">Start Your Own EV Service Center</h2>
                  <p className="text-sm sm:text-base text-[#80a196] font-normal leading-relaxed">Join India's fastest growing EV service network.</p>
                  <div className="flex flex-wrap items-center gap-5 text-xs text-[#a0c5ba] font-medium pt-2 pb-2">
                    {[["💵", "Low Investment"], ["📈", "High Returns"], ["🎓", "Complete Training & Support"]].map(([emoji, label], i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="text-[#00D084]">{emoji}</span><span>{label}</span>
                      </div>
                    ))}
                  </div>
                  <motion.div whileHover={{ x: 3 }}>
                    <Link to="/franchise"
                      className="mt-4 px-7 py-3.5 rounded-full bg-[#05110d] text-[#00D084] text-sm font-bold border border-[#00D084]/20 hover:bg-[#00D084] hover:text-[#020403] transition-all flex items-center gap-2 w-fit cursor-pointer group shadow-lg">
                      <span>Become a Franchise Partner</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* =================================================================
                9. FAQs
               ================================================================= */}
            <section className="py-16 px-6 max-w-7xl mx-auto font-sans">
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                variants={staggerContainer}
              >
                <motion.div variants={staggerItem} className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h2>
                  <button onClick={() => toast.info("Viewing all FAQs")}
                    className="text-[#00D084] font-bold text-sm hover:underline flex items-center gap-1.5 cursor-pointer group">
                    <span>View All FAQs</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[FAQS.slice(0, 3), FAQS.slice(3, 6)].map((col, ci) => (
                    <motion.div
                      key={ci}
                      variants={ci === 0 ? fadeInLeft : { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
                      className="bg-[#070b09] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10"
                    >
                      {col.map((faq, idx) => {
                        const actualIdx = ci * 3 + idx;
                        const isOpen = openFaqIdx === actualIdx;
                        return (
                          <div key={actualIdx}
                            className="p-5 sm:p-6 transition-colors cursor-pointer hover:bg-white/[0.02]"
                            onClick={() => setOpenFaqIdx(isOpen ? null : actualIdx)}
                          >
                            <div className="flex items-center justify-between gap-4">
                              <h3 className="text-sm sm:text-base font-bold text-white leading-snug">{faq.q}</h3>
                              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                <ChevronDown className={`w-4 h-4 shrink-0 ${isOpen ? "text-[#00D084]" : "text-white/60"}`} />
                              </motion.div>
                            </div>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.p
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                  className="mt-3 text-xs sm:text-sm text-white/70 font-light leading-relaxed overflow-hidden"
                                >
                                  {faq.a}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* =================================================================
                10. RIDER STORIES / EXPERIENCES BENTO
               ================================================================= */}
            <motion.section
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
              className="py-16 px-6 max-w-7xl mx-auto font-sans relative overflow-hidden"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-8">
                <motion.div variants={staggerItem} className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Experiences</h2>
                  <Link to="/feedback" className="text-[#00D084] font-bold text-sm hover:underline flex items-center gap-1.5 cursor-pointer group">
                    <span>Share Your Feedback</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Hero experience card (Spans 2 cols, 2 rows) */}
                  <div className="md:col-span-2 md:row-span-2 flex flex-col">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={heroExp.id}
                        initial={{ opacity: 0, scale: 0.97, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: -20 }}
                        transition={{ duration: 0.45 }}
                        className="bg-gradient-to-br from-[#060e0a] to-[#030604] border border-white/10 hover:border-[#00D084]/40 rounded-[32px] p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,208,132,0.1)] group shadow-2xl relative overflow-hidden h-full min-h-[380px]"
                      >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="space-y-6 relative z-10">
                          <div className="flex items-center justify-between">
                            <div className="flex text-amber-400 gap-1">{[...Array(heroExp.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}</div>
                            <span className="text-[10px] font-mono font-bold text-[#00D084] bg-[#00D084]/15 px-3 py-1 rounded-full border border-[#00D084]/30 uppercase tracking-wider">{heroExp.badge}</span>
                          </div>
                          <p className="text-lg sm:text-2xl text-white/95 font-medium leading-relaxed italic font-serif">"{heroExp.quote}"</p>
                        </div>
                        <div className="pt-6 mt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center font-black text-[#00D084] text-lg shrink-0">{heroExp.avatar}</div>
                            <div>
                              <h4 className="text-base font-bold text-white group-hover:text-[#00D084] transition-colors">{heroExp.name}</h4>
                              <p className="text-xs text-white/50 font-mono">{heroExp.evModel} • {heroExp.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {heroExp.jobCard && <span className="hidden sm:inline-block text-[11px] font-mono text-white/40 border border-white/10 px-3 py-1.5 rounded-xl">{heroExp.jobCard}</span>}
                            {/* Integrated control pill */}
                            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-white/5 shrink-0">
                              {EXPERIENCES_DATA.map((_, i) => (
                                <button key={i} onClick={() => setExpActiveIdx(i)}
                                  className={`h-1.5 rounded-full transition-all duration-300 ${i === expActiveIdx ? "w-4 bg-[#00D084]" : "w-1.5 bg-white/30 hover:bg-white/60"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Side Card 1 (Row 1 Col 3) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={sideExp1.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="bg-gradient-to-br from-[#060e0a] to-[#030604] border border-white/10 hover:border-[#00D084]/40 rounded-[32px] p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_20px_50px_rgba(0,208,132,0.05)] group shadow-xl relative overflow-hidden min-h-[180px]"
                    >
                      <div className="space-y-3 relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="flex text-amber-400 gap-1">{[...Array(sideExp1.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}</div>
                          <span className="text-[9px] font-mono font-bold text-[#00D084] bg-[#00D084]/15 px-2.5 py-0.5 rounded-full border border-[#00D084]/30">{sideExp1.badge}</span>
                        </div>
                        <p className="text-sm text-white/90 font-medium leading-relaxed italic">"{sideExp1.quote}"</p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-3 relative z-10">
                        <div className="w-9 h-9 rounded-xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center font-bold text-[#00D084] text-xs shrink-0">{sideExp1.avatar}</div>
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-[#00D084] transition-colors">{sideExp1.name}</h4>
                          <p className="text-[11px] text-white/50 font-mono">{sideExp1.evModel}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Side Card 2 (Row 2 Col 3) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={sideExp2.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="bg-gradient-to-br from-[#060e0a] to-[#030604] border border-white/10 hover:border-[#00D084]/40 rounded-[32px] p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_20px_50px_rgba(0,208,132,0.05)] group shadow-xl relative overflow-hidden min-h-[180px]"
                    >
                      <div className="space-y-3 relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="flex text-amber-400 gap-1">{[...Array(sideExp2.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}</div>
                          <span className="text-[9px] font-mono font-bold text-[#00D084] bg-[#00D084]/15 px-2.5 py-0.5 rounded-full border border-[#00D084]/30">{sideExp2.badge}</span>
                        </div>
                        <p className="text-sm text-white/90 font-medium leading-relaxed italic">"{sideExp2.quote}"</p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-3 relative z-10">
                        <div className="w-9 h-9 rounded-xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center font-bold text-[#00D084] text-xs shrink-0">{sideExp2.avatar}</div>
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-[#00D084] transition-colors">{sideExp2.name}</h4>
                          <p className="text-[11px] text-white/50 font-mono">{sideExp2.evModel}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* CTA Banner (Spans 3 cols at bottom) */}
                  <div className="md:col-span-3 bg-gradient-to-r from-[#08120c] to-[#040906] border border-[#00D084]/35 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_50px_rgba(0,208,132,0.15)] relative overflow-hidden mt-2">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(0,208,132,0.08),transparent_60%)] pointer-events-none" />
                    <div className="space-y-1.5 text-center md:text-left relative z-10">
                      <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                        <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
                        <span className="text-[10px] font-mono font-bold text-[#00D084] uppercase tracking-widest">RIDER VOICES</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Share Your EV Experience & Get 15% OFF!</h3>
                      <p className="text-xs sm:text-sm text-white/70 font-medium max-w-md">Help thousands of EV owners choose certified service hubs across India.</p>
                    </div>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="shrink-0 relative z-10">
                      <Link to="/feedback" className="inline-block px-7 py-4 rounded-2xl bg-[#00D084] text-[#020403] font-black uppercase text-xs tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer shadow-[0_0_20px_rgba(0,208,132,0.4)]">
                        Submit Experience ✍️
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* =================================================================
                11. FOOTER CALLOUT
               ================================================================= */}
            <section id="callout" className="py-24 px-6 bg-[#020403] font-serif text-center">
              <div ref={calloutRef} className="max-w-4xl mx-auto space-y-6">
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                  variants={staggerContainer}
                >
                  <motion.span variants={staggerItem} className="text-xs font-serif font-bold uppercase tracking-widest text-[#00D084]">India's #1 EV Service Network</motion.span>
                  <motion.h2 variants={staggerItem} className="text-4xl sm:text-6xl font-serif font-black text-white tracking-tight leading-tight">
                    Your EV Deserves <span className="text-[#00D084]">Expert Care</span>
                  </motion.h2>
                  <motion.p variants={staggerItem} className="text-base sm:text-lg text-white/70 font-serif font-light max-w-2xl mx-auto">
                    Certified technicians. Doorstep service. Genuine parts.
                  </motion.p>
                  <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setBookingModalOpen(true)}
                      className="px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-serif font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-[0_0_30px_rgba(0,208,132,0.4)]">
                      Book a Service
                    </motion.button>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Link to="/store" className="px-8 py-4 rounded-full border border-white/20 text-white text-xs font-serif font-bold uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer">
                        Explore Parts
                      </Link>
                    </motion.div>
                    <motion.button whileHover={{ scale: 1.05 }}
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white text-xs font-serif font-bold uppercase tracking-widest hover:bg-white/20 transition-all cursor-pointer">
                      Find Centers Near You
                    </motion.button>
                  </motion.div>
                  <motion.div variants={staggerItem} className="pt-6 flex items-center justify-center gap-2 text-xs font-serif font-bold text-white/80">
                    <div className="flex text-[#00D084]">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                    <span>4.8 Average Rating</span>
                  </motion.div>
                </motion.div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* ── Booking Modal ── */}
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} service={bookingService} />

      {/* ── Onboard New City Modal ── */}
      {onboardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#090f0c] border border-white/20 rounded-[32px] max-w-md w-full p-6 sm:p-8 relative shadow-2xl"
          >
            <button onClick={() => setOnboardModalOpen(false)} className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/10">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2 text-[#00D084] font-mono text-xs font-bold uppercase tracking-widest">
              <Plus className="w-4 h-4" /> CITY HUB ONBOARDING
            </div>
            <h3 className="text-2xl font-black tracking-tight text-white mb-2">Onboard a New City</h3>
            <p className="text-xs text-white/60 leading-relaxed mb-6">Enter city details to launch an official diagnostic hub network and auto-generate the city landing page.</p>
            <form onSubmit={e => {
              e.preventDefault();
              if (!newCityName) { toast.error("Please enter a City Name."); return; }
              const created = onboardNewCity({ name: newCityName, state: newCityState || "India", centersCount: Math.floor(Math.random() * 5) + 3, areas: [`Central ${newCityName}`, "North Cluster", "South Cluster"] });
              toast.success(`City "${created.name}" onboarded! Dynamic page generated at /city/${created.id}`);
              setOnboardModalOpen(false); setNewCityName(""); setNewCityState("");
            }} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-white/60 block mb-1">City Name *</label>
                <input type="text" required placeholder="e.g. Surat, Kolkata, Chennai" value={newCityName} onChange={e => setNewCityName(e.target.value)}
                  className="w-full bg-[#030604] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084]" />
              </div>
              <div>
                <label className="text-xs font-mono text-white/60 block mb-1">State Name</label>
                <input type="text" placeholder="e.g. Gujarat, West Bengal" value={newCityState} onChange={e => setNewCityState(e.target.value)}
                  className="w-full bg-[#030604] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084]" />
              </div>
              <button type="submit" className="w-full py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg">
                ONBOARD CITY & LAUNCH PAGE
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* ── Unavailable City Modal ── */}
      <AnimatePresence>
        {unavailableModalOpen && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#030c07] border-2 border-[#00D084]/50 rounded-[32px] p-6 sm:p-8 max-w-lg w-full text-center shadow-[0_0_80px_rgba(0,208,132,0.3)] relative overflow-hidden space-y-5 font-sans"
            >
              <button onClick={() => setUnavailableModalOpen(false)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer">
                <X className="w-5 h-5" />
              </button>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#00D084]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto text-2xl">📍</div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-[0.2em] bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">SERVICE LAUNCHING SOON</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">Service Unavailable in <span className="text-[#00D084]">{unservicedCityName}</span></h3>
              </div>
              <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed">MY EV SERVICE centers are currently active in 6 major metro hubs across India. We haven't launched certified diagnostic workshops in <strong className="text-white">{unservicedCityName}</strong> yet.</p>
              <div className="space-y-2.5 pt-3 border-t border-white/10">
                <span className="text-[11px] font-black text-white/70 uppercase tracking-wider block">Select an Active Metro Hub:</span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[{ name: "Pune", slug: "pune" }, { name: "Mumbai", slug: "mumbai" }, { name: "Bangalore", slug: "bangalore" }, { name: "Delhi NCR", slug: "delhi-ncr" }, { name: "Hyderabad", slug: "hyderabad" }, { name: "Ahmedabad", slug: "ahmedabad" }].map((c, i) => (
                    <motion.button key={i} whileHover={{ scale: 1.05 }}
                      onClick={() => { setUnavailableModalOpen(false); navigate({ to: "/city/$cityId", params: { cityId: c.slug }, search: { service: selectedService, brand: selectedBrand, searchArea: c.name } }); }}
                      className="px-3.5 py-1.5 rounded-full bg-[#00D084]/15 hover:bg-[#00D084] text-[#00D084] hover:text-[#020403] border border-[#00D084]/40 text-xs font-black transition-all cursor-pointer">
                      {c.name} →
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => { toast.success(`Registered your vote to launch a MY EV SERVICE hub in ${unservicedCityName}!`); setUnavailableModalOpen(false); }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer">
                  Request Hub in {unservicedCityName}
                </motion.button>
                <button onClick={() => setUnavailableModalOpen(false)} className="w-full sm:w-auto px-5 py-3 rounded-xl border border-white/20 hover:border-white/40 text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* City Pre-booking slots Modal */}
      {activeSearchedCity && (
        <CityPreBookingModal
          isOpen={preBookingModalOpen}
          onClose={() => setPreBookingModalOpen(false)}
          cityName={activeSearchedCity.name}
          initialSlots={
            DEFAULT_CITY_SLOTS[activeSearchedCity.id.toLowerCase().replace(/[^a-z0-9]+/g, "-")] ||
            activeSearchedCity.areas.map((areaName, i) => ({
              id: `${activeSearchedCity.id.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i + 1}`,
              area: areaName,
              pincode: `${411000 + (i + 1) * 7}`,
              status: i % 3 === 2 ? "booked" : "available",
            }))
          }
        />
      )}

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
