import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  Search,
  BookOpen,
  Sparkles,
  Zap,
  BatteryCharging,
  Wrench,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  FilterX,
  Bot,
  SlidersHorizontal,
  ArrowUpRight,
  X,
  Menu,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
});

interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  author: string;
  img: string;
  featured?: boolean;
  content?: string[];
}

const CATEGORIES = [
  "All",
  "Maintenance",
  "Troubleshooting",
  "Battery Care",
  "How-to Guides",
  "Tips & Tricks",
];

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "5 Critical Signs Your EV Battery Cell Needs Active Balancing",
    category: "Battery Care",
    readTime: "5 min read",
    date: "Aug 14, 2026",
    excerpt:
      "Learn how capacity drift occurs in lithium-ion battery packs and how Autobot OS cell-level balancing restores original range.",
    author: "Autobot Technical Team",
    img: "https://images.unsplash.com/photo-1558441719-2347b7341ed2?w=800&auto=format&fit=crop&q=80",
    featured: true,
    content: [
      "Lithium-ion battery packs are the heart of any electric vehicle. Over time, individual cells within these packs can experience 'capacity drift'—small variations in internal resistance and capacity due to thermal gradients and usage cycles.",
      "If left unaddressed, capacity drift leads to cell imbalance. Cells with lower capacity discharge faster and reach their cut-off voltage sooner, limiting the entire pack's usable capacity. This shows up as a sudden drop in range or premature power throttling.",
      "Active cell balancing transfers energy from higher-voltage cells to weaker ones during charge cycles, ensuring all cells discharge uniformly and restoring original range."
    ]
  },
  {
    id: "post-2",
    title: "How to Maximize Ola & Ather Range During Peak Indian Summers",
    category: "Tips & Tricks",
    readTime: "4 min read",
    date: "Aug 10, 2026",
    excerpt:
      "Essential thermal management practices to prevent BMS throttling and preserve battery health in 40°C+ ambient temperatures.",
    author: "Rajesh Kumar, Senior EV Diagnostics",
    img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80",
    content: [
      "Operating an electric scooter in hot climates presents unique engineering challenges. During peak summers in India, ambient temperatures regularly cross 40°C, causing significant thermal stress on lithium-ion batteries.",
      "When cell temperatures exceed 45°C, the Battery Management System (BMS) enters thermal protection mode, throttle acceleration, and limits charging speeds. To maximize range, avoid parking under direct sunlight and allow the battery to cool down for 20 minutes before plugging it in.",
      "Additionally, smooth throttle inputs and riding in Eco mode reduces continuous current demand, keeping battery temperatures lower and preventing range loss due to heat efficiency drops."
    ]
  },
  {
    id: "post-3",
    title: "Step-by-Step Guide: Troubleshooting BLDC Hub Motor Noise",
    category: "Troubleshooting",
    readTime: "7 min read",
    date: "Aug 05, 2026",
    excerpt:
      "Diagnosing bearing wear, hall sensor misalignment, and phase wire shorts before controller breakdown occurs.",
    author: "Autobot Technical Team",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    content: [
      "BLDC hub motors are highly reliable, but they are not maintenance-free. Unexpected grinding or whistling noises from your rear wheel can indicate mechanical or electrical issues that need immediate troubleshooting.",
      "First, check for bearing wear by spinning the wheel manually while the vehicle is off. Any rough feedback indicates that moisture or road debris has breached the dust seals. Second, verify the hall sensors inside the motor. Misaligned sensors cause rough commutation, producing a loud humming noise.",
      "If you notice a metallic clicking under load, inspect the phase wires connecting the controller to the motor. Melted insulation on these wires can cause intermittent micro-shorts, which will damage your motor controller if left unresolved."
    ]
  },
  {
    id: "post-4",
    title: "EV Periodic Maintenance Checklist: 32 Points Every Owner Should Know",
    category: "Maintenance",
    readTime: "6 min read",
    date: "Jul 28, 2026",
    excerpt:
      "From brake fluid moisture testing to CAN-bus diagnostic error code scans: a complete guide to preventive EV care.",
    author: "Priya Sharma, Lead Quality Audit",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    content: [
      "Unlike internal combustion engine vehicles, EVs do not require engine oil changes or spark plug replacements. However, preventive maintenance is still essential to ensure the longevity of high-voltage systems, mechanical assemblies, and braking circuits.",
      "Our 32-point checklist covers three key areas: High-Voltage Systems (isolation resistance check, battery harness audit, BMS telemetry logs), Mechanical Systems (suspension play, wheel bearings, chassis grounding), and Control Interfaces (brake fluid water content, tyre tread depth, cluster functionality).",
      "Regular inspections every 5,000 km help catch cable wear and minor cell drifts early, ensuring maximum safety, peak range, and avoiding costly high-voltage component repairs down the line."
    ]
  },
  {
    id: "post-5",
    title: "How to Read BMS Diagnostic Telemetry Reports Like a Pro",
    category: "How-to Guides",
    readTime: "5 min read",
    date: "Jul 20, 2026",
    excerpt:
      "Understanding delta voltage, cell internal resistance (mΩ), and state-of-health (SOH) graphs generated by AI diagnostic hubs.",
    author: "Autobot Technical Team",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
    content: [
      "When your EV is diagnosed at a My EV Service hub, our system generates a detailed Battery Health Telemetry report. To understand these reports, you need to focus on three critical metrics: SOH, Delta Voltage, and Cell Internal Resistance.",
      "State-of-Health (SOH) represents the battery's current capacity relative to when it was new. A healthy battery should maintain an SOH of 80% or higher. Delta Voltage is the difference between the highest and lowest cell voltages. An balanced pack should have a delta voltage of less than 30mV at rest.",
      "Lastly, cell internal resistance (measured in mΩ) indicates how easily current flows through the cells. Higher resistance values generate more heat and cause rapid voltage drops under acceleration, pointing to aging or damaged cells."
    ]
  },
];

// masonry height helper
const getCardHeight = (idx: number) => {
  const heights = [
    "h-[260px] sm:h-[320px]",
    "h-[340px] sm:h-[400px]",
    "h-[210px] sm:h-[260px]",
    "h-[390px] sm:h-[470px]"
  ];
  return heights[idx % heights.length];
};

// 3D Holographic Perspective Hover Card Component with cursor-tracking ambient glow and alternating layout
function ArticleCard({ post, index, isLight, onClick }: { post: BlogPost; index: number; isLight: boolean; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);

  const isEven = index % 2 === 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / (rect.height / 12);
    const rotateY = (x - centerX) / (rect.width / 12);
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const getGlowColor = (cat: string) => {
    if (isLight) {
      switch (cat) {
        case "Battery Care": return "rgba(0, 208, 132, 0.12)";
        case "Troubleshooting": return "rgba(0, 180, 255, 0.12)";
        case "Tips & Tricks": return "rgba(255, 145, 0, 0.12)";
        default: return "rgba(0, 208, 132, 0.08)";
      }
    } else {
      switch (cat) {
        case "Battery Care": return "rgba(0, 208, 132, 0.2)";
        case "Troubleshooting": return "rgba(0, 229, 255, 0.2)";
        case "Tips & Tricks": return "rgba(255, 145, 0, 0.2)";
        default: return "rgba(0, 208, 132, 0.14)";
      }
    }
  };

  const glowColor = getGlowColor(post.category);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? "transform 0.05s linear" : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className={`relative overflow-hidden rounded-[32px] p-6 transition-all duration-500 group flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } gap-6 items-start cursor-pointer hover:shadow-2xl ${
        isLight
          ? "bg-white/80 backdrop-blur-md text-[#1a2320]"
          : "bg-[#080f0b]/40 backdrop-blur-md text-white"
      }`}
    >
      {/* Holographic Glowing Background Layer */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 240px at ${coords.x}px ${coords.y}px, ${glowColor}, transparent)`,
          }}
        />
      )}

      {/* Shine Highlight effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay opacity-20"
          style={{
            background: `radial-gradient(circle 130px at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.4), transparent)`,
          }}
        />
      )}

      {/* Image container: fallback to gradient if source fails to load */}
      <div className="relative w-full md:w-52 h-40 shrink-0 overflow-hidden rounded-2xl shadow-sm bg-[#090f0b] flex items-center justify-center border border-white/5">
        {!imgError ? (
          <img
            src={post.img}
            alt=""
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 pointer-events-none"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#00D084]/15 via-[#060c09] to-black flex flex-col items-center justify-center p-4 text-center">
            <Sparkles className="w-8 h-8 text-[#00D084] mb-2 opacity-50" />
            <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{post.category}</span>
          </div>
        )}
      </div>

      <div className="space-y-3 flex-1 relative z-10 text-left">
        <div className="flex items-center justify-between text-xs font-sans">
          <span className="text-[#00D084] font-sans font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <span className={isLight ? "text-[#607267]" : "text-white/50"}>
            {post.date} • {post.readTime}
          </span>
        </div>

        <h3
          className={`text-xl font-sans font-bold group-hover:text-[#00D084] transition-colors leading-snug ${
            isLight ? "text-[#1a2320]" : "text-white"
          }`}
        >
          {post.title}
        </h3>

        <p
          className={`text-xs font-sans font-light leading-relaxed ${
            isLight ? "text-[#4a5851]" : "text-white/60"
          }`}
        >
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span
            className={`text-[11px] font-sans italic ${
              isLight ? "text-[#607267]" : "text-white/40"
            }`}
          >
            By {post.author}
          </span>
          <span
            className="text-xs font-sans font-bold text-[#00D084] group-hover:underline flex items-center gap-1 cursor-pointer"
          >
            Read Article <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [researchQuery, setResearchQuery] = useState("");
  const [emailInput, setEmailInput] = useState("");

  // Drawer states
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSide, setDrawerSide] = useState<"left" | "right">("right");
  const drawerWrapperRef = useRef<HTMLDivElement>(null);
  const drawerContentRef = useRef<HTMLDivElement>(null);

  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardsOverlayRef = useRef<HTMLDivElement>(null);
  const cardsUpRef = useRef<HTMLDivElement>(null);

  const filteredPosts = useMemo(() => {
    return SAMPLE_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle open article details in sidebar drawer (even indices slide from right, odd from left)
  const handleOpenArticle = (post: BlogPost, index: number) => {
    setSelectedPost(post);
    setDrawerSide(index % 2 === 0 ? "right" : "left");
    setDrawerOpen(true);
  };

  // GSAP infinite scrolling loops & ScrollTrigger Parallax
  useEffect(() => {
    // Kill any existing ScrollTriggers to prevent global persistence conflicts in client-side navigation
    ScrollTrigger.getAll().forEach(t => t.kill());

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (heroTextRef.current && cardsOverlayRef.current) {
        gsap.to(heroTextRef.current, {
          opacity: 0,
          scale: 0.9,
          y: -50,
          ease: "power1.out",
          scrollTrigger: {
            trigger: cardsOverlayRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 0.6,
          },
        });
      }

      if (cardsUpRef.current) {
        gsap.fromTo(
          cardsUpRef.current,
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsUpRef.current,
              start: "top 90%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );
      }

      // Trusted partners bar entrance
      gsap.fromTo(
        ".blog-partners-bar",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".blog-partners-bar",
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Category filters & Search Title entrance
      gsap.fromTo(
        ".blog-archive-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#blog-archive",
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Staggered sidebar cards entrance
      gsap.fromTo(
        ".blog-sidebar-card",
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".blog-sidebar-card",
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // National network banner entrance
      gsap.fromTo(
        ".blog-network-banner",
        { scale: 0.96, opacity: 0, y: 55 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "back.out(1.1)",
          scrollTrigger: {
            trigger: ".blog-network-banner",
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Infinite column scrolling loops
      const colSelectors = [".blog-col-1", ".blog-col-2", ".blog-col-3", ".blog-col-4"];
      colSelectors.forEach((selector, idx) => {
        const col = document.querySelector(selector);
        if (!col) return;

        // Downward (col 1 & 3: startY=-50% to endY=0%), Upward (col 2 & 4: startY=0% to endY=-50%)
        const direction = idx % 2 === 0 ? 1 : -1;
        const startY = direction === 1 ? "-50%" : "0%";
        const endY = direction === 1 ? "0%" : "-50%";

        const tl = gsap.fromTo(
          col,
          { y: startY },
          {
            y: endY,
            repeat: -1,
            duration: idx % 2 === 0 ? 130 : 160,
            ease: "none",
          }
        );

        col.addEventListener("mouseenter", () => {
          gsap.to(tl, { timeScale: 0.15, duration: 1.2 });
        });
        col.addEventListener("mouseleave", () => {
          gsap.to(tl, { timeScale: 1, duration: 1.2 });
        });
      });
    });

    ScrollTrigger.refresh();
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 400);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 800);

    return () => {
      ctx.revert();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Lenis Smooth Scroll Setup for drawer (hides scrollbars & implements smooth scroll)
  useEffect(() => {
    if (!drawerOpen || !drawerWrapperRef.current || !drawerContentRef.current) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const drawerLenis = new Lenis({
      wrapper: drawerWrapperRef.current,
      content: drawerContentRef.current,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    let rafId: number;
    function update(time: number) {
      drawerLenis.raf(time);
      rafId = requestAnimationFrame(update);
    }
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      drawerLenis.destroy();
      document.body.style.overflow = originalOverflow;
    };
  }, [drawerOpen]);

  // Refresh GSAP ScrollTrigger dynamically when archive is updated
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [filteredPosts]);

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

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  const handleResearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!researchQuery) return;
    toast.success(`Searching ecosystem for "${researchQuery}"...`);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    toast.success(`Subscribed ${emailInput} to EV Care Weekly Newsletter!`);
    setEmailInput("");
  };

  const isLight = siteTheme === "light";

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 overflow-x-hidden ${
        isLight
          ? "bg-[#f4f8f5] text-[#1a2320] selection:bg-[#00D084] selection:text-black"
          : "bg-[#070908] text-white selection:bg-[#00D084] selection:text-black"
      }`}
    >
      {/* Navigation */}
      <Nav />

      {/* Main Container */}
      <div className="relative min-h-screen">

        {/* =========================================================================
            1. INFINITE SCROLLING GALLERY HERO (MATCHING SCREENSHOT)
           ========================================================================= */}
        <div className="fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center border-b border-white/10">
          
          {/* Columns Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 h-[170vh] -mt-[35vh] w-full overflow-hidden pointer-events-auto px-4 md:px-8 bg-black/95">
            
            {/* Column 1 (Downward) */}
            <div className="blog-col-1 flex flex-col gap-4 sm:gap-6">
              {[...SAMPLE_POSTS, ...SAMPLE_POSTS, ...SAMPLE_POSTS].map((post, pIdx) => (
                <div
                  key={`col1-${post.id}-${pIdx}`}
                  onClick={() => handleOpenArticle(post, pIdx)}
                  className={`relative overflow-hidden rounded-[24px] sm:rounded-[32px] cursor-pointer group border border-white/5 ${getCardHeight(pIdx)}`}
                >
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85" />
                  
                  {/* Card Overlay Text */}
                  <div className="absolute bottom-5 left-5 right-5 text-left space-y-2">
                    <span className="text-[9px] font-sans font-bold text-[#00D084] uppercase tracking-wider bg-[#00D084]/15 px-2.5 py-1 rounded-full border border-[#00D084]/20 inline-block">
                      {post.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-sans font-extrabold text-white leading-tight group-hover:text-[#00D084] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[9px] text-white/50 font-sans">
                      {post.date} • {post.readTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 (Upward) */}
            <div className="blog-col-2 flex flex-col gap-4 sm:gap-6">
              {[...SAMPLE_POSTS.slice().reverse(), ...SAMPLE_POSTS.slice().reverse(), ...SAMPLE_POSTS.slice().reverse()].map((post, pIdx) => (
                <div
                  key={`col2-${post.id}-${pIdx}`}
                  onClick={() => handleOpenArticle(post, pIdx + 1)}
                  className={`relative overflow-hidden rounded-[24px] sm:rounded-[32px] cursor-pointer group border border-white/5 ${getCardHeight(pIdx + 1)}`}
                >
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85" />
                  
                  {/* Card Overlay Text */}
                  <div className="absolute bottom-5 left-5 right-5 text-left space-y-2">
                    <span className="text-[9px] font-sans font-bold text-[#00D084] uppercase tracking-wider bg-[#00D084]/15 px-2.5 py-1 rounded-full border border-[#00D084]/20 inline-block">
                      {post.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-sans font-extrabold text-white leading-tight group-hover:text-[#00D084] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[9px] text-white/50 font-sans">
                      {post.date} • {post.readTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3 (Downward - Hidden on mobile) */}
            <div className="blog-col-3 hidden md:flex flex-col gap-4 sm:gap-6">
              {[...SAMPLE_POSTS, ...SAMPLE_POSTS, ...SAMPLE_POSTS].map((post, pIdx) => (
                <div
                  key={`col3-${post.id}-${pIdx}`}
                  onClick={() => handleOpenArticle(post, pIdx + 2)}
                  className={`relative overflow-hidden rounded-[24px] sm:rounded-[32px] cursor-pointer group border border-white/5 ${getCardHeight(pIdx + 2)}`}
                >
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85" />
                  
                  {/* Card Overlay Text */}
                  <div className="absolute bottom-5 left-5 right-5 text-left space-y-2">
                    <span className="text-[9px] font-sans font-bold text-[#00D084] uppercase tracking-wider bg-[#00D084]/15 px-2.5 py-1 rounded-full border border-[#00D084]/20 inline-block">
                      {post.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-sans font-extrabold text-white leading-tight group-hover:text-[#00D084] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[9px] text-white/50 font-sans">
                      {post.date} • {post.readTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 4 (Upward - Hidden on tablet/mobile) */}
            <div className="blog-col-4 hidden lg:flex flex-col gap-4 sm:gap-6">
              {[...SAMPLE_POSTS.slice().reverse(), ...SAMPLE_POSTS.slice().reverse(), ...SAMPLE_POSTS.slice().reverse()].map((post, pIdx) => (
                <div
                  key={`col4-${post.id}-${pIdx}`}
                  onClick={() => handleOpenArticle(post, pIdx + 3)}
                  className={`relative overflow-hidden rounded-[24px] sm:rounded-[32px] cursor-pointer group border border-white/5 ${getCardHeight(pIdx + 3)}`}
                >
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85" />
                  
                  {/* Card Overlay Text */}
                  <div className="absolute bottom-5 left-5 right-5 text-left space-y-2">
                    <span className="text-[9px] font-sans font-bold text-[#00D084] uppercase tracking-wider bg-[#00D084]/15 px-2.5 py-1 rounded-full border border-[#00D084]/20 inline-block">
                      {post.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-sans font-extrabold text-white leading-tight group-hover:text-[#00D084] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[9px] text-white/50 font-sans">
                      {post.date} • {post.readTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
          
          {/* Floating Logo Capsule */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 backdrop-blur-md bg-black/60 border border-white/10 px-5 py-2.5 rounded-full shadow-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#00D084] animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-white uppercase">
                MY EV LABS
              </span>
            </div>
            <div className="h-4 w-[1px] bg-white/20" />
            <button
              onClick={() => {
                const el = document.getElementById("blog-archive");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-7 h-7 rounded-full bg-[#00D084] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
            >
              <Menu className="w-3.5 h-3.5 text-black" />
            </button>
          </div>

          {/* Floating Bottom Button */}
          <button
            onClick={() => {
              const el = document.getElementById("blog-archive");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 backdrop-blur-md bg-[#00D084]/20 border border-[#00D084]/40 px-8 py-3.5 rounded-full text-[#00D084] text-[10px] font-mono tracking-widest uppercase hover:bg-[#00D084] hover:text-black transition-all cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(0,208,132,0.3)] flex items-center gap-2"
          >
            EXPLORE POSTS ✦
          </button>
        </div>

        {/* =========================================================================
            2. CARDS OVERLAY CONTAINER (SLIDES UP DIRECTLY ON TOP OF THE FIXED HERO)
           ========================================================================= */}
        <div
          ref={cardsOverlayRef}
          className={`relative z-10 min-h-screen mt-[calc(100vh-80px)] pt-12 pb-24 rounded-t-[40px] border-t border-white/10 shadow-2xl ${
            isLight ? "bg-[#f4f8f5]" : "bg-[#070908]"
          }`}
        >
          <div ref={cardsUpRef}>

      {/* =========================================================================
          2. TRUSTED PARTNERS / FEATURED IN BAR (LIGHT/DARK THEME ADAPTIVE)
         ========================================================================= */}
      <section className="py-8 px-6 max-w-7xl mx-auto blog-partners-bar">
        <div
          className={`border rounded-[32px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left transition-colors duration-300 ${
            isLight
              ? "bg-white border-[#d6e3da] text-[#1a2320] shadow-md"
              : "bg-[#0b120d] border-white/10 text-white"
          }`}
        >
          <div
            className={`text-xs sm:text-sm font-sans font-semibold tracking-[-0.04em] shrink-0 ${
              isLight ? "text-[#4a5851]" : "text-white/60"
            }`}
          >
            Trusted by EV Owners &amp; Fleets Across India
          </div>

          <div
            className={`flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-10 transition-all duration-300 ${
              isLight ? "text-[#1a2320]" : "text-white/80"
            }`}
          >
            <span className="text-sm font-sans font-extrabold tracking-widest">OLA ELECTRIC</span>
            <span className="text-sm font-sans font-extrabold tracking-widest">ATHER ENERGY</span>
            <span className="text-sm font-sans font-extrabold tracking-widest">TVS iQUBE</span>
            <span className="text-sm font-sans font-extrabold tracking-widest">BAJAJ CHETAK</span>
            <span className="text-sm font-sans font-extrabold tracking-widest">HERO VIDA</span>
          </div>
        </div>
      </section>


      {/* =========================================================================
          4. MAIN ARTICLES ARCHIVE (WITH LIGHT/DARK THEME ADAPTIVE CARDS)
         ========================================================================= */}
      <section id="blog-archive" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Articles Area (8 cols) */}
          <div className="lg:col-span-8 space-y-8 text-left">
            
            {/* Category Filter Pills & Search Input */}
            <div className="space-y-4 blog-archive-header">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-sans font-semibold uppercase transition-all cursor-pointer border ${
                        selectedCategory === cat
                          ? "bg-[#00D084] text-[#020403] border-[#00D084]"
                          : isLight
                          ? "bg-white text-[#1a2320] border-[#c5d6ca] hover:border-[#00D084]"
                          : "bg-[#070e0a] text-white/70 border-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div
                  className={`text-xs font-sans ${
                    isLight ? "text-[#607267]" : "text-white/50"
                  }`}
                >
                  Articles ({filteredPosts.length})
                </div>
              </div>

              {/* Instant Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#00D084] absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Filter articles by keyword (e.g., BMS, Ather, Motor, Noise)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full border rounded-full pl-11 pr-4 py-3 text-xs font-sans focus:outline-none focus:border-[#00D084] ${
                    isLight
                      ? "bg-white border-[#c5d6ca] text-[#1a2320] placeholder-[#607267]"
                      : "bg-[#070e0a] border-white/15 text-white placeholder-white/40"
                  }`}
                />
              </div>
            </div>

            {/* Articles Grid */}
            {filteredPosts.length > 0 ? (
              <motion.div layout className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, scale: 0.92, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: -15 }}
                      transition={{
                        opacity: { duration: 0.2 },
                        layout: { type: "spring", stiffness: 380, damping: 36 }
                      }}
                    >
                      <ArticleCard
                        post={post}
                        index={index}
                        isLight={isLight}
                        onClick={() => handleOpenArticle(post, index)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* No Articles Found State */
              <div
                className={`border rounded-[32px] p-12 text-center space-y-4 ${
                  isLight
                    ? "bg-white border-[#d6e3da] text-[#1a2320]"
                    : "bg-[#070e0a] border-white/10 text-white"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-black/5 border border-black/10 flex items-center justify-center mx-auto text-black/40">
                  <FilterX className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-sans font-bold">
                  No articles found matching your criteria.
                </h3>
                <p className="text-xs opacity-75 font-sans font-light">
                  Try clearing your category filters or search query to view all technical guides.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-sans font-black uppercase tracking-wider hover:bg-[#00e08f] transition-all cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Area (4 cols) */}
          <div className="lg:col-span-4 space-y-8 text-left">
            
            {/* My EV Services AI Analyzer Card */}
            <div
              className={`border-2 border-[#00D084] rounded-[32px] p-6 space-y-4 relative overflow-hidden blog-sidebar-card ${
                isLight ? "bg-white shadow-md" : "bg-[#06110a]"
              }`}
            >
              <div className="space-y-1">
                <span className="text-xs font-sans font-bold text-[#00D084] uppercase tracking-widest block">
                  My EV Services AI
                </span>
                <h3
                  className={`text-2xl font-sans font-bold tracking-[-0.04em] ${
                    isLight ? "text-[#1a2320]" : "text-white"
                  }`}
                >
                  Analyze your vehicle
                </h3>
              </div>

              <p
                className={`text-xs font-sans font-light leading-relaxed ${
                  isLight ? "text-[#4a5851]" : "text-white/70"
                }`}
              >
                If you’re signed in, pick your saved EV and get a weakness checklist.
              </p>

              <button
                onClick={() => toast.info("Opening AI vehicle analysis login flow...")}
                className="w-full py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-sans font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Sign in to analyze <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Ecosystem Research Search Engine */}
            <div
              className={`border rounded-[32px] p-6 space-y-4 blog-sidebar-card ${
                isLight
                  ? "bg-white border-[#d6e3da] text-[#1a2320] shadow-sm"
                  : "bg-[#070e0a] border-white/10 text-white"
              }`}
            >
              <div className="space-y-1">
                <span className="text-xs font-sans font-bold text-[#00D084] uppercase tracking-widest">
                  Ecosystem Research
                </span>
                <h4 className="text-base font-sans font-bold tracking-[-0.04em]">
                  Search inside My EV Services content:
                </h4>
                <p className={`text-[11px] font-sans font-light ${isLight ? "text-[#607267]" : "text-white/50"}`}>
                  Search webinars, updates, services, and store.
                </p>
              </div>

              <form onSubmit={handleResearchSubmit} className="space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#00D084] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search updates, webinars, parts..."
                    value={researchQuery}
                    onChange={(e) => setResearchQuery(e.target.value)}
                    className={`w-full border rounded-full pl-10 pr-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-[#00D084] ${
                      isLight
                        ? "bg-[#f2f7f4] border-[#c5d6ca] text-[#1a2320] placeholder-[#607267]"
                        : "bg-[#020403] border-white/15 text-white placeholder-white/40"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isLight
                      ? "bg-[#e8f2eb] hover:bg-[#d5e6da] text-[#1a2320]"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  Search Ecosystem
                </button>
              </form>
            </div>

            {/* Promoted Recommendations */}
            <div
              className={`border rounded-[32px] p-6 space-y-4 blog-sidebar-card ${
                isLight
                  ? "bg-white border-[#d6e3da] text-[#1a2320] shadow-sm"
                  : "bg-[#070e0a] border-white/10 text-white"
              }`}
            >
              <div className="space-y-1">
                <span className="text-xs font-sans font-bold text-[#00D084] uppercase tracking-widest">
                  Promoted
                </span>
                <h4 className="text-base font-sans font-bold tracking-[-0.04em]">
                  Services and parts we recommend right now.
                </h4>
              </div>

              <div className="space-y-3 text-xs">
                {/* Promoted Item 1 */}
                <div
                  className={`p-4 rounded-2xl border space-y-1 hover:border-[#00D084]/60 transition-colors ${
                    isLight ? "bg-[#f2f7f4] border-[#d6e3da]" : "bg-[#020503] border-white/10"
                  }`}
                >
                  <div className="font-sans font-bold tracking-[-0.03em] text-sm">
                    Battery Health Check
                  </div>
                  <p className={`text-xs font-sans ${isLight ? "text-[#607267]" : "text-white/60"}`}>
                    Diagnostics + report built for EV reliability.
                  </p>
                  <Link
                    to="/find-services"
                    className="text-[#00D084] font-sans font-bold text-[11px] hover:underline inline-flex items-center gap-1 pt-1"
                  >
                    Book Diagnostic <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Promoted Item 2 */}
                <div
                  className={`p-4 rounded-2xl border space-y-1 hover:border-[#00D084]/60 transition-colors ${
                    isLight ? "bg-[#f2f7f4] border-[#d6e3da]" : "bg-[#020503] border-white/10"
                  }`}
                >
                  <div className="font-sans font-bold tracking-[-0.03em] text-sm">
                    Charging essentials
                  </div>
                  <p className={`text-xs font-sans ${isLight ? "text-[#607267]" : "text-white/60"}`}>
                    Charger + cable bundles for daily use.
                  </p>
                  <Link
                    to="/store"
                    className="text-[#00D084] font-sans font-bold text-[11px] hover:underline inline-flex items-center gap-1 pt-1"
                  >
                    View Bundles <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          5. FIND EV SERVICE NEAR YOU BANNER
         ========================================================================= */}
      <section className="py-12 px-6 max-w-7xl mx-auto text-left">
        <div
          className={`border-2 border-[#00D084] rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 blog-network-banner ${
            isLight ? "bg-[#00D084]/20 text-[#1a2320]" : "bg-[#00D084]/15 text-white"
          }`}
        >
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#00D084] block">
              NATIONAL NETWORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-[-0.04em]">
              Find EV Service Near You
            </h2>
            <p className={`text-sm sm:text-base font-sans font-light ${isLight ? "text-[#3a4841]" : "text-white/80"}`}>
              Browse service centres across India by city and locality.
            </p>
          </div>

          <Link
            to="/find-services"
            className="px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-sans font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shrink-0 cursor-pointer shadow-md"
          >
            Explore Service Network
          </Link>
        </div>
      </section>

          </div>
        </div>
      </div>

      {/* Interactive Blog Article Sidebar Drawer */}
      <AnimatePresence>
        {drawerOpen && selectedPost && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />
            {/* Sidebar drawer */}
            <motion.div
              key={selectedPost.id}
              initial={{ x: drawerSide === "right" ? "110%" : "-110%" }}
              animate={{ x: 0 }}
              exit={{ x: drawerSide === "right" ? "110%" : "-110%" }}
              transition={{ type: "spring", damping: 32, stiffness: 220 }}
              className={`fixed top-4 sm:top-6 bottom-4 sm:bottom-6 z-50 w-full max-w-3xl bg-[#060c09] border border-white/10 rounded-[32px] md:rounded-[40px] shadow-2xl flex flex-col font-sans text-white overflow-hidden ${
                drawerSide === "right" ? "right-4 sm:right-6" : "left-4 sm:left-6"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setDrawerOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white bg-[#060c09]/80 backdrop-blur-md hover:bg-white/5 border border-white/10 p-2.5 rounded-full transition-colors cursor-pointer z-20 shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Lenis Wrapper (No Visible Scrollbar) */}
              <div
                ref={drawerWrapperRef}
                data-lenis-prevent="true"
                className="flex-1 overflow-y-auto p-6 md:p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                <div ref={drawerContentRef} className="space-y-8 pb-6">
                  {/* Top Cover Image */}
                  <div className="relative h-60 md:h-72 w-full rounded-2xl overflow-hidden mb-4 bg-slate-900 shadow-md">
                    <img
                      src={selectedPost.img}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060c09] via-transparent to-black/30" />
                  </div>

                  {/* Header / Badge */}
                  <div>
                    <span className="text-[10px] font-sans font-bold text-[#00D084] uppercase tracking-widest bg-[#00D084]/15 px-3 py-1 rounded-full border border-[#00D084]/30 inline-block mb-3">
                      {selectedPost.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-white mt-1 leading-tight">
                      {selectedPost.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-3 text-xs text-white/50 font-mono">
                      <span>{selectedPost.date}</span>
                      <span>•</span>
                      <span>{selectedPost.readTime}</span>
                      <span>•</span>
                      <span>By {selectedPost.author}</span>
                    </div>
                  </div>

                  {/* Article content paragraphs */}
                  <div className="border-t border-white/10 pt-6 space-y-5">
                    {selectedPost.content ? (
                      selectedPost.content.map((p, pIdx) => (
                        <p key={pIdx} className="text-sm md:text-base text-white/80 leading-relaxed font-light font-sans">
                          {p}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm md:text-base text-white/80 leading-relaxed font-light font-sans">
                        {selectedPost.excerpt}
                      </p>
                    )}
                  </div>
                  
                  {/* Footer call to action */}
                  <div className="border-t border-white/10 pt-6 mt-8 space-y-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Need Professional EV Care?</h4>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Our certified Autobot diagnostics team is ready to evaluate your electric scooter, bike or auto. Book an inspection at your nearest hub or request doorstep maintenance.
                    </p>
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        window.location.href = "/services";
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00D084] text-[#020403] text-xs font-sans font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(0,208,132,0.3)]"
                    >
                      Book Diagnostic Service <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
