import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  ShoppingCart,
  Sun,
  User,
  X,
  Zap,
} from "lucide-react";
import hero from "@/assets/ev-scooter-hero.png";
import tech from "@/assets/tech.jpg";
import interior from "@/assets/interior.jpg";
import energy from "@/assets/energy.jpg";
import factory from "@/assets/factory.jpg";

export type Theme = "warm" | "mid" | "dark";

const PRIMARY_NAV = [
  { label: "About Us", href: "/about", menuIdx: null },
  { label: "Franchise", href: "/franchise", menuIdx: 0 },
  { label: "Services", href: "/services", menuIdx: 1 },
  { label: "Careers", href: "/careers", menuIdx: null },
  { label: "Find Service", href: "/find-services", menuIdx: null },
];

const MORE_NAV = [
  { label: "Media & PR", href: "/media", desc: "Press releases & media coverage" },
  { label: "Webinars & Live", href: "/webinars", desc: "Technical EV workshops & live Q&A" },
  { label: "Events & Meets", href: "/events", desc: "EV industry summits & partner meets" },
  { label: "EV Industry News", href: "/news", desc: "Latest aftermarket EV updates" },
  { label: "Blog & Insights", href: "/blog", desc: "EV maintenance guides & tech tips" },
  { label: "AI Track Assistant", href: "/track", desc: "Automated status & diagnostic tracking" },
];

export function Nav({ theme = "dark", onOpenBooking }: { theme?: Theme; onOpenBooking?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moreLeaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
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
    if (siteTheme === "light") {
      document.documentElement.classList.add("theme-light");
    } else {
      document.documentElement.classList.remove("theme-light");
    }
  }, [siteTheme]);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (hoverIdx === null) {
      setPill(null);
      return;
    }
    const el = itemRefs.current[hoverIdx];
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const r = el.getBoundingClientRect();
    const pr = parent.getBoundingClientRect();
    setPill({ x: r.left - pr.left, w: r.width });
  }, [hoverIdx]);

  useEffect(() => {
    if (!pillRef.current || !pill) return;
    gsap.to(pillRef.current, { x: pill.x, width: pill.w, duration: 0.55, ease: "power3.out" });
  }, [pill]);

  const handleNavEnter = (i: number) => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    setHoverIdx(i);
  };

  const handleNavLeave = () => {
    leaveTimeout.current = setTimeout(() => setHoverIdx(null), 180);
  };

  const handleMoreEnter = () => {
    if (moreLeaveTimeout.current) clearTimeout(moreLeaveTimeout.current);
    setMoreDropdownOpen(true);
  };

  const handleMoreLeave = () => {
    moreLeaveTimeout.current = setTimeout(() => setMoreDropdownOpen(false), 200);
  };

  const themeClass = theme === "warm" ? "theme-warm" : "";

  const MEGA_MENUS: Record<number, {
    label: string;
    featured: { img: string; title: string; desc: string; tag: string };
    links: { title: string; sub: string; href: string }[];
  }> = {
    0: {
      label: "Franchise Program",
      featured: { img: factory, title: "Master EV Network", desc: "Join 40+ Indian cities operating Autobot OS powered workshops.", tag: "Opportunity" },
      links: [
        { title: "Express Garage Tier", sub: "₹5-8 Lakhs • 2 Bays", href: "/franchise" },
        { title: "Standard Centre Tier", sub: "₹12-18 Lakhs • 4 Bays", href: "/franchise" },
        { title: "Master Regional Hub", sub: "₹25-35 Lakhs • 8 Bays", href: "/franchise" },
        { title: "Apply Online", sub: "Partner Application Form", href: "/franchise" },
      ],
    },
    1: {
      label: "EV Services Directory",
      featured: { img: tech, title: "Engineered Diagnostics", desc: "68 certified diagnostic & repair services for 2W & 3W Electric Vehicles.", tag: "Diagnostics" },
      links: [
        { title: "Battery & Energy Systems", sub: "Cell Balancing & SOH", href: "/services" },
        { title: "Motor & Powertrain", sub: "FOC Controller Repair", href: "/services" },
        { title: "Emergency RSA 24/7", sub: "Mobile Service Van Dispatch", href: "/services" },
        { title: "Periodic Maintenance", sub: "32-Point Diagnostic Inspection", href: "/services" },
      ],
    },
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: hidden ? 0.4 : 0.15, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-1" : "py-2"}`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center gap-2.5 md:gap-3 transition-all duration-500 ${scrolled ? "mx-4 md:mx-8 mt-1.5" : "mx-4 md:mx-8 mt-2"
            }`}
        >
          {/* Logo OUTSIDE the bordered navbar pill container */}
          <a href="/" className="flex items-center shrink-0 group overflow-hidden rounded-xl">
            <img
              src="/logo.jpeg"
              alt="My EV Service Logo"
              className={`w-auto rounded-xl object-cover scale-125 transition-all duration-300 group-hover:scale-135 ${scrolled ? "h-11 sm:h-12" : "h-14 sm:h-16 lg:h-16"
                } ${siteTheme === "light"
                  ? "border border-black/10 shadow-md bg-white"
                  : "border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.6)] bg-black"
                }`}
            />
          </a>

          {/* Bordered Navbar Pill Container starting from MY EV SERVICE text */}
          <div
            className={`flex-1 flex items-center justify-between transition-all duration-500 ${scrolled
                ? "pl-3.5 sm:pl-4 pr-5 py-1.5 rounded-full"
                : "pl-4 sm:pl-5 pr-6 py-2.5 rounded-full"
              }`}
            style={{
              background: siteTheme === "light" ? "rgba(255, 255, 255, 0.95)" : "rgba(10, 10, 10, 0.85)",
              backdropFilter: "blur(20px)",
              border: siteTheme === "light" ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.08)",
              boxShadow: siteTheme === "light" ? "0 4px 24px rgba(0,0,0,0.06)" : "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            <a href="/" className="flex items-center gap-2 group">
              <span
                id="nav-logo-text"
                className={`text-[14px] font-bold tracking-[0.15em] uppercase transition-colors ${siteTheme === "light" ? "text-black" : "text-white"
                  }`}
              >
                MY EV SERVICE
              </span>
            </a>

            {/* Desktop Nav with Mega Menu */}
            <div className="relative hidden items-center gap-1 xl:flex">
              <nav className="relative flex items-center gap-1" onMouseLeave={handleNavLeave}>
                {PRIMARY_NAV.map((n, i) => {
                  const hasMenu = n.menuIdx !== null && MEGA_MENUS[n.menuIdx!];
                  return (
                    <a
                      key={n.label}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      href={n.href}
                      onMouseEnter={() => (hasMenu ? handleNavEnter(n.menuIdx!) : handleNavLeave())}
                      className="relative z-10 px-3 py-1.5 text-[12px] font-bold tracking-wide flex items-center gap-1 text-[#00D084] hover:text-[#00e08f] transition-colors"
                    >
                      <span style={{ position: "relative", zIndex: 1 }}>{n.label}</span>
                      {hasMenu && (
                        <ChevronDown
                          className="h-3 w-3 opacity-60"
                          style={{ position: "relative", zIndex: 1 }}
                        />
                      )}
                    </a>
                  );
                })}

                {/* More Resources Dropdown Trigger */}
                <div
                  className="relative"
                  onMouseEnter={handleMoreEnter}
                  onMouseLeave={handleMoreLeave}
                >
                  <button
                    type="button"
                    className="px-3 py-1.5 text-[12px] font-bold tracking-wide flex items-center gap-1 text-[#00D084] hover:text-[#00e08f] transition-colors cursor-pointer"
                  >
                    <span>More</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${moreDropdownOpen ? "rotate-180 text-[#00D084]" : "opacity-70"
                        }`}
                    />
                  </button>

                  {/* More Dropdown Glass Panel */}
                  <AnimatePresence>
                    {moreDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-[calc(100%+12px)] right-0 w-64 origin-top-right z-50 rounded-2xl border border-white/15 p-2.5 shadow-2xl backdrop-blur-2xl"
                        style={{
                          background:
                            siteTheme === "light"
                              ? "rgba(255, 255, 255, 0.98)"
                              : "rgba(8, 12, 10, 0.96)",
                        }}
                      >
                        {/* Arrow pointer */}
                        <div
                          className={`absolute -top-2 right-5 w-3.5 h-3.5 rotate-45 rounded-sm border-l border-t ${siteTheme === "light"
                              ? "border-black/10 bg-white"
                              : "border-white/15 bg-[#080c0a]"
                            }`}
                        />

                        <div className="px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between">
                          <span className="text-[9px] font-mono font-bold text-[#00D084] uppercase tracking-wider">
                            Ecosystem Resources
                          </span>
                          <span className="text-[9px] text-white/40 font-mono">6 Modules</span>
                        </div>

                        <div className="space-y-0.5">
                          {MORE_NAV.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              className={`group flex items-center justify-between rounded-xl px-3 py-2 transition-all ${siteTheme === "light"
                                  ? "hover:bg-black/5 text-black/80 hover:text-black"
                                  : "hover:bg-white/10 text-white/80 hover:text-white"
                                }`}
                            >
                              <div>
                                <span className="block text-xs font-bold leading-tight group-hover:text-[#00D084] transition-colors">
                                  {item.label}
                                </span>
                                <span className="block text-[9.5px] text-white/40 group-hover:text-white/60 transition-colors mt-0.5">
                                  {item.desc}
                                </span>
                              </div>
                              <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#00D084] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mega Menu Dropdown Panel */}
                <AnimatePresence>
                  {hoverIdx !== null && MEGA_MENUS[hoverIdx] && (
                    <motion.div
                      key={hoverIdx}
                      initial={{ opacity: 0, y: 12, scale: 0.975 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                      onMouseEnter={() => {
                        if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
                      }}
                      onMouseLeave={handleNavLeave}
                      className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[680px] origin-top z-50"
                    >
                      {/* Arrow pointer */}
                      <div
                        className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 rounded-sm border-l border-t ${siteTheme === "light"
                            ? "border-black/10 bg-white"
                            : "border-white/10 bg-[#080c0a]"
                          }`}
                        style={{ zIndex: -1 }}
                      />

                      {/* Glass panel */}
                      <div
                        className={`relative overflow-hidden rounded-[24px] border ${siteTheme === "light"
                            ? "border-black/10 shadow-[0_32px_80px_rgba(0,0,0,0.15)]"
                            : "border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
                          }`}
                        style={{
                          background:
                            siteTheme === "light"
                              ? "rgba(255, 255, 255, 0.98)"
                              : "rgba(8, 12, 10, 0.95)",
                          backdropFilter: "blur(40px)",
                        }}
                      >
                        {/* Top neon line */}
                        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00D084]/70 to-transparent" />

                        <div className="flex h-[270px]">
                          {/* Left: Featured Image */}
                          <div className="relative w-[230px] shrink-0 overflow-hidden">
                            <motion.img
                              key={`img-${hoverIdx}`}
                              initial={{ opacity: 0, scale: 1.1 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.45, ease: "easeOut" }}
                              src={MEGA_MENUS[hoverIdx].featured.img}
                              alt={MEGA_MENUS[hoverIdx].featured.title}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080c0a]/70" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080c0a]/90 via-[#080c0a]/20 to-transparent" />

                            <motion.div
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="absolute top-5 left-5 px-2.5 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[9px] uppercase tracking-[0.25em] text-[#00D084] font-bold"
                            >
                              {MEGA_MENUS[hoverIdx].featured.tag}
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.12 }}
                              className="absolute bottom-5 left-5 right-4"
                            >
                              <p className="text-white font-semibold text-[14px] leading-snug mb-1">
                                {MEGA_MENUS[hoverIdx].featured.title}
                              </p>
                              <p className="text-white/45 text-[11px] leading-relaxed line-clamp-2">
                                {MEGA_MENUS[hoverIdx].featured.desc}
                              </p>
                            </motion.div>
                          </div>

                          {/* Right: Links */}
                          <div className="flex flex-col flex-1 p-6">
                            <p className="text-[9.5px] uppercase tracking-[0.32em] text-[#00D084] font-bold mb-4">
                              {MEGA_MENUS[hoverIdx].label}
                            </p>

                            <div className="grid grid-cols-2 gap-x-3 gap-y-1 flex-1 content-start">
                              {MEGA_MENUS[hoverIdx].links.map((link, li) => (
                                <motion.a
                                  key={link.title}
                                  href={link.href}
                                  initial={{ opacity: 0, x: 8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.25,
                                    delay: 0.06 + li * 0.045,
                                    ease: "easeOut",
                                  }}
                                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 border border-transparent ${siteTheme === "light"
                                      ? "hover:bg-black/[0.03] hover:border-black/5"
                                      : "hover:bg-white/[0.055] hover:border-white/8"
                                    }`}
                                >
                                  <div
                                    className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200 group-hover:bg-[#00D084] ${siteTheme === "light" ? "bg-black/15" : "bg-white/20"
                                      }`}
                                  />
                                  <div>
                                    <span
                                      className={`block text-[12.5px] font-semibold transition-colors leading-tight ${siteTheme === "light"
                                          ? "text-black/80 group-hover:text-black"
                                          : "text-white/90 group-hover:text-white"
                                        }`}
                                    >
                                      {link.title}
                                    </span>
                                    <span
                                      className={`block text-[10px] transition-colors mt-0.5 ${siteTheme === "light"
                                          ? "text-black/40 group-hover:text-black/60"
                                          : "text-white/35 group-hover:text-white/50"
                                        }`}
                                    >
                                      {link.sub}
                                    </span>
                                  </div>
                                  <ArrowRight className="ml-auto h-3 w-3 text-white/0 group-hover:text-[#00D084]/70 transition-all duration-200 -translate-x-1 group-hover:translate-x-0" />
                                </motion.a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle Button (Circular Sun Icon matching screenshot) */}
              <button
                onClick={() => setSiteTheme(siteTheme === "light" ? "dark" : "light")}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${siteTheme === "light"
                    ? "border-black/20 text-black hover:bg-black/5"
                    : "border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/10"
                  }`}
                title={siteTheme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                <Sun className="w-4 h-4" />
              </button>

              {/* Shopping Cart Button (Circular Icon matching screenshot) */}
              <a
                href="/store"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${siteTheme === "light"
                    ? "border-black/20 text-black hover:bg-black/5"
                    : "border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/10"
                  }`}
                title="EV Spare Parts Store"
              >
                <ShoppingCart className="w-4 h-4" />
              </a>

              {/* Login Button (Pill button with User Icon matching screenshot) */}
              <a
                href="/login"
                className={`hidden sm:flex px-4 py-2 rounded-full border text-xs font-medium items-center gap-2 transition-all cursor-pointer ${siteTheme === "light"
                    ? "border-black/20 text-black hover:bg-black/5"
                    : "border-white/20 text-white/90 hover:text-white hover:border-white/40 hover:bg-white/10"
                  }`}
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </a>

              {/* Book Service CTA Button (Mint Green Pill matching screenshot) */}
              <button
                onClick={() => (onOpenBooking ? onOpenBooking() : (window.location.href = "/services"))}
                className="rounded-full text-xs font-bold flex items-center gap-2 px-5 py-2 transition-all hover:opacity-95 cursor-pointer bg-[#00D084] text-[#020403] shadow-[0_0_15px_rgba(0,208,132,0.3)]"
              >
                <Zap className="h-4 w-4 fill-[#020403]" />
                <span>Book Service</span>
              </button>

              {/* Mobile Hamburger */}
              <button
                aria-label="Menu"
                className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass text-[#00D084]"
                onClick={() => setOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed inset-0 z-[60] xl:hidden ${themeClass}`}
        style={{
          background: "color-mix(in oklab, var(--background) 96%, transparent)",
          backdropFilter: "blur(28px)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo-myevservice.jpg"
              alt="My EV Service Logo"
              className="h-9 w-auto rounded-lg object-contain"
            />
            <span className="text-[14px] font-bold tracking-[0.15em] text-foreground uppercase">
              MY EV SERVICE
            </span>
          </div>
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full glass text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col gap-1 px-6 pt-6 overflow-y-auto max-h-[82vh]">
          {open &&
            [...PRIMARY_NAV, ...MORE_NAV].map((n, i) => (
              <motion.a
                key={n.label}
                href={n.href}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.03 * i + 0.08, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border/40 py-3.5 text-xl font-semibold tracking-tight text-foreground"
              >
                {n.label}
                <ArrowUpRight className="h-4 w-4 text-[#00D084]" />
              </motion.a>
            ))}
        </div>
      </motion.div>
    </>
  );
}
