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
          : "bg-[#030604] text-white selection:bg-[#00D084] selection:text-black"
      }`}
    >
      {/* Shared Navigation Header */}
      <Nav />

      {/* =========================================================================
          1ST SECTION: WHOLE SCREEN VIDEO HERO (Redesigned like Careers Hero)
         ========================================================================= */}
      <section className="relative w-full h-screen min-h-[680px] overflow-hidden text-white flex items-end justify-center pb-12 sm:pb-16 -mt-20">
        {/* Background Video Stream */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-105"
          poster="https://images.unsplash.com/photo-1558441719-2347b7341ed2?w=1600&auto=format&fit=crop&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-working-in-a-factory-42867-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Vignette Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020403]/85 via-[#020403]/60 to-[#020403] pointer-events-none" />

        {/* Hero Content (Positioned at bottom of hero) */}
        <div className="max-w-5xl mx-auto text-center relative z-10 px-6 pt-28 pb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-5 leading-[1.10]">
            Master EV Technology & Scale Your Business.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#d0e0d6] font-normal max-w-2xl mx-auto mb-8 leading-relaxed">
            Practical, field-tested sessions designed for EV owners, technicians, and franchise partners to master battery diagnostics and shop automation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#featured-section"
              className="px-7 py-3.5 rounded-full bg-[#00D084] text-[#020403] text-[11px] font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              EXPLORE FEATURED <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setRequestTopicModalOpen(true)}
              className="px-7 py-3.5 rounded-full border border-white/30 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#00D084]" />
              REQUEST A TOPIC
            </button>
          </div>

          {/* Quick Metrics Bar below Hero CTAs */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-10 pt-6 border-t border-white/15">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-black text-white font-mono">230+</div>
              <div className="text-[10px] font-serif text-white/60 uppercase mt-0.5">Masterclasses Held</div>
            </div>
            <div className="text-center border-x border-white/15">
              <div className="text-xl sm:text-2xl font-black text-[#00D084] font-mono">95%</div>
              <div className="text-[10px] font-serif text-white/60 uppercase mt-0.5">SOP Quality</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-black text-white font-mono">400+</div>
              <div className="text-[10px] font-serif text-white/60 uppercase mt-0.5">Partner Hubs</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. LARGE TYPOGRAPHIC STATEMENT SECTION
         ========================================================================= */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center relative z-10 border-t border-white/10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-white/70 mb-6">
          • About Our Sessions
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black leading-snug tracking-tight text-white/90 max-w-5xl mx-auto">
          We <span className="text-[#00D084] underline decoration-[#00D084]/50">design</span> and deploy EV masterclasses with practical field-tested SOPs at the core, ensuring every <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D084] to-emerald-300">system enhances</span> real-world diagnostic performance.
        </h2>
      </section>

      {/* =========================================================================
          3. BENTO BOX FEATURE GRID
         ========================================================================= */}
      <section id="featured-section" className="py-16 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Big Bento Card */}
          <div className="lg:col-span-7 bg-[#101015]/90 border border-white/10 rounded-[36px] p-8 sm:p-12 flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-xs font-mono text-[#00D084] font-bold uppercase tracking-widest block mb-2">
                • Available for Franchise Partners
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Based in <span className="text-[#00D084]">Pune, India</span> & Pan-India Hubs
              </h3>
              <button
                onClick={() => setRegModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider border border-white/15 mb-8 cursor-pointer"
              >
                Start a Franchise
              </button>
            </div>

            {/* Visual Media Container */}
            <div className="relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
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
            <div className="bg-[#101015]/90 border border-white/10 rounded-[36px] p-8 sm:p-10 backdrop-blur-2xl flex flex-col justify-between flex-1">
              <div>
                <p className="text-xs font-mono text-white/60 mb-2">
                  Trusted by 120+ clients across 4 industries — shipping EV knowledge to production in 8-10 weeks
                </p>
              </div>
              <div className="pt-6">
                <div className="text-5xl sm:text-6xl font-black font-mono text-white tracking-tight">
                  120+
                </div>
                <div className="flex items-center gap-1 text-[#00D084] mt-2">
                  {"★".repeat(5)}
                  <span className="text-xs font-mono text-white/50 ml-2">5.0 Rating</span>
                </div>
              </div>
            </div>

            {/* Bottom Testimonial / Speaker Card */}
            <div className="bg-[#101015]/90 border border-white/10 rounded-[36px] p-8 backdrop-blur-2xl flex items-center gap-6">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
                alt="Arun Patel"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#00D084] shrink-0"
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
          4. BRAND LOGO TICKER
         ========================================================================= */}
      <section className="py-12 px-6 max-w-7xl mx-auto relative z-10 border-t border-b border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-8 opacity-50">
          <span className="text-xs font-mono uppercase tracking-widest text-white/60">
            Trusted by 100+ top-tier brands
          </span>
          <div className="flex flex-wrap items-center gap-8 font-mono text-sm font-black tracking-widest text-white/80">
            <span>MY EV SERVICE</span>
            <span>✦</span>
            <span>AUTOBOT OS</span>
            <span>✦</span>
            <span>ATHER ENERGY</span>
            <span>✦</span>
            <span>OLA ELECTRIC</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. END-TO-END WEBINAR SERVICES ARCHIVE GRID
         ========================================================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Header */}
          <div className="lg:col-span-5">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-[#00D084] mb-4">
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
                    ? "bg-[#00D084] text-[#020403] border-[#00D084]"
                    : "bg-[#101015]/80 text-white/60 border-white/10 hover:bg-white/10"
                }`}
              >
                Upcoming Live Sessions
              </button>
              <button
                onClick={() => setActiveTab("archive")}
                className={`w-full py-3.5 px-6 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider text-left transition-all cursor-pointer border ${
                  activeTab === "archive"
                    ? "bg-[#00D084] text-[#020403] border-[#00D084]"
                    : "bg-[#101015]/80 text-white/60 border-white/10 hover:bg-white/10"
                }`}
              >
                Archive Replays
              </button>
              <button
                onClick={() => setActiveTab("recommended")}
                className={`w-full py-3.5 px-6 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider text-left transition-all cursor-pointer border ${
                  activeTab === "recommended"
                    ? "bg-[#00D084] text-[#020403] border-[#00D084]"
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
            <div className="bg-[#101015]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl relative overflow-hidden group hover:border-[#00D084]/40 transition-all duration-300">
              <div className="flex items-center justify-between text-xs font-mono opacity-50 mb-3">
                <span>01</span>
                <span className="text-[#00D084] font-bold">LIVE</span>
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
                  className="px-6 py-2 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-wider hover:bg-[#00e08f] cursor-pointer"
                >
                  REGISTER NOW
                </button>
              </div>
            </div>

            {/* Card 2: Expert Spotlight (Ashwini Tiwari) */}
            <div className="bg-[#101015]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl relative overflow-hidden group hover:border-[#00D084]/40 transition-all duration-300">
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
            <div className="bg-[#101015]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl relative overflow-hidden group hover:border-white/30 transition-all duration-300">
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
              <a href="/news" className="text-xs font-mono font-bold text-[#00D084] hover:underline flex items-center gap-1">
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
          <div className="border border-white/20 rounded-[32px] max-w-lg w-full p-6 md:p-8 relative bg-[#0a0a0f] text-white">
            <button
              onClick={() => setRegModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold uppercase text-[#00D084]">
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
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-[#00D084]"
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
                    className="w-full border border-white/15 rounded-xl px-3 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-[#00D084]"
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
                    className="w-full border border-white/15 rounded-xl px-3 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-[#00D084]"
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
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer mt-2"
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
          <div className="border border-white/20 rounded-[32px] max-w-lg w-full p-6 md:p-8 relative bg-[#0a0a0f] text-white">
            <button
              onClick={() => setRequestTopicModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono font-bold uppercase text-[#00D084]">
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
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-[#00D084]"
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
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-[#00D084]"
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
                  className="w-full border border-white/15 rounded-xl px-4 py-2.5 text-xs bg-black/50 text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer"
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
          <div className="border border-white/20 rounded-[32px] max-w-md w-full p-6 md:p-8 relative bg-[#0a0a0f] text-white">
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
              className="w-full py-3 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest cursor-pointer"
            >
              CLOSE PROFILE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
