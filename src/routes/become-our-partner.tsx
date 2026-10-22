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
  Award,
  Store,
  MapPin,
  FileCheck,
  IndianRupee,
  Users,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/become-our-partner")({
  head: () => ({
    meta: [
      { title: "Become a Franchise Partner | MY EV SERVICE Opportunity" },
      {
        name: "description",
        content:
          "Join India's 1st multi-brand EV service franchise. Launch your EV service centre in 90 days with full training and support.",
      },
      { name: "keywords", content: "EV franchise opportunity India, Become EV service partner, EV service franchise partnership, Start EV service business" },
      { property: "og:title", content: "Become a Franchise Partner | MY EV SERVICE Opportunity" },
      { property: "og:description", content: "Launch your EV service centre in 90 days with full training, technology and parts supply." },
      { property: "og:image", content: "/assets/images/og-franchise.jpg" },
    ],
  }),
  component: BecomePartnerPage,
});

export const PARTNER_HERO_BG = "/franchise-bg.png";

export function BecomePartnerPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    pin: "",
    partnerType: "Franchise Service Centre",
    spaceSqFt: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.city) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!form.consent) {
      toast.error("Please agree to the terms to proceed.");
      return;
    }
    toast.success("Thank you! Our franchise director will contact you within 48 hours.");
    setForm({
      name: "",
      phone: "",
      email: "",
      city: "",
      pin: "",
      partnerType: "Franchise Service Centre",
      spaceSqFt: "",
      consent: false,
    });
  };

  const FAQS = [
    {
      q: "What is the MY EV SERVICE Partner Program?",
      a: "A program for businesses that want to grow with India's EV ecosystem by running a MY EV SERVICE centre or by offering EV charging, products or fleet infrastructure through our network.",
    },
    {
      q: "Who can become a partner?",
      a: "EV charging operators, independent workshop and garage owners, auto dealerships, spare parts suppliers, fleet operators, and technology providers.",
    },
    {
      q: "What are the benefits?",
      a: "A recognized EV service brand, full technical training through Autobot Academy, Autobot OS software, marketing support, partner parts pricing, and immediate customer routing.",
    },
    {
      q: "Is investment required?",
      a: "For a franchise centre: from ₹7.5 lakh + GST (Garage model) up to ₹25 lakh + GST (Hub model). Other partnership tracks are customized according to commercial scope.",
    },
    {
      q: "How do I apply?",
      a: "Submit the quick application form on this page. Our partnership team reviews your PIN code feasibility and contacts you within two working days.",
    },
    {
      q: "What support do you provide?",
      a: "Complete workshop layout, lifts, diagnostic tooling, technician recruitment and certification, branded marketing collateral, and a dedicated partner manager.",
    },
    {
      q: "Is regional exclusivity available?",
      a: "Yes. Franchise centres receive a strictly protected territory radius (3 km to 5 km depending on format) ensuring zero cannibalization.",
    },
    {
      q: "How do you ensure quality?",
      a: "Through standardized vehicle checklists enforced on Autobot OS digital job cards, continuous technician audits, and verified post-service customer feedback.",
    },
    {
      q: "How long is the agreement?",
      a: "Typically 4 years, renewable based on mutual performance and growth agreements.",
    },
    {
      q: "How can I speak to someone?",
      a: "Call our dedicated partner desk at +91 95823 90001 or email franchise@myevservice.in to schedule an in-person or virtual consultation.",
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
            className="services-bg-img absolute inset-0 bg-cover bg-center opacity-80 pointer-events-none scale-105 transition-all duration-700"
            style={{
              backgroundImage: `url('${PARTNER_HERO_BG}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

          <div
            ref={heroTextRef}
            className="max-w-4xl mx-auto text-center relative z-10 px-6 space-y-4 pointer-events-auto"
          >
            <span className="hero-sub-reveal text-xs font-mono font-bold uppercase tracking-widest text-[#00D084]">
              • Franchise &amp; Ecosystem Opportunity · India's 1st Multi-Brand Network
            </span>
            <h1 className="hero-title-reveal text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Become a Franchise Partner with <br className="hidden sm:block" />
              <span className="text-[#00D084]">MY EV SERVICE</span>
            </h1>
            <p className="hero-sub-reveal text-sm sm:text-base md:text-lg text-[#c2d1c7] font-light max-w-2xl mx-auto leading-relaxed">
              Launch your certified EV service centre in 90 days with complete diagnostic tools, Autobot Academy technician certification, digital job cards on Autobot OS, and guaranteed territory exclusivity.
            </p>
            <div className="hero-btn-reveal pt-3 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#apply"
                className="whitespace-nowrap inline-flex items-center shrink-0 gap-2 px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] cursor-pointer hover:scale-105"
              >
                <span>CHECK PIN AVAILABILITY</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
              <Link
                to="/franchise"
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
              >
                Explore Franchise Models
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
            <div className="pb-3 px-6 max-w-7xl mx-auto">
              <nav aria-label="breadcrumb" className="text-xs font-mono text-white/50 flex items-center gap-2">
                <Link to="/" className="hover:text-[#00D084] transition-colors">Home</Link>
                <span>›</span>
                <span className="text-[#00D084]">Become Our Partner</span>
              </nav>
            </div>

            {/* S1: Overview & Territory Lead Form */}
            <section className="relative px-6 py-10 md:py-14 overflow-hidden">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                <div className="lg:col-span-7 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-[#080d0a] border border-white/10">
                      <CheckCircle2 className="w-5 h-5 text-[#00D084] mb-2" />
                      <div className="text-sm font-bold text-white mb-0.5">Backed by Autobot</div>
                      <div className="text-xs text-white/60">India's leading EV engineering &amp; academy brand</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#080d0a] border border-white/10">
                      <CheckCircle2 className="w-5 h-5 text-[#00D084] mb-2" />
                      <div className="text-sm font-bold text-white mb-0.5">FOCO Model</div>
                      <div className="text-xs text-white/60">You own the setup, our software &amp; ops team runs it</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#080d0a] border border-white/10">
                      <CheckCircle2 className="w-5 h-5 text-[#00D084] mb-2" />
                      <div className="text-sm font-bold text-white mb-0.5">Territory Lock</div>
                      <div className="text-xs text-white/60">Guaranteed exclusive radius per partner PIN code</div>
                    </div>
                  </div>

                  {/* S1: Trust Strip (PART-003) */}
                  <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-white/60 font-mono">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00D084]" />
                      <span>Backed by Autobot India</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00D084]" />
                      <span>FOCO Model — You Own, We Operate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00D084]" />
                      <span>Protected Territory Radius</span>
                    </div>
                  </div>
                </div>

                {/* Right: Quick Lead Form */}
                <div id="apply" className="lg:col-span-5 bg-[#0a0f0c] border border-white/15 rounded-[28px] p-6 sm:p-8 shadow-2xl relative">
                  <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Check Territory Availability</h2>
                  <p className="text-xs text-white/60 mb-6 font-light">Submit details to evaluate your PIN code.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 95823 90001"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 411021"
                    value={form.pin}
                    onChange={(e) => setForm({ ...form, pin: e.target.value })}
                    className="w-full bg-[#121914] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D084]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/70 block mb-1">Available Commercial Space (Sq Ft)</label>
                <input
                  type="text"
                  placeholder="e.g. 300, 600, or 1200 sq ft"
                  value={form.spaceSqFt}
                  onChange={(e) => setForm({ ...form, spaceSqFt: e.target.value })}
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
                    I authorize MY EV SERVICE to contact me regarding franchise feasibility under the DPDP Act.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#00D084] text-black font-black text-xs uppercase tracking-widest hover:bg-[#00e08f] shadow-[0_0_20px_rgba(0,208,132,0.3)] transition-all cursor-pointer mt-2"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* S2: Why Partner With Us (PART-004 to 009) */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            Why Partner With Us?
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Everything you need to run an EV service business, from day one
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            {
              title: "Launch in 90 Days",
              desc: "Full infrastructure, tooling installation, and branding support on a fixed launch schedule.",
              icon: Clock,
            },
            {
              title: "Multi-Brand Demand",
              desc: "Serve 2W and 3W EVs from every brand. Capture far more volume than a single-brand OEM outlet.",
              icon: Building2,
            },
            {
              title: "EV Spare Hub Parts",
              desc: "Direct supply of compatibility-verified batteries, controllers and motors at partner wholesale prices.",
              icon: Store,
            },
            {
              title: "Autobot Academy Training",
              desc: "Your technicians are hired, trained, and certified in high-voltage safety before opening day.",
              icon: Award,
            },
            {
              title: "Marketing & Leads",
              desc: "A trusted brand, local campaigns via #PuneEVMap, app booking dispatch, and fleet AMC contracts.",
              icon: Sparkles,
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="p-6 rounded-2xl bg-[#080d0a] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">{card.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* S3: What It Takes to Be a Partner */}
      <section className="py-20 px-6 bg-[#040805] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
              Partner Profiles
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              What it takes to be a partner
            </h2>
            <p className="text-sm text-white/60 mt-3 font-light">
              We look for committed local operators and visionaries, not just passive investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Investment Capacity",
                desc: "From ₹7.5 lakh + GST (Garage) to ₹25 lakh + GST (Hub). See full model comparison on franchise page.",
                icon: IndianRupee,
              },
              {
                title: "Commercial Space",
                desc: "300 to 1,200 sq ft in a visible, accessible location, ideally on a main road with EV vehicle parking.",
                icon: MapPin,
              },
              {
                title: "Compliance Readiness",
                desc: "A registered business entity or proprietorship, KYC, and the ability to obtain local municipal trade licences.",
                icon: FileCheck,
              },
              {
                title: "Commitment to Quality",
                desc: "Strict adherence to safety guidelines, digital job card SOPs, and transparent customer care standards.",
                icon: ShieldCheck,
              },
            ].map((col) => {
              const Icon = col.icon;
              return (
                <div key={col.title} className="p-6 rounded-2xl bg-[#080d0a] border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{col.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{col.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* S4: 90-Day Launch Roadmap */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D084] uppercase tracking-wider mb-2">
            Launch Timeline
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Your 90-Day Launch Roadmap
          </h2>
          <p className="text-sm text-white/60 mt-3 font-light">
            From signed agreement to opening your bays in 3 structured phases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              days: "Days 1–30",
              title: "Site & Setup",
              desc: "Site feasibility survey, territory lock, agreement signing, architectural branding layout and tool orders.",
            },
            {
              days: "Days 31–60",
              title: "Infrastructure & Stock",
              desc: "Civil fit-out, lifts & diagnostic equipment installation, technician hiring and initial parts inventory loading.",
            },
            {
              days: "Days 61–90",
              title: "Training & Go-Live",
              desc: "Autobot Academy on-site certification, soft trial launch, local marketing campaign rollout and public opening.",
            },
          ].map((phase, idx) => (
            <div key={phase.days} className="p-8 rounded-3xl bg-[#080d0a] border border-white/10 relative">
              <span className="text-xs font-mono text-[#00D084] font-bold uppercase tracking-wider block mb-2">{phase.days}</span>
              <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">{phase.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* S9: FAQ Accordion */}
      <section id="faqs" className="py-20 px-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white tracking-tight">Partner Program FAQs</h2>
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

      {/* S10: Closing CTA */}
      <section className="py-16 px-6 bg-[#0D5C2E] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Become a MY EV SERVICE Partner Today
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Lead the electric mobility aftermarket in your city with full training, technology and parts support.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/franchise"
              className="px-8 py-4 rounded-full bg-white text-[#020403] font-black text-xs uppercase tracking-widest hover:bg-white/90 shadow-2xl transition-all"
            >
              Compare Franchise Models
            </Link>
            <a
              href="tel:+919582390001"
              className="px-8 py-4 rounded-full border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call +91 95823 90001
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
