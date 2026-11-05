import React, { useState, useEffect } from "react";
import { LayoutGrid, Radio } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export interface OEMBrandItem {
  name: string;
  category: "2W" | "3W" | "4W" | "Commercial" | "Fleet";
  categoryLabel: string;
  logo: string;
  platforms?: string;
}

const ROW_1_BRANDS: OEMBrandItem[] = [
  { name: "Ather", category: "2W", categoryLabel: "High-Speed 2W", logo: "/brands/ather.jpeg", platforms: "450X, 450S, Rizta" },
  { name: "Ola Electric", category: "2W", categoryLabel: "High-Speed 2W", logo: "/brands/ola.jpeg", platforms: "S1 Pro, S1 Air, S1 X" },
  { name: "Tata Motors", category: "4W", categoryLabel: "Passenger EV", logo: "/brands/tata.webp", platforms: "Nexon EV, Tiago EV, Punch EV" },
  { name: "TVS Motor", category: "2W", categoryLabel: "Connected 2W", logo: "/brands/tvs.webp", platforms: "iQube, TVS X" },
  { name: "Bajaj Auto", category: "2W", categoryLabel: "Urban 2W", logo: "/brands/bajaj.png", platforms: "Chetak 2901, 3201" },
  { name: "Mahindra", category: "4W", categoryLabel: "SUV & Commercial", logo: "/brands/mahindra.jpeg", platforms: "XUV400, Treo, Zor Grand" },
  { name: "MG Motor", category: "4W", categoryLabel: "Smart EV", logo: "/brands/mg.webp", platforms: "Comet EV, ZS EV, Windsor" },
  { name: "Hyundai", category: "4W", categoryLabel: "High-Voltage EV", logo: "/brands/hyundai.webp", platforms: "Ioniq 5, Kona EV" },
  { name: "Volvo", category: "4W", categoryLabel: "Luxury EV", logo: "/brands/Volvo.webp", platforms: "XC40 Recharge, C40" },
  { name: "Ultraviolette", category: "2W", categoryLabel: "Performance EV", logo: "/brands/ultraviolette_automotive_logo.webp", platforms: "F77 Mach 2, F99" },
  { name: "JBM Group", category: "Commercial", categoryLabel: "Heavy EV", logo: "/brands/JBM Group.webp", platforms: "Ecolife Electric Buses" },
];

const ROW_2_BRANDS: OEMBrandItem[] = [
  { name: "Revolt", category: "2W", categoryLabel: "AI Motorcycle", logo: "/brands/revolt.webp", platforms: "RV400, RV1" },
  { name: "Simple Energy", category: "2W", categoryLabel: "Long-Range 2W", logo: "/brands/simple-energy.jpg", platforms: "Simple One, Dot One" },
  { name: "Tork Motors", category: "2W", categoryLabel: "Motorcycles", logo: "/brands/tork.png", platforms: "Kratos R, Urban" },
  { name: "Hero Electric", category: "2W", categoryLabel: "City Commuter", logo: "/brands/hero-electric.jpeg", platforms: "Optima, Nyx" },
  { name: "Ampere", category: "2W", categoryLabel: "Mass Transit 2W", logo: "/brands/ampere.jpg", platforms: "Nexus, Magnus EX" },
  { name: "Okinawa", category: "2W", categoryLabel: "Commercial 2W", logo: "/brands/okinawa-autotech.jpeg", platforms: "Praise Pro, Dual 100" },
  { name: "BluSmart", category: "Fleet", categoryLabel: "Ride-Hailing Fleet", logo: "/brands/blu_smart_mobility_logo.jpeg", platforms: "Fleet Maintenance SOP" },
  { name: "Piaggio", category: "3W", categoryLabel: "3W Cargo / Auto", logo: "/brands/piaggio.jpeg", platforms: "Ape E-City, E-Xtra FX" },
  { name: "Atul Auto", category: "3W", categoryLabel: "L5 Cargo 3W", logo: "/brands/atul-auto-limited.webp", platforms: "Mobili, Elite Cargo" },
  { name: "Olectra", category: "Commercial", categoryLabel: "Fleet Transit", logo: "/brands/olectra-greentech.webp", platforms: "E-Buses, Tipper Trucks" },
];

const ALL_BRANDS = [...ROW_1_BRANDS, ...ROW_2_BRANDS];

export function OEMBrandMarquee() {
  const { siteTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(siteTheme || "dark");
  const [viewMode, setViewMode] = useState<"stream" | "grid">("stream");

  useEffect(() => {
    if (siteTheme) {
      setCurrentTheme(siteTheme);
    }
  }, [siteTheme]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkHtmlTheme = () => {
      const isDocLight = document.documentElement.classList.contains("theme-light");
      setCurrentTheme(isDocLight ? "light" : "dark");
    };

    checkHtmlTheme();

    const observer = new MutationObserver(checkHtmlTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const isLight = currentTheme === "light";

  return (
    <section
      className={`w-full py-16 sm:py-24 border-y overflow-hidden relative select-none transition-colors duration-500 ${
        isLight
          ? "bg-[#F6F8FA] text-slate-900 border-slate-200/90 selection:bg-[#E11D48]/15 selection:text-[#E11D48]"
          : "bg-[#040805] text-white border-white/10 selection:bg-[#00D084]/20 selection:text-[#00D084]"
      }`}
    >
      {/* Inline styles for flawless GPU-accelerated marquee loops */}
      <style>{`
        @keyframes oemMarqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes oemMarqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .oem-track-row1 {
          display: flex;
          width: max-content;
          animation: oemMarqueeLeft 45s linear infinite;
          will-change: transform;
        }
        .oem-track-row2 {
          display: flex;
          width: max-content;
          animation: oemMarqueeRight 45s linear infinite;
          will-change: transform;
        }
        .oem-marquee-container:hover .oem-track-row1,
        .oem-marquee-container:hover .oem-track-row2 {
          animation-play-state: paused;
        }
        .oem-card-spring {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, background-color 0.25s ease;
        }
      `}</style>

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-10 sm:mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-4xl">
            {/* Eyebrow in pink matching reference */}
            <span
              className={`text-xs sm:text-[13px] font-bold tracking-[0.22em] uppercase block transition-colors ${
                isLight ? "text-[#E11D48]" : "text-[#FF385C]"
              }`}
            >
              POWERFUL INTEGRATIONS
            </span>

            {/* Question title */}
            <h2
              className={`text-2xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight leading-[1.16] transition-colors duration-300 ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              Will it play nicely with our vehicle platform &amp; SOPs?
            </h2>

            {/* Detailed copy with punchy bold Yes */}
            <p
              className={`text-lg sm:text-2xl md:text-[1.95rem] font-medium tracking-tight leading-[1.32] transition-colors duration-300 ${
                isLight ? "text-slate-400" : "text-white/45"
              }`}
            >
              Electric 2W scooters, high-speed motorcycles, 3W passenger, L5 cargo, smart BMS protocols, CAN-bus diagnostics, battery swapping, warranty claims, digital PDI, custom OEM firmware.{" "}
              <span
                className={`font-bold transition-colors duration-300 ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                Yes.
              </span>
            </p>
          </div>

          {/* Minimal View Toggle */}
          <div className="shrink-0 flex items-center self-start md:self-end">
            <div
              className={`inline-flex items-center gap-1 p-1 rounded-full border transition-colors ${
                isLight
                  ? "bg-slate-200/70 border-slate-300/60 shadow-inner"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <button
                type="button"
                onClick={() => setViewMode("stream")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "stream"
                    ? isLight
                      ? "bg-white text-slate-900 shadow-sm"
                      : "bg-white/20 text-white shadow-sm"
                    : isLight
                      ? "text-slate-500 hover:text-slate-800"
                      : "text-white/50 hover:text-white"
                }`}
              >
                <Radio className="w-3.5 h-3.5 text-[#E11D48] dark:text-[#FF385C]" />
                <span>Stream</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? isLight
                      ? "bg-white text-slate-900 shadow-sm"
                      : "bg-white/20 text-white shadow-sm"
                    : isLight
                      ? "text-slate-500 hover:text-slate-800"
                      : "text-white/50 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-slate-600 dark:text-white/70" />
                <span>All 21 Brands</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mode 1: Infinite Staggered Streams (Matching Reference Image) */}
      {viewMode === "stream" ? (
        <div className="oem-marquee-container relative w-full overflow-hidden space-y-4 sm:space-y-6 py-2">
          {/* Subtle edge fade overlays for boundless appearance */}
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 z-10 transition-opacity duration-300 ${
              isLight
                ? "bg-gradient-to-r from-[#F6F8FA] via-[#F6F8FA]/80 to-transparent"
                : "bg-gradient-to-r from-[#040805] via-[#040805]/90 to-transparent"
            }`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 z-10 transition-opacity duration-300 ${
              isLight
                ? "bg-gradient-to-l from-[#F6F8FA] via-[#F6F8FA]/80 to-transparent"
                : "bg-gradient-to-l from-[#040805] via-[#040805]/90 to-transparent"
            }`}
          />

          {/* Row 1 Track: scrolls left */}
          <div className="flex w-full overflow-hidden">
            <div className="oem-track-row1 flex items-center gap-4 sm:gap-6 px-3">
              {[...ROW_1_BRANDS, ...ROW_1_BRANDS].map((brand, idx) => (
                <BrandCard
                  key={`r1-${brand.name}-${idx}`}
                  brand={brand}
                  isLight={isLight}
                />
              ))}
            </div>
          </div>

          {/* Row 2 Track: scrolls right */}
          <div className="flex w-full overflow-hidden">
            <div className="oem-track-row2 flex items-center gap-4 sm:gap-6 px-3">
              {[...ROW_2_BRANDS, ...ROW_2_BRANDS].map((brand, idx) => (
                <BrandCard
                  key={`r2-${brand.name}-${idx}`}
                  brand={brand}
                  isLight={isLight}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: Full Aesthetic Grid of All 21 Brands */
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5">
            {ALL_BRANDS.map((brand) => (
              <BrandCard
                key={`grid-${brand.name}`}
                brand={brand}
                isGrid
                isLight={isLight}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bottom Readiness Chips */}
      <div
        className={`max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mt-12 sm:mt-16 pt-8 border-t flex flex-wrap items-center justify-between gap-4 transition-colors ${
          isLight ? "border-slate-200/80" : "border-white/10"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          <span
            className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
              isLight ? "text-slate-400" : "text-white/40"
            }`}
          >
            Turn-Key Readiness For:
          </span>
          {[
            "Electric 2W Manufacturers",
            "3W & L5 Cargo Fleets",
            "New & Import EV Brands",
            "Automotive Dealer Groups",
            "Battery & Component Makers",
            "Commercial Fleets",
          ].map((seg) => (
            <span
              key={seg}
              className={`px-3.5 py-1.5 rounded-full font-medium text-[11px] transition-colors ${
                isLight
                  ? "bg-white border border-slate-200/80 text-slate-600 shadow-sm hover:border-slate-400 hover:text-slate-900"
                  : "bg-white/5 border border-white/10 text-white/70 hover:border-[#00D084]/40 hover:text-white"
              }`}
            >
              {seg}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
          <span
            className={`font-semibold ${
              isLight ? "text-slate-700" : "text-white/70"
            }`}
          >
            Tested across 21+ Electric Vehicle Platforms
          </span>
        </div>
      </div>
    </section>
  );
}

/**
 * Aesthetic Minimal Square Card matching the user's reference image
 * Automatically adapts between Light and Dark themes
 */
function BrandCard({
  brand,
  isGrid = false,
  isLight = false,
}: {
  brand: OEMBrandItem;
  isGrid?: boolean;
  isLight?: boolean;
}) {
  return (
    <div
      className={`oem-card-spring group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl md:rounded-[22px] border cursor-pointer select-none transition-all duration-300 ${
        isLight
          ? "bg-white border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] hover:border-slate-300 hover:-translate-y-2"
          : "bg-[#080d0a] border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-[#00D084]/40 hover:bg-[#0c1410] hover:shadow-[0_16px_36px_rgba(0,208,132,0.12)] hover:-translate-y-2"
      } ${
        isGrid
          ? "w-full aspect-square"
          : "w-[150px] h-[150px] sm:w-[172px] sm:h-[172px] md:w-[188px] md:h-[188px] shrink-0"
      }`}
    >
      {/* Top subtle category indicator on hover */}
      <span
        className={`text-[9px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity ${
          isLight ? "text-slate-400" : "text-[#00D084]"
        }`}
      >
        {brand.categoryLabel}
      </span>

      {/* Centered Large Brand Logo Container */}
      <div
        className={`w-full flex-1 flex items-center justify-center p-2.5 rounded-xl sm:rounded-2xl transition-all ${
          isLight ? "bg-transparent" : "bg-white shadow-sm"
        }`}
      >
        <img
          src={brand.logo}
          alt={brand.name}
          className="max-h-12 sm:max-h-14 md:max-h-16 max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-108"
          loading="lazy"
        />
      </div>

      {/* Brand Label */}
      <span
        className={`text-xs sm:text-[13px] font-medium tracking-tight text-center truncate max-w-full px-1 transition-colors ${
          isLight
            ? "text-slate-500 group-hover:text-slate-900"
            : "text-white/70 group-hover:text-white"
        }`}
      >
        {brand.name}
      </span>
    </div>
  );
}
