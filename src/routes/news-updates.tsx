import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  Sparkles,
  TrendingUp,
  BatteryCharging,
  Zap,
  ArrowRight,
  Calendar,
  ExternalLink,
  Building2,
  FileText,
  Mail,
} from "lucide-react";

export const Route = createFileRoute("/news-updates")({
  head: () => ({
    meta: [
      { title: "EV News India | Industry Updates | MY EV SERVICE" },
      {
        name: "description",
        content:
          "Latest EV news from India: industry trends, charging and infrastructure updates, EV service insights and announcements from MY EV SERVICE.",
      },
      { name: "keywords", content: "EV News India, electric vehicle news India, EV industry updates, EV infrastructure news, electric mobility news India" },
      { property: "og:title", content: "EV News & Industry Updates India | MY EV SERVICE" },
      { property: "og:description", content: "Latest EV news from India: industry trends, charging and infrastructure updates, EV service insights." },
      { property: "og:image", content: "/assets/images/ev-news-india.jpg" },
    ],
  }),
  component: NewsUpdatesPage,
});

export const NEWS_HERO_BG = "/blog-hero-bg.png";

interface NewsArticle {
  id: string;
  category: "Industry" | "Infrastructure" | "Service" | "MY EV SERVICE" | "Policy";
  title: string;
  excerpt: string;
  analysis: string;
  source: string;
  sourceUrl: string;
  date: string;
}

const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "pune-ev-registrations-surge",
    category: "Industry",
    title: "Pune RTO Logs 37,808 EV Registrations in FY 2025–26, Tripling Year-over-Year",
    excerpt: "Electric two-wheelers and passenger e-rickshaws represent the fastest-growing EV density across urban Maharashtra.",
    analysis: "MY EV SERVICE Analysis: As vehicle density rapidly scales, standalone brand dealerships are experiencing severe bay congestion. Multi-brand hubs are critical to keep turnaround times under 2 hours.",
    source: "Pune RTO via Free Press Journal",
    sourceUrl: "https://www.freepressjournal.in",
    date: "October 2026",
  },
  {
    id: "maharashtra-ev-policy-2030",
    category: "Policy",
    title: "Maharashtra EV Policy 2025–2030: Accelerated Commercial Fleet Transition Mandates",
    excerpt: "New regulatory push introduces strict fast-charging mandates and tax rebates for logistics operators converting 100% of last-mile fleets to EV.",
    analysis: "MY EV SERVICE Analysis: Logistics operators must pair transition targets with structured predictive battery maintenance contracts to avoid unexpected cell degradation during heavy delivery shifts.",
    source: "Dept. of Industries, Maharashtra",
    sourceUrl: "https://maharashtra.gov.in",
    date: "September 2026",
  },
  {
    id: "autobot-os-fleet-rollout",
    category: "MY EV SERVICE",
    title: "Autobot OS Launches Live Telemetry & AI Diagnostic Dispatch for Commercial Fleets",
    excerpt: "Platform automates preventive maintenance scheduling, QR-scanned genuine parts tracking, and SLA escalation across network hubs.",
    analysis: "MY EV SERVICE Analysis: Digitized job cards and cell-level telemetry reduce recurring fault comebacks by over 40% across commercial courier fleets.",
    source: "MY EV SERVICE Press Room",
    sourceUrl: "/media",
    date: "October 2026",
  },
  {
    id: "battery-safety-standards",
    category: "Service",
    title: "AIS-156 Battery Safety Compliance: In-Bay Diagnostic Scanners Become Mandatory",
    excerpt: "Stringent thermal management and cell balancing requirements establish higher technician certification benchmarks across workshops.",
    analysis: "MY EV SERVICE Analysis: Technicians must be trained in high-voltage safety isolation. Petrol mechanics without HV tooling cannot safely service modern L5 battery packs.",
    source: "Ministry of Heavy Industries",
    sourceUrl: "https://heavyindustries.gov.in",
    date: "August 2026",
  },
  {
    id: "fast-charging-hub-expansion",
    category: "Infrastructure",
    title: "Urban Fast-Charging Networks Expand Co-Location with Multi-Brand Service Hubs",
    excerpt: "Charging operators increasingly bundle quick 30-minute top-ups with vehicle health scans and tyre checks.",
    analysis: "MY EV SERVICE Analysis: Co-locating DC fast chargers with service bays improves hub utilization and provides fleet operators with one-stop turnaround.",
    source: "EV Reporter India",
    sourceUrl: "https://evreporter.com",
    date: "September 2026",
  },
];

export function NewsUpdatesPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const heroTextRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const contentUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title-reveal",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-sub-reveal",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, delay: 0.2, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-btn-reveal",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.9, delay: 0.4, ease: "power3.out" }
      );

      gsap.to(".services-bg-img", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: contentOverlayRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });

      if (heroTextRef.current && contentOverlayRef.current) {
        gsap.to(heroTextRef.current, {
          opacity: 0,
          scale: 0.9,
          y: -50,
          ease: "power1.out",
          scrollTrigger: {
            trigger: contentOverlayRef.current,
            start: "top 95%",
            end: "top 35%",
            scrub: 0.6,
          },
        });
      }

      if (contentUpRef.current) {
        gsap.fromTo(
          contentUpRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentUpRef.current,
              start: "top 95%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );
      }
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const filtered = activeCategory === "All"
    ? NEWS_ARTICLES
    : NEWS_ARTICLES.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084]/30 selection:text-[#00D084]">
      <Nav theme="dark" onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Main Container matching Services page architecture */}
      <div className="relative min-h-screen">

        {/* =========================================================================
            1. FIXED STUCK HERO SECTION (STAYS FIXED IN BACKGROUND Z-0)
           ========================================================================= */}
        <div className="page-hero fixed top-20 left-0 right-0 h-[calc(100vh-80px)] w-full overflow-hidden bg-black z-0 flex items-center justify-center">
          {/* Background image with parallax zoom */}
          <div
            className="services-bg-img absolute inset-0 bg-cover bg-center opacity-70 pointer-events-none scale-105 transition-all duration-700"
            style={{
              backgroundImage: `url('${NEWS_HERO_BG}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

          <div
            ref={heroTextRef}
            className="max-w-4xl mx-auto text-center relative z-10 px-6 space-y-4 pointer-events-auto"
          >
            <span className="hero-sub-reveal text-xs font-mono font-bold uppercase tracking-widest text-[#00D084]">
              • Electric Mobility Trends · Ecosystem News
            </span>
            <h1 className="hero-title-reveal text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
              EV News &amp; <br className="hidden sm:block" />
              <span className="text-[#00D084]">Industry Updates</span>
            </h1>
            <p className="hero-sub-reveal text-sm sm:text-base md:text-lg text-[#c2d1c7] font-light max-w-2xl mx-auto leading-relaxed">
              What's moving in India's EV market, from policy and charging to service networks, plus the latest announcements from MY EV SERVICE.
            </p>
            <div className="hero-btn-reveal pt-3 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#feed"
                className="whitespace-nowrap inline-flex items-center shrink-0 gap-2 px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] cursor-pointer hover:scale-105"
              >
                <span>READ LATEST NEWS</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
              <Link
                to="/blog"
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
              >
                Read Insights Blog
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. CARDS OVERLAY CONTAINER (SLIDES UP DIRECTLY ON TOP OF THE FIXED HERO)
           ========================================================================= */}
        <div
          ref={contentOverlayRef}
          className="relative z-10 min-h-screen mt-[calc(100vh-80px)] pt-6 rounded-t-[40px] border-t border-white/10 shadow-2xl bg-[#020403]"
        >
          <div ref={contentUpRef}>
            {/* S0: Breadcrumb */}
            <div className="pb-4 px-6 max-w-7xl mx-auto">
              <nav aria-label="breadcrumb" className="text-xs font-mono text-white/50 flex items-center gap-2">
                <Link to="/" className="hover:text-[#00D084] transition-colors">Home</Link>
                <span>›</span>
                <span className="text-[#00D084]">News &amp; Updates</span>
              </nav>
            </div>

            {/* S1: Feed Filter Chips (#feed) */}
            <div id="feed" className="py-6 px-6 max-w-7xl mx-auto text-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {["All", "Industry", "Infrastructure", "Service", "MY EV SERVICE", "Policy"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#00D084] text-black font-bold"
                        : "bg-[#080d0a] border border-white/10 text-white/70 hover:border-white/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

      {/* S2 to S6: Articles Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="p-6 rounded-3xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 text-[10px] font-mono text-[#00D084] uppercase font-bold">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-white/40 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {item.date}
                  </span>
                </div>

                <h2 className="text-base font-bold text-white mb-3 group-hover:text-[#00D084] transition-colors leading-snug">
                  {item.title}
                </h2>
                <p className="text-xs text-white/70 font-light leading-relaxed mb-4">
                  {item.excerpt}
                </p>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 mb-6 text-[11px] leading-relaxed text-white/80">
                  <span className="text-[#00D084] font-bold block mb-1">Expert Take:</span>
                  {item.analysis}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/40 text-[10px] truncate max-w-[160px]">Source: {item.source}</span>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#00D084] hover:text-white flex items-center gap-1 text-[11px] font-bold transition-colors"
                >
                  <span>Source Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* S7: Closing CTA */}
      <section className="py-16 px-6 bg-[#0D5C2E] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Press and Media Enquiries
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Story ideas, executive interviews, verified data on #PuneEVMap and official brand assets.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-white text-[#020403] font-black text-xs uppercase tracking-widest hover:bg-white/90 shadow-2xl transition-all"
            >
              Contact Press Team
            </Link>
            <Link
              to="/blog"
              className="px-8 py-4 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Read EV Insights Blog
            </Link>
          </div>
        </div>
      </section>

          </div>
        </div>
      </div>

      <Footer />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </main>
  );
}
