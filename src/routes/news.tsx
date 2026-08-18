import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  Newspaper,
  Search,
  Zap,
  Clock,
  TrendingUp,
  Bookmark,
  Share2,
  X,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Battery,
  Globe,
  Radio,
  Calendar,
  User,
  Eye,
  CheckCircle2,
  Send,
  Flame,
  ChevronLeft,
  ThumbsUp,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/news")({
  component: EVNewsPage,
});

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  img: string;
  featured?: boolean;
  breaking?: boolean;
  views: string;
  likes: number;
}

const NEWS_CATEGORIES = [
  "All News",
  "Battery Tech & BMS",
  "Policy & Subsidies",
  "Electric 2W & 3W",
  "Charging Infrastructure",
  "Industry Trends",
  "MY EV Updates",
];

const ARTICLES: NewsArticle[] = [
  {
    id: "news-101",
    title: "India Expands Fast-Charging Highway Corridors to 40,000 km with Universal Standards",
    excerpt: "The Ministry of Heavy Industries mandates standardized CCS2 and Bharat DC fast-charging ports across all national expressways, backed by solar microgrids.",
    content: [
      "In a milestone step toward nationwide electric mobility, the Ministry of Heavy Industries has announced a ₹4,500 Crore expansion program to install high-power DC fast-charging hubs every 25 km along national expressways.",
      "The new guidelines mandate dual CCS2 and Type-2 connectors with minimum 120kW power output capability, powered by grid-tied solar canopy microgrids.",
      "With over 1.2 million electric two-wheelers and three-wheelers registered in 2026 alone, universal charging interoperability is expected to reduce range anxiety by over 70% across intercity transit routes."
    ],
    category: "Charging Infrastructure",
    date: "August 18, 2026",
    readTime: "5 min read",
    author: {
      name: "Rohan Sharma",
      role: "EV Infrastructure Lead Analyst",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    },
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&auto=format&fit=crop&q=80",
    featured: true,
    breaking: true,
    views: "14.2k",
    likes: 840,
  },
  {
    id: "news-102",
    title: "Solid-State Battery Pilot Line Achieves 1,000 km Range with 10-Minute Rapid Charge",
    excerpt: "Next-gen solid electrolyte pouch cells demonstrate zero dendrite formation over 3,000 charge cycles, paving the way for ultra-safe high-energy-density EV packs.",
    content: [
      "Leading battery research laboratories have successfully demonstrated a 450 Wh/kg solid-state pouch cell that maintains 94% capacity retention after 3,000 accelerated thermal cycles.",
      "By eliminating liquid flammable electrolytes, solid-state chemistry eliminates thermal runaway risks while enabling 80% charge replenishment in under 10 minutes at 400kW charging rates.",
      "Commercial pilot vehicle testing is scheduled to begin in early 2027 with major Indian 2W and 3W electric vehicle manufacturers."
    ],
    category: "Battery Tech & BMS",
    date: "August 16, 2026",
    readTime: "4 min read",
    author: {
      name: "Dr. Ananya Iyer",
      role: "Senior Electrochemical Scientist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    },
    img: "https://images.unsplash.com/photo-1558441719-2347b7341ed2?w=1200&auto=format&fit=crop&q=80",
    featured: true,
    views: "18.9k",
    likes: 1250,
  },
  {
    id: "news-103",
    title: "FAME-III Subsidy Framework Focuses on Cell-Level Localization and Commercial Fleets",
    excerpt: "New EV policy initiatives introduce higher incentives for OEM manufacturers incorporating locally assembled BMS units and active cell-balancing diagnostic chips.",
    content: [
      "The newly approved FAME-III EV policy policy allocates ₹12,500 Crore in direct subsidies, with 60% prioritized for high-utilization commercial fleets, delivery scooters, and electric autorickshaws.",
      "To encourage domestic manufacturing, additional incentive slabs are awarded to vehicles featuring locally manufactured high-voltage wiring harnesses and active cell-balancing BMS modules.",
      "Commercial fleet operators will also benefit from accelerated depreciation and zero GST rates on battery swapping subscriptions."
    ],
    category: "Policy & Subsidies",
    date: "August 14, 2026",
    readTime: "6 min read",
    author: {
      name: "Vikramaditya Roy",
      role: "Clean Energy Policy Correspondent",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    },
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
    featured: true,
    views: "9.8k",
    likes: 610,
  },
  {
    id: "news-104",
    title: "Electric 2W Sales Surge 65% Year-Over-Year in Tier-2 and Tier-3 Indian Cities",
    excerpt: "Lower total cost of ownership, rising fuel prices, and door-step service networks propel electric scooter adoption across Jaipur, Pune, Surat, and Lucknow.",
    content: [
      "Electric two-wheeler registrations in non-metro Indian cities have outpaced capital metros for the third consecutive quarter, accounting for 58% of total nationwide sales.",
      "Key drivers include reduced operating costs (₹0.25/km vs ₹2.40/km for petrol), home charging convenience, and expanded 24/7 doorstep service networks.",
      "Service providers like MY EV SERVICE report a 300% increase in scheduled maintenance subscriptions across regional hub clusters."
    ],
    category: "Electric 2W & 3W",
    date: "August 11, 2026",
    readTime: "3 min read",
    author: {
      name: "Priya Malhotra",
      role: "Automotive Market Researcher",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    },
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&auto=format&fit=crop&q=80",
    views: "11.4k",
    likes: 730,
  },
  {
    id: "news-105",
    title: "AI-Powered BMS Predictive Telematics Detects Battery Faults 60 Days Before Failure",
    excerpt: "Machine learning algorithms processing live CAN-bus telemetry stream data achieve 99.2% accuracy in predicting cell-level impedance spikes.",
    content: [
      "Engineers at MY EV SERVICE have deployed a proprietary cloud telematics engine that analyzes battery cell voltage differentials, internal resistance, and thermal gradients in real time.",
      "By evaluating over 140 data parameters every second, the predictive model flags micro-short circuits and capacity imbalance weeks before a failure occurs.",
      "Vehicle owners receive automated mobile alerts with recommended cell balancing service appointments, preventing costly pack replacements."
    ],
    category: "MY EV Updates",
    date: "August 08, 2026",
    readTime: "4 min read",
    author: {
      name: "Siddharth Verma",
      role: "Lead Telematics & AI Architect",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    },
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    views: "22.1k",
    likes: 1940,
  },
  {
    id: "news-106",
    title: "Commercial EV Fleets Achieve 99.4% Uptime with QR-Coded Spare Inventory Tracking",
    excerpt: "Automated logistics hubs dispatch OEM controllers and motor bearings with guaranteed 45-minute turnaround times across commercial delivery hubs.",
    content: [
      "Last-mile delivery and logistics fleets operating electric 3W cargo autos have reported record uptime statistics following the deployment of QR-coded inventory tracking.",
      "Central service hubs maintain live stock of genuine BLDC motor stators, MOSFET power gates, and hydraulic brake lines, enabling rapid component-level turnarounds.",
      "SLA maintenance guarantees turn around commercial vehicles in under 45 minutes, ensuring drivers maximize daily earning capacity."
    ],
    category: "Industry Trends",
    date: "August 04, 2026",
    readTime: "5 min read",
    author: {
      name: "Karan Mehta",
      role: "Fleet Operations Specialist",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    },
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80",
    views: "8.6k",
    likes: 520,
  },
];

function EVNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All News");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [readerOpen, setReaderOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [featuredIdx, setFeaturedIdx] = useState(0);

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

  // Auto-rotate featured hero stories every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIdx((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const featuredStories = ARTICLES.filter((a) => a.featured).slice(0, 3);
  const currentHero = featuredStories[featuredIdx] || ARTICLES[0];

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === "All News" || article.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.author.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    setReaderOpen(true);
  };

  const handleBookmarkToggle = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((b) => b !== id));
      toast.info("Article removed from reading list.");
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      toast.success("Article saved to your reading list!");
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Subscribed! You will receive weekly EV mobility intelligence updates.");
    setEmailInput("");
  };

  const isLight = siteTheme === "light";

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 relative overflow-hidden ${
        isLight
          ? "bg-[#f4f8f5] text-[#1a2320] selection:bg-[#00D084] selection:text-black"
          : "bg-[#020503] text-white selection:bg-[#00D084] selection:text-black"
      }`}
    >
      {/* Ambient Neon Glow Background Canvas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-[#00D084]/15 via-transparent to-transparent blur-3xl pointer-events-none z-0" />

      {/* Shared Header Navigation */}
      <Nav />

      {/* =========================================================================
          2. CINEMATIC FULL-SCREEN HERO BREAKING NEWS SLIDER
         ========================================================================= */}
      <section className="relative w-full h-[calc(100vh-80px)] min-h-[580px] mt-20 overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 text-white group border-b border-white/10">
        {/* Background Image with Dynamic Zoom */}
        <img
          src={currentHero.img}
          alt={currentHero.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 pointer-events-none opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-[#020503]/50 to-[#020503]/70 pointer-events-none" />

        {/* Top Header Badges */}
        <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(0,208,132,0.4)]">
            <Flame className="w-3.5 h-3.5 fill-black" />
            TOP COVERAGE • 0{featuredIdx + 1} OF 03
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-mono font-bold text-white/90 border border-white/20 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#00D084]" /> {currentHero.views} Views
            </span>
          </div>
        </div>

        {/* Hero Story Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="text-xs font-mono font-bold uppercase text-[#00D084] tracking-[0.2em] mb-2 flex items-center gap-2">
            <span>{currentHero.category}</span>
            <span>•</span>
            <span>{currentHero.date}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4 drop-shadow-xl max-w-4xl">
            {currentHero.title}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-white/80 font-normal leading-relaxed mb-6 max-w-2xl line-clamp-2">
            {currentHero.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/20">
            <div className="flex items-center gap-3">
              <img
                src={currentHero.author.avatar}
                alt={currentHero.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#00D084]"
              />
              <div>
                <span className="block text-sm font-bold text-white leading-tight">
                  {currentHero.author.name}
                </span>
                <span className="block text-xs text-white/60 font-mono">
                  {currentHero.author.role}
                </span>
              </div>
            </div>

            {/* Slider Dots Indicator & CTA */}
            <div className="flex items-center gap-3">
              {featuredStories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFeaturedIdx(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    featuredIdx === idx
                      ? "w-8 bg-[#00D084]"
                      : "w-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}

              <button
                onClick={() => handleOpenArticle(currentHero)}
                className="ml-4 px-8 py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] hover:scale-105"
              >
                READ FULL STORY <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CATEGORY FILTER & HEADER
         ========================================================================= */}
      <section className="pt-12 pb-6 px-6 max-w-7xl mx-auto relative z-10">
        <div className="mb-6">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
            EV Newsroom & Insights
          </span>
          <h2
            className={`text-3xl sm:text-5xl font-black tracking-tight mt-1 ${
              isLight ? "text-[#1a2320]" : "text-white"
            }`}
          >
            Explore Latest Articles & Reports
          </h2>
        </div>

        {/* Glass Category Filter Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pt-4 pb-8 mb-12 md:mb-20 scrollbar-none">
          {NEWS_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-[0_0_20px_rgba(0,208,132,0.3)] scale-105"
                    : isLight
                    ? "bg-white text-[#334139] border-[#c5d6ca] hover:bg-[#e2ebe4] hover:text-[#1a2320]"
                    : "bg-[#070d09]/80 text-white/70 border-white/10 hover:bg-white/15 hover:text-white backdrop-blur-md"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. ALTERNATING TESLA-STYLE SPLIT ARTICLES LIST (1 BOX LEFT, 1 BOX RIGHT)
         ========================================================================= */}
      <section className="pt-6 pb-24 px-6 max-w-7xl mx-auto relative z-10">
        {filteredArticles.length > 0 ? (
          <div className="space-y-20">
            {filteredArticles.map((article, idx) => {
              const isEven = idx % 2 === 0;
              const isBookmarked = bookmarkedIds.includes(article.id);

              const imageBox = (
                <div className="lg:col-span-7">
                  <div
                    onClick={() => handleOpenArticle(article)}
                    className="relative h-[360px] sm:h-[420px] w-full rounded-[32px] overflow-hidden shadow-2xl bg-slate-900 border border-white/10 group cursor-pointer"
                  >
                    <img
                      src={article.img}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                    {/* Category Pill Badge */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase text-[#00D084] border border-[#00D084]/30 shadow-md">
                      {article.category}
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => handleBookmarkToggle(e, article.id)}
                      className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isBookmarked
                          ? "bg-[#00D084] text-black shadow-[0_0_15px_#00D084]"
                          : "bg-black/75 text-white/80 hover:text-white border border-white/20"
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );

              const textBox = (
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs font-mono opacity-60 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#00D084]" /> {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#00D084]" /> {article.readTime}
                    </span>
                  </div>

                  <h3
                    onClick={() => handleOpenArticle(article)}
                    className={`text-2xl sm:text-4xl font-black tracking-tight mb-4 leading-tight cursor-pointer transition-colors ${
                      isLight ? "text-[#1a2320] hover:text-[#00D084]" : "text-white hover:text-[#00D084]"
                    }`}
                  >
                    {article.title}
                  </h3>

                  <p
                    className={`text-sm sm:text-base font-normal leading-relaxed mb-6 ${
                      isLight ? "text-[#4a5851]" : "text-white/70"
                    }`}
                  >
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-3 mb-8">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#00D084]/40"
                    />
                    <div>
                      <span
                        className={`block text-xs font-bold ${
                          isLight ? "text-[#1a2320]" : "text-white/90"
                        }`}
                      >
                        {article.author.name}
                      </span>
                      <span className="block text-[10px] font-mono opacity-50">
                        {article.author.role}
                      </span>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => handleOpenArticle(article)}
                      className={`px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-md border ${
                        isLight
                          ? "bg-[#101412] text-white hover:bg-black border-white/10"
                          : "bg-white/10 text-white hover:bg-[#00D084] hover:text-black border-white/15"
                      }`}
                    >
                      READ ARTICLE
                    </button>
                  </div>
                </div>
              );

              return (
                <div
                  key={article.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-b border-slate-200/10 pb-16 last:border-b-0"
                >
                  {isEven ? (
                    <>
                      {textBox}
                      {imageBox}
                    </>
                  ) : (
                    <>
                      {imageBox}
                      {textBox}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={`py-24 text-center rounded-[32px] border backdrop-blur-md ${
              isLight ? "bg-white border-[#d6e3da]" : "bg-[#070d0a] border-white/10 text-white"
            }`}
          >
            <Newspaper className="w-14 h-14 text-[#00D084] mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold mb-2">No Matching Articles Found</h3>
            <p className="text-sm opacity-70 mb-6 max-w-md mx-auto">
              We couldn't find any articles matching your query. Try resetting your search terms.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All News");
                setSearchQuery("");
              }}
              className="px-8 py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest shadow-md hover:bg-[#00e08f]"
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}
      </section>

      {/* =========================================================================
          5. FUTURISTIC NEWSLETTER SUBSCRIPTION POD
         ========================================================================= */}
      <section
        className={`py-24 px-6 border-y relative z-10 ${
          isLight ? "bg-[#e2ebe4] border-[#d2e0d5]" : "bg-[#050a07] border-white/10"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#00D084]/15 border border-[#00D084]/30 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            WEEKLY EV MOBILITY INTELLIGENCE
          </div>

          <h2
            className={`text-4xl sm:text-6xl font-black tracking-tight mb-4 ${
              isLight ? "text-[#1a2320]" : "text-white"
            }`}
          >
            Stay Ahead of the Clean Tech Curve
          </h2>

          <p
            className={`text-base font-normal max-w-xl mx-auto mb-10 leading-relaxed ${
              isLight ? "text-[#4a5851]" : "text-white/70"
            }`}
          >
            Join 45,000+ EV engineers, fleet managers, and automotive executives receiving our weekly technical deep-dives every Monday morning.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your professional email..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className={`w-full rounded-full px-6 py-4 text-xs focus:outline-none focus:border-[#00D084] border font-medium ${
                isLight
                  ? "bg-white border-[#c5d6ca] text-[#1a2320]"
                  : "bg-[#020503] border-white/20 text-white"
              }`}
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] shrink-0 cursor-pointer hover:scale-105"
            >
              SUBSCRIBE NOW
            </button>
          </form>
        </div>
      </section>

      {/* Shared Reusable Footer */}
      <Footer />

      {/* =========================================================================
          6. FULL-SCREEN IMMERSIVE READER OVERLAY
         ========================================================================= */}
      {readerOpen && selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto">
          <div
            className={`border rounded-[36px] max-w-3xl w-full p-6 md:p-12 relative overflow-hidden shadow-2xl my-8 animate-in fade-in zoom-in duration-300 ${
              isLight
                ? "bg-white border-[#d6e3da] text-[#1a2320]"
                : "bg-[#060b08] border-white/20 text-white"
            }`}
          >
            {/* Top Reading Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#00D084] shadow-[0_0_10px_#00D084]" />

            <button
              onClick={() => setReaderOpen(false)}
              className={`absolute top-6 right-6 p-3 rounded-full transition-all cursor-pointer ${
                isLight
                  ? "text-slate-400 hover:text-slate-900 bg-slate-100"
                  : "text-white/40 hover:text-white bg-white/10 border border-white/10"
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-8">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D084] bg-[#00D084]/15 border border-[#00D084]/30 px-3.5 py-1 rounded-full">
                {selectedArticle.category}
              </span>

              <h2 className="text-3xl sm:text-5xl font-black mt-4 mb-4 leading-tight tracking-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono opacity-70 border-b border-slate-200/10 pb-5">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#00D084]" /> {selectedArticle.author.name} ({selectedArticle.author.role})
                </span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>
            </div>

            {/* Modal Featured Image */}
            <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden mb-8 bg-slate-900 border border-white/10 shadow-xl">
              <img
                src={selectedArticle.img}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Article Body Paragraphs */}
            <div className="space-y-6 text-base sm:text-lg font-normal leading-relaxed opacity-90 mb-10">
              {selectedArticle.content.map((paragraph, pi) => (
                <p key={pi} className="first-letter:text-4xl first-letter:font-black first-letter:text-[#00D084] first-letter:mr-2">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-6 border-t border-slate-200/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    toast.success("Article link copied to clipboard!");
                  }}
                  className="px-6 py-3 rounded-full border border-white/20 text-xs font-bold flex items-center gap-2 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#00D084]" />
                  Share Story
                </button>
              </div>

              <button
                onClick={() => setReaderOpen(false)}
                className="px-9 py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-lg"
              >
                CLOSE READER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
