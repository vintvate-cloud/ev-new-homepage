import React, { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  BatteryCharging,
  Truck,
  Store,
  Cpu,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

interface PartnerItem {
  id: string;
  title: string;
  desc: string;
  action: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  stat: string;
  category: string;
  image: string;
  isFeatured?: boolean;
}

const PARTNER_CARDS: PartnerItem[] = [
  {
    id: "centres",
    title: "EV Service Centres & Garages",
    desc: "Convert or upgrade your existing two-wheeler workshop into a branded, high-tech EV hub.",
    action: "Convert Centre",
    href: "/franchise",
    icon: Building2,
    stat: "Avg ₹1.8L - ₹4.5L/mo net",
    category: "Franchise Hub",
    image: "/ev-master-workshop-hero.png",
    isFeatured: true,
  },
  {
    id: "charging",
    title: "EV Charging Infrastructure Providers",
    desc: "Co-locate chargers at our hubs, or add certified vehicle service to your existing charge-points.",
    action: "Co-locate Charging",
    href: "/franchise",
    icon: BatteryCharging,
    stat: "Direct walk-in footfall",
    category: "Charging Grid",
    image: "/ai-gallery/ev_charging_hub.png",
    isFeatured: false,
  },
  {
    id: "fleet",
    title: "Fleet Operators & Logistics",
    desc: "Plug your commercial fleet directly into our scheduled preventive maintenance network.",
    action: "Connect Fleet",
    href: "/fleet",
    icon: Truck,
    stat: "98.5% Uptime SLA",
    category: "Commercial Fleets",
    image: "/ai-gallery/ev_workshop_bay.png",
    isFeatured: false,
  },
  {
    id: "spares",
    title: "EV Spare Parts Suppliers",
    desc: "Supply into EV Spare Hub and reach hundreds of service bays across India.",
    action: "Supply Parts",
    href: "/store",
    icon: Store,
    stat: "68+ Hub network reach",
    category: "Supply Chain",
    image: "/hero/genuine_parts.jpg",
    isFeatured: false,
  },
  {
    id: "oem",
    title: "EV OEMs & Brand Partners",
    desc: "Integrate proprietary diagnostics and expand your authorized nationwide service network.",
    action: "Partner With Us",
    href: "/oem",
    icon: Cpu,
    stat: "Same-Day Warranty",
    category: "OEM Bridge",
    image: "/ecosystem/edge.jpg",
    isFeatured: false,
  },
];

export function EcosystemPartnersCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Monitor scroll position to toggle arrow active states
  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 15);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = 370; // approximate width of one card + gap
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* ── Top Header with Title on Left & Carousel Controls on Right ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
            Partnership Opportunities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Who Can Join the MY EV Service Ecosystem?
          </h2>
        </div>

        {/* Carousel Navigation Arrow Buttons (Matches Reference Design) */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
          <button
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous partners"
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer border ${
              canScrollLeft
                ? "bg-white/10 hover:bg-[#00D084] hover:text-black text-white border-white/20 hover:border-[#00D084] shadow-lg active:scale-95"
                : "bg-white/5 text-white/30 border-white/10 cursor-not-allowed opacity-50"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next partners"
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer border ${
              canScrollRight
                ? "bg-white/10 hover:bg-[#00D084] hover:text-black text-white border-white/20 hover:border-[#00D084] shadow-lg active:scale-95"
                : "bg-white/5 text-white/30 border-white/10 cursor-not-allowed opacity-50"
            }`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Carousel Container: Horizontal Scroll & Snapping ── */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-6 pt-2 select-none -mx-6 px-6 sm:mx-0 sm:px-0 snap-x snap-mandatory"
      >
        {PARTNER_CARDS.map((item) => {
          const Icon = item.icon;
          const isFeatured = item.isFeatured;

          return (
            <div
              key={item.id}
              className={`w-[305px] sm:w-[350px] lg:w-[365px] shrink-0 snap-start rounded-[32px] overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${
                isFeatured
                  ? "bg-[#00D084] text-[#020503] border-2 border-[#00D084]"
                  : "bg-[#071109] text-white border border-white/10 hover:border-[#00D084]/40"
              }`}
            >
              {/* ── Top Half: Badges, Title & Exact Description ── */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 text-left">
                {/* Badges Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border ${
                        isFeatured
                          ? "bg-black/10 border-black/15 text-black"
                          : "bg-white/5 border-white/10 text-white/80"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span
                      className={`text-[11px] font-mono font-medium px-3 py-1 rounded-full border ${
                        isFeatured
                          ? "bg-black/10 border-black/15 text-black"
                          : "bg-[#00D084]/10 border-[#00D084]/20 text-[#00D084]"
                      }`}
                    >
                      {item.stat}
                    </span>
                  </div>

                  {/* Circular Icon Badge */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                      isFeatured
                        ? "bg-black/10 border-black/15 text-black"
                        : "bg-white/5 border-white/10 text-[#00D084] group-hover:bg-[#00D084] group-hover:text-black"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Big Display Title */}
                <h3
                  className={`text-2xl sm:text-[26px] font-black tracking-tight leading-tight mb-2.5 ${
                    isFeatured ? "text-black" : "text-white group-hover:text-[#00D084] transition-colors"
                  }`}
                >
                  {item.title}
                </h3>

                {/* Exact Website Content Description */}
                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                    isFeatured ? "text-black/85 font-medium" : "text-white/60 font-light"
                  }`}
                >
                  {item.desc}
                </p>
              </div>

              {/* ── Bottom Half: Photographic Image Frame with Overlaid Action Button ── */}
              <div className="relative mx-3 mb-3 h-[240px] sm:h-[260px] rounded-[24px] overflow-hidden group/img bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-95 group-hover/img:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Cinematic Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Overlaid Floating Action Pill Button (Matches Reference 'Read More →') */}
                <Link
                  to={item.href}
                  className={`absolute bottom-4 left-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-bold transition-all duration-300 shadow-xl cursor-pointer backdrop-blur-md ${
                    isFeatured
                      ? "bg-black text-white hover:bg-white hover:text-black"
                      : "bg-white/20 text-white border border-white/30 hover:bg-[#00D084] hover:text-black hover:border-[#00D084]"
                  }`}
                >
                  <span>{item.action}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/img:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
