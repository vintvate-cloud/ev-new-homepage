import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import {
  ABOUT_STATS,
  TIMELINE_DATA,
  LEADERSHIP_TEAM,
  ROADMAP_PHASES,
  DUAL_PILLARS,
} from "../data/aboutData";
import {
  Zap,
  Building2,
  Globe,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowRight,
  BarChart3,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  const [openTimelineIndex, setOpenTimelineIndex] = useState<number | null>(
    TIMELINE_DATA.length - 1
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans">
      
      {/* Unified Landing Navbar */}
      <Nav />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#060c09] to-[#020403]">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00D084]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D084]/30 bg-[#00D084]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00D084] mb-6">
            <Zap className="w-3.5 h-3.5" />
            MY EV SERVICE Ecosystem
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Powering India's <br />
            <span className="text-[#00D084]">Next Generation</span> EV Network
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-3xl mx-auto leading-relaxed mb-10">
            MY EV SERVICE is a technology-driven multi-brand electric vehicle service network built from the ground up to support the rapidly growing electric mobility ecosystem in India.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/franchise"
              className="px-8 py-3.5 rounded-full bg-[#00D084] text-[#020403] text-xs font-extrabold uppercase tracking-wider hover:bg-[#00e08f] shadow-[0_0_25px_rgba(0,208,132,0.3)] transition-all cursor-pointer flex items-center gap-2"
            >
              Become a Partner <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full border border-white/20 text-white text-xs font-bold hover:bg-white/5 transition-all flex items-center gap-2"
            >
              Collaborate With Us <Globe className="w-4 h-4 text-[#00D084]" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Introduction Section */}
      <section className="py-20 px-6 border-b border-white/5 bg-[#030604]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/10 border border-[#00D084]/20 text-xs font-semibold text-[#00D084] mb-6">
            <Building2 className="w-3.5 h-3.5" />
            Who We Are
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Bridging the Critical Gap in India's EV Service Industry
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed font-light mb-6">
            As electric vehicles become mainstream across urban and rural landscapes, the need for professional EV servicing, certified high-voltage technicians, and reliable digital operations infrastructure is growing exponentially. MY EV SERVICE is built to address this critical gap by establishing a nationwide multi-brand EV service network powered by technology, intensive training, and an active ecosystem platform.
          </p>
          <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
            Our mission is to create India's most trusted EV service infrastructure while empowering a new generation of EV entrepreneurs, mechanics, and logistics professionals. The entire network runs on Autobot OS—our proprietary AI-driven operations platform that simplifies bookings, service workflows, vehicle diagnostics, spare parts fulfillment, and customer communications.
          </p>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="py-20 px-6 border-b border-white/5 bg-[#050907]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/10 border border-[#00D084]/20 text-xs font-semibold text-[#00D084] mb-3">
              <BarChart3 className="w-3.5 h-3.5" />
              Building India's EV Ecosystem
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Our Ecosystem Impact</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {ABOUT_STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-[#060c09] border border-white/10 rounded-2xl p-6 text-center hover:border-[#00D084]/40 transition-all duration-300"
              >
                <div className={`text-3xl md:text-4xl font-extrabold font-mono mb-2 ${stat.color}`}>
                  {stat.target.toLocaleString("en-IN")}{stat.suffix}
                </div>
                <div className="text-xs text-white/60 font-light leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Pillar Ecosystem Foundation */}
      <section className="py-24 px-6 border-b border-white/5 bg-[#020403]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
              Our Ecosystem Foundation
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 mb-4">
              Built on a Dual Pillar Model
            </h2>
            <p className="text-white/70 text-sm md:text-base font-light">
              MY EV SERVICE is powered by the combined expertise of two specialized organizations working in tandem to accelerate India's electric mobility transition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DUAL_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-[#050907] border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#00D084] mb-2">
                    {pillar.subtitle}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{pillar.title}</h3>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light mb-6">
                    {pillar.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {pillar.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6 border-b border-white/5 bg-[#030604]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
              Our Electrification Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 mb-4">
              Timeline of Innovation
            </h2>
            <p className="text-white/70 text-sm md:text-base font-light">
              From foundational research in electric powertrains to launching a digital OS network.
            </p>
          </div>

          <div className="space-y-4">
            {TIMELINE_DATA.map((item, index) => {
              const isOpen = openTimelineIndex === index;
              return (
                <div
                  key={item.year}
                  className="bg-[#050907] border border-white/10 hover:border-[#00D084]/40 rounded-2xl p-6 transition-all cursor-pointer"
                  onClick={() => setOpenTimelineIndex(isOpen ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-extrabold font-mono text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/20 px-3 py-1 rounded-lg">
                        {item.year}
                      </span>
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#00D084]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/40" />
                    )}
                  </div>
                  {isOpen && (
                    <p className="mt-4 pt-4 border-t border-white/10 text-xs md:text-sm text-white/70 leading-relaxed font-light">
                      {item.body}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 px-6 border-b border-white/5 bg-[#020403]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
              Leadership & Mentors
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 mb-4">
              The Minds Behind the Mission
            </h2>
            <p className="text-white/70 text-sm md:text-base font-light">
              Guided by EV engineers, operations specialists, and tech leaders committed to setting quality benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP_TEAM.map((member, i) => (
              <div
                key={i}
                className="bg-[#050907] border border-white/10 hover:border-[#00D084]/40 rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-20 h-20 rounded-full bg-[#00D084]/10 border-2 border-[#00D084]/30 flex items-center justify-center text-[#00D084] font-mono font-extrabold text-2xl mx-auto mb-6">
                  {member.initials}
                </div>
                <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                <div className="text-xs font-mono font-bold text-[#00D084] uppercase tracking-wider mb-2">
                  {member.title}
                </div>
                <p className="text-xs text-white/60 font-light">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Phase Roadmap */}
      <section className="py-24 px-6 bg-[#030604]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00D084]">
              Future Roadmap
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 mb-4">
              Supporting India's EV Shift
            </h2>
            <p className="text-white/70 text-sm md:text-base font-light">
              Building long-term scalable infrastructure for electric mobility across Tier 1, 2, and 3 markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ROADMAP_PHASES.map((phase, idx) => (
              <div
                key={idx}
                className="bg-[#050907] border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-[#00D084]/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D084] bg-[#00D084]/10 border border-[#00D084]/20 px-3 py-1 rounded-full">
                      {phase.phase}
                    </span>
                    <span className="text-xs font-mono text-white/50">{phase.period}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed mb-6">
                    {phase.goal}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    {phase.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Landing Footer */}
      <Footer />

    </div>
  );
}
