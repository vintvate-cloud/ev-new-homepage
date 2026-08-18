import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  ShoppingCart,
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

const NAV = [
  { label: "Franchise", href: "/#warehouse", menuIdx: 0 },
  { label: "Careers", href: "/careers", menuIdx: null },
  { label: "Find Service", href: "/services#products-grid", menuIdx: 1 },
  { label: "Webinars", href: "/webinars", menuIdx: null },
  { label: "Events", href: "/events", menuIdx: null },
  { label: "EV News", href: "/news", menuIdx: null },
  { label: "Blog", href: "/#blog", menuIdx: null },
  { label: "Media", href: "/#media", menuIdx: null },
  { label: "Services", href: "/services", menuIdx: null },
];

export function Nav({ theme = "dark", onOpenBooking }: { theme?: Theme; onOpenBooking?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  const [isDarkBg, setIsDarkBg] = useState(false);
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

      const evSection = document.getElementById("ev-services");
      if (evSection) {
        const rect = evSection.getBoundingClientRect();
        setIsDarkBg(rect.top <= 50);
      }

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

  const themeClass = theme === "warm" ? "theme-warm" : "";

  const MEGA_MENUS = [
    {
      label: "Vehicles",
      featured: { img: hero, title: "Model V — Flagship", desc: "The apex of AURORA engineering. Tri-motor architecture and active aero.", tag: "Hypercar" },
      links: [
        { title: "Model V", sub: "Flagship Hypercar" },
        { title: "Model L", sub: "Executive Sedan" },
        { title: "Model T", sub: "Adaptive SUV" },
        { title: "Roadster N", sub: "Open-Sky GT" },
      ],
    },
    {
      label: "Technology",
      featured: { img: tech, title: "Neural Compute Core", desc: "Custom silicon delivering 342 TOPS of real-time perception with 8ms latency.", tag: "Engineering" },
      links: [
        { title: "Drive System", sub: "Aurora Halo Motor" },
        { title: "Battery", sub: "4680 Cell Architecture" },
        { title: "Autopilot", sub: "Neural AI Compute" },
        { title: "Safety", sub: "Machined Monocoque" },
      ],
    },
    {
      label: "Interior",
      featured: { img: interior, title: "Handcrafted Cabin", desc: "Every surface, every material, every stitch engineered for silence and luxury.", tag: "Experience" },
      links: [
        { title: "Materials", sub: "Alcantara & Carbon" },
        { title: "Infotainment", sub: "32\" Horizon Display" },
        { title: "Sound", sub: "22-Speaker Aurora Sound" },
        { title: "Comfort", sub: "4-Zone Climate AI" },
      ],
    },
    {
      label: "Energy",
      featured: { img: energy, title: "Aurora Energy Grid", desc: "Solar, storage, and home power — engineered to the same standard as our vehicles.", tag: "Sustainability" },
      links: [
        { title: "Solar Panels", sub: "Residential & Commercial" },
        { title: "Powerwall", sub: "Home Battery Storage" },
        { title: "Megapack", sub: "Grid-Scale Storage" },
        { title: "Charging", sub: "4,200 Station Network" },
      ],
    },
    {
      label: "Company",
      featured: { img: factory, title: "Built Where It's Driven", desc: "Six vertically-integrated gigafactories on three continents. 342 people, 1,140 machines.", tag: "About" },
      links: [
        { title: "About Us", sub: "Our Mission & Story" },
        { title: "Careers", sub: "Join the Revolution" },
        { title: "Franchise", sub: "Partner Programme" },
        { title: "Press", sub: "Media & Newsroom" },
      ],
    },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: hidden ? 0.4 : 0.15, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-1" : "py-2"}`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between transition-all duration-500 ${
            scrolled
              ? "mx-4 md:mx-8 px-6 py-1.5 rounded-full mt-1.5"
              : "mx-4 md:mx-8 px-6 py-2.5 rounded-full mt-2"
          }`}
          style={{
            background: siteTheme === "light" ? "rgba(255, 255, 255, 0.95)" : "rgba(10, 10, 10, 0.85)",
            backdropFilter: "blur(20px)",
            border: siteTheme === "light" ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.08)",
            boxShadow: siteTheme === "light" ? "0 4px 24px rgba(0,0,0,0.06)" : "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          <a href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo-myevservice.jpg"
              alt="My EV Service Logo"
              className="h-9 w-auto rounded-lg object-contain border border-white/5"
            />
            <span
              id="nav-logo-text"
              className={`text-[14px] font-bold tracking-[0.15em] uppercase transition-colors ${
                siteTheme === "light" ? "text-black" : "text-white"
              }`}
            >
              MY EV SERVICE
            </span>
          </a>

          {/* Desktop Nav with Mega Menu */}
          <div className="relative hidden items-center gap-1 md:flex">
            <nav className="relative flex items-center gap-1" onMouseLeave={handleNavLeave}>
              {NAV.map((n, i) => {
                const hasMenu = n.menuIdx !== null;
                return (
                  <a
                    key={n.label}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    href={n.href}
                    onMouseEnter={() => (hasMenu ? handleNavEnter(n.menuIdx!) : handleNavLeave())}
                    className="relative z-10 px-4 py-2 text-[13px] font-medium tracking-wide flex items-center gap-1 text-[#00D084]"
                  >
                    <span style={{ position: "relative", zIndex: 1 }}>{n.label}</span>
                    {hasMenu && (
                      <ChevronDown
                        className="h-3 w-3 opacity-40"
                        style={{ position: "relative", zIndex: 1 }}
                      />
                    )}
                  </a>
                );
              })}

              {/* Mega Menu Dropdown Panel */}
              <AnimatePresence>
                {hoverIdx !== null && (
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
                    className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[700px] origin-top z-50"
                  >
                    {/* Arrow pointer */}
                    <div
                      className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 rounded-sm border-l border-t ${
                        siteTheme === "light"
                          ? "border-black/10 bg-white"
                          : "border-white/10 bg-[#080c0a]"
                      }`}
                      style={{ zIndex: -1 }}
                    />

                    {/* Glass panel */}
                    <div
                      className={`relative overflow-hidden rounded-[24px] border ${
                        siteTheme === "light"
                          ? "border-black/10 shadow-[0_32px_80px_rgba(0,0,0,0.15)]"
                          : "border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
                      }`}
                      style={{
                        background:
                          siteTheme === "light"
                            ? "rgba(255, 255, 255, 0.98)"
                            : "rgba(8, 12, 10, 0.92)",
                        backdropFilter: "blur(40px)",
                      }}
                    >
                      {/* Top neon line */}
                      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00D084]/70 to-transparent" />

                      <div className="flex h-[288px]">
                        {/* Left: Featured Image */}
                        <div className="relative w-[240px] shrink-0 overflow-hidden">
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
                        <div className="flex flex-col flex-1 p-7">
                          <p className="text-[9.5px] uppercase tracking-[0.32em] text-[#00D084] font-bold mb-5">
                            {MEGA_MENUS[hoverIdx].label}
                          </p>

                          <div className="grid grid-cols-2 gap-x-3 gap-y-1 flex-1 content-start">
                            {MEGA_MENUS[hoverIdx].links.map((link, li) => (
                              <motion.a
                                key={link.title}
                                href="/services"
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.25,
                                  delay: 0.06 + li * 0.045,
                                  ease: "easeOut",
                                }}
                                className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 border border-transparent ${
                                  siteTheme === "light"
                                    ? "hover:bg-black/[0.03] hover:border-black/5"
                                    : "hover:bg-white/[0.055] hover:border-white/8"
                                }`}
                              >
                                <div
                                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200 group-hover:bg-[#00D084] ${
                                    siteTheme === "light" ? "bg-black/15" : "bg-white/20"
                                  }`}
                                />
                                <div>
                                  <span
                                    className={`block text-[13px] font-semibold transition-colors leading-tight ${
                                      siteTheme === "light"
                                        ? "text-black/80 group-hover:text-black"
                                        : "text-white/90 group-hover:text-white"
                                    }`}
                                  >
                                    {link.title}
                                  </span>
                                  <span
                                    className={`block text-[10.5px] transition-colors mt-0.5 ${
                                      siteTheme === "light"
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

                          <div
                            className={`mt-5 pt-4 border-t flex items-center justify-between ${
                              siteTheme === "light"
                                ? "border-black/[0.07]"
                                : "border-white/[0.07]"
                            }`}
                          >
                            <span
                              className={`text-[11px] ${
                                siteTheme === "light" ? "text-black/40" : "text-white/25"
                              }`}
                            >
                              Browse all {MEGA_MENUS[hoverIdx].label}
                            </span>
                            <a
                              href="/services"
                              className={`inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#00D084] transition-colors duration-200 ${
                                siteTheme === "light" ? "hover:text-black" : "hover:text-white"
                              }`}
                            >
                              View all <ArrowRight className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setSiteTheme(siteTheme === "light" ? "dark" : "light")}
              className="group flex items-center gap-2 rounded-full border border-border bg-muted/30 px-2.5 py-1 transition-all hover:bg-muted active:scale-95 cursor-pointer text-foreground"
              title={siteTheme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              <div className="relative flex h-4 w-7 items-center rounded-full bg-foreground/20 p-0.5 transition-colors duration-300 group-hover:bg-foreground/30">
                <motion.div
                  layout
                  className="h-3 w-3 rounded-full bg-background shadow-sm"
                  animate={{ x: siteTheme === "light" ? 12 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/80 group-hover:text-foreground">
                {siteTheme === "light" ? "Light" : "Dark"}
              </span>
            </button>

            {/* Cart Icon */}
            <button className="text-foreground hover:text-[#00D084] transition cursor-pointer p-1">
              <ShoppingCart className="h-4.5 w-4.5" />
            </button>

            {/* Desktop CTAs */}
            <div className="hidden items-center gap-2 md:flex">
              <a
                href="#experience"
                className="text-[13px] font-medium text-foreground hover:text-[#00D084] transition px-3 py-2 flex items-center gap-1.5"
              >
                <User className="h-4 w-4" />
                Login
              </a>
              <button
                onClick={() => {
                  if (onOpenBooking) {
                    onOpenBooking();
                  } else {
                    window.location.href = "/services#products-grid";
                  }
                }}
                className="rounded-full text-[13px] font-semibold flex items-center gap-1.5 px-4 py-2 transition-all hover:opacity-90 cursor-pointer"
                style={{ background: "#00D084", color: "#020403" }}
              >
                <Zap className="h-3.5 w-3.5 fill-[#020403]" />
                Book Service
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              aria-label="Menu"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass text-[#00D084]"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed inset-0 z-[60] md:hidden ${themeClass}`}
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
        <div className="flex flex-col gap-2 px-8 pt-16">
          {open &&
            NAV.map((n, i) => (
              <motion.a
                key={n.label}
                href={n.href}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.09 * i + 0.15, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border py-6 text-3xl font-semibold tracking-tight text-foreground"
              >
                {n.label}
                <ArrowUpRight className="h-6 w-6 text-muted-foreground" />
              </motion.a>
            ))}
        </div>
      </motion.div>
    </>
  );
}
