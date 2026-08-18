import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/disclaimer")({
  component: DisclaimerPage,
});

function DisclaimerPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020403] text-[#ffffff] selection:bg-[#00D084] selection:text-black font-sans">
      <Nav />

      <main className="pt-32 pb-16 px-6 max-w-4xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6">
          <span className="text-xs font-mono font-bold text-[#00D084] uppercase tracking-widest block mb-2">Notice</span>
          <h1 className="text-4xl font-extrabold text-white">Legal Disclaimer</h1>
          <p className="text-xs text-white/50 font-mono mt-2">Last Updated: January 2026 • MY EV SERVICE India</p>
        </div>

        <div className="space-y-6 text-sm text-white/80 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Multi-Brand Technical Network</h2>
            <p>MY EV SERVICE operates an independent multi-brand service and diagnostics network. Brand names (Ola, Ather, TVS, Hero, Revolt, Bajaj, etc.) are used strictly for compatibility identification purposes.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. High Voltage Safety Warning</h2>
            <p>High-voltage battery packs contain stored energy up to 72V+. Do not attempt unauthorized disassembly or cell shorting without high-voltage protective gloves and isolation equipment.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
