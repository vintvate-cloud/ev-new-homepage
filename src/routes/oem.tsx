import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  ShieldCheck,
  Building2,
  CalendarCheck,
  FileText,
  Phone,
  CheckCircle2,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  Wrench,
  Cpu,
  Layers,
  Sparkles,
  PhoneCall,
  Check,
  ChevronDown,
  ChevronRight,
  Download,
  Mail,
  Car,
  Bike,
  Activity,
  Award,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/oem")({
  head: () => ({
    meta: [
      { title: "EV After-Sales Partner for OEMs & Dealers | MY EV SERVICE" },
      {
        name: "description",
        content:
          "After-sales service partner for electric 2W and 3W brands: warranty, recall and PDI jobs, parts logistics, technician training and field data on Autobot OS.",
      },
      { name: "keywords", content: "EV after-sales service partner, EV OEM service partner India, EV warranty service partner, EV dealer service support, EV recall service" },
      { property: "og:title", content: "EV After-Sales Partner for OEMs & Dealers | MY EV SERVICE" },
      { property: "og:description", content: "After-sales service partner for electric 2W and 3W brands: warranty, recall and PDI jobs, parts logistics, technician training and field data on Autobot OS." },
      { property: "og:image", content: "/assets/images/og-oem.jpg" },
    ],
  }),
  component: OEMSolutionsPage,
});

export const OEM_HERO_BG = "/ev-service-centre-real-hero.png";

export function OEMSolutionsPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({
    company: "",
    name: "",
    designation: "",
    email: "",
    mobile: "",
    vehicleCategory: "Both",
    partnershipType: [] as string[],
    targetCities: "",
    consent: false,
  });

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

  const handleTypeToggle = (item: string) => {
    setForm((prev) => ({
      ...prev,
      partnershipType: prev.partnershipType.includes(item)
        ? prev.partnershipType.filter((t) => t !== item)
        : [...prev.partnershipType, item],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.name || !form.mobile) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!form.consent) {
      toast.error("Please agree to the privacy policy to proceed.");
      return;
    }
    toast.success("Thank you! Our OEM partnerships team will respond within one business day.");
    setForm({
      company: "",
      name: "",
      designation: "",
      email: "",
      mobile: "",
      vehicleCategory: "Both",
      partnershipType: [],
      targetCities: "",
      consent: false,
    });
  };

  const FAQS = [
    {
      q: "Can you service our vehicles under our procedures?",
      a: "Yes. Your standard operating procedures (SOPs), labor times and parts lists are loaded directly into Autobot OS and enforced on every digital job card.",
    },
    {
      q: "Do you handle warranty and recall work?",
      a: "Yes. We diagnose, repair and submit claims with full photo, fault-code telemetry and battery data evidence for your engineering team's approval.",
    },
    {
      q: "How is our data and IP protected?",
      a: "We execute mutual NDAs and enterprise data-governance agreements before onboarding. Access in Autobot OS is role-based and encrypted.",
    },
    {
      q: "Do you require exclusivity?",
      a: "No. Engagements can be configured city-by-city and can sit alongside or back up your existing authorized dealership networks.",
    },
    {
      q: "Which vehicle categories do you support?",
      a: "Electric two-wheelers (motorcycles & high-speed scooters) and three-wheelers (L3 and L5 passenger & cargo models).",
    },
    {
      q: "How quickly can you cover a new city?",
      a: "It depends on initial volumes and parts availability. Typically, our standardized 90-day launch playbook prepares centres, tooling and technicians rapidly.",
    },
    {
      q: "Can you train our dealer technicians?",
      a: "Yes. Autobot Academy conducts customized technical training and certification batches specifically engineered around your powertrain platform.",
    },
  ];

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
            className="services-bg-img absolute inset-0 bg-cover bg-center opacity-85 pointer-events-none scale-105 transition-all duration-700"
            style={{
              backgroundImage: `url('${OEM_HERO_BG}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

          <div
            ref={heroTextRef}
            className="max-w-4xl mx-auto text-center relative z-10 px-6 space-y-4 pointer-events-auto"
          >
            <span className="hero-sub-reveal text-xs font-mono font-bold uppercase tracking-widest text-[#00D084]">
              • EV After-Sales Infrastructure For Manufacturers · Pune &amp; Maharashtra
            </span>
            <h1 className="hero-title-reveal text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Your After-Sales Network, <br className="hidden sm:block" />
              <span className="text-[#00D084]">Ready Wherever Your EVs Are Sold</span>
            </h1>
            <p className="hero-sub-reveal text-sm sm:text-base md:text-lg text-[#c2d1c7] font-light max-w-2xl mx-auto leading-relaxed">
              Plug-in service capacity for electric 2W and 3W manufacturers and dealer groups: certified EV technicians, standard workshops, parts logistics and warranty-job handling, all run on Autobot OS with full telemetry visibility.
            </p>
            <div className="hero-btn-reveal pt-3 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#enquiry"
                className="whitespace-nowrap inline-flex items-center shrink-0 gap-2 px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] cursor-pointer hover:scale-105"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span>REQUEST PARTNERSHIP CALL</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
              <a
                href="#models"
                className="px-7 py-4 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>EXPLORE OEM MODELS</span>
              </a>
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
            <div className="pb-3 px-6 max-w-7xl mx-auto">
              <nav aria-label="breadcrumb" className="text-xs font-mono text-white/50 flex items-center gap-2">
                <Link to="/" className="hover:text-[#00D084] transition-colors">Home</Link>
                <span>›</span>
                <span className="text-[#00D084]">OEM Solutions</span>
              </nav>
            </div>

            {/* S1: Dedicated B2B Header Bar */}
            <section className="bg-[#080d0a]/90 border-y border-white/10 py-3 px-6 sticky top-20 z-30 backdrop-blur-md">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="font-black text-white uppercase tracking-wider">MY EV SERVICE</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] font-bold text-[10px] uppercase">
                    FOR BUSINESS
                  </span>
                  <div className="hidden md:flex items-center gap-4 text-white/60 pl-4 border-l border-white/10">
                    <Link to="/fleet" className="hover:text-white transition-colors">Fleet Solutions</Link>
                    <a href="#services" className="hover:text-white transition-colors">OEM Solutions</a>
                    <a href="#autobot-os" className="hover:text-white transition-colors">Autobot OS for OEMs</a>
                    <a href="#models" className="hover:text-white transition-colors">Engagement Models</a>
                    <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="tel:+919582390001" className="text-white/80 hover:text-[#00D084] flex items-center gap-1.5 transition-colors">
                    <PhoneCall className="w-3.5 h-3.5 text-[#00D084]" />
                    <span>+91 95823 90001</span>
                  </a>
                  <a
                    href="#enquiry"
                    className="px-3.5 py-1.5 rounded-full bg-[#00D084] text-[#020403] font-bold text-[11px] uppercase tracking-wider hover:bg-[#00e08f] transition-all"
                  >
                    Request Partnership Call
                  </a>
                </div>
              </div>
            </section>

            {/* S2: Top Overview & Form Section */}
            <section id="services" className="relative px-6 py-12 md:py-16 overflow-hidden">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
                
                {/* Left Column: 4 Key Highlight Tiles */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all shadow-lg">
                      <div className="w-8 h-8 rounded-xl bg-[#00D084]/20 text-[#00D084] flex items-center justify-center font-bold text-xs mb-3">01</div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#00D084] block mb-1 font-bold">No New Capex</span>
                      <span className="text-sm font-semibold text-white block leading-snug">Instant service capacity without building or financing your own retail centres</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all shadow-lg">
                      <div className="w-8 h-8 rounded-xl bg-[#00D084]/20 text-[#00D084] flex items-center justify-center font-bold text-xs mb-3">02</div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#00D084] block mb-1 font-bold">Your Exact SOPs</span>
                      <span className="text-sm font-semibold text-white block leading-snug">Warranty, recall and PDI jobs executed to your exact manufacturer specifications</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all shadow-lg">
                      <div className="w-8 h-8 rounded-xl bg-[#00D084]/20 text-[#00D084] flex items-center justify-center font-bold text-xs mb-3">03</div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#00D084] block mb-1 font-bold">Real-Time Field Data</span>
                      <span className="text-sm font-semibold text-white block leading-snug">Every repair, fault code and part failure reported back to your engineering team via API</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all shadow-lg">
                      <div className="w-8 h-8 rounded-xl bg-[#00D084]/20 text-[#00D084] flex items-center justify-center font-bold text-xs mb-3">04</div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#00D084] block mb-1 font-bold">City-Ready Scale</span>
                      <span className="text-sm font-semibold text-white block leading-snug">A proven launch playbook ensuring readiness wherever your distributors sell</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0D5C2E]/20 to-[#07110B] border border-[#00D084]/30 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-white">Direct OEM Partnerships Desk</h4>
                      <p className="text-xs text-white/60">Speak directly with our automotive VP of Partnerships</p>
                    </div>
                    <a
                      href="mailto:info@myevservice.in?subject=OEM%20Partnership"
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-[#00D084] flex items-center gap-2 transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" /> Email info@myevservice.in
                    </a>
                  </div>
                </div>

                {/* Right Column: Hero Form (OEM-008) */}
                <div id="enquiry" className="lg:col-span-5 bg-[#0a0f0c] border-2 border-white/15 rounded-[28px] p-6 sm:p-8 shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#F5A623] rounded-t-[26px]" />
            <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Plan Your After-Sales Network</h2>
            <p className="text-xs text-white/60 mb-6 font-light">Our OEM team replies within one working day.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Company / Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EV Manufacturer, Dealer Group"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. VP After-Sales, Head Service"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Work Email</label>
                  <input
                    type="email"
                    placeholder="name@oem.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 95823 90001"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/70 block mb-1.5">Vehicle Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Electric 2W", "Electric 3W (L3/L5)", "Both"].map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setForm({ ...form, vehicleCategory: cat })}
                      className={`py-2 text-[11px] font-mono font-bold rounded-xl border transition-all ${
                        form.vehicleCategory === cat
                          ? "bg-[#00D084] text-black border-[#00D084]"
                          : "bg-white/5 text-white/70 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/70 block mb-1.5">Partnership Type</label>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {[
                    "After-Sales Service Network",
                    "Warranty, Recall & PDI",
                    "New City Launch Readiness",
                    "Parts Distribution Logistics",
                    "Technician Training & Cert",
                    "Battery Refurbishment",
                  ].map((item) => (
                    <label
                      key={item}
                      onClick={() => handleTypeToggle(item)}
                      className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer select-none transition-all ${
                        form.partnershipType.includes(item)
                          ? "bg-[#00D084]/15 border-[#00D084] text-white"
                          : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.partnershipType.includes(item)}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${
                        form.partnershipType.includes(item) ? "bg-[#00D084] border-[#00D084] text-black" : "border-white/30"
                      }`}>
                        {form.partnershipType.includes(item) && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="leading-tight">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Target Cities</label>
                <input
                  type="text"
                  placeholder="e.g. Pune, Mumbai, Bangalore, Delhi NCR"
                  value={form.targetCities}
                  onChange={(e) => setForm({ ...form, targetCities: e.target.value })}
                  className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-[11px] text-white/60 leading-tight cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-0.5 rounded border-white/30 bg-white/5 text-[#00D084] focus:ring-0"
                  />
                  <span>
                    I agree to the processing of enterprise details under the DPDP Act for evaluating service network partnerships.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#00D084] text-black font-black text-xs uppercase tracking-widest hover:bg-[#00e08f] shadow-[0_0_20px_rgba(0,208,132,0.3)] transition-all cursor-pointer mt-2"
              >
                Request Partnership Call
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* S3: Built For Band */}
      <section className="py-6 border-y border-white/10 bg-[#060a08]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="text-[11px] font-mono text-[#00D084] uppercase tracking-wider font-bold">Built For:</span>
          {[
            "Electric 2W Manufacturers",
            "3W / L5 Cargo Makers",
            "New & Import EV Brands",
            "Automotive Dealer Groups",
            "Battery & Component Makers",
            "Leasing & Financing Companies",
          ].map((seg) => (
            <span key={seg} className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 font-medium">
              {seg}
            </span>
          ))}
        </div>
      </section>

      {/* S4: The After-Sales Gap Comparison Table */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            The After-Sales Gap
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            EV sales are moving faster than service networks
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            In Pune alone, EV registrations nearly tripled in FY 2025–26 to 37,808 vehicles. For an EV brand, poor after-sales in one city shows up as lost sales in the next. These are the problems we take off your plate.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#080d0a]">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-white/5 border-b border-white/10 text-white/50 font-mono uppercase text-[11px]">
              <tr>
                <th className="p-4 w-1/4">Problem</th>
                <th className="p-4 w-1/3">Impact on Your Brand</th>
                <th className="p-4 w-5/12 bg-[#0D5C2E]/20 text-[#00D084]">The MY EV SERVICE Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              <tr>
                <td className="p-4 font-bold text-white">Sales outpace service</td>
                <td className="p-4 text-white/60">Customers in new cities wait days for basic repairs; online reviews suffer.</td>
                <td className="p-4 bg-[#0D5C2E]/10 text-[#00D084] font-medium">Ready service capacity in our network, trained on your vehicle platform.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Capex-heavy service centres</td>
                <td className="p-4 text-white/60">Company-owned centres tie up capital and take 6+ months to open.</td>
                <td className="p-4 bg-[#0D5C2E]/10 text-[#00D084] font-medium">Network-as-a-service: pay only for the capacity you use, scale per city.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Uneven dealer service</td>
                <td className="p-4 text-white/60">Quality varies widely based on each independent dealer's tooling &amp; skills.</td>
                <td className="p-4 bg-[#0D5C2E]/10 text-[#00D084] font-medium">Standardized workshops, certified EV tooling and Autobot Academy training.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Blind spots in field data</td>
                <td className="p-4 text-white/60">Repeat faults reach R&amp;D engineering too late, or never at all.</td>
                <td className="p-4 bg-[#0D5C2E]/10 text-[#00D084] font-medium">Every single job, fault code and replacement part logged and shared via API.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Slow parts in new markets</td>
                <td className="p-4 text-white/60">Vehicles sit idle waiting for consignments to arrive.</td>
                <td className="p-4 bg-[#0D5C2E]/10 text-[#00D084] font-medium">Parts warehousing and serial-level traceability through EV Spare Hub.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Warranty claim leakage</td>
                <td className="p-4 text-white/60">Weak telemetry evidence and inconsistent diagnostic logs drive up claim costs.</td>
                <td className="p-4 bg-[#0D5C2E]/10 text-[#00D084] font-medium">Photo, data and fault-code evidence attached to every single warranty claim.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* S5: OEM Solutions Grid */}
      <section id="services" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            OEM Solutions
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            A complete after-sales layer for your EV brand
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            Take one service or the full stack. Every service runs to your SOPs and reports into your systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "After-sales service partner",
              desc: "Your customers' vehicles serviced at MY EV SERVICE centres, to your exact procedures and labour times.",
              icon: Building2,
            },
            {
              step: "02",
              title: "Warranty and goodwill jobs",
              desc: "Diagnosis, repair and claim submission with full diagnostic evidence, approved through your workflow.",
              icon: ShieldCheck,
            },
            {
              step: "03",
              title: "Recalls and field campaigns",
              desc: "Customer outreach, batch scheduling and completion tracking for voluntary or regulatory service campaigns.",
              icon: AlertCircle,
            },
            {
              step: "04",
              title: "PDI and dealer support",
              desc: "Pre-delivery inspection, battery state-of-health baseline and technical backup for your dealer network.",
              icon: CheckCircle2,
            },
            {
              step: "05",
              title: "Parts distribution",
              desc: "Stocking, regional logistics and serial-level barcode traceability of your OEM parts through EV Spare Hub.",
              icon: Cpu,
            },
            {
              step: "06",
              title: "Technician training",
              desc: "Autobot Academy certification, with customized modules built specifically for your vehicle platform.",
              icon: Award,
            },
            {
              step: "07",
              title: "Battery diagnostics & refurb",
              desc: "Cell-level testing, module balancing, pack repair, warranty verification and second-life assessment.",
              icon: Activity,
            },
            {
              step: "08",
              title: "Roadside assistance",
              desc: "Rapid breakdown support and flatbed towing for your customers across our active urban service zones.",
              icon: Wrench,
            },
            {
              step: "09",
              title: "Market-entry service setup",
              desc: "Centres, parts buffer, RSA and certified technicians fully operational before you launch vehicle deliveries in a new city.",
              icon: Sparkles,
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.step}
                className="p-6 rounded-2xl bg-[#080d0a] border border-white/10 hover:border-[#00D084]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#00D084]">{card.step}</span>
                    <Icon className="w-5 h-5 text-white/40 group-hover:text-[#00D084] transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{card.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* S6: Autobot OS for OEMs */}
      <section id="autobot-os" className="py-20 px-6 bg-[#040805] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
              Technology // Autobot OS for OEMs
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              An AI-powered service platform your team can see into
            </h2>
            <p className="text-sm text-white/60 mt-3 font-light">
              Autobot OS runs every job from booking to warranty claim. It automates scheduling, dispatch, parts and reporting, so service is consistent in every city, giving your quality teams full field visibility.
            </p>
          </div>

          {/* 6-Step SOP Automation Flow */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
            {[
              { num: "01", title: "Load SOPs", desc: "Your procedures, labour times & parts lists." },
              { num: "02", title: "Book", desc: "Customer, dealer or recall bookings routed." },
              { num: "03", title: "Diagnose", desc: "AI-guided fault finding on your platform." },
              { num: "04", title: "Approve", desc: "Warranty evidence sent for your sign-off." },
              { num: "05", title: "Repair", desc: "Guided digital job card with scanned parts." },
              { num: "06", title: "Report", desc: "Live failure trends & quality data exported." },
            ].map((step) => (
              <div key={step.num} className="p-4 rounded-2xl bg-[#080d0a] border border-white/10">
                <span className="text-[10px] font-mono text-[#00D084] font-bold block mb-1">{step.num}</span>
                <span className="text-sm font-bold text-white block mb-1">{step.title}</span>
                <span className="text-[11px] text-white/60 block leading-tight">{step.desc}</span>
              </div>
            ))}
          </div>

          {/* 6 Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: "Brand SOP Library",
                title: "Your process, every centre",
                desc: "Procedures and labour times enforced step by step on the technician's digital job card.",
              },
              {
                tag: "Warranty Workflow",
                title: "Evidence-first claims",
                desc: "High-resolution photos, BMS logs, and diagnostic trouble codes attached to every claim.",
              },
              {
                tag: "Field Analytics",
                title: "Failure trends by model",
                desc: "Identify repeat batch faults, parts wear rate and mean time-to-repair by model variant.",
              },
              {
                tag: "Traceability",
                title: "Serial-level parts",
                desc: "Every warranty component scanned from central warehouse to vehicle bay.",
              },
              {
                tag: "DMS Integration",
                title: "API to your DMS / ERP",
                desc: "Jobs, claims, customer profiles and vehicle telemetry flow seamlessly into your core ERP.",
              },
              {
                tag: "Data Governance",
                title: "Your data stays yours",
                desc: "Role-based access controls, strict NDAs and dedicated enterprise multi-tenant security.",
              },
            ].map((mod) => (
              <div key={mod.title} className="p-6 rounded-2xl bg-[#080d0a] border border-white/10">
                <span className="text-[10px] font-mono text-[#00D084] uppercase tracking-wider font-bold block mb-2">{mod.tag}</span>
                <h3 className="text-base font-bold text-white mb-2">{mod.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S7: Engagement Models Table */}
      <section id="models" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            Engagement Models
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Four ways to work with us
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            Start small in one city, then scale. Commercials are agreed per city and volume tier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              model: "Service Partner",
              what: "Service your customers' vehicles at our multi-brand centres under your SOPs.",
              bestFor: "Brands with growing volume in a city",
              commercials: "Per-job labour rates + parts",
            },
            {
              model: "Network-as-a-Service",
              what: "Dedicated bays and certified technicians reserved for your brand in chosen cities.",
              bestFor: "Brands scaling sales fast",
              commercials: "Monthly capacity fee + per job",
            },
            {
              model: "Market-Entry Package",
              what: "Service readiness before a new city launch: centres, parts buffer, RSA and trained technicians.",
              bestFor: "New and import EV brands",
              commercials: "Project fee per city",
            },
            {
              model: "Training & Certification",
              what: "Autobot Academy trains and certifies your internal or dealer technicians on high-voltage systems.",
              bestFor: "Dealer networks & OEMs",
              commercials: "Per cohort / batch",
            },
          ].map((item) => (
            <div key={item.model} className="p-6 rounded-2xl bg-[#080d0a] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#00D084] uppercase tracking-wider font-bold block mb-2">Model</span>
                <h3 className="text-lg font-bold text-white mb-3">{item.model}</h3>
                <p className="text-xs text-white/70 leading-relaxed mb-4">{item.what}</p>
                <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs">
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase font-mono">Best For:</span>
                    <span className="text-white font-medium">{item.bestFor}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-white/40 block text-[10px] uppercase font-mono">Commercials:</span>
                    <span className="text-[#00D084] font-mono font-semibold">{item.commercials}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* S8: Speed & Scale Comparison */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            Speed and Scale
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Cover more cities, faster, with less capital
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            How a partner network compares with building your own proprietary service footprint.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#080d0a]">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-white/5 border-b border-white/10 text-white/50 font-mono uppercase text-[11px]">
              <tr>
                <th className="p-4 w-1/4">What Matters</th>
                <th className="p-4 text-center">Own Service Centres</th>
                <th className="p-4 text-center">Dealer-Only Service</th>
                <th className="p-4 text-center bg-[#0D5C2E]/20 text-[#00D084]">MY EV SERVICE Network</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              <tr>
                <td className="p-4 font-bold text-white">Upfront Capital</td>
                <td className="p-4 text-center text-white/60">High (Capex)</td>
                <td className="p-4 text-center text-white/60">Dealer-Funded</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">None for capacity</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Time to cover a new city</td>
                <td className="p-4 text-center text-white/60">6–9 Months</td>
                <td className="p-4 text-center text-white/60">Depends on Dealer</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">Playbook-led, per plan</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Consistency across cities</td>
                <td className="p-4 text-center text-[#00D084]">✓ High</td>
                <td className="p-4 text-center text-white/60">Varies widely</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">✓ Standard SOPs &amp; tooling</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">EV-specialist technicians</td>
                <td className="p-4 text-center text-[#00D084]">✓ Yes</td>
                <td className="p-4 text-center text-white/60">Varies</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">✓ Autobot Academy certified</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Field data back to engineering</td>
                <td className="p-4 text-center text-white/70">Own systems</td>
                <td className="p-4 text-center text-white/40">Limited</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">✓ Live API &amp; dashboards</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">Scales up or down with sales</td>
                <td className="p-4 text-center text-white/60">Fixed high cost</td>
                <td className="p-4 text-center text-white/60">Partly</td>
                <td className="p-4 text-center bg-[#0D5C2E]/10 text-[#00D084] font-bold">✓ Pay for capacity used</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* S14: FAQ Accordion */}
      <section id="faqs" className="py-20 px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white tracking-tight">OEM Partnership FAQs</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div key={faq.q} className="rounded-2xl border border-white/10 bg-[#080d0a] overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left text-sm font-bold text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#00D084] transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-white/70 leading-relaxed font-light border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* S15: Closing CTA Band */}
      <section className="py-16 px-6 bg-[#0D5C2E] text-white">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/80 font-bold block">
            FOR EV BRANDS AND DEALER GROUPS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Let's plan your after-sales network
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Tell us your target cities and expected volumes. We'll return with a detailed service capacity plan and SLA framework.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#enquiry"
              className="px-8 py-4 rounded-full bg-white text-[#020403] font-black text-xs uppercase tracking-widest hover:bg-white/90 shadow-2xl transition-all"
            >
              Request a Partnership Call
            </a>
            <a
              href="mailto:info@myevservice.in?subject=OEM%20Partnership"
              className="px-8 py-4 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" /> Email info@myevservice.in
            </a>
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
