import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import { getOnboardedCities, onboardNewCity, EVCity, findMatchingAvailableCity } from "../data/cities";
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

interface CityOfferCampaign {
  id: string;
  cityName: string;
  badge: string;
  title: string;
  subtitle: string;
  discountTag: string;
  code: string;
  validUntil: string;
  perks: string[];
}

const CITY_OFFER_CAMPAIGNS: Record<string, CityOfferCampaign> = {
  pune: {
    id: "pune-monsoon-2026",
    cityName: "Pune",
    badge: "🔥 PUNE MONSOON SPECIAL",
    title: "Flat 25% OFF on BMS Battery Diagnostics & Cell Equalization",
    subtitle: "Exclusive for Pune EV owners! Free 32-Point Battery Health Scan & 90-Day Service Warranty across Baner, Wakad, Kothrud & Kharadi centers.",
    discountTag: "FLAT 25% OFF",
    code: "MYEVPUNE25",
    validUntil: "Ends in 3 days • 18 Left",
    perks: ["Free Doorstep Pickup in Pune", "Instant Diagnostic Report", "90-Day Warranty"],
  },
  mumbai: {
    id: "mumbai-mega-2026",
    cityName: "Mumbai",
    badge: "⚡ MUMBAI MEGA EV FESTIVAL",
    title: "Flat ₹500 OFF General Service + FREE 6-Month Emergency RSA",
    subtitle: "Rain-ready monsoon maintenance package for Ola, Ather & TVS 2W owners in Mumbai & Thane.",
    discountTag: "FLAT ₹500 OFF",
    code: "MUMBAI500",
    validUntil: "Valid till Sunday • Limited Slots",
    perks: ["Free RSA Towing (24/7)", "OEM Genuine Spare Parts", "3-Hour Express Service"],
  },
  bengaluru: {
    id: "blr-tech-2026",
    cityName: "Bengaluru",
    badge: "🚀 BENGALURU TECH CARE CAMPAIGN",
    title: "FREE BMS Software Firmware Flashing + 20% OFF Motor Tuning",
    subtitle: "High-performance motor controller calibration and thermal safety checks in Indiranagar, HSR & Koramangala.",
    discountTag: "FREE SOFTWARE FLASH",
    code: "BLREVTECH",
    validUntil: "Expires in 48 Hours",
    perks: ["FOC Controller Tuning", "Zero Cancellation Fee", "Certified Techs"],
  },
  delhi: {
    id: "delhi-green-2026",
    cityName: "Delhi NCR",
    badge: "🌿 DELHI NCR CLEAN AIR CAMPAIGN",
    title: "Flat 30% OFF Comprehensive Periodic Maintenance",
    subtitle: "Special monsoon care for Noida, Gurgaon & South Delhi EV riders with certified cell diagnostics.",
    discountTag: "30% DISCOUNT",
    code: "DELHIGREEN30",
    validUntil: "Limited to first 50 bookings",
    perks: ["Free Battery Safety Audit", "Same-Day Return", "100% Original Spares"],
  },
  hyderabad: {
    id: "hyd-charge-2026",
    cityName: "Hyderabad",
    badge: "⚡ HYDERABAD CHARGE-UP PROMO",
    title: "FREE Charger & Port Diagnostics + Flat 20% OFF Repairs",
    subtitle: "Get fast diagnostic reporting & cell balancing in Gachibowli, HITECH City & Madhapur.",
    discountTag: "FREE CHARGER SCAN",
    code: "HYDCHARGE20",
    validUntil: "Ends this week",
    perks: ["Free Charger Cable Check", "Doorstep Pickup", "Digital Jobcard"],
  },
};

const DEFAULT_CAMPAIGN: CityOfferCampaign = {
  id: "all-india-2026",
  cityName: "Pan-India",
  badge: "🇮🇳 PAN-INDIA EV REVOLUTION OFFER",
  title: "Flat 20% OFF Any EV Service + Free 32-Point Inspection",
  subtitle: "Available across all 40+ onboarded cities in India. Book certified doorstep or workshop service today!",
  discountTag: "FLAT 20% OFF",
  code: "MYEV2026",
  validUntil: "Active Today • All Centers",
  perks: ["40+ Cities Active", "Genuine OEM Components", "Instant Online Booking"],
};

function getCityOfferCampaign(city: string): CityOfferCampaign {
  if (!city) return DEFAULT_CAMPAIGN;
  const key = city.trim().toLowerCase();
  for (const cName in CITY_OFFER_CAMPAIGNS) {
    if (key.includes(cName) || cName.includes(key)) {
      return CITY_OFFER_CAMPAIGNS[cName];
    }
  }
  return {
    ...DEFAULT_CAMPAIGN,
    cityName: city.toUpperCase(),
    title: `SPECIAL ${city.toUpperCase()} EV MAINTENANCE OFFER`,
    subtitle: `Get 20% OFF on all EV services in ${city} with 90-day warranty & certified diagnostic scan.`,
    code: `MYEV${city.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 5)}20`,
  };
}
interface ExperienceItem {
  id: string;
  name: string;
  avatar: string;
  evModel: string;
  location: string;
  badge: string;
  quote: string;
  jobCard?: string;
  rating: number;
}

const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    name: "Rajesh Sharma",
    avatar: "RS",
    evModel: "Ola S1 Pro Owner",
    location: "Baner, Pune",
    badge: "⚡ SAVED ₹18,000 IN BATTERY REPAIR",
    quote: "My Ola S1 battery was draining rapidly near Baner. MY EV SERVICE diagnosed a faulty BMS thermal sensor within 30 minutes at their Baner workshop and saved me ₹18,000 in full pack replacement!",
    jobCard: "Job Card #EV-8821",
    rating: 5,
  },
  {
    id: "exp-2",
    name: "Priya Deshmukh",
    avatar: "PD",
    evModel: "Ather 450X Owner",
    location: "Bandra, Mumbai",
    badge: "📍 20-MIN RSA RESPONSE",
    quote: "Got stuck in waterlogged streets of Bandra during heavy rain. Their 24/7 mobile van arrived in 20 minutes, ran battery insulation checks, and escorted me home safely.",
    rating: 5,
  },
  {
    id: "exp-3",
    name: "Karthik Venkat",
    avatar: "KV",
    evModel: "Fleet Manager (45 EV Scooters)",
    location: "Indiranagar, BLR",
    badge: "🚀 +14% RANGE BOOST",
    quote: "We manage a commercial fleet of 45 delivery scooters in Bangalore. Their periodic software firmware flashing and cell balancing increased our daily range by 14%!",
    rating: 5,
  },
  {
    id: "exp-4",
    name: "Amitabh Verma",
    avatar: "AV",
    evModel: "TVS iQube Electric",
    location: "Cyber City, Gurugram",
    badge: "🔋 FOC CELL EQUALIZATION",
    quote: "After 2 years of daily commutes to Cyber City, my battery health dropped to 74%. Their workshop performed active cell balancing and brought it back up to 92%!",
    jobCard: "Job Card #EV-9140",
    rating: 5,
  },
  {
    id: "exp-5",
    name: "Sneha Reddi",
    avatar: "SR",
    evModel: "Hero Vida V1 Pro",
    location: "Gachibowli, Hyderabad",
    badge: "⚡ FAST CHARGER FIX",
    quote: "My home charger port was throwing high voltage errors. The mobile diagnostic tech arrived at Gachibowli within an hour and fixed the ground leak issue on the spot.",
    rating: 5,
  },
  {
    id: "exp-6",
    name: "Vikram Mehta",
    avatar: "VM",
    evModel: "Bajaj Chetak Premium",
    location: "SG Highway, Ahmedabad",
    badge: "🔧 45-MIN EXPRESS SERVICE",
    quote: "Booked periodic motor controller calibration on SG Highway. Rapid 45-minute turnaround with digital job card updates directly on WhatsApp!",
    rating: 5,
  },
];

function Service3DCard({ srv, onBook }: { srv: any; onBook: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onBook}
      className="popular-service-card relative rounded-[30px] border border-white/15 hover:border-[#00D084]/80 bg-[#050b07] p-6 flex flex-col justify-between transition-all duration-300 ease-out cursor-pointer group overflow-hidden min-h-[230px]"
    >
      {/* Background Image with Ambient Zoom */}
      <img
        src={srv.image}
        alt={srv.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-65 group-hover:scale-110 transition-all duration-700 pointer-events-none"
      />

      {/* Futuristic Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-[#020503]/80 to-transparent pointer-events-none" />

      {/* Light Sweep Effect on Hover */}
      <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[#00D084]/20 to-transparent group-hover:left-full transition-all duration-1000 pointer-events-none" />

      {/* Bottom Content Area */}
      <div className="relative z-10 space-y-3 mt-auto pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/60 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#00D084]" /> {srv.duration}
          </span>
          <span className="text-xs font-mono font-bold text-[#00D084]">
            {srv.centers}
          </span>
        </div>

        <h4 className="text-lg font-black text-white group-hover:text-[#00D084] transition-colors leading-snug">
          {srv.title}
        </h4>

        <div className="pt-2 flex items-center justify-between">
          <div>
            <span className="text-xl font-black text-white font-mono group-hover:text-[#00D084] transition-colors">
              {srv.price}
            </span>
          </div>

          <button className="px-4 py-2 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider group-hover:bg-[#00e08f] transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,208,132,0.4)]">
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

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

  // Unavailable City Pop-up Modal State
  const [unavailableModalOpen, setUnavailableModalOpen] = useState(false);
  const [unservicedCityName, setUnservicedCityName] = useState("");

  // Auto-rotating 2-second interval state for Experiences Bento Grid
  const [expActiveIdx, setExpActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setExpActiveIdx((prev) => (prev + 1) % EXPERIENCES_DATA.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const heroExp = EXPERIENCES_DATA[expActiveIdx];
  const sideExp1 = EXPERIENCES_DATA[(expActiveIdx + 1) % EXPERIENCES_DATA.length];
  const sideExp2 = EXPERIENCES_DATA[(expActiveIdx + 2) % EXPERIENCES_DATA.length];

  // Service Categories State
  const SERVICE_CATEGORIES = ["All Services", "Battery & BMS", "Motor & Drive", "Diagnostics & Software"];
  const [activeServiceCategory, setActiveServiceCategory] = useState("All Services");

  // Touch / Mouse Drag / Wheel Gesture Handlers for 3D Wave Popular Services
  const [isServicesPaused, setIsServicesPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDraggingWave = useRef(false);
  const lastWheelTime = useRef(0);

  const handleWaveDragStart = (clientX: number) => {
    touchStartX.current = clientX;
    touchEndX.current = clientX;
    isDraggingWave.current = true;
    setIsServicesPaused(true);
  };

  const handleWaveDragMove = (clientX: number) => {
    if (!isDraggingWave.current) return;
    touchEndX.current = clientX;
  };

  const handleWaveDragEnd = () => {
    if (!isDraggingWave.current) return;
    isDraggingWave.current = false;
    const diffX = touchStartX.current - touchEndX.current;

    // Swipe left (next card)
    if (diffX > 35) {
      setExpActiveIdx((prev) => (prev + 1) % EXPERIENCES_DATA.length);
    }
    // Swipe right (prev card)
    else if (diffX < -35) {
      setExpActiveIdx((prev) => (prev - 1 + EXPERIENCES_DATA.length) % EXPERIENCES_DATA.length);
    }
  };

  const handleWaveWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 300) return;

    if (Math.abs(e.deltaX) > 15 || Math.abs(e.deltaY) > 25) {
      lastWheelTime.current = now;
      if (e.deltaX > 15 || e.deltaY > 25) {
        setExpActiveIdx((prev) => (prev + 1) % EXPERIENCES_DATA.length);
      } else {
        setExpActiveIdx((prev) => (prev - 1 + EXPERIENCES_DATA.length) % EXPERIENCES_DATA.length);
      }
    }
  };

  useEffect(() => {
    if (isServicesPaused) return;

    const interval = setInterval(() => {
      setExpActiveIdx((prev) => (prev + 1) % EXPERIENCES_DATA.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isServicesPaused]);

  // Dynamic City Offer Campaign State
  const activeOffer = getCityOfferCampaign(searchCity || selectedCity || "Pune");

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

      gsap.fromTo(
        ".popular-service-card",
        { opacity: 0, y: 60, rotateX: 12, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".popular-services-section",
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const [isDetectingLoc, setIsDetectingLoc] = useState(false);

  const handleDetectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsDetectingLoc(true);
    toast.info("Detecting your live coordinates & city...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.suburb ||
            data.address?.state_district ||
            "Pune";

          setSearchCity(city);
          setSelectedCity(city);
          toast.success(`📍 Live Location Detected: ${city}!`);
        } catch (err) {
          toast.success(`📍 Location detected near Pune!`);
        } finally {
          setIsDetectingLoc(false);
        }
      },
      (err) => {
        setIsDetectingLoc(false);
        toast.error("Location permission denied or unavailable.");
      },
      { timeout: 10000 }
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryCity = searchCity.trim() || "Pune";
    const matchedCity = findMatchingAvailableCity(queryCity);

    if (!matchedCity) {
      setUnservicedCityName(queryCity);
      setUnavailableModalOpen(true);
      return;
    }

    toast.success(`Locating certified EV centers in ${matchedCity.name}...`);

    navigate({
      to: "/city/$cityId",
      params: { cityId: matchedCity.id },
      search: {
        service: selectedService,
        brand: selectedBrand,
        searchArea: queryCity,
      },
    });
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
      id: "srv-1",
      title: "Battery Health Scan",
      category: "Battery & BMS",
      centers: "180+ Hubs",
      image: "https://images.unsplash.com/photo-1558441719-670b357024bf?w=800&auto=format&fit=crop&q=80",
      desc: "32-Point cell voltage, thermal sensor audit & state-of-health report.",
      price: "₹399",
      badge: "⚡ 30-MIN EXPRESS",
      duration: "30 Mins",
      rating: "4.9★",
    },
    {
      id: "srv-2",
      title: "Motor & FOC Controller Tuning",
      category: "Motor & Drive",
      centers: "150+ Hubs",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      desc: "Controller phase wire calibration, hall sensor testing & torque optimization.",
      price: "₹1,999",
      badge: "🚀 TOP PERFORMANCE",
      duration: "60 Mins",
      rating: "4.9★",
    },
    {
      id: "srv-3",
      title: "Fast Charger & Port Repair",
      category: "Diagnostics & Software",
      centers: "220+ Hubs",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
      desc: "High voltage thermal fuse replacement, ground fault fix & socket isolation test.",
      price: "₹899",
      badge: "🔌 SAFETY VERIFIED",
      duration: "45 Mins",
      rating: "4.8★",
    },
    {
      id: "srv-4",
      title: "BMS Firmware Flashing",
      category: "Diagnostics & Software",
      centers: "310+ Hubs",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      desc: "Official OEM OTA firmware flashing, CAN bus telemetry reset & ECU updates.",
      price: "₹699",
      badge: "💻 OEM OFFICIAL",
      duration: "20 Mins",
      rating: "5.0★",
    },
    {
      id: "srv-5",
      title: "Active Cell Equalization",
      category: "Battery & BMS",
      centers: "420+ Hubs",
      image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&auto=format&fit=crop&q=80",
      desc: "Precision active cell balancing to restore lost battery range by up to 15%.",
      price: "₹1,399",
      badge: "🔋 RANGE BOOST",
      duration: "2 Hours",
      rating: "4.9★",
    },
    {
      id: "srv-6",
      title: "Monsoon Insulation Protection",
      category: "Motor & Drive",
      centers: "290+ Hubs",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80",
      desc: "Waterproofing enclosure seal check, IP67 harness coating & rust treatment.",
      price: "₹999",
      badge: "🌧️ MONSOON SHIELD",
      duration: "45 Mins",
      rating: "4.9★",
    },
    {
      id: "srv-7",
      title: "Full Pack BMS Thermal Repair",
      category: "Battery & BMS",
      centers: "510+ Hubs",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
      desc: "Component-level repair of thermal sensors, BMS logic boards & heavy connectors.",
      price: "₹3,499",
      badge: "🛡️ 90-DAY WARRANTY",
      duration: "3 Hours",
      rating: "5.0★",
    },
    {
      id: "srv-8",
      title: "Comprehensive Annual Care",
      category: "Diagnostics & Software",
      centers: "600+ Hubs",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80",
      desc: "Complete 45-point EV health service, brake fluid bleed & belt alignment.",
      price: "₹2,499",
      badge: "🌟 BEST VALUE",
      duration: "3.5 Hours",
      rating: "4.9★",
    },
  ];

  const filteredServices = activeServiceCategory === "All Services"
    ? POPULAR_SERVICES
    : POPULAR_SERVICES.filter(s => s.category === activeServiceCategory);

  const BRANDS = [
    { name: "Ola Electric", logo: "/brands/ola.jpeg", models: "S1 Pro, S1 Air, S1 X" },
    { name: "Ather", logo: "/brands/ather.jpeg", models: "450X, 450S, Rizta" },
    { name: "TVS", logo: "/brands/tvs.webp", models: "iQube, X" },
    { name: "Hero Electric", logo: "/brands/hero-electric.jpeg", models: "Optima, Nyx, Atria" },
    { name: "Vida by Hero", logo: "/brands/hero-electric.jpeg", models: "Vida V1 Plus, V1 Pro" },
    { name: "Bajaj Chetak", logo: "/brands/bajaj.png", models: "Chetak Premium, Urbane" },
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
            className="w-full h-full object-cover object-center opacity-100"
          />

          {/* Hero Content Container */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-12 max-w-7xl mx-auto space-y-6 z-10 transition-all pointer-events-auto text-left overflow-y-auto py-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
              
              {/* =========================================================================
                  LEFT COLUMN: TEXT & VALUE PROPOSITION
                 ========================================================================= */}
              <div className="lg:col-span-7 space-y-6 text-left items-start">
                
                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">
                  Find Service Centers <br />
                  <span className="text-[#00D084] font-black drop-shadow-[0_0_30px_rgba(0,208,132,0.4)]">Near You</span>
                </h1>

                {/* Subtitle Paragraph */}
                <p className="text-base sm:text-lg md:text-xl text-white font-black leading-relaxed max-w-2xl drop-shadow-[0_2px_16px_rgba(0,0,0,1)]">
                  Your one-stop solution for all EV repair, maintenance and services — quick, reliable and hassle-free.
                </p>

              </div>

              {/* =========================================================================
                  RIGHT COLUMN: IMMERSIVE HIGH-TECH SEARCH FORM
                 ========================================================================= */}
              <div className="lg:col-span-5 w-full">
                <div className="bg-[#030c07]/95 border-2 border-[#00D084]/50 rounded-[32px] p-6 sm:p-7 backdrop-blur-3xl shadow-[0_0_60px_rgba(0,208,132,0.25)] relative overflow-hidden space-y-5 text-left">
                  {/* Glowing background light */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#00D084]/20 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base font-black text-white uppercase tracking-wider">
                        Search Service Center
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#00D084] bg-[#00D084]/15 px-2.5 py-1 rounded-full border border-[#00D084]/30">
                      INSTANT SEARCH
                    </span>
                  </div>

                  <form onSubmit={handleSearchSubmit} className="space-y-4">
                    
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] text-white/80 font-black uppercase tracking-wider block">
                          Enter City or Area
                        </label>
                        <button
                          type="button"
                          onClick={handleDetectLocation}
                          disabled={isDetectingLoc}
                          className="text-[10px] text-[#00D084] font-mono font-bold hover:underline flex items-center gap-1 cursor-pointer bg-[#00D084]/10 px-2.5 py-0.5 rounded-full border border-[#00D084]/30 hover:bg-[#00D084]/20 transition-all"
                        >
                          <Navigation className={`w-3 h-3 text-[#00D084] ${isDetectingLoc ? "animate-spin" : "animate-pulse"}`} />
                          <span>{isDetectingLoc ? "Detecting..." : "Detect Location 📍"}</span>
                        </button>
                      </div>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#00D084] absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          placeholder="e.g. Pune, Baner, Wakad, Mumbai"
                          value={searchCity}
                          onChange={(e) => {
                            setSearchCity(e.target.value);
                            setSelectedCity(e.target.value);
                          }}
                          className="w-full bg-[#020503] border border-white/20 hover:border-[#00D084]/60 focus:border-[#00D084] focus:ring-2 focus:ring-[#00D084]/40 rounded-xl pl-10 pr-3.5 py-3 text-xs font-black text-white focus:outline-none transition-all placeholder:text-white/40 shadow-lg"
                        />
                      </div>
                    </div>

                    {/* EV Service Selector */}
                    <div>
                      <label className="text-[11px] text-white/80 font-black block mb-1.5 uppercase tracking-wider">
                        Select EV Service
                      </label>
                      <div className="relative">
                        <Wrench className="w-4 h-4 text-[#00D084] absolute left-3.5 top-3.5 pointer-events-none z-10" />
                        <select
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full bg-[#020503] border border-white/20 hover:border-[#00D084]/60 focus:border-[#00D084] focus:ring-2 focus:ring-[#00D084]/40 rounded-xl pl-10 pr-10 py-3 text-xs font-black text-white focus:outline-none cursor-pointer transition-all appearance-none shadow-lg"
                        >
                          <option value="Battery Repair" className="bg-[#040e09] text-white font-bold py-2">Battery & Cell Diagnostics</option>
                          <option value="General Service" className="bg-[#040e09] text-white font-bold py-2">Periodic General Service</option>
                          <option value="Motor & Controller" className="bg-[#040e09] text-white font-bold py-2">Motor & FOC Controller Repair</option>
                          <option value="Software Updates" className="bg-[#040e09] text-white font-bold py-2">BMS Firmware Flashing</option>
                          <option value="Cell Balancing" className="bg-[#040e09] text-white font-bold py-2">Battery Cell Equalization</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#00D084] absolute right-3.5 top-3.5 pointer-events-none z-10" />
                      </div>
                    </div>

                    {/* EV Brand Selector */}
                    <div>
                      <label className="text-[11px] text-white/80 font-black block mb-1.5 uppercase tracking-wider">
                        Select EV Brand
                      </label>
                      <div className="relative">
                        <Zap className="w-4 h-4 text-[#00D084] absolute left-3.5 top-3.5 pointer-events-none z-10" />
                        <select
                          value={selectedBrand}
                          onChange={(e) => setSelectedBrand(e.target.value)}
                          className="w-full bg-[#020503] border border-white/20 hover:border-[#00D084]/60 focus:border-[#00D084] focus:ring-2 focus:ring-[#00D084]/40 rounded-xl pl-10 pr-10 py-3 text-xs font-black text-white focus:outline-none cursor-pointer transition-all appearance-none shadow-lg"
                        >
                          <option value="Ather" className="bg-[#040e09] text-white font-bold py-2">Ather Energy (450X / Rizta)</option>
                          <option value="Ola Electric" className="bg-[#040e09] text-white font-bold py-2">Ola Electric (S1 Pro / Air)</option>
                          <option value="TVS" className="bg-[#040e09] text-white font-bold py-2">TVS iQube / X</option>
                          <option value="Hero Electric" className="bg-[#040e09] text-white font-bold py-2">Hero Electric (Optima / Nyx)</option>
                          <option value="Vida by Hero" className="bg-[#040e09] text-white font-bold py-2">Vida V1 Plus / Pro</option>
                          <option value="Bajaj Chetak" className="bg-[#040e09] text-white font-bold py-2">Bajaj Chetak Premium</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#00D084] absolute right-3.5 top-3.5 pointer-events-none z-10" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,208,132,0.4)] hover:scale-[1.02] active:scale-[0.98] mt-2"
                    >
                      <Search className="w-4 h-4" /> Find Nearby Service Centers <ArrowRight className="w-4 h-4" />
                    </button>

                  </form>

                  <div className="pt-3 border-t border-white/10 text-[11px] text-white/50 space-y-1">
                    <p className="flex items-center gap-1.5 text-white/80 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00D084]" /> 100% Genuine OEM Spares & Certified Techs
                    </p>
                  </div>
                </div>
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
            <motion.section
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="py-20 px-6 bg-[#020403] font-serif"
            >
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
                      search={{ service: "all", brand: "all", searchArea: city.name }}
                      className={`max-w-[270px] w-full h-[370px] p-7 rounded-[36px] border-2 transition-all cursor-pointer font-serif flex flex-col justify-end group hover:scale-[1.03] relative overflow-hidden ${selectedCity.toLowerCase() === city.name.toLowerCase()
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
            </motion.section>

            {/* =========================================================================
          4. POPULAR SERVICES (3D Wave Floating Perspective Showcase - Matching Screenshot)
         ========================================================================= */}
            <motion.section
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="popular-services-section py-20 px-4 sm:px-6 bg-[#020403] font-serif relative overflow-hidden"
            >
              {/* Ambient Spotlights */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00D084]/10 rounded-full blur-[140px] pointer-events-none" />

              <div className="max-w-7xl mx-auto space-y-6 relative z-10 text-center">
                
                {/* Top Section Header */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D084]/10 border border-[#00D084]/30 text-xs font-mono font-bold text-[#00D084]">
                    <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
                    CERTIFIED EV SERVICE PACKAGES
                  </div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight">
                    Popular Services
                  </h2>
                </div>

                {/* Screenshot Matching Top Floating Action Pills + Nav Arrows */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <button
                    onClick={() => setExpActiveIdx((prev) => (prev - 1 + POPULAR_SERVICES.length) % POPULAR_SERVICES.length)}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:border-[#00D084] hover:text-[#00D084] transition-all cursor-pointer backdrop-blur-md active:scale-95"
                    title="Previous Service"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>

                  <button
                    onClick={() => {
                      const currentSrv = POPULAR_SERVICES[expActiveIdx % POPULAR_SERVICES.length];
                      setBookingService({ title: currentSrv.title, price: currentSrv.price });
                      setBookingModalOpen(true);
                    }}
                    className="px-6 py-2.5 rounded-full bg-white text-black font-extrabold text-xs sm:text-sm tracking-wide hover:bg-[#00D084] transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(0,208,132,0.5)] cursor-pointer"
                  >
                    Book Service Now
                  </button>
                  <button
                    onClick={() => (window.location.href = "/services")}
                    className="px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs sm:text-sm tracking-wide hover:bg-white/20 transition-all duration-300 backdrop-blur-md cursor-pointer"
                  >
                    Explore Packages
                  </button>

                  <button
                    onClick={() => setExpActiveIdx((prev) => (prev + 1) % POPULAR_SERVICES.length)}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:border-[#00D084] hover:text-[#00D084] transition-all cursor-pointer backdrop-blur-md active:scale-95"
                    title="Next Service"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 3D Wave Perspective Cards Showcase (Scrollable Left <-> Right) */}
                <div
                  className="relative w-full min-h-[440px] md:min-h-[480px] flex items-center justify-center perspective-[1200px] overflow-hidden py-8 mt-4 cursor-grab active:cursor-grabbing touch-pan-x"
                  onMouseEnter={() => setIsServicesPaused(true)}
                  onMouseLeave={() => {
                    setIsServicesPaused(false);
                    isDraggingWave.current = false;
                  }}
                  onMouseDown={(e) => handleWaveDragStart(e.clientX)}
                  onMouseMove={(e) => handleWaveDragMove(e.clientX)}
                  onMouseUp={handleWaveDragEnd}
                  onTouchStart={(e) => handleWaveDragStart(e.touches[0].clientX)}
                  onTouchMove={(e) => handleWaveDragMove(e.touches[0].clientX)}
                  onTouchEnd={handleWaveDragEnd}
                  onWheel={handleWaveWheelScroll}
                >
                  {/* Left & Right Vignette Soft Blur Shadows */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 md:w-44 bg-gradient-to-r from-[#020403] via-[#020403]/85 to-transparent z-20 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-20 md:w-44 bg-gradient-to-l from-[#020403] via-[#020403]/85 to-transparent z-20 pointer-events-none" />

                  <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 w-full max-w-[1400px]">
                    {[-2, -1, 0, 1, 2].map((offset) => {
                      const index = (expActiveIdx + offset + POPULAR_SERVICES.length) % POPULAR_SERVICES.length;
                      const srv = POPULAR_SERVICES[index];

                      // Calculate 3D Wave curve transformation & blur matching user request
                      let translateY = 0;
                      let rotateY = 0;
                      let scale = 1;
                      let opacity = 1;
                      let filter = "blur(0px)";
                      let zIndex = 10;

                      if (offset === 0) {
                        // Center Card: Decreased size (scale 0.98), crystal clear (blur 0px), focused
                        translateY = 30;
                        rotateY = 0;
                        scale = 0.98;
                        opacity = 1;
                        filter = "blur(0px)";
                        zIndex = 30;
                      } else if (offset === -1) {
                        // Left Inner Card: Slightly blurry, elevated
                        translateY = -30;
                        rotateY = 12;
                        scale = 0.88;
                        opacity = 0.75;
                        filter = "blur(3.5px)";
                        zIndex = 20;
                      } else if (offset === 1) {
                        // Right Inner Card: Slightly blurry, elevated
                        translateY = -30;
                        rotateY = -12;
                        scale = 0.88;
                        opacity = 0.75;
                        filter = "blur(3.5px)";
                        zIndex = 20;
                      } else if (offset === -2) {
                        // Far Left Card: More blurry, lower dip
                        translateY = 15;
                        rotateY = 22;
                        scale = 0.76;
                        opacity = 0.45;
                        filter = "blur(7px)";
                        zIndex = 10;
                      } else if (offset === 2) {
                        // Far Right Card: More blurry, lower dip
                        translateY = 15;
                        rotateY = -22;
                        scale = 0.76;
                        opacity = 0.45;
                        filter = "blur(7px)";
                        zIndex = 10;
                      }

                      return (
                        <motion.div
                          key={`${srv.id}-${offset}`}
                          layout
                          animate={{
                            y: translateY,
                            rotateY: rotateY,
                            scale: scale,
                            opacity: opacity,
                            filter: filter,
                          }}
                          transition={{
                            duration: 0.65,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          onClick={() => {
                            if (offset !== 0) {
                              setExpActiveIdx(index);
                            } else {
                              setBookingService({ title: srv.title, price: srv.price });
                              setBookingModalOpen(true);
                            }
                          }}
                          style={{ zIndex }}
                          className={`shrink-0 w-[240px] sm:w-[280px] md:w-[300px] h-[350px] sm:h-[390px] rounded-[32px] border bg-[#060c08] p-6 flex flex-col justify-between transition-all duration-500 cursor-pointer group overflow-hidden relative select-none ${
                            offset === 0
                              ? "border-[#00D084]"
                              : "border-white/15 hover:border-white/30"
                          }`}
                        >
                          {/* Background Image with Overlay */}
                          <img
                            src={srv.image}
                            alt={srv.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none ${
                              offset === 0 ? "opacity-65 group-hover:opacity-85 group-hover:scale-110" : "opacity-40"
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-[#020503]/75 to-transparent pointer-events-none" />

                          {/* Light Sweep Glow on Hover */}
                          {offset === 0 && (
                            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[#00D084]/20 to-transparent group-hover:left-full transition-all duration-1000 pointer-events-none" />
                          )}

                          {/* Top Bar: Duration & Hubs Badges */}
                          <div className="relative z-10 flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-[#00D084] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#00D084]/40 shadow-sm">
                              <Clock className="w-3 h-3 inline-block mr-1" />
                              {srv.duration}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                              {srv.centers}
                            </span>
                          </div>

                          {/* Bottom Content Area */}
                          <div className="relative z-10 space-y-3 mt-auto pt-4 text-left">
                            <h4 className="text-lg sm:text-xl font-serif font-black text-white group-hover:text-[#00D084] transition-colors leading-snug">
                              {srv.title}
                            </h4>

                            <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                              <span className="text-xl sm:text-2xl font-black font-mono text-white group-hover:text-[#00D084] transition-colors">
                                {srv.price}
                              </span>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setBookingService({ title: srv.title, price: srv.price });
                                  setBookingModalOpen(true);
                                }}
                                className="px-4 py-2 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider group-hover:bg-[#00e08f] transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,208,132,0.4)] cursor-pointer"
                              >
                                <span>Book Now</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.section>

            {/* =========================================================================
          5. TOP EV BRANDS WE SERVICE (Glassmorphism Styled)
         ========================================================================= */}
            <motion.section
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="py-20 px-6 bg-[#020403] font-serif"
            >
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
                      className="backdrop-blur-xl bg-[#050907] border border-white/15 hover:border-[#00D084] rounded-2xl p-5 text-center transition-all duration-300 cursor-pointer hover:bg-[#00D084]/15 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(0,208,132,0.2)] group flex flex-col items-center justify-between min-h-[160px]"
                    >
                      <div className="w-14 h-14 rounded-2xl border border-white/15 bg-black/60 p-2.5 flex items-center justify-center mb-2 group-hover:border-[#00D084]/50 group-hover:scale-110 transition-all shadow-md overflow-hidden shrink-0">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-serif font-bold text-white group-hover:text-[#00D084] transition-colors">
                          {brand.name}
                        </h4>
                        <p className="text-[10px] text-white/50 font-serif mt-1">{brand.models}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* =========================================================================
          6. WHY CHOOSE MY EV SERVICE? (Glassmorphism Styled)
         ========================================================================= */}
            <motion.section
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="py-20 px-6 bg-[#020403] font-serif"
            >
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
            </motion.section>

            {/* =========================================================================
          7. START YOUR OWN EV SERVICE CENTER BANNER (Matching Screenshot)
         ========================================================================= */}
            <motion.section
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="py-12 px-6 max-w-7xl mx-auto font-sans"
            >
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
            </motion.section>

            {/* =========================================================================
          8. FREQUENTLY ASKED QUESTIONS (Matching Screenshot Style)
         ========================================================================= */}
            <motion.section
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="py-16 px-6 max-w-7xl mx-auto font-sans"
            >
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
                            className={`w-4 h-4 text-white/60 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#00D084]" : ""
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
                            className={`w-4 h-4 text-white/60 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#00D084]" : ""
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
            </motion.section>

            {/* =========================================================================
                9. RIDER STORIES & COMMUNITY FEEDBACK (Aligned with FAQ Section Style)
               ========================================================================= */}
            <motion.section
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="py-16 px-6 max-w-7xl mx-auto font-sans relative overflow-hidden"
            >
              {/* Background ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-8">
                {/* Header Aligned 100% with FAQ Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Experiences
                  </h2>

                  <Link
                    to="/feedback"
                    className="text-[#00D084] font-bold text-sm hover:underline flex items-center gap-1.5 cursor-pointer group"
                  >
                    <span>Share Your Feedback</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Auto-Rotating 2-Second Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Bento Item 1: Large Featured Hero Card (Spans 2 columns) */}
                  <motion.div
                    key={heroExp.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="md:col-span-2 bg-[#060b08] border border-white/15 hover:border-[#00D084]/60 rounded-[32px] p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] group shadow-2xl relative overflow-hidden min-h-[260px]"
                  >
                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="space-y-5 relative z-10">
                      {/* Top Bar: Stars + Highlight Pill */}
                      <div className="flex items-center justify-between">
                        <div className="flex text-amber-400 gap-1">
                          {[...Array(heroExp.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#00D084] bg-[#00D084]/15 px-3 py-1 rounded-full border border-[#00D084]/30">
                          {heroExp.badge}
                        </span>
                      </div>

                      {/* Main Quote */}
                      <p className="text-base sm:text-lg text-white/95 font-medium leading-relaxed italic">
                        "{heroExp.quote}"
                      </p>
                    </div>

                    {/* Rider Info Footer */}
                    <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center font-black text-[#00D084] text-lg shrink-0">
                          {heroExp.avatar}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white group-hover:text-[#00D084] transition-colors">
                            {heroExp.name}
                          </h4>
                          <p className="text-xs text-white/50 font-mono">
                            {heroExp.evModel} • {heroExp.location}
                          </p>
                        </div>
                      </div>

                      {heroExp.jobCard && (
                        <span className="hidden sm:inline-block text-[11px] font-mono text-white/40 border border-white/10 px-3 py-1.5 rounded-xl">
                          {heroExp.jobCard}
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* Bento Item 2: Vertical Card (Spans 1 column) */}
                  <motion.div
                    key={sideExp1.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="md:col-span-1 bg-[#060b08] border border-white/15 hover:border-[#00D084]/60 rounded-[32px] p-7 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] group shadow-xl relative overflow-hidden min-h-[260px]"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex text-amber-400 gap-1">
                          {[...Array(sideExp1.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#00D084] bg-[#00D084]/15 px-2.5 py-0.5 rounded-full border border-[#00D084]/30">
                          {sideExp1.badge}
                        </span>
                      </div>

                      <p className="text-sm text-white/90 font-medium leading-relaxed italic">
                        "{sideExp1.quote}"
                      </p>
                    </div>

                    <div className="pt-5 mt-6 border-t border-white/10 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center font-bold text-[#00D084] text-sm shrink-0">
                        {sideExp1.avatar}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#00D084] transition-colors">
                          {sideExp1.name}
                        </h4>
                        <p className="text-[11px] text-white/50 font-mono">
                          {sideExp1.evModel} • {sideExp1.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Bento Item 3: Fleet Manager Story (Spans 1 column) */}
                  <motion.div
                    key={sideExp2.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="md:col-span-1 bg-[#060b08] border border-white/15 hover:border-[#00D084]/60 rounded-[32px] p-7 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] group shadow-xl relative overflow-hidden min-h-[200px]"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex text-amber-400 gap-1">
                          {[...Array(sideExp2.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#00D084] bg-[#00D084]/15 px-2.5 py-0.5 rounded-full border border-[#00D084]/30">
                          {sideExp2.badge}
                        </span>
                      </div>

                      <p className="text-sm text-white/90 font-medium leading-relaxed italic">
                        "{sideExp2.quote}"
                      </p>
                    </div>

                    <div className="pt-5 mt-6 border-t border-white/10 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#00D084]/20 border border-[#00D084]/40 flex items-center justify-center font-bold text-[#00D084] text-sm shrink-0">
                        {sideExp2.avatar}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#00D084] transition-colors">
                          {sideExp2.name}
                        </h4>
                        <p className="text-[11px] text-white/50 font-mono">
                          {sideExp2.evModel} • {sideExp2.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Bento Item 4: Wide Interactive Action Banner (Spans 2 columns) */}
                  <div className="md:col-span-2 bg-[#08120c] border border-[#00D084]/40 rounded-[32px] p-7 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_50px_rgba(0,208,132,0.15)] relative overflow-hidden">
                    <div className="space-y-1.5 text-center sm:text-left relative z-10">
                      <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
                        <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
                        <span className="text-[10px] font-mono font-bold text-[#00D084] uppercase tracking-widest block">
                          AUTO ROTATING EXPERIENCES • 2S INTERVAL
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        Share Your EV Experience & Get 15% OFF!
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 font-medium max-w-md">
                        Help thousands of EV owners choose certified service hubs across India.
                      </p>
                    </div>

                    <Link
                      to="/feedback"
                      className="px-6 py-3.5 rounded-2xl bg-[#00D084] text-[#020403] font-black uppercase text-xs tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer shrink-0 shadow-[0_0_20px_rgba(0,208,132,0.4)] relative z-10"
                    >
                      Submit Experience ✍️
                    </Link>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* =========================================================================
          9. FOOTER CALLOUT BANNER
         ========================================================================= */}
            <motion.section
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="py-24 px-6 bg-[#020403] font-serif text-center"
            >
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
            </motion.section>

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

      {/* Centered Unavailable City Pop-up Modal */}
      <AnimatePresence>
        {unavailableModalOpen && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#030c07] border-2 border-[#00D084]/50 rounded-[32px] p-6 sm:p-8 max-w-lg w-full text-center shadow-[0_0_80px_rgba(0,208,132,0.3)] relative overflow-hidden space-y-5 font-sans"
            >
              {/* Close Button Top Right */}
              <button
                onClick={() => setUnavailableModalOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Glowing Background Light */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#00D084]/20 rounded-full blur-3xl pointer-events-none" />

              {/* Top Badge */}
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto text-2xl shadow-[0_0_25px_rgba(245,158,11,0.25)]">
                📍
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-[0.2em] bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                  SERVICE LAUNCHING SOON
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Service Unavailable in <span className="text-[#00D084]">{unservicedCityName}</span>
                </h3>
              </div>

              {/* Subtitle Details */}
              <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed">
                MY EV SERVICE centers are currently active in 6 major metro hubs across India. We haven't launched certified diagnostic workshops in <strong className="text-white">{unservicedCityName}</strong> yet.
              </p>

              {/* Active Cities Selector */}
              <div className="space-y-2.5 pt-3 border-t border-white/10">
                <span className="text-[11px] font-black text-white/70 uppercase tracking-wider block">
                  Select an Active Metro Hub:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                    { name: "Pune", slug: "pune" },
                    { name: "Mumbai", slug: "mumbai" },
                    { name: "Bangalore", slug: "bangalore" },
                    { name: "Delhi NCR", slug: "delhi-ncr" },
                    { name: "Hyderabad", slug: "hyderabad" },
                    { name: "Ahmedabad", slug: "ahmedabad" },
                  ].map((c, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setUnavailableModalOpen(false);
                        navigate({
                          to: "/city/$cityId",
                          params: { cityId: c.slug },
                          search: {
                            service: selectedService,
                            brand: selectedBrand,
                            searchArea: c.name,
                          },
                        });
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#00D084]/15 hover:bg-[#00D084] text-[#00D084] hover:text-[#020403] border border-[#00D084]/40 text-xs font-black transition-all cursor-pointer shadow-md"
                    >
                      {c.name} →
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    toast.success(`Registered your vote to launch a MY EV SERVICE hub in ${unservicedCityName}!`);
                    setUnavailableModalOpen(false);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-[0_0_20px_rgba(0,208,132,0.4)]"
                >
                  Request Hub in {unservicedCityName}
                </button>
                <button
                  onClick={() => setUnavailableModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-white/20 hover:border-white/40 text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />

    </div>
  );
}
