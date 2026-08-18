import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020403] text-white selection:bg-[#00D084] selection:text-black font-sans">
      <Nav />

      <main className="pt-32 pb-16 px-6 max-w-4xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6">
          <span className="text-xs font-mono font-bold text-[#00D084] uppercase tracking-widest block mb-2">Legal Terms</span>
          <h1 className="text-4xl font-extrabold text-white">Terms & Conditions</h1>
          <p className="text-xs text-white/50 font-mono mt-2">Last Updated: January 2026 • MY EV SERVICE India</p>
        </div>

        <div className="space-y-6 text-sm text-white/80 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Service Booking & Acceptance</h2>
            <p>By scheduling a service booking through MY EV SERVICE, you agree that authorized certified technicians may inspect, run diagnostic telemetry scans, and perform requested repair operations on your electric vehicle.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. High Voltage System Safety</h2>
            <p>High-voltage battery packs, motor controllers, and wiring harnesses must only be inspected by certified technicians using approved insulated safety gear. Uncertified tampering voids service warranties.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. OEM Parts & Replacement Terms</h2>
            <p>Replacement components installed during service carry official manufacturer warranty terms. Customer-provided third-party non-OEM components are not eligible for workmanship coverage.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
