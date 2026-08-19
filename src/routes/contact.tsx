import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Headphones,
  Building2,
  Truck,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Globe,
  Radio,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

type EnquiryTab = "general" | "franchise" | "b2b" | "emergency";

function ContactPage() {
  const [activeTab, setActiveTab] = useState<EnquiryTab>("general");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    vehicleModel: "",
    investmentBudget: "",
    fleetSize: "",
    subject: "",
    message: "",
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please provide your Name and Mobile Number.");
      return;
    }
    const tabName =
      activeTab === "general"
        ? "Customer Support"
        : activeTab === "franchise"
        ? "Franchise Partnership"
        : activeTab === "b2b"
        ? "B2B Fleet Contract"
        : "Emergency Breakdown RSA";

    toast.success(
      `Enquiry Submitted for ${tabName}! Our dedicated support specialist will call you back within 15 minutes.`
    );
    setForm({
      name: "",
      email: "",
      phone: "",
      city: "",
      vehicleModel: "",
      investmentBudget: "",
      fleetSize: "",
      subject: "",
      message: "",
    });
  };

  const HUBS = [
    {
      city: "Pune",
      address: "Baner Highway Hub, Near Balewadi High Street, Pune 411045",
      phone: "+91 98765 43210",
      centers: "5 Operational Centers",
      status: "Open 24/7",
    },
    {
      city: "Mumbai",
      address: "Andheri East Technical Hub, MIDC Central Road, Mumbai 400093",
      phone: "+91 98765 43211",
      centers: "8 Operational Centers",
      status: "Open 24/7",
    },
    {
      city: "Bengaluru",
      address: "Electronic City Phase 1, Outer Ring Road, Bengaluru 560100",
      phone: "+91 98765 43212",
      centers: "12 Operational Centers",
      status: "Open 24/7",
    },
    {
      city: "Delhi NCR",
      address: "Sector 18 Cyber Hub Annex, Gurgaon, HR 122008",
      phone: "+91 98765 43213",
      centers: "10 Operational Centers",
      status: "Open 24/7",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans overflow-x-hidden">
      {/* Header Nav */}
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* =========================================================================
          1. IMMERSIVE HERO SECTION
         ========================================================================= */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden bg-[#020403]">
        {/* Glow Spheres */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00D084]/12 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-[#00D084]/8 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00D084] shadow-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00D084] animate-ping" />
            <span>24/7 Live Support & RSA Active • Response &lt; 15 Mins</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Get In Touch With <br />
            <span className="text-[#00D084] drop-shadow-[0_0_25px_rgba(0,208,132,0.4)]">
              MY EV SERVICE
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Have questions about doorstep maintenance, battery diagnostics, franchise partnership, or commercial fleet SLAs? Our expert team is ready to help.
          </p>

          {/* Quick Category Selector Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6">
            <button
              onClick={() => setActiveTab("general")}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-center gap-2 text-xs font-bold ${
                activeTab === "general"
                  ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-[0_0_20px_rgba(0,208,132,0.3)]"
                  : "backdrop-blur-xl bg-white/[0.03] border-white/10 text-white/80 hover:border-[#00D084]/50"
              }`}
            >
              <Headphones className="w-4 h-4" /> Customer Care
            </button>
            <button
              onClick={() => setActiveTab("franchise")}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-center gap-2 text-xs font-bold ${
                activeTab === "franchise"
                  ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-[0_0_20px_rgba(0,208,132,0.3)]"
                  : "backdrop-blur-xl bg-white/[0.03] border-white/10 text-white/80 hover:border-[#00D084]/50"
              }`}
            >
              <Building2 className="w-4 h-4" /> Franchise Enquiries
            </button>
            <button
              onClick={() => setActiveTab("b2b")}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-center gap-2 text-xs font-bold ${
                activeTab === "b2b"
                  ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-[0_0_20px_rgba(0,208,132,0.3)]"
                  : "backdrop-blur-xl bg-white/[0.03] border-white/10 text-white/80 hover:border-[#00D084]/50"
              }`}
            >
              <Truck className="w-4 h-4" /> B2B Fleet SLA
            </button>
            <button
              onClick={() => setActiveTab("emergency")}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-center gap-2 text-xs font-bold ${
                activeTab === "emergency"
                  ? "bg-[#00D084] text-[#020403] border-[#00D084] shadow-[0_0_20px_rgba(0,208,132,0.3)]"
                  : "backdrop-blur-xl bg-white/[0.03] border-white/10 text-white/80 hover:border-[#00D084]/50"
              }`}
            >
              <Zap className="w-4 h-4" /> 24/7 Breakdown RSA
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MAIN GLASSMOPHIC CONTACT HUB & FORM
         ========================================================================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Glassmorphic Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Call Support Card */}
            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 hover:border-[#00D084]/50 transition-all group shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/20 px-3 py-1 rounded-full">
                  Toll-Free & Direct
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Call Our Helpline</h3>
              <p className="text-xs text-white/60 mb-4 font-light">
                Speak directly with certified EV service advisors and technical engineers.
              </p>

              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-2xl p-3.5">
                  <div>
                    <span className="text-[10px] text-white/40 block font-mono">TOLL-FREE HELPLINE</span>
                    <a href="tel:18001234567" className="text-base font-bold text-[#00D084] font-mono">
                      1800 123 4567
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy("18001234567", "Toll-Free Number")}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  >
                    {copiedField === "Toll-Free Number" ? (
                      <Check className="w-4 h-4 text-[#00D084]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-2xl p-3.5">
                  <div>
                    <span className="text-[10px] text-white/40 block font-mono">24/7 RSA EMERGENCY DISPATCH</span>
                    <a href="tel:+919876543210" className="text-sm font-bold text-white font-mono">
                      +91 98765 43210
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy("+919876543210", "RSA Number")}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  >
                    {copiedField === "RSA Number" ? (
                      <Check className="w-4 h-4 text-[#00D084]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Email Contact Card */}
            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 hover:border-[#00D084]/50 transition-all group shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  Fast Email SLA
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Email Enquiries</h3>
              <p className="text-xs text-white/60 mb-4 font-light">
                For official correspondence, franchise proposals, or enterprise fleet SLAs.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">
                <div className="flex items-center justify-between py-1">
                  <span className="text-white/50">Customer Support:</span>
                  <a href="mailto:support@myevservice.in" className="font-bold text-white hover:text-[#00D084]">
                    support@myevservice.in
                  </a>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-white/50">Franchise & Partner:</span>
                  <a href="mailto:partner@myevservice.in" className="font-bold text-white hover:text-[#00D084]">
                    partner@myevservice.in
                  </a>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-white/50">Commercial Fleets:</span>
                  <a href="mailto:b2b@myevservice.in" className="font-bold text-white hover:text-[#00D084]">
                    b2b@myevservice.in
                  </a>
                </div>
              </div>
            </div>

            {/* Headquarters Location Card */}
            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-8 hover:border-[#00D084]/50 transition-all group shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/20 px-3 py-1 rounded-full">
                  Gurgaon Tech Park
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Corporate Headquarters</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed mt-2">
                MY EV SERVICE India Pvt. Ltd. <br />
                Autobot Engineers Tower, Plot 42, Sector 18, Electronic City, Gurgaon, Haryana 122008
              </p>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-white/60">
                  <Clock className="w-4 h-4 text-[#00D084]" />
                  <span>Mon - Sat: 08:00 AM - 08:00 PM</span>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#00D084] font-bold hover:underline flex items-center gap-1"
                >
                  Directions <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Glassmorphic Form */}
          <div className="lg:col-span-7 backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D084] block mb-1">
                  INTERACTIVE ENQUIRY FORM
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeTab === "general"
                    ? "Customer Support Enquiry"
                    : activeTab === "franchise"
                    ? "Franchise Partner Request"
                    : activeTab === "b2b"
                    ? "B2B Commercial Fleet SLA"
                    : "Emergency Breakdown Assistance"}
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/20 px-3 py-1.5 rounded-full font-mono">
                <ShieldCheck className="w-4 h-4" /> SSL Encrypted
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[11px] font-mono uppercase text-white/50 block mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#020403]/80 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00D084] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/50 block mb-1.5">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#020403]/80 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00D084] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-white/50 block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@domain.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#020403]/80 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00D084] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-white/50 block mb-1.5">
                    City / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pune, Wakad / Mumbai"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-[#020403]/80 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00D084] transition-colors"
                  />
                </div>

                {activeTab === "general" && (
                  <div>
                    <label className="text-[11px] font-mono uppercase text-white/50 block mb-1.5">
                      EV Vehicle Model
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ola S1 Pro / Ather 450X"
                      value={form.vehicleModel}
                      onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })}
                      className="w-full bg-[#020403]/80 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00D084] transition-colors"
                    />
                  </div>
                )}

                {activeTab === "franchise" && (
                  <div>
                    <label className="text-[11px] font-mono uppercase text-white/50 block mb-1.5">
                      Investment Budget
                    </label>
                    <select
                      value={form.investmentBudget}
                      onChange={(e) => setForm({ ...form, investmentBudget: e.target.value })}
                      className="w-full bg-[#020403]/80 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00D084] cursor-pointer"
                    >
                      <option value="">Select Investment Band</option>
                      <option value="₹10L - ₹20L">₹10 Lakhs - ₹20 Lakhs</option>
                      <option value="₹20L - ₹35L">₹20 Lakhs - ₹35 Lakhs</option>
                      <option value="₹35L+">₹35 Lakhs+ Enterprise Hub</option>
                    </select>
                  </div>
                )}

                {(activeTab === "b2b" || activeTab === "emergency") && (
                  <div>
                    <label className="text-[11px] font-mono uppercase text-white/50 block mb-1.5">
                      Fleet Size / Requirement
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 15 Commercial 2W / 3W Vehicles"
                      value={form.fleetSize}
                      onChange={(e) => setForm({ ...form, fleetSize: e.target.value })}
                      className="w-full bg-[#020403]/80 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00D084] transition-colors"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/50 block mb-1.5">
                  Subject / Requirement Overview
                </label>
                <input
                  type="text"
                  placeholder="e.g. Need annual doorstep battery diagnostic service / Franchise availability in Pune"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-[#020403]/80 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00D084] transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-white/50 block mb-1.5">
                  Detailed Message / Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide any specific details or questions for our engineering team..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#020403]/80 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00D084] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all shadow-[0_0_25px_rgba(0,208,132,0.4)] cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Submit Priority Enquiry</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. REGIONAL SERVICE HUBS PREVIEW
         ========================================================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
              PAN-INDIA PRESENCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
              Major Regional Hubs
            </h2>
          </div>
          <Link
            to="/find-services"
            className="px-6 py-3 rounded-full border border-white/20 text-white text-xs font-bold hover:bg-white/10 transition-all cursor-pointer flex items-center gap-2 w-fit"
          >
            <span>Explore All Service Hubs</span>
            <ArrowRight className="w-4 h-4 text-[#00D084]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HUBS.map((hub, idx) => (
            <div
              key={idx}
              className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 hover:border-[#00D084]/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/20 px-3 py-1 rounded-full font-mono">
                    {hub.centers}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#00D084] transition-colors">
                  {hub.city}
                </h3>
                <p className="text-xs text-white/60 font-light leading-relaxed mb-4">
                  {hub.address}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <a href={`tel:${hub.phone}`} className="font-mono font-bold text-white hover:text-[#00D084]">
                  {hub.phone}
                </a>
                <span className="text-[10px] text-[#00D084] font-bold uppercase">{hub.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
