import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  PhoneCall,
  Mail,
  MapPin,
  ArrowRight,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Linkedin,
  Lock,
  Award,
  Star,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Reveal, StaggerContainer, StaggerItem } from "./ui/scroll-reveal";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Subscribed successfully! Thank you for staying updated.");
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#030604] text-white border-t border-white/10 pt-16 pb-12 px-6 font-sans relative z-10">
      <div className="max-w-[1400px] mx-auto">
        {/* =========================================================================
            1. TOP CALLOUT BANNER (Preserved Exact Box from 2nd Screenshot)
           ========================================================================= */}
        <Reveal yOffset={40} duration={0.8}>
          <div className="bg-[#080d0a] border border-[#00D084]/20 rounded-[28px] p-8 md:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D084] mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                TRUSTED ACROSS 40+ INDIAN CITIES
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
                India's #1 EV Service Network
              </h2>
              <p className="text-xs md:text-sm text-[#c2d1c7] font-light leading-relaxed">
                100% engineered diagnostics, certified technicians, and rapid doorstep execution for 2W & 3W Electric Vehicles.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0 relative z-10">
              <Link
                to="/services"
                className="px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] shadow-[0_0_20px_rgba(0,208,132,0.3)] transition-all cursor-pointer"
              >
                BOOK A SERVICE
              </Link>
              <a
                href="tel:+919876543210"
                className="px-8 py-4 rounded-full border border-white/20 text-white text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#00D084]" />
                +91 98765 43210
              </a>
            </div>
          </div>
        </Reveal>

        {/* =========================================================================
            2. MAIN FOOTER NAVIGATION COLUMNS (Exact Match to 1st Screenshot)
           ========================================================================= */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand Info & Address Details */}
          <StaggerItem className="md:col-span-2 lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src="/logo-myevservice.jpg"
                alt="My EV Service Logo"
                className="h-10 w-auto rounded-lg object-contain border border-white/10"
              />
              <span className="text-lg font-black tracking-[0.15em] text-white uppercase">
                MY EV SERVICE
              </span>
            </Link>

            <p className="text-xs text-white/60 font-light leading-relaxed max-w-sm">
              India's leading EV service platform. Expert care for your electric 2-wheelers and 3-wheelers, delivered at your doorstep by certified technicians.
            </p>

            <div className="space-y-2.5 text-xs text-white/70">
              <a href="tel:+919582390001" className="flex items-center gap-2.5 hover:text-[#00D084] transition-colors">
                <PhoneCall className="w-4 h-4 text-[#00D084] shrink-0" />
                <span className="font-mono">+91 95823 90001</span>
              </a>

              <a href="mailto:info@myevservice.in" className="flex items-center gap-2.5 hover:text-[#00D084] transition-colors">
                <Mail className="w-4 h-4 text-[#00D084] shrink-0" />
                <span>info@myevservice.in</span>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                <span className="leading-relaxed font-light text-white/60">
                  405, Vantage Tower C, NDA-Pashan Link Road, Bhavdhan, Pune - 411042
                </span>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00D084] hover:bg-[#00D084]/15 hover:border-[#00D084]/40 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00D084] hover:bg-[#00D084]/15 hover:border-[#00D084]/40 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00D084] hover:bg-[#00D084]/15 hover:border-[#00D084]/40 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00D084] hover:bg-[#00D084]/15 hover:border-[#00D084]/40 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00D084] hover:bg-[#00D084]/15 hover:border-[#00D084]/40 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </StaggerItem>

          {/* Col 2: SERVICES */}
          <StaggerItem className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] mb-4">
              SERVICES
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link to="/services" search={{ service: "BAT-001" }} className="hover:text-[#00D084] transition-colors">
                  Battery Health Check
                </Link>
              </li>
              <li>
                <Link to="/services" search={{ service: "CHG-001" }} className="hover:text-[#00D084] transition-colors">
                  Charging System
                </Link>
              </li>
              <li>
                <Link to="/services" search={{ service: "MOT-001" }} className="hover:text-[#00D084] transition-colors">
                  Motor & Drivetrain
                </Link>
              </li>
              <li>
                <Link to="/services" search={{ service: "BAT-006" }} className="hover:text-[#00D084] transition-colors">
                  AC & Thermal
                </Link>
              </li>
              <li>
                <Link to="/services" search={{ service: "DIAG-001" }} className="hover:text-[#00D084] transition-colors">
                  Software Updates
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-[#00D084] transition-colors">
                  Spare Parts
                </Link>
              </li>
              <li>
                <Link to="/find-services" className="hover:text-[#00D084] transition-colors">
                  Find Service Centers
                </Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Col 3: COMPANY */}
          <StaggerItem className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link to="/about" className="hover:text-[#00D084] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#00D084] transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/franchise" className="hover:text-[#00D084] transition-colors">Franchise</Link>
              </li>
              <li>
                <Link to="/find-services" className="hover:text-[#00D084] transition-colors">Service Network</Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-[#00D084] transition-colors">Press & Media</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#00D084] transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/franchise" className="hover:text-[#00D084] transition-colors">Investors</Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Col 4: SUPPORT */}
          <StaggerItem className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] mb-4">
              SUPPORT
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link to="/help" className="hover:text-[#00D084] transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-[#00D084] transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/warranty" className="hover:text-[#00D084] transition-colors">Service Warranty</Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-[#00D084] transition-colors">Track Service</Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-[#00D084] transition-colors">Feedback</Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-[#00D084] transition-colors">Report an Issue</Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Col 5: STAY UPDATED & DOWNLOAD APP */}
          <StaggerItem className="md:col-span-2 lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-1">
                STAY UPDATED
              </h4>
              <p className="text-xs text-white/50 font-light mb-3">
                EV tips, service offers & updates.
              </p>

              <form onSubmit={handleSubscribe} className="relative mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00D084]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 w-8 h-8 rounded-full bg-[#00D084] text-[#020403] flex items-center justify-center hover:bg-[#00e08f] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[10px] text-white/40 font-mono">No spam. Unsubscribe anytime.</p>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-3">
                DOWNLOAD APP
              </h4>
              <div className="space-y-2">
                <a
                  href="#app-ios"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("MY EV SERVICE iOS App launching soon!");
                  }}
                  className="block p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <span className="text-[10px] text-white/50 block leading-tight">Available on iOS</span>
                  <span className="text-xs font-bold text-white block">App Store</span>
                </a>
                <a
                  href="#app-android"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("MY EV SERVICE Android App launching soon!");
                  }}
                  className="block p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <span className="text-[10px] text-white/50 block leading-tight">Available on Android</span>
                  <span className="text-xs font-bold text-white block">Play Store</span>
                </a>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>

        {/* =========================================================================
            3. TRUST BADGES ROW (Exact Match to 1st Screenshot)
           ========================================================================= */}
        <Reveal delay={0.15} yOffset={20}>
          <div className="py-6 flex flex-wrap items-center justify-center gap-8 md:gap-12 border-b border-white/10 text-xs text-white/60 font-mono">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#00D084]" />
              <span>256-bit SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-[#00D084]" />
              <span>ISO 9001 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-[#00D084] fill-[#00D084]" />
              <span>Google Rated 4.9</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#00D084]" />
              <span>Powered by GreenTech</span>
            </div>
          </div>
        </Reveal>

        {/* =========================================================================
            4. BOTTOM COPYRIGHT & LEGAL LINKS (Exact Match to 1st Screenshot)
           ========================================================================= */}
        <Reveal delay={0.2} yOffset={20}>
          <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-white/40 font-mono text-center lg:text-left">
            <div>
              2025-2026, Autobot Emobility Solutions Private Limited, All Rights Reserved • Made with ❤️ in India
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
              <Link to="/franchise-terms" className="hover:text-white transition-colors">Franchise Terms</Link>
              <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              <Link to="/hv-safety" className="hover:text-white transition-colors">HV Safety</Link>
            </div>
          </div>
        </Reveal>

        {/* =========================================================================
            5. MASSIVE FOOTER BRAND TYPOGRAPHY
           ========================================================================= */}
        <Reveal delay={0.25} yOffset={20}>
          <div className="mt-12 w-full flex justify-center items-end pointer-events-none select-none overflow-hidden">
            <h1 className="text-[14vw] md:text-[15vw] font-black leading-none tracking-tighter text-[#00D084] pb-2 text-center opacity-90">
              myevservice
            </h1>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
