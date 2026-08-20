import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Tag,
  Building,
  CheckCircle2,
  X,
  Sparkles,
  Zap,
  Bot,
  Battery,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Filter,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/events")({
  component: EventsPage,
});

interface EVEvent {
  id: string;
  title: string;
  description: string;
  type: "Summit" | "Workshop" | "Meetup" | "Webinar" | "Training";
  status: "Upcoming" | "Completed";
  date: string;
  time: string;
  location: string;
  seats: string;
  bookedCount: number;
  totalSeats: number;
  tags: string[];
  organizer: string;
  price: string;
  availability: "available" | "full";
  img: string;
  isVirtual?: boolean;
}

const EVENTS_DATA: EVEvent[] = [
  {
    id: "evt-01",
    title: "EV Summit 2024 - Future of Electric Mobility",
    description:
      "Join industry leaders, policymakers, and innovators for the premier EV conference in India. Explore the latest trends, technologies, and opportunities in electric mobility.",
    type: "Summit",
    status: "Upcoming",
    date: "15 Mar 2024",
    time: "09:00 am",
    location: "India Expo Centre, Delhi",
    seats: "342/500",
    bookedCount: 342,
    totalSeats: 500,
    tags: ["#conference", "#networking", "#policy", "#technology"],
    organizer: "My EV Services India",
    price: "₹2,999",
    availability: "available",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "evt-02",
    title: "Advanced EV Technician Training Workshop",
    description:
      "Hands-on workshop for EV technicians covering advanced diagnostics, battery management systems, and repair techniques for modern electric vehicles.",
    type: "Workshop",
    status: "Upcoming",
    date: "20 Feb 2024",
    time: "10:00 am",
    location: "My EV Services Training Center, Delhi",
    seats: "18/30",
    bookedCount: 18,
    totalSeats: 30,
    tags: ["#training", "#technical", "#hands-on", "#certification"],
    organizer: "My EV Services Academy",
    price: "₹1,499",
    availability: "available",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "evt-03",
    title: "EV Dealer Meet & Greet - Bangalore",
    description:
      "Network with fellow EV dealers, share best practices, and learn about new business opportunities in the electric vehicle market.",
    type: "Meetup",
    status: "Upcoming",
    date: "25 Feb 2024",
    time: "04:00 pm",
    location: "Royal Orchid Hotel, Bangalore",
    seats: "27/50",
    bookedCount: 27,
    totalSeats: 50,
    tags: ["#networking", "#business", "#dealers", "#opportunities"],
    organizer: "My EV Services Partners",
    price: "Free",
    availability: "available",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "evt-04",
    title: "📍 Virtual Event: Latest Battery Technology Webinar",
    description:
      "Expert discussion on emerging battery technologies, charging solutions, and future trends in EV battery systems.",
    type: "Webinar",
    status: "Upcoming",
    date: "10 Feb 2024",
    time: "02:00 pm",
    location: "Online (Google Meet)",
    seats: "156/200",
    bookedCount: 156,
    totalSeats: 200,
    tags: ["#webinar", "#battery", "#technology", "#online"],
    organizer: "My EV Services Labs",
    price: "Free",
    availability: "available",
    img: "https://images.unsplash.com/photo-1558441719-2347b7341ed2?w=1000&auto=format&fit=crop&q=80",
    isVirtual: true,
  },
  {
    id: "evt-05",
    title: "Fleet Management Excellence Workshop",
    description:
      "Comprehensive workshop on managing EV fleets efficiently, covering maintenance scheduling, cost optimization, and performance monitoring.",
    type: "Training",
    status: "Completed",
    date: "18 Jan 2024",
    time: "09:00 am",
    location: "My EV Services HQ, Noida",
    seats: "25/25",
    bookedCount: 25,
    totalSeats: 25,
    tags: ["#fleet", "#management", "#optimization", "#training"],
    organizer: "My EV Services Academy",
    price: "₹1,999",
    availability: "full",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&auto=format&fit=crop&q=80",
  },
];

function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedEvent, setSelectedEvent] = useState<EVEvent | null>(null);
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [aiSearchInput, setAiSearchInput] = useState("");

  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardsOverlayRef = useRef<HTMLDivElement>(null);
  const cardsUpRef = useRef<HTMLDivElement>(null);

  const [siteTheme, setSiteTheme] = useState<"dark" | "light">(() => {
    if (
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("theme-light")
    ) {
      return "light";
    }
    return "dark";
  });

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GSAP ScrollTrigger Animations (Matching media.tsx)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero text slow fade-out as cards move up over the hero
      if (heroTextRef.current && cardsOverlayRef.current) {
        gsap.to(heroTextRef.current, {
          opacity: 0,
          scale: 0.92,
          y: -40,
          ease: "power1.out",
          scrollTrigger: {
            trigger: cardsOverlayRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 0.6,
          },
        });
      }

      // 2. Cards container rises up onto the fixed hero section
      if (cardsUpRef.current) {
        gsap.fromTo(
          cardsUpRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsUpRef.current,
              start: "top 90%",
              end: "top 50%",
              scrub: 0.6,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((evt) => {
      const matchesType = selectedType === "All Types" || evt.type === selectedType;
      const matchesStatus = selectedStatus === "All Status" || evt.status === selectedStatus;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        evt.title.toLowerCase().includes(query) ||
        evt.description.toLowerCase().includes(query) ||
        evt.location.toLowerCase().includes(query) ||
        evt.organizer.toLowerCase().includes(query) ||
        evt.tags.some((t) => t.toLowerCase().includes(query));

      return matchesType && matchesStatus && matchesSearch;
    });
  }, [searchQuery, selectedType, selectedStatus]);

  const handleOpenDetails = (evt: EVEvent) => {
    setSelectedEvent(evt);
    setRegModalOpen(true);
  };

  const isLight = siteTheme === "light";

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 relative overflow-x-hidden ${
        isLight
          ? "bg-[#f4f8f5] text-[#1a2320] selection:bg-[#00D084] selection:text-black"
          : "bg-[#020503] text-white selection:bg-[#00D084] selection:text-black"
      }`}
    >
      {/* Shared Navigation Header */}
      <Nav />

      {/* Main Container */}
      <div className="relative min-h-screen">
        
        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (EXTENDS BEHIND NAVBAR: TOP-0 H-SCREEN)
           ========================================================================= */}
        <div className="fixed top-0 inset-x-0 h-screen w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background Hero Poster Image - 100% Crystal Clear Behind Navbar */}
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&auto=format&fit=crop&q=80"
            alt="EV Events Hero"
            className="w-full h-full object-cover object-center opacity-100 pointer-events-none"
          />

          {/* Hero Content Container (Text ALWAYS crisp white regardless of theme mode) */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center px-6 lg:px-16 max-w-3xl space-y-4 z-10 pointer-events-none text-white pt-16"
          >
            {/* Title - EXACT Font from Ecosystem landing headline: font-sans font-semibold tracking-[-0.04em] */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-[-0.04em] !text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              EV Events &amp; <span className="text-[#00D084]">Workshops</span> <br />
              Across India
            </h1>

            {/* Subtitle - ALWAYS White/90 */}
            <p className="text-xs sm:text-sm md:text-base !text-white/90 font-light leading-relaxed max-w-xl drop-shadow-md">
              Join industry leaders, learn diagnostic skills, and connect with the EV community through our national summits, workshops, and certified training programs.
            </p>

            <div className="pt-2 pointer-events-auto">
              <a
                href="#catalog-section"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00D084] !text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all shadow-[0_0_20px_rgba(0,208,132,0.4)] cursor-pointer hover:scale-105"
              >
                <span>EXPLORE ALL EVENTS</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </a>
            </div>
          </div>
        </div>

        {/* Transparent Spacer for Fixed Full Screen Hero */}
        <div className="h-screen w-full pointer-events-none" />

        {/* =========================================================================
            2. CARDS OVERLAY CONTAINER (RISES UP OVER FIXED HERO WITH CURVED TOP BORDER)
           ========================================================================= */}
        <div
          ref={cardsOverlayRef}
          className={`relative z-10 min-h-screen pt-12 pb-24 rounded-t-[40px] border-t border-white/15 ${
            isLight ? "bg-[#f4f8f5]" : "bg-[#020503]"
          }`}
        >
          {/* SEARCH & DYNAMIC FILTER BAR */}
          <section id="catalog-section" className="pb-8 px-6 max-w-7xl mx-auto">
        <div
          className={`p-6 rounded-[32px] shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 ${
            isLight ? "bg-white" : "bg-[#070d09]/90"
          }`}
        >
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D084]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className={`w-full rounded-full pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-[#00D084] border font-medium ${
                isLight
                  ? "bg-[#f2f7f4] border-[#c5d6ca] text-[#1a2320] placeholder-[#607267]"
                  : "bg-[#030604] border-white/15 text-white placeholder-white/40"
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`px-4 py-3 rounded-full text-xs font-mono font-bold uppercase focus:outline-none border cursor-pointer ${
                isLight
                  ? "bg-[#f2f7f4] border-[#c5d6ca] text-[#1a2320]"
                  : "bg-[#030604] border-white/15 text-white"
              }`}
            >
              <option value="All Types">All Types</option>
              <option value="Summit">Summit</option>
              <option value="Workshop">Workshop</option>
              <option value="Meetup">Meetup</option>
              <option value="Webinar">Webinar</option>
              <option value="Training">Training</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`px-4 py-3 rounded-full text-xs font-mono font-bold uppercase focus:outline-none border cursor-pointer ${
                isLight
                  ? "bg-[#f2f7f4] border-[#c5d6ca] text-[#1a2320]"
                  : "bg-[#030604] border-white/15 text-white"
              }`}
            >
              <option value="All Status">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Counter Badge */}
            <span className="px-4 py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-mono font-bold shadow-md">
              {filteredEvents.length} Events Found
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ULTRA-IMPRESSIVE UNBOXED EVENT CARDS CATALOG
         ========================================================================= */}
      <section className="py-12 px-6 max-w-7xl mx-auto relative z-10">
        {filteredEvents.length > 0 ? (
          <div className="space-y-16">
            {/* -----------------------------------------------------------------
                FEATURED BIG HERO EVENT CARD (Event 1: EV Summit 2024)
               ----------------------------------------------------------------- */}
            {filteredEvents.slice(0, 1).map((evt) => (
              <div
                key={evt.id}
                className="transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 group items-center"
              >
                {/* Visual Column */}
                <div className="lg:col-span-6 relative h-[360px] sm:h-[440px] w-full overflow-hidden rounded-[36px] bg-slate-900 shadow-2xl">
                  <img
                    src={evt.img}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Header Badges Overlay */}
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="bg-[#00D084] text-[#020403] text-xs font-mono font-bold uppercase px-4 py-1.5 rounded-full shadow-lg">
                      FEATURED {evt.type}
                    </span>
                    <span className="bg-emerald-500/20 text-[#00D084] text-xs font-mono font-bold uppercase px-4 py-1.5 rounded-full border border-[#00D084]/40 backdrop-blur-md">
                      {evt.status}
                    </span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md px-5 py-2 rounded-full text-base font-mono font-black text-[#00D084] border border-[#00D084]/30 shadow-xl">
                    {evt.price}
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-6 flex flex-col justify-between py-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono opacity-70 mb-4">
                      <span className="flex items-center gap-1.5 text-[#00D084]">
                        <Calendar className="w-4 h-4" /> {evt.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> {evt.time}
                      </span>
                    </div>

                    <h3
                      className={`text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] uppercase leading-tight mb-4 group-hover:text-[#00D084] transition-colors ${
                        isLight ? "text-[#1a2320]" : "text-white"
                      }`}
                    >
                      {evt.title}
                    </h3>

                    <p
                      className={`text-sm sm:text-base font-light leading-relaxed mb-6 ${
                        isLight ? "text-[#4a5851]" : "text-white/70"
                      }`}
                    >
                      {evt.description}
                    </p>

                    <div className="space-y-3 text-xs font-mono opacity-80 mb-6 pt-4 border-t border-slate-200/10">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#00D084]" />
                        <span>{evt.location}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {evt.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs font-mono px-3 py-1 rounded-lg ${
                            isLight
                              ? "bg-[#e8f2eb] text-[#2c3d33]"
                              : "bg-white/5 text-white/70 border border-white/10"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-200/10">
                    <span className="text-xs font-mono opacity-60">
                      Organized by <strong className="opacity-100">{evt.organizer}</strong>
                    </span>

                    <button
                      onClick={() => handleOpenDetails(evt)}
                      className="px-8 py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] hover:scale-105 cursor-pointer"
                    >
                      View Details & Pass
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* -----------------------------------------------------------------
                REMAINING EVENTS UNBOXED CATALOG (Events 2, 3, 4, 5)
               ----------------------------------------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
              {filteredEvents.slice(1).map((evt) => (
                <div
                  key={evt.id}
                  className="flex flex-col justify-between transition-all duration-500 group"
                >
                  {/* Event Thumbnail Container */}
                  <div className="relative h-64 w-full overflow-hidden rounded-[32px] bg-slate-900 mb-6 shadow-xl">
                    <img
                      src={evt.img}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#00D084] text-[#020403] text-[10px] font-mono font-bold uppercase px-3.5 py-1 rounded-full shadow-md">
                        {evt.type}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-3.5 py-1 rounded-full border backdrop-blur-md ${
                          evt.status === "Upcoming"
                            ? "bg-emerald-500/20 text-[#00D084] border-[#00D084]/40"
                            : "bg-slate-800/80 text-slate-300 border-white/20"
                        }`}
                      >
                        {evt.status}
                      </span>
                    </div>

                    {/* Price Overlay */}
                    <div className="absolute bottom-3 right-4 bg-black/80 backdrop-blur-md px-4 py-1 rounded-full text-xs font-mono font-black text-[#00D084] border border-[#00D084]/30 shadow-lg">
                      {evt.price}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="px-2 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Landing Page Font Style Title */}
                      <h3
                        className={`text-2xl font-semibold tracking-[-0.03em] leading-snug mb-3 uppercase group-hover:text-[#00D084] transition-colors ${
                          isLight ? "text-[#1a2320]" : "text-white"
                        }`}
                      >
                        {evt.title}
                      </h3>

                      <p
                        className={`text-xs font-light leading-relaxed mb-6 line-clamp-3 ${
                          isLight ? "text-[#52645a]" : "text-white/60"
                        }`}
                      >
                        {evt.description}
                      </p>

                      {/* Details Box */}
                      <div className="space-y-2.5 text-xs font-mono opacity-80 mb-6 pt-4 border-t border-slate-200/10">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#00D084]" />
                          <span>{evt.date}</span>
                          <span>•</span>
                          <Clock className="w-3.5 h-3.5 text-[#00D084]" />
                          <span>{evt.time}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#00D084]" />
                          <span className="truncate">{evt.location}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {evt.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] font-mono px-2.5 py-0.5 rounded-md ${
                              isLight
                                ? "bg-[#e8f2eb] text-[#33443a]"
                                : "bg-white/5 text-white/60 border border-white/10"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer Action */}
                    <div className="pt-4 border-t border-slate-200/10 flex items-center justify-between">
                      <span className="text-[10px] font-mono opacity-50 truncate max-w-[140px]">
                        {evt.organizer}
                      </span>

                      <button
                        onClick={() => handleOpenDetails(evt)}
                        className="px-6 py-2.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all shadow-md cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className={`py-20 text-center rounded-[32px] border backdrop-blur-md ${
              isLight ? "bg-white border-[#d6e3da]" : "bg-[#070d0a] border-white/10 text-white"
            }`}
          >
            <Calendar className="w-12 h-12 text-[#00D084] mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-bold mb-2">No Events Found</h3>
            <p className="text-xs opacity-70 mb-6">
              Try adjusting your search criteria or clearing filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("All Types");
                setSelectedStatus("All Status");
              }}
              className="px-6 py-2.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* =========================================================================
          4. MY EV SERVICES AI SECTION (Landing Page Font Style)
         ========================================================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-slate-200/10">
        <div className="mb-10 text-center">
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] uppercase leading-tight mt-2 ${
              isLight ? "text-[#1a2320]" : "text-white"
            }`}
          >
            My EV Services AI
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Analyze your vehicle */}
          <div
            className={`rounded-[36px] p-8 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between ${
              isLight ? "bg-white" : "bg-[#070d0a]/90"
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#00D084] font-bold">
                <ShieldCheck className="w-4 h-4" /> AI DIAGNOSTICS & WEAKNESS SCANNER
              </div>
              <h3
                className={`text-3xl font-semibold tracking-[-0.03em] uppercase mb-4 ${
                  isLight ? "text-[#1a2320]" : "text-white"
                }`}
              >
                Analyze your vehicle
              </h3>
              <p
                className={`text-sm leading-relaxed mb-8 font-light ${
                  isLight ? "text-[#52645a]" : "text-white/60"
                }`}
              >
                If you’re signed in, pick your saved EV and get a weakness checklist based on telemetry diagnostics, BMS wear patterns, and battery degradation history.
              </p>
            </div>

            <button
              onClick={() => toast.info("Redirecting to EV Account Sign-In...")}
              className="w-full py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-md cursor-pointer"
            >
              Sign in to analyze
            </button>
          </div>

          {/* Card 2: Research */}
          <div
            className={`rounded-[36px] p-8 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between ${
              isLight ? "bg-white" : "bg-[#070d0a]/90"
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#00D084] font-bold">
                <Search className="w-4 h-4" /> INTEGRATED CONTENT SEARCH
              </div>
              <h3
                className={`text-3xl font-semibold tracking-[-0.03em] uppercase mb-4 ${
                  isLight ? "text-[#1a2320]" : "text-white"
                }`}
              >
                Research
              </h3>
              <p
                className={`text-sm leading-relaxed mb-6 font-light ${
                  isLight ? "text-[#52645a]" : "text-white/60"
                }`}
              >
                Search inside My EV Services content: webinars, updates, services, and store.
              </p>

              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D084]" />
                <input
                  type="text"
                  value={aiSearchInput}
                  onChange={(e) => setAiSearchInput(e.target.value)}
                  placeholder="Search updates, webinars, parts..."
                  className={`w-full rounded-full pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-[#00D084] border font-medium ${
                    isLight
                      ? "bg-[#f2f7f4] border-[#c5d6ca] text-[#1a2320]"
                      : "bg-[#030604] border-white/15 text-white"
                  }`}
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (aiSearchInput) {
                  toast.success(`Searching ecosystem content for "${aiSearchInput}"...`);
                } else {
                  toast.error("Please enter a search term.");
                }
              }}
              className={`w-full py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer border ${
                isLight
                  ? "bg-[#101412] text-white hover:bg-black border-white/10"
                  : "bg-white/10 text-white hover:bg-white/20 border-white/15"
              }`}
            >
              Search Ecosystem
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. PROMOTED SERVICES SECTION
         ========================================================================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto relative z-10 border-t border-slate-200/10">
        <div className="mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
            Promoted
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-semibold tracking-[-0.04em] uppercase mt-1 ${
              isLight ? "text-[#1a2320]" : "text-white"
            }`}
          >
            Services and parts we recommend right now.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Battery Health Check */}
          <div
            className={`rounded-[32px] p-8 shadow-xl backdrop-blur-md flex items-center gap-6 ${
              isLight ? "bg-white" : "bg-[#070d0a]/90"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-[#00D084]/20 flex items-center justify-center shrink-0 border border-[#00D084]/40">
              <Battery className="w-8 h-8 text-[#00D084]" />
            </div>
            <div>
              <h3
                className={`text-2xl font-semibold tracking-[-0.03em] uppercase mb-1 ${
                  isLight ? "text-[#1a2320]" : "text-white"
                }`}
              >
                Battery Health Check
              </h3>
              <p
                className={`text-xs font-light leading-relaxed ${
                  isLight ? "text-[#52645a]" : "text-white/60"
                }`}
              >
                Diagnostics + report built for EV reliability.
              </p>
              <a
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#00D084] mt-3 hover:underline"
              >
                Book Inspection <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Charging Essentials */}
          <div
            className={`rounded-[32px] p-8 shadow-xl backdrop-blur-md flex items-center gap-6 ${
              isLight ? "bg-white" : "bg-[#070d0a]/90"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-[#00D084]/20 flex items-center justify-center shrink-0 border border-[#00D084]/40">
              <Zap className="w-8 h-8 text-[#00D084]" />
            </div>
            <div>
              <h3
                className={`text-2xl font-semibold tracking-[-0.03em] uppercase mb-1 ${
                  isLight ? "text-[#1a2320]" : "text-white"
                }`}
              >
                Charging essentials
              </h3>
              <p
                className={`text-xs font-light leading-relaxed ${
                  isLight ? "text-[#52645a]" : "text-white/60"
                }`}
              >
                Charger + cable bundles for daily use.
              </p>
              <a
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#00D084] mt-3 hover:underline"
              >
                Explore Bundles <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FIND EV SERVICE NEAR YOU SECTION
         ========================================================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-slate-200/10">
        <div
          className={`rounded-[36px] p-8 sm:p-14 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8 ${
            isLight ? "bg-white" : "bg-[#070d0a]/95"
          }`}
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
              Network Coverage
            </span>
            <h2
              className={`text-3xl sm:text-5xl font-semibold tracking-[-0.04em] uppercase leading-tight mt-1 mb-2 ${
                isLight ? "text-[#1a2320]" : "text-white"
              }`}
            >
              Find EV Service Near You
            </h2>
            <p
              className={`text-sm font-light leading-relaxed max-w-xl ${
                isLight ? "text-[#4a5851]" : "text-white/70"
              }`}
            >
              Browse service centres across India by city and locality.
            </p>
          </div>

          <a
            href="/services#products-grid"
            className="px-9 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] hover:scale-105 shrink-0"
          >
            Explore Service Network
          </a>
        </div>
      </section>
        </div>
      </div>

      {/* Shared Footer */}
      <Footer />

      {/* =========================================================================
          7. EVENT DETAILS MODAL
         ========================================================================= */}
      {regModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div
            className={`border rounded-[32px] max-w-lg w-full p-6 md:p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200 ${
              isLight
                ? "bg-white border-[#d6e3da] text-[#1a2320]"
                : "bg-[#090f0c] border-white/15 text-white"
            }`}
          >
            <button
              onClick={() => setRegModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#00D084] text-[#020403]">
                {selectedEvent.type}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase border border-white/20">
                {selectedEvent.status}
              </span>
            </div>

            <h3 className="text-2xl font-semibold tracking-[-0.03em] uppercase mb-2">
              {selectedEvent.title}
            </h3>
            <p className="text-xs opacity-75 leading-relaxed mb-6">
              {selectedEvent.description}
            </p>

            <div className="space-y-2 text-xs font-mono opacity-80 mb-6 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div>📅 Date: {selectedEvent.date}</div>
              <div>⏰ Time: {selectedEvent.time}</div>
              <div>📍 Venue: {selectedEvent.location}</div>
              <div>👥 Seats Reserved: {selectedEvent.seats}</div>
              <div>🏢 Organizer: {selectedEvent.organizer}</div>
              <div>💰 Fee: {selectedEvent.price}</div>
            </div>

            <button
              onClick={() => {
                if (selectedEvent.availability === "full") {
                  toast.error("This event is fully booked.");
                } else {
                  toast.success(`Registered for ${selectedEvent.title}! Confirmation sent to your email.`);
                  setRegModalOpen(false);
                }
              }}
              className={`w-full py-3.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md ${
                selectedEvent.availability === "full"
                  ? "bg-slate-700 text-white/50 cursor-not-allowed"
                  : "bg-[#00D084] text-[#020403] hover:bg-[#00e08f] cursor-pointer"
              }`}
            >
              {selectedEvent.availability === "full" ? "EVENT FULLY BOOKED" : "CONFIRM REGISTRATION"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
