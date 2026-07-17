import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, animate, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@tanstack/react-router";
import { CustomerStoriesWall } from "./CustomerStoriesWall";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Battery,
  Bolt,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Crosshair,
  Disc,
  Gauge,
  Globe,
  Leaf,
  Mail,
  Map,
  MapPin,
  Menu,
  Minus,
  Package,
  Plus,
  Radio,
  RefreshCw,
  Settings2,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Terminal,
  TrendingUp,
  Truck,
  Upload,
  User,
  UserPlus,
  Wrench,
  X,
  Zap,
} from "lucide-react";

import hero from "@/assets/ev-scooter-hero.png";
import modelS from "@/assets/model-s.jpg";
import modelX from "@/assets/model-x.jpg";
import roadster from "@/assets/roadster.jpg";
import tech from "@/assets/tech.jpg";
import interior from "@/assets/interior.jpg";
import energy from "@/assets/energy.jpg";
import factory from "@/assets/factory.jpg";
import botanicalBg from "@/assets/botanical-bg.png";
import evScooterHero from "@/assets/ev-scooter-hero.png";
import evScooterSmall from "@/assets/ev-scooter-small.png";
import { Ecosystem } from "./Ecosystem";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------- Smooth scroll + GSAP bridge ---------------- */
function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);
}

/* ---------------- Global theme controller ---------------- */
/**
 * Drives --page-bg via ScrollTrigger scrub, tied to the Interior section pin.
 * Also exposes a "theme" (warm | mid | dark) so the fixed Nav can adapt.
 */
type Theme = "warm" | "mid" | "dark";


/* ---------------- Navigation ---------------- */
const NAV = [
  { label: "Vehicles", href: "#vehicles" },
  { label: "Technology", href: "#tech" },
  { label: "Interior", href: "#experience" },
  { label: "Warehouse", href: "#warehouse" },
  { label: "Company", href: "#company" },
];

function Nav({ theme }: { theme: Theme }) {
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
  const [siteTheme, setSiteTheme] = useState<'dark' | 'light'>('dark');

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
        // rect.top is relative to the viewport. When it reaches near the top, we switch to dark theme.
        setIsDarkBg(rect.top <= 50);
      }

      // Hide on scroll down (past 100px), show on scroll up
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
    if (hoverIdx === null) { setPill(null); return; }
    const el = itemRefs.current[hoverIdx];
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const r = el.getBoundingClientRect();
    const pr = parent.getBoundingClientRect();
    setPill({ x: r.left - pr.left, w: r.width });
  }, [hoverIdx]);

  // GSAP smooth pill slide
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

  // Mega menu data per nav item
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
          className={`mx-auto flex max-w-[1400px] items-center justify-between transition-all duration-500 ${scrolled
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
          <a href="#top" className="flex items-center gap-2 group">
            <div className="relative h-7 w-7">
              <div className="absolute inset-0 rounded-full opacity-90 blur-[1px] group-hover:opacity-100 transition" style={{ background: "linear-gradient(135deg, #00D084, #00A060)" }} />
              <div className="absolute inset-[3px] rounded-full" style={{ background: siteTheme === "light" ? "#ffffff" : "#030604" }} />
              <div className="absolute inset-[6px] rounded-full" style={{ background: "linear-gradient(135deg, #00D084, #00A060)" }} />
            </div>
            <span id="nav-logo-text" className={`text-[15px] font-semibold tracking-[0.2em] uppercase transition-colors ${siteTheme === "light" ? "text-black" : "text-white"}`}>
              MY EV SERVICES
            </span>
          </a>

          {/* Desktop Nav with Mega Menu */}
          <div className="relative hidden items-center gap-1 md:flex">
            <nav
              className="relative flex items-center gap-1"
              onMouseLeave={handleNavLeave}
            >
              <span
                ref={pillRef}
                className="pointer-events-none absolute inset-y-1 left-0 rounded-full"
                style={{
                  width: 0,
                  background: "rgba(0, 208, 132, 0.1)",
                }}
              />
              {NAV.map((n, i) => (
                <a
                  key={n.label}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  href={n.href}
                  onMouseEnter={() => handleNavEnter(i)}
                  className={`relative z-10 px-4 py-2 text-[13px] font-medium tracking-wide transition-colors flex items-center gap-1 ${hoverIdx !== null && hoverIdx !== i
                    ? "text-[#00D084]/60"
                    : "text-[#00D084]"
                    }`}
                >
                  <span style={{ position: "relative", zIndex: 1 }}>
                    {n.label}
                  </span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-300 ${hoverIdx === i ? "rotate-180" : "opacity-40"}`}
                    style={{ position: "relative", zIndex: 1 }}
                  />
                </a>
              ))}

              {/* Mega Menu Dropdown Panel — inside nav so it inherits mouse area */}
              <AnimatePresence>
                {hoverIdx !== null && (
                  <motion.div
                    key={hoverIdx}
                    initial={{ opacity: 0, y: 12, scale: 0.975 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                    onMouseEnter={() => { if (leaveTimeout.current) clearTimeout(leaveTimeout.current); }}
                    onMouseLeave={handleNavLeave}
                    className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[700px] origin-top z-50"
                  >
                    {/* Arrow pointer */}
                    <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 rounded-sm border-l border-t ${siteTheme === "light" ? "border-black/10 bg-white" : "border-white/10 bg-[#080c0a]"}`} style={{ zIndex: -1 }} />

                    {/* Glass panel */}
                    <div
                      className={`relative overflow-hidden rounded-[24px] border ${siteTheme === "light" ? "border-black/10 shadow-[0_32px_80px_rgba(0,0,0,0.15)]" : "border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.7)]"}`}
                      style={{
                        background: siteTheme === "light" ? "rgba(255, 255, 255, 0.98)" : "rgba(8, 12, 10, 0.92)",
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
                          {/* Gradients over image */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080c0a]/70" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#080c0a]/90 via-[#080c0a]/20 to-transparent" />

                          {/* Tag badge */}
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="absolute top-5 left-5 px-2.5 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[9px] uppercase tracking-[0.25em] text-[#00D084] font-bold"
                          >
                            {MEGA_MENUS[hoverIdx].featured.tag}
                          </motion.div>

                          {/* Text overlay */}
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
                          {/* Category eyebrow */}
                          <p className="text-[9.5px] uppercase tracking-[0.32em] text-[#00D084] font-bold mb-5">
                            {MEGA_MENUS[hoverIdx].label}
                          </p>

                          <div className="grid grid-cols-2 gap-x-3 gap-y-1 flex-1 content-start">
                            {MEGA_MENUS[hoverIdx].links.map((link, li) => (
                              <motion.a
                                key={link.title}
                                href="#"
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.25, delay: 0.06 + li * 0.045, ease: "easeOut" }}
                                className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 border border-transparent ${siteTheme === "light" ? "hover:bg-black/[0.03] hover:border-black/5" : "hover:bg-white/[0.055] hover:border-white/8"}`}
                              >
                                {/* Dot indicator */}
                                <div className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200 group-hover:bg-[#00D084] ${siteTheme === "light" ? "bg-black/15" : "bg-white/20"}`} />
                                <div>
                                  <span className={`block text-[13px] font-semibold transition-colors leading-tight ${siteTheme === "light" ? "text-black/80 group-hover:text-black" : "text-white/90 group-hover:text-white"}`}>
                                    {link.title}
                                  </span>
                                  <span className={`block text-[10.5px] transition-colors mt-0.5 ${siteTheme === "light" ? "text-black/40 group-hover:text-black/60" : "text-white/35 group-hover:text-white/50"}`}>
                                    {link.sub}
                                  </span>
                                </div>
                                <ArrowRight className="ml-auto h-3 w-3 text-white/0 group-hover:text-[#00D084]/70 transition-all duration-200 -translate-x-1 group-hover:translate-x-0" />
                              </motion.a>
                            ))}
                          </div>

                          {/* Bottom CTA row */}
                          <div className={`mt-5 pt-4 border-t flex items-center justify-between ${siteTheme === "light" ? "border-black/[0.07]" : "border-white/[0.07]"}`}>
                            <span className={`text-[11px] ${siteTheme === "light" ? "text-black/40" : "text-white/25"}`}>
                              Browse all {MEGA_MENUS[hoverIdx].label}
                            </span>
                            <a
                              href="#"
                              className={`inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#00D084] transition-colors duration-200 ${siteTheme === "light" ? "hover:text-black" : "hover:text-white"}`}
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
            {/* Theme Toggle Button - Always visible on all screens */}
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

            {/* Desktop CTAs */}
            <div className="hidden items-center gap-2 md:flex">
              <a href="#experience" className="text-[13px] font-medium text-[#00D084]/80 hover:text-[#00D084] transition px-3 py-2">
                Sign In
              </a>
              <a
                href="#experience"
                className="rounded-full text-[13px] font-semibold flex items-center gap-1.5 px-4 py-2 transition-all hover:opacity-90"
                style={{ background: "#00D084", color: "#020403" }}
              >
                Contact
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
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
          <span className="text-[15px] font-semibold tracking-[0.2em] text-foreground uppercase">myevservice</span>
          <button aria-label="Close" onClick={() => setOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-full glass text-foreground">
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

/* ---------------- Hero ---------------- */
function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const scooterBigRef = useRef<HTMLImageElement>(null);
  const scooterSmRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  const GREEN = "#00D084";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      /* 1 ─ blob expands from right */
      tl.fromTo(blobRef.current,
        { scaleX: 0, scaleY: 0.5, opacity: 0, transformOrigin: "right center" },
        { scaleX: 1, scaleY: 1, opacity: 1, duration: 1.1, ease: "expo.inOut" },
        0
      );

      /* 2 ─ heading chars rise */
      const chars = gsap.utils.toArray<HTMLElement>(".hchar", headingRef.current!);
      tl.fromTo(chars,
        { y: 90, opacity: 0, rotateX: -50, transformOrigin: "bottom" },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.032 },
        0.12
      );

      /* 3 ─ left panel slides from left */
      tl.fromTo(leftPanelRef.current,
        { x: -70, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 },
        0.55
      );

      /* 4 ─ big scooter sweeps in from bottom-right */
      tl.fromTo(scooterBigRef.current,
        { x: 100, y: 200, opacity: 0, scale: 0.78 },
        { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.4 },
        0.25
      );


      /* 6 ─ small scooter slides up from corner */
      tl.fromTo(scooterSmRef.current,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        1.0
      );

      /* 7 ─ scroll cue fades in */
      tl.fromTo(scrollCueRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.5
      );

      /* 8 ─ continuous float loop on big scooter */
      gsap.to(scooterBigRef.current, {
        y: -22,
        duration: 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.8,
      });

      /* 9 ─ Scroll animation: Morph heading into navbar (DISABLED FOR NOW)
      const updateMorph = () => {
        const navLogo = document.getElementById("nav-logo-text");
        if (!headingRef.current || !navLogo) return;

        // Reset transforms temporarily to get accurate unscaled bounds
        const currentTransform = headingRef.current.style.transform;
        headingRef.current.style.transform = "none";
        
        const headingRect = headingRef.current.getBoundingClientRect();
        const logoRect = navLogo.getBoundingClientRect();
        
        headingRef.current.style.transform = currentTransform;

        const scale = logoRect.width / headingRect.width;
        // Calculate raw distance
        const xDist = logoRect.left - headingRect.left;
        
        // Since the element scrolls up naturally by the height of the container over the duration of the ScrollTrigger,
        // we must compensate for that upward movement to make it land exactly on the logo.
        const scrollDistance = containerRef.current!.offsetHeight;
        const yDist = logoRect.top - headingRect.top + scrollDistance;

        gsap.to(headingRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true, // Recalculate on resize
          },
          x: () => {
            const nav = document.getElementById("nav-logo-text");
            if (!nav) return xDist;
            return nav.getBoundingClientRect().left - headingRef.current!.getBoundingClientRect().left;
          },
          y: () => {
            const nav = document.getElementById("nav-logo-text");
            if (!nav) return yDist;
            const currentScrollDist = containerRef.current!.offsetHeight;
            return nav.getBoundingClientRect().top - headingRect.top + currentScrollDist;
          },
          scale: () => {
             const nav = document.getElementById("nav-logo-text");
             if (!nav) return scale;
             return nav.getBoundingClientRect().width / headingRect.width;
          },
          transformOrigin: "left top",
          ease: "none",
        });
      };
      
      // Delay to ensure DOM is ready
      setTimeout(updateMorph, 500);
      */

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const HEADING = "THE PREMIER EV SERVICE ECOSYSTEM";

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative w-full overflow-hidden transition-colors duration-300"
      style={{ height: "100svh", minHeight: 700, background: "var(--background)" }}
    >

      {/* Custom shaped container (Green instead of orange) */}
      <div ref={blobRef} className="absolute inset-0 z-[1] pointer-events-none">
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D084" />
              <stop offset="100%" stopColor="#00B574" />
            </linearGradient>
          </defs>
          <path
            d="M 85,138 
               L 315,138 
               Q 375,138 375,198 
               Q 375,222 399,222 
               L 915,222 
               Q 975,222 975,282 
               L 975,504 
               Q 975,564 915,564 
               L 85,564 
               Q 25,564 25,504 
               L 25,198 
               Q 25,138 85,138 Z"
            fill="url(#greenGrad)"
          />
        </svg>

        {/* Ghost text inside the green shape */}
        <div
          className="absolute pointer-events-none font-black uppercase leading-[0.9] select-none"
          style={{
            fontSize: "clamp(2rem, 5.5vw, 6.2rem)",
            color: "rgba(255, 255, 255, 0.12)",
            top: "65%",
            left: "58%",
            transform: "translate(-50%, -50%)",
            letterSpacing: "-0.02em",
            fontFamily: "var(--font-sans)",
            width: "60%",
            whiteSpace: "normal",
          }}
        >
          EASY BOOKING IN<br />SECONDS
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="relative z-10 flex flex-col h-full">

        {/* HEADING */}
        <div
          ref={headingRef}
          className="w-full text-center"
          style={{
            paddingTop: "clamp(100px, 12vh, 130px)",
            zIndex: 5,
            position: "relative",
          }}
        >
          <h1
            className="m-0 p-0 leading-none transition-colors duration-300 flex justify-center flex-wrap"
            style={{
              color: "var(--foreground)",
              fontSize: "clamp(1.5rem, 4.2vw, 4.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-sans)",
            }}
          >
            {/* "THE" */}
            <span className="uppercase mr-[0.25em] inline-block">
              {"THE".split("").map((ch, i) => (
                <span key={i} className="hchar inline-block">
                  {ch}
                </span>
              ))}
            </span>

            {/* "Premier" */}
            <span 
              className="italic text-[#00D084] mr-[0.25em] inline-block"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              {"Premier".split("").map((ch, i) => (
                <span key={i} className="hchar inline-block">
                  {ch}
                </span>
              ))}
            </span>

            {/* "EV SERVICE ECOSYSTEM" */}
            <span className="uppercase inline-block">
              {"EV SERVICE ECOSYSTEM".split("").map((ch, i) => (
                <span key={i} className="hchar inline-block"
                  style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Card stack on the left (overlapping the left tab) */}
        <div
          ref={scooterSmRef}
          className="absolute z-10 pointer-events-auto"
          style={{ left: "6%", top: "28%", width: "28%" }}
        >
          <div className="bg-card rounded-2xl p-3 flex items-center gap-3 shadow-lg border border-border transition-colors duration-300" style={{ color: "var(--foreground)" }}>
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src={evScooterSmall} alt="VoltRide X1" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <div className="font-bold text-[11px] uppercase tracking-wider text-foreground">VOLTRIDE X1</div>
              <div className="text-[10px] text-muted-foreground leading-tight">VoltRide X1 is a stylish</div>
            </div>
          </div>
        </div>

        {/* BOTTOM LEFT TEXT BLOCK */}
        <div
          ref={leftPanelRef}
          className="absolute z-10 flex flex-col justify-end"
          style={{ left: "4.5%", bottom: "10%", width: "clamp(260px, 30%, 350px)" }}
        >
          <h2 className="font-black uppercase text-foreground leading-tight m-0 transition-colors duration-300"
            style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.8rem)", letterSpacing: "-0.025em", marginBottom: 12, fontFamily: "var(--font-sans)" }}
          >
            SMART MOBILITY<br />FOR EVERYONE
          </h2>
          <p className="text-muted-foreground transition-colors duration-300" style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 285 }}>
            Enjoy smooth rides, easy charging, and modern design made to simplify short trips across the city.
          </p>
        </div>

        {/* BIG SCOOTER */}
        <img
          ref={scooterBigRef}
          src={evScooterSmall}
          alt="Electric Scooter"
          className="pointer-events-none select-none block absolute z-[2]"
          style={{
            width: "clamp(480px, 50%, 980px)",
            bottom: "-90px",
            right: "5%",
            objectFit: "contain",
            filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.18))",
          }}
        />

        {/* HAPPY RIDERS STATS PILL */}
        <div
          ref={scrollCueRef}
          className="absolute z-10 flex items-center gap-3"
          style={{ right: "5%", top: "26%" }}
        >
          <div className="flex -space-x-3">
            <img className="inline-block h-9 w-9 rounded-full ring-2 ring-card object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" alt="Rider 1" />
            <img className="inline-block h-9 w-9 rounded-full ring-2 ring-card object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" alt="Rider 2" />
            <img className="inline-block h-9 w-9 rounded-full ring-2 ring-card object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" alt="Rider 3" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground leading-none">125+</span>
            <span className="text-[10px] text-muted-foreground font-medium">happy riders every day</span>
          </div>
        </div>

      </div>
    </section>
  );
}


/* ---------------- Reveal helper ---------------- */
function Reveal({ children, delay = 0, y = 40 }: { children: ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Set initial state without triggering immediateRender bugs in ScrollTrigger
      gsap.set(el, { opacity: 0, y });

      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            delay,
            ease: "expo.out"
          });
        },
        once: true
      });
    });
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} style={{ opacity: 0, transform: `translateY(${y}px)` }}>
      {children}
    </div>
  );
}

/* ---------------- Vehicle data ---------------- */
type Vehicle = {
  id: string;
  name: string;
  tag: string;
  img: string;
  spec: { k: string; v: string }[];
  desc: string;
};

const VEHICLES: Vehicle[] = [
  {
    id: "model-v", name: "Model V", tag: "Flagship Hypercar", img: hero,
    desc: "The apex of AURORA engineering. Tri-motor architecture and active aero.",
    spec: [{ k: "Range", v: "824 km" }, { k: "0-100", v: "1.9s" }, { k: "Power", v: "1,020 hp" }]
  },
  {
    id: "model-l", name: "Model L", tag: "Executive Sedan", img: modelS,
    desc: "A luxury sedan defined by silence, air suspension, and effortless torque.",
    spec: [{ k: "Range", v: "712 km" }, { k: "0-100", v: "2.4s" }, { k: "Power", v: "760 hp" }]
  },
  {
    id: "model-t", name: "Model T", tag: "Adaptive SUV", img: modelX,
    desc: "Adaptive suspension and dynamic AWD. Where the road ends, presence begins.",
    spec: [{ k: "Range", v: "648 km" }, { k: "0-100", v: "3.1s" }, { k: "Power", v: "680 hp" }]
  },
  {
    id: "roadster", name: "Roadster N", tag: "Open-Sky GT", img: roadster,
    desc: "A roofless grand tourer, tuned for the salt flats and the silk-road highways.",
    spec: [{ k: "Range", v: "998 km" }, { k: "0-100", v: "1.7s" }, { k: "Power", v: "1,180 hp" }]
  },
];

/* ---------------- Cinematic Ecosystem Overview ---------------- */
function CinematicEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.cinematic-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // Longer scroll for sequence
          pin: true,
          scrub: 1,
        }
      });

      // Initially, position them at their final horizontal spots, but hidden below screen
      gsap.set(cards[0], { y: "100vh", left: "20%", xPercent: -50, opacity: 0 });
      gsap.set(cards[1], { y: "100vh", left: "50%", xPercent: -50, opacity: 0 });
      gsap.set(cards[2], { y: "100vh", left: "80%", xPercent: -50, opacity: 0 });

      // Card 1: comes straight up from the left
      tl.to(cards[0], { y: "0vh", opacity: 1, duration: 1, ease: "power2.out" });

      // Card 2: comes straight up from the center
      tl.to(cards[1], { y: "0vh", opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5");

      // Card 3: comes straight up from the right
      tl.to(cards[2], { y: "0vh", opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      title: "For EV Owners",
      desc: "Certified Doorstep Service: Technicians come to you. Diagnosed, repaired, and signed off — without visiting a service centre.",
      desc2: "Genuine Parts, Guaranteed: Compatibility-verified parts for your exact 2W or 3W model. Warranty tracked in your account.",
      desc3: "Real-Time Job Updates: Know exactly where your technician is and when your vehicle is ready. No more waiting in the dark.",
    },
    {
      title: "For Franchise Partners",
      desc: "Launch-Ready Business: Walk into a fully-built operation. Bookings, billing, technicians, parts — all managed for you from Day 1.",
      desc2: "Transparent Earnings: Commission calculated automatically. Payout dashboard always live. No disputes, no manual reconciliation.",
      desc3: "You Own Your Territory: Geo-protected zones, your customers, your brand — backed by national infrastructure and support.",
    },
    {
      title: "The Ecosystem Edge",
      desc: "15+ Modules, One Login: Bookings, inventory, CRM, fleet, billing, and analytics — no switching tools, no fragmented data.",
      desc2: "Scales from 1 to 100 Centres: Same platform from your first franchise outlet to a citywide multi-centre network. No migration needed.",
      desc3: "AI-Assisted, Human-Controlled: Automation handles routine operations. Owners and franchisers stay in charge of every key decision.",
    }
  ];

  return (
    <section ref={containerRef} className="relative h-screen bg-[#020403] overflow-hidden flex flex-col items-center justify-center selection:bg-[#00D084] selection:text-[#020403]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00D084]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Intro Text - Top aligned, static size */}
      <div ref={textRef} className="absolute top-[8%] inset-x-0 flex flex-col items-center justify-start text-center px-6 z-10 pointer-events-none">
        <h2 className="text-4xl md:text-[5vw] font-serif text-white font-bold leading-[1.05] tracking-tight max-w-7xl">
          India Has No One<br />Doing What We Do
        </h2>
        <p className="text-white/60 text-lg md:text-2xl mt-6 max-w-4xl leading-relaxed">
          No OEM franchise. No multi-brand EV service platform. No unified ecosystem for 2W & 3W repairs, parts, and payouts — <span className="text-white">until now.</span>
        </p>
      </div>

      {/* Cards Container */}
      <div className="absolute inset-x-0 bottom-[15%] top-[40%] z-20 pointer-events-none">
        {pillars.map((pillar, i) => (
          <div key={i} className="cinematic-card absolute top-0 w-[90vw] md:w-[28vw] max-w-[400px] rounded-[24px] bg-[#0a0f0c]/90 backdrop-blur-3xl border border-white/10 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col pointer-events-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D084]/15 via-transparent to-transparent rounded-[24px] opacity-40 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h3 className="text-xl md:text-2xl font-serif text-white">{pillar.title}</h3>
              <span className="text-[#00D084] text-2xl font-light opacity-30">0{i + 1}</span>
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              {[pillar.desc, pillar.desc2, pillar.desc3].map((text, j) => {
                const [boldPart, rest] = text.split(':');
                return (
                  <div key={j} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00D084] shrink-0 mt-2 shadow-[0_0_8px_#00D084]" />
                    <p className="text-[#a1a1aa] text-sm md:text-[15px] leading-relaxed tracking-wide">
                      <span className="text-white font-medium">{boldPart}:</span>{rest}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CTAs - Centered together */}
      <div className="absolute bottom-10 z-30 flex flex-wrap justify-center gap-4 w-full px-6 pointer-events-none">
        <button className="pointer-events-auto group inline-flex items-center gap-2 rounded-full bg-[#00D084] px-8 py-4 text-[15px] font-bold text-[#020403] transition-all hover:scale-105 hover:bg-white">
          Book a Service <ArrowRight className="h-4 w-4" />
        </button>
        <button className="pointer-events-auto group inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0a0f0c] px-8 py-4 text-[15px] font-bold text-white transition-all hover:border-[#00D084]/50 hover:bg-[#00D084]/10 mt-4 md:mt-0">
          Apply for Franchise
        </button>
      </div>
    </section>
  );
}

/* ---------------- EV Services Showcase (Grid) ---------------- */
const EV_SERVICES = [
  {
    title: "Battery Health Check",
    desc: "Comprehensive battery diagnostics with cell level...",
    icon: <Battery className="h-5 w-5 text-[#00D084]" />,
    price: "₹399",
    originalPrice: "₹1,499",
    time: "45 min",
  },
  {
    title: "Motor & Controller",
    desc: "Electric motor inspection, controller diagnostics, and...",
    icon: <Gauge className="h-5 w-5 text-[#00D084]" />,
    price: "₹1,999",
    originalPrice: "₹2,999",
    time: "1h 30m",
  },
  {
    title: "Charging System",
    desc: "Charger diagnostics, port inspection, and charging spee...",
    icon: <Zap className="h-5 w-5 text-[#00D084]" />,
    price: "₹899",
    originalPrice: "₹1,299",
    time: "45 min",
  },
  {
    title: "Software Updates",
    desc: "Latest firmware updates, BMS calibration, and feature...",
    icon: <Cpu className="h-5 w-5 text-[#00D084]" />,
    price: "₹699",
    originalPrice: "₹999",
    time: "30 min",
  },
  {
    title: "Advanced Battery Diagnostic",
    desc: "Deep battery system scan with cell voltage and...",
    icon: <Activity className="h-5 w-5 text-[#00D084]" />,
    price: "₹999",
    originalPrice: "₹1,499",
    time: "1h",
  },
  {
    title: "Battery Cell Balancing",
    desc: "Equalization of battery cells to improve battery life and...",
    icon: <RefreshCw className="h-5 w-5 text-[#00D084]" />,
    price: "₹1,399",
    originalPrice: "₹1,799",
    time: "1h",
  },
];

/* ---------------- GlowCard Helper ---------------- */
interface GlowCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function GlowCard({ children, className = "", style = {} }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#080d0a] p-8 md:p-10 transition-all duration-300 hover:border-[#00D084]/30 ${className}`}
      style={style}
    >
      {/* Radial mouse glow effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 208, 132, 0.12), transparent 80%)"
        }}
      />
      {/* Radial border glow effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 border border-[#00D084]/30"
        style={{
          maskImage: "radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)",
          WebkitMaskImage: "radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)"
        }}
      />
      {children}
    </div>
  );
}

function EVServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lShapeRef = useRef<HTMLDivElement>(null);

  const handleLShapeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = lShapeRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Fade and slide up bento cards in viewport
      gsap.fromTo(".irregular-grid-item, .glow-card-stagger",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ev-services"
      ref={sectionRef}
      className="relative min-h-screen bg-[#020403] overflow-hidden flex items-center py-24 md:py-32"
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes voltPulse {
          0%, 100% { height: 50%; opacity: 0.6; }
          50% { height: 95%; opacity: 0.9; }
        }
        .voltage-bar {
          animation: voltPulse 3s ease-in-out infinite;
        }
        .voltage-bar-delay-1 {
          animation: voltPulse 3s ease-in-out infinite;
          animation-delay: 0.4s;
        }
        .voltage-bar-delay-2 {
          animation: voltPulse 3s ease-in-out infinite;
          animation-delay: 0.8s;
        }
        .voltage-bar-delay-3 {
          animation: voltPulse 3s ease-in-out infinite;
          animation-delay: 1.2s;
        }
      `}} />

      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#00D084]/5 blur-[160px] rounded-full pointer-events-none" />
      </div>

      <div className="mx-auto max-w-7xl w-full px-6 relative z-10 flex flex-col gap-16">

        {/* Section Header with Big Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 irregular-grid-item">
          <div>
            <h2 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tight">
              EXPERT<br />
              <span className="text-white font-sans font-normal">EV SERVICES</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-[#a1a1aa] text-lg leading-relaxed mb-6">
              Professional diagnostics and repairs for Electric Scooters, Bikes & Autos. Engineered for scale, speed, and maximum vehicle uptime.
            </p>
            <button className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0f0c] px-6 py-3.5 text-sm font-medium text-white transition-all hover:border-[#00D084]/40 hover:bg-[#00D084]/5">
              View all 68 services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-[#00D084]" />
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">

          {/* Card 1: Battery Health Check (Wide Rectangle) */}
          <GlowCard className="md:col-span-8 flex flex-col md:flex-row justify-between gap-6 min-h-[320px] glow-card-stagger">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#030604] border border-[#00D084]/30 mb-6">
                  <Battery className="h-5 w-5 text-[#00D084]" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Battery Health Check</h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-sm">
                  Comprehensive battery diagnostics with cell level voltage scan and capacity verification.
                </p>
              </div>
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl font-bold text-[#00D084]">Starting from ₹399</span>
                <span className="text-sm text-[#52525b] line-through">₹1,499</span>
              </div>
            </div>
            {/* Visual Panel */}
            <div className="w-full md:w-[240px] h-[180px] bg-black/40 rounded-2xl border border-white/5 p-4 flex flex-col justify-between">
              <span className="text-[10px] text-gray-500 font-mono">BMS HEALTH METRICS</span>
              <div className="flex items-center justify-between gap-4">
                <div className="h-24 w-12 border-2 border-white/20 rounded-lg p-1 relative flex flex-col justify-end">
                  <div className="w-full bg-[#00D084] rounded-sm transition-all duration-500 h-[88%]" />
                  <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-4 h-1 bg-white/20 rounded-t-sm" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex justify-between text-[11px] font-mono"><span className="text-[#a1a1aa]">Health</span><span className="text-[#00D084]">94%</span></div>
                  <div className="flex justify-between text-[11px] font-mono"><span className="text-[#a1a1aa]">Cycles</span><span className="text-white">182</span></div>
                  <div className="flex justify-between text-[11px] font-mono"><span className="text-[#a1a1aa]">Temp</span><span className="text-white">32°C</span></div>
                </div>
              </div>
              <span className="text-[10px] text-[#00D084] font-bold tracking-widest text-center mt-1">SYSTEMS PASS</span>
            </div>
          </GlowCard>

          {/* Card 2: Motor & Controller (Square) */}
          <GlowCard className="md:col-span-4 flex flex-col justify-between min-h-[320px] glow-card-stagger">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#030604] border border-[#00D084]/30 mb-6">
                <Gauge className="h-5 w-5 text-[#00D084]" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">Motor & Controller</h3>
              <p className="text-[#a1a1aa] text-sm leading-relaxed">
                Electric motor inspection, controller diagnostics, and thermal stress mapping.
              </p>
            </div>
            <div className="flex items-baseline justify-between mt-4">
              <span className="text-xl font-bold text-[#00D084]">₹1,999</span>
              <span className="text-xs text-[#a1a1aa]">1h 30m duration</span>
            </div>
          </GlowCard>

          {/* Card 3: Charging System (Tall Vertical Rectangle) */}
          <GlowCard className="md:col-span-4 flex flex-col justify-between min-h-[660px] glow-card-stagger">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#030604] border border-[#00D084]/30 mb-6">
                <Zap className="h-5 w-5 text-[#00D084]" />
              </div>
              <h3 className="text-3xl font-serif text-white mb-4">Charging System</h3>
              <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">
                Charger diagnostics, port inspection, and speed profiling to guarantee maximum safety.
              </p>

              {/* Supported protocols */}
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-[10px] uppercase tracking-wider text-[#71717a] font-bold mb-1">PROTOCOLS TESTED</span>
                <div className="flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-xs text-white">CCS2 Fast Charge</span>
                  <CheckCircle2 className="h-4 w-4 text-[#00D084]" />
                </div>
                <div className="flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-xs text-white">GB/T Standard</span>
                  <CheckCircle2 className="h-4 w-4 text-[#00D084]" />
                </div>
                <div className="flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-xs text-white">Bharat AC 001</span>
                  <CheckCircle2 className="h-4 w-4 text-[#00D084]" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase">Starting From</span>
                  <div className="text-2xl font-bold text-[#00D084]">₹899</div>
                </div>
                <span className="text-xs text-[#a1a1aa]">45 min test</span>
              </div>
              <button className="w-full rounded-full bg-white py-3 text-sm font-bold text-black transition-colors hover:bg-[#00D084] hover:text-black">
                Book Inspection
              </button>
            </div>
          </GlowCard>

          {/* L-Shape Compound Container (Software + Advanced Diagnostics) */}
          <div
            ref={lShapeRef}
            onMouseMove={handleLShapeMouseMove}
            className="md:col-span-8 relative h-[660px] group glow-card-stagger"
          >
            {/* Joined L-shape body backdrop with glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {/* Left vertical portion */}
              <div className="absolute left-0 top-0 bottom-0 w-[55%] rounded-3xl border border-white/10 bg-[#080d0a] transition-all group-hover:border-[#00D084]/30" />
              {/* Bottom horizontal portion */}
              <div className="absolute left-0 bottom-0 right-0 h-[48%] rounded-3xl border border-white/10 bg-[#080d0a] transition-all group-hover:border-[#00D084]/30" />
              {/* Overlap connector block */}
              <div className="absolute left-[1px] bottom-[1px] w-[54%] h-[47%] bg-[#080d0a]" />

              {/* Radial mouse glow across L-shape backdrop */}
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(500px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 208, 132, 0.12), transparent 80%)"
                }}
              />
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 border border-[#00D084]/30"
                style={{
                  maskImage: "radial-gradient(200px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)",
                  WebkitMaskImage: "radial-gradient(200px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)"
                }}
              />
            </div>

            {/* Left Content (Software Updates) */}
            <div className="absolute left-0 top-0 bottom-0 w-[55%] p-8 z-10 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#030604] border border-[#00D084]/30 mb-6">
                  <Cpu className="h-5 w-5 text-[#00D084]" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Software Updates</h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed">
                  Latest firmware updates, BMS calibration, and live system speed profiling.
                </p>
              </div>

              {/* Live firmware modules */}
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex justify-between items-center bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <span className="text-xs text-white">BMS Firmware</span>
                  <span className="text-[10px] bg-[#00D084]/15 text-[#00D084] px-2 py-0.5 rounded-full font-bold">v4.2.1 Active</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <span className="text-xs text-white">Telemetry OS</span>
                  <span className="text-[10px] bg-[#00D084]/15 text-[#00D084] px-2 py-0.5 rounded-full font-bold">v2.1.0 Stable</span>
                </div>
              </div>
            </div>

            {/* Bottom Right Horizontal Content */}
            <div className="absolute left-[58%] bottom-0 right-0 h-[48%] p-8 z-10 flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-[#71717a] mb-1">Calibration Status</div>
                <div className="text-lg font-bold text-white">All Systems Optimized</div>
              </div>
              <span className="text-2xl font-bold text-[#00D084]">100% OK</span>
            </div>

            {/* Nestled Square Card (Advanced Battery Diagnostic) */}
            <div className="absolute left-[58%] top-0 right-0 h-[48%] z-20">
              <GlowCard className="w-full h-full p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#030604] border border-[#00D084]/30">
                    <Activity className="h-5 w-5 text-[#00D084]" />
                  </div>
                  <span className="text-xs font-bold text-[#00D084]">₹999</span>
                </div>
                <div>
                  <h4 className="text-lg font-serif text-white mb-1">Advanced Diagnostics</h4>
                  <p className="text-[#a1a1aa] text-[11px] leading-snug">Cell voltage analysis and safety telemetry mapping.</p>
                </div>
              </GlowCard>
            </div>
          </div>

          {/* Card 6: Battery Cell Balancing (Full Width Horizontal) */}
          <GlowCard className="md:col-span-12 flex flex-col md:flex-row gap-8 justify-between items-center min-h-[300px] glow-card-stagger">
            <div className="flex-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#030604] border border-[#00D084]/30 mb-6">
                <RefreshCw className="h-5 w-5 text-[#00D084]" />
              </div>
              <h3 className="text-3xl font-serif text-white mb-3">Battery Cell Balancing</h3>
              <p className="text-[#a1a1aa] text-base leading-relaxed max-w-xl">
                Equalization of battery cells to maximize energy efficiency, overall range, and longevity. Includes active load calibration.
              </p>
              <div className="mt-6 flex items-center gap-6">
                <div>
                  <span className="text-xs text-[#71717a] block uppercase tracking-wider mb-1">Service Cost</span>
                  <span className="text-2xl font-bold text-[#00D084]">₹1,399</span>
                </div>
                <button className="rounded-full bg-[#00D084] px-8 py-3 text-sm font-bold text-black transition-transform hover:scale-105">
                  Book Balancing
                </button>
              </div>
            </div>

            {/* Animated Cells Visualization */}
            <div className="w-full md:w-[450px] bg-black/40 rounded-2xl p-6 border border-white/5 flex flex-col gap-4">
              <div className="flex justify-between items-center text-xs text-[#a1a1aa]">
                <span>Active Equalization Module</span>
                <span className="text-[#00D084] font-mono animate-pulse">● CALIBRATING</span>
              </div>
              <div className="grid grid-cols-8 gap-2 h-24 items-end">
                {[3.8, 3.9, 3.8, 4.0, 3.9, 3.8, 4.0, 3.9].map((volts, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      className={`w-full bg-[#00D084] rounded-t-sm ${idx % 4 === 0
                        ? "voltage-bar"
                        : idx % 4 === 1
                          ? "voltage-bar-delay-1"
                          : idx % 4 === 2
                            ? "voltage-bar-delay-2"
                            : "voltage-bar-delay-3"
                        }`}
                      style={{
                        height: `${(volts / 4.2) * 100}%`,
                        opacity: 0.5 + (idx % 3) * 0.15
                      }}
                    />
                    <span className="text-[9px] font-mono text-gray-500">{volts}V</span>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>

        </div>
      </div>
    </section>
  );
}

/* ---------------- Value Packages Showcase (Premium Layout) ---------------- */
function ValuePackages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mouseOverActive, setMouseOverActive] = useState<boolean>(false);
  const [mouseOverPlaceholder, setMouseOverPlaceholder] = useState<number | null>(null);

  useEffect(() => {
    // If mouse is neither over the placeholder nor the active centered card, collapse it
    if (mouseOverPlaceholder === null && !mouseOverActive) {
      const timer = setTimeout(() => {
        setHoveredIdx(null);
      }, 150); // Grace period for user to move mouse to centered card
      return () => clearTimeout(timer);
    } else if (mouseOverPlaceholder !== null) {
      setHoveredIdx(mouseOverPlaceholder);
    }
  }, [mouseOverPlaceholder, mouseOverActive]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Smooth entrance reveal for the main header elements
      gsap.fromTo(".val-header-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const packs = [
    {
      title: "Basic Care Pack",
      desc: "Essential protection for your EV",
      price: "₹999",
      oldPrice: "₹2,000",
      save: "Save 50%",
      popular: true,
      icon: <Shield className="w-6 h-6 text-[#00D084]" />,
      themeColor: "#00D084",
      features: [
        "15-Point General Inspection",
        "Brake Adjustment & Cleaning",
        "Lubrication of Moving Parts"
      ]
    },
    {
      title: "Smart Protect Pack",
      desc: "Comprehensive protection & diagnostics",
      price: "₹2,999",
      oldPrice: "₹6,000",
      save: "Save 50%",
      popular: true,
      icon: <Gauge className="w-6 h-6 text-[#10B981]" />,
      themeColor: "#10B981",
      features: [
        "Comprehensive Diagnostic Scan",
        "Battery Health & BMS Analysis",
        "Motor Controller Check"
      ]
    },
    {
      title: "Complete EV Health Pack",
      desc: "The ultimate EV health package",
      price: "₹4,499",
      oldPrice: "₹9,000",
      save: "Save 50%",
      popular: false,
      icon: <Activity className="w-6 h-6 text-[#06B6D4]" />,
      themeColor: "#06B6D4",
      features: [
        "Deep Battery Cell Balancing",
        "Thermal System Diagnostics",
        "Charger Port & Controller Test"
      ]
    },
    {
      title: "Fleet Maintenance Pack",
      desc: "Bulk service for fleet operators",
      price: "₹7,499",
      oldPrice: "₹15,000",
      save: "Save 50%",
      popular: false,
      icon: <Truck className="w-6 h-6 text-[#6366F1]" />,
      themeColor: "#6366F1",
      features: [
        "Priority Doorstep Dispatch",
        "Standardized Diagnostic Logs",
        "Multi-Vehicle Health Tracking"
      ]
    }
  ];

  const usps = [
    "Up to 40% off vs. individual booking",
    "Multi-service protection in one pack",
    "Flexible validity — activate when ready",
    "Launch prices locked — limited period only"
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-[#030704] text-white py-24 md:py-36 selection:bg-[#00D084] selection:text-black overflow-hidden transition-colors duration-700">
      {/* Background gradients that shift colors dynamically based on hovered card */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: hoveredIdx !== null
              ? `radial-gradient(circle at 50% 50%, ${packs[hoveredIdx].themeColor}12, transparent 65%)`
              : 'radial-gradient(circle at 50% 50%, rgba(0, 208, 132, 0.05), transparent 60%)'
          }}
        />
        <div className="absolute top-1/4 right-0 w-[40vw] h-[40vh] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vh] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12">

        {/* Full-width Header Block */}
        <div className="mb-20">
          <p className="val-header-reveal text-[11px] uppercase tracking-[0.3em] text-[#00D084] mb-4 font-mono font-bold">
            Value Packages
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <h2 className="val-header-reveal lg:col-span-5 text-4xl md:text-6xl font-serif font-bold tracking-tight leading-[1.05] text-white">
              More services.<br />
              <span className="text-white/40 italic">Better savings.</span>
            </h2>
            <div className="val-header-reveal lg:col-span-7 flex flex-col gap-6 md:flex-row md:items-center justify-between">
              <p className="text-lg text-white/50 leading-relaxed max-w-md">
                Pre-bundled EV care packs designed to keep your vehicle at peak performance — at prices you won't find anywhere else.
              </p>
              {/* Header CTAs */}
              <div className="flex flex-wrap gap-4 shrink-0">
                <a
                  href="#services"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#00D084] px-6 py-3 text-sm font-bold text-[#020403] transition-all hover:scale-105 hover:bg-white"
                >
                  Explore All Services <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-bold text-white transition-all hover:border-[#00D084]/50 hover:bg-[#00D084]/5"
                >
                  Talk to Us
                </a>
              </div>
            </div>
          </div>

          {/* Quick USPs banner */}
          <div className="val-header-reveal mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 border-y border-white/10 py-6">
            {usps.map((usp, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <CheckCircle2 className="h-4 w-4 text-[#00D084] shrink-0" />
                <span className="text-xs md:text-sm text-white/70 font-medium">{usp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Blur Backdrop */}
        <AnimatePresence>
          {hoveredIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-30 cursor-pointer"
              onClick={() => setHoveredIdx(null)}
            />
          )}
        </AnimatePresence>

        {/* 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
          {packs.map((pkg, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={i}
                className="relative w-full h-[200px] md:h-[190px]"
                onMouseEnter={() => setMouseOverPlaceholder(i)}
                onMouseLeave={() => setMouseOverPlaceholder(null)}
              >
                {/* Visual Card with layout transition */}
                <motion.div
                  layout
                  onMouseEnter={() => setMouseOverActive(true)}
                  onMouseLeave={() => setMouseOverActive(false)}
                  className="rounded-[28px] border p-6 md:p-8 flex flex-col justify-between overflow-hidden cursor-pointer"
                  style={isHovered ? {
                    position: "fixed",
                    inset: 0,
                    margin: "auto",
                    width: "90vw",
                    maxWidth: "480px",
                    height: "fit-content",
                    zIndex: 40,
                    borderColor: `${pkg.themeColor}50`,
                    boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 50px ${pkg.themeColor}20`,
                    backgroundColor: "#0d1410"
                  } : {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 10,
                    borderColor: "rgba(255,255,255,0.1)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                    backgroundColor: "rgba(10, 15, 12, 0.6)"
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Glow Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${pkg.themeColor}10, transparent)`
                    }}
                  />

                  {/* Always Visible Header Area */}
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4 items-center">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border transition-all duration-500"
                          style={{
                            borderColor: isHovered ? `${pkg.themeColor}50` : "rgba(255,255,255,0.1)",
                            backgroundColor: isHovered ? `${pkg.themeColor}10` : "rgba(255,255,255,0.05)"
                          }}
                        >
                          {pkg.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif text-white font-medium">
                          {pkg.title}
                        </h3>
                      </div>

                      <div className="flex flex-col gap-1 items-end shrink-0">
                        {pkg.popular && (
                          <span
                            className="text-[9px] uppercase tracking-widest font-bold px-3 py-0.5 rounded-full border"
                            style={{
                              borderColor: `${pkg.themeColor}40`,
                              backgroundColor: `${pkg.themeColor}15`,
                              color: pkg.themeColor
                            }}
                          >
                            Most Popular
                          </span>
                        )}
                        <span className="text-[9px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 text-white/60 px-3 py-0.5 rounded-full">
                          Launch Offer
                        </span>
                      </div>
                    </div>

                    {/* Slashed Pricing Row */}
                    <div className="mt-6 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-3xl md:text-4xl font-bold tracking-tight text-white">{pkg.price}</span>
                        <span className="text-base line-through text-white/30">{pkg.oldPrice}</span>
                      </div>
                      <span
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: pkg.themeColor }}
                      >
                        {pkg.save}
                      </span>
                    </div>
                  </div>

                  {/* Animated Expanded Reveal Panel */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden mt-6"
                      >
                        <div className="pt-4 border-t border-white/10 flex flex-col gap-6">
                          <p className="text-white/60 text-sm md:text-base leading-relaxed">
                            {pkg.desc}
                          </p>

                          {/* List of features */}
                          <div className="flex flex-col gap-3">
                            {pkg.features.map((feature, fIdx) => (
                              <div key={fIdx} className="flex gap-3 items-center">
                                <div
                                  className="w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{
                                    backgroundColor: pkg.themeColor,
                                    boxShadow: `0 0 8px ${pkg.themeColor}`
                                  }}
                                />
                                <span className="text-white/80 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* Bottom Row */}
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-[11px] text-white/40 font-mono">
                              Valid for 365 days
                            </span>
                            <button
                              className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300"
                              style={{
                                backgroundColor: pkg.themeColor,
                                color: "#020403"
                              }}
                            >
                              Book Package <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


/* ---------------- Vehicle storytelling ---------------- */
function VehicleStory({ v, index }: { v: Vehicle; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const imgWrap = imgWrapRef.current;
    if (!el || !imgWrap) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgWrap,
        { scale: 1.18, y: -40 },
        {
          scale: 1.0,
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const reverse = index % 2 === 1;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden py-24"
    >
      <div className={`mx-auto grid w-full max-w-[1400px] gap-12 px-6 lg:grid-cols-12 lg:gap-16 items-center`}>
        <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
          <div
            ref={imgWrapRef}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl will-change-transform group"
          >
            <img
              src={v.img}
              alt={v.name}
              loading="lazy"
              width={1920}
              height={1200}
              className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
          </div>
        </div>
        <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
          <Reveal>
            <p className="eyebrow mb-4">{v.tag}</p>
            <h2 className="text-balance text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-foreground">
              {v.name}
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground text-balance">
              {v.desc}
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {v.spec.map((s) => (
                <div key={s.k} className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {s.k}
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-foreground">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#experience" className="btn-primary">Configure</a>
              <a href="#experience" className="btn-ghost">Learn More</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Count-up stat ---------------- */
function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.4,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ---------------- Technology split ---------------- */
function TechShowcase() {
  return (
    <section id="tech" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <p className="eyebrow mb-4">Engineering Philosophy</p>
          <h2 className="max-w-3xl text-balance text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-foreground">
            Every gram considered. Every watt earned.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-8 lg:grid-cols-12 lg:gap-12 items-stretch">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-2xl lg:col-span-6 h-full group">
              <img src={tech} alt="Motor rotor" loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]" />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72), transparent 60%)" }} />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/60 mb-2 font-medium">Drive Unit</p>
                <h3 className="text-3xl font-semibold text-white">Aurora Halo Motor</h3>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6 grid gap-6">
            {[
              { icon: Cpu, title: "Neural Compute Core", body: "Custom silicon delivers 342 TOPS of real-time perception with 8ms of end-to-end latency." },
              { icon: Battery, title: "4680 Cell Architecture", body: "Structural pack integration reduces weight by 18% while enabling 350 kW peak charging." },
              { icon: Shield, title: "Machined Safety", body: "A CNC-milled monocoque exceeds every crash standard in North America and the EU." },
              { icon: Radio, title: "Silent Cabin", body: "Acoustic laminated glass and 14 microphones cancel road noise in real time." },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-elevate">
                  <div className="flex items-start gap-5">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-ember transition-transform duration-500 group-hover:rotate-6">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-lg font-semibold text-foreground">{f.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-ember/25 opacity-0 blur-3xl transition duration-700 group-hover:opacity-100" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Parts Warehouse (Holographic HUD) ---------------- */
const WAREHOUSE_CARDS = [
  {
    icon: CheckCircle2,
    img: hero, // using hero as stand-in for rickshaw
    title: "Verified parts",
    desc: "Compatibility-first catalog with service-friendly SKUs."
  },
  {
    icon: ShieldCheck,
    img: null, // Just the shield glow
    title: "Warranty support",
    desc: "Simple returns + warranty tracking for peace of mind."
  },
  {
    icon: Wrench,
    img: tech, // rotor
    title: "Service-grade quality",
    desc: "Built for technicians, franchises, and real field usage."
  }
];

function LabConfiguration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoWrapperRef.current;
    const placeholder = placeholderRef.current;
    const content = contentRef.current;
    if (!el || !video || !placeholder || !content || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=150%", // Scrolls for 1.5 viewport heights to complete animation
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true, // Recalculates starting positions if window is resized
        }
      });

      // Fade out left content
      tl.to(content, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        ease: "power2.inOut"
      }, 0);

      // Expand video to full screen
      tl.fromTo(video, {
        top: () => placeholder.getBoundingClientRect().top - el.getBoundingClientRect().top,
        left: () => placeholder.getBoundingClientRect().left - el.getBoundingClientRect().left,
        width: () => placeholder.getBoundingClientRect().width,
        height: () => placeholder.getBoundingClientRect().height,
        borderRadius: "2rem",
      }, {
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: 0,
        duration: 1,
        ease: "power2.inOut"
      }, 0);

    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] bg-[#060807] text-white flex items-center overflow-hidden">

      {/* Grid Layout Container */}
      <div className="mx-auto w-full h-full max-w-[1400px] px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center pointer-events-none">

        {/* Left Side: Content */}
        <div ref={contentRef} className="lg:col-span-5 relative z-10 flex flex-col justify-center pointer-events-auto h-full py-16">
          <h2 className="text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6">
            Step inside a<br />My EV Service<br />Centre.
          </h2>

          <p className="text-lg text-white/60 mb-12 max-w-md leading-relaxed">
            Every franchise outlet is built to a standardised lab-grade
            configuration — from service bay layout to equipment
            placement. Not improvised. Engineered.
          </p>

          <div className="flex flex-col gap-4 mb-12">
            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00D084]/10 text-[#00D084]">
                <Map className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Standardised Layout</h4>
                <p className="text-xs text-white/50">Same setup, every city</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00D084]/10 text-[#00D084]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Inspection-Ready</h4>
                <p className="text-xs text-white/50">Equipment pre specced</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00D084]/10 text-[#00D084]">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Fast to Deploy</h4>
                <p className="text-xs text-white/50">Centre-in-a-box model</p>
              </div>
            </div>
          </div>

          <button className="group inline-flex items-center gap-2 rounded-xl bg-[#00D084] px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-[#00D084]/90 w-max shadow-[0_0_20px_rgba(0,208,132,0.15)] mb-auto lg:mb-0">
            <Store className="h-4 w-4" />
            Explore Franchise
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right Side: Hidden Placeholder for Layout Coordinates */}
        <div className="lg:col-span-7 relative flex items-center justify-center h-full w-full opacity-0 pointer-events-none">
          <div ref={placeholderRef} className="relative w-full aspect-[4/3] lg:aspect-[16/11] lg:max-h-[580px]" />
        </div>
      </div>

      {/* Actual Animated Video Container */}
      <div
        ref={videoWrapperRef}
        className="absolute z-0 overflow-hidden bg-zinc-900 shadow-2xl pointer-events-auto"
      >
        <video
          src="/lab-3d-centre.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Subtle inner shadow overlay */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[inherit] pointer-events-none" />
      </div>
    </section>
  );
}




/* ---------------- Stats ---------------- */
function Stats() {
  const items = [
    { v: 1020, s: "hp", label: "Peak Output" },
    { v: 824, s: " km", label: "WLTP Range" },
    { v: 1.9, s: "s", label: "0–100 km/h", d: 1 },
    { v: 402, s: " km/h", label: "Top Speed" },
  ];
  return (
    <section className="relative overflow-hidden border-y border-border py-24">
      <div className="absolute inset-0 -z-10 opacity-50"
        style={{ background: "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--ember) 20%, transparent), transparent 60%)" }} />
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.08}>
            <div className="min-w-0">
              <div className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-foreground">
                <Counter to={it.v} suffix={it.s} decimals={it.d ?? 0} />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                {it.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}



/* ---------------- Technician Careers ---------------- */
function TechnicianCareers() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    language: "",
    profilePhoto: null as File | null,
    photoPreview: ""
  });

  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state before scroll
      gsap.set(contentRef.current, { scale: 0.85, opacity: 0.6 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });

      tl.to(contentRef.current, {
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        duration: 1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        profilePhoto: file,
        photoPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setIsOpen(false);
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      city: "",
      language: "",
      profilePhoto: null,
      photoPreview: ""
    });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[var(--background)] text-white flex items-center justify-center overflow-hidden selection:bg-[#00D084] selection:text-[#020403]">
      {/* 16:9 Container */}
      <div ref={contentRef} className="w-full max-w-[1280px] aspect-video flex flex-col gap-5 relative px-4 md:px-0">
        
        {/* Top Row: Left & Right Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-5 min-h-0">
          
          {/* Top Left Card */}
          <div className="md:col-span-7 bg-[#0a0f0c] border border-white/10 rounded-2xl overflow-hidden flex flex-col relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D084]/5 to-transparent pointer-events-none" />
            <div className="h-[20%] relative shrink-0 overflow-hidden">
              <img src={factory} alt="EV Service Centre" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
            </div>
            
            <div className="flex-1 p-5 md:p-6 flex flex-col z-10 overflow-hidden">
              <div className="mb-3">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#00D084]/20 bg-[#00D084]/5 px-2.5 py-0.5 mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#00D084] font-medium flex items-center gap-1.5 font-mono">
                    <UserPlus className="w-3.5 h-3.5" /> Join as Technician
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-1">Work with My EV Services</h3>
                <p className="text-[#a1a1aa] text-[13px] leading-relaxed max-w-sm">Get jobs, route guidance, QR-based inventory, and a professional workflow built for field technicians.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <h4 className="text-white text-[13px] font-medium mb-0.5">Smart dispatch</h4>
                  <p className="text-xs text-[#71717a] leading-tight">Accept/assigned jobs, on-time completion tracking.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <h4 className="text-white text-[13px] font-medium mb-0.5">QR inventory</h4>
                  <p className="text-xs text-[#71717a] leading-tight">Scan IN + USE items; no manual stock edits.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <h4 className="text-white text-[13px] font-medium mb-0.5">Earnings dashboard</h4>
                  <p className="text-xs text-[#71717a] leading-tight">Track income, completed jobs, and payouts in-app.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <h4 className="text-white text-[13px] font-medium mb-0.5">Live routing</h4>
                  <p className="text-xs text-[#71717a] leading-tight">Shortest route, real-time updates, fewer delays.</p>
                </div>
              </div>

              <div className="flex gap-3 mt-auto pt-2">
                <button onClick={() => setIsOpen(true)} className="bg-[#00D084] hover:bg-[#00b574] text-[#020403] px-5 py-2 text-[13px] rounded-full font-bold transition-all shadow-[0_4px_20px_rgba(0,208,132,0.25)] flex items-center gap-2 cursor-pointer">
                  Start Onboarding <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(true)} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2 text-[13px] rounded-full font-semibold transition-all flex items-center gap-2 cursor-pointer">
                  View Careers <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Top Right Card */}
          <div className="md:col-span-5 bg-[#0a0f0c] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-bl from-[#00D084]/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full overflow-hidden">
              <h3 className="text-2xl font-semibold mb-2">Why people choose My EV Services</h3>
              <p className="text-[#a1a1aa] text-sm mb-8">Built for technicians who want a smarter, steadier career.</p>
              
              <ul className="space-y-5 flex-1">
                {[
                  { icon: ShieldCheck, title: "Professional workflow", desc: "Clear steps, checklists, and customer-ready reports." },
                  { icon: Wrench, title: "Tools + training", desc: "Standardized processes and quality-first service culture." },
                  { icon: Package, title: "Parts availability", desc: "Faster repairs with warehouse and franchise stock flows." },
                  { icon: TrendingUp, title: "Steady income flow", desc: "Regular jobs, transparent commission payouts every cycle." },
                  { icon: Cpu, title: "Tech-first ops", desc: "Digital job cards, no paperwork, everything tracked in-app." },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-[#00D084]/10 border border-[#00D084]/20 flex items-center justify-center">
                      <item.icon className="w-3.5 h-3.5 text-[#00D084]" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">{item.title}</h4>
                      <p className="text-xs text-[#71717a] mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Card */}
        <div className="h-[25%] shrink-0 rounded-2xl overflow-hidden relative flex items-center p-6 md:p-8 bg-[#0a0f0c] border border-white/10 group">
          <img src={tech} alt="Inside My EV Services" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity transition-transform group-hover:scale-105 duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030604] via-[#030604]/80 to-transparent" />
          
          <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="max-w-md text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-2 keep-white">Ready to accelerate your career?</h2>
              <p className="text-[#a1a1aa] text-sm">Join India's fastest growing multi-brand EV service network.</p>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="flex gap-8 hidden sm:flex">
                <div className="text-left">
                  <div className="text-4xl text-[#00D084] font-bold tracking-tight mb-0.5">~45<span className="text-xl tracking-normal"> min</span></div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mt-1">Avg. Job Completion</div>
                </div>
                <div className="text-left">
                  <div className="text-4xl text-[#00D084] font-bold tracking-tight mb-0.5">94%<span className="text-xl tracking-normal"></span></div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mt-1">Job Acceptance Rate</div>
                </div>
              </div>
              
              <button onClick={() => setIsOpen(true)} className="bg-white hover:bg-gray-100 text-black px-8 py-4 text-sm rounded-full font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
                Apply as Technician <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Popup/Bottom Sheet Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleReset}
              className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md cursor-pointer"
            />

            {/* Bottom sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 inset-x-0 z-[101] mx-auto max-w-2xl w-full rounded-t-[2.5rem] border-t border-white/10 bg-[#0a0f0c] p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              {/* Drag Handle indicator */}
              <div className="w-12 h-1 rounded-full bg-white/15 mx-auto mb-6 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={handleReset}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-all text-white/45 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                      Technician Application
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 font-light">
                      Provide your basic details to start your onboarding journey.
                    </p>
                  </div>

                  {/* Input Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                          className="w-full bg-white/[0.03] border border-white/5 focus:border-[#00D084]/40 focus:bg-white/[0.05] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-muted-foreground/60 transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="john@example.com"
                          className="w-full bg-white/[0.03] border border-white/5 focus:border-[#00D084]/40 focus:bg-white/[0.05] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-muted-foreground/60 transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* City */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="Mumbai, Bengaluru, etc."
                          className="w-full bg-white/[0.03] border border-white/5 focus:border-[#00D084]/40 focus:bg-white/[0.05] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-muted-foreground/60 transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* Language */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Preferred Language</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={formData.language}
                          onChange={e => setFormData(prev => ({ ...prev, language: e.target.value }))}
                          placeholder="Hindi, English, etc."
                          className="w-full bg-white/[0.03] border border-white/5 focus:border-[#00D084]/40 focus:bg-white/[0.05] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-muted-foreground/60 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Profile Photo */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Profile Photo</label>
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                      <div className="w-16 h-16 rounded-full border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center shrink-0">
                        {formData.photoPreview ? (
                          <img src={formData.photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold cursor-pointer text-white transition-all">
                          <Upload className="w-3.5 h-3.5" /> Select Photo
                          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </label>
                        <p className="text-[10px] text-muted-foreground mt-1.5 font-light">
                          {formData.profilePhoto ? formData.profilePhoto.name : "PNG, JPG up to 5MB."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#00D084] text-[#020403] hover:bg-[#00b574] font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(0,208,132,0.25)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Submit Application <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#00D084]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm mb-8 font-light leading-relaxed">
                    Thank you for applying, <span className="text-white font-medium">{formData.name}</span>. Our recruitment team will review your profile and contact you soon.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-all cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- Parts Warehouse Holographic SVGs ---------------- */
interface SVGProps {
  className?: string;
}

function RickshawSVG({ className = "w-40 h-40 text-[#00D084]" }: SVGProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="glowGradRick" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D084" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00D084" stopOpacity="0.1" />
        </linearGradient>
        <filter id="glowRick" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path d="M15 75 L30 30 H65 L85 55 L85 75 Z" stroke="currentColor" strokeWidth="2" filter="url(#glowRick)" />
      <path d="M30 30 L40 50 H65 V30 Z" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <path d="M48 50 H75 V75 H48 Z" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="75" x2="88" y2="75" stroke="currentColor" strokeWidth="3" />
      <circle cx="28" cy="80" r="8" stroke="currentColor" strokeWidth="2.5" fill="#030604" />
      <circle cx="28" cy="80" r="3" fill="currentColor" />
      <circle cx="70" cy="80" r="8" stroke="currentColor" strokeWidth="2.5" fill="#030604" />
      <circle cx="70" cy="80" r="3" fill="currentColor" />
      <polygon points="15,62 5,60 5,68 15,65" fill="url(#glowGradRick)" opacity="0.6" />
      <circle cx="15" cy="63.5" r="2" fill="currentColor" filter="url(#glowRick)" />
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
      <line x1="15" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

function ShieldHoloSVG({ className = "w-36 h-36 text-[#00D084]" }: SVGProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glowShield" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D084" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00D084" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d="M50 15 C65 15 80 20 80 35 C80 60 50 85 50 85 C50 85 20 60 20 35 C20 20 35 15 50 15 Z" fill="url(#shieldGrad)" />
      <path d="M50 15 C65 15 80 20 80 35 C80 60 50 85 50 85 C50 85 20 60 20 35 C20 20 35 15 50 15 Z" stroke="currentColor" strokeWidth="2" filter="url(#glowShield)" />
      <path d="M50 22 C61 22 72 26 72 37 C72 56 50 76 50 76 C50 76 28 56 28 37 C28 26 39 22 50 22 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
      <path d="M38 50 L46 58 L62 42" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glowShield)" />
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.25" className="animate-pulse" />
    </svg>
  );
}

/* ---------------- Parts Warehouse — Cinematic Automotive Experience ---------------- */
function PartsWarehouse() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  
  const listRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      num: "01",
      title: "Fast Delivery",
      desc: "Optimized dispatch for franchises and doorstep service flows. Parts reach your service bay same-day across our national logistics network.",
    },
    {
      num: "02",
      title: "Verified Parts",
      desc: "Compatibility-first catalog with service-friendly SKUs. Every part verified across 150+ EV models — 2W, 3W, and fleet vehicles.",
    },
    {
      num: "03",
      title: "Warranty Support",
      desc: "Simple returns + warranty tracking for total peace of mind. Automated claims, digital receipts, and real-time replacement status.",
    },
    {
      num: "04",
      title: "Service-Grade Quality",
      desc: "Built for technicians, franchises, and real field usage. Stress-tested components that meet OEM-grade quality standards.",
    },
  ];

  /* --- Quadratic Bezier position calculator for arc dots --- */
  /* Path: M 300 0 Q 520 450 300 900  (P0, P1, P2) — mirrored curve bulging to the right */
  const arcP0 = { x: 300, y: 0 };
  const arcP1 = { x: 520, y: 450 };
  const arcP2 = { x: 300, y: 900 };
  const bezierPoint = (t: number) => ({
    x: Math.pow(1 - t, 2) * arcP0.x + 2 * t * (1 - t) * arcP1.x + t * t * arcP2.x,
    y: Math.pow(1 - t, 2) * arcP0.y + 2 * t * (1 - t) * arcP1.y + t * t * arcP2.y,
  });

  /* Center point on the arc */
  const centerDot = bezierPoint(0.5);

  /* --- GSAP ScrollTrigger pin --- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: "warehouse-cinematic",
        trigger: el,
        start: "top top",
        end: "+=350%",
        pin: true,
        scrub: 1.8,
        anticipatePin: 1,
        snap: {
          snapTo: [0, 0.333, 0.666, 1],
          duration: { min: 0.35, max: 0.75 },
          delay: 0.04,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const p = self.progress;
          const idx = p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3;
          setActiveIndex(idx);
          
          // Continuous vertical list scroll
          if (listRef.current) {
            const yOffset = -p * 3 * 160; 
            gsap.set(listRef.current, { y: yOffset });
          }

          // Dynamic scale/blur for each item
          itemsRef.current.forEach((el, i) => {
            if (!el) return;
            const activePos = p * 3; 
            const dist = Math.abs(activePos - i);
            const scale = Math.max(0.7, 1 - dist * 0.3);
            const opacity = Math.max(0, 1 - dist * 0.85);
            const blurAmt = Math.min(10, dist * 10);

            gsap.set(el, { 
              scale,
              opacity,
              filter: `blur(${blurAmt}px)`,
              transformOrigin: "left center"
            });
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  /* --- Animate card panel content --- */
  useEffect(() => {
    // The text carousel is now handled smoothly in onUpdate.
  }, [activeIndex]);

  /* --- Click-to-scroll to feature --- */
  const handleDotClick = (idx: number) => {
    const trigger = ScrollTrigger.getById("warehouse-cinematic");
    if (!trigger) return;
    const startY = trigger.start as number;
    window.scrollTo({
      top: startY + (idx / 3 + 0.04) * 3.5 * window.innerHeight,
      behavior: "smooth",
    });
  };

  /* Progress fraction for arc luminous overlay */
  const arcProgress = activeIndex / 3;
  /* Estimated arc path length (Q bezier approx.) */
  const ARC_LEN = 1100;

  return (
    <section
      ref={containerRef}
      id="warehouse"
      className="relative h-screen bg-black overflow-hidden flex items-center"
    >
      {/* ── Ambient radial glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[380px] h-[680px] rounded-full bg-[#00D084]/4 blur-[140px]" />
        <div
          className="absolute right-[28%] top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full blur-[100px] transition-all duration-1000"
          style={{ background: `rgba(0,208,132,${0.03 + activeIndex * 0.01})` }}
        />
      </div>

      {/* ── Full-height Arc Rail SVG (centered between columns, shifted left) ── */}
      <div className="warehouse-arc-rail absolute left-1/2 -translate-x-1/2 ml-[-250px] top-0 bottom-0 w-[600px] pointer-events-none z-20">
        <svg
          viewBox="0 0 600 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Dot glow */}
            <filter id="dotGlowF" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Arc path for dots and textPath */}
            <path id="arcMotionPath" d="M 300 0 Q 520 450 300 900" />
          </defs>

          {/* Main arc — clean white line */}
          <path
            d="M 300 0 Q 520 450 300 900"
            className="arc-main-line"
            stroke="white"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Progress overlay — brighter white as user scrolls */}
          <path
            d="M 300 0 Q 520 450 300 900"
            className="arc-main-line"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={ARC_LEN}
            strokeDashoffset={ARC_LEN - arcProgress * ARC_LEN}
            style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)" }}
            opacity="0.9"
          />

          {/* 1 static navigation dot in the center of the arc */}
          <g className="pointer-events-auto">
            {/* Mid ring — white */}
            <circle
              cx={centerDot.x} cy={centerDot.y}
              r={9}
              fill="none"
              stroke="white"
              strokeWidth={1}
              opacity={0.4}
              className="arc-dot"
            />
            {/* Core — white (Pulses slightly using the dotGlow filter) */}
            <circle
              cx={centerDot.x} cy={centerDot.y}
              r={3.5}
              fill="white"
              opacity={0.95}
              className="arc-dot"
              filter="url(#dotGlowF)"
            />
          </g>
        </svg>
      </div>

      {/* ── Main content grid (no more left-padding hack) ── */}
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center h-full relative z-10">

        {/* Left: Typography column */}
        <div className="lg:col-span-5 flex flex-col justify-center h-full py-12">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/20 bg-[#00D084]/5 px-4 py-1.5 mb-8 w-max">
            <Store className="w-3.5 h-3.5 text-[#00D084]" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#00D084] font-medium font-mono">
              Multi-brand parts warehouse
            </span>
          </div>

          {/* Static heading */}
          <h2 className="text-3xl md:text-4xl font-sans font-medium tracking-tight text-white leading-snug mb-4 dark:text-white light:text-black">
            Genuine parts.<br />
            Fast delivery.<br />
            <span className="text-[#00D084]">Verified compatibility.</span>
          </h2>

          {/* Luminous divider */}
          <div className="relative w-10 h-px my-7 overflow-visible">
            <div className="absolute inset-0 bg-[#00D084]/30" />
            <div className="absolute inset-0 bg-[#00D084] blur-[4px] opacity-60" />
          </div>

          {/* Dynamic feature block and CTA moved to right column */}
        </div>

        {/* Right: Dynamic Feature Text & Premium Diagnostic Viewport Panel */}
        <div className="lg:col-span-7 flex items-center justify-between gap-8 pl-10">
          
          {/* Active feature animated block & CTA (Moved to the right of curve) */}
          <div className="flex flex-col justify-center max-w-[340px] z-30">
            <div className="relative h-[160px] w-full overflow-visible">
              <div ref={listRef} className="absolute inset-x-0 top-0 flex flex-col items-start w-full">
                {steps.map((step, i) => (
                  <div 
                    key={i} 
                    ref={(el) => { itemsRef.current[i] = el; }}
                    className="warehouse-step-item w-full h-[160px] flex flex-col justify-center shrink-0"
                  >
                    <span className="text-[13px] md:text-[14px] font-mono text-[#00D084]/65 tracking-[0.3em] uppercase block mb-2">
                      {step.num} / 04
                    </span>
                    <h3 className="text-2xl md:text-[1.75rem] font-sans font-semibold text-white leading-snug mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[#a1a1aa] text-sm md:text-[0.9rem] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA */}
            <div className="flex flex-wrap gap-3 mt-16">
              <button className="bg-[#00D084] hover:bg-[#00b574] text-black px-6 py-3 text-sm rounded-full font-bold transition-all duration-200 shadow-[0_4px_24px_rgba(0,208,132,0.28)] hover:shadow-[0_4px_32px_rgba(0,208,132,0.45)] flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap">
                Shop Parts <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 text-sm rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap">
                <Package className="w-4 h-4 text-white/55" />
                Browse Categories
              </button>
            </div>
          </div>

          {/* Diagnostic Viewport Panel */}
          <div className="warehouse-panel relative w-full aspect-[3/3.6] max-w-[340px] shrink-0 border border-white/8 bg-black/85 backdrop-blur-2xl overflow-hidden flex items-center justify-center">

            {/* Grid texture */}
            <div className="absolute inset-0 grid-scanner-bg opacity-55 pointer-events-none" />

            {/* Emerald ambient background glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[45%] rounded-full blur-[80px] pointer-events-none transition-opacity duration-1000"
              style={{ background: "rgba(0,208,132,0.06)" }}
            />

            {/* Scanline overlay */}
            <div className="absolute inset-x-0 h-2 bg-[#00D084]/12 blur-[3px] top-0 animate-scanline pointer-events-none" />
            <div className="absolute inset-x-0 h-px bg-white/25 top-0 animate-scanline pointer-events-none" />

            {/* Corner brackets */}
            <div className="absolute top-5 left-5 w-5 h-5 border-t border-l border-[#00D084]/45" />
            <div className="absolute top-5 right-5 w-5 h-5 border-t border-r border-[#00D084]/45" />
            <div className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-[#00D084]/45" />
            <div className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-[#00D084]/45" />

            {/* HUD top label */}
            <div className="warehouse-hud-label absolute top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-[0.32em] text-[#00D084]/50 uppercase select-none whitespace-nowrap">
              [ SYSTEM VIEWPORT v2.0 ]
            </div>

            {/* Feature label top-left */}
            <div className="absolute top-[3.2rem] left-7 text-[8px] font-mono text-[#00D084]/45 select-none tracking-[0.15em] uppercase transition-all duration-400">
              FEAT:{steps[activeIndex].num} · {steps[activeIndex].title.toUpperCase()}
            </div>

            {/* Status LEDs top-right */}
            <div className="absolute top-[3.2rem] right-7 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] block animate-pulse" />
                <span className="text-[8px] font-mono text-[#00D084]/45">SYS.ONLINE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D084]/60 block animate-pulse" style={{ animationDelay: "0.6s" }} />
                <span className="text-[8px] font-mono text-[#00D084]/45">CAT.ACTIVE</span>
              </div>
            </div>

            {/* Rotating scanner rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[82%] h-[82%] rounded-full border border-[#00D084]/5 border-dashed animate-[spin_70s_linear_infinite]" />
              <div className="absolute w-[55%] h-[55%] rounded-full border border-[#00D084]/5 border-dashed animate-[spin_45s_linear_infinite_reverse]" />
            </div>

            {/* Coordinate labels bottom */}
            <div className="warehouse-coord-label absolute bottom-5 left-7 text-[8px] font-mono text-[#9ca3af]/50 select-none">
              COORD: <span className="text-[#00D084]/65">28.614 // 77.209</span>
            </div>
            <div className="absolute bottom-5 right-7 text-[8px] font-mono text-[#00D084]/50 flex items-center gap-1.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] inline-block animate-pulse" />
              SCANNER ACTIVE
            </div>

            {/* ── Morphing content with crossfade ── */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-8 pt-16 pb-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, y: -12, filter: "blur(2px)" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {activeIndex === 0 && (
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-72 h-72 rounded-full bg-[#00D084]/7 blur-[70px] pointer-events-none" />
                      <img
                        src={evScooterSmall}
                        alt="EV Scooter"
                        className="w-[290px] h-[290px] object-contain animate-float drop-shadow-[0_20px_50px_rgba(0,208,132,0.22)]"
                      />
                    </div>
                  )}
                  {activeIndex === 1 && (
                    <div className="relative flex items-center justify-center animate-float-delayed">
                      <div className="absolute w-60 h-60 rounded-full bg-[#00D084]/6 blur-[55px] pointer-events-none" />
                      <RickshawSVG className="w-[270px] h-[270px] text-[#00D084]" />
                    </div>
                  )}
                  {activeIndex === 2 && (
                    <div className="relative flex items-center justify-center animate-float">
                      <div className="absolute w-56 h-56 rounded-full bg-[#00D084]/6 blur-[55px] pointer-events-none" />
                      <ShieldHoloSVG className="w-[245px] h-[245px] text-[#00D084]" />
                    </div>
                  )}
                  {activeIndex === 3 && (
                    <div className="relative flex items-center justify-center animate-float-delayed">
                      <div className="absolute w-64 h-64 rounded-full bg-[#00D084]/7 blur-[65px] pointer-events-none" />
                      <div className="relative w-[220px] h-[220px] rounded-full border border-white/8 overflow-hidden bg-black p-2">
                        <div className="absolute inset-0 rounded-full border border-[#00D084]/30 border-dashed animate-[spin_40s_linear_infinite]" />
                        <img
                          src={tech}
                          alt="Brake Rotor"
                          className="w-full h-full object-cover rounded-full opacity-85 contrast-125 saturate-50"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Scanner sweep overlay — fires on each feature change */}
            <AnimatePresence>
              <motion.div
                key={`sweep-${activeIndex}`}
                initial={{ y: "-110%", opacity: 1 }}
                animate={{ y: "210%", opacity: 0 }}
                transition={{ duration: 0.72, ease: "linear" }}
                className="absolute inset-x-0 h-10 pointer-events-none z-30"
                style={{
                  background: "linear-gradient(to bottom, transparent, rgba(0,208,132,0.18) 40%, rgba(0,208,132,0.12) 60%, transparent)",
                }}
              />
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}

/* ---------------- Resources Journey ---------------- */
const RESOURCES = [
  {
    id: "webinars",
    eyebrow: "Webinars",

    title: "Learn the EV playbook.",
    desc: "Live sessions + on-demand replays on diagnostics, service workflows, and operations.",
    img: hero,
    cardTitle: "Franchise Partner Onboarding",
    cardDesc: "Complete walkthrough of franchise setup, inventory management, technician hiring, and customer acquisition strategies.",
    tags: ["On-demand", "Open"]
  },
  {
    id: "news",
    eyebrow: "News & Updates",
    title: "Track what we ship.",
    desc: "Announcements, product launches, and service improvements — designed for scale.",
    img: factory,
    cardTitle: "Multi-Brand EV Service Centre Opportunity in Pune | City Launch by MY EV SERVICE",
    cardDesc: "Discover the Pune city launch of MY EV SERVICE’s multi-brand EV service centre opportunity. Explore high-demand PIN code areas, EV market potential, and how to",
    tags: ["Company", "Read"]
  }
];

function ResourcesJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        }
      });

      tl.to(track, {
        xPercent: -50,
        ease: "none",
      }, 0);

      // Progress bar animation
      tl.fromTo('.progress-fill',
        { scaleX: 0 },
        { scaleX: 1, ease: "none" },
        0
      );

      // Fade up inner elements
      const cards = gsap.utils.toArray('.resource-content');
      cards.forEach((card: any, index: number) => {
        tl.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          },
          index * 0.3 // stagger their fade-in via the scrub timeline
        );
      });

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-[#030604] overflow-hidden flex items-center">
      <div ref={trackRef} className="flex w-[200vw] h-full will-change-transform">
        {RESOURCES.map((res, i) => (
          <div key={res.id} className="w-[100vw] h-full relative flex items-center justify-center p-6 md:p-12 lg:p-24">

            {/* Background Image with Parallax & Gradients */}
            <div className="absolute inset-0 z-0">
              <img src={res.img} alt={res.title} className="w-full h-full object-cover opacity-20 filter grayscale blur-[2px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030604] via-[#030604]/80 to-[#030604]/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030604] via-[#030604]/40 to-[#030604]" />
            </div>

            <div className="resource-content relative z-10 w-full max-w-[1400px] flex flex-col md:flex-row gap-12 lg:gap-24 items-center opacity-0 translate-y-12">

              {/* Text Content */}
              <div className="md:w-1/2 flex flex-col">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/20 bg-[#00D084]/5 px-4 py-1.5 mb-8 w-max">
                  <span className="text-[11px] uppercase tracking-widest text-[#00D084] font-medium keep-white">
                    {res.eyebrow}
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-[1.1] tracking-tight text-balance keep-white">
                  {res.title}
                </h2>
                <p className="text-[#a1a1aa] text-lg md:text-xl leading-relaxed max-w-md">
                  {res.desc}
                </p>
              </div>

              {/* Card Content */}
              <div className="md:w-1/2 w-full">
                <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0f0c]/80 backdrop-blur-2xl p-8 md:p-12 transition-all hover:bg-white/[0.04] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00D084]/5 to-transparent pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full min-h-[280px]">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-snug">
                      {res.cardTitle}
                    </h3>
                    <p className="text-[#a1a1aa] text-base leading-relaxed mb-10">
                      {res.cardDesc}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                      <span className="text-[11px] uppercase tracking-widest text-[#71717a] font-medium">
                        {res.tags[0]}
                      </span>
                      <button className="flex items-center gap-2 text-sm font-bold text-[#00D084] group-hover:text-white transition-colors">
                        {res.tags[1]}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Progress Track */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[200px] h-[2px] bg-white/10 rounded-full overflow-hidden z-20">
        <div className="progress-fill h-full w-full bg-[#00D084] origin-left" />
      </div>
    </section>
  );
}

/* ---------------- Factory parallax ---------------- */
function Factory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -80]);
  return (
    <section ref={ref} id="company" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-4">Behind the Build</p>
              <h2 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-balance text-foreground">
                Made where it's driven.
              </h2>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                Six vertically-integrated gigafactories on three continents.
                Robotic precision, human oversight — every Aurora is built
                by 342 people and 1,140 machines.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <motion.div style={{ y: y1 }} className="aspect-[3/4] overflow-hidden rounded-2xl">
              <img src={factory} alt="Robotic assembly" loading="lazy" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div style={{ y: y2 }} className="aspect-[3/4] overflow-hidden rounded-2xl mt-12">
              <img src={tech} alt="Motor detail" loading="lazy" className="h-full w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Comparison ---------------- */
function Compare() {
  const [active, setActive] = useState<string>("model-v");
  return (
    <section id="vehicles" className="relative py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <Reveal>
          <p className="eyebrow mb-4">The Range</p>
          <h2 className="max-w-2xl text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-balance text-foreground">
            Four vehicles. One philosophy.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {VEHICLES.map((v, i) => {
            const isActive = active === v.id;
            return (
              <Reveal key={v.id} delay={i * 0.06}>
                <button
                  onClick={() => setActive(v.id)}
                  onMouseEnter={() => setActive(v.id)}
                  className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl text-left transition-all duration-700 hover:-translate-y-1 ${isActive ? "ring-1 ring-ember/60 shadow-elevate" : "ring-1 ring-foreground/10"
                    }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={v.img}
                      alt={v.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.35) 40%, transparent 70%)" }} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-ember">{v.tag}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{v.name}</h3>
                    <motion.div
                      initial={false}
                      animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/15 pt-4">
                        {v.spec.map((s) => (
                          <div key={s.k} className="min-w-0">
                            <div className="text-[9px] uppercase tracking-[0.2em] text-white/55">
                              {s.k}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-white">{s.v}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
const TESTIMONIALS = [
  { q: "The diagnostic accuracy is unmatched. They detected a micro-fault in our fleet's battery cells before it caused downtime. Pure engineering excellence.", a: "Rahul Sharma", r: "Fleet Director, MoveEV", img: "https://i.pravatar.cc/150?img=11" },
  { q: "myevservice didn't just fix the hardware, they upgraded our entire telematics stack. A true premium ecosystem.", a: "Ananya Desai", r: "Operations Lead, GreenTransit", img: "https://i.pravatar.cc/150?img=5" },
  { q: "Finally, a service center that understands the software architecture of modern 3Ws. Extremely fast turnaround.", a: "Vikram Mehta", r: "Logistics Manager", img: "https://i.pravatar.cc/150?img=60" },
  { q: "The transparency and precision of their AI-driven diagnostics is the future of EV maintenance. Exceptional care.", a: "Priya Patel", r: "Independent Owner", img: "https://i.pravatar.cc/150?img=47" },
  { q: "We shifted our entire 200+ fleet to myevservice. The reduction in maintenance overhead has been incredible.", a: "Arjun Reddy", r: "CEO, VoltDelivery", img: "https://i.pravatar.cc/150?img=33" }
];



const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive(prev => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  const paginate = (newDirection: number) => {
    setActive(prev => {
      let next = prev + newDirection;
      if (next < 0) next = TESTIMONIALS.length - 1;
      if (next >= TESTIMONIALS.length) next = 0;
      return next;
    });
  };

  return (
    <section className="relative w-full bg-[#030604] py-32 md:py-48 flex justify-center min-h-[85vh] overflow-hidden selection:bg-[#00D084] selection:text-[#020403]">
      <div className="max-w-[1200px] w-full px-8 md:px-16 mx-auto relative flex flex-col justify-center h-full">

        {/* Massive Metallic Quote Icon */}
        <div
          className="absolute top-0 right-4 md:right-16 text-[200px] md:text-[300px] font-serif leading-none select-none pointer-events-none drop-shadow-2xl"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #404040 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: 0.9,
            lineHeight: 0.5
          }}
        >
          ”
        </div>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="relative z-10 w-full md:w-[90%] mt-16 mb-32 cursor-grab active:cursor-grabbing"
        >
          <div className="relative min-h-[250px] w-full flex items-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center text-3xl md:text-[40px] lg:text-[48px] font-serif leading-[1.35] tracking-tight text-white w-full"
              >
                “{TESTIMONIALS[active].q}”
              </motion.h2>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mt-auto border-t border-white/5 pt-8 z-10">
          {/* Author Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-5"
            >
              <img
                src={TESTIMONIALS[active].img}
                alt={TESTIMONIALS[active].a}
                className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-full object-cover grayscale opacity-90 border border-white/10"
              />
              <div className="flex flex-col">
                <span className="text-white font-semibold text-lg md:text-xl tracking-tight mb-1">{TESTIMONIALS[active].a}</span>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{TESTIMONIALS[active].r}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots matching the design */}
          <div className="flex items-center gap-2.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-700 ease-out ${active === i ? "w-6 bg-[#00D084]" : "w-2 bg-white/15 hover:bg-white/30"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  { q: "When can I take delivery?", a: "Reservations placed today are estimated for Q3 2026 delivery in North America, and Q1 2027 in Europe and Asia-Pacific." },
  { q: "Is charging included?", a: "Every Aurora comes with three years of complimentary charging across our 4,200-station Aurora Grid network." },
  { q: "What is the warranty?", a: "8 years or 240,000 km on the battery and drive unit. 4 years or 80,000 km bumper-to-bumper." },
  { q: "Can I service my Aurora anywhere?", a: "Yes. Mobile Service technicians handle 82% of repairs at your home or office. Certified centers cover the rest." },
  { q: "Do you offer trade-ins?", a: "We accept all makes and models. Our valuation team responds within 24 hours." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="eyebrow mb-4">Questions</p>
          <h2 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-balance text-foreground">
            Answers, engineered.
          </h2>
        </Reveal>
        <div className="mt-16 divide-y divide-border">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="text-lg md:text-xl font-medium text-foreground transition-colors group-hover:text-ember">{f.q}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-strong text-foreground transition-transform duration-500 group-hover:rotate-90">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 max-w-2xl text-muted-foreground">{f.a}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section className="relative overflow-hidden py-40">
      <div className="absolute inset-0 -z-10">
        <img src={roadster} alt="" loading="lazy" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, var(--background), color-mix(in oklab, var(--background) 60%, transparent), var(--background))" }} />
        <div className="absolute inset-0 animate-ember-pulse"
          style={{ background: "radial-gradient(ellipse at 50% 60%, oklch(0.72 0.18 55 / 0.25), transparent 60%)" }} />
      </div>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="eyebrow mb-6">Reserve Your Aurora</p>
          <h2 className="text-6xl md:text-8xl font-semibold tracking-[-0.04em] text-balance text-foreground">
            The next chapter of driving <span className="text-gradient-ember">starts now.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">
            A fully refundable $500 reservation secures your delivery slot and configuration window.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#" className="btn-primary">Reserve Now <ArrowRight className="h-4 w-4" /></a>
            <a href="#" className="btn-ghost">Book a Test Drive</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  const cols = [
    { h: "Vehicles", l: ["Model V", "Model L", "Model T", "Roadster N", "Fleet"] },
    { h: "Energy", l: ["Solar Panels", "Solar Roof", "Powerwall", "Megapack", "Grid Services"] },
    { h: "Company", l: ["About", "Careers", "Investors", "Press", "Sustainability"] },
    { h: "Support", l: ["Charging", "Service", "Warranty", "Owners", "Contact"] },
  ];
  return (
    <footer className="relative border-t border-border pt-20 pb-10">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-ember to-foreground" />
                <div className="absolute inset-[2px] rounded-full" style={{ background: "var(--background)" }} />
                <div className="absolute inset-[5px] rounded-full bg-gradient-to-br from-ember to-foreground" />
              </div>
              <span className="text-[13px] font-semibold tracking-[0.2em] text-foreground uppercase">myevservice</span>
            </div>
            <p className="mt-6 max-w-xs text-sm text-muted-foreground">
              Building India's ultimate multi-brand EV service ecosystem.
              Engineered for scale and efficiency.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{c.h}</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {c.l.map((it) => (
                  <li key={it}>
                    <a href="#" className="text-foreground/85 hover:text-ember transition">{it}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center relative z-10">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} myevservice. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition">Privacy</a>
            <a href="#" className="hover:text-foreground transition">Terms</a>
            <a href="#" className="hover:text-foreground transition">Cookies</a>
            <a href="#" className="hover:text-foreground transition">Accessibility</a>
          </div>
        </div>

        {/* Massive Footer Typography */}
        <div className="mt-16 w-full flex justify-center items-end pointer-events-none select-none">
          <h1 className="text-[14vw] md:text-[15vw] font-bold leading-none tracking-tighter text-[#00D084] pb-4">
            myevservice
          </h1>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */
function Landing() {
  useLenis();

  // Force GSAP to recalculate pin positions after all lazy components/images load
  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <main className="relative">
      <Nav theme="warm" />

      {/* WARM LIGHT theme */}
      <div className="theme-warm">
        <Hero />
        <CinematicEcosystem />
        <EVServices />
        <ValuePackages />
      </div>

      <Ecosystem />

      <LabConfiguration />

      {/* PREMIUM GREEN theme */}
      <div className="theme-mid" style={{ backgroundColor: "var(--background)" }}>
        <Stats />
        <PartsWarehouse />
        <ResourcesJourney />
        <Factory />
        <CustomerStoriesWall />
        <FAQ />
        <TechnicianCareers />
        <Footer />
      </div>
    </main>
  );
}

export default Landing;
