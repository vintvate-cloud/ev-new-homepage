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
  ArrowUpRight,
  HelpCircle,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Building2,
  ArrowRight,
  MessageSquare,
  Zap,
  ShoppingBag,
  Briefcase,
  HelpCircle as FaqIcon,
  Search,
  CheckCircle2,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
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
    if (!form.name || !form.phone || !form.message) {
      toast.error("Please fill in your Full Name, Phone Number, and Message.");
      return;
    }

    toast.success(
      `Thank you ${form.name}! Your message has been sent to our Pune head office team. We'll reply shortly.`
    );
    setForm({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const QUICK_LINKS = [
    { title: "FAQs", href: "/faqs", icon: FaqIcon, desc: "Common questions & answers" },
    { title: "Our Services", href: "/services", icon: Zap, desc: "Doorstep & hub maintenance" },
    { title: "Franchise", href: "/franchise", icon: Building2, desc: "Partner with My EV Service" },
    { title: "Careers", href: "/careers", icon: Briefcase, desc: "Join our expert team" },
    { title: "Track Service", href: "/track", icon: Search, desc: "Real-time service status" },
    { title: "Store", href: "/store", icon: ShoppingBag, desc: "Genuine EV spare parts" },
  ];

  return (
    <div className="min-h-screen bg-[#030604] text-white selection:bg-[#00D084] selection:text-black font-sans relative overflow-x-hidden">
      {/* Navigation Header */}
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Background Emerald Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#00D084]/15 via-[#00D084]/5 to-transparent blur-[170px] pointer-events-none z-0" />

      {/* Massive Semi-Transparent Watermark Title "CONTACT" */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-[10rem] sm:text-[16rem] lg:text-[20rem] font-black text-white/[0.03] tracking-widest pointer-events-none select-none uppercase font-mono z-0 leading-none">
        CONTACT
      </div>

      {/* Glowing Tech Circuit Graphic Overlay - Left */}
      <svg
        className="absolute left-0 top-32 w-72 h-96 pointer-events-none opacity-30 z-0 hidden lg:block"
        viewBox="0 0 300 400"
        fill="none"
      >
        <path
          d="M-50 40 L120 40 L200 140 L200 320"
          stroke="url(#circuit-grad-left)"
          strokeWidth="1.5"
        />
        <circle cx="200" cy="320" r="4" fill="#00D084" />
        <defs>
          <linearGradient id="circuit-grad-left" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00D084" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00D084" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glowing Tech Circuit Graphic Overlay - Right */}
      <svg
        className="absolute right-0 top-44 w-72 h-96 pointer-events-none opacity-30 z-0 hidden lg:block"
        viewBox="0 0 300 400"
        fill="none"
      >
        <path
          d="M350 40 L180 40 L100 140 L100 300"
          stroke="url(#circuit-grad-right)"
          strokeWidth="1.5"
        />
        <circle cx="100" cy="300" r="4" fill="#00D084" />
        <defs>
          <linearGradient id="circuit-grad-right" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00D084" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00D084" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* =========================================================================
          1. HERO & CONTACT HUB (Matching Screenshot Layout with User Details)
         ========================================================================= */}
      <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Get in Touch & 4 Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/90 mb-6 backdrop-blur-md">
                <HelpCircle className="w-3.5 h-3.5 text-[#00D084]" />
                <span>Contact</span>
              </div>

              {/* Title & Description */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-white mb-4 leading-tight">
                Get in Touch
              </h1>
              <p className="text-sm text-white/60 font-light leading-relaxed mb-8 max-w-md">
                Have questions about our services? Need support? Want to partner with us? We're here to help.
              </p>

              {/* Stack of 4 Contact Option Cards */}
              <div className="space-y-3.5">
                {/* 1. Call Us Card */}
                <div
                  onClick={() => handleCopy("+919582390001", "Phone Number")}
                  className="bg-[#0e120f]/90 border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center justify-between hover:border-[#00D084]/50 transition-all cursor-pointer group shadow-xl backdrop-blur-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5 text-[#00D084]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">Call Us</div>
                      <div className="text-xs font-bold text-[#00D084] font-mono">
                        +91 95823 90001
                      </div>
                      <div className="text-[10px] text-white/40 font-mono">
                        Toll Free, 24/7 Support
                      </div>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:bg-[#00D084] group-hover:text-black group-hover:border-[#00D084] transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* 2. Email Us Card */}
                <div
                  onClick={() => handleCopy("myevservice@autobotindia.com", "Email")}
                  className="bg-[#0e120f]/90 border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center justify-between hover:border-[#00D084]/50 transition-all cursor-pointer group shadow-xl backdrop-blur-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5 text-[#00D084]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">Email Us</div>
                      <div className="text-xs text-white/80 font-mono truncate max-w-[200px] sm:max-w-none">
                        myevservice@autobotindia.com
                      </div>
                      <div className="text-[10px] text-white/40 font-mono">
                        We reply within 2 hours
                      </div>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:bg-[#00D084] group-hover:text-black group-hover:border-[#00D084] transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* 3. WhatsApp Card */}
                <a
                  href="https://wa.me/919582390001"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#0e120f]/90 border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center justify-between hover:border-[#00D084]/50 transition-all cursor-pointer group shadow-xl backdrop-blur-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5 text-[#00D084]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">WhatsApp</div>
                      <div className="text-xs text-white/80 font-mono">+91 95823 90001</div>
                      <div className="text-[10px] text-white/40 font-mono">
                        Quick queries & updates
                      </div>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:bg-[#00D084] group-hover:text-black group-hover:border-[#00D084] transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </a>

                {/* 4. Head Office Card */}
                <a
                  href="https://maps.google.com/?q=Bhavdhan,Pune"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#0e120f]/90 border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center justify-between hover:border-[#00D084]/50 transition-all cursor-pointer group shadow-xl backdrop-blur-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                      <MapPin className="w-5 h-5 text-[#00D084]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">Head Office</div>
                      <div className="text-xs text-white/70 leading-snug font-light max-w-[220px]">
                        405, Vantage Tower C, NDA-Pashan Link Road, Bhavdhan, Pune - 411042
                      </div>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:bg-[#00D084] group-hover:text-black group-hover:border-[#00D084] transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </a>
              </div>

              {/* Social Media Links Row */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#00D084] mb-3">Connect on Social Media</div>
                <div className="flex items-center gap-3">
                  {[
                    { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
                    { label: "YouTube", icon: Youtube, href: "https://youtube.com" },
                    { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
                    { label: "Twitter", icon: Twitter, href: "https://twitter.com" },
                    { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
                  ].map((soc, idx) => {
                    const SocIcon = soc.icon;
                    return (
                      <a
                        key={idx}
                        href={soc.href}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00D084] hover:bg-[#00D084]/15 hover:border-[#00D084]/40 transition-all group"
                        aria-label={soc.label}
                        title={soc.label}
                      >
                        <SocIcon className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dark Glass Contact Form (Matching Screenshot UI) */}
          <div className="lg:col-span-7 bg-[#0b0f0c]/90 border border-white/10 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between backdrop-blur-2xl relative shadow-2xl">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white mb-1">
                  Send us a Message
                </h3>
                <p className="text-xs text-white/60 font-light">
                  Fill out the form and we'll get back to you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name (e.g. Rahul Sharma)"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#131815] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D084] transition-colors"
                  />
                </div>

                {/* Grid: Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone (e.g. +91 98765 43210)"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#131815] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D084] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email (e.g. rahul@example.com)"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#131815] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D084] transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Selector */}
                <div>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-[#131815] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white/90 focus:outline-none focus:border-[#00D084] transition-colors cursor-pointer"
                  >
                    <option value="">Select a topic...</option>
                    <option value="Doorstep EV Service">Doorstep EV Service</option>
                    <option value="Battery Health Inspection">Battery Health Inspection</option>
                    <option value="Franchise Opportunity">Franchise Opportunity in Pune & Pan-India</option>
                    <option value="B2B Fleet Maintenance">B2B Fleet Maintenance Contract</option>
                    <option value="Emergency Breakdown RSA">24/7 Breakdown RSA</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#131815] border border-white/10 rounded-2xl p-5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D084] transition-colors min-h-[160px] resize-none"
                  />
                </div>

                {/* Submit Pill Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-wider hover:bg-[#00D084] transition-all cursor-pointer shadow-xl mt-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. BUSINESS HOURS & INTERACTIVE MAP SECTION
         ========================================================================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Business Hours Card */}
          <div className="lg:col-span-5 bg-[#0b0f0c]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00D084] uppercase tracking-wider mb-4">
                <Clock className="w-4 h-4" /> Operating Schedule
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-6">Business Hours</h3>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-white/60">Monday - Friday</span>
                  <span className="font-bold text-white">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-white/60">Saturday</span>
                  <span className="font-bold text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-white/60">Sunday</span>
                  <span className="font-bold text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-[#00D084]">
                  <span className="font-bold uppercase">Emergency Service</span>
                  <span className="font-bold px-3 py-1 rounded-full bg-[#00D084]/15 border border-[#00D084]/30">
                    24/7 Available
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-white/50 leading-relaxed">
              * Emergency breakdown roadside assistance (RSA) is active 24/7 across all major operational city hubs.
            </div>
          </div>

          {/* Interactive Map & Head Office Card */}
          <div className="lg:col-span-7 bg-[#0b0f0c]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#00D084] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> Interactive Map
                </span>
                <span className="text-xs font-mono text-white/60">Bhavdhan, Pune</span>
              </div>

              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-2">Head Office Location</h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                405, Vantage Tower C, NDA-Pashan Link Road, Bhavdhan, Pune - 411042
              </p>

              {/* Styled Map Graphic Visual */}
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-[#070b08] border border-white/10 flex items-center justify-center group mb-4">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&auto=format&fit=crop&q=80"
                  alt="Pune Map Location"
                  className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Map Pin Marker Overlay */}
                <div className="absolute z-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#00D084] text-black flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,208,132,0.6)] animate-bounce">
                    <MapPin className="w-6 h-6 fill-black" />
                  </div>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-black/90 text-white text-[11px] font-mono font-bold border border-[#00D084]/40">
                    Bhavdhan, Pune • Vantage Tower C
                  </span>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Vantage+Tower+C+Bhavdhan+Pune"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider border border-white/15 text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#00D084]" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. QUICK LINKS NAVIGATION SECTION
         ========================================================================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/10">
        <div className="mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
            NAVIGATION
          </span>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white mt-1">Quick Links</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {QUICK_LINKS.map((link) => {
            const IconComponent = link.icon;
            return (
              <Link
                key={link.title}
                to={link.href}
                className="bg-[#0b0f0c]/90 border border-white/10 hover:border-[#00D084]/50 rounded-2xl p-5 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00D084] mb-3 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#00D084] transition-colors">
                    {link.title}
                  </h4>
                  <p className="text-[10px] text-white/50 mt-1 font-light">{link.desc}</p>
                </div>

                <div className="mt-4 text-[#00D084] text-xs font-mono font-bold flex items-center gap-1 opacity-80 group-hover:opacity-100">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. BOTTOM HERO BANNER ("India's #1 EV Service Platform")
         ========================================================================= */}
      <section className="py-24 px-6 bg-[#020403] relative z-10 border-t border-white/10 font-sans">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084]">
            India's #1 EV Service Platform
          </span>

          <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.04em] text-white leading-tight">
            Your EV deserves <span className="text-[#00D084]">expert care.</span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
            Certified technicians • Doorstep service • Genuine parts
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] transition-all cursor-pointer shadow-[0_0_30px_rgba(0,208,132,0.3)] hover:scale-105"
            >
              Book a Service
            </button>
            <Link
              to="/store"
              className="px-8 py-4 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
            >
              Explore Parts
            </Link>
            <Link
              to="/find-services"
              className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all cursor-pointer"
            >
              Find Centers Near You
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
