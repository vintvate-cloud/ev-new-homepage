import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  Video,
  Calendar,
  Clock,
  User,
  Sparkles,
  Play,
  CheckCircle2,
  Share2,
  X,
  Search,
  Users,
  Award,
  Zap,
  ArrowRight,
  ShieldCheck,
  Building,
  GraduationCap,
  MessageSquare,
  Radio,
  Flame,
  Star,
  Download,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Briefcase,
  MapPin,
  Newspaper,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/webinars")({
  component: WebinarsPage,
});

function WebinarsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "archive" | "recommended">("upcoming");
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [requestTopicModalOpen, setRequestTopicModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

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

  // Registration Form State
  const [regForm, setRegForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    notes: "",
  });

  // Request Topic Form State
  const [topicForm, setTopicForm] = useState({
    name: "",
    email: "",
    requestedTopic: "",
  });

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.fullName || !regForm.email || !regForm.mobile) {
      toast.error("Please fill in your Full Name, Email, and Mobile number.");
      return;
    }
    toast.success(
      `Pass Confirmed! Registration link sent to ${regForm.email}`
    );
    setRegModalOpen(false);
    setRegForm({ fullName: "", email: "", mobile: "", city: "", notes: "" });
  };

  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicForm.name || !topicForm.email || !topicForm.requestedTopic) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Topic request submitted! Our team will notify you when scheduled.");
    setRequestTopicModalOpen(false);
    setTopicForm({ name: "", email: "", requestedTopic: "" });
  };

  const isLight = siteTheme === "light";

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 relative overflow-hidden ${
        isLight
          ? "bg-[#f4f8f5] text-[#1a2320] selection:bg-[#00D084] selection:text-black"
          : "bg-[#050507] text-white selection:bg-[#FF3B30] selection:text-white"
      }`}
    >
      {/* Background Ambient Crimson & Neon Glow Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] bg-radial from-red-600/20 via-[#00D084]/10 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Shared Navigation Header */}
      <Nav />

      {/* =========================================================================
          1. HERO AGENTIC LAYOUT (Matching Screenshot 1:1)
         ========================================================================= */}
      <section className="relative pt-28 pb-20 px-6 max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-80px)]">
        {/* Left Column Content */}
        <div className="lg:col-span-6 z-10">


          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 drop-shadow-2xl">
            Webinars built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-[#00D084]">
              EV owners, technicians, & franchises.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg font-normal text-white/70 leading-relaxed mb-8 max-w-xl">
            Practical, field-tested sessions designed to reduce diagnosis time, improve SOP quality, and help partners scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="#featured-section"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-black uppercase tracking-widest hover:from-red-500 hover:to-rose-500 transition-all shadow-[0_0_35px_rgba(255,59,48,0.5)] hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              EXPLORE FEATURED <ChevronRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setRequestTopicModalOpen(true)}
              className="px-8 py-4 rounded-full bg-white/5 text-white border border-white/15 hover:bg-white/10 text-xs font-black uppercase tracking-widest transition-all cursor-pointer backdrop-blur-md flex items-center gap-2"
            >
              REQUEST A TOPIC <HelpCircle className="w-4 h-4 text-red-400" />
            </button>
          </div>

          {/* Bottom 3 Stat Widgets */}
          <div className="grid grid-cols-3 gap-3 max-w-lg">
            <div className="bg-[#101015]/90 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
              <div className="text-xs font-mono opacity-50 uppercase mb-1">Upcoming</div>
              <div className="text-2xl font-black text-white font-mono flex items-center gap-1.5">
                1 Session
              </div>
            </div>
            <div className="bg-[#101015]/90 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
              <div className="text-xs font-mono opacity-50 uppercase mb-1">SOP Quality</div>
              <div className="text-2xl font-black text-red-500 font-mono">95%</div>
            </div>
            <div className="bg-[#101015]/90 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
              <div className="text-xs font-mono opacity-50 uppercase mb-1">Retention</div>
              <div className="text-2xl font-black text-[#00D084] font-mono">88%</div>
            </div>
          </div>
        </div>

        {/* Right Column / Center Glowing Visual Container */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[450px]">
          {/* Glowing Jellyfish / Hologram Artwork Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[350px] h-[350px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-red-600/30 via-rose-500/20 to-[#00D084]/20 blur-3xl animate-pulse" />
          </div>

          <img
            src="https://images.unsplash.com/photo-1558441719-2347b7341ed2?w=1000&auto=format&fit=crop&q=80"
            alt="EV Diagnostic Masterclass"
            className="w-full max-w-md h-[400px] object-cover rounded-[36px] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10 opacity-85 hover:scale-102 transition-transform duration-700"
          />

          {/* Floating Top Right Card Badge (230+ / 400+) */}
          <div className="absolute top-4 right-0 sm:-right-4 bg-[#101015]/95 border border-white/15 p-5 rounded-3xl backdrop-blur-2xl shadow-2xl z-20 max-w-[220px]">
            <div className="flex items-center justify-between text-[10px] font-mono opacity-60 mb-2">
              <span>Agentic EV</span>
              <span className="text-[#00D084]">01/04</span>
            </div>
            <div className="text-3xl font-black font-mono text-white mb-1">230+</div>
            <div className="text-[11px] text-white/70 leading-tight mb-4">
              Masterclasses successfully conducted nationwide.
            </div>
            <div className="text-2xl font-black font-mono text-white mb-1">400+</div>
            <div className="text-[11px] text-white/70 leading-tight mb-4">
              Trusted Franchise Partners.
            </div>
            <button
              onClick={() => setRegModalOpen(true)}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md hover:opacity-90"
            >
              BOOK A SEAT
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. LARGE TYPOGRAPHIC STATEMENT SECTION (Matching Screenshot)
         ========================================================================= */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center relative z-10 border-t border-white/10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-white/70 mb-6">
          • About Our Sessions
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black leading-snug tracking-tight text-white/90 max-w-5xl mx-auto">
          We <span className="text-red-500 underline decoration-red-500/50">design</span> and deploy EV masterclasses with practical field-tested SOPs at the core, ensuring every <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-[#00D084]">system enhances</span> real-world diagnostic performance.
        </h2>
      </section>

      {/* =========================================================================
          3. BENTO BOX FEATURE GRID (Matching Screenshot Bento Cards 1:1)
         ========================================================================= */}
      <section id="featured-section" className="py-16 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Big Bento Card */}
          <div className="lg:col-span-7 bg-[#101015]/90 border border-white/10 rounded-[36px] p-8 sm:p-12 flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden shadow-2xl group">
            <div className="relative z-10">
              <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-widest block mb-2">
                • Available for Franchise Partners
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Based in <span className="text-red-500">Pune, India</span> & Pan-India Hubs
              </h3>
              <button
                onClick={() => setRegModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider border border-white/15 mb-8 cursor-pointer"
              >
                Start a Franchise
              </button>
            </div>

            {/* Visual Media Container */}
            <div className="relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80"
                alt="Franchise Onboarding Workshop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/90">
                <span>Session: Franchise Partner Onboarding</span>
                <span className="text-[#00D084]">3/1/2026 • 4:30 PM</span>
              </div>
            </div>
          </div>

          {/* Right Column Bento Cards Stack */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            {/* Top Stat Card */}
            <div className="bg-[#101015]/90 border border-white/10 rounded-[36px] p-8 sm:p-10 backdrop-blur-2xl shadow-2xl flex flex-col justify-between flex-1">
              <div>
                <p className="text-xs font-mono text-white/60 mb-2">
                  Trusted by 120+ clients across 4 industries — shipping EV knowledge to production in 8-10 weeks
                </p>
              </div>
              <div className="pt-6">
                <div className="text-5xl sm:text-6xl font-black font-mono text-white tracking-tight">
                  120+
                </div>
                <div className="flex items-center gap-1 text-red-500 mt-2">
                  {"★".repeat(5)}
                  <span className="text-xs font-mono text-white/50 ml-2">5.0 Rating</span>
                </div>
              </div>
            </div>

            {/* Bottom Testimonial / Speaker Card */}
            <div className="bg-[#101015]/90 border border-white/10 rounded-[36px] p-8 backdrop-blur-2xl shadow-2xl flex items-center gap-6">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
                alt="Arun Patel"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-red-500 shrink-0"
              />
              <div>
                <p className="text-xs text-white/80 italic font-normal leading-relaxed mb-3">
                  "Good EV training feels obvious—because the hard diagnostic work is hidden."
                </p>
                <div className="text-xs font-bold text-white">Arun Patel</div>
                <div className="text-[10px] font-mono opacity-50">Franchise Operations Lead</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. BRAND LOGO TICKER (Matching Screenshot 1:1)
         ========================================================================= */}
      <section className="py-12 px-6 max-w-7xl mx-auto relative z-10 border-t border-b border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-8 opacity-50">
          <span className="text-xs font-mono uppercase tracking-widest text-white/60">
            Trusted by 100+ top-tier brands
          </span>
          <div className="flex flex-wrap items-center gap-8 font-mono text-sm font-black tracking-widest text-white/80">
            <span>LOGOIPSUM</span>
            <span>✦</span>
            <span>MY EV SERVICE</span>
            <span>✦</span>
            <span>AUTOBOT</span>
            <span>✦</span>
            <span>LOGOIPSUM</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. END-TO-END WEBINAR SERVICES ARCHIVE GRID (Matching Screenshot)
         ========================================================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Header */}
          <div className="lg:col-span-5">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-red-500 mb-4">
              • Services & Masterclasses
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
              End-to-End EV Services & Training
            </h2>
            <p className="text-sm text-white/60 leading-relaxed mb-8">
              We turn ambiguous EV battery & diagnostic ideas into field-ready SOPs combining strategy, engineering, and hands-on evaluation.
            </p>

            {/* Tabs */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`w-full py-3.5 px-6 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider text-left transition-all cursor-pointer border ${
                  activeTab === "upcoming"
                    ? "bg-red-600 text-white border-red-500 shadow-[0_0_20px_rgba(255,59,48,0.4)]"
                    : "bg-[#101015]/80 text-white/60 border-white/10 hover:bg-white/10"
                }`}
              >
                Upcoming Live Sessions
              </button>
              <button
                onClick={() => setActiveTab("archive")}
                className={`w-full py-3.5 px-6 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider text-left transition-all cursor-pointer border ${
                  activeTab === "archive"
                    ? "bg-red-600 text-white border-red-500 shadow-[0_0_20px_rgba(255,59,48,0.4)]"
                    : "bg-[#101015]/80 text-white/60 border-white/10 hover:bg-white/10"
                }`}
              >
                Archive Replays
              </button>
              <button
                onClick={() => setActiveTab("recommended")}
                className={`w-full py-3.5 px-6 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider text-left transition-all cursor-pointer border ${
                  activeTab === "recommended"
                    ? "bg-red-600 text-white border-red-500 shadow-[0_0_20px_rgba(255,59,48,0.4)]"
                    : "bg-[#101015]/80 text-white/60 border-white/10 hover:bg-white/10"
                }`}
              >
                Recommended Path
              </button>
            </div>
          </div>

          {/* Right Interactive Topic Cards List */}
          <div className="lg:col-span-7 space-y-6">
            {/* Card 1: Featured Webinar */}
            <div className="bg-[#101015]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden group hover:border-red-500/40 transition-all duration-300">
              <div className="flex items-center justify-between text-xs font-mono opacity-50 mb-3">
                <span>01</span>
                <span className="text-red-500 font-bold">LIVE</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Franchise Partner Onboarding</h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Everything you need to launch your EV service franchise (3/1/2026, 4:30:00 PM • 120 min)
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["onboarding", "operations", "business", "franchise"].map((t) => (
                  <span key={t} className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">
                    #{t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs font-mono text-white/80">Speaker: Arun Patel</span>
                <button
                  onClick={() => setRegModalOpen(true)}
                  className="px-6 py-2 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider hover:bg-red-500 cursor-pointer shadow-md"
                >
                  REGISTER NOW
                </button>
              </div>
            </div>

            {/* Card 2: Expert Spotlight (Ashwini Tiwari) */}
            <div className="bg-[#101015]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden group hover:border-[#00D084]/40 transition-all duration-300">
              <div className="flex items-center justify-between text-xs font-mono opacity-50 mb-3">
                <span>02</span>
                <span className="text-[#00D084] font-bold">EXPERT SPOTLIGHT</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Ashwini Tiwari"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#00D084]"
                />
                <div>
                  <h4 className="text-lg font-bold text-white">Ashwini Tiwari</h4>
                  <p className="text-xs text-[#00D084] font-mono">Founder & EV Consultant • Autobot Engineers</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">EV Technology</span>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">Battery Technology</span>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">EV Business Modelling</span>
              </div>
              <button
                onClick={() => setProfileModalOpen(true)}
                className="w-full py-2.5 rounded-full bg-white/10 text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-white/20 border border-white/15 cursor-pointer"
              >
                VIEW PROFILE
              </button>
            </div>

            {/* Card 3: Latest News Item (Pune City Launch) */}
            <div className="bg-[#101015]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden group hover:border-white/30 transition-all duration-300">
              <div className="flex items-center justify-between text-xs font-mono opacity-50 mb-3">
                <span>03</span>
                <span className="text-white/80 font-bold">LATEST NEWS</span>
              </div>
              <h4 className="text-lg font-black text-white mb-2">
                Multi-Brand EV Service Centre Opportunity in Pune | City Launch by MY EV SERVICE
              </h4>
              <p className="text-xs text-white/60 leading-relaxed mb-4">
                Discover the Pune city launch of MY EV SERVICE’s multi-brand EV service centre opportunity. Explore high-demand PIN code areas, EV market potential, and how to...
              </p>
              <a href="/news" className="text-xs font-mono font-bold text-red-400 hover:underline flex items-center gap-1">
                Read News Release <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Footer */}
      <Footer />

      {/* =========================================================================
          6. INTERACTIVE MODALS
         ========================================================================= */}

      {/* Registration Modal */}
      {regModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="border border-white/20 rounded-[32px] max-w-lg w-full p-6 md:p-8 relative shadow-2xl bg-[#0a0a0f] text-white">
            <button
              onClick={() => setRegModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold uppercase text-red-500">
                Webinar Pass Registration
              </span>
              <h3 className="text-2xl font-black mt-1">Franchise Partner Onboarding</h3>
              <p className="text-xs font-mono opacity-70 mt-1">
                3/1/2026, 4:30:00 PM • Speaker: Arun Patel
              </p>
            </div>

            <form onSubmit={handleRegSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={regForm.fullName}
                  onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    className="w-full border border-white/15 rounded-xl px-3 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                    Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={regForm.mobile}
                    onChange={(e) => setRegForm({ ...regForm, mobile: e.target.value })}
                    className="w-full border border-white/15 rounded-xl px-3 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pune, Bangalore, Delhi"
                  value={regForm.city}
                  onChange={(e) => setRegForm({ ...regForm, city: e.target.value })}
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-widest hover:bg-red-500 transition-all shadow-md cursor-pointer mt-2"
              >
                CONFIRM FREE REGISTRATION
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Request Topic Modal */}
      {requestTopicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="border border-white/20 rounded-[32px] max-w-lg w-full p-6 md:p-8 relative shadow-2xl bg-[#0a0a0f] text-white">
            <button
              onClick={() => setRequestTopicModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono font-bold uppercase text-red-500">
              Community Request
            </span>
            <h3 className="text-2xl font-black mt-1 mb-2">Request a Webinar Topic</h3>
            <p className="text-xs opacity-70 mb-6">
              Tell us what EV diagnostic, battery tech, or business topic you want our experts to cover next.
            </p>

            <form onSubmit={handleTopicSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={topicForm.name}
                  onChange={(e) => setTopicForm({ ...topicForm, name: e.target.value })}
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={topicForm.email}
                  onChange={(e) => setTopicForm({ ...topicForm, email: e.target.value })}
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase opacity-70 block mb-1">
                  Requested Topic / Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. BMS firmware flashing, 3W motor rewinding..."
                  value={topicForm.requestedTopic}
                  onChange={(e) => setTopicForm({ ...topicForm, requestedTopic: e.target.value })}
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-widest hover:bg-red-500 transition-all shadow-md cursor-pointer"
              >
                SUBMIT TOPIC REQUEST
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Expert Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="border border-white/20 rounded-[32px] max-w-md w-full p-6 md:p-8 relative shadow-2xl bg-[#0a0a0f] text-white">
            <button
              onClick={() => setProfileModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                alt="Ashwini Tiwari"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#00D084] mx-auto mb-4"
              />
              <h3 className="text-2xl font-black">Ashwini Tiwari</h3>
              <p className="text-xs text-[#00D084] font-mono font-bold mt-0.5">
                Founder & EV Consultant
              </p>
              <p className="text-xs font-mono opacity-60 mt-0.5">
                Autobot Engineers India Pvt Ltd.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <span className="text-[10px] font-mono uppercase opacity-60 block">
                Expertise Domains:
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">
                  EV Technology
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">
                  Battery Technology
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">
                  EV Business Modelling
                </span>
              </div>
            </div>

            <button
              onClick={() => setProfileModalOpen(false)}
              className="w-full py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest shadow-md cursor-pointer"
            >
              CLOSE PROFILE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
