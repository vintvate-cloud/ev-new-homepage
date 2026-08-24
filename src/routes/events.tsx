import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Radio,
  Layers,
  Cpu,
  Globe,
  Award,
} from "lucide-react";
import { toast } from "sonner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { z } from "zod";

const searchSchema = z.object({
  eventId: z.string().optional(),
});

export const Route = createFileRoute("/events")({
  validateSearch: searchSchema,
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
  const { eventId } = Route.useSearch();
  const navigate = useNavigate({ from: Route.id });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  
  const selectedEvent = useMemo(() => {
    if (!eventId) return null;
    return EVENTS_DATA.find((e) => e.id === eventId) || null;
  }, [eventId]);

  const [aiSearchInput, setAiSearchInput] = useState("");
  const [activeCardIdx, setActiveCardIdx] = useState(0);

  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardsOverlayRef = useRef<HTMLDivElement>(null);
  const cardsUpRef = useRef<HTMLDivElement>(null);

  // Studio Scroll Refs for Section 2 onwards
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const aiSectionRef = useRef<HTMLDivElement>(null);
  const promotedRef = useRef<HTMLDivElement>(null);
  const coverageRef = useRef<HTMLDivElement>(null);

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

  // GSAP ScrollTrigger Animations (&why Studio Inspired)
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero text slow fade-out as overlay slides up
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

      // 2. Main overlay container rise
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

      // 3. SECTION 2: EDITORIAL STAGGERED PIN
      if (cardsRef.current.length > 0) {
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          
          // INFINITE CASCADING PIN LOGIC
          // The visual arrival order is: R0 -> L0 -> R1 -> L1 -> R2 -> L2
          let nextIndex;
          if (index === 1) nextIndex = 0; // Right 0 waits for Left 0
          else if (index % 2 === 0) nextIndex = index + 3; // Left waits for next Right (0->3, 2->5...)
          else nextIndex = index - 1; // Right waits for next Left (3->2, 5->4...)

          const nextCard = cardsRef.current[nextIndex];
          const innerCard = card.firstElementChild;
          
          // We must force GSAP to calculate pin offsets in the exact visual order,
          // otherwise pinSpacing:true from lower items will break upper items.
          const seqOrder = (index % 2 === 1) ? index : index + 2; 

          // 1. The Pin Logic (Happens AFTER it reaches the top 4%)
          ScrollTrigger.create({
            trigger: card,
            start: "top 4%", // Pin slightly lower to give breathing room
            endTrigger: nextCard ? nextCard : undefined, // Wait for the target card
            end: nextCard ? "top 4%" : "+=50vh", // Unpin exactly when target card reaches top 4%
            pin: true,
            pinSpacing: true, 
            anticipatePin: 1, 
            pinType: "transform",
            refreshPriority: 100 - seqOrder,
          });

          if (innerCard) {
            // Enable 3D perspective on the parent to make rotateX look realistic
            gsap.set(card, { perspective: 1500 });

            // 2. The Expansion Animation (Happens AS it scrolls UP from bottom to top 4%)
            gsap.to(innerCard, {
              height: "96vh", // Fits the 96vh wrapper perfectly
              maxHeight: "96vh",
              borderRadius: "0px",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 100%", // Start expanding when it enters the bottom of viewport
                end: "top 4%",    // Fully expanded exactly when it hits the pinning point
                scrub: true,
              }
            });

            // 3. Immersive 3D Entrance Animation ("niche se lata hua")
            gsap.fromTo(
              innerCard,
              { opacity: 0, y: 200, rotateX: 12, scale: 0.92 }, // Deep 3D origin
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 95%",
                  end: "top 55%",
                  scrub: 1.2, // Adds a smooth, heavy momentum
                },
              }
            );
          }
        });
      }


      // 4. AI Section Reveal with 3D elevation
      if (aiSectionRef.current) {
        gsap.fromTo(
          aiSectionRef.current,
          { y: 90, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: aiSectionRef.current,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );
      }

      // 5. Promoted Services Staggered Reveal
      if (promotedRef.current) {
        gsap.fromTo(
          promotedRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: promotedRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.5,
            },
          }
        );
      }

      // 6. Network Coverage Full Width Expansion
      if (coverageRef.current) {
        gsap.fromTo(
          coverageRef.current,
          { scale: 0.92, opacity: 0.5, borderRadius: "48px" },
          {
            scale: 1,
            opacity: 1,
            borderRadius: "36px",
            scrollTrigger: {
              trigger: coverageRef.current,
              start: "top 90%",
              end: "top 55%",
              scrub: 0.6,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [filteredEvents]);

  const handleOpenDetails = (evt: EVEvent) => {
    navigate({ search: { eventId: evt.id }, resetScroll: false });
  };

  const handleCloseDetails = () => {
    navigate({ search: { eventId: undefined }, resetScroll: false });
  };

  const isLight = siteTheme === "light";
  const remainingEvents = filteredEvents.slice(1);

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
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0)
           ========================================================================= */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background Hero Poster Image */}
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&auto=format&fit=crop&q=80"
            alt="EV Events Hero"
            className="w-full h-full object-cover object-center opacity-90 pointer-events-none"
          />

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-black/40 to-black/60 pointer-events-none" />

          {/* Hero Content Container */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col justify-center px-6 lg:px-16 max-w-3xl space-y-4 z-10 pointer-events-auto text-white"
          >
            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] !text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              EV Events &amp; <span className="text-[#00D084]">Workshops</span> <br />
              Across India
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base !text-white/90 font-light leading-relaxed max-w-xl drop-shadow-md">
              Join industry leaders, learn diagnostic skills, and connect with the EV community through our national summits, workshops, and certified training programs.
            </p>

            <div className="pt-2">
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

        {/* =========================================================================
            2. CARDS OVERLAY CONTAINER (RISES UP OVER FIXED HERO WITH CURVED TOP BORDER)
           ========================================================================= */}
        <div
          ref={cardsOverlayRef}
          className={`relative z-10 min-h-screen mt-[calc(100vh-80px)] pt-12 pb-24 rounded-t-[40px] border-t border-white/15 shadow-2xl ${
            isLight ? "bg-[#f4f8f5]" : "bg-[#020503]"
          }`}
        >
          <div ref={cardsUpRef}>
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

                  <span className="px-4 py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-mono font-bold shadow-md">
                    {filteredEvents.length} Events Found
                  </span>
                </div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 1 (LEFT UNTOUCHED AS REQUESTED):
                15 Mar 2024 • 09:00 am | EV Summit 2024 - Future of Electric Mobility
               ========================================================================= */}
            <section className="py-12 px-6 max-w-7xl mx-auto relative z-10">
              {filteredEvents.length > 0 ? (
                <div className="space-y-16">
                  {/* FEATURED BIG HERO EVENT CARD (evt-01) */}
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
                            View Details &amp; Pass
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>

            {/* =========================================================================
                SECTION 2: EDITORIAL STAGGERED SHOWCASE (&why STUDIO STYLE)
               ========================================================================= */}
            {remainingEvents.length > 0 && (
              <section className="relative py-20 px-6 max-w-7xl mx-auto z-10 min-h-[150vh]">
                {/* Section Label */}
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#00D084] animate-ping" />
                    <span className="text-xs font-mono font-bold text-[#00D084] uppercase tracking-[0.2em]">
                      Upcoming Events
                    </span>
                  </div>
                  <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                    {remainingEvents.length} Sessions
                  </span>
                </div>

                {/* Staggered 2-column flex layout */}
                <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start w-full relative">
                  
                  {/* LEFT COLUMN — pushed down so right column enters first */}
                  <div className="w-full md:w-1/2 flex flex-col gap-6 lg:gap-10 md:mt-[50vh]">
                    {remainingEvents.filter((_, i) => i % 2 === 0).map((evt, colIdx) => {
                      const globalIdx = colIdx * 2;
                      return (
                        <div
                          key={evt.id}
                          ref={(el) => (cardsRef.current[globalIdx] = el)}
                          className="editorial-card group cursor-pointer w-full h-[96vh] flex flex-col justify-start"
                          onClick={() => handleOpenDetails(evt)}
                        >
                          <div className="relative overflow-hidden rounded-[24px] bg-slate-950 h-[65vh] sm:h-[75vh] w-full">
                            <img
                              src={evt.img}
                              alt={evt.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute top-4 left-4 flex items-center gap-2">
                              <span className="px-3 py-1 rounded-full bg-[#00D084] text-[#020403] text-[10px] font-mono font-black uppercase tracking-wider">
                                {evt.type}
                              </span>
                            </div>
                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-[#00D084] border border-[#00D084]/30">
                              {evt.price}
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-5">
                              <div className="flex items-center gap-2 text-[11px] font-mono text-[#00D084] mb-2 opacity-90">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{evt.date}</span>
                                <span className="text-white/40">•</span>
                                <Clock className="w-3.5 h-3.5" />
                                <span>{evt.time}</span>
                              </div>
                              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-[#00D084] transition-colors duration-300">
                                {evt.title}
                              </h3>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* RIGHT COLUMN — starts higher, pins first */}
                  <div className="w-full md:w-1/2 flex flex-col gap-6 lg:gap-10 pb-[50vh]">
                    {remainingEvents.filter((_, i) => i % 2 === 1).map((evt, colIdx) => {
                      const globalIdx = colIdx * 2 + 1;
                      return (
                        <div
                          key={evt.id}
                          ref={(el) => (cardsRef.current[globalIdx] = el)}
                          className="editorial-card group cursor-pointer w-full h-[96vh] flex flex-col justify-start"
                          onClick={() => handleOpenDetails(evt)}
                        >
                          <div className="relative overflow-hidden rounded-[24px] bg-slate-950 h-[65vh] sm:h-[75vh] w-full">
                            <img
                              src={evt.img}
                              alt={evt.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute top-4 left-4 flex items-center gap-2">
                              <span className="px-3 py-1 rounded-full bg-[#00D084] text-[#020403] text-[10px] font-mono font-black uppercase tracking-wider">
                                {evt.type}
                              </span>
                            </div>
                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-[#00D084] border border-[#00D084]/30">
                              {evt.price}
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-5">
                              <div className="flex items-center gap-2 text-[11px] font-mono text-[#00D084] mb-2 opacity-90">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{evt.date}</span>
                                <span className="text-white/40">•</span>
                                <Clock className="w-3.5 h-3.5" />
                                <span>{evt.time}</span>
                              </div>
                              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-[#00D084] transition-colors duration-300">
                                {evt.title}
                              </h3>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </section>
            )}

            {/* =========================================================================
                SECTION 3: MY EV SERVICES AI (ANIMATED GSAP SCROLL REVEAL)
               ========================================================================= */}
            <section
              ref={aiSectionRef}
              className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/10"
            >
              <div className="mb-12 text-center max-w-3xl mx-auto">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-[#00D084] mb-4">
                  ✦ NEURAL EV DIAGNOSTICS &amp; ENGINE
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                  My EV Services <span className="text-[#00D084]">AI Diagnostics</span>
                </h2>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed mt-3">
                  Powered by telemetry machine learning, battery wear pattern analysis, and pan-India workshop diagnostic datasets.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Card 1: Analyze vehicle */}
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-[#0b120d]/90 border border-white/12 rounded-[36px] p-8 sm:p-10 shadow-2xl backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden group hover:border-[#00D084]/40 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#00D084] font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 animate-pulse" /> AI DIAGNOSTICS &amp; WEAKNESS SCANNER
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase mb-4 leading-snug">
                      Analyze Your Vehicle
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-8 font-light">
                      If you’re signed in, pick your saved EV and get a weakness checklist based on telemetry diagnostics, BMS wear patterns, and battery degradation history.
                    </p>

                    {/* Animated diagnostic metrics simulation */}
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-8 space-y-3">
                      <div className="flex justify-between text-[11px] font-mono text-white/80">
                        <span>BMS Cell Voltage Delta</span>
                        <span className="text-[#00D084]">0.012V (Optimal)</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-[94%] h-full bg-[#00D084]" />
                      </div>

                      <div className="flex justify-between text-[11px] font-mono text-white/80">
                        <span>Thermal Runaway Margin</span>
                        <span className="text-[#00D084]">98.4% Safe</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-[98%] h-full bg-[#00D084]" />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toast.info("Redirecting to EV Account Sign-In...")}
                    className="w-full py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-lg cursor-pointer hover:scale-[1.02]"
                  >
                    SIGN IN TO ANALYZE
                  </button>
                </motion.div>

                {/* Card 2: Research */}
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-[#0b120d]/90 border border-white/12 rounded-[36px] p-8 sm:p-10 shadow-2xl backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden group hover:border-white/30 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#00D084] font-bold uppercase tracking-wider">
                      <Search className="w-4 h-4" /> INTEGRATED NEURAL KNOWLEDGE SEARCH
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase mb-4 leading-snug">
                      Ecosystem Research
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6 font-light">
                      Search inside My EV Services content: masterclasses, technical SOPs, warranty guidelines, and spare parts.
                    </p>

                    <div className="relative mb-6">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D084]" />
                      <input
                        type="text"
                        value={aiSearchInput}
                        onChange={(e) => setAiSearchInput(e.target.value)}
                        placeholder="Search updates, webinars, parts..."
                        className="w-full rounded-full pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-[#00D084] border border-white/15 bg-[#030604] text-white placeholder-white/40 font-medium"
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
                    className="w-full py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-[#00D084]"
                  >
                    SEARCH ECOSYSTEM
                  </button>
                </motion.div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 4: PROMOTED SERVICES (GSAP SCROLL TRIGGER REVEAL)
               ========================================================================= */}
            <section
              ref={promotedRef}
              className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/10"
            >
              <div className="mb-12">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                  ✦ PROMOTED SOLUTIONS
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
                  Services and parts we recommend right now.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Card 1: Battery Health Check */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-[32px] p-8 shadow-2xl backdrop-blur-2xl bg-[#080e0a]/90 border border-white/12 flex items-center gap-6 group hover:border-[#00D084]/40 transition-colors"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#00D084]/20 flex items-center justify-center shrink-0 border border-[#00D084]/40">
                    <Battery className="w-8 h-8 text-[#00D084] animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold uppercase text-white mb-1">
                      Battery Health Check
                    </h3>
                    <p className="text-xs text-white/60 font-light leading-relaxed">
                      Diagnostics + telemetry report built for EV battery longevity.
                    </p>
                    <a
                      href="/services"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#00D084] mt-3 hover:underline"
                    >
                      Book Inspection <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>

                {/* Card 2: Charging Essentials */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-[32px] p-8 shadow-2xl backdrop-blur-2xl bg-[#080e0a]/90 border border-white/12 flex items-center gap-6 group hover:border-[#00D084]/40 transition-colors"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#00D084]/20 flex items-center justify-center shrink-0 border border-[#00D084]/40">
                    <Zap className="w-8 h-8 text-[#00D084]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold uppercase text-white mb-1">
                      Charging Essentials
                    </h3>
                    <p className="text-xs text-white/60 font-light leading-relaxed">
                      Portable chargers + fast cable bundles for daily fleet use.
                    </p>
                    <a
                      href="/services"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#00D084] mt-3 hover:underline"
                    >
                      Explore Bundles <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* =========================================================================
                SECTION 5: NETWORK COVERAGE (FULL-WIDTH SCROLL EXPANSION)
               ========================================================================= */}
            <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/10">
              <div
                ref={coverageRef}
                className="rounded-[36px] p-8 sm:p-14 shadow-2xl backdrop-blur-2xl bg-[#0b120d]/95 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
              >
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
                    PAN-INDIA COVERAGE
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight mt-1 mb-2">
                    Find EV Service Near You
                  </h2>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-xl">
                    Browse 400+ certified service hubs across Pune, Delhi, Bangalore, Hyderabad, and Mumbai.
                  </p>
                </div>

                <a
                  href="/services#products-grid"
                  className="px-9 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] hover:scale-105 shrink-0"
                >
                  EXPLORE SERVICE NETWORK
                </a>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Shared Footer */}
      <Footer />

      {/* =========================================================================
          ANIMATED RIGHT SIDEBAR FOR EVENT DETAILS
         ========================================================================= */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex justify-end p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDetails}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`relative h-full w-[95vw] md:w-[900px] max-w-6xl shadow-2xl flex flex-col rounded-[32px] sm:rounded-[40px] overflow-hidden ${
                isLight
                  ? "bg-white border border-[#d6e3da] text-[#1a2320]"
                  : "bg-[#050907] border border-white/10 text-white"
              }`}
            >
              <div data-lenis-prevent="true" className="flex-1 overflow-y-auto p-6 md:p-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <button
                  onClick={handleCloseDetails}
                  className="absolute top-6 right-6 p-2 rounded-full text-white/50 hover:text-white bg-white/10 cursor-pointer transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Event Image Banner (New inside Sidebar) */}
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 relative">
                  <img 
                    src={selectedEvent.img} 
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050907] to-transparent" />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#00D084] text-[#020403]">
                    {selectedEvent.type}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase border border-white/20 text-white/70">
                    {selectedEvent.status}
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase mb-4 leading-tight">
                  {selectedEvent.title}
                </h3>
                <p className="text-sm opacity-75 leading-relaxed mb-8">
                  {selectedEvent.description}
                </p>

                <div className="space-y-4 text-xs font-mono opacity-90 mb-8 bg-white/5 p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#00D084]" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#00D084]" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#00D084]" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-[#00D084]" />
                    <span>{selectedEvent.seats} Reserved</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 text-[#00D084]" />
                    <span>{selectedEvent.organizer}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="w-4 h-4 text-[#00D084]" />
                    <span>{selectedEvent.price}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="p-6 md:p-10 border-t border-white/10 bg-[#050907]">
                <button
                  onClick={() => {
                    if (selectedEvent.availability === "full") {
                      toast.error("This event is fully booked.");
                    } else {
                      toast.success(`Registered for ${selectedEvent.title}! Confirmation sent to your email.`);
                      handleCloseDetails();
                    }
                  }}
                  className={`w-full py-4 rounded-full text-xs font-black uppercase tracking-widest shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedEvent.availability === "full"
                      ? "bg-slate-700 text-white/50 cursor-not-allowed"
                      : "bg-[#00D084] text-[#020403] hover:bg-[#00e08f] hover:scale-[1.02]"
                  }`}
                >
                  {selectedEvent.availability === "full" ? "EVENT FULLY BOOKED" : (
                    <>
                      CONFIRM REGISTRATION <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
