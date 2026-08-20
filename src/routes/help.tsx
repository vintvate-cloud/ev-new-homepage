import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BookingModal } from "../components/BookingModal";
import {
  HelpCircle,
  Wrench,
  ShoppingBag,
  Sparkles,
  Phone,
  MessageSquare,
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw,
  MapPin,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/help")({
  component: HelpPage,
});

function HelpPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const CATEGORIES = [
    { title: "Service Booking & RSA", desc: "Doorstep dispatch, scheduling slots, emergency breakdown", link: "/find-services", icon: Wrench },
    { title: "Battery & Diagnostics", desc: "BMS health certificates, cell balancing, range optimization", link: "/services", icon: Zap },
    { title: "Warranty & Refunds", desc: "Claim guarantees, spare parts warranty, refund processing", link: "/warranty", icon: ShieldCheck },
    { title: "Franchise Partnerships", desc: "Hub setup, application requirements, technical support", link: "/franchise", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans overflow-x-hidden">
      <Nav onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-[#020403]">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00D084]/12 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00D084] shadow-md backdrop-blur-md">
            <HelpCircle className="w-4 h-4" />
            <span>24/7 Help &amp; Support Hub</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            How Can We <br />
            <span className="text-[#00D084] drop-shadow-[0_0_20px_rgba(0,208,132,0.4)]">
              Help You Today?
            </span>
          </h1>

          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            Search our knowledge base, explore service guides, or connect directly with MY EV SERVICE technical support advisors.
          </p>

          {/* Quick Actions Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="p-4 rounded-2xl bg-[#00D084] text-[#020403] font-black text-xs uppercase tracking-wider hover:bg-[#00e08f] transition-all shadow-[0_0_20px_rgba(0,208,132,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4" /> Book Doorstep Service
            </button>
            <Link
              to="/track"
              className="p-4 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/15 text-white font-bold text-xs hover:border-[#00D084]/50 transition-all flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#00D084]" /> Track Live Service
            </Link>
            <Link
              to="/faqs"
              className="p-4 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/15 text-white font-bold text-xs hover:border-[#00D084]/50 transition-all flex items-center justify-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-[#00D084]" /> Browse All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* Main Categories Grid */}
      <section className="py-12 px-6 max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => {
            const IconComp = cat.icon;
            return (
              <Link
                key={i}
                to={cat.link}
                className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 hover:border-[#00D084]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084] mb-4 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00D084] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                </div>
                <div className="flex items-center text-xs font-bold text-[#00D084] gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Topic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* 24/7 Helpline Box */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/10 border border-[#00D084]/20 text-[11px] font-mono text-[#00D084]">
              <Headphones className="w-3.5 h-3.5" /> 24/7 Priority Emergency Support
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Need Immediate Roadside Assistance?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              If your EV has stopped on the road or requires urgent mobile diagnostic support, call our toll-free dispatch hub instantly.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="tel:18001234567"
                className="px-6 py-3.5 rounded-xl bg-[#00D084] text-[#020403] font-black text-xs uppercase tracking-wider hover:bg-[#00e08f] transition-all shadow-[0_0_20px_rgba(0,208,132,0.3)] flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call 1800 123 4567 (Toll-Free)
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Support Response Guarantees:</h4>
            <ul className="space-y-2 text-white/80 font-light">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> &lt; 15 mins RSA Mobile Van Dispatch
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> 100% Certified High Voltage Engineers
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00D084]" /> 90-Day Workmanship Service Guarantee
              </li>
            </ul>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
