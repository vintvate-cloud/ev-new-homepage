import { Link } from "@tanstack/react-router";
import { ShieldCheck, PhoneCall, Mail, MapPin, ArrowUpRight, Zap } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#020403] text-white border-t border-white/10 pt-16 pb-12 px-6 font-sans relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Callout Banner */}
        <div className="bg-[#080d0a] border border-white/10 rounded-[28px] p-8 md:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D084]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] mb-3">
              <ShieldCheck className="w-4 h-4" />
              Trusted across 40+ Indian Cities
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
              India's #1 EV Service Network
            </h2>
            <p className="text-sm md:text-base text-[#c2d1c7] font-light">
              100% engineered diagnostics, certified technicians, and rapid doorstep execution for 2W & 3W Electric Vehicles.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0 relative z-10">
            <Link
              to="/services"
              className="px-8 py-4 rounded-full bg-[#00D084] text-[#020403] text-xs font-black uppercase tracking-widest hover:bg-[#00e08f] shadow-lg transition-all cursor-pointer"
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

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <img
                src="/logo-myevservice.jpg"
                alt="My EV Service Logo"
                className="h-10 w-auto rounded-lg object-contain border border-white/10"
              />
              <span className="text-lg font-black tracking-[0.15em] text-white uppercase">
                MY EV SERVICE
              </span>
            </Link>
            <p className="text-xs text-white/60 font-normal leading-relaxed max-w-sm mb-6">
              The premier electric vehicle diagnostic & maintenance network. Delivering cell balancing, motor controller repair, genuine spare parts, and 24/7 roadside emergency assistance.
            </p>
            <div className="flex items-center gap-3 text-xs text-white/50 font-mono">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#00D084]" /> 40+ Cities</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#00D084]" /> Autobot OS</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] mb-4">
              Platform Links
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">EV Services Directory</Link>
              </li>
              <li>
                <Link to="/franchise" className="hover:text-white transition-colors">Franchise Program</Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-white transition-colors">Genuine Parts Store</Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-white transition-colors">Track Service Status</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">Careers & Onboarding</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Info */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] mb-4">
              Help & Knowledge
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link to="/faqs" className="hover:text-white transition-colors">FAQs Knowledgebase</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact & Support</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors">Legal Disclaimer</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency & Support */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] mb-4">
              24/7 Helpline
            </h4>
            <ul className="space-y-3 text-xs text-white/70">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#00D084] shrink-0" />
                <span>1800 123 4567 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00D084] shrink-0" />
                <span>support@myevservice.in</span>
              </li>
              <li className="pt-2">
                <Link
                  to="/track"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#00D084] hover:underline"
                >
                  Track Live Job <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 font-mono">
          <div>
            © {currentYear} MY EV SERVICE India. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/refund" className="hover:text-white transition-colors">Refund & Cancellation</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
